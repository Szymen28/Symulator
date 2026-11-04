const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const updates = {
  11: [
    {
      qIdx: 1, // Q2
      newOpts: [
        "A. Gorączka przekraczająca 39.0°C u pacjenta bez zaburzeń świadomości i bez deficytów ogniskowych.",
        "B. Obecność objawów ogniskowych, drgawek o nowym początku, obrzęku tarczy nerwu wzrokowego lub GCS <10.",
        "C. Wiek pacjenta poniżej 30. roku życia z izolowanymi, klasycznymi objawami oponowymi w badaniu.",
        "D. Obecność wybroczyn skórnych nieblednących pod uciskiem przy pełnej przytomności pacjenta.",
        "E. Prawidłowa liczba płytek krwi i wskaźnik INR w normie w badaniach laboratoryjnych z krwi."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A. Izolowane porażenie obwodowe nerwu twarzowego w przebiegu wczesnej rozsianej postaci neuroboreliozy.",
        "B. Piorunująca posocznica (najczęściej meningokokowa) powikłana obustronnym krwotocznym zawałem nadnerczy.",
        "C. Ostre podgłośniowe zapalenie krtani o etiologii wirusowej z narastającą dusznością wdechową u dzieci.",
        "D. Autoimmunologiczne zapalenie mózgu z obecnością w surowicy swoistych przeciwciał przeciw receptorom NMDA.",
        "E. Zakrzepica żył wątrobowych (zespół Budda-Chiariego) w przebiegu nowotworów mieloproliferacyjnych."
      ]
    }
  ],
  12: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A. Ubytek masy ciała o 1–2%, zachowane łzawienie, wilgotne śluzówki i sporadyczny kaszel.",
        "B. Ubytek masy ciała ≥10%, nawrót kapilarny >3 sekundy, zapadnięte ciemiączko i letarg/apatia.",
        "C. Przyrost masy ciała o 5% w ciągu doby z obrzękami powiek i prawidłową diurezą godzinową.",
        "D. Prawidłowy turgor powłok skórnych, wzmożone pragnienie i obfite łzawienie przy płaczu.",
        "E. Pojedynczy luźny stolec bez domieszki krwi i śluzu przy pełnej aktywności niemowlęcia."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A. Nasilenie wydzielania kwasu solnego w żołądku z ryzykiem ostrego owrzodzenia błony śluzowej.",
        "B. Ryzyko niedrożności porażennej jelit, ostrego rozdęcia okrężnicy oraz depresji ośrodka oddechowego.",
        "C. Wywoływanie ostrej martwicy cewek nerkowych i bezmoczu w mechanizmie nefrotoksyczności leku.",
        "D. Chemiczna inaktywacja i neutralizacja glukozy i elektrolitów w roztworach nawadniających.",
        "E. Odkładanie nierozpuszczalnych złogów leku w szkliwie zębów mlecznych i ich trwałe przebarwienie."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A. Przerwanie karmienia piersią na okres 7 dni i podawanie dziecku wyłącznie 5% roztworu glukozy.",
        "B. Kontynuacja karmienia piersią na żądanie bez żadnych przerw, uzupełniana doustnym płynem nawadniającym.",
        "C. Pasteryzacja i gotowanie odciągniętego pokarmu matki przed każdym podaniem w celu sterylizacji.",
        "D. Natychmiastowe zastąpienie mleka kobiecego preparatem sojowym lub mieszanką bezlaktozową na 4 tygodnie.",
        "E. Całkowite wstrzymanie pokarmów mlecznych i podawanie wyłącznie kleiku ryżowego na wodzie przez 5 dni."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A. Zbyt szybki spadek natremii grozi gwałtownym napływem wody do komórek mózgu i jatrogennym obrzękiem mózgu.",
        "B. Szybkie obniżenie natremii wywołuje masywne wytrącanie soli wapniowych w rdzeniu nerek i kamicę moczową.",
        "C. Gwałtowny spadek stężenia sodu indukuje przedwczesne kostnienie i patologiczne zrośnięcie ciemiączka.",
        "D. Szybka zmiana osmolalności wywołuje ostrą wewnątrznaczyniową hemolizę erytrocytów i hemoglobinurię.",
        "E. Spadek stężenia sodu w surowicy stymuluje przerost odźwiernika i wyzwala wymioty chlustające po posiłkach."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A. Profilaktyczna codzienna suplementacja kwasu askorbinowego w kroplach doustnych.",
        "B. Szczepienie przeciwko rotawirusom (doustna żywa szczepionka podawana w 1. półroczu życia).",
        "C. Rutynowe podawanie doustnych antybiotyków przed każdym wyjściem z domu na spacer.",
        "D. Codzienne dezynfekowanie wszystkich zabawek dziecka 96% alkoholem etylowym.",
        "E. Kąpiele pielęgnacyjne w roztworze nadmanganianu potasu dwa razy w tygodniu."
      ]
    }
  ],
  13: [
    {
      qIdx: 1, // Q2
      newOpts: [
        "A. Spełnienie wszystkich 3 kryteriów łącznie z potwierdzeniem nekrozy w tomografii z kontrastem.",
        "B. Co najmniej 2 z 3 kryteriów (ból w nadbrzuszu, lipaza/amylaza ≥3x ggn, cechy w badaniach obrazowych).",
        "C. Wyłącznie kryterium histopatologiczne uzyskane drogą przezskórnej biopsji aspiracyjnej trzustki.",
        "D. Wystarczy izolowane stwierdzenie stężenia białka C-reaktywnego CRP powyżej 150 mg/l w surowicy.",
        "E. Dokładnie 1 dowolne kryterium kliniczne pod warunkiem współistnienia gorączki powyżej 38,5°C."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A. Jest bezwzględnie zalecana u każdego pacjenta z martwicą trzustki przez minimum 14 kolejnych dni.",
        "B. Jest niezalecana; nie zmniejsza śmiertelności, sprzyjając selekcji szczepów wielolekoopornych i grzybów.",
        "C. Należy ją wdrożyć rutynowo tylko wówczas, gdy aktywność amylazy w surowicy przekracza 5000 IU/l.",
        "D. Jest wskazana wyłącznie u chorych w wieku powyżej 65. roku życia ze współistniejącą cukrzycą.",
        "E. Powinna być rutynowo prowadzona za pomocą doustnej nystatyny skojarzonej z wankomycyną dożylnie."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A. Tylko składowe: 1, 2 oraz 3 (mocznik, stan świadomości, SIRS).",
        "B. Tylko składowe: 1, 3 oraz 5 (mocznik, SIRS, płyn w opłucnej).",
        "C. Tylko składowe: 2, 4 oraz 5 (stan świadomości, wiek, płyn).",
        "D. Tylko składowe: 1, 2, 4 oraz 5 (z pominięciem cech SIRS).",
        "E. Wszystkie wymienione parametry kliniczne (1, 2, 3, 4, 5)."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A. Natychmiastowe wykonanie otwartej rozległej nekrozektomii laparotomijnej w pierwszych 24 godzinach OZT.",
        "B. Rozpoczęcie od drenażu przezskórnego lub endoskopowego, a w razie braku poprawy małoinwazyjna nekrozektomia.",
        "C. Pierwotna całkowita resekcja żołądka z pankreatoduodenektomią sposobem Whipple'a w trybie ostrym.",
        "D. Stosowanie wyłącznie systemowej chemioterapii przeciwnowotworowej z wlewami 5-fluorouracylu.",
        "E. Zewnętrzne napromienianie przestrzeni zaotrzewnowej promieniami rentgenowskimi w dawkach frakcjonowanych."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A. Ponieważ pęcherzyk żółciowy po epizodzie zapalenia trzustki ulega zezłośliwieniu w ciągu 14 dni.",
        "B. W celu zapobiegania wczesnym nawrotom żółciowego OZT (występującym u ok. 25–30% chorych bez operacji).",
        "C. W celu trwałego obniżenia stężenia frakcji LDL cholesterolu i triglicerydów w osoczu krwi.",
        "D. Jest to procedura wyłącznie kosmetyczna, która nie wywiera żadnego wpływu na przeżycie pacjenta.",
        "E. W celu umożliwienia pacjentowi bezpiecznego powrotu do regularnego spożywania napojów alkoholowych."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A. Wskazuje na prawidłowe nawodnienie chorego i dynamiczne wygaszanie kaskady zapalnej w jamie brzusznej.",
        "B. Jest silnym niezależnym predyktorem rozwoju martwicy miąższu trzustki i niewydolności wielonarządowej.",
        "C. Świadczy o obecności wrodzonej czerwienicy prawdziwej wymagającej natychmiastowych upustów krwi.",
        "D. Jest patognomonicznym objawem masywnego krwawienia z wrzodu trawiennego do światła dwunastnicy.",
        "E. Nie wykazuje jakiegokolwiek znaczenia rokowniczego i nie koreluje z przebiegiem klinicznym OZT."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A. Bolesność uciskowa w punktach wyrostkowych McBurneya i Lanza, świadcząca o ostrym zapaleniu wyrostka.",
        "B. Podbiegnięcia krwawe wokół pępka (Cullen) oraz w lędźwiach (Grey Turner), świadczące o krwotocznym OZT.",
        "C. Brak tętna na tętnicach grzbietowych stopy i podkolanowych, wskazujący na ostre niedokrwienie kończyn.",
        "D. Obustronny wytrzeszcz gałek ocznych z obrzękiem powiek, świadczący o ciężkiej orbitopatii tarczycowej.",
        "E. Grubofaliste drżenie rąk i języka (flapping tremor), charakterystyczne dla encefalopatii wątrobowej."
      ]
    }
  ],
  14: [
    {
      qIdx: 1, // Q2
      newOpts: [
        "A. Prawidłowe stężenie białka w płynie mózgowo-rdzeniowym definitywnie wyklucza zespół Guillaina-Barrégo.",
        "B. Typowy dla wczesnego stadium; u 30–50% chorych w 1. tygodniu białko w PMR jest w normie, a rośnie w 2.–3. tyg.",
        "C. Wynik ten jest jednoznacznym dowodem na aktywne gruźlicze zapalenie opon mózgowo-rdzeniowych u chorego.",
        "D. Świadczy o przebytym niedokrwiennym udarze pnia mózgu z wtórnym uszkodzeniem dróg piramidowych.",
        "E. Stanowi bezwzględne wskazanie do natychmiastowego dokanałowego podania stężonych roztworów albuminy."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A. Sukcynylocholina wywołuje natychmiastowy skurcz naczyń wieńcowych i rozległy zawał ściany przedniej serca.",
        "B. Upregulacja receptorów nikotynowych w odnerwionych mięśniach wyzwala masywny wyrzut K+ i zatrzymanie krążenia.",
        "C. Lek ten ulega całkowitej inaktywacji przez autoprzeciwciała i nie wywołuje żadnego zwiotczenia mięśni.",
        "D. Wywołuje nagły wzrost ciśnienia wewnątrzgałkowego z nieodwracalnym uszkodzeniem tarczy nerwu wzrokowego.",
        "E. Sukcynylocholina stymuluje wytwarzanie przeciwciał anty-GM1, trwale nasilając obwodową demielinizację."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A. Metyloprednizolon w pulsach dożylnych 1 g/dobę stanowi leczenie pierwszego wyboru o najwyższej skuteczności.",
        "B. Steroidoterapia systemowa w monoterapii jest nieskuteczna i niezalecana (nie przyspiesza powrotu funkcji).",
        "C. Deksametazon w dawce 16 mg/dobę jest zalecany wyłącznie u pacjentów ze współistniejącym zajęciem nerwów.",
        "D. Steroidy należy wdrożyć natychmiast drogą nakłucia lędźwiowego bezpośrednio do przestrzeni podpajęczynówkowej.",
        "E. Steroidy są zalecane u każdego chorego z GBS pod warunkiem równoczesnego podania wysokich dawek witaminy B1."
      ]
    }
  ],
  15: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A. Prawidłowe stężenie ferrytyny pozwala z całą pewnością wykluczyć niedobór żelaza u pacjentów z chorobami zapalnymi.",
        "B. Ferrytyna jest białkiem ostrej fazy i w stanach zapalnych może być prawidłowa/podwyższona mimo niedoboru żelaza.",
        "C. Ferrytyna odzwierciedla wyłącznie zapasy witaminy B12 i kwasu foliowego, nie mając związku z metabolizmem żelaza.",
        "D. W stanach zapalnych ferrytyna ulega gwałtownej degradacji w wątrobie i spada do wartości nieoznaczalnych.",
        "E. Oznaczanie ferrytyny ma wartość diagnostyczną wyłącznie u kobiet ciężarnych i noworodków w 1. dobie życia."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A. Ciężka hipokaliemia (wskutek masywnego napływu potasu do nowo syntetyzowanych erytrocytów).",
        "B. Zagrażająca życiu hiperkalcemia wywołana wzmożoną resorpcją kostną pod wpływem kobalaminy.",
        "C. Ostra hiperkaliemia spowodowana masywną wewnątrznaczyniową hemolizą megaloblastów w szpiku.",
        "D. Ciężka hiponatremia z rozcieńczenia w mechanizmie nieadekwatnego wydzielania wazopresyny SIADH.",
        "E. Gwałtowny spadek stężenia magnezu w osoczu wywołujący oporne na leczenie drgawki tężcowe."
      ]
    }
  ],
  16: [
    {
      qIdx: 2, // Q3
      newOpts: [
        "A. Równoczesne wystąpienie objawów skórnych oraz duszności krtaniowej w pierwszych 5 minutach od użądlenia owada.",
        "B. Nawrót objawów anafilaksji po wcześniejszym ich ustąpieniu bez ponownej ekspozycji na alergen (zwykle po 1–72 h).",
        "C. Wystąpienie wstrząsu anafilaktycznego u pacjenta uczulonego równolegle na dwa różne, niezależne antygeny pokarmowe.",
        "D. Odpowiedź anafilaktyczna zdominowana przez gwałtowny skurcz oskrzeli z następową bradykardią i asystolią.",
        "E. Brak jakiejkolwiek reakcji klinicznej na pierwszą podaną dawkę adrenaliny i konieczność podania drugiej ampułki."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A. W jeden autowstrzykiwacz, gdyż podanie drugiej dawki adrenaliny jest bezwzględnie przeciwwskazane.",
        "B. W dwa autowstrzykiwacze (u części chorych konieczne jest podanie drugiej dawki przed przybyciem ZRM).",
        "C. W ampułkę z hydrokortyzonem oraz strzykawkę z doustnym lekiem przeciwhistaminowym II generacji.",
        "D. Wyłącznie w inhalator z krótko działającym beta-2-mimetykiem (salbutamol) do stosowania doraźnego.",
        "E. W autowstrzykiwacz z glukagonem z uwagi na profilaktykę hipoglikemii indukowanej aminami katecholowymi."
      ]
    }
  ],
  17: [
    {
      qIdx: 2, // Q3
      newOpts: [
        "A. Tomografia komputerowa jamy brzusznej i miednicy mniejszej z kontrastem dożylnym i doodbytniczym w trybie CITO.",
        "B. Ultrasonografia jamy brzusznej (USG) głowicą graded-compression, a w razie braku wizualizacji MRI bez gadolinu.",
        "C. Przeglądowe zdjęcie rentgenowskie jamy brzusznej w pozycji stojącej w celu poszukiwania poziomów płynów.",
        "D. Scyntygrafia z użyciem znakowanych technetem 99mTc leukocytów wielojądrzastych u każdej ciężarnej.",
        "E. Angiografia tętnicy krezkowej górnej celem wykluczenia zatorowości w krążeniu trzewnym u ciężarnej."
      ]
    }
  ],
  18: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A) Intubacja dotchawicza i wentylacja dodatnim ciśnieniem (PEEP 10 cmH2O) PRZED dekompresją opłucnej.",
        "B) Nakłucie igłą 14G w V przestrzeni międzyżebrowej w linii pachowej przedniej lub pachowej środkowej.",
        "C) Podanie 100% tlenu przez szczelną maskę z rezerwuarem o przepływie tlenu wynoszącym 15 litrów na minutę.",
        "D) Wykonanie szybkiego protokołu eFAST przyłóżkową głowicą celem wykluczenia tamponady osierdzia.",
        "E) Ciągłe monitorowanie nieinwazyjnego ciśnienia tętniczego krwi, zapisu EKG oraz pulsoksymetrii."
      ]
    }
  ],
  19: [
    {
      qIdx: 5, // Q6
      newOpts: [
        "A) <55 mg/dl (1.4 mmol/l) ORAZ redukcja o co najmniej 50% w stosunku do wyjściowego stężenia LDL.",
        "B) <70 mg/dl (1.8 mmol/l) bez konieczności redukcji procentowej w stosunku do wartości wyjściowej.",
        "C) <100 mg/dl (2.6 mmol/l) pod warunkiem równoległego stosowania podwójnej terapii przeciwpłytkowej.",
        "D) <115 mg/dl (3.0 mmol/l) wyłącznie w przypadku pacjentów obciążonych współistniejącą cukrzycą.",
        "E) <130 mg/dl (3.4 mmol/l) przy jednoczesnym utrzymaniu stężenia triglicerydów poniżej 150 mg/dl."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Zwiększenie powrotu żylnego (preload) i ciśnienia w prawym przedsionku, co wymusza pasywny przepływ płucny.",
        "B) Odruchowe obkurczenie łożyska wieńcowego zapobiegające niekorzystnemu zjawisku podkradania krwi.",
        "C) Spadek lepkości krwi krążącej ułatwiający enzymatyczne rozpuszczanie skrzepliny w świetle stentu.",
        "D) Forsowne wypłukiwanie kwasu mlekowego z niedokrwionych miocytów i zapobieganie kwasicy metabolicznej.",
        "E) Bezpośrednia aktywacja receptorów beta-1-adrenergicznych w kardiomiocytach prawej i lewej komory serca."
      ]
    }
  ],
  20: [
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) W przedłużającym się napadzie dochodzi do internalizacji receptorów GABA-A i spadku wrażliwości na benzodiazepiny.",
        "B) Benzodiazepiny są w ciągu kilkunastu sekund całkowicie rozkładane przez enzymy produkowane w korze nerek.",
        "C) Następuje całkowite zablokowanie syntezy glutaminianu w korze mózgowej i wygaszenie transmisji jonowej.",
        "D) Dochodzi do gwałtownego zwapnienia bariery krew-mózg uniemożliwiającego przenikanie cząsteczek leku.",
        "E) Wzrasta gwałtownie stężenie wolnego wapnia w osoczu, co wywołuje chelatację i inaktywację cząsteczek leku."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "A) Zniesiono objawy ruchowe, lecz wyładowania w mózgu nadal trwają; konieczna jest śpiączka i monitorowanie cEEG.",
        "B) Ustąpienie drgawek oznacza pełne wyleczenie stanu padaczkowego i pozwala na natychmiastową ekstubację chorego.",
        "C. Zwiotczenie mięśni szkieletowych całkowicie chroni neurony kory mózgowej przed uszkodzeniem toksycznym.",
        "D) Wykonanie badania EEG po podaniu leków zwiotczających mięśnie jest obarczone ryzykiem zgonu i zakazane.",
        "E) Brak drgawek po leku zwiotczającym dowodzi, że obserwowany napad był wyłącznie symulacją ze strony chorego."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A) Płynoterapia krystaloidami i obserwacja; kwasica ustępuje samoistnie w ciągu 60–120 min po opanowaniu drgawek.",
        "B) Natychmiastowy wlew 500 ml 8.4% wodorowęglanu sodu w celu podwyższenia pH krwi tętniczej powyżej wartości 7.50.",
        "C) Dożylny wlew kwasu solnego lub chlorku amonu w celu natychmiastowego zobojętnienia nadmiaru zasad w osoczu.",
        "D) Pilna laparotomia zwiadowcza w trybie natychmiastowym z podejrzeniem ostrej martwicy jelit i zapalenia otrzewnej.",
        "E) Wdrożenie hemodializy z ultrafiltracją 5 litrów w celu mechanicznego usunięcia mleczanów z łożyska naczyniowego."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Zespół wlewu propofolu (PRIS – Propofol Infusion Syndrome).",
        "B) Zespół Guillaina-Barrégo (ostra polineuropatia demielinizacyjna).",
        "C) Ostre pęknięcie śledziony w przebiegu mononukleozy zakaźnej.",
        "D) Zespół Goodpasture'a (przeciwciała przeciw błonie podstawnej).",
        "E) Otępienie naczyniopochodne w przebiegu zaawansowanej angiopatii."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A) Włożenie twardego drewnianego przedmiotu lub łyżki między zęby chorego w celu ochrony języka przed przygryzieniem.",
        "B) Zabezpieczenie głowy przed urazem, udrożnienie dróg oddechowych bez wkładania czegokolwiek do ust i tlenoterapia.",
        "C) Podanie do ust pacjenta płynnej czekolady lub słodzonego napoju w celu natychmiastowego wyrównania hipoglikemii.",
        "D) Forsowne skrępowanie rąk i nóg pasami unieruchamiającymi w celu mechanicznego stłumienia wyładowań mięśniowych.",
        "E) Rozpoczęcie natychmiastowych głębokich uciśnięć klatki piersiowej w tempie 120/min u pacjenta z zachowanym tętnem."
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
    if (!updates[cid]) continue;

    console.log(`Applying updates to Case #${cid} (${f})...`);
    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);

    updates[cid].forEach(up => {
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

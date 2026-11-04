const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const updates = {
  43: [
    {
      qIdx: 2, // Q3
      opts: [
        "A) Cyprofloksacyna w monoterapii doustnej w dawce 500 mg co 12 godzin przez 7 dni w warunkach leczenia ambulatoryjnego.",
        "B) Beta-laktam aktywny przeciw pneumokokom (np. ceftriakson lub cefotaksym lub amoksycylina z klawulanianem) w skojarzeniu z makrolidem (np. klarytromycyną lub azytromycyną) dożylnie.",
        "C) Wankomycyna w monoterapii doustnej w dawce 125 mg 4 razy na dobę pod osłoną probiotyków drożdżowych.",
        "D) Trimetoprim z sulfametoksazolem (kotrimoksazol) w dawce 960 mg co 12 godzin dożylnie w monoterapii pierwszego rzutu.",
        "E) Gentamycyna w monoterapii domięśniowej w pojedynczej dawce dobowej 5 mg/kg masy ciała bez leków beta-laktamowych."
      ],
      correctIdx: 1
    },
    {
      qIdx: 3, // Q4
      opts: [
        "A) Wybitna hiperkaliemia z kwasicą oddechową i obustronnym porażeniem wiotkim mięśni ksobnych kończyn górnych.",
        "B) Objawy żołądkowo-jelitowe (wodnista biegunka, bóle brzucha), hiponatremia oraz podwyższenie aktywności aminotransferaz.",
        "C) Ropne zapalenie okostnej zęba trzonowego powikłane ropowicą dna jamy ustnej i zespołem Lemierre'a.",
        "D) Mnogie pęcherzowe i grudkowe wykwity skórne na powierzchni dłoniowej rąk i podeszwach stóp.",
        "E) Izolowana nadpłytkowość ze wzrostem liczby płytek krwi powyżej 800 G/l bez innych odchyleń morfologicznych."
      ],
      correctIdx: 1
    },
    {
      qIdx: 4, // Q5
      opts: [
        "A) Rozległą odmę opłucnową z całkowitym uciskiem i zapadnięciem miąższu płucnego oraz przemieszczeniem śródpiersia.",
        "B) Uwidocznienie drożnych, wypełnionych powietrzem oskrzeli na tle zagęszczonego, pozbawionego powietrza miąższu płucnego w przebiegu zapalenia płatowego.",
        "C) Przerost i przeciążenie prawej komory serca z poszerzeniem pnia tętnicy płucnej i tętnic płatowych dolnych.",
        "D) Ograniczone otorbione zbiorowisko płynu wysiękowego w poziomej lub skośnej szczelinie międzypłatowej płuca.",
        "E) Pourazowe pęknięcie ściany tchawicy z odmą podskórną tkanek miękkich szyi i odmą śródpiersiową."
      ],
      correctIdx: 1
    },
    {
      qIdx: 5, // Q6
      opts: [
        "A) Zaawansowany wiek metrykalny pacjenta przekraczający 75. rok życia przy stabilnym stanie ogólnym.",
        "B) Wstrząs septyczny wymagający zastosowania leków obkurczających naczynia (wazopresorów) lub konieczność inwazyjnej wentylacji mechanicznej.",
        "C) Gorączka hektyczna z temperaturą ciała przekraczającą 39,5°C w połączeniu z dreszczami.",
        "D) Izolowany wzrost stężenia prokalcytoniny w surowicy powyżej 2,0 ng/ml bez objawów niewydolności narządowej.",
        "E) Uporczywy wilgotny kaszel z obfitym odkrztuszaniem ropnej plwociny o żółto-zielonkawym zabarwieniu."
      ],
      correctIdx: 1
    },
    {
      qIdx: 7, // Q8
      opts: [
        "A) Oznaczenie stężenia ciał ketonowych w pojedynczej porannej próbce moczu metodą paskową.",
        "B) Test immunochromatograficzny na obecność antygenu otoczkowego Streptococcus pneumoniae w moczu chorego.",
        "C) Pomiar dobowego wydalania kwasu moczowego i fosforanów w zbiórce dobowej moczu.",
        "D) Test elektroforezy białek moczu w kierunku obecności łańcuchów lekkich immunoglobulin (białka Bence-Jonesa).",
        "E) Mikroskopowe badanie osadu moczu pod kątem obecności patologicznych wałeczków woskowych i erytrocytarnych."
      ],
      correctIdx: 1
    },
    {
      qIdx: 10, // Q11
      opts: [
        "A) Cichy szmer pęcherzykowy bez obecności jakichkolwiek zjawisk akustycznych dodatkowych przy osłuchiwaniu.",
        "B) Patologiczny szmer oskrzelowy, wzmożone drżenie piersiowe (fremitus pectoralis) oraz dźwięczne rzężenia drobnobańkowe.",
        "C) Całkowite zniesienie drżenia piersiowego i wypuk bębenkowy nad wszystkimi polami płucnymi chorego.",
        "D) Szorstkie tarcie opłucnowe słyszalne wyłącznie nad rzutem koniuszka serca zsynchronizowane z oddechem.",
        "E) Rozlane, zmienne akustycznie świsty i furczenia wydechowe ustępujące całkowicie po odkrztuszeniu wydzieliny."
      ],
      correctIdx: 1
    }
  ],
  44: [
    {
      qIdx: 1, // Q2
      opts: [
        "A) Gwałtownym zblednięciem kończyny dolnej po uniesieniu jej do kąta 45 stopni w próbie niedokrwiennej Ratschowa.",
        "B) Nasileniem zaczerwienienia twarzy, poszerzeniem żył szyjnych i dusznością po obustronnym uniesieniu rąk powyżej głowy przez 1 minutę.",
        "C) Zgięciem grzbietowym palucha z wachlarzowatym odwiedzeniem pozostałych palców przy drażnieniu podeszwy stopy (objaw Babińskiego).",
        "D) Fizjologicznym wzrostem skurczowego ciśnienia tętniczego o co najmniej 30 mmHg w trakcie fazy głębokiego wdechu.",
        "E) Zanikiem wyczuwalnego tętna na tętnicy promieniowej po maksymalnym obrocie głowy w stronę badaną (objaw Adsona)."
      ],
      correctIdx: 1
    },
    {
      qIdx: 2, // Q3
      opts: [
        "A) Hiperosmolalność osocza przekraczająca 300 mOsm/kg H2O przy jednoczesnym odwodnieniu hipertonicznym.",
        "B) Hiponatremia hipoosmotyczna z nieadekwatnie wysoką osmolalnością moczu (>100 mOsm/kg H2O) i wydalaniem sodu w moczu > 30 mmol/l przy klinicznej euwolemii.",
        "C) Ciężka hiperkaliemia powyżej 6,5 mmol/l połączona z kwasicą metaboliczną i hiperfosfatemią w osoczu.",
        "D) Wybitnie wysokie stężenie kwasu moczowego w surowicy (>10 mg/dl) w przebiegu zespołu lizy guza.",
        "E) Izolowany wzrost stężenia hormonu tyreotropowego (TSH) powyżej 20 mIU/l przy prawidłowych wolnych hormonach."
      ],
      correctIdx: 1
    },
    {
      qIdx: 4, // Q5
      opts: [
        "A) Masywnym pourazowym krwiakiem podtwardówkowym z przemieszczeniem struktur mózgowia i wklinowaniem we wcięcie namiotu.",
        "B) Spastycznym porażeniem czterokończynowym, porażeniem opuszkowym (zaburzenia połykania i mowy) oraz zespołem zamknięcia.",
        "C) Ostrą niewydolnością kory nadnerczy pod postacią przełomu addisonoidalnego z hipotensją oporną na płynoterapię.",
        "D) Martwiczym zapaleniem trzustki z rozległymi ogniskami martwicy tłuszczowej w przestrzeni zaotrzewnowej.",
        "E) Krytycznym niedokrwieniem obwodowym kończyn dolnych w mechanizmie uogólnionego skurczu tętnic mięśniowych."
      ],
      correctIdx: 1
    },
    {
      qIdx: 6, // Q7
      opts: [
        "A) Chirurgiczne wycięcie żyły głównej górnej bez rekonstrukcji naczyniowej z podwiązaniem obu żył ramienno-głowowych.",
        "B) Przezskórne wewnątrznaczyniowe wszczepienie stentu (SVC stenting) do żyły głównej górnej z natychmiastowym odbarczeniem zastoju.",
        "C) Odbarczenie przez przezskórne nakłucie worka osierdziowego i ewakuację płynu tamponującego prawe serce.",
        "D) Dożylny wlew 20% roztworu mannitolu w dawce frakcjonowanej kontynuowany bez przerwy przez 14 kolejnych dni.",
        "E) Zastosowanie zewnętrznej elastycznej opaski uciskowej na szyję chorego w celu zmniejszenia napływu krwi żylnej."
      ],
      correctIdx: 1
    },
    {
      qIdx: 7, // Q8
      opts: [
        "A) CD20(+), CD3(+), antygen wielkocząsteczkowy CD45(+) oraz brak ekspresji markerów wewnątrzplazmatycznych.",
        "B) Synaptofizyna(+), Chromogranina A(+), CD56(+), wysoki indeks Ki-67 (>80%) oraz ekspresja czynnika TTF-1.",
        "C) Nadekspresja receptora naskórkowego czynnika wzrostu HER2(+++) oraz silna ekspresja receptora estrogenowego ER(+).",
        "D) Kalretynina(+), Wilms Tumor 1 (WT1)(+), mezotelina(+) oraz cytokeratyna 5/6(+) typowa dla międzybłoniaka opłucnej.",
        "E) Desmina(+), Miogenina(+), MyoD1(+) oraz ekspresja swoistej enolazy mięśniowej w komórkach wrzecionowatych."
      ],
      correctIdx: 1
    },
    {
      qIdx: 9, // Q10
      opts: [
        "A) Zmniejszenie ryzyka wystąpienia zatorowego udaru niedokrwiennego mózgu w mechanizmie skrzeplin przyściennych.",
        "B) Zmniejszenie ryzyka rozwoju przerzutów do ośrodkowego układu nerwowego i poprawa całkowitego przeżycia u chorych z dobrą odpowiedzią na chemioterapię.",
        "C) Zapobieganie zakażeniom bakteryjnym i grzybiczym opon mózgowo-rdzeniowych w okresie mielosupresji po chemioterapii.",
        "D) Pobudzenie proliferacji i regeneracji komórek astrogleju oraz neuronów uszkodzonych przez cytostatyki.",
        "E) Opanowanie lekoopornej padaczki poudarowej oraz redukcja ogniskowych napadów drgawkowych u pacjenta."
      ],
      correctIdx: 1
    }
  ],
  45: [
    {
      qIdx: 2, // Q3
      opts: [
        "A) Tak, bezwzględnie konieczna jest diagnostyczna torakotomia otwarta z klinową resekcją miąższu płucnego w celu oceny ziarniniaków.",
        "B) Nie, klasyczny zespół Löfgrena cechuje się swoistością >95% i pozwala na pewne rozpoznanie kliniczne bez weryfikacji histopatologicznej.",
        "C) Tak, standardem jest wykonanie przezskórnej biopsji gruboigłowej miąższu wątroby pod kontrolą ultrasonograficzną.",
        "D) Tak, konieczne jest chirurgiczne pobranie wycinka torebki stawowej ze zmienionego zapalnie stawu skokowego.",
        "E) Tak, procedurą obowiązkową przed włączeniem jakiegokolwiek leczenia jest trepanobiopsja szpiku z talerza kości biodrowej."
      ],
      correctIdx: 1
    },
    {
      qIdx: 3, // Q4
      opts: [
        "A) Ektopowe niekontrolowane wydzielanie nienowotworowego parathormonu (PTH) przez komórki nabłonka migawkowego oskrzeli.",
        "B) Autonomiczna synteza aktywnego kalcytriolu (1,25(OH)2D3) przez enzym 1-alfa-hydroksylazę obecny w makrofagach ziarniniaków.",
        "C) Pierwotna gruczołowa nadczynność przytarczyc wywołana obecnością pojedynczego gruczolaka komórek głównych.",
        "D) Zmniejszone cewkowe wydalanie jonów wapnia przez nerki wywołane bezpośrednim toksycznym działaniem konwertazy ACE.",
        "E) Przyspieszona osteoliza kości długa wywołana rozsianymi ogniskami osteolitycznymi w przebiegu przerzutów nowotworowych."
      ],
      correctIdx: 1
    },
    {
      qIdx: 6, // Q7
      opts: [
        "A) Gorączką, obustronnym powiększeniem ślinianek przyusznych, zapaleniem przedniego odcinka błony naczyniowej oka oraz porażeniem nerwu twarzowego (VII).",
        "B) Sinofioletowymi, naciekowymi zmianami guzowatymi skóry nosa i policzków (lupus pernio) z towarzyszącym zniekształceniem chrząstek.",
        "C) Masywnym obrzękiem powiek i szyi, poszerzeniem naczyń żylnych klatki piersiowej i dusznością w mechanizmie kołnierza Stokesa.",
        "D) Przewlekłym, symetrycznym zapaleniem stawów krzyżowo-biodrowych u młodych mężczyzn z obecnością antygenu zgodności tkankowej HLA-B27.",
        "E) Napadowym blednięciem, a następnie sinicą i przekrwieniem dystalnych części palców po ekspozycji na zimno (objaw Raynauda)."
      ],
      correctIdx: 0
    },
    {
      qIdx: 7, // Q8
      opts: [
        "A) Toczeń rumieniowaty układowy (SLE) z obecnością przeciwciał anty-dsDNA rozwijający się równolegle u chorego z sarkoidozą.",
        "B) Fioletowo-sine, stwardniałe nacieki guzowato-tarczkowe na nosie, policzkach i uszach o przewlekłym charakterze.",
        "C) Odmrożenie IV stopnia tkanek dystalnych twarzy u predysponowanych pacjentów z upośledzoną termoregulacją obwodową.",
        "D) Rozlane, plackowate bliznowaciejące łysienie skóry owłosionej głowy o podłożu komórkowej reakcji autoimmunologicznej.",
        "E) Przewlekłe wrzodziejące zapalenie kątów ust wywołane oportunistycznym zakażeniem drożdżakami Candida albicans."
      ],
      correctIdx: 1
    }
  ],
  46: [
    {
      qIdx: 0, // Q1
      opts: [
        "A) Zmienne akustycznie świsty i furczenia wydechowe słyszalne w obu polach płucnych ustępujące po kaszlu.",
        "B) Obustronne, dźwięczne, późnowdechowe trzeszczenia o typie 'rozpinania rzepów' (velcro crackles) słyszalne głównie u podstawy płuc.",
        "C) Wypuk bębenkowy z wybitnym symetrycznym osłabieniem szmerów oddechowych bez dźwięków dodatkowych.",
        "D) Głośny, szorstki szmer wdechowy słyszalny najgłośniej nad krtanią i górną częścią mostka (stridor).",
        "E) Szmer pęcherzykowy prawidłowy bez jakichkolwiek zjawisk akustycznych patologicznych w badaniu stetoskopowym."
      ],
      correctIdx: 1
    },
    {
      qIdx: 1, // Q2
      opts: [
        "A) Rozlane, symetryczne zacienienia miąższowe typu matowej szyby bez towarzyszących cech architektonicznego zniszczenia płuc.",
        "B) Obecność objawu 'plastra miodu' (honeycombing) zlokalizowanego podopłucnowo i przypodstawnie z rozstrzeniami z pociągania.",
        "C) Mnogie cienkościenne jamy ze ścianami o grubości przekraczającej 15 mm zlokalizowane wyłącznie w szczytach płuc.",
        "D) Drobne guzki śródzrazikowe tworzące obraz pączkującego drzewa (tree-in-bud) typowy dla zapalenia oskrzelików.",
        "E) Izolowane, masywne powiększenie węzłów chłonnych wnęk i śródpiersia bez jakichkolwiek zmian w miąższu płucnym."
      ],
      correctIdx: 1
    },
    {
      qIdx: 3, // Q4
      opts: [
        "A) Schemat ten doprowadził do trwałej remisji i całkowitego wyleczenia ze zwłóknienia u ponad 80% włączonych pacjentów.",
        "B) Schemat ten spowodował istotny wzrost śmiertelności oraz częstości hospitalizacji, w związku z czym jest BEZWZGLĘDNIE ZAKAZANY w IPF.",
        "C) Schemat ten okazał się metodą terapeutyczną o skuteczności klinicznej w pełni równoważnej transplantacji płuc.",
        "D) Schemat ten został zarejestrowany jako leczenie pierwszego wyboru wyłącznie u kobiet ciężarnych z rozpoznaniem UIP.",
        "E) Schemat ten nie wykazał żadnych istotnych statystycznie różnic w przeżyciu w porównaniu z placebo i pozostał opcjonalny."
      ],
      correctIdx: 1
    },
    {
      qIdx: 4, // Q5
      opts: [
        "A) Klasyczny zespół obturacyjny ze spadkiem wskaźnika Tiffeneau (FEV1/FVC < 70%) oraz wybitnym wzrostem oporu dróg oddechowych.",
        "B) Zespół restrykcyjny charakteryzujący się obniżeniem całkowitej pojemności płuc (TLC < 80% wartości należnej) przy prawidłowym lub podwyższonym wskaźniku FEV1/FVC.",
        "C) Prawidłowa całkowita pojemność płuc (TLC) z izolowanym, masywnym wzrostem objętości zalegającej (RV > 150% normy).",
        "D) Izolowane zaburzenie pojemności dyfuzyjnej dla tlenku węgla (DLCO) bez jakichkolwiek zmian objętości płucnych.",
        "E) Zwiększenie podatności statycznej i dynamicznej tkanki płucnej powyżej 150% wartości należnej dla wieku i płci."
      ],
      correctIdx: 1
    },
    {
      qIdx: 6, // Q7
      opts: [
        "A) Tak, bezwzględnie konieczne jest wykonanie klasycznej otwartej torakotomii z pobraniem co najmniej 3 wycinków miąższu.",
        "B) Nie, pewny wzorzec UIP w HRCT ma swoistość >95% dla histopatologicznego UIP, co pozwala postawić rozpoznanie IPF przez konsylium MDD bez biopsji chirurgicznej.",
        "C) Tak, standardem jest wykonanie przezoskrzelowej biopsji aspiracyjnej cienkoigłowej (TBNA) pod kontrolą USG wewnątrzoskrzelowego.",
        "D) Tak, konieczne jest wykonanie chirurgicznej mediastinoskopii z oceną cytologiczną węzłów chłonnych podostrogowych.",
        "E) Procedurą wymaganą do postawienia ostatecznego rozpoznania jest wyłącznie pobranie wycinka z błony śluzowej małżowiny nosowej."
      ],
      correctIdx: 1
    },
    {
      qIdx: 9, // Q10
      opts: [
        "A) Wrodzoną anomalią rozwojową pierścieni chrzęstnych ściany oskrzeli prowadzącą do ich samoistnego zwiotczenia.",
        "B) Mechaniczne rozciągnięcie i poszerzenie światła oskrzeli i oskrzelików wywołane kurczeniem się otaczającej zwłókniałej tkanki płucnej.",
        "C) Przewlekłym destrukcyjnym zakażeniem bakteryjnym wywołanym przez Pseudomonas aeruginosa w przebiegu mukowiscydozy.",
        "D) Spastycznym odwracalnym skurczem mięśniówki gładkiej drobnych dróg oddechowych w reakcji na alergeny wziewne.",
        "E) Pourazowym pęknięciem ściany oskrzela głównego powstałym w mechanizmie nagłego tępego urazu klatki piersiowej."
      ],
      correctIdx: 1
    }
  ],
  47: [
    {
      qIdx: 0, // Q1
      opts: [
        "A) 2 miesiące: RIPE (Ryfampicyna, Izoniazyd, Pirazynamid, Etambutol), następnie 4 miesiące: RI (Ryfampicyna, Izoniazyd) – łącznie 6 miesięcy terapii.",
        "B) 12 miesięcy monoterapii doustnym izoniazydem podawanym raz na dobę z suplementacją witaminy B6 u każdego pacjenta.",
        "C) 3 tygodnie dożylnego skojarzenia ceftriaksonu z azytromycyną podawanych w warunkach szpitalnych w izolatce z podciśnieniem.",
        "D) 24 miesiące ciągłego leczenia schematem pięciolekowym obejmującym fluorochinolony i leki aminoglikozydowe drugiej linii.",
        "E) 6 miesięcy monoterapii etambutolem w dawce 15 mg/kg masy ciała na dobę pod ścisłą kontrolą ostrości widzenia."
      ],
      correctIdx: 0
    },
    {
      qIdx: 3, // Q4
      opts: [
        "A) Pomarańczowo-czerwone zabarwienie moczu, śliny, potu i łez (oraz trwałe zabarwienie miękkich soczewek kontaktowych).",
        "B) Trwałe, plackowate wypadanie włosów i brwi ustępujące dopiero po wielu miesiącach od zakończenia pełnego leczenia.",
        "C) Napadowa sinica dystalnych części palców i bolesne owrzodzenia troficzne opuszek palców po ekspozycji na zimno.",
        "D) Masywny, włóknisty przerost dziąseł utrudniający żucie i wymagający regularnych zabiegów chirurgii periodontologicznej.",
        "E) Autoimmunologiczny zespół ciężkiej suchości jamy ustnej i spojówek z całkowitym zanikiem wydzielania gruczołów."
      ],
      correctIdx: 0
    },
    {
      qIdx: 4, // Q5
      opts: [
        "A) Kiłowym tętniakiem aorty wstępującej z niszczeniem przylegających chrząstek żeber i przedniej ściany klatki piersiowej.",
        "B) Tętniak rzekomy odgałęzienia tętnicy płucnej w ścianie jamy gruźliczej, którego pęknięcie prowadzi do masywnego, zagrażającego życiu krwioplucia.",
        "C) Miażdżycowym tętniakiem pnia tętnicy śledzionowej ulegającym erozji do tylnej ściany żołądka z krwotokiem do przewodu.",
        "D) Wrodzonym tętniakiem workowatym tętnic koła Willisa ulegającym pęknięciu w przebiegu gruźliczego zapalenia opon.",
        "E) Pourazowym tętniakiem wolnej ściany prawej komory serca rozwijającym się wtórnie do zapalenia mięśnia sercowego."
      ],
      correctIdx: 1
    },
    {
      qIdx: 9, // Q10
      opts: [
        "A) Dodatni wynik testu IGRA pozwala w sposób pewny odróżnić aktywną gruźlicę płuc od utajonego zakażenia prątkiem (LTBI).",
        "B) Testy IGRA opierają się na pomiarze interferonu gamma uwalnianego przez limfocyty T po stymulacji swoistymi antygenami prątka (ESAT-6, CFP-10) i nie dają wyników fałszywie dodatnich po szczepieniu BCG.",
        "C) Ujemny wynik testu IGRA ze stuprocentową pewnością wyklucza czynną gruźlicę u chorego z głębokim niedoborem odporności w AIDS.",
        "D) Test IGRA wykonuje się rutynowo z głębokiego wymazu ze śluzówki nosogardła pobieranego jałową wymazówką z dakronu.",
        "E) Test IGRA całkowicie eliminuje konieczność wykonywania mikroskopowego i hodowlanego badania plwociny u pacjentów z kaszlem."
      ],
      correctIdx: 1
    },
    {
      qIdx: 10, // Q11
      opts: [
        "A) Wzrost aktywności aminotransferaz (AST/ALT) przekraczający 1,5-krotnie górną granicę normy u pacjenta całkowicie bezobjawowego.",
        "B) Wzrost aktywności aminotransferaz (AST/ALT) > 3x powyżej górnej granicy normy z objawami klinicznymi (żółtaczka, nudności, bóle brzucha) LUB > 5x powyżej normy bez objawów.",
        "C) Izolowany spadek stężenia bilirubiny całkowitej w surowicy poniżej progu oznaczalności przy prawidłowych próbach wątrobowych.",
        "D) Każdy przejściowy wzrost stężenia mocznika i kreatyniny w surowicy krwi bez towarzyszących zmian w aktywności transaminaz.",
        "E) Pojawienie się fizjologicznego pomarańczowo-czerwonego zabarwienia moczu po przyjęciu pierwszej dawki ryfampicyny."
      ],
      correctIdx: 1
    }
  ],
  48: [
    {
      qIdx: 3, // Q4
      opts: [
        "A) Liniowe pęknięcie kości obojczyka lub I żebra z przemieszczeniem odłamów kostnych w stronę szczytu opłucnej.",
        "B) Górna granica cienia wolnego płynu w jamie opłucnej, biegnąca łukowato ku górze i do boku w kierunku dołu pachowego w projekcji PA w pozycji stojącej.",
        "C) Pozioma linia wyznaczająca granicę powietrza i płynu pod zwiększonym ciśnieniem w wentylowej odmie opłucnowej.",
        "D) Linia poprzecznego pęknięcia dolnego odcinka ściany przełyku w zespole Boerhaavego z obecnością gazu w śródpiersiu.",
        "E) Prawa granica sylwetki cienia sercowo-naczyniowego odpowiadająca powiększeniu prawego przedsionka w kardiomegalii."
      ],
      correctIdx: 1
    },
    {
      qIdx: 4, // Q5
      opts: [
        "A) Tkankowy aktywator plazminogenu (tPA / alteplaza) w skojarzeniu z dornazą alfa (rekombinowaną ludzką DNazą).",
        "B) Niefrakcjonowana heparyna sodowa podawana łącznie z antybiotykiem aminoglikozydowym (tobramycyną) przez dren.",
        "C) Hydrokortyzon w dawce 500 mg rozpuszczony w jałowym 0,9% roztworze chlorku sodu do płukania jamy opłucnej.",
        "D) Streptokinaza podawana w ciągłym wlewie dożylnym w celu ogólnoustrojowej aktywacji fibrynolizy u chorego.",
        "E) Roztwór wodorowęglanu sodu 8,4% z dodatkiem insuliny krótko działającej w celu zakwaszenia środowiska ropniaka."
      ],
      correctIdx: 0
    },
    {
      qIdx: 6, // Q7
      opts: [
        "A) Całkowicie przezroczysty, bezbarwny płyn o skrajnie niskim odczynie pH < 6,5 i braku jakichkolwiek elementów morfotycznych.",
        "B) Mlecznobiały płyn o stężeniu trójglicerydów > 110 mg/dl (1.24 mmol/l) i obecności chylomikronów w badaniu elektroforetycznym.",
        "C) Krwisty płyn wysiękowy, w którym odsetek erytrocytów przekracza 90% hematokrytu krwi obwodowej pacjenta.",
        "D) Czysta treść żółciowa o wysokim stężeniu bilirubiny całkowitej powstała wskutek przetoki żółciowo-opłucnowej.",
        "E) Płyn opalizujący zawierający liczne igłowate kryształy moczanu sodu wykazujące ujemną dwójłomność światła."
      ],
      correctIdx: 1
    },
    {
      qIdx: 7, // Q8
      opts: [
        "A) Bakterie beztlenowe jamy ustnej (np. Fusobacterium, Prevotella, Peptostreptococcus) oraz Streptococcus z grupy anginosus (milleri).",
        "B) Tlenowa pałeczka ropy błękitnej (Pseudomonas aeruginosa) wytwarzająca barwnik piocyjaninę i tworząca gęsty biofilm.",
        "C) Pałeczka Legionella pneumophila namnażająca się wewnątrzkomórkowo w makrofagach pęcherzykowych płuc.",
        "D) Bakteria atypowa Mycoplasma pneumoniae pozbawiona ściany komórkowej i niewrażliwa na beta-laktamy.",
        "E) Grzyb oportunistyczny Pneumocystis jirovecii wywołujący ciężkie zapalenie płuc u chorych z immunosupresją."
      ],
      correctIdx: 0
    }
  ],
  49: [
    {
      qIdx: 2, // Q3
      opts: [
        "A) Zwiększa ciśnienie cząstkowe wolnego azotu w kapilarach opłucnej, co powoduje fizyczne wypychanie powietrza na zewnątrz.",
        "B) Obniża ciśnienie cząstkowe azotu we krwi włośniczkowej (wypłukiwanie azotu), co zwiększa gradient ciśnień i przyspiesza dyfuzję azotu z jamy opłucnej do naczyń.",
        "C) Odruchowo stymuluje receptory kaszlu w ścianie oskrzeli i ułatwia dynamiczne rozprężenie miąższu płucnego w fazie wydechu.",
        "D) Wywołuje silny skurcz tętniczek oskrzelowych zmniejszający przepływ krwi przez nieutlenowane obszary miąższu płuca.",
        "E) Wywiera bezpośrednie działanie miejscowo znieczulające na receptory bólowe zlokalizowane w blaszce ściennej opłucnej."
      ],
      correctIdx: 1
    },
    {
      qIdx: 3, // Q4
      opts: [
        "A) Natychmiastowa klasyczna torakotomia otwarta z anatomiczną resekcją zmienionego płata płuca w trybie pilnym.",
        "B) Prosta aspiracja strzykawkowa za pomocą kaniuli (needle aspiration) LUB drenaż klatki piersiowej cienkim drenem (≤14F).",
        "C) Wprowadzenie grubego drenu o rozmiarze 36F z następowym podłączeniem agresywnego aktywnego drenażu ssącego.",
        "D) Wyłącznie postępowanie zachowawcze i obserwacja w trybie ambulatoryjnym bez jakichkolwiek procedur inwazyjnych.",
        "E) Wdrożenie wziewnego budezonidu w wysokich dawkach w celu zahamowania odczynu zapalnego w pęcherzykach płucnych."
      ],
      correctIdx: 1
    },
    {
      qIdx: 5, // Q6
      opts: [
        "A) Ze względu na niebezpieczeństwo wystąpienia ciężkiej hipotermii głębokiej po kontakcie z zimną wodą morską.",
        "B) Ponieważ rozprężanie gazu podczas wynurzania (zgodnie z prawem Boyle'a) przy obecności pęcherzy podopłucnowych grozi natychmiastową odmą prężną, pęknięciem płuca i śmiertelnym zatorem gazowym mózgu.",
        "C) Ze względu na bezpośrednie toksyczne oddziaływanie soli morskiej na nabłonek dróg oddechowych w razie aspiracji wody.",
        "D) Ponieważ ucisk elastycznego neoprenowego skafandra nurkowego na klatkę piersiową wywołuje mechaniczne zaciśnięcie opłucnej.",
        "E) Ze względu na wysokie ryzyko rozwoju przewlekłego ropnego zapalenia ucha środkowego i uszkodzenia błony bębenkowej."
      ],
      correctIdx: 1
    },
    {
      qIdx: 6, // Q7
      opts: [
        "A) Tomografia komputerowa klatki piersiowej wysokiej rozdzielczości (HRCT) wykonana bez podania dożylnego kontrastu.",
        "B) Klasyczne zdjęcie rentgenowskie klatki piersiowej w projekcji PA wykonane w fazie maksymalnego forsownego wydechu.",
        "C) Przeglądowe badanie ultrasonograficzne jamy brzusznej z oceną ruchomości kopuł przepony w czasie oddychania.",
        "D) Scyntygrafia perfuzyjno-wentylacyjna płuc z użyciem makroagregatów albuminy znakowanych technetem-99m.",
        "E) Pozytonowa tomografia emisyjna (PET-CT) z podaniem znakowanej fluorem-18 deoksyglukozy w protokole onkologicznym."
      ],
      correctIdx: 0
    },
    {
      qIdx: 7, // Q8
      opts: [
        "A) Przez co najmniej 1 do 2 tygodni od całkowitego radiologicznego i klinicznego wyleczenia odmy (wg zaleceń BTS/FAA).",
        "B) Przez okres co najmniej 10 lat od momentu usunięcia drenu opłucnowego i uzyskania pełnego rozprężenia płuca.",
        "C) Wystarczy odczekać 30 minut od zakończenia zabiegu aspiracji pod warunkiem prawidłowej saturacji krwi tętniczej.",
        "D) Bezwzględny zakaz odbywania podróży lotniczych obowiązuje dożywotnio u każdego pacjenta po epizodzie odmy.",
        "E) Nie ma żadnych ograniczeń czasowych i pacjent może bezpiecznie lecieć bezpośrednio po wypisaniu ze szpitala."
      ],
      correctIdx: 0
    },
    {
      qIdx: 8, // Q9
      opts: [
        "A) PSP występuje u osób bez klinicznie jawnej choroby płuc w wywiadzie, podczas gdy SSP rozwija się jako powikłanie istniejącej przewlekłej choroby płuc.",
        "B) PSP występuje wyłącznie u kobiet w ciąży, podczas gdy SSP jest powikłaniem mechanicznym tępego urazu klatki piersiowej.",
        "C) SSP w żadnym przypadku klinicznym nie wymaga założenia drenażu opłucnowego, a PSP zawsze wymaga natychmiastowej torakotomii.",
        "D) W przebiegu PSP w jamie opłucnej zawsze obecny jest gęsty płyn ropny, podczas gdy w SSP jama opłucnej zawiera wyłącznie powietrze.",
        "E) W odmie wtórnej (SSP) ciśnienie w jamie opłucnej jest zawsze ujemne, a w odmie pierwotnej (PSP) zawsze silnie dodatnie."
      ],
      correctIdx: 0
    },
    {
      qIdx: 9, // Q10
      opts: [
        "A) Odmą opłucnową występującą wyłącznie w trakcie porodu siłami natury wskutek forsownego parcia w drugim okresie porodu.",
        "B) Nawracającą odmą opłucnową (zazwyczaj prawostronną) występującą w czasie krwawienia miesiączkowego (w ciągu 48-72h od początku miesiączki) w przebiegu endometriozy opłucnowej lub przeponowej.",
        "C) Odmą opłucnową wywołaną przyjmowaniem doustnych tabletek antykoncepcyjnych z powodu powikłań zatorowo-zakrzepowych płuc.",
        "D) Samoistnym pęknięciem pęcherzyków płucnych związanym z fizjologicznym spadkiem stężenia estrogenów w okresie pomenopauzalnym.",
        "E) Piorunującym zapaleniem opłucnej wywołanym wstępującym zakażeniem chlamydiami z narządów miednicy mniejszej."
      ],
      correctIdx: 1
    },
    {
      qIdx: 10, // Q11
      opts: [
        "A) Wielokrotne płukanie jamy opłucnej schłodzonym jałowym 0,9% roztworem chlorku sodu bez naruszania opłucnej.",
        "B) Mechaniczna abrazja opłucnej (pleural abrasion) LUB pleurektomia ścienna w połączeniu z talkowaniem (poudrage).",
        "C) Śródoperacyjne wstrzyknięcie hipertonicznego 40% roztworu glukozy do jamy opłucnej w celu wywołania obrzęku.",
        "D) Dopłucnowe podanie niefrakcjonowanej heparyny w celu zapobiegania formowaniu zrostów włóknikowych w opłucnej.",
        "E) Wypełnienie jamy opłucnej czystym sprężonym tlenem pod ciśnieniem w celu przyspieszenia resorpcji azotu."
      ],
      correctIdx: 1
    }
  ],
  50: [
    {
      qIdx: 2, // Q3
      opts: [
        "A) Wywołują gwałtowną, zagrażającą zatrzymaniem krążenia hiperkaliemię w mechanizmie porażenia pompy sodowo-potasowej.",
        "B) Obniżają napięcie mięśniówki gardła, hamują wybudzenia i ośrodek oddechowy, drastycznie wydłużając czas trwania bezdechów i pogłębiając hipoksemię.",
        "C) Powodują masywną biegunkę osmotyczną prowadzącą do ciężkiego odwodnienia izotonicznego i hipowolemii.",
        "D) Wchodzą w groźne interakcje farmakodynamiczne z kwasem askorbinowym, prowadząc do ostrej kwasicy cewkowej.",
        "E) Znacząco zwiększają łaknienie na sól kuchenną, co indukuje gwałtowny skok ciśnienia tętniczego w ciągu nocy."
      ],
      correctIdx: 1
    },
    {
      qIdx: 3, // Q4
      opts: [
        "A) Kardiomiopatia przerostowa z zawężaniem drogi odpływu lewej komory (HOCM) o podłożu genetycznym.",
        "B) Oporne na leczenie farmakologiczne nadciśnienie tętnicze z profilem 'non-dipper' lub 'riser' w badaniu ABPM.",
        "C) Nawracająca odma opłucnowa prężna rozwijająca się wtórnie do pękania pęcherzy rozedmowych szczytów płuc.",
        "D) Niebakteryjne zapalenie wsierdzia Libmana-Sacksa z obecnością jałowych wegetacji na zastawce mitralnej.",
        "E) Wrodzone wypadanie płatka zastawki mitralnej z obecnością kliku skurczowego i późnoskurczowego szmeru."
      ],
      correctIdx: 1
    },
    {
      qIdx: 4, // Q5
      opts: [
        "A) Średnia liczba epizodów bezdechu (apnea) i spłyceń oddychania (hypopnea) przypadająca na jedną godzinę efektywnego snu.",
        "B) Procentowy udział fazy snu paradoksalnego z szybkimi ruchami gałek ocznych (REM) w całkowitej strukturze snu.",
        "C) Maksymalna objętość powietrza wydmuchana z płuc w trakcie pierwszej sekundy natężonego wydechu (FEV1).",
        "D) Średnia częstotliwość akcji serca mierzona w monitorowaniu Holtera EKG w momentach nagłych nocnych wybudzeń.",
        "E) Liczba mimowolnych zmian pozycji ciała z bocznej na wznak zarejestrowana przez czujniki w trakcie nocy."
      ],
      correctIdx: 0
    },
    {
      qIdx: 5, // Q6
      opts: [
        "A) W bezdechu obturacyjnym brak jest przepływu powietrza POMIMO zachowanych ruchów oddechowych mięśni klatki piersiowej i brzucha, podczas gdy w bezdechu centralnym brak jest ZARÓWNO przepływu, JAK I wysiłku oddechowego.",
        "B) Epizod bezdechu obturacyjnego trwa w każdym przypadku krócej niż 5 sekund, podczas gdy bezdech centralny przekracza 60 sekund.",
        "C) W bezdechu centralnym natężenie chrapania jest znacznie większe i głośniejsze niż w klasycznym bezdechu obturacyjnym.",
        "D) Bezdech obturacyjny występuje wyłącznie w ciągu dnia podczas czuwania, podczas gdy bezdech centralny pojawia się tylko w nocy.",
        "E) Bezdech centralny w przeciwieństwie do obturacyjnego nigdy nie prowadzi do spadku saturacji krwi tętniczej (brak desaturacji)."
      ],
      correctIdx: 0
    },
    {
      qIdx: 8, // Q9
      opts: [
        "A) Z powodu nawykowego spożywania nadmiernych ilości płynów hipotonicznych bezpośrednio przed udaniem się na spoczynek.",
        "B) Silne ujemne ciśnienie w klatce piersiowej podczas prób wdechu przeciw zamkniętemu gardłu rozciąga przedsionki serca, stymulując wyrzut przedsionkowego peptydu natriuretycznego (ANP).",
        "C) W wyniku zaawansowanej przewlekłej niewydolności nerek z całkowitym zniszczeniem mechanizmu zagęszczania moczu w rdzeniu.",
        "D) Wskutek nawracających bezobjawowych zakażeń układu moczowego wywoływanych przez uropatogenne szczepy Escherichia coli.",
        "E) Z powodu całkowitego zablokowania nocnego wydzielania wazopresyny przez przysadkę mózgową na tle niedotlenienia mózgu."
      ],
      correctIdx: 1
    }
  ]
};

async function run() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  for (const f of files) {
    const cid = parseInt(f.match(/^(\d+)_/)[1], 10);
    if (!updates[cid]) continue;
    console.log(`Applying updates to Case #${cid} (${f})...`);
    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    const questions = c.lekQuestions || c.lek_questions || (c.quiz && c.quiz.questions) || [];

    updates[cid].forEach(up => {
      const q = questions[up.qIdx];
      if (!q) {
        console.error(`  Error: Q idx ${up.qIdx} not found in Case #${cid}`);
        return;
      }
      q.opts = up.opts;
      q.options = up.opts;
      if (up.correctIdx !== undefined) {
        q.correct = up.correctIdx;
        q.correctIdx = up.correctIdx;
      }
      if (up.exp) {
        q.exp = up.exp;
        q.expl = up.exp;
        q.explanation = up.exp;
      }
      console.log(`  ✓ Updated Q${up.qIdx + 1}`);
    });

    const encrypted = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
    fs.writeFileSync(path.join('cases', f), JSON.stringify(encrypted, null, 2), 'utf8');
    console.log(`✓ Case #${cid} successfully updated and re-encrypted.`);
  }
}

run();

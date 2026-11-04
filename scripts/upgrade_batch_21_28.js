const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const updates = {
  21: [
    {
      qIdx: 1, // Q2
      opts: [
        "A) 88 – 92 % (lub 85–90% u chorych z udokumentowaną przewlekłą, skrajną hiperkapnią w gazometrii).",
        "B) 94 – 98 % (standardowy przedział docelowy tlenoterapii u chorych bez ryzyka retencji dwutlenku węgla).",
        "C) 98 – 100 % (wartość docelowa zalecana wyłącznie przy ciężkim zatruciu tlenkiem węgla lub w odmie).",
        "D) Powyżej 96 % (przedział rekomendowany dawniej u pacjentów z ostrym zespołem wieńcowym bez hipoksemii).",
        "E) 80 – 85 % (przedział krytyczny wymagający natychmiastowej intubacji i inwazyjnej wentylacji mechanicznej)."
      ],
      correctIdx: 0
    },
    {
      qIdx: 4, // Q5
      opts: [
        "A) Ponieważ przepływ 6–8 l/min 100% tlenu dostarcza wysokie stężenie FiO2, co podczas 15-minutowej inhalacji może wywołać gwałtowną retencję dwutlenku węgla i śpiączkę hiperkapniczną.",
        "B) Ponieważ czysty tlen medyczny powoduje utlenianie i szybką degradację cząsteczek salbutamolu w komorze nebulizatora, drastycznie zmniejszając biodostępność leku w drogach oddechowych.",
        "C) Ponieważ sprężone powietrze wywołuje efekt schłodzenia aerozolu, co obkurcza przekrwioną błonę śluzową oskrzeli i redukuje opór dróg oddechowych skuteczniej niż tlenoterapia.",
        "D) Ponieważ wysoki przepływ czystego tlenu w instalacji nebulizatora generuje ładunki elektrostatyczne niszczące surfaktant pęcherzykowy i nasilające niedodmę resorpcyjną.",
        "E) Ponieważ tlen wchodzi w niepożądane interakcje chemiczne z tworzywem komory inhalacyjnej, uwalniając lotne związki drażniące receptory czuciowe nerwu błędnego."
      ],
      correctIdx: 0
    },
    {
      qIdx: 7, // Q8
      opts: [
        "A) Zmniejszenie powinowactwa utlenowanej hemoglobiny do dwutlenku węgla, co powoduje uwalnianie CO2 z hemoglobiny do osocza i gwałtowny wzrost PaCO2.",
        "B) Zwiększenie powinowactwa hemoglobiny do tlenu (przesunięcie krzywej w lewo), uniemożliwiające dysocjację tlenu w mikrokrążeniu tkankowym mózgu.",
        "C) Odruchowy skurcz naczyń mikrokrążenia płucnego pod wpływem hiperoksji, prowadzący do nagłego wzrostu oporu naczyniowego i ostrego serca płucnego.",
        "D) Bezpośrednie toksyczne porażenie chemoreceptorów obwodowych kłębków szyjnych przez rodniki tlenowe, skutkujące nagłym bezdechem centralnym.",
        "E) Zahamowanie nerkowego wydalania jonów wodorowęglanowych wskutek spadku stężenia wodorotlenków, co prowadzi do ciężkiej kwasicy kanalikowej."
      ],
      correctIdx: 0
    },
    {
      qIdx: 8, // Q9
      opts: [
        "A) Bezwzględna liczba eozynofilów we krwi obwodowej ≥300 komórek/µl (wskazuje na składową zapalenia eozynofilowego).",
        "B) Całkowita liczba krwinek płytkowych (PLT) >450 000/µl (świadczy o toczącym się uogólnionym odczynie zapalnym naczyń).",
        "C) Stężenie hemoglobiny we krwi obwodowej >18 g/dl (wskazuje na wtórną czerwienicę w przebiegu przewlekłej hipoksemii).",
        "D) Odsetek monocytów w rozmazie krwi >15% (przewiduje wysokie ryzyko reaktywacji utajonego zakażenia gruźliczego).",
        "E) Bezwzględna liczba limfocytów CD4+ <200 komórek/µl (świadczy o ciężkim komórkowym niedoborze odporności chorego)."
      ],
      correctIdx: 0
    }
  ],
  22: [
    {
      qIdx: 4, // Q5
      opts: [
        "A) Jest bezwzględnie zalecanym standardem postępowania, ponieważ redukuje ryzyko powikłań infekcyjnych (SBP, sepsa), nawrotu krwotoku i zgonu.",
        "B) Jest błędem w sztuce lekarskiej i powinno być zaniechane, gdyż rutynowa antybiotykoterapia bez gorączki i leukocytozy selekcjonuje szczepy wielolekooporne.",
        "C) Jest wskazane wyłącznie u pacjentów ze stwierdzonym uprzednio nosicielstwem pałeczek ESBL lub zakażeniem wirusem zapalenia wątroby typu C (HCV).",
        "D) Wymaga jednoczesnego wdrożenia wankomycyny doustnie w celu całkowitej dekontaminacji przewodu pokarmowego przed zabiegiem endoskopowym.",
        "E) Może być stosowane wyłącznie po uzyskaniu ujemnych wyników posiewów krwi i płynu puchlinowego pobranych w pierwszej dobie hospitalizacji."
      ],
      correctIdx: 0
    },
    {
      qIdx: 8, // Q9
      opts: [
        "A) Ibuprofen (oraz inne niesteroidowe leki przeciwzapalne – NLPZ hamujące syntezę prostaglandyn nerkowych).",
        "B) Paracetamol (podawany doustnie w dobowych dawkach zredukowanych do 2,0 g/dobę u chorych bez aktywnego alkoholizmu).",
        "C) Tramadol (stosowany w obniżonych dawkach i wydłużonych odstępach czasowych z uwagi na upośledzony klirens).",
        "D) Buprenorfina (podawana w systemach transdermalnych jako lek opioidowy bezpieczny w zaburzeniach funkcji nerek).",
        "E) Morfina (podawana parenteralnie w małych dawkach frakcjonowanych pod ścisłym nadzorem wydolności oddechowej)."
      ],
      correctIdx: 0
    },
    {
      qIdx: 10, // Q11
      opts: [
        "A) 20% roztwór albuminy ludzkiej w dawce 8 g na każdy litr usuniętego płynu puchlinowego (łącznie 56 g albuminy w powolnym wlewie dożylnym).",
        "B) 0,9% roztwór chlorku sodu w objętości równej podwójnej ilości usuniętego płynu (łącznie 14 litrów krystaloidów w celu wypełnienia łożyska).",
        "C) Roztwór hydroksyetyloskrobi (HES 130/0,4) w dawce 1000 ml w celu szybkiego podwyższenia ciśnienia onkotycznego w łożysku naczyniowym.",
        "D) Świeżo mrożone osocze (FFP) w dawce 15 ml/kg masy ciała w celu uzupełnienia utraconych czynników krzepnięcia i białka całkowitego.",
        "E) 10% roztwór glukozy z dodatkiem chlorku potasu w ilości 40 mmol/l w celu jednoczesnego pokrycia zapotrzebowania kalorycznego pacjenta."
      ],
      correctIdx: 0
    }
  ],
  23: [
    {
      qIdx: 1, // Q2
      opts: [
        "A) Graniczne stężenie beta-hCG w surowicy (zwykle 1500–2000 mIU/ml dla TV-USG), powyżej którego w prawidłowej ciąży wewnątrzmacicznej pęcherzyk ciążowy musi być widoczny w badaniu USG.",
        "B) Graniczne stężenie progesteronu w surowicy (zwykle <15 ng/ml), poniżej którego dochodzi do nieuchronnego poronienia samoistnego niezależnie od lokalizacji trofoblastu.",
        "C) Wartość skurczowego ciśnienia tętniczego krwi (zwykle <90 mmHg), poniżej której badanie ginekologiczne we wziernikach jest bezwzględnie przeciwwskazane z powodu wstrząsu.",
        "D) Objętość wolnego płynu w zatoce Douglasa (zwykle >100 ml), która stanowi bezwzględne wskazanie do wykonania diagnostycznego nakłucia sklepienia pochwy (kuldoskopii).",
        "E) Minimalne stężenie wolnego estriolu w moczu dobowym pacjentki ciężarnej świadczące o pełnej dojrzałości surfaktantu w pęcherzykach płucnych rozwijającego się płodu."
      ],
      correctIdx: 0
    },
    {
      qIdx: 2, // Q3
      opts: [
        "A) Bezpośrednim podrażnieniem otrzewnej przeponowej przez wynaczynioną krew (haemoperitoneum) i przewodzeniem bodźców przez gałęzie nerwu przeponowego (C3–C5) do dermatomów szyjnych.",
        "B) Odruchowym skurczem tętnicy podobojczykowej prawej wywołanym gwałtownym wyrzutem amin katecholowych w reakcji na ostry ból podbrzusza i postępującą hipowolemię.",
        "C) Zatorowością mikrokrążenia płucnego wywołaną masywną penetracją fragmentów trofoblastu z uszkodzonego jajowodu do układu żyły głównej dolnej.",
        "D) Współistniejącym pourazowym zwichnięciem stawu ramienno-obojczykowego powstałym w mechanizmie upadku w trakcie nagłego omdlenia ortostatycznego.",
        "E) Tężyczkowym skurczem mięśnia czworobocznego grzbietu wywołanym ostrą hipokalcemią wtórną do obfitego wlewu preparatów zawierających cytrynian sodu."
      ],
      correctIdx: 0
    },
    {
      qIdx: 3, // Q4
      opts: [
        "A) Niestabilność hemodynamiczna pacjentki (objawy wstrząsu hipowolemicznego) lub cechy pęknięcia jajowodu z krwawieniem do otrzewnej.",
        "B) Brak przebytych ciąż i porodów w dotychczasowym wywiadzie położniczym u młodej pacjentki pragnącej zachować pełną płodność.",
        "C) Wiek pacjentki poniżej 35. roku życia w połączeniu z regularnymi cyklami miesiączkowymi i prawidłową rezerwą jajnikową (AMH).",
        "D) Wyjściowe stężenie podjednostki beta-hCG w surowicy krwi wynoszące poniżej 1500 mIU/ml przy powolnym przyroście w 48-godzinnej dynamice.",
        "E) Wymiar zmiany patologicznej w przydatkach nieprzekraczający 25 mm w pomiarze TV-USG bez uwidocznionej akcji serca zarodka."
      ],
      correctIdx: 0
    },
    {
      qIdx: 4, // Q5
      opts: [
        "A) Podać domięśniowo immunoglobulinę anty-D w dawce co najmniej 50 µg (lub standardową dawkę 150 µg) w ciągu maksymalnie 72 godzin od zabiegu.",
        "B) Podać kwas foliowy w wysokiej dawce 5 mg na dobę doustnie przez 3 kolejne miesiące w celu stymulacji hematopoezy i eliminacji alloprzeciwciał.",
        "C) Zastosować pilną leczniczą plazmaferezę z wymianą osocza w celu mechanicznego usunięcia krążących we krwi matki przeciwciał anty-RhD.",
        "D) Wdrożyć profilaktyczną dawkę heparyny drobnocząsteczkowej podskórnie przez 4 tygodnie w celu zablokowania reakcji antygen-przeciwciało.",
        "E) Odstąpić od podawania immunoglobuliny anty-D, ponieważ w pierwszym trymestrze ciąży fizjologicznie nie dochodzi do mikroprzecieków erytrocytów."
      ],
      correctIdx: 0
    },
    {
      qIdx: 6, // Q7
      opts: [
        "A) Centralnie zlokalizowane w jamie macicy zbiorowisko płynu lub krwi otoczone pojedynczą warstwą doczesnej, które nie zawiera pęcherzyka żółtkowego ani zarodka, występujące u 10–20% kobiet z ciążą ektopową.",
        "B) Prawidłowy wewnątrzmaciczny pęcherzyk ciążowy, który uległ zakażeniu bakteryjnemu na drodze wstępującej i wykazuje cechy obumarcia trofoblastu w obrazie ultrasonograficznym.",
        "C) Pęcherzyk ciążowy rozwijający się patologicznie w bliźnie po uprzednim cięciu cesarskim, grożący przedwczesnym pęknięciem dolnego odcinka mięśnia macicy.",
        "D) Wrodzoną anomalię anatomiczną jamy macicy pod postacią całkowitej przegrody włóknisto-mięśniowej dzielącej endometrium na dwie odrębne jamy.",
        "E) Równoczesną ciążę heterotopową, w której jeden pęcherzyk zagnieździł się w jamie macicy, a drugi rozwija się w bańce prawego jajowodu."
      ],
      correctIdx: 0
    },
    {
      qIdx: 8, // Q9
      opts: [
        "A) O ostrym, gwałtownym bólu pojawiającym się przy poruszaniu częścią pochwową szyjki macicy, wynikającym z napinania podrażnionej przez krew lub proces zapalny otrzewnej ściennej i więzadeł miednicy mniejszej.",
        "B) O głośnym szmerze naczyniowym słyszalnym podczas wprowadzania jałowego wziernika dopochwowego, wywołanym uciskiem na rozszerzone sploty żylne przymacicz.",
        "C) O gwałtownym, odruchowym skurczu mięśniówki gładkiej kanału szyjki macicy uniemożliwiającym wprowadzenie kaniuli biopsyjnej do jamy endometrium.",
        "D) O samoistnym pęknięciu torbieli retencyjnej Nabotha w trakcie palpacji dwuręcznej z wyciekiem treści śluzowo-ropnej do sklepienia pochwy.",
        "E) O patologicznym, bezbolesnym rozwieraniu ujścia zewnętrznego szyjki macicy powyżej 4 cm w pierwszym trymestrze ciąży (niewydolność cieśniowo-szyjkowa)."
      ],
      correctIdx: 0
    }
  ],
  24: [
    {
      qIdx: 0, // Q1
      opts: [
        "A) Pilne wykonanie angio-TK aorty piersiowo-brzusznej oraz dożylne podanie beta-blokera (np. esmololu) z jednoczesnym unikaniem leków przeciwpłytkowych i przeciwkrzepliwych.",
        "B) Natychmiastowe podanie 300 mg aspiryny, 180 mg tikagreloru i 5000 j.m. heparyny niefrakcjonowanej i.v. w podejrzeniu ostrego zespołu wieńcowego bez uniesienia odcinka ST.",
        "C) Skierowanie pacjenta na natychmiastową koronarografię przez tętnicę promieniową lewą po wstępnym wysyceniu dawką 600 mg klopidogrelu doustnie.",
        "D) Dożylne podanie rekombinowanego tkankowego aktywatora plazminogenu (alteplazy 100 mg we wlewie) w empirycznym podejrzeniu masywnej zatorowości płucnej.",
        "E) Wypisanie chorego do domu z zaleceniem doraźnego zażycia kaptoprilu 25 mg podjęzykowo i zgłoszenia się na rutynową kontrolę ciśnienia tętniczego w poradni POZ."
      ],
      correctIdx: 0
    },
    {
      qIdx: 2, // Q3
      opts: [
        "A) Ponieważ podanie samego wazodylatatora wywołuje odruchową tachykardię i zwiększa siłę wyrzutu lewej komory (dP/dt), co nasila propagację rozwarstwienia i grozi pęknięciem aorty.",
        "B) Ponieważ nitroprusydek sodu podany w monoterapii wywołuje trwałe zablokowanie receptorów adrenergicznych beta-1, uniemożliwiając późniejszą kontrolę rytmu serca.",
        "C) Ponieważ beta-bloker podany dożylnie aktywuje procesy fibrynolityczne w kanale rzekomym aorty, umożliwiając szybkie rozpuszczenie świeżych skrzeplin przyściennych.",
        "D) Ponieważ jednoczesne rozszerzenie naczyń bez blokady receptorów beta prowadzi do gwałtownego skurczu tętnic nerkowych i natychmiastowego bezmoczu przednerkowego.",
        "E) Kolejność podawania leków nie ma znaczenia klinicznego, pod warunkiem uzyskania ciśnienia skurczowego poniżej 140 mmHg w ciągu pierwszych 6 godzin leczenia."
      ],
      correctIdx: 0
    },
    {
      qIdx: 6, // Q7
      opts: [
        "A) Leczenie zachowawcze oparte na intensywnej farmakoterapii hipotensyjnej (beta-blokery i inne leki obniżające ciśnienie) oraz ścisłym monitorowaniu w warunkach OIT.",
        "B) Pilna operacja kardiochirurgiczna w trybie natychmiastowym z wykonaniem pełnej sternotomii pośrodkowej i wszczepieniem protezy aorty wstępującej.",
        "C) Chirurgiczne odnerwienie pnia trzewnego oraz obustronna nefrektomia w celu zapobieżenia nerkopochodnemu nadciśnieniu tętniczemu w przyszłości.",
        "D) Wdrożenie pełnej doustnej antykoagulacji antagonistami witaminy K (warfaryna) w celu zapobiegania formowaniu skrzeplin w fałszywym kanale rozwarstwienia.",
        "E) Pilne wykonanie wideotorakoskopii z mechaniczną pleurodezą talkową w celu zapobieżenia powstawaniu krwiaka opłucnowego po stronie lewej."
      ],
      correctIdx: 0
    },
    {
      qIdx: 8, // Q9
      opts: [
        "A) Ostrej niedomykalności zastawki aortalnej powstałej na tle poszerzenia pierścienia lub asymetrycznego pociągania płatków przez intimal flap.",
        "B) Krytycznym hemodynamicznie zwężeniu zastawki trójdzielnej wywołanym bezpośrednim uciskiem poszerzonej aorty wstępującej na prawy przedsionek.",
        "C) Pourazowym pęknięciu mięśniówki przegrody międzykomorowej z powstaniem ostrego przecieku lewo-prawego na poziomie koniuszka serca.",
        "D) Zadźzierzgnięciu przepukliny rozworu przełykowego przepony z przemieszczeniem dna żołądka do tylnego śródpiersia za lewy przedsionek.",
        "E) Zaawansowanym czynnościowym zwężeniu lewego ujścia żylnego z gwałtownym wzrostem gradientu ciśnień między przedsionkiem a komorą."
      ],
      correctIdx: 0
    },
    {
      qIdx: 9, // Q10
      opts: [
        "A) Cechuje się bardzo wysoką wartością predykcyjną ujemną (>95–98%) i pozwala z wysokim prawdopodobieństwem wykluczyć ostre rozwarstwienie aorty u chorych o niskim ryzyku klinicznym.",
        "B) Stanowi patognomoniczny dowód potwierdzający ostre zamknięcie pnia lewej tętnicy wieńcowej w przebiegu powikłanego rozwarstwienia aorty typu A.",
        "C) Jest bezwzględnym wskazaniem do natychmiastowej torakotomii ratunkowej z uwagi na skrajne ryzyko tamponady krwotocznej worka osierdziowego.",
        "D) Wskazuje na obecność błędu przedlaboratoryjnego, ponieważ stężenie D-dimerów można wiarygodnie oznaczać wyłącznie w dobowej zbiórce moczu.",
        "E) Nie posiada żadnej udokumentowanej wartości diagnostycznej w ostrych schorzeniach układu sercowo-naczyniowego i nie powinno być oznaczane."
      ],
      correctIdx: 0
    }
  ],
  25: [
    {
      qIdx: 4, // Q5
      opts: [
        "A) Mechanicznego kołysania się serca w wypełnionym płynem worku osierdziowym (tzw. swinging heart), co cyklicznie zmienia wektor elektryczny względem elektrod.",
        "B) Naprzemiennego występowania czynnościowego bloku prawej i lewej odnogi pęczka Hisa na tle ostrego niedokrwienia podwsierdziowego mięśnia sercowego.",
        "C) Cyklicznego porażenia węzła zatokowo-przedsionkowego i łączy przedsionkowo-komorowych przez gwałtownie narastającą w osoczu hiperkaliemię.",
        "D) Rytmicznych fluktuacji stężenia tlenu we krwi włośniczkowej zależnych od wahań ciśnienia w drogach oddechowych podczas wdechu i wydechu.",
        "E) Obecności artefaktów napięciowych wywołanych drżeniem mięśniówki klatki piersiowej chorego w reakcji na silny lęk i hipotermię obwodową."
      ],
      correctIdx: 0
    },
    {
      qIdx: 6, // Q7
      opts: [
        "A) Dodatnie ciśnienie w klatce piersiowej wywołane przez respirator gwałtownie zmniejsza powrót żylny do prawego serca, co w połączeniu z uciskiem zewnątrzsertcowym całkowicie likwiduje rzut serca.",
        "B) Wzrost ciśnienia w drogach oddechowych indukuje natychmiastową kaskadę wykrzepiania wewnątrzjamowego i tworzenie masywnych skrzeplin w lewej komorze serca.",
        "C) Dodatnie ciśnienie w pęcherzykach płucnych wywołuje odruchowy skurcz naczyń wieńcowych w mechanizmie pobudzenia receptorów barorefluksu płucnego.",
        "D) Wentylacja z dodatnim ciśnieniem końcowowydechowym prowadzi do nagłego obrzęku endotelium i zarośnięcia światła pnia płucnego w ciągu kilkunastu sekund.",
        "E) Wysokie stężenie tlenu w mieszaninie oddechowej wywołuje gwałtowne pobudzenie nerwu błędnego z nieodwracalną asystolią oporną na atropinę."
      ],
      correctIdx: 0
    },
    {
      qIdx: 8, // Q9
      opts: [
        "A) Stroma krzywa zależności ciśnienia od objętości w worku osierdziowym po przekroczeniu granicy rozciągliwości osierdzia (nawet mały spadek objętości drastycznie obniża ciśnienie).",
        "B) Gwałtowne obniżenie stężenia jonów potasu i wapnia w osoczu krwi tętniczej na skutek nagłego uruchomienia mikrokrążenia trzewnego.",
        "C) Znaczne przyspieszenie przewodzenia przedsionkowo-komorowego w węźle AV wywołane mechanicznym podrażnieniem nasierdzia przez igłę.",
        "D) Odruchowe rozszerzenie tętnic nerkowych i krezkowych wywołane stymulacją receptorów czuciowych w blaszce ściennej osierdzia.",
        "E) Błyskawiczne wypłukanie zakumulowanego dwutlenku węgla i mleczanów z miocytów prawej komory bezpośrednio do krwioobiegu."
      ],
      correctIdx: 0
    },
    {
      qIdx: 10, // Q11
      opts: [
        "A) Nawracającego wysięku w worku osierdziowym (zwłaszcza o etiologii nowotworowej), w celu zapewnienia stałego drenażu do jamy opłucnej i zapobieżenia nawrotom tamponady.",
        "B) Pierwszego epizodu ostrego wirusowego zapalenia osierdzia o łagodnym przebiegu klinicznym, dobrze reagującego na niesteroidowe leki przeciwzapalne i kolchicynę.",
        "C) Świeżego zawału serca z uniesieniem odcinka ST bez jakichkolwiek cech powikłań mechanicznych czy obecności płynu w badaniu echokardiograficznym.",
        "D) Izolowanego zwężenia lewego ujścia żylnego (stenozy mitralnej) w stadium zaawansowanym w celu odciążenia skurczowego lewego przedsionka serca.",
        "E) Ostrej zatorowości płucnej niskiego ryzyka w celu ułatwienia rewaskularyzacji farmakologicznej i poprawy napełniania komór."
      ],
      correctIdx: 0
    }
  ],
  26: [
    {
      qIdx: 1, // Q2
      opts: [
        "A) Utrzymanie ciśnienia skurczowego w granicach 70–90 mmHg w celu uniknięcia zerwania skrzepu tamponującego pęknięcie w przestrzeni zaotrzewnowej, przy zachowaniu minimalnej perfuzji mózgu i serca.",
        "B) Wywołanie celowego obrzęku cytotoksycznego kory mózgu w celu wprowadzenia pacjenta w głęboką hipotermię neuroprotekcyjną przed zabiegiem operacyjnym.",
        "C) Maksymalizacja filtracji kłębuszkowej w nerkach poprzez gwałtowne obniżenie oporu naczyniowego w tętniczkach doprowadzających kłębuszków.",
        "D) Przyspieszenie wypłukiwania kwasu mlekowego z niedokrwionych kończyn dolnych w celu zapobieżenia późniejszemu zespołowi poreperfuzyjnemu.",
        "E) Spowodowanie nagłego spadku stężenia jonów potasu w surowicy krwi poprzez stymulację dokomórkowego transportu jonów przez insulinę."
      ],
      correctIdx: 0
    },
    {
      qIdx: 7, // Q8
      opts: [
        "A) Wewnątrznaczyniowe zaopatrzenie pękniętego tętniaka aorty brzusznej za pomocą stentgraftu wprowadzanego przez tętnice udowe (ruptured Endovascular Aneurysm Repair).",
        "B) Klasyczne operacyjne podwiązanie tętnic biodrowych wspólnych z wytworzeniem ominięcia pachowo-udowego bez implantacji protezy aortalnej.",
        "C) Jednoczasowe wycięcie pęcherzyka żółciowego i rekonstrukcję aorty brzusznej z dostępu przezotrzewnowego w trybie ratunkowym.",
        "D) Mechaniczne wspomaganie lewej komory serca za pomocą przezskórnej pompy osiowej wprowadzanej do aorty wstępującej przed operacją.",
        "E) Angioplastykę balonową wysokociśnieniową zwężonego odcinka aorty brzusznej bez użycia metalowych stentów ani materiałów syntetycznych."
      ],
      correctIdx: 0
    },
    {
      qIdx: 9, // Q10
      opts: [
        "A) Gwałtownym wzrostem obciążenia następczego (afterload) lewej komory serca z ryzykiem ostrej niewydolności lewokomorowej oraz przemijającym niedokrwieniem narządów jamy brzusznej.",
        "B) Natychmiastowym, krytycznym spadkiem ciśnienia tętniczego w aorcie wstępującej i naczyniach dogłowowych z utratą przytomności chorego na stole operacyjnym.",
        "C) Całkowitym ustaniem perfuzji mózgowej wywołanym odruchowym skurczem tętnic szyjnych wewnętrznych w odpowiedzi na pobudzenie baroreceptorów.",
        "D) Rozwojem skrajnej zasadowicy metabolicznej z hiperkaliemią w ciągu pierwszych kilkudziesięciu sekund od założenia kleszczy naczyniowych.",
        "E) Gwałtownym wzrostem temperatury głębokiej ciała pacjenta powyżej 41°C wskutek nagłego zatrzymania oddawania ciepła przez kończyny dolne."
      ],
      correctIdx: 0
    }
  ],
  27: [
    {
      qIdx: 8, // Q9
      opts: [
        "A) Ostre bakteryjne zapalenie otrzewnej wywołane masywną translokacją pałeczek jelitowych przez ścianę niedokrwionego jelita grubego.",
        "B) Zakrzepica pnia tętnicy krezkowej górnej powstała w wyniku uogólnionego skurczu naczyń trzewnych stymulowanego przez aldosteron.",
        "C) Zaburzenia motoryki przewodu pokarmowego, obrzęk ściany jelit i zaburzenia elektrolitowe (hiponatremia, hiperkaliemia) wywołujące skurcze spastyczne mięśniówki jelit i otrzewnej.",
        "D) Ostra martwica krwotoczna tkanki tłuszczowej sieci większej wywołana przedwczesną aktywacją enzymów proteolitycznych trzustki.",
        "E) Samoistne podtorebkowe pęknięcie powiększonej śledziony w wyniku nagłego wzrostu ciśnienia w układzie wrotnym."
      ],
      correctIdx: 2
    },
    {
      qIdx: 10, // Q11
      opts: [
        "A) 0,9% roztwór chlorku sodu (izotoniczny krystaloid pierwszego wyboru uzupełniający niedobory sodu i objętości wewnątrznaczyniowej).",
        "B) 10% roztwór glukozy (podawany w celu korekty hipoglikemii i stymulacji wydzielania insuliny obniżającej stężenie potasu).",
        "C) Płyn Ringera / Płyn Wieloelektrolitowy (PWE zawierający w swoim składzie egzogenne jony potasu nasilające zagrażającą życiu hiperkaliemię).",
        "D) 5% roztwór glukozy w powolnym wlewie dożylnym (stosowany do pokrycia strat wody wolnej od elektrolitów po wstępnym nawodnieniu).",
        "E) Równocześnie podawana mieszanina 0,9% NaCl i 5% glukozy w proporcji objętościowej 1:1 w celu zapobiegania hipoglikemii."
      ],
      correctIdx: 2
    }
  ],
  28: [
    {
      qIdx: 2, // Q3
      opts: [
        "A) Natychmiast po zakończeniu 60-minutowego wlewu dożylnego rt-PA w celu zapobieżenia wczesnej ponownej okluzji naczynia mózgowego.",
        "B) Dokładnie po 4 godzinach od zakończenia infuzji trombolitycznej pod warunkiem stabilizacji ciśnienia tętniczego poniżej 160/90 mmHg.",
        "C) Po upływie 24 godzin od podania rt-PA, pod warunkiem wcześniejszego wykonania kontrolnego badania TK głowy wykluczającego krwawienie śródczaszkowe.",
        "D) Dopiero po upływie pełnych 30 dni od ostrego incydentu udarowego z uwagi na długotrwałą dysfunkcję płytek indukowaną przez lek.",
        "E) Podawanie leków przeciwpłytkowych jest dożywotnio bezwzględnie przeciwwskazane u każdego chorego po przebyciu celowanej trombolizy."
      ],
      correctIdx: 2
    },
    {
      qIdx: 3, // Q4
      opts: [
        "A) Izolowana niedrożność drobnych gałązek korowych stwierdzona w badaniu EEG u przytomnego pacjenta bez jakichkolwiek ubytków ruchowych.",
        "B) Potwierdzona w badaniu naczyniowym (Angio-TK / CTA) okluzja dużego naczynia (LVO) przedniego krążenia mózgowego (np. pnia tętnicy środkowej mózgu M1 lub tętnicy szyjnej wewnętrznej ICA) w oknie czasowym do 6 godzin od wystąpienia objawów.",
        "C) Czas od wystąpienia pierwszych objawów neurologicznych przekraczający 48 godzin przy całkowitym braku wczesnych cech niedokrwienia w TK.",
        "D) Stwierdzenie obecności pourazowego krwiaka podtwardówkowego o grubości przekraczającej 10 mm z przemieszczeniem struktur linii pośrodkowej.",
        "E) Izolowany udar lakunarny w obrębie torebki wewnętrznej o średnicy poniżej 5 mm bez towarzyszącej niedrożności dużych pni naczyniowych."
      ],
      correctIdx: 1
    },
    {
      qIdx: 4, // Q5
      opts: [
        "A) Natychmiastowe obniżenie ciśnienia skurczowego poniżej 120 mmHg za pomocą dożylnego wlewu urapidylu w celu odciążenia lewej komory serca.",
        "B) Tolerowanie wartości ciśnienia tętniczego do 220/120 mmHg (hipotensja permisyjna) i wdrożenie leczenia obniżającego ciśnienie dopiero po przekroczeniu tych wartości lub w razie uszkodzenia innych narządów.",
        "C) Bezwzględne podawanie amin presyjnych w ciągłym wlewie w celu podwyższenia ciśnienia skurczowego powyżej 240 mmHg dla poprawy perfuzji penumbry.",
        "D) Całkowite wstrzymanie podaży jakichkolwiek płynów infuzyjnych w celu mechanicznego zmniejszenia objętości krwi krążącej i redukcji ciśnienia.",
        "E) Natychmiastowe bolusowe podanie wysokiej dawki furosemidu (80–120 mg i.v.) w celu wymuszenia szybkiego odwodnienia i spadku ciśnienia tętniczego."
      ],
      correctIdx: 1
    },
    {
      qIdx: 8, // Q9
      opts: [
        "A) Po wcześniejszym podaniu specyficznego antidotum odwracającego działanie dabigatranu – idarucizumabu (Praxbind w dawce 2 × 2,5 g i.v.).",
        "B) Po uprzednim przetoczeniu 4 jednostek świeżo mrożonego osocza (FFP) w celu skompensowania zablokowanych czynników krzepnięcia.",
        "C) Po przetoczeniu 2 jednostek koncentratu krwinek płytkowych (KKP) w celu wysycenia krążących we krwi cząsteczek bezpośredniego inhibitora.",
        "D) Stosowanie dabigatranu w jakiejkolwiek dawce nigdy nie stanowi przeciwwskazania do natychmiastowego rozpoczęcia systemowej trombolizy.",
        "E) Po podaniu dożylnym 20 mg fitomenadionu (witaminy K1) w celu pilnego przywrócenia wątrobowej syntezy zależnych od niej enzymów krzepnięcia."
      ],
      correctIdx: 0
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

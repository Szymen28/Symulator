const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const updates = {
  61: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A) Blokada alfa-adrenergiczna (doksazosyna) na 10-14 dni przed zabiegiem, a beta-adrenolityk dopiero PO blokadzie alfa.",
        "B) Podanie beta-adrenolityka (propranololu) w monoterapii w celu natychmiastowego zwolnienia akcji serca chorego.",
        "C) Monoterapia silnym diuretykiem pętlowym (furosemidem) w celu obniżenia ciśnienia krwi i objętości osocza.",
        "D) Podanie dożylne adrenaliny w ciągłym wlewie kroplowym w celu wysycenia obwodowych receptorów naczyniowych.",
        "E) Całkowity brak konieczności jakiegokolwiek przygotowania farmakologicznego przed laparoskopową operacją guza."
      ]
    },
    {
      qIdx: 1, // Q2
      newOpts: [
        "A) Zjawisko nieprzeciwstawnego pobudzenia receptorów alfa prowadzi do skrajnego skurczu naczyń, zawału i obrzęku płuc.",
        "B) Powoduje gwałtowną, nieodwracalną hipoglikemię poniżej 10 mg/dl na skutek zablokowania glikogenolizy w wątrobie.",
        "C) Przyspiesza tempo podziałów komórkowych i powoduje natychmiastowy rozrost masy guza o ponad 500 procent.",
        "D) Niszczy wszystkie warstwy kory nadnerczy wywołując ostry przełom w przebiegu jatrogennej choroby Addisona.",
        "E) Wywołuje zjawisko martwicy tkanek obwodowych prowadzące do samoistnej utraty obu kończyn dolnych u pacjenta."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Oznaczenie wolnych metanefryn w osoczu lub frakcjonowanych metanefryn w dobowej zbiórce moczu (DZM).",
        "B) Jednorazowe spoczynkowe oznaczenie stężenia adrenaliny i noradrenaliny w pojedynczej próbce krwi żylnej.",
        "C) Ilościowe oznaczenie stężenia kwasu wanilinomigdałowego (VMA) w próbce kału po diecie bezresztkowej.",
        "D) Standardowe badanie ogólne moczu z mikroskopową oceną osadu pod kątem obecności wałeczków szklistych.",
        "E) Pomiar stężenia chromograniny A w niestymulowanej ślinie pobranej rano na czczo do jałowej probówki."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) Nakłucie guza wyzwala masywny wyrzut katecholamin, prowadząc do śmiertelnego przełomu nadciśnieniowego i zawału.",
        "B) Igła biopsyjna ulega natychmiastowemu rozpuszczeniu pod wpływem kwasu solnego wydzielanego w nadnerczu.",
        "C) Biopsja wywołuje zniekształcenie sygnału w obrazach tomografii komputerowej uniemożliwiając ocenę narządów.",
        "D) Prawidłowe i zmienione chorobowo nadnercza są strukturami całkowicie niewidocznymi w badaniach obrazowych.",
        "E) Procedura nakłucia powłok lędźwiowych wiąże się ze stuprocentowym ryzykiem uogólnionego zakażenia laseczką tężca."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A) Zespół mnogiej gruczolakowatości wewnątrzwydzielniczej typu 2 (zespół MEN 2A oraz zespół MEN 2B).",
        "B) Zespół Lyncha (wrodzony niepolipowaty rak jelita grubego uwarunkowany defektem naprawy niedopasowań DNA).",
        "C) Zespół Turnera (monosomia chromosomu X z pierwotną dysgenezją gonad i niskorosłością u kobiet).",
        "D) Zespół Marfana (genetycznie uwarunkowana mutacja fibryliny-1 z tętniakami aorty i zwichnięciem soczewki).",
        "E) Zespół Klinefeltera (kariotyp 47,XXY z hipogonadyzmem hipergonadotropowym i ginekomastią u mężczyzn)."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A) Aby uzupełnić hipowolemię i zapobiec załamaniu krążenia po chirurgicznym odcięciu dopływu katecholamin z guza.",
        "B) W celu wywołania obrzęku torebki guza nadnercza co ułatwia jego wypreparowanie od bieguna górnego nerki.",
        "C) W celu ochrony pacjenta przed rozwojem nagłej zagrażającej życiu hiperkaliemii w trakcie znieczulenia ogólnego.",
        "D) W celu stymulacji komórek kory nadnerczy do kompensacyjnego wydzielania dużych ilości endogennego kortyzolu.",
        "E) Płyny infuzyjne i sól kuchenna wchodzą w reakcję chemiczną rozpuszczającą torebkę zewnętrzną nadnercza."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A) Hipowolemia wewnątrznaczyniowa oraz desensytyzacja (down-regulation) receptorów adrenergicznych na naczyniach.",
        "B) Masywny wrodzony brak odruchu z baroreceptorów zatoki szyjnej i łuku aorty występujący u każdego chorego.",
        "C) Porażenie układu przywspółczulnego wywołane bezpośrednim toksycznym działaniem wolnych metanefryn w mózgu.",
        "D) Nieodwracalne uszkodzenie rdzenia kręgowego na poziomie rogów bocznych segmentów piersiowych Th1-Th5.",
        "E) Zjawisko to jest wywołane wyłącznie współistnieniem ciężkiej polineuropatii cukrzycowej u osób starszych."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Pozanadnerczowy guz chromochłonny wywodzący się z ciałek przyzwojowych zwojów współczulnych lub przywspółczulnych.",
        "B) Nowotwór złośliwy wywodzący się z komórek pęcherzykowych gruczołu tarczowego dający przerzuty do kości.",
        "C) Zmiana łagodna kory nadnerczy wywodząca się z komórek warstwy kłębkowatej i produkująca aldosteron.",
        "D) Torbiel rzekoma miąższu trzustki powstała w następstwie przebytego ostrego martwiczego zapalenia narządu.",
        "E) Wrodzona malformacja naczyniowa zlokalizowana w pniu mózgowia dająca napadowe zaburzenia równowagi."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A) W każdym przypadku (100% chorych) z uwagi na wysoki odsetek (do 30-40%) uwarunkowania genetycznego (RET, VHL, NF1, SDH).",
        "B) Wyłącznie u chorych, u których operacja chirurgiczna została wykonana w trybie pilnym ze wskazań życiowych.",
        "C) Jedynie w sytuacji, gdy guz został rozpoznany u pacjenta po ukończeniu 85. roku życia bez innych obciążeń.",
        "D) Diagnostyka genetyczna jest bezwzględnie zakazana w Polsce ze względu na przepisy bioetyczne i ochronę danych.",
        "E) Wyłącznie u chorych, u których stwierdzono równoczesne występowanie łagodnego gruczolaka przysadki mózgowej."
      ]
    }
  ],
  62: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A) Test hamowania 1 mg deksametazonu na noc (brak hamowania kortyzolu rano <1,8 µg/dl świadczy o patologii).",
        "B) Jednorazowe poranne oznaczenie stężenia kortyzolu w surowicy krwi pobranej w warunkach stresu na izbie przyjęć.",
        "C) Oznaczenie stężenia hormonu tyreotropowego (TSH) oraz wolnej tyroksyny (FT4) w surowicy krwi pacjenta.",
        "D) Pomiar stężenia aldosteronu w osoczu krwi pobranej w pozycji leżącej po uprzednim podaniu kaptoprylu.",
        "E) Wykonanie doustnego testu tolerancji glukozy (OGTT) z oznaczeniem stężenia insuliny po 120 minutach."
      ]
    },
    {
      qIdx: 1, // Q2
      newOpts: [
        "A) Wykazaniem braku fizjologicznego spadku wydzielania kortyzolu w godzinach nocnych (utrata rytmu dobowego).",
        "B) Wykazaniem gwałtownego przyspieszenia filtracji kłębuszkowej nerek w godzinach nocnych u pacjenta.",
        "C) Bezpośrednim pomiarem stężenia hormonu adrenokortykotropowego (ACTH) wydzielanego do śliny przez ślinianki.",
        "D) Wykluczeniem obecności mikrogruczolaka przysadki w obrazowaniu metodą rezonansu magnetycznego głowy.",
        "E) Oceną metabolizmu kwasu solnego w komórkach okładzinowych błony śluzowej żołądka u osób otyłych."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) U chorych z gruczolakiem przysadki podanie 8 mg deksametazonu hamuje ACTH i kortyzol o >50%, a w raku płuca nie.",
        "B) U chorych z ektopowym ACTH dochodzi do natychmiastowego spadku stężenia glukozy poniżej 20 mg/dl we krwi.",
        "C) Test wysokodawkowy powoduje gwałtowny wzrost stężenia parathormonu w surowicy wyłącznie u osób z chorobą Cushinga.",
        "D) Obie jednostki chorobowe reagują identycznym stuprocentowym zahamowaniem wydzielania hormonów nadnerczowych.",
        "E) Deksametazon w dawce 8 mg wywołuje ostrą reakcję anafilaktyczną wyłącznie u chorych z rakiem drobnokomórkowym."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A) Szerokie (>1 cm), sinoczerwone rozstępy na skórze brzucha i ud, miopatia proksymalna i łatwe siniaczenie powłok.",
        "B) Wąskie perłowe rozstępy skórne na pośladkach u dorastającej młodzieży bez jakichkolwiek ubytków mięśniowych.",
        "C) Znaczny spadek masy ciała z wyniszczeniem nowotworowym i uogólnioną hiperpigmentacją skóry w zgięciach stawów.",
        "D) Izolowane powiększenie obwodu szyi z obecnością wola guzowatego i objawami klinicznej nadczynności tarczycy.",
        "E) Występowanie obfitych obrzęków ciastowatych wokół obu kostek ustępujących całkowicie po uniesieniu kończyn."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Selektywne cewnikowanie zatok skalistych dolnych (BIPSS) z oznaczeniem stężenia ACTH po stymulacji CRH.",
        "B) Przeglądowe zdjęcie rentgenowskie czaszki w projekcji bocznej z oceną wymiarów siodła tureckiego na kliszy.",
        "C) Biopsja aspiracyjna cienkoigłowa miąższu przysadki mózgowej wykonywana przez blaszkę sitową kości sitowej.",
        "D) Scyntygrafia całego ciała z użyciem znakowanego jodu-131 pod kątem ektopowych ognisk gromadzenia znacznika.",
        "E) Badanie ultrasonograficzne przezciemiączkowe z oceną przepływów naczyniowych w naczyniach podstawy mózgu."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A) Suplementację hydrokortyzonem w dawkach substytucyjnych z powodu wtórnej niewydolności kory drugiego nadnercza.",
        "B) Dożywotnie podawanie wysokich dawek leków hamujących steroidogenezę nadnerczową (np. ketokonazolu).",
        "C) Całkowity zakaz przyjmowania jakichkolwiek preparatów glikokortykosteroidowych pod rygorem zgonu chorego.",
        "D) Natychmiastowe chirurgiczne usunięcie drugiego, niezmienionego nadnercza w celu symetryzacji powłok.",
        "E) Stosowanie wlewów hipertonicznego roztworu chlorku sodu co 12 godzin przez okres 6 kolejnych miesięcy."
      ]
    }
  ],
  63: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A) Intensywna dożylna płynoterapia (0,9% NaCl w objętości 3-4 litrów na dobę) z następowym wdrożeniem bisfosfonianu i.v.",
        "B) Natychmiastowe podanie wysokich dawek tiazydowych leków moczopędnych (hydrochlorotiazydu) bez nawadniania.",
        "C) Dożylne podanie 10% roztworu chlorku wapnia w szybkim bolusie celem wysycenia receptorów wapniowych.",
        "D) Wstrzyknięcie dużej dawki aktywnej witaminy D3 (kalcytriolu) w celu stymulacji wchłaniania jelitowego.",
        "E) Całkowite powstrzymanie się od jakichkolwiek płynów dożylnych i zalecenie ścisłej diety bezwapniowej."
      ]
    },
    {
      qIdx: 1, // Q2
      newOpts: [
        "A) Skrócenie odstępu QT (oraz niekiedy uniesienie punktu J i poszerzenie zespołu QRS) w zapisie 12-odprowadzeniowym.",
        "B) Wybitne wydłużenie odstępu QT z tendencją do wyzwalania wielokształtnego częstoskurczu torsade de pointes.",
        "C) Izolowane odwrócenie załamków T we wszystkich odprowadzeniach przedsercowych bez zmian odstępu QT.",
        "D) Całkowity blok przedsionkowo-komorowy III stopnia z rytmem zastępczym komorowym poniżej 20 uderzeń na minutę.",
        "E) Uniesienie odcinka ST o typie fali Pardee w odprowadzeniach kończynowych odpowiadające ostremu zawałowi serca."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) Bisfosfoniany osiągają pełny efekt hipokalcemizujący dopiero po 48-72 godzinach od momentu wlewu dożylnego.",
        "B) Kwas zoledronowy wchodzi w reakcję chemiczną z albuminą surowicy i trwale unieczynnia enzymy krzepnięcia.",
        "C) Leki z grupy bisfosfonianów w pierwszych godzinach wywołują paradoksalny wyrzut jonów wapnia z kości do krwi.",
        "D) Podanie bisfosfonianu bez kalcytoniny skutkuje natychmiastowym rozwojem ostrej moczówki nerkopochodnej.",
        "E) Bisfosfoniany i.v. są lekami o natychmiastowym działaniu, a kalcytoninę podaje się wyłącznie przeciwbólowo."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A) Denosumab (przeciwciało monoklonalne przeciwko ligandowi RANKL hamujące różnicowanie i czynność osteoklastów).",
        "B) Hydrochlorotiazyd podawany doustnie w dawce 50 mg na dobę w celu stymulacji wydalania wapnia przez nerki.",
        "C) Kwas zoledronowy podawany w podwójnej dawce dożylnej bez względu na poziom filtracji kłębuszkowej GFR.",
        "D) Węglan wapnia podawany doustnie w dawce 3 gramów na dobę po posiłkach w celu wiązania fosforanów.",
        "E) Parathormon rekombinowany (teriparatyd) w codziennych iniekcjach podskórnych w celu ochrony kości."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Diuretyki tiazydowe hamują nerkowe wydalanie wapnia zwiększając jego resorpcję zwrotną w kanalikach dystalnych.",
        "B) Tiazydy bezpośrednio niszczą miąższ przytarczyc wywołując masywny wyrzut zmagazynowanego parathormonu do krwi.",
        "C) Leki te wchodzą w reakcję z kwasem solnym w żołądku zwiększając wchłanianie soli wapniowych z pokarmu.",
        "D) Diuretyki tiazydowe wywołują ostrą kwasicę oddechową co prowadzi do uwalniania wapnia z albumin osocza.",
        "E) Tiazydy pobudzają syntezę aktywnej witaminy D w wątrobie niezależnie od enzymu 1-alfa-hydroksylazy nerkowej."
      ]
    }
  ],
  64: [
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Spironolakton lub eplerenon (antagoniści receptora mineralokortykoidowego) w skojarzeniu z lekami hipotensyjnymi.",
        "B) Ostra obustronna adrenalektomia chirurgiczna wykonywana w trybie pilnym na bloku operacyjnym.",
        "C) Monoterapia wysokimi dawkami inhibitorów konwertazy angiotensyny (ACE-I) bez blokady aldosteronu.",
        "D) Przewlekłe podawanie doustnych soli potasu w megadawkach bez stosowania jakichkolwiek leków diuretycznych.",
        "E) Radioterapia celowana na okolicę obu przestrzeni zaotrzewnowych w celu zniszczenia kory nadnerczy."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) Ocenę obecności gruczolaka wydzielającego aldosteron vs obustronnego przerostu przed kwalifikacją do operacji.",
        "B) Ocenę stopnia złośliwości histopatologicznej guza nadnercza na podstawie pobranych komórek w badaniu cytologii.",
        "C) Wykrycie obecności mutacji punktowych w genie receptora mineralokortykoidowego u chorego na stole.",
        "D) Zabezpieczenie naczyń nerkowych przed powstaniem ostrej zakrzepicy w trakcie podawania kontrastu.",
        "E) Procedura ta jest badaniem eksperymentalnym i współcześnie nie znajduje zastosowania w wytycznych."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A) Odstawienie leków wpływających na układ RAA (zwłaszcza antagonistów aldosteronu na 4-6 tyg.) i wyrównanie hipokaliemii.",
        "B) Wdrożenie intensywnej terapii spironolaktonem w dawce 200 mg na dobę przez 7 dni bezpośrednio przed pobraniem krwi.",
        "C) Podanie dożylne 100 mg furosemidu w bolusie na 30 minut przed pobraniem próbki krwi na badanie ARR.",
        "D) Wprowadzenie ścisłej diety bezsolnej o zawartości sodu poniżej 10 mmol na dobę przez okres 2 miesięcy.",
        "E) Pobranie krwi na badanie ARR w trakcie ostrego napadu drgawek hipokaliemicznych u pacjenta na SOR."
      ]
    }
  ],
  65: [
    {
      qIdx: 1, // Q2
      newOpts: [
        "A) Hipernatremia (>145 mmol/l) z osmolalnością osocza >295 mOsm/kg, gdyż wydalanie rozcieńczonego moczu już dowodzi wady.",
        "B) Prawidłowe stężenie sodu w surowicy krwi oraz osmolalność osocza mieszcząca się w granicach normy.",
        "C) Wiek pacjenta powyżej 18. roku życia przy braku chorób współistniejących układu krążenia i nerek.",
        "D) Występowanie nykturii z oddawaniem moczu 2-3 razy w ciągu nocy u mężczyzny z łagodnym przerostem stercza.",
        "E) Test odwodnieniowy jest procedurą całkowicie bezpieczną i nie posiada jakichkolwiek przeciwwskazań."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Wzrost osmolalności moczu o >50% (często >100-200%) oraz wyraźny spadek objętości wydalanego moczu po leku.",
        "B) Całkowity brak jakiejkolwiek reakcji osmolalności moczu (wzrost poniżej 10%) po podaniu desmopresyny.",
        "C) Gwałtowny i niekontrolowany spadek stężenia sodu w surowicy krwi obwodowej poniżej wartości 100 mmol/l.",
        "D) Pojawienie się masywnego białkomoczu nerczycowego i krwinkomoczu z obecnością wałeczków ziarnistych.",
        "E) Paradoksalny spadek osmolalności moczu o ponad połowę z podwojeniem dobowej objętości diurezy u chorego."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "A) Hiperintensywny sygnał tylnego płata przysadki w obrazach T1-zależnych (tzw. bright spot tylnego płata).",
        "B) Obustronny zanik kory mózgowej w obrębie biegunów płatów czołowych z poszerzeniem bruzd mózgu.",
        "C) Izolowane poszerzenie komory czwartej mózgu bez zaburzeń przepływu płynu mózgowo-rdzeniowego.",
        "D) Obecność mnogich symetrycznych zwapnień w strukturach hipokampu i zakrętu zębatego u pacjenta.",
        "E) Wyraźna asymetria szerokości rogów czołowych komór bocznych mózgowia w płaszczyźnie czołowej."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A) Hipoosmolalną hiponatremię z rozcieńczenia (zatrucie wodne) grożącą obrzękiem mózgu i drgawkami u chorego.",
        "B) Ostre niedokrwienie i zawał miąższu śledziony w mechanizmie zatorowości obwodowej mikrozakrzepami.",
        "C) Ostre zgorzelinowe zapalenie wyrostka robaczkowego z następową perforacją do wolnej jamy otrzewnej.",
        "D) Powstanie mnogich uwapnionych złogów w świetle pęcherzyka żółciowego i przewodów wątrobowych.",
        "E) Wystąpienie piorunującego przełomu tarczycowego z wysoką gorączką i zapaścią sercowo-naczyniową."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A) Faza 1: wczesna moczówka -> Faza 2: przejściowe ustąpienie z hiponatremią -> Faza 3: utrwalona moczówka prosta.",
        "B) Faza 1: wysoka gorączka -> Faza 2: wodnista biegunka -> Faza 3: ostry zawał mięśnia sercowego ze wstrząsem.",
        "C) Faza 1: napadowy kaszel -> Faza 2: narastająca duszność spoczynkowa -> Faza 3: nagłe zatrzymanie krążenia.",
        "D) Przebieg trójfazowy dotyczy wyłącznie dobowych wahań ciśnienia tętniczego krwi u osób po urazach czaszki.",
        "E) Zjawisko to występuje wyłącznie u pacjentów po przebytej planowej apendektomii laparoskopowej na chirurgii."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Aby zapobiec gwałtownemu napływowi wody do neuronów i wywołaniu groźnego jatrogennego obrzęku mózgu.",
        "B) W celu bezpośredniej ochrony erytrocytów przed hemolizą wewnątrznaczyniową wywołaną hipoosmolalnością.",
        "C) Aby uniknąć masywnego zwapnienia miąższu nerek i krystalizacji moczanów w kanalikach nerkowych.",
        "D) W celu stymulacji wzrostu kości długich i pobudzenia wydzielania hormonu wzrostu przez przedni płat przysadki.",
        "E) Zbyt szybki spadek stężenia sodu powoduje natychmiastowe przekształcenie cząsteczek wazopresyny w oksytocynę."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) Diuretyki tiazydowe (np. hydrochlorotiazyd) w skojarzeniu z dietą ubogosodową i ewentualnie amilorydem.",
        "B) Antagoniści receptora aldosteronowego (spironolakton) stosowani w bardzo wysokich dawkach dobowych.",
        "C) Inhibitory anhydrazy węglanowej (acetazolamid) podawane dożylnie co 6 godzin w warunkach oddziału.",
        "D) Pętlowe leki moczopędne (furosemid) we wlewach ciągłych w celu forsowania wydalania jonów sodowych.",
        "E) Osmotyczne leki moczopędne (20% roztwór mannitolu) stosowane w celu podniesienia ciśnienia krwi."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A) Stężenie kopeptyny >21,4 pmol/l bez uprzedniego odwadniania wskazuje jednoznacznie na moczówkę nerkową (NDI).",
        "B) Oznaczenie kopeptyny nie znajduje żadnego zastosowania w nowoczesnej diagnostyce stanów wielomoczowych.",
        "C) Cząsteczki kopeptyny występują fizjologicznie wyłącznie u ryb i płazów i nie są syntetyzowane przez człowieka.",
        "D) Wynik stężenia kopeptyny równy zero w każdych warunkach oznacza całkowite zdrowie i brak zaburzeń przysadki.",
        "E) Poziom kopeptyny oznacza się obligatoryjnie wyłącznie z próbki płynu mózgowo-rdzeniowego po nakłuciu."
      ]
    }
  ],
  66: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A) Wybitnie wysokie, 'trzycyfrowe' OB (>70-100 mm/h) przy prawidłowym lub nieznacznym stężeniu prokalcytoniny.",
        "B) Masywna leukopenia z agranulocytozą poniżej 1,0 G/l w rozmazie mikroskopowym krwi obwodowej u chorego.",
        "C) Obecność przeciwciał przeciw receptorom TSH (TRAb) w wysokim mianie w teście radioimmunologicznym.",
        "D) Podwyższone stężenie kwasu moczowego w surowicy przekraczające 15 mg/dl z obecnością tofusów w małżowinie.",
        "E) Spadek stężenia ferrytyny i żelaza w surowicy do zera na tle ostrego krwawienia z przewodu pokarmowego."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Tarczyca w tej chorobie nie syntetyzuje hormonów de novo, lecz uwalnia je biernie z rozpadłych pęcherzyków.",
        "B) Tiamazol w kontakcie ze zmienionym zapalnie miąższem tarczycy wywołuje natychmiastowe zrakowacenie narządu.",
        "C) Leki przeciwtarczycowe bezpośrednio stymulują zakończenia nerwowe i wybitnie nasilają ból przedniej części szyi.",
        "D) Tyreostatyki wchodzą w reakcję z parathormonem wywołując ostrą zagrażającą życiu hipokalcemię tężyczkową.",
        "E) Tiamazol jest lekiem zarejestrowanym w farmakopei wyłącznie do leczenia ciężkiej pierwotnej niedoczynności."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A) W de Quervain widoczne są zlewne obszary hipoechogeniczne bez upłynnienia, a w bakteryjnym obecny jest ropień.",
        "B) W chorobie de Quervaina cały miąższ tarczycy ulega natychmiastowemu całkowitemu zanikowi w obrazie USG.",
        "C) W bakteryjnym zapaleniu tarczycy narząd wykazuje patologiczne świecenie na kolor zielony w opcji Color Doppler.",
        "D) Obie jednostki dają w 100% identyczny obraz radiologiczny i ich różnicowanie w ultrasonografii jest niemożliwe.",
        "E) Badanie USG jest procedurą bezużyteczną w diagnostyce chorób tarczycy i wytyczne zakazują jego wykonywania."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) Czasowa suplementacja małymi dawkami lewotyroksyny (LT4, np. 25-50 µg/d) przez 2-3 mies. z próbą odstawienia.",
        "B) Natychmiastowe chirurgiczne całkowite wycięcie gruczołu tarczowego w celu zapobieżenia transformacji nowotworowej.",
        "C) Wdrożenie dożywotniej terapii wysokimi dawkami syntetycznych tyreostatyków (tiamazolu w dawce 60 mg/d).",
        "D) Dożylny wlew megadawek metyloprednizolonu w pulsach po 1000 mg przez okres 10 kolejnych dni w szpitalu.",
        "E) Podanie dużej dawki radiojodu I-131 w celu definitywnej ablacji resztkowego miąższu gruczołu tarczowego."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A) Wielojądrzaste komórki olbrzymie fagocytujące koloid oraz komórki nabłonkowe ze zmianami degeneracyjnymi.",
        "B) Ciałka piaszczakowate, jądra komórkowe z bruzdami i inkluzjami typowe dla raka brodawkowatego tarczycy.",
        "C) Czyste, zlewne masy bakteryjne gronkowca złocistego bez obecności jakichkolwiek komórek układu odporności.",
        "D) Wyłączny obfity naciek z komórek plazmatycznych i limfocytów B tworzących grudki chłonne z centrami namnażania.",
        "E) Monomorficzny naciek drobnych, atypowych komórek nowotworowych o wysokim indeksie proliferacyjnym Ki-67."
      ]
    }
  ],
  67: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A) Dożylne podanie bolusa 150 ml 3% hipertonicznego NaCl w 20 min, powtórzone w razie potrzeby po 20 minutach.",
        "B) Powolny wlew izotonicznego 0,9% roztworu chlorku sodu w tempie 50 ml na godzinę z oceną parametrów życiowych.",
        "C) Dożylne podanie tolwaptanu w szybkim bolusie w celu zablokowania receptorów wazopresynowych V2 w nerkach.",
        "D) Szybki wlew 1000 ml 5% roztworu glukozy w ciągu 15 minut w celu uzupełnienia zapotrzebowania energetycznego mózgu.",
        "E) Forsowanie diurezy za pomocą dożylnego podania 120 mg furosemidu bez jednoczesnego podawania płynów infuzyjnych."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Jatrogenna demielinizacja mostu po zbyt szybkim wyrównaniu sodu, objawiająca się po 2-6 dniach zespołem zamknięcia.",
        "B) Wrodzona aplazja dróg piramidowych w pniu mózgowia ujawniająca się w trakcie ostrej infekcji bakteryjnej.",
        "C) Ostre bakteryjne zapalenie opon mózgowych indukowane przez obecność wolnych rodników tlenowych w surowicy.",
        "D) Zawał krwotoczny obu płatów skroniowych mózgu wywołany nagłym spadkiem ciśnienia w układzie żylnym głowy.",
        "E) Zmiana o charakterze łagodnym ustępująca całkowicie i samoistnie w ciągu pierwszych 12 godzin od wystąpienia."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A) Nie powinna przekraczać 10 mmol/l w ciągu pierwszych 24 godzin (a u pacjentów wysokiego ryzyka ODS: <=8 mmol/l/24h).",
        "B) Powinna wynosić dokładnie 25-30 mmol/l na dobę w celu błyskawicznego przywrócenia prawidłowej osmolalności.",
        "C) Nie ma żadnych limitów prędkości i stężenie sodu należy podnieść do wartości 140 mmol/l w ciągu 6 godzin.",
        "D) Powinna wynosić maksymalnie 1 mmol/l na dobę, aby uniknąć zaburzeń rytmu serca z przewodzenia przedsionkowego.",
        "E) Szybkość korekty sodu zależy wyłącznie od wieku pacjenta i nie ma związku z powikłaniami neurologicznymi."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A) Zaawansowany alkoholizm, niedożywienie, ciężka hipokaliemia oraz stężenie sodu wyjściowe poniżej 105 mmol/l.",
        "B) Prawidłowy stan odżywienia, prawidłowa masa ciała oraz stężenie sodu wyjściowe w granicach 130-134 mmol/l.",
        "C) Płeć męska u pacjentów w wieku pomiędzy 20. a 30. rokiem życia bez chorób współistniejących i bez nałogów.",
        "D) Współistnienie łagodnego nadciśnienia tętniczego leczonego inhibitorem konwertazy angiotensyny w monoterapii.",
        "E) Wyczynowe uprawianie sportów siłowych połączone ze stosowaniem suplementacji monohydratem kreatyny."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Prawidłowa osmolalność osocza (280-295 mOsm/kg H2O) wynikająca z obecności ciężkiej hiperlipidemii lub paraproteinemii.",
        "B) Prawdziwa hipoosmolalność osocza poniżej 250 mOsm/kg H2O wywołana niekontrolowanym wydzielaniem wazopresyny.",
        "C) Stan bezpośredniego zagrożenia życia wymagający natychmiastowego wlewu hipertonicznego 3% roztworu chlorku sodu.",
        "D) Zjawisko występujące wyłącznie u małych dzieci z wrodzonym brakiem enzymu hydroksylazy steroidowej w nadnerczach.",
        "E) Błąd wynikający ze skurczu naczynia krwionośnego w trakcie pobierania próbki krwi do probówki laboratoryjnej."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) Hipoosmolalność osocza, nieadekwatnie stężony mocz (>100 mOsm/kg), sód w moczu >30 mmol/l oraz kliniczna euwolemia.",
        "B) Ciężkie odwodnienie z obecnością suchości błon śluzowych, tachykardią i hipotonią ortostatyczną u chorego.",
        "C) Obecność masywnych uogólnionych obrzęków obwodowych, przesięków w jamach opłucnowych oraz wodobrzusza.",
        "D) Wydalanie olbrzymich objętości skrajnie rozcieńczonego moczu o osmolalności poniżej 50 mOsm/kg H2O.",
        "E) Towarzysząca ciężka kwasica metaboliczna z wybitnie podwyższoną luką anionową i stężeniem mleczanów we krwi."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A) Natychmiastowe przerwanie podawania roztworów sodu, wlew 5% glukozy i ewentualne podanie desmopresyny (dDAVP).",
        "B) Zwiększenie prędkości wlewu 3% NaCl w celu jak najszybszego osiągnięcia stężenia docelowego u pacjenta.",
        "C) Dożylne podanie 100 mg furosemidu w celu przyspieszenia wydalania wolnej wody przez nerki chorego.",
        "D) Wykonanie pilnego nakłucia lędźwiowego w celu odbarczenia płynu mózgowo-rdzeniowego pod ciśnieniem.",
        "E) Podanie wysokich dawek glikokortykosteroidów drogą dożylną w celu zahamowania bariery krew-mózg."
      ]
    }
  ],
  68: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A) Wzrost kreatyniny o >=0,3 mg/dl w 48h LUB wzrost o >=50% w 7 dni LUB diureza <0,5 ml/kg/h przez 6 godzin.",
        "B) Spadek stężenia mocznika we krwi o 50% w stosunku do wartości wyjściowych przy prawidłowej diurezie dobowej.",
        "C) Obecność krwinkomoczu w pojedynczym badaniu ogólnym moczu bez zmian w stężeniu kreatyniny w surowicy.",
        "D) Spadek filtracji kłębuszkowej nerek (eGFR) poniżej 60 ml/min/1,73 m2 utrzymujący się przez okres 3 miesięcy.",
        "E) Wzrost stężenia białka C-reaktywnego powyżej 100 mg/l z towarzyszącą gorączką u pacjenta chirurgicznego."
      ]
    },
    {
      qIdx: 1, // Q2
      newOpts: [
        "A) Wskaźnik FENa <1% oraz wysoki ciężar właściwy moczu (>1,020) i wysoka osmolalność (>500 mOsm/kg).",
        "B) Wskaźnik frakcyjnego wydalania przesączonego sodu (FENa) przekraczający 3% przy niskiej osmolalności moczu.",
        "C) Obecność licznych wałeczków ziarnistych oraz brunatnych wałeczków nabłonkowych w osadzie moczu pacjenta.",
        "D) Brak jakiejkolwiek poprawy parametrów nerkowych i diurezy po agresywnym podaniu płynów krystaloidowych.",
        "E) Stężenie sodu w moczu przekraczające 40 mmol/l przy ciężarze właściwym moczu wynoszącym dokładnie 1,010."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Agresywna płynoterapia dożylna krystaloidami w celu przywrócenia prawidłowej wolemii i perfuzji nerek.",
        "B) Natychmiastowe wdrożenie wysokich dawek diuretyków pętlowych (furosemidu) bez podawania płynów infuzyjnych.",
        "C) Rozpoczęcie przewlekłej hemodializoterapii w trybie pilnym przez stały cewnik dializacyjny w żyle szyjnej.",
        "D) Podanie dopaminy w tzw. dawce nerkowej (1-3 µg/kg/min) w celu rozszerzenia naczyń kłębuszkowych u chorego.",
        "E) Wdrożenie empirycznej immunosupresji metyloprednizolonem w dożylnych pulsach po 500 mg przez 3 kolejne dni."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) Kwasica oporna na leczenie (pH <7,15), hiperkaliemia (>6,5 mmol/l), przewodnienie z obrzękiem płuc, mocznica.",
        "B) Wzrost stężenia kreatyniny w surowicy z 0,9 mg/dl do 1,4 mg/dl u stabilnego chorego bez objawów klinicznych.",
        "C) Pojedynczy epizod gorączki powyżej 38,0°C u pacjenta leczonego na oddziale nefrologii z powodu odwodnienia.",
        "D) Wystąpienie łagodnego obrzęku ciastowatego wokół kostek u pacjenta zachowującego prawidłową diurezę dobową.",
        "E) Stwierdzenie pojedynczych bakterii w osadzie moczu pobranego ze środkowego strumienia u chorego bez gorączki."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "A) Zastosowanie izoosmolarnych lub niskoosmolarnych kontrastów oraz nawadnianie dożylne 0,9% NaCl lub NaHCO3.",
        "B) Podawanie wysokich dawek doustnych niesteroidowych leków przeciwzapalnych przed i po podaniu kontrastu.",
        "C) Rutynowe profilaktyczne wykonanie sesji hemodializy bezpośrednio przed i po badaniu tomograficznym.",
        "D) Podanie furosemidu we wstrzyknięciu dożylnym w celu natychmiastowego wypłukania cząsteczek kontrastu.",
        "E) Całkowite wstrzymanie podawania płynów doustnych i dożylnych na 24 godziny przed planowanym badaniem."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A) Należą do nich: NGAL (lipokalina związana z żelatynazą neutrofilów) oraz KIM-1 (cząsteczka uszkodzenia nerek).",
        "B) Jedynym swoistym biomarkerem wczesnego uszkodzenia kłębuszków nerkowych pozostaje stężenie glukozy w moczu.",
        "C) Do wczesnych biomarkerów uszkodzenia nerek zalicza się stężenie bilirubiny całkowitej w surowicy krwi.",
        "D) Parametrem o najwyższej czułości i swoistości we wczesnym AKI pozostaje aktywność aminotransferazy alaninowej.",
        "E) Wczesne uszkodzenie cewek nerkowych diagnozuje się wyłącznie na podstawie pomiaru ciśnienia tętniczego."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A) Zjawisko to polega na gwałtownym spadku filtracji nerkowej indukowanym odruchowym skurczem naczyń nerkowych.",
        "B) Leki te nie wywierają żadnego mierzalnego wpływu na hemodynamikę kłębuszkową u pacjentów w stanie hipowolemii.",
        "C) Blokery układu RAA rozszerzają tętniczkę doprowadzającą, podczas gdy NLPZ rozszerzają tętniczkę odprowadzającą.",
        "D) Skojarzenie to wykazuje silne udowodnione działanie nefroprotekcyjne chroniące przed uszkodzeniem cewek.",
        "E) Leki te wchodzą w reakcję chemiczną wytrącającą nierozpuszczalne kryształy w świetle miedniczki nerkowej."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A) Furosemid podany u odwodnionego pacjenta pogłębia hipowolemię i może przekształcić AKI przednerkowe w nerkowe.",
        "B) Furosemid u chorych z niewydolnością nerek wywołuje natychmiastową nieodwracalną martwicę komórek wątroby.",
        "C) Diuretyki pętlowe wchodzą w niebezpieczną reakcję z erytrocytami prowadząc do ich wewnątrznaczyniowej lizy.",
        "D) Podanie furosemidu powoduje trwałe zarośnięcie światła obu moczowodów przez wytrącające się sole kwasu.",
        "E) Furosemid jest lekiem zarejestrowanym w farmakopei wyłącznie do leczenia ostrej hiperkaliemii sercowej."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Brunatne wałeczki ziarniste (muddy brown casts) oraz złuszczone komórki nabłonka cewek nerkowych w osadzie.",
        "B) Wałeczki erytrocytarne złożone ze zdegenerowanych krwinek czerwonych typowe dla kłębuszkowych zapaleń nerek.",
        "C) Wałeczki leukocytarne z obecnością licznych eozynofilów w barwieniu metodą Hansela u chorego z zapaleniem.",
        "D) Czysty osad moczu z całkowitym brakiem jakichkolwiek elementów morfotycznych i bez kryształów mineralnych.",
        "E) Obecność kryształów moczanu sodu o silnej ujemnej dwułomności w mikroskopie ze światłem spolaryzowanym."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A) Test z furosemidem (FST) oceniający diurezę w ciągu 2 godzin po podaniu 1,0–1,5 mg/kg m.c. furosemidu u ewolemika.",
        "B) Wykonanie przeglądowego zdjęcia rentgenowskiego jamy brzusznej w pozycji stojącej po doustnym barycie.",
        "C) Podanie dożylne 100 g mannitolu z jednoczesnym doustnym obciążeniem 3 litrami niegazowanej wody źródlanej.",
        "D) Pomiar ciśnienia w drogach żółciowych podczas endoskopowej cholangiopankreatografii wstecznej (ECPW).",
        "E) Biopsja aspiracyjna cienkoigłowa dolnego bieguna prawej nerki pod kontrolą rezonansu magnetycznego."
      ]
    }
  ],
  69: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A) Białkomocz nerczycowy (>3,5 g/dobę lub >50 mg/kg/d), hipoalbuminemia (<30 g/l), obrzęki oraz hiperlipidemia.",
        "B) Krwinkomocz z obecnością wałeczków erytrocytarnych, nadciśnienie tętnicze, oliguria oraz ból w okolicy lędźwiowej.",
        "C) Izolowana leukocyturia z obecnością dodatniego posiewu moczu i prawidłowym stężeniem białka w dobowej zbiórce.",
        "D) Cukromocz przy prawidłowej glikemii na czczo z towarzyszącym uogólnionym świądem skóry i rumieniem powłok.",
        "E) Izolowany spadek stężenia kreatyniny w surowicy poniżej 0,2 mg/dl przy braku jakichkolwiek zmian w moczu."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Zakrzepica żył nerkowych i zatorowość płucna na tle ucieczki antytrombiny III i białka C z moczem oraz syntezy fibrynogenu.",
        "B) Masywne krwawienie z pękniętych żylaków przełyku wywołane gwałtownym skokiem ciśnienia w żyle wrotnej.",
        "C) Ostra perforacja ściany pęcherza moczowego wywołana nadmiernym gromadzeniem się rozpuszczalnych białek.",
        "D) Pęknięcie torebki śledziony w wyniku napadowego kaszlu u pacjenta z obustronnym wysiękiem opłucnowym.",
        "E) Całkowita martwica kory nadnerczy wywołana odkładaniem się zmutowanych łańcuchów lekkich immunoglobulin."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "A) Przeciwciała przeciwko receptorowi dla fosfolipazy A2 (anty-PLA2R) oznaczane w surowicy krwi pacjenta.",
        "B) Przeciwciała przeciwko tyreoperoksydazie (anty-TPO) oraz przeciwko tyreoglobulinie w surowicy krwi.",
        "C) Przeciwciała przeciwjądrowe (ANA) o typie świecenia plamistym w mianie przekraczającym wartość 1:640.",
        "D) Przeciwciała przeciwko cytrulinowanym peptydom (anty-CCP) w surowicy krwi u chorych z zapaleniem stawów.",
        "E) Przeciwciała przeciwko endomysium mięśni gładkich (EMA) w klasie immunoglobuliny A u osób dorosłych."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A) Rytuksymab (przeciwciało monoklonalne skierowane wybiórczo przeciwko antygenowi CD20 limfocytów B).",
        "B) Trastuzumab (przeciwciało blokujące receptor naskórkowego czynnika wzrostu HER2 w onkologii klinicznej).",
        "C) Infliksymab (chimeryczne przeciwciało monoklonalne neutralizujące rozpuszczalny czynnik martwicy guzów).",
        "D) Omalizumab (humanizowane przeciwciało monoklonalne wiążące wolną immunoglobulinę E w ciężkiej astmie).",
        "E) Pembrolizumab (przeciwciało blokujące receptor programowanej śmierci komórki PD-1 w immunoterapii)."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) Z powodu ciężkiej hiperlipidemii nerczycowej (wzrost LDL i TG) stwarzającej ogromne przyspieszone ryzyko zawału.",
        "B) Statyny wykazują bezpośrednie działanie mechaniczne zamykające uszkodzone pory w kłębuszkach nerkowych.",
        "C) W celu natychmiastowego podniesienia skurczowego i rozkurczowego ciśnienia tętniczego u chorego w hipotonii.",
        "D) Statyny rozpuszczają sole wapniowe w miąższu nerek zapobiegając powstawaniu kamicy moczowodowej u pacjenta.",
        "E) Leki te stymulują wydzielanie endogennej erytropoetyny i stanowią podstawową metodę leczenia niedokrwistości."
      ]
    }
  ],
  70: [
    {
      qIdx: 4, // Q5
      newOpts: [
        "A) Pulsujący metyloprednizolon i.v. z przejściem na prednizon p.o. W SKOJARZENIU z cyklofosfamidem i plazmaferezą.",
        "B) Monoterapia doustnym hydrochlorotiazydem w skojarzeniu z ograniczeniem podaży soli kuchennej w diecie.",
        "C) Doustny metotreksat w małej dawce podawany raz w tygodniu z obligatoryjną suplementacją kwasu foliowego.",
        "D) Skojarzenie wankomycyny z gentamycyną we wlewach dożylnych przez okres 14 kolejnych dni hospitalizacji.",
        "E) Cyklosporyna A podawana w monoterapii doustnej z monitorowaniem stężenia leku we krwi w punkcie C0."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A) Wałeczki erytrocytarne oraz wyługowane, dysmorficzne erytrocyty (akantocyty) w mikroskopowej ocenie osadu.",
        "B) Wałeczki woskowe z obecnością gęstych mas bezpostaciowych bez jakichkolwiek elementów komórkowych.",
        "C) Czysty osad moczu z całkowitym brakiem elementów morfotycznych, krwinek i bez obecności wałeczków.",
        "D) Mnogie kryształy szczawianu wapnia w kształcie kopert pocztowych widoczne w świetle mikroskopowym.",
        "E) Pączkujące komórki drożdżaków oraz pseudogrzybnia Candida albicans w polu widzenia pod mikroskopem."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A) W typie II występują ziarniste złogi kompleksów immunologicznych (np. w SLE, APSGN), a w typie I linijne IgG.",
        "B) Postać RPGN typu II występuje wyłącznie u skrajnie niedojrzałych noworodków z wrodzonymi wadami nerek.",
        "C) W postaci RPGN typu II u pacjentów nigdy nie stwierdza się obecności białkomoczu ani krwinkomoczu.",
        "D) Typ I jest postacią wywoływaną wyłącznie przez bezpośrednią inwazję cząstek ludzkiego wirusa niedoboru HIV.",
        "E) Typ II charakteryzuje się łagodnym przebiegiem i nigdy nie prowadzi do rozwoju ostrej niewydolności nerek."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Obustronne zlewne zagęszczenia typu matowej szyby (ground-glass) i konsolidacje z zaoszczędzeniem obwodu płuc.",
        "B) Obwodowe zmiany włókniste o typie plastra miodu zlokalizowane wyłącznie w szczytowych partiach obu płuc.",
        "C) Obecność wolnego płynu w obu jamach opłucnowych z towarzyszącym poziomem gazu w przestrzeni opłucnej.",
        "D) Masywne zwapnienia zlokalizowane w obrębie opłucnej ściennej i przeponowej bez zmian w miąższu płucnym.",
        "E) Całkowicie prawidłowy obraz miąższu płucnego bez jakichkolwiek odchyleń od normy w badaniu tomograficznym."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) Jednoczesna obecność u pacjenta przeciwciał przeciwko błonie podstawnej (anty-GBM) oraz przeciwciał ANCA.",
        "B) Jednoczesne stwierdzenie obecności białka oraz glukozy w rutynowym badaniu ogólnym moczu u chorego.",
        "C) Dodatni wynik testu ciążowego oraz jednoczesne potwierdzenie obecności przeciwciał anty-HIV w surowicy.",
        "D) Równoczesny nagły wzrost skurczowego ciśnienia tętniczego oraz częstotliwości akcji serca u pacjenta.",
        "E) Jednoczesne stwierdzenie obecności świeżej krwi w stolcu oraz jawnego krwinkomoczu w badaniu moczu."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A) Zewnątrzwłośniczkowy rozplem komórek nabłonka torebki Bowmana i makrofagów w >=50% ocenianych kłębuszków.",
        "B) Anatomiczny kształt nerki przypominający sierp księżyca stwierdzany w rutynowym badaniu ultrasonograficznym.",
        "C) Stwierdzenie obecności dokładnie pojedynczego półksiężyca komórkowego w całym pobranym bioptacie nerki.",
        "D) Całkowity zanik pętli naczyniowych kłębuszków z pozostawieniem pogrubiałych torebek łącznotkankowych.",
        "E) Zmiana zabarwienia świeżego moczu na kolor srebrzysto-opalizujący pod wpływem enzymów leukocytarnych."
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

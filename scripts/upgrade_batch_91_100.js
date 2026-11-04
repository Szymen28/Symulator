const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const updates = {
  91: [
    {
      qIdx: 1, // Q2
      newOpts: [
        "A) Indometacyna podawana dożylnie w celu farmakologicznego zamknięcia przewodu tętniczego.",
        "B) Alprostadyl (Prostaglandyna E1) w ciągłym wlewie i.v. w celu utrzymania drożności przewodu (PDA).",
        "C) Furosemid w wysokiej dawce moczopędnej w celu zmniejszenia obciążenia wstępnego komór serca.",
        "D) Digoksyna we wstrzyknięciu dożylnym w celu natychmiastowego zwiększenia kurczliwości mięśnia.",
        "E) Kwas traneksamowy w bolusie dożylnym celem ustabilizowania hemostazy naczyniowej u noworodka."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) Zamknięcie przewodu tętniczego za pomocą miniaturowego okludera naczyniowego z dostępu przez tętnicę.",
        "B) Wytworzenie lub powiększenie ubytku w przegrodzie międzyprzedsionkowej celem poprawy mieszania krwi.",
        "C) Zespolenie tętnicy podobojczykowej z gałęzią tętnicy płucnej sposobem Blalock-Taussig u noworodka.",
        "D) Wycięcie zwężonego odcinka cieśni aorty z następowym zespoleniem tętniczym koniec-do-końca.",
        "E) Wprowadzenie stentu samorozprężalnego do pnia lewej tętnicy wieńcowej na sali hemodynamicznej."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A) Ponieważ po 3. tygodniu życia u noworodka dochodzi do fizjologicznego zarośnięcia obu tętnic wieńcowych.",
        "B) Ponieważ po 3. tygodniu życia lewa komora traci masę mięśniową w krążeniu płucnym o niskim oporze.",
        "C) Ponieważ po 14. dobie życia grasica ulega przerostowi uniemożliwiającemu dostęp do śródpiersia przedniego.",
        "D) Ze względu na całkowitą utratę zdolności do regeneracji śródbłonka aorty wstępującej po 1. miesiącu życia.",
        "E) Ponieważ u noworodków z wadami siniczymi po 3. tygodniu dochodzi do nieodwracalnej aplazji zastawek."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Niewyczuwalne lub znacznie osłabione tętno na tętnicach udowych przy dobrze napiętym tętnie na ramionach.",
        "B) Stała sinica centralna obejmująca wargi i język bez różnicy w zabarwieniu kończyn górnych i dolnych.",
        "C) Brak jakichkolwiek szmerów nad sercem przy jednoczesnym poszerzeniu sylwetki serca w kształcie buta.",
        "D) Wyraźne podwyższenie ciśnienia skurczowego na kończynach dolnych w porównaniu do kończyn górnych.",
        "E) Prawidłowe stężenie gazów krwi włośniczkowej i brak kwasicy metabolicznej mimo ciężkiego stanu dziecka."
      ]
    }
  ],
  92: [
    {
      qIdx: 5, // Q6
      newOpts: [
        "A) Penicylina krystaliczna G podana dożylnie co najmniej 4 godziny przed ukończeniem porodu drogami natury.",
        "B) Jednorazowa doustna dawka ciprofloksacyny przyjęta w momencie wystąpienia pierwszych skurczów macicy.",
        "C) Klindamycyna podawana dopochwowo w postaci globulek przez 7 dni poprzedzających planowany termin porodu.",
        "D) Wankomycyna we wlewie dożylnym stosowana rutynowo u każdej ciężarnej bez względu na wywiad uczuleniowy.",
        "E) Doksycyklina w tabletkach stosowana przez 14 dni w trzecim trymestrze ciąży w ramach profilaktyki."
      ]
    }
  ],
  93: [
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Izolowany szczekający kaszel występujący sporadycznie wyłącznie podczas gwałtownego płaczu dziecka.",
        "B) Obecność stridoru wdechowego i cech wzmożonego wysiłku oddechowego u spokojnego dziecka w spoczynku.",
        "C) Gorączka powyżej 38,5°C bez duszności i bez jakichkolwiek świstów krtaniowych w spoczynku i przy płaczu.",
        "D) Prawidłowa liczba oddechów na minutę przy saturacji SpO2 wynoszącej 98% w powietrzu atmosferycznym.",
        "E) Brak apetytu i niechęć do przyjmowania posiłków stałych bez objawów duszności krtaniowej u niemowlęcia."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) Z powodu konieczności wykonania kontrolnego zdjęcia rentgenowskiego krtani w projekcji bocznej po leku.",
        "B) Z powodu ryzyka efektu z odbicia (rebound effect) i ponownego obrzęku po wygaśnięciu działania leku.",
        "C) Ponieważ inhalacja z adrenaliny wywołuje przejściową ślepotę zmierzchową trwającą do 6 godzin od podania.",
        "D) Z uwagi na bezwzględny wymóg prawny wykonania punkcji lędźwiowej po każdej nebulizacji na SOR.",
        "E) W celu monitorowania dobowej zbiórki moczu na obecność metabolitów katecholamin u małego dziecka."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "A) Pozostawienie dziecka w ramionach rodzica i maksymalne ograniczenie stresu oraz bolesnych zabiegów.",
        "B) Natychmiastowe unieruchomienie dziecka pasami na desce ortopedycznej w celu zbadania gardła szpatułką.",
        "C) Wdrożenie intensywnego płukania żołądka zimną wodą za pomocą grubościennego zgłębnika nosowo-żołądkowego.",
        "D) Odizolowanie dziecka od rodziców i umieszczenie go w ciemnym pomieszczeniu o podwyższonej wilgotności.",
        "E) Wykonanie serii bolesnych nakłuć żylnych w celu pobrania pełnego panelu badań toksykologicznych."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A) Przejściowy skurcz mięśni gładkich tchawicy wywołany bezpośrednim działaniem histaminy na receptory H1.",
        "B) Turbulentny przepływ powietrza przez zwężony wskutek obrzęku zapalnego podgłośniowy odcinek krtani.",
        "C) Drganie wiotkich fałdów nalewkowo-nagłośniowych zapadających się do wnętrza krtani w fazie wydechu.",
        "D) Obecność gęstych czopów śluzowych całkowicie blokujących światło obu oskrzeli głównych u dziecka.",
        "E) Porażenie nerwów krtaniowych wstecznych wywołane neurotoksynami wirusa grypy lub paragrypy."
      ]
    }
  ],
  94: [
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Pozycja Trendelenburga z uniesionymi kończynami dolnymi i opuszczoną głową poniżej poziomu tułowia.",
        "B) Pozycja trójnoga (tripod) z pochyleniem tułowia ku przodowi, wyciągnięciem szyi i otwartymi ustami.",
        "C) Pozycja embrionalna na lewym boku z podkurczonymi kończynami i przygięciem brody do mostka.",
        "D) Pozycja zgięciowa z kolanami silnie przyciśniętymi do przedniej ściany klatki piersiowej w łóżeczku.",
        "E) Pozycja leżąca na wznak z odgiętą w łuk głową (opistotonus) i uogólnionym prężeniem mięśni grzbietu."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) Nadprodukcji śliny przez ślinianki przyuszne w przebiegu ostrego zapalenia wirusowego narządów.",
        "B) Skrajnego bólu gardła i mechanicznej przeszkody uniemożliwiającej połykanie śliny przez chore dziecko.",
        "C) Porażenia obwodowego nerwu twarzowego prowadzącego do opadania kącika ust i wycieku śliny.",
        "D) Ostrego epizodu refluksu żołądkowo-przełykowego z biernym zarzucaniem kwaśnej treści pokarmowej.",
        "E) Izolowanego porażenia opuszkowego jąder nerwów czaszkowych IX i X w pniu mózgu u pacjenta."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "A) Na sali operacyjnej, w znieczuleniu wziewnym, w zespole z anestezjologiem, laryngologiem i zestawem do tracheotomii.",
        "B) W ambulansie ratunkowym podczas dynamicznego transportu na sygnale bez obecności lekarza specjalisty.",
        "C) W gabinecie lekarza POZ za pomocą szpatułki laryngologicznej i plastikowej rurki ustno-gardłowej.",
        "D) Na korytarzu izby przyjęć przy użyciu standardowego zestawu do intubacji dorosłych bez znieczulenia.",
        "E) W pracowni tomografii komputerowej po podaniu dożylnego środka cieniującego przed wykonaniem skanów."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Proces zapalny dotyczy tkanek nadgłośniowych, a struny głosowe pozostają anatomicznie niezmienione.",
        "B) Fałdy głosowe ulegają wrodzonemu zrośnięciu włóknistemu w spoidle przednim od pierwszych dni życia.",
        "C) Dochodzi do obustronnego porażenia nerwu podjęzykowego i całkowitego unieruchomienia trzonu języka.",
        "D) Migdałki podniebienne i gardłowy ulegają gwałtownej atrofii i martwicy pod wpływem toksyn bakteryjnych.",
        "E) Tkanki miękkie nasady języka ulegają martwicy niedokrwiennej na skutek zakrzepicy tętnicy językowej."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) Ostra asfiksja wskutek całkowitego zamknięcia światła krtani przez masywnie obrzękniętą nagłośnię.",
        "B) Samoistne pęknięcie torebki śledziony w mechanizmie uogólnionego wstrząsu septycznego u dziecka.",
        "C) Krwotok z pękniętego naczynia w dnie ostrego wrzodu trawiennego żołądka wywołany stresem fizycznym.",
        "D) Ostry zawał mięśnia sercowego ze wstrząsem kardiogennym na tle skurczu naczyń wieńcowych u dziecka.",
        "E) Piorunująca martwica hepatocytów i ostra niewydolność wątroby indukowana endotoksynami pałeczki Hib."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A) Szczepieniem obowiązkowym dla wszystkich dzieci, podawanym w schemacie 2, 3-4, 5-6 oraz 16-18 miesiąc życia.",
        "B) Szczepieniem wyłącznie zalecanym i pełnopłatnym, dostępnym na indywidualną receptę w aptece otwartej.",
        "C) Szczepieniem podawanym w ramach refundacji publicznej wyłącznie osobom po ukończeniu 65. roku życia.",
        "D) Szczepieniem całkowicie wycofanym z użycia w Europie ze względu na powikłania poszczepienne u niemowląt.",
        "E) Szczepieniem jednorazowym podawanym obligatoryjnie w szkole młodzieży w 18. roku życia przed maturą."
      ]
    }
  ],
  95: [
    {
      qIdx: 1, // Q2
      newOpts: [
        "A) Rutynowa dożylna antybiotykoterapia ceftriaksonem w skojarzeniu z doustną azytromycyną przez 10 dni.",
        "B) Tlenoterapia (przy SpO2 <90-92%), odpowiednie nawadnianie dożylne/doustne i toaleta dróg oddechowych.",
        "C) Rutynowe stosowanie doustnych lub dożylnych glikokortykosteroidów w wysokich dawkach przeciwzapalnych.",
        "D) Rutynowa nebulizacja z krótzkodziałających beta-2-mimetyków (salbutamolu) co 4 godziny u każdego niemowlęcia.",
        "E) Ciągły dożylny wlew aminofiliny w pompie infuzyjnej pod ścisłą kontrolą stężenia teofiliny w surowicy."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Salbutamol podany drogą wziewną wywołuje natychmiastowe zatrzymanie krążenia u niemowląt poniżej 1. r.ż.",
        "B) Mięśniówka oskrzelików jest słabo rozwinięta, a obturacja wynika z obrzęku śluzówki i czopów śluzowych.",
        "C) Salbutamol jest lekiem o wyłącznym działaniu przeciwgrzybiczym i nie wpływa na opory dróg oddechowych.",
        "D) Receptory adrenergiczne beta-2 w drzewie oskrzelowym wykształcają się dopiero w okresie pokwitania u ludzi.",
        "E) Cząsteczki salbutamolu stymulują ekspresję receptorów i nasilają replikację syncytialnego wirusa oddechowego RSV."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) Patognomoniczny objaw ostrego ropnego zapalenia opon mózgowo-rdzeniowych o etiologii pneumokokowej.",
        "B) Skrajny wysiłek oddechowy ze wspomaganiem wentylacji przez mięśnie mostkowo-obojczykowo-sutkowe.",
        "C) Napad drgawek gorączkowych prostych z symetrycznym klonicznym drżeniem mięśniówki obręczy barkowej.",
        "D) Wrodzona wiotkość aparatu więzadłowego kręgosłupa szyjnego ustępująca samoistnie w 2. roku życia.",
        "E) Fizjologiczne zachowanie motoryczne niemowlęcia występujące w fazie głębokiego snu NREM w łóżeczku."
      ]
    }
  ],
  96: [
    {
      qIdx: 1, // Q2
      newOpts: [
        "A) Streptococcus pneumoniae nie wytwarza beta-laktamaz, więc kwas klawulanowy jest zbędny i nasila biegunkę.",
        "B) Kwas klawulanowy całkowicie neutralizuje bakteriobójcze działanie amoksycyliny na ścianę pneumokoków.",
        "C) Amoksycylina z kwasem klawulanowym jest lekiem bezwzględnie przeciwwskazanym u dzieci przed 18. r.ż.",
        "D) Streptococcus pneumoniae jest bakterią atypową niewrażliwą na jakiekolwiek antybiotyki beta-laktamowe.",
        "E) Skojarzenie amoksycyliny z inhibitorem wywołuje u dzieci nieodwracalną aplazję układu czerwonokrwinkowego."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Bólu rzutowanego w przebiegu zapalenia dolnego płata płuca z podrażnieniem opłucnej przeponowej.",
        "B) Ostrej perforacji wrzodu dwunastnicy wywołanej miejscowym działaniem toksyn bakteryjnych w jelicie.",
        "C) Pęknięcia śledziony w wyniku gwałtownego kaszlu i wzrostu ciśnienia w klatce piersiowej u dziecka.",
        "D) Ostrego zakrzepowego zapalenia żyły wrotnej na podłożu wrodzonej trombofilii uogólnionej u niemowlęcia.",
        "E) Wrodzonej atrezji dróg żółciowych dekompensującej się w trakcie ostrej infekcji dróg oddechowych."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) Schemat 2+1: dwie dawki w 1. roku życia (2., 4. m.ż.) oraz dawka uzupełniająca w 2. roku życia (13.-15. m.ż.).",
        "B) Pojedyncza dawka szczepionki podawana podskórnie w 1. dobie życia na oddziale noworodkowym przed wypisem.",
        "C) Trzy dawki w 1. roku życia (2., 3., 4. m.ż.) bez konieczności podawania jakichkolwiek dawek w 2. roku życia.",
        "D) Podanie czterech dawek w odstępach tygodniowych w 1. miesiącu życia drogą doustną w poradni POZ.",
        "E) Szczepienie wyłącznie młodzieży po ukończeniu 14. roku życia w ramach bilansu zdrowia ucznia w szkole."
      ]
    }
  ],
  97: [
    {
      qIdx: 1, // Q2
      newOpts: [
        "A) Ciało obce działa jak zastawka: przepuszcza powietrze na wdechu, a blokuje jego wypływ w fazie wydechu.",
        "B) Ciało obce uwalnia toksyny paraliżujące receptory adrenergiczne i wywołujące trwały rozkurcz pęcherzyków.",
        "C) Dochodzi do całkowitego zarośnięcia naczynia płucnego i zblednięcia miąższu płuca po stronie przeszkody.",
        "D) Ciało obce zasysa powietrze z jamy opłucnej przez ubytek w ścianie oskrzela do wnętrza miąższu płucnego.",
        "E) Zjawisko to wynika z odruchowego zahamowania czynności ośrodka oddechowego w rdzeniu przedłużonym mózgu."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) Większość ciał obcych u dzieci (orzeszki, nasiona, plastik) to materiały niewidoczne w RTG (radiolucent).",
        "B) Promienie rentgenowskie ulegają całkowitemu rozproszeniu w tkance płucnej małego dziecka w inkubatorze.",
        "C) Zdjęcie klatki piersiowej u dzieci wykonuje się wyłącznie w pozycji leżącej z opuszczonymi rękami wzdłuż ciała.",
        "D) Ciało obce po dostaniu się do oskrzela natychmiast ulega rozpuszczeniu przez enzymy komórkowe makrofagów.",
        "E) Standardowe RTG uwidacznia wyłącznie zmiany zlokalizowane w przestrzeni zaotrzewnowej jamy brzusznej."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A) Ciężkie zapalenie chemiczne wywołane uwalnianiem wolnych kwasów tłuszczowych z zaaspirowanego orzecha.",
        "B) Alergiczny odczyn anafilaktyczny skóry wywołany kontaktem dłoni dziecka ze skorupką orzecha włoskiego.",
        "C) Zakażenie grzybicze błony śluzowej jamy ustnej wywołane przez zarodniki pleśni bytujące na arachidach.",
        "D) Wrodzony niedobór enzymu trawiącego lipidy roślinne w rąbku szczoteczkowym enterocytów dwunastnicy.",
        "E) Przewlekły skurcz oskrzeli u dorosłych rolników pracujących przy mechanicznym zbiorze orzechów ziemnych."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Jednostronny, monofoniczny świst wydechowy (wheezing) ze ściszeniem szmeru pęcherzykowego po tej stronie.",
        "B) Obustronne, symetryczne rzężenia drobnobańkowe słyszalne nad polami przypodstawnymi obu płuc u dziecka.",
        "C) Szorstki szmer skurczowy o charakterze crescendo-decrescendo promieniujący do naczyń szyjnych pacjenta.",
        "D) Całkowity brak jakichkolwiek zjawisk osłuchowych nad całym polem płucnym przy prawidłowym oddechu.",
        "E) Obustronny stridor wdechowo-wydechowy ustępujący całkowicie po podaniu doustnego leku przeciwhistaminowego."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A) Zawsze, gdy wywiad nagłego zakrztuszenia jest jednoznaczny lub utrzymują się objawy kliniczne u dziecka.",
        "B) Nigdy – całkowicie prawidłowy obraz radiologiczny RTG klatki piersiowej wyklucza potrzebę bronchoskopii.",
        "C) Wyłącznie w sytuacji, gdy u dziecka dojdzie do masywnego krwioplucia z odkrztuszaniem skrzepów krwi.",
        "D) Dopiero po ukończeniu przez pacjenta 18. roku życia i osiągnięciu pełnej dojrzałości układu oddechowego.",
        "E) Wyłącznie na pisemny wniosek prokuratora rejonowego prowadzącego dochodzenie w sprawie wypadku domowego."
      ]
    }
  ],
  98: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A) >= 20 mmol/l w badaniu przesiewowym noworodków z krwi bibułowej metodą immunoenzymatyczną.",
        "B) >= 40 mmol/l w pojedynczym wstępnym oznaczeniu stężenia chlorków w próbce potu zebranej na gazik.",
        "C) >= 60 mmol/l w co najmniej dwóch niezależnych pomiarach stężenia chlorków w pocie metodą jonoforezy.",
        "D) >= 80 mmol/l w próbie stymulacji wydzielania potu pilokarpiną u pacjenta po 18. roku życia.",
        "E) >= 100 mmol/l w bezpośrednim badaniu konduktometrycznym przewodnictwa elektrycznego potu na skórze."
      ]
    },
    {
      qIdx: 1, // Q2
      newOpts: [
        "A) p.Phe508del (DeltaF508 – delecja kodonu fenyloalaniny w pozycji 508 białka CFTR).",
        "B) p.Gly542X (G542X – mutacja nonsensowna kodonu przedwczesnego stopu w eksonie 11).",
        "C) p.Gly551D (G551D – mutacja missensowna zaburzająca bramkowanie kanału chlorkowego).",
        "D) p.Trp1282X (W1282X – mutacja terminacyjna w domenie wiążącej nukleotydy NBD2 genu).",
        "E) p.Asn1303Lys (N1303K – mutacja punktowa w pętli cytoplazmatycznej białka błonowego)."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) Hydrolizuje zewnątrzkomórkowe DNA uwolnione z rozpadających się neutrofili w ropnym śluzie, zmniejszając lepkość.",
        "B) Bezpośrednio rozpuszcza otoczkę polisacharydową pałeczek ropy błękitnej (Pseudomonas aeruginosa) w oskrzelach.",
        "C) Działa rozkurczająco na mięśniówkę gładką oskrzeli poprzez wybiórczą stymulację receptorów adrenergicznych beta-2.",
        "D) Hamuje wydzielanie kwasu solnego przez komórki okładzinowe błony śluzowej żołądka u chorych z mukowiscydozą.",
        "E) Pobudza proliferację i regenerację komórek beta wewnątrzwydzielniczych wysp trzustkowych Langerhansa u dzieci."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Dieta wysokoenergetyczna (120-150% normy), bogatotłuszczowa (35-40% energii), bogatobiałkowa z dosalaniem.",
        "B) Dieta niskokaloryczna, bezsolna i ściśle beztłuszczowa z wyeliminowaniem wszelkich olejów roślinnych i masła.",
        "C) Ścisła głodówka lecznicza prowadzona w cyklach naprzemiennych co drugi dzień w celu odciążenia przewodu.",
        "D) Dieta ketogeniczna z zakazem podawania sodu i chloru w celu ograniczenia utraty elektrolitów przez skórę.",
        "E) Dieta ubogobiałkowa z drastycznym ograniczeniem aminokwasów rozgałęzionych jak w schyłkowej mocznicy nerek."
      ]
    }
  ],
  99: [
    {
      qIdx: 1, // Q2
      newOpts: [
        "A) Idiopatyczny przerost kępek Peyera w ścianie jelita po przebytej infekcji wirusowej dróg oddechowych lub pokarmowych.",
        "B) Zaawansowany gruczolakorak prawej połowy okrężnicy naciekający błonę śluzową kątnicy i zastawkę Bauhina.",
        "C) Wrodzony zespół Gardnera z obecnością setek polipów gruczolakowatych w świetle całego przewodu pokarmowego.",
        "D) Przewlekły wrzód trawienny opuszki dwunastnicy powikłany zbliznowaceniem odźwiernika i zastojem pokarmu.",
        "E) Autoimmunologiczne zapalenie trzustki z następowym stwardnieniem przewodu Wirsunga i głowy narządu."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "A) Obecność wolnego gazu w jamie otrzewnej (pneumoperitoneum na RTG) lub objawy rozlanego zapalenia otrzewnej.",
        "B) Niepokój i głośny płacz niemowlęcia w trakcie wykonywania przezskórnego badania ultrasonograficznego brzucha.",
        "C) Podwyższenie temperatury ciała do wartości 37,8°C mierzonej w odbytnicy u dziecka na izbie przyjęć.",
        "D) Wiek niemowlęcia wynoszący 8 miesięcy przy prawidłowej masie ciała i braku cech wstrząsu hipowolemicznego.",
        "E) Wystąpienie pojedynczego epizodu zwymiotowania treścią pokarmową po nakarmieniu mlekiem modyfikowanym."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A) Uczucie pustki w prawym dole biodrowym spowodowane przemieszczeniem się kątnicy w głąb okrężnicy zstępującej.",
        "B) Nagły i ostry ból w nadbrzuszu pojawiający się w momencie gwałtownego zwolnienia ucisku powłok brzusznych.",
        "C) Wyraźne patologiczne tętnienie aorty brzusznej wyczuwalne w okolicy pępka u leżącego na plecach niemowlęcia.",
        "D) Odruchowe wypadanie błony śluzowej bańki odbytnicy przez odbyt podczas gwałtownego płaczu lub kaszlu dziecka.",
        "E) Symetryczne drobnofaliste drżenie mięśniowe kończyn dolnych podczas biernego zginania stawów biodrowych."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Epizody znacznego letargu, patologicznej senności i wiotkości mięśniowej występujące pomiędzy napadami kolki.",
        "B) Stała sztywność karku na 3 poprzeczne palce z dodatnim objawem Brudzińskiego i objawem Kerniga u niemowlęcia.",
        "C) Obecność objawu Babińskiego z grzbietowym zgięciem palucha i wachlarzowym odwiedzeniem pozostałych palców.",
        "D) Obwodowe porażenie nerwu twarzowego typu Bella z wygładzeniem fałdu nosowo-wargowego i niedomykalnością powieki.",
        "E) Uogólniony oczopląs poziomy drobnofalisty nasilający się przy skrajnym odwiedzeniu gałek ocznych w bok."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) Objaw tarczy strzeleckiej (kokardy / tarczy) w przekroju poprzecznym głowicą USG.",
        "B) Objaw podwójnej bańki gazowej (double bubble) w badaniu rentgenowskim brzucha.",
        "C) Objaw wieżyczki kościoła (steeple sign) w projekcji przednio-tylnej szyi dziecka.",
        "D) Objaw odcisku kciuka (thumbprinting sign) na zarysie ściany okrężnicy na RTG.",
        "E) Obraz matowej szyby (ground glass) w miąższu obu płuc w tomografii wysokiej rozdzielczości."
      ]
    }
  ],
  100: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A) Skrętu jelita środkowego (volvulus) na podłożu malrotacji z zaciśnięciem tętnicy krezkowej górnej.",
        "B) Przerostowego zwężenia odźwiernika (HPS) przebiegającego z bezżółciowymi chlustającymi wymiotami.",
        "C) Fizjologicznego łagodnego ulewania niewielkich objętości pokarmu mlecznego bezpośrednio po karmieniu.",
        "D) Alergii na białka mleka krowiego (ABMK) manifestującej się drobnymi smugami krwi w stolcu niemowlęcia.",
        "E) Wrodzonego lub nabytego przejściowego niedoboru laktazy rąbka szczoteczkowego enterocytów jelita."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) Kątnica przemieszcza się do lewego podżebrza, co w przyszłości uniemożliwiłoby typowe rozpoznanie apendycytis.",
        "B) Wyrostek robaczkowy w 100% przypadków ulega natychmiastowej martwicy niedokrwiennej podczas rotacji pętli.",
        "C) Usunięcie wyrostka zmniejsza mechaniczny ucisk wywierany na pień tętnicy krezkowej górnej i żyłę wrotną.",
        "D) Błona śluzowa wyrostka robaczkowego w warunkach wady wrodzonej wydziela toksyczne składniki do żółci.",
        "E) Jest to wymóg administracyjno-proceduralny Narodowego Funduszu Zdrowia warunkujący pełną refundację operacji."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "A) Nieprawidłowymi pasmami otrzewnowymi biegnącymi od kątnicy w nadbrzuszu do ściany brzucha, uciskającymi dwunastnicę.",
        "B) Wrodzonymi przetokami naczyniowymi łączącymi pień aorty brzusznej bezpośrednio ze światłem jelita krętego.",
        "C) Zrostami włóknistymi powstałymi po przebytym wewnątrzmacicznie martwiczym zapaleniu trzustki u płodu.",
        "D) Przerośniętymi okrężnymi włóknami mięśniówki gładkiej w obrębie kanału odźwiernika żołądka u noworodka.",
        "E) Zorganizowanymi skrzeplinami zamykającymi światło pnia żyły wrotnej oraz żyły krezkowej górnej."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A) Zgięcie Treitza po prawej stronie kręgosłupa oraz obraz korkociągu (corkscrew sign) w skręconej dwunastnicy.",
        "B) Objaw tarczy strzeleckiej w poprzecznym przekroju ściany jelita cienkiego w badaniu ultrasonograficznym.",
        "C) Obraz sznura pereł w obrębie dystalnego odcinka tętnicy nerkowej w angiografii subtrakcyjnej naczyń.",
        "D) Prawidłowe zagięcie pętli dwunastnicy w kształcie litery C przekraczające linię środkową ku stronie lewej.",
        "E) Całkowity brak cienia żołądka w jamie brzusznej z następowym poszerzeniem wszystkich pętli jelita grubego."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A) Pozostawienie wątpliwego jelita po derotacji i planowa reoperacja po 24-48 h celem oceny granicy martwicy.",
        "B) Ocena powłok brzusznych noworodka przez innego lekarza chirurga po upływie 5 minut od nacięcia skóry.",
        "C) Wykonanie kontrolnego badania ultrasonograficznego jamy brzusznej przez rezydenta radiologii na sali.",
        "D) Osłuchiwanie szmerów perystaltycznych stetoskopem pediatrycznym co 15 minut na sali wybudzeniowej.",
        "E) Planowe odroczenie resekcji martwiczego jelita do czasu osiągnięcia przez pacjenta pełnoletności."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Tętnica krezkowa górna (SMA) wraz z pniem żyły krezkowej górnej (SMV) w osi wąskiej krezki jelita.",
        "B) Pień tętnicy krezkowej dolnej (IMA) zaopatrujący lewą połowę okrężnicy oraz górną część odbytnicy.",
        "C) Pień trzewny zaopatrujący żołądek, wątrobę, śledzionę oraz proksymalną część dwunastnicy u noworodka.",
        "D) Tętnica nerkowa lewa odchodząca bezpośrednio od bocznej ściany aorty brzusznej poniżej tętnicy krezkowej.",
        "E) Tętnica biodrowa wewnętrzna zaopatrująca narządy miednicy mniejszej oraz dno pęcherza moczowego."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A) W HPS wymioty są chlustające bezżółciowe (mleczne), a w volvulus są ciemnozielone (podbarwione żółcią).",
        "B) W przeroście odźwiernika wymiociny zawierają zawsze masywną domieszkę świeżej krwi i skrzepów.",
        "C) W przeroście odźwiernika wymioty nie występują wcale, a choroba manifestuje się izolowaną biegunką.",
        "D) Skręt jelita środkowego nigdy nie wywołuje wymiotów, a jedynym objawem jest zatrzymanie oddawania moczu.",
        "E) Obraz kliniczny wymiotów w obu jednostkach chorobowych jest całkowicie identyczny i nie pozwala na różnicowanie."
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

const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const updates = {
  51: [
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Ponieważ adrenalina powoduje natychmiastową nieodwracalną martwicę ściany żołądka i miąższu wątroby.",
        "B) Ponieważ działa tylko przejściowo i wymaga skojarzenia z metodą mechaniczną (klips) lub termiczną.",
        "C) Ponieważ adrenalina wywołuje gwałtowny spadek systemowego ciśnienia tętniczego i wstrząs kardiogenny.",
        "D) Ponieważ wykazuje całkowitą nieskuteczność hemostatyczną u kobiet w wieku przedmenopauzalnym.",
        "E) Ponieważ adrenalina aktywuje lokalną fibrynolizę i natychmiast rozpuszcza nowo powstały skrzep płytkowy."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A) W celu natychmiastowej eradykacji Helicobacter pylori w kwasowym środowisku światła żołądka.",
        "B) W celu stymulacji motoryki żołądka (agonizm receptorów motyliny) i opróżnienia go ze skrzepów krwi.",
        "C) W celu miejscowego znieczulenia powierzchniowego błony śluzowej gardła i krtani przed badaniem.",
        "D) W celu całkowitego i trwałego zablokowania wydzielania kwasu solnego przez komórki okładzinowe.",
        "E) W celu podniesienia średniego ciśnienia tętniczego krwi poprzez pobudzenie receptorów naczyniowych."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A) Embolizacja tętnicy żołądkowo-dwunastniczej (TAE) w radiologii zabiegowej LUB pilna operacja chirurgiczna.",
        "B) Doustne podanie węgla aktywowanego w dawce 50 g w celu adsorpcji wolnej krwi ze światła żołądka.",
        "C) Założenie zewnętrznej mechanicznej opaski uciskowej na powłoki nadbrzusza na okres 24 godzin.",
        "D) Szybkie przetoczenie 20 litrów soli fizjologicznej przez wkłucie obwodowe celem forsowania diurezy.",
        "E) Wyłącznie zachowawcza obserwacja kliniczna na oddziale chorób wewnętrznych bez powtórnych procedur."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Z powodu ostrej kłębuszkowej niewydolności nerek z odkładaniem się złogów hemoglobiny w pętlach Henlego.",
        "B) Z trawienia i wchłaniania białek krwi w jelicie cienkim oraz spadku filtracji kłębuszkowej w hipowolemii.",
        "C) Z powodu masywnego rozpadu komórek mięśni szkieletowych (rabdomiolizy) indukowanego wstrząsem.",
        "D) Wskutek ostrego przedawkowania preparatów witaminy D i wtórnego upośledzenia resorpcji kanalikowej.",
        "E) Z powodu wstępującego zakażenia układu moczowego bakteriami rozkładającymi mocznik do amoniaku."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A) Ponieważ zakażenie H. pylori predysponuje bezpośrednio do rozwoju raka gruczołowego prawej połowy okrężnicy.",
        "B) Ponieważ eradykacja H. pylori redukuje ryzyko nawrotu wrzodu i krwawienia niemal do zera bez stałych IPP.",
        "C) Ponieważ bakteria ta uwalnia egzotoksyny niszczące zastawkę aortalną serca i wywołujące zapalenie wsierdzia.",
        "D) Ponieważ H. pylori syntetyzuje witaminę K zaburzając działanie doustnych leków przeciwkrzepliwych.",
        "E) Ponieważ przewlekła infekcja H. pylori jest udowodnionym czynnikiem wyzwalającym rzut choroby Crohna."
      ]
    }
  ],
  52: [
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Hipokaliemia nasila nerkową syntezę amoniaku, a zasadowica przesuwa NH4+ do nienaładowanego NH3 przenikającego do OUN.",
        "B) Hipokaliemia niszczy wybiórczo komórki Purkinjego w korze móżdżku wywołując nagłą ataksję móżdżkową.",
        "C) Zasadowica metaboliczna prowadzi do natychmiastowego wykrzepiania krwi w świetle pnia żyły wrotnej.",
        "D) Zaburzenia elektrolitowe nie wywierają żadnego bezpośredniego wpływu na metabolizm i dystrybucję amoniaku.",
        "E) Zwiększają nerkowe wydalanie podawanej doustnie laktulozy z moczem całkowicie znosząc jej działanie."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) Drastyczne ograniczenie podaży białka poniżej 0,5 g/kg masy ciała na dobę w celu redukcji wytwarzania amoniaku.",
        "B) Normobiałkowa dieta 1,2–1,5 g/kg m.c./dobę, z preferencją białka roślinnego i nabiału, zapobiegająca sarkopenii.",
        "C) Całkowite wyeliminowanie wszelkich źródeł białka z jadłospisu na okres pierwszych 6 miesięcy leczenia.",
        "D) Wysokobiałkowa dieta oparta wyłącznie na surowym czerwonym mięsie podawanym w ilości powyżej 3 g/kg m.c./dobę.",
        "E) Podaż białka nie ma znaczenia prognostycznego i pacjent powinien stosować dietę ścisłą bez ograniczeń."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "A) Zmniejszeniu stężenia amoniaku przez eradykację jelitowej flory wytwarzającej ureazę przy znikomej wchłanialności.",
        "B) Bezpośrednim wiązaniu wolnego amoniaku w osoczu krwi i jego neutralizacji do rozpuszczalnych moczanów.",
        "C) Hamowaniu wydzielania kwasu solnego w żołądku poprzez nieodwracalne blokowanie pompy protonowej H+/K+ ATP-azy.",
        "D) Stymulacji wątrobowego wychwytu bilirubiny pośredniej i pobudzeniu aktywności enzymu glukuronylotransferazy.",
        "E) Wybiórczym blokowaniu receptorów benzodiazepinowych w korze mózgu i znoszeniu sedacji u pacjenta."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A) Test łączenia punktów (Number Connection Test – NCT) oraz testy psychometryczne wchodzące w skład baterii PHES.",
        "B) Badanie elektroencefalograficzne (EEG) głowy połączone z 24-godzinnym monitorowaniem zapisu wideo.",
        "C) Rutynowe ilościowe oznaczanie stężenia amoniaku we krwi żylnej co 2 godziny na oddziale internistycznym.",
        "D) Tomografia rezonansu magnetycznego mózgowia z oceną perfuzji naczyniowej w sekwencji dyfuzyjnej DWI.",
        "E) Oznaczenie aktywności aminotransferaz (AlAT i AspAT) oraz stężenia bilirubiny całkowitej w surowicy krwi."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A) Zakwasza treść jelita grubego, przekształca NH3 w niewchłanialny jon amonowy NH4+ i przyspiesza pasaż stolca.",
        "B) Bezpośrednio hamuje enzym fosfodiesterazę typu 5 w mięśniówce gładkiej naczyń krążenia wrotnego.",
        "C) Wchłania się w 100% w jelicie czczym i stymuluje wątrobowy cykl mocznikowy do przyspieszonej utylizacji amoniaku.",
        "D) Blokuje receptory opioidowe mi w błonie śluzowej jelita zapobiegając nadmiernemu rozkurczowi zwieraczy.",
        "E) Neutralizuje sole kwasów żółciowych w świetle kątnicy i zapobiega wchłanianiu cholesterolu do krwi."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Dostarczaniu substratów dla cyklu mocznikowego w hepatocytach oraz stymulacji syntezy glutaminy w mięśniach.",
        "B) Wiązaniu i bezpośrednim wytrącaniu jonów amonowych w świetle pęcherzyka żółciowego w postaci osadu.",
        "C) Zwiększaniu kwasowości soku żołądkowego co przyspiesza trawienie białek złożonych przed wejściem do jelita.",
        "D) Hamowaniu wchłaniania glukozy i galaktozy w enterocytach rąbka szczoteczkowego dwunastnicy u chorego.",
        "E) Wybiórczej sedacji układu limbicznego poprzez stymulację wydzielania endogennego kwasu gamma-aminomasłowego."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A) Zabieg TIPS omija miąższ wątroby kierując krew wrotną bogatą w toksyny jelitowe wprost do krążenia układowego.",
        "B) Zastosowany metalowy stent naczyniowy wydziela do krwiobiegu neurotoksyczne jony niklu uszkadzające neurony.",
        "C) TIPS prowadzi do natychmiastowego spadku rzutu serca i niedokrwienia płatów potylicznych mózgowia.",
        "D) Wytworzenie przetoki skutkuje całkowitym zarośnięciem tętnicy wątrobowej i martwicą zrazików wątroby.",
        "E) Procedura TIPS jest zabiegiem o potwierdzonym działaniu neuroprotekcyjnym eliminującym encefalopatię."
      ]
    }
  ],
  53: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A) >=6 krwistych stolców/dobę oraz co najmniej 1 cecha ogólna: gorączka >37,8°C, tętno >90/min, Hb <10,5 g/dl, OB >30 mm/h.",
        "B) 1-2 luźne stolce na dobę bez widocznej makroskopowo domieszki świeżej krwi i z prawidłową temperaturą ciała.",
        "C) Izolowane wystąpienie gorączki powyżej 39°C przy prawidłowej liczbie i konsystencji oddawanych stolców.",
        "D) Wyłącznie obecność przetok okołoodbytniczych i ropni w okolicy krocza bez zmian w błonie śluzowej jelita.",
        "E) Stwierdzenie pojedynczego polipa gruczolakowatego w zstępnicy u chorego bez dolegliwości bólowych brzucha."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Poprzecznica o średnicy >6 cm na przeglądowym RTG brzucha z objawami ogólnoustrojowej reakcji septycznej.",
        "B) Izolowane poszerzenie pętli jelita krętego powyżej 3 cm bez cech gorączki i bez leukocytozy w krwi obwodowej.",
        "C) Obecność mnogich uchyłków esicy wypełnionych masami kałowymi bez pogrubienia ściany w tomografii.",
        "D) Spadek średnicy okrężnicy zstępującej poniżej 1 cm w badaniu endoskopowym na tle przewlekłego włóknienia.",
        "E) Obecność powietrza pod obiema kopułami przepony u pacjenta po przebytej planowej laparoskopii brzusznej."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "A) Wdrożenie terapii ratunkowej: infliksymab (anty-TNF) LUB dożylna cyklosporyna, z przygotowaniem do kolektomii.",
        "B) Natychmiastowe odstawienie wszelkich leków i wypisanie pacjenta do domu z zaleceniem odpoczynku psychicznego.",
        "C) Zwiększenie dawki mesalazyny doustnej do 15 gramów na dobę z dołączeniem niesteroidowych leków zapalnych.",
        "D) Zastosowanie wyłącznie doustnych ziół ściągających i wlewów doodbytniczych z naparu z rumianku przez 14 dni.",
        "E) Wdrożenie radioterapii miednicy mniejszej w celu miejscowego zahamowania proliferacji komórek zapalnych."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A) Leki te hamują motorykę jelita i mogą sprowokować rozwój ostrego toksycznego rozdęcia okrężnicy (toxic megacolon).",
        "B) Loperamid wchodzi w chemiczną reakcję z hydrokortyzonem wywołując natychmiastową perforację żołądka.",
        "C) Leki przeciwbiegunkowe stymulują ekspresję receptorów wirusowych w ścianie jelita nasilając zapalenie.",
        "D) Opioidy u chorych z WZJG indukują gwałtowny rozpad płytek krwi prowadząc do ciężkiej małopłytkowości.",
        "E) Środki hamujące perystaltykę całkowicie uniemożliwiają późniejsze wykonanie badania ultrasonograficznego."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) Zaostrzenie IBD wiąże się z wysokim ryzykiem ŻChZZ, dlatego heparyna drobnocząsteczkowa (HDCz) jest obligatoryjna.",
        "B) Heparyna drobnocząsteczkowa jest bezwzględnie zakazana u każdego chorego z krwawieniem z przewodu pokarmowego.",
        "C) Profilaktyka przeciwzakrzepowa jest zalecana wyłącznie u pacjentów poddawanych zabiegom neurochirurgicznym.",
        "D) Zamiast heparyny należy rutynowo wdrożyć doustny kwas acetylosalicylowy w wysokiej dawce przeciwpłytkowej.",
        "E) Włączenie profilaktyki przeciwzakrzepowej wymaga każdorazowej uprzedniej pisemnej zgody konsultanta krajowego."
      ]
    }
  ],
  54: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A) Odcinkowy charakter zmian ('skip lesions'), głębokie podłużne owrzodzenia, brukowanie śluzówki i przetoki.",
        "B) Ciągły charakter zmian rozpoczynający się od odbytnicy i szerzący się wyłącznie proksymalnie bez przerw.",
        "C) Izolowane powierzchowne nadżerki ograniczone wyłącznie do błony śluzowej bez zajęcia warstwy mięśniowej.",
        "D) Wypadanie błony śluzowej przez kanał odbytu bez jakichkolwiek cech zapalenia w wyższych partiach przewodu.",
        "E) Obecność mnogich polipów gruczolakowatych o gładkiej powierzchni rozmieszczonych równomiernie w jelicie."
      ]
    },
    {
      qIdx: 1, // Q2
      newOpts: [
        "A) Ziarniniaki nieserowaciejące z komórek nabłonkowatych i komórek olbrzymich Langhansa w ścianie jelita.",
        "B) Ropnie krypt jelitowych ograniczone ściśle do warstwy śluzowej bez naciekania głębszych warstw ściany.",
        "C) Zanik kosmków jelitowych z przerostem krypt i nasiloną limfocytozą śródnabłonkową w błonie śluzowej.",
        "D) Masywna martwica serowaciejąca z obecnością kwasoopornych prątków widocznych w barwieniu Ziehl-Neelsena.",
        "E) Odkładanie się mas bezpostaciowego amyloidu w ścianach naczyń krwionośnych w świetle mikroskopowym."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Palenie tytoniu jest udowodnionym czynnikiem ryzyka zaostrzeń, powikłań przetokowych i konieczności resekcji.",
        "B) Palenie tytoniu wywiera silny efekt ochronny i zmniejsza ryzyko nawrotu choroby po operacji chirurgicznej.",
        "C) Dym tytoniowy nie wywiera żadnego mierzalnego wpływu na przebieg kliniczny choroby Leśniowskiego-Crohna.",
        "D) Nikotyna w postaci plastrów przezskórnych stanowi podstawową rekomendowaną metodę indukcji remisji w CD.",
        "E) Palenie tytoniu chroni przed powstawaniem przetok okołoodbytniczych i zwężeń włóknistych w jelicie krętym."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) Rezonans magnetyczny miednicy mniejszej (Pelvic MRI) oraz ultrasonografia wewnątrzodbytnicza (EAUS).",
        "B) Przeglądowe zdjęcie rentgenowskie jamy brzusznej wykonane w pozycji stojącej w projekcji przednio-tylnej.",
        "C) Scyntygrafia kości miednicy z użyciem technetu-99m pod kątem ogniskowego stanu zapalnego kości łonowej.",
        "D) Rutynowa tomografia klatki piersiowej wysokiej rozdzielczości (HRCT) z oceną miąższu obu płuc.",
        "E) Biopsja aspiracyjna cienkoigłowa węzłów chłonnych pachwinowych pod kontrolą ultrasonograficzną."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "A) Niewchłanialna luźna pętla przeprowadzona przez kanał przetoki, utrzymująca drenaż i zapobiegająca ropniom.",
        "B) Wstrzykiwany klej tkankowy zamykający szczelnie kanał przetoki od strony ujścia zewnętrznego na skórze.",
        "C) Tytanowa płytka stabilizująca przykręcana do kości miednicy w celu ucisku mechanicznego tkanek krocza.",
        "D) Wkładka domaciczna uwalniająca lewonorgestrel umieszczana w kanale przetoki w celu redukcji obrzęku.",
        "E) Szew wycinający aparat zwieraczowy odbytu w celu przekształcenia przetoki w otwartą ranę krocza."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A) Przeciwciała przeciwko Saccharomyces cerevisiae (ASCA dodatnie w CD vs pANCA dodatnie w WZJG).",
        "B) Przeciwciała przeciwko transglutaminazie tkankowej w klasie IgA (anty-tTG IgA) u chorych z biegunką.",
        "C) Przeciwciała przeciwjądrowe (ANA) o ziarnistym typie świecenia w rozcieńczeniu miana powyżej 1:1280.",
        "D) Przeciwciała przeciwko tyreoperoksydazie (anty-TPO) oraz przeciwko tyreoglobulinie w surowicy krwi.",
        "E) Przeciwciała przeciwcytrulinowe (anty-CCP) oraz czynnik reumatoidalny w klasie IgM w mianie wysokim."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A) Zaburzenie wchłaniania kwasów tłuszczowych wiążących wapń, co zwiększa wchłanianie wolnych szczawianów w jelicie.",
        "B) Nadmierne wydalanie jonów sodu i potasu przez nerki w przebiegu przewlekłej kwasicy metabolicznej.",
        "C) Wrodzony niedobór enzymu dehydrogenazy szczawianowej w komórkach cewek bliższych nefronu u chorego.",
        "D) Masywna krystalizacja kwasu moczowego w drogach moczowych wywołana przyspieszonym rozpadem nukleotydów.",
        "E) Zwiększone stężenie witaminy C w surowicy krwi wynikające z upośledzonego metabolizmu wątrobowego."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Zwiększona synteza endogennego cholesterolu w hepatocytach wątrobowych indukowana przez cytokiny zapalne.",
        "B) Upośledzenie wchłaniania soli kwasów żółciowych w krętym, spadek ich puli i przesycenie żółci cholesterolem.",
        "C) Nadmierne niszczenie dojrzałych erytrocytów w śledzionie z masywnym wyrzutem wolnej bilirubiny do żółci.",
        "D) Mechaniczne zwężenie dystalnego odcinka przewodu trzustkowego Wirsunga przez naciek zapalny narządu.",
        "E) Skrajny niedobór kwasu askorbinowego w diecie chorego z następowym wytrącaniem się soli wapniowych."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A) Deksametazon w tabletkach doustnych w dawce 8 mg na dobę podawany rano po posiłku przez 3 miesiące.",
        "B) Budezonid w postaci o kontrolowanym uwalnianiu w jelicie krętym (9 mg/dobę) o niskiej biodostępności ogólnej.",
        "C) Prednizon w bardzo wysokiej dawce uderzeniowej 100 mg na dobę stosowany przez okres pierwszych 4 tygodni.",
        "D) Hydrokortyzon w tabletkach doustnych w dawce 40 mg na dobę jako podstawowy lek przeciwzapalny pierwszego rzutu.",
        "E) Betametazon we wstrzyknięciach domięśniowych podawany co 12 godzin w warunkach oddziału dziennego."
      ]
    }
  ],
  55: [
    {
      qIdx: 1, // Q2
      newOpts: [
        "A) Ponieważ roztwory alkoholu bezpośrednio pobudzają ekspresję genów toksyny A i enterotoksyny w świetle jelita.",
        "B) Przetrwalniki (spory) C. difficile są oporne na alkohole i wymagają mechanicznego zmycia wodą z mydłem.",
        "C) Ponieważ alkohol wchodzi w ostrą reakcję disulfiramową z toksyną B wywołując podrażnienie skóry rąk.",
        "D) Ponieważ laseczki C. difficile giną wyłącznie pod wpływem wielogodzinnego naświetlania promieniami UV.",
        "E) Ponieważ alkohol etylowy odparowuje ze skóry zbyt wolno, co ułatwia przyleganie wegetatywnych form bakterii."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A) Ponieważ laboratoryjne testy wykrywające toksyny są zbyt kosztowne i nie podlegają procedurze refundacji.",
        "B) U bezobjawowych ozdrowieńców zarodniki i toksyny mogą utrzymywać się tygodniami, a nosicielstwa się nie leczy.",
        "C) Ponieważ stosowane w leczeniu antybiotyki trwale niszczą czułe detektory laboratoryjnych analizatorów kału.",
        "D) Ponieważ po zakończeniu farmakoterapii testy immunoenzymatyczne w 100% przypadków dają wynik fałszywie ujemny.",
        "E) Ponieważ laseczki C. difficile po skutecznym wyleczeniu ulegają trwałej transformacji w fizjologiczną florę E. coli."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A) Inhibitory pompy protonowej (IPP znoszące barierę kwasową żołądka i ułatwiające przeżywanie spor).",
        "B) Sukralfat podawany doustnie w zawiesinie w celu tworzenia ochronnego filmu na powierzchni błony śluzowej.",
        "C) Drotaweryna stosowana doraźnie w stanach skurczowych mięśniówki gładkiej przewodu pokarmowego.",
        "D) Kwas ursodeoksycholowy (UDCA) stosowany w przewlekłych chorobach cholestatycznych dróg żółciowych.",
        "E) Simetikon stosowany w celu zmniejszenia napięcia powierzchniowego pęcherzyków gazu w jelitach."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Wankomycyna p.o./sonda 500 mg co 6h w skojarzeniu z metronidazolem i.v. 500 mg co 8h (oraz wlewki w ileus).",
        "B) Wyłącznie doustny preparat probiotyczny zawierający liofilizowane szczepy drożdżaków Saccharomyces boulardii.",
        "C) Cyprofloksacyna we wlewie dożylnym w dawce 400 mg co 12 godzin w monoterapii przez okres 10 kolejnych dni.",
        "D) Wankomycyna we wlewie dożylnym 1 g co 12 godzin jako jedyny lek z wyboru eliminujący laseczki w świetle jelita.",
        "E) Klindamycyna doustnie w dawce 300 mg co 6 godzin w celu eradykacji beztlenowych bakterii przetrwalnikujących."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) Szczep BI/NAP1/027 (hiperwirulentny rybotyp 027 wytwarzający wielokrotnie więcej toksyn i toksynę binarną).",
        "B) Enterokrwotoczny szczep Escherichia coli O157:H7 wytwarzający werotoksynę Shiga w przewodzie pokarmowym.",
        "C) Niepatogenny szczep probiotyczny Escherichia coli Nissle 1917 stosowany w podtrzymywaniu remisji zapaleń jelit.",
        "D) Standardowy laboratoryjny szczep referencyjny Escherichia coli K12 pozbawiony czynników zjadliwości.",
        "E) Szczep pałeczki jelitowej Escherichia coli O104:H4 wywołujący epidemiczne ogniska krwotocznego zapalenia okrężnicy."
      ]
    }
  ],
  56: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A) Przeciwciała przeciwko natywnej gliadynie w klasie IgG (AGA IgG) oznaczane metodą immunofluorescencji.",
        "B) Przeciwciała przeciw transglutaminazie tkankowej w klasie IgA (anty-tTG IgA) z całkowitym stężeniem IgA.",
        "C) Przeciwciała przeciwjądrowe (ANA) o typie świecenia homogennym w rozcieńczeniu miana powyżej 1:160.",
        "D) Przeciwciała przeciwko okołojądrowej cytoplazmie neutrofili (pANCA) oznaczane w surowicy krwi pacjenta.",
        "E) Przeciwciała skierowane przeciwko receptorom dla hormonu tyreotropowego (TRAb) w teście radioimmunologicznym."
      ]
    },
    {
      qIdx: 1, // Q2
      newOpts: [
        "A) Uznać chorobę trzewną za definitywnie wykluczoną i zrezygnować z jakichkolwiek dalszych badań serologicznych.",
        "B) Oznaczyć przeciwciała w klasie IgG: przeciw deamidowanym peptydom gliadyny (DGP IgG) lub anty-tTG IgG.",
        "C) Oznaczyć całkowite stężenie immunoglobuliny E (IgE) w celu potwierdzenia atopowej natury enteropatii.",
        "D) Wdrożyć natychmiastowe ratunkowe przetoczenie świeżo mrożonego osocza w celu uzupełnienia puli przeciwciał.",
        "E) Zastosować empiryczne leczenie immunosupresyjne metotreksatem w dawce 15 mg na tydzień przez 3 miesiące."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A) Pobranie pojedynczego wycinka z błony śluzowej przedniej ściany trzonu żołądka z oceną testu ureazowego.",
        "B) Co najmniej 1-2 wycinki z opuszki oraz co najmniej 4 wycinki z dalszej (pozaopuszkowej) części dwunastnicy.",
        "C) Pobranie pojedynczego wycinka ze środkowej części przełyku w celu wykluczenia metaplazji jelitowej Barretta.",
        "D) Pobranie dwóch wycinków z błony śluzowej kątnicy i zastawki krętniczo-kątniczej podczas kolonoskopii.",
        "E) Pobranie ośmiu wycinków z końcowego odcinka jelita krętego w celu wykluczenia zmian w przebiegu choroby Crohna."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A) Ponieważ zjonizowane żelazo wiąże się w świetle żołądka w nierozpuszczalny kompleks z cząsteczkami glutenu.",
        "B) Żelazo wchłania się w dwunastnicy i czczym, których kosmki uległy zanikowi w aktywnym procesie celiakii.",
        "C) Ponieważ chorzy z chorobą trzewną wydalają żelazo w olbrzymich ilościach przez gruczoły potowe skóry.",
        "D) Ponieważ wolne jony żelaza są bezpośrednio niszczone przez wydzielany do światła jelita enzym transglutaminazę.",
        "E) Ponieważ celiakia jest chorobą wywołaną wrodzoną mutacją punktową genu kodującego białko hepcydynę."
      ]
    }
  ],
  57: [
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) Prednizon (lub budezonid u chorych bez marskości) w skojarzeniu z azatiopryną w celu indukcji remisji AIH.",
        "B) Kwas ursodeoksycholowy (UDCA) w monoterapii w dobowej dawce 13-15 mg/kg masy ciała przez okres 5 lat.",
        "C) Cyklofosfamid w comiesięcznych pulsach dożylnych w skojarzeniu z podawanym doustnie metotreksatem.",
        "D) Pegylowany interferon alfa w cotygodniowych iniekcjach podskórnych w skojarzeniu z doustną rybawiryną.",
        "E) Rytuksymab w pojedynczych wlewach dożylnych skojarzony z przeciwciałem neutralizującym czynnik TNF-alfa."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "A) W celu precyzyjnej oceny ryzyka wystąpienia ostrego polekowego uszkodzenia miąższu nerek i kłębuszków.",
        "B) Zidentyfikować chorych z niedoborem enzymu zagrożonych śmiertelną mielotoksycznością po kumulacji metabolitów.",
        "C) W celu laboratoryjnej weryfikacji oporności receptorów glikokortykosteroidowych na podawany prednizon.",
        "D) W celu zapobiegania wystąpieniu ostrego zespołu rozpadu guza (TLS) i wytrącaniu moczanów w kanalikach.",
        "E) W celu laboratoryjnego doboru optymalnej dobowej dawki suplementacji kwasu foliowego u pacjenta."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A) U pacjentów z marskością wątroby lub wrotno-układowym krążeniem obocznym z uwagi na brak efektu pierwszego przejścia.",
        "B) U pacjentów z prawidłową masą ciała i prawidłowym wskaźnikiem masy ciała (BMI pomiędzy 18,5 a 24,9 kg/m2).",
        "C) U pacjentów z rozpoznaną uprzednio stabilną chorobą tarczycy znajdujących się w stanie klinicznej eutyreozy.",
        "D) U wszystkich bez wyjątku kobiet w wieku rozrodczym planujących ciążę w perspektywie najbliższych 5 lat.",
        "E) U osób z prawidłowym stężeniem bilirubiny całkowitej i prawidłową aktywnością fosfatazy zasadowej (ALP)."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) Jednoczesne lub sekwencyjne cechy AIH oraz pierwotnego stwardniającego zapalenia dróg żółciowych (PSC) lub PBC.",
        "B) Współistnienie autoimmunologicznego zapalenia wątroby z wrzodziejącym zapaleniem jelita grubego u tego samego chorego.",
        "C) Współwystępowanie zakażenia wirusem HBV oraz wirusem zapalenia wątroby typu C u osoby nadużywającej alkoholu.",
        "D) Równoczesna obecność kamicy pęcherzyka żółciowego oraz ostrego martwiczego zapalenia miąższu trzustki.",
        "E) Wystąpienie polekowego uszkodzenia wątroby na podłożu przewlekłego stłuszczeniowego zapalenia wątroby (MASH)."
      ]
    }
  ],
  58: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A) Nawracający ból brzucha >=1 dzień w tygodniu przez 3 mies., związany z wypróżnieniem lub zmianą rytmu stolca.",
        "B) Stały, tępy ból brzucha trwający nieprzerwanie przez 24 godziny na dobę bez jakiegokolwiek związku z wypróżnieniem.",
        "C) Obecność obfitych krwawień z dolnego odcinka przewodu pokarmowego z następowym spadkiem stężenia hemoglobiny.",
        "D) Występowanie nocnych wypróżnień budzących pacjenta ze snu połączonych z gorączką powyżej 38,5°C.",
        "E) Niezamierzony ubytek masy ciała przekraczający 15% masy wyjściowej w okresie ostatnich 4 tygodni."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) Ból budzący w nocy, krew w stolcu, niezamierzona utrata masy ciała, niedokrwistość, wiek >50 r.ż., wywiad IBD/rak.",
        "B) Wzdęcie brzucha ustępujące całkowicie po oddaniu gazów i stolca w godzinach popołudniowych u młodej kobiety.",
        "C) Uczucie niepełnego wypróżnienia towarzyszące oddawaniu twardego stolca u osoby pracującej w pozycji siedzącej.",
        "D) Okresowe występowanie domieszki białego, bezwonnego śluzu na powierzchni uformowanego stolca u pacjenta.",
        "E) Nasilenie dolegliwości skurczowych brzucha w sytuacjach silnego stresu emocjonalnego lub przed egzaminem."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A) Dieta z ograniczeniem fermentujących oligo-, di-, monosacharydów i polioli (dieta low-FODMAP) przez 4-6 tygodni.",
        "B) Dieta wysokotłuszczowa ketogeniczna oparta na wyłącznym spożywaniu boczku, smalcu i czerwonego mięsa.",
        "C) Dieta bezresztkowa ze ścisłym zakazem spożywania jakichkolwiek płynów w trakcie i po posiłkach.",
        "D) Dieta bogatotłuszczowa z suplementacją 100 gramów surowych otrębów pszennych dziennie na czczo.",
        "E) Całkowita głodówka prowadzona w warunkach domowych przez okres 21 kolejnych dni bez leków."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) Oznaczenie stężenia kalprotektyny w kale (jej prawidłowy poziom z wysokim NPV wyklucza zapalenie jelit).",
        "B) Wykonanie przeglądowego zdjęcia rentgenowskiego jamy brzusznej w pozycji leżącej z kontrastem barytowym.",
        "C) Oznaczenie dobowego wydalania kwasu moczowego w moczu po 3 dniach diety bogatopurynowej.",
        "D) Pobranie wycinka skóry z przedramienia w celu oceny gęstości włókien nerwowych czuciowych u chorego.",
        "E) Wykonanie scyntygrafii receptorowej przewodu pokarmowego z użyciem znakowanego technetem oktreotydu."
      ]
    }
  ],
  59: [
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) Efektywna osmolalność surowicy krwi > 320 mOsm/kg H2O przy stężeniu glukozy we krwi przekraczającym 600 mg/dl.",
        "B) Wskaźnik masy ciała (BMI) przekraczający wartość 40 kg/m2 u chorego z dodatnim wywiadem cukrzycy typu 2.",
        "C) Obecność ciężkiej kwasicy ketonowej z pH krwi tętniczej poniżej 7,00 i stężeniem wodorowęglanów <10 mmol/l.",
        "D) Izolowane podwyższenie stężenia mocznika we krwi powyżej 50 mg/dl przy prawidłowej glikemii na czczo.",
        "E) Spadek stężenia sodu skorygowanego w surowicy poniżej 120 mmol/l z obecnością masywnego białkomoczu."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A) Zapewnienie powolnego spadku glikemii (50-75 mg/dl/h) i osmolalności w celu uniknięcia obrzęku mózgu.",
        "B) Błyskawiczne obniżenie poziomu cukru we krwi o ponad 400 mg/dl w ciągu pierwszej godziny intensywnej terapii.",
        "C) Całkowite powstrzymanie się od podawania płynów infuzyjnych przez pierwsze 12 godzin od przyjęcia chorego.",
        "D) Podanie potężnego bolusa insuliny dożylnej w dawce 100 jednostek bez uprzedniego uzupełnienia łożyska.",
        "E) Wdrożenie forsownej diurezy osmotycznej za pomocą dożylnego wlewu 20% roztworu mannitolu u chorego."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) Wdrożenie profilaktyki przeciwzakrzepowej HDCz z powodu ciężkiego odwodnienia i zespołu nadlepkości krwi.",
        "B) Bezwzględne zaniechanie profilaktyki przeciwzakrzepowej z uwagi na skrajne ryzyko krwawienia do siatkówki.",
        "C) Podawanie kwasu acetylosalicylowego w dawce 1000 mg na dobę jako jedynego leku przeciwkrzepliwego.",
        "D) Wytworzenie doraźnego chirurgicznego zespolenia omijającego pomiędzy żyłą wrotną a żyłą główną dolną.",
        "E) Założenie mechanicznego filtra do żyły głównej dolnej w pracowni naczyniowej u każdego chorego z HHS."
      ]
    }
  ],
  60: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A) Ciężka hipotermia (<35°C), znaczne zaburzenia świadomości (stupor/śpiączka) oraz obecność czynnika wyzwalającego.",
        "B) Wysoka gorączka hektyczna powyżej 40°C, tachykardia zatokowa >140/min oraz uogólnione pobudzenie psychoruchowe.",
        "C) Masywne krwawienie z górnego odcinka przewodu pokarmowego z obecnością wstrząsu hipowolemicznego.",
        "D) Wytrzeszcz gałek ocznych z obrzękiem powiek i owrzodzeniem rogówki bez jakichkolwiek zaburzeń termoregulacji.",
        "E) Napad tężyczki hipokalcemicznej z dodatnim objawem Chvostka i objawem Trousseau w badaniu fizykalnym."
      ]
    },
    {
      qIdx: 1, // Q2
      newOpts: [
        "A) Hydrokortyzon i.v. w dawkach stresowych PRZED hormonami tarczycy w celu zapobieżenia przełomowi nadnerczowemu.",
        "B) Podanie lewotyroksyny w bardzo wysokiej dawce dożylnej bez uprzedniego zabezpieczenia kory nadnerczy.",
        "C) Natychmiastowe wdrożenie agresywnego aktywnego ogrzewania zewnętrznego za pomocą gorących kąpieli wodnych.",
        "D) Podanie doustnego tiamazolu w dawce 60 mg na dobę przez zgłębnik nosowo-żołądkowy u nieprzytomnego chorego.",
        "E) Wlew hipertonicznego 10% roztworu chlorku sodu w ilości 2000 ml w ciągu pierwszych 30 minut resuscytacji."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Wstępny nasycający bolus dożylny LT4 (200-400 µg i.v.) z następową dawką podtrzymującą 50-100 µg i.v. na dobę.",
        "B) Pojedyncza tabletka lewotyroksyny w dawce 25 µg podana doustnie po uprzednim rozpuszczeniu w szklance wody.",
        "C) Ciągły wlew dożylny płynu Lugola w 5% roztworze glukozy podawany przez cewnik centralny przez 7 dni.",
        "D) Wyłączne stosowanie zewnętrznych okładów z jodu na skórę przedniej powierzchni szyi w rzucie tarczycy.",
        "E) Podawanie wyciągów ze sproszkowanej tarczycy wieprzowej przez zgłębnik żołądkowy 4 razy na dobę."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) W krytycznym stanie konwersja obwodowa T4 do aktywnego T3 jest zahamowana (zespół eutyreozy chorobowej).",
        "B) Ponieważ lewotyroksyna (LT4) wykazuje całkowitą nierozpuszczalność w wodzie i osoczu krwi pacjenta.",
        "C) Ponieważ liotyronina (LT3) wykazuje silne działanie bakteriobójcze na florę beztlenową jamy brzusznej.",
        "D) W celu natychmiastowego obniżenia stężenia glukozy we krwi i zapobieżenia kwasicy mleczanowej u chorego.",
        "E) Ponieważ przysadka mózgowa pacjenta w stanie śpiączki traci całkowicie wrażliwość na cząsteczki LT4."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "A) Spadek filtracji kłębuszkowej (GFR) i nieosmotyczny wyrzut ADH prowadzące do retencji wolnej wody w nerkach.",
        "B) Masywna i niekontrolowana utrata soli sodowych przez gruczoły potowe skóry w trakcie drżeń mięśniowych.",
        "C) Nadmierne wydalanie jonów sodu z kałem na skutek porażenia receptorów enterocytów jelita grubego.",
        "D) Bezpośrednie niszczenie komórek kanalików nerkowych przez wysokie miano przeciwciał anty-TPO we krwi.",
        "E) Zwiększone wchłanianie zwrotne jonów sodu w pętli Henlego z jednoczesnym masywnym wydalaniem potasu."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A) Makroglossia (olbrzymi język) oraz obrzęk śluzowaty fałdów głosowych i głośni zwężający światło dróg.",
        "B) Wrodzone całkowite zarośnięcie nozdrzy tylnych uniemożliwiające wprowadzenie rurki przez jamę nosową.",
        "C) Ucisk tchawicy przez wole zamostkowe występujące obligatoryjnie u każdego chorego z niedoczynnością.",
        "D) Wrodzony brak chrząstki nagłośniowej z następowym wiotkim zapadaniem się fałdów przedsionka krtani.",
        "E) Bolesny skurcz mięśni żwaczy wywołany tężyczką hipokalcemiczną w przebiegu zespołu DiGeorge'a."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A) Hipotermia maskuje objawy infekcji bakteryjnej, która jest najczęstszym czynnikiem spustowym śpiączki.",
        "B) Ponieważ antybiotyki beta-laktamowe wywierają silny efekt przeciwobrzękowy na miąższ gruczołu tarczowego.",
        "C) Ponieważ antybiotyki z grupy aminoglikozydów przyspieszają nerkowe wydalanie metabolitów lewotyroksyny.",
        "D) W celu zapobiegania próchnicy zębów i zakażeniom tkanek przyzębia w trakcie wielotygodniowej intubacji.",
        "E) Antybiotykoterapia o szerokim spektrum jest podawana wyłącznie w celu egzotermicznego rozgrzania krwi."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A) Echokardiografia (ECHO serca) w celu oceny obecności płynu w worku osierdziowym i ryzyka tamponady serca.",
        "B) Scyntygrafia perfuzyjna mięśnia sercowego z użyciem technetu-99m MIBI w spoczynku i po obciążeniu.",
        "C) Koronarografia naczyń wieńcowych w trybie natychmiastowym z dostępu przez nakłucie tętnicy promieniowej.",
        "D) Prawostronne cewnikowanie jam serca za pomocą cewnika Swana-Ganza w celu pomiaru ciśnienia zaklinowania.",
        "E) Rezonans magnetyczny serca z próbą dobutaminową w celu oceny rezerwy kurczliwej mięśnia lewej komory."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Obrzęk śluzowaty ściany jelit i atonia przewodu pokarmowego (ileus) uniemożliwiają wchłanianie leków p.o.",
        "B) Podana doustnie lewotyroksyna ulega natychmiastowemu enzymatycznemu strawieniu przez pepsynę żołądkową.",
        "C) Twarde tabletki lewotyroksyny wprowadzane do gardła wywołują mechaniczne zablokowanie wejścia do krtani.",
        "D) W kwaśnym środowisku soku żołądkowego cząsteczki lewotyroksyny ulegają konwersji do tyreostatyku tiamazolu.",
        "E) Hormony tarczycy u ludzi dorosłych wchłaniają się wyłącznie drogą przezskórną przez nienaruszony naskórek."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) Wybitne wydłużenie fazy relaksacji (rozkurczu) odruchów głębokich, zwłaszcza odruchu ze ścięgna Achillesa.",
        "B) Patologiczne wygórowanie wszystkich odruchów głębokich z obecnością obustronnego klonusu rzepek i stóp.",
        "C) Stała obecność objawu Babińskiego z wachlarzowym odwiedzeniem palców stopy u dorosłego pacjenta.",
        "D) Wyraźne drżenie zamiarowe kończyn górnych pojawiające się w końcowej fazie próby palec-nos u chorego.",
        "E) Przetrwały odruch chwytny dłoniowy oraz odruch ssania typowy dla zaawansowanego uszkodzenia płatów czołowych."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A) Znaczne podwyższenie aktywności CK na tle miopatii hipotyreotycznej i przepuszczalności błon miocytów.",
        "B) Spadek aktywności kinazy kreatynowej w surowicy krwi obwodowej do wartości całkowicie nieoznaczalnych.",
        "C) Aktywność CK pozostaje w 100% przypadków w granicach wąskiego przedziału wartości referencyjnych normy.",
        "D) Wzrost aktywności kinazy kreatynowej wynika wyłącznie ze współistniejącego ostrego zapalenia zrazików wątroby.",
        "E) Wzrost stężenia CK stanowi patognomoniczny marker zatorowości jeździec pnia tętnicy płucnej u chorego."
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

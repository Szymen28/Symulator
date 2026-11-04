const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const updates = {
  36: [
    {
      qIdx: 0, // Q1
      opts: [
        "A) Gorączka o torze septycznym z temperaturą ciała przekraczającą 38,0°C utrzymująca się powyżej 7 dni.",
        "B) Uwidocznienie wegetacji, ropnia lub nowego rozejścia się sztucznej zastawki w badaniu echokardiograficznym (TEE/TTE).",
        "C) Obecność wybroczyn w siatkówce z bladym centrum (plamek Rotha) w badaniu dna oka u pacjenta ze szmerem serca.",
        "D) Liniowe wylewy krwawe pod płytkami paznokciowymi palców rąk i stóp (splinter hemorrhages) o charakterze naczyniowym.",
        "E) Dodatni wynik pojedynczego posiewu krwi w kierunku koagulazo-ujemnych gronkowców bez potwierdzenia w kolejnych próbkach."
      ],
      correctIdx: 1
    },
    {
      qIdx: 3, // Q4
      opts: [
        "A) Bolesne, sino-czerwone, uniesione guzki zlokalizowane na opuszkach palców rąk i stóp o podłożu immunologicznym.",
        "B) Niebolesne, rumieniowe lub krwotoczne plamki na skórze dłoni i podeszw stóp o podłożu zatorowo-naczyniowym.",
        "C) Okrągłe wybroczyny na dnie oka z bladym centrum niedokrwiennym o etiologii zatorów bakteryjnych i kompleksów.",
        "D) Masywne zażółcenie powłok skórnych i twardówek oczu wtórne do wewnątrznaczyniowej hemolizy mechanicznej na zastawce.",
        "E) Rytmiczne drżenie głowy zsynchronizowane ze skurczem lewej komory serca w przebiegu ostrej niedomykalności aortalnej."
      ],
      correctIdx: 1
    },
    {
      qIdx: 5, // Q6
      opts: [
        "A) U każdego pacjenta z izolowanym hemodynamicznie nieistotnym wypadaniem płatka zastawki mitralnej bez niedomykalności.",
        "B) U pacjentów z grupy najwyższego ryzyka: ze sztuczną zastawką, przebytym IZW lub nieskorygowaną siniczą wadą wrodzoną.",
        "C) U pacjentów z dobrze kontrolowanym nadciśnieniem tętniczym i cukrzycą typu 2 bez organicznej wady zastawkowej serca.",
        "D) U wszystkich chorych z obecnością jakiegokolwiek szmeru nad sercem stwierdzonego w rutynowym badaniu osłuchowym.",
        "E) U pacjentów po planowym wszczepieniu stentu wieńcowego uwalniającego lek (DES) wykonanym ponad 12 miesięcy wcześniej."
      ],
      correctIdx: 1
    }
  ],
  37: [
    {
      qIdx: 0, // Q1
      opts: [
        "A) Stałe wydłużenie odstępu PR powyżej 200 ms ze stuprocentowym przewodzeniem każdego załamka P do komór serca.",
        "B) Stopniowe wydłużanie odstępu PR w kolejnych cyklach aż do zablokowania pojedynczego załamka P (periodyka Wenckebacha).",
        "C) Całkowity brak zależności między rytmem załamków P a zespołami QRS (rozkojarzenie AV) przy wolniejszej czynności komór niż przedsionków.",
        "D) Nagłe wypadanie pojedynczych zespołów QRS bez uprzedniego wydłużenia odstępu PR ze stałym blokiem przewodzenia 2:1 lub 3:1.",
        "E) Skrócenie odstępu PR poniżej 120 ms z obecnością fali delta i wtórnymi zmianami odcinka ST-T (wzorzec preekscytacji)."
      ],
      correctIdx: 2
    },
    {
      qIdx: 6, // Q7
      opts: [
        "A) Napadowym bólem głowy z obfitym poceniem się, bladością i kołataniem serca w przebiegu guza chromochłonnego nadnerczy.",
        "B) Nagłą utratą przytomności z bladością i drgawkami anoksycznymi wskutek ostrego niedokrwienia mózgu z powodu asystolii lub skrajnej bradykardii.",
        "C) Obustronnym porażeniem obwodowym nerwu twarzowego połączonym z rumieniem wędrującym w przebiegu neuroboreliozy.",
        "D) Gwałtowną zapaścią ortostatyczną po nagłym wstaniu z łóżka wywołaną odruchowym rozszerzeniem naczyń trzewnych.",
        "E) Ciężką dusznością spoczynkową pojawiającą się w pozycji leżącej na wznak i natychmiast ustępującą po spionizowaniu chorego."
      ],
      correctIdx: 1
    },
    {
      qIdx: 8, // Q9
      opts: [
        "A) Odmą opłucnową i krwiakiem podskórnym powstałym w trakcie nakłucia żyły odpromieniowej lub podobojczykowej.",
        "B) Spadkiem rzutu serca, dusznością, męczliwością i pulsowaniem w szyi wskutek asynchronii przedsionkowo-komorowej i wstecznego przewodzenia VA.",
        "C) Infekcyjnym zapaleniem wsierdzia i zakażeniem loży stymulatora wywołanym przez gronkowce koagulazo-ujemne.",
        "D) Nagłym wzrostem progu stymulacji powyżej 5 V na elektrodzie komorowej z utratą skutecznego przechwytywania rytmu.",
        "E) Mimowolnymi drganiami mięśni ściany klatki piersiowej i czkawką wskutek stymulacji ruchowego nerwu przeponowego."
      ],
      correctIdx: 1
    },
    {
      qIdx: 10, // Q11
      opts: [
        "A) Z powodu okresowego naderwania struny ścięgnistej i wypadania płatka zastawki mitralnej w trakcie kolejnych cykli pracy serca.",
        "B) Z powodu ciągłych zmian położenia płatków zastawki mitralnej w momencie skurczu komór, zależnych od zmiennego odstępu między skurczem przedsionka a skurczem komory.",
        "C) Z powodu zmiennego stopnia zwapnienia pierścienia włóknistego zastawki aortalnej generującego zmienny gradient ciśnień.",
        "D) Z powodu dynamicznego skurczu tętniczek łożyska płucnego wywołanego wahaniami rzutu prawej komory w trakcie oddychania.",
        "E) Z powodu bakteryjnej destrukcji tkanki zastawkowej w przebiegu ostrego septycznego zapalenia prawej komory serca."
      ],
      correctIdx: 1
    }
  ],
  38: [
    {
      qIdx: 0, // Q1
      opts: [
        "A) W stanie nagłym ciśnienie skurczowe zawsze przekracza 250 mmHg, podczas gdy w stanie pilnym mieści się w granicach 180–200 mmHg.",
        "B) Stan nagły charakteryzuje się obecnością ostrego uszkodzenia narządów krytycznych (serca, mózgu, nerek, naczyń), podczas gdy w stanie pilnym takiego uszkodzenia nie ma.",
        "C) W stanie nagłym ciśnienie tętnicze obniża się wyłącznie podaniem leków doustnych, podczas gdy w stanie pilnym bezwzględnie konieczny jest wlew i.v.",
        "D) W stanie pilnym zawsze dochodzi do rozwoju ostrego obrzęku płuc i rzucawki, podczas gdy w stanie nagłym objawy ograniczają się do bólu głowy.",
        "E) Stan pilny bezwzględnie wymaga natychmiastowej intubacji dotchawiczej i wdrożenia sedacji, podczas gdy stan nagły leczy się ambulatoryjnie."
      ],
      correctIdx: 1
    },
    {
      qIdx: 2, // Q3
      opts: [
        "A) Urapidyl podawany dożylnie w powolnym bolusie 12,5–25 mg z następowym wlewem ciągłym.",
        "B) Labetalol podawany dożylnie we wstrzyknięciu 20–50 mg powtarzanym pod kontrolą ciśnienia.",
        "C) Nifedypina w postaci krótko działającej podjęzykowo (krople lub rozgryzana kapsułka żelatynowa).",
        "D) Nitrogliceryna we wlewie ciągłym dożylnym z miareczkowaniem dawki co kilkanaście minut.",
        "E) Esmolol podawany w dawce nasycającej i ciągłym wlewie i.v. u chorych z rozwarstwieniem aorty."
      ],
      correctIdx: 2
    },
    {
      qIdx: 4, // Q5
      opts: [
        "A) Wybiórczy agonista receptorów beta-2 adrenergicznych w mięśniówce naczyń obwodowych wywołujący wazodylatację.",
        "B) Blokuje obwodowe receptory alfa-1-adrenergiczne oraz pobudza ośrodkowe receptory serotoninowe 5-HT1A hamując układ współczulny.",
        "C) Bezpośredni syntetyczny inhibitor tkankowej konwertazy angiotensyny blokujący syntezę angiotensyny II.",
        "D) Blokuje komórkowe kanały sodowe i kotransporter Na-K-2Cl w ramieniu wstępującym pętli Henlego.",
        "E) Działa jako bezpośredni egzogenny donor tlenku azotu rozszerzający wyłącznie układ naczyń żylnych."
      ],
      correctIdx: 1
    },
    {
      qIdx: 8, // Q9
      opts: [
        "A) Toksyczna kumulacja tiocyjanianów i cyjanków prowadząca do ciężkiej kwasicy mleczanowej i zaburzeń neurologicznych.",
        "B) Piorunujące nieodwracalne zwłóknienie pęcherzyków płucnych z niewydolnością oddechową oporną na sterydoterapię.",
        "C) Autoimmunologiczny zespół Guillaina-Barrégo z wstępującym wiotkim porażeniem mięśni kończyn i tułowia.",
        "D) Ciężka agranulocytoza z całkowitym zanikiem linii granulopoezy w badaniu cytologicznym szpiku kostnego.",
        "E) Ostra nefropatia moczanowa z masywną hiperurykemią i wytrącaniem kryształów w kanalikach zbiorczych nerek."
      ],
      correctIdx: 0
    }
  ],
  39: [
    {
      qIdx: 5, // Q6
      opts: [
        "A) Ostre zapalenie osierdzia z ciężką dysfunkcją skurczową lewej komory serca (LVEF <30%) i wstrząsem kardiogennym.",
        "B) Spełnienie kryteriów zapalenia osierdzia ze współistniejącym wzrostem biomarkerów martwicy mięśnia sercowego (troponiny) przy zachowanej lub nieznacznie upośledzonej funkcji lewej komory.",
        "C) Wirusowe zapalenie osierdzia i wsierdzia powikłane prątkowym ropniem ściany wolnej lewej komory serca.",
        "D) Izolowane zapalenie wsierdzia z zakażeniem aparatu podzastawkowego bez jakiegokolwiek zajęcia blaszki ściennej osierdzia.",
        "E) Wysiękowe zapalenie osierdzia z obecnością płynu w jamie osierdzia o objętości przekraczającej 1000 ml bez cech tamponady."
      ],
      correctIdx: 1
    },
    {
      qIdx: 9, // Q10
      opts: [
        "A) Rezonans magnetyczny serca (CMR) z oceną późnego wzmocnienia po gadolinie (LGE) i sekwencjami T1/T2-mapping.",
        "B) Inwazyjna selektywna koronarografia z wentrykulografią kontrastową w dwóch prostopadłych projekcjach rentgenowskich.",
        "C) Standardowe zdjęcie rentgenowskie klatki piersiowej w projekcji tylno-przedniej (PA) i lewobocznej z barem.",
        "D) Scyntygrafia perfuzyjna miokardium SPECT z użyciem radioizotopu technetu-99m w spoczynku i po obciążeniu adenozyną.",
        "E) Pozytonowa tomografia emisyjna (PET-CT) z podaniem znakowanej fluorem fludeoksyglukozy (18F-FDG) w protokole zapalnym."
      ],
      correctIdx: 0
    }
  ],
  40: [
    {
      qIdx: 3, // Q4
      opts: [
        "A) Skurczowy ruch przedniego płatka zastawki mitralnej w stronę przegrody międzykomorowej wywołujący zawężenie drogi odpływu lewej komory.",
        "B) Rozkurczowe zapadanie się wolnej ściany prawej komory w jamie osierdzia pod wpływem wysokiego ciśnienia płynu w tamponadzie serca.",
        "C) Skurczowy paradoksalny ruch tylnej ściany lewej komory serca w stronę worka osierdziowego w przebiegu ostrego zawału pełnościennego.",
        "D) Wypadanie wiotkiego płatka zastawki aortalnej do wnętrza lewej komory w trakcie rozkurczu izowolumetrycznego z falą zwrotną.",
        "E) Skurczowe przemieszczenie pierścienia i płatków zastawki trójdzielnej ku jamie prawego przedsionka serca w ciężkiej niedomykalności."
      ],
      correctIdx: 0
    },
    {
      qIdx: 4, // Q5
      opts: [
        "A) Digoksyna podawana doustnie w celu zwiększenia siły skurczu kardiomiocytów i redukcji objętości zalegającej w lewej komorze.",
        "B) Beta-bloker bez wewnętrznej aktywności sympatykomimetycznej (np. bisoprolol, metoprolol) miareczkowany do dawki docelowej.",
        "C) Dihydropirydynowy antagonista wapnia (np. amlodypina w dawce 10 mg/d) w celu zmniejszenia oporu w łożysku obwodowym.",
        "D) Antagonista receptora mineralokortykoidowego (np. spironolakton 50 mg/d) w celu hamowania postępującego włóknienia mięśnia.",
        "E) Diuretyk pętlowy (np. furosemid w dawce 80 mg/d) w celu agresywnego odwadniania łożyska naczyniowego i obniżenia preload."
      ],
      correctIdx: 1
    },
    {
      qIdx: 5, // Q6
      opts: [
        "A) Selektywny allosteryczny inhibitor sercowej miozyny redukujący powstawanie mostków aktynowo-miozynowych i nadmierną kurczliwość.",
        "B) Kompetycyjny bloker receptorów angiotensyny II typu 1 hamujący remodeling naczyniowy i przerost kardiomiocytów lewej komory.",
        "C) Bezpośredni agonista ATP-zależnych kanałów potasowych w komórkach rozrusznikowych przyspieszający repolaryzację komorową.",
        "D) Selektywny antagonista receptorów aldosteronowych redukujący gromadzenie kolagenu typu I w przestrzeniach międzykomórkowych.",
        "E) Ludzkie przeciwciało monoklonalne wiążące krążącą subtilizynę/keksynę proproteinową typu 9 w celu obniżenia poziomu lipidów."
      ],
      correctIdx: 0
    }
  ],
  41: [
    {
      qIdx: 0, // Q1
      opts: [
        "A) Głośny skurczowy szmer holosystoliczny w punkcie Erba promieniujący obustronnie wzdłuż tętnic szyjnych.",
        "B) Uczucie silnego, szybkiego łomotania i tętnienia w dołku podsercowym oraz w gardle (objaw żabiego tętna na szyi).",
        "C) Wyraźna bradykardia poniżej 40/min pojawiająca się natychmiast po przyjęciu przez pacjenta pozycji leżącej.",
        "D) Skok ciśnienia rozkurczowego powyżej 130 mmHg z towarzyszącym jednostronnym obrzękiem tarczy nerwu wzrokowego.",
        "E) Izolowana sinica obwodowa płatków uszu i czubka nosa z zachowanym prawidłowym utlenowaniem krwi tętniczej."
      ],
      correctIdx: 1
    },
    {
      qIdx: 1, // Q2
      opts: [
        "A) 1 mg podskórnie w powolnej iniekcji w fałd powłok brzusznych z monitorowaniem ciśnienia tętniczego przez 30 minut.",
        "B) 6 mg w szybkim bolusie dożylnym (push and flush) z natychmiastowym przepłukaniem 20 ml soli fizjologicznej do dużej żyły.",
        "C) 12 mg w powolnym wlewie kroplowym w 250 ml 0,9% NaCl przetaczanym przez okres 60 minut pod kontrolą rytmu.",
        "D) 300 mg we wlewie ciągłym rozpuszczone w 5% roztworze glukozy podawane za pomocą pompy infuzyjnej przez 24 godziny.",
        "E) 0,5 mg w tabletce podjęzykowej z poleceniem powolnego ssania aż do momentu odczucia zwolnienia akcji serca przez pacjenta."
      ],
      correctIdx: 1
    },
    {
      qIdx: 5, // Q6
      opts: [
        "A) Prawidłowy, wysoki załamek P z długim odstępem PR powyżej 300 ms poprzedzający każdy kolejny poszerzony zespół QRS.",
        "B) Załamek P ukryty w zespole QRS lub tuż za nim, tworzący rzekomy załamek r' w V1 oraz rzekome załamki s w odprowadzeniach dolnych.",
        "C) Ujemny załamek P w odprowadzeniu I z towarzyszącą asystolią i przerwą komorową przekraczającą 4 sekundy w monitorowaniu.",
        "D) Izolowany wysoki dodatni załamek P w odprowadzeniu aVR o amplitudzie równej załamkowi R w odprowadzeniach kończynowych.",
        "E) Szeroki załamek P zrośnięty z ramieniem wstępującym zespołu QRS imitujący obecność klasycznej fali delta preekscytacji."
      ],
      correctIdx: 1
    },
    {
      qIdx: 6, // Q7
      opts: [
        "A) Blokuje obwodowe receptory beta-1 adrenergiczne i kompetycyjnie hamuje aktywność błonowej cyklazy adenylanowej w komorach.",
        "B) Aktywuje receptory purynergiczne A1, hamuje dokomórkowy prąd wapniowy (ICa,L) i otwiera kanały potasowe (IK,Ado), powodując hiperpolaryzację i blok AV.",
        "C) Pobudza postsynaptyczne receptory muskarynowe M2 wywołując kaskadę fosforylacji zależnej od cyklicznego monofosforanu guanozyny.",
        "D) Otwiera bramkowane napięciem kanały sodowe fazy 0 depolaryzacji, przyspieszając propagację fali pobudzenia przez pęczek Hisa.",
        "E) Działa jako bezpośredni allosteryczny antagonista receptora rianodynowego RyR2 w retikulum sarkoplazmatycznym miocytów serca."
      ],
      correctIdx: 1
    },
    {
      qIdx: 7, // Q8
      opts: [
        "A) Natychmiastowym i trwałym przywróceniem prawidłowego rytmu zatokowego o częstości 70–80 uderzeń na minutę.",
        "B) Przejściowym blokiem przewodzenia w węźle AV (ujawniającym w zapisie fale trzepotania F 'zęby piły' o częstości ~300/min), bez przerwania częstoskurczu przedsionkowego.",
        "C) Przekształceniem rytmu w przedłużoną asystolię komorową trwającą powyżej 30 minut wymagającą pilnej resuscytacji.",
        "D) Paradoksalnym gwałtownym wzrostem częstości rytmu komór do 300/min w mechanizmie przewodzenia przedsionkowo-komorowego 1:1.",
        "E) Całkowitym brakiem jakiejkolwiek zmiany elektrokardiograficznej zarówno w częstości rytmu komór, jak i morfologii załamków."
      ],
      correctIdx: 1
    },
    {
      qIdx: 9, // Q10
      opts: [
        "A) Beta-adrenolityk (np. bisoprolol, metoprolol) lub niedihydropirydynowy antagonista wapnia (werapamil, diltiazem).",
        "B) Monoterapia kwasem acetylosalicylowym w dawce przeciwpłytkowej 75 mg raz na dobę po głównym posiłku.",
        "C) Spironolakton w dawce 100 mg na dobę w połączeniu z restrykcją podaży sodu i płynów w diecie.",
        "D) Furosemid podawany rano na czczo w dawce 40 mg w celu zmniejszenia obciążenia wstępnego serca.",
        "E) Doksycyklina w dawce 100 mg co drugi dzień w celu zapobiegania infekcjom wyzwalającym tachykardię."
      ],
      correctIdx: 0
    },
    {
      qIdx: 10, // Q11
      opts: [
        "A) W AVRT pętla reentry wykorzystuje anatomiczną dodatkową drogę przewodzenia (szlak przedsionkowo-komorowy), a w AVNRT pętla zamknięta jest w obrębie podwójnych dróg węzła AV.",
        "B) AVRT występuje wyłącznie u osób w wieku podeszłym po 70. roku życia, podczas gdy AVNRT jest domeną noworodków i wczesnego dzieciństwa.",
        "C) AVNRT w każdym przypadku charakteryzuje się szerokimi zespołami QRS (>140 ms), a w ortodromowym AVRT zespoły są zawsze wąskie (<80 ms).",
        "D) AVRT w przeciwieństwie do AVNRT jest całkowicie niewrażliwy na dożylne podanie adenozyny oraz stymulację nerwu błędnego.",
        "E) W AVNRT z przyczyn anatomicznych nigdy nie wykonuje się ablacji przezcewnikowej ze względu na stuprocentowe ryzyko jatrogennego zgonu."
      ],
      correctIdx: 0
    }
  ],
  42: [
    {
      qIdx: 1, // Q2
      opts: [
        "A) Obecność świeżej, bogatopłytkowej skrzepliny całkowicie zamykającej światło gałęzi międzykomorowej przedniej (LAD).",
        "B) Przejściowa akineza, hipokineza lub dyskineza segmentów koniuszkowych i środkowych lewej komory wykraczająca poza obszar unaczynienia pojedynczej tętnicy wieńcowej.",
        "C) Trwałe, nieodwracalne uszkodzenie funkcji skurczowej mięśnia sercowego z obecnością tętniaka koniuszka w 12-miesięcznej obserwacji.",
        "D) Masywny wzrost stężenia sercowej troponiny I powyżej 50 000 ng/l odpowiadający rozległemu pełnościennemu zawałowi mięśnia sercowego.",
        "E) Obecność transmuralnego późnego wzmocnienia kontrastowego (LGE) w badaniu serca rezonansem magnetycznym odpowiadającego martwicy."
      ],
      correctIdx: 1
    },
    {
      qIdx: 4, // Q5
      opts: [
        "A) Skurczowe rozdęcie opuszki i pnia aorty wstępującej z mechanicznym pociąganiem płatków zastawki aortalnej ku górze.",
        "B) Kompensacyjna hiperkineza segmentów podstawnych lewej komory zbliżająca przedni płatek zastawki mitralnej do przegrody (zjawisko Venturiego).",
        "C) Ostre pęknięcie głowy mięśnia brodawkowatego tylno-przyśrodkowego lewej komory wywołujące masywny obrzęk płuc chorego.",
        "D) Wypadanie wolnego brzegu płatka zastawki aortalnej w stronę światła koniuszka lewej komory w trakcie fazy rozkurczu komór.",
        "E) Zamknięcie drogi odpływu komory przez ruchomą kulistą skrzeplinę balotującą pomiędzy beleczkami mięśniowymi koniuszka serca."
      ],
      correctIdx: 1
    },
    {
      qIdx: 5, // Q6
      opts: [
        "A) Rzekomy tętniak wolnej ściany lewej komory lub aorty wstępującej grożący natychmiastowym pęknięciem do śródpiersia.",
        "B) Przyścienna skrzeplina w koniuszku lewej komory (LV thrombus) niosąca wysokie ryzyko udaru zatorowego mózgu lub zatorowości obwodowej.",
        "C) Ostra pourazowa przetoka międzykomorowa z masywnym przeciekiem lewo-prawym i cechami wstrząsu kardiogennego.",
        "D) Bakteryjne zapalenie wsierdzia aparatu podzastawkowego zastawki trójdzielnej z tworzeniem dużych ruchomych wegetacji.",
        "E) Dystroficzne zwapnienie strun ścięgnistych i mięśni brodawkowatych z usztywnieniem aparatu zastawki dwudzielnej."
      ],
      correctIdx: 1
    },
    {
      qIdx: 6, // Q7
      opts: [
        "A) Inhibitor enzymu konwertującego angiotensynę (ACEI) lub antagonista receptora angiotensyny (ARB) przyspieszający powrót funkcji skurczowej.",
        "B) Digoksyna w stałej nasycającej dawce dobowej w celu zwiększenia siły skurczu akinetycznych segmentów koniuszkowych lewej komory.",
        "C) Diltiazem lub werapamil w monoterapii dożylnej w celu zmniejszenia napięcia układu współczulnego bez kontroli frakcji wyrzutowej.",
        "D) Monoazotan izosorbidu podawany doustnie w celu redukcji obciążenia następczego lewej komory bez monitorowania ciśnienia tętniczego.",
        "E) Aminofilina w ciągłym wlewie dożylnym w celu pobudzenia receptorów adenozynowych i stymulacji ośrodka oddechowego chorego."
      ],
      correctIdx: 0
    },
    {
      qIdx: 8, // Q9
      opts: [
        "A) Zaburzenia kurczliwości pod postacią akinezy dotyczą wyłącznie ściany wolnej prawej komory z oszczędzeniem lewej komory.",
        "B) Występuje hipokineza segmentów podstawnych z zachowaną lub nadmierną kurczliwością koniuszka lewej komory (obraz odwróconej butelki).",
        "C) Choroba występuje wyłącznie u pacjentów ze zdiagnozowaną w dzieciństwie cukrzycą typu 1 i kwasicą ketonową.",
        "D) Zespół przebiega z paradoksalnym, skrajnym obniżeniem stężenia peptydu BNP i troponin poniżej dolnej granicy normy.",
        "E) Objawy kliniczne i elektrokardiograficzne rozwijają się wyłącznie po ostrym zatruciu cyjankami lub tlenkiem węgla."
      ],
      correctIdx: 1
    },
    {
      qIdx: 9, // Q10
      opts: [
        "A) Ewolucja zmian w kierunku trwałego bloku prawej odnogi pęczka Hisa (RBBB) z uniesieniem punktu J w odprowadzeniach prawokomorowych.",
        "B) Głębokie, szerokie, symetryczne ujemne załamki T oraz znaczne wydłużenie odstępu QTc grożące komorowymi zaburzeniami rytmu.",
        "C) Nagłe skrócenie odstępu PR poniżej 100 ms z pojawieniem się wysokich załamków U we wszystkich odprowadzeniach kończynowych.",
        "D) Izolowany patologiczny wzrost amplitudy załamka P powyżej 4 mm w odprowadzeniach przedsercowych bez zmian repolaryzacji komór.",
        "E) Całkowite zniknięcie załamków T i ich przejście w linię izoelektryczną we wszystkich 12 odprowadzeniach EKG."
      ],
      correctIdx: 1
    },
    {
      qIdx: 10, // Q11
      opts: [
        "A) Od nazwiska pierwszego pacjenta wyleczonego z tego powikłania w klinice kardiologii Uniwersytetu w Hiroszimie.",
        "B) Od nazwy tradycyjnego japońskiego naczynia ceramicznego z wąską szyjką i pękatym dnem służącego do połowu ośmiornic.",
        "C) Od nazwy rzadkiego gatunku jadowitej meduzy japońskiej, której toksyna wywołuje ostry przełom katecholaminowy u ludzi.",
        "D) Od nazwy wygasłego stożka wulkanicznego w prefekturze Hiroszima, którego kształt przypomina skurczone serce.",
        "E) Od starojapońskiego medycznego określenia oznaczającego nagłe, przemijające pęknięcie serca z powodu żalu."
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

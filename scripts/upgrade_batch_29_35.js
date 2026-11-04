const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const updates = {
  29: [
    {
      qIdx: 10, // Q11
      opts: [
        "A) W celu zmniejszenia zapotrzebowania na wysokie dawki noradrenaliny lub podwyższenia MAP przy nieskuteczności monoterapii noradrenaliną.",
        "B) Jako lek pierwszego wyboru w monoterapii zamiast amin katecholowych u każdego chorego z urosepsą i prawidłowym rytmem zatokowym.",
        "C) Wyłącznie w skojarzeniu z bolusem adrenaliny po skutecznym przywróceniu spontanicznego krążenia (ROSC) po defibrylacji.",
        "D) Jako lek z wyboru o działaniu moczopędnym w celu forsowania diurezy w septycznym skąpomoczu przed rozpoczęciem dializoterapii.",
        "E) W celu wywołania selektywnej wazodylatacji tętniczek doprowadzających kłębuszków nerkowych bez wpływu na ciśnienie systemowe."
      ],
      correctIdx: 0
    }
  ],
  30: [
    {
      qIdx: 0, // Q1
      opts: [
        "A) Spontaniczną poprawę stanu klinicznego w wyniku nagłego ustąpienia skurczu mięśniówki gładkiej oskrzeli i redukcji obrzęku.",
        "B) Skrajne, zagrażające zatrzymaniem oddychania zaostrzenie astmy (stan astmatyczny) wynikające z krytycznej obturacji oskrzeli i wyczerpania mięśni oddechowych.",
        "C) Fizjologiczne przejście w fazę głębokiego snu z wolnymi falami (NREM) w wyniku ustąpienia duszności i zmęczenia fizycznego.",
        "D) Wytworzenie nabytej przetoki tchawiczo-przełykowej z zalaniem drzewa oskrzelowego i natychmiastowym zniesieniem szmeru pęcherzykowego.",
        "E) Reakcję psychogenną pod postacią napadu hiperwentylacji lękowej z następowym celowym wstrzymywaniem fazy wdechowej przez pacjenta."
      ],
      correctIdx: 1
    },
    {
      qIdx: 1, // Q2
      opts: [
        "A) Pełną normalizację wentylacji pęcherzykowej i wyleczenie ostrego skurczu oskrzeli po podaniu leków rozszerzających oskrzela.",
        "B) Krytyczne wyczerpanie mięśni oddechowych, załamanie wentylacji i początek ostrej dekompensacji oddechowej zagrażającej zatrzymaniem krążenia.",
        "C) Błąd pomiarowy elektrody gazometrycznej wywołany zbyt długim czasem transportu próbki heparynizowanej do laboratorium.",
        "D) Rozwój ostrej kwasicy metabolicznej ze zwiększoną luką anionową wtórnej do masywnego rozpadu glikogenu w wątrobie chorego.",
        "E) Prawidłową kompensację nerkową polegającą na natychmiastowym wydalaniu wodorowęglanów w odpowiedzi na ostrą hipokapnię."
      ],
      correctIdx: 1
    },
    {
      qIdx: 3, // Q4
      opts: [
        "A) Dożylny siarczan magnezu (MgSO4) w dawce 2,0 g w 20-minutowym wlewie (lek rozkurczający mięśniówkę oskrzeli).",
        "B) Siarczan morfiny w dawce 10 mg w szybkim bolusie dożylnym w celu zmniejszenia lęku i częstości oddechów chorego.",
        "C) Teofilinę w dawce uderzeniowej 5 mg/kg m.c. w powolnym wlewie dożylnym pod kontrolą zapisu elektrokardiograficznego.",
        "D) Wodorowęglan sodu 8,4% w objętości 200 ml w celu natychmiastowej neutralizacji kwasicy oddechowej w surowicy.",
        "E) Furosemid w dawce 40 mg i.v. w celu zmniejszenia obrzęku zrębu płucnego i zapobiegania zespołowi przecieku włośniczkowego."
      ],
      correctIdx: 0
    },
    {
      qIdx: 4, // Q5
      opts: [
        "A) Ponieważ salbutamol stosowany bez ochrony sterydowej wywołuje nieodwracalne uszkodzenie kłębuszków nerkowych i ostrą mocznicę.",
        "B) Ponieważ regularne stosowanie samego SABA prowadzi do desensytyzacji receptorów beta2, nasilenia eozynofilowego zapalenia dróg oddechowych i istotnego wzrostu ryzyka ciężkich, śmiertelnych zaostrzeń astmy.",
        "C) Ponieważ monoterapia SABA jest całkowicie pozbawiona efektu bronchodylatacyjnego u pacjentów dorosłych z fenotypem alergicznym.",
        "D) Ponieważ leki z grupy beta2-mimetyków wchodzą w śmiertelne reakcje krzyżowe z powszechnie stosowanymi antybiotykami beta-laktamowymi.",
        "E) Ponieważ regularna inhalacja salbutamolu indukuje natychmiastowe uzależnienie psychofizyczne porównywalne z opioidami."
      ],
      correctIdx: 1
    },
    {
      qIdx: 8, // Q9
      opts: [
        "A) Wentylacja z wysoką częstością oddechów (>30/min), małą objętością oddechową i odwróconym stosunkiem wdechu do wydechu (I:E 2:1).",
        "B) Utrzymanie niskiej częstości oddechów (8–10/min), wydłużenie czasu wydechu (stosunek I:E 1:3 lub 1:4) oraz akceptacja hiperkapnii permisyjnej.",
        "C) Zastosowanie wysokiego zewnętrznego PEEP (>18–20 cm H2O) w celu mechanicznego rozparcia zwężonych światłem zapalnym oskrzelików.",
        "D) Prowadzenie wentylacji z podażą czystego podtlenku azotu i helu w celu zmniejszenia gęstości gazu w drogach oddechowych chorego.",
        "E) Stosowanie bardzo wysokich objętości oddechowych (12–15 ml/kg m.c.) w celu forsownego pokonania oporów oskrzelowych przy wdechu."
      ],
      correctIdx: 1
    },
    {
      qIdx: 9, // Q10
      opts: [
        "A) Ciężka hiperkaliemia z poszerzeniem zespołów QRS i blokiem odnogi pęczka Hisa na skutek lizy komórek mięśniowych.",
        "B) Przemijająca hipokaliemia (przesunięcie jonów K+ do wnętrza komórek) oraz łagodna hiperlaktatemia z drżeniem mięśniowym.",
        "C) Skrajna hipernatremia z odwodnieniem wewnątrzkomórkowym i drgawkami na tle diurezy osmotycznej wywołanej lekiem.",
        "D) Trwała wtórna niedoczynność przytarczyc z głęboką hipokalcemią i objawem Trousseau w monitorowaniu klinicznym.",
        "E) Ostra hiperurykemia ze strącaniem moczanów w kanalikach nerkowych i napadem dny moczanowej w stawie skokowym."
      ],
      correctIdx: 1
    },
    {
      qIdx: 10, // Q11
      opts: [
        "A) Podwojenie dawki wGKS (np. budezonidu), wdrożenie doustnego sterydu (np. prednizonu 40–50 mg/d przez 5–7 dni) oraz intensyfikacja bronchodylatatorów.",
        "B) Zastosowanie pojedynczej dawki domięśniowej penicyliny benzatynowej z odstawieniem dotychczasowego leczenia wziewnego na okres 14 dni.",
        "C) Natychmiastowe skierowanie chorego na planową bronchoskopię ze sztywnym bronchofiberoskopem w celu mechanicznego płukania drzewa oskrzelowego.",
        "D) Włączenie ciągłego wlewu dożylnego z aminofiliny w warunkach domowych z monitorowaniem stężenia leku w ślinie pacjenta raz w tygodniu.",
        "E) Całkowite odstawienie leków rozszerzających oskrzela i wdrożenie niesteroidowych leków przeciwzapalnych w wysokich dawkach dobowych."
      ],
      correctIdx: 0
    }
  ],
  31: [
    {
      qIdx: 3, // Q4
      opts: [
        "A) W celu zsynchronizowania momentu wyładowania z fazą maksymalnego wydechu pacjenta dla zminimalizowania impedancji klatki piersiowej.",
        "B) Aby impuls elektryczny został wyzwolony dokładnie w fazie załamka R, unikając fazy wrażliwej załamka T i wywołania migotania komór (zjawisko R-on-T).",
        "C) Aby ograniczyć pobór prądu z wewnętrznego akumulatora defibrylatora i zapobiec przedwczesnemu rozładowaniu kondensatora aparatu.",
        "D) Aby zredukować ryzyko oparzenia naskórka i powstawania rumienia pod elektrodami defibrylacyjnymi w trakcie przepływu prądu.",
        "E) Aby impuls prądu stałego został dostarczony wybiórczo do mięśniówki prawego przedsionka serca z pominięciem lewej komory."
      ],
      correctIdx: 1
    },
    {
      qIdx: 7, // Q8
      opts: [
        "A) Obniża ciśnienie w drogach oddechowych, zwiększając powrót żylny do prawego serca i stymulując wyrzut z prawej komory do tętnicy płucnej.",
        "B) Generuje dodatnie ciśnienie w klatce piersiowej, zmniejsza obciążenie wstępne (preload) i następcze (afterload) lewej komory oraz przemieszcza płyn z pęcherzyków do naczyń.",
        "C) Działa jako selektywny antagonista receptorów aldosteronowych w nerkach, powodując gwałtowny wzrost natriurezy i spadek wolemii.",
        "D) Hamuje przewodzenie w węźle zatokowo-przedsionkowym poprzez stymulację nerwu błędnego i obniża zapotrzebowanie miokardium na tlen.",
        "E) Wypłukuje nadmiar tlenu z krwi włośniczkowej płuc, stymulując chemoreceptory pnia mózgu do generowania głębszych oddechów chorego."
      ],
      correctIdx: 1
    },
    {
      qIdx: 8, // Q9
      opts: [
        "A) Wybiórcza blokada dokomórkowych kanałów sodowych fazy 0 depolaryzacji kardiomiocytów roboczych z poszerzeniem zespołu QRS.",
        "B) Zwiększenie napięcia nerwu błędnego (działanie wagotoniczne) i bezpośrednie hamowanie przewodzenia w węźle przedsionkowo-komorowym (AV).",
        "C) Trwałe otwarcie ATP-zależnych kanałów potasowych w komórkach układu bodźcoprzewodzącego Purkinjego z ich hiperpolaryzacją.",
        "D) Selektywny odruchowy skurcz drobnych tętniczek wieńcowych prowadzący do kontrolowanego zwolnienia depolaryzacji miokardium.",
        "E) Kompetycyjna blokada obwodowych receptorów beta-2 adrenergicznych w miocytach przedsionków bez wpływu na kurczliwość komór."
      ],
      correctIdx: 1
    },
    {
      qIdx: 10, // Q11
      opts: [
        "A) Różnicę pomiędzy wartością ciśnienia skurczowego zmierzoną na prawej i lewej kończynie górnej przekraczającą 20 mmHg u chorego.",
        "B) Różnica pomiędzy liczbą skurczów serca wysłuchiwanych stetoskopem nad koniuszkiem a liczbą fal tętna wyczuwalnych na tętnicy promieniowej w tym samym czasie.",
        "C) Całkowity brak wyczuwalnego tętna na obu tętnicach grzbietowych stopy i piszczelowych tylnych w przewlekłym niedokrwieniu kończyn.",
        "D) Fizjologiczny spadek częstości tętna o co najmniej 30 uderzeń na minutę podczas wykonywania próby głębokiego wdechu i bezdechu.",
        "E) Różnicę pomiędzy częstością tętna obwodowego w pozycji leżącej na wznak oraz po pionizacji pacjenta w próbie ortostatycznej."
      ],
      correctIdx: 1
    }
  ],
  32: [
    {
      qIdx: 1, // Q2
      opts: [
        "A) Wywołują natychmiastową nieodwracalną anafilotoksycję płucną z obrzękiem naczynioruchowym krtani i skurczem oskrzeli u młodych chorych.",
        "B) Blokują przewodzenie przez węzeł AV, kierując wszystkie impulsy z przedsionka przez szlak dodatkowy, co prowadzi do drastycznego przyspieszenia rytmu komór i transformacji w śmiertelne migotanie komór (VF).",
        "C) Powodują gwałtowny, toksyczny wzrost stężenia jonów potasu w surowicy powyżej 9,0 mmol/l w mechanizmie porażenia pompy sodowo-potasowej.",
        "D) Prowadzą do zakrzepicy żyły głównej dolnej i zatorowości płucnej na skutek destabilizacji endotelium przez szybki wlew leku antyarytmicznego.",
        "E) Uniemożliwiają późniejsze wykonanie przezprzełykowego badania echokardiograficznego z powodu trwałego zwiotczenia mięśniówki przełyku."
      ],
      correctIdx: 1
    },
    {
      qIdx: 3, // Q4
      opts: [
        "A) Najkrótszy odstęp R-R pomiędzy przewiedzionymi zespołami z preekscytacją krótszy niż 250 ms (ryzyko VF).",
        "B) Obecność ujemnego załamka P przed każdym poszerzonym zespołem QRS w odprowadzeniach kończynowych II, III i aVF.",
        "C) Wydłużenie odstępu PR powyżej 280 ms w ewolucjach bez cech preekscytacji w zapisie spoczynkowym EKG.",
        "D) Czas trwania zespołu QRS poniżej 80 ms we wszystkich odprowadzeniach przedsercowych bez fali delta.",
        "E) Brak nieswoistych zmian odcinka ST i załamka T w odprowadzeniach kończynowych przy tachykardii >150/min."
      ],
      correctIdx: 0
    },
    {
      qIdx: 8, // Q9
      opts: [
        "A) Natychmiastowe wszczepienie kardiowertera-defibrylatora (ICD) w ramach prewencji pierwotnej zgonu sercowego przed podjęciem pracy.",
        "B) Ocena ryzyka w teście wysiłkowym (nagły zanik fali delta przy wzroście tętna wskazuje na niskie ryzyko) lub inwazyjne badanie elektrofizjologiczne (EPS) z ablacją, zwłaszcza przy zawodach wysokiego ryzyka.",
        "C) Zlecenie dożywotniego przyjmowania digoksyny lub werapamilu w celu farmakologicznej kontroli przewodzenia przez drogę dodatkową.",
        "D) Uznanie badania za artefakt techniczny aparatu EKG i zaniechanie jakiejkolwiek dalszej diagnostyki kardiologicznej u chorego.",
        "E) Bezwzględny orzeczniczy zakaz wykonywania jakiejkolwiek pracy zarobkowej i skierowanie na rentę inwalidzką z powodu wady serca."
      ],
      correctIdx: 1
    },
    {
      qIdx: 9, // Q10
      opts: [
        "A) Wsteczna depolaryzacja mięśniówki przedsionków przez układ bodźcoprzewodzący pęczka Hisa i włókna Purkinjego w rytmie zatokowym.",
        "B) Wczesna, powolna depolaryzacja części mięśniówki komór przez dodatkowy szlak przedsionkowo-komorowy (pęczek Kenta) omijający fizjologiczne opóźnienie w węźle AV.",
        "C) Opóźniona repolaryzacja przegrody międzykomorowej wywołana wydłużeniem czasu trwania potencjału czynnościowego w kanale potasowym IKr.",
        "D) Mechaniczne pociąganie pierścienia włóknistego zastawki mitralnej przez powiększony lewy przedsionek w trakcie skurczu izowolumetrycznego.",
        "E) Spontaniczne wyzwalanie mikrowyładowań w ognisku ektopowym zlokalizowanym wokół ujścia zatoki wieńcowej do prawego przedsionka."
      ],
      correctIdx: 1
    }
  ],
  33: [
    {
      qIdx: 1, // Q2
      opts: [
        "A) Szmer skurczowy crescendo-decrescendo (wyrzutowy) najgłośniejszy w II prawej przestrzeni międzyżebrowej, promieniujący do obustronnych tętnic szyjnych.",
        "B) Szmer holosystoliczny o stałej głośności najgłośniejszy nad koniuszkiem serca, promieniujący do lewego dołu pachowego i pod łopatkę.",
        "C) Wczesnorozkurczowy szmer chuchający wzdłuż lewego brzegu mostka, narastający przy pochyleniu tułowia pacjenta do przodu w fazie wydechu.",
        "D) Szmer ciągły 'maszynowy' słyszalny w I i II przestrzeni międzyżebrowej po stronie lewej pod obojczykiem, niepromieniujący do naczyń.",
        "E) Szmer skurczowy typu klik-szmer pojawiający się w połowie skurczu, nasilający się w pozycji stojącej u młodych pacjentów."
      ],
      correctIdx: 0
    },
    {
      qIdx: 2, // Q3
      opts: [
        "A) Małe tętno z gwałtownym, stromym narastaniem fali tętna i nagłym jej zapadaniem (tętno twarde i chybkie / pulsus celer et altus Corrgana).",
        "B) Małe i leniwe tętno (pulsus parvus et tardus) o spłaszczonym wierzchołku fali i wydłużonym czasie narastania (zmniejszona fala objętościowa).",
        "C) Tętno dwubitne (pulsus bisferiens) z dwoma wyczuwalnymi szczytami fali skurczowej w trakcie jednego cyklu hemodynamicznego serca.",
        "D) Tętno paradoksalne (pulsus paradoxus) charakteryzujące się patologicznym spadkiem ciśnienia skurczowego o ponad 10 mmHg w fazie wdechu.",
        "E) Całkowity brak fal tętna na obu tętnicach promieniowych i ramiennych przy zachowanym prawidłowym tętnie na tętnicach udowych pacjenta."
      ],
      correctIdx: 1
    },
    {
      qIdx: 6, // Q7
      opts: [
        "A) Ponieważ manewr Valsalvy fizjologicznie zwiększa powrót żylny do prawej i lewej komory, co ułatwia przepływ przez zwężone ujście aortalne.",
        "B) Ponieważ manewr Valsalvy zmniejsza powrót żylny do lewej komory (spadek preload), co redukuje objętość wyrzutową przepływającą przez zwężoną zastawkę.",
        "C) Ponieważ wysokie ciśnienie w klatce piersiowej wywołuje mechaniczne rozszerzenie zwapniałego pierścienia aortalnego w trakcie parcia.",
        "D) Ponieważ zastawka aortalna ulega natychmiastowemu zwiotczeniu i zapadnięciu pod wpływem stymulacji receptorów układu przywspółczulnego.",
        "E) Ponieważ aktywacja układu renina-angiotensyna-aldosteron w trakcie próby natychmiastowo rozszerza obwodowe łożysko naczyniowe mięśni."
      ],
      correctIdx: 1
    },
    {
      qIdx: 8, // Q9
      opts: [
        "A) Szmer stenozy promieniuje do tętnic szyjnych i cichnie w próbie Valsalvy, a szmer HOCM nie promieniuje do szyi i gwałtownie narasta w próbie Valsalvy.",
        "B) Szmer stenozy aortalnej występuje wyłącznie w fazie rozkurczu komór, a szmer w HOCM ma charakter holosystoliczny z cichym I tonem serca.",
        "C) Szmer w kardiomiopatii przerostowej promieniuje typowo do przestrzeni międzyłopatkowej, a szmer stenozy aortalnej rozchodzi się do pachy.",
        "D) Głośność szmeru stenozy aortalnej nie zależy od objętości wyrzutowej lewej komory, a szmer HOCM zależy wyłącznie od częstości rytmu.",
        "E) Obie wady dają identyczny obraz osłuchowy we wszystkich próbach czynnościowych i nie można ich różnicować bez badania ultrasonograficznego."
      ],
      correctIdx: 0
    },
    {
      qIdx: 10, // Q11
      opts: [
        "A) Bezwzględne podanie antybiotyku profilaktycznego (np. amoksycylina 2 g doustnie na 30–60 minut przed zabiegiem), ponieważ sztuczna zastawka przezcewnikowa kwalifikuje pacjenta do grupy najwyższego ryzyka IZW.",
        "B) Całkowity brak wskazań do stosowania profilaktyki antybiotykowej u chorych po przezcewnikowej implantacji zastawek biologicznych z uwagi na ich niską trombogenność.",
        "C) Zastosowanie pojedynczej dawki gentamycyny 80 mg dożylnie dopiero po 24 godzinach od zakończenia ekstrakcji zęba w razie wystąpienia gorączki u chorego.",
        "D) Bezwzględne odroczenie jakichkolwiek procedur z zakresu stomatologii zachowawczej i chirurgicznej na okres co najmniej 10 lat od zabiegu kardiochirurgicznego.",
        "E) Wykonanie pilnej inwazyjnej koronarografii oraz angio-TK klatki piersiowej bezpośrednio przed rozpoczęciem planowej procedury w gabinecie dentystycznym."
      ],
      correctIdx: 0
    }
  ],
  34: [
    {
      qIdx: 1, // Q2
      opts: [
        "A) NLPZ blokują syntezę nerkowych prostaglandyn (PGE2, PGI2), co powoduje skurcz tętniczki doprowadzającej kłębuszka, spadek GFR oraz masywną retencję sodu i wody.",
        "B) NLPZ wykazują bezpośrednie działanie cytotoksyczne na kardiomiocyty lewej komory, doprowadzając do ostrej apoptozy aparatu kurczliwego w ciągu kilku godzin.",
        "C) NLPZ wywołują natychmiastowe zablokowanie postsynaptycznych receptorów beta-1 adrenergicznych w mięśniu sercowym, imitując przedawkowanie beta-blokerów.",
        "D) NLPZ stymulują nadmierne wydzielanie mózgowego peptydu natriuretycznego (BNP) w podwzgórzu, co prowadzi do gwałtownej, hipowolemicznej niewydolności nerek.",
        "E) NLPZ trwale neutralizują działanie insuliny na poziomie cewek nerkowych, indukując złośliwą kwasicę mleczanową z uogólnionym rozszerzeniem łożyska żylnego."
      ],
      correctIdx: 0
    },
    {
      qIdx: 3, // Q4
      opts: [
        "A) Natychmiastowe podwojenie dotychczasowej dawki beta-blokera w celu protekcji miokardium przed kardiotoksycznym działaniem endogennych katecholamin.",
        "B) Czasowe odstawienie lub zredukowanie dawki beta-adrenolityku o połowę ze względu na ujemny inotropizm nasilający wstrząs kardiogenny i hipoperfuzję narządów.",
        "C) Podanie pełnej dobowej dawki beta-blokera w szybkim bolusie dożylnym w celu przerwania kompensacyjnej tachykardii zatokowej u niestabilnego pacjenta.",
        "D) Natychmiastowa zamiana kardioselektywnego bisoprololu na nieselektywny propranolol w wysokiej dawce doustnej pod osłoną wazodylatatorów naczyniowych.",
        "E) Pozostawienie dotychczasowej dawki leku bez jakichkolwiek modyfikacji i ignorowanie wartości ciśnienia tętniczego oraz objawów hipoperfuzji tkankowej."
      ],
      correctIdx: 1
    },
    {
      qIdx: 4, // Q5
      opts: [
        "A) Wybiórcze toksyczne uszkodzenie aparatu kłębuszkowego nerek wywołane bezpośrednim odkładaniem się krążących we krwi kompleksów sercowej troponiny I.",
        "B) Zastój w łożysku żylnym nerek (wzrost ciśnienia w żyłach nerkowych) w połączeniu z hipoperfuzją tętniczą, spłaszczający przeznerkowy gradient filtracji.",
        "C) Masywna zatorowość septyczno-bakteryjna drobnych tętniczek nerkowych rozwijająca się wtórnie do ostrej dekompensacji skurczowej komór serca.",
        "D) Ostra martwica brodawek nerkowych indukowana przez zakażenie adenowirusem w warunkach immunosupresji wywołanej przewlekłym zastojem krwi.",
        "E) Miażdżycowe obustronne zwężenie pni tętnic nerkowych z krytycznym wzrostem oporu naczyniowego w łożysku nerkowym w przebiegu wstrząsu."
      ],
      correctIdx: 1
    },
    {
      qIdx: 5, // Q6
      opts: [
        "A) Ponieważ podanie furosemidu u chorych z oligurią indukuje odruchowy skurcz naczyń wieńcowych i skok ciśnienia tętniczego powyżej 200 mmHg.",
        "B) Ponieważ przy braku adekwatnego ciśnienia perfuzji (MAP <60-65 mmHg) nerki nie filtrują moczu, a sam diuretyk pogłębi hipowolemię i wywoła martwicę cewek nerkowych.",
        "C) Ponieważ furosemid w dawce powyżej 40 mg i.v. trwale inaktywuje receptory beta-adrenergiczne dla podawanej w późniejszym etapie dobutaminy.",
        "D) Ponieważ furosemid wywołuje gwałtowny wyrzut glukagonu z komórek alfa trzustki, prowadząc do niekontrolowanej hiperglikemii powyżej 600 mg/dl.",
        "E) Ponieważ leki moczopędne z grupy pętlowych wykazują aktywność biologiczną wyłącznie w środowisku o odczynie zasadowym przy pH surowicy >7,60."
      ],
      correctIdx: 1
    },
    {
      qIdx: 9, // Q10
      opts: [
        "A) Fizjologiczny wariant normy wysłuchiwany u większości zdrowych osób w populacji ogólnej po przekroczeniu 60. roku życia.",
        "B) Gwałtowne hamowanie napływu krwi do przeciążonej objętościowo, rozstrzeniowej lewej komory we wczesnej fazie rozkurczu (galop komorowy).",
        "C) Ostre pęknięcie płatka zastawki aortalnej z wytworzeniem fali zwrotnej do drogi odpływu komory w fazie rozkurczu izowolumetrycznego.",
        "D) Obecność wolnej, balotującej skrzepliny w aorcie wstępującej uderzającej o ścianę naczynia w trakcie wyrzutu skurczowego krwi.",
        "E) Całkowity blok lewej odnogi pęczka Hisa z asynchronicznym, opóźnionym zamykaniem się płatków zastawki pnia płucnego na wydechu."
      ],
      correctIdx: 1
    }
  ],
  35: [
    {
      qIdx: 0, // Q1
      opts: [
        "A) Siarczan magnezu (MgSO4) 2,0 g i.v. w powolnym bolusie w ciągu 2–5 minut (lek z wyboru stabilizujący błonę komórkową).",
        "B) Amiodaron w dawce 300 mg i.v. w szybkim bolusie naczyniowym w celu pilnego przerwania komorowego zaburzenia rytmu serca.",
        "C) Sotalol w dawce 80 mg doustnie w celu zwolnienia czynności komór i wydłużenia refrakcji węzła przedsionkowo-komorowego.",
        "D) Winian metoprololu w dawce 5–10 mg w powolnej iniekcji dożylnej pod ścisłą kontrolą ciśnienia tętniczego i tętna chorego.",
        "E) Digoksynę w dawce 0,5 mg dożylnie w celu zwiększenia siły skurczu mięśnia sercowego i redukcji deficytu hemodynamicznego."
      ],
      correctIdx: 0
    },
    {
      qIdx: 1, // Q2
      opts: [
        "A) Wywołują złośliwą hipertermię z obrzękiem mięśni i masywną rabdomiolizą u predysponowanych genetycznie pacjentów.",
        "B) Blokują kanały potasowe odpowiedzialne za repolaryzację komór, co jeszcze bardziej wydłuża odstęp QT i wyzwala nieodwracalne migotanie komór (VF).",
        "C) Powodują gwałtowne wypłukiwanie jonów magnezu z kardiomiocytów do moczu pierwotnego ze spadkiem stężenia w surowicy do zera.",
        "D) Wchodzą w bezpośrednią reakcję fizykochemiczną z tworzywem rurki intubacyjnej, powodując jej polimeryzację i niedrożność.",
        "E) Zwiększają opór naczyniowy w mikrokrążeniu płucnym o ponad 500%, indukując ostre serce płucne i niewydolność prawokomorową."
      ],
      correctIdx: 1
    },
    {
      qIdx: 6, // Q7
      opts: [
        "A) Wzór Bazetta: QTc = QT / pierwiastek kwadratowy z RR (najczęściej stosowany wzór korygujący częstość rytmu).",
        "B) Wzór Cockcrofta-Gaulta: służący do szacowania klirensu kreatyniny na podstawie masy ciała, wieku i stężenia kreatyniny.",
        "C) Wzór Friedewalda: wykorzystywany w lipidologii do matematycznego wyliczania stężenia cholesterolu frakcji LDL.",
        "D) Wzór MDRD (Modification of Diet in Renal Disease): stosowany powszechnie do szacowania wielkości filtracji eGFR.",
        "E) Wzór Wintersa: służący do obliczania oczekiwanej kompensacji oddechowej (PaCO2) w przebiegu kwasicy metabolicznej."
      ],
      correctIdx: 0
    },
    {
      qIdx: 8, // Q9
      opts: [
        "A) Spontaniczne patologiczne depolaryzacje komórkowe powstające w fazie 2 lub 3 potencjału czynnościowego w wyniku reaktywacji kanałów wapniowych typu L przy przedłużonej repolaryzacji.",
        "B) Przedwczesne fizjologiczne wyładowania komórek rozrusznikowych węzła zatokowego wywołane nagłą przewagą napięcia gałęzi nerwu błędnego nad układem współczulnym.",
        "C) Wsteczna depolaryzacja kardiomiocytów przedsionkowych przez ortodromowy szlak dodatkowy (pęczek Kenta) generująca napadowy częstoskurcz nadkomorowy (AVRT).",
        "D) Całkowite załamanie przewodzenia zstępującego w pęczku Hisa na skutek odwracalnego obrzęku tkankowego w przebiegu ostrego zawału ściany dolnej serca.",
        "E) Zablokowanie dokomórkowego transportu jonów glukozy w miocytach przez toksyczne metabolity psychotropowe zwtórną martwicą aparatu kurczliwego komory."
      ],
      correctIdx: 0
    },
    {
      qIdx: 10, // Q11
      opts: [
        "A) Tak, każdy pacjent po udokumentowanym epizodzie TdP bezwzględnie wymaga implantacji przezżylnego układu ICD w ramach prewencji wtórnej zgonu.",
        "B) Nie, nabyty zespół LQTS z przemijającą, odwracalną przyczyną (polipragmazja, hipokaliemia) nie stanowi wskazania do implantacji ICD, pod warunkiem trwałej eliminacji czynnika wyzwalającego i edukacji pacjenta.",
        "C) Wymaga pilnego wszczepienia klasycznego stałego stymulatora serca w trybie VVI bez funkcji kardiowersji w celu zapobiegania tachykardii komorowej.",
        "D) Stanowi bezwzględne wskazanie do pilnego zgłoszenia chorej do ośrodka transplantacji serca w trybie pilnym z powodu trwałego defektu kanałów jonowych.",
        "E) Wymaga wykonania chirurgicznej ablacji lewej komory serca z resekcją wsierdzia w celu zniszczenia patologicznych ognisk depolaryzacji następczych."
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

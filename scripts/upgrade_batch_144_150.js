const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const updates = {
  144: [
    {
      qIdx: 1, // Q2
      newOpts: [
        "Wysoką czułością i wysoką wartością NPV, co pozwala na bezpieczne wykluczenie DVT u chorych o niskim prawdopodobieństwie.",
        "Wysoką swoistością pozwalającą na jednoznaczne potwierdzenie zakrzepicy żył głębokich przy każdym dodatnim wyniku.",
        "Całkowitym brakiem przydatności w wykluczaniu żylnej choroby zakrzepowo-zatorowej u pacjentów ambulatoryjnych.",
        "Przydatnością diagnostyczną ograniczoną wyłącznie do kobiet ciężarnych w trzecim trymestrze ciąży fizjologicznej.",
        "Ścisłą zależnością stężenia od poziomu cholesterolu całkowitego i frakcji LDL w surowicy krwi pacjenta."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "Całkowitą okluzją pni biodrowo-udowych ze wzrostem ciśnienia tkanek, wtórnym zaciśnięciem tętnic i zgorzelą żylną.",
        "Powierzchownym, łagodnym stanem zapalnym mieszków włosowych przedniej powierzchni podudzia bez obrzęku goleni.",
        "Wrodzoną aplazją pnia żyły odpiszczelowej wielkiej z wtórną niewydolnością zastawek żył powierzchownych stopy.",
        "Izolowanym, bezpowikłanym pęknięciem torbieli podkolanowej Bakera z podbiegnięciem krwawym wokół kostki bocznej.",
        "Reaktywacją utajonego zakażenia wirusem półpaśca wzdłuż przebiegu dermatomu L4 z przeczulicą skóry uda."
      ]
    }
  ],
  145: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "Wdrożenie terapeutycznej dawki antykoagulacji (tak jak w zakrzepicy żył głębokich – DVT) przez co najmniej 3 miesiące.",
        "Stosowanie wyłącznie miejscowych maści z heparyną lub wyciągiem z kasztanowca i chłodnych okładów z altacetu.",
        "Zalecenie bezwzględnego unieruchomienia w łóżku przez 30 dni z zakazem opuszczania kończyny i bez leków.",
        "Podawanie profilaktycznej dawki kwasu acetylosalicylowego (75 mg raz na dobę) przez okres 7 kolejnych dni.",
        "Wykonanie pilnego diagnostycznego nakłucia lędźwiowego w celu wykluczenia ogniskowego krwawienia podpajęczynówkowego."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "U 20-25% chorych z SVT współistnieje niema klinicznie DVT, a granica skrzepliny sięga wyżej niż widoczny rumień skóry.",
        "W celu precyzyjnego pomiaru długości kości udowej oraz wykluczenia wrodzonej dysplazji stawu biodrowego u chorego.",
        "Badanie ultrasonograficzne Duplex Doppler wykonuje się wyłącznie w celu pilnej kwalifikacji do amputacji kończyny.",
        "USG naczyń żylnych jest procedurą wymaganą wyłącznie u pacjentów ze skrajną hipertermią przekraczającą 40,0°C.",
        "Jest to badanie o znaczeniu czysto naukowo-statystycznym i nie ma żadnego wpływu na wybór schematu leczenia."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "Gruczolakorakowi trzustki, gruczolakorakowi żołądka lub gruczolakorakowi płuca.",
        "Ostrej białaczce limfoblastycznej o fenotypie komórek prekursorowych B u dzieci.",
        "Niezłośliwemu, hormonalnie czynnemu gruczolakowi warstwy pasmowatej kory nadnerczy.",
        "Przewlekłemu autoimmunologicznemu zapaleniu tarczycy w fazie eutyreozy klinicznej.",
        "Izolowanej torbieli prostej bieguna dolnego nerki prawej o średnicy poniżej 2 cm."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "Gdy skrzeplina penetruje do żyły udowej wspólnej (SFJ), a występują bezwzględne przeciwwskazania do antykoagulacji.",
        "U każdego bez wyjątku pacjenta ze stwierdzoną obecnością żylaków powierzchownych na podudziu lub udzie.",
        "Wyłącznie u kobiet w pierwszym trymestrze fizjologicznej ciąży pojedynczej bez objawów ogólnych.",
        "W każdym przypadku współistnienia niepowikłanej cukrzycy typu 2 leczonej dietą i metforminą.",
        "Crossektomia jest zabiegiem o znaczeniu wyłącznie historycznym i współcześnie obowiązuje zakaz jej wykonywania."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Pogłębioną diagnostykę onkologiczną (TK klatki, brzucha i miednicy, kolonoskopię) pod kątem zespołu paraneoplastycznego.",
        "Wystawienie orzeczenia o trwałej i całkowitej niezdolności do samodzielnej egzystencji bez wykonywania badań.",
        "Zalecenie natychmiastowego zaprzestania przyjmowania jakichkolwiek płynów doustnych przez 48 godzin od epizodu.",
        "Skierowanie pacjenta do sanatorium uzdrowiskowego na 6-tygodniowy turnus rehabilitacji narządu ruchu w basenie.",
        "Wypisanie pacjenta do domu z zaleceniem powrotu do szpitala wyłącznie w razie pojawienia się żółtaczki."
      ]
    }
  ],
  146: [
    {
      qIdx: 1, // Q2
      newOpts: [
        "Badanie tętna na tętnicy grzbietowej stopy podczas czynnego zgięcia podeszwowego z oporem lub zgięcia grzbietowego.",
        "Pomiar obwodu łydki w pozycji leżącej po 30 minutach odpoczynku przy uniesieniu kończyny pod kątem 45 stopni.",
        "Badanie czucia wibracji stroikiem medycznym na kłykciu przyśrodkowym kości piszczelowej po wysiłku fizycznym.",
        "Ocena odruchu skokowego po wcześniejszym zaciśnięciu mankietu ciśnieniomierza na udzie do wartości 200 mmHg.",
        "Próba marszowa na dystansie 6 minut z jednoczesnym pomiarem saturacji krwi włośniczkowej na paluchu stopy."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "Rezonans magnetyczny z angiografią (Angio-MRI) dołu podkolanowego z próbami czynnościowymi w zgięciu stopy.",
        "Przeglądowe zdjęcie rentgenowskie (RTG) stawu kolanowego w projekcji przednio-tylnej i bocznej na stojąco.",
        "Scyntygrafia kości z użyciem technetu-99m w celu oceny metabolizmu kostnego nasady bliższej piszczeli.",
        "Kapilaroskopia wałów okołopaznokciowych stóp z próbą oziębieniową w łaźni wodnej o temperaturze 4°C.",
        "Gazometria krwi żylnej pobranej z żyły odpiszczelowej w okolicy kostki przyśrodkowej przed wysiłkiem."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "Siły wywierane przez mięsień powodują zgniecenie i złamanie stentu oraz ostrą zakrzepicę bez usunięcia ucisku.",
        "Stenty naczyniowe u młodych pacjentów wywołują natychmiastową reakcję anafilaktyczną na jony chromu i niklu.",
        "Wszczepienie stentu uniemożliwia w przyszłości wykonanie jakiegokolwiek badania metodą tomografii komputerowej.",
        "Balon do angioplastyki powoduje nieodwracalne zniszczenie układu żylnego głębokiego kończyny dolnej.",
        "PTA w dole podkolanowym prowadzi do natychmiastowej martwicy jałowej kłykci kości udowej i piszczelowej."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "Chirurgiczne odbarczenie naczynia przez miotomię ektopowego przyczepu głowy przyśrodkowej mięśnia brzuchatego.",
        "Przewlekłe stosowanie doustnych leków przeciwkrzepliwych z grupy antagonistów witaminy K przez całe życie.",
        "Endowaskularna embolizacja tętnicy podkolanowej mikrosprężynkami naczyniowymi w celu wytworzenia krążenia.",
        "Głębokie nakłucie torebki stawowej kolana z aspiracją płynu maziowego i podaniem octanu metyloprednizolonu.",
        "Rutynowa amputacja podudzia z uwagi na wysokie ryzyko nawrotu anomalii anatomicznej po zabiegu naczyniowym."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "Tętniaka pozawężeniowego tętnicy podkolanowej, zakrzepicy i ostrego niedokrwienia stopy ze zatorowością.",
        "Rozwoju rozlanego ropnego zapalenia kości i szpiku nasady dalszej kości udowej z przetoką skórną.",
        "Całkowitego zwapnienia torebki stawu kolanowego prowadzącego do trwałego zesztywnienia stawu w zgięciu.",
        "Złośliwej transformacji nowotworowej brzuśca mięśnia brzuchatego łydki w mięsaka prążkowanokomórkowego.",
        "Masywnego krwawienia z pękniętych żylaków przełyku na skutek wtórnego rozwoju nadciśnienia wrotnego."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "W CAD zwężenie wynika z torbieli przydanki wypełnionej mucyną, bez pierwotnej anomalii anatomicznej mięśni.",
        "CAD dotyczy wyłącznie małych dzieci przed ukończeniem 3. roku życia, podczas gdy PAES występuje u seniorów.",
        "W CAD dochodzi do wrodzonego zarośnięcia światła aorty brzusznej, a tętnica podkolanowa pozostaje wolna.",
        "PAES jest chorobą wywołaną przewlekłym zakażeniem krętkiem bladym w kile nabytej III rzędu.",
        "Oba stany są synonimami tej samej jednostki klinicznej i nie wykazują żadnych różnic histopatologicznych."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Czasowa niezdolność do sportów biegowych do udanego odbarczenia chirurgicznego ze względu na ryzyko ostrej zakrzepicy.",
        "Trwałe i dożywotnie odebranie licencji zawodniczej bez możliwości powrotu do sportu nawet po udanej operacji naczyniowej.",
        "Zezwolenie na kontynuację wyczynowych treningów biegowych pod warunkiem przyjmowania kwasu acetylosalicylowego 75 mg.",
        "Konieczność natychmiastowej rezygnacji ze sportu i zalecenie całkowitego bezruchu w wózku inwalidzkim przez 12 miesięcy.",
        "Zgoda na starty w maratonach bez leczenia, gdyż zespół usidlenia u biegaczy uważa się za fizjologiczną adaptację."
      ]
    }
  ],
  147: [
    {
      qIdx: 1, // Q2
      newOpts: [
        "Obustronny pomiar ciśnienia tętniczego na obu ramionach i stwierdzenie asymetrii ciśnienia skurczowego >20-30 mmHg.",
        "Pomiar obwodu szyi na wysokości chrząstki tarczowatej u pacjenta w pozycji leżącej z głową odchyloną w tył.",
        "Badanie symetrii odruchów rogówkowych za pomocą jałowego gazika przy skrajnym odwiedzeniu gałek ocznych.",
        "Wykonanie próby palec-nos z zamkniętymi oczami po uprzednim wykonaniu 20 głębokich przysiadów na podłodze.",
        "Ocena osłuchowa szmeru oddechowego nad polami szczytowymi płuc w pozycji siedzącej przy swobodnym oddychaniu."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "Zawroty głowy, ataksję, zaburzenia widzenia (podwójne widzenie) oraz nagłe upadki atoniczne wyzwalane ruchem ręki.",
        "Afazję ruchową Broca, izolowane porażenie nerwu twarzowego typu ośrodkowego oraz uogólnione drgawki toniczne.",
        "Masywne krwawienie z nosa, jednostronne upośledzenie słuchu oraz stały szum o charakterze pulsującym w uchu.",
        "Brak jakichkolwiek objawów ze strony układu nerwowego z uwagi na pełną kompensację przez koło tętnicze Willisa.",
        "Ból opasujący w klatce piersiowej promieniujący do lewej łopatki i lewego barku nasilający się w trakcie wdechu."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "Zwężenie podobojczykowej odwraca przepływ w LIMA u pacjenta po CABG, wywołując niedokrwienie serca przy pracy ręki.",
        "Obecność stenozy tętnicy wieńcowej prawej powoduje odwrócenie przepływu w tętnicy kręgowej i zawał dolnej ściany.",
        "Pomiędzy tętnicą podobojczykową a prawym przedsionkiem serca powstaje patologiczna przetoka tętniczo-żylna.",
        "Wszczepienie by-passu aortalno-wieńcowego wywołuje odruchowy skurcz naczyń mózgowych z utratą przytomności.",
        "Jest to powikłanie występujące wyłącznie u pacjentów z wrodzoną anomalią odejścia pnia ramienno-głowowego."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "Zaciśnięcie mankietu ciśnieniomierza na 3 minuty i nagłe spuszczenie celem wyzwolenia wstecznego przepływu w kręgowej.",
        "Gwałtowny ucisk obu tętnic szyjnych wspólnych na szyi przez 60 sekund w celu sprowokowania omdlenia u chorego.",
        "Podanie dożylne 20 mg furosemidu w bolusie w celu wywołania przejściowej hipowolemii i spadku ciśnienia krwi.",
        "Wstrzyknięcie 100 ml lodowatej soli fizjologicznej do żyły odłokciowej podczas ciągłego zapisu badania Doppler.",
        "Głęboka hiperwentylacja pacjenta przez 10 minut w celu wywołania alkalozy oddechowej i skurczu naczyń mózgu."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Wystawienie ZUS ZLA ze względu na zagrożenie wypadkiem przy pracy i skierowanie do pilnej rewaskularyzacji (PTA/stent).",
        "Wystawienie bezwzględnego zakazu leczenia inwazyjnego i nakaz kontynuowania ciężkiej pracy fizycznej na wysokości.",
        "Skierowanie chorego na rentę inwalidzką z orzeczeniem o trwałej niezdolności do pracy bez podejmowania leczenia.",
        "Odesłanie pacjenta do pracy bez zwolnienia z zaleceniem trzymania lewej ręki stale w kieszeni fartucha roboczego.",
        "Zwolnienie lekarskie może być wystawione dopiero po wystąpieniu udaru pnia mózgu z niedowładem czterokończynowym."
      ]
    }
  ],
  148: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "Natychmiastowe zaopatrzenie katastrofalnych, masywnych krwotoków zewnętrznych zagrażających wykrwawieniem w kilkadziesiąt sekund.",
        "Rutynowe pobranie krwi na posiew mikrobiologiczny i oznaczenie stężenia enzymów sercowych przed badaniem pacjenta.",
        "Wdrożenie intensywnego ogrzewania chorego za pomocą nawiewu ciepłego powietrza przed oceną drożności dróg oddechowych.",
        "Płukanie żołądka sondą grubościenną w celu wykluczenia krwawienia z pękniętych żylaków dna żołądka po urazie powłok.",
        "Podanie profilaktycznej dawki anatoksyny tężcowej i surowicy przeciwtężcowej przed unieruchomieniem kręgosłupa szyjnego."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "Opanowaniu krwotoku i skażenia jelita z czasowym zamknięciem powłok i odroczeniem rekonstrukcji do stabilizacji na OIT.",
        "Wykonywaniu wielogodzinnych, definitywnych rekonstrukcji naczyniowych i narządowych u wyziębionego chorego na stole.",
        "Całkowitym zaniechaniu otwierania jamy brzusznej i stosowaniu wyłącznie dożylnej antybiotykoterapii wstrząsu urazowego.",
        "Rutynowym profilaktycznym wycięciu nienaruszonej śledziony i prawej nerki u każdego poszkodowanego w wypadku.",
        "Natychmiastowym definitywnym zespoleniu wszystkich złamań kości długich płytami tytanowymi przed zaopatrzeniem krwotoku."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "80 - 90 mmHg (lub wyczuwalne tętno na tętnicy promieniowej przy zachowanej przytomności chorego).",
        "130 - 140 mmHg (w celu utrzymania ponadstandardowej hiperperfuzji nerek i wątroby w urazie).",
        "Powyżej 160 mmHg (poprzez podawanie bardzo wysokich dawek noradrenaliny i wazopresyny we wlewie).",
        "Wartość ciśnienia tętniczego nie ma żadnego znaczenia i nie podlega monitorowaniu we wstrząsie.",
        "Poniżej 40 mmHg (celem całkowitego zatrzymania przepływu krwi w uszkodzonych naczyniach krwionośnych)."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Lekarz podejmuje wszelkie zabiegi ratujące życie bez zgody, z wpisem w dokumentacji i zawiadomieniem sądu opiekuńczego.",
        "Lekarz musi powstrzymać się od jakichkolwiek działań inwazyjnych do czasu ustalenia tożsamości przez policję.",
        "Do wykonania procedur ratunkowych konieczne jest uprzednie uzyskanie zgody wojewody lub ministra zdrowia.",
        "Brak dokumentu tożsamości zwalnia personel szpitala z obowiązku udzielenia świadczeń zdrowotnych na SOR.",
        "Zgodę na zabieg operacyjny u osoby nieprzytomnej o nieustalonej tożsamości wydaje prokurator rejonowy."
      ]
    }
  ],
  149: [
    {
      qIdx: 3, // Q4
      newOpts: [
        "A. Obowiązuje agresywna, nielimitowana płynoterapia krystaloidowa w celu szybkiego podniesienia ciśnienia krwi.",
        "B. Obowiązuje restrykcyjna strategia płynowa z unikaniem przewodnienia, aby ograniczyć obrzęk stłuczonego płuca i ARDS.",
        "C. Płynoterapia jest bezwzględnie zakazana przez pierwsze 72 godziny od momentu urazu klatki piersiowej.",
        "D. Płyny infuzyjne można przetaczać wyłącznie drogą dootrzewnową pod kontrolą ciśnienia w pęcherzu moczowym.",
        "E. Należy rutynowo podawać 20% roztwór mannitolu w dawce 2 g/kg masy ciała co 4 godziny w celu odwodnienia miąższu."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "A. Na zewnętrznym zabandażowaniu klatki piersiowej elastycznymi opaskami gipsowymi z ciężarkami o masie 5 kg.",
        "B. Na zastosowaniu nieinwazyjnego dodatniego ciśnienia (CPAP/PEEP), co rozpręża płuco i od wewnątrz stabilizuje ścianę klatki.",
        "C. Na wstrzyknięciu 2 litrów powietrza do jamy opłucnowej celem wytworzenia kontrolowanej odmy stabilizującej żebra.",
        "D. Na wprowadzeniu balonu wewnątrzaortalnego (IABP) przez tętnicę udową celem podparcia klatki od strony aorty.",
        "E. Na operacyjnym wypełnieniu jamy opłucnowej pianką poliuretanową utwardzaną promieniami ultrafioletowymi."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Obowiązek powołania zespołu powypadkowego, sporządzenia karty wypadku (14 dni) oraz zawiadomienia PIP i prokuratora.",
        "Pracodawca ma prawny zakaz sporządzania jakiejkolwiek dokumentacji powypadkowej przed upływem 6 miesięcy od zdarzenia.",
        "Wypadek przy pracy zwalnia placówkę medyczną z obowiązku prowadzenia dokumentacji leczenia szpitalnego na NFZ.",
        "Koszty leczenia szpitalnego pacjenta po wypadku przy pracy obciążają w 100% bezpośrednio poszkodowanego pracownika.",
        "Zawiadomienie Inspekcji Pracy jest wymagane wyłącznie w przypadku, gdy pracownik nie posiadał umowy o pracę."
      ]
    }
  ],
  150: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "Nagłe nagromadzenie w jamie opłucnowej co najmniej 1500 ml krwi (lub >1/3 objętości krwi krążącej pacjenta).",
        "Obecność dowolnej ilości krwi w opłucnej (np. 50-100 ml) widocznej w kontrolnym badaniu rentgenowskim.",
        "Krwawienie z miąższu płucnego ustępujące samoistnie po 10 minutach od momentu doznania urazu klatki.",
        "Nagromadzenie treści krwistej w jamie osierdzia w objętości przekraczającej 150 ml z cechami tamponady serca.",
        "Utratę powyżej 5 litrów krwi do światła przewodu pokarmowego z następowym wstrząsem hipowolemicznym."
      ]
    },
    {
      qIdx: 1, // Q2
      newOpts: [
        "Odgłos opukowy (stłumiony w krwiaku opłucnej vs bębenkowy w odmie prężnej) oraz stan wypełnienia żył szyjnych.",
        "Wartość ciśnienia tętniczego krwi (obniżone w krwiaku, a zawsze znacznie podwyższone w odmie prężnej).",
        "Występowanie sinicy powłok skórnych i warg (obecna wyłącznie w odmie prężnej, nieobecna w krwiaku).",
        "Liczba oddechów na minutę (przyspieszona w odmie, a zwolniona poniżej 8 oddechów na minutę w krwiaku).",
        "Temperatura ciała mierzona w odbytnicy u pacjenta na sali resuscytacyjnej w trakcie badania ATLS."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "Gruby dren 28–32F wprowadzony w V międzyżebrzu do przodu od linii pachowej środkowej po górnym brzegu dolnego żebra.",
        "Cienki cewnik Pigtail 8F wprowadzony w II przestrzeni międzyżebrowej w linii środkowo-obojczykowej po dolnym brzegu.",
        "Igła 14G wprowadzona w VIII przestrzeni międzyżebrowej w linii łopatkowej z następowym odessaniem strzykawką.",
        "Kaniula naczyniowa 18G wprowadzona w dołku podsercowym bezpośrednio do worka osierdziowego pod kątem 45 stopni.",
        "Dren gumowy 10F prowadzony bezpośrednio przez ranę kłutą klatki piersiowej bez nacinania zdrowych tkanek powłok."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "Drenaż wstępny >1500 ml krwi po założeniu drenu LUB utrzymujące się krwawienie >200–250 ml/h przez kolejne 2–4 h.",
        "Utoczenie 50 ml ciemnej krwi w ciągu pierwszych 6 godzin z następową pełną stabilizacją parametrów oddechowych.",
        "Utrzymujące się krwawienie o niewielkim natężeniu 20-30 ml/h przez 12 godzin przy stabilnym hematokrycie.",
        "Wypływ 400 ml krwi w 1. godzinie z całkowitą normalizacją ciśnienia tętniczego i brakiem cech wstrząsu krwotocznego.",
        "Stwierdzenie pojedynczego drobnego skrzepu krwi w butli drenażowej bez cech aktywnego wycieku płynu z drenu."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "Tętnice krążenia układowego wysokociśnieniowego: tętnice międzyżebrowe oraz tętnica piersiowa wewnętrzna.",
        "Włośniczki miąższu płucnego niskociśnieniowego krążenia małego ulegające samoistnemu zaciśnięciu przez zapadnięte płuco.",
        "Pnie żył powierzchownych przedniej ściany klatki piersiowej (żyła odpromieniowa i żyła piersiowo-nabrzuszna).",
        "Drobne naczynia włosowate skóry i podskórnej tkanki tłuszczowej w okolicy rany kłutej klatki piersiowej.",
        "Gałęzie trzewne aorty brzusznej: pień trzewny oraz pień tętnicy krezkowej dolnej zaopatrujący lewą połowę okrężnicy."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "Kwas traneksamowy (TXA) podany w dawce 1 g i.v. w ciągu pierwszych 3 godzin od urazu z następowym wlewem 1 g/8 h.",
        "Heparyna niefrakcjonowana podana we wstępnym bolusie dożylnym 5000 j.m. z ciągłym wlewem pod kontrolą APTT.",
        "Rekombinowany tkankowy aktywator plazminogenu (alteplaza, rtPA) we wlewie dożylnym 100 mg przez 2 godziny.",
        "Kwas acetylosalicylowy podany doustnie w dawce przeciwpłytkowej 300 mg po rozkruszeniu tabletki w wodzie.",
        "Klopidogrel w jednorazowej doustnej dawce nasycającej 600 mg podany przez zgłębnik nosowo-żołądkowy choremu."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "Ropniak opłucnej (empyema pleurae) oraz zwłóknienie opłucnej (fibrothorax) ze zrostami i uwięzieniem płuca.",
        "Pęknięcie tętniaka aorty wstępującej z następową ostrą tamponadą worka osierdziowego w mechanizmie pęknięcia.",
        "Ostra transformacja blastyczna szpiku w przebiegu ostrej białaczki limfoblastycznej indukowana urazem powłok.",
        "Pojawienie się uogólnionego odruchowego obrzęku naczynioruchowego Quinckego z obrzękiem krtani i głośni.",
        "Ostre bezkamicze zapalenie pęcherzyka żółciowego z następową perforacją do wolnej jamy otrzewnej po urazie."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Powiadomienie Policji lub Prokuratury o urazie zadanym narzędziem niebezpiecznym oraz zabezpieczenie dowodów.",
        "Bezwzględne zachowanie tajemnicy lekarskiej i całkowity zakaz informowania Policji bez pisemnej zgody sprawcy napadu.",
        "Zawiadomienie wyłącznie prywatnego ubezpieczyciela pacjenta w celu wyegzekwowania opłaty za założony dren opłucnowy.",
        "Samodzielne bezterminowe zatrzymanie pacjenta w izolatce szpitalnej do czasu formalnego przesłuchania przez sąd cywilny.",
        "Całkowity brak jakichkolwiek obowiązków powiadamiania organów, o ile pacjent w chwili urazu znajdował się pod wpływem alkoholu."
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

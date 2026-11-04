const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const updates = {
  126: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "Początkowy ból trzewny z rozdęcia wyrostka jest przewodzony włóknami Th8-Th10 do nadbrzusza, a po objęciu otrzewnej ściennej staje się somatyczny w prawym dole biodrowym.",
        "Początkowy ból somatyczny z powłok brzusznych przechodzi we wtórny ból trzewny z powodu narastającego porażenia perystaltyki i gromadzenia gazów w kątnicy.",
        "Ból wędruje bezpośrednio wzdłuż taśm anatomicznych okrężnicy na skutek mechanicznego przesuwania się kamienia kałowego ku zagięciu wątrobowemu.",
        "Wędrówka bólu wynika z rozsiewu bakterii drogą naczyń chłonnych krezki w kierunku torebki wątroby i prawego więzadła trójkątnego.",
        "Początkowy ból z podrażnienia splotu słonecznego ustępuje, a nowy ból wynika ze skurczu mięśnia skośnego wewnętrznego po stronie prawej."
      ]
    },
    {
      qIdx: 1, // Q2
      newOpts: [
        "Objaw Jaworskiego (podrażnienie otrzewnej ściennej nad mięśniem biodrowo-lędźwiowym).",
        "Objaw Rovsinga (wzrost ciśnienia gazów w okrężnicy wywołujący ból w kątnicy).",
        "Objaw Blumberga (nagłe zwolnienie ucisku powłok brzusznych wywołujące ból).",
        "Objaw Chełmońskiego (bolesność przy wstrząsaniu prawego podżebrza nad wątrobą).",
        "Objaw Goldflama (bolesność przy wstrząsaniu okolicy lędźwiowej w rzucie nerki)."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "Nieściśliwa pod uciskiem głowicy struktura o średnicy zewnętrznej poprzecznej >6 mm z pogrubieniem ściany.",
        "Średnica zewnętrzna wyrostka poniżej 4 mm w przekroju podłużnym z zachowaną prawidłową budową warstwową.",
        "Pełne zapadanie się światła wyrostka pod delikatnym uciskiem głowicy liniowej bez odczynu w krezce.",
        "Obecność hiperechogenicznych pęcherzyków gazu w pniu żyły wrotnej oraz jej odgałęzieniach płatowych.",
        "Zanik unaczynienia ściany kątnicy w opcji Color Doppler z obfitym wysiękiem w obu jamach opłucnowych."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "Podaniu pojedynczej dawki i.v. antybiotyku o spektrum beztlenowym i tlenowym (np. cefazolina + metronidazol) 30-60 min przed cięciem.",
        "Rutynowym podawaniu doustnej amoksycyliny z kwasem klawulanowym przez 7 dni poprzedzających planowany zabieg operacyjny.",
        "Wstrzymaniu się z antybiotykoterapią do 3. doby pooperacyjnej i wdrożeniu leku wyłącznie w przypadku gorączki powyżej 38,5°C.",
        "Rutynowym stosowaniu skojarzenia wankomycyny z gentamycyną we wlewie ciągłym przez 14 dni po zabiegu apendektomii.",
        "Całkowitym zaniechaniu jakiejkolwiek profilaktyki przeciwdrobnoustrojowej z uwagi na jałowy charakter nacięcia powłok."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "W celu weryfikacji histopatologicznej oraz wykluczenia nowotworów wyrostka, głównie guzów neuroendokrynnych (NEN) i śluzowych.",
        "W celu laboratoryjnego wykrycia obecności połkniętych ciał obcych lub substancji toksycznych w ścianie błony śluzowej jelita.",
        "W celu wykonania rutynowego posiewu mikrobiologicznego w kierunku prątków gruźlicy oraz rzadkich zakażeń grzybiczych otrzewnej.",
        "Badanie histopatologiczne jest procedurą fakultatywną i wykonuje się je wyłącznie u pacjentów powyżej 80. roku życia.",
        "Wyłącznie w celu oceny mikroskopowej, gdy wyrostek makroskopowo podczas operacji nie wykazywał żadnych cech stanu zapalnego."
      ]
    }
  ],
  127: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "Objawów miejscowych (np. objaw Murphy'ego), objawów ogólnych (gorączka, leukocytoza/CRP) oraz potwierdzenia w badaniu obrazowym.",
        "Stwierdzenia bezobjawowej kamicy pęcherzykowej w USG z prawidłową morfologią krwi obwodowej i brakiem bolesności uciskowej.",
        "Wysokiej żółtaczki mechanicznej ze stężeniem bilirubiny >15 mg/dl, odbarwieniem stolców i poszerzeniem PŻW powyżej 15 mm.",
        "Ponad trzykrotnego wzrostu aktywności amylazy i lipazy w surowicy krwi z cechami ostrego martwiczego zapalenia trzustki.",
        "Obecności wolnego powietrza pod obiema kopułami przepony w RTG klatki piersiowej i objawu deskowatego napięcia powłok."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "Zapobieżenie jatrogennemu uszkodzeniu dróg żółciowych (przewodu żółciowego wspólnego) oraz prawej tętnicy wątrobowej.",
        "Maksymalne skrócenie czasu trwania zabiegu operacyjnego poniżej 15 minut poprzez rezygnację z preparowania tkanek.",
        "Umożliwienie bezpiecznego wycięcia pęcherzyka żółciowego w znieczuleniu miejscowym bez intubacji dotchawiczej.",
        "Śródoperacyjna ocena obecności mikrozłogów w prawym moczowodzie i miedniczce nerkowej u chorego na stole.",
        "Zabezpieczenie przed masywnym krwawieniem z żylaków dna żołądka u chorych z zaawansowaną marskością wątroby."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "Przezskórny drenaż pęcherzyka żółciowego pod kontrolą USG (cholecystostomia) w znieczuleniu miejscowym i antybiotykoterapia.",
        "Natychmiastowa laparoskopowa cholecystektomia w trybie ostrodyżurowym w znieczuleniu ogólnym z intubacją.",
        "Wyłącznie dożylna płynoterapia z 5% roztworem glukozy i obserwacja ambulatoryjna bez podawania leków.",
        "Przewlekłe doustne podawanie kwasu ursodeoksycholowego w celu stopniowego rozpuszczenia zaklinowanego złogu.",
        "Pilna pankreatoduodenektomia sposobem Whipple'a z limfadenektomią regionalną w znieczuleniu zewnątrzoponowym."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Wystawienie zwolnienia ZUS ZLA na czas rekonwalescencji (np. 14-28 dni), zalecenie oszczędzania powłok i diety łatwostrawnej.",
        "Zakaz wystawiania zwolnienia lekarskiego ZUS ZLA na okres dłuższy niż 3 dni od dnia wypisu ze szpitala do domu.",
        "Obowiązek natychmiastowego zgłoszenia cholecystektomii do Państwowej Inspekcji Pracy jako wypadku przy pracy fizycznej.",
        "Zobowiązanie do wpisania w karcie informacyjnej zakazu leczenia w POZ oraz zakazu stosowania leków przeciwbólowych.",
        "Zwolnienie chorego z jakichkolwiek ograniczeń dietetycznych i zezwolenie na wyczynowy sport od pierwszej doby po zabiegu."
      ]
    }
  ],
  128: [
    {
      qIdx: 2, // Q3
      newOpts: [
        "Pilne endoskopowe odbarczenie dróg żółciowych metodą ECPW (ERCP) ze sfinkterotomią lub protezowaniem dróg żółciowych.",
        "Otwarta cholecystektomia ze zdrenowaniem jamy otrzewnej bez rewizji i bez nacięcia przewodu żółciowego wspólnego.",
        "Laparotomia zwiadowcza z natychmiastową resekcją anatomiczną prawego płata wątroby w znieczuleniu ogólnym.",
        "Planowe wykonanie MRCP po upływie 6 tygodni doustnej antybiotykoterapii w poradni gastroenterologicznej.",
        "Doraźne przezskórne nakłucie miąższu śledziony pod kontrolą USG w znieczuleniu nasiękowym na sali zabiegowej."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "Przerwaniu połączeń zamykających między kanalikami żółciowymi a naczyniami zatokowymi przy wzroście ciśnienia żółci >25-30 cm H2O.",
        "Zarastaniu światła żyły wrotnej przez proces zapalny szerzący się bezpośrednio ze ściany zmienionego pęcherzyka żółciowego.",
        "Fizjologicznym cofaniu się krwi z żyły głównej dolnej do światła pęcherzyka żółciowego podczas głębokiego wdechu.",
        "Przedostawaniu się żółci do światła żołądka przez niewydolny odźwiernik z następowym rozwojem wrzodu trawiennego.",
        "Masywnym przetoczeniu zakażonej żółci wprost do pnia aorty brzusznej w wyniku wytworzenia nabytej przetoki naczyniowej."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "Tylko dysfunkcje: 1, 2 oraz 4 (krążenie, OUN, nerki).",
        "Tylko dysfunkcje: 2, 3 oraz 5 (OUN, oddech, krzepnięcie).",
        "Tylko dysfunkcje: 1, 3 oraz 5 (krążenie, oddech, hemostaza).",
        "Wszystkie wymienione dysfunkcje narządowe (1, 2, 3, 4, 5).",
        "Tylko dysfunkcje: 1, 2, 3 oraz 4 (bez zaburzeń krzepnięcia)."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Lekarz wykonuje procedurę ratującą życie bez zgody, po konsultacji drugiego lekarza, z wpisem do dokumentacji i powiadomieniem sądu.",
        "Przed wykonaniem ECPW lekarz musi bezwzględnie zaczekać na postanowienie sądu opiekuńczego o ustanowieniu kuratora dla chorego.",
        "Do wykonania procedury u nieprzytomnego konieczne jest uzyskanie zgody telefonicznej dowolnego pełnoletniego sąsiada pacjenta.",
        "Brak pisemnej zgody wyklucza jakąkolwiek interwencję inwazyjną, a lekarzowi wolno stosować wyłącznie nawadnianie dożylne.",
        "Zgodę na zabieg operacyjny u każdego nieprzytomnego dorosłego pacjenta może wydać pisemnie dyżurny funkcjonariusz policji."
      ]
    }
  ],
  129: [
    {
      qIdx: 2, // Q3
      newOpts: [
        "Obecności wolnego gazu w jamie otrzewnej (pneumoperitoneum) gromadzącego się pomiędzy wątrobą a ścianą klatki piersiowej.",
        "Gwałtownego i ostrego zaniku miąższu wątroby w przebiegu zdekompensowanej marskości poalkoholowej z wodobrzuszem.",
        "Wypchnięcia całej wątroby do prawej jamy opłucnowej przez pourazowe pęknięcie kopuły przepony w linii pachowej.",
        "Masywnego powiększenia pęcherza moczowego sięgającego powyżej pępka na skutek ostrego zatrzymania moczu.",
        "Zatkania pnia żyły wrotnej przez skrzeplinę z następowym obrzękiem i przekrwieniem biernym narządów jamy brzusznej."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "Zszyciu otworu perforacyjnego szwami pojedynczymi i pokryciu uszypułowanym płatem sieci większej (łata Grahama).",
        "Całkowitym wycięciu żołądka z następowym odtworzeniem ciągłości przewodu pokarmowego pętlą Roux-en-Y.",
        "Założeniu mechanicznej opaski uciskowej na odźwiernik bez otwierania światła przewodu pokarmowego.",
        "Wycięciu całej dwunastnicy wraz z głową trzustki sposobem Whipple'a w trybie natychmiastowym.",
        "Pozostawieniu grubego drenu w otworze perforacyjnym bez zbliżania brzegów ściany narządu szwami."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "Przedniej: perforacja do jamy otrzewnej; tylnej: krwawienie przez drążenie do tętnicy żołądkowo-dwunastniczej.",
        "Przedniej: krwawienie do przewodu Virsunga; tylnej: perforacja do wolnej jamy opłucnowej z odmą prężną.",
        "Przedniej: powstanie przetoki żołądkowo-okrężniczej; tylnej: ucisk na żyłę wrotną z zakrzepicą wrotną.",
        "Przedniej: izolowane zwężenie odźwiernika; tylnej: całkowity brak powikłań z uwagi na grubą ścianę.",
        "Obie lokalizacje dają dokładnie takie same powikłania i nie wykazują żadnych odrębności anatomicznych."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "Pojawienie się wolnego powietrza pod kopułami przepony (sierpów powietrza) w pozycji stojącej lub siedzącej.",
        "Obecność mnogich poziomów płynów w rozdętych pętlach jelita cienkiego w kształcie odwróconych liter U.",
        "Stwierdzenie powiększonego cienia wątroby z obecnością zwapnień w rzucie miąższu trzustki i śledziony.",
        "Zacienienie obu kątów przeponowo-żebrowych odpowiadające obustronnemu wysiękowi w jamach opłucnowych.",
        "Zatkanie światła jelita grubego przez obecność cienia uwapnionego kamienia żółciowego w okolicy kątnicy."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "Rozcieńczenia kwaśnej treści żołądkowej przez wysięk z otrzewnej, co przejściowo zmniejsza stymulację receptorów bólowych.",
        "Samoistnego i trwałego zarośnięcia otworu perforacyjnego przez włóknik bez konieczności jakiejkolwiek interwencji.",
        "Całkowitego wyleczenia odczynu zapalnego otrzewnej przez endogenne przeciwciała i limfocyty w ciągu kilku godzin.",
        "Gwałtownego spadku leukocytozy i stężenia CRP do wartości referencyjnych na skutek wyczerpania rezerw szpiku.",
        "Wydzielenia olbrzymich dawek endorfin przysadkowych całkowicie eliminujących proces chorobowy w otrzewnej."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "Widoczności ściany jelita z obu stron wskutek obecności gazu wewnątrz światła oraz na zewnątrz w jamie otrzewnej.",
        "Obecności poziomej linii płynu w żołądku u chorego badanego w pozycji leżącej na plecach z rękami nad głową.",
        "Okrężnym zwapnieniu ściany pęcherzyka żółciowego odpowiadającym obrazowi tzw. pęcherzyka porcelanowego.",
        "Poszerzeniu pętli esicy zbiegającej się w lewym dole biodrowym dającej charakterystyczny objaw ziarna kawy.",
        "Obecności mnogich drobnych cieni metalicznych w rzucie jamy miednicy mniejszej bez wolnego powietrza."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Wystawia ZUS ZLA na rekonwalescencję, zaleca oszczędzanie powłok, zakaz dźwigania, eradykację H. pylori i gastroskopię kontrolną.",
        "Ma zakaz wystawienia zwolnienia lekarskiego ZUS ZLA na okres dłuższy niż 3 dni od dnia wypisu pacjenta ze szpitala.",
        "Ma obowiązek natychmiast zgłosić perforację wrzodu do Państwowej Inspekcji Pracy jako wypadek przy pracy zawodowej.",
        "Zobowiązany jest wpisać do dokumentacji odmowę dalszego leczenia IPP w POZ z uwagi na zakończenie hospitalizacji.",
        "Zwalnia chorego z kontroli gastroskopowej, gdyż zabieg chirurgiczny całkowicie eliminuje ryzyko nawrotu owrzodzenia."
      ]
    }
  ],
  130: [
    {
      qIdx: 4, // Q5
      newOpts: [
        "Zarówno diagnostyczne (kontrast w kątnicy w 24 h wyklucza operację), jak i terapeutyczne (zmniejsza obrzęk ściany jelita).",
        "Wyłącznie bakteriobójcze poprzez bezpośrednie niszczenie flory bakteryjnej i eliminację toksyn w świetle jelita.",
        "Wyłącznie przeciwbólowe poprzez znieczulenie zakończeń nerwowych błony śluzowej dwunastnicy i jelita czczego.",
        "Jest bezwzględnie przeciwwskazane we wszystkich postaciach pooperacyjnej niedrożności jelit z uwagi na toksyczność.",
        "Służy wyłącznie do barwienia moczu na kolor zielony w celu oceny wydolności filtracyjnej kłębuszków nerkowych."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "Przejście bólu kurczowego w stały, gorączka, tachykardia, objawy otrzewnowe oraz wzrost stężenia mleczanów we krwi.",
        "Pojawienie się apetytu i stopniowy spadek nasilenia nudności oraz wymiotów po zastosowaniu wlewu doodbytniczego.",
        "Pojedyncze oddanie gazów i niewielkiej ilości stolca przez pacjenta po wprowadzeniu kaniuli doodbytniczej.",
        "Obniżenie tętna ze 110/min do 70/min przy prawidłowych wartościach ciśnienia tętniczego krwi i braku gorączki.",
        "Zmniejszenie obwodu brzucha w pomiarze taśmą centymetrową o 2 cm po odessaniu treści przez sondę żołądkową."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "Metoklopramid (lek prokinetyczny pobudzający perystaltykę i grożący perforacją przed przeszkodą).",
        "Paracetamol we wlewie dożylnym stosowany w skojarzonej terapii przeciwbólowej u chorych chirurgicznych.",
        "Płyn wieloelektrolitowy (PWE) stosowany do wstępnego wyrównywania zaburzeń wodno-elektrolitowych.",
        "Chlorek potasu podawany we wlewie dożylnym przez pompę infuzyjną przy ścisłej kontroli jonogramu.",
        "Pantoprazol we wstrzyknięciu dożylnym w celu zapobiegania ostrym nadżerkom stresowym błony śluzowej."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "Wprowadzenie zgłębnika nosowo-żołądkowego celem odbarczenia i odessania treści oraz dożylna płynoterapia.",
        "Doustne podanie choremu 1 litra oleju parafinowego w celu poślizgowego udrożnienia mechanicznej przeszkody.",
        "Zlecenie doustnego wlewu przeczyszczającego z roztworu makrogoli w objętości 4 litrów w ciągu 2 godzin.",
        "Natychmiastowe skierowanie pacjenta na pełną kolonoskopię diagnostyczną bez wcześniejszego przygotowania.",
        "Podanie leków nasennych i uspokajających oraz wypisanie pacjenta do domu z zaleceniem kontroli za 3 dni."
      ]
    }
  ],
  131: [
    {
      qIdx: 2, // Q3
      newOpts: [
        "Ponieważ ryzyko nawrotu po samej derotacji wynosi aż 50-70%, a nawroty często przebiegają ze zgorzelą jelita.",
        "Ponieważ skręt esicy w 100% przypadków przekształca się w zaawansowanego czerniaka złośliwego śluzówki jelita.",
        "Planowa resekcja nie jest zalecana i pacjenta należy natychmiast wypisać do domu po ustąpieniu wzdęcia brzucha.",
        "Wyłącznie w celu pobrania wielomiejscowych wycinków tkankowych do oceny genetycznej pod kątem mukowiscydozy.",
        "Ponieważ esica u ludzi w podeszłym wieku jest narządem anatomicznie zbędnym i jej usunięcie zapobiega zaparciom."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "W skręcie kątnicy rozdęta pętla ma kształt przecinka i przemieszcza się z prawego dołu do lewego górnego kwadrantu.",
        "W skręcie kątnicy wolny gaz gromadzi się wyłącznie w świetle pęcherza moczowego dając objaw pęcherzyka gazowego.",
        "Skręt kątnicy daje typowy objaw ziarna kawy wychodzący zawsze z lewego dołu biodrowego w kierunku wątroby.",
        "Oba stany dają w 100% identyczny obraz radiologiczny i ich różnicowanie na RTG jest anatomicznie niemożliwe.",
        "W skręcie kątnicy na przeglądowym RTG widoczny jest zawsze cień metalicznego ciała obcego blokującego zastawkę."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Lekarz podejmuje decyzję o operacji bez zgody sądu, gdy zwłoka grozi śmiercią, po konsultacji drugiego lekarza i z wpisem.",
        "Lekarz musi bezwzględnie wstrzymać się z operacją do czasu doręczenia prawomocnego postanowienia sądu opiekuńczego pocztą.",
        "Wymagana jest pisemna zgoda wszystkich pełnoletnich członków rodziny pacjenta do drugiego stopnia pokrewieństwa.",
        "Decyzję podejmuje wyłącznie dyrektor do spraw medycznych szpitala po zasięgnięciu opinii radcy prawnego placówki.",
        "U pacjenta z demencją w wieku powyżej 75 lat przepisy prawa bezwzględnie zabraniają wykonywania operacji ratunkowych."
      ]
    }
  ],
  132: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "Wnika przez pierścień pachwinowy głęboki bocznie od naczyń nabrzusznych dolnych i może schodzić w powrózku do moszny.",
        "Uwypukla się bezpośrednio przez trójkąt Hesselbacha przyśrodkowo od naczyń nabrzusznych dolnych nie wnikając do moszny.",
        "Wychodzi poniżej więzadła pachwinowego przez pierścień udowy i wnika do kanału udowego przyśrodkowo od żyły udowej.",
        "Nigdy nie ulega zaciśnięciu we wrotach, uwięźnięciu ani zadzierzgnięciu z martwicą z uwagi na szeroki pierścień.",
        "Występuje wyłącznie u kobiet w ciąży w wyniku fizjologicznego rozluźnienia więzadeł miednicy przez relaksynę."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "Czas uwięźnięcia >4-6 godzin lub obecność objawów stanu zapalnego powłok, gorączki i kwasicy mleczanowej.",
        "Młody wiek pacjenta (poniżej 30. roku życia) przy braku chorób współistniejących układu krążenia.",
        "Lokalizacja przepukliny po stronie prawej zamiast po lewej stronie kanału pachwinowego u mężczyzny.",
        "Prawidłowa liczba leukocytów oraz prawidłowe stężenie białka C-reaktywnego (CRP) w surowicy krwi.",
        "Brak wcześniejszych zabiegów operacyjnych w obrębie powłok jamy brzusznej i brak blizn chirurgicznych."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "Uwięźnięciem fragmentu obwodu ściany jelita (przeciwległego do krezki), co może przebiegać bez pełnej niedrożności.",
        "Obecnością uchyłka Meckela w worku przepuklinowym z następowym zapaleniem i perforacją ściany uchyłka.",
        "Obecnością wyrostka robaczkowego w worku przepukliny pachwinowej (przepuklina Amyanda) z ostrym zapaleniem.",
        "Wypadaniem narządów miednicy mniejszej przez kanał zasłonowy pod mięśniem grzebieniowym do przyśrodkowej części uda.",
        "Uwięźnięciem części żołądka lub śledziony w jamie opłucnej przez ubytek w lewej kopule przepony po urazie tępych powłok."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "Na wepchnięciu worka wraz z zaciskającym pierścieniem do przestrzeni przedotrzewnowej z trwającą martwicą jelita.",
        "Na mechanicznym zmiażdżeniu i pęknięciu jądra pod wpływem nadmiernego ucisku rąk chirurga podczas manewru taxis.",
        "Na natychmiastowym zatrzymaniu krążenia w mechanizmie asystolii w wyniku patologicznego odruchu trzewno-błędnego.",
        "Na rozerwaniu gałęzi tętnicy udowej powierzchownej z powstaniem olbrzymiego krwiaka i tętniaka rzekomego w pachwinie.",
        "Na trwałym zrośnięciu się tkanek powrózka nasiennego ze skórą moszny uniemożliwiającym późniejszą operację naprawczą."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "Powrót różowej barwy, obecność tętna w tętniczkach krezki oraz powrót samoistnej perystaltyki po ogrzaniu pętli.",
        "Utrzymywanie się czarnego podbiegnięcia surowicy bez perystaltyki po 15 minutach okładania ciepłą solą.",
        "Całkowity brak krwawienia z naciętej powierzchownie surowicy jelita w okolicy przeciwległej do brzegu krezkowego.",
        "Ścieńczenie ściany jelita do grubości pergaminu z widoczną przez ścianę ciemną, cuchnącą treścią jelitową.",
        "Obecność pęcherzyków gazu w naczyniach krezkowych oraz odklejanie się martwiczej błony śluzowej od podśluzówki."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Mieć formę pisemną, zawierać opis ryzyka zabiegu oraz potencjalnej konieczności resekcji jelita i wyłonienia stomii.",
        "Być sporządzony wyłącznie w obecności notariusza państwowego lub sędziego dyżurnego wydziału rodzinnego.",
        "Ograniczać się do podpisu chorego bez podawania jakichkolwiek informacji o powikłaniach, aby nie wywoływać lęku.",
        "Być zatwierdzony przez ordynatora oddziału chirurgii na co najmniej 7 dni przed zabiegiem w trybie ostrym.",
        "Być podpisany wyłącznie przez pełnoletniego współmałżonka pacjenta lub jego najbliższego krewnego w linii prostej."
      ]
    }
  ],
  133: [
    {
      qIdx: 2, // Q3
      newOpts: [
        "Skrzeplina powstała w lewym przedsionku (lub uszku lewego przedsionka) w przebiegu migotania przedsionków.",
        "Skrzeplina z żył głębokich kończyn dolnych przemieszczająca się przez prawą komorę do pnia płucnego.",
        "Fragment blaszki miażdżycowej oderwany z tętnicy promieniowej lub tętnicy ramiennej po kaniulacji naczynia.",
        "Kamień żółciowy migrujący przez przetokę pęcherzykowo-dwunastniczą do światła przewodu pokarmowego.",
        "Kłaczek bakteryjny pochodzący z przewlekłego zakażenia bakteryjnego w świetle pęcherza moczowego."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "Planowej re-laparotomii po 24-48 h w celu ponownej oceny żywotności pozostawionych, granicznie ukrwionych pętli jelita.",
        "Wykonaniu drugiej operacji dopiero po 6 miesiącach od wypisu w celu odtworzenia ciągłości przewodu pokarmowego.",
        "Rutynowym wycięciu żołądka i dwunastnicy u każdego chorego po udanej embolektomii naczyniowej tętnicy krezkowej.",
        "Śródoperacyjnym płukaniu jamy otrzewnej 10 litrami lodowatej soli fizjologicznej w celu zahamowania metabolizmu.",
        "Pozostawieniu otwartej powłoki brzusznej bez jakiejkolwiek kontroli chirurgicznej przez okres 30 dni w OIT."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "Brak objawów otrzewnowych we wczesnej fazie mimo skrajnie silnego bólu brzucha (tzw. ból nieproporcjonalny do badania).",
        "Wczesne wystąpienie deskowatego brzucha z obecnością objawu Blumberga w pierwszych minutach od zachorowania.",
        "Brak jakichkolwiek dolegliwości bólowych przy jednoczesnym masywnym krwawieniu z dolnego odcinka pokarmowego.",
        "Obecność obfitych wymiotów kałowych poprzedzających wystąpienie bólu brzucha o co najmniej 48 godzin.",
        "Zawsze prawidłowe wartości stężenia mleczanów i parametrów równowagi kwasowo-zasadowej we krwi tętniczej."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "Embolektomia chirurgiczna tętnicy krezkowej górnej za pomocą cewnika Fogarty'ego lub aspiracja przezskórna.",
        "Zachowawcze leczenie doustnymi lekami przeciwbólowymi i obserwacja ambulatoryjna w poradni chirurgicznej.",
        "Natychmiastowe usunięcie całego przewodu pokarmowego od wpustu do odbytnicy bez próby rewaskularyzacji pnia.",
        "Podawanie doustnych leków przeczyszczających w celu mechanicznego wypchnięcia skrzepliny z naczyń krezki.",
        "Założenie stentu do żyły wrotnej z wytworzeniem wewnątrzwątrobowego zespolenia wrotno-układowego (TIPS)."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Lekarz naraził pacjenta na bezpośrednie niebezpieczeństwo utraty życia (art. 160 k.k.) przez zaniechanie pilnej diagnostyki.",
        "Lekarz nie ponosi żadnej odpowiedzialności, gdyż ból brzucha u osób starszych zawsze ma podłoże czynnościowe.",
        "Odpowiedzialność karna jest całkowicie wykluczona, o ile lekarz zmierzył pacjentowi temperaturę ciała pod pachą.",
        "Sprawa może być rozpatrywana wyłącznie przed sądem pracy jako drobne uchybienie pracownicze bez wpływu na zdrowie.",
        "Lekarz dyżurny na SOR jest zwolniony z obowiązku diagnostyki chorych powyżej 70. roku życia z migotaniem przedsionków."
      ]
    }
  ],
  134: [
    {
      qIdx: 1, // Q2
      newOpts: [
        "Wdrożenie intensywnej resuscytacji płynowej i tlenoterapii, stabilizacja parametrów krążenia oraz zabezpieczenie 2 kaniul.",
        "Natychmiastowe wykonanie pilnej gastroskopii na stojąco przed podłączeniem płynów infuzyjnych do żyły.",
        "Zlecenie doustnego wlewu z zawiesiny siarczanu baru w celu zlokalizowania ewentualnej perforacji wrzodu.",
        "Podanie leków wymiotnych w celu całkowitego opróżnienia żołądka z zalegającej treści krwistej przed badaniem.",
        "Przetoczenie 10 jednostek świeżo mrożonego osocza bez wcześniejszego oznaczenia grupy krwi i próby zgodności."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "Hamowaniu wydzielania kwasu solnego, co podnosi pH w żołądku >6,0, stabilizując skrzep i hamując fibrynolizę pepsynową.",
        "Bezpośrednim działaniu bakteriobójczym na florę tlenową i beztlenową bytującą na powierzchni owrzodzenia trawiennego.",
        "Mechanicznym skurczu mięśniówki gładkiej błony śluzowej żołądka uciskającym krwawiące naczynie krwionośne.",
        "Wybiórczym pobudzaniu kaskady krzepnięcia krwi poprzez bezpośrednią aktywację osoczowego czynnika VIII i czynnika X.",
        "Zmniejszeniu ciśnienia hydrostatycznego w dorzeczu żyły wrotnej o ponad 50% w ciągu pierwszych 5 minut od wstrzyknięcia."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "IA: aktywne krwawienie tętnicze pulsujące; IB: aktywne krwawienie sączące z dna niszy wrzodowej.",
        "IA: niekrwawiące widoczne naczynie; IB: obecność przylegającego skrzepu w dnie owrzodzenia.",
        "IA: czyste dno wrzodu pokryte włóknikiem; IB: plamy hematyny na powierzchni niszy wrzodowej.",
        "IA: owrzodzenie z cechami perforacji; IB: powierzchowna nadżerka błony śluzowej trzonu żołądka.",
        "IA: krwawienie z żylaków przełyku; IB: krwawienie w przebiegu pęknięć błony śluzowej Mallory-Weiss."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Wystawienie Karty DiLO niezwłocznie w szpitalu, zwołanie konsylium onkologicznego (KDO) i wyznaczenie koordynatora.",
        "Karta DiLO może być wystawiona wyłącznie po zakończeniu pełnego leczenia chirurgicznego w oddziale opieki paliatywnej.",
        "Pacjent traci prawo do refundowanego leczenia onkologicznego, jeśli nie zgłosił objawów dysfagii przed 50. rokiem życia.",
        "Lekarz ma bezwzględny prawny zakaz informowania chorego o złośliwym charakterze rozpoznanego nowotworu żołądka.",
        "Zgoda na badanie gastroskopowe stanowi automatyczną zgodę na wycięcie całego żołądka bez odrębnego formularza."
      ]
    }
  ],
  135: [
    {
      qIdx: 1, // Q2
      newOpts: [
        "Wdrożyć agresywną resuscytację płynową oraz wykluczyć krwawienie z górnego odcinka przewodu pokarmowego.",
        "Wykonać pilną pełną kolonoskopię bez przygotowania jelita i bez uprzedniego wyrównania ciśnienia krwi.",
        "Zlecić wlew doodbytniczy z zawiesiny barytowej w celu oceny anatomii uchyłków prawej połowy okrężnicy.",
        "Podać dożylnie leki przeczyszczające i odesłać chorego do domu z zaleceniem kontroli w POZ za 7 dni.",
        "Wykonać badanie rezonansu magnetycznego miednicy mniejszej w celu oceny ewentualnych żylaków odbytu."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "Wprowadzeniu mikrocewnika i zamknięciu krwawiącej gałązki tętniczej mikrosprężynkami lub cząstkami żelatynowymi.",
        "Wstrzyknięciu kleju tkankowego do aorty brzusznej powyżej odejścia pnia trzewnego w znieczuleniu ogólnym.",
        "Całkowitym zablokowaniu pnia tętnicy krezkowej górnej za pomocą balonu okluzyjnego bez wybiórczego cewnikowania.",
        "Chirurgicznym podwiązaniu żyły wrotnej nicią niewchłanialną w celu obniżenia ciśnienia w dorzeczu jelitowym.",
        "Wycięciu prawej połowy okrężnicy przez przezskórne nakłucie prawej tętnicy udowej pod kontrolą fluoroskopii."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "Uchyłki prawej połowy mają szersze szyje, cieńszą ścianę, a ich naczynia proste są bardziej narażone na pęknięcie.",
        "Prawa połowa okrężnicy nie posiada w ogóle mięśniówki gładkiej w ścianie, co predysponuje do pękania naczyń.",
        "Treść kałowa w kątnicy jest całkowicie sucha i twarda, co powoduje stałe mechaniczne uszkadzanie błony śluzowej.",
        "W prawej połowie okrężnicy panuje ciśnienie tętnicze przekraczające 300 mmHg z powodu bliskości pnia aorty.",
        "Jest to zjawisko całkowicie przypadkowe i nie wykazuje żadnego związku z architekturą naczyniową uchyłków."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "Wskaźnik BUN/kreatynina < 20 - 25 (brak trawienia i resorpcji białek krwi w jelicie cienkim).",
        "Wskaźnik BUN/kreatynina > 35 - 40 (masywny rozpad i wchłanianie hemoglobiny w proksymalnym jelicie).",
        "Wskaźnik BUN/kreatynina > 100 u każdego chorego z powodu ostrego przednerkowego uszkodzenia nerek.",
        "Wskaźnik BUN/kreatynina wynosi zawsze dokładnie 0 z uwagi na całkowite zablokowanie syntezy mocznika.",
        "Wskaźnik ten nie zależy od poziomu krwawienia i odzwierciedla jedynie dobowe spożycie soli kuchennej."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "Stratyfikacji ryzyka w krwawieniu z dolnego odcinka i kwalifikacji chorych niskiego ryzyka do opieki ambulatoryjnej.",
        "Oceny stopnia klinicznego zaawansowania raka trzustki i kwalifikacji do chemioterapii paliatywnej FOLFIRINOX.",
        "Kwalifikacji pacjentów ze schyłkową niewydolnością wątroby do pilnego przeszczepienia narządu od dawcy zmarłego.",
        "Oceny prawdopodobieństwa pęknięcia bezobjawowego tętniaka aorty brzusznej o średnicy poniżej 55 milimetrów.",
        "Precyzyjnego wyboru dawki paracetamolu i ibuprofenu u noworodków z przetrwałym przewodem tętniczym Botalla."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Przetoczenie wymaga pisemnej zgody chorego po informacji o ryzyku, a krew podlega próbie zgodności i biologicznej.",
        "Na przetoczenie krwi u dorosłego i przytomnego pacjenta nie jest wymagana żadna zgoda, gdyż krew jest traktowana jak płyn.",
        "Jeśli przytomny pacjent świadomie odmawia transfuzji na piśmie, lekarz ma obowiązek przetoczyć krew pod przymusem.",
        "Zgodę na przetoczenie krwi może wydać wyłącznie dyrektor regionalnego centrum krwiodawstwa i krwiolecznictwa.",
        "Podanie KKCz w warunkach szpitalnych zwalnia personel z obowiązku odnotowania numeru donacji w historii choroby."
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

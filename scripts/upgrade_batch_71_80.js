const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const updates = {
  71: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A) Mocznicowe zapalenie osierdzia manifestujące się szorstkim tarciem osierdziowym i ryzykiem tamponady.",
        "B) Umiarkowane podwyższenie stężenia mocznika we krwi do wartości 25 mmol/l przy zachowanej diurezie dobowej.",
        "C) Obecność łagodnego białkomoczu w pojedynczym badaniu ogólnym moczu bez cech retencji płynów ustrojowych.",
        "D) Występowanie nykturii z koniecznością dwukrotnego oddawania moczu w nocy u chorego z przerostem stercza.",
        "E) Izolowany spadek stężenia hemoglobiny do 10,2 g/dl u chorego bez jakichkolwiek objawów duszności spoczynkowej."
      ]
    },
    {
      qIdx: 1, // Q2
      newOpts: [
        "A) Z powodu wysokiego ryzyka stenozy żyły podobojczykowej, co trwale uniemożliwia wytworzenie przetoki AVF na tym ramieniu.",
        "B) Z powodu natychmiastowego zakażenia wsierdzia zastawki trójdzielnej serca przez florę bakteryjną skóry pacjenta.",
        "C) Z powodu stuprocentowego ryzyka wytworzenia odmy opłucnowej prężnej z przemieszczeniem śródpiersia u każdego chorego.",
        "D) Nakłucie to powoduje odruchowe porażenie splotu ramiennego z nieodwracalnym opadaniem całej kończyny górnej.",
        "E) Procedura ta jest technicznie niewykonalna u pacjentów ze schyłkową niewydolnością nerek z uwagi na zwapnienia."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Na ostrym obrzęku mózgu wywołanym zbyt szybkim obniżeniem mocznika we krwi w stosunku do wolnej eliminacji z OUN.",
        "B) Na natychmiastowym załamaniu parametrów krzepnięcia krwi indukowanym kontaktem z syntetyczną błoną dializatora.",
        "C) Na gwałtownym skurczu tętnic wieńcowych i rozległym zawale mięśnia sercowego u chorego w trakcie pierwszej sesji.",
        "D) Na ostrym porażeniu perystaltyki jelit prowadzącym do natychmiastowego zgonu w mechanizmie ostrej niedrożności.",
        "E) Na trwałym zwapnieniu zastawek serca wywołanym podawaniem dwuwęglanowego płynu dializacyjnego w aparacie."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) Zapalenie ma charakter włóknikowo-krwotoczny i heparyna grozi masywnym krwawieniem do osierdzia i tamponadą serca.",
        "B) Heparyna w kontakcie z mocznicowym płynem osierdziowym ulega natychmiastowej krystalizacji w naczyniach wieńcowych.",
        "C) U chorych ze schyłkową niewydolnością nerek heparyna niefrakcjonowana wykazuje całkowity brak aktywności biologicznej.",
        "D) Podanie heparyny powoduje gwałtowny wzrost stężenia parathormonu w surowicy i ostrą hiperkalcemię z zaburzeniami rytmu.",
        "E) Heparyna wchodzi w bezpośrednią reakcję chemiczną z błoną dializatora prowadząc do jej rozerwania na złączkach."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Wytrącaniem się kryształków mocznika na powierzchni skóry z odparowującego potu u chorych ze skrajną mocznicą.",
        "B) Zakażeniem grzybiczym naskórka wywołanym przez drożdżaki z rodzaju Candida u osób z immunosupresją nerkową.",
        "C) Odkładaniem się kryształów szczawianu wapnia w warstwie rogowej naskórka u chorych z hiperoksalurią pierwotną.",
        "D) Wylewami krwawymi do skóry właściwej wywołanymi ciężką małopłytkowością w przebiegu mocznicy schyłkowej.",
        "E) Powierzchownym zliszajowaceniem skóry podudzi powstałym na podłożu przewlekłej niewydolności żylnej goleni."
      ]
    }
  ],
  72: [
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Obecność podwyższonej liczby leukocytów w osadzie moczu przy jednoczesnym braku wzrostu bakterii w posiewie.",
        "B) Wydalanie całkowicie jałowego moczu pozbawionego jakichkolwiek elementów morfotycznych i białka u pacjenta.",
        "C) Masywny rozpad granulocytów w świetle cewek nerkowych wywołany podawaniem leków przeciwbakteryjnych w POZ.",
        "D) Obecność bakterii w posiewie moczu przy prawidłowej liczbie leukocytów w badaniu mikroskopowym osadu moczu.",
        "E) Zmętnienie moczu wywołane wyłącznie obecnością bezpostaciowych fosforanów wapnia w odczynie zasadowym."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) Natychmiastowe odstawienie leku podejrzanego o wywołanie reakcji nadwrażliwości typu późnego w nerkach.",
        "B) Podanie wysokich dawek furosemidu we wlewie ciągłym w celu forsowania diurezy i wypłukania antygenu z cewek.",
        "C) Wdrożenie dożylnej antybiotykoterapii o szerokim spektrum przeciwko atypowym bakteriom oddechowym w szpitalu.",
        "D) Wykonanie pilnej biopsji chirurgicznej obu nerek z dostępu przez laparotomię w znieczuleniu ogólnym chorego.",
        "E) Rozpoczęcie przewlekłej hemodializoterapii przez stały cewnik naczyniowy bez modyfikacji leczenia doustnego."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "A) Gdy po 3-7 dniach od odstawienia leku nie obserwuje się poprawy czynności nerek lub gdy niewydolność postępuje.",
        "B) Natychmiast w pierwszej minucie od przyjęcia pacjenta na SOR przed zebraniem wywiadu farmakologicznego.",
        "C) Wyłącznie w sytuacji, gdy w badaniu ogólnym moczu stwierdzi się obecność masywnego białkomoczu nerczycowego.",
        "D) Dopiero po upływie 6 miesięcy nieskutecznego leczenia zachowawczego na oddziale chorób wewnętrznych placówki.",
        "E) Steroidoterapia w ostrym cewkowo-śródmiąższowym zapaleniu nerek jest bezwzględnie zakazana przez wytyczne."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A) Okres pierwszych 1-2 tygodni od wystąpienia uszkodzenia nerek, gdy sterydy mogą odwrócić nacieki i zapobiec włóknieniu.",
        "B) Czas trwania hemodializy, w którym dozwolone jest podawanie dożylnych leków immunosupresyjnych przez aparat.",
        "C) Dobowy rytm wydzielania kortyzolu przez korę nadnerczy przypadający na wczesne godziny poranne u pacjenta.",
        "D) Przerwa pomiędzy kolejnymi dawkami antybiotyków, w której stężenie leku we krwi spada poniżej progu MIC.",
        "E) Okres 30 dni poprzedzający wykonanie zabiegu przeszczepienia allogenicznej nerki od dawcy zmarłego w ośrodku."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A) Niesteroidowe leki przeciwzapalne (NLPZ – klasyczny zespół AIN z submikroskopowym KZN i białkomoczem).",
        "B) Antybiotyki z grupy aminoglikozydów (gentamycyna) stosowane w leczeniu ciężkich zakażeń szpitalnych.",
        "C) Inhibitory pompy protonowej (pantoprazol) stosowane w chorobie wrzodowej żołądka i dwunastnicy u seniorów.",
        "D) Statyny syntetyczne stosowane w leczeniu pierwotnej i wtórnej dyslipidemii u osób z miażdżycą naczyń.",
        "E) Leki moczopędne z grupy tiazydów stosowane w skojarzonym leczeniu nadciśnienia tętniczego pierwotnego."
      ]
    }
  ],
  73: [
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) Dodatni wywiad rodzinny w kierunku tętniaka wewnątrzczaszkowego lub krwawienia podpajęczynówkowego (SAH).",
        "B) Prawidłowe wartości ciśnienia tętniczego krwi w pomiarach domowych u młodego pacjenta bez objawów.",
        "C) Obecność pojedynczej bezobjawowej torbieli prostej w miąższu wątroby w badaniu ultrasonograficznym.",
        "D) Stwierdzenie pojedynczego epizodu zakażenia dolnych dróg moczowych leczonego skutecznie furazydyną.",
        "E) Przebyte w dzieciństwie zapalenie gardła wywołane przez paciorkowce beta-hemolizujące z grupy A."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A) Aktywność aminotransferaz (AlAT, AspAT) i stężenie bilirubiny (próby wątrobowe) z uwagi na hepatotoksyczność.",
        "B) Dobowe wydalanie kwasu moczowego z moczem po uprzednim trzydniowym obciążeniu dietą purynową w domu.",
        "C) Stężenie tyreotropiny (TSH) oraz wolnej frakcji tyroksyny (FT4) w surowicy krwi w celu wykluczenia wola.",
        "D) Poziom przeciwciał przeciwjądrowych (ANA) metodą immunofluorescencji pośredniej na komórkach HEp-2.",
        "E) Aktywność kinazy fosfokreatynowej (CK) w celu wykluczenia ostrej rabdomiolizy mięśni szkieletowych."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A) Inhibitory układu renina-angiotensyna-aldosteron (ACEI lub ARB) z docelowym ciśnieniem <120-125/80 mmHg.",
        "B) Antagoniści kanałów wapniowych z grupy dihydropirydyn w monoterapii w maksymalnych dawkach dobowych.",
        "C) Nieselektywne leki beta-adrenolityczne (propranolol) stosowane doustnie trzy razy na dobę po posiłkach.",
        "D) Leki moczopędne z grupy pętlowych (torasemid) stosowane u każdego pacjenta bez względu na poziom wolemii.",
        "E) Leki hipotensyjne o działaniu ośrodkowym (klonidyna) podawane w iniekcjach podskórnych na izbie przyjęć."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A) NLPZ hamują prostaglandyny nerkowe, co wywołuje skurcz tętniczki doprowadzającej, spadek GFR i nasila krwawienie.",
        "B) Leki z grupy NLPZ wchodzą w reakcję z płynem torbielowatym powodując jego natychmiastowe zrakowacenie.",
        "C) Niesteroidowe leki zapalne neutralizują działanie erytropoetyny wywołując ostrą aplazję szpiku kostnego.",
        "D) NLPZ powodują mechaniczne rozerwanie torebki włóknistej obu nerek pod wpływem wzrostu ciśnienia miąższu.",
        "E) Przyjmowanie NLPZ jest bezwzględnie zakazane z uwagi na stuprocentowe ryzyko wywołania ostrej jaskry w oku."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) Kofeina hamuje fosfodiesterazę (PDE), co prowadzi do wzrostu wewnątrzkomórkowego cAMP napędzającego wzrost torbieli.",
        "B) Kofeina bezpośrednio rozpuszcza tkankę łączną zrębu nerek prowadząc do samoistnego pękania miąższu.",
        "C) Związki purynowe zawarte w kawie wywołują natychmiastowe zatrzymanie wydzielania moczu przez kłębuszki.",
        "D) Kofeina blokuje receptory wazopresynowe V2 w kanalikach nerkowych wywołując ciężkie odwodnienie ustroju.",
        "E) Spożywanie kawy uniemożliwia wchłanianie żelaza w dwunastnicy prowadząc do ciężkiej anemii mikrocytarnej."
      ]
    }
  ],
  74: [
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Ustąpienie anemii przy jednoczesnym przyspieszeniu i utrwaleniu nieodwracalnych uszkodzeń neurologicznych w OUN.",
        "B) Wywołanie ostrego zawału mięśnia sercowego ze wstrząsem kardiogennym w mechanizmie skurczu tętnic wieńcowych.",
        "C) Natychmiastowe zniszczenie komórek wysepek beta trzustki z następowym rozwojem cukrzycy insulinozależnej.",
        "D) Przekształcenie łagodnej niedokrwistości megaloblastycznej w piorunującą postać ostrej białaczki szpikowej.",
        "E) Masywne zwapnienie miąższu obu płuc w wyniku patologicznego odkładania się estrów kwasu foliowego w pęcherzykach."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A) Podgłębokie zwyrodnienie sznurów tylnych i bocznych rdzenia kręgowego (subacute combined degeneration – SCD).",
        "B) Izolowane porażenie wiotkie nerwu twarzowego typu Bella z niedomykalnością powieki po stronie uszkodzenia.",
        "C) Ostre bakteryjne zapalenie opon mózgowo-rdzeniowych przebiegające z wysoką gorączką i objawami oponowymi.",
        "D) Obustronny zanik nerwów wzrokowych wywołany bezpośrednim toksycznym działaniem wolnych rodników tlenowych.",
        "E) Uogólnione stwardnienie zanikowe boczne z postępującym zanikiem mięśni szkieletowych i fascykulacjami."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A) Retikulocytoza (tzw. przełom retikulocytowy) ze wzrostem liczby retikulocytów po 5-8 dniach od rozpoczęcia leczenia.",
        "B) Natychmiastowe podwojenie stężenia hemoglobiny w surowicy krwi obwodowej w ciągu pierwszych 12 godzin terapii.",
        "C) Całkowite ustąpienie wszystkich ubytkowych objawów neurologicznych w ciągu pierwszych 24 godzin od iniekcji.",
        "D) Gwałtowny spadek aktywności aminotransferazy alaninowej i asparaginianowej w surowicy krwi pacjenta.",
        "E) Wzrost wskaźnika MCV krwinek czerwonych powyżej 130 fl świadczący o prawidłowej odnowie układu erytrocytów."
      ]
    }
  ],
  75: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A) Niedokrwistość hemolityczna mikroangiopatyczna (MAHA), ciężka małopłytkowość, objawy neurologiczne, gorączka i nerki.",
        "B) Bolesne powiększenie wątroby i śledziony, wysoka leukocytoza z obecnością blastów oraz uogólniona limfadenopatia.",
        "C) Izolowane wydłużenie czasu kaolinowo-kefalinowego (APTT) przy prawidłowej liczbie płytek i braku hemolizy.",
        "D) Wysoka gorączka hektyczna, zapalenie dużych stawów obwodowych oraz rumień wędrujący na skórze tułowia chorego.",
        "E) Masywny krwiomocz z obecnością skrzepów krwi w pęcherzu moczowym i cechami kolki nerkowej w badaniu USG."
      ]
    },
    {
      qIdx: 1, // Q2
      newOpts: [
        "A) Ciężki niedobór (<10%) aktywności metaloproteinazy ADAMTS13 odpowiedzialnej za rozcinanie ultradługich multimerów vWF.",
        "B) Wrodzony całkowity brak cząsteczek fibrynogenu w osoczu krwi z następowym brakiem tworzenia skrzepu w łożysku.",
        "C) Nadmierna synteza i wydzielanie tkankowego aktywatora plazminogenu (tPA) przez komórki śródbłonka naczyń.",
        "D) Obecność autoprzeciwciał skierowanych przeciwko powierzchniowym receptorom płytkowym glikoproteiny IIb/IIIa.",
        "E) Mutacja punktowa genu protrombiny G20210A prowadząca do nadmiernej syntezy trombiny w miąższu wątroby."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) Plazmafereza lecznicza (TPE) z wymianą osocza na świeżo mrożone osocze (FFP) w skojarzeniu z glikokortykosteroidami.",
        "B) Rutynowe pilne przetoczenie 4-6 jednostek koncentratu krwinek płytkowych (KKP) w celu zahamowania skazy.",
        "C) Monoterapia heparyną niefrakcjonowaną we wlewie ciągłym z docelowym wydłużeniem wskaźnika APTT dwukrotnie.",
        "D) Chirurgiczne usunięcie śledziony (splenektomia) wykonywane w trybie ostrym na bloku operacyjnym w znieczuleniu.",
        "E) Dożylne podanie kwasu traneksamowego w wysokich dawkach hemostatycznych co 6 godzin przez 7 kolejnych dni."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "A) Przetoczenie płytek dostarcza substratu do tworzenia nowych mikrozakrzepów, nasilając niedokrwienie OUN i zawał.",
        "B) Krwinki płytkowe ulegają natychmiastowej lizie w kontakcie z przeciwciałami wyzwalając wstrząs anafilaktyczny.",
        "C) Podanie KKP wywołuje trwałe zablokowanie układu oddechowego poprzez obkurczenie mięśniówki tchawicy.",
        "D) Koncentrat płytek krwi wchodzi w reakcję z osoczem pacjenta prowadząc do ostrej martwicy miąższu nerek.",
        "E) Przetaczanie płytek krwi jest zabiegiem zarzuconym we współczesnej hematologii ze względów bioetycznych."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A) Obecność schizocytów (fragmentów erytrocytów: krwinek hełmiastych, trójkątnych) przekraczająca 1% erytrocytów.",
        "B) Obecność ciałek Howella-Jolly'ego wewnątrz dojrzałych erytrocytów w rozmazie mikroskopowym krwi obwodowej.",
        "C) Stwierdzenie pojedynczych komórek tarczowatych (target cells) u chorego z łagodną postacią talasemii beta.",
        "D) Występowanie uogólnionej rulonizacji krwinek czerwonych w badaniu kropli krwi w ciemnym polu widzenia.",
        "E) Całkowity brak jakichkolwiek nieprawidłowości w morfologii i kształcie krwinek czerwonych w rozmazie."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Kaplacyzumab (humanizowane nanociało anty-vWF blokujące interakcję ultradługich multimerów vWF z płytkami).",
        "B) Ekulizumab (przeciwciało monoklonalne wybiórczo blokujące białko C5 dopełniacza w atypowym HUS).",
        "C) Rytuksymab (przeciwciało skierowane przeciwko cząsteczce powierzchniowej CD20 dojrzałych limfocytów B).",
        "D) Kwas acetylosalicylowy podawany doustnie w dawce 300 mg na dobę w celu zahamowania syntezy tromboksanu A2.",
        "E) Warfaryna w dawce nasycającej z kontrolą wskaźnika międzynarodowego współczynnika znormalizowanego INR."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) W TTP parametry krzepnięcia (PT, INR, APTT, fibrynogen) są w normie, a w DIC ulegają patologicznemu zużyciu.",
        "B) W TTP stężenie fibrynogenu spada do zera, podczas gdy w zespole DIC pozostaje wybitnie podwyższone.",
        "C) W zespole DIC liczba płytek krwi pozostaje całkowicie prawidłowa, a w TTP dochodzi do ciężkiej trombocytopenii.",
        "D) Obie jednostki chorobowe charakteryzują się identycznym laboratoryjnym profilem hemostazy osoczowej.",
        "E) W TTP czas kaolinowo-kefalinowy (APTT) ulega trzykrotnemu wydłużeniu na skutek utraty osoczowego czynnika VIII."
      ]
    }
  ],
  76: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A) Gorączka >=38,3°C (lub >=38,0°C przez >1 h) oraz ANC <500/µl (lub przewidywany spadek <500/µl w ciągu 48 h).",
        "B) Temperatura ciała powyżej 37,5°C u pacjenta po chemioterapii przy całkowitej liczbie leukocytów >4000/µl.",
        "C) Izolowana neutropenia poniżej 1000/µl u chorego z prawidłową temperaturą ciała w trakcie hospitalizacji.",
        "D) Stwierdzenie obecności bakterii w posiewie moczu u bezgorączkowego pacjenta leczonego cytostatykami.",
        "E) Wystąpienie uogólnionych dreszczy w trakcie przetaczania koncentratu krwinek czerwonych bez gorączki."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) Antybiotyk beta-laktamowy o działaniu przeciw Pseudomonas (np. piperacylina z tazobaktamem, cefepim, meropenem).",
        "B) Doustna amoksycylina z kwasem klawulanowym podawana w warunkach ambulatoryjnych co 12 godzin przez 7 dni.",
        "C) Ciprofloksacyna w monoterapii dożylnej w standardowej dawce 200 mg co 12 godzin na oddziale onkologii.",
        "D) Wankomycyna w monoterapii dożylnej w celu empirycznej eradykacji bakterii Gram-dodatnich ze skóry.",
        "E) Metronidazol podawany w postaci wlewów dożylnych w celu zwalczania beztlenowej flory przewodu pokarmowego."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A) Niestabilność krążeniowa, zapalenie płuc, podejrzenie zakażenia odcewnikowego, kolonizacja MRSA lub śluzówki.",
        "B) U każdego pacjenta z gorączką neutropeniczną bez względu na stan kliniczny i obecność czynników ryzyka.",
        "C) Wyłącznie w sytuacji, gdy u chorego stwierdzi się obecność zakażenia wirusem ospy wietrznej lub półpaśca.",
        "D) Dopiero po uzyskaniu dodatniego wyniku posiewu krwi potwierdzającego wzrost gronkowca złocistego w 3. dobie.",
        "E) Stosowanie wankomycyny jest bezwzględnie zakazane u chorych z neutropenią z uwagi na mielotoksyczność."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) Badanie to stwarza wysokie ryzyko uszkodzenia śluzówki, krwawienia i translokacji bakterii do krwiobiegu.",
        "B) Badanie per rectum wywołuje natychmiastowe załamanie funkcji filtracyjnej kłębuszków nerkowych u chorego.",
        "C) Procedura ta jest technicznie niewykonalna z powodu odruchowego porażenia zwieraczy w stanie neutropenii.",
        "D) Badanie to uniemożliwia późniejszą ocenę stężenia antygenu swoistego dla stercza (PSA) przez okres 5 lat.",
        "E) Wprowadzenie palca do odbytnicy powoduje odruchowe zatrzymanie akcji serca w mechanizmie wagalnym."
      ]
    }
  ],
  77: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A) CRAB: C – hiperkalcemia, R – niewydolność nerek, A – niedokrwistość normocytarna, B – zmiany lityczne kości.",
        "B) RZĘŻENIA: obustronne rzężenia drobnobańkowe nad płucami, krwioplucie, duszność wysiłkowa oraz sinica.",
        "C) TRIADA: powiększenie wątroby i śledziony, wysoka gorączka hektyczna oraz uogólnione bóle dużych stawów.",
        "D) ZESPÓŁ: masywny białkomocz nerczycowy, wodobrzusze, obrzęki ciastowate goleni oraz hipercholesterolemia.",
        "E) OBJawy: utrata masy ciała, uporczywy świąd skóry, poty nocne oraz izolowane powiększenie węzłów chłonnych."
      ]
    },
    {
      qIdx: 1, // Q2
      newOpts: [
        "A) Nefropatia wałeczkowa (cast nephropathy – cewki zablokowane wałeczkami z łańcuchów lekkich i białka Tamm-Horsfalla).",
        "B) Ostre kłębuszkowe zapalenie nerek z rozplemem zewnątrzwłośniczkowym i tworzeniem półksiężyców nabłonkowych.",
        "C) Zakrzepica obu tętnic nerkowych wywołana bezpośrednią inwazją patologicznych komórek plazmatycznych.",
        "D) Wodonercze obustronne w wyniku ucisku moczowodów przez powiększone pakiety węzłów chłonnych zaotrzewnowych.",
        "E) Pierwotna martwica brodawek nerkowych indukowana nadużywaniem niesteroidowych leków przeciwzapalnych."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Test paskowy wykrywa wyłącznie albuminę, a nie wykrywa wolnych łańcuchów lekkich (białka Bence'a-Jonesa).",
        "B) Testy paskowe u chorych ze szpiczakiem ulegają natychmiastowej degradacji enzymatycznej pod wpływem mocznika.",
        "C) Wolne łańcuchy lekkie immunoglobulin nie przechodzą w ogóle przez barierę filtracyjną kłębuszków nerkowych.",
        "D) W moczu chorych ze szpiczakiem mnogim odczyn pH wynosi zawsze dokładnie 1,0 co uniemożliwia odczyt paska.",
        "E) Oznaczenie białkomoczu testem paskowym jest procedurą zastrzeżoną wyłącznie do diagnostyki kobiet w ciąży."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) Rentgenografia (RTG) całego kośćca (szkieletu) lub niskodawkowa tomografia komputerowa całego ciała (WBLDCT).",
        "B) Klasyczna scyntygrafia kości z użyciem fosfonianów znakowanych technetem-99m w fazie naczyniowej.",
        "C) Badanie ultrasonograficzne powłok brzusznych i miednicy mniejszej z opcją dopplerowską naczyń nerkowych.",
        "D) Przeglądowe zdjęcie rentgenowskie klatki piersiowej w projekcji przednio-tylnej na stojąco w POZ.",
        "E) Pomiar gęstości mineralnej kości metodą densytometrii DEXA w obrębie szyjki kości udowej chorego."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A) Schemat trójlekowy: inhibitor proteasomu (bortezomib) + lek immunomodulujący (lenalidomid) + deksametazon (VRd).",
        "B) Monoterapia doustnym melfalanem podawanym w małych dawkach podtrzymujących przez okres 5 kolejnych lat.",
        "C) Skojarzenie cyklofosfamidu z winkrystyną i doksorubicyną bez dołączania glikokortykosteroidów w szpitalu.",
        "D) Wyłączne napromienianie całego ciała (TBI) w dawkach frakcjonowanych z następowym podaniem witaminy B12.",
        "E) Intensywna plazmafereza lecznicza wykonywana codziennie przez okres 6 miesięcy bez chemioterapii."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Ocenę obecności i charakteru białka monoklonalnego (paraproteiny) oraz wolnych łańcuchów lekkich (FLC).",
        "B) Ilościowe oznaczenie stężenia transaminaz wątrobowych oraz fosfatazy alkalicznej w surowicy krwi.",
        "C) Bezpośredni pomiar stężenia hemoglobiny glikowanej HbA1c oraz glikemii na czczo u pacjenta w POZ.",
        "D) Wykrycie obecności przeciwciał przeciwjądrowych o typie świecenia ziarnistym w mianie powyżej 1:320.",
        "E) Ocenę stopnia wysycenia transferyny żelazem oraz stężenia ferrytyny w ramach diagnostyki hemochromatozy."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) Odsetek klonalnych plazmocytów w szpiku kostnym >=10% (lub udokumentowany guz plazmocytowy) oraz cechy CRAB/SLiM.",
        "B) Stwierdzenie obecności łagodnej niedokrwistości mikrocytarnej z niedoboru żelaza u kobiety przed menopauzą.",
        "C) Wykrycie pojedynczej torbieli prostej w obrębie kości miednicy u pacjenta po przebytym urazie sportowym.",
        "D) Wystąpienie przemijającego podwyższenia odczynu Biernackiego (OB) w trakcie ostrej infekcji wirusowej dróg oddechowych.",
        "E) Obecność prawidłowego rozmazu szpiku kostnego z odsetkiem komórek plazmatycznych nieprzekraczającym 2%."
      ]
    }
  ],
  78: [
    {
      qIdx: 1, // Q2
      newOpts: [
        "A) Okluzja naczyń mikrokrążenia przez sztywne blasty przy skrajnej leukocytozie, prowadząca do niedokrwienia OUN i płuc.",
        "B) Masywny wylew krwi do jamy opłucnowej wywołany bezpośrednim naciekaniem ścian aorty przez komórki szpiczakowe.",
        "C) Ostre bakteryjne zapalenie wsierdzia wywołane zakażeniem gronkowcowym cewnika naczyniowego w żyle szyjnej.",
        "D) Całkowite porażenie perystaltyki przewodu pokarmowego w mechanizmie toksycznego uszkodzenia splotów nerwowych.",
        "E) Wystąpienie ostrej niewydolności kory nadnerczy na skutek obustronnego wylewu krwi do torebek nadnerczowych."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A) Wenetoklaks (Venetoclax – selektywny inhibitor białka antyapoptotycznego BCL-2 przywracający apoptozę blastów).",
        "B) Imatynib (inhibitor kinazy tyrozynowej BCR-ABL stosowany w przewlekłej białaczce szpikowej CML).",
        "C) Trastuzumab (przeciwciało monoklonalne skierowane przeciwko receptorowi HER2 w onkologii klinicznej).",
        "D) Rytuksymab (przeciwciało anty-CD20 stosowane w chłoniakach nieziarniczych i białaczkach limfocytowych).",
        "E) Bortezomib (inhibitor proteasomu 26S stosowany w leczeniu pierwszego rzutu szpiczaka mnogiego)."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) W celu zapobiegania zespołowi rozpadu guza (TLS) i ostrej nefropatii moczanowej w wyniku apoptozy blastów.",
        "B) W celu stymulacji namnażania komórek układu czerwonokrwinkowego przed rozpoczęciem leczenia cytostatykami.",
        "C) W celu bezpośredniej neutralizacji kardiotoksycznego działania antybiotyków antracyklinowych na serce.",
        "D) Aby zapobiec wystąpieniu ostrej reakcji anafilaktycznej na podawaną dożylnie cytarabinę w protokole 7+3.",
        "E) W celu mechanicznego rozpuszczenia blaszek miażdżycowych w aorcie brzusznej i tętnicach wieńcowych chorego."
      ]
    }
  ],
  79: [
    {
      qIdx: 1, // Q2
      newOpts: [
        "A) Zmniejsza rozpuszczalność fosforanu wapnia, sprzyjając jego wytrącaniu w nerkach i sercu, oraz pogłębia hipokalcemię.",
        "B) Alkalizacja moczu bezpośrednio hamuje czynność wydzielniczą wątroby prowadząc do ostrej żółtaczki mechanicznej.",
        "C) Wodorowęglan sodu wchodzi w chemiczną reakcję z rasburykazą całkowicie neutralizując jej aktywność enzymatyczną.",
        "D) Podanie wodorowęglanów indukuje natychmiastowe zrakowacenie nabłonka przejściowego pęcherza moczowego.",
        "E) Alkalizacja moczu jest procedurą w 100% bezpieczną i wytyczne międzynarodowe zalecają jej rutynowe stosowanie."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Jest rekombinowaną oksydazą moczanową, która przekształca kwas moczowy w wysoce rozpuszczalną alantoinę.",
        "B) Blokuje enzym oksydazę ksantynową hamując powstawanie kwasu moczowego z hipoksantyny i ksantyny.",
        "C) Wiąże wolne jony wapnia w osoczu krwi i zapobiega powstawaniu nierozpuszczalnych złogów szczawianowych.",
        "D) Stymuluje nerkowe wydalanie jonów potasu poprzez wybiórczą aktywację pompy sodowo-potasowej w cewkach.",
        "E) Hamuje wchłanianie puryn w przewodzie pokarmowym poprzez blokadę receptorów rąbka szczoteczkowego enterocytów."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) Niedobór dehydrogenazy glukozo-6-fosforanowej (G6PD / fawizm ze względu na hemolizę i methemoglobinemię).",
        "B) Wrodzona hemofilia A uwarunkowana genetycznym niedoborem osoczowego czynnika krzepnięcia VIII u mężczyzn.",
        "C) Zespół von Willebranda typu 1 przebiegający z łagodnymi krwawieniami z błon śluzowych nosa i dziąseł.",
        "D) Wrodzony niedobór dehydrogenazy pirogronianowej z towarzyszącą przewlekłą kwasicą mleczanową u dzieci.",
        "E) Fenyloketonuria uwarunkowana brakiem aktywności enzymu hydroksylazy fenyloalaninowej w wątrobie."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "A) Zmiany w EKG grożące zatrzymaniem krążenia (poszerzenie QRS, namiotowate T, bloki) lub ciężka tężyczka.",
        "B) Izolowany bezobjawowy spadek stężenia wapnia całkowitego w surowicy krwi do wartości 2,1 mmol/l.",
        "C) Pojawienie się łagodnych parestezji opuszek palców rąk u chorego z prawidłowym zapisem elektrokardiogramu.",
        "D) Wzrost iloczynu stężeń wapnia i fosforanów (Ca x P) powyżej 70 mg2/dl2 u pacjenta na sali wzmożonego nadzoru.",
        "E) Profilaktycznie u każdego bez wyjątku chorego przed rozpoczęciem pierwszej dawki chemioterapii indukującej."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A) Oporna na leczenie hiperkaliemia (>6,5 mmol/l), przewodnienie z obrzękiem płuc lub skrajny bezmocz z mocznicą.",
        "B) Spadek stężenia hemoglobiny we krwi obwodowej z 12,0 g/dl do 10,5 g/dl po nawodnieniu dożylnym chorego.",
        "C) Wystąpienie pojedynczego epizodu nudności i wymiotów po przyjęciu pierwszej tabletki allopurynolu.",
        "D) Podwyższenie aktywności dehydrogenazy mleczanowej (LDH) w surowicy krwi dwukrotnie powyżej normy.",
        "E) Obecność bezobjawowej hipokalcemii ze stężeniem wapnia skorygowanego wynoszącym 2,0 mmol/l u leżącego chorego."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Utrzymanie wysokiej diurezy (>100 ml/m2/h lub >2-3 ml/kg/h) celem wypłukiwania metabolitów i ochrony cewek.",
        "B) Podniesienie średniego ciśnienia tętniczego krwi powyżej wartości 180 mmHg w celu wymuszenia hiperperfuzji mózgu.",
        "C) Wywołanie kontrolowanej hipowolemii w celu zagęszczenia krwi i stymulacji wydzielania erytropoetyny.",
        "D) Wypłukanie wszystkich leków cytostatycznych z organizmu pacjenta przed rozpoczęciem ich działania niszczącego.",
        "E) Zmniejszenie objętości krwi krążącej w celu ochrony układu krążenia przed wystąpieniem ostrego obrzęku płuc."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) Allopurynol hamuje syntezę nowego kwasu moczowego (oksydaza ksantynowa), a rasburykaza degraduje już istniejący.",
        "B) Allopurynol rozpuszcza istniejące złogi moczanowe w nerkach, podczas gdy rasburykaza hamuje ich filtrację w kłębuszkach.",
        "C) Oba leki wykazują identyczny mechanizm działania molekularnego i różnią się jedynie drogą podania do organizmu.",
        "D) Allopurynol działa wyłącznie w świetle pęcherza moczowego, a rasburykaza działa w świetle przewodu pokarmowego.",
        "E) Rasburykaza jest lekiem z grupy niesteroidowych leków przeciwzapalnych, a allopurynol jest lekiem moczopędnym."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A) Tężyczka (objaw Chvostka, objaw Trousseau), parestezje wokół ust, kurcze mięśni i wydłużenie odstępu QT.",
        "B) Wybitne skrócenie odstępu QT w zapisie EKG połączone ze zwiotczeniem mięśniówki szkieletowej i śpiączką.",
        "C) Masywne krwawienie z dziąseł i nosa wywołane całkowitym zablokowaniem osoczowej kaskady krzepnięcia krwi.",
        "D) Porażenie mięśni oddechowych z natychmiastowym bezdechem bez jakichkolwiek objawów skurczowych mięśni.",
        "E) Wystąpienie wielomoczu z cechami moczówki prostej nerkowej i ciężkiej hipernatremii hiperosmolalnej."
      ]
    }
  ],
  80: [
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Wzrost miana przeciwciał przeciwko dwuniciowemu DNA (anty-dsDNA) przy jednoczesnym spadku składowych C3 i C4.",
        "B) Izolowany spadek stężenia białka C-reaktywnego (CRP) w surowicy poniżej progu oznaczalności laboratoryjnej.",
        "C) Masywny wzrost stężenia ferrytyny powyżej 5000 µg/l z towarzyszącą leukocytozą z odczynem białaczkowym.",
        "D) Obecność przeciwciał przeciwko tyreoperoksydazie (anty-TPO) w wysokim mianie w teście immunoenzymatycznym.",
        "E) Spadek aktywności aminotransferazy alaninowej i asparaginianowej w surowicy krwi pacjenta z toczniem."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A) Symetryczne, nieerozyjne zapalenie stawów (brak nadżerek w RTG), z deformacjami odwracalnymi biernie (Jaccoud).",
        "B) Masywne, asymetryczne zapalenie dużych stawów ze zniszczeniem kości i obecnością rozległych geod podchrzęstnych.",
        "C) Jednostronne zapalenie pierwszego stawu śródstopno-paliczkowego stopy (podagra) z obecnością tofusów moczanowych.",
        "D) Izolowane zesztywnienie stawów krzyżowo-biodrowych z tworzeniem symetrycznych mostków kostnych (syndesmofitów).",
        "E) Całkowity brak jakichkolwiek dolegliwości ze strony narządu ruchu u chorych z toczniem rumieniowatym."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) Badanie dna oka oraz tomografia optyczna siatkówki (SD-OCT / pole widzenia) pod kątem retinopatii (bawole oko).",
        "B) Pomiar ciśnienia wewnątrzgałkowego metodą aplanacyjną w celu wykluczenia ostrego zamknięcia kąta przesączania.",
        "C) Badanie ultrasonograficzne gałek ocznych w prezentacji B pod kątem obecności wylewów krwi do ciała szklistego.",
        "D) Badanie mikrobiologiczne wymazu z worka spojówkowego w kierunku chlamydii oraz dwoinek rzeżączki u dorosłych.",
        "E) Badanie wydzielania łez testem Schirmera pod kątem obecności pierwotnego zespołu suchości oka Sjögrena."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A) Promieniowanie UV indukuje apoptozę keratynocytów i uwalnianie autoantygenów jądrowych, wyzwalając rzut tocznia.",
        "B) Filtry UV zapobiegają bezpośredniemu wnikaniu cząstek wirusa Epsteina-Barr przez uszkodzony naskórek twarzy.",
        "C) Kremy z filtrem neutralizują leki przeciwmalaryczne w naskórku zapobiegając ich toksycznej kumulacji w skórze.",
        "D) Promieniowanie słoneczne powoduje natychmiastowe rozpuszczenie kompleksów immunologicznych w ścianie naczyń.",
        "E) Stosowanie filtrów przeciwsłonecznych jest zalecane wyłącznie u pacjentów z jednoczesną łuszczycą skóry."
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

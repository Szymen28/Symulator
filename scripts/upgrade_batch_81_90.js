const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const updates = {
  81: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A) Natychmiastowe podanie wysokiej dawki GKS i.v. (metyloprednizolon w pulsach 500-1000 mg/d) PRZED biopsją tętnicy.",
        "B) Wstrzymanie się z farmakoterapią do momentu uzyskania ostatecznego wyniku histopatologicznego pobranej tętnicy.",
        "C) Skierowanie pacjenta na planową tomografię głowy z kontrastem w trybie ambulatoryjnym za 3-4 tygodnie.",
        "D) Podanie wyłącznie miejscowych kropli nawilżających z hialuronianem sodu do worka spojówkowego chorego oka.",
        "E) Wdrożenie monoterapii kwasem acetylosalicylowym w dawce 75 mg raz na dobę bez dołączania glikokortykosteroidów."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Przednia niedokrwienna neuropatia nerwu wzrokowego (AION) wywołana zamknięciem gałęzi tętnic rzęskowych tylnych.",
        "B) Przedarciowe odwarstwienie siatkówki na podłożu zaawansowanej proliferacyjnej retinopatii cukrzycowej.",
        "C) Ostre zamknięcie kąta przesączania z gwałtownym wzrostem ciśnienia wewnątrzgałkowego i obrzękiem rogówki.",
        "D) Masywny wylew krwi do ciała szklistego z pękniętych mikrotętniaków siatkówkowych po nagłym skoku ciśnienia.",
        "E) Pourazowe lub starcze zmętnienie soczewki prowadzące do stopniowej redukcji ostrości widzenia w oku."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) Zwiększyć dawkę prednizonu do 40-60 mg/d (lub pulsy i.v.) i pilnie skierować do okulisty z podejrzeniem GCA.",
        "B) Zmniejszyć dawkę prednizonu do zera i odstawić lek w ciągu 24 godzin z uwagi na podejrzenie powikłań sterydoterapii.",
        "C) Zalecić chłodne okłady z lodu na czoło i skroń bez modyfikacji dotychczasowej dawki glikokortykosteroidów.",
        "D) Włączyć empiryczną antybiotykoterapię doksycykliną z powodu podejrzenia rumienia wędrującego i wczesnej boreliozy.",
        "E) Odczekać miesiąc do planowej kolejnej wizyty kontrolnej w poradni reumatologicznej bez wdrażania leczenia."
      ]
    }
  ],
  82: [
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Gwałtowny spadek urykemii wywołuje mobilizację kryształów ze złogów tkankowych, co nasila i przedłuża ostry stan zapalny.",
        "B) Allopurynol wchodzi w bezpośrednią reakcję chemiczną z paracetamolem neutralizując jego działanie przeciwbólowe.",
        "C) Allopurynol w fazie ostrego stanu zapalnego ulega krystalizacji w miąższu płucnym prowadząc do ostrej niewydolności.",
        "D) Podanie leku w trakcie napadu powoduje natychmiastowe zrośnięcie powierzchni stawowych kości śródstopia.",
        "E) Allopurynol interferuje z kompensatorem mikroskopu polaryzacyjnego fałszując ocenę dwułomności kryształów moczanu."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) W celu profilaktyki napadów dny prowokowanych rozpuszczaniem złogów moczanowych na skutek spadku urykemii.",
        "B) W celu zapobiegania polekowemu łysieniu plackowatemu i uszkodzeniu mieszków włosowych po allopurynolu.",
        "C) Kolchicyna zapobiega powstawaniu złogów cholesterolowych w pęcherzyku żółciowym podczas leczenia.",
        "D) W celu bezpośredniej ochrony hepatocytów przed toksycznym działaniem metabolitów kwasu moczowego.",
        "E) Kolchicyna wzmaga wchłanianie allopurynolu w jelicie cienkim poprzez stymulację mikrokosmkową enterocytów."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) Fruktoza (oraz syrop glukozowo-fruktozowy zawarty w napojach słodzonych stymulujący zużycie ATP w wątrobie).",
        "B) Kofeina zawarta w naparach czarnej kawy i herbaty wykazująca słabe działanie urykozuryczne w nerkach.",
        "C) Chude mleko krowie oraz fermentowane przetwory mleczne obniżające stężenie kwasu moczowego w surowicy.",
        "D) Błonnik pokarmowy rozpuszczalny i nierozpuszczalny pochodzący z pełnoziarnistych zbóż i warzyw strączkowych.",
        "E) Witamina C (kwas askorbinowy) stosowana w dawkach dobowych 500-1000 mg wspomagająca wydalanie moczanów."
      ]
    }
  ],
  83: [
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) Kwas foliowy (>=5 mg/tydz.) należy podawać w odstępie 24–48 godzin po przyjęciu MTX celem zmniejszenia toksyczności.",
        "B) Kwas foliowy należy przyjmować jednocześnie w tej samej godzinie co tabletki metotreksatu w celu ułatwienia wchłaniania.",
        "C) Kwas foliowy jest bezwzględnie zakazany u chorych na RZS, ponieważ całkowicie znosi przeciwzapalne działanie leku.",
        "D) Suplementacja kwasu foliowego jest wymagana wyłącznie u mężczyzn planujących potomstwo w ciągu 3 miesięcy.",
        "E) Kwas foliowy podaje się wyłącznie w postaci wlewów dożylnych w warunkach hospitalizacji na oddziale reumatologii."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A) Zespół Felty'ego (triada: seropozytywne RZS, splenomegalia oraz ciężka neutropenia z nawrotowymi infekcjami).",
        "B) Zespół Sjögrena (suchość rogówki i jamy ustnej na tle limfocytarnego nacieczenia gruczołów zewnątrzwydzielniczych).",
        "C) Zespół Caplana (obecność mnogich guzków reumatoidalnych w miąższu płuc u chorych z pylicą węglową).",
        "D) Zespół cieśni nadgarstka (ucisk nerwu pośrodkowego w kanale nadgarstka przez zapalnie zmienione pochewki ścięgien).",
        "E) Zespół Still'a u dorosłych (wysoka gorączka hektyczna z łososiową osutką skórną i zapaleniem wielu stawów)."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A) Wskaźnik DAS28 (Disease Activity Score uwzględniający ocenę 28 stawów, OB/CRP oraz ogólny stan zdrowia chorego).",
        "B) Skalę Glasgow (GCS) stosowaną do oceny stopnia zaburzeń przytomności i funkcji pnia mózgu u pacjentów urazowych.",
        "C) Skalę NYHA służącą do klasyfikacji stopnia zaawansowania duszności w przewlekłej niewydolności serca.",
        "D) Skalę Alvarado stosowaną do szacowania klinicznego prawdopodobieństwa ostrego zapalenia wyrostka robaczkowego.",
        "E) Wskaźnik ABI (kostka-ramię) służący do hemodynamicznej oceny zwężeń w tętnicach obwodowych kończyn dolnych."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A) Podwichnięcie w stawie szczytowo-obrotowym (C1-C2) z uciskiem na rdzeń przedłużony grożące nagłym zgonem chorego.",
        "B) Samoistne pęknięcie śledziony w przebiegu przewlekłego zapalenia torebki narządu i nacieku limfocytarnego.",
        "C) Ostra martwica kory nerek wywołana odkładaniem się kompleksów immunologicznych w kłębuszkach nerkowych.",
        "D) Całkowite zarośnięcie światła aorty piersiowej przez masywne nacieki komórek olbrzymich w błonie środkowej.",
        "E) Odmę opłucnową prężną wywołaną pęknięciem podopłucnowych pęcherzy rozedmowych w szczycie prawego płuca."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) Przedwczesny rozwój miażdżycy i powikłań sercowo-naczyniowych (zawał serca, udar mózgu) w wyniku przewlekłego zapalenia.",
        "B) Ostra białaczka szpikowa rozwijająca się u 95% chorych na RZS po upływie 10 lat od momentu postawienia diagnozy.",
        "C) Niewydolność kory nadnerczy wywołana autoimmunologicznym zniszczeniem komórek warstwy kłębkowatej i pasmowatej.",
        "D) Pęknięcie żylaków przełyku w przebiegu wrotnego nadciśnienia naczyniowego i marskości wątroby.",
        "E) Zaawansowany rak drobnokomórkowy płuca indukowany obecnością przeciwciał przeciwko cytrulinowanym peptydom."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A) Hydroksychlorochina (wymaga wyjściowej i corocznej kontroli okulistycznej pod kątem retinopatii / objawu bawolego oka).",
        "B) Metotreksat podawany doustnie w małej dawce raz w tygodniu z kwasem foliowym w celu ograniczenia toksyczności.",
        "C) Sulfasalazyna stosowana w dawkach dobowych 2-3 g z koniecznością okresowego monitorowania morfologii krwi.",
        "D) Leflunomid hamujący dehydrogenazę dihydroorotanu i syntezę pirymidyn de novo u chorych z aktywnym RZS.",
        "E) Cyklosporyna A wybiórczo blokująca kalcyneurynę i transkrypcję interleukiny 2 w aktywowanych limfocytach T."
      ]
    }
  ],
  84: [
    {
      qIdx: 1, // Q2
      newOpts: [
        "A) Niesteroidowe leki przeciwzapalne (NLPZ) stosowane w maksymalnych dawkach terapeutycznych przy braku przeciwwskazań.",
        "B) Doustne glikokortykosteroidy w wysokich dawkach podawane przewlekle jako monoterapia pierwszego rzutu w ZZSK.",
        "C) Metotreksat w monoterapii jako lek skutecznie hamujący postęp zmian zapalnych w osiowym szkielecie osiowym.",
        "D) Sole złota podawane w iniekcjach domięśniowych raz w tygodniu przez okres co najmniej dwóch kolejnych lat.",
        "E) Antybiotyki z grupy fluorochinolonów stosowane doustnie przez 6 miesięcy w celu eradykacji bakterii jelitowych."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Ostre zapalenie przedniego odcinka naczyniówki oka (iridocyclitis / uveitis anterior) przebiegające z bólem i światłowstrętem.",
        "B) Przewlekłe wrzodziejące zapalenie rogówki oka z następową perforacją przedniej komory gałki ocznej.",
        "C) Izolowane odwarstwienie siatkówki na obwodzie gałki ocznej wywołane trakcją ciała szklistego u chorych.",
        "D) Wrodzona zaćma jądrowa obu gałek ocznych rozwijająca się u młodych mężczyzn z dodatnim antygenem HLA-B27.",
        "E) Zmętnienie ciała szklistego z obecnością patologicznych złogów wapniowych w obu gałkach ocznych."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A) Doksycyklina doustnie 100 mg 2 razy na dobę przez 14-21 dni (lub amoksycylina u kobiet ciężarnych i dzieci).",
        "B) Ciprofloksacyna doustnie 500 mg 2 razy na dobę przez 7 dni w ramach empirycznej chemioterapii przeciwbakteryjnej.",
        "C) Amantadyna w ciągłym wlewie dożylnym w dawce 200 mg na dobę przez 10 dni w oddziale chorób zakaźnych.",
        "D) Klindamycyna podawana głęboko domięśniowo w dawce 600 mg co 8 godzin przez 4 kolejne tygodnie leczenia.",
        "E) Nystatyna w zawiesinie doustnej podawana 4 razy na dobę celem miejscowej eradykacji drobnoustrojów w jamie ustnej."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A) W I etapie wykonuje się czuły test ELISA, a w razie wyniku dodatniego lub wątpliwego – swoisty test Western Blot.",
        "B) W I etapie wykonuje się ogólne badanie moczu, a w przypadku leukocyturii wykonuje się posiew krwi na podłożu bulionowym.",
        "C) W I etapie wykonuje się test Western Blot, a w razie obecności prążków wykonuje się badanie parazytologiczne kału.",
        "D) Badanie polega na bezpośrednim posiewie zmiażdżonego kleszcza na agarze z krwią baranią w warunkach tlenowych.",
        "E) W I etapie oznacza się aktywność dehydrogenazy mleczanowej, a w II etapie stężenie ferrytyny w surowicy."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A) O konieczności unikania ekspozycji na promieniowanie UV i stosowania filtrów z powodu ryzyka fototoksyczności.",
        "B) O konieczności obligatoryjnego popijania każdej tabletki wyłącznie pełnotłustym mlekiem krowim lub jogurtem.",
        "C) O bezwzględnym zakazie spożywania jakiejkolwiek czystej wody mineralnej w trakcie całego okresu kuracji.",
        "D) O zakazie spania w pozycji leżącej na plecach z uwagi na ryzyko nagłego skurczu mięśniówki dróg oddechowych.",
        "E) O konieczności równoczesnego zażywania wysokich dawek soli żelaza i wapnia w tej samej godzinie z lekiem."
      ]
    }
  ],
  85: [
    {
      qIdx: 4, // Q5
      newOpts: [
        "A) Podanie w ciągu pierwszych 12 h życia pierwszej dawki szczepionki przeciw HBV oraz immunoglobuliny HBIG w dwa różne miejsca.",
        "B) Zastosowanie wyłącznie profilaktyki doustnym acyklowirem w syropie przez okres pierwszych 3 miesięcy życia dziecka.",
        "C) Całkowite odroczenie wszelkich szczepień ochronnych przeciw WZW B do momentu ukończenia 1. roku życia przez niemowlę.",
        "D) Podanie dożylnej nieswoistej immunoglobuliny ludzkiej w pojedynczym wlewie kroplowym bez podawania szczepionki.",
        "E) Przetoczenie 1 jednostki świeżo mrożonego osocza (FFP) od dawcy posiadającego wysokie miano przeciwciał anty-HBs."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A) Immunoablacja limfocytów B stwarza ogromne ryzyko reaktywacji uśpionego cccDNA wirusa i piorunującego zapalenia wątroby.",
        "B) Rytuksymab wchodzi w bezpośrednią reakcję chemiczną z kwasami żółciowymi wytrącając toksyczne kryształy w wątrobie.",
        "C) Chemioterapia cytostatykami całkowicie fałszuje wyniki serologicznych oznaczeń antygenów grup głównych krwi ABO.",
        "D) Profilaktyka przeciwwirusowa zapobiega wystąpieniu wczesnych i późnych nudności oraz wymiotów po chemioterapii.",
        "E) Replikujący wirus HBV wydziela proteazy rozkładające cząsteczki przeciwciał monoklonalnych stosowanych w leczeniu."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) Ujemny HBeAg, dodatnie anty-HBe, podwyższone HBV DNA i postępujące zapalenie na tle mutacji pre-core/core-promoter.",
        "B) Całkowity brak obecności kwasu nukleinowego wirusa HBV DNA we krwi obwodowej przy trwale dodatnim HBsAg.",
        "C) Brak możliwości jakiejkolwiek transmisji horyzontalnej lub wertykalnej cząstek wirusa na inne osoby z kontaktu.",
        "D) Błyskawiczne i samoistne wyleczenie zakażenia wirusowego bez konieczności stosowania leków przeciwwirusowych.",
        "E) Postać kliniczna występująca wyłącznie u skrajnie niedojrzałych noworodków z wrodzonym niedoborem odporności."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A) Działanie przeciwwirusowe oraz silna stymulacja komórkowej odpowiedzi immunologicznej przeciw zakażonym hepatocytom.",
        "B) Bezpośrednie enzymatyczne trawienie kolistego cccDNA w jądrze hepatocytu za pomocą endonukleazy restrykcyjnej.",
        "C) Wybiórcze blokowanie receptora insulinowego na błonie hepatocytów z następowym zahamowaniem glikolizy w wątrobie.",
        "D) Miejscowa neutralizacja kwasu solnego w świetle żołądka z wtórnym obniżeniem wchłaniania cząstek wirusowych w jelicie.",
        "E) Wybiórcze zahamowanie dojrzewania megakariocytów i syntezy płytek krwi w utkaniu szpiku kostnego chorego."
      ]
    }
  ],
  86: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A) Wykonanie 5 oddechów rozprężających po 2–3 sekundy każdy, z użyciem powietrza atmosferycznego (21% O2).",
        "B) Natychmiastowe rozpoczęcie ucisków klatki piersiowej w sztywnym stosunku 30:2 bez uprzedniej wentylacji.",
        "C) Dożylne podanie adrenaliny w bolusie 1 mg przez kaniulę doszpikową lub naczynie pępowinowe noworodka.",
        "D) Wstrzyknięcie 10% roztworu glukonianu wapnia w celu stabilizacji błony komórkowej kardiomiocytów serca.",
        "E) Bierne podanie 100% tlenu w wolnym przepływie przez maskę twarzową przez 15 minut bez oddechów ciśnieniowych."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Gdy po 5 oddechach rozprężających i 30 sekundach efektywnej wentylacji akcja serca pozostaje poniżej 60/min.",
        "B) Natychmiast u każdego noworodka, u którego stwierdza się obecność sinicy dystalnych części kończyn i warg.",
        "C) Zawsze wtedy, gdy akcja serca noworodka mieści się w przedziale pomiędzy 80 a 100 uderzeń na minutę.",
        "D) Dopiero po wykonaniu pełnego badania echokardiograficznego potwierdzającego brak strukturalnej wady serca.",
        "E) Uciskanie klatki piersiowej jest zabiegiem zarzuconym i nie wykonuje się go współcześnie u noworodków."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A) 21% FiO2 (powietrze atmosferyczne bez dodatkowego wzbogacania w tlen w początkowej fazie).",
        "B) 100% FiO2 (czysty tlen z butli medycznej podawany przez układ z workiem samorozprężalnym).",
        "C) 60% FiO2 (mieszanina gazów oddechowych z reduktora tlenowego u każdego noworodka).",
        "D) 80% FiO2 (wysokie stężenie tlenu w celu szybkiego wysycenia hemoglobiny płodowej).",
        "E) Czysty hel medyczny stosowany do zmniejszenia oporów przepływu w drogach oddechowych."
      ]
    }
  ],
  87: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A) Silnie dodatni bezpośredni test antyglobulinowy (BTA / Coombs) z krwinek czerwonych noworodka.",
        "B) Prawidłowe stężenie leukocytów i płytek krwi w morfologii krwi obwodowej z rozmazem mikroskopowym.",
        "C) Izolowana obecność bilirubiny w badaniu ogólnym moczu bez odchyleń w stężeniu hemoglobiny krwi.",
        "D) Umiarkowanie podwyższone stężenie mocznika i kreatyniny w surowicy krwi pobranej z żyły pępowinowej.",
        "E) Ujemny wynik pośredniego testu antyglobulinowego (PTA) wykonanego z surowicy krwi biologicznego ojca."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) W 28.–30. tyg. ciąży (profilaktyka śródciążowa) oraz w ciągu 72 h po porodzie, jeśli dziecko jest RhD-dodatnie.",
        "B) Wyłącznie raz w życiu przed planowanym zamążpójściem lub przed rozpoczęciem współżycia seksualnego.",
        "C) Codziennie doustnie przez cały okres trwania ciąży w małych dawkach podtrzymujących tolerancję immunologiczną.",
        "D) Wyłącznie u kobiet po ukończeniu 40. roku życia z wywiadem co najmniej trzech wcześniejszych poronień.",
        "E) Dopiero w momencie, gdy u noworodka rozwiną się objawy ostrej encefalopatii bilirubinowej (kernicterus)."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) Na fotoizomeryzacji nieskoniugowanej bilirubiny do rozpuszczalnej w wodzie lumirubiny wydalanej bez sprzęgania.",
        "B) Na niszczeniu dojrzałych limfocytów śledziony za pomocą ukierunkowanego promieniowania elektromagnetycznego gamma.",
        "C) Na bezpośrednim i całkowitym rozpadzie erytrocytów w splotach naczyniowych skóry pod wpływem ciepła lampy.",
        "D) Na skokowym podwyższeniu stężenia albuminy w osoczu krwi noworodka o ponad 500% w ciągu pierwszych 2 godzin.",
        "E) Na trwałym chemicznym wiązaniu cząsteczek bilirubiny z jonami wapnia i wydalaniu ich w postaci nierozpuszczalnej."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "A) Uszkodzeniem jąder podstawy mózgu przez wolną (nieskoniugowaną) lipofilną bilirubinę po przekroczeniu bariery krew-mózg.",
        "B) Ogniskowym zapaleniem opon mózgowo-rdzeniowych wywołanym przez cząsteczki bilirubiny sprzężonej z kwasem glukuronowym.",
        "C) Dokomorowym wylewem krwawym do komór bocznych mózgu indukowanym przez podanie profilaktycznej dawki witaminy K.",
        "D) Wrodzonym zwapnieniem kory płatów czołowych mózgu w wyniku zaburzeń gospodarki wapniowo-fosforanowej u płodu.",
        "E) Odwracalnym zażółceniem kości pokrywy czaszki u noworodka bez jakichkolwiek zaburzeń w ośrodkowym układzie nerwowym."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A) Antygeny A i B są słabo rozwinięte na erytrocytach noworodka, a przeciwciała anty-A/B są neutralizowane w tkankach.",
        "B) Przeciwciała w układzie ABO nie przechodzą w ogóle przez barierę łożyskową z uwagi na olbrzymią masę cząsteczkową.",
        "C) Erytrocyty noworodka w grupie 0 są całkowicie oporne na działanie jakichkolwiek alloprzeciwciał matczynych.",
        "D) Konflikt w układzie ABO wywołuje wyłącznie powikłania w układzie krzepnięcia bez jakiejkolwiek hemolizy krwinek.",
        "E) Matka z grupą krwi 0 nie produkuje przeciwciał w klasie IgG przeciwko antygenom krwinkowym grupy A lub B."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A) Monitorowanie szczytowej prędkości skurczowej w tętnicy środkowej mózgu (MCA-PSV) w USG Doppler u płodu.",
        "B) Seryjne wykonywanie tomografii komputerowej miednicy matki co 7 dni od 20. tygodnia trwania ciąży.",
        "C) Oznaczanie stężenia białka C-reaktywnego (CRP) w ślinie ciężarnej kobiety w każdym trymestrze ciąży.",
        "D) Rutynowe pobieranie płynu owodniowego metodą amniopunkcji co 48 godzin w celu pomiaru hematokrytu.",
        "E) Badanie palpacyjne wielkości wątroby płodu przez powłoki brzuszne matki w trakcie rutynowej wizyty w POZ."
      ]
    }
  ],
  88: [
    {
      qIdx: 1, // Q2
      newOpts: [
        "A) Obecność gazu w ścianie jelita (odma śródścienna / pneumatosis intestinalis) lub gazu w gałęziach żyły wrotnej.",
        "B) Obecność pojedynczego prawidłowego pęcherzyka gazu w rzucie dna żołądka u leżącego noworodka.",
        "C) Całkowity brak jakiegokolwiek gazu w jamie brzusznej bez rozdęcia pętli jelita cienkiego i grubego.",
        "D) Prawidłowe zagięcie dwunastnicy w kształcie litery C bez poszerzenia pętli jelita czczego i krętego.",
        "E) Widoczność cienia wątroby i śledziony bez wolnego płynu w jamie otrzewnej u dziecka w inkubatorze."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Karmienie naturalne mlekiem matki (pokarm kobiecy zawiera IgA, laktoferynę, oligosacharydy HMO i czynniki wzrostu).",
        "B) Rutynowe wczesne podawanie standardowego mleka modyfikowanego na bazie niehydrolizowanego mleka krowiego.",
        "C) Całkowita rezygnacja z antybiotykoterapii okołoporodowej u matki z dodatnim posiewem w kierunku paciorkowców GBS.",
        "D) Podawanie wcześniakowi doustnych roztworów soli kuchennej w celu mechanicznego pobudzenia perystaltyki jelit.",
        "E) Karmienie noworodka wyłącznie roztworami glukozy podawanymi przez smoczek co 2 godziny przez 14 dni."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A) Obecność wolnego gazu w jamie otrzewnej (pneumoperitoneum świadczące o perforacji martwiczej ściany jelita).",
        "B) Pojedynczy epizod nietolerancji karmienia z zaleganiem 1 ml mleka w żołądku przed kolejną porcją.",
        "C) Wzrost stężenia białka C-reaktywnego (CRP) z 2 mg/l do 12 mg/l przy stabilnym ciśnieniu tętniczym krwi.",
        "D) Wystąpienie stolca o luźniejszej konsystencji bez widocznej makroskopowo domieszki świeżej krwi.",
        "E) Przejściowy spadek temperatury ciała w inkubatorze o 0,3°C reagujący na regulację nastaw ogrzewania."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A) Wstrzymanie karmienia (dieta zero), odbarczenie żołądka sondą, antybiotykoterapia i płynoterapia i.v.",
        "B) Podanie doustne oleju rycynowego lub parafiny celem mechanicznego udrożnienia spastycznego jelita.",
        "C) Wymuszenie podawania dużych objętości mleka modyfikowanego przez zgłębnik w celu rozszerzenia światła.",
        "D) Wykonanie wlewu doodbytniczego z nierozcieńczonej zawiesiny barytowej pod wysokim ciśnieniem hydrostatycznym.",
        "E) Wypisanie noworodka do domu z zaleceniem obserwacji stolca przez rodziców i kontroli w POZ za 2 tygodnie."
      ]
    }
  ],
  89: [
    {
      qIdx: 1, // Q2
      newOpts: [
        "A) Jest to zawsze objaw alarmowy chirurgicznej niedrożności przewodu pokarmowego zlokalizowanej poniżej brodawki Vatera.",
        "B) Świadczy o całkowitej dojrzałości enzymatycznej błony śluzowej żołądka i prawidłowej funkcji wydzielniczej.",
        "C) Stanowi fizjologiczną i w pełni oczekiwaną reakcję przewodu pokarmowego na domięśniowe podanie witaminy K1.",
        "D) Świadczy o obecności licznych mikrozłogów cholesterolowych w świetle pęcherzyka żółciowego u noworodka.",
        "E) Jest to typowy objaw ostrego ropnego zapalenia ucha środkowego szerzącego się drogą trąbki słuchowej."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) Przeszkoda w dwunastnicy uniemożliwia połykanie i resorpcję płynu owodniowego przez przewód pokarmowy płodu.",
        "B) Nerki płodu produkują 10-krotnie większe objętości hipoosmolarnego moczu z powodu stymulacji hormonalnej.",
        "C) Wynika z wrodzonego braku wykształcenia naczyń krwionośnych w obrębie łożyska i sznura pępowinowego.",
        "D) Jest to skutek nadmiernego spożywania płynów bezzapachowych przez ciężarną kobietę w trzecim trymestrze.",
        "E) Zjawisko to wynika z pierwotnego braku surfaktantu w pęcherzykach płucnych rozwijającego się płodu."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A) Założenie zgłębnika nosowo-żołądkowego z ciągłym odbarczaniem, wstrzymanie karmienia (NPO) i płynoterapia.",
        "B) Podanie kontrastu barytowego przez butelkę ze smoczkiem w celu wykonania natychmiastowego pasażu jelit.",
        "C) Wymuszenie intensywnego karmienia piersią co 1,5 godziny w celu pokonania czynnościowego skurczu odźwiernika.",
        "D) Dożylne podanie insuliny krótkodziałającej w ciągłym wlewie w celu pobudzenia motoryki przewodu pokarmowego.",
        "E) Zastosowanie głębokiej lewatywy z hipertonicznego roztworu soli fizjologicznej bez odbarczenia żołądka."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A) Badanie echokardiograficzne serca (echo serca) w celu wykluczenia wrodzonej wady serca (np. wspólnego kanału AVSD).",
        "B) Scyntygrafię jodową tarczycy z użyciem jodu-131 w celu oceny ektopii gruczołu tarczowego na szyi.",
        "C) Rezonans magnetyczny obu stawów kolanowych w znieczuleniu ogólnym pod kątem zwichnięcia rzepki.",
        "D) Kolonoskopię diagnostyczną z intubacją zastawki krętniczo-kątniczej Bauhina w celu oceny błony śluzowej.",
        "E) Panendoskopię diagnostyczną z biopsją błony śluzowej trzonu żołądka w kierunku zakażenia Helicobacter pylori."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) W atrezji wymioty są od 1. doby i są żółciowe, a w HPS pojawiają się w 3.–6. tyg. i NIGDY nie zawierają żółci.",
        "B) W przeroście odźwiernika (HPS) wymioty są zawsze obficie podbiegnięte krwią i mają woń kałową.",
        "C) W atrezji dwunastnicy wymioty nie występują wcale, a choroba manifestuje się jedynie zatrzymaniem moczu.",
        "D) Obie jednostki chorobowe charakteryzują się identycznym czasem wystąpienia i takim samym składem treści.",
        "E) W atrezji dwunastnicy wymioty występują wyłącznie u matki dziecka na drodze odruchu psychogennego."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A) Wzdęte nadbrzusze (rozdęty żołądek) z zapadniętym, 'łódkowatym' podbrzuszem i śródbrzuszem z brakiem gazów.",
        "B) Masywne, uogólnione wzdęcie wszystkich kwadrantów brzucha napiętego jak balon z widocznymi pętlami jelit.",
        "C) Prawidłowy, symetrycznie wysklepiony brzuch bez żadnych odchyleń od normy w badaniu palpacyjnym.",
        "D) Deskowato napięty brzuch z obecnością uogólnionego objawu Blumberga i zanikiem perystaltyki.",
        "E) Brzuch żabi z rozlanym objawem chełbotania płynu w jamie otrzewnej i obecnością obrzęków obwodowych."
      ]
    }
  ],
  90: [
    {
      qIdx: 4, // Q5
      newOpts: [
        "A) Podaniu surfaktantu w ciągłym wlewie dożylnym przez centralny cewnik wprowadzony do żyły pępowinowej.",
        "B) Podaniu surfaktantu przez cienki cewnik do tchawicy u spontanicznie oddychającego noworodka na nCPAP bez intubacji.",
        "C) Podaniu surfaktantu bezpośrednio do światła żołądka przez zgłębnik nosowo-żołądkowy celem wchłaniania jelitowego.",
        "D) Podaniu surfaktantu we wstrzyknięciu głęboko domięśniowym w przednio-boczną powierzchnię mięśnia czworogłowego uda.",
        "E) Chirurgicznym wykonaniu tracheostomii ratunkowej i podaniu leku przez kaniulę tracheostomijną na sali operacyjnej."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) 75 - 80% (dopuszczalna niska saturacja zapobiegająca tworzeniu wolnych rodników tlenowych).",
        "B) 85 - 89% (stężenie rekomendowane wyłącznie u noworodków z ciężką siniczą wadą serca).",
        "C) 90 - 94% (optymalne docelowe nasycenie hemoglobiny zapobiegające niedotlenieniu i retinopatii ROP).",
        "D) 98 - 100% (wysokie wysycenie tlenem zalecane u każdego wcześniaka po porodzie).",
        "E) Zawsze 100% (bezwzględny wymóg utrzymywania pełnego wysycenia hemoglobiny w inkubatorze)."
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

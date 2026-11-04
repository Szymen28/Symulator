const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const updates = {
  101: [
    {
      qIdx: 1, // Q2
      newOpts: [
        "A) Selektywny niedobór IgA występuje 10–15x częściej w celiakii i test anty-tTG IgA da wtedy fałszywie ujemny wynik",
        "B) Wysokie stężenie IgA jest bezpośrednim i obligatoryjnym kryterium histologicznej atrofii kosmków jelita cienkiego",
        "C) Całkowite IgA stanowi kluczowy enzym trawiący frakcje gliadyny i glutenu w świetle rąbka szczoteczkowego enterocytów",
        "D) Badanie to służy do wykluczenia szpiczaka mnogiego i gammapatii monoklonalnej u dzieci przed rozpoczęciem diety",
        "E) Prawidłowe stężenie całkowitej frakcji IgA pozwala z całą pewnością wykluczyć u pacjenta obecność choroby trzewnej"
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Zaświadczenie lekarskie potwierdzające celiakię i konieczność ścisłej diety bezglutenowej w przedszkolu oraz edukacja dietetyczna.",
        "Skierowanie dziecka do sanatorium uzdrowiskowego na 12-miesięczny turnus leczenia klimatycznego z całkowitą izolacją od rówieśników.",
        "Informacja dla rodziców, że po ukończeniu 7. roku życia dieta bezglutenowa może zostać trwale zastąpiona pieczywem pszennym bez badań.",
        "Zgłoszenie rozpoznania choroby trzewnej do Sanepidu na formularzu ZLK-1 jako zakaźnej enteropatii wymagającej izolacji domowej.",
        "Zalecenie czasowego ograniczenia glutenu przez 4 tygodnie bez konieczności zgłaszania diety personelowi placówki przedszkolnej."
      ]
    }
  ],
  102: [
    {
      qIdx: 5, // Q6
      newOpts: [
        "A) Adrenalina domięśniowo (i.m.) w przednio-boczną powierzchnię uda w dawce 0.01 mg/kg m.c.",
        "B) Hydrokortyzon dożylnie w bolusie 10 mg/kg m.c. z powolnym wlewem w soli fizjologicznej.",
        "C) Klemastyna domięśniowo w dawce 1 mg z jednoczesnym podaniem doustnego leku przeciwhistaminowego.",
        "D) Salbutamol wziewnie w nebulizacji jako jedyny lek rozkurczający mięśniówkę drzewa oskrzelowego.",
        "E) Deksametazon doustnie w kroplach w dawce 0.15 mg/kg m.c. podawany co 6 godzin przez 3 kolejne dni."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A) Stopniowe wprowadzanie nabiału od poddanego obróbce termicznej w mące (herbatniki), przez fermentowany, po mleko.",
        "B) Codzienne podwajanie objętości surowego niepasteryzowanego mleka krowiego pitego rano na czczo przez 14 dni.",
        "C) Podawanie mleka modyfikowanego wyłącznie w trakcie ćwiczeń fizycznych i wspinania się na drabince gimnastycznej.",
        "D) Podawanie mieszanki mlekozastępczej wyłącznie w pozycji pionowej z użyciem specjalnego cewnika żołądkowego.",
        "E) Zastępowanie preparatów mleka krowiego napojem sojowym w parzyste dni tygodnia bez eliminacji przetworów."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Prawo do refundowanych mieszanek eHF lub aminokwasowych przy udokumentowaniu w dokumentacji objawów alergii na białka mleka.",
        "Mieszanki o wysokim stopniu hydrolizy są dostępne wyłącznie na receptę pełnopłatną i nie podlegają refundacji NFZ.",
        "Wystawienie recepty na preparat eHF ze zniżką wymaga każdorazowej pisemnej zgody konsultanta wojewódzkiego w dziedzinie pediatrii.",
        "Refundacja mieszanek leczniczych eHF przysługuje wyłącznie pełnoletnim pacjentom po ukończeniu 18. roku życia w poradni.",
        "Lekarz POZ nie ma prawa ordynować mieszanek eHF i musi każdorazowo odsyłać pacjenta do kliniki uniwersyteckiej gastroenterologii."
      ]
    }
  ],
  103: [
    {
      qIdx: 10, // Q11
      newOpts: [
        "Pisemną zgodę na zabieg o podwyższonym ryzyku może podpisać jeden z rodziców, o ile nie ma między nimi sporu.",
        "Wykonanie operacji wymaga bezwzględnie jednoczesnego podpisu obojga rodziców w obecności notariusza państwowego.",
        "Dziecko w wieku 9 lat ma prawny obowiązek złożyć równoległy pisemny podpis na formularzu zgody pod rygorem nieważności.",
        "Zgoda rodziców nie jest wymagana, o ile zgodę na piśmie wyda dyrektor szpitala lub ordynator oddziału chirurgii.",
        "Lekarz musi wstrzymać operację i skierować sprawę do sądu opiekuńczego, jeśli ojciec dziecka przebywa za granicą."
      ]
    }
  ],
  104: [
    {
      qIdx: 1, // Q2
      newOpts: [
        "A. Z cewnika pęcherzowego (>=10 000 CFU/ml) lub nakłucia nadłonowego (każda liczba bakterii).",
        "B. Z woreczka przyklejanego do krocza (dowolna liczba bakterii wystarcza do rozpoznania ZUM).",
        "C. Ze środkowego strumienia po umyciu mydłem (próg rozpoznania wynosi zawsze >=100 CFU/ml).",
        "D. Z pieluszki jednorazowej po odciśnięciu moczu (badanie w kierunku obecności leukocytów).",
        "E. Z nocnika po uprzednim przetarciu spirytusem (wymóg uzyskania czystej hodowli mikroorganizmów)."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "A. USG układu moczowego u każdego niemowlęcia po pierwszym w życiu gorączkowym ZUM.",
        "B. Cystouretrografia mikcyjna (CUM) rutynowo w 1. dobie ostrego zakażenia układu moczowego.",
        "C. Scyntygrafia nerek DMSA po upływie 24 godzin od wdrożenia antybiotykoterapii dożylnej.",
        "D. Tomografia komputerowa jamy brzusznej z podwójnym kontrastem dożylnym i doustnym.",
        "E. Urografia dożylna z seryjnymi zdjęciami rentgenowskimi wykonywana przed wypisem do domu."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A. Wiek <2-3 miesiące, stan septyczny, odwodnienie, wymioty uniemożliwiające leczenie PO.",
        "B. Izolowana gorączka 38.0°C u wesołego, dobrze pijącego niemowlęcia w 8. miesiącu życia.",
        "C. Prawidłowy wynik badania ogólnego moczu i brak jakichkolwiek odchyleń w parametrach krwi.",
        "D. Występowanie ZUM u rodzeństwa pacjenta w wywiadzie rodzinnym bez objawów u dziecka.",
        "E. Wykrycie obecności bakterii w moczu pobranym do woreczka przy braku cech stanu zapalnego."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Zaświadczenie o niezdolności do pracy z powodu opieki nad dzieckiem (ZUS ZLA) na czas hospitalizacji i rekonwalescencji.",
        "Szpital ma prawny zakaz wystawiania druków ZUS ZLA matkom dzieci hospitalizowanych, uznając opiekę szpitala za wystarczającą.",
        "Zaświadczenie ZUS ZLA może zostać wystawione wyłącznie ojcu dziecka, pod warunkiem że matka nie wykonuje pracy zarobkowej.",
        "Zwolnienie lekarskie z tytułu opieki przysługuje wyłącznie w wymiarze maksymalnie 3 dni w całym roku kalendarzowym.",
        "Wystawienie druku ZUS ZLA na zdrowe dziecko wymaga uprzedniej zgody Zakładu Ubezpieczeń Społecznych wydanej na piśmie."
      ]
    }
  ],
  105: [
    {
      qIdx: 7, // Q8
      newOpts: [
        "A. Brak remisji (utrzymujący się białkomocz) po 4–6 tygodniach codziennej prednizonoterapii w pełnej dawce (60 mg/m2/d).",
        "B. Nawrót białkomoczu w trakcie redukcji dawki prednizonu lub w ciągu 14 dni od zakończenia prawidłowego leczenia.",
        "C. Wystąpienie powikłań steroidoterapii pod postacią jatrogennego zespołu Cushinga i rozstępów na skórze brzucha.",
        "D. Brak normalizacji ciśnienia tętniczego krwi pomimo jednoczesnego stosowania inhibitorów ACE oraz diuretyków pętlowych.",
        "E. Wystąpienie ostrego epizodu zakrzepicy żyły nerkowej w trakcie pierwszych 7 dni hospitalizacji na oddziale nefrologii."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Szczepienia żywe (MMR, ospa) są przeciwwskazane w trakcie sterydoterapii oraz przez 1-3 miesiące po jej zakończeniu.",
        "Wszelkie szczepienia ochronne, w tym inaktywowane szczepionki przeciw grypie, podlegają trwałemu bezterminowemu zakazowi.",
        "Dziecko w trakcie immunosupresji powinno natychmiast otrzymać dawkę przypominającą żywej szczepionki przeciwko odrze i ospie.",
        "Szczepienia żywymi atenuowanymi szczepionkami są całkowicie bezpieczne i zalecane w pierwszym tygodniu podawania prednizonu.",
        "W trakcie sterydoterapii nie wolno podawać szczepionek przeciw pneumokokom, a szczepienia żywe można kontynuować bez ograniczeń."
      ]
    }
  ],
  106: [
    {
      qIdx: 2, // Q3
      newOpts: [
        "A. Są bezwzględnie wskazane w celu eliminacji nosicielstwa pałeczek Shigella dysenteriae z przewodu pokarmowego.",
        "B. Zwiększają ryzyko HUS, gdyż liza bakterii wyzwala masywny wyrzut toksyny Shiga (Stx) do światła jelita.",
        "C. Hamują wydzielanie toksyny Shiga i przyspieszają ustąpienie krwistej biegunki w pierwszych 48 godzinach infekcji.",
        "D. Powodują zniszczenie fizjologicznej flory beztlenowej jelita z następową perforacją kątnicy i zapaleniem otrzewnej.",
        "E. Nie wywierają żadnego wpływu na przebieg zakażenia STEC i mogą być stosowane w dawkach profilaktycznych bez obaw."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Obowiązek telefonicznego i pisemnego zgłoszenia podejrzenia lub rozpoznania HUS/STEC do Sanepidu w ciągu 24 godzin.",
        "Zgłoszenie do Sanepidu jest fakultatywne i zależy wyłącznie od decyzji ordynatora oddziału nefrologii dziecięcej.",
        "Lekarz ma prawny zakaz zgłaszania HUS, aby nie wzbudzać niepokoju społecznego związanego ze skażeniem żywności.",
        "Przypadek HUS podlega zgłoszeniu do organów ścigania dopiero po laboratoryjnym potwierdzeniu zgonu pacjenta.",
        "Zgłoszenie epidemiologiczne na formularzu ZLK-1 jest wymagane wyłącznie w przypadku wystąpienia zakażenia szpitalnego."
      ]
    }
  ],
  107: [
    {
      qIdx: 4, // Q5
      newOpts: [
        "A. Przyspieszenie samoistnego zaniku odpływu moczowodowego poprzez zablokowanie syntezy kolagenu w trójkącie pęcherza.",
        "B. Zmniejszenie ryzyka nawrotowych odmiedniczkowych zapaleń nerek i rozwoju blizn pozapalnych w miąższu nerek.",
        "C. Całkowite wyleczenie pęcherza neurogennego i przywrócenie prawidłowej koordynacji zwieraczowo-wypieraczowej u dziecka.",
        "D. Obniżenie ciśnienia tętniczego krwi poprzez hamowanie układu renina-angiotensyna-aldosteron w naczyniach nerkowych.",
        "E. Profilaktyka zakażeń wirusowych dróg moczowych wywoływanych przez adenowirusy i poliomawirusy typu BK w moczu."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A. Przewlekłe cewnikowanie pęcherza moczowego na stałe cewnikiem Foleya przez okres co najmniej 12 kolejnych miesięcy.",
        "B. Zastosowanie ostrzyknięcia ujścia moczowodu substancją uszczelniającą (np. Deflux) lub reimplantacji moczowodu.",
        "C. Wykonanie natychmiastowej nefrektomii jednostronnej w celu uniknięcia rozwoju uogólnionego zakażenia septycznego.",
        "D. Podawanie wysokich dawek dożylnych glikokortykosteroidów w celu redukcji obrzęku ujścia pęcherzowo-moczowodowego.",
        "E. Zastosowanie zewnętrznego drenażu nefrostomijnego przez okres 6 miesięcy bez leczenia przeciwbakteryjnego."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Zaświadczenie lekarskie zobowiązujące nauczycieli do umożliwienia dziecku mikcji w schemacie timed voiding na każde żądanie.",
        "Wydanie zakazu opuszczania sali lekcyjnej przez dziecko przez pełne 6 godzin zajęć szkolnych w celu treningu pęcherza.",
        "Skierowanie dziecka do szkoły specjalnej ze względu na rozpoznanie odpływu pęcherzowo-moczowodowego IV stopnia.",
        "Zalecenie personelowi placówki całkowitego wstrzymania pojenia dziecka w godzinach pobytu w szkole celem redukcji diurezy.",
        "Wymóg uzyskania każdorazowej zgody kuratorium oświaty i dyrektora szkoły na opuszczenie lekcji do toalety przez ucznia."
      ]
    }
  ],
  108: [
    {
      qIdx: 10, // Q11
      newOpts: [
        "Kontrola ciśnienia tętniczego, badanie ogólne moczu oraz oznaczenie składowej C3 dopełniacza po 6-8 tygodniach od zachorowania.",
        "Natychmiastowe skierowanie dziecka na zabiegi przewlekłej hemodializoterapii do stacji dializ z powodu trwałej anurii.",
        "Wydanie bezwzględnego zakazu kontynuowania nauki szkolnej w trybie stacjonarnym na okres co najmniej 12 kolejnych miesięcy.",
        "Zgłoszenie przypadku ostrego KZN do prokuratury z podejrzeniem błędu w sztuce lekarskiej przy wcześniejszej anginie.",
        "Zlecenie dożywotniej profilaktyki penicyliną benzatynową podawaną co 3 tygodnie z całkowitym zakazem uprawiania sportu."
      ]
    }
  ],
  109: [
    {
      qIdx: 3, // Q4
      newOpts: [
        "A. Izolowane poszerzenie miedniczki nerkowej do 12 mm bez cech zastoju moczu w kielichach i przy symetrycznej funkcji w scyntygrafii.",
        "B. Zwiększenie wymiaru przednio-tylnego miedniczki nerkowej (APD >20-30 mm), progresja wodonercza lub spadek funkcji nerki <40%.",
        "C. Wystąpienie pojedynczego epizodu bezgorączkowego zakażenia dolnych dróg moczowych bez cech zastoju w badaniu ultrasonograficznym.",
        "D. Wykrycie obecności śladowego białkomoczu w porannej próbce moczu u bezobjawowego niemowlęcia z prawidłowym ciśnieniem tętniczym.",
        "E. Brak samoistnego ustąpienia wodonercza w badaniu USG wykonanym w pierwszych 48 godzinach życia u noworodka bez innych powikłań."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A. Pieloplastyka sposobem Hynesa-Andersona (resekcja zwężonego połączenia i ponowne zespolenie miedniczkowo-moczowodowe).",
        "B. Całkowita nefrektomia jednostronna z usunięciem nadnercza i regionalnych węzłów chłonnych w trybie pilnym.",
        "C. Wytworzenie trwałej przetoki pęcherzowo-skórnej metodą otwartą z odprowadzeniem moczu do worka urostomijnego.",
        "D. Ostrzyknięcie ujścia miedniczkowego toksyną botulinową w celu porażenia skurczu mięśniówki gładkiej moczowodu.",
        "E. Wszczepienie sztucznej zastawki mechanicznej do światła moczowodu zapobiegającej refluksowi pęcherzowemu."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A. W zwężeniu UPJO moczowód jest zawsze skrajnie poszerzony i kręty na całej swojej długości aż do samego ujścia pęcherzowego.",
        "B. Zwężenie UPJO prowadzi do izolowanego poszerzenia miedniczki i kielichów z prawidłowym, niewidocznym moczowodem poniżej przeszkody.",
        "C. W odpływie pęcherzowo-moczowodowym kielichy nerkowe nigdy nie ulegają poszerzeniu niezależnie od stopnia zaawansowania wady.",
        "D. Obie patologie dają identyczny obraz w USG i ich odróżnienie wymaga obligatoryjnego wykonania tomografii komputerowej z kontrastem.",
        "E. W zwężeniu UPJO dochodzi do ucisku pęcherza moczowego przez olbrzymi uchyłek moczowodu z następowym zatrzymaniem moczu w pęcherzu."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Pisemna zgoda przedstawicieli ustawowych po wyjaśnieniu celu, techniki operacji, korzyści, powikłań i usunięcia stentu DJ.",
        "Ustna zgoda jednego z rodziców bez wpisu do historii choroby z zapewnieniem, że laparoskopia nie niesie żadnych ryzyk.",
        "Odstąpienie od informowania opiekunów o konieczności usunięcia stentu moczowodowego DJ w celu redukcji ich niepokoju.",
        "Uzyskanie bezpośredniej pisemnej zgody operacyjnej na formularzu zabiegowym od 6-miesięcznego niemowlęcia na sali.",
        "Zastąpienie formalnego formularza zgody rodziców ustną akceptacją pielęgniarki anestezjologicznej przed indukcją."
      ]
    }
  ],
  110: [
    {
      qIdx: 5, // Q6
      newOpts: [
        "A. Witamina A w wysokich dawkach (200 000 j.m. doustnie przez 2 dni) redukująca śmiertelność i powikłania oczne.",
        "B. Acyklowir dożylnie w dawce 10 mg/kg m.c. co 8 godzin w celu zahamowania replikacji paramyksowirusa odry.",
        "C. Glikokortykosteroidy dożylnie w pulsach 1000 mg przez 3 dni celem prewencji powikłań neurologicznych.",
        "D. Oseltamiwir doustnie w dawce terapeutycznej przez 5 dni jako swoisty inhibitor neuraminidazy wirusowej.",
        "E. Chlorochina w schemacie przeciwmalarycznym w skojarzeniu z wysokimi dawkami witaminy C dożylnie."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Zgłoszenie podejrzenia lub rozpoznania odry do Sanepidu (druk ZLK-1) w ciągu 24 h oraz pobranie wymazu i krwi na IgM.",
        "Zgłoszenie przypadku do Sanepidu w trybie rutynowym wyłącznie po uzyskaniu dodatniego wyniku posiewu bakteryjnego.",
        "Wdrożenie kwarantanny domowej dla całej rodziny bez konieczności powiadamiania organów Państwowej Inspekcji Sanitarnej.",
        "Zgłoszenie przypadku odry do Sanepidu na formularzu ZLK-1 w ciągu 14 dni od momentu ustąpienia zmian osutkowych na skórze.",
        "Przesłanie zawiadomienia do stacji sanitarno-epidemiologicznej wyłącznie w sytuacji zgonu dziecka lub hospitalizacji na OIT."
      ]
    }
  ],
  111: [
    {
      qIdx: 10, // Q11
      newOpts: [
        "Dziecko przestaje być zakaźne po 24 godzinach od rozpoczęcia skutecznej antybiotykoterapii fenoksymetylopenicyliną.",
        "Dziecko wymaga obligatoryjnej kwarantanny domowej przez pełne 30 dni od momentu ustąpienia osutki na skórze.",
        "Lekarz ma prawny obowiązek zawiadomić Sanepid o każdym przypadku płonicy pod rygorem odpowiedzialności karnej.",
        "Wszystkie dzieci z grupy przedszkolnej muszą otrzymać profilaktyczną dawkę penicyliny bez badania lekarskiego.",
        "Powrót do przedszkola jest dozwolony wyłącznie po uzyskaniu dwóch ujemnych posiewów z gardła pobranych w odstępie 7 dni."
      ]
    }
  ],
  112: [
    {
      qIdx: 2, // Q3
      newOpts: [
        "A. Rutynowe podawanie kwasu acetylosalicylowego w celu obniżenia gorączki u każdego dziecka z ospą wietrzną.",
        "B. Acyklowir dożylnie (10 mg/kg co 8 h) u osób z grup wysokiego ryzyka powikłań lub z ciężkim przebiegiem zakażenia.",
        "C. Gancyklowir dożylnie jako lek pierwszego rzutu u wszystkich gorączkujących dzieci powyżej 1. roku życia.",
        "D. Smarowanie wykwitów płynnym pudrem z cynkiem w celu przyspieszenia wysychania i gojenia pęcherzyków.",
        "E. Zastosowanie antybiotykoterapii cefalosporynami III generacji doustnie u każdego pacjenta ambulatoryjnego."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A. Zespół Guillaina-Barrégo z wstępującym niedowładem wiotkim kończyn i rozkojarzeniem białkowo-komórkowym.",
        "B. Zespół Reye'a (ostra encefalopatia ze stłuszczeniem wątroby indukowana podaniem ASA w infekcji wirusowej).",
        "C. Toksyczna nekroliza naskórka Lyella z dodatnim objawem Nikolskiego i utratą pełnej grubości naskórka.",
        "D. Ostra białaczka limfoblastyczna ze skazą krwotoczną i nacieczeniem narządów układu siateczkowo-śródbłonkowego.",
        "E. Zespół nerczycowy z masywnym białkomoczem subklinicznym i obrzękami powiek nasilającymi się rano."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A. Wyłącznie w pierwszych 24 godzinach od momentu wystąpienia pierwszego pęcherzyka na skórze tułowia.",
        "B. Od 1-2 dni przed pojawieniem się osutki do momentu przyschnięcia wszystkich wykwitów w strupki (ok. 6 dni).",
        "C. Przez pełne 6 tygodni od początku infekcji niezależnie od stanu klinicznego skóry i obecności strupów.",
        "D. Dopiero od 5. doby trwania osutki po pęknięciu pęcherzyków i uwolnieniu płynu surowiczego na zewnątrz.",
        "E. Dziecko jest zakaźne wyłącznie dla osób dorosłych, nie stanowiąc zagrożenia epidemiologicznego dla dzieci."
      ]
    }
  ],
  113: [
    {
      qIdx: 5, // Q6
      newOpts: [
        "A. Prawdziwa anafilaksja zagrażająca życiu wymagająca dożywotniego unikania wszelkich antybiotyków beta-laktamowych.",
        "B. Osutka plamisto-grudkowa po amoksycylinie/ampicylinie w przebiegu mononukleozy (reakcja immunologiczna).",
        "C. Toksyczny rumień wielopostaciowy indukowany obecnością wirusa Epsteina-Barr w komórkach nabłonka skóry.",
        "D. Ostra białaczka limfoblastyczna manifestująca się nacieczeniem skóry przez mononukleary w trakcie infekcji.",
        "E. Szkarlatyna powikłana wtórną infekcją paciorkowcową wymagająca natychmiastowej zmiany antybiotyku na wankomycynę."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A. Zakaz sportów kontaktowych i forsownego wysiłku przez minimum 3–4 tygodnie z uwagi na ryzyko pęknięcia śledziony.",
        "B. Zezwolenie na natychmiastowy powrót do intensywnych treningów zapaśniczych i piłkarskich od 2. doby hospitalizacji.",
        "C. Profilaktyczna splenektomia laparoskopowa wykonywana rutynowo u każdego nastolatka z dodatnim testem PB-mono.",
        "D. Bezwzględne unieruchomienie w łóżku w pozycji leżącej na wznak przez 6 miesięcy bez możliwości wstawania.",
        "E. Codzienne wykonywanie przyłóżkowego badania USG jamy brzusznej przez 12 miesięcy po wypisie ze szpitala."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Lekarz POZ wydaje czasowe zwolnienie z zajęć WF na 4 tygodnie z zakazem sportów kontaktowych z uwagi na splenomegalię.",
        "Wystawia bezterminowe zwolnienie z lekcji WF do końca edukacji szkolnej z powodu trwałego upośledzenia odporności.",
        "Zgłasza przypadek mononukleozy do Sanepidu jako chorobę kwarantannową podlegającą przymusowej hospitalizacji.",
        "Kieruje pacjenta w trybie pilnym do poradni onkologicznej z podejrzeniem chłoniaka Hodgkina bez badań kontrolnych.",
        "Zaleca powrót do wyczynowego uprawiania sztuk walki natychmiast po normalizacji temperatury ciała pacjenta."
      ]
    }
  ],
  114: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A. Faza napadowego kaszlu ze świstem wdechowym (pianiem), w której zakaźność jest znikoma i wynosi poniżej 5%.",
        "B. Faza nieżytowa (kataralna) trwająca 1–2 tygodnie, charakteryzująca się najwyższą zakaźnością dla otoczenia.",
        "C. Faza rekonwalescencji trwająca kilka miesięcy, w której dochodzi do odkrztuszania gęstej ropnej plwociny.",
        "D. Wszystkie fazy krztuśca charakteryzują się dokładnie identyczną zakaźnością wynoszącą 100% przez 6 miesięcy.",
        "E. Krztusiec nie jest chorobą zakaźną i nie przenosi się drogą kropelkową pomiędzy domownikami w rodzinie."
      ]
    },
    {
      qIdx: 1, // Q2
      newOpts: [
        "A. Głęboka leukopenia ze skrajną neutropenią poniżej 500 komórek/µl i obecnością atypowych komórek plazmatycznych.",
        "B. Wyraźna leukocytoza z przewagą limfocytów (limfocytoza bezwzględna) wywołana działaniem toksyny krztuścowej PT.",
        "C. Znaczna eozynofilia przekraczająca 30% w rozmazie krwi obwodowej związana z inwazją pasożytniczą dróg oddechowych.",
        "D. Masywna trombocytopenia z małopłytkowością rzekomą indukowaną obecnością toksyny dermonekrotycznej DNT.",
        "E. Prawidłowa morfologia krwi obwodowej bez jakichkolwiek odchyleń u wszystkich niemowląt z ciężkim krztuścem."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "A. Makrolidy (azytromycyna, klarytromycyna) skracające okres zakaźności, skuteczne klinicznie w fazie nieżytowej.",
        "B. Amoksycylina z kwasem klawulanowym w wysokich dawkach jako lek pierwszego rzutu eliminujący toksynę z krwi.",
        "C. Fluorochinolony (cyprofloksacyna) podawane doustnie przez 21 dni w celu zapobiegania powikłaniom płucnym.",
        "D. Cefalosporyny III generacji (ceftriakson) w monoterapii domięśniowej u każdego pacjenta ambulatoryjnego.",
        "E. Doksycyklina w dawce 200 mg/dobę jako lek z wyboru u noworodków i niemowląt w pierwszym półroczu życia."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A. Ostra martwica kory nerek, zarośnięcie zastawki pnia płucnego oraz wrodzone zwężenie odźwiernika żołądka.",
        "B. Azotemia i hiperkaliemia u niemowląt, a u starszych przepukliny, wylewy podspojówkowe i złamania żeber.",
        "C. Toksyczny megacolon, owrzodzenie rogówki oraz zwichnięcie stawu biodrowego w mechanizmie odruchowym.",
        "D. Zwłóknienie szpiku kostnego, obustronne zapalenie nerwu wzrokowego oraz zawał mięśnia sercowego u dzieci.",
        "E. Rozlany krwiak podtwardówkowy mózgu będący bezpośrednim skutkiem kaszlu u każdego chorującego niemowlęcia."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A. Zaszczepienie przeciw krztuścowi osób z otoczenia noworodka (rodziców, dziadków), aby chronić nieszczepione niemowlę.",
        "B. Całkowita izolacja niemowlęcia w hermetycznym inkubatorze domowym przez pierwsze 12 miesięcy życia dziecka.",
        "C. Profilaktyczne codzienne podawanie dziecku makrolidów w kroplach doustnych od 1. doby życia do ukończenia 2 lat.",
        "D. Ciasne owijanie klatki piersiowej niemowlęcia bandażem elastycznym w czasie snu celem stabilizacji oddechu.",
        "E. Płukanie jamy nosowo-gardłowej noworodka hipertonicznym roztworem soli morskiej 10 razy na dobę przed karmieniem."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Lekarz ma obowiązek zgłosić krztusiec do Sanepidu (ZLK-1) w ciągu 24 h i zalecić chemioprofilaktykę makrolidem domownikom.",
        "Zgłoszenie do Sanepidu jest fakultatywne i wymaga uprzedniej zgody rodziców dziecka wyrażonej na piśmie pod rygorem nieważności.",
        "Chemioprofilaktyka poekspozycyjna u osób z bezpośredniego kontaktu jest bezwzględnie zakazana ze względu na ryzyko oporności.",
        "Lekarz ma prawny obowiązek zawiadomić prokuraturę o uchylaniu się rodziców od obowiązkowych szczepień ochronnych niemowlęcia.",
        "Krztusiec nie podlega rejestracji epidemiologicznej w Polsce i nie wymaga prowadzenia jakiegokolwiek nadzoru sanitarnego."
      ]
    }
  ],
  115: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A. Drobnoplamista osutka płonicza z trójkątem Fiłatowa i obecnością malinowego języka w pierwszych 24 godzinach.",
        "B. Wygląd 'spoliczkowanego dziecka' (rumień na policzkach) z bladością wokół ust, a następnie girlandowata osutka.",
        "C. Polimorficzna osutka pęcherzykowa z obecnością plamek, grudek i strupów w obrazie 'gwiaździstego nieba' na tułowiu.",
        "D. Grudkowo-krwotoczna osutka zlokalizowana na pośladkach i wyprostnych powierzchniach kończyn dolnych u dziecka.",
        "E. Odropodobna zlewająca się osutka zstępująca od linii włosów na tułów z towarzyszącym zapaleniem spojówek i światłowstrętem."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "A. Do komórek prekursorowych linii czerwonokrwinkowej (erytroblastów) w szpiku poprzez receptor antygenu P (globozydu).",
        "B. Do dojrzałych granulocytów obojętnochłonnych w krążeniu obwodowym poprzez wiązanie z receptorem Fc immunoglobuliny IgG.",
        "C. Do limfocytów B pamięci w grudkach chłonnych przewodu pokarmowego poprzez powierzchniowy receptor CD21 dopełniacza.",
        "D. Do komórek śródbłonka naczyń mózgowych poprzez swoisty receptor dla transferyny z następowym obrzękiem naczyniopochodnym.",
        "E. Do tyreocytów pęcherzykowych w tarczycy z wyzwoleniem ostrego poporodowego zapalenia tarczycy typu de Quervaina."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "A. Ostra, symetryczna artropatia drobnych stawów rąk i kolan imitująca reumatoidalne zapalenie stawów.",
        "B. Ostre martwicze zapalenie trzustki z wstrząsem hipowolemicznym i obecnością objawu Grey Turnera.",
        "C. Mechaniczna niedrożność jelita cienkiego wywołana obrzękiem kępek Peyera w końcowym jelicie krętym.",
        "D. Jednostronne pozagałkowe zapalenie nerwu wzrokowego z gwałtownym ubytkiem pola widzenia i mroczkiem.",
        "E. Rozlane pęcherzowe oddzielanie się naskórka z dodatnim objawem Nikolskiego i utratą płynów ustrojowych."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A. Zakażenie wrodzone Parwowirusem B19 (przełom aplastyczny u płodu i kardiomiopatia).",
        "B. Wrodzona toksoplazmoza z obecnością zwapnień śródmózgowia i zapalenia siatkówki.",
        "C. Wrodzone zakażenie wirusem różyczki z wadami serca i zaćmą wrodzoną u noworodka.",
        "D. Zakażenie wirusem opryszczki pospolitej HSV-2 nabyte w trakcie porodu drogami natury.",
        "E. Izolowany wrodzony niedobór dehydrogenazy glukozo-6-fosforanowej G6PD u płodu męskiego."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A. Zespół rękawiczkowo-skarpetkowy charakteryzujący się bolesnym obrzękiem i plamicą nadgarstków i kostek.",
        "B. Zespół metaboliczny z encefalopatią i nefropatią wywołany ostrym zatruciem solami rtęci nieorganicznej.",
        "C. Zmiany martwicze i pęcherzowe skóry dłoni i stóp wywołane jadem skorpionów lub pająków z rodzaju Loxosceles.",
        "D. Odmiana liszajca zakaźnego stóp i podudzi o etiologii gronkowcowej z tworzeniem miodowożółtych strupów.",
        "E. Uogólniona krostkowa postać łuszczycy Von Zumbusch ograniczona do powierzchni dłoniowej i podeszwowej."
      ]
    }
  ],
  116: [
    {
      qIdx: 3, // Q4
      newOpts: [
        "A. W śliniankach i komórkach jednojądrzastych krwi (monocytach i limfocytach T), pozostając w fazie latencji.",
        "B. W enterocytach rąbka szczoteczkowego dwunastnicy i jelita czczego, wydalając się ze stolcem przez 12 miesięcy.",
        "C. W komórkach beta wysp trzustkowych Langerhansa, wywołując uogólnioną cukrzycę typu 1 u każdego niemowlęcia.",
        "D. W osteoblastach nasad kości długich, powodując przejściowe zahamowanie wzrastania kośćca u małych dzieci.",
        "E. W erytroblastach szpiku kostnego, indukując przełom aplastyczny ze spadkiem hemoglobiny poniżej 5 g/dl."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "A. Drgawki gorączkowe (wynikające z gwałtownego skoku temperatury i neurotropizmu wirusa).",
        "B. Ostra martwica wątroby ze śpiączką wątrobową i skazą krwotoczną w mechanizmie DIC.",
        "C. Zatorowość tętnic płucnych materiałem zakrzepowym z żył głębokich miednicy mniejszej.",
        "D. Pęknięcie pęcherza moczowego wywołane neurogennym zatrzymaniem moczu w gorączce.",
        "E. Rozlane wrzodziejące zapalenie jelita grubego powikłane perforacją ściany okrężnicy."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Poinformowanie rodziców, że osutka przy spadku gorączki to objaw wyzdrowienia (gorączka trzydniowa) i dziecko może wrócić do żłobka.",
        "Pilne skierowanie dziecka karetką na oddział dermatologii w trybie ostrym z podejrzeniem toksycznej nekrolizy naskórka Lyella.",
        "Natychmiastowa hospitalizacja na OIT z wdrożeniem dożylnej wankomycyny w ciągłym wlewie i acyklowiru w dawce przeciwwirusowej.",
        "Skierowanie wniosku do sądu rodzinnego z podejrzeniem przestępstwa narażenia dziecka na bezpośrednie niebezpieczeństwo utraty życia.",
        "Wystawienie bezterminowego zaświadczenia o przeciwwskazaniu do wszelkich szczepień ochronnych z powodu powikłania infekcyjnego."
      ]
    }
  ],
  117: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A. Parwowirus B19 oraz syncytialny wirus oddechowy RSV odpowiedzialne za postać pęcherzykową zakażenia.",
        "B. Coxsackie A16 oraz Enterowirus 71 (EV-A71 wiąże się ze zwiększonym ryzykiem powikłań neurologicznych).",
        "C. Herpes simplex virus typu 1 (HSV-1) oraz wirus ospy wietrznej i półpaśca (VZV) w koinfekcji u niemowląt.",
        "D. Adenowirusy grupy B oraz wirus Epsteina-Barr odpowiedzialne za odczyn węzłowy i zapalenie gardła.",
        "E. Wirus grypy typu A (szczep H1N1) oraz paramyksowirus świnki wywołujące powiększenie ślinianek przyusznych."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "A. W HFMD zmiany w jamie ustnej nigdy nie ulegają owrzodzeniu i mają wyłącznie charakter rumieniowy plamisty.",
        "B. W HFMD wykwity zajmują tylną część gardła i skórę dłoni/stóp, a w HSV dziąsła, wargi i przednią jamę ustną.",
        "C. Zakażenie HSV przebiega zawsze bez jakiejkolwiek gorączki, podczas gdy w HFMD temperatura przekracza 40°C.",
        "D. W HFMD zmiany skórne lokalizują się wyłącznie na tułowiu i plecach, oszczędzając dłonie, podeszwy i pośladki.",
        "E. Zmiany opryszczkowe w jamie ustnej ustępują samoistnie w ciągu 24 godzin bez pozostawiania śladu u dzieci."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A. Ciężka hipokaliemia z rzekomą niedrożnością porażenną jelit i perforacją kątnicy u noworodka.",
        "B. Neuroinfekcja (zapalenie pnia mózgu, opon, wiotkie porażenia) oraz neurogenny obrzęk płuc.",
        "C. Ostra niewydolność kory nadnerczy w mechanizmie wylewu krwotocznego Waterhouse'a-Friderichsena.",
        "D. Masywna hemoliza wewnątrznaczyniowa z ostrą niewydolnością nerek i bezmoczem w przebiegu HUS.",
        "E. Zarośnięcie zastawki pnia płucnego i zawał ściany przedniej serca u niemowlęcia bez wad serca."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A. Odwodnienie wynikające z silnego bólu przy połykaniu (odynofagii) i odmowy przyjmowania płynów.",
        "B. Samoistne pęknięcie torebki śledziony w mechanizmie ostrej limfoproliferacji i splenomegalii.",
        "C. Złamanie zmęczeniowe kości śródstopia wywołane obecnością głębokich pęcherzyków na podeszwach.",
        "D. Ostra przednerkowa niewydolność nerek wymagająca natychmiastowej ciągłej dializoterapii na OIT.",
        "E. Ostre skręcenie jądra i najądrza indukowane odczynowym stanem zapalnym naczyń moszny."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A. Trwały przykurcz zgięciowy ścięgien zginaczy palców dłoni (przykurcz Dupuytrena u dzieci).",
        "B. Onychomadesis (poprzeczne oddzielenie i złuszczenie płytki paznokciowej po przebytej chorobie).",
        "C. Zanik czucia wibracji i ułożenia w kończynach dolnych w mechanizmie ataksji czuciowej.",
        "D. Zarośnięcie przewodów ślinianek podżuchwowych z tworzeniem bolesnych torbieli zastoinowych.",
        "E. Trwałe zniekształcenie stawów międzypaliczkowych bliższych z obecnością guzków Heberdena."
      ]
    }
  ],
  118: [
    {
      qIdx: 1, // Q2
      newOpts: [
        "A. Napad ogniskowy z asymetrią drgawek kończyn trwający powyżej 20 minut z następowym niedowładem Todda.",
        "B. Napad uogólniony toniczno-kloniczny trwający <15 minut, niepowtarzający się w ciągu 24 h, bez deficytów.",
        "C. Seria trzech napadów drgawkowych występujących w odstępie 2 godzin u dziecka bez wcześniejszej gorączki.",
        "D. Napad u niemowlęcia poniżej 1. miesiąca życia przebiegający ze zwiotczeniem mięśni i sinicą obwodową.",
        "E. Drgawki występujące u dziecka z rozpoznaną wcześniej padaczką lekooporną i uszkodzeniem OUN w wywiadzie."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A. Niewielkie, wynoszące ok. 1–2% (zbliżone do ryzyka w populacji ogólnej wynoszącego ok. 1%).",
        "B. Bardzo wysokie, przekraczające 70–80% i wymagające wdrożenia przewlekłej farmakoterapii.",
        "C. Równe 100%, ponieważ każdy epizod drgawek gorączkowych nieodwracalnie uszkadza hipokamp.",
        "D. Ryzyko wynosi dokładnie 25% pod warunkiem natychmiastowego wykonania punkcji lędźwiowej.",
        "E. Wynosi zero, gdyż drgawki gorączkowe trwale uodparniają mózg dziecka na rozwój padaczki."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Szczegółowy instruktaż pierwszej pomocy, recepta na diazepam/midazolam doodbytniczo/dopoliczkowo oraz edukacja.",
        "Skierowanie dziecka do szpitala psychiatrycznego na oddział zamknięty z powodu zaburzeń zachowania.",
        "Wystawienie bezwzględnego trwałego zakazu uczęszczania do przedszkola i szkoły do 18. roku życia.",
        "Nakaz natychmiastowego wdrożenia przewlekłego leczenia fenobarbitalem doustnie przez 5 lat bez EEG.",
        "Zgłoszenie podejrzenia przestępstwa narażenia na niebezpieczeństwo do prokuratury rejonowej."
      ]
    }
  ],
  119: [
    {
      qIdx: 2, // Q3
      newOpts: [
        "A. Wybitnie podwyższone stężenie 17-hydroksyprogesteronu (17-OHP) w surowicy na czczo lub po teście z Synacthenem.",
        "B. Izolowany wzrost stężenia hormonu tyreotropowego TSH w surowicy przy prawidłowym stężeniu wolnej tyroksyny fT4.",
        "C. Obniżenie stężenia hormonu adrenokortykotropowego ACTH do wartości nieoznaczalnych w badaniu porannym krwi.",
        "D. Wykrycie obecności autoprzeciwciał przeciwko 21-hydroksylazie w wysokim mianie w teście radioimmunologicznym.",
        "E. Prawidłowy jonogram i gazometria krwi włośniczkowej wykonane w 2. dobie życia u noworodka z obojnictwem narządów."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A. Hiponatremią, hiperkaliemią, kwasicą metaboliczną, odwodnieniem, hipoglikemią i wstrząsem hipowolemicznym.",
        "B. Hipernatremią >160 mmol/l, hipokaliemią <2.5 mmol/l, zasadowicą metaboliczną oraz nadciśnieniem tętniczym.",
        "C. Prawidłowym stężeniem sodu i potasu przy izolowanej hiperglikemii powyżej 400 mg/dl z cechami ketozy w moczu.",
        "D. Masywną hiperkalcemią z poliurią, hiperfosfatemią oraz ostrą przednerkową niewydolnością nerek z bezmoczem.",
        "E. Zespołem nieadekwatnej retencji sodu z uogólnionymi obrzękami podudzi, wodobrzuszem i podwyższonym ciśnieniem."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "A. Hydrokortyzon (glikokortykosteroid) w skojarzeniu z fludrokortyzonem (mineralokortykosteroidem).",
        "B. Deksametazon w wysokich dawkach w monoterapii doustnej bez konieczności suplementacji soli kuchennej.",
        "C. Spironolakton jako antagonista aldosteronu w skojarzeniu z kaptoprylem w celu ochrony miąższu nerek.",
        "D. Testosteron domięśniowo w dawkach substytucyjnych u wszystkich noworodków płci żeńskiej z wirylizacją.",
        "E. Wlew dożylny rekombinowanego hormonu adrenokortykotropowego ACTH podawany codziennie przez 6 miesięcy."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A. Zahamowanie nadmiernego wydzielania ACTH przez przysadkę i redukcja nadprodukcji androgenów nadnerczowych.",
        "B. Bezpośrednia stymulacja biosyntezy kortyzolu w warstwie pasmowatej kory nadnerczy pomimo bloku enzymatycznego.",
        "C. Trwała eliminacja zmutowanego genu CYP21A2 z genomu komórek somatycznych pacjenta na drodze terapii genowej.",
        "D. Pobudzenie wzrostu i dojrzewania gonad męskich u dziewczynek z obojnaczymi zewnętrznymi narządami płciowymi.",
        "E. Wywołanie całkowitego zaniku kory nadnerczy i zastąpienie jej czynności przez hormonalną terapię zastępczą."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Poinformowanie o genetycznym podłożu kariotypu 46,XX, zwołanie konsylium wielodyscyplinarnego i odroczenie rejestracji płci.",
        "Natychmiastowe arbitralne wpisanie płci męskiej do aktu urodzenia na podstawie obecności prąciopodobnej łechtaczki.",
        "Poinformowanie rodziców, że dziecko jest obupłciowe i wybór płci urzędowej należy pozostawić dziecku do ukończenia 18 lat.",
        "Wdrożenie natychmiastowej amputacji przerośniętej łechtaczki w 1. dobie życia bez badań genetycznych i zgody rodziców.",
        "Zgłoszenie wady wrodzonej do prokuratury jako podejrzenia uszkodzenia płodu przez błąd w sztuce podczas porodu."
      ]
    }
  ],
  120: [
    {
      qIdx: 1, // Q2
      newOpts: [
        "A. 0.05–0.1 j./kg m.c./h we wlewie ciągłym i.v., rozpoczynany dopiero po 1–2 godzinach wstępnego nawadniania płynowego.",
        "B. Bolus dożylny insuliny w dawce 0.3 j./kg m.c. podawany natychmiast w pierwszej minucie przed podłączeniem płynów.",
        "C. Wlew dożylny insuliny w dawce 0.5 j./kg m.c./h podawany w skojarzeniu z 20% roztworem glukozy od samego początku.",
        "D. Podskórne wstrzyknięcia insuliny o przedłużonym działaniu co 4 godziny w dawce 1 j./kg m.c. bez wlewu dożylnego.",
        "E. Całkowite powstrzymanie się od podawania insuliny przez pierwsze 24 godziny hospitalizacji na oddziale intensywnym."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A. Przed rozpoczęciem wlewu insuliny należy znać stężenie potasu; przy K+ <3.5 mmol/l wstrzymać insulinę i podać potas.",
        "B. Insulina wypłukuje potas z komórek do osocza, dlatego wlew insuliny należy przyspieszyć w przypadku ciężkiej hipokaliemii.",
        "C. Podaż potasu w DKA u dzieci jest bezwzględnie zakazana ze względu na skrajne ryzyko natychmiastowej asystolii serca.",
        "D. Potas należy podawać wyłącznie w szybkim bolusie dożylnym nierozcieńczonego 15% KCl w dawce 40 mmol w 2 minuty.",
        "E. Monitorowanie stężenia potasu w surowicy nie ma znaczenia klinicznego przy prawidłowym zapisie ciśnienia tętniczego."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "A. Do płynów infuzyjnych należy dodać 5% glukozę, aby utrzymać glikemię w granicach 150–200 mg/dl i kontynuować insulinę.",
        "B. Należy natychmiast całkowicie wyłączyć pompę z insuliną i podawać dziecku wyłącznie czystą wodę do picia doustnie.",
        "C. Należy podwoić dawkę dożylnej insuliny do 0.2 j./kg/h w celu jak najszybszego obniżenia poziomu glikemii poniżej 70 mg/dl.",
        "D. Należy podać dożylnie 1 mg glukagonu w szybkim bolusie i wstrzymać wszelką płynoterapię dożylną na okres 4 godzin.",
        "E. Należy natychmiast podać 100 ml 20% mannitolu w celu zapobieżenia hipoglikemicznemu uszkodzeniu kory mózgowej dziecka."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A. Zbyt gwałtowny spadek glikemii (>100 mg/dl/h) i osmolalności osocza oraz nadmierna podaż płynów w pierwszych godzinach.",
        "B. Wolne tempo nawadniania płynowego i podawanie roztworów glukozy przy glikemii spadającej poniżej 250 mg/dl we krwi.",
        "C. Utrzymywanie się stężenia sodu w surowicy krwi na stałym, stabilnym poziomie w trakcie prowadzonej płynoterapii.",
        "D. Podanie mannitolu w dawce 0.5 g/kg m.c. w pierwszej dobie hospitalizacji u dziecka z narastającym bólem głowy.",
        "E. Zastosowanie soli fizjologicznej 0.9% NaCl zamiast roztworu Ringera z mleczanami w pierwszych 2 godzinach leczenia."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A. 20% mannitol (0.5–1.0 g/kg m.c. w 20 min) lub 3% NaCl (2.5–5 ml/kg m.c. w 10–15 min) oraz redukcja płynów o połowę.",
        "B. Deksametazon dożylnie w dawce 8 mg w szybkim bolusie z natychmiastowym przyspieszeniem tempa wlewu hipotonicznych płynów.",
        "C. Furosemid dożylnie w dawce 40 mg w skojarzeniu z forsowną alkalizacją osocza za pomocą 8.4% wodorowęglanu sodu dożylnie.",
        "D. Pilne nakłucie lędźwiowe w celu odbarczenia płynu mózgowo-rdzeniowego i obniżenia podwyższonego ciśnienia w czaszce.",
        "E. Podanie dożylne 50 ml 40% glukozy w szybkim bolusie celem osmotycznego odwodnienia obrzękniętych komórek astrocytarnych."
      ]
    }
  ],
  121: [
    {
      qIdx: 4, // Q5
      newOpts: [
        "A. Lewotyroksyna (L-T4) doustnie w dawce 10–15 µg/kg m.c./dobę wdrożona jak najszybciej (najlepiej do 14. doby życia).",
        "B. Liotyronina (L-T3) dożylnie w dawce 50 µg/dobę w ciągłym wlewie pompy strzykawkowej przez pierwsze 3 miesiące życia dziecka.",
        "C. Jodek potasu w roztworze Lugola w dawce 5 kropli na dobę podawany z mlekiem matki w celu stymulacji syntezy tyreoglobuliny.",
        "D. Tyreoglobulina wołowa w tabletkach doustnych w dawce substytucyjnej wdrożona dopiero po ukończeniu 6. miesiąca życia dziecka.",
        "E. Tyreostatyk (tiamazol) w małej dawce dobowej w skojarzeniu z glikokortykosteroidami celem ochrony ośrodkowego układu nerwowego."
      ]
    }
  ],
  122: [
    {
      qIdx: 6, // Q7
      newOpts: [
        "A. Dokanałowe podawanie chemioterapii (metotreksat, cytarabina, steryd) profilaktycznie u wszystkich dzieci z ALL.",
        "B. Rutynowe napromienianie całego ośrodkowego układu nerwowego dawką 30 Gy u każdego dziecka w fazie indukcji remisji.",
        "C. Chemioterapia dokanałowa jest zarezerwowana wyłącznie dla dzieci z jawnym zajęciem OUN (blasty w badaniu cytologii PMR).",
        "D. Podawanie wysokich dawek deksametazonu doustnie przez 5 lat bez konieczności wykonywania nakłuć lędźwiowych u pacjenta.",
        "E. Wykonanie profilaktycznej kraniotomii odbarczającej z założeniem zewnętrznego drenażu komorowego w 1. dobie leczenia."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A. Masywna płynoterapia bez potasu, allopurynol/rasberyka za i unikanie przetoczeń KKCz przy Hb >7–8 g/dl (ryzyko hiperlepkości).",
        "B. Natychmiastowe przetoczenie 2 jednostek koncentratu krwinek czerwonych KKCz w celu podwyższenia stężenia hemoglobiny >12 g/dl.",
        "C. Podanie dożylne preparatów potasu w dawce 40 mmol/l płynu infuzyjnego w celu ochrony mięśnia sercowego przed arytmią.",
        "D. Wdrożenie forsownej diurezy furosemidem w wysokich dawkach ze znacznym ograniczeniem podaży płynów dożylnych do 500 ml/m2/d.",
        "E. Wykonanie natychmiastowej leukaferezy u każdego dziecka z liczbą leukocytów powyżej 20 000/µl niezależnie od objawów klinicznych."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A. Tylko składowe: 1, 2 oraz 4 (neutropenia, blasty, skaza).",
        "B. Tylko składowe: 1, 3 oraz 4 (niedokrwistość, węzły, blasty).",
        "C. Tylko składowe: 2, 3 oraz 5 (bóle kostne, gorączka, wątroba).",
        "D. Tylko składowe: 1, 2, 4 oraz 5 (z pominięciem hepatomegalii).",
        "E. Wszystkie wymienione cechy kliniczne (1, 2, 3, 4, 5)."
      ]
    }
  ],
  123: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A. Uniesiona plamica (palpable purpura) bez trombocytopenii, ból i zapalenie stawów, ból brzucha oraz zajęcie nerek.",
        "B. Wybroczyny skórne z ciężką małopłytkowością <20 000/µl, hepatosplenomegalia oraz wysoka gorączka o torze hektycznym.",
        "C. Rumień wędrujący z zapaleniem jednego dużego stawu oraz blokiem przedsionkowo-komorowym I stopnia w zapisie EKG.",
        "D. Pęcherzowe oddzielanie się naskórka z owrzodzeniem błon śluzowych jamy ustnej i spojówek po podaniu sulfonamidów.",
        "E. Drobnoplamista osutka płonicza z trójkątem Fiłatowa, malinowym językiem i łuszczeniem naskórka na opuszkach palców."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A. Ma charakter przemijający, nie prowadzi do destrukcji stawów i najczęściej dotyczy stawów skokowych i kolanowych.",
        "B. Prowadzi do szybkiej nieodwracalnej destrukcji chrząstki stawowej, tworzenia nadżerek kostnych i zesztywnienia stawu.",
        "C. Zajmuje wyłącznie drobne stawy międzypaliczkowe rąk i stóp symetrycznie, z obecnością porannej sztywności >1 godziny.",
        "D. Wymaga natychmiastowej artrotomii odbarczającej i przepłukania jamy stawowej roztworem antybiotyku na bloku operacyjnym.",
        "E. Zawsze przechodzi w przewlekłą postać toczniową z obecnością autoprzeciwciał przeciwko natywnemu DNA w wysokim mianie."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Badanie ogólne moczu i pomiar ciśnienia tętniczego co 1-2 tyg. przez 2 miesiące, a potem co miesiąc przez pół roku oraz zwolnienie z WF.",
        "Trwałe bezterminowe zwolnienie ze wszystkich szczepień ochronnych w kalendarzu szczepień z powodu zaburzeń autoimmunologicznych.",
        "Złożenie wniosku do zespołu ds. orzekania o stopniu niepełnosprawności ze względu na trwały uszczerbek na zdrowiu u dziecka.",
        "Zakaz powrotu do szkoły przez okres minimum 12 miesięcy ze względu na wysokie ryzyko transmisji zakażenia na innych uczniów.",
        "Zgłoszenie przypadku do Sanepidu jako choroby zakaźnej podlegającej obowiązkowej hospitalizacji na oddziale zakaźnym."
      ]
    }
  ],
  124: [
    {
      qIdx: 1, // Q2
      newOpts: [
        "Bezwzględnie przeciwwskazane z powodu ryzyka śmiertelnego wklinowania migdałków móżdżku do otworu wielkiego.",
        "Wskazane natychmiast w trybie pilnym w celu dekompresji narastającego podwyższonego ciśnienia śródczaszkowego.",
        "Dozwolone wyłącznie po uprzednim podaniu dożylnym 500 ml 5% glukozy w celu wyrównania osmolalności płynu mózgowego.",
        "Wskazane u każdego dziecka z podejrzeniem guza pod warunkiem całkowitej nieobecności gorączki i cech stanu zapalnego.",
        "Procedura obojętna rokowniczo, którą należy rutynowo wykonać przed zleceniem tomografii komputerowej głowy z kontrastem."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Zabieg ratujący życie bez zgody rodzica, zasięgając w miarę możliwości opinii drugiego lekarza i zawiadamiając sąd opiekuńczy.",
        "Wstrzymanie zabiegu do czasu uzyskania pisemnej zgody sądu opiekuńczego i ograniczenie się do leczenia zachowawczego na OIT.",
        "Wystarcza zgoda pełnoletniego sąsiada lub dalszego krewnego, który przyprowadził dziecko na szpitalny oddział ratunkowy.",
        "W przypadku braku kontaktu z rodzicami zgodę może wydać telefonicznie dyżurny pracownik socjalny miejskiego ośrodka pomocy.",
        "Lekarz operujący dziecko w stanie zagrożenia życia bez uprzedniej zgody sądu popełnia przestępstwo ścigane z urzędu."
      ]
    }
  ],
  125: [
    {
      qIdx: 2, // Q3
      newOpts: [
        "Immunoglobuliny dożylne (IVIG 2 g/kg) w pojedynczym wlewie w skojarzeniu z kwasem acetylosalicylowym (ASA).",
        "Glikokortykosteroidy w monoterapii doustnej w dawce 2 mg/kg/d podawane przez 30 dni w schemacie malejących dawek dobowych.",
        "Cefalosporyny III generacji dożylnie w dawce terapeutycznej przez 14 dni w skojarzeniu z wankomycyną we wlewie ciągłym.",
        "Metotreksat w dawce immunosupresyjnej podawany podskórnie raz w tygodniu z kwasem foliowym w celu prewencji tętniaków.",
        "Plazmafereza lecznicza z wymianą osocza jako procedura pierwszego rzutu u każdego gorączkującego niemowlęcia na oddziale."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "Tylko kryteria: 1, 2 oraz 4 (spojówki, usta, osutka).",
        "Tylko kryteria: 2, 3 oraz 5 (usta, dłonie, węzły chłonne).",
        "Tylko kryteria: 1, 3 oraz 4 (spojówki, dłonie, osutka).",
        "Tylko kryteria: 1, 2, 3 oraz 5 (bez obecności osutki).",
        "Wszystkie wymienione cechy kliniczne (1, 2, 3, 4, 5)."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Szczepienia żywe (MMR, ospa) należy odroczyć o 11 miesięcy od wlewu IVIG z powodu obecności przeciwciał neutralizujących.",
        "Wszystkie szczepienia ochronne (żywe i inaktywowane) muszą zostać trwale wstrzymane do momentu osiągnięcia pełnoletności.",
        "Dziecko powinno otrzymać szczepionkę MMR niezwłocznie w 7. dobie po podaniu IVIG w celu stymulacji odporności przeciwwirusowej.",
        "Szczepienie przeciwko grypie sezonowej szczepionką inaktywowaną jest bezwzględnie zakazane u dzieci przyjmujących kwas ASA.",
        "Zastosowanie IVIG zwalnia lekarza POZ z obowiązku prowadzenia karty uodpornienia i wykonywania dalszych szczepień ochronnych."
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

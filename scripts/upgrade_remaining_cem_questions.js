const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const UPGRADES = {
  107: {
    q11: {
      question: "U 6-letniego dziecka z rozpoznanym odpływem pęcherzowo-moczowodowym IV stopnia i pęcherzem nadreaktywnym, zgodnie z zasadami orzecznictwa lekarskiego i prawa oświatowego, lekarz urolog dziecięcy przygotowujący zalecenia dla szkoły:",
      options: [
        "Wystawia zaświadczenie lekarskie zobowiązujące nauczycieli do umożliwienia dziecku korzystania z toalety w dowolnym momencie lekcji na żądanie (mikcje w schemacie timed voiding co 2-3 godziny, podwójna mikcja double voiding) w celu unikania powstrzymywania moczu i zapobiegania nawrotom gorączkowych ZUM.",
        "Wystawia zakaz opuszczania sali lekcyjnej przez dziecko przez pełne 8 godzin zajęć.",
        "Kieruje dziecko do szkoły specjalnej ze względu na rozpoznanie VUR.",
        "Zaleca nauczycielom całkowity zakaz pojenia dziecka w szkole.",
        "Wymaga każdorazowej zgody kuratorium oświaty na wyjście dziecka do toalety."
      ],
      correct: 0,
      explanation: "U dzieci z VUR i zaburzeniami mikcji kluczowym elementem terapii niefarmakologicznej jest tzw. uroterapia (regularne mikcje w schemacie czasowym co 2-3 godziny, unikanie przetrzymywania moczu, podwójne opróżnianie pęcherza). Lekarz ma obowiązek wydać zaświadczenie dla szkoły gwarantujące dziecku swobodny dostęp do toalety, co chroni nerki przed wstecznym nadciśnieniem moczowym i infekcjami."
    }
  },
  114: {
    q11: {
      question: "U 2-miesięcznego nieszczepionego niemowlęcia rozpoznano laboratoryjnie krztusiec. W gospodarstwie domowym przebywają: rodzice oraz 4-letni zaszczepiony brat. Zgodnie z ustawą o zapobieganiu oraz zwalczaniu zakażeń i chorób zakaźnych u ludzi oraz wytycznymi sanitarno-epidemiologicznymi Sanepidu:",
      options: [
        "Lekarz ma ustawowy obowiązek zgłosić przypadek do powiatowej stacji Sanepidu w ciągu 24 godzin na druku ZLK-1 oraz wdrożyć poekspozycyjną profilaktykę antybiotykową (makrolidem, np. azytromycyną) u WSZYSTKICH osób mających bliski kontakt domowy, bez względu na ich wiek i status wcześniejszych szczepień.",
        "Chemoprofilaktykę poekspozycyjną podaje się wyłącznie osobom, które prezentują już ciężkie objawy duszności.",
        "Krztusiec nie podlega obowiązkowemu zgłoszeniu epidemiologicznemu do organów Państwowej Inspekcji Sanitarnej.",
        "Szczepiony 4-letni brat nie może otrzymać makrolidu, gdyż antybiotyki są prawnie zakazane u dzieci zaszczepionych.",
        "Poekspozycyjne podanie makrolidów rodzinie wymaga każdorazowo pisemnej zgody prokuratora rejonowego."
      ],
      correct: 0,
      explanation: "Zgodnie z ustawą o chorobach zakaźnych, krztusiec podlega natychmiastowemu zgłoszeniu do Sanepidu (ZLK-1 w ciągu 24 h). Poekspozycyjna profilaktyka antybiotykowa (PEP makrolidem) jest zalecana dla WSZYSTKICH domowników, bez względu na wiek i przebyte szczepienia, ponieważ odporność poszczepienna wygasa, a bezobjawowi nosiciele mogą transmitować zakażenie na małe niemowlęta."
    }
  },
  118: {
    q11: {
      question: "U 18-miesięcznego dziecka po przebytym pierwszym w życiu napadzie prostych drgawek gorączkowych w przebiegu infekcji wirusowej, zgodnie z zasadami prawa medycznego i orzecznictwa lekarskiego lekarz wypisujący dziecko po obserwacji SOR:",
      options: [
        "Przekazuje rodzicom szczegółowy instruktaż pierwszej pomocy (ułożenie w pozycji bocznej bezpiecznej, ochrona głowy, zakaz wkładania czegokolwiek do ust, wezwanie ZRM przy napadzie >5 min), wystawia receptę na midazolam dopoliczkowy (Buccolam) do apteczki domowej oraz informuje, że przebyty napad nie stanowi przeciwwskazania do dalszych rutynowych szczepień ochronnych.",
        "Wystawia bezwzględne, dożywotnie przeciwwskazanie do jakichkolwiek szczepień ochronnych w PSO.",
        "Wdraża przewlekłą terapię karbamazepiną lub kwasem walproinowym na okres 3 lat.",
        "Kieruje dziecko w trybie natychmiastowym na zabieg neurochirurgicznej resekcji płata skroniowego mózgu.",
        "Nakazuje rodzicom rezygnację z pracy i nieopuszczanie łóżka dziecka przez najbliższe 5 lat."
      ],
      correct: 0,
      explanation: "Proste drgawki gorączkowe mają doskonałe rokowanie i nie prowadzą do uszkodzenia mózgu ani padaczki. Nie wymagają przewlekłego leczenia przeciwpadaczkowego ani odraczania szczepień. Lekarz powinien wyedukować rodziców w zakresie postępowania doraźnego oraz zabezpieczyć ich w doraźny lek przeciwdrgawkowy (midazolam dopoliczkowy Buccolam) do podania w razie napadu trwającego >5 minut."
    }
  },
  122: {
    q11: {
      question: "W przypadku podejrzenia choroby nowotworowej (np. ostrej białaczki) u 4-letniego dziecka, zgodnie z polskim prawem medycznym, ustawą o prawach pacjenta i przepisami o Karcie DiLO:",
      options: [
        "Lekarz POZ lub szpitalny ma obowiązek wystawić Kartę Diagnostyki i Leczenia Onkologicznego (Karta DiLO), która przyspiesza diagnostykę i leczenie w ośrodku onkohematologii dziecięcej, a na inwazyjne procedury diagnostyczne zgodę wyrażają przedstawiciele ustawowi (rodzice).",
        "Wykonanie biopsji szpiku i rozpoczęcie chemioterapii wymaga każdorazowo uzyskania uprzedniej zgody sądu opiekuńczego, niezależnie od stanowiska rodziców.",
        "Jeśli rodzice odmawiają ratującej życie chemioterapii z powodów światopoglądowych, lekarz nie może podjąć interwencji prawnej i musi wypisać dziecko.",
        "Karta DiLO może być wystawiona u dzieci wyłącznie po uzyskaniu ostatecznego wyniku badania histopatologicznego szpiku.",
        "Zgoda rodziców na procedury diagnostyczne i terapeutyczne u małoletniego do 16. roku życia może być wyrażona wyłącznie w formie aktu notarialnego."
      ],
      correct: 0,
      explanation: "Lekarz POZ lub specjalista przy podejrzeniu nowotworu złośliwego ma prawo i obowiązek wystawić Kartę DiLO, która zapewnia szybką ścieżkę onkologiczną. U dziecka poniżej 16. r.ż. zgodę na zabiegi diagnostyczne i lecznicze wyrażają przedstawiciele ustawowi (rodzice). W sytuacji, gdy rodzice odmawiają zgody na leczenie ratujące życie, lekarz ma obowiązek niezwłocznie wystąpić do właściwego sądu opiekuńczego o wydanie zgody zastępczej."
    }
  },
  134: {
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące ostrego zapalenia uchyłków okrężnicy (Diverticulitis):",
      options: [
        "Złotym standardem diagnostyki obrazowej w ostrym zapaleniu uchyłków jest tomografia komputerowa (TK) jamy brzusznej i miednicy z kontrastem dożylnym.",
        "Kolonoskopia w pełnym przygotowaniu jest badaniem bezwzględnie wskazanym w pierwszej dobie ostrego zapalenia uchyłków w celu uwidocznienia szyjki uchyłku.",
        "W skali Hincheya stopień I oznacza ropień okołookrężniczy, stopień II - ropień odległy (miedniczny/zaotrzewnowy), stopień III - ropne zapalenie otrzewnej, a stopień IV - kałowe zapalenie otrzewnej.",
        "Ropnie o średnicy >4-5 cm (Hinchey Ib/II) w pierwszej kolejności kwalifikują się do przezskórnego drenażu pod kontrolą TK lub USG.",
        "U pacjentów z niepowikłanym zapaleniem uchyłków (Hinchey Ia) w dobrym stanie ogólnym bez chorób współistniejących dopuszcza się leczenie zachowawcze bez antybiotyków."
      ],
      correct: 1,
      explanation: "Zdanie B jest FAŁSZYWE. W ostrej fazie zapalenia uchyłków wykonywanie kolonoskopii jest bezwzględnie przeciwwskazane ze względu na wysokie ryzyko jatrogennej perforacji zapalnie zmienionej, kruchej ściany jelita. Pełną kolonoskopię wykonuje się planowo po 6-8 tygodniach od ustąpienia objawów ostrych w celu wykluczenia raka jelita grubego."
    },
    q10: {
      question: "Do wskazań do pilnego leczenia operacyjnego w ostrym zapaleniu uchyłków okrężnicy należą:\n1. Rozlane ropne lub kałowe zapalenie otrzewnej (Hinchey III i IV)\n2. Wolna perforacja przewodu pokarmowego z pneumoperitoneum i sepsą\n3. Ropień śródbrzuszny niespełniający kryteriów lub niedostępny do bezpiecznego drenażu przezskórnego\n4. Brak poprawy klinicznej lub progresja objawów otrzewnowych w trakcie leczenia zachowawczego\n5. Wyłącznie obecność bezobjawowych uchyłków w badaniu przesiewowym u 60-latka\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 2, 5",
        "2, 3, 5",
        "1, 3, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Pilna operacja jest wskazana przy rozlanym zapaleniu otrzewnej, perforacji, niepowodzeniu drenażu ropnia lub braku poprawy. Bezobjawowa uchyłkowatość (cecha 5) nie wymaga leczenia operacyjnego."
    },
    q11: {
      question: "U 62-letniego pacjenta po udanym leczeniu zapalenia uchyłków, w kontrolnej kolonoskopii po 8 tygodniach potwierdzono histopatologicznie raka esicy (adenocarcinoma G2). W świetle polskiego prawa medycznego, procedur orzecznictwa i przepisów o Karcie DiLO:",
      options: [
        "Lekarz POZ lub gastrolog ma obowiązek natychmiast wystawić pacjentowi Kartę Diagnostyki i Leczenia Onkologicznego (Kartę DiLO) uprawniającą do szybkiej ścieżki onkologicznej, diagnostyki stopnia zaawansowania (staging TK) oraz zwołania wielodyscyplinarnego konsylium onkologicznego (KDO).",
        "Karta DiLO może być wystawiona wyłącznie po zakończeniu leczenia chirurgicznego w oddziale hospicyjnym.",
        "Pacjent z rakiem jelita grubego traci prawo do refundowanego leczenia operacyjnego, jeśli nie zgłosił uchyłkowatości przed 50. rokiem życia.",
        "Lekarz ma bezwzględny zakaz informowania pacjenta o rozpoznaniu raka złośliwego.",
        "Zgoda na badanie kolonoskopowe stanowi automatyczną zgodę na wycięcie połowy okrężnicy bez odrębnego formularza."
      ],
      correct: 0,
      explanation: "Potwierdzenie histopatologiczne raka jelita grubego nakłada na lekarza obowiązek niezwłocznego wystawienia Karty DiLO (zielona karta), która uruchamia szybką diagnostykę i kieruje pacjenta na wielodyscyplinarne konsylium onkologiczne w celu ustalenia planu leczenia operacyjnego i adiuwantowego."
    }
  },
  135: {
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące ostrego krwawienia z dolnego odcinka przewodu pokarmowego (LGIB):",
      options: [
        "Najczęstszą przyczyną masywnego krwawienia z dolnego odcinka przewodu pokarmowego u osób starszych jest krwawienie z uchyłków jelita grubego.",
        "Obecność krwi w stolcu (hematochezia) u pacjenta we wstrząsie hipowolemicznym w 100% wyklucza krwawienie z górnego odcinka przewodu pokarmowego i zwalnia z wykonywania gastroskopii.",
        "Badaniem diagnostyczno-terapeutycznym pierwszego wyboru u stabilnego chorego po przygotowaniu jelita jest pilna kolonoskopia.",
        "W przypadku krwawienia masywnego u niestabilnego pacjenta badaniem obrazowym z wyboru jest angio-TK jamy brzusznej i miednicy w fazie tętniczej i żylnej.",
        "Embolizacja przezcewnikowa (TAE) podczas arteriografii krezkowej pozwala na małoinwazyjne zatrzymanie krwotoku przy zlokalizowanym wynaczynieniu kontrastu."
      ],
      correct: 1,
      explanation: "Zdanie B jest FAŁSZYWE. U ok. 10-15% chorych manifestujących się masywną hematochezją i niestabilnością hemodynamiczną źródło krwawienia znajduje się w górnym odcinku przewodu pokarmowego (np. masywny krwotok z wrzodu dwunastnicy z przyspieszonym pasażem). W przypadku niestabilności gastroskopia jest bezwzględnie wskazana w celu wykluczenia źródła w UGIB."
    },
    q10: {
      question: "Do czynników wysokiego ryzyka zgonu i niekorzystnego przebiegu w ostrym krwawieniu z dolnego odcinka przewodu pokarmowego (skala Oakland) należą:\n1. Wiek powyżej 65-70 lat oraz liczne obciążenia sercowo-naczyniowe (ASA ≥3)\n2. Niestabilność hemodynamiczna: tachykardia (HR >100/min) i skurczowe ciśnienie krwi <100 mmHg\n3. Stężenie hemoglobiny wyjściowe poniżej 8-9 g/dl\n4. Utrzymujące się świeże krwawienie z odbytu podczas badania per rectum\n5. Całkowity brak jakichkolwiek chorób współistniejących u 20-letniego sportowca\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 2, 5",
        "2, 3, 5",
        "1, 3, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Zaawansowany wiek, hipotensja, tachykardia, niska hemoglobina i aktywne krwawienie per rectum to składowe skali Oakland kwalifikujące pacjenta do grupy wysokiego ryzyka wymagającej pilnej hospitalizacji i interwencji."
    },
    q11: {
      question: "U 78-letniego przytomnego pacjenta z masywnym krwotokiem z uchyłków esicy (Hb 5,8 g/dl, wstrząs krwotoczny) lekarz podejmuje decyzję o pilnej transfuzji koncentratu krwinek czerwonych (KKCz). Zgodnie z ustawą o publicznej służbie krwi oraz przepisami prawa medycznego:",
      options: [
        "Przetoczenie krwi lub jej składników wymaga uzyskania pisemnej zgody pacjenta (lub jego przedstawiciela ustawowego) po uprzednim poinformowaniu o celu, korzyściach i możliwych powikłaniach przetoczenia, a każda jednostka krwi musi być zweryfikowana podwójną próbą zgodności i próbą biologiczną.",
        "Na przetoczenie krwi u dorosłego i przytomnego pacjenta nie jest wymagana żadna zgoda, gdyż krew jest traktowana jak zwykły płyn infuzyjny.",
        "Jeśli przytomny pacjent jest Świadkiem Jehowy i świadomie odmawia transfuzji na piśmie, lekarz ma prawny obowiązek przetoczyć krew siłą przy udziale policji.",
        "Zgodę na przetoczenie krwi może wydać wyłącznie dyrektor regionalnego centrum krwiodawstwa.",
        "Podanie KKCz w szpitalu zwalnia lekarza z obowiązku odnotowania numeru donacji w dokumentacji medycznej."
      ],
      correct: 0,
      explanation: "Zgodnie z ustawą o publicznej służbie krwi i ustawą o zawodach lekarza, transfuzja krwi wymaga pisemnej, uświadomionej zgody pacjenta, a w dokumentacji medycznej należy bezwzględnie odnotować numery donacji, wynik próby zgodności i przebieg próby biologicznej."
    }
  },
  136: {
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące ropni i przetok okołoodbytniczych:",
      options: [
        "Zgodnie z teorią kryptoglandularną Parksa ropień okołoodbytniczy rozpoczyna się od zakażenia gruczołów odbytowych uchodzących do krypt na linii grzebieniastej (zębatej).",
        "Ropień okołoodbytniczy należy początkowo leczyć wyłącznie antybiotykoterapią doustną przez 14 dni, odraczając nacięcie chirurgiczne do czasu samoistnego pęknięcia.",
        "Najczęstszą postacią anatomiczną ropnia jest ropień okołoodbytowy podskórny (perianal abscess).",
        "Zgodnie z regułą Goodsalla przetoki z ujściem zewnętrznym w przedniej połowie krocza biegną prostoliniowo promieniście do kanału odbytu.",
        "U pacjentów z nawracającymi, mnogimi lub złożonymi przetokami odbytu należy bezwzględnie wdrożyć diagnostykę w kierunku choroby Leśniowskiego-Crohna."
      ],
      correct: 1,
      explanation: "Zdanie B jest FAŁSZYWE. Ropień okołoodbytniczy jest stanem nagłym w chirurgii i bezwzględnym wskazaniem do PILNEGO nacięcia i drenażu chirurgicznego! Stosowanie samej antybiotykoterapii jest błędem w sztuce – nie zapobiega szerzeniu się infekcji, a odroczenie drenażu grozi martwiczym zapaleniem powięzi krocza (zgorzelą Fourniera) i wstrząsem septycznym."
    },
    q10: {
      question: "Do zagrażających życiu powikłań nieleczonego ropnia okołoodbytniczego należą:\n1. Zgorzel Fourniera (martwicze zapalenie powięzi krocza i narządów płciowych)\n2. Wstrząs septyczny z niewydolnością wielonarządową (MODS)\n3. Przejście ropnia w postać podkowiastą (ropień kulszowo-odbytniczy obustronny z przetoką złożoną)\n4. Nieodwracalne uszkodzenie aparatu zwieraczy odbytu z trwałym nietrzymaniem stolca\n5. Wyłącznie bezbolesne, całkowite samoistne wygojenie bez pozostawienia przetoki w 100% przypadków\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 3, 5",
        "2, 3, 5",
        "1, 2, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Nieleczony ropień okołoodbytniczy może doprowadzić do sepsy, zgorzeli Fourniera, destrukcji zwieraczy i rozległych przetok podkowiastych. Samoistne bezbliznowe wyleczenie (cecha 5) w ropniu nie występuje."
    },
    q11: {
      question: "38-letni pracownik fizyczny po pilnym nacięciu i zdrenowaniu ropnia kulszowo-odbytniczego jest wypisywany do domu z zaleceniem codziennych płukań i zmiany setonów. Zgodnie z zasadami prawa medycznego i orzecznictwa lekarskiego ZUS:",
      options: [
        "Lekarz wystawia zaświadczenie o czasowej niezdolności do pracy ZUS ZLA na okres gojenia rany (zwykle 2-4 tygodnie w zależności od charakteru pracy fizycznej) oraz informuje pacjenta o konieczności planowej kontroli proktologicznej po wygojeniu pod kątem uformowania się przetoki odbytu.",
        "Nacięcie ropnia w trybie ambulatoryjnym wyklucza możliwość wystawienia zwolnienia ZUS ZLA na okres dłuższy niż 24 godziny.",
        "Lekarz ma prawny obowiązek zakwalifikować ropień okołoodbytniczy jako chorobę zawodową.",
        "Pacjent po operacji proktologicznej traci bezterminowo prawo do wykonywania zawodu kierowcy.",
        "Zgoda pacjenta na nacięcie ropnia unieważnia obowiązek prowadzenia dokumentacji pielęgniarskiej zmian opatrunków."
      ],
      correct: 0,
      explanation: "Lekarz wystawia zaświadczenie ZUS ZLA na czas niezbędny do ziarninowania rany po nacięciu ropnia. Ponieważ u ok. 30-50% pacjentów po zdrenowaniu ropnia formuje się przetoka odbytu, konieczna jest kontrola proktologiczna i pouczenie pacjenta."
    }
  },
  137: {
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące urazów i pęknięcia śledziony w następstwie tępego urazu jamy brzusznej:",
      options: [
        "Śledziona jest najczęściej uszkadzanym narządem miąższowym w tępych urazach jamy brzusznej.",
        "Dodatni objaw Kehra polega na występowaniu ostrego bólu lewego barku wywołanego podrażnieniem lewej kopuły przepony przez krew wynaczynioną do jamy otrzewnej.",
        "Każdy pacjent z pęknięciem śledziony w stopniu III lub IV wg AAST, niezależnie od stabilności hemodynamicznej, musi być natychmiast poddany całkowitej splenektomii laparotomijnej.",
        "Złotym standardem diagnostyki obrazowej u stabilnego pacjenta po urazie brzucha jest tomografia komputerowa (TK) jamy brzusznej z kontrastem dożylnym.",
        "Ujemny wynik badania ultrasonograficznego FAST na SOR nie wyklucza całkowicie podtorebkowego krwiaka ani późnego pęknięcia śledziony."
      ],
      correct: 2,
      explanation: "Zdanie C jest FAŁSZYWE. U pacjentów stabilnych hemodynamicznie (nawet przy stopniu III i IV wg AAST) standardem postępowania z wyboru jest leczenie zachowawcze (NOM – Non-Operative Management), w razie potrzeby uzupełnione o endowaskularną embolizację tętnicy śledzionowej. Splenektomię rezerwuje się dla chorych niestabilnych z krwotokiem nieodpowiadającym na resuscytację."
    },
    q10: {
      question: "Do kryteriów kwalifikacji pacjenta po tępym urazie śledziony do nieoperacyjnego leczenia zachowawczego (NOM) należą:\n1. Pełna stabilność hemodynamiczna pacjenta (lub stabilizacja po podaniu <1000 ml krystaloidów)\n2. Brak objawów rozlanego zapalenia otrzewnej (brak 'brzucha deskowatego')\n3. Brak cech uszkodzenia innych narządów wewnętrznych wymagających pilnej laparotomii\n4. Dostępność stałego monitorowania na OIT/sali wzmożonego nadzoru z możliwością natychmiastowej operacji w razie załamania stanu\n5. Wstrząs krwotoczny z ciśnieniem skurczowym <60 mmHg niereagujący na resuscytację krwią\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 2, 5",
        "2, 3, 5",
        "1, 3, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Stabilność hemodynamiczna, brak zapalenia otrzewnej, brak uszkodzenia narządów drążonych i zaplecze do natychmiastowej operacji to warunki konieczne protokołu NOM. Wstrząs oporny na przetoczenia (cecha 5) to bezwzględne wskazanie do natychmiastowej laparotomii ratunkowej."
    },
    q11: {
      question: "32-letni pacjent po urazowej ratunkowej splenektomii jest przygotowywany do wypisu ze szpitala. Zgodnie z polskim prawem medycznym, Programem Szczepień Ochronnych (PSO) oraz profilaktyką piorunującej sepsy posesplenektomijnej (OPSI):",
      options: [
        "Lekarz ma bezwzględny obowiązek poinformować pacjenta o utracie odporności przeciwbakteryjnej, wydać zalecenie obowiązkowych i zalecanych szczepień przeciwko bakteriom otoczkowym (Streptococcus pneumoniae – schemat skoniugowany PCV20 lub PCV15+PPSV23, Neisseria meningitidis grupy ACWY i B oraz Haemophilus influenzae typu b) podawanych optymalnie ok. 14 dni po zabiegu, oraz wydać 'Kartę osoby z brakiem śledziony' i receptę na antybiotyk ratunkowy (np. amoksycylinę z kwasem klawulanowym) do przyjęcia w razie nagłej gorączki.",
        "Po usunięciu śledziony wszelkie szczepienia ochronne są prawnie zabronione ze względu na ryzyko odrzucenia szpiku.",
        "Pacjent bez śledziony nie wymaga żadnych zaleceń profilaktycznych, gdyż wątroba w 100% przejmuje funkcje immunologiczne śledziony w ciągu 48 godzin.",
        "Lekarz ma prawny obowiązek skierować pacjenta po splenektomii na rentę z całkowitą niezdolnością do samodzielnej egzystencji.",
        "Profilaktyka OPSI jest wymagana wyłącznie u dzieci poniżej 2. roku życia."
      ],
      correct: 0,
      explanation: "Po splenektomii ryzyko śmiertelnej sepsy OPSI (najczęściej pneumokokowej) jest wielokrotnie wyższe przez całe życie. Obowiązkiem lekarza jest zaszczepienie przeciw bakteriom otoczkowym (Pneumokoki, Meningokoki, HiB) po ok. 14 dniach od operacji, wydanie Karty Asplenii oraz zaopatrzenie chorego w receptę na antybiotyk pierwszego rzutu do natychmiastowego zażycia przy gorączce z dreszczami."
    }
  },
  138: {
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące ostrej mechanicznej niedrożności w przebiegu raka jelita grubego (CRC):",
      options: [
        "Około 15-20% nowotworów jelita grubego manifestuje się klinicznie po raz pierwszy jako ostra lub podostra niedrożność mechaniczna.",
        "Niedrożność dotyczy znacznie częściej raka lewej połowy okrężnicy (zstępnica, esica) niż prawej połowy ze względu na węższe światło jelita i gęstszą treść kałową.",
        "Przy sprawnie działającej zastawce krętniczo-kątniczej Bauhina dochodzi do powstania niedrożności pętli zamkniętej, w której narastające ciśnienie stwarza najwyższe ryzyko pęknięcia kątnicy (zgodnie z prawem Laplace'a).",
        "Założenie samorozprężalnego stentu metalowego (SEMS) jako 'pomostu do operacji planowej' (bridge to surgery) jest zabiegiem bezwzględnie zakazanym we wszystkich wytycznych onkologicznych z powodu natychmiastowego rozsiewu komórek nowotworowych.",
        "Klasyczną operacją ratunkową u pacjenta niestabilnego z przedziurawieniem guza esicy i zapaleniem otrzewnej jest zabieg sposobem Hartmanna."
      ],
      correct: 3,
      explanation: "Zdanie D jest FAŁSZYWE. Endoskopowe założenie stentu samorozprężalnego (SEMS) jako 'bridge to surgery' jest metodą zaakceptowaną przez Europejskie Towarzystwo Endoskopii Przewodu Pokarmowego (ESGE) w lewostronnej niedrożności nowotworowej. Umożliwia dekompresję jelita, uniknięcie doraźnej stomii i bezpieczne przygotowanie pacjenta do planowej, radykalnej onkologicznie resekcji z zespoleniem pierwotnym."
    },
    q10: {
      question: "Do objawów zagrażającej lub dokonanej perforacji kątnicy w przebiegu mechanicznej niedrożności jelita grubego z zamkniętą pętlą należą:\n1. Poszerzenie średnicy kątnicy w tomografii komputerowej przekraczające krytyczną wartość 9-12 cm\n2. Obecność gazu w ścianie jelita (odma pęcherzykowa ściany – pneumatosis intestinalis) w badaniu TK\n3. Wolny gaz pod kopułami przepony (pneumoperitoneum) na przeglądowym RTG lub w TK\n4. Narastający stały ból w prawym dole biodrowym z objawami miejscowego podrażnienia otrzewnej\n5. Wyłącznie obecność prawidłowej, cichej perystaltyki z oddawaniem gazów i płynnego stolca\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 2, 5",
        "2, 3, 5",
        "1, 3, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Średnica kątnicy >9-12 cm, odma ściany jelita, pneumoperitoneum i objawy otrzewnowe to krytyczne cechy zagrażającej lub dokonanej perforacji diastatycznej kątnicy, stanowiące bezwzględne wskazanie do natychmiastowej laparotomii."
    },
    q11: {
      question: "70-letni pacjent operowany doraźnie z powodu niedrożności w przebiegu raka esicy (wykonano procedurę Hartmanna z wyłonieniem kolostomii). Wynik histopatologiczny: adenocarcinoma G2, pT3N1M0. Zgodnie z polskimi przepisami prawa medycznego, procedurami NFZ i Kartą DiLO:",
      options: [
        "Szpital ma obowiązek wystawić pacjentowi Kartę Diagnostyki i Leczenia Onkologicznego (Karta DiLO) najpóźniej w momencie wypisu, zwołać wielodyscyplinarne konsylium onkologiczne (KDO) w celu zaplanowania leczenia adiuwantowego (uzupełniająca chemioterapia) oraz wyznaczyć koordynatora opieki onkologicznej.",
        "Karta DiLO może być wystawiona wyłącznie w przychodni POZ przed wykonaniem pierwszej operacji.",
        "Pacjent ze stomią traci prawo do konsylium onkologicznego i może być leczony wyłącznie objawowo.",
        "Informacja o stopniu zaawansowania pT3N1 podlega utajnieniu przed pacjentem na mocy tajemnicy lekarskiej.",
        "Zgoda na operację w stanie nagłym zwalnia konsylium z obowiązku uzyskania odrębnej zgody pacjenta na chemioterapię."
      ],
      correct: 0,
      explanation: "W przypadku potwierdzenia histopatologicznego nowotworu złośliwego po zabiegu w trybie nagłym, szpital wystawia Kartę DiLO i organizuje konsylium onkologiczne (KDO) w celu wdrożenia skojarzonego leczenia uzupełniającego (chemioterapii adiuwantowej)."
    }
  },
  139: {
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące niedokrwiennego zapalenia jelita grubego (Ischemic Colitis):",
      options: [
        "Jest to najczęstsza postać niedokrwienia przewodu pokarmowego, występująca typowo u pacjentów w podeszłym wieku ze współistniejącymi chorobami układu krążenia.",
        "Niedokrwienie dotyczy najczęściej tzw. 'punktów krytycznych' krezki o najsłabszym krążeniu obocznym: zagięcia śledzionowego (punkt Griffithsa) oraz połączenia esiczo-odbytniczego (punkt Sudecka).",
        "W przeciwieństwie do ostrego niedokrwienia jelita cienkiego (zator SMA), większość przypadków niedokrwiennego zapalenia jelita grubego (ok. 80-85%) ma przebieg przemijający i nie wymaga pilnej resekcji jelita.",
        "Wlew doodbytniczy z zawiesiny barytowej w pełnym napełnieniu pod wysokim ciśnieniem jest podstawowym i najbezpieczniejszym badaniem pierwszego rzutu w ostrej fazie choroby.",
        "Objaw 'odcisku kciuka' (thumbprinting) w tomografii komputerowej odpowiada ogniskowemu obrzękowi śluzówki i podśluzówkowym wylewom krwawym."
      ],
      correct: 3,
      explanation: "Zdanie D jest FAŁSZYWE. Podanie wlewu barytowego pod ciśnieniem w ostrej fazie ischemic colitis stwarza olbrzymie ryzyko perforacji niedokrwionej ściany jelita i śmiertelnego chemicznego zapalenia otrzewnej. Badaniami z wyboru są angio-TK jamy brzusznej oraz ostrożna sigmoidoskopia z minimalną insuflacją powietrza."
    },
    q10: {
      question: "Do wskazań do pilnego leczenia operacyjnego (laparotomii z resekcją niedokrwionego odcinka okrężnicy) w przebiegu ischemic colitis należą:\n1. Rozwój objawów rozlanego zapalenia otrzewnej ('brzuch deskowaty', objaw Blumberga)\n2. Wolne pneumoperitoneum lub obecność gazu w żyle wrotnej (pneumoportogram) w badaniu TK\n3. Martwica zgorzelinowa jelita uwidoczniona w ostrożnej sigmoidoskopii (zielonoczarne zabarwienie śluzówki)\n4. Wstrząs septyczny z kwasicą mleczanową i koniecznością stosowania wysokich dawek amin presyjnych\n5. Wyłącznie obecność pojedynczego pasma krwi na stolcu bez bólu brzucha u stabilnego 65-latka\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 2, 5",
        "2, 3, 5",
        "1, 3, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Martwica zgorzelinowa, perforacja, zapalenie otrzewnej i wstrząs septyczny z kwasicą mleczanową to bezwzględne wskazania do operacji ratunkowej (resekcji z wyłonieniem stomii). Łagodne krwawienie u stabilnego pacjenta (cecha 5) leczy się zachowawczo."
    },
    q11: {
      question: "U 74-letniego pacjenta z niedokrwiennym zapaleniem jelita grubego w przebiegu ciężkiej hipotensji, lekarz podejmuje leczenie zachowawcze na sali wzmożonego nadzoru. Zgodnie z zasadami prawa medycznego, etyki lekarskiej (KEL) i standardami prowadzenia dokumentacji medycznej:",
      options: [
        "Lekarz ma obowiązek prowadzić szczegółowy, systematyczny zapis stanu klinicznego pacjenta (parametry życiowe, stan powłok brzusznych, stężenie mleczanów co 4-6 h), odnotować w historii choroby przesłanki decyzji o leczeniu zachowawczym vs operacyjnym oraz poinformować pacjenta i osobę upoważnioną o ryzyku konieczności pilnej operacji w razie wystąpienia martwicy ściany jelita.",
        "Zapisy w historii choroby mogą być sporządzone zbiorczo po miesiącu od zakończenia leczenia szpitalnego.",
        "Lekarz nie ma obowiązku monitorowania pacjenta, jeśli leczenie ma charakter zachowawczy.",
        "Wszelkie powikłania niedokrwienne w szpitalu stanowią z mocy prawa przestępstwo ścigane z urzędu.",
        "Zgoda pacjenta na leczenie kardiologiczne zwalnia personel z obowiązku dokumentowania powikłań brzusznych."
      ],
      correct: 0,
      explanation: "W stanach dynamicznych o wysokim ryzyku martwicy jelita prawo medyczne wymaga rzetelnego, bieżącego dokumentowania parametrów życiowych, stężenia mleczanów i badania palpacyjnego brzucha oraz wyczerpującego poinformowania pacjenta/rodziny o ryzyku konwersji do natychmiastowej operacji."
    }
  },
  140: {
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące pękniętego tętniaka aorty brzusznej (rAAA):",
      options: [
        "Klasyczna triada objawów rAAA obejmuje: silny ból brzucha lub okolicy lędźwiowo-krzyżowej, hipotensję / wstrząs oraz tętniący guz wyczuwalny w jamie brzusznej.",
        "U niestabilnego hemodynamicznie chorego z objawami wstrząsu krwotocznego i wywiadem tętniaka aorty badaniem obrazowym z wyboru jest natychmiastowy rezonans magnetyczny (MRI) z kontrastem trwający 60 minut.",
        "Strategia 'kontrolowanej hipotensji' (permissive hypotension z docelowym ciśnieniem skurczowym 80-90 mmHg) zmniejsza ryzyko zerwania skrzepu tamponującego krwotok zaotrzewnowy do momentu zaklemowania aorty.",
        "Małoinwazyjne zaopatrzenie wewnątrznaczyniowe (rEVAR) jest obecnie uznaną i preferowaną metodą leczenia rAAA w ośrodkach dysponujących odpowiednim zespołem i zapleczem sprzętowym.",
        "Śmiertelność całkowita w pękniętym tętniaku aorty brzusznej (uwzględniając zgony przedszpitalne) przekracza 80-85%."
      ],
      correct: 1,
      explanation: "Zdanie B jest FAŁSZYWE. Chory we wstrząsie krwotocznym nie może być transportowany do odległej pracowni MRI. Badaniem przyłóżkowym jest szybkie USG jamy brzusznej (FAST), a chory natychmiast trafia na blok operacyjny lub do pracowni naczyniowej na pilne angio-TK/operację."
    },
    q10: {
      question: "Do czynników zwiększających ryzyko pęknięcia tętniaka aorty brzusznej (AAA) należą:\n1. Średnica tętniaka przekraczająca 5,5 cm u mężczyzn lub 5,0 cm u kobiet\n2. Szybkie tempo poszerzania się tętniaka (>1,0 cm na rok lub >0,5 cm w ciągu 6 miesięcy)\n3. Kształt workowaty tętniaka (saccular aneurysm) w porównaniu z wrzecionowatym\n4. Płeć żeńska oraz niekontrolowane nadciśnienie tętnicze i aktywne palenie tytoniu\n5. Prawidłowa średnica aorty wynosząca 2,0 cm u 70-letniego mężczyzny\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 2, 5",
        "2, 3, 5",
        "1, 3, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Średnica >5,5 cm, szybki wzrost, kształt workowaty, płeć żeńska i palenie to główne czynniki pęknięcia AAA. Średnica 2,0 cm (cecha 5) to prawidłowa aorta."
    },
    q11: {
      question: "69-letni pacjent z pękniętym tętniakiem aorty brzusznej trafia na blok operacyjny we wstrząsie krwotocznym ze skrajną hipotensją (RR 60/30 mmHg) i utratą przytomności. Brak obecności rodziny. Zgodnie z art. 34 ust. 7 Ustawy o zawodach lekarza i lekarza dentysty oraz zasadami prawa medycznego:",
      options: [
        "Zespół chirurgów naczyniowych ma prawo i prawny obowiązek natychmiast podjąć ratującą życie operację (laparotomię z zaklemowaniem aorty lub rEVAR) bez zgody pacjenta, z odnotowaniem tego faktu w dokumentacji medycznej i w miarę możliwości zasięgnięciem opinii drugiego lekarza oraz powiadomieniem sądu opiekuńczego.",
        "Chirurdzy muszą wstrzymać się z cięciem skóry do momentu ustanowienia kuratora przez sąd opiekuńczy na posiedzeniu jawnym.",
        "Do wykonania operacji u nieprzytomnego konieczna jest pisemna zgoda dyspozytora medycznego pogotowia.",
        "Brak pisemnej zgody pacjenta nakazuje zaniechanie operacji i ograniczenie się do leczenia paliatywnego.",
        "Zgoda na operację ratującą życie u nieprzytomnego dorosłego może zostać wydana wyłącznie przez notariusza."
      ],
      correct: 0,
      explanation: "Zgodnie z art. 34 ust. 7 UoZL, w stanie bezpośredniego zagrożenia życia u pacjenta niezdolnego do wyrażenia zgody lekarz wykonuje operację natychmiast bez zgody pacjenta, z adnotacją w dokumentacji medycznej i zawiadomieniem sądu opiekuńczego."
    }
  },
  141: {
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące ostrego niedokrwienia kończyn dolnych (Acute Limb Ischemia – ALI):",
      options: [
        "Klasyczny obraz kliniczny ALI opisuje reguła '6P': Pain (ból), Pallor (bladość), Pulselessness (brak tętna), Paresthesia (parestezje), Paralysis (porażenie ruchowe) oraz Poikilothermia (oziębienie kończyny).",
        "W klasyfikacji Rutherforda stopień III (nieodwracalne niedokrwienie z utrwalonym stężeniem mięśni i brakiem sygnałów dopplerowskich) stanowi bezwzględne wskazanie do natychmiastowej embolektomii cewnikiem Fogarty'ego w celu przywrócenia ukrwienia stopy.",
        "Czas tolerancji całkowitego niedokrwienia ciepłego dla tkanek nerwowej i mięśniowej wynosi ok. 4-6 godzin.",
        "Natychmiast po wysunięciu podejrzenia ALI należy podać dożylny bolus niefrakcjonowanej heparyny (UFH 5000 j.m. lub 80 j.m./kg m.c.) w celu zahamowania propagacji zakrzepu.",
        "Najczęstszą przyczyną zatorowości tętnic obwodowych jest migotanie przedsionków (AF) bez odpowiedniej antykoagulacji."
      ],
      correct: 1,
      explanation: "Zdanie B jest FAŁSZYWE. Stopień III wg Rutherforda oznacza nieodwracalną martwicę tkanek. Próba rewaskularyzacji martwej kończyny (revascularization of dead limb) prowadzi do uwolnienia olbrzymiej ilości mioglobiny, potasu i toksyn do krążenia układowego, wywołując wstrząs poresuscytacyjny, ostrą niewydolność nerek, zatrzymanie krążenia i zgon pacjenta. Leczeniem z wyboru w stopniu III jest pierwotna amputacja!"
    },
    q10: {
      question: "Do wskazań do wykonania pilnej obustronnej czteroprzedziałowej fasciotomii podudzia u pacjenta po udanej rewaskularyzacji w ostrym niedokrwieniu kończyny dolnej należą:\n1. Przedłużający się czas niedokrwienia ciepłego przekraczający 4-6 godzin\n2. Napięcie powłok podudzia (tzw. 'drewniane podudzie') z silnym bólem nasilającym się przy biernym rozciąganiu palców\n3. Pomiar ciśnienia w przedziałach powięziowych podudzia (Whitesides) wykazujący ciśnienie wewnątrztkankowe >30 mmHg\n4. Zaburzenia czucia w przestrzeni międzypalcowej I stopy (unerwienie n. strzałkowego głębokiego)\n5. Prawidłowe, miękkie podudzie bez obrzęku i bez bólu przy rozciąganiu\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 2, 5",
        "2, 3, 5",
        "1, 3, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Czas niedokrwienia >4-6 h, twarde bolesne podudzie, ciśnienie >30 mmHg i deficyt czucia n. strzałkowego głębokiego to klasyczne wskazania do natychmiastowej fasciotomii podudzia w celu ochrony mięśni i nerwów przed martwicą uciskową."
    },
    q11: {
      question: "74-letni pacjent z ostrym niedokrwieniem kończyny dolnej (Rutherford IIb) w przebiegu zatoru tętnicy udowej kwalifikowany jest do pilnej embolektomii cewnikiem Fogarty'ego. Zgodnie z przepisami prawa medycznego, Ustawą o prawach pacjenta oraz art. 34 Ustawy o zawodach lekarza:",
      options: [
        "Lekarz ma obowiązek przystępnie poinformować pacjenta o istocie zabiegu embolektomii, ryzyku nawrotu zakrzepicy, zespole poreperfuzyjnym oraz o możliwości konieczności wykonania fasciotomii lub amputacji kończyny w przypadku braku powodzenia rewaskularyzacji, odbierając pisemną świadomą zgodę na zabieg.",
        "W chirurgii naczyniowej pisemna zgoda pacjenta jest zbędna ze względu na pilny charakter procedur naczyniowych.",
        "Lekarz nie może informować pacjenta o możliwości amputacji kończyny, gdyż stanowi to błąd jatrogenny.",
        "Pacjent po embolektomii traci prawo do wglądu we własną dokumentację medyczną.",
        "Zgodę na operację u przytomnego dorosłego pacjenta może podpisać ordynator oddziału zamiast chorego."
      ],
      correct: 0,
      explanation: "Zgodnie z art. 34 ust. 1 UoZL, wykonanie zabiegu operacyjnego stwarzającego podwyższone ryzyko wymaga pisemnej, uświadomionej zgody pacjenta po przedstawieniu celu zabiegu oraz przewidywanych powikłań (w tym możliwości niepowodzenia i konieczności fasciotomii lub amputacji)."
    }
  },
  143: {
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące zwężenia tętnicy szyjnej wewnętrznej (Stenosis arteriae carotis internae):",
      options: [
        "Zgodnie z wytycznymi ESVS objawowe zwężenie tętnicy szyjnej wewnętrznej w stopniu 70-99% kwalifikuje się do pilnej endarterektomii szyjnej (CEA) optymalnie w ciągu pierwszych 14 dni od wystąpienia TIA lub udaru niedokrwiennego.",
        "Każdy pacjent z bezobjawowym zwężeniem tętnicy szyjnej w stopniu 50-60% musi być natychmiast w trybie ostrym operowany metodą CEA, niezależnie od farmakoterapii i przewidywanej długości życia.",
        "Podstawowym nieinwazyjnym badaniem przesiewowym pierwszego rzutu jest ultrasonografia Dopplerowska tętnic szyjnych i kręgowych (pomiar prędkości skurczowej PSV i rozkurczowej EDV).",
        "Amaurosis fugax (przemijająca ślepota jednooczna) jest klasycznym objawem mikrozatorowości do tętnicy środkowej siatkówki po stronie zwężonej tętnicy szyjnej.",
        "Ryzyko okołooperacyjnego udaru mózgu lub zgonu w referencyjnym ośrodku wykonującym planowe CEA u chorych objawowych nie powinno przekraczać 6% (a u bezobjawowych 3%)."
      ],
      correct: 1,
      explanation: "Zdanie B jest FAŁSZYWE. W bezobjawowym zwężeniu tętnicy szyjnej <60-70% podstawą postępowania jest optymalna farmakoterapia BMT (statyna w wysokiej dawce, lek przeciwpłytkowy, kontrola ciśnienia i stylu życia). Interwencję zabiegową (CEA/CAS) rozważa się jedynie w bezobjawowych zwężeniach 70-99% z cechami wysokiego ryzyka w obrazowaniu u chorych z przewidywaną długością życia >5 lat."
    },
    q10: {
      question: "Do ultrasonograficznych i angiograficznych cech niestabilnej, bogatej w powikłania zatorowe blaszki miażdżycowej w tętnicy szyjnej należą:\n1. Obecność owrzodzenia powierzchni blaszki (ulcerated plaque)\n2. Hipoekhogeniczność blaszki w USG odpowiadająca bogatemu rdzeniowi lipidowo-martwiczemu lub wylewom domiąższowym\n3. Obecność ruchomej skrzepliny przyściennej na powierzchni blaszki\n4. Progresja stopnia zwężenia tętnicy o >20% w ciągu rocznej obserwacji ultrasonograficznej\n5. Gruba, jednorodna, gęsto uwapniona hiperechogenna blaszka miażdżycowa bez owrzodzeń\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 2, 5",
        "2, 3, 5",
        "1, 3, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Owrzodzenie, hipoechogeniczność (rdzeń lipidowy/wylew), skrzeplina i szybka progresja zwężenia to uznane cechy blaszki niestabilnej (high risk plaque) predysponujące do zatorowości mózgowej. Jednorodna zwapniała blaszka (cecha 5) jest blaszką stabilną o niskim ryzyku zatorowym."
    },
    q11: {
      question: "62-letni zawodowy kierowca (kategoria C+E) przebył przemijający atak niedokrwienny mózgu (TIA) z niedowładem połowiczym ustępującym po 40 minutach, u którego w USG Doppler stwierdzono zwężenie lewej tętnicy szyjnej 75%. Zgodnie z polskim prawem o ruchu drogowym, orzecznictwem lekarskim i Rozporządzeniem Ministra Zdrowia w sprawie badań kierowców:",
      options: [
        "Po przebytym epizodzie TIA lub udarze mózgu orzeka się czasową niezdolność do kierowania pojazdami (w przypadku kierowców zawodowych grupy 2: minimalny okres karencji wynosi co najmniej 6 miesięcy od incydentu z koniecznością ponownej specjalistycznej oceny neurologicznej i naczyniowej przed wydaniem orzeczenia o zdolności).",
        "Kierowca może wrócić do prowadzenia samochodu ciężarowego natychmiast po ustąpieniu objawów TIA (w 2. dobie od incydentu).",
        "Przepisy o ruchu drogowym nie regulują kwestii udarów mózgu i TIA u kierowców.",
        "Lekarz POZ ma obowiązek natychmiast odebrać kierowcy dowód osobisty.",
        "Przebycie TIA skutkuje dożywotnim, bezwzględnym zakazem kierowania wszelkimi pojazdami mechanicznymi (w tym rowerem)."
      ],
      correct: 0,
      explanation: "Zgodnie z przepisami dotyczącymi badań kierowców, po incydencie TIA lub udarze mózgu obowiązuje czasowy zakaz kierowania pojazdami (dla kierowców zawodowych grupy 2 wynosi on minimum 6 miesięcy, a dla kierowców amatorów grupy 1 – co najmniej 1 miesiąc), zakończony ponownym badaniem neurologicznym."
    }
  },
  148: {
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące postępowania w urazach wielonarządowych (Polytrauma) wg wytycznych ATLS (Advanced Trauma Life Support):",
      options: [
        "Podstawą badania wstępnego (Primary Survey) jest schemat ABCDE: Airway (drogi oddechowe ze stabilizacją kręgosłupa szyjnego), Breathing (oddychanie), Circulation (krążenie i tamowanie krwawień), Disability (stan neurologiczny), Exposure (ekspozycja i ochrona przed hipotermią).",
        "U niestabilnego hemodynamicznie pacjenta z podejrzeniem krwotoku do jamy otrzewnej badaniem z wyboru jest natychmiastowe wykonanie pełnej tomografii komputerowej politrauma z kontrastem trwającej 30 minut.",
        "Złota triada śmierci w urazach obejmuje: hipotermię, kwasicę metaboliczną oraz koagulopatię pourazową (TIC).",
        "Protokół masywnej transfuzji (MTP) zakłada zrównoważone przetaczanie preparatów krwi w proporcji 1 KKCz : 1 FFP : 1 KKP w połączeniu z wczesnym podaniem kwasu traneksamowego (TXA 1 g i.v. w ciągu pierwszych 3 godzin od urazu).",
        "Strategia Damage Control Surgery (DCS) przedkłada szybkie opanowanie krwotoku i skażenia nad definitywne czasochłonne rekonstrukcje anatomiczne u wyczerpanego metabolicznie pacjenta."
      ],
      correct: 1,
      explanation: "Zdanie B jest FAŁSZYWE. Kardynalną zasadą medycyny ratunkowej i traumatologii jest: niestabilny pacjent NIE MOŻE trafić do pracowni tomografii komputerowej ('the tunnel of death'). Diagnostykę krwawienia u pacjenta niestabilnego prowadzi się przyłóżkowo (badanie e-FAST na sali reanimacyjnej), a pacjent natychmiast trafia na blok operacyjny do laparotomii ratunkowej (Damage Control Surgery)."
    },
    q10: {
      question: "Do stanów bezpośredniego zagrożenia życia podlegających natychmiastowemu zaopatrzeniu już w fazie oceny ABC (Primary Survey) wg ATLS należą:\n1. Odma prężna (Tension pneumothorax) – wymagająca natychmiastowego odbarczenia igłowego lub torakostomii\n2. Tamponada serca – wymagająca doraźnej perikardiocentezy lub torakotomii ratunkowej\n3. Masywny krwiak opłucnej (Massive hemothorax) z drenażem klatki piersiowej\n4. Masywny krwotok zewnętrzny z tętnicy kończynowej – wymagający opaski uciskowej (stazy taktycznej)\n5. Izolowane powierzchowne otarcie naskórka przedramienia bez cech krwawienia\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 2, 5",
        "2, 3, 5",
        "1, 3, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Odma prężna, tamponada, masywny krwiak opłucnej i krwotok zewnętrzny to bezpośrednie stany zagrożenia życia w ocenie ABC, które muszą zostać zaopatrzone natychmiast przed przejściem do dalszych etapów badania ATLS."
    },
    q11: {
      question: "Nieprzytomny nieznany mężczyzna (NN) po wypadku komunikacyjnym z obrażeniami wielonarządowymi, odmą prężną i wstrząsem krwotocznym trafia do Centrum Urazowego. Zgodnie z art. 33 i art. 34 ust. 7 Ustawy o zawodach lekarza i lekarza dentysty oraz zasadami prawa medycznego:",
      options: [
        "Lekarz podejmuje wszelkie niezbędne czynności diagnostyczne i zabiegi operacyjne ratujące życie bez zgody pacjenta (zgoda domniemana w stanie nagłym), odnotowując okoliczności w dokumentacji medycznej i niezwłocznie zawiadamiając właściwy sąd opiekuńczy o podjętych działaniach wobec pacjenta o nieustalonej tożsamości.",
        "Do wykonania drenażu jamy opłucnej u nieprzytomnego NN konieczne jest wcześniejsze uzyskanie postanowienia sądu rodzinnego.",
        "Personel ma prawny obowiązek wstrzymać wszelkie procedury ratunkowe do momentu ustalenia danych osobowych przez policję.",
        "Brak możliwości uzyskania zgody pacjenta nakazuje zaniechanie transfuzji krwi i intubacji.",
        "Decyzję o operacji u pacjenta NN może podjąć wyłącznie prokurator rejonowy w formie pisemnej."
      ],
      correct: 0,
      explanation: "W stanie bezpośredniego zagrożenia życia pacjenta nieprzytomnego o nieustalonej tożsamości lekarz działa na mocy art. 33 i art. 34 ust. 7 UoZL – wykonuje wszystkie czynności ratujące życie bez uprzedniej zgody, sporządzając adnotację w dokumentacji i zawiadamiając sąd opiekuńczy."
    }
  }
};

async function run() {
  console.log('=== UPGRADING REMAINING CEM QUESTIONS ===');
  const files = fs.readdirSync('cases').filter(f => /^\d+_/.test(f));

  for (const f of files) {
    const id = parseInt(f.split('_')[0], 10);
    if (!UPGRADES[id]) continue;

    const fullPath = path.join('cases', f);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const c = await decryptObjectAes(JSON.parse(raw), MASTER_KEY);
    const up = UPGRADES[id];

    if (up.q9) {
      c.lekQuestions[8] = {
        tag: 'LEK CEM - Pytanie o fałsz',
        question: up.q9.question,
        q: up.q9.question,
        options: up.q9.options,
        opts: up.q9.options,
        correct: up.q9.correct,
        correctIdx: up.q9.correct,
        explanation: up.q9.explanation,
        expl: up.q9.explanation
      };
    }
    if (up.q10) {
      c.lekQuestions[9] = {
        tag: 'LEK CEM - Zadanie kombinatoryczne',
        question: up.q10.question,
        q: up.q10.question,
        options: up.q10.options,
        opts: up.q10.options,
        correct: up.q10.correct,
        correctIdx: up.q10.correct,
        explanation: up.q10.explanation,
        expl: up.q10.explanation
      };
    }
    if (up.q11) {
      c.lekQuestions[10] = {
        tag: 'LEK CEM - Prawo / Orzecznictwo / Etyka / Zdrowie Publiczne',
        question: up.q11.question,
        q: up.q11.question,
        options: up.q11.options,
        opts: up.q11.options,
        correct: up.q11.correct,
        correctIdx: up.q11.correct,
        explanation: up.q11.explanation,
        expl: up.q11.explanation
      };
    }

    const reEncrypted = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
    fs.writeFileSync(fullPath, JSON.stringify(reEncrypted, null, 2), 'utf8');
    console.log(`[PERFECT PASS] Case #${id}: ${f}`);
  }
  console.log('All targeted cases upgraded successfully!');
}

run().catch(console.error);

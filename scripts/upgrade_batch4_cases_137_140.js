const fs = require('fs');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const PASSWORD = '@LEKSzymon28111999';

async function upgradeCase(fname, updater) {
  const enc = JSON.parse(fs.readFileSync('cases/' + fname, 'utf8'));
  const c = await decryptObjectAes(enc, PASSWORD);
  updater(c);
  if (!c.vitalsObj) {
    c.vitalsObj = { hr: 90, bp: "120/80", spo2: 98, rr: 16, temp: 37.0, gcs: 15 };
  }
  const reEnc = await encryptStringAes(JSON.stringify(c, null, 2), PASSWORD);
  fs.writeFileSync('cases/' + fname, JSON.stringify(reEnc, null, 2), 'utf8');
  console.log(`Upgraded clinical storytelling: ${fname}`);
}

async function run() {
  console.log("Starting deep clinical upgrade for cases 137-140 (Trauma & Surgery)...");

  // ==========================================
  // CASE 137: Pęknięcie śledziony po tępym urazie brzucha
  // ==========================================
  await upgradeCase('137_pekniecie_sledziony_uraz.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena w obszarze resuscytacyjnym SOR (Trauma Room) – 28-letni kierowca po wypadku",
        desc: "ZRM przywozi na sygnale 28-letniego kierowcę po zderzeniu bocznym samochodu z drzewem (uderzenie od strony kierowcy, wystrzelona kurtyna i poduszka boczna). Pacjent jest na desce ortopedycznej w kołnierzu szyjnym. Skarży się na silny ból lewego podżebrza oraz ostry ból lewego barku nasilający się przy próbie głębszego wdechu. Parametry: HR 118/min, BP 94/58 mmHg, SpO2 96%, RR 24/min, GCS 15. W badaniu fizykalnym: otarcia naskórka i podbiegnięcie krwawe dolnych żeber po lewej stronie, brzuch wzdęty, deskowato napięty w lewym podżebrzu z wyraźną obroną mięśniową. Co oznacza ból barku i jak interpretujesz stan chorego?",
        scenario: "ZRM przywozi na sygnale 28-letniego kierowcę po zderzeniu bocznym samochodu z drzewem (uderzenie od strony kierowcy, wystrzelona kurtyna i poduszka boczna). Pacjent jest na desce ortopedycznej w kołnierzu szyjnym. Skarży się na silny ból lewego podżebrza oraz ostry ból lewego barku nasilający się przy próbie głębszego wdechu. Parametry: HR 118/min, BP 94/58 mmHg, SpO2 96%, RR 24/min, GCS 15. W badaniu fizykalnym: otarcia naskórka i podbiegnięcie krwawe dolnych żeber po lewej stronie, brzuch wzdęty, deskowato napięty w lewym podżebrzu z wyraźną obroną mięśniową. Co oznacza ból barku i jak interpretujesz stan chorego?",
        options: [
          {
            text: "Rozpoznajesz objaw Kehra (ból lewego barku w wyniku podrażnienia lewej kopuły przepony i nerwu przeponowego C3-C5 przez wynaczynioną krew) wskazujący na krwawienie do jamy otrzewnej z pękniętej śledziony, a parametry świadczą o wstrząsie krwotocznym stopnia II wg ATLS.",
            correct: true,
            feedback: "Znakomicie! Klasyczny objaw Kehra to ból rzutowany do lewego barku wywołany podrażnieniem otrzewnej pokrywającej lewą kopułę przepony przez krew z uszkodzonej śledziony (unerwienie czuciowe n. phrenicus, segmenty C3-C5 – te same co czucie barku). W klasyfikacji wstrząsu krwotocznego ATLS: tachykardia >100/min, spadek ciśnienia skurczowego i obniżenie ciśnienia tętna odpowiadają wstrząsowi II/III stopnia (utrata 15-30% objętości krwi krążącej)."
          },
          {
            text: "Ból barku świadczy o zwichnięciu stawu ramienno-obojczykowego od pasów, a spadek ciśnienia to wstrząs neurogenny od urazu kręgosłupa.",
            correct: false,
            feedback: "Błędne! We wstrząsie neurogennym (uszkodzenie rdzenia powyżej Th6) dominuje hipotonia z BRADYKARDIĄ (zniesienie napędu współczulnego) i ciepła, sucha skóra. Tutaj mamy tachykardię 118/min, chłodną, spoconą skórę i bolesność brzucha – to podręcznikowy wstrząs hipowolemiczny/krwotoczny!"
          },
          {
            text: "Ból lewego barku to objaw Troisiera wskazujący na zatorowość tłuszczową ze złamań kości długich.",
            correct: false,
            feedback: "Błędne! Węzeł Troisiera to przerzut nowotworowy do węzła nadobojczykowego lewego (rak żołądka). Ból barku przy wynaczynieniu krwi pod przeponę to objaw Kehra."
          },
          {
            text: "Pacjent jest wydolny hemodynamicznie, ból podżebrza to tylko stłuczenie powłok mięśniowych, zlecasz tramadol i wypisujesz do domu.",
            correct: false,
            feedback: "Kardynalny błąd zagrażający zgonem! Tachykardia 118/min, hipotonia 94/58 mmHg i obrona mięśniowa w lewym podżebrzu po tępym urazie to bezwzględne wskazanie do natychmiastowej diagnostyki w kierunku pęknięcia narządu miąższowego."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Wstępna stabilizacja hemodynamiczna (protokół ATLS ABCDE)",
        desc: "Jesteś liderem zespołu urazowego (Trauma Team Leader). Pacjent leży w obszarze resuscytacji. Jakie natychmiastowe działania dostępowe i resuscytacyjne wdrażasz w pierwszych 5 minutach?",
        scenario: "Jesteś liderem zespołu urazowego (Trauma Team Leader). Pacjent leży w obszarze resuscytacji. Jakie natychmiastowe działania dostępowe i resuscytacyjne wdrażasz w pierwszych 5 minutach?",
        options: [
          {
            text: "Zakładasz 2 wkłucia obwodowe o dużej średnicy (14G/16G) w zgięciach łokciowych, pobierasz krew na grupę krwi, próbę krzyżową CITO, morfologię, krzepnięcie, gazometrię i mleczany, rozpoczynasz ostrożny wlew zbilansowanego krystaloidu (normotensja permisywna SBP 80-90 mmHg) oraz podajesz kwas traneksamowy (TXA 1 g i.v. w ciągu 10 min).",
            correct: true,
            feedback: "Idealnie! Zasady ATLS: 2 duże obwodowe kaniule dożylne (14-16G), pobranie grupy krwi i próby krzyżowej. Hipotensja permisywna (utrzymanie SBP 80-90 mmHg / wyczuwalnego tętna na tętnicy promieniowej) zapobiega wypłukiwaniu powstających skrzepów ('pop the clot'). Podanie kwasu traneksamowego (TXA) w ciągu 3 godzin od urazu (badanie CRASH-2) istotnie redukuje śmiertelność z powodu wykrwawienia."
          },
          {
            text: "Podajesz natychmiast 4 litry 0.9% NaCl w bolusie ciśnieniowym, aby podnieść ciśnienie skurczowe powyżej 140 mmHg.",
            correct: false,
            feedback: "Błąd! Masywny wlew zimnej soli fizjologicznej prowadzi do kwasicy hiperchloremicznej, hipotermii, rozcieńczeniowej koagulopatii i 'wypchnięcia skrzepu' (pop the clot) ze śledziony, co gwałtownie nasila śmiertelny krwotok."
          },
          {
            text: "Zakładasz wyłącznie wkłucie centralne do żyły podobojczykowej lewej, wstrzymując podawanie jakichkolwiek płynów do czasu wyniku tomografii.",
            correct: false,
            feedback: "Błąd! Wkłucie centralne wymaga czasu i opóźnia resuscytację w urazie wielonarządowym. Ponadto wkłucie podobojczykowe po stronie urazu klatki niesie wysokie ryzyko odmy opłucnowej."
          },
          {
            text: "Wstrzykujesz domięśniowo ketoprofen i zwalniasz pacjenta na wózku inwalidzkim do kolejki na RTG klatki piersiowej.",
            correct: false,
            feedback: "Niedopuszczalne zaniedbanie zagrażające życiu!"
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Badanie przyłóżkowe E-FAST (Extended Focused Assessment with Sonography for Trauma)",
        desc: "Przy łóżku pacjenta włączasz ultrasonograf i wykonujesz protokół E-FAST. Głowica przyłożona do lewego dołu podżebrowego i przestrzeni śledzionowo-nerkowej (zachyłek Kollera) uwidacznia bezechowe pasmo płynu grubości 18 mm wokół bieguna dolnego śledziony, a w zagłębieniu odbytniczo-pęcherzowym (jamie Douglasa) widoczny jest wolny płyn. W przestrzeni Morisona (wątrobowo-nerkowej) płynu nie widać. Brak cech odmy i płynu w opłucnej. Jak interpretujesz wynik E-FAST?",
        scenario: "Przy łóżku pacjenta włączasz ultrasonograf i wykonujesz protokół E-FAST. Głowica przyłożona do lewego dołu podżebrowego i przestrzeni śledzionowo-nerkowej (zachyłek Kollera) uwidacznia bezechowe pasmo płynu grubości 18 mm wokół bieguna dolnego śledziony, a w zagłębieniu odbytniczo-pęcherzowym (jamie Douglasa) widoczny jest wolny płyn. W przestrzeni Morisona (wątrobowo-nerkowej) płynu nie widać. Brak cech odmy i płynu w opłucnej. Jak interpretujesz wynik E-FAST?",
        options: [
          {
            text: "Dodatni E-FAST w zachyłku Kollera i miednicy mniejszej potwierdza obecność krwi w jamie otrzewnej (haemoperitoneum) z podejrzeniem uszkodzenia śledziony; decydującym czynnikiem dalszego postępowania jest ocena stabilności hemodynamicznej po podaniu płynów.",
            correct: true,
            feedback: "Znakomicie! E-FAST w urazach tępych brzucha ma czułość i swoistość >90% w wykrywaniu wolnego płynu (wymaga min. 150-200 ml krwi do uwidocznienia). Kluczowy aksjomat ATLS: dodatni FAST u pacjenta niestabilnego hemodynamicznie = natychmiastowa laparotomia; u pacjenta stabilnego lub odpowiadającego na wstępną płynoterapię = pilne TK jamy brzusznej z kontrastem."
          },
          {
            text: "Dodatni FAST oznacza bezwzględną konieczność natychmiastowego otwarcia brzucha u każdego pacjenta, niezależnie od ciśnienia tętniczego i tętna.",
            correct: false,
            feedback: "Nieprawda. Jeśli chory ustabilizuje się hemodynamicznie po bolusie 500-1000 ml płynu, złotym standardem jest wykonanie TK z kontrastem w celu precyzyjnego wyskalowania uszkodzenia śledziony (skala AAST) i ewentualnej kwalifikacji do leczenia zachowawczego (NOM) lub embolizacji."
          },
          {
            text: "Płyn w zachyłku Kollera to fizjologiczny mocz z pękniętego moczowodu, wykluczasz krwotok.",
            correct: false,
            feedback: "Błędne! W kontekście tępego urazu lewego podżebrza i objawu Kehra płyn to bez wątpienia wynaczyniona krew."
          },
          {
            text: "Wynik jest ujemny, ponieważ w przestrzeni Morisona nie ma płynu.",
            correct: false,
            feedback: "Błąd! Uszkodzenie śledziony gromadzi krew w lewym zachyłku Kollera oraz spływa lewą rynną przyokrężniczą do jamy Douglasa – obecność płynu w dowolnym zachyłku czyni badanie FAST dodatnim."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Odpowiedź na płynoterapię i decyzja o diagnostyce obrazowej (TK trauma-scan)",
        desc: "Po przetoczeniu 1000 ml zbilansowanego krystaloidu ciśnienie pacjenta wzrosło do 112/70 mmHg, a tętno zwolniło do 92/min. Pacjent jest w pełnym kontakcie logicznym (GCS 15), skóra ociepliła się, chory jest stabilny hemodynamicznie (tzw. 'responder'). Co robisz w następnym kroku?",
        scenario: "Po przetoczeniu 1000 ml zbilansowanego krystaloidu ciśnienie pacjenta wzrosło do 112/70 mmHg, a tętno zwolniło do 92/min. Pacjent jest w pełnym kontakcie logicznym (GCS 15), skóra ociepliła się, chory jest stabilny hemodynamicznie (tzw. 'responder'). Co robisz w następnym kroku?",
        options: [
          {
            text: "Kwalifikujesz pacjenta do pilnego wielofazowego badania TK jamy brzusznej i miednicy z dożylnym środkiem cieniującym (z fazą tętniczą i wrotną) pod stałym nadzorem lekarza z zestawem reanimacyjnym w pracowni TK.",
            correct: true,
            feedback: "Prawidłowo! Chory stabilny hemodynamicznie po resuscytacji płynowej musi mieć wykonane TK z kontrastem – to złoty standard diagnostyki urazów narządów miąższowych. Faza tętnicza pozwala ocenić ewentualny aktywny wyciek kontrastu ('blush' naczyniowy) lub tętniaka rzekomego, a faza miąższowa/wrotna precyzyjnie ocenia głębokość pęknięcia miąższu śledziony wg skali AAST."
          },
          {
            text: "Wykonujesz wyłącznie przeglądowe RTG jamy brzusznej w pozycji leżącej, a TK odraczasz o 48 godzin.",
            correct: false,
            feedback: "Błąd! Zwykłe RTG nie uwidoczni miąższu śledziony ani wielkości krwiaka, opóźniając rozpoznanie krwawienia wewnętrznego."
          },
          {
            text: "Kierujesz pacjenta na blok operacyjny bez TK, ponieważ każde krwawienie ze śledziony wymaga bezwzględnej splenektomii.",
            correct: false,
            feedback: "Nieprawda. U chorych stabilnych dąży się do zaoszczędzenia śledziony (NOM – non-operative management), a TK jest niezbędna do podjęcia tej decyzji."
          },
          {
            text: "Wysyłasz pacjenta samego na TK bez monitorowania i bez lekarza, bo ciśnienie jest przecież dobre.",
            correct: false,
            feedback: "Niedopuszczalne! Pacjent z urazem śledziony może w każdej chwili zdekompensować się z powodu pęknięcia podtorebkowego krwiaka – transport i badanie TK musi odbywać się w pełnym monitorowaniu z lekarzem i lekami resuscytacyjnymi."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Ocena badania TK – klasyfikacja AAST i znalezienie 'blushu' naczyniowego",
        desc: "Opis TK: 'Śledziona o wymiarach prawidłowych z głębokimi pęknięciami miąższu sięgającymi naczyń wnękowych o głębokości >3 cm (stopień III/IV wg AAST), podtorebkowy krwiak obejmujący >50% powierzchni. W fazie tętniczej w biegunie dolnym widoczne jest ognisko wynaczynienia kontrastu (contrast blush) o wymiarach 12x10 mm, świadczące o czynnym krwawieniu tętniczym. Umiarkowana ilość krwi w jamie otrzewnej'. Pacjent: HR 98/min, BP 108/65 mmHg. Jakie postępowanie jest leczeniem z wyboru wg współczesnych wytycznych WSES (World Society of Emergency Surgery)?",
        scenario: "Opis TK: 'Śledziona o wymiarach prawidłowych z głębokimi pęknięciami miąższu sięgającymi naczyń wnękowych o głębokości >3 cm (stopień III/IV wg AAST), podtorebkowy krwiak obejmujący >50% powierzchni. W fazie tętniczej w biegunie dolnym widoczne jest ognisko wynaczynienia kontrastu (contrast blush) o wymiarach 12x10 mm, świadczące o czynnym krwawieniu tętniczym. Umiarkowana ilość krwi w jamie otrzewnej'. Pacjent: HR 98/min, BP 108/65 mmHg. Jakie postępowanie jest leczeniem z wyboru wg współczesnych wytycznych WSES (World Society of Emergency Surgery)?",
        options: [
          {
            text: "U stabilnego hemodynamicznie chorego z obecnością aktywnego wynaczynienia kontrastu ('blush') w TK metodą z wyboru w ramach NOM jest pilna angiografia z selektywną przezcewnikową embolizacją tętnicy śledzionowej (angioembolizacja) na sali naczyniowej/hybrydowej.",
            correct: true,
            feedback: "Znakomicie! Wytyczne WSES i ATLS: u pacjenta stabilnego hemodynamicznie obecność 'contrast extravasation' (blush) w TK jest bezwzględnym wskazaniem do pilnej angioembolizacji tętnicy śledzionowej. Pozwala to zatamować krwawienie tętnicze z zachowaniem funkcji immunologicznej i hematologicznej śledziony (odsetek sukcesu NOM z embolizacją wynosi >90%). Laparotomia byłaby konieczna, gdyby chory był niestabilny."
          },
          {
            text: "Natychmiastowa laparotomia z bezwzględnym całkowitym wycięciem śledziony bez próby embolizacji.",
            correct: false,
            feedback: "Jeśli chory jest stabilny i dostępna jest pracownia radiologii interwencyjnej, splenektomia operacyjna nie jest postępowaniem pierwszego rzutu ze względu na wysokie ryzyko sepsy posplenektomijnej (OPSI)."
          },
          {
            text: "Wyłącznie leczenie zachowawcze bez embolizacji na zwykłym oddziale chirurgii, ignorując aktywny blush.",
            correct: false,
            feedback: "Błąd! Aktywny wyciek kontrastu (blush) pozostawiony bez embolizacji w >80% przypadków doprowadzi do gwałtownego krwotoku i konieczności pilnej operacji ratunkowej w stanie wstrząsu."
          },
          {
            text: "Podanie witaminy K i leków rozkurczowych (No-Spa) dożylnie.",
            correct: false,
            feedback: "Całkowicie nieskuteczne w mechanicznym przerwaniu naczynia śledzionowego."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Monitorowanie w OIT po udanej embolizacji – zjawisko dwuczasowego pęknięcia",
        desc: "Radiolog interwencyjny założył mikrospirale (coils) do gałęzi dolnobiegunowej tętnicy śledzionowej, uzyskując pełną hemostazę. Pacjent trafia na OIT celem ścisłego monitorowania (NOM). Pielęgniarka pyta Cię, na jakie powikłanie należy zachować szczególną czujność w ciągu najbliższych kilku dni i czym jest tzw. dwuczasowe pęknięcie śledziony (ruptura lienis biphasica)?",
        scenario: "Radiolog interwencyjny założył mikrospirale (coils) do gałęzi dolnobiegunowej tętnicy śledzionowej, uzyskując pełną hemostazę. Pacjent trafia na OIT celem ścisłego monitorowania (NOM). Pielęgniarka pyta Cię, na jakie powikłanie należy zachować szczególną czujność w ciągu najbliższych kilku dni i czym jest tzw. dwuczasowe pęknięcie śledziony (ruptura lienis biphasica)?",
        options: [
          {
            text: "Dwuczasowe pęknięcie polega na początkowym krwawieniu pod torebkę śledziony z narastaniem krwiaka podtorebkowego, który po kilku dniach (lub nawet do 2 tygodni) pod wpływem wzrostu ciśnienia lub drobnego wysiłku pęka do wolnej jamy otrzewnej, wywołując nagły, masywny krwotok wewnętrzny i wstrząs.",
            correct: true,
            feedback: "Dokładnie tak! Klasyczne dwuczasowe pęknięcie śledziony (zwykle po 3-10 dniach od urazu) to podstępne zjawisko: torebka śledziony początkowo ogranicza krwiak, który stopniowo ulega lizie, pęcznieje osmotycznie i ostatecznie pęka, powodując gwałtowne załamanie krążenia. Wymaga to ścisłego leżenia w łóżku przez min. 48-72h, seryjnych pomiarów morfologii (Hb) oraz natychmiastowej laparotomii w razie załamania parametrów."
          },
          {
            text: "Dwuczasowe pęknięcie oznacza jednoczesne pęknięcie śledziony i wątroby w tym samym momencie wypadku.",
            correct: false,
            feedback: "Błędna definicja. To uszkodzenie wielonarządowe, a nie dwuczasowe pęknięcie."
          },
          {
            text: "Dwuczasowe pęknięcie to powikłanie występujące wyłącznie u dzieci i polega na pęknięciu pęcherza moczowego.",
            correct: false,
            feedback: "Nieprawda."
          },
          {
            text: "Oznacza to, że po wyleczeniu śledziony dochodzi do pęknięcia aorty piersiowej po 6 miesiącach.",
            correct: false,
            feedback: "Błędne skojarzenie."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Zmiana sytuacji klinicznej – nagła dekompensacja hemodynamiczna",
        desc: "W 3. dobie hospitalizacji, podczas próby wstania do toalety, pacjent nagle zbladł, zgłosił ponowny silny ból brzucha i stracił przytomność. W kardiomonitorze: HR 135/min, BP 70/40 mmHg, powłoki brzuszne deskowato twarde, objaw Blumberga silnie dodatni w całym brzuchu. Wznowiono szybki wlew krystaloidów i KKCz, jednak ciśnienie nie rośnie powyżej 75/45 mmHg. Co robisz natychmiast?",
        scenario: "W 3. dobie hospitalizacji, podczas próby wstania do toalety, pacjent nagle zbladł, zgłosił ponowny silny ból brzucha i stracił przytomność. W kardiomonitorze: HR 135/min, BP 70/40 mmHg, powłoki brzuszne deskowato twarde, objaw Blumberga silnie dodatni w całym brzuchu. Wznowiono szybki wlew krystaloidów i KKCz, jednak ciśnienie nie rośnie powyżej 75/45 mmHg. Co robisz natychmiast?",
        options: [
          {
            text: "Kwalifikujesz pacjenta do natychmiastowej ratunkowej laparotomii zwiadowczej na bloku operacyjnym celem kontroli krwotoku i wykonania splenektomii (usunięcia pękniętej śledziony) w ramach chirurgii kontroli uszkodzeń (Damage Control Surgery).",
            correct: true,
            feedback: "Bezwzględnie prawidłowo! Niestabilność hemodynamiczna niereagująca na płyny u chorego po urazie śledziony to niepodważalne wskazanie do natychmiastowej laparotomii. Nie wolno tracić czasu na ponowne TK czy próby embolizacji. Na sali operacyjnej chirurg otwiera jamę brzuszną z cięcia pośrodkowego, ewakuuje skrzepy krwi, zaciska szypułę naczyniową śledziony i wykonuje splenektomię ratunkową."
          },
          {
            text: "Zlecasz ponowne badanie TK brzucha z kontrastem i czekasz na wolny termin w pracowni.",
            correct: false,
            feedback: "Śmiertelny błąd! Chory w niestabilnym wstrząsie krwotocznym nie może wjechać do skanera TK – zgon w gantry tomografu ('tomografia pośmiertna')."
          },
          {
            text: "Podajesz noradrenalinę w wysokim wlewie bez interwencji chirurgicznej i czekasz na ustąpienie objawów.",
            correct: false,
            feedback: "Samo obkurczanie naczyń w niewyrównanym krwotoku do jamy otrzewnej pogłębia niedokrwienie trzewne i przyspiesza zgon."
          },
          {
            text: "Wykonujesz punkcję opłucnej igłą w II przestrzeni międzyżebrowej.",
            correct: false,
            feedback: "Chory ma krwotok do brzucha (haemoperitoneum), a nie odmę prężną."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Opieka po splenektomii – profilaktyka piorunującej sepsy posplenektomijnej (OPSI)",
        desc: "Operacja przebiegła pomyślnie – wykonano splenektomię, przetoczono 4 jednostki KKCz i 2 jednostki FFP, pacjent został wybudzony i powraca do zdrowia. Jakie kluczowe zalecenia profilaktyczne musisz wdrożyć przed wypisem ze szpitala, aby uchronić chorego przed piorunującą sepsą posplenektomijną (OPSI - Overwhelming Post-Splenectomy Infection)?",
        scenario: "Operacja przebiegła pomyślnie – wykonano splenektomię, przetoczono 4 jednostki KKCz i 2 jednostki FFP, pacjent został wybudzony i powraca do zdrowia. Jakie kluczowe zalecenia profilaktyczne musisz wdrożyć przed wypisem ze szpitala, aby uchronić chorego przed piorunującą sepsą posplenektomijną (OPSI - Overwhelming Post-Splenectomy Infection)?",
        options: [
          {
            text: "Edukacja o ryzyku OPSI wywołanej bakteriami otoczkowymi (Streptococcus pneumoniae, Neisseria meningitidis, Haemophilus influenzae typ b) oraz zaszczepienie przeciwko tym trzem patogenom około 14. doby po zabiegu (gdy ustąpi pourazowa supresja immunologiczna), a także coroczne szczepienie przeciw grypie i recepta na amoksycylinę/klawulanian do natychmiastowego zażycia w razie nagłej gorączki.",
            correct: true,
            feedback: "Wybitnie! Śledziona odpowiada za fagocytozę bakterii otoczkowych (przez makrofagi miazgi czerwonej) oraz syntezę przeciwciał IgM i tuftsyny/properdyny. OPSI ma śmiertelność sięgającą 50-70% w ciągu 24-48h! Kanon zaleceń: szczepienia przeciwko Pneumokokom (PCV20 lub PCV15 + PPSV23), Meningokokom (MenACWY + MenB) oraz HiB, optymalnie około 14 dni po splenektomii ratunkowej (wcześniej organizm nie wykształci adekwatnej odporności z powodu stresu pourazowego). Pacjent musi mieć przy sobie antybiotyk 'standby' na wypadek gorączki i kartę informacyjną o braku śledziony."
          },
          {
            text: "Zalecasz dożywotnie codzienne przyjmowanie ciprofloksacyny i bezwzględny zakaz jakichkolwiek szczepień ze względu na brak śledziony.",
            correct: false,
            feedback: "Absurdalne! Brak śledziony jest bezwzględnym WSKAZANIEM do szczepień, a przewlekła profilaktyka antybiotykowa bez szczepień jest błędna i generuje oporność bakterii."
          },
          {
            text: "Zaszczepienie pacjenta natychmiast na sali wybudzeń w pierwszej dobie po operacji.",
            correct: false,
            feedback: "Zaszczepienie w ostrej fazie po urazie daje słabą odpowiedź immunologiczną – wg wytycznych odczekuje się ok. 14 dni po zabiegu ratunkowym."
          },
          {
            text: "Nie są wymagane żadne szczególne środki ostrożności, ponieważ wątroba w pełni przejmuje funkcje immunologiczne śledziony.",
            correct: false,
            feedback: "Nieprawda! Ryzyko śmiertelnej posocznicy u osób po splenektomii jest kilkudziesięciokrotnie wyższe niż w populacji ogólnej przez całe życie."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 138: Niedrożność w raku jelita grubego
  // ==========================================
  await upgradeCase('138_niedroznosc_rak_jelita_grubego.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena na dyżurze chirurgicznym – 67-letni mężczyzna z wzdęciem i zatrzymaniem stolca",
        desc: "Na ostry dyżur chirurgiczny zgłasza się 67-letni mężczyzna. Skarży się na narastające od 4 dni wzdęcie brzucha, kurczowe bóle oraz całkowity brak oddawania stolca i gazów od 72 godzin. Dziś rano dołączyły nudności i obfite wymioty treścią początkowo żołądkową, a obecnie cuchnącą, brunatną (treść kałowa / wymioty jelitowe). W wywiadzie: w ostatnich 5 miesiącach chudł (ok. 8 kg), zauważył zmianę rytmu wypróżnień (naprzemienne zaparcia i biegunki) oraz okresowo tzw. stolce ołówkowate z domieszką ciemnej krwi, które bagatelizował, uważając za 'hemoroidy'. W badaniu: HR 104/min, BP 130/80 mmHg, temp. 37.3°C. Brzuch silnie wzdęty, bębenkowy, osłuchowo słyszalne metaliczne tony perystaltyki i przelewania ('stawianie się jelit'). Jaka jest Twoja natychmiastowa diagnoza wstępna?",
        scenario: "Na ostry dyżur chirurgiczny zgłasza się 67-letni mężczyzna. Skarży się na narastające od 4 dni wzdęcie brzucha, kurczowe bóle oraz całkowity brak oddawania stolca i gazów od 72 godzin. Dziś rano dołączyły nudności i obfite wymioty treścią początkowo żołądkową, a obecnie cuchnącą, brunatną (treść kałowa / wymioty jelitowe). W wywiadzie: w ostatnich 5 miesiącach chudł (ok. 8 kg), zauważył zmianę rytmu wypróżnień (naprzemienne zaparcia i biegunki) oraz okresowo tzw. stolce ołówkowate z domieszką ciemnej krwi, które bagatelizował, uważając za 'hemoroidy'. W badaniu: HR 104/min, BP 130/80 mmHg, temp. 37.3°C. Brzuch silnie wzdęty, bębenkowy, osłuchowo słyszalne metaliczne tony perystaltyki i przelewania ('stawianie się jelit'). Jaka jest Twoja natychmiastowa diagnoza wstępna?",
        options: [
          {
            text: "Ostra mechaniczna niedrożność jelita grubego (Ileus mechanicus coli) najprawdopodobniej w przebiegu nowotworu złośliwego lewej połowy okrężnicy (rak esicy/zstępnicy).",
            correct: true,
            feedback: "Znakomicie! Tetradę objawów mechanicznej niedrożności jelit stanowią: kurczowy ból brzucha, wzdęcie (meteorismus), nudności/wymioty oraz zatrzymanie gazów i stolca. Stolce ołówkowate, naprzemienne zaparcia i biegunki oraz chudnięcie to klasyczne objawy raka lewej połowy okrężnicy, gdzie światło jelita jest wąskie, a masy kałowe zwarte. Rozwijające się wymioty kałowe świadczą o zaawansowanym zastoju treści jelitowej."
          },
          {
            text: "Ostre zapalenie żołądkowo-jelitowe (Gastroenteritis acuta) wymagające podania leków przeciwbiegunkowych.",
            correct: false,
            feedback: "Błąd! Pacjent nie ma biegunki, lecz całkowite zatrzymanie gazów i stolca od 3 dni, wzdęcie i metaliczną perystaltykę. Loperamid w mechanicznej niedrożności doprowadziłby do pęknięcia jelita!"
          },
          {
            text: "Niedrożność porażenna w przebiegu hipokaliemii, ponieważ słychać głośne tony w jamie brzusznej.",
            correct: false,
            feedback: "W niedrożności porażennej występuje 'martwa cisza' nad brzuchem (brak jakichkolwiek szmerów perystaltycznych). Metaliczna perystaltyka i 'stawianie się jelit' to cechy niedrożności MECHANICZNEJ."
          },
          {
            text: "Zwykłe przewlekłe zaparcie nawykowe, wystarczy czopek glicerynowy i wypis do domu.",
            correct: false,
            feedback: "Kardynalny błąd! Chory z wymiotami kałowymi i wzdęciem brzucha ma stan ostrego brzucha zagrażający perforacją i sepsą."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Badanie per rectum i wstępne procedury odbarczające",
        desc: "Przystępujesz do badania przedmiotowego i wstępnego odbarczenia przewodu pokarmowego. Jakie czynności wykonujesz natychmiast?",
        scenario: "Przystępujesz do badania przedmiotowego i wstępnego odbarczenia przewodu pokarmowego. Jakie czynności wykonujesz natychmiast?",
        options: [
          {
            text: "Wykonujesz badanie per rectum (ocena obecności guza w zasięgu palca, pusta rozszerzona bańka odbytnicy świadcząca o przeszkodzie wyżej) oraz zakładasz zgłębnik żołądkowy (sondę Levina) celem dekompresji żołądka i zapobiegania zachłyśnięciu, cewnik Foleya i dostęp dożylny z płynoterapią.",
            correct: true,
            feedback: "Dokładnie tak! Złota zasada chirurgii: 'Nie ma badania brzucha bez per rectum'. Pusta, rozdęta bańka odbytnicy (tzw. objaw Hochenegga) potwierdza niedrożność mechaniczną położoną powyżej bańki odbytnicy. Sonda nosowo-żołądkowa ('drip and suck') odbarcza zalegającą treść jelitowo-żołądkową, chroniąc przed zachłystowym zapaleniem płuc (zespół Mendelsona)."
          },
          {
            text: "Wykonujesz głęboką lewatywę barytową pod wysokim ciśnieniem.",
            correct: false,
            feedback: "Absolutnie przeciwwskazane! Baryt w mechanicznej niedrożności zagraża pęknięciem ściany jelita i śmiertelnym barytowym zapaleniem otrzewnej."
          },
          {
            text: "Podajesz doustnie 2 litry roztworu makrogoli (Fortrans) do przeczyszczenia.",
            correct: false,
            feedback: "Śmiertelny błąd! Podanie środków przeczyszczających doustnie przy mechanicznej przeszkodzie doprowadzi do natychmiastowej perforacji okrężnicy!"
          },
          {
            text: "Zalecasz natychmiastowe obfite posiłki bogatoresztkowe, aby przepchnąć masy kałowe.",
            correct: false,
            feedback: "Błąd zagrażający życiu."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Diagnostyka obrazowa – RTG przeglądowe i prawo Laplace'a",
        desc: "Zlecasz RTG przeglądowe jamy brzusznej w pozycji stojącej. Badanie wykazuje: szerokie poziomy płynów i gazów w obrębie okrężnicy wstępującej i poprzecznej, zstępnica słabo wypełniona, a kątnica jest olbrzymio rozdęta do średnicy 11 cm. Zastawka krętniczo-kątnicza (Bauchina) jest wydolna (brak gazu w jelicie cienkim). Jakie krytyczne zjawisko patofizjologiczne i zagrożenie musisz wziąć pod uwagę?",
        scenario: "Zlecasz RTG przeglądowe jamy brzusznej w pozycji stojącej. Badanie wykazuje: szerokie poziomy płynów i gazów w obrębie okrężnicy wstępującej i poprzecznej, zstępnica słabo wypełniona, a kątnica jest olbrzymio rozdęta do średnicy 11 cm. Zastawka krętniczo-kątnicza (Bauchina) jest wydolna (brak gazu w jelicie cienkim). Jakie krytyczne zjawisko patofizjologiczne i zagrożenie musisz wziąć pod uwagę?",
        options: [
          {
            text: "Mechanizm niedrożności w pętli zamkniętej (closed loop obstruction): wydolna zastawka Bauchina uniemożliwia cofanie gazu do jelita cienkiego, a wg prawa Laplace'a (naprężenie ściany T = P x r) kątnica mająca największy promień podlega największemu napięciu ściany i przy średnicy >10-12 cm grozi jej lada chwila pęknięcie (perforacja diastatyczna) z rozlanym kałowym zapaleniem otrzewnej.",
            correct: true,
            feedback: "Wybitna znajomość fizjologii i chirurgii! To klasyczne zagadnienie egzaminacyjne LEK: przy wydolnej zastawce Bauchina i przeszkodzie w lewej połowie okrężnicy powstaje 'pętla zamknięta'. Zgodnie z prawem Laplace'a napięcie ściany jest wprost proporcjonalne do promienia naczynia/jelita. Kątnica jest najszerszym odcinkiem przewodu pokarmowego, dlatego to ona, a nie miejsce tuż przed guzem, pęka pierwsza (tzw. pęknięcie z rozdęcia / perforatio diastatica) przy średnicy przekraczającej 10-12 cm!"
          },
          {
            text: "Rozdęcie kątnicy do 11 cm jest fizjologiczne i bezpieczne, jelito cienkie bez gazu oznacza pełne wyleczenie.",
            correct: false,
            feedback: "Nieprawda! Średnica kątnicy >10-12 cm to stan bezpośredniego zagrożenia pęknięciem w ciągu kilku godzin!"
          },
          {
            text: "Prawo Laplace'a mówi, że w jelicie cienkim ciśnienie zawsze jest ujemne.",
            correct: false,
            feedback: "Błędne pojęcie praw fizyki."
          },
          {
            text: "Obecność poziomów płynów w okrężnicy wyklucza raka, wskazuje wyłącznie na celiakię.",
            correct: false,
            feedback: "Absurdalne twierdzenie."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Potwierdzenie rozpoznania – tomografia komputerowa (TK) brzucha i miednicy",
        desc: "Wykonano pilne badanie TK jamy brzusznej i miednicy z kontrastem dożylnym. Wynik: 'Guz okrężnicy esowatej o charakterze mankietowym o długości 5 cm, całkowicie zamykający światło jelita (obraz ogryzka jabłka / apple-core lesion). Masywne rozdęcie okrężnicy powyżej ze ścieńczeniem ściany kątnicy do 1 mm bez cech wolnego powietrza pod kopułami przepony. Brak przerzutów w wątrobie, powiększone regionalne węzły chłonne w krezce esicy'. Pacjent: BP 120/75, HR 96/min, brzuch bolesny, bez objawów otrzewnowych. Jakie są opcje postępowania leczniczego?",
        scenario: "Wykonano pilne badanie TK jamy brzusznej i miednicy z kontrastem dożylnym. Wynik: 'Guz okrężnicy esowatej o charakterze mankietowym o długości 5 cm, całkowicie zamykający światło jelita (obraz ogryzka jabłka / apple-core lesion). Masywne rozdęcie okrężnicy powyżej ze ścieńczeniem ściany kątnicy do 1 mm bez cech wolnego powietrza pod kopułami przepony. Brak przerzutów w wątrobie, powiększone regionalne węzły chłonne w krezce esicy'. Pacjent: BP 120/75, HR 96/min, brzuch bolesny, bez objawów otrzewnowych. Jakie są opcje postępowania leczniczego?",
        options: [
          {
            text: "Pilna interwencja chirurgiczna lub zabiegowa w celu odbarczenia niedrożności: założenie samorozprężalnego stentu metalowego (SEMS) jako pomostu do planowej resekcji onkologicznej ('bridge to surgery') LUB pilna operacja sposobem Hartmanna (resekcja guza esicy, ślepe zamknięcie kikuta odbytnicy i wyłonienie stomii końcowej na lewym dole biodrowym).",
            correct: true,
            feedback: "Znakomicie! Wytyczne ESGE i ESCP: w niedrożności lewej połowy okrężnicy opcjami są: 1) Stentowanie endoskopowe SEMS – pozwala odbarczyć przewód pokarmowy, uniknąć stomii i po przygotowaniu jelita wykonać po 2-3 tygodniach planową resekcję laparoskopową z zespoleniem; 2) Pilna operacja klasyczna – najczęściej zabieg Hartmanna (bezpieczny, unika zespolenia w nieprzygotowanym, rozdętym jelicie ze stanem zapalnym)."
          },
          {
            text: "Wykonanie natychmiastowej resekcji esicy z pierwotnym zespoleniem jelitowym bez wyłonienia stomii odbarczającej.",
            correct: false,
            feedback: "Pierwotne zespolenie bez protekcji stomijnej w niedrożnym, rozdętym jelicie grubym niesie ogromne ryzyko nieszczelności zespolenia (nawet 15-20%) i kałowego zapalenia otrzewnej."
          },
          {
            text: "Terapia paliatywna radioterapią bez interwencji zabiegowej.",
            correct: false,
            feedback: "Błąd! Kątnica 11 cm pęknie w ciągu kilkunastu godzin, powodując zgon."
          },
          {
            text: "Podanie doustnej chemioterapii FOLFOX na SOR i wypis do poradni onkologicznej.",
            correct: false,
            feedback: "Niedopuszczalne zaniedbanie ostrej niedrożności jelit!"
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Przygotowanie chorego do pilnego zabiegu operacyjnego",
        desc: "Z uwagi na brak dostępności dyżurnego endoskopisty do założenia stentu SEMS oraz ścieńczenie ściany kątnicy do 1 mm chory zostaje zakwalifikowany do pilnej operacji chirurgicznej. Jakie postępowanie okołooperacyjne jest obligatoryjne przed nacięciem powłok?",
        scenario: "Z uwagi na brak dostępności dyżurnego endoskopisty do założenia stentu SEMS oraz ścieńczenie ściany kątnicy do 1 mm chory zostaje zakwalifikowany do pilnej operacji chirurgicznej. Jakie postępowanie okołooperacyjne jest obligatoryjne przed nacięciem powłok?",
        options: [
          {
            text: "Uzupełnienie płynów i elektrolitów (korekta hipokaliemii i odwodnienia), podanie profilaktyki antybiotykowej o szerokim spektrum przeciw beztlenowcom i tlenowcom Gram-ujemnym (np. cefazolina/ceftriakson + metronidazol i.v.) w ciągu 60 minut przed nacięciem skóry oraz profilaktyka przeciwzakrzepowa (HDCz i pończochy kompresyjne).",
            correct: true,
            feedback: "Idealnie! W operacjach jelita grubego w trybie ostrym profilaktyka antybiotykowa musi pokrywać florę jelitową (pałeczki jelitowe Enterobacterales oraz Bacteroides fragilis). Odpowiednie nawodnienie i wyrównanie elektrolitowe zapobiegają wstrząsowi w trakcie indukcji znieczulenia ogólnego."
          },
          {
            text: "Zlecenie doustnego przygotowania jelita 4 litrami roztworu przeczyszczającego na stole operacyjnym.",
            correct: false,
            feedback: "Absolutny błąd! Doustne środki przeczyszczające są surowo wzbronione w niedrożności mechanicznej."
          },
          {
            text: "Odstąpienie od antybiotykoterapii, bo podaje się ją dopiero po otrzymaniu posiewu krwi.",
            correct: false,
            feedback: "Nieprawda. Profilaktyka antybiotykowa w chirurgii kolorektalnej musi być podana przed cięciem skóry, aby uzyskać stężenie w tkankach."
          },
          {
            text: "Podanie aspiryny w dawce 300 mg celem poprawy przepływu w mikrokrążeniu.",
            correct: false,
            feedback: "Zwiększyłoby to niepotrzebnie ryzyko krwawienia śródoperacyjnego."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Śródoperacyjna technika zabiegu sposobem Hartmanna",
        desc: "Na sali operacyjnej po otwarciu otrzewnej stwierdzasz olbrzymie rozdęcie kątnicy i okrężnicy poprzecznej, naciekający guz esicy zlokalizowany 18 cm od brzegu odbytu bez zrostów z pęcherzem moczowym. Chirurg wykonuje resekcję esicy wraz z guzem i marginesami onkologicznymi oraz krezką (limfadenektomia). Na czym dokładnie polega dokończenie operacji sposobem Hartmanna?",
        scenario: "Na sali operacyjnej po otwarciu otrzewnej stwierdzasz olbrzymie rozdęcie kątnicy i okrężnicy poprzecznej, naciekający guz esicy zlokalizowany 18 cm od brzegu odbytu bez zrostów z pęcherzem moczowym. Chirurg wykonuje resekcję esicy wraz z guzem i marginesami onkologicznymi oraz krezką (limfadenektomia). Na czym dokładnie polega dokończenie operacji sposobem Hartmanna?",
        options: [
          {
            text: "Zaszycie na głucho kikuta odbytnicy i pozostawienie go w miednicy mniejszej, a bliższy odcinek jelita (zstępnicę) wyprowadza się przez powłoki lewego dołu biodrowego jako jednolufową kolostomię końcową (stomia ostateczna lub czasowa do odtworzenia po kilku miesiącach).",
            correct: true,
            feedback: "Doskonale! Operacja Hartmanna (opisana w 1921 r. przez Henriego Hartmanna): resekcja esicy/odbytnicy, zamknięcie na głucho kikuta obwodowego (odbytniczy kikut zostaje w miednicy) i wyłonienie bliższego końca jako jednolufowa kolostomia końcowa (stomia końcowa). Pozwala to uniknąć śmiertelnego powikłania, jakim byłoby rozejście się zespolenia w brudnym, niedrożnym polu operacyjnym. Po 3-6 miesiącach u wybranych chorych można odtworzyć ciągłość przewodu pokarmowego."
          },
          {
            text: "Wszycie żołądka do odbytnicy z ominięciem całego jelita grubego i cienkiego.",
            correct: false,
            feedback: "Absurd anatomii chirurgicznej."
          },
          {
            text: "Wyłonienie obu końców jelita w jednym otworze jako stomia dwulufowa pętlowa bez zamykania kikuta.",
            correct: false,
            feedback: "To kolostomia pętlowa, a nie klasyczna operacja Hartmanna."
          },
          {
            text: "Pozostawienie guza na miejscu i wykonanie wyłącznie przetoki odżywczej na żołądku (gastrostomia).",
            correct: false,
            feedback: "Pozostawienie guza w niedrożności nie rozwiązuje problemu pętli zamkniętej i doprowadziłoby do pęknięcia kątnicy."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Ocena histopatologiczna i klasyfikacja zaawansowania TNM",
        desc: "Po 10 dniach od operacji otrzymujesz wynik badania histopatologicznego: 'Adenocarcinoma cylindrocellulare G2 okrężnicy esowatej. Guz nacieka całą grubość ściany jelita i dochodzi do surowicówki bez jej przebicia (pT3). W zbadanych 16 węzłach chłonnych krezkowych stwierdzono przerzuty w 4 węzłach (pN2a). Marginesy resekcji proksymalny i dystalny wolne od komórek nowotworowych (R0)'. W TK klatki piersiowej i brzucha brak przerzutów odległych (cM0). Jak definiujesz stopień kliniczny wg klasyfikacji UICC/AJCC?",
        scenario: "Po 10 dniach od operacji otrzymujesz wynik badania histopatologicznego: 'Adenocarcinoma cylindrocellulare G2 okrężnicy esowatej. Guz nacieka całą grubość ściany jelita i dochodzi do surowicówki bez jej przebicia (pT3). W zbadanych 16 węzłach chłonnych krezkowych stwierdzono przerzuty w 4 węzłach (pN2a). Marginesy resekcji proksymalny i dystalny wolne od komórek nowotworowych (R0)'. W TK klatki piersiowej i brzucha brak przerzutów odległych (cM0). Jak definiujesz stopień kliniczny wg klasyfikacji UICC/AJCC?",
        options: [
          {
            text: "Stopień III (Stage III / pT3 N2a M0) – obecność jakichkolwiek przerzutów do regionalnych węzłów chłonnych przy braku przerzutów odległych definiuje III stopień zaawansowania klinicznego raka jelita grubego.",
            correct: true,
            feedback: "Znakomicie! Klasyfikacja TNM raka jelita grubego: Stopień I = T1-T2 N0 M0; Stopień II = T3-T4 N0 M0; Stopień III = każde T z cechą N1-N2 przy M0; Stopień IV = obecność przerzutów odległych (M1). Ponadto zbadanie minimum 12 węzłów chłonnych (tu zbadano 16) jest warunkiem wiarygodnej oceny onkologicznej."
          },
          {
            text: "Stopień I (Stage I), ponieważ guz nie nacieka sąsiednich narządów.",
            correct: false,
            feedback: "Błąd! Obecność komórek nowotworowych w węzłach chłonnych bezwzględnie przenosi chorego do stopnia III."
          },
          {
            text: "Stopień IV (Stage IV), ponieważ pęcherz moczowy był zagrożony.",
            correct: false,
            feedback: "Stopień IV wymaga potwierdzonych przerzutów odległych (np. wątroba, płuca, otrzewna - M1)."
          },
          {
            text: "Stopień 0 (rak przedinwazyjny in situ).",
            correct: false,
            feedback: "Absolutnie nie – guz nacieka surowicówkę i zajął 4 węzły chłonne."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Kwalifikacja do leczenia uzupełniającego (adiuwantowego) i opieka nad stomią",
        desc: "Pacjent w stanie ogólnym dobrym, kolostomia pracuje prawidłowo, pacjent został przeszkolony w zakresie pielęgnacji worków stomijnych. Przypadek staje na konsylium onkologicznym (multidisciplinary team). Jakie jest dalsze postępowanie przeciwnowotworowe?",
        scenario: "Pacjent w stanie ogólnym dobrym, kolostomia pracuje prawidłowo, pacjent został przeszkolony w zakresie pielęgnacji worków stomijnych. Przypadek staje na konsylium onkologicznym (multidisciplinary team). Jakie jest dalsze postępowanie przeciwnowotworowe?",
        options: [
          {
            text: "Kwalifikacja do chemioterapii uzupełniającej (adiuwantowej) w schemacie opartym na fluoropirymidynach i oksaliplatynie (np. FOLFOX4 / CAPOX) przez okres 3-6 miesięcy, co istotnie zmniejsza ryzyko nawrotu nowotworu i wydłuża przeżycie całkowite.",
            correct: true,
            feedback: "Wybitnie! W raku okrężnicy w stopniu III (z zajęciem węzłów chłonnych) adiuwantowa chemioterapia (FOLFOX lub CAPOX) jest standardem postępowania (kategoria 1 NCCN/ESMO). Ponadto radioterapia NIE jest stosowana w raku okrężnicy (w przeciwieństwie do raka odbytnicy). Po zakończeniu leczenia onkologicznego i kontrolnym TK/kolonoskopii za kilka miesięcy rozważy się odtworzenie ciągłości przewodu pokarmowego (likwidację stomii Hartmanna)."
          },
          {
            text: "Wdrożenie wyłącznej radioterapii na jamę brzuszną, ponieważ chemioterapia nie działa w raku jelita.",
            correct: false,
            feedback: "Błąd! Rak okrężnicy (colon cancer) NIE jest leczony radioterapią z powodu powikłań popromiennych pętli jelita cienkiego; radioterapia stosowana jest w raku odbytnicy (rectal cancer)."
          },
          {
            text: "Zalecenie braku jakiegokolwiek leczenia, ponieważ operacja była doszczętna (R0).",
            correct: false,
            feedback: "Błąd! W stopniu III samo leczenie operacyjne obarczone jest 50-60% ryzykiem wznowy odległej bez chemioterapii uzupełniającej."
          },
          {
            text: "Wypisanie bez opieki onkologicznej ze skierowaniem do uzdrowiska.",
            correct: false,
            feedback: "Niedopuszczalne zaniedbanie standardu onkologicznego."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 139: Niedokrwienne zapalenie okrężnicy
  // ==========================================
  await upgradeCase('139_niedokrwienne_zapalenie_jelita_grubego.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena w gabinecie SOR – 74-letnia pacjentka z nagłym bólem brzucha i krwawą biegunką",
        desc: "Na SOR zgłasza się 74-letnia kobieta z uogólnioną miażdżycą, nadciśnieniem tętniczym i przewlekłą niewydolnością serca. Przed 6 godzinami wystąpił u niej nagły, silny, kurczowy ból w lewym dole biodrowym, po którym pojawiło się gwałtowne parcie na stolec i oddanie luźnego stolca podbarwionego ciemnoczerwoną krwią i śluzem (krwawa biegunka). W wywiadzie: wczoraj chora przyjęła podwójną dawkę furosemidu z powodu obrzęków nóg, co wywołało osłabienie i zawroty głowy. W badaniu: HR 102/min, BP 100/60 mmHg (zwykle 140/90), temp. 37.6°C. Brzuch miękki, wyraźnie tkliwy i bolesny palpacyjnie w lewym dole biodrowym i lewym boku, perystaltyka zachowana, objawy otrzewnowe ujemne. W per rectum na rękawiczce obecna krew ze śluzem. Jaka jest Twoja natychmiastowa diagnoza różnicowa?",
        scenario: "Na SOR zgłasza się 74-letnia kobieta z uogólnioną miażdżycą, nadciśnieniem tętniczym i przewlekłą niewydolnością serca. Przed 6 godzinami wystąpił u niej nagły, silny, kurczowy ból w lewym dole biodrowym, po którym pojawiło się gwałtowne parcie na stolec i oddanie luźnego stolca podbarwionego ciemnoczerwoną krwią i śluzem (krwawa biegunka). W wywiadzie: wczoraj chora przyjęła podwójną dawkę furosemidu z powodu obrzęków nóg, co wywołało osłabienie i zawroty głowy. W badaniu: HR 102/min, BP 100/60 mmHg (zwykle 140/90), temp. 37.6°C. Brzuch miękki, wyraźnie tkliwy i bolesny palpacyjnie w lewym dole biodrowym i lewym boku, perystaltyka zachowana, objawy otrzewnowe ujemne. W per rectum na rękawiczce obecna krew ze śluzem. Jaka jest Twoja natychmiastowa diagnoza różnicowa?",
        options: [
          {
            text: "Niedokrwienne zapalenie okrężnicy (Colitis ischaemica) – najczęstsza postać niedokrwienia przewodu pokarmowego, wywołana przejściowym spadkiem perfuzji krezkowej u pacjentki z miażdżycą po hipotonii wywołanej odwodnieniem.",
            correct: true,
            feedback: "Znakomicie! Niedokrwienne zapalenie okrężnicy (ischemic colitis) odpowiada za ok. 75% wszystkich przypadków niedokrwienia jelit. Typowa triada: podeszły wiek z czynnikami sercowo-naczyniowymi + nagły kurczowy ból w lewym dole biodrowym + parcie na stolec i krwawienie z dolnego odcinka przewodu pokarmowego w ciągu 24h. Epizod hipotonii (podwójna dawka diuretyku) to klasyczny czynnik spustowy (non-occlusive mesenteric ischemia – NOMI w obrębie mikrokrążenia okrężnicy)."
          },
          {
            text: "Ostre zapalenie wyrostka robaczkowego wymagające pilnego cięcia w prawym dole biodrowym.",
            correct: false,
            feedback: "Błąd! Objawy dotyczą lewego dołu biodrowego z krwawą biegunką, a nie prawego dołu biodrowego."
          },
          {
            text: "Choroba Leśniowskiego-Crohna o piorunującym początku w wieku 74 lat.",
            correct: false,
            feedback: "IBD rozpoczyna się zwykle u osób młodych i ma przebieg wielotygodniowy, podczas gdy tu mamy nagły incydent naczyniowy po epizodzie hipotonii."
          },
          {
            text: "Hemoroidy krwawiące I stopnia, zaleć czopki z kory dębu i wypisz chorą.",
            correct: false,
            feedback: "Hemoroidy dają jasnoczerwoną krew na papierze toaletowym bez ostrego bólu brzucha w lewym boku i bez tachykardii."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Anatomia krytyczna unaczynienia jelita – strefy działu wodnego (watershed areas)",
        desc: "Rezydent pyta Cię, dlaczego niedokrwienie okrężnicy dotyczy najczęściej lewej połowy jelita grubego, zwłaszcza zagięcia śledzionowego i połączenia esiczo-odbytniczego. Jakie punkty anatomiczne o skrajnie wrażliwym unaczynieniu musisz wskazać?",
        scenario: "Rezydent pyta Cię, dlaczego niedokrwienie okrężnicy dotyczy najczęściej lewej połowy jelita grubego, zwłaszcza zagięcia śledzionowego i połączenia esiczo-odbytniczego. Jakie punkty anatomiczne o skrajnie wrażliwym unaczynieniu musisz wskazać?",
        options: [
          {
            text: "Punkt Griffithsa (zagięcie śledzionowe – styk unaczynienia tętnicy krezkowej górnej SMA i dolnej IMA) oraz punkt Sudecka (połączenie esiczo-odbytnicze – styk ostatniej tętnicy esiczej i tętnicy odbytniczej górnej od IMA); są to strefy graniczne ('działu wodnego'), najbardziej podatne na spadek ciśnienia perfuzyjnego.",
            correct: true,
            feedback: "Perfekcyjna anatomia kliniczna! Klasyczne zagadnienie LEK: strefy działu wodnego (watershed areas): 1) Punkt Griffithsa (zagięcie śledzionowe) – na pograniczu dorzecza tętnicy okrężniczej środkowej (od SMA) i lewej (od IMA); 2) Punkt Sudecka – w okolicy przejścia esicy w odbytnicę. W stanach hipotonii krew jest centralizowana, a mikrokrążenie w tych punktach załamuje się jako pierwsze, prowadząc do niedokrwienia błony śluzowej."
          },
          {
            text: "Punkt McBurneya i punkt Lanza, ponieważ tam kończy się tętnica wątrobowa wspólna.",
            correct: false,
            feedback: "Punkty McBurneya i Lanza to punkty topograficzne rzutu wyrostka robaczkowego, niemające związku ze strefami działu wodnego okrężnicy."
          },
          {
            text: "Kątnica i wyrostek, ponieważ jelito grube nie posiada żadnych połączeń naczyniowych.",
            correct: false,
            feedback: "Błędne! Okrężnica posiada łuk brzeżny Drummonda, jednak w punktach Griffithsa i Sudecka jest on najwęższy lub nieciągły."
          },
          {
            text: "Tylko i wyłącznie dwunastnica w miejscu przejścia w jelito czcze (więzadło Treitza).",
            correct: false,
            feedback: "Niedokrwienne zapalenie okrężnicy dotyczy jelita grubego, a nie dwunastnicy."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Różnicowanie z ostrym niedokrwieniem krezki (AMI) i badania laboratoryjne",
        desc: "Kluczowym zadaniem na SOR jest odróżnienie niedokrwiennego zapalenia okrężnicy (ischemic colitis) od śmiertelnego ostrego niedokrwienia krezki (AMI - zator tętnicy krezkowej górnej SMA). Wyniki badań laboratoryjnych: Hb 13.8 g/dL, leukocytoza 13.5 G/L, CRP 24 mg/L, mleczany 1.4 mmol/L (norma <2.0 mmol/L). W badaniu fizykalnym brzuch jest miękki. Jak te dane pomagają w różnicowaniu?",
        scenario: "Kluczowym zadaniem na SOR jest odróżnienie niedokrwiennego zapalenia okrężnicy (ischemic colitis) od śmiertelnego ostrego niedokrwienia krezki (AMI - zator tętnicy krezkowej górnej SMA). Wyniki badań laboratoryjnych: Hb 13.8 g/dL, leukocytoza 13.5 G/L, CRP 24 mg/L, mleczany 1.4 mmol/L (norma <2.0 mmol/L). W badaniu fizykalnym brzuch jest miękki. Jak te dane pomagają w różnicowaniu?",
        options: [
          {
            text: "W ostrym niedokrwieniu krezki (AMI) ból jest skrajnie silny, nieproporcjonalny do ubogiego badania brzucha, a stężenie mleczanów gwałtownie rośnie wskutek zawału jelita cienkiego; w niedokrwiennym zapaleniu okrężnicy (IC) ból jest łagodniejszy, brzuch tkliwy w lewym boku, krew pojawia się szybko, a mleczany są zazwyczaj prawidłowe (zajęcie ograniczone do śluzówki okrężnicy).",
            correct: true,
            feedback: "Doskonale! W ostrym zatorze SMA pacjent wije się z bólu ('ból nieproporcjonalny do badania'), a martwica jelita cienkiego prowadzi do ciężkiej kwasicy mleczanowej. W niedokrwiennym zapaleniu okrężnicy proces dotyczy powierzchownych warstw ściany jelita grubego (śluzówka i podśluzówka), krwawienie pojawia się wcześnie, a mleczany i gazometria pozostają prawidłowe w postaci niezgorzelinowej."
          },
          {
            text: "Prawidłowy poziom mleczanów całkowicie wyklucza jakąkolwiek chorobę przewodu pokarmowego, pacjentkę można odesłać do domu.",
            correct: false,
            feedback: "Nieprawda! Prawidłowe mleczany są typowe dla początkowej postaci niedokrwiennego zapalenia okrężnicy, ale chora wymaga natychmiastowej diagnostyki i hospitalizacji."
          },
          {
            text: "Oba te stany są klinicznie nie do odróżnienia i zawsze wymagają natychmiastowej laparotomii.",
            correct: false,
            feedback: "Fałsz. Postać niezgorzelinowa IC w >80% przypadków leczy się z sukcesem zachowawczo, podczas gdy zator SMA wymaga natychmiastowej rewaskularyzacji naczyniowej."
          },
          {
            text: "Podwyższone CRP wskazuje wyłącznie na zapalenie płuc.",
            correct: false,
            feedback: "Błędna interpretacja."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Diagnostyka obrazowa – angio-TK jamy brzusznej i miednicy",
        desc: "Zlecasz pilną tomografię komputerową z dożylnym kontrastem (angio-TK fazy tętniczej i żylnej). Badanie wykazuje: 'Główne pnie tętnicze (pień trzewny, SMA, IMA) drożne bez cech zatoru. W obrębie zagięcia śledzionowego i okrężnicy zstępującej widoczne odcinkowe, symetryczne pogrubienie ściany jelita do 8 mm z warstwowym wzmocnieniem po kontraście (tzw. objaw tarczy strzelniczej / target sign) oraz pasmowatym odczynem zapalnym w tkance tłuszczowej. Brak wolnego gazu i płynu w jamie otrzewnej'. Jak interpretujesz ten wynik?",
        scenario: "Zlecasz pilną tomografię komputerową z dożylnym kontrastem (angio-TK fazy tętniczej i żylnej). Badanie wykazuje: 'Główne pnie tętnicze (pień trzewny, SMA, IMA) drożne bez cech zatoru. W obrębie zagięcia śledzionowego i okrężnicy zstępującej widoczne odcinkowe, symetryczne pogrubienie ściany jelita do 8 mm z warstwowym wzmocnieniem po kontraście (tzw. objaw tarczy strzelniczej / target sign) oraz pasmowatym odczynem zapalnym w tkance tłuszczowej. Brak wolnego gazu i płynu w jamie otrzewnej'. Jak interpretujesz ten wynik?",
        options: [
          {
            text: "Obraz potwierdza niedokrwienne zapalenie okrężnicy (obrzęk ściany jelita, objaw tarczy) bez cech zgorzeli pełnej grubości ściany czy perforacji, wykluczając jednocześnie zator głównych pni tętniczych krezki.",
            correct: true,
            feedback: "Znakomicie! Angio-TK jest kluczowym badaniem: wyklucza zator SMA oraz powikłania wymagające natychmiastowej operacji (pneumatosis intestinalis – pęcherzyki gazu w ścianie jelita, gaz w żyle wrotnej, perforacja). Pogrubienie ściany i objaw tarczy ('target sign' spowodowany obrzękiem warstwy podśluzówkowej) to typowy obraz nieokluzyjnego niedokrwienia okrężnicy."
          },
          {
            text: "Brak zatoru w pniach krezkowych oznacza, że chora symuluje objawy.",
            correct: false,
            feedback: "Niedokrwienne zapalenie okrężnicy to w 95% choroba małych naczyń i mikrokrążenia (NOMI), a nie zator dużego pnia!"
          },
          {
            text: "Pogrubienie ściany do 8 mm to dowód na raka złośliwego wymagającego natychmiastowej resekcji.",
            correct: false,
            feedback: "Odcinkowe, symetryczne pogrubienie ściany z objawem tarczy i obrzękiem tkanek w strefie działu wodnego jest typowe dla zapalenia niedokrwiennego, a nie raka."
          },
          {
            text: "Konieczne jest podanie barytu doodbytniczo.",
            correct: false,
            feedback: "Baryt w ostrym niedokrwieniu jest bezwzględnie przeciwwskazany."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Badanie endoskopowe – rola sigmoidoskopii i zasady bezpieczeństwa",
        desc: "Czy u tej pacjentki wskazana jest diagnostyka endoskopowa? Jeśli tak, jaki zakres badania wybierasz i jakich reguł bezpieczeństwa należy bezwzględnie przestrzegać wg wytycznych ACG (American College of Gastroenterology)?",
        scenario: "Czy u tej pacjentki wskazana jest diagnostyka endoskopowa? Jeśli tak, jaki zakres badania wybierasz i jakich reguł bezpieczeństwa należy bezwzględnie przestrzegać wg wytycznych ACG (American College of Gastroenterology)?",
        options: [
          {
            text: "Wskazana jest wczesna sigmoidoskopia (lub ostrożna niepełna kolonoskopia) w ciągu pierwszych 48 godzin, wykonana z minimalną insuflacją dwutlenkiem węgla (CO2) lub powietrzem, bez agresywnego przygotowania jelita, zatrzymana przy napotkaniu obszaru zgorzeli; badanie ocenia żywotność śluzówki i różnicuje z IBD czy infekcją.",
            correct: true,
            feedback: "Doskonale! Wczesna endoskopia (w ciągu 48h) jest 'złotym standardem' potwierdzenia rozpoznania: uwidacznia bladą, obrzękniętą śluzówkę z punktowymi wybroczynami, sinym zabarwieniem lub podłużnymi owrzodzeniami. Kluczowa zasada bezpieczeństwa: minimalna insuflacja (nadmierne ciśnienie w niedokrwionym jelicie może spowodować perforację lub pogłębić niedokrwienie!). Wystarcza sigmoidoskopia; nie wolno forsować pełnej kolonoskopii poza strefę zmian."
          },
          {
            text: "Bezwzględna pełna kolonoskopia z intubacją jelita krętego pod maksymalnym ciśnieniem powietrza po podaniu 4 litrów fosforanów.",
            correct: false,
            feedback: "Śmiertelnie niebezpieczne! Forsowna pełna kolonoskopia pod wysokim ciśnieniem powietrza grozi pęknięciem niedokrwionej ściany jelita i sepsą."
          },
          {
            text: "Endoskopia jest bezwzględnie zakazana w każdym przypadku podejrzenia niedokrwienia jelit.",
            correct: false,
            feedback: "Nieprawda. Jest przeciwwskazana tylko przy objawach zapalenia otrzewnej, martwicy ściany lub perforacji w TK."
          },
          {
            text: "Należy wykonać wyłącznie anoskopię lusterkiem.",
            correct: false,
            feedback: "Anoskopia nie sięga zagięcia śledzionowego ani esicy, nie wnosząc nic do diagnozy."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Strategia leczenia zachowawczego – optymalizacja hemodynamiczna",
        desc: "Endoskopia wykazała zasinienie i wybroczyny błony śluzowej zagięcia śledzionowego i proksymalnej esicy bez martwicy głębokiej. Pacjentka nie ma objawów otrzewnowych. Kwalifikujesz chorą do leczenia zachowawczego. Jakie elementy obejmuje prawidłowy protokół terapeutyczny?",
        scenario: "Endoskopia wykazała zasinienie i wybroczyny błony śluzowej zagięcia śledzionowego i proksymalnej esicy bez martwicy głębokiej. Pacjentka nie ma objawów otrzewnowych. Kwalifikujesz chorą do leczenia zachowawczego. Jakie elementy obejmuje prawidłowy protokół terapeutyczny?",
        options: [
          {
            text: "Ścisła dieta ścisła (spoczynek jelita), dożylna płynoterapia krystaloidowa w celu przywrócenia prawidłowego rzutu serca i ciśnienia perfuzyjnego, natychmiastowe odstawienie leków wazokonstrykcyjnych i diuretyków, tlenoterapia oraz dożylna antybiotykoterapia o szerokim spektrum (np. ceftriakson + metronidazol) zapobiegająca translokacji bakteryjnej.",
            correct: true,
            feedback: "Znakomicie! W postaci przemijającej/niezgorzelinowej (ponad 80% przypadków) leczenie zachowawcze jest w pełni skuteczne. Kluczowe jest usunięcie przyczyny niedokrwienia: nawodnienie, wyrównanie ciśnienia tętniczego, odstawienie leków obkurczających naczynia (np. digoksyna, beta-blokery w wysokich dawkach) i odwadniających. Antybiotyki chronią przed sepsą wywołaną przerwaniem bariery śluzówkowej."
          },
          {
            text: "Podanie wysokich dawek wazopresyny i adrenaliny w celu obkurczenia naczyń i zatamowania krwawienia ze śluzówki.",
            correct: false,
            feedback: "Katastrofalny błąd! Wazokonstryktory pogłębią niedokrwienie krezkowe i doprowadzą do zgorzeli całego jelita!"
          },
          {
            text: "Zalecenie natychmiastowego obfitego żywienia doustnego bogatotłuszczowego.",
            correct: false,
            feedback: "Obciążenie pokarmowe niedokrwionego jelita nasila ból, zapotrzebowanie metaboliczne i ryzyko martwicy."
          },
          {
            text: "Natychmiastowe wdrożenie fibrynolizy dożylnej alteplazą (rtPA).",
            correct: false,
            feedback: "Przeciwwskazane! Spowodowałoby to masywny krwotok z uszkodzonej śluzówki okrężnicy."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Monitorowanie i kryteria konwersji do leczenia operacyjnego",
        desc: "Podczas pobytu na oddziale chirurgii prowadzisz ścisły nadzór kliniczny. Jakie objawy alarmowe ('czerwone flagi') wskazują na niepowodzenie leczenia zachowawczego, progresję do zgorzeli ściany jelita i konieczność natychmiastowej laparotomii ratunkowej?",
        scenario: "Podczas pobytu na oddziale chirurgii prowadzisz ścisły nadzór kliniczny. Jakie objawy alarmowe ('czerwone flagi') wskazują na niepowodzenie leczenia zachowawczego, progresję do zgorzeli ściany jelita i konieczność natychmiastowej laparotomii ratunkowej?",
        options: [
          {
            text: "Pojawienie się objawów otrzewnowych (obrona mięśniowa, objaw Blumberga), narastanie leukocytozy >20 G/L, kwasica mleczanowa, niestabilność hemodynamiczna (wstrząs septyczny), masywne niekontrolowane krwawienie lub cechy gazu w ścianie jelita / odmy otrzewnowej w kontrolnym badaniu obrazowym.",
            correct: true,
            feedback: "Znakomicie! Około 15-20% chorych rozwija zgorzelinową postać niedokrwienia (gangrenous colitis). Śmiertelność w tej grupie przekracza 50%. Wystąpienie 'ostrego brzucha' z objawami otrzewnowymi i wzrostem mleczanów oznacza martwicę pełnej grubości ściany jelita (transmural necrosis) i jest bezwzględnym wskazaniem do natychmiastowej laparotomii z resekcją martwiczego odcinka jelita."
          },
          {
            text: "Ustąpienie bólu brzucha i normalizacja tętna.",
            correct: false,
            feedback: "To objawy poprawy klinicznej, a nie wskazanie do operacji!"
          },
          {
            text: "Pojawienie się prawidłowego stolca w 4. dobie.",
            correct: false,
            feedback: "Świadczy o regeneracji błony śluzowej."
          },
          {
            text: "Pojedynczy epizod czkawki.",
            correct: false,
            feedback: "Czkawka nie jest kryterium zgorzeli jelita."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Powikłania późne i zapobieganie nawrotom przy wypisie",
        desc: "U naszej pacjentki leczenie zachowawcze przyniosło pełny sukces – w 5. dobie ból ustąpił, krwawienie ustało, chora toleruje dietę lekkostrawną. Jakie późne powikłanie może rozwinąć się po kilku tygodniach/miesiącach w miejscu zagojonego niedokrwienia i jak należy temu zapobiegać?",
        scenario: "U naszej pacjentki leczenie zachowawcze przyniosło pełny sukces – w 5. dobie ból ustąpił, krwawienie ustało, chora toleruje dietę lekkostrawną. Jakie późne powikłanie może rozwinąć się po kilku tygodniach/miesiącach w miejscu zagojonego niedokrwienia i jak należy temu zapobiegać?",
        options: [
          {
            text: "Późne zwężenie pozapalne okrężnicy (ischemic stricture) na skutek włóknienia ściany, manifestujące się nawracającymi zaparciami lub podniedrożnością (wymaga kontrolnej kolonoskopii po 2-3 miesiącach); profilaktyka polega na optymalizacji leczenia krążeniowego, unikaniu odwodnienia i hipotonii.",
            correct: true,
            feedback: "Wybitnie! Klasyczne powikłanie późne opisywane w podręcznikach chirurgii i pytaniach LEK: gojenie głębszego niedokrwienia wiąże się z odkładaniem kolagenu i włóknieniem podśluzówki, co u 10-15% chorych prowadzi do powstania zwężenia niedokrwiennego (stricture) dającego objawy przewlekłej podniedrożności. Wymaga to planowej kontroli endoskopowej i w razie potrzeby poszerzenia balonowego lub odcinkowej resekcji. Profilaktyka wtórna to unikanie gwałtownych spadków ciśnienia tętniczego i odwodnienia."
          },
          {
            text: "Transformacja w raka drobnokomórkowego płuc w ciągu 30 dni.",
            correct: false,
            feedback: "Absurdalny brak związku biologicznego."
          },
          {
            text: "Konieczność usunięcia całego żołądka z powodu braku apetytu.",
            correct: false,
            feedback: "Niedokrwienne zapalenie okrężnicy nie dotyczy żołądka."
          },
          {
            text: "Brak jakichkolwiek możliwych powikłań, pacjentka ma gwarancję braku nawrotu.",
            correct: false,
            feedback: "Nawrót jest możliwy przy kolejnym epizodzie hipotonii sercowej lub odwodnienia."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 140: Pęknięty tętniak aorty brzusznej (rAAA)
  // ==========================================
  await upgradeCase('140_pekniety_tetniak_aorty_brzusznej_raaa.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena w obszarze resuscytacyjnym SOR – 71-letni mężczyzna we wstrząsie z bólem pleców",
        desc: "Zespół Ratownictwa Medycznego przywozi na kodzie czerwonym 71-letniego mężczyznę, wieloletniego palacza tytoniu z nadciśnieniem tętniczym. Przed godziną, podczas prac w ogrodzie, u pacjenta wystąpił nagły, rozdzierający ból w okolicy lędźwiowo-krzyżowej promieniujący do podbrzusza i lewej pachwiny, po czym chory osunął się na ziemię i na chwilę stracił przytomność. W kardiomonitorze: HR 122/min (tachykardia zatokowa), BP 78/45 mmHg, SpO2 93%, RR 26/min, skóra blada, pokryta zimnym, lepkim potem. Brzuch wzdęty, bolesny w śródbrzuszu, z wyczuwalnym dużym, tętniącym synchronicznie z sercem, bolesnym oporem powyżej pępka. Jaka jest Twoja natychmiastowa diagnoza kliniczna?",
        scenario: "Zespół Ratownictwa Medycznego przywozi na kodzie czerwonym 71-letniego mężczyznę, wieloletniego palacza tytoniu z nadciśnieniem tętniczym. Przed godziną, podczas prac w ogrodzie, u pacjenta wystąpił nagły, rozdzierający ból w okolicy lędźwiowo-krzyżowej promieniujący do podbrzusza i lewej pachwiny, po czym chory osunął się na ziemię i na chwilę stracił przytomność. W kardiomonitorze: HR 122/min (tachykardia zatokowa), BP 78/45 mmHg, SpO2 93%, RR 26/min, skóra blada, pokryta zimnym, lepkim potem. Brzuch wzdęty, bolesny w śródbrzuszu, z wyczuwalnym dużym, tętniącym synchronicznie z sercem, bolesnym oporem powyżej pępka. Jaka jest Twoja natychmiastowa diagnoza kliniczna?",
        options: [
          {
            text: "Pęknięty tętniak aorty brzusznej (rAAA - Ruptured Abdominal Aortic Aneurysm) ze wstrząsem hipowolemicznym/krwotocznym – stan bezpośredniego zagrożenia życia wymagający natychmiastowego wdrożenia protokołu ratunkowego.",
            correct: true,
            feedback: "Znakomicie! Klasyczna triada pękniętego tętniaka aorty brzusznej (występująca u ok. 50% chorych): 1) Nagły, silny ból brzucha lub okolicy lędźwiowej; 2) Wstrząs/hipotonia (często z omdleniem); 3) Wyczuwalny palpacyjnie, tętniący guz w jamie brzusznej. Śmiertelność całkowita przekracza 80%, a każda minuta zwłoki dramatycznie pogarsza rokowanie."
          },
          {
            text: "Ostra kolka nerkowa lewostronna, zlecasz drotawerynę (No-Spę) i ketoprofen i.v. i kierujesz do poradni urologicznej.",
            correct: false,
            feedback: "Śmiertelna pomyłka! Ból w okolicy lędźwiowej promieniujący do pachwiny z hipotonią i tętniącym guzem to NIE kolka nerkowa. Pomyłka rAAA z kolką nerkową to jedna z najczęstszych przyczyn zgonów z powodu błędu diagnostycznego na SOR!"
          },
          {
            text: "Ostre zapalenie trzustki wywołane alkoholem, kierujesz na USG jamy brzusznej w trybie planowym.",
            correct: false,
            feedback: "Tętniący guz i nagły spadek ciśnienia z rozdzierającym bólem pleców u starszego mężczyzny wskazują na pęknięcie aorty, a nie zapalenie trzustki."
          },
          {
            text: "Zawał ściany dolnej serca, zlecasz aspirynę, heparynę i tikagrelor.",
            correct: false,
            feedback: "Podanie pełnej dawki leków przeciwkrzepliwych i przeciwpłytkowych u chorego z pękniętym tętniakiem aorty wywołałoby natychmiastowe śmiertelne wykrwawienie!"
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Przyłóżkowe badanie ultrasonograficzne (POCUS / FAST aorty)",
        desc: "Podczas gdy pielęgniarki zakładają wkłucia, przykładasz głowicę konweksową w linii pośrodkowej nadbrzusza. Uwidaczniasz aortę brzuszną o maksymalnym wymiarze poprzecznym 78 mm z obecnością skrzepliny przyściennej oraz przerwanie ciągłości ściany tylno-bocznej z krwiakiem zaotrzewnowym. Jakie natychmiastowe wnioski wyciągasz z tego badania?",
        scenario: "Podczas gdy pielęgniarki zakładają wkłucia, przykładasz głowicę konweksową w linii pośrodkowej nadbrzusza. Uwidaczniasz aortę brzuszną o maksymalnym wymiarze poprzecznym 78 mm z obecnością skrzepliny przyściennej oraz przerwanie ciągłości ściany tylno-bocznej z krwiakiem zaotrzewnowym. Jakie natychmiastowe wnioski wyciągasz z tego badania?",
        options: [
          {
            text: "Przyłóżkowe USG jednoznacznie potwierdza obecność tętniaka aorty brzusznej (średnica >30 mm, tu 78 mm) i cechy pęknięcia; u niestabilnego chorego stanowi wystarczającą podstawę do natychmiastowego zaalarmowania naczyniowego zespołu operacyjnego bez konieczności opóźniania leczenia.",
            correct: true,
            feedback: "Znakomicie! POCUS aorty brzusznej ma czułość bliską 98-100% w wykrywaniu obecności tętniaka (norma aorty <20 mm, tętniak >=30 mm). U pacjenta we wstrząsie z tętniakiem >5 cm i bólem lędźwi diagnoza rAAA jest pewna i nie wolno tracić czasu na zbędne badania, jeśli chory dekompensuje się hemodynamicznie."
          },
          {
            text: "USG wyklucza pęknięcie, ponieważ przy pęknięciu aorta powinna się całkowicie zapaść i być niewidoczna.",
            correct: false,
            feedback: "Błędne rozumienie! Tętniak aorty pozostaje poszerzony, a widoczna skrzeplina i krwiak zaotrzewnowy potwierdzają katastrofę naczyniową."
          },
          {
            text: "Wymiar 78 mm to norma dla mężczyzny powyżej 70. roku życia.",
            correct: false,
            feedback: "Norma aorty podnerkowej wynosi poniżej 20 mm. Średnica 78 mm to olbrzymi tętniak o skrajnym ryzyku pęknięcia."
          },
          {
            text: "Konieczne jest natychmiastowe wykonanie urografii z kontrastem jodowym.",
            correct: false,
            feedback: "Urografia jest przestarzała, nieprzydatna i śmiertelnie opóźniłaby ratunek."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Strategia resuscytacji płynowej – hipotensja permisywna (Permissive Hypotension)",
        desc: "Pielęgniarka przygotowuje 2 butelki 0.9% NaCl i pyta, czy wdrożyć szybki wlew pod ciśnieniem, aby podnieść ciśnienie skurczowe do 130 mmHg. Jakie są aktualne wytyczne ESVS (European Society for Vascular Surgery) dotyczące resuscytacji płynowej w podejrzeniu pękniętego tętniaka aorty?",
        scenario: "Pielęgniarka przygotowuje 2 butelki 0.9% NaCl i pyta, czy wdrożyć szybki wlew pod ciśnieniem, aby podnieść ciśnienie skurczowe do 130 mmHg. Jakie są aktualne wytyczne ESVS (European Society for Vascular Surgery) dotyczące resuscytacji płynowej w podejrzeniu pękniętego tętniaka aorty?",
        options: [
          {
            text: "Zastosowanie ścisłej hipotensji permisywnej (kontrolowanej hipotensji): docelowe ciśnienie skurczowe SBP 70-90 mmHg (MAP ok. 60-65 mmHg) wystarczające do zachowania przytomności chorego; unika się agresywnej płynoterapii, aby nie 'wypchnąć skrzepu' (pop the clot) tamponującego pęknięcie w przestrzeni zaotrzewnowej i nie nasilić koagulopatii z rozcieńczenia.",
            correct: true,
            feedback: "Genialnie! Zasada 'hipotensji permisywnej' (permissive hypotension) w rAAA to fundament nowoczesnej medycyny ratunkowej i częste pytanie LEK. Większość tętniaków pęka do przestrzeni zaotrzewnowej, gdzie krążenie jest częściowo tamponowane przez otaczające tkanki. Agresywny wlew płynów podnoszący ciśnienie >100 mmHg wypłukuje powstały skrzep, niszczy tamponadę biologiczną i prowadzi do natychmiastowego zgonu z wykrwawienia do wolnej jamy otrzewnej!"
          },
          {
            text: "Agresywna resuscytacja 3 litrami płynów w 15 minut, celując w ciśnienie skurczowe >140 mmHg.",
            correct: false,
            feedback: "Zabójczy błąd! Doprowadzi do rozerwania krwiaka zaotrzewnowego, masywnego krwotoku i zgonu na SOR."
          },
          {
            text: "Podanie natychmiast wlewu z dopaminy i fenylefryny bez przetaczania krwi.",
            correct: false,
            feedback: "Leki wazopresyjne w niewyrównanym krwotoku są błędem sztuki."
          },
          {
            text: "Całkowite wstrzymanie jakichkolwiek działań i oczekiwanie na przyjazd rodziny.",
            correct: false,
            feedback: "Absurdalne postępowanie w stanie bezpośredniego zagrożenia życia."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Uruchomienie protokołu masywnej transfuzji (MTP) i zaopatrzenie dostępu naczyniowego",
        desc: "Jakie działania organizacyjne i transfuzjologiczne podejmujesz w tym samym czasie?",
        scenario: "Jakie działania organizacyjne i transfuzjologiczne podejmujesz w tym samym czasie?",
        options: [
          {
            text: "Uruchamiasz Protokół Masywnej Transfuzji (MTP) w proporcji 1:1:1 (KKCz : FFP : KKP), zamawiasz natychmiast krew jednoimienną lub O RhD ujemną bez próby zgodności (krew ratunkowa), podajesz kwas traneksamowy (TXA 1 g i.v.), pobierasz krew na próbę krzyżową i natychmiast alarmujesz dyżurnego chirurga naczyniowego i zespół anestezjologiczny bloku operacyjnego.",
            correct: true,
            feedback: "Prawidłowo! W masywnym krwotoku z rAAA wdrożenie MTP w zbilansowanej proporcji 1:1:1 zapobiega tzw. 'triadzie śmierci' (kwasica, hipotermia, koagulopatia). Kwas traneksamowy hamuje fibrynolizę. Równoległe powiadomienie sali hybrydowej/operacyjnej jest bezwzględnym priorytetem."
          },
          {
            text: "Czekasz 60 minut na pełną próbę krzyżową z banku krwi przed podaniem jakichkolwiek preparatów krwiopochodnych.",
            correct: false,
            feedback: "Chory z pękniętym tętniakiem aorty wykrwawi się na śmierć w ciągu kilkunastu minut – w sytuacji zagrożenia życia podaje się krew ratunkową O RhD-!"
          },
          {
            text: "Przetaczasz wyłącznie 20% roztwór mannitolu.",
            correct: false,
            feedback: "Mannitol to diuretyk osmotyczny stosowany w obrzęku mózgu, we wstrząsie krwotocznym doprowadziłby do załamania krążenia."
          },
          {
            text: "Zlecasz lewatywę oczyszczającą, aby opróżnić jelita przed operacją.",
            correct: false,
            feedback: "Niedopuszczalne i śmiertelnie niebezpieczne!"
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Kwalifikacja do badania angio-TK a stan hemodynamiczny",
        desc: "Dzięki ostrożnej płynoterapii i hipotensji permisywnej pacjent jest przytomny, a ciśnienie wynosi 85/50 mmHg. Dyżurny naczyniowiec pyta, czy chory może zjechać do pracowni TK na pilną angio-TK aorty (angio-CT), czy powinien jechać bezpośrednio na blok operacyjny. Jak brzmi współczesny standard postępowania wg wytycznych ESVS?",
        scenario: "Dzięki ostrożnej płynoterapii i hipotensji permisywnej pacjent jest przytomny, a ciśnienie wynosi 85/50 mmHg. Dyżurny naczyniowiec pyta, czy chory może zjechać do pracowni TK na pilną angio-TK aorty (angio-CT), czy powinien jechać bezpośrednio na blok operacyjny. Jak brzmi współczesny standard postępowania wg wytycznych ESVS?",
        options: [
          {
            text: "Jeśli pacjent jest przytomny i stabilny w reżimie hipotensji permisywnej (SBP 70-90 mmHg), natychmiastowe wykonanie pilnej angio-TK aorty jest bezwzględnie zalecane, ponieważ pozwala ocenić anatomię szyi tętniaka i zakwalifikować chorego do małoinwazyjnego zaopatrzenia wewnątrznaczyniowego (rEVAR), które wiąże się ze znacznie niższą śmiertelnością okołooperacyjną niż otwarta laparotomia.",
            correct: true,
            feedback: "Wybitnie! Aktualne wytyczne ESVS (European Society for Vascular Surgery): u każdego chorego z rAAA, który jest choć minimalnie stabilny (przytomny, SBP >70 mmHg), należy dążyć do natychmiastowej angio-TK ('door-to-CT time' <15-20 min). Pozwala to ocenić, czy anatomia naczyniowa umożliwia implantację stentgraftu (rEVAR – ruptured Endovascular Aneurysm Repair). rEVAR zmniejsza śmiertelność szpitalną z ok. 35-45% do poniżej 20%! Jedynie pacjent w głębokim, zatrzymującym się wstrząsie (agastric, nieprzytomny) jedzie na stół bez TK."
          },
          {
            text: "Nawet przy stabilnym ciśnieniu tomografia jest zawsze bezwzględnie zakazana i każdy pacjent musi mieć natychmiast rozcięty brzuch od mostka do spojenia.",
            correct: false,
            feedback: "Przestarzałe podejście! Otwarta operacja w rAAA wiąże się z ogromną śmiertelnością. Dziś dąży się do rEVAR po szybkiej TK u każdego, u kogo jest to bezpiecznie wykonalne."
          },
          {
            text: "TK wykonuje się dopiero po 24 godzinach od operacji otwartej.",
            correct: false,
            feedback: "TK przed zabiegiem decyduje o wyborze metody operacji (rEVAR vs open)."
          },
          {
            text: "Kierujesz pacjenta na rezonans magnetyczny (MRI) trwający 90 minut.",
            correct: false,
            feedback: "MRI jest zbyt wolne i całkowicie nieprzydatne w ostrej katastrofie naczyniowej."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Wybór metody leczenia zabiegowego – rEVAR vs operacja otwarta (OR)",
        desc: "W pilnej angio-TK stwierdzono: podnerkowy tętniak aorty o średnicy 78 mm z rozerwaniem lewej ściany i rozległym krwiakiem w przestrzeni zaotrzewnowej. Szyja tętniaka ma długość 22 mm, średnicę 24 mm, kątowanie <45°, tętnice biodrowe drożne o prawidłowej średnicy (anatomia korzystna dla stentgraftu). Pacjent w znieczuleniu miejscowym/ogólnym trafia na salę hybrydową. Jaka metoda jest metodą z wyboru?",
        scenario: "W pilnej angio-TK stwierdzono: podnerkowy tętniak aorty o średnicy 78 mm z rozerwaniem lewej ściany i rozległym krwiakiem w przestrzeni zaotrzewnowej. Szyja tętniaka ma długość 22 mm, średnicę 24 mm, kątowanie <45°, tętnice biodrowe drożne o prawidłowej średnicy (anatomia korzystna dla stentgraftu). Pacjent w znieczuleniu miejscowym/ogólnym trafia na salę hybrydową. Jaka metoda jest metodą z wyboru?",
        options: [
          {
            text: "Wewnątrznaczyniowe zaopatrzenie pękniętego tętniaka (rEVAR - ruptured Endovascular Aneurysm Repair) z implantacją bifurkacyjnego stentgraftu aortalnego przez nakłucie tętnic udowych wspólnych, ewentualnie z użyciem balonu okluzyjnego REBOA w aorcie piersiowej w razie nagłego załamania ciśnienia.",
            correct: true,
            feedback: "Znakomicie! Wytyczne ESVS preferują rEVAR nad operacją otwartą u chorych z korzystną anatomią, o ile ośrodek dysponuje odpowiednim sprzętem i doświadczeniem. rEVAR eliminuje konieczność rozległej laparotomii, klemowania aorty i masywnego urazu operacyjnego. W razie nagłego krwotoku w trakcie zabiegu można wprowadzić balon okluzyjny REBOA (Resuscitative Endovascular Balloon Occlusion of the Aorta) do aorty zstępującej strefy I celem natychmiastowego zatamowania dopływu krwi."
          },
          {
            text: "Wyłącznie operacja otwarta z szeroką laparotomią i podwiązaniem aorty bez wszczepiania żadnej protezy.",
            correct: false,
            feedback: "Podwiązanie aorty bez rekonstrukcji doprowadziłoby do martwicy obu kończyn dolnych i narządów miednicy!"
          },
          {
            text: "Założenie gorsetu ortopedycznego i leczenie ułożeniowe.",
            correct: false,
            feedback: "Niedorzeczne."
          },
          {
            text: "Odcinkowa resekcja jelita cienkiego, bo krew uciska krezkę.",
            correct: false,
            feedback: "Błąd – problemem jest pęknięta aorta, a nie jelito cienkie."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Śródoperacyjna i pooperacyjna kontrola powikłań – Zespół ciasnoty wewnątrzbrzusznej (ACS)",
        desc: "Stentgraft został pomyślnie rozprężony na sali hybrydowej, uzyskując pełne wyłączenie tętniaka z krążenia bez przecieków (endoleak). Chory trafia na OIT. W 6. godzinie po zabiegu pielęgniarka zauważa narastające wzdęcie i stwardnienie brzucha, spadek diurezy do 10 ml/h oraz wzrost szczytowych ciśnień w respiratorze. Ciśnienie w pęcherzu moczowym mierzone przez cewnik Foleya wynosi 26 mmHg. Jakie groźne powikłanie rozpoznajesz?",
        scenario: "Stentgraft został pomyślnie rozprężony na sali hybrydowej, uzyskując pełne wyłączenie tętniaka z krążenia bez przecieków (endoleak). Chory trafia na OIT. W 6. godzinie po zabiegu pielęgniarka zauważa narastające wzdęcie i stwardnienie brzucha, spadek diurezy do 10 ml/h oraz wzrost szczytowych ciśnień w respiratorze. Ciśnienie w pęcherzu moczowym mierzone przez cewnik Foleya wynosi 26 mmHg. Jakie groźne powikłanie rozpoznajesz?",
        options: [
          {
            text: "Zespół ciasnoty wewnątrzbrzusznej (ACS - Abdominal Compartment Syndrome) z nadciśnieniem śródbrzusznym (IAH stopnia IV, IAP >25 mmHg) powikłany oligurią i niewydolnością oddechową; wymaga natychmiastowej dekompresji chirurgicznej (laparotomii odbarczającej z otwartym brzuchem / laparostomią).",
            correct: true,
            feedback: "Wybitnie! ACS to jedno z najcięższych powikłań po leczeniu rAAA (występuje zarówno po operacji otwartej, jak i rEVAR wskutek obrzęku trzewi i masywnego krwiaka zaotrzewnowego). Złoty standard rozpoznania: pomiar ciśnienia w pęcherzu moczowym (prawidłowo <12 mmHg, ACS definiuje ciśnienie śródbrzuszne IAP >20 mmHg z nowo powstałą dysfunkcją narządową: skąpomoczem, hiperkapnią/wzrostem ciśnień wentylacji). Leczeniem z wyboru w zaawansowanym ACS niereagującym na leczenie zachowawcze jest ratunkowa laparotomia odbarczająca!"
          },
          {
            text: "Zwykłe pooperacyjne zatrzymanie moczu, wystarczy przepłukać cewnik 50 ml soli.",
            correct: false,
            feedback: "Błąd! Ciśnienie śródbrzuszne 26 mmHg i wysokie ciśnienia w drogach oddechowych to uogólniony zespół ciasnoty, a nie zagięty cewnik."
          },
          {
            text: "Odmę opłucnową prawostronną wymagającą drenażu klatki piersiowej.",
            correct: false,
            feedback: "Problem zlokalizowany jest w jamie brzusznej (narastający krwiak i obrzęk jelit)."
          },
          {
            text: "Zawał mięśnia sercowego, podaj streptokinazę.",
            correct: false,
            feedback: "Podanie leków trombolitycznych po operacji tętniaka wywoła śmiertelny krwotok."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Opieka odległa, monitorowanie stentgraftu i badania przesiewowe w rodzinie",
        desc: "Po odbarczeniu i 14 dniach intensywnej terapii pacjent w stanie stabilnym zostaje przeniesiony na oddział chirurgii naczyniowej celem przygotowania do wypisu. Jakie zalecenia dotyczące monitorowania stentgraftu oraz profilaktyki tętniaków u krewnych pacjenta musisz przekazać zgodnie z wytycznymi?",
        scenario: "Po odbarczeniu i 14 dniach intensywnej terapii pacjent w stanie stabilnym zostaje przeniesiony na oddział chirurgii naczyniowej celem przygotowania do wypisu. Jakie zalecenia dotyczące monitorowania stentgraftu oraz profilaktyki tętniaków u krewnych pacjenta musisz przekazać zgodnie z wytycznymi?",
        options: [
          {
            text: "Dożywotni nadzór obrazowy nad stentgraftem (angio-TK po 1 i 12 miesiącach, następnie coroczne USG Doppler z kontrastem CEUS) w celu wykrywania przecieków (endoleak typu I-V) oraz zalecenie wykonania przesiewowego USG aorty brzusznej u męskich krewnych I stopnia (synowie, bracia) po ukończeniu 50.-55. roku życia z uwagi na silną predyspozycję genetyczną.",
            correct: true,
            feedback: "Perfekcyjna kompleksowa wiedza kliniczna! Pacjenci po rEVAR wymagają dożywotniego monitorowania z uwagi na ryzyko przecieków (zwłaszcza nieszczelności na końcach mocowania - endoleak typu I i III, grożących ponownym pęknięciem). Ponadto tętniak aorty brzusznej wykazuje silne uwarunkowanie rodzinne – krewni I stopnia (szczególnie mężczyźni) mają 4-krotnie wyższe ryzyko AAA, dlatego wytyczne ESVS/AHA bezwzględnie zalecają u nich przesiewowe USG aorty!"
          },
          {
            text: "Zapewnienie pacjenta, że jest trwale wyleczony i nie wymaga już nigdy żadnych badań obrazowych ani kontroli u chirurga naczyniowego.",
            correct: false,
            feedback: "Niebezpieczny błąd! Przecieki (endoleak) po EVAR mogą rozwijać się bezobjawowo i doprowadzić do ponownego pęknięcia aorty po wielu miesiącach lub latach."
          },
          {
            text: "Zalecenie natychmiastowego powrotu do palenia tytoniu, bo nikotyna wzmacnia ścianę aorty.",
            correct: false,
            feedback: "Palenie tytoniu jest najsilniejszym czynnikiem przyspieszającym wzrost i pękanie tętniaków!"
          },
          {
            text: "Krewni pacjenta nie muszą się badać, ponieważ tętniaki aorty są chorobą zakaźną przenoszoną przez komary.",
            correct: false,
            feedback: "Absurdalne twierdzenie."
          }
        ]
      }
    ];
  });

  console.log("Cases 137-140 upgrade completed successfully!");
}

run().catch(err => {
  console.error("Error upgrading cases 137-140:", err);
  process.exit(1);
});

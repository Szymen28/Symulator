const fs = require('fs');
const { encryptStringAes } = require('./encrypt_case.js');
const PASSWORD = '@LEKSzymon28111999';

const cases = [
  // 137: Pęknięcie śledziony w urazie tępym brzucha
  {
    id: 137,
    filename: "137_pekniecie_sledziony_uraz.json",
    dept: "Chirurgia",
    shortTitle: "28-letni kierowca po wypadku komunikacyjnym – Tępy uraz brzucha, ból lewego podżebrza promieniujący do lewego barku (objaw Kehra) i krwawienie dootrzewnowe",
    diagnosisTitle: "Pęknięcie śledziony (Ruptura lienis / Splenic injury grade III/IV) z krwawieniem do jamy otrzewnej po tępym urazie brzucha",
    vitals: [
      { label: "HR", val: "118/min", sub: "Tachykardia kompensacyjna", status: "bad" },
      { label: "BP", val: "94/58 mmHg", sub: "Hipotonia ortostatyczna / wstrząs I/II st.", status: "warn" },
      { label: "SpO2", val: "97%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "22/min", sub: "Nieznacznie przyspieszony", status: "warn" },
      { label: "Temp", val: "36.4°C", sub: "Prawidłowa", status: "ok" }
    ],
    vitalsObj: { hr: 118, bp: "94/58", spo2: 97, rr: 22, temp: 36.4 },
    story: "28-letni mężczyzna, kierowca samochodu osobowego, zapięty w pasy bezpieczeństwa, uległ zderzeniu bocznemu (uderzenie w drzwi kierowcy). Został przywieziony na SOR przez ZRM w kołnierzu ortopedycznym i na desce ortopedycznej. Zgłasza ból w lewym podżebrzu, nasilający się przy głębszym wdechu, oraz bolesność lewego barku (objaw Kehra). W badaniu fizykalnym: otarcia naskórka i podbiegnięcia krwawe dolnej części lewej połowy klatki piersiowej i lewego podżebrza. Brzuch nieco wzdęty, bolesny w lewym podżebrzu i lewym boku, wyczuwalny opór mięśniowy (obrona mięśniowa), stłumienie odgłosu opukowego w lewym boku, które nie przemieszcza się przy zmianie pozycji ciała (objaw Saegessera / objaw Ballance'a). GCS 15.",
    labs: [
      {
        category: "Morfologia i gazometria CITO",
        items: [
          { name: "Hemoglobina (Hb)", val: "9.8 g/dL (w dynamice spadek z 12.5 w ZRM)", norm: "13.5–17.5 g/dL", flag: "L" },
          { name: "Hematokryt (Hct)", val: "29%", norm: "40–52%", flag: "L" },
          { name: "Płytki krwi (PLT)", val: "165 G/L", norm: "150–400 G/L", flag: "N" },
          { name: "Mleczany w gazometrii", val: "3.4 mmol/L", norm: "0.5–2.0 mmol/L", flag: "H" },
          { name: "Grupa krwi i próba krzyżowa", val: "Pobrano na cito (zabezpieczono 4 jedn. KKCz)", norm: "Wykonano", flag: "N" }
        ]
      },
      {
        category: "Biochemia i koagulologia",
        items: [
          { name: "INR / APTT", val: "1.15 / 29 s", norm: "0.9–1.2 / 26–36 s", flag: "N" },
          { name: "Fibrynogen", val: "2.8 g/L", norm: "2.0–4.0 g/L", flag: "N" },
          { name: "Kreatynina / Mocznik", val: "0.9 mg/dL / 28 mg/dL", norm: "0.7–1.2 / 15–45 mg/dL", flag: "N" },
          { name: "Aminotransferazy (ALT/AST)", val: "28 / 34 IU/L", norm: "< 41 IU/L", flag: "N" }
        ]
      },
      {
        category: "Badania obrazowe CITO (eFAST i TK)",
        items: [
          { name: "USG eFAST na SOR", val: "Dodatni: wolny płyn (krew) w przestrzeni podprzeponowej lewej (okolica okołośledzionowa) oraz w zachyłku Morisona i w miednicy mniejszej", norm: "Brak wolnego płynu", flag: "H" },
          { name: "TK jamy brzusznej z kontrastem (po stabilizacji)", val: "Pęknięcie miąższu śledziony głębokości >3 cm z krwiakiem podtorebkowym obejmującym >50% powierzchni (stopień III/IV wg AAST), bez aktywnego wynaczynienia kontrastu (no active blush)", norm: "Śledziona bez zmian pourazowych", flag: "H" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Wstępna ocena ATLS i USG FAST",
        task: "Jaki jest pierwszy krok diagnostyczny w ocenie obecności krwi w jamie brzusznej u pacjenta po tępym urazie tułowia na SOR?",
        options: [
          { text: "Wykonanie protokołu FAST / eFAST (Focused Assessment with Sonography for Trauma) przyłóżkowo", correct: true, feedback: "Prawidłowo! USG FAST jest szybkim, nieinwazyjnym standardem ATLS do natychmiastowego wykrycia wolnego płynu (krwi) w worku osierdziowym, jamach opłucnowych, zachyłku wątrobowo-nerkowym (Morisona), okołośledzionowym i miednicy mniejszej." },
          { text: "Natychmiastowa laparotomia zwiadowcza u każdego stabilnego pacjenta", correct: false, feedback: "Stabilny pacjent wymaga najpierw szybkiej diagnostyki (FAST, ew. Angio-TK)." },
          { text: "Nakłucie jamy otrzewnej igłą w ciemno (laparocenteza)", correct: false, feedback: "Metoda historyczna, obecnie zastąpiona przez USG FAST." },
          { text: "Zlecenie wlewu doodbytniczego z barytem", correct: false, feedback: "Baryt jest bezwzględnie przeciwwskazany w urazach i ostrym brzuchu." }
        ]
      },
      {
        num: 2,
        title: "Patofizjologia objawu Kehra",
        task: "Dlaczego pacjent z uszkodzeniem śledziony zgłasza ból promieniujący do lewego barku (objaw Kehra)?",
        options: [
          { text: "Podrażnienie lewej kopuły przepony przez krew podprzeponową stymuluje nerw przeponowy (korzenie C3–C5), co wywołuje ból rzutowany do dermatomu barku (nerwy nadobojczykowe C3–C4)", correct: true, feedback: "Prawidłowo! Objaw Kehra to klasyczny ból rzutowany: włókna czuciowe nerwu przeponowego (C3-C5) zaopatrujące otrzewną ścienną przepony wchodzą do rdzenia kręgowego na tym samym poziomie co nerwy nadobojczykowe zaopatrujące skórę barku." },
          { text: "Uraz bezpośredni stawu ramiennego lewego", correct: false, feedback: "Bark jest nieuszkodzony anatomicznie." },
          { text: "Zawał mięśnia sercowego powikłany urazem", correct: false, feedback: "Brak cech niedokrwienia serca w EKG i troponin." },
          { text: "Niedrożność tętnicy podobojczykowej lewej", correct: false, feedback: "Tętno na kończynie górnej jest prawidłowe i symetryczne." }
        ]
      },
      {
        num: 3,
        title: "Wybór strategii postępowania: NOM vs operacja",
        task: "Pacjent jest stabilny hemodynamicznie po przetoczeniu 1000 ml krystaloidów (BP 115/70, HR 88). W TK stwierdzono stopień III uszkodzenia bez aktywnego 'blushu'. Jakie postępowanie jest z wyboru?",
        options: [
          { text: "Postępowanie zachowawcze (NOM - Non-Operative Management) w warunkach ścisłego monitorowania na OIT/Chirurgii z możliwością pilnej embolizacji lub operacji", correct: true, feedback: "Prawidłowo! Zgodnie z wytycznymi WSES i ATLS, u pacjentów stabilnych hemodynamicznie bez objawów zapalenia otrzewnej, postępowanie nieoperacyjne (NOM) z monitorowaniem seryjnej morfologii, rygorystycznym leżeniem i ewentualną embolizacją naczyniową (angio-embolizacja) jest postępowaniem z wyboru i pozwala zachować śledzionę u ponad 80–90% pacjentów." },
          { text: "Natychmiastowa całkowita splenektomia u każdego pacjenta z pęknięciem śledziony", correct: false, feedback: "Obecnie dąży się do zaoszczędzenia śledziony, by zapobiec OPSI (zespołowi uogólnionego zakażenia po usunięciu śledziony)." },
          { text: "Wypisanie do domu z zaleceniem oszczędzającego trybu życia", correct: false, feedback: "Ryzyko opóźnionego pęknięcia (krwiak dwuczasowy Baudet) wymaga hospitalizacji." },
          { text: "Podanie leków fibrynolitycznych (alteplaza)", correct: false, feedback: "Fibrynoliza doprowadziłaby do śmiertelnego wykrwawienia." }
        ]
      },
      {
        num: 4,
        title: "Kiedy konieczna jest pilna splenektomia / laparotomia?",
        task: "Która z poniższych sytuacji jest bezwzględnym wskazaniem do natychmiastowej laparotomii i resekcji śledziony (splenektomii)?",
        options: [
          { text: "Niestabilność hemodynamiczna niereagująca na przetoczenie płynów i preparatów krwi (wstrząs krwotoczny oporny na resuscytację) lub cechy zapalenia otrzewnej", correct: true, feedback: "Prawidłowo! Niestabilność hemodynamiczna w przebiegu krwawienia z narządów miąższowych po urazie jest bezwzględnym wskazaniem do natychmiastowej operacji ratującej życie (ang. damage control surgery / splenektomia)." },
          { text: "Wiek pacjenta poniżej 30 lat", correct: false, feedback: "Wiek nie decyduje o konieczności operacji." },
          { text: "Prawidłowy hematokryt w pierwszym badaniu krwi", correct: false, feedback: "Wczesny hematokryt bywa fałszywie prawidłowy przed rozcieńczeniem krwi." },
          { text: "Stłuczenie lewego barku", correct: false, feedback: "Nie stanowi wskazania do operacji brzusznej." }
        ]
      },
      {
        num: 5,
        title: "Późne powikłanie – dwuczasowe pęknięcie śledziony",
        task: "Na czym polega dwuczasowe pęknięcie śledziony (krwotok opóźniony Baudet)?",
        options: [
          { text: "Początkowo powstaje krwiak podtorebkowy, który po kilku dniach (lub tygodniach) ulega pęknięciu do wolnej jamy otrzewnej na skutek wzrostu ciśnienia pod torebką narządu", correct: true, feedback: "Prawidłowo! Dwuczasowe pęknięcie śledziony (zwykle między 4. a 10. dniem od urazu) to klasyczne zjawisko, w którym nieuszkodzona początkowo torebka śledziony ogranicza krwiak, który następnie pęka do otrzewnej, wywołując nagły, wtórny wstrząs hipowolemiczny." },
          { text: "Jednoczesne pęknięcie wątroby i śledziony", correct: false, feedback: "To uraz wielonarządowy, a nie pęknięcie dwuczasowe." },
          { text: "Zakażenie bakteryjne loży śledziony", correct: false, feedback: "To ropień, a nie pęknięcie dwuczasowe." },
          { text: "Pęknięcie tętniaka tętnicy śledzionowej w ciąży", correct: false, feedback: "To odrębna jednostka chorobowa." }
        ]
      },
      {
        num: 6,
        title: "Profilaktyka zakażeń po splenektomii (OPSI)",
        task: "W przypadku konieczności usunięcia śledziony (splenektomii), przed jakim groźnym powikłaniem należy chronić pacjenta i jakimi szczepieniami?",
        options: [
          { text: "Przed piorunującą posocznicą posplenektomijną (OPSI) wywoływaną przez bakterie otoczkowe – szczepienia przeciwko Streptococcus pneumoniae, Neisseria meningitidis oraz Haemophilus influenzae typu b", correct: true, feedback: "Prawidłowo! Śledziona filtruje bakterie otoczkowe i produkuje przeciwciała (tuftsyna, properdyna). Brak śledziony stwarza śmiertelne ryzyko OPSI (Overwhelming Post-Splenectomy Infection). Zaleca się szczepienia (pneumokoki skoniugowane PCV + PPSV23, meningokoki MenACWY + MenB, Hib) – po planowej splenektomii >=14 dni przed zabiegiem, a po operacji pilnej/urazowej około 14. doby po zabiegu." },
          { text: "Przed zakażeniem wirusem zapalenia wątroby typu C za pomocą immunoglobuliny", correct: false, feedback: "Nie ma szczepionki ani specyficznej immunoglobuliny na HCV." },
          { text: "Szczepienie przeciw wściekliźnie i boreliozie", correct: false, feedback: "Brak związku z funkcją śledziony." },
          { text: "Dożywotnia izolacja w komorze z filtrem HEPA", correct: false, feedback: "Nieadekwatne postępowanie; wystarczą szczepienia i profilaktyka antybiotykowa w razie gorączki." }
        ]
      },
      {
        num: 7,
        title: "Monitorowanie laboratoryjne po usunięciu śledziony",
        task: "Jakie typowe zmiany we krwi obwodowej obserwuje się u pacjentów po splenektomii?",
        options: [
          { text: "Trombocytozę (nadpłytkowość reaktywną często >500-1000 G/L), leukocytozę oraz obecność ciałek Howella-Jolly'ego w erytrocytach", correct: true, feedback: "Prawidłowo! Śledziona magazynuje i eliminuje około 1/3 puli płytek krwi oraz resztki jądrowe z erytrocytów. Po splenektomii dochodzi do znacznej trombocytozy (zwiększone ryzyko zakrzepicy, np. żyły wrotnej) oraz pojawienia się w rozmazie ciałek Howella-Jolly'ego, ciałek Heinza i krwinek tarczowatych." },
          { text: "Ciężką małopłytkowość z krwawieniami skazowymi", correct: false, feedback: "Po splenektomii płytki rosną (trombocytoza), a nie spadają." },
          { text: "Pancytopenię ze stłuszczeniem szpiku", correct: false, feedback: "Pancytopenia cechuje hipersplenizm (powiększoną śledzionę), po usunięciu parametry rosną." },
          { text: "Spadek leukocytów poniżej 1.0 G/L", correct: false, feedback: "Obserwuje się leukocytozę reaktywną." }
        ]
      },
      {
        num: 8,
        title: "Podsumowanie i zasady edukacji pacjenta po splenektomii",
        task: "Jakie kluczowe zalecenie musi otrzymać pacjent po splenektomii przy wypisie ze szpitala?",
        options: [
          { text: "Karta informacyjna/opaska 'Pacjent bez śledziony', noszenie przy sobie amoksycyliny z kwasem klawulanowym / lewofloksacyny do natychmiastowego przyjęcia w razie gorączki >38°C oraz natychmiastowy kontakt z SOR", correct: true, feedback: "Prawidłowo! Każdy epizod gorączki u osoby asplenicznej jest stanem bezpośredniego zagrożenia życia. Pacjent musi posiadać tzw. 'pocket antibiotic' (antybiotyk kieszonkowy) do przyjęcia natychmiast po wystąpieniu dreszczy/gorączki w drodze do szpitala." },
          { text: "Całkowity zakaz uprawiania jakiejkolwiek aktywności fizycznej do końca życia", correct: false, feedback: "Po wygojeniu rany pacjent może normalnie funkcjonować." },
          { text: "Konieczność codziennego przyjmowania aspiryny w dawce 1000 mg", correct: false, feedback: "Nie ma takiego wskazania." },
          { text: "Zakaz spożywania pokarmów bogatych w żelazo", correct: false, feedback: "Brak uzasadnienia dietetycznego." }
        ]
      }
    ],
    pathoNodes: [
      { id: "p1", label: "Tępy uraz lewego podżebrza", desc: "Zgniatanie miąższu śledziony przez żebra IX–XI -> pęknięcie torebki i miąższu." },
      { id: "p2", label: "Krwawienie do jamy otrzewnej", desc: "Hypowolemia, podrażnienie otrzewnej, objaw Kehra przez nerw przeponowy." },
      { id: "p3", label: "Ryzyko wstrząsu i asplenia", desc: "Wstrząs krwotoczny lub po splenektomii utrata bariery przeciw otoczkowym (ryzyko OPSI)." }
    ],
    diffTable: [
      { disease: "Pęknięcie śledziony", feature: "Uraz lewego podżebrza, ból promieniujący do lewego barku (Kehr), płyn w USG FAST wokół śledziony" },
      { disease: "Pęknięcie wątroby", feature: "Uraz prawego podżebrza, płyn w zachyłku Morisona, ból promieniujący do prawego barku" },
      { disease: "Perforacja żołądka / jelita", feature: "Obecność wolnego powietrza pod przeponą w RTG/TK, wczesny brzuch deskowaty" },
      { disease: "Złamanie żeber dolnych bez uszkodzenia narządu", feature: "Miejscowa bolesność żeber, trzeszczenia kostne, brak płynu w USG FAST, stabilność parametrów" }
    ],
    dutySummary: "Pacjent 28-letni po urazie tępego brzucha z pęknięciem śledziony (stopień III wg AAST) i krwawieniem dootrzewnowym. Skutecznie ustabilizowany płynowo, zakwalifikowany do postępowania nieoperacyjnego (NOM) na oddziale chirurgii z monitorowaniem parametrów życiowych i kontrolnym USG/TK. W razie wskazań do splenektomii zaplanowano profilaktykę OPSI (szczepienia przeciw pneumokokom, meningokokom i Hib).",
    lekQuestions: [
      {
        question: "Bolesność lewego barku występująca u pacjenta z tępym urazem jamy brzusznej i krwawieniem ze śledziony to:",
        options: ["Objaw Kehra", "Objaw Saegessera", "Objaw Ballance'a", "Objaw Murphy'ego", "Objaw Blumberga"],
        answer: "Objaw Kehra",
        explanation: "Objaw Kehra to ból rzutowany do lewego barku spowodowany drażnieniem lewej kopuły przepony przez krew wynaczynioną ze śledziony (nerw przeponowy C3–C5)."
      },
      {
        question: "Szczepienia zalecane po pilnej splenektomii z przyczyn urazowych obejmują uodpornienie przeciwko:",
        options: [
          "Streptococcus pneumoniae, Neisseria meningitidis, Haemophilus influenzae typu b",
          "WZW typu B, WZW typu C i HIV",
          "Tężcowi, wściekliźnie i boreliozie",
          "Wirusowi grypy i RSV wyłącznie",
          "Bakteriom beztlenowym z rodzaju Clostridium i Bacteroides"
        ],
        answer: "Streptococcus pneumoniae, Neisseria meningitidis, Haemophilus influenzae typu b",
        explanation: "Po splenektomii pacjenci są szczególnie narażeni na piorunującą posocznicę wywoływaną przez bakterie posiadające otoczkę polisacharydową: S. pneumoniae (ponad 50% przypadków OPSI), N. meningitidis i H. influenzae typu b."
      },
      {
        question: "Które z poniższych ciałek wtrętowych w erytrocytach pojawia się w rozmazie krwi obwodowej po usunięciu śledziony?",
        options: ["Ciałka Howella-Jolly'ego", "Ciałka Civatte'a", "Ciałka Negriego", "Ciałka Lewy'ego", "Ciałka Mallory'ego"],
        answer: "Ciałka Howella-Jolly'ego",
        explanation: "Ciałka Howella-Jolly'ego to okrągłe resztki chromatyny jądrowej w erytrocytach, które w warunkach prawidłowych są fagocytowane przez śledzionę. Ich obecność jest markerem asplenii anatomicznej lub czynnościowej."
      }
    ],
    flashcards: [
      { front: "Co to jest objaw Kehra i o czym świadczy?", back: "Ból lewego barku wywołany podrażnieniem przeponowej otrzewnej przez krew podprzeponową (nerw przeponowy C3–C5); typowy dla pęknięcia śledziony." },
      { front: "Jakie jest kryterium wyboru metody zachowawczej (NOM) w urazie śledziony?", back: "Stabilność hemodynamiczna pacjenta, brak objawów zapalenia otrzewnej i brak wskazań do laparotomii z powodu innych narządów." },
      { front: "Co to jest zespół OPSI?", back: "Overwhelming Post-Splenectomy Infection – piorunująca, śmiertelna posocznica u osób bez śledziony wywołana głównie przez bakterie otoczkowe (S. pneumoniae, N. meningitidis, Hib)." },
      { front: "Kiedy podać szczepionki po PILNEJ splenektomii po urazie?", back: "Około 14. doby po operacji (wtedy odpowiedź immunologiczna na antygeny jest optymalna; podanie przed wypisem ze szpitala)." },
      { front: "Jakie zmiany płytkowe obserwuje się po splenektomii?", back: "Przemijająca lub utrwalona trombocytoza (często >500-1000 G/L), zwiększająca ryzyko powikłań zakrzepowo-zatorowych." }
    ]
  },

  // 138: Niedrożność w raku jelita grubego
  {
    id: 138,
    filename: "138_niedroznosc_rak_jelita_grubego.json",
    dept: "Chirurgia",
    shortTitle: "67-letni mężczyzna ze stopniowym zatrzymaniem stolca i gazów – Wzdęcie, nudności, guz esicy i objaw 'zamkniętej pętli' przy wydolnej zastawce krętniczo-kątniczej",
    diagnosisTitle: "Ostra mechaniczna niedrożność jelita grubego (Ileus mechanicus coli) w przebiegu raka esicy / zstępnicy z ryzykiem perforacji kątnicy",
    vitals: [
      { label: "HR", val: "102/min", sub: "Tachykardia odruchowa", status: "warn" },
      { label: "BP", val: "135/85 mmHg", sub: "Prawidłowe", status: "ok" },
      { label: "SpO2", val: "97%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "20/min", sub: "Prawidłowy", status: "ok" },
      { label: "Temp", val: "37.2°C", sub: "Stan podgorączkowy", status: "ok" }
    ],
    vitalsObj: { hr: 102, bp: "135/85", spo2: 97, rr: 20, temp: 37.2 },
    story: "67-letni mężczyzna zgłosił się na SOR z powodu narastającego od 4 dni braku oddawania stolca i gazów, bolesnego wzdęcia brzucha oraz nudności. W ciągu ostatnich 6 miesięcy schudł 7 kg i zauważył zmianę rytmu wypróżnień (naprzemienne zaparcia i biegunki z obecnością pasm ciemnej krwi). W badaniu fizykalnym: brzuch znacznie wzdęty ('brzuch jak bęben'), bolesny przy głębokim ucisku, najbardziej bolesna jest okolica kątnicy w prawym dole biodrowym (groźba pęknięcia rozciągniętej kątnicy). Odgłos opukowy bębenkowy, osłuchowo perystaltyka metaliczna, o wysokim tonie, okresowo zanikająca. W badaniu per rectum: bańka odbytnicy pusta, brak mas wyczuwalnych palcem w odbytnicy, na rękawiczce ślady ciemnobrązowego śluzu.",
    labs: [
      {
        category: "Badania laboratoryjne i markery nowotworowe",
        items: [
          { name: "Morfologia krwi", val: "Hb 10.2 g/dL (niedokrwistość mikrocytarna), WBC 12.8 G/L", norm: "13.5–17.5 / 4.0–10.0", flag: "L" },
          { name: "CEA (antygen rakowo-płodowy)", val: "28.5 ng/mL (podwyższony)", norm: "< 5.0 ng/mL", flag: "H" },
          { name: "Elektrolity (Sód / Potas)", val: "133 mmol/L / 3.4 mmol/L", norm: "136–145 / 3.5–5.1 mmol/L", flag: "L" },
          { name: "Mleczany surowicy", val: "2.3 mmol/L (lekkie podwyższenie)", norm: "0.5–2.0 mmol/L", flag: "H" }
        ]
      },
      {
        category: "Radiologia i TK jamy brzusznej CITO",
        items: [
          { name: "RTG przeglądowe jamy brzusznej na stojąco", val: "Liczne szerokie poziomy płynów w rzucie okrężnicy, rozdęta okrężnica wstępująca i poprzecznica, brak gazu w bańce odbytnicy", norm: "Brak patologicznych poziomów płynów", flag: "H" },
          { name: "TK jamy brzusznej i miednicy z kontrastem CITO", val: "Guz esicy powodujący niemal całkowite zwężenie światła (obraz 'ogryzka jabłka'). Rozdęcie kątnicy do średnicy 9.5 cm. Wydolna zastawka krętniczo-kątnicza Bauhina (mechanizm zamkniętej pętli okrężnicy). Brak cech perforacji i wolnego gazu", norm: "Światło jelita drożne", flag: "H" }
        ]
      },
      {
        category: "Ocena ryzyka perforacji wg prawa Laplace'a",
        items: [
          { name: "Średnica kątnicy w TK", val: "9.5 cm (krytyczna granica bezpieczeństwa to 9–10 cm)", norm: "< 5 cm", flag: "H" },
          { name: "Objawy otrzewnowe nad kątnicą", val: "Bolesność uciskowa bez objawu Blumberga", norm: "Brak", flag: "warn" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Rozpoznanie mechanizmu zamkniętej pętli w jelicie grubym",
        task: "Dlaczego przy niedrożności lewej połowy okrężnicy najbardziej zagrożona pęknięciem (perforacją z rozciągnięcia) jest kątnica?",
        options: [
          { text: "Zgodnie z prawem Laplace'a naprężenie ściany jest wprost proporcjonalne do promienia naczynia/jelita (T = P x r); kątnica ma największą średnicę i najcieńszą ścianę w całym jelicie grubym, a wydolna zastawka Bauhina uniemożliwia cofanie się gazów do jelita cienkiego", correct: true, feedback: "Prawidłowo! To fundamentalne prawo fizyki i chirurgii (prawo Laplace'a): przy wydolnej zastawce Bauhina okrężnica staje się zamkniętym zbiornikiem ciśnieniowym; narastające ciśnienie powoduje największe napięcie ściany w miejscu o największej średnicy – czyli w kątnicy (średnica >9-10 cm grozi martwicą z niedokrwienia i perforacją diastatyczną kątnicy)." },
          { text: "Kątnica jest miejscem najbogatszym we florę wirusową", correct: false, feedback: "To kwestia biomechaniczna, nie wirusowa." },
          { text: "Zastawka Bauhina zawsze ulega natychmiastowej niewydolności", correct: false, feedback: "Gdyby była niewydolna, gazy cofałyby się do jelita cienkiego, odbarczając kątnicę." },
          { text: "Kątnica ma najgrubszą warstwę mięśniową w jelicie", correct: false, feedback: "Odwrotnie: kątnica ma najcieńszą ścianę." }
        ]
      },
      {
        num: 2,
        title: "Krytyczna średnica kątnicy w badaniach obrazowych",
        task: "Jaka średnica kątnicy w badaniu RTG lub TK jamy brzusznej uważana jest za stan bezpośredniego zagrożenia perforacją i pilne wskazanie do dekompresji?",
        options: [
          { text: ">= 9–10 cm (wg niektórych wytycznych >12 cm)", correct: true, feedback: "Prawidłowo! Średnica kątnicy przekraczająca 9–10 cm na zdjęciu przeglądowym lub w TK świadczy o krytycznym rozciągnięciu ściany i grozi martwicą niedokrwienną oraz pęknięciem (perforatio diastatica)." },
          { text: "Powyżej 3 cm", correct: false, feedback: "To prawidłowa średnica jelita cienkiego." },
          { text: "Powyżej 6 cm", correct: false, feedback: "6 cm to granica dla jelita grubego w rzucie poprzecznicy, ale kątnica toleruje fizjologicznie do 8 cm." },
          { text: "Powyżej 25 cm", correct: false, feedback: "Przy takiej średnicy doszłoby dawno do rozerwania jelita." }
        ]
      },
      {
        num: 3,
        title: "Postępowanie wstępne na SOR",
        task: "Jakie działania zachowawcze należy podjąć natychmiast po przyjęciu chorego z mechaniczną niedrożnością okrężnicy?",
        options: [
          { text: "Założenie zgłębnika nosowo-żołądkowego z odsysaniem treści, ścisła dieta zero, intensywna płynoterapia krystaloidowa z wyrównaniem elektrolitów i pilna konsultacja chirurgiczna", correct: true, feedback: "Prawidłowo! Standard postępowania: odciążenie przewodu pokarmowego sondą żołądkową, zakaz pojenia i karmienia, wyrównanie zaburzeń wodno-elektrolitowych i przygotowanie do pilnego zabiegu lub procedury endoskopowej." },
          { text: "Podanie doustnych leków przeczyszczających (bisakodyl, laktuloza)", correct: false, feedback: "Leki przeczyszczające w mechanicznej niedrożności doprowadziłyby do natychmiastowego pęknięcia jelita!" },
          { text: "Wykonanie głębokiej lewatywy z dużej objętości wody pod wysokim ciśnieniem", correct: false, feedback: "Wysokie ciśnienie lewatywy grozi perforacją przy ścianie zwężonej guzem." },
          { text: "Podanie leków prokinetycznych (metoklopramid)", correct: false, feedback: "Prokinetyki są bezwzględnie przeciwwskazane w niedrożności mechanicznej." }
        ]
      },
      {
        num: 4,
        title: "Wybór metody chirurgicznej – operacja Hartmanna",
        task: "Na czym polega klasyczna operacja sposobem Hartmanna wykonywana w trybie ostrym w niedrożności lub perforacji lewej połowy okrężnicy?",
        options: [
          { text: "Resekcja zmienionego odcinka esicy/odbytnicy z guzem, zamknięcie kikuta odbytnicy na głucho w miednicy i wyprowadzenie bliższego końca okrężnicy jako jednolufowej kolostomii końcowej", correct: true, feedback: "Prawidłowo! Operacja Hartmanna to ratunkowa operacja dwuetapowa: wycięcie guza, ślepe zaszycie kikuta dystalnego i wyłonienie stomii końcowej (kolostomii). Unika się dzięki temu wykonywania zespolenia jelitowego w warunkach niedrożności, obrzęku i braku przygotowania jelita, co groziłoby rozejściem zespolenia." },
          { text: "Zespolenie omijające żołądkowo-jelitowe", correct: false, feedback: "To operacja w niedrożności odźwiernika, nie esicy." },
          { text: "Całkowite usunięcie żołądka z pętlą Roux-en-Y", correct: false, feedback: "To gastrektomia." },
          { text: "Wycięcie wyrostka robaczkowego z drenażem", correct: false, feedback: "To appendektomia." }
        ]
      },
      {
        num: 5,
        title: "Alternatywa małoinwazyjna: Stent samorozprężalny (SEMS)",
        task: "W jakiej sytuacji klinicznej uzasadnione jest założenie samorozprężalnego stentu metalowego (SEMS) do zwężenia nowotworowego w jelicie grubym?",
        options: [
          { text: "Jako pomost do planowej operacji resekcyjnej (bridge-to-surgery) pozwalający odbarczyć niedrożność, przygotować jelito i wykonać jednoczasowe zespolenie, lub jako leczenie paliatywne w rozsianym raku", correct: true, feedback: "Prawidłowo! SEMS (Self-Expanding Metal Stent) wprowadzany pod kontrolą endoskopowo-fluoroskopową pozwala natychmiast udrożnić przewód pokarmowy, zamieniając zabieg ostry (obarczony wysoką śmiertelnością i stomią) w bezpieczną, planową operację jednoetapową lub stanowi docelowe leczenie paliatywne." },
          { text: "U pacjenta z jawną perforacją i kałowym zapaleniem otrzewnej", correct: false, feedback: "Perforacja jest bezwzględnym przeciwwskazaniem do stentu – wymaga natychmiastowej laparotomii." },
          { text: "W łagodnym polipie hiperplastycznym odbytnicy", correct: false, feedback: "Polipy usuwa się polipektomią, nie stentem." },
          { text: "Zawsze zamiast leczenia onkologicznego u młodych pacjentów", correct: false, feedback: "Stent nie zastępuje radykalnego leczenia onkologicznego." }
        ]
      },
      {
        num: 6,
        title: "Rozpoznanie różnicowe – Zespół Ogilviego",
        task: "Co to jest zespół Ogilviego (ostra rzekoma niedrożność jelita grubego – ACPO) i jak różni się od mechanicznej niedrożności?",
        options: [
          { text: "Masywne poszerzenie okrężnicy bez przeszkody mechanicznej, najczęściej u osób starszych po zabiegach ortopedycznych/kardiologicznych lub z ciężkimi chorobami internistycznymi, leczone m.in. neostygminą", correct: true, feedback: "Prawidłowo! Zespół Ogilviego to ostra pseudoniedrożność czynnościowa (zaburzenie autonomicznego unerwienia jelita). W TK nie stwierdza się guza ani mechanicznej przeszkody, a lekiem z wyboru po braku poprawy po leczeniu zachowawczym jest inhibitor acetylocholinoesterazy – neostygmina (wymagająca monitorowania EKG z uwagi na bradykardię) lub dekompresja kolonoskopowa." },
          { text: "Mechaniczne skręcenie kątnicy u sportowca", correct: false, feedback: "To volvulus, czyli mechaniczna przeszkoda." },
          { text: "Niedrożność spowodowana kamieniem żółciowym", correct: false, feedback: "To gallstone ileus." },
          { text: "Wrodzony brak zwojów nerwowych u noworodków", correct: false, feedback: "To choroba Hirschsprunga." }
        ]
      },
      {
        num: 7,
        title: "Zasady onkologicznej resekcji w raku jelita grubego",
        task: "Jakie są podstawowe zasady radykalnej resekcji onkologicznej raka esicy/okrężnicy?",
        options: [
          { text: "Usunięcie guza z odpowiednim marginesem jelitowym (minimum 5 cm) wraz z regionalną krezką i spływem chłonnym (kompletne wycięcie krezki okrężnicy – CME) oraz podwiązaniem naczyń u ich odejścia", correct: true, feedback: "Prawidłowo! Zgodnie z zasadami onkologicznymi (CME - Complete Mesocolic Excision) konieczne jest wycięcie krezki z naczyniami podwiązanymi centralnie i zbadanie minimum 12 węzłów chłonnych w preparacie do wiarygodnego stagingu pTNM." },
          { text: "Miejscowe wycięcie guza przez nacięcie ściany bez usuwania węzłów", correct: false, feedback: "Postępowanie niedopuszczalne w inwazyjnym raku jelita grubego." },
          { text: "Wypalenie guza prądem diatermicznym bez badania histopatologicznego", correct: false, feedback: "Brak radykalności i brak materiału histopatologicznego." },
          { text: "Podanie wyłącznie chemioterapii bez resekcji ogniska pierwotnego", correct: false, feedback: "Niedrożność uniemożliwia wyłączną chemioterapię." }
        ]
      },
      {
        num: 8,
        title: "Podsumowanie postępowania i opieka pooperacyjna",
        task: "Jakie działania profilaktyczne mają kluczowe znaczenie po operacji usunięcia przeszkody nowotworowej w jelicie grubym?",
        options: [
          { text: "Profilaktyka przeciwzakrzepowa (HDCz), antybiotykoterapia okołooperacyjna, wczesne uruchomienie chorego (protokół ERAS) oraz skierowanie na konsylium onkologiczne celem kwalifikacji do chemioterapii uzupełniającej", correct: true, feedback: "Prawidłowo! Standard ERAS (Enhanced Recovery After Surgery) obejmuje wczesną mobilizację, profilaktykę żylnej choroby zakrzepowo-zatorowej, wczesne żywienie oraz wielodyscyplinarną opiekę onkologiczną." },
          { text: "Wieloletnie leżenie w łóżku z zakazem chodzenia", correct: false, feedback: "Sprzyja zatorowości płucnej i zapaleniu płuc." },
          { text: "Stosowanie wyłącznie płynów hipotonicznych i unikanie białka", correct: false, feedback: "Prowadzi do niedożywienia i rozejścia rany." },
          { text: "Brak wskazań do kontroli onkologicznej", correct: false, feedback: "Konieczny jest ścisły follow-up onkologiczny." }
        ]
      }
    ],
    pathoNodes: [
      { id: "p1", label: "Rak esicy zwężający światło", desc: "Zwężenie światła okrężnicy prowadzi do zatrzymania gazów i stolca." },
      { id: "p2", label: "Wzrost ciśnienia w pętli zamkniętej", desc: "Zastawka Bauhina blokuje refluks -> lawinowe poszerzenie kątnicy (prawo Laplace'a)." },
      { id: "p3", label: "Niedokrwienie i ryzyko perforacji", desc: "Rozdęcie >9-10 cm upośledza mikrokrążenie ścienne -> martwica i przedziurawienie." }
    ],
    diffTable: [
      { disease: "Mechaniczna niedrożność w raku okrężnicy", feature: "Guz w TK, stopień zwężenia, puste jelito dystalnie, poszerzenie proksymalne" },
      { disease: "Zespół Ogilviego (ACPO)", feature: "Brak mechanicznej przeszkody w TK, nagłe poszerzenie u pacjenta leżącego/neurologicznego" },
      { disease: "Skręt esicy (volvulus)", feature: "Obraz 'ziarna kawy' na RTG, pętla esicy sięgająca pod przeponę, skręt krezki w TK (whirl sign)" },
      { disease: "Zapalenie uchyłków z ropniem", feature: "Pogrubienie ściany z uchyłkami, gaz w otoczeniu jelita, ból w lewym dole biodrowym, gorączka" }
    ],
    dutySummary: "Pacjent 67-letni z mechaniczną niedrożnością jelita grubego w przebiegu nowotworu esicy. Na podstawie TK stwierdzono krytyczne rozdęcie kątnicy (9.5 cm) przy wydolnej zastawce Bauhina. Zastosowano dekompresję sondą, wdrożono płynoterapię i zakwalifikowano pacjenta w trybie pilnym do zabiegu operacyjnego (resekcja sposobem Hartmanna).",
    lekQuestions: [
      {
        question: "W mechanicznej niedrożności okrężnicy zstępującej przy wydolnej zastawce krętniczo-kątniczej (mechanizm zamkniętej pętli) największe ryzyko perforacji z rozdęcia dotyczy:",
        options: ["Kątnicy", "Okrężnicy poprzecznej", "Okrężnicy zstępującej", "Bańki odbytnicy", "Końcowego odcinka jelita krętego"],
        answer: "Kątnicy",
        explanation: "Zgodnie z prawem Laplace'a naprężenie ściany jest największe tam, gdzie średnica jest największa (T = P * r). Kątnica ma największe światło i najcieńszą ścianę, co czyni ją najbardziej podatną na perforację diastatyczną."
      },
      {
        question: "Operacja sposobem Hartmanna polega na:",
        options: [
          "Resekcji zmienionego odcinka jelita grubego, zamknięciu kikuta dystalnego na głucho i wyłonieniu kolostomii końcowej z odcinka bliższego",
          "Resekcji żołądka z zespoleniem żołądkowo-dwunastniczym koniec do końca",
          "Wytworzeniu przetoki omijającej jelitowo-jelitowej bez wycięcia zmiany",
          "Resekcji prawej połowy okrężnicy z zespoleniem krętniczo-poprzecznym",
          "Wycięciu odbytnicy z zaoszczędzeniem zwieraczy i wytworzeniem zbiornika J-pouch"
        ],
        answer: "Resekcji zmienionego odcinka jelita grubego, zamknięciu kikuta dystalnego na głucho i wyłonieniu kolostomii końcowej z odcinka bliższego",
        explanation: "Operacja Hartmanna pozwala usunąć przyczynę niedrożności lub perforacji bez ryzyka nieszczelności zespolenia w nieprzygotowanym jelicie."
      },
      {
        question: "Lekiem farmakologicznym stosowanym z wyboru w ostrej rzekomej niedrożności jelita grubego (zespół Ogilviego) po niepowodzeniu leczenia zachowawczego jest:",
        options: ["Neostygmina", "Atropina", "Loperamid", "Papaweryna", "Drotaweryna"],
        answer: "Neostygmina",
        explanation: "Neostygmina (inhibitor cholinoesterazy) zwiększa napięcie przywspółczulne i perystaltykę okrężnicy. Podaje się ją w powolnym wlewie pod ścisłym nadzorem kardiologicznym ze względu na ryzyko bradykardii i skurczu oskrzeli."
      }
    ],
    flashcards: [
      { front: "Dlaczego kątnica pęka pierwsza w niedrożności okrężnicy?", back: "Zgodnie z prawem Laplace'a (T = P x r) kątnica mając największy promień podlega największemu napięciu ściany przy wzroście ciśnienia w pętli zamkniętej." },
      { front: "Jaka średnica kątnicy wskazuje na zagrożenie perforacją?", back: "Średnica >= 9–10 cm w RTG lub TK jamy brzusznej." },
      { front: "Co oznacza skrót SEMS w chirurgii kolorektalnej?", back: "Self-Expanding Metal Stent – samorozprężalny stent metalowy wprowadzany endoskopowo do zwężenia jako pomost do operacji (bridge-to-surgery) lub paliacja." },
      { front: "Na czym polega operacja Hartmanna?", back: "Resekcja chorych tkanek (np. esicy z guzem) + zamknięcie kikuta odbytnicy na głucho + wyłonienie jednolufowej kolostomii końcowej." },
      { front: "Czym jest zespół Ogilviego?", back: "Ostra pseudoniedrożność okrężnicy bez przeszkody mechanicznej (zaburzenie unerwienia autonomicznego), leczona neostygminą lub odbarczeniem kolonoskopowym." }
    ]
  },

  // 139: Niedokrwienne zapalenie jelita grubego (Ischaemic colitis)
  {
    id: 139,
    filename: "139_niedokrwienne_zapalenie_jelita_grubego.json",
    dept: "Chirurgia",
    shortTitle: "74-letnia kobieta z miażdżycą i po epizodzie hipotonii – Nagły kurczowy ból lewego podbrzusza, parcie na stolec i krwisto-śluzowe stolce (Ischaemic colitis)",
    diagnosisTitle: "Niedokrwienne zapalenie jelita grubego (Colitis ischaemica) z zajęciem zagięcia śledzionowego (punkt Griffithsa) i zstępnicy",
    vitals: [
      { label: "HR", val: "94/min", sub: "Miarowy", status: "ok" },
      { label: "BP", val: "108/68 mmHg", sub: "W normie (epizod spadku BP w wywiadzie)", status: "ok" },
      { label: "SpO2", val: "96%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "18/min", sub: "Prawidłowy", status: "ok" },
      { label: "Temp", val: "37.8°C", sub: "Stan podgorączkowy", status: "warn" }
    ],
    vitalsObj: { hr: 94, bp: "108/68", spo2: 96, rr: 18, temp: 37.8 },
    story: "74-letnia pacjentka z wieloletnim nadciśnieniem tętniczym, uogólnioną miażdżycą i przewlekłą niewydolnością serca, wczoraj przebyła epizod osłabienia i hipotonii (BP 80/50) po przedawkowaniu leków moczopędnych. Dziś rano wystąpił nagły, kurczowy ból w lewym dolnym kwadrancie brzucha, któremu towarzyszyło nagłe parcie na stolec. W ciągu 4 godzin oddała 3 luźne stolce podbarwione świeżą, ciemnoczerwoną krwią zmieszaną ze śluzem. W badaniu fizykalnym: brzuch miękki, wyraźnie bolesny uciskowo w lewym dole biodrowym i lewym boku, bez obrony mięśniowej i bez objawu Blumberga. Osłuchowo perystaltyka zachowana, leniwa. W badaniu per rectum obecna krew na rękawiczce, bez patologicznych mas w zasięgu palca.",
    labs: [
      {
        category: "Badania krwi i parametry zapalne",
        items: [
          { name: "Leukocyty (WBC)", val: "14.2 G/L", norm: "4.0–10.0 G/L", flag: "H" },
          { name: "CRP", val: "48 mg/L", norm: "< 5 mg/L", flag: "H" },
          { name: "Mleczany surowicy", val: "1.8 mmol/L (w granicach normy)", norm: "0.5–2.0 mmol/L", flag: "N" },
          { name: "Hemoglobina", val: "11.4 g/dL", norm: "12.0–16.0 g/dL", flag: "L" }
        ]
      },
      {
        category: "Tomografia komputerowa jamy brzusznej z kontrastem CITO",
        items: [
          { name: "Ściana okrężnicy w TK", val: "Odcinkowe, koncentryczne pogrubienie ściany zagięcia śledzionowego oraz okrężnicy zstępującej z obrzękiem podśluzówkowym (objaw tarczy strzeleckiej / target sign), pasmowate zmatowienie okolicznej tkanki tłuszczowej", norm: "Ściana jelita < 3 mm", flag: "H" },
          { name: "Naczynia trzewne (Angio-TK)", val: "Drożność pnia krezkowego górnego i dolnego, uogólnione zwapnienia miażdżycowe aorty i gałęzi trzewnych (brak ostrego zatoru pnia tętniczego)", norm: "Naczynia drożne", flag: "N" }
        ]
      },
      {
        category: "Wlew kontrastowy / Kolonoskopia wczesna",
        items: [
          { name: "RTG po wlewie kontrastowym (obraz historyczny/charakterystyczny)", val: "Objaw odcisku kciuka (thumbprinting) wywołany obrzękiem i krwiakami podśluzówkowymi", norm: "Zarys ściany gładki", flag: "H" },
          { name: "Wczesna sigmoidoskopia (ostrożna, bez nadmiernej insuflacji)", val: "Brak zmian w odbytnicy; od zstępnicy sina, obrzęknięta, krucha błona śluzowa z podłużnymi owrzodzeniami i wybroczynami krwawymi", norm: "Błona śluzowa gładka, różowa", flag: "H" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Lokalizacja anatomiczna 'stref krytycznych' niedokrwienia",
        task: "Dlaczego zagięcie śledzionowe okrężnicy (punkt Griffithsa) jest najbardziej podatne na niedokrwienie (tzw. watershed area)?",
        options: [
          { text: "Stanowi strefę graniczną unaczynienia (dorzecze końcowe) pomiędzy zakresem tętnicy krezkowej górnej (tętnica okrężnicza środkowa) a tętnicy krezkowej dolnej (tętnica okrężnicza lewa)", correct: true, feedback: "Prawidłowo! Zagięcie śledzionowe (punkt Griffithsa) oraz połączenie esiczo-odbytnicze (punkt Sudecka) to klasyczne strefy graniczne (watershed areas), w których sieć oboczna (łuk Riolana, tętnica brzeżna Drummonda) może być anatomicznie słabsza. W stanach ogólnego spadku perfuzji (hipotonia, odwodnienie, wstrząs) obszary te pierwsze ulegają hipoperfuzji." },
          { text: "Jest unaczynione wyłącznie przez gałęzie pnia trzewnego", correct: false, feedback: "Pień trzewny nie zaopatruje zagięcia śledzionowego okrężnicy." },
          { text: "Przylega do śledziony, która zabiera całą krew", correct: false, feedback: "Śledziona nie 'kradnie' krwi z jelita w ten sposób." },
          { text: "Występuje tam najmniejsza ilość zwojów nerwowych", correct: false, feedback: "Przyczyną jest anatomia naczyniowa, nie unerwienie." }
        ]
      },
      {
        num: 2,
        title: "Charakterystyczny objaw radiologiczny",
        task: "Jaki jest klasyczny objaw radiologiczny niedokrwiennego zapalenia jelita grubego w RTG lub TK?",
        options: [
          { text: "Objaw odcisku kciuka (thumbprinting) spowodowany obrzękiem i wybroczynami krwawymi w warstwie podśluzówkowej", correct: true, feedback: "Prawidłowo! Thumbprinting (objaw odcisku kciuka) w RTG z kontrastem lub w TK odpowiada odcinkowemu obrzękowi błony podśluzówkowej wpuklającemu się do światła jelita niczym kciuk wciśnięty w miękką masę." },
          { text: "Objaw pętli na uwięzi", correct: false, feedback: "Nietypowy dla tego schorzenia." },
          { text: "Objaw rury ołowianej", correct: false, feedback: "Rura ołowiana (lead pipe) jest typowa dla przewlekłego wrzodziejącego zapalenia jelita grubego (WZJG)." },
          { text: "Objaw tarczy strzeleckiej w intususcepcji", correct: false, feedback: "Dotyczy wgłobienia jelita." }
        ]
      },
      {
        num: 3,
        title: "Różnica między niedokrwieniem krezki a niedokrwiennym zapaleniem okrężnicy",
        task: "Jaka jest zasadnicza różnica kliniczna i patofizjologiczna pomiędzy ostrym niedokrwieniem jelita cienkiego (zator SMA) a niedokrwiennym zapaleniem jelita grubego (ischaemic colitis)?",
        options: [
          { text: "Ischaemic colitis jest zwykle wynikiem przejściowej nieokluzyjnej hipoperfuzji (NOMI) u osób z miażdżycą, ma łagodniejszy przebieg, nie daje martwicy pełnej grubości ściany u >80% chorych i leczy się głównie zachowawczo", correct: true, feedback: "Prawidłowo! Zator SMA to nagła niedrożność dużego pnia tętniczego prowadząca do martwicy transmuralnej jelita cienkiego o śmiertelności 60-80% wymagająca pilnej operacji. Z kolei niedokrwienne zapalenie okrężnicy to zazwyczaj stan hipoperfuzji mikrokrążenia ograniczonej do błony śluzowej/podśluzowej, ustępujący samoistnie przy nawodnieniu u większości pacjentów." },
          { text: "Zator SMA nigdy nie daje bólu brzucha", correct: false, feedback: "Zator SMA powoduje skrajny, potworny ból." },
          { text: "Ischaemic colitis zawsze wymaga natychmiastowej kolektomii całkowitej", correct: false, feedback: "Większość przypadków leczy się z powodzeniem zachowawczo." },
          { text: "W ischaemic colitis krew w stolcu nigdy nie występuje", correct: false, feedback: "Krwisto-śluzowe stolce są kardynalnym objawem ischaemic colitis." }
        ]
      },
      {
        num: 4,
        title: "Bezpieczeństwo endoskopii w ostrym okresie",
        task: "Jakie zasady obowiązują podczas wykonywania sigmoidoskopii/kolonoskopii w podejrzeniu niedokrwiennego zapalenia jelita grubego?",
        options: [
          { text: "Należy wykonać delikatną sigmoidoskopię z minimalną insuflacją powietrza (lub CO2) i unikać forsownego wprowadzania aparatu powyżej zgięcia śledzionowego z powodu ryzyka perforacji", correct: true, feedback: "Prawidłowo! Ściana niedokrwionego jelita jest krucha i podatna na perforację barometryczną. Wczesna sigmoidoskopia (do 48h) potwierdza rozpoznanie (sinica, obrzęk, wybroczyny), ale należy unikać pełnej kolonoskopii i nadmiernego pompowania gazu." },
          { text: "Należy maksymalnie rozdąć jelito powietrzem pod wysokim ciśnieniem", correct: false, feedback: "Doprowadziłoby to do perforacji jelita i pogorszenia niedokrwienia." },
          { text: "Endoskopia jest bezwzględnie zakazana w każdych okolicznościach", correct: false, feedback: "Ostrożna sigmoidoskopia jest złotym standardem diagnostycznym." },
          { text: "Konieczne jest pobranie transmuralnych głębokich wycinków aż do otrzewnej", correct: false, feedback: "Pobranie głębokich wycinków grozi natychmiastowym przedziurawieniem." }
        ]
      },
      {
        num: 5,
        title: "Podstawowe leczenie zachowawcze",
        task: "Jakie jest podstawowe postępowanie terapeutyczne w niepowikłanej postaci niedokrwiennego zapalenia okrężnicy?",
        options: [
          { text: "Optymalizacja hemodynamiczna (płynoterapia i.v., unikanie hipotonii), odpoczynek jelita (dieta ścisła), odstawienie leków wazokonstrykcyjnych/moczopędnych oraz antybiotykoterapia o szerokim spektrum", correct: true, feedback: "Prawidłowo! Ponad 80% przypadków ma charakter przemijający i cofa się po przywróceniu prawidłowego ciśnienia tętniczego i przepływu naczyniowego. Antybiotykoterapia zapobiega translokacji bakteryjnej przez uszkodzoną barierę śluzówkową." },
          { text: "Agresywna chemioterapia cytotoksyczna", correct: false, feedback: "Brak wskazań onkologicznych." },
          { text: "Podanie leków zwężających naczynia krwionośne w wysokich dawkach", correct: false, feedback: "Wazopresory nasiliłyby niedokrwienie jelita." },
          { text: "Założenie opaski uciskowej na aortę brzuszną", correct: false, feedback: "Niedorzeczne i śmiertelne postępowanie." }
        ]
      },
      {
        num: 6,
        title: "Wskazania do pilnej operacji chirurgicznej",
        task: "Które z poniższych objawów u pacjenta leczonego zachowawczo z powodu niedokrwiennego zapalenia jelita świadczą o martwicy pełnej grubości ściany i wymagają pilnej laparotomii?",
        options: [
          { text: "Pojawienie się obrony mięśniowej i objawów otrzewnowych (Blumberg), narastająca kwasica mleczanowa, leukocytoza >20 G/L oraz niestabilność septyczna", correct: true, feedback: "Prawidłowo! Przejście w postać zgorzelinową (gangrenous colitis) z martwicą transmuralną i perforacją wymaga natychmiastowej laparotomii z resekcją martwiczego odcinka jelita (najczęściej lewostronna hemikolektomia ze stomią)." },
          { text: "Oddanie pojedynczego uformowanego stolca", correct: false, feedback: "To objaw powrotu prawidłowej funkcji jelita." },
          { text: "Spadek stężenia CRP z 48 na 20 mg/L", correct: false, feedback: "To dowód na wygasanie stanu zapalnego." },
          { text: "Uczucie głodu zgłaszane przez pacjenta", correct: false, feedback: "Objaw klinicznej poprawy." }
        ]
      },
      {
        num: 7,
        title: "Odległe powikłanie – zwężenie pozapalne",
        task: "Jakie odległe powikłanie może rozwinąć się po kilku tygodniach lub miesiącach u pacjenta, który przebył ciężkie niedokrwienne zapalenie okrężnicy?",
        options: [
          { text: "Włókniste zwężenie pozapalne światła okrężnicy wywołujące podostrą niedrożność jelita", correct: true, feedback: "Prawidłowo! W procesie gojenia głębokich owrzodzeń niedokrwiennych dochodzi do proliferacji tkanki łącznej włóknistej, co u kilkunastu procent pacjentów prowadzi do bliznowatego zwężenia (ischaemic stricture) wymagającego resekcji lub poszerzenia endoskopowego." },
          { text: "Rozwój polipowatości rodzinnej FAP", correct: false, feedback: "FAP to choroba genetyczna (mutacja APC)." },
          { text: "Celiakia oporna na leczenie", correct: false, feedback: "Celiakia dotyczy jelita cienkiego i tła autoimmunologicznego." },
          { text: "Przetoka żołądkowo-oskrzelowa", correct: false, feedback: "Brak związku anatomicznego." }
        ]
      },
      {
        num: 8,
        title: "Podsumowanie i prewencja wtórna",
        task: "Jakie zalecenia są kluczowe w profilaktyce nawrotu niedokrwienia jelita grubego u osoby w podeszłym wieku?",
        options: [
          { text: "Unikanie odwodnienia, staranne monitorowanie ciśnienia tętniczego (unikanie epizodów iatrogennej hipotonii), optymalizacja leczenia kardiologicznego i leczenie przeciwmiażdżycowe (statyna, leki przeciwpłytkowe)", correct: true, feedback: "Prawidłowo! Kluczem do uniknięcia nawrotu jest zapobieganie spadkom rzutu serca i ciśnienia perfuzyjnego w układzie mikrokrążenia trzewnego oraz kontrola czynników ryzyka sercowo-naczyniowego." },
          { text: "Całkowite zaprzestanie picia płynów", correct: false, feedback: "Odwodnienie jest bezpośrednią przyczyną hipoperfuzji!" },
          { text: "Przyjmowanie leków zapierających w końskich dawkach", correct: false, feedback: "Zaparcia i wzrost ciśnienia wewnątrzguzowego pogarszają przepływ krwi." },
          { text: "Codzienne stosowanie lewatyw fosforanowych", correct: false, feedback: "Lewatywy fosforanowe mogą uszkadzać śluzówkę i wywoływać zaburzenia elektrolitowe." }
        ]
      }
    ],
    pathoNodes: [
      { id: "p1", label: "Epizod hipotonii / hipoperfuzji", desc: "Spadek rzutu serca i perfuzji krezkowej u pacjenta z miażdżycą naczyń." },
      { id: "p2", label: "Niedokrwienie w punkcie Griffithsa", desc: "Zagięcie śledzionowe (watershed area) cierpi z powodu niedostatecznego krążenia obocznego." },
      { id: "p3", label: "Obrzęk błony śluzowej i krwawienie", desc: "Złuszczanie nabłonka, krwiaki podśluzówkowe (thumbprinting) i krwisto-śluzowe stolce." }
    ],
    diffTable: [
      { disease: "Ischaemic colitis (niedokrwienne zapalenie okrężnicy)", feature: "Starszy wiek, epizod hipotonii, kurczowy ból lewego podbrzusza + krwawy stolec, zagięcie śledzionowe" },
      { disease: "Ostre niedokrwienie krezki (zator SMA)", feature: "Dramatyczny ból nieproporcjonalny do badania, miękki brzuch, zawał jelita cienkiego, zator sercopochodny" },
      { disease: "Wrzodziejące zapalenie jelita grubego (WZJG)", feature: "Zawsze zajmuje odbytnicę (proctitis), przewlekłe krwawe biegunki, młodszy wiek zachorowania" },
      { disease: "Zapalenie uchyłków esicy", feature: "Ból w lewym dole biodrowym, gorączka, zwykle bez masywnego krwawienia ze stolcem" }
    ],
    dutySummary: "Pacjentka 74-letnia z niedokrwiennym zapaleniem jelita grubego (Colitis ischaemica) w obrębie zagięcia śledzionowego i okrężnicy zstępującej po epizodzie hipotonii. Zastosowano nawodnienie dożylne, dietę zerową, empiryczną antybiotykoterapię i odstawiono leki nasilające hipotensję. Uzyskano ustąpienie bólów i normalizację parametrów zapalnych bez konieczności interwencji chirurgicznej.",
    lekQuestions: [
      {
        question: "Punkt Griffithsa, będący strefą krytyczną podatną na niedokrwienie w jelicie grubym (watershed area), odpowiada anatomicznie:",
        options: ["Zagięciu śledzionowemu okrężnicy", "Zagięciu wątrobowemu okrężnicy", "Kątnicy", "Połączeniu esiczo-odbytniczemu", "Okrężnicy poprzecznej"],
        answer: "Zagięciu śledzionowemu okrężnicy",
        explanation: "Punkt Griffithsa znajduje się w zagięciu śledzionowym okrężnicy, na granicy unaczynienia z tętnicy krezkowej górnej i dolnej. Drugim takim punktem jest punkt Sudecka w okolicy esiczo-odbytniczej."
      },
      {
        question: "Klasycznym objawem radiologicznym niedokrwiennego zapalenia jelita grubego widocznym we wlewie doodbytniczym lub w TK jest:",
        options: ["Objaw odcisku kciuka (thumbprinting)", "Objaw rury ołowianej (lead pipe)", "Objaw sznura (string sign)", "Objaw rogu jelenia", "Objaw menisku"],
        answer: "Objaw odcisku kciuka (thumbprinting)",
        explanation: "Objaw odcisku kciuka (thumbprinting) wynika z obrzęku podśluzówkowego i ogniskowych wybroczyn krwawych wpuklających się do światła okrężnicy."
      },
      {
        question: "Które z poniższych stwierdzeń dotyczących niedokrwiennego zapalenia jelita grubego (ischaemic colitis) jest PRAWDZIWE?",
        options: [
          "U większości chorych (>80%) ma charakter przemijający i nie wymaga leczenia operacyjnego",
          "Zawsze wymaga natychmiastowej kolektomii całkowitej",
          "Nigdy nie powoduje krwawienia z dolnego odcinka przewodu pokarmowego",
          "Dotyczy wyłącznie jelita krętego i czczego",
          "Złotym standardem leczenia jest podawanie wysokich dawek wazopresyny"
        ],
        answer: "U większości chorych (>80%) ma charakter przemijający i nie wymaga leczenia operacyjnego",
        explanation: "Niedokrwienne zapalenie okrężnicy najczęściej ogranicza się do powierzchownych warstw ściany i cofa się samoistnie po wyrównaniu hemodynamicznym."
      }
    ],
    flashcards: [
      { front: "Co to jest punkt Griffithsa?", back: "Zagięcie śledzionowe okrężnicy – strefa graniczna unaczynienia pomiędzy tętnicą krezkową górną a dolną, najbardziej podatna na niedokrwienie." },
      { front: "Co to jest punkt Sudecka?", back: "Połączenie esiczo-odbytnicze – strefa graniczna pomiędzy tętnicą krezkową dolną a tętnicami biodrowymi wewnętrznymi." },
      { front: "Co oznacza objaw odcisku kciuka (thumbprinting)?", back: "Objaw radiologiczny w TK/wlewie odzwierciedlający podśluzówkowy obrzęk i wynaczynienia krwi w niedokrwieniu jelita." },
      { front: "Jak różni się rokowanie ischaemic colitis od zatoru SMA?", back: "Ischaemic colitis u >80% ustępuje po leczeniu zachowawczym; zator SMA daje martwicę transmuralną jelita cienkiego i wymaga natychmiastowej operacji." },
      { front: "Jakie jest ryzyko nadmiernej insuflacji podczas kolonoskopii w ischaemic colitis?", back: "Wysokie ryzyko jatrogennej perforacji osłabionej ściany jelita oraz nasilenie niedokrwienia przez ucisk kapilar." }
    ]
  },

  // 140: Pęknięty tętniak aorty brzusznej (rAAA)
  {
    id: 140,
    filename: "140_pekniety_tetniak_aorty_brzusznej_raaa.json",
    dept: "Chirurgia",
    shortTitle: "71-letni mężczyzna, palacz, z nagłym bólem okolicy lędźwiowej, hipotoniczny – Klasyczna triada objawów, pulsujący guz brzucha i wstrząs krwotoczny (rAAA)",
    diagnosisTitle: "Pęknięty tętniak aorty brzusznej (Ruptured Abdominal Aortic Aneurysm - rAAA) z krwiakiem przestrzeni zaotrzewnowej",
    vitals: [
      { label: "HR", val: "124/min", sub: "Tachykardia kompensacyjna", status: "bad" },
      { label: "BP", val: "82/46 mmHg", sub: "Głęboka hipotonia / wstrząs krwotoczny", status: "bad" },
      { label: "SpO2", val: "94%", sub: "Na tlenie 4 l/min", status: "warn" },
      { label: "RR", val: "26/min", sub: "Tachypnoe", status: "warn" },
      { label: "Temp", val: "35.8°C", sub: "Hipotermia", status: "warn" }
    ],
    vitalsObj: { hr: 124, bp: "82/46", spo2: 94, rr: 26, temp: 35.8 },
    story: "71-letni mężczyzna, wieloletni palacz tytoniu z nadciśnieniem tętniczym i chorobą niedokrwienną serca, został przywieziony przez ZRM z powodu nagłego, rozdzierającego bólu w okolicy lędźwiowo-krzyżowej i podbrzuszu, z zasłabnięciem w toalecie 40 minut temu. ZRM rozpoznał początkowo 'napad kolki nerkowej', jednak stan pacjenta gwałtownie się pogorszył. W badaniu fizykalnym: pacjent blady, zlany zimnym potem, podsypiający. Brzuch nieco wzdęty, w śródbrzuszu i po stronie lewej wyczuwalny bardzo bolesny, ekspansywnie tętniący guz wielkości pięści. Tętna na tętnicach udowych słabo wyczuwalne, symetryczne. W USG przyłóżkowym aorta brzuszna poszerzona do 7.8 cm z nieregularnym obrysem ściany i obecnością płynu/krwiaka w przestrzeni zaotrzewnowej.",
    labs: [
      {
        category: "Morfologia i gazometria krwi tętniczej CITO",
        items: [
          { name: "Hemoglobina (Hb)", val: "7.6 g/dL (ciężka ostra niedokrwistość)", norm: "13.5–17.5 g/dL", flag: "L" },
          { name: "Hematokryt (Hct)", val: "23%", norm: "40–52%", flag: "L" },
          { name: "Mleczany w gazometrii", val: "6.2 mmol/L (ciężka hipoperfuzja tkankowa)", norm: "0.5–2.0 mmol/L", flag: "H" },
          { name: "pH krwi tętniczej", val: "7.22 (kwasica metaboliczna)", norm: "7.35–7.45", flag: "L" },
          { name: "Grupa krwi i próba zgodności", val: "CITO – natychmiastowe zamówienie 6 jedn. KKCz i 4 jedn. FFP (protokół MTP)", norm: "Wykonano", flag: "N" }
        ]
      },
      {
        category: "Badania obrazowe (USG i Angio-TK)",
        items: [
          { name: "USG aorty na SOR (Bedside)", val: "Tętniak aorty podnerkowej o średnicy 78 mm z przerwaniem ciągłości ściany boczno-tylnej lewej i krwiakiem zaotrzewnowym", norm: "Średnica aorty < 20 mm", flag: "H" },
          { name: "Angio-TK aorty brzusznej (u pacjenta 'borderline' stabilnego)", val: "Pęknięcie tętniaka aorty podnerkowej z wynaczynieniem środka cieniującego do przestrzeni zaotrzewnowej lewej. Szyja tętniaka długości 18 mm, kątowanie 40 stopni (anatomicznie dostępny do pilnego EVAR)", norm: "Brak tętniaka", flag: "H" }
        ]
      },
      {
        category: "Koagulologia",
        items: [
          { name: "INR / Fibrynogen", val: "1.45 / 1.6 g/L (zużycie czynników krzepnięcia)", norm: "0.9–1.2 / 2.0–4.0 g/L", flag: "warn" },
          { name: "Płytki krwi (PLT)", val: "110 G/L", norm: "150–400 G/L", flag: "L" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Klasyczna triada objawów pękniętego tętniaka aorty brzusznej",
        task: "Jakie objawy tworzą klasyczną triadę kliniczną pękniętego tętniaka aorty brzusznej (rAAA)?",
        options: [
          { text: "Nagły silny ból brzucha lub okolicy lędźwiowej + hipotonia/wstrząs + tętniący guz w jamie brzusznej", correct: true, feedback: "Prawidłowo! Klasyczna triada rAAA występuje u około 50% chorych: 1) nagły ból lędźwiowy/brzuszny, 2) wstrząs hipowolemiczny (hipotensja, tachykardia, bladość), 3) wyczuwalny palpacyjnie pulsujący opór w jamie brzusznej. Najczęstszy błąd to pomylenie z kolką nerkową!" },
          { text: "Gorączka + żółtaczka + ból prawego podżebrza", correct: false, feedback: "To triada Charcota w zapaleniu dróg żółciowych." },
          { text: "Ból głowy + sztywność karku + światłowstręt", correct: false, feedback: "To zespół oponowy." },
          { text: "Duszność + krwioplucie + ból opłucnowy", correct: false, feedback: "To triada zatorowości płucnej." }
        ]
      },
      {
        num: 2,
        title: "Pułapka diagnostyczna: imitacja kolki nerkowej",
        task: "Dlaczego pęknięty tętniak aorty brzusznej jest tak często błędnie diagnozowany jako kolka nerkowa?",
        options: [
          { text: "Krew wynaczyniająca się do przestrzeni zaotrzewnowej uciska moczowód i sploty nerwowe lędźwiowe, wywołując ból promieniujący do pachwiny i moszny, czasem z krwiomoczem", correct: true, feedback: "Prawidłowo! To jedna z najgroźniejszych 'pułapek' w medycynie ratunkowej: każdy starszy pacjent (zwłaszcza mężczyzna >60-65 r.ż., palacz) z pierwszym w życiu epizodem rzekomej 'kolki nerkowej' musi mieć w pierwszej kolejności zbadany brzuch w kierunku tętniaka aorty!" },
          { text: "Tętniak produkuje szczawiany wapnia, które zatykają moczowód", correct: false, feedback: "Absurd patofizjologiczny." },
          { text: "Nerka ulega natychmiastowemu samozniszczeniu", correct: false, feedback: "Nerka nie ulega samozniszczeniu." },
          { text: "Aorta łączy się bezpośrednio z pęcherzem moczowym", correct: false, feedback: "Brak takiego anatomicznego połączenia." }
        ]
      },
      {
        num: 3,
        title: "Koncepcja hipotensji permisywnej (Permissive Hypotension)",
        task: "Jaki jest cel docelowy ciśnienia tętniczego podczas wstępnej resuscytacji płynowej pacjenta z podejrzeniem pękniętego tętniaka aorty brzusznej przed hemostazą operacyjną?",
        options: [
          { text: "Utrzymanie skurczowego ciśnienia tętniczego (SBP) na poziomie 70–90 mmHg (hipotensja kontrolowana), dopóki chory jest przytomny", correct: true, feedback: "Prawidłowo! Zgodnie z wytycznymi ESVS i chirurgii naczyniowej, agresywne podnoszenie ciśnienia (np. SBP >100 mmHg) wypłukuje skrzep zaotrzewnowy (tamponadę krwiaka), wznawia katastrofalne krwawienie i nasila koagulopatię z rozcieńczenia. Dążymy do hipotensji permisywnej." },
          { text: "Agresywne przetoczenie 4 litrów krystaloidów w celu podniesienia BP do 140/90 mmHg", correct: false, feedback: "Doprowadziłoby do zerwania skrzepu i zgonu na stole operacyjnym." },
          { text: "Obniżenie ciśnienia poniżej 40 mmHg za pomocą nitratów", correct: false, feedback: "Spowodowałoby natychmiastowe zatrzymanie krążenia mózgowego i wieńcowego." },
          { text: "Całkowite zaniechanie dostępu naczyniowego", correct: false, feedback: "Konieczne są natychmiast 2 grube kaniule (14G/16G)." }
        ]
      },
      {
        num: 4,
        title: "Wybór metody zaopatrzenia naczyniowego: EVAR vs operacja otwarta",
        task: "Jakie metody operacyjne stosuje się obecnie w leczeniu pękniętego tętniaka aorty brzusznej i kiedy preferuje się EVAR?",
        options: [
          { text: "Zabieg wewnątrznaczyniowy (rEVAR) – stentgraft aortalny wprowadzany przez tętnice udowe, preferowany gdy anatomia naczyniowa na to pozwala i ośrodek ma odpowiednie zaplecze; alternatywą jest pilna klasyczna operacja otwarta z zaklemowaniem aorty", correct: true, feedback: "Prawidłowo! Współczesne wytyczne ESVS (European Society for Vascular Surgery) zalecają strategię 'EVAR-first' u stabilnych lub względnie stabilnych chorych z odpowiednią anatomią (odpowiednia szyja tętniaka), co wiąże się z niższą śmiertelnością okołooperacyjną. Przy braku warunków anatomicznych lub skrajnej niestabilności wykonuje się operację otwartą." },
          { text: "Wyłącznie leczenie zachowawcze heparyną", correct: false, feedback: "Heparyna w pękniętym tętniaku to pewna śmierć." },
          { text: "Planowa operacja za 6 miesięcy", correct: false, feedback: "Pęknięty tętniak bez natychmiastowej operacji jest w 100% śmiertelny." },
          { text: "Embolizacja gałęzi oskrzelowych", correct: false, feedback: "Brak związku z aortą brzuszną." }
        ]
      },
      {
        num: 5,
        title: "Cewnik z balonem okluzyjnym (REBOA)",
        task: "Do czego służy balon aortalny (np. technika REBOA) u skrajnie niestabilnego pacjenta z pękniętym tętniakiem aorty?",
        options: [
          { text: "Wprowadzany przez tętnicę udową i wypełniany powyżej pęknięcia (w aorcie zstępującej strefy I) pozwala na czasowe zamknięcie światła aorty i zatrzymanie krwawienia do czasu klemowania operacyjnego lub implantacji stentgraftu", correct: true, feedback: "Prawidłowo! Balonowa okluzja aorty (REBOA - Resuscitative Endovascular Balloon Occlusion of the Aorta) to ratunkowa procedura 'endovascular clamping', która pozwala zatrzymać śmiertelny krwotok i podnieść ciśnienie w krążeniu wieńcowym i mózgowym." },
          { text: "Do ciągłego płukania jamy otrzewnej solą fizjologiczną", correct: false, feedback: "Brak takiego zastosowania." },
          { text: "Do pobierania próbek kału", correct: false, feedback: "Balon aortalny znajduje się w naczyniu krwionośnym." },
          { text: "Do mechanicznego rozbijania blaszek miażdżycowych", correct: false, feedback: "Nie służy do aterektomii." }
        ]
      },
      {
        num: 6,
        title: "Wskazania do planowego leczenia tętniaków aorty brzusznej",
        task: "Od jakiej średnicy tętniaka aorty brzusznej u mężczyzn i kobiet bezobjawowy tętniak kwalifikuje się standardowo do PLANOWEJ operacji?",
        options: [
          { text: ">= 5.5 cm u mężczyzn oraz >= 5.0 cm u kobiet, lub przy szybkim tempie wzrostu (>1.0 cm/rok lub >0.5 cm w 6 miesięcy)", correct: true, feedback: "Prawidłowo! Zgodnie z wytycznymi ESVS/PTChir, próg interwencji planowej wynosi 5.5 cm dla mężczyzn i 5.0 cm dla kobiet (ze względu na mniejszy przekrój aorty i wyższe ryzyko pęknięcia u kobiet), a także szybkie tempo powiększania się tętniaka." },
          { text: "Powyżej 2.0 cm u obu płci", correct: false, feedback: "2.0 cm to górna granica normy średnicy aorty." },
          { text: "Dopiero po przekroczeniu 10 cm", correct: false, feedback: "Przy 10 cm większość tętniaków dawno uległa pęknięciu." },
          { text: "Każdy tętniak niezależnie od wymiaru (nawet 2.5 cm)", correct: false, feedback: "Małe tętniaki monitoruje się w USG (watchful waiting)." }
        ]
      },
      {
        num: 7,
        title: "Groźne powikłanie pooperacyjne – zespół ciasnoty wewnątrzbrzusznej",
        task: "Jakie powikłanie może rozwinąć się po masywnym przetoczeniu płynów i operacji pękniętego tętniaka z dużym krwiakiem zaotrzewnowym?",
        options: [
          { text: "Zespół ciasnoty wewnątrzbrzusznej (Abdominal Compartment Syndrome - ACS) z ciśnieniem śródbrzusznym >20 mmHg, skąpomoczem i niewydolnością oddechową", correct: true, feedback: "Prawidłowo! ACS wynika z obrzęku trzewi i krwiaka zaotrzewnowego. Prowadzi do ucisku żyły głównej dolnej, spadku rzutu serca, hipoperfuzji nerek (anuria) i ucisku na przeponę. Wymaga pomiaru ciśnienia w pęcherzu moczowym i ewentualnej laparostomii odbarczającej." },
          { text: "Choroba Alzheimera w ciągu 24 godzin", correct: false, feedback: "Brak takiego powikłania." },
          { text: "Kamica pęcherzyka żółciowego", correct: false, feedback: "Nie jest ostrym powikłaniem reanimacyjnym." },
          { text: "Płaskostopie pourazowe", correct: false, feedback: "Brak związku." }
        ]
      },
      {
        num: 8,
        title: "Podsumowanie – rokowanie i organizacja opieki",
        task: "Jaka jest szacunkowa całkowita śmiertelność w pękniętym tętniaku aorty brzusznej i co decyduje o szansie przeżycia?",
        options: [
          { text: "Całkowita śmiertelność wynosi około 80–90% (ponad połowa umiera przed dotarciem do szpitala), a kluczem do przeżycia jest natychmiastowe rozpoznanie, hipotensja permisywna i bezwłoczny transport na salę hybrydową/operacyjną", correct: true, feedback: "Prawidłowo! rAAA to jeden z najbardziej śmiertelnych stanów w medycynie. U chorych zoperowanych śmiertelność wynosi 30–50%. Każda minuta opóźnienia na zbędne badania u niestabilnego chorego drastycznie zmniejsza szanse na przeżycie." },
          { text: "Śmiertelność wynosi poniżej 1% bez operacji", correct: false, feedback: "Bez operacji śmiertelność wynosi 100%." },
          { text: "Pacjent może spokojnie poczekać do planowego dyżuru w poniedziałek", correct: false, feedback: "Zgon następuje w ciągu minut lub kilku godzin." },
          { text: "Rutynowe leczenie polega na naświetlaniach promieniami rentgenowskimi", correct: false, feedback: "Niedorzeczne." }
        ]
      }
    ],
    pathoNodes: [
      { id: "p1", label: "Degradacja sprężysta ściany aorty", desc: "Zanik elastyny i kolagenu w błonie środkowej pod wpływem metaloproteinaz (MMP) i palenia." },
      { id: "p2", label: "Pęknięcie torebki tętniaka", desc: "Przerwanie ściany z krwawieniem do przestrzeni zaotrzewnowej lub do wolnej jamy otrzewnej." },
      { id: "p3", label: "Wstrząs krwotoczny i tamponada", desc: "Przestrzeń zaotrzewnowa częściowo ogranicza krwawienie (tamponada); zerwanie tamponady powoduje zgon." }
    ],
    diffTable: [
      { disease: "Pęknięty tętniak aorty brzusznej (rAAA)", feature: "Starszy palacz, hipotonia, pulsujący guz, ból lędźwiowy, poszerzenie aorty w USG" },
      { disease: "Kolka nerkowa", feature: "Ból kolkowy lędźwiowy, pacjent pobudzony ruchowo, brak hipotonii i wstrząsu, poszerzony UKM w USG" },
      { disease: "Ostre zapalenie trzustki", feature: "Wywiad alkoholowy/kamica, ból opasujący, nudności/wymioty, amylaza/lipaza >3x norma" },
      { disease: "Zawał ściany dolnej serca", feature: "Uniesienie ST w II, III, aVF, ból w klatce/nadbrzuszu, enzymy sercowe dodatnie" }
    ],
    dutySummary: "Pacjent 71-letni w stanie wstrząsu krwotocznego z pękniętym tętniakiem aorty brzusznej podnerkowej (7.8 cm). Wdrożono protokół masywnej transfuzji (MTP) i hipotensję permisywną (SBP ~80 mmHg). Zespół naczyniowy wykonał pilną implantację stentgraftu aortalnego (rEVAR) w sali hybrydowej ze skutecznym zabezpieczeniem hemostazy.",
    lekQuestions: [
      {
        question: "Wskaż składowe klasycznej triady objawów pękniętego tętniaka aorty brzusznej:",
        options: [
          "Ból brzucha/okolicy lędźwiowej, hipotensja/wstrząs, pulsujący guz w jamie brzusznej",
          "Ból w prawym podżebrzu, żółtaczka, gorączka z dreszczami",
          "Bolesne parcie na mocz, krwiomocz, ból podbrzusza",
          "Duszność wdechowa, świsty, sinica",
          "Ból głowy, wymioty chlustające, obrzęk tarczy nerwu wzrokowego"
        ],
        answer: "Ból brzucha/okolicy lędźwiowej, hipotensja/wstrząs, pulsujący guz w jamie brzusznej",
        explanation: "Triada: silny ból brzucha/lędźwi + wstrząs hipowolemiczny + tętniący opór w jamie brzusznej stanowi patognomoniczny obraz pęknięcia tętniaka aorty brzusznej."
      },
      {
        question: "Wartość progowa średnicy bezobjawowego tętniaka aorty brzusznej kwalifikująca mężczyznę do planowego zabiegu naprawczego wynosi:",
        options: ["5.5 cm", "4.0 cm", "3.0 cm", "7.0 cm", "8.5 cm"],
        answer: "5.5 cm",
        explanation: "Zgodnie z wytycznymi ESVS wskazaniem do planowej operacji u mężczyzn jest średnica tętniaka >= 55 mm (u kobiet >= 50 mm)."
      },
      {
        question: "Podczas przygotowania do operacji pękniętego tętniaka aorty brzusznej zaleca się strategię resuscytacji zwaną hipotensją permisywną, która polega na:",
        options: [
          "Utrzymaniu ciśnienia skurczowego w granicach 70–90 mmHg w celu uniknięcia wypłukania skrzepu zaotrzewnowego",
          "Agresywnej płynoterapii do osiągnięcia ciśnienia skurczowego >140 mmHg",
          "Obniżeniu ciśnienia skurczowego do wartości <40 mmHg za pomocą nitroprusydku sodu",
          "Podawaniu wyłącznie 10% roztworu glukozy",
          "Stosowaniu leków moczopędnych w celu odbarczenia układu krążenia"
        ],
        answer: "Utrzymaniu ciśnienia skurczowego w granicach 70–90 mmHg w celu uniknięcia wypłukania skrzepu zaotrzewnowego",
        explanation: "Hipotensja permisywna (SBP 70–90 mmHg) minimalizuje utratę krwi i chroni wytworzoną tamponadę zaotrzewnową przed rozerwaniem."
      }
    ],
    flashcards: [
      { front: "Jaka jest klasyczna triada pękniętego tętniaka aorty brzusznej?", back: "1. Ból brzucha lub lędźwiowy, 2. Hipotensja/wstrząs, 3. Pulsujący guz w jamie brzusznej." },
      { front: "Z czym najczęściej mylony jest rAAA na ostrym dyżurze?", back: "Z kolką nerkową (promieniowanie do pachwiny z powodu krwiaka zaotrzewnowego u starszego palacza)." },
      { front: "Jaka jest docelowa wartość SBP w hipotensji permisywnej w rAAA?", back: "Około 70–90 mmHg (wystarcza do zachowania przytomności, zapobiega wypłukaniu skrzepu)." },
      { front: "Jaki jest próg średnicy kwalifikujący do planowej operacji AAA?", back: ">= 5.5 cm u mężczyzn, >= 5.0 cm u kobiet (lub wzrost >1 cm/rok)." },
      { front: "Co oznacza skrót EVAR?", back: "Endovascular Aneurysm Repair – wewnątrznaczyniowa naprawa tętniaka za pomocą stentgraftu naczyniowego." }
    ]
  },

  // 141: Ostre niedokrwienie kończyny dolnej (Acute Limb Ischemia - ALI)
  {
    id: 141,
    filename: "141_ostre_niedokrwienie_konczyny_dolnej.json",
    dept: "Chirurgia",
    shortTitle: "69-letnia kobieta z migotaniem przedsionków – Nagły, lodowaty ból prawej kończyny dolnej, bladość stopy i brak tętna (Reguła 6xP / Zator tętniczy)",
    diagnosisTitle: "Ostre niedokrwienie prawej kończyny dolnej (Acute Limb Ischemia - ALI) w przebiegu zatoru tętnicy udowej wspólnej (klasa IIa/IIb wg Rutherforda)",
    vitals: [
      { label: "HR", val: "112/min", sub: "Niemiarowość całkowita (AF)", status: "warn" },
      { label: "BP", val: "142/86 mmHg", sub: "Prawidłowe", status: "ok" },
      { label: "SpO2", val: "97%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "18/min", sub: "Prawidłowy", status: "ok" },
      { label: "Temp", val: "36.6°C", sub: "Prawidłowa", status: "ok" }
    ],
    vitalsObj: { hr: 112, bp: "142/86", spo2: 97, rr: 18, temp: 36.6 },
    story: "69-letnia pacjentka z napadowym migotaniem przedsionków (niestosująca doustnej antykoagulacji z powodu lęku przed krwawieniem) została przywieziona na SOR z powodu nagłego, obezwładniającego bólu prawej kończyny dolnej, który pojawił się 3 godziny temu podczas oglądania telewizji. Ból zaczął się nagle, 'jak uderzenie biczem'. Stopa i podudzie zdrętwiały, pojawiło się uczucie mrowienia. W badaniu fizykalnym: prawa kończyna dolna od połowy goleni ku dołowi jest trupio blada ('marmurkowata'), lodowato zimna w dotyku w porównaniu z ciepłą lewą kończyną. Tętno na prawej tętnicy udowej pod więzadłem pachwinowym jest wyczuwalne, ale na tętnicy podkolanowej, grzbietowej stopy i piszczelowej tylnej – CAŁKOWICIE NIEOBECNE. Badaniem dopplerowskim brak sygnału przepływu tętniczego na stopie. Czucie dotyku na grzbiecie stopy osłabione, ruchomość palców nieznacznie ograniczona, ale zachowana.",
    labs: [
      {
        category: "Badania laboratoryjne i markery uszkodzenia mięśni",
        items: [
          { name: "Kinaza fosfokreatynowa (CPK)", val: "1450 IU/L (wzrost świadczący o uszkodzeniu mięśni)", norm: "24–170 IU/L", flag: "H" },
          { name: "Mioglobina w surowicy", val: "420 ug/L (wzrost)", norm: "25–72 ug/L", flag: "H" },
          { name: "Potas w surowicy (K+)", val: "4.7 mmol/L (prawidłowy, wymaga kontroli)", norm: "3.5–5.1 mmol/L", flag: "N" },
          { name: "Mleczany surowicy", val: "2.8 mmol/L", norm: "0.5–2.0 mmol/L", flag: "H" }
        ]
      },
      {
        category: "Badania układu krzepnięcia i EKG",
        items: [
          { name: "EKG spoczynkowe", val: "Migotanie przedsionków (AF) z akcją komór 110–120/min, bez cech świeżego STEMI", norm: "Rytm zatokowy", flag: "H" },
          { name: "INR / APTT", val: "1.05 / 28 s", norm: "0.9–1.2 / 26–36 s", flag: "N" }
        ]
      },
      {
        category: "Przyłóżkowe badanie naczyniowe (Doppler ręczny)",
        items: [
          { name: "Sygnał dopplerowski tętniczy prawej stopy", val: "Całkowity brak sygnału tętniczego na a. dorsalis pedis i a. tibialis posterior; zachowany przepływ żylny", norm: "Trójfazowy sygnał tętniczy", flag: "H" },
          { name: "Sygnał dopplerowski kończyny lewej", val: "Prawidłowy, trójfazowy na wszystkich poziomach", norm: "Trójfazowy", flag: "N" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Kliniczna reguła 6xP ostrego niedokrwienia",
        task: "Jakie objawy kliniczne składają się na klasyczną angielską regułę 6xP ostrego niedokrwienia kończyny?",
        options: [
          { text: "Pain (ból), Pallor (bladość), Pulselessness (brak tętna), Paresthesia (parestezje), Paralysis (porażenie/niedowład), Poikilothermia (ziębnięcie/ochłodzenie)", correct: true, feedback: "Prawidłowo! Reguła 6xP to fundament rozpoznania ALI (Acute Limb Ischemia). Wystąpienie parestezji i porażenia ruchowego (Paralysis) świadczy o zaawansowanym niedokrwieniu pni nerwowych i włókien mięśniowych – to 'ostatni dzwonek' przed nieodwracalną martwicą." },
          { text: "Polyuria, Polydipsia, Polyphagia, Pruritus, Petechiae, Palpitations", correct: false, feedback: "To objawy endokrynologiczne i dermatologiczne." },
          { text: "Pyrexia, Proteinuria, Pleocytosis, Papilledema, Purpura, Phlebitis", correct: false, feedback: "To objawy infekcyjne/reumatologiczne." },
          { text: "Pain, Panic, Plethora, Priapism, Ptosis, Polycythemia", correct: false, feedback: "Nieadekwatny zestaw." }
        ]
      },
      {
        num: 2,
        title: "Złoty czas na rewaskularyzację (okno czasowe)",
        task: "Ile wynosi maksymalny czas tolerancji całkowitego niedokrwienia mięśni poprzecznie prążkowanych kończyny, po przekroczeniu którego dochodzi do nieodwracalnej martwicy?",
        options: [
          { text: "Około 6 godzin ('złote okno' 4–6 godzin)", correct: true, feedback: "Prawidłowo! Nerwy obwodowe ulegają uszkodzeniu po ok. 2–4 godzinach, a mięśnie szkieletowe tolerują ostre całkowite niedokrwienie przez maksymalnie 6 godzin. Po tym czasie dochodzi do nieodwracalnej martwicy i zesztywnienia mięśni (rigor mortis kończyny)." },
          { text: "24–48 godzin", correct: false, feedback: "Po 24 godzinach kończyna jest już całkowicie martwa i nadaje się wyłącznie do amputacji." },
          { text: "30 minut", correct: false, feedback: "30 minut to czas dla mózgu lub serca, mięśnie szkieletowe wytrzymują dłużej." },
          { text: "7 dni", correct: false, feedback: "Zupełnie nierealny czas w ostrym zatrzymaniu krążenia kończynowego." }
        ]
      },
      {
        num: 3,
        title: "Natychmiastowe postępowanie farmakologiczne na SOR",
        task: "Jaki lek należy podać natychmiast drogą dożylną po rozpoznaniu ostrego niedokrwienia kończyny, jeszcze przed wykonaniem badań obrazowych?",
        options: [
          { text: "Niefrakcjonowaną heparynę (UFH) w bolusie i.v. (zwykle 5000 IU lub 80 IU/kg), a następnie ciągły wlew dożylny", correct: true, feedback: "Prawidłowo! Zgodnie z wytycznymi ESVS natychmiastowe podanie heparyny niefrakcjonowanej hamuje propagację zakrzepu w obwodowym łożysku mikronaczyniowym (apposition thrombosis) i zapobiega zakrzepicy w łożysku żylnym. Jest to krok bezwzględnie priorytetowy." },
          { text: "Doustny lek moczopędny (furosemid)", correct: false, feedback: "Odwodnienie pogarsza reologię krwi." },
          { text: "Witamina K w iniekcji domięśniowej", correct: false, feedback: "Nasilenie krzepnięcia doprowadziłoby do katastrofy." },
          { text: "Antybiotyk aminoglikozydowy", correct: false, feedback: "Brak wskazań przeciwdrobnoustrojowych w czystym zatorze." }
        ]
      },
      {
        num: 4,
        title: "Różnicowanie: zator (embolia) a zakrzepica (thrombosis)",
        task: "Które cechy przemawiają za zatorem tętniczym, a nie zakrzepicą na podłożu miażdżycy?",
        options: [
          { text: "Nagły początek bólu ('z minuty na minutę'), wywiad migotania przedsionków lub zawału serca, brak wcześniejszego chromania przestankowego i prawidłowe tętno na drugiej kończynie", correct: true, feedback: "Prawidłowo! Zator (embolia) pochodzi najczęściej z lewego przedsionka w AF i trafia w zdrowe, nieprzygotowane naczynie (brak krążenia obocznego), stąd gwałtowny obraz. Zakrzepica rozwija się stopniowo na blaszce miażdżycowej, u pacjenta z wieloletnim chromaniem i rozwiniętym krążeniem obocznym." },
          { text: "Wieloletnie chromanie przestankowe na dystansie 50 metrów", correct: false, feedback: "To cecha przewlekłej miażdżycy i zakrzepicy miejscowej." },
          { text: "Brak jakichkolwiek chorób serca w wywiadzie", correct: false, feedback: "Brak źródła zatoru sercopochodnego sugeruje raczej zakrzepicę in situ." },
          { text: "Stopniowe nasilanie się objawów przez 3 tygodnie", correct: false, feedback: "Zator ma przebieg gwałtowny, piorunujący." }
        ]
      },
      {
        num: 5,
        title: "Klasyfikacja Rutherforda ostrego niedokrwienia",
        task: "Pacjentka ma zachowaną ruchomość palców, nieznaczny ubytek czucia na grzbiecie stopy i brak sygnału tętniczego dopplerowskiego przy słyszalnym sygnale żylnym. Do której klasy Rutherforda należy i jakie to ma znaczenie?",
        options: [
          { text: "Klasa IIa / IIb (kończyna bezpośrednio zagrożona, ale odwracalna) – wymaga natychmiastowej rewaskularyzacji chirurgicznej w ciągu kilku godzin", correct: true, feedback: "Prawidłowo! Klasyfikacja Rutherforda: I (kończyna stabilna), IIa (nieznacznie zagrożona), IIb (bezpośrednio zagrożona z deficytem czuciowo-ruchowym) – wymagają natychmiastowej rewaskularyzacji; III (nieodwracalna martwica z całkowitym porażeniem i stężeniem mięśni – wskazanie do pierwotnej amputacji)." },
          { text: "Klasa I (brak jakiegokolwiek zagrożenia)", correct: false, feedback: "Ubytek czucia i brak tętna świadczą o bezpośrednim zagrożeniu kończyny." },
          { text: "Klasa III (martwica nieodwracalna, natychmiastowa amputacja udowa)", correct: false, feedback: "Ruchomość palców jest zachowana, kończyna jest jak najbardziej do uratowania!" },
          { text: "Klasa 0 (stan prawidłowy)", correct: false, feedback: "Stan zagrożenia utraty kończyny." }
        ]
      },
      {
        num: 6,
        title: "Leczenie operacyjne – embolektomia cewnikiem Fogarty'ego",
        task: "Jaki jest podstawowy klasyczny zabieg chirurgiczny usuwający świeży materiał zatorowy z tętnicy kończyny?",
        options: [
          { text: "Embolektomia przezskórna lub otwarta przy użyciu cewnika balonowego Fogarty'ego wprowadzany przez tętnicę udową pod miejscowym znieczuleniem", correct: true, feedback: "Prawidłowo! Cewnik Fogarty'ego (wprowadzony w 1963 r.) to rewolucyjny przyrząd z balonikiem na końcu: wprowadza się go poza zator, napełnia balonik i wyciąga zator z naczynia. Zabieg można wykonać w znieczuleniu miejscowym w trybie pilnym." },
          { text: "Wycięcie całej tętnicy udowej bez rekonstrukcji", correct: false, feedback: "Doprowadziłoby do martwicy kończyny." },
          { text: "Przeszczep allogeniczny nerwu kulszowego", correct: false, feedback: "Nie rozwiązuje problemu naczyniowego." },
          { text: "Drenaż ssący jamy opłucnej", correct: false, feedback: "Brak związku narządowego." }
        ]
      },
      {
        num: 7,
        title: "Groźne powikłanie porewaskularyzacyjne – zespół reperfuzji",
        task: "Co to jest zespół poreperfuzyjny (zespół po niedokrwieniu / zespół zmiażdżenia) i fasciotomia?",
        options: [
          { text: "Po przywróceniu przepływu dochodzi do wypłukania do krążenia ogólnego mioglobiny, potasu (ryzyko hiperkaliemii i ostrej martwicy cewek nerkowych) oraz masywnego obrzęku mięśni w ciasnych przedziałach powięziowych podudzia, co wymaga odbarczającej fasciotomii", correct: true, feedback: "Prawidłowo! Reperfuzja niedokrwionych tkanek prowadzi do uwalniania rodników tlenowych, obrzęku komórek mięśniowych i wzrostu ciśnienia w lożach mięśniowych goleni (zespół ciasnoty przedziałów). Aby zapobiec wtórnej martwicy, wykonuje się fasciotomię (rozcięcie powięzi przedziałów goleni)." },
          { text: "Zespół polegający na natychmiastowym wyłysieniu pacjenta", correct: false, feedback: "Absurd." },
          { text: "Spadek stężenia potasu do zera z koniecznością podawania chloreku potasu w bolusie", correct: false, feedback: "W reperfuzji występuje zagrażająca życiu hiperkaliemia, nie hipokaliemia." },
          { text: "Konieczność natychmiastowego zamknięcia skóry szwami mechanicznymi pod wysokim napięciem", correct: false, feedback: "Rany po fasciotomii pozostawia się otwarte!" }
        ]
      },
      {
        num: 8,
        title: "Długofalowa profilaktyka wtórna",
        task: "Jakie leczenie przewlekłe jest bezwzględnie wskazane u tej pacjentki po udanej embolektomii tętnicy?",
        options: [
          { text: "Doustna antykoagulacja (NOAC: apiksaban, rywaroksaban, dabigatran lub VKA) do końca życia w celu zapobiegania kolejnym rzutom zatorowości sercopochodnej", correct: true, feedback: "Prawidłowo! Źródłem zatoru było migotanie przedsionków. Brak przewlekłej antykoagulacji doprowadzi do kolejnego epizodu zatorowego (udar mózgu, ponowny zator kończyny lub krezki)." },
          { text: "Wyłącznie leki homeopatyczne", correct: false, feedback: "Nieskuteczne i niebezpieczne." },
          { text: "Unikanie chodzenia do końca życia", correct: false, feedback: "Rehabilitacja ruchowa jest wskazana po wygojeniu naczyń." },
          { text: "Kwas acetylosalicylowy w mikro-dawce 10 mg raz w tygodniu", correct: false, feedback: "W AF monoterapia przeciwpłytkowa jest nieskuteczna w zapobieganiu zatorom sercopochodnym." }
        ]
      }
    ],
    pathoNodes: [
      { id: "p1", label: "Zator z lewego przedsionka (AF)", desc: "Skrzeplina odrywa się z uszka lewego przedsionka i blokuje podział tętnicy udowej." },
      { id: "p2", label: "Ostre niedokrwienie dystalne", desc: "Zatrzymanie perfuzji kapilarnej -> niedotlenienie nerwów (<2-4h) i mięśni (<6h)." },
      { id: "p3", label: "Reperfuzja i rabdomioliza", desc: "Uwolnienie mioglobiny i potasu grozi nerkową niewydolnością i zespołem ciasnoty przedziałów." }
    ],
    diffTable: [
      { disease: "Zator tętniczy (Embolia)", feature: "Nagły początek (minuty), źródło sercowe (AF), brak krążenia obocznego, druga kończyna z prawidłowymi tętnami" },
      { disease: "Zakrzepica tętnicza in situ", feature: "Początek podostry (godziny/dni), wywiad chromania, uogólniona miażdżyca, osłabione tętna na obu kończynach" },
      { disease: "Bolesny obrzęk siniczy (Phlegmasia cerulea dolens)", feature: "Masywna zakrzepica żył głębokich, kończyna sinosinobladawa, olbrzymi obrzęk, tętna początkowo obecne" },
      { disease: "Rwa kulszowa (ischialgia)", feature: "Ból korzeniowy wzdłuż dermatomu L5/S1, kończyna ciepła, tętna zachowane, objaw Lasegue'a dodatni" }
    ],
    dutySummary: "Pacjentka 69-letnia z ostrym niedokrwieniem prawej kończyny dolnej w przebiegu zatoru tętnicy udowej wspólnej (AF). Wdrożono natychmiast bolus heparyny niefrakcjonowanej (5000 IU i.v.). Pacjentka zakwalifikowana w trybie natychmiastowym do embolektomii cewnikiem Fogarty'ego. Po zabiegu uzyskano pełny powrót tętna na obwodzie i ocalenie kończyny. Włączono NOAC w ramach prewencji wtórnej.",
    lekQuestions: [
      {
        question: "Wskaż objaw NIEWCHODZĄCY w skład klasycznej reguły 6xP ostrego niedokrwienia kończyny:",
        options: ["Pulsus paradoxus (tętno dziwaczne)", "Pain (ból)", "Pallor (bladość)", "Pulselessness (brak tętna)", "Paresthesia (parestezje)"],
        answer: "Pulsus paradoxus (tętno dziwaczne)",
        explanation: "Reguła 6xP obejmuje: Pain, Pallor, Pulselessness, Paresthesia, Paralysis, Poikilothermia. Tętno dziwaczne (Pulsus paradoxus) jest objawem tamponady serca lub ciężkiego zaostrzenia astmy."
      },
      {
        question: "Czas odwracalnego niedokrwienia mięśni szkieletowych ('złote okno czasowe') w ostrym niedokrwieniu kończyny wynosi maksymalnie:",
        options: ["4–6 godzin", "12–24 godziny", "30–45 minut", "48–72 godziny", "5–7 dni"],
        answer: "4–6 godzin",
        explanation: "Mięśnie szkieletowe tolerują ostre całkowite niedokrwienie przez maksymalnie 6 godzin. Po tym czasie dochodzi do nieodwracalnej martwicy miocytów."
      },
      {
        question: "Pierwszym lekiem, który należy niezwłocznie podać dożylnie na SOR przy podejrzeniu ostrego niedokrwienia kończyny dolnej, jest:",
        options: ["Heparyna niefrakcjonowana (UFH)", "Kwas acetylosalicylowy doustnie", "Alteplaza we wlewie ogólnoustrojowym", "Warfaryna", "Furosemid"],
        answer: "Heparyna niefrakcjonowana (UFH)",
        explanation: "Natychmiastowy bolus dożylny niefrakcjonowanej heparyny (UFH) zapobiega propagacji skrzepliny w obwodowym łożysku naczyniowym do czasu zabiegu."
      }
    ],
    flashcards: [
      { front: "Wymień 6 objawów reguły 6xP w ostrym niedokrwieniu kończyny:", back: "Pain (ból), Pallor (bladość), Pulselessness (brak tętna), Paresthesia (parestezje), Paralysis (porażenie), Poikilothermia (ziębnięcie)." },
      { front: "Ile wynosi krytyczny czas niedokrwienia mięśni szkieletowych?", back: "Około 4–6 godzin (po tym czasie rozwija się martwica nieodwracalna)." },
      { front: "Jaki zabieg jest standardem usunięcia zatoru tętniczego?", back: "Embolektomia cewnikiem balonowym Fogarty'ego (często w znieczuleniu miejscowym)." },
      { front: "Kiedy wykonuje się fasciotomię podudzia?", back: "W zespole ciasnoty przedziałów powięziowych po reperfuzji kończyny, gdy ciśnienie w lożach mięśniowych przekracza 30 mmHg." },
      { front: "Jaki jest najczęstszy punkt wyjścia zatorowości obwodowej?", back: "Serce (uszka lewego przedsionka w migotaniu przedsionków lub skrzeplina przyścienna po zawale serca) – odpowiada za >80% zatorów tętniczych." }
    ]
  },

  // 142: Przewlekłe krytyczne niedokrwienie kończyn dolnych (CLTI)
  {
    id: 142,
    filename: "142_przewlekle_krytyczne_niedokrwienie_clti.json",
    dept: "Chirurgia",
    shortTitle: "65-letni palacz z cukrzycą – Spoczynkowy ból stopy nasilający się w nocy, opuszczanie nogi z łóżka i owrzodzenie martwicze palucha (CLTI / Fontaine III/IV)",
    diagnosisTitle: "Przewlekłe niedokrwienie zagrażające kończynie (Chronic Limb-Threatening Ischemia - CLTI / Fontaine IV) z martwicą palucha prawego",
    vitals: [
      { label: "HR", val: "78/min", sub: "Miarowy", status: "ok" },
      { label: "BP", val: "155/92 mmHg", sub: "Nadciśnienie tętnicze", status: "warn" },
      { label: "SpO2", val: "96%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "16/min", sub: "Prawidłowy", status: "ok" },
      { label: "Temp", val: "36.8°C", sub: "Prawidłowa", status: "ok" }
    ],
    vitalsObj: { hr: 78, bp: "155/92", spo2: 96, rr: 16, temp: 36.8 },
    story: "65-letni mężczyzna, 40 paczkolat palenia, z cukrzycą typu 2 i nadciśnieniem, zgłasza nasilający się od 2 miesięcy ból prawej stopy, który występuje w spoczynku, szczególnie w nocy w pozycji leżącej. Pacjent podaje, że aby przespać choć godzinę, musi spuszczać nogę z łóżka ku dołowi lub spać w fotelu (co grawitacyjnie poprawia ukrwienie stopy). Od tygodnia na opuszce palucha prawego rozwinęła się czarna, sucha plama martwicza otoczona wąskim rąbkiem zapalnym. W badaniu fizykalnym: zaniki mięśniowe podudzia, sucha, pergaminowa skóra, brak owłosienia na stopie i goleni. Tętno na tętnicy udowej prawej słabo wyczuwalne, na tętnicy podkolanowej i obwodowych – niebadalne. Stopa blada przy uniesieniu (próba Ratschowa), po opuszczeniu staje się sinoczerwona (przekrwienie odczynowe). Wskaźnik kostka-ramię (ABI) na prawej kończynie wynosi 0.32.",
    labs: [
      {
        category: "Pomiary naczyniowe i ABI",
        items: [
          { name: "Wskaźnik kostka-ramię (ABI) - kończyna prawa", val: "0.32 (ciężkie krytyczne niedokrwienie)", norm: "0.91–1.30", flag: "L" },
          { name: "Ciśnienie skurczowe na tętnicach palucha (Toe Pressure - TP)", val: "22 mmHg (krytycznie obniżone, norma >50 mmHg)", norm: "> 50 mmHg", flag: "L" },
          { name: "Przezskórne ciśnienie cząstkowe tlenu (TcPO2)", val: "18 mmHg (brak potencjału samoistnego gojenia owrzodzenia)", norm: "> 40–50 mmHg", flag: "L" },
          { name: "ABI - kończyna lewa", val: "0.68 (umiarkowane niedokrwienie bezbólowe)", norm: "0.91–1.30", flag: "L" }
        ]
      },
      {
        category: "Badania biochemiczne i diabetologiczne",
        items: [
          { name: "Hemoglobina glikowana (HbA1c)", val: "8.6% (zła kontrola cukrzycy)", norm: "< 7.0%", flag: "H" },
          { name: "Lipidogram (Cholesterol LDL)", val: "148 mg/dL (bardzo wysokie ryzyko naczyniowe)", norm: "< 55 mg/dL", flag: "H" },
          { name: "eGFR / Kreatynina", val: "68 ml/min / 1.15 mg/dL", norm: "> 60 ml/min", flag: "N" }
        ]
      },
      {
        category: "Angio-TK / Angiografia tętnic kończyn dolnych",
        items: [
          { name: "Angio-TK tętnic kończyn dolnych", val: "Rozsiane zwapnienia miażdżycowe. Niedrożność powierzchownej tętnicy udowej (SFA) prawej na długości 12 cm. Odtwarzanie w tętnicy podkolanowej przez krążenie oboczne z tętnicy głębokiej uda. Dwu- i jedno-naczyniowy spływ na podudzie (niedrożna tętnica piszczelowa przednia)", norm: "Naczynia drożne o gładkich zarysach", flag: "H" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Kryteria rozpoznania CLTI (przewlekłego niedokrwienia zagrażającego kończynie)",
        task: "Jak definiuje się CLTI (dawniej CLI - Critical Limb Ischemia) według aktualnych wytycznych ESVS/SVS?",
        options: [
          { text: "Przewlekły (trwający >2 tygodnie) spoczynkowy ból niedokrwienny wymagający leków przeciwbólowych LUB obecność owrzodzenia niedokrwiennego / zgorzeli w powiązaniu z obiektywnie potwierdzoną ciężką chorobą tętnic obwodowych (ABI <0.4, ciśnienie na kostce <50 mmHg lub na paluchu <30 mmHg)", correct: true, feedback: "Prawidłowo! CLTI to schyłkowa manifestacja PAD (Peripheral Arterial Disease). Obejmuje klasę III (bóle spoczynkowe) i klasę IV (martwica/owrzodzenie) wg Fontaine'a (odpowiednio kategorie 4, 5, 6 wg Rutherforda). Bez rewaskularyzacji ryzyko amputacji wynosi >25% w ciągu roku." },
          { text: "Ból łydki pojawiający się wyłącznie po przejściu 500 metrów", correct: false, feedback: "To chromanie przestankowe (Fontaine II), nie krytyczne niedokrwienie." },
          { text: "Zaczerwienienie stóp po gorącej kąpieli", correct: false, feedback: "To objaw fizjologiczny lub erytromelalgia." },
          { text: "Brak owłosienia goleni u 20-latka bez dolegliwości", correct: false, feedback: "Niewystarczające do rozpoznania CLTI." }
        ]
      },
      {
        num: 2,
        title: "Klasyfikacja Fontaine'a i Rutherforda",
        task: "Dolegliwości spoczynkowe ustępujące przy opuszczaniu kończyny z łóżka (klasa III) oraz obecność suchych zmian martwiczych (klasa IV) odpowiadają jakiemu stopniowi zaawansowania niedokrwienia?",
        options: [
          { text: "Fontaine III (bóle spoczynkowe) oraz Fontaine IV (martwica / owrzodzenie niedokrwienne)", correct: true, feedback: "Prawidłowo! Klasyfikacja Fontaine'a: I – bezobjawowe, IIa – chromanie >200 m, IIb – chromanie <200 m, III – bóle spoczynkowe, IV – zmiany troficzne/martwica. Stopień III i IV to bezpośrednie zagrożenie utratą kończyny." },
          { text: "Fontaine I", correct: false, feedback: "Fontaine I to postać bezobjawowa ze zwężeniami tętnic." },
          { text: "Fontaine IIa", correct: false, feedback: "Fontaine IIa to łagodne chromanie przestankowe." },
          { text: "Wyłącznie stopień 0", correct: false, feedback: "Stopień 0 oznacza brak zmian chorobowych." }
        ]
      },
      {
        num: 3,
        title: "Interpretacja wskaźnika kostka-ramię (ABI)",
        task: "Jak interpretuje się wartość wskaźnika kostka-ramię (ABI) równą 0.32 oraz co oznacza ABI fałszywie wysoki (>1.40)?",
        options: [
          { text: "ABI 0.32 oznacza ciężkie, krytyczne niedokrwienie tętnicze; z kolei ABI >1.40 świadczy o sztywności i niespójności tętnic spowodowanej stwardnieniem tętnic ze zwapnieniem błony środkowej (stwardnienie Monckeberga u chorych z cukrzycą i PChN)", correct: true, feedback: "Prawidłowo! Norma ABI to 0.91–1.30. Wartość <=0.40 wskazuje na CLTI. Z kolei ABI >1.40 wynika z nieściśliwości tętnic (calcific sclerosis u diabetyków) – mankiet nie może zacisnąć zwaśnionej ściany naczynia. Wtedy należy zmierzyć ciśnienie na paluchu (TBI - Toe-Brachial Index), gdyż tętnice palucha rzadziej ulegają zwapnieniu." },
          { text: "ABI 0.32 to norma u osób po 60. roku życia", correct: false, feedback: "0.32 to skrajna patologia." },
          { text: "ABI >1.40 oznacza nadzwyczajnie zdrowe naczynia sportowca", correct: false, feedback: "To patologiczne stwardnienie i zwapnienie ściany tętnic." },
          { text: "ABI nie ma żadnego znaczenia w ocenie krążenia", correct: false, feedback: "ABI jest podstawowym narzędziem skriningowym w angiologii." }
        ]
      },
      {
        num: 4,
        title: "Cel nadrzędny postępowania – Rewaskularyzacja",
        task: "Co jest bezwzględnym warunkiem wygojenia owrzodzenia martwiczego i ocalenia kończyny przed amputacją u chorego z CLTI?",
        options: [
          { text: "Przywrócenie bezpośredniego napływu krwi tętniczej do stopy (rewaskularyzacja wewnątrznaczyniowa PTA ze stentem lub chirurgiczny pomost omijający by-pass) w celu podniesienia TcPO2 >40 mmHg", correct: true, feedback: "Prawidłowo! Bez poprawy perfuzji żadne maści, opatrunki ani antybiotyki nie zagoją martwicy. Podstawą leczenia CLTI jest pilna rewaskularyzacja (angioplastyka balonowa PTA/stent lub bypass żylny z żyły odpiszczelowej pacjenta) – zgodnie z koncepcją angiosomu." },
          { text: "Codzienne moczenie stopy w gorącej wodzie z mydłem", correct: false, feedback: "Moczenie i wysoka temperatura nasilają martwicę i zapotrzebowanie metaboliczne tkanek." },
          { text: "Unieruchomienie w gipsie na 12 miesięcy", correct: false, feedback: "Doprowadziłoby do odleżyn i sepsy." },
          { text: "Wyłącznie doustne suplementy witaminy C", correct: false, feedback: "Nieskuteczne." }
        ]
      },
      {
        num: 5,
        title: "Koncepcja angiosomów w rewaskularyzacji stopy",
        task: "Co oznacza koncepcja angiosomów (angiosome concept) w chirurgii naczyniowej stopy?",
        options: [
          { text: "Stopa jest podzielona na 6 trójwymiarowych bloków anatomicznych (angiosomów), z których każdy jest zasilany przez konkretną gałąź tętniczą; celowana rewaskularyzacja tętnicy zasilającej bezpośrednio dany angiosom zapewnia najszybsze gojenie rany", correct: true, feedback: "Prawidłowo! Koncepcja angiosomów Taylora i Palmera: tętnica piszczelowa przednia/grzbietowa stopy zaopatruje grzbiet stopy i palce, tętnica piszczelowa tylna (gałęzie podeszwowe) spód stopy i piętę, a strzałkowa – kostkę boczną. Udana rewaskularyzacja 'naczynia celowanego' (direct angiosome revascularization) daje najlepsze wyniki gojenia." },
          { text: "Metoda znieczulenia miejscowego stopy", correct: false, feedback: "To anatomia unaczynienia, nie znieczulenie." },
          { text: "Typ nowotworu naczyniowego skóry", correct: false, feedback: "Angiosom to jednostka anatomiczna, a nie nowotwór (angiosarcoma)." },
          { text: "Sztuczna skóra z kolagenu", correct: false, feedback: "To substytut skóry, a nie angiosom." }
        ]
      },
      {
        num: 6,
        title: "Kompleksowa terapia zachowawcza 'Best Medical Therapy' (BMT)",
        task: "Jakie leczenie farmakologiczne i niefarmakologiczne musi otrzymać KAŻDY pacjent z CLTI w celu redukcji śmiertelności sercowo-naczyniowej?",
        options: [
          { text: "Całkowite zaprzestanie palenia, lek przeciwpłytkowy (ASA lub klopidogrel), silna statyna w wysokiej dawce (atorwastatyna 40–80 mg lub rosuwastatyna 20–40 mg), ścisła kontrola ciśnienia tętniczego (ACEI) i glikemii", correct: true, feedback: "Prawidłowo! Pacjenci z CLTI mają ekstremalnie wysokie ryzyko zawału serca i udaru (roczna śmiertelność >20%). Agresywna terapia przeciwmiażdżycowa (BMT - Best Medical Therapy) z redukcją LDL <55 mg/dL, statynami i antyagregacją jest nieodzownym elementem opieki." },
          { text: "Ograniczenie aktywności życiowej i kontynuacja palenia tytoniu", correct: false, feedback: "Dalsze palenie gwarantuje utratę kończyny i zgon sercowo-naczyniowy." },
          { text: "Podawanie wyłącznie glikokortykosteroidów ogólnoustrojowo", correct: false, feedback: "GKS pogarszają gojenie ran i rozregulowują cukrzycę." },
          { text: "Odstawienie wszystkich leków kardiologicznych", correct: false, feedback: "Zwiększa ryzyko zawału i zgonu." }
        ]
      },
      {
        num: 7,
        title: "Postępowanie ze zmianą martwiczą – nekrektomia vs amputacja",
        task: "Kiedy i w jaki sposób należy opracować chirurgicznie suchą martwicę palucha u pacjenta z CLTI?",
        options: [
          { text: "Suchej martwicy nie należy wycinać PRZED udaną rewaskularyzacją (ryzyko rozprzestrzenienia zakażenia i braku gojenia); po skutecznej rewaskularyzacji wykonuje się oszczędną amputację brzeżną/nekrektomię", correct: true, feedback: "Prawidłowo! Złota zasada chirurgii naczyniowej: 'najpierw krew, potem nóż'. Wycięcie martwicy w niedokrwionej stopie bez napływu krwi przekształca suchą martwicę w zgorzel wilgotną i rozległą ranę, która nie ma szans na zagojenie. Wyjątkiem jest jedynie wilgotna zgorzel z flegmoną wymagająca pilnego drenażu ratującego życie." },
          { text: "Natychmiastowe głębokie wycięcie rany przed jakąkolwiek diagnostyką naczyniową", correct: false, feedback: "Naruszenie bariery w niedokrwionej stopie prowadzi do sepsy." },
          { text: "Zastosowanie pijawek na martwiczy paluch", correct: false, feedback: "Metoda przestarzała i obarczona ryzykiem infekcji Aeromonas hydrophila." },
          { text: "Przypalanie rozżarzonym żelazem", correct: false, feedback: "Praktyka średniowieczna." }
        ]
      },
      {
        num: 8,
        title: "Podsumowanie – rokowanie w CLTI",
        task: "Jakie jest rokowanie u nieleczonego pacjenta z CLTI (krytycznym niedokrwieniem z owrzodzeniem)?",
        options: [
          { text: "Bez skutecznej rewaskularyzacji około 25% pacjentów traci kończynę (amputacja duża), a ponad 20% umiera w ciągu pierwszego roku z przyczyn sercowo-naczyniowych", correct: true, feedback: "Prawidłowo! CLTI pod względem rokowania jest chorobą 'złośliwszą' niż wiele nowotworów narządowych. Skoordynowana opieka naczyniowa, diabetologiczna i podologiczna jest jedyną szansą na ocalenie kończyny i życia chorego." },
          { text: "Choroba cofa się całkowicie samoistnie w ciągu 2 tygodni", correct: false, feedback: "CLTI nigdy nie cofa się samoistnie." },
          { text: "Wystarczy noszenie ciepłych skarpet", correct: false, feedback: "Skarpetki nie udrożnią zarośniętych tętnic." },
          { text: "Śmiertelność wynosi 0%", correct: false, feedback: "Roczna śmiertelność przekracza 20%." }
        ]
      }
    ],
    pathoNodes: [
      { id: "p1", label: "Zarastająca miażdżyca tętnic (PAD)", desc: "Wieloletnia akumulacja blaszek miażdżycowych i zwapnień zamyka pnie naczyniowe kończyny." },
      { id: "p2", label: "Załamanie mikrokrążenia i hipoksja spoczynkowa", desc: "Perfuzja kapilarna spada poniżej progu metabolicznego w spoczynku -> ból nocny i martwica niedokrwienna." },
      { id: "p3", label: "Zagrożenie amputacją i sepsą", desc: "Utrata bariery naskórkowej, infekcja bakteryjna i postępująca zgorzel stopy." }
    ],
    diffTable: [
      { disease: "Przewlekłe krytyczne niedokrwienie (CLTI)", feature: "Ból spoczynkowy, ustępuje przy spuszczaniu nogi, bladość przy unoszeniu, owrzodzenie martwicze, ABI <0.4" },
      { disease: "Stopa cukrzycowa neuropatyczna", feature: "Owrzodzenie w punktach ucisku (podeszwa/głowy kości śródstopia), stopa ciepła, tętno zachowane, bezbolesne" },
      { disease: "Owrzodzenie żylne goleni", feature: "Lokalizacja nad kostką przyśrodkową, obrzęki, przebarwienia hemosyderynowe, tętna zachowane, ABI prawidłowe" },
      { disease: "Neuropatia obwodowa (polineuropatia)", feature: "Symetryczne drętwienie 'rękawiczek i skarpetek', zachowane tętna, brak cech ostrego niedokrwienia tkanek" }
    ],
    dutySummary: "Pacjent 65-letni z krytycznym przewlekłym niedokrwieniem prawej kończyny dolnej (CLTI, Fontaine IV) z martwicą palucha i ABI 0.32. Włączono kompleksową terapię zachowawczą (ASA, atorwastatyna 80 mg, optymalizacja glikemii i ciśnienia). Zakwalifikowano pacjenta do pilnej rewaskularyzacji wewnątrznaczyniowej (PTA tętnicy udowej powierzchownej i gałęzi podudzia) jako warunku koniecznego do ocalenia kończyny przed amputacją.",
    lekQuestions: [
      {
        question: "Bóle spoczynkowe kończyny dolnej ustępujące po opuszczeniu kończyny ku dołowi, występujące u pacjenta z miażdżycą tętnic, odpowiadają któremu stopniowi w klasyfikacji Fontaine'a?",
        options: ["Stopień III", "Stopień I", "Stopień IIa", "Stopień IIb", "Stopień IV"],
        answer: "Stopień III",
        explanation: "Stopień III wg Fontaine'a to bóle spoczynkowe (pacjent często śpi z nogą spuszczoną z łóżka). Stopień IV obejmuje martwicę lub owrzodzenie troficzne."
      },
      {
        question: "Wskaźnik kostka-ramię (ABI) o wartości powyżej 1.40 najczęściej świadczy o:",
        options: [
          "Nieściśliwości i sztywności tętnic wywołanej zwapnieniem błony środkowej (np. u chorych na cukrzycę)",
          "Prawidłowym stanie unaczynienia kończyn dolnych",
          "Masywnej zatorowości tętnicy udowej",
          "Krytycznym niedokrwieniu z bezpośrednim zagrożeniem amputacją",
          "Wrodzonym braku tętnicy ramiennej"
        ],
        answer: "Nieściśliwości i sztywności tętnic wywołanej zwapnieniem błony środkowej (np. u chorych na cukrzycę)",
        explanation: "Wartość ABI >1.40 jest wynikiem zaawansowanych zwapnień ściany tętnic (stwardnienie Monckeberga), co uniemożliwia ich ściśnięcie mankietem ciśnieniomierza i daje fałszywie zawyżone ciśnienie."
      },
      {
        question: "Wskaż prawidłową zasadę postępowania ze zmianą martwiczą (suchą martwicą) u pacjenta z krytycznym niedokrwieniem kończyny dolnej:",
        options: [
          "Opracowanie chirurgiczne/amputację brzeżną wykonuje się dopiero po skutecznej rewaskularyzacji naczyniowej",
          "Należy niezwłocznie wyciąć martwicę przed oceną krążenia tętniczego",
          "Stosuje się wyłącznie wilgotne okłady z soli fizjologicznej bez zamiaru rewaskularyzacji",
          "Każdy przypadek suchej martwicy wymaga natychmiastowej amputacji na poziomie uda",
          "Zaleca się intensywne ogrzewanie stopy poduszką elektryczną"
        ],
        answer: "Opracowanie chirurgiczne/amputację brzeżną wykonuje się dopiero po skutecznej rewaskularyzacji naczyniowej",
        explanation: "Wycinkowe opracowanie rany niedokrwiennej przed przywróceniem napływu krwi (rewaskularyzacją) uniemożliwia wygojenie rany i prowadzi do rozwoju zgorzeli wilgotnej."
      }
    ],
    flashcards: [
      { front: "Co oznacza skrót CLTI?", back: "Chronic Limb-Threatening Ischemia – przewlekłe niedokrwienie zagrażające kończynie (bóle spoczynkowe, martwica/owrzodzenie, ABI <0.4)." },
      { front: "Wymień stopnie klasyfikacji Fontaine'a:", back: "I: bezobjawowe, IIa: chromanie >200m, IIb: chromanie <200m, III: ból spoczynkowy, IV: martwica lub owrzodzenie." },
      { front: "Co oznacza ABI < 0.40 a co ABI > 1.40?", back: "<0.40: krytyczne niedokrwienie kończyny; >1.40: nieściśliwe, zwapniałe tętnice (np. cukrzyca, niewydolność nerek)." },
      { front: "Dlaczego pacjenci z CLTI opuszczają nogę z łóżka?", back: "Grawitacja zwiększa ciśnienie hydrostatyczne i nieznacznie poprawia perfuzję włośniczkową w stopie, łagodząc ból spoczynkowy." },
      { front: "Jaka jest najważniejsza zasada leczenia owrzodzenia w CLTI?", back: "Pilna rewaskularyzacja (PTA/by-pass) przed chirurgicznym opracowaniem rany (zasada: najpierw krew, potem nóż)." }
    ]
  }
];

async function run() {
  console.log("Processing cases: " + cases.map(c => c.id).join(", ") + "...");
  for (const caseData of cases) {
    const jsonString = JSON.stringify(caseData, null, 2);
    const encrypted = await encryptStringAes(jsonString, PASSWORD);
    const outPath = `cases/${caseData.filename}`;
    fs.writeFileSync(outPath, JSON.stringify(encrypted, null, 2), 'utf8');
    console.log(`Encrypted & saved ${outPath}`);
  }
  console.log("Batch 137-142 finished successfully.");
}
run().catch(console.error);

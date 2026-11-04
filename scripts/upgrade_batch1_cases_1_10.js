const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

// Map of curated updates for Cases 1 to 10
// Each entry maps caseId -> array of { qIdx, newOpts, newExp, correctIdx }
const updates = {
  1: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A) 20% roztwór mannitolu w dawce 0,5–1,0 g/kg m.c. i.v. w ciągu 20 minut lub 3% roztwór NaCl",
        "B) Deksametazon dożylnie w bolusie 8–10 mg z powolnym wlewem 4 mg co 6 godzin",
        "C) 5% roztwór glukozy we wlewie szybkim 20 ml/kg m.c. z furosemidem 40 mg i.v.",
        "D) 8,4% roztwór wodorowęglanu sodu w szybkim wlewie dożylnym 100 mmol (100 ml)",
        "E) Diazepam w powolnym wstrzyknięciu dożylnym 10 mg powtarzany co 15 minut"
      ]
    },
    {
      qIdx: 1, // Q2
      newOpts: [
        "A) Nitroprusydek sodu reaguje wyłącznie z kwasem mlekowym, pomijając całkowicie ketony osoczowe",
        "B) Paski z nitroprusydkiem wykrywają kwas acetooctowy (i śladowo aceton), a nie wykrywają kwasu β-hydroksymasłowego",
        "C) Mocz w kwasicy jest zbyt kwaśny, co trwale denaturuje odczynnik barwny na pasku wskaźnikowym",
        "D) Kwas β-hydroksymasłowy nie przenika przez barierę filtracyjną kłębuszków nerkowych u ludzi",
        "E) Reakcja nitroprusydkowa ulega całkowitej inhibicji przez dożylny wlew jonów potasowych i sodu"
      ],
      newExp: "Odpowiedź B. Nitroprusydek sodu reaguje wyłącznie z kwasem acetooctowym (i śladowo acetonem). W DKA z powodu przesunięcia potencjału oksydoredukcyjnego dominuje kwas β-hydroksymasłowy (niewykrywany na pasku!). W trakcie leczenia kwas β-hydroksymasłowy utlenia się do acetooctanu, dając fałszywe wrażenie nasilenia ketonurii mimo wygaszania kwasicy. Złotym standardem monitorowania DKA jest bezpośrednie oznaczanie stężenia kwasu β-hydroksymasłowego we krwi."
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Agoniści receptora peptydu glukagonopodobnego 1 (analogi GLP-1, np. semaglutyd, dulaglutyd)",
        "B) Inhibitory dipeptydylopeptydazy 4 (gliptyny DPP-4i, np. sitagliptyna, saksagliptyna, wildagliptyna)",
        "C) Inhibitory kotransportera sodowo-glukozowego 2 (flozyny SGLT2i, np. dapagliflozyna, empagliflozyna)",
        "D) Pochodne sulfonylomocznika II generacji (np. gliklazyd MR, glimepiryd w dawkach terapeutycznych)",
        "E) Tiazolidynediony aktywujące receptor jądrowy PPAR-gamma (glitazony, np. pioglitazon doustnie)"
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "A) Dokładnie w momencie odłączenia dożylnej pompy infuzyjnej wraz z podaniem pierwszego posiłku doustnego",
        "B) Dopiero 2 godziny po pełnym zatrzymaniu wlewu dożylnego po odnotowaniu pierwszego wzrostu glikemii",
        "C) Na 1–2 godziny przed zatrzymaniem wlewu dla insuliny doposiłkowej lub 2–4 godziny przed zatrzymaniem dla insuliny bazowej",
        "D) Po 24-godzinnej całkowitej przerwie w podawaniu insuliny celem oceny endogennej rezerwy wydzielniczej",
        "E) Wyłącznie rano na czczo w kolejnej dobie hospitalizacji niezależnie od czasu wygaszenia kwasicy"
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A) Bezpośrednie toksyczne porażenie nerwów przeponowych i mięśni oddechowych przez wysokie stężenie kwasu acetooctowego",
        "B) Odruchowa hiperwentylacja wywołana pobudzeniem chemoreceptorów obwodowych i ośrodkowych przez jony wodorowe H+",
        "C) Skurcz mięśniówki gładkiej drobnych oskrzeli indukowany hiperosmolarnym odwodnieniem nabłonka dróg oddechowych",
        "D) Zmniejszenie podatności miąższu płucnego wywołane masywnym mikrokrwotocznym obrzękiem pęcherzyków płucnych",
        "E) Odruchowy skurcz krtani i strun głosowych wywołany podrażnieniem nerwu krtaniowego wstecznego przez kwasicę"
      ],
      newExp: "Odpowiedź B. Kwasica nieoddechowa (nagromadzenie jonów H+) stymuluje chemoreceptory obwodowe (w kłębkach szyjnych i aortalnych) oraz ośrodkowe w pniu mózgu. Wyzwala to odruchową, forsowną hiperwentylację (oddech Kussmaula) dążącą do obniżenia PaCO2 i kompensacji zaburzeń kwasowo-zasadowych."
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A) Glukoza wzmaga nerkowe wydalanie sodu w pętli Henlego; stężenie skorygowane wynosi zawsze 120 mmol/l",
        "B) Hiperglikemia przemieszcza wodę z komórek do osocza, rozcieńczając sód; wzór dodaje 1,6 mmol/l na 100 mg/dl glukozy >100 mg/dl",
        "C) Sód tworzy kowalencyjne wiązania z pierścieniem glukozy i jest niewykrywalny przez elektrodę jonoselektywną",
        "D) Korektę stężenia sodu przeprowadza się wyłącznie u pacjentów ze współistniejącym obrzękiem płuc i hipoalbuminemią",
        "E) Wartość skorygowana odpowiada stężeniu potasu pomnożonemu przez współczynnik hematokrytu i osmolalności"
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A) Różę twarzy o etiologii paciorkowcowej leczoną dożylną penicyliną krystaliczną w wysokich dawkach",
        "B) Mukormykozę nosowo-mózgową leczoną pilnym oczyszczeniem tkanek oraz liposomalną amfoterycyną B",
        "C) Półpasiec oczny z zajęciem gałązki V1 nerwu trójdzielnego leczony dożylnym acyklowirem w szpitalu",
        "D) Zakrzepicę zatoki jamistej w przebiegu czyraka przedsionka nosa leczoną ceftriaksonem i heparyną",
        "E) Promienicę twarzoczaszkową wywołaną przez Actinomyces israelii leczoną ampicyliną przez 6 miesięcy"
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) Wyłączne stosowanie modelu intensywnej czynnościowej insulinoterapii penami z 4 wstrzyknięciami na dobę",
        "B) Nawracająca ciężka hipoglikemia (co najmniej 2 epizody w ciągu 12 miesięcy) lub nieświadomość hipoglikemii",
        "C) Utrzymujące się stężenie peptydu C na czczo w surowicy krwi powyżej górnej granicy normy laboratoryjnej",
        "D) Wyłącznie udokumentowany brak akceptacji wkłuć podskórnych zgłaszany w wywiadzie przez pacjenta",
        "E) Rozwój łagodnej retinopatii nieproliferacyjnej bez obrzęku plamki u chorego z zadowalającą kontrolą"
      ]
    }
  ],
  2: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A) Zakrzepica pnia tętnicy krezkowej górnej na blaszce miażdżycowej zamykająca samo ujście naczynia przy aorcie brzusznej",
        "B) Zator tętnicy krezkowej górnej materiałem zatorowym poniżej odejścia pierwszych gałęzi czczych i okrężniczej środkowej",
        "C) Zator tętnicy krezkowej dolnej w miejscu jej odejścia od aorty, zaopatrującej proksymalne pętle jelita czczego i krętego",
        "D) Ostra zakrzepica żyły krezkowej górnej i żyły wrotnej wywołana wrodzoną trombofilią, z zablokowaniem spływu wrotnego",
        "E) Nieokluzyjne niedokrwienie krezki (NOMI) na tle uogólnionego skurczu tętniczek wywołanego aminami lub naparstnicą"
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) Pilna laparotomia zwiadowcza z wykonaniem chirurgicznej embolektomii z użyciem cewnika Fogarty'ego",
        "B) Optymalizacja rzutu serca, ostrożna redukcja wazokonstryktorów oraz wybiórczy dotętniczy wlew papaweryny przez cewnik w TKG",
        "C) Systemowa dożylna tromboliza rekombinowanym tkankowym aktywatorem plazminogenu (rt-PA) w dawce 100 mg",
        "D) Masywna forsowna diureza furosemidem z alkalizacją moczu wodorowęglanem sodu przy utrzymaniu amin presyjnych",
        "E) Pilna całkowita kolektomia z wytworzeniem ileostomii końcowej na drodze laparotomii pośrodkowej"
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A) Gaz w żyle wrotnej gromadzi się w płacie ogoniastym, a aerobilia występuje wyłącznie w dnie pęcherzyka żółciowego",
        "B) Gaz w żyle wrotnej gromadzi się obwodowo pod torebką wątroby, a aerobilia układa się centralnie wokół wnęki narządu",
        "C) Gaz w żyle wrotnej układa się centralnie we wnęce wątroby, a aerobilia na samym obwodzie miąższu pod torebką",
        "D) Gaz w żyle wrotnej widoczny jest tylko w sekwencji rezonansu DWI, a aerobilia wyłącznie w USG przezbrzusznym",
        "E) Oba zjawiska mają identyczny rozkład anatomiczny w tomografii komputerowej i nie podlegają różnicowaniu"
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A) Prawidłowe stężenie mleczanów we krwi obwodowej pozwala definitywnie wykluczyć niedokrwienie jelit i odstąpić od angio-TK",
        "B) We wczesnym okresie ostrego zatoru TKG mleczany mogą być prawidłowe, gdyż są wychwytywane i metabolizowane przez wątrobę",
        "C) Mleczany w niedokrwieniu jelit ulegają gwałtownemu spadkowi wskutek zahamowania glikolizy beztlenowej w enterocytach",
        "D) Wzrost stężenia mleczanów pojawia się obligatoryjnie w pierwszych 15 minutach od momentu zamknięcia naczynia tętniczego",
        "E) Prawidłowe stężenie mleczanów nakazuje odstąpienie od diagnostyki naczyniowej i rozpoznanie wrzodu trawiennego"
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Nie może wykonać zabiegu do momentu uzyskania telefonicznej lub pisemnej zgody sędziego dyżurnego sądu opiekuńczego",
        "B) Musi uzyskać pisemną zgodę dorosłego członka rodziny pacjentki obecnego na oddziale przed rozpoczęciem procedury",
        "C) Może operować bez zgody, zasięgając w miarę możliwości opinii drugiego lekarza, odnotowując to w dokumentacji i zawiadamiając sąd",
        "D) Jest zobowiązany ograniczyć się do zachowawczego leczenia przeciwkrzepliwego do czasu odzyskania przytomności chorej",
        "E) Może wykonać zabieg operacyjny wyłącznie na podstawie pisemnej zgody wydanej przez dyrektora podmiotu leczniczego"
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) Profilaktyczne usunięcie wyrostka robaczkowego i pęcherzyka żółciowego celem eliminacji potencjalnych ognisk septycznych",
        "B) Założenie cewnika naczyniowego do żyły krezkowej górnej w celu bezpośredniego wlewu stężonego żywienia pozajelitowego",
        "C) Bezpośrednia ocena makroskopowa żywotności pozostawionych pętli jelita oraz ewentualna resekcja wtórnie martwiczych tkanek",
        "D) Płukanie jamy otrzewnej 10 litrami stężonego roztworu antybiotyku aminoglikozydowego celem sterylizacji mikrobiologicznej",
        "E) Wyłącznie rutynowa kontrola szczelności szwów powłok brzusznych i zmiana drenów bez manipulacji na pętlach jelitowych"
      ]
    }
  ],
  3: [
    {
      qIdx: 7, // Q8
      newOpts: [
        "A. Natychmiastowa relaparotomia w trybie ostrym z podejrzeniem nawrotu zwężenia odźwiernika.",
        "B. Wykonanie pilnego pasażu przewodu pokarmowego z barytem i całkowite wstrzymanie karmienia na 7 dni.",
        "C. Wdrożenie całkowitego żywienia pozajelitowego (TPN) przez wkłucie centralne.",
        "D. Uspokojenie rodziców i kontynuacja ostrożnego, stopniowego karmienia doustnego małymi porcjami.",
        "E. Założenie stałej sondy dojelitowej za odźwiernik i podanie leków prokinetycznych (cyzapryd)."
      ],
      newExp: "Odpowiedź D. Sporadyczne wymioty pooperacyjne w 1. dobie po pyloromiotomii są częstym, łagodnym zjawiskiem wynikającym z przejściowej atonii żołądka. Przy miękkim brzuchu i braku powikłań wskazane jest uspokojenie rodziców i kontynuacja stopniowego karmienia małymi porcjami."
    }
  ],
  4: [
    {
      qIdx: 2, // Q3
      newOpts: [
        "A. Pacjenci wykazują skrajną oporność na niedepolaryzujące środki zwiotczające, co wymaga podania 3-krotnie wyższej dawki nasycającej.",
        "B. Zwiotczenie mięśni jest całkowicie bezpieczne przy użyciu standardowych dawek, a monitorowanie TOF nie ma zastosowania klinicznego.",
        "C. Chorych cechuje wysoka wrażliwość na leki niedepolaryzujące (rokuronium), stąd dawka redukowana o 50-70%; sukcynylocholina jest przeciwwskazana.",
        "D. Sukcynylocholina jest lekiem pierwszego wyboru w dawce podwojonej z uwagi na blokadę receptorów muskarynowych w płytce motorycznej.",
        "E. Należy bezwzględnie unikać jakiejkolwiek intubacji dotchawiczej i stosować wyłącznie wentylację nieinwazyjną NIV do ustąpienia duszności."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A. Tymektomia jest bezwzględnie przeciwwskazana u osób przed 40. rokiem życia ze względu na ryzyko trwałego upośledzenia odporności komórkowej.",
        "B. Usunięcie grasicy wykonuje się wyłącznie w przypadku stwierdzenia inwazyjnego grasiczaka w badaniu TK klatki piersiowej z kontrastem.",
        "C. Tymektomia jest zalecana u chorych w wieku 18-65 lat z uogólnioną miastenią i przeciwciałami anty-AChR w celu zwiększenia szansy na remisję.",
        "D. Tymektomia przynosi natychmiastową poprawę kliniczną w ciągu pierwszych 24 godzin po zabiegu i pozwala odstawić pirydostygminę.",
        "E. Zabieg operacyjny grasicy jest dedykowany wyłącznie pacjentom z izolowaną postacią oczną miastenii oporną na sterydoterapię."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A. Pojemność życiowa (VC) >8-10 ml/kg, NIF ujemne do -15 cmH2O, brak odruchu kaszlowego oraz stabilne utlenowanie krwi tętniczej.",
        "B. Prawidłowy zapis kapnografii w spoczynku bez konieczności wykonywania przyłóżkowych pomiarów spirometrycznych i mechaniki.",
        "C. Pojemność życiowa (VC) >20-25 ml/kg, NIF bardziej ujemne niż -30 cmH2O, ciśnienie wydechowe MEP >40 cmH2O oraz uniesienie głowy >10 s.",
        "D. Zdolność do samodzielnego otwarcia oczu i wysunięcia języka przy ujemnym ciśnieniu wdechowym NIF wynoszącym zaledwie -10 cmH2O.",
        "E. Normalizacja miana przeciwciał anty-AChR w surowicy krwi niezależnie od parametrów objętości oddechowej i siły mięśni."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A. Gentamycyna lub amikacyna (antybiotyki aminoglikozydowe).",
        "B. Cyprofloksacyna lub lewofloksacyna (fluorochinolony).",
        "C. Klarytromycyna lub azytromycyna (antybiotyki makrolidowe).",
        "D. Amoksycylina z kwasem klawulanowym (antybiotyk beta-laktamowy).",
        "E. Telitromycyna (antybiotyk z grupy ketolidów)."
      ]
    }
  ],
  5: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A. Kolka wątrobowa w przebiegu kamicy pęcherzykowej wywołana mechanicznym uciskiem powiększonej macicy.",
        "B. Ostre stłuszczenie wątroby ciężarnych na tle wrodzonego niedoboru mitochondrialnej dehydrogenazy LCHAD.",
        "C. Zespół HELLP związany z mikrozakrzepami w naczyniach zatokowych wątroby i napięciem torebki Glissona.",
        "D. Wstrząs anafilaktyczny w odpowiedzi na alloprzeciwciała anty-D z wtórnym obrzękiem miąższu wątroby.",
        "E. Ostre wirusowe zapalenie wątroby typu E przebiegające z masywną wewnątrzwątrobową cholestazą ciężarnych."
      ]
    },
    {
      qIdx: 1, // Q2
      newOpts: [
        "A. Diazepam w bolusie 10 mg i.v., a następnie domięśniowy wlew fenobarbitalu w dawce 200 mg co 8 godzin.",
        "B. Siarczan magnezu: dawka nasycająca 4-6 g i.v. w 15-20 min, następnie wlew podtrzymujący 1-2 g/h.",
        "C. Fenytoina: dawka wstępna 15-20 mg/kg i.v. w soli fizjologicznej, a następnie wlew ciągły pod kontrolą EKG.",
        "D. Kwas walproinowy 1000 mg i.v. w powolnym wlewie w skojarzeniu z doustnym klonazepamem 2 mg.",
        "E. Tiopental sodu w dawce indukcyjnej 4 mg/kg i.v. z natychmiastową intubacją na sali przedporodowej."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "A. Natychmiastowe podanie 10 mg naloksonu w szybkim bolusie dożylnym i podłączenie tlenoterapii biernej.",
        "B. Zwiększenie prędkości wlewu MgSO4 do 3 g/h w celu przełamania bloku przewodnictwa nerwowo-mięśniowego.",
        "C. Zatrzymanie wlewu siarczanu magnezu i dożylne podanie 10 ml 10% roztworu glukonianu wapnia w ciągu 10 minut.",
        "D. Dożylna podaż 40 mg furosemidu z pilnym wykonaniem tomografii komputerowej głowy bez kontrastu.",
        "E. Wdrożenie szybkiego wlewu 8,4% wodorowęglanu sodu 100 ml i natychmiastowa intubacja dotchawicza."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A. Labetalol (alfa- i beta-adrenolityk naczyniowy).",
        "B. Hydralazyna (lek rozkurczający tętniczki oporowe).",
        "C. Nifedypina (dihydropirydynowy bloker kanału Ca2+).",
        "D. Enalapryl (inhibitor konwertazy angiotensyny - ACEI).",
        "E. Metyldopa (ośrodkowy agonista receptorów alfa-2)."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A. Oznaczenie stężenia haptoglobiny w surowicy krwi.",
        "B. Oznaczenie stężenia ferrytyny w surowicy krwi.",
        "C. Pomiar aktywności aminotransferazy alaninowej.",
        "D. Oznaczenie poziomu fibrynogenu w osoczu krwi.",
        "E. Bezpośredni test antyglobulinowy Coombsa BTA."
      ],
      newExp: "Odpowiedź A. Oznaczenie stężenia haptoglobiny cechuje się najwyższą czułością w potwierdzeniu hemolizy wewnątrznaczyniowej (haptoglobina wiąże wolną hemoglobinę i ulega gwałtownemu zużyciu, spadając często do zera)."
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A. Ciężka hipoglikemia (<2.8–3.3 mmol/l) oraz skrajny spadek fibrynogenu (<1.5 g/l).",
        "B. Znaczny wzrost aktywności dehydrogenazy mleczanowej (LDH >600 j.m./l).",
        "C. Izolowane zwiększenie stężenia kwasu moczowego w surowicy krwi ciężarnej.",
        "D. Uogólnione występowanie masywnych obrzęków podudzi i powłok brzusznych.",
        "E. Obecność białkomoczu przekraczającego wartość 1,0 g w dobowej zbiórce moczu."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A. Prednizon doustnie 20 mg co 8 godzin przez 7 dni w schemacie malejących dawek dobowych.",
        "B. Betametazon 12 mg i.m. w 2 dawkach co 24 h (lub deksametazon 6 mg i.m. w 4 dawkach co 12 h).",
        "C. Hydrokortyzon 500 mg dożylnie co 6 godzin przez 48 godzin we wlewie kroplowym z solą.",
        "D. Metyloprednizolon w pulsach 1000 mg i.v. przez 3 kolejne doby z osłoną żołądkową IPP.",
        "E. Budezonid w nebulizacji w dawce 2 mg na dobę podawany przez maskę twarzową przez 5 dni."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A. Samoistne pęknięcie krwiaka podtorebkowego wątroby z masywnym krwawieniem do otrzewnej.",
        "B. Ostre zatrucie siarczanem magnezu z blokadą przewodzenia przedsionkowo-komorowego.",
        "C. Zator tętnicy płucnej płynem owodniowym z nagłą ostrą niewydolnością prawokomorową.",
        "D. Zgorzelinowe pęknięcie pęcherzyka żółciowego z rozlanym żółciowym zapaleniem otrzewnej.",
        "E. Ostry zawał ściany dolnej lewej komory serca z dysfunkcją mięśnia brodawkowatego."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A. Stężenie kreatyniny (Klasa 1: >2.0 mg/dl, Klasa 2: 1.5-2.0 mg/dl, Klasa 3: 1.2-1.5 mg/dl).",
        "B. Liczba płytek krwi (Klasa 1: <50 tys., Klasa 2: 50-100 tys., Klasa 3: 100-150 tys./µl).",
        "C. Ciśnienie skurczowe (Klasa 1: >180 mmHg, Klasa 2: 160-180 mmHg, Klasa 3: 140-160 mmHg).",
        "D. Poziom fibrynogenu (Klasa 1: <1.0 g/l, Klasa 2: 1.0-2.0 g/l, Klasa 3: 2.0-3.0 g/l).",
        "E. Utrata białka w moczu (Klasa 1: >5 g/24h, Klasa 2: 3-5 g/24h, Klasa 3: 1-3 g/24h)."
      ]
    }
  ],
  6: [
    {
      qIdx: 1, // Q2
      newOpts: [
        "A. Aby defibrylator automatycznie podwoił energię wyładowania w trakcie trwania impulsu.",
        "B. Aby impuls został wyzwolony na załamku R, zapobiegając wyładowaniu w fazę podatną T (R-na-T).",
        "C. Aby zsynchronizować wyładowanie z fazą wdechu pacjenta i obniżyć opór klatki piersiowej.",
        "D. Aby aparat wygenerował impuls jednofazowy zamiast dwufazowego w celu ochrony mięśnia.",
        "E. Tryb synchronizacji jest opcjonalny i nie ma znaczenia klinicznego u chorych po zawale."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "A. Częstość rytmu komór przekraczająca wartość 150 uderzeń na minutę w zapisie ciągłym.",
        "B. Obecność ujemnych załamków T w odprowadzeniach kończynowych I, II, III oraz aVF.",
        "C. Rozkojarzenie AV dissociation z obecnością pobudzeń zlapanych capture i zlanych fusion beats.",
        "D. Prawidłowy czas trwania odstępu PR w odprowadzeniach przedsercowych V1 do V6.",
        "E. Amplituda zespołów QRS przekraczająca wartość 20 mm w odprowadzeniu przedsercowym V5."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A. Amiodaron (klasa III wg klasyfikacji Vaughana Williamsa).",
        "B. Lidokaina (klasa Ib wg klasyfikacji Vaughana Williamsa).",
        "C. Bisoprolol (klasa II wg klasyfikacji Vaughana Williamsa).",
        "D. Flekainid (klasa Ic wg klasyfikacji Vaughana Williamsa).",
        "E. Eplerenon (antagonista receptora mineralokortykoidowego)."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A. Wystąpienie ≥3 epizodów niestabilnych tachyarytmii komorowych (VT/VF) w ciągu 24 h; leczenie: sedacja, beta-blokery, amiodaron, ewentualnie blokada zwoju.",
        "B. Uogólniony skurcz naczyń wieńcowych z uniesieniem ST w odprowadzeniach przedsercowych; leczenie: diltiazem, nitrogliceryna oraz pilna koronarografia z PCI.",
        "C. Napad migotania przedsionków z odpowiedzią komór >180/min u chorego z nadczynnością tarczycy; leczenie: pilna kardiowersja, propylotiouracyl i hydrokortyzon.",
        "D. Seria nieuzasadnionych wyładowań wszczepialnego kardiowertera (ICD) wywołana uszkodzeniem elektrody; leczenie: magnes na lożę, sedacja i pilna rewizja aparatu.",
        "E. Ostra tamponada worka osierdziowego w przebiegu zapalenia z nagłym spadkiem rzutu i asystolią; leczenie: pilna perikardiocenteza pod kontrolą echokardiografii."
      ]
    }
  ],
  7: [
    {
      qIdx: 2, // Q3
      newOpts: [
        "A. Bezpośrednie hamowanie wątrobowego izoenzymu CYP2E1 cytochromu P450 metabolizującego cząsteczkę paracetamolu",
        "B. Zwiększenie klirensu nerkowego i wydalania z moczem niezmienionego leku poprzez alkalizację wodorowęglanem",
        "C. Dostarczanie cysteiny do resyntezy glutationu (GSH) oraz bezpośrednia neutralizacja toksycznego metabolitu NAPQI",
        "D. Blokowanie wchłaniania leku w enterocytach dwunastnicy i jelita czczego poprzez chelatację jonami magnezu",
        "E. Hamowanie rozpadu zapasów glikogenu wątrobowego i zmniejszenie zapotrzebowania hepatocytów na tlen w hipoksji"
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A. Zarówno hipofosfatemia, jak i hiperfosfatemia są nieswoistymi zaburzeniami elektrolitowymi niemającymi żadnego znaczenia prognostycznego",
        "B. Hiperfosfatemia świadczy o dynamicznej proliferacji komórek wątroby i jest korzystnym wskaźnikiem wygaszania ostrej martwicy toksycznej",
        "C. Hipofosfatemia jest markerem aktywnej regeneracji hepatocytów (synteza ATP) i zwiastuje dobre rokowanie, a hiperfosfatemia zwiastuje zgon",
        "D. Hipofosfatemia stanowi bezwzględne kryterium kwalifikacji pacjenta do pilnego przeszczepienia wątroby w kryteriach King's College",
        "E. Oznaczenie stężenia fosforanów w surowicy odzwierciedla wyłącznie funkcję cewek nerkowych i nie wykazuje korelacji z wydolnością wątroby"
      ]
    }
  ],
  8: [
    {
      qIdx: 4, // Q5
      newOpts: [
        "A. Ponieważ hydrokortyzon trwale eliminuje przeciwciała TRAb w ciągu kilkunastu minut od podania dożylnego bolusa.",
        "B. Ponieważ przyspieszony metabolizm wyczerpuje rezerwy kory nadnerczy, a steroidy hamują obwodową konwersję T4 do T3.",
        "C. Ponieważ hydrokortyzon bezpośrednio pobudza tyreotropowe wydzielanie TSH przez przedni płat przysadki mózgowej.",
        "D. Ponieważ steroidy są jedynymi lekami skutecznie kontrolującymi częstość rytmu komór w migotaniu przedsionków.",
        "E. Ponieważ wysokie dawki hydrokortyzonu zapobiegają rozwojowi ostrej martwicy cewek nerkowych w przebiegu wstrząsu."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A. Ostre zakażenie bakteryjne lub wirusowe (np. zapalenie płuc, zakażenie układu moczowego).",
        "B. Spożycie posiłku bogatotłuszczowego lub obfitego w węglowodany proste przed snem.",
        "C. Umiarkowany wysiłek fizyczny o charakterze rekreacyjnym (np. energiczny spacer).",
        "D. Długotrwałe przebywanie w klimatyzowanym pomieszczeniu o niskiej wilgotności.",
        "E. Zastosowanie preparatów multiwitaminowych z kwasem foliowym i witaminą B12."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A. Ponieważ amiodaron wywołuje natychmiastowe zatrzymanie akcji serca w mechanizmie asystolii w ciągu 2 minut.",
        "B. Ponieważ amiodaron jest całkowicie pozbawiony działania antyarytmicznego na poziomie przedsionków i węzła AV.",
        "C. Ponieważ amiodaron zawiera olbrzymi ładunek jodu (ok. 37% masy cząsteczki), co może wywołać zjawisko Jod-Basedow.",
        "D. Ponieważ amiodaron wchodzi w bezpośrednią reakcję chemiczną z propylotiouracylem na dnie strzykawki infuzyjnej.",
        "E. Ponieważ amiodaron obniża temperaturę głęboką ciała poniżej 34°C poprzez ośrodkowe hamowanie termogenezy."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A. Tylko składowe: 1, 2 oraz 4 (temperatura, OUN, tachykardia).",
        "B. Tylko składowe: 1, 3 oraz 5 (temperatura, serce, przewód pokarmowy).",
        "C. Tylko składowe: 1, 2, 4 oraz 5 (z pominięciem cech niewydolności serca).",
        "D. Tylko składowe: 2, 3, 4 oraz 6 (bez uwzględnienia pomiaru temperatury).",
        "E. Wszystkie wymienione składowe kliniczne (1, 2, 3, 4, 5, 6)."
      ]
    }
  ],
  9: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A. Stężenie D-dimerów w osoczu powyżej 5000 ng/ml przy stabilnym ciśnieniu tętniczym.",
        "B. Obecność niestabilności hemodynamicznej (wstrząs, przetrwała hipotensja SBP <90 mmHg).",
        "C. Zator siodłowaty widoczny w angio-TK u pacjenta z ciśnieniem 130/80 mmHg i ujemną troponiną.",
        "D. Wzrost stężenia troponiny sercowej bez odchyleń w przyłóżkowym badaniu echokardiograficznym.",
        "E. Wiek pacjenta powyżej 75 lat i punktacja w uproszczonej skali sPESI równa 1 punktowi."
      ]
    },
    {
      qIdx: 1, // Q2
      newOpts: [
        "A. Oznaczenie D-dimerów jest bezwzględnie konieczne przed wdrożeniem trombolizy systemowej.",
        "B. D-dimery pozwalają na obiektywną ocenę skuteczności leczenia trombolitycznego w 1. dobie.",
        "C. Oznaczanie D-dimerów we wstrząsie nie ma uzasadnienia, a oczekiwanie na wynik opóźnia leczenie.",
        "D. Prawidłowy wynik D-dimerów we wstrząsie wyklucza zatorowość płucną ze 100% pewnością.",
        "E. D-dimery służą do różnicowania zatorowości wysokiego ryzyka z odmą prężną opłucnową."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "A. Doustny bezpośredni inhibitor czynnika Xa (np. rywaroksaban w dawce nasycającej 15 mg co 12 godzin).",
        "B. Podskórna heparyna drobnocząsteczkowa (LMWH, np. enoksaparyna 1 mg/kg m.c. s.c. dwa razy na dobę).",
        "C. Dożylna heparyna niefrakcjonowana (UFH) w bolusie, a następnie we wlewie ciągłym pod kontrolą aPTT.",
        "D. Podskórny syntetyczny pentasacharyd (fondaparynuks w jednorazowej dawce dobowej 7,5 mg s.c.).",
        "E. Doustny antagonista witaminy K (warfaryna w jednorazowej dawce nasycającej 10 mg doustnie)."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A. Ponieważ płyny wywołują natychmiastowy odruchowy skurcz tętnic wieńcowych w mechanizmie wstrząsu.",
        "B. Ponieważ powoduje nadmierną rozstrzeń prawej komory, ucisk przegrody na lewą komorę i spadek rzutu.",
        "C. Ponieważ krystaloidy dezaktywują heparynę niefrakcjonowaną w surowicy poprzez wiązanie z białkami.",
        "D. Ponieważ nasila ucieczkę potasu przez cewki nerkowe i indukuje zagrażającą życiu hipokaliemię.",
        "E. Ponieważ krystaloidy rozpuszczają skrzep w tętnicy płucnej i wywołują zatorowość skrzyżowaną mózgu."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A. Tylko odchylenia: 1 oraz 3 (zespół S1Q3T3 oraz tachykardia zatokowa).",
        "B. Tylko odchylenia: 1, 2 oraz 3 (bez zmian w odprowadzeniach przedsercowych).",
        "C. Tylko odchylenia: 1, 2 oraz 4 (z pominięciem inwersji załamków T w V1-V4).",
        "D. Tylko odchylenia: 2, 3, 4 oraz 5 (bez obecności klasycznego zespołu McGinna-White'a).",
        "E. Wszystkie wymienione odchylenia elektrokardiograficzne (1, 2, 3, 4, 5)."
      ]
    }
  ],
  10: [
    {
      qIdx: 4, // Q5
      newOpts: [
        "A. Dochodzi do gwałtownego wydzielenia pęcherzyków azotu i rozwoju masywnej zatorowości gazowej w krążeniu płucnym.",
        "B. Dochodzi do natychmiastowego wytrącenia osadu węglanu wapnia grożącego zatorowością i zatkaniem kaniuli.",
        "C. Wodorowęglan sodu wywołuje nieodwracalną inaktywację kanałów wapniowych w sercu z natychmiastową asystolią.",
        "D. Mieszanina indukuje nagły spadek pH krwi obwodowej poniżej 6,9 wskutek wyzwolenia dwutlenku węgla w żyle.",
        "E. Sole wapnia wchodzą w reakcję chelatacji z jonami wodorowęglanowymi, całkowicie neutralizując analgezję."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A. Paracetamol w dawce 1000 mg + amoksycylina z kwasem klawulanowym + inhibitor pompy protonowej (omeprazol).",
        "B. Inhibitor ACE + antagonista aldosteronu (spironolakton/eplerenon) + niesteroidowy lek przeciwzapalny (NLPZ).",
        "C. Kardioselektywny beta-adrenolityk (bisoprolol) + statyna (atorwastatyna) + kwas acetylosalicylowy (ASA).",
        "D. Tiazydowy lek moczopędny (hydrochlorotiazyd) + pochodna biguanidu (metformina) + suplement witaminy D3.",
        "E. Dihydropirydynowy bloker kanału Ca2+ (amlodypina) + profilaktyczna dawka heparyny drobnocząsteczkowej."
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

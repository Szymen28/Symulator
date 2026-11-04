const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');

const MASTER_KEY = '@LEKSzymon28111999';
const CASES_DIR = path.join(__dirname, '..', 'cases');

console.log("Generating Case 121: Wrodzona niedoczynność tarczycy (WNT)...");

async function saveCase(caseData) {
  const filePath = path.join(CASES_DIR, caseData.filename);
  const jsonStr = JSON.stringify(caseData, null, 2);
  const encrypted = await encryptStringAes(jsonStr, MASTER_KEY);
  fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), 'utf8');
  console.log(`[SAVED] Case #${caseData.id}: ${caseData.filename} (LEK Qs: ${caseData.lekQuestions.length}, Steps: ${caseData.steps.length}, Flashcards: ${caseData.flashcards.length})`);
}

const case121 = {
  id: 121,
  filename: "121_wrodzona_niedoczynnosc_tarczycy.json",
  dept: "Pediatria",
  shortTitle: "3-tygodniowy Jaś – Przedłużająca się żółtaczka, duży język, wiotkość i zaparcia (Wrodzona niedoczynność tarczycy)",
  diagnosisTitle: "Wrodzona pierwotna niedoczynność tarczycy (Congenital Hypothyroidism – dysgenezja tarczycy) wykryta w programie badań przesiewowych noworodków (NBS)",
  vitals: [
    { label: "Częstość akcji serca (HR)", val: "94/min", sub: "Wyraźna bradykardia jak na wiek niemowlęcy (norma 120-160)", status: "vital-warn" },
    { label: "Częstość oddechów (RR)", val: "28/min", sub: "Spowolniony napęd oddechowy (norma 30-50/min)", status: "vital-warn" },
    { label: "Temperatura głęboka", val: "35,9 °C", sub: "Hipotermia / upośledzona termogeneza", status: "vital-warn" },
    { label: "Wskaźnik TSH z bibuły NBS", val: ">100 mIU/l", sub: "Krytycznie dodatni wynik testu przesiewowego", status: "vital-crit" }
  ],
  vitalsObj: { hr: 94, bp: "72/44", spo2: 97, rr: 28, temp: 35.9, gcs: 14 },
  story: `<p><strong>Pacjent:</strong> 3-tygodniowy noworodek płci męskiej, Jaś (urodzony w 41. tygodniu ciąży, poród siłami natury, masa urodzeniowa 3950 g, Apgar 9/10), został pilnie skierowany do poradni endokrynologii dziecięcej i oddziału pediatrycznego przez Zakład Badań Przesiewowych Noworodków z powodu krytycznie podwyższonego stężenia TSH w teście suchej kropli krwi na bibule pobranej w 3. dobie życia.</p><p><strong>Wywiad chorobowy:</strong> Rodzice zgłaszają, że od wypisu ze szpitala położniczego chłopiec jest skrajnie spokojny, 'idealne niemowlę', które prawie wcale nie płacze, a gdy zapłacze, jego głos jest ochrypły, niski i skrzeczący. Dziecko nie wybudza się samodzielnie na karmienia, przesypia po 5-6 godzin z rzędu i trzeba je z trudem dobudzać. Podczas ssania piersi bardzo szybko męczy się i zasypia już po 2-3 minutach, często się krztusi, a mleko wycieka kącikami ust. Od ponad tygodnia występują nasilone zaparcia – oddaje twardy, zbity stolec raz na 3-4 dni wyłącznie po stymulacji czopkiem glicerynowym. Ponadto matka zauważyła, że żółtaczka, która pojawiła się w 3. dobie życia, zamiast ustępować, stale się utrzymuje, a skóra staje się sucha i chłodna. W wywiadzie rodzinnym: matka zdrowa, w ciąży parametry tarczycy w normie, bez leków przeciwtarczycowych.</p><p><strong>Badanie przedmiotowe na oddziale:</strong> Niemowlę w stanie ogólnym średnim, wyraźnie podsypiające, reakcja na bodźce spowolniona. Wyraźne zażółcenie powłok skórnych i twardówek (przedłużona żółtaczka noworodkowa). Twarz nalana, obrzęknięte powieki, grube rysy twarzy. Język wyraźnie powiększony (makroglosja), gruby, stale wystaje spomiędzy warg, utrudniając domknięcie ust i ssanie. Skóra całego ciała sucha, szorstka, chłodna w dotyku, z cechami marmurkowatości (cutis marmorata). W badaniu głowy: ciemiączko przednie duże, szerokie (4x4 cm), ciemiączko tylne otwarte na 1,5 cm (norma <0,5 cm). W badaniu klatki piersiowej: tony serca ciche, bradykardia 94/min, bez szmerów. Brzuch wzdęty, żabi, perystaltyka leniwa; obecna duża, miękka przepuklina pępkowa o średnicy wrót ok. 2 cm. Napięcie mięśniowe uogólnione, wyraźnie obniżone (hipotonia osiowa i obwodowa – objaw 'odgiętej główki' i wiotkości przy próbie trakcji), odruchy noworodkowe (Moro, ssania, chwytny) osłabione, leniwe.</p>`,
  labs: {
    "Profil tarczycowy i test przesiewowy (NBS)": [
      { name: "TSH w surowicy (weryfikacja żylna)", val: "148,0 mIU/l", norm: "0,7 - 5,9 mIU/l", flag: "CRIT_HIGH" },
      { name: "Wolna tyroksyna (fT4)", val: "2,1 pmol/l (0,16 ng/dl)", norm: "11,5 - 28,3 pmol/l", flag: "CRIT_LOW" },
      { name: "Wolna trójjodotyronina (fT3)", val: "1,4 pmol/l", norm: "3,0 - 8,5 pmol/l", flag: "LOW" },
      { name: "TSH z bibuły przesiewowej (3. doba)", val: ">100 mIU/l", norm: "< 12 mIU/l (norma testu)", flag: "CRIT_HIGH" },
      { name: "Tyreoglobulina (Tg) w surowicy", val: "< 1,0 ng/ml", norm: "10 - 80 ng/ml", flag: "LOW" }
    ],
    "Bilirubina i biochemia": [
      { name: "Bilirubina całkowita", val: "14,2 mg/dl", norm: "< 1,2 mg/dl (w 3. tyg. <2,0)", flag: "CRIT_HIGH" },
      { name: "Bilirubina pośrednia (niesprzężona)", val: "12,9 mg/dl", norm: "< 1,0 mg/dl", flag: "CRIT_HIGH" },
      { name: "Bilirubina bezpośrednia (sprzężona)", val: "1,3 mg/dl", norm: "< 0,3 mg/dl", flag: "HIGH" },
      { name: "Cholesterol całkowity", val: "248 mg/dl", norm: "110 - 180 mg/dl", flag: "HIGH" },
      { name: "Glukoza na czczo", val: "68 mg/dl", norm: "60 - 95 mg/dl", flag: "NORMAL" },
      { name: "Sód (Na+)", val: "138 mmol/l", norm: "135 - 145 mmol/l", flag: "NORMAL" },
      { name: "Potas (K+)", val: "4,6 mmol/l", norm: "3,7 - 5,5 mmol/l", flag: "NORMAL" }
    ],
    "Morfologia i wskaźniki zapalne": [
      { name: "Leukocyty (WBC)", val: "8,4 tys./µl", norm: "6,0 - 14,0 tys./µl", flag: "NORMAL" },
      { name: "Hemoglobina (Hb)", val: "11,2 g/dl", norm: "12,0 - 16,5 g/dl", flag: "LOW" },
      { name: "Hematokryt (Ht)", val: "34 %", norm: "36 - 48 %", flag: "LOW" },
      { name: "MCV", val: "94 fl", norm: "88 - 106 fl", flag: "NORMAL" },
      { name: "Płytki krwi (PLT)", val: "320 tys./µl", norm: "150 - 450 tys./µl", flag: "NORMAL" },
      { name: "CRP", val: "0,8 mg/l", norm: "< 5,0 mg/l", flag: "NORMAL" }
    ]
  },
  steps: [
    {
      title: "Krok 1: Wstępna ocena kliniczna i weryfikacja alarmującego wyniku przesiewowego",
      text: "Do Twojego gabinetu trafia 3-tygodniowy Jaś z wezwaniem z Zakładu Badań Przesiewowych. W badaniu widzisz wiotkiego noworodka z dużą przepukliną pępkową, wystającym językiem, bradykardią 94/min i przedłużoną żółtaczką. Co stanowi bezwzględny, natychmiastowy priorytet w postępowaniu?",
      options: [
        "Zlecenie natychmiastowego pobrania krwi żylnej na TSH i wolne hormony tarczycy (fT4, fT3) celem pilnego potwierdzenia rozpoznania i wdrożenia substytucji",
        "Wdrożenie intensywnej fototerapii na oddziale noworodkowym z powodu żółtaczki i odroczenie diagnostyki tarczycy do ustąpienia hiperbilirubinemii",
        "Wykonanie pilnego RTG jamy brzusznej i wlewu kontrastowego z podejrzeniem choroby Hirschsprunga jako jedynej przyczyny zaparć",
        "Zalecenie matce zmiany diety na eliminacyjną z podejrzeniem alergii na białka mleka krowiego i kontrola w POZ za 4 tygodnie"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Podstawą jest pilna weryfikacja laboratoryjna z krwi żylnej (TSH, fT4, fT3) bez zbędnej zwłoki.</strong> Każdy dzień opóźnienia wdrożenia leczenia tyroksyną u noworodka z ciężką niedoczynnością tarczycy grozi nieodwracalnym ubytkiem punktów ilorazu inteligencji (IQ) i trwałym uszkodzeniem mielinizacji OUN.",
        "❌ BŁĄD! <strong>Fototerapia nie rozwiąże przyczyny problemu.</strong> Choć bilirubina wynosi 14,2 mg/dl, żółtaczka u tego dziecka wynika ze spowolnienia dojrzewania i aktywności transferazy glukuronowej (UGT) spowodowanego brakiem hormonów tarczycy. Priorytetem jest tarczyca.",
        "❌ BŁĄD! <strong>Zaparcia i 'żabi brzuch' są klasyczną manifestacją atonii jelitowej w hipotyreozie.</strong> Diagnostykę Hirschsprunga rozważa się dopiero w przypadku braku poprawy po eutyreozie, ale pełen obraz kliniczny wskazuje na WNT.",
        "❌ BŁĄD! <strong>Odrzucenie leczenia i kontrola za miesiąc to błąd w sztuce lekarskiej.</strong> Brak tyroksyny w pierwszych tygodniach życia prowadzi do nieodwracalnego kretynizmu tarczycowego."
      ]
    },
    {
      title: "Krok 2: Badania przesiewowe noworodków (NBS) w Polsce – zasady i harmonogram",
      text: "Rodzice są zszokowani: 'Przecież synek urodził się z 9 punktami Apgar i ważył prawie 4 kg! Kiedy i jak właściwie pobiera się to badanie przesiewowe i dlaczego objawy pojawiły się dopiero teraz?' Jak rzetelnie wyjaśnisz to rodzicom w oparciu o wytyczne?",
      options: [
        "Krew na bibułę pobiera się w 3. dobie życia (po ukończeniu 48 h życia); u noworodka hormony matczyne przechodzące przez łożysko chronią mózg pod koniec ciąży, dlatego w chwili porodu objawy są dyskretne, a ujawniają się w 2-4 tygodniu życia",
        "Krew pobiera się z pępowiny w pierwszych 5 minutach po porodzie; objawy pojawiły się teraz, bo dziecko uległo zakażeniu wirusowemu w domu",
        "Badanie wykonuje się rutynowo w 14. dobie życia w POZ; 9 punktów w skali Apgar wyklucza jakiekolwiek wady genetyczne i metaboliczne",
        "Wysokie TSH na bibule to błąd laboratoryjny wynikający ze zbyt wczesnego pobrania krwi w 1. dobie, objawy są normą fizjologiczną u noworodków"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Przesiew w Polsce wykonuje się w 3. dobie życia (48-72 h), aby uniknąć fizjologicznego poporodowego wyrzutu TSH.</strong> Wewnątrzmacicznie matczyna tyroksyna przenika przez łożysko w ilości wystarczającej (ok. 30-40%), by chronić rozwijający się mózg płodu i zamaskować objawy w chwili urodzenia. Po przecięciu pępowiny zapasy matczynej T4 gwałtownie spadają, a objawy hipotyreozy manifestują się w 2-4. tygodniu.",
        "❌ BŁĄD! <strong>Krew pępowinowa nie jest rutynowo używana w polskim programie NBS na tarczycę.</strong> Pobiera się krew włośniczkową z bocznej powierzchni pięty na bibułę w 3. dobie życia.",
        "❌ BŁĄD! <strong>Pobranie w 14. dobie byłoby zbyt późne – okno terapeutyczne dla ochrony neuronów OUN zamyka się w 14. dniu życia.</strong> Skala Apgar ocenia jedynie adaptację krążeniowo-oddechową po urodzeniu, a nie metabolizm.",
        "❌ BŁĄD! <strong>Pobranie po 48 h nie jest błędem, a TSH >100 mIU/l jednoznacznie potwierdza pierwotną niedoczynność tarczycy.</strong>"
      ]
    },
    {
      title: "Krok 3: Analiza etiologii wrodzonej niedoczynności tarczycy (WNT)",
      text: "Wyniki żylne potwierdzają: TSH 148 mIU/l, fT4 2,1 pmol/l (skrajny niedobór), tyreoglobulina niewykrywalna (<1,0 ng/ml). Jaka jest najczęstsza przyczyna pierwotnej wrodzonej niedoczynności tarczycy u noworodków?",
      options: [
        "Dysgenezja tarczycy (ok. 80-85% przypadków), najczęściej ektopia tarczycy lub całkowita agenezja (aplazja)",
        "Wrodzona dyshormonogeneza tarczycy (defekty enzymatyczne peroksydazy TPO) odpowiadająca za >90% przypadków",
        "Wtórna niedoczynność tarczycy spowodowana panhipopituitaryzmem i niedoborem TSH w przysadce",
        "Niedobór jodu w diecie matki występujący powszechnie w Europie Środkowej"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Dysgenezja tarczycy stanowi 80-85% przyczyn pierwotnej WNT.</strong> Wśród postaci dysgenezji dominuje ektopia (ok. 60% – np. tarczyca językowa), agenezja/aplazja (ok. 30%) oraz hipoplazja (10%). Niewykrywalne stężenie tyreoglobuliny u Jasia silnie przemawia za całkowitą agenezją tkanki tarczycowej.",
        "❌ BŁĄD! <strong>Dyshormonogeneza (wady syntezy hormonów, np. mutacje TPO, NIS, Pendryny) to ok. 15% przypadków WNT.</strong> W tych stanach tarczyca zwykle jest obecna, a nawet tworzy się wole, zaś tyreoglobulina jest podwyższona.",
        "❌ BŁĄD! <strong>We wtórnej niedoczynności TSH jest niskie lub nieadekwatnie prawidłowe przy niskim fT4.</strong> Tutaj TSH wynosi aż 148 mIU/l, co bezspornie definiuje uszkodzenie pierwotne na poziomie gruczołu tarczowego.",
        "❌ BŁĄD! <strong>W Polsce od 1997 r. funkcjonuje obowiązkowe jodowanie soli kuchennej,</strong> dzięki czemu endemiczny kretynizm z niedoboru jodu został całkowicie wyeliminowany."
      ]
    },
    {
      title: "Krok 4: Wdrożenie leczenia substytucyjnego – lek, dawka i cel czasowy",
      text: "Jakie leczenie należy wdrożyć u 3-tygodniowego Jasia (masa ciała 4,0 kg) w trybie natychmiastowym zgodnie z wytycznymi ESPE (European Society for Paediatric Endocrinology)?",
      options: [
        "Lewotyroksyna (L-T4) doustnie w dawce 10-15 µg/kg m.c./dobę (tj. 40-60 µg/dobę), podana rano na czczo",
        "Trójjodotyronina (L-T3) dożylnie w dawce nasycającej 50 µg/kg m.c. co 8 godzin",
        "Płyn Lugola doustnie w dawce 5 kropli 3 razy na dobę celem pobudzenia tyreocytów do biosyntezy",
        "Małe dawki lewotyroksyny: 2 µg/kg m.c./dobę, powoli zwiększane co 4 tygodnie pod kontrolą kardiologa"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Standardem leczenia WNT jest lewotyroksyna (L-T4) w dawce 10-15 µg/kg m.c./dobę p.o.</strong> U Jasia (4 kg) dawka początkowa wynosi 40-50 µg/dobę (zwykle tabletka 50 µg). Celem jest jak najszybsza normalizacja fT4 w ciągu 3-5 dni i TSH w ciągu 2-4 tygodni, aby chronić mózg przed trwałym opóźnieniem rozwoju.",
        "❌ BŁĄD! <strong>Nie stosuje się L-T3 (liotyroniny) jako leczenia pierwszego rzutu u noworodków.</strong> T3 ma krótki okres półtrwania, wywołuje gwałtowne skoki stężeń i wahania hemodynamiczne. Mózg noworodka fizjologicznie konwertuje L-T4 do T3 wewnątrzkomórkowo za pomocą dejodynazy typu 2.",
        "❌ BŁĄD! <strong>Płyn Lugola (jod nieorganiczny) jest bezwzględnie przeciwwskazany.</strong> Może wywołać efekt Wolffa-Chaikoffa (zablokowanie resztkowej syntezy hormonów) i nie zastępuje gotowych hormonów.",
        "❌ BŁĄD! <strong>Ostrożne, małe dawki ('start low, go slow') stosuje się u osób w podeszłym wieku z chorobą wieńcową, a NIE u noworodków z WNT!</strong> U niemowląt opóźnienie pełnej dawki skutkuje nieodwracalnym deficytem intelektualnym."
      ]
    },
    {
      title: "Krok 5: Edukacja rodziców odnośnie techniki podawania leku",
      text: "L-tyroksyna w Polsce u niemowląt dostępna jest w postaci tabletek (np. Euthyrox/Letrox) lub płynu doustnego. Rodzice pytają, jak technicznie podawać tabletkę 3-tygodniowemu niemowlęciu. Jakie są bezwzględne zalecenia?",
      options: [
        "Tabletkę należy rozkruszyć na łyżeczce, zawiesić w kilku kroplach wody lub odciągniętego mleka matki i podać bezpośrednio do ust dziecka rano, 30-60 minut przed pierwszym karmieniem; nie wolno mieszać jej z preparatami żelaza, wapnia ani soją",
        "Tabletkę należy wrzucić do pełnej butelki z mieszanką mleczną (150 ml) i pozwolić dziecku wypić ją w ciągu całego dnia",
        "Tabletkę podaje się wieczorem tuż przed snem, popijając sokiem owocowym bogatym w witaminę C",
        "Lek można podawać wyłącznie łącznie z gęstym kleikiem sojowym, który ułatwia połykanie proszku"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Tabletkę rozkrusza się na małej łyżeczce z kilkoma kroplami wody lub mleka kobiecego i podaje bezpośrednio przed karmieniem.</strong> Nigdy nie wolno dodawać leku do całej butelki mleka, gdyż niedopity pokarm oznacza niedostarczenie pełnej dawki. Soja, żelazo i wapń silnie wiążą tyroksynę w świetle jelita i hamują jej wchłanianie.",
        "❌ BŁĄD! <strong>Dodanie do całej butelki mleka grozi nieprzyjęciem pełnej dawki leku,</strong> jeśli niemowlę nie dopije całej porcji mieszanki.",
        "❌ BŁĄD! <strong>U niemowląt lek podaje się rano, a nie na noc,</strong> i nie podaje się soków owocowych 3-tygodniowemu noworodkowi.",
        "❌ BŁĄD! <strong>Soja dramatycznie upośledza jelitowe wchłanianie lewotyroksyny</strong> i może doprowadzić do ciężkiej, lekoopornej niedoczynności tarczycy."
      ]
    },
    {
      title: "Krok 6: Diagnostyka obrazowa gruczołu tarczowego",
      text: "W celu ustalenia anatomicznej przyczyny WNT planujesz badanie obrazowe szyi. Jakie badanie jest metodą pierwszego wyboru i co należy wykonać w przypadku braku tarczycy w typowym położeniu w USG?",
      options: [
        "USG szyi jako badanie pierwszego wyboru; w przypadku braku tarczycy w loży scyntygrafia tarczycy z użyciem Tc-99m lub I-123 w celu poszukiwania tarczycy ektopowej (np. u nasady języka)",
        "Tomografia komputerowa szyi i klatki piersiowej z dożylnym kontrastem jodowym jako badanie z wyboru",
        "Rutynowy rezonans magnetyczny przysadki i podwzgórza w celu wykluczenia udaru przysadki mózgowej",
        "Biopsja aspiracyjna cienkoigłowa (BACC) loży tarczycy u noworodka"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Ultrasonografia (USG) szyi jest nieinwazyjnym badaniem z wyboru.</strong> Jeśli w loży tarczycy brak jest tkanki, scyntygrafia z użyciem technetu-99m (Tc-99m) lub jodu-123 (I-123) pozwala odróżnić całkowitą agenezję (brak wychwytu) od tarczycy ektopowej (np. u nasady języka, w przewodzie tarczowo-językowym). Wykonanie scyntygrafii nie może jednak opóźniać włączenia L-T4!",
        "❌ BŁĄD! <strong>TK z kontrastem jodowym jest przeciwwskazana:</strong> podanie wysokiej dawki jodu w kontraście blokuje tarczycę (efekt Wolffa-Chaikoffa) i fałszuje scyntygrafię na wiele tygodni, a dodatkowo obciąża noworodka promieniowaniem jonizującym.",
        "❌ BŁĄD! <strong>MRI przysadki nie jest badaniem pierwszego rzutu przy TSH 148 mIU/l;</strong> przysadka działa doskonale, produkując olbrzymie ilości TSH w odpowiedzi na brak hormonów obwodowych.",
        "❌ BŁĄD! <strong>Biopsja nie ma żadnego zastosowania w diagnostyce WNT u noworodka.</strong>"
      ]
    },
    {
      title: "Krok 7: Monitorowanie terapii i cele laboratoryjne",
      text: "Jaś rozpoczął leczenie lewotyroksyną w dawce 50 µg/dobę. Jak powinien wyglądać schemat monitorowania stężeń TSH i fT4 w pierwszych miesiącach życia oraz jakie są docelowe wartości fT4?",
      options: [
        "Kontrola TSH i fT4 po 2 i 4 tygodniach od rozpoczęcia leczenia, następnie co 1-2 miesiące do 6. m.ż.; cel: fT4 w górnej połowie zakresu normy dla wieku, TSH w zakresie referencyjnym (<2,5 mIU/l)",
        "Jednorazowa kontrola TSH po roku leczenia; brak konieczności oznaczania fT4",
        "Kontrola wyłącznie poziomu fT3 raz w miesiącu; TSH normalizuje się dopiero w wieku szkolnym",
        "Codzienne pobieranie krwi włośniczkowej przez rodziców w domu aparatem paskowym"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>W pierwszych 6 miesiącach życia stężenia fT4 i TSH kontroluje się bardzo ściśle: pierwsze oznaczenie po 2-4 tygodniach, a następnie co 1-2 miesiące.</strong> Celem terapeutycznym jest szybkie osiągnięcie i utrzymanie fT4 w górnej połowie normy laboratoryjnej dla wieku (optymalna ochrona mielinizacji mózgowia) przy stężeniu TSH w normie (<2,5 mIU/l).",
        "❌ BŁĄD! <strong>Kontrola po roku byłaby katastrofalnym zaniedbaniem.</strong> Dziecko rośnie, przybiera na masie ciała, co wymaga regularnych korekt dawek na kg masy ciała.",
        "❌ BŁĄD! <strong>fT3 nie jest parametrem służącym do modyfikacji dawki L-T4;</strong> kluczowe są oznaczenia TSH i fT4.",
        "❌ BŁĄD! <strong>Nie istnieją domowe glukometropodobne paski do oznaczania TSH z krwi włośniczkowej.</strong>"
      ]
    },
    {
      title: "Krok 8: Długofalowe rokowanie i rozwój psychoruchowy dziecka",
      text: "Rodzice z niepokojem pytają: 'Czy Jaś będzie normalnie się uczył, biegał i żył jak zdrowe dzieci?' Jakie jest rokowanie u dziecka z wrodzoną niedoczynnością tarczycy wykrytą w teście przesiewowym i leczoną od 3. tygodnia życia?",
      options: [
        "Rokowanie jest bardzo dobre; wdrożenie pełnej substytucji L-tyroksyną w pierwszych 2-3 tygodniach życia pozwala na osiągnięcie prawidłowego rozwoju psychoruchowego, fizycznego i intelektualnego zbliżonego do zdrowych rówieśników",
        "Mimo leczenia dziecko nieodwracalnie rozwinie głęboki kretynizm i nie osiągnie zdolności samodzielnego poruszania się",
        "Leczenie tyroksyną należy odstawić w 12. miesiącu życia, gdyż tarczyca w pełni się regeneruje",
        "Dziecko będzie zdrowe fizycznie, ale leczenie tarczycowe wywołuje nieuchronną utratę słuchu i ślepotę"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Wprowadzenie powszechnych badań przesiewowych (NBS) zrewolucjonizowało rokowanie w WNT.</strong> Noworodki zdiagnozowane i prawidłowo leczone w pierwszych 2-3 tygodniach życia rozwijają się całkowicie prawidłowo, osiągając normalny iloraz inteligencji (IQ) i wzrost docelowy zgodny z potencjałem genetycznym.",
        "❌ BŁĄD! <strong>Kretynizm tarczycowy był tragedią minionych epok przed erą badań przesiewowych.</strong> Wczesne leczenie całkowicie zapobiega temu powikłaniu.",
        "❌ BŁĄD! <strong>W przypadku dysgenezji (agenezji/ektopii) leczenie lewotyroksyną jest leczeniem substytucyjnym do końca życia.</strong> Tarczyca nie ulega samoczynnej regeneracji.",
        "❌ BŁĄD! <strong>Lewotyroksyna jest identyczna z endogennym hormonem ludzkim i nie wywołuje uszkodzenia wzroku ani słuchu.</strong> Wręcz przeciwnie – zapobiega powikłaniom neurologicznym."
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Defekt embriogenezy",
      title: "Dysgenezja i agenezja gruczołu tarczowego",
      short: "Zaburzenie migracji i różnicowania zawiązka tarczycy",
      detail: "W 80-85% przypadków pierwotnej WNT dochodzi do braku wykształcenia (agenezja) lub nieprawidłowego zstępowania tarczycy z otworu ślepego języka (ektopia). Skutkuje to brakiem pęcherzyków tarczycowych i zerową syntezą endogennej tyroksyny.",
      target: "Brak pęcherzyków tarczycowych",
      drugTarget: "<span class='dose-pill'>L-tyroksyna 10-15 µg/kg/d p.o.</span> substytucja od 1. doby rozpoznania"
    },
    {
      badge: "Uszkodzenie OUN",
      title: "Upośledzenie mielinizacji i neurogenezy",
      short: "Brak T4 i T3 w neuronach kory i móżdżku",
      detail: "Hormony tarczycy są kluczowe dla ekspresji białek mieliny (MBP), synaptogenezy, migracji neuroblastów i rozwoju komórek Purkinjego w móżdżku. Niedobór w krytycznym oknie pierwszych 2-3 lat życia prowadzi do nieodwracalnej utraty neuronów i kretynizmu.",
      target: "Mielinizacja i synaptogeneza OUN",
      drugTarget: "<span class='dose-pill'>L-tyroksyna 10-15 µg/kg/d</span> ochrona neuroprotekcyjna do 14. doby życia"
    },
    {
      badge: "Atonia i metabolizm",
      title: "Hipometabolizm, hipotermia i obrzęk śluzowaty",
      short: "Spadek Na+/K+-ATPazy i akumulacja glikozaminoglikanów",
      detail: "Brak tyroksyny spowalnia podstawową przemianę materii (BMR), prowadząc do hipotermii, bradykardii i atoni mięśni gładkich jelit (uporczywe zaparcia, duży brzuch). Odkładanie kwasu hialuronowego w tkankach wywołuje makroglosję i obrzęki powiek.",
      target: "Metabolizm podstawowy i motoryka jelit",
      drugTarget: "<span class='dose-pill'>L-tyroksyna w dawce docelowej</span> normalizacja perystaltyki i termogenezy"
    },
    {
      badge: "Sprzężenie zwrotne",
      title: "Brak ujemnego sprzężenia i hipersekrecja TSH",
      short: "Masywny wyrzut TSH przez tyreotropy przysadki",
      detail: "Brak wolnych hormonów (fT4, fT3) we krwi zdejmuje hamowanie podwzgórzowo-przysadkowe, wywołując ekstremalny wzrost TSH (>100 mIU/l), co stanowi podstawę laboratoryjnego testu przesiewowego noworodków (NBS).",
      target: "Oś podwzgórze-przysadka-tarczyca",
      drugTarget: "<span class='dose-pill'>L-tyroksyna (kontrola TSH <2,5 mIU/l)</span> przywrócenie eutyreozy"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Wrodzona niedoczynność tarczycy vs Inne jednostki chorobowe okresu noworodkowego",
    headers: ["Cecha kliniczna", "Wrodzona niedoczynność tarczycy (WNT)", "Choroba Hirschsprunga", "Atrezja dróg żółciowych", "Wrodzony przerost nadnerczy (WPN)", "Fizjologiczna żółtaczka noworodków"],
    rows: [
      ["Etiologia główna", "Dysgenezja tarczycy (agenezja / ektopia w 85%)", "Wrodzony brak zwojów nerwowych splotów Auerbacha i Meissnera w dystalnym jelicie", "Zarastanie i postępujące niszczenie zewnątrzwątrobowych dróg żółciowych", "Niedobór 21-hydroksylazy (blok biosyntezy kortyzolu i aldosteronu)", "Niedojrzałość enzymatyczna transferazy glukuronowej (UGT1A1)"],
      ["Objawy wiodące", "Przedłużona żółtaczka, makroglosja, wiotkość, bradykardia, zaparcia, sucha skóra", "Brak oddania smółki w 48 h, wzdęcie brzucha, wymioty żółciowe, enterocolitis", "Żółtaczka z odbarwionymi (acholicznymi) stolcami i ciemnym moczem po 2. tyg.", "Utrata soli, wymioty, hiponatremia, hiperkaliemia, wirylizacja narządów u dziewczynek", "Przejściowe zażółcenie skóry bez innych objawów patologicznych"],
      ["Badania hormonalne / biochemia", "TSH krytycznie wysokie (>100 mIU/l), fT4 skrajnie niskie", "Hormony tarczycy w normie, elektrolity w normie (początkowo)", "Bilirubina bezpośrednia (sprzężona) >20% całkowitej, wysokie GGTP i ALP", "17-OH-progesteron wysoki, hiponatremia, hiperkaliemia, kwasica", "Bilirubina niesprzężona podwyższona, ustępuje samoistnie do 10-14 dni"],
      ["Badanie przesiewowe (NBS)", "Tak – TSH z krwi na bibule w 3. dobie życia", "Nie – rozpoznanie wyłącznie kliniczne i manometria/biopsja odbytnicy", "Nie – wczesna diagnostyka na podstawie koloru stolca i bilirubiny", "Tak – 17-OHP z krwi na bibule w 3. dobie życia", "Prawidłowe wyniki wszystkich testów przesiewowych"],
      ["Badania obrazowe / procedury", "USG szyi (brak tarczycy lub ektopia), scyntygrafia Tc-99m / I-123", "Wlew kontrastowy (strefa przejściowa), biopsja ssąca odbytnicy (brak zwojów)", "USG jamy brzusznej (brak pęcherzyka żółciowego, objaw trójkąta), cholangiografia", "USG nadnerczy (przerost kory nadnerczy)", "Nie wymaga diagnostyki obrazowej"],
      ["Leczenie z wyboru", "Lewotyroksyna (L-T4) doustnie 10-15 µg/kg/d natychmiast", "Zabieg chirurgiczny – resekcja bezzwojowego odcinka jelita (np. met. Pull-through)", "Pilna operacja Kasai (hepatoportoenterostomia) optymalnie do 60. doby życia", "Hydrokortyzon + Fludrokortyzon substytucyjnie + chlorek sodu", "Brak leczenia lub fototerapia w przypadku przekroczenia wskazań normogramu"]
    ]
  },
  dutySummary: {
    overview: "Wrodzona niedoczynność tarczycy (WNT) występuje z częstością ok. 1:3000 – 1:4000 żywych urodzeń. Dzięki powszechnemu programowi badań przesiewowych noworodków w Polsce, wdrożonemu na bibule w 3. dobie życia, możliwe jest rozpoczęcie leczenia przed wystąpieniem objawów klinicznych i zapobieżenie kretynizmowi tarczycowemu. Najczęstszą przyczyną jest dysgenezja tarczycy (85%: ektopia, agenezja, hipoplazja), rzadziej wrodzona dyshormonogeneza (15%).",
    diagnostics: "1. Weryfikacja stężenia TSH oraz wolnych hormonów (fT4, fT3) z krwi żylnej – natychmiast w przypadku alarmu z Zakładu Badań Przesiewowych.<br>2. Oznaczenie tyreoglobuliny (Tg) w surowicy – poziom niewykrywalny silnie wskazuje na całkowitą agenezję tkanki tarczycowej.<br>3. USG tarczycy wysokiej rozdzielczości – ocena obecności i objętości tarczycy w loży anatomicznej na szyi.<br>4. Scyntygrafia tarczycy z użyciem Tc-99m lub I-123 – poszukiwanie tarczycy ektopowej (językowa, podjęzykowa) w razie pustej loży (nie może opóźniać terapii).<br>5. Bilirubina z frakcjami (przedłużona żółtaczka noworodkowa ze spowolnienia UGT), lipidogram (hipercholesterolemia).",
    drugsAndDoses: "1. <span class='dose-pill'>L-tyroksyna (lewotyroksyna) 10-15 µg/kg m.c./dobę p.o.</span> w pojedynczej dawce porannej; u noworodka o masie 4 kg dawka początkowa to zwykle 50 µg/dobę.<br>2. Prawidłowa technika podania: tabletkę rozkruszyć na łyżeczce, zmieszać z kilkoma kroplami wody lub mleka matki, podać 30-60 min przed pierwszym karmieniem.<br>3. <span class='dose-pill'>Unikanie łączenia L-T4</span> z preparatami żelaza, wapnia oraz mieszankami sojowymi, które upośledzają jelitowe wchłanianie tyroksyny.<br>4. Nie stosuje się liotyroniny (L-T3) ani jodków (płynu Lugola) w rutynowej terapii wrodzonej niedoczynności tarczycy.",
    procedures: "1. Monitorowanie antropometryczne: regularna ocena masy ciała, długości ciała i obwodu główki na siatkach centylowych WHO.<br>2. Kontrola neurologiczna: ocena napięcia mięśniowego, odruchów noworodkowych i etapów rozwoju kamieni milowych.<br>3. Diagnostyka słuchu: obiektywne badanie słuchu (OAE/ABR) ze względu na współwystępowanie wad słuchu w niektórych zespołach genetycznych (np. zespół Pendreda).<br>4. Zaopatrzenie przepukliny pępkowej – w większości przypadków ulega samoistnemu zamknięciu po wyrównaniu hipotyreozy.",
    monitoring: "1. Badania laboratoryjne (TSH i fT4): pierwsza kontrola po 2-4 tygodniach od rozpoczęcia L-T4, następnie co 1-2 miesiące przez pierwsze 6 miesięcy życia.<br>2. Od 6. do 12. miesiąca życia: kontrola TSH i fT4 co 2-3 miesiące; od 1. do 3. roku życia co 3-4 miesiące; później co 6 miesięcy do zakończenia wzrastania.<br>3. Cele terapeutyczne: stężenie fT4 w górnej połowie normy dla wieku, TSH w dolnej połowie normy (<2,5 mIU/l).<br>4. Ocena wieku kostnego (RTG ręki i nadgarstka niespójnego) od 3. roku życia w celu monitorowania tempa dojrzewania szkieletu."
  },
  lekQuestions: [
    {
      question: "Krew na bibułę w ramach powszechnego programu badań przesiewowych noworodków w Polsce w kierunku wrodzonej niedoczynności tarczycy pobiera się rutynowo:",
      options: [
        "W 3. dobie życia (po ukończeniu 48 godzin życia)",
        "W 1. dobie życia, przed pierwszym karmieniem piersią",
        "Z krwi pępowinowej bezpośrednio po zaciśnięciu pępowiny",
        "W 7. dobie życia podczas pierwszej wizyty położnej POZ",
        "W 14. dobie życia podczas wizyty patronażowej lekarza POZ"
      ],
      correct: 0,
      expl: "Krew włośniczkową na bibułę filtracyjną pobiera się optymalnie w 3. dobie życia (między 48. a 72. godziną życia noworodka). Pobranie przed 48 h życia skutkuje wynikami fałszywie dodatnimi z powodu fizjologicznego, poporodowego wyrzutu TSH stymulowanego stresem porodowym i ekspozycją na chłód."
    },
    {
      question: "Który z poniższych objawów klinicznych NIE jest typowy dla nieleczonej wrodzonej niedoczynności tarczycy u niemowlęcia?",
      options: [
        "Tachykardia i nadpobudliwość psychoruchowa",
        "Makroglosja (powiększony język utrudniający karmienie)",
        "Przedłużająca się żółtaczka noworodkowa",
        "Duże ciemiączko przednie i otwarte ciemiączko tylne (>0,5 cm)",
        "Hipotonia mięśniowa i sucha, marmurkowata skóra"
      ],
      correct: 0,
      expl: "Niedoczynność tarczycy charakteryzuje się zwolnieniem metabolizmu, co objawia się bradykardią, apatią, sennością i hipotermią. Tachykardia i nadpobudliwość to klasyczne objawy nadczynności tarczycy (tyreotoksykozy)."
    },
    {
      question: "Najczęstszą przyczyną pierwotnej wrodzonej niedoczynności tarczycy jest:",
      options: [
        "Dysgenezja tarczycy (ektopia, agenezja, hipoplazja)",
        "Wrodzony defekt symportera sodowo-jodowego (NIS)",
        "Dyshormonogeneza spowodowana mutacją genu TPO",
        "Choroba Hashimoto przekazana od matki",
        "Endemiczny niedobór jodu w diecie matki"
      ],
      correct: 0,
      expl: "Dysgenezja tarczycy (zaburzenia rozwoju embriologicznego gruczołu) odpowiada za ok. 80-85% przypadków trwałej pierwotnej WNT. Najczęstszą jej postacią jest ektopia tkanki tarczycowej (ok. 60%), a następnie całkowita agenezja (ok. 30%) i hipoplazja (10%). Wrodzone defekty syntezy (dyshormonogeneza) to ok. 15%."
    },
    {
      question: "Zalecana dawka początkowa lewotyroksyny (L-T4) w leczeniu wrodzonej niedoczynności tarczycy u noworodka wynosi:",
      options: [
        "10 - 15 µg/kg m.c./dobę doustnie",
        "1 - 2 µg/kg m.c./dobę doustnie",
        "20 - 30 µg/kg m.c./dobę dożylnie",
        "50 µg/kg m.c./dobę w dawkach podzielonych",
        "0,5 µg/kg m.c./dobę powoli zwiększana co 2 tygodnie"
      ],
      correct: 0,
      expl: "Według wytycznych ESPE dawka początkowa lewotyroksyny wynosi 10-15 µg/kg m.c./dobę podawana doustnie raz na dobę. Taka wysoka dawka jest niezbędna, aby w ciągu kilku dni osiągnąć prawidłowe stężenie wolnej tyroksyny (fT4) w surowicy i zapobiec trwałym ubytkom neurologicznym."
    },
    {
      question: "Który z poniższych produktów spożywczych lub leków podany łącznie z lewotyroksyną dramatycznie upośledza jej wchłanianie z przewodu pokarmowego?",
      options: [
        "Preparaty żelaza, węglan wapnia oraz odżywki sojowe",
        "Witamina D3 w kroplach",
        "Glukoza 5% w wodzie",
        "Kwas foliowy",
        "Probiotyki zawierające Lactobacillus rhamnosus"
      ],
      correct: 0,
      expl: "Białka soi, związki żelaza (np. siarczan żelazawy), sole wapnia oraz leki zobojętniające tworzą z tyroksyną nierozpuszczalne chelaty w świetle przewodu pokarmowego, drastycznie ograniczając jej biodostępność. Należy zachować co najmniej 3-4 godziny odstępu między L-T4 a tymi preparatami."
    },
    {
      question: "Głównym celem terapeutycznym leczenia lewotyroksyną u niemowlęcia z WNT w pierwszych miesiącach życia jest utrzymanie stężenia fT4 w surowicy:",
      options: [
        "W górnej połowie zakresu normy dla wieku",
        "W dolnej granicy normy laboratoryjnej",
        "Dokładnie w medianie normy",
        "Poniżej dolnej granicy normy, aby nie przeciążyć serca",
        "Trzykrotnie powyżej górnej granicy normy"
      ],
      correct: 0,
      expl: "Zgodnie z międzynarodowymi standardami ESPE celem terapii w pierwszych latach życia jest utrzymanie fT4 w górnej połowie normy referencyjnej dla wieku, co zapewnia optymalną dowóz tyroksyny do dojrzewających struktur mózgowia, przy stężeniu TSH w zakresie referencyjnym (optymalnie <2,5 mIU/l)."
    },
    {
      question: "Wskaż fałszywe stwierdzenie dotyczące wrodzonej niedoczynności tarczycy:",
      options: [
        "Noworodek z ciężką postacią WNT zawsze prezentuje pełen zespół objawów klinicznych natychmiast po urodzeniu",
        "Większość noworodków z WNT rodzi się bez widocznych objawów klinicznych dzięki ochronnemu działaniu tyroksyny matczynej",
        "Nieleczona wada prowadzi do trwałej niepełnosprawności intelektualnej (kretynizmu)",
        "Przedłużająca się żółtaczka fizjologiczna u noworodka jest jednym z wczesnych objawów WNT",
        "Wskaźnik Smitha służy do klinicznej oceny prawdopodobieństwa niedoczynności tarczycy u noworodka"
      ],
      correct: 0,
      expl: "Stwierdzenie pierwsze jest fałszywe. Ponad 95% noworodków z WNT w chwili porodu nie wykazuje jednoznacznych objawów klinicznych lub są one bardzo dyskretne. Wynika to z przezłożyskowego transferu tyroksyny od matki, który częściowo kompensuje niedobór płodowy. Dlatego powszechny test przesiewowy jest kluczowy."
    },
    {
      question: "Które z poniższych badań laboratoryjnych najlepiej pozwala zróżnicować agenezję tarczycy od ekotopowej tkanki tarczycowej lub defektów biosyntezy hormonów?",
      options: [
        "Oznaczenie tyreoglobuliny (Tg) w surowicy oraz scyntygrafia tarczycy",
        "Oznaczenie przeciwciał anty-TPO i anty-TG",
        "Oznaczenie stężenia kalcytoniny w surowicy",
        "Oznaczenie tyreoliberyny (TRH) w płynie mózgowo-rdzeniowym",
        "Oznaczenie stężenia jodu wydalanego z moczem"
      ],
      correct: 0,
      expl: "Tyreoglobulina (Tg) jest białkiem wytwarzanym wyłącznie przez pęcherzyki tarczycy. Niewykrywalne stężenie Tg w surowicy przy jednoczesnym braku wychwytu radioznacznika w scyntygrafii (Tc-99m lub I-123) potwierdza całkowitą agenezję tarczycy. W ektopii lub dyshormonogenezie Tg jest obecna lub podwyższona."
    },
    {
      question: "Co charakteryzuje wtórną (ośrodkową) niedoczynność tarczycy u noworodka w badaniach hormonalnych?",
      options: [
        "Niskie stężenie fT4 przy niskim lub nieadekwatnie prawidłowym stężeniu TSH",
        "Bardzo wysokie stężenie TSH (>100 mIU/l) przy niskim fT4",
        "Prawidłowe fT4 przy skrajnie wysokim fT3",
        "Izolowane obniżenie tyreoglobuliny przy podwyższonym fT4",
        "Wysokie stężenie TSH i wysokie stężenie fT4"
      ],
      correct: 0,
      expl: "We wtórnej (przysadkowej) lub trzeciorzędowej (podwzgórzowej) niedoczynności tarczycy dochodzi do niedoboru wydzielania TSH. W surowicy stwierdza się niskie stężenie fT4, a TSH jest niskie, nieoznaczalne lub nieadekwatnie prawidłowe (brak fizjologicznego wzrostu TSH w odpowiedzi na hipotyreozę obwodową)."
    },
    {
      question: "U 4-tygodniowego niemowlęcia leczonego L-tyroksyną z powodu WNT utrzymuje się TSH 0,8 mIU/l oraz fT4 w górnej granicy normy. Dziecko dobrze przybiera na wadze, jest pogodne. Lekarz powinien:",
      options: [
        "Utrzymać dotychczasowe dawkowanie i skontrolować parametry za 1-2 miesiące, przeliczając dawkę na aktualną masę ciała",
        "Natychmiast odstawić L-tyroksynę z powodu ryzyka nadczynności tarczycy",
        "Zmniejszyć dawkę o 50% z obawy przed przedwczesnym zrośnięciem szwów czaszkowych",
        "Dodać lek tyreostatyczny (tiamazol) w celu obniżenia fT4",
        "Wykonać pilną biopsję szpiku kostnego"
      ],
      correct: 0,
      expl: "Wyniki te świadczą o idealnym wyrównaniu metabolicznym. U niemowląt z WNT dąży się do utrzymania fT4 w górnej połowie normy i TSH w granicach referencyjnych (<2,5 mIU/l). Przy prawidłowym rozwoju i braku cech przedawkowania należy utrzymać leczenie, kontrolując dawkę w miarę przyrostu masy ciała."
    },
    {
      question: "Zespołem genetycznym charakteryzującym się wrodzoną niedoczynnością tarczycy z wolem oraz obustronnym odbiorczym niedosłuchem zmysłowo-nerwowym jest:",
      options: [
        "Zespół Pendreda",
        "Zespół Turnera",
        "Zespół DiGeorge'a",
        "Zespół Klinefeltera",
        "Zespół Pradera-Williego"
      ],
      correct: 0,
      expl: "Zespół Pendreda to choroba uwarunkowana autosomalnie recesywnie spowodowana mutacją w genie SLC26A4 kodującym pendrynę (transporter anionowy w uchu wewnętrznym i tarczycy). Charakteryzuje się wrodzonym odbiorczym niedosłuchem oraz wrodzoną dyshormonogenezą tarczycy z rozwojem wola."
    }
  ],
  flashcards: [
    {
      front: "Kiedy i jak pobiera się w Polsce krew na badanie przesiewowe w kierunku wrodzonej niedoczynności tarczycy (WNT)?",
      back: "W 3. dobie życia (po ukończeniu 48 h życia, optymalnie 48-72 h) z nakłucia bocznej powierzchni pięty noworodka na specjalną bibułę filtracyjną (oznaczenie TSH metodą DELFIA)."
    },
    {
      front: "Dlaczego badania przesiewowego tarczycy na bibule NIE pobiera się w 1. dobie życia?",
      back: "W 1. dobie życia występuje fizjologiczny, gwałtowny wyrzut TSH (odpowiedź na stres porodowy i chłód), co dałoby wynik fałszywie dodatni. Po 48 h stężenie TSH opada do wartości ustabilizowanych."
    },
    {
      front: "Jaka jest najczęstsza przyczyna trwałej pierwotnej wrodzonej niedoczynności tarczycy?",
      back: "Dysgenezja tarczycy (80-85% przypadków), w tym: ektopia tarczycy (ok. 60%, np. tarczyca językowa), agenezja/aplazja (ok. 30%) oraz hipoplazja (10%). Wrodzone defekty syntezy (dyshormonogeneza) to ok. 15%."
    },
    {
      front: "Jaka jest zalecana dawka początkowa lewotyroksyny (L-T4) u noworodka z rozpoznaną WNT i w jakim czasie należy ją włączyć?",
      back: "10-15 µg/kg m.c./dobę doustnie w pojedynczej dawce porannej. Leczenie należy wdrożyć natychmiast po potwierdzeniu wyniku, optymalnie przed 14. dniem życia, by całkowicie zapobiec ubytkom IQ."
    },
    {
      front: "Wymień 5 klasycznych objawów wrodzonej niedoczynności tarczycy u kilkutygodniowego niemowlęcia.",
      back: "1. Przedłużająca się żółtaczka noworodkowa (>14 dni)\n2. Makroglosja (duży, wystający język)\n3. Uporczywe zaparcia i wzdęcie brzucha ('żabi brzuch', przepuklina pępkowa)\n4. Hipotonia mięśniowa, apatia i ochrypły płacz\n5. Duże, szerokie ciemiączka (otwarte ciemiączko tylne >0,5 cm), sucha i chłodna skóra."
    },
    {
      front: "Jakie są laboratoryjne cele terapeutyczne w leczeniu WNT w pierwszym półroczu życia dziecka?",
      back: "Utrzymanie stężenia wolnej tyroksyny (fT4) w górnej połowie zakresu normy dla wieku oraz normalizacja stężenia TSH w granicach referencyjnych (<2,5 mIU/l). Kontrole laboratoryjne co 2-4 tygodnie na początku, potem co 1-2 miesiące."
    }
  ]
};

// Mirror fields for schema compatibility
case121.steps.forEach(step => {
  step.question = step.title;
  step.explanation = step.feedback;
});
case121.lekQuestions.forEach(q => {
  q.opts = q.options;
  q.correctIdx = q.correct;
  q.exp = q.expl;
});

saveCase(case121);

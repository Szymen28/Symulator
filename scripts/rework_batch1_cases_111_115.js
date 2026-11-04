const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');

const MASTER_KEY = '@LEKSzymon28111999';
const CASES_DIR = path.join(__dirname, '..', 'cases');

console.log("Starting Rework of Batch 1 (Cases 111 - 115) to Gold-Standard Benchmark...");

// Helper to save case
async function saveCase(caseData) {
  const filePath = path.join(CASES_DIR, caseData.filename);
  const jsonStr = JSON.stringify(caseData, null, 2);
  const encrypted = await encryptStringAes(jsonStr, MASTER_KEY);
  fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), 'utf8');
  console.log(`[SAVED] Case #${caseData.id}: ${caseData.filename} (LEK Qs: ${caseData.lekQuestions.length}, Steps: ${caseData.steps.length}, Flashcards: ${caseData.flashcards.length})`);
}

// =========================================================================
// CASE 111: PŁONICA / SZKARLATYNA (Streptococcus pyogenes / GAS)
// =========================================================================
const case111 = {
  id: 111,
  filename: "111_plonica_szkarlatyna.json",
  dept: "Pediatria",
  shortTitle: "5-letnia Zosia – Malinowy język, szorstka wysypka i ból gardła (Płonica)",
  diagnosisTitle: "Płonica (Szkarlatyna / Scarlatina) wywołana przez Streptococcus pyogenes (GAS) z anginą paciorkowcową i toksyczną osutką drobnoplamistą",
  vitals: [
    { label: "Temperatura ciała", val: "39,4°C", sub: "Wysoka gorączka o ostrym początku", status: "vital-crit" },
    { label: "Akcja serca (HR)", val: "138/min", sub: "Tachykardia adekwatna do gorączki", status: "vital-warn" },
    { label: "Częstość oddechów (RR)", val: "26/min", sub: "Lekkie przyspieszenie oddechu", status: "vital-ok" },
    { label: "Ciśnienie tętnicze / SpO2", val: "102/64 mmHg | 99%", sub: "Stabilność hemodynamiczna", status: "vital-ok" }
  ],
  vitalsObj: { hr: 138, bp: "102/64", spo2: 99, rr: 26, temp: 39.4, gcs: 15 },
  story: `<p><strong>Pacjentka:</strong> 5-letnia Zosia (masa ciała 19 kg) została przyprowadzona przez mamę do izby przyjęć szpitala pediatrycznego z powodu wysokiej gorączki do 39,5°C, silnego bólu gardła utrudniającego połykanie, jednorazowych wymiotów oraz szybko rozprzestrzeniającej się, czerwonej wysypki na skórze, która pojawiła się w ciągu ostatnich kilkunastu godzin.</p><p><strong>Wywiad chorobowy:</strong> Choroba zaczęła się nagle wczoraj rano dreszczami, gorączką 39°C i bólem brzucha z nudnościami. Zosia nie zgłasza kaszlu, kataru ani zapalenia spojówek. Matka podawała Paracetamol i Ibuprofen z umiarkowanym efektem przeciwgorączkowym. Dziś rano na tułowiu i w zgięciach łokciowych wystąpiła bardzo gęsta, drobniutka wysypka, dająca wrażenie dotykania szorstkiego papieru ściernego lub 'gęsiej skórki'. W przedszkolu, do którego uczęszcza dziewczynka, odnotowano w minionym tygodniu trzy potwierdzone przypadki szkarlatyny u dzieci.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Dziewczynka rozpalona, marudna, niechętnie otwiera usta. W gardle: błona śluzowa gardła i łuków podniebiennych żywoczerwona, 'płomienna'. Migdałki podniebienne powiększone (III stopień), obrzęknięte, z obecnością białoszarych nalotów włóknikowych w kryptach. Język początkowo pokryty grubym, białym nalotem z zaczerwienionymi, obrzękniętymi brodawkami na brzegach (język 'obłożony', przechodzący w malinowy). Węzły chłonne szyjne przednie i podżuchwowe obustronnie powiększone do 2,5 cm, twarde, bolesne przy badaniu. Na skórze twarzy: intensywny rumień policzków z wyraźnym zblednięciem okolicy wokół ust i brody (trójkąt Fiłatowa). Na szyi, klatce piersiowej, brzuchu i w zgięciach stawowych drobnoplamista, grudkowa, czerwona wysypka zlewająca się w fałdach skórnych z linijnymi wybroczynami (linie Pastii). Objaw dermografizmu biały. Narządy klatki piersiowej i brzucha bez odchyleń od stanu prawidłowego.</p>`,
  labs: {
    "Parametry zapalne i morfologia": [
      { name: "Leukocyty (WBC)", val: "16,8 G/L", norm: "5,0 - 14,5 G/L", flag: "HIGH" },
      { name: "Neutrofile", val: "78%", norm: "35 - 55%", flag: "HIGH" },
      { name: "Limfocyty", val: "14%", norm: "40 - 60%", flag: "LOW" },
      { name: "Hemoglobina (Hb)", val: "12,6 g/dl", norm: "11,5 - 14,5 g/dl", flag: "NORMAL" },
      { name: "Płytki krwi (PLT)", val: "298 G/L", norm: "150 - 450 G/L", flag: "NORMAL" },
      { name: "CRP", val: "48 mg/l", norm: "< 5,0 mg/l", flag: "HIGH" },
      { name: "OB (odczyn Biernackiego)", val: "38 mm/h", norm: "3 - 12 mm/h", flag: "HIGH" }
    ],
    "Diagnostyka mikrobiologiczna": [
      { name: "Szybki test antygenowy PBHA (Streptest)", val: "DODATNI (+)", norm: "Ujemny (-)", flag: "CRIT_HIGH" },
      { name: "Posiew wymazu z gardła", val: "W toku (wzrost paciorkowców beta-hemolizujących grupy A)", norm: "Flora fizjologiczna", flag: "HIGH" },
      { name: "Mocz badanie ogólne", val: "Ciężar 1.022, białko ujemne, leukocyty 1-2 wpw, erytrocyty 0 wpw", norm: "Prawidłowy", flag: "NORMAL" }
    ]
  },
  steps: [
    {
      stepNum: 1,
      title: "Krok 1: Wstępna ocena triady objawowej i wywiadu epidemiologicznego",
      desc: "5-letnia Zosia zgłasza się z nagłą gorączką 39,4°C, bólem gardła z nalotami na migdałkach, brakiem kaszlu oraz drobnoplamistą, szorstką wysypką na ciele. W przedszkolu panuje szkarlatyna. Jaka jest Twoja natychmiastowa robocza hipoteza i jakie cechy wysypki są najbardziej charakterystyczne dla tej jednostki chorobowej?",
      scenario: "5-letnia Zosia zgłasza się z nagłą gorączką 39,4°C, bólem gardła z nalotami na migdałkach, brakiem kaszlu oraz drobnoplamistą, szorstką wysypką na ciele. W przedszkolu panuje szkarlatyna. Jaka jest Twoja natychmiastowa robocza hipoteza i jakie cechy wysypki są najbardziej charakterystyczne dla tej jednostki chorobowej?",
      options: [
        {
          text: "Płonica (szkarlatyna): drobnoplamista wysypka wielkości łebka od szpilki, szorstka jak papier ścierny, blednąca pod uciskiem, z trójkątem Fiłatowa na twarzy i liniami Pastii w fałdach skórnych",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Klasyczny obraz kliniczny płonicy (szkarlatyny)!</strong> Zakażenie paciorkowcem pyogennym (GAS) produkującym toksyny pirogenne (erytrogenne) charakteryzuje się nagłym początkiem z gorączką, zapaleniem gardła, obecnością szorstkiej osutki drobnoplamistej ('papier ścierny'), trójkąta Fiłatowa (bladość wokół ust przy zaczerwienionych policzkach) oraz objawu Pastii (linijne wybroczyny w fałdach łokciowych, pachwinowych i pośladkowych)."
        },
        {
          text: "Odra: plamisto-grudkowa zlewająca się wysypka zstępująca od linii włosów, z plamkami Koplika na śluzówce policzków i silnym nieżytem spojówek ze światłowstrętem",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>To opis odry!</strong> W odrze występuje gruboplamista, zlewająca się wysypka zstępująca, plamki Koplika oraz nasilony nieżyt nosa, zapalenie spojówek ze światłowstrętem i kaszel, których u Zosi brak."
        },
        {
          text: "Mononukleoza zakaźna: osutka pęcherzykowa pojawiająca się wyłącznie po kontakcie z kotem",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Błędna etiologia i ewolucja zmian!</strong> Mononukleoza (EBV) daje wysypkę plamisto-grudkową zazwyczaj po nieuzasadnionym podaniu amoksycyliny, a nie samoistną drobnoplamistą szorstką osutkę od 1. doby."
        },
        {
          text: "Choroba z Kawasaki: wysypka pęcherzowo-ropna z obustronnym wysiękowym zapaleniem spojówek i brakiem zmian w gardle",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>W chorobie Kawasakiego zapalenie spojówek jest bezwysiękowe!</strong> Zmiany na języku ('język truskawkowy') mogą przypominać płonicę, ale kryteria Kawasakiego wymagają gorączki trwającej co najmniej 5 dni oraz limfadenopatii zazwyczaj jednostronnej."
        }
      ]
    },
    {
      stepNum: 2,
      title: "Krok 2: Badanie przedmiotowe jamy ustnej i ewolucja zmian na języku",
      desc: "Zaglądasz do jamy ustnej Zosi. Błona śluzowa gardła jest żywoczerwona, migdałki obrzęknięte z ropnymi czopami, a język ma charakterystyczny wygląd. Wskaż, jak przebiega typowa ewolucja wyglądu języka w przebiegu płonicy:",
      scenario: "Zaglądasz do jamy ustnej Zosi. Błona śluzowa gardła jest żywoczerwona, migdałki obrzęknięte z ropnymi czopami, a język ma charakterystyczny wygląd. Wskaż, jak przebiega typowa ewolucja wyglądu języka w przebiegu płonicy:",
      options: [
        {
          text: "W pierwszych 2-3 dobach język jest pokryty grubym białym nalotem z powiększonymi brodawkami ('język obłożony'), a od 4-5 doby nalot ustępuje od brzegów ku środkowi, odsłaniając żywoczerwoną powierzchnię z wydatnymi brodawkami ('język malinowy' / 'truskawkowy')",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Złoty standard semiotyki pediatrycznej!</strong> W 1.-2. dobie płonicy język jest obłożony białym nalotem (z wyjątkiem zaczerwienionego czubka i brzegów). Od 3.-4. doby nalot złuszcza się, ukazując obrzęknięte, żywoczerwone brodawki grzybowate – powstaje klasyczny 'język malinowy' (lub truskawkowy), który utrzymuje się przez kilka dni."
        },
        {
          text: "Od początku choroby język jest całkowicie czarny z przerostem brodawek nitkowatych (tzw. język czarny włochaty)",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Czarny język włochaty</strong> to nienowotworowy stan związany z przerostem brodawek nitkowatych i kolonizacją grzybiczą/bakteryjną, np. po intensywnej antybiotykoterapii lub paleniu tytoniu, a nie objaw ostrej płonicy."
        },
        {
          text: "Na języku występują liczne bolesne pęcherzyki i afty przechodzące w owrzodzenia na łukach podniebiennych (herpangina)",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>To obraz herpanginy</strong> wywoływanej przez wirusy Coxsackie A, a nie zakażenia paciorkowcowego."
        },
        {
          text: "Język nie ulega żadnym zmianom w płonicy; zmiany dotyczą wyłącznie małżowin usznych i podniebienia miękkiego",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Język malinowy jest jednym z najbardziej swoistych i kardynalnych objawów płonicy!</strong>"
        }
      ]
    },
    {
      stepNum: 3,
      title: "Krok 3: Szybka diagnostyka przyłóżkowa w gabinecie SOR",
      desc: "Chcesz niezwłocznie potwierdzić etiologię paciorkowcową przed wdrożeniem leczenia celowanego. Jakie badanie diagnostyczne pierwszego rzutu należy wykonać u Zosi?",
      scenario: "Chcesz niezwłocznie potwierdzić etiologię paciorkowcową przed wdrożeniem leczenia celowanego. Jakie badanie diagnostyczne pierwszego rzutu należy wykonać u Zosi?",
      options: [
        {
          text: "Szybki test antygenowy w kierunku Streptococcus pyogenes (Streptest / RADT) pobrany prawidłowo wymazówką z obu migdałków i tylnej ściany gardła (bez dotykania języka i policzków)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Szybki test antygenowy (RADT / Streptest) to rekomendacja I rzutu!</strong> Cechuje się wysoką swoistością (>95-98%) i dobrą czułością (>85-90%). Wynik dodatni u dziecka z objawami klinicznymi w pełni potwierdza rozpoznanie i pozwala na natychmiastowe wdrożenie penicyliny bez konieczności oczekiwania na posiew. Ujemny wynik RADT u dzieci powinien być zweryfikowany posiewem wymazu z gardła."
        },
        {
          text: "Oznaczenie miana antystreptolizyny O (ASO) w surowicy krwi w celu potwierdzenia ostrej fazy infekcji",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Częsty błąd LEK!</strong> Miano ASO zaczyna narastać dopiero po 1-2 tygodniach od zakażenia i osiąga szczyt po 3-5 tygodniach. ASO ma znaczenie wyłącznie retrospektywne (np. w diagnostyce gorączki reumatycznej lub APSGN), a w ostrej fazie anginy/płonicy jest bezużyteczne!"
        },
        {
          text: "Tomografia komputerowa szyi z kontrastem w celu wykluczenia nacieku paciorkowcowego",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Nieuzasadnione narażenie na promieniowanie jonizujące!</strong> TK wykonuje się wyłącznie przy podejrzeniu powikłań ropnych głębokich przestrzeni szyi (np. ropień zagardłowy), a nie w typowej płonicy."
        },
        {
          text: "Pobranie krwi na posiew w kierunku bakteriemii paciorkowcowej przed podaniem pierwszej dawki leku",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Płonica to zakażenie miejscowe z toksemią!</strong> Bakterie namnażają się w gardle i wydzielają toksyny do krwioobiegu; nie jest to posocznica, więc posiew krwi jest zbędny."
        }
      ]
    },
    {
      stepNum: 4,
      title: "Krok 4: Wybór antybiotykoterapii I rzutu zgodnej z wytycznymi",
      desc: "Streptest dał wynik jednoznacznie dodatni. Zosia nie ma alergii na antybiotyki beta-laktamowe. Jaki antybiotyk, w jakiej dawce i przez jaki czas stanowi złoty standard leczenia I rzutu płonicy wg zaleceń NPOA i europejskich?",
      scenario: "Streptest dał wynik jednoznacznie dodatni. Zosia nie ma alergii na antybiotyki beta-laktamowe. Jaki antybiotyk, w jakiej dawce i przez jaki czas stanowi złoty standard leczenia I rzutu płonicy wg zaleceń NPOA i europejskich?",
      options: [
        {
          text: "Fenoksymetylopenicylina (Penicylina V) doustnie w dawce 100 000–200 000 j.m./kg m.c./dobę w 2 dawkach podzielonych przez pełne 10 dni",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Złoty standard leczenia anginy i płonicy paciorkowcowej!</strong> Lekiem z wyboru jest fenoksymetylopenicylina (Ospen) podawana doustnie przez bezwzględnie 10 dni. Streptococcus pyogenes pozostaje w 100% wrażliwy na penicylinę (nie stwierdzono na świecie szczepu opornego!). 10-dniowy czas trwania terapii jest kluczowy dla pełnej eradykacji paciorkowca z gardła i zapobiegania ostrej gorączce reumatycznej."
        },
        {
          text: "Amoksycylina z kwasem klawulanowym przez 5 dni doustnie",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Kwas klawulanowy jest całkowicie zbędny!</strong> GAS nie wytwarza beta-laktamaz. Podawanie inhibitora niepotrzebnie rozszerza spektrum, niszczy mikrobiotę jelitową i generuje oporność. Ponadto 5 dni to zbyt krótki czas eradykacji."
        },
        {
          text: "Azytromycyna doustnie raz na dobę przez 3 dni (kuracja 3-dniowa)",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Makrolidy NIE są lekami I rzutu!</strong> Są zarezerwowane wyłącznie dla pacjentów z natychmiastową nadwrażliwością na penicyliny (typ I). W Polsce odsetek szczepów GAS opornych na makrolidy (MLSB) sięga 15-20%."
        },
        {
          text: "Ciprofloksacyna doustnie przez 7 dni w skojarzeniu z Metronidazolem",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Fluorochinolony są przeciwwskazane u dzieci</strong> w rutynowych infekcjach dróg oddechowych i wykazują słabą aktywność wobec paciorkowców."
        }
      ]
    },
    {
      stepNum: 5,
      title: "Krok 5: Postępowanie w przypadku nadwrażliwości na antybiotyki",
      desc: "Mama Zosi pyta Cię: 'Pani doktor, a gdyby Zosia miała alergię na penicylinę, to co byśmy podali?'. Jak prawidłowo dobiera się leczenie alternatywne w zależności od rodzaju reakcji alergicznej?",
      scenario: "Mama Zosi pyta Cię: 'Pani doktor, a gdyby Zosia miała alergię na penicylinę, to co byśmy podali?'. Jak prawidłowo dobiera się leczenie alternatywne w zależności od rodzaju reakcji alergicznej?",
      options: [
        {
          text: "Przy reakcji nienatychmiastowej (łagodna osutka): cefalosporyny I generacji (np. Cefadroksyl przez 10 dni); przy reakcji natychmiastowej (anafilaksja, obrzęk naczynioruchowy, pokrzywka natychmiastowa): makrolidy (np. Klarytromycyna przez 10 dni lub Azytromycyna przez 5 dni)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Kluczowe zagadnienie wytycznych NPOA i pytań LEK!</strong> W nadwrażliwości nielitycznej (typ późny, łagodny rumień) bezpieczne są cefalosporyny I generacji (Cefadroksyl 30 mg/kg/d przez 10 dni). W nadwrażliwości natychmiastowej (reakcja IgE-zależna: anafilaksja, skurcz oskrzeli) beta-laktamy są bezwzględnie przeciwwskazane – wówczas lekiem z wyboru są makrolidy (Klarytromycyna, Azytromycyna) lubリンク linkosamidy (Klindamycyna)."
        },
        {
          text: "Zawsze podaje się doksycyklinę, niezależnie od wieku dziecka",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Tetracykliny są przeciwwskazane u dzieci <8. roku życia</strong> ze względu na odkładanie się w szkliwie zębów i kościach (przebarwienia zębów, hipoplazja szkliwa)."
        },
        {
          text: "W każdej alergii na penicylinę jedyną bezpieczną opcją jest Wankomycyna dożylnie w hospitalizacji",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Wankomycyna to lek rezerwowy</strong> w ciężkich infekcjach szpitalnych MRSA/Enterococcus, a nie w niepowikłanej płonicy w POZ/SOR."
        },
        {
          text: "Nie stosuje się żadnego antybiotyku, ponieważ płonica jest chorobą samoograniczającą się o podłożu wirusowym",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Płonica jest bezwzględnie zakażeniem bakteryjnym wywołanym przez GAS!</strong> Brak antybiotykoterapii stwarza bezpośrednie ryzyko powikłań ropnych i gorączki reumatycznej."
        }
      ]
    },
    {
      stepNum: 6,
      title: "Krok 6: Zakaźność i czas trwania izolacji dziecka",
      desc: "Mama pyta, kiedy Zosia przestanie zakażać młodsze rodzeństwo i kiedy będzie mogła bezpiecznie wrócić do kontaktu z rówieśnikami. Co odpowiesz zgodnie z wiedzą epidemiologiczną?",
      scenario: "Mama pyta, kiedy Zosia przestanie zakażać młodsze rodzeństwo i kiedy będzie mogła bezpiecznie wrócić do kontaktu z rówieśnikami. Co odpowiesz zgodnie z wiedzą epidemiologiczną?",
      options: [
        {
          text: "Dziecko przestaje być zakaźne dla otoczenia po 24 godzinach od przyjęcia pierwszej skutecznej dawki prawidłowo dobranego antybiotyku (penicyliny)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Kanon epidemiologiczny zakażeń paciorkowcowych!</strong> Prawidłowa antybiotykoterapia powoduje gwałtowny spadek miana bakterii w ślinie i wydzielinie gardła – pacjent przestaje być źródłem zakażenia po 24 godzinach od rozpoczęcia leczenia. W przypadku braku antybiotykoterapii pacjent zakaża przez 2-3 tygodnie!"
        },
        {
          text: "Dziecko zakaża nieprzerwanie przez 6 miesięcy po ustąpieniu gorączki",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Nieuzasadniona izolacja!</strong> Okres zakaźności przy leczeniu wynosi tylko 24 godziny."
        },
        {
          text: "Dziecko zakaża tylko w momencie wystąpienia łuszczenia naskórka na stopach po 3 tygodniach",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Złuszczający się naskórek nie zawiera żywych bakterii paciorkowca!</strong> Złuszczanie jest wynikiem działania toksyny erytrogennej na keratynocyty i nie stanowi źródła zakażenia."
        },
        {
          text: "Płonica nie przenosi się między ludźmi; zakażenie następuje wyłącznie przez spożycie skażonej wody z kranu",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Płonica przenosi się drogą kropelkową</strong> oraz przez bezpośredni kontakt z wydzielinami dróg oddechowych chorego."
        }
      ]
    },
    {
      stepNum: 7,
      title: "Krok 7: Edukacja rodziców co do późnego łuszczenia skóry",
      desc: "Uprzedzasz mamę o charakterystycznym objawie, który pojawi się u Zosi w okresie rekonwalescencji (po 1-3 tygodniach od zachorowania), aby uniknąć niepotrzebnego niepokoju. O jaki objaw chodzi?",
      scenario: "Uprzedzasz mamę o charakterystycznym objawie, który pojawi się u Zosi w okresie rekonwalescencji (po 1-3 tygodniach od zachorowania), aby uniknąć niepotrzebnego niepokoju. O jaki objaw chodzi?",
      options: [
        {
          text: "Charakterystyczne łuszczenie naskórka: drobne, otrębiaste na twarzy (po kilku dniach), a po 2-3 tygodniach grubopłatkowe na dłoniach i podeszwach stóp",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Późny patognomoniczny objaw płonicy!</strong> Po ustąpieniu osutki dochodzi do łuszczenia naskórka: najpierw drobnego na twarzy (ok. 7. dnia), a między 2. a 3. tygodniem dochodzi do bardzo charakterystycznego, grubopłatkowego łuszczenia skóry na dłoniach i stopach (często z płatowym schodzeniem naskórka z palców). Jest to objaw potwierdzający przebycie płonicy nawet u pacjentów, u których przeoczono wczesną wysypkę."
        },
        {
          text: "Wypadanie wszystkich zębów mlecznych na skutek działania enterotoksyny paciorkowcowej",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Płonica nie uszkadza zawiązków zębowych ani korzeni zębów!</strong>"
        },
        {
          text: "Powstanie trwałych blizn zanikowych i przebarwień na całej powierzchni tułowia (blizny ospowe)",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Wysypka płonicza ustępuje bez pozostawienia blizn!</strong> Blizny ospowe są powikłaniem ospy wietrznej przy nadkażeniu bakteryjnym pęcherzyków."
        },
        {
          text: "Zarastanie przewodów słuchowych zewnętrznych",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Brak takiego powikłania w literaturze medycznej.</strong>"
        }
      ]
    },
    {
      stepNum: 8,
      title: "Krok 8: Powikłania wczesne (ropne) i późne (immunologiczne)",
      desc: "Jakie powikłania nieropne (immunologiczne) mogą wystąpić po przebyciu zakażenia Streptococcus pyogenes i jak antybiotykoterapia wpływa na ryzyko ich wystąpienia?",
      scenario: "Jakie powikłania nieropne (immunologiczne) mogą wystąpić po przebyciu zakażenia Streptococcus pyogenes i jak antybiotykoterapia wpływa na ryzyko ich wystąpienia?",
      options: [
        {
          text: "Ostra gorączka reumatyczna (antybiotykoterapia skutecznie jej zapobiega) oraz ostre popaciorkowcowe kłębuszkowe zapalenie nerek – APSGN (penicylina NIE zapobiega wystąpieniu APSGN)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Klasyczny pewniak egzaminacyjny LEK!</strong> Pełna 10-dniowa kuracja penicyliną skutecznie eliminuje ryzyko ostrej gorączki reumatycznej (spadek ryzyka o >90%). Jednak antybiotykoterapia NIE zapobiega rozwojowi ostrego popaciorkowcowego kłębuszkowego zapalenia nerek (APSGN), które zależy od odkładania się krążących kompleksów immunologicznych u osób zakażonych nefrytogennymi szczepami GAS!"
        },
        {
          text: "Penicylina całkowicie zapobiega zarówno gorączce reumatycznej, jak i kłębuszkowemu zapaleniu nerek",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Kardynalny błąd!</strong> Penicylina NIE zapobiega wystąpieniu ostrego popaciorkowcowego kłębuszkowego zapalenia nerek (APSGN)."
        },
        {
          text: "Paciorkowce grupy A wywołują wyłącznie stwardnienie rozsiane i cukrzycę typu 1",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>To choroby autoimmunologiczne bez bezpośredniego związku z zakażeniem GAS.</strong>"
        },
        {
          text: "Jedynym powikłaniem płonicy jest kamica pęcherzyka żółciowego u nastolatków",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Powikłania płonicy dzielimy na ropne</strong> (zapalenie ucha środkowego, ropień okołomigdałkowy, zapalenie zatok) oraz nieropne (gorączka reumatyczna, APSGN, PANDAS)."
        }
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "OGNIWO 1 • Kolonizacja gardła i adhezja Streptococcus pyogenes",
      title: "Adhezja do nabłonka gardła za pośrednictwem białka M i kwasu lipotejchojowego",
      short: "Bakteria GAS wiąże się ze strukturami nabłonka gardła, pokonując miejscową barierę śluzówkową.",
      detail: "Streptococcus pyogenes (paciorkowiec beta-hemolizujący grupy A – GAS) jest ziarenkowcem Gram-dodatnim kolonizującym błonę śluzową nosogardła. Kluczowym czynnikiem wirulencji jest białko M zakotwiczone w ścianie komórkowej, kwas lipotejchojowy oraz fibryle powierzchniowe, które wiążą się z fibronektyną i integrynami komórek nabłonkowych gardła. Białko M hamuje opsonizację przez dopełniacz (wiąże czynnik H) i chroni bakterię przed fagocytozą przez neutrofile. Miejscowa inwazja prowadzi do ostrego odczynu zapalnego z obrzękiem, przekrwieniem błony śluzowej, wysiękiem włóknikowym w kryptach migdałków oraz powiększeniem regionalnych węzłów chłonnych.",
      target: "Leczenie celowane: <span class='dose-pill'>Fenoksymetylopenicylina 100 000–200 000 j.m./kg/dobę p.o.</span> w 2 dawkach podzielonych przez <span class='dose-pill'>10 dni</span> (hamowanie biosyntezy ściany komórkowej PBPs).",
      desc: "Adhezja do nabłonka gardła za pośrednictwem białka M i kwasu lipotejchojowego.",
      drugTarget: "Leczenie celowane: <span class='dose-pill'>Fenoksymetylopenicylina 100 000–200 000 j.m./kg/dobę p.o.</span> w 2 dawkach podzielonych przez <span class='dose-pill'>10 dni</span> (hamowanie biosyntezy ściany komórkowej PBPs)."
    },
    {
      badge: "OGNIWO 2 • Wydzielanie pirogennych egzotoksyn paciorkowcowych (Spe)",
      title: "Działanie superantygenów SpeA, SpeB i SpeC oraz toksemia ogólnoustrojowa",
      short: "Lizogenne szczepy GAS wytwarzają pirogenne egzotoksyny działające jako superantygeny.",
      detail: "Szczepy S. pyogenes wywołujące płonicę są zainfekowane bakteriofagiem niosącym geny dla pirogennych egzotoksyn paciorkowcowych (Spe – Streptococcal pyrogenic exotoxins: SpeA, SpeC oraz chromosomalna SpeB, dawniej zwane toksynami erytrogennymi lub Dicków). Toksyny te działają jako superantygeny: omijają klasyczną obróbkę antygenową i łączą się bezpośrednio z domeną V-beta receptora TCR limfocytu T oraz niepolimorficznym fragmentem MHC klasy II komórki APC. Wywołuje to masywną, nieswoistą aktywację do 20% klonów limfocytów T i gwałtowny wyrzut cytokin prozapalnych (IL-1, TNF-alfa, IL-6, IFN-gamma), odpowiadających za gorączkę, nudności, wymioty i złe samopoczucie.",
      target: "Terapia objawowa przeciwzapalna: <span class='dose-pill'>Paracetamol 15 mg/kg m.c. p.o./p.r.</span> co 4-6 h lub <span class='dose-pill'>Ibuprofen 10 mg/kg m.c. p.o.</span> co 8 h; nawodnienie doustne.",
      desc: "Działanie superantygenów SpeA, SpeB i SpeC oraz toksemia ogólnoustrojowa.",
      drugTarget: "Terapia objawowa przeciwzapalna: <span class='dose-pill'>Paracetamol 15 mg/kg m.c. p.o./p.r.</span> co 4-6 h lub <span class='dose-pill'>Ibuprofen 10 mg/kg m.c. p.o.</span> co 8 h; nawodnienie doustne."
    },
    {
      badge: "OGNIWO 3 • Uszkodzenie śródbłonka naczyniowego i toksyczna osutka",
      title: "Rozszerzenie naczyń skóry, wynaczynienia w fałdach (Pastia) i trójkąt Fiłatowa",
      short: "Egzotoksyny wywołują rozszerzenie naczyń włosowatych skóry i drobnoplamisty rumień.",
      detail: "Spe rozprzestrzeniają się z prądem krwi i wywierają bezpośredni toksyczny wpływ na komórki śródbłonka drobnych naczyń krwionośnych skóry właściwej. Dochodzi do ich uogólnionego rozszerzenia, obrzęku okołonaczyniowego oraz nacieku leukocytarnego wokół mieszków włosowych, co makroskopowo manifestuje się drobnoplamistą wysypką o strukturze 'papieru ściernego'. W okolicach o wzmożonej potliwości i zgięciach stawowych (łokcie, pachwiny) kruche naczynia pękają pod wpływem mikrourazów mechanicznych, tworząc linijne wybroczyny nieblednące pod uciskiem (linie Pastii). Na twarzy intensywne przekrwienie policzków kontrastuje z brakiem zmian w okolicy okołoustnej (trójkąt Fiłatowa).",
      target: "Pielęgnacja skóry i kontrola naczyniowa: unikanie przegrzewania, luźna odzież bawełniana, chłodne okłady, monitorowanie ewolucji wykwitów.",
      desc: "Rozszerzenie naczyń skóry, wynaczynienia w fałdach (Pastia) i trójkąt Fiłatowa.",
      drugTarget: "Pielęgnacja skóry i kontrola naczyniowa: unikanie przegrzewania, luźna odzież bawełniana, chłodne okłady, monitorowanie ewolucji wykwitów."
    },
    {
      badge: "OGNIWO 4 • Złuszczanie naskórka i późna rekonwalescencja",
      title: "Przyspieszona apoptoza keratynocytów i grubopłatkowe złuszczanie dłoni i stóp",
      short: "Działanie toksyn na naskórek prowadzi do martwicy keratynocytów i płatowego schodzenia skóry.",
      detail: "Wpływ toksyn pirogennych na keratynocyty warstwy kolczystej i ziarnistej naskórka prowadzi do zaburzenia keratynizacji i przyspieszonej apoptozy komórek. W miarę wygasania ostrego stanu zapalnego uszkodzona warstwa rogowa naskórka ulega oddzieleniu od podłoża. Na tułowiu i twarzy, gdzie naskórek jest cienki, łuszczenie ma charakter drobnopłatkowy lub otrębiasty (po 7-10 dniach). W obrębie dłoni i podeszw stóp, gdzie warstwa rogowa jest gruba i zwarta, naskórek oddziela się w postaci dużych, grubych płatów (złuszczanie grubopłatkowe w 2.-3. tygodniu choroby). Złuszczające się komórki są jałowe i nie przenoszą zakażenia.",
      target: "Pielęgnacja w rekonwalescencji: preparaty nawilżające i emolienty (<span class='dose-pill'>maści z 5% pantenolem</span> lub <span class='dose-pill'>emulsje lipidowe</span>); zakaz zrywania płatów naskórka.",
      desc: "Przyspieszona apoptoza keratynocytów i grubopłatkowe złuszczanie dłoni i stóp.",
      drugTarget: "Pielęgnacja w rekonwalescencji: preparaty nawilżające i emolienty (<span class='dose-pill'>maści z 5% pantenolem</span> lub <span class='dose-pill'>emulsje lipidowe</span>); zakaz zrywania płatów naskórka."
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Płonica vs Odra vs Różyczka vs Choroba Kawasakiego",
    headers: ["Cecha kliniczna", "Płonica (Szkarlatyna)", "Odra (Morbilli)", "Różyczka (Rubella)", "Choroba Kawasakiego"],
    rows: [
      ["Etiologia", "Streptococcus pyogenes (GAS)", "Wirus odry (Paramyxoviridae)", "Wirus różyczki (Matonaviridae)", "Idiopatyczne zapalenie naczyń"],
      ["Charakter wysypki", "Drobnoplamista, szorstka ('papier ścierny'), gęsta", "Gruboplamista, grudkowa, zlewająca się", "Drobnoplamisto-grudkowa, różowa, niezlewająca się", "Wielopostaciowa (polimorficzna), bez pęcherzyków"],
      ["Rozmieszczenie i ewolucja", "Tułów, zgięcia stawowe; Pastia, trójkąt Fiłatowa", "Zstępująca: od linii włosów i za uszami na tułów i kończyny", "Twarz -> tułów -> kończyny; ustępuje szybko bez śladu", "Tułów, kończyny, nasilony rumień w okolicy krocza"],
      ["Objawy w jamie ustnej", "Płomienne gardło, naloty na migdałkach, język malinowy", "Plamki Koplika (bieliste na śluzówce policzków)", "Plamki Forchheimera na podniebieniu miękkim", "Spierzchnięte, krwawiące wargi, język truskawkowy"],
      ["Oczy i drogi oddechowe", "Brak kaszlu i kataru; ból gardła", "Nasilony katar, szczekający kaszel, światłowstręt", "Łagodny nieżyt górnych dróg oddechowych", "Obustronne bezwysiękowe zapalenie spojówek"],
      ["Węzły chłonne", "Powiększone, bolesne szyjne przednie i podżuchwowe", "Uogólnione powiększenie węzłów chłonnych", "Bolesne powiększenie węzłów potylicznych i karkowych", "Jednostronne powiększenie węzła szyjnego (>1,5 cm)"],
      ["Złuszczanie skóry", "Drobnopłatkowe na twarzy, grubopłatkowe dłoni i stóp (2-3 tydz.)", "Otrębiaste z brunatnymi przebarwieniami naskórka", "Znikome lub nie występuje", "Grubopłatkowe wokół paznokci i na opuszkach palców"],
      ["Leczenie przyczynowe", "Penicylina V doustnie przez 10 dni", "Objawowe + Witamina A w wysokich dawkach", "Wyłącznie leczenie objawowe", "IVIG (2 g/kg) + Kwas acetylosalicylowy (ASA)"]
    ]
  },
  dutySummary: {
    overview: "Płonica (szkarlatyna) jest ostrą chorobą zakaźną wieku dziecięcego wywołaną przez szczepy Streptococcus pyogenes (GAS) wytwarzające pirogenne egzotoksyny (superantygeny SpeA, SpeB, SpeC). Charakteryzuje się nagłym początkiem z wysoką gorączką, anginą paciorkowcową, szorstką osutką drobnoplamistą, trójkątem Fiłatowa, liniami Pastii, ewolucją języka w malinowy oraz późnym grubopłatkowym łuszczeniem naskórka.",
    diagnostics: "1. Szybki test antygenowy PBHA (Streptest / RADT) z wymazu z migdałków i tylnej ściany gardła (złoty standard szybkiej diagnostyki przyłóżkowej).<br>2. Posiew wymazu z gardła w celu weryfikacji w przypadku ujemnego wyniku RADT u dziecka z typowym obrazem klinicznym.<br>3. Morfologia krwi obwodowej: leukocytoza z neutrofilią oraz podwyższenie wskaźników ostrej fazy (CRP, OB).<br>4. Badanie ogólne moczu (wykluczenie powikłań nerkowych; kontrolnie po 2-3 tygodniach od zachorowania w kierunku APSGN).",
    drugsAndDoses: "1. Leczenie I rzutu: <span class='dose-pill'>Fenoksymetylopenicylina 100 000–200 000 j.m./kg m.c./dobę p.o.</span> w 2 dawkach podzielonych co 12 h przez pełne <span class='dose-pill'>10 dni</span>.<br>2. W nadwrażliwości nielitycznej na penicyliny (reakcja łagodna/późna): <span class='dose-pill'>Cefadroksyl 30 mg/kg m.c./dobę p.o.</span> w 1-2 dawkach przez <span class='dose-pill'>10 dni</span>.<br>3. W nadwrażliwości natychmiastowej (reakcja IgE-zależna, anafilaksja): <span class='dose-pill'>Klarytromycyna 15 mg/kg m.c./dobę p.o.</span> w 2 dawkach przez <span class='dose-pill'>10 dni</span> lub <span class='dose-pill'>Azytromycyna 12 mg/kg m.c./dobę p.o.</span> przez <span class='dose-pill'>5 dni</span>.<br>4. Leczenie przeciwgorączkowe i przeciwbólowe: <span class='dose-pill'>Paracetamol 15 mg/kg m.c. p.o.</span> co 4-6 h (max. 60 mg/kg/d) lub <span class='dose-pill'>Ibuprofen 10 mg/kg m.c. p.o.</span> co 8 h (max. 30 mg/kg/d).",
    procedures: "1. Prawidłowe pobranie wymazu z gardła (dokładne potarcie obu migdałków i tylnej ściany gardła bez kontaktu ze śliną, językiem i zębami).<br>2. Izolacja chorego dziecka przez pierwsze 24 godziny od przyjęcia pierwszej dawki penicyliny (po tym czasie dziecko przestaje zakażać).<br>3. Odpowiednia podaż płynów doustnych (letnie, niepodrażniające płyny) zapobiegająca odwodnieniu w gorączce.<br>4. Pielęgnacja skóry w fazie złuszczania naskórka (stosowanie neutralnych emolientów).",
    monitoring: "1. Ocena ustępowania gorączki i bólu gardła w ciągu 24-48 godzin od wdrożenia penicyliny.<br>2. Nadzór nad ukończeniem pełnego 10-dniowego cyklu antybiotykoterapii (kluczowe dla zapobiegania gorączce reumatycznej).<br>3. Obserwacja w kierunku wczesnych powikłań ropnych: ropień okołomigdałkowy (szczękościsk, asymetria łuków podniebiennych), ostre zapalenie ucha środkowego.<br>4. Kontrolne badanie lekarskie i badanie ogólne moczu po 2-3 tygodniach od przebycia płonicy w celu wczesnego wykrycia ostrego popaciorkowcowego kłębuszkowego zapalenia nerek (APSGN)."
  },
  lekQuestions: [
    {
      id: 1,
      q: "Który z poniższych objawów klinicznych NIE jest typowy dla obrazu klinicznego płonicy (szkarlatyny)?",
      opts: [
        "A. Drobnoplamista, szorstka wysypka przypominająca papier ścierny",
        "B. Trójkąt Fiłatowa (bladość skóry wokół ust przy zaczerwienionych policzkach)",
        "C. Linie Pastii w zgięciach łokciowych i pachwinowych",
        "D. Obfity nieżyt nosa ze szczekającym kaszlem i światłowstrętem",
        "E. Język malinowy z wydatnymi brodawkami grzybowatymi po ustąpieniu nalotu"
      ],
      options: [
        "A. Drobnoplamista, szorstka wysypka przypominająca papier ścierny",
        "B. Trójkąt Fiłatowa (bladość skóry wokół ust przy zaczerwienionych policzkach)",
        "C. Linie Pastii w zgięciach łokciowych i pachwinowych",
        "D. Obfity nieżyt nosa ze szczekającym kaszlem i światłowstrętem",
        "E. Język malinowy z wydatnymi brodawkami grzybowatymi po ustąpieniu nalotu"
      ],
      correctIdx: 3,
      correct: 3,
      exp: "Prawidłowa odpowiedź: D. Płonica charakteryzuje się brakiem objawów nieżytowych górnych dróg oddechowych (brak kaszlu, kataru i zapalenia spojówek). Obecność nasilonego kataru, kaszlu i światłowstrętu jest typowa dla odry (morbilli) lub infekcji adenowirusowych.",
      expl: "Prawidłowa odpowiedź: D. Płonica charakteryzuje się brakiem objawów nieżytowych górnych dróg oddechowych (brak kaszlu, kataru i zapalenia spojówek). Obecność nasilonego kataru, kaszlu i światłowstrętu jest typowa dla odry (morbilli) lub infekcji adenowirusowych."
    },
    {
      id: 2,
      q: "Lekiem z wyboru pierwszego rzutu w leczeniu płonicy u 5-letniego dziecka bez wywiadu alergicznego jest:",
      opts: [
        "A. Amoksycylina z kwasem klawulanowym przez 7 dni",
        "B. Fenoksymetylopenicylina przez 10 dni",
        "C. Azytromycyna przez 3 dni",
        "D. Cefuroksym aksetyl przez 5 dni",
        "E. Doksycyklina przez 10 dni"
      ],
      options: [
        "A. Amoksycylina z kwasem klawulanowym przez 7 dni",
        "B. Fenoksymetylopenicylina przez 10 dni",
        "C. Azytromycyna przez 3 dni",
        "D. Cefuroksym aksetyl przez 5 dni",
        "E. Doksycyklina przez 10 dni"
      ],
      correctIdx: 1,
      correct: 1,
      exp: "Prawidłowa odpowiedź: B. Złotym standardem leczenia anginy paciorkowcowej i płonicy jest fenoksymetylopenicylina podawana doustnie przez pełne 10 dni. S. pyogenes wykazuje 100% wrażliwość na penicylinę.",
      expl: "Prawidłowa odpowiedź: B. Złotym standardem leczenia anginy paciorkowcowej i płonicy jest fenoksymetylopenicylina podawana doustnie przez pełne 10 dni. S. pyogenes wykazuje 100% wrażliwość na penicylinę."
    },
    {
      id: 3,
      q: "Dziecko chore na płonicę, u którego zastosowano właściwą antybiotykoterapię penicyliną, przestaje być zakaźne dla otoczenia po:",
      opts: [
        "A. 12 godzinach",
        "B. 24 godzinach",
        "C. 72 godzinach",
        "D. 7 dniach",
        "E. Dopiero po ustąpieniu łuszczenia skóry z dłoni i stóp"
      ],
      options: [
        "A. 12 godzinach",
        "B. 24 godzinach",
        "C. 72 godzinach",
        "D. 7 dniach",
        "E. Dopiero po ustąpieniu łuszczenia skóry z dłoni i stóp"
      ],
      correctIdx: 1,
      correct: 1,
      exp: "Prawidłowa odpowiedź: B. Prawidłowo prowadzona antybiotykoterapia powoduje eradykację drobnoustroju z dróg oddechowych w stopniu uniemożliwiającym transmisję po 24 godzinach od podania pierwszej dawki.",
      expl: "Prawidłowa odpowiedź: B. Prawidłowo prowadzona antybiotykoterapia powoduje eradykację drobnoustroju z dróg oddechowych w stopniu uniemożliwiającym transmisję po 24 godzinach od podania pierwszej dawki."
    },
    {
      id: 4,
      q: "Które ze stwierdzeń dotyczących powikłań zakażenia Streptococcus pyogenes jest PRAWDZIWE?",
      opts: [
        "A. Wczesne podanie penicyliny w płonicy zapobiega zarówno gorączce reumatycznej, jak i ostremu popaciorkowcowemu kłębuszkowemu zapaleniu nerek (APSGN)",
        "B. Antybiotykoterapia skutecznie zapobiega ostrej gorączce reumatycznej, ale nie zmniejsza ryzyka wystąpienia APSGN",
        "C. APSGN występuje wyłącznie po zakażeniach gardła, nigdy po zakażeniach skóry",
        "D. Ostra gorączka reumatyczna jest bezpośrednim zakażeniem bakteryjnym wsierdzia wywołanym przez żywe bakterie GAS",
        "E. Ryzyko gorączki reumatycznej po zakażeniu paciorkowcowym skóry (liszajec) jest wyższe niż po anginie"
      ],
      options: [
        "A. Wczesne podanie penicyliny w płonicy zapobiega zarówno gorączce reumatycznej, jak i ostremu popaciorkowcowemu kłębuszkowemu zapaleniu nerek (APSGN)",
        "B. Antybiotykoterapia skutecznie zapobiega ostrej gorączce reumatycznej, ale nie zmniejsza ryzyka wystąpienia APSGN",
        "C. APSGN występuje wyłącznie po zakażeniach gardła, nigdy po zakażeniach skóry",
        "D. Ostra gorączka reumatyczna jest bezpośrednim zakażeniem bakteryjnym wsierdzia wywołanym przez żywe bakterie GAS",
        "E. Ryzyko gorączki reumatycznej po zakażeniu paciorkowcowym skóry (liszajec) jest wyższe niż po anginie"
      ],
      correctIdx: 1,
      correct: 1,
      exp: "Prawidłowa odpowiedź: B. Kluczowy fakt medyczny często sprawdzany na LEK: leczenie penicyliną zapobiega gorączce reumatycznej, ale NIE zapobiega rozwojowi kłębuszkowego zapalenia nerek (APSGN). Ponadto gorączka reumatyczna rozwija się wyłącznie po zapaleniu gardła, podczas gdy APSGN może rozwinąć się zarówno po zakażeniu gardła, jak i skóry (liszajec).",
      expl: "Prawidłowa odpowiedź: B. Kluczowy fakt medyczny często sprawdzany na LEK: leczenie penicyliną zapobiega gorączce reumatycznej, ale NIE zapobiega rozwojowi kłębuszkowego zapalenia nerek (APSGN). Ponadto gorączka reumatyczna rozwija się wyłącznie po zapaleniu gardła, podczas gdy APSGN może rozwinąć się zarówno po zakażeniu gardła, jak i skóry (liszajec)."
    },
    {
      id: 5,
      q: "U pacjenta z podejrzeniem płonicy i wywiadem anafilaksji po amoksycylinie (reakcja natychmiastowa IgE-zależna) lekiem pierwszego wyboru jest:",
      opts: [
        "A. Cefadroksyl",
        "B. Cefuroksym",
        "C. Klarytromycyna",
        "D. Ampicylina z sulbaktamem",
        "E. Amoksycylina w małej dawce odczulającej"
      ],
      options: [
        "A. Cefadroksyl",
        "B. Cefuroksym",
        "C. Klarytromycyna",
        "D. Ampicylina z sulbaktamem",
        "E. Amoksycylina w małej dawce odczulającej"
      ],
      correctIdx: 2,
      correct: 2,
      exp: "Prawidłowa odpowiedź: C. W przypadku udokumentowanej reakcji natychmiastowej (anafilaksja, obrzęk Quinckego, wstrząs) na penicyliny przeciwwskazane są wszystkie beta-laktamy, w tym cefalosporyny. Lekami z wyboru stają się makrolidy (np. klarytromycyna przez 10 dni lub azytromycyna przez 5 dni) lub klindamycyna.",
      expl: "Prawidłowa odpowiedź: C. W przypadku udokumentowanej reakcji natychmiastowej (anafilaksja, obrzęk Quinckego, wstrząs) na penicyliny przeciwwskazane są wszystkie beta-laktamy, w tym cefalosporyny. Lekami z wyboru stają się makrolidy (np. klarytromycyna przez 10 dni lub azytromycyna przez 5 dni) lub klindamycyna."
    },
    {
      id: 6,
      q: "Czym są tzw. linie Pastii (objaw Pastii) obserwowane w płonicy?",
      opts: [
        "A. Białe plamki na błonie śluzowej policzków naprzeciw zębów trzonowych",
        "B. Drobne wybroczyny układające się linijnie w fałdach skórnych i zgięciach stawowych (łokciowych, pachwinowych)",
        "C. Poprzeczne bruzdy na płytkach paznokciowych pojawiające się po przebyciu infekcji",
        "D. Linijne przebarwienia wzdłuż mięśni prostych brzucha",
        "E. Siateczkowaty rumień na dystalnych częściach kończyn dolnych"
      ],
      options: [
        "A. Białe plamki na błonie śluzowej policzków naprzeciw zębów trzonowych",
        "B. Drobne wybroczyny układające się linijnie w fałdach skórnych i zgięciach stawowych (łokciowych, pachwinowych)",
        "C. Poprzeczne bruzdy na płytkach paznokciowych pojawiające się po przebyciu infekcji",
        "D. Linijne przebarwienia wzdłuż mięśni prostych brzucha",
        "E. Siateczkowaty rumień na dystalnych częściach kończyn dolnych"
      ],
      correctIdx: 1,
      correct: 1,
      exp: "Prawidłowa odpowiedź: B. Objaw Pastii to linijne wybroczyny w zgięciach stawowych (fałdach łokciowych, podkolanowych, pachwinowych) powstające na skutek zwiększonej kruchości naczyń włosowatych pod wpływem egzotoksyny paciorkowcowej.",
      expl: "Prawidłowa odpowiedź: B. Objaw Pastii to linijne wybroczyny w zgięciach stawowych (fałdach łokciowych, podkolanowych, pachwinowych) powstające na skutek zwiększonej kruchości naczyń włosowatych pod wpływem egzotoksyny paciorkowcowej."
    },
    {
      id: 7,
      q: "Trójkąt Fiłatowa w płonicy to:",
      opts: [
        "A. Trójkątny obszar wybroczyn na skórze klatki piersiowej",
        "B. Wolny od wysypki, blady trójkątny obszar wokół ust i nosa, kontrastujący z zaczerwienionymi policzkami",
        "C. Trójkątny nalot włóknikowy na tylnej ścianie gardła",
        "D. Trójkątne powiększenie sylwetki serca w RTG w przebiegu zapalenia mięśnia sercowego",
        "E. Zgrupowanie wykwitów pęcherzykowych w okolicy kości krzyżowej"
      ],
      options: [
        "A. Trójkątny obszar wybroczyn na skórze klatki piersiowej",
        "B. Wolny od wysypki, blady trójkątny obszar wokół ust i nosa, kontrastujący z zaczerwienionymi policzkami",
        "C. Trójkątny nalot włóknikowy na tylnej ścianie gardła",
        "D. Trójkątne powiększenie sylwetki serca w RTG w przebiegu zapalenia mięśnia sercowego",
        "E. Zgrupowanie wykwitów pęcherzykowych w okolicy kości krzyżowej"
      ],
      correctIdx: 1,
      correct: 1,
      exp: "Prawidłowa odpowiedź: B. Trójkąt Fiłatowa (maska płonicza) to charakterystyczna bladość skóry wokół ust i nosa (trójkąt nosowo-wargowy) przy intensywnym rumieniu policzków.",
      expl: "Prawidłowa odpowiedź: B. Trójkąt Fiłatowa (maska płonicza) to charakterystyczna bladość skóry wokół ust i nosa (trójkąt nosowo-wargowy) przy intensywnym rumieniu policzków."
    },
    {
      id: 8,
      q: "Wskaż prawidłowy czas pojawienia się i charakter łuszczenia naskórka po przebyciu płonicy:",
      opts: [
        "A. Występuje wyłącznie w pierwszych 24 godzinach choroby w postaci pęcherzy",
        "B. Zaczyna się po 7-14 dniach na twarzy (drobnopłatkowe), a w 2.-3. tygodniu staje się grubopłatkowe na dłoniach i stopach",
        "C. Złuszczanie dotyczy jedynie owłosionej skóry głowy z trwałym wyłysieniem",
        "D. Naskórek złuszcza się w postaci martwicy toksycznej obejmującej >30% powierzchni ciała",
        "E. W płonicy naskórek nigdy nie ulega złuszczeniu"
      ],
      options: [
        "A. Występuje wyłącznie w pierwszych 24 godzinach choroby w postaci pęcherzy",
        "B. Zaczyna się po 7-14 dniach na twarzy (drobnopłatkowe), a w 2.-3. tygodniu staje się grubopłatkowe na dłoniach i stopach",
        "C. Złuszczanie dotyczy jedynie owłosionej skóry głowy z trwałym wyłysieniem",
        "D. Naskórek złuszcza się w postaci martwicy toksycznej obejmującej >30% powierzchni ciała",
        "E. W płonicy naskórek nigdy nie ulega złuszczeniu"
      ],
      correctIdx: 1,
      correct: 1,
      exp: "Prawidłowa odpowiedź: B. Łuszczenie naskórka w płonicy ma charakterystyczną dynamikę czasową: najpierw drobne (otrębiaste) na twarzy i tułowiu, a w 2.-3. tygodniu staje się grubopłatkowe na dłoniach i podeszwach stóp, schodząc niekiedy 'płatami jak rękawiczki'.",
      expl: "Prawidłowa odpowiedź: B. Łuszczenie naskórka w płonicy ma charakterystyczną dynamikę czasową: najpierw drobne (otrębiaste) na twarzy i tułowiu, a w 2.-3. tygodniu staje się grubopłatkowe na dłoniach i podeszwach stóp, schodząc niekiedy 'płatami jak rękawiczki'."
    },
    {
      id: 9,
      q: "Czy przebycie płonicy pozostawia trwałą odporność na ponowne zachorowanie?",
      opts: [
        "A. Tak, przebycie płonicy daje trwałą odporność na całe życie na wszystkie zakażenia paciorkowcowe",
        "B. Pozostawia trwałą odporność wyłącznie przeciwko konkretnemu typowi toksyny pirogennej (SpeA, B lub C); ponowne zachorowanie na płonicę jest możliwe przy zakażeniu szczepem wytwarzającym inny typ toksyny",
        "C. Nie, płonica nie indukuje żadnej odpowiedzi immunologicznej",
        "D. Odporność po płonicy utrzymuje się ściśle przez 3 miesiące",
        "E. Odporność zależy wyłącznie od poziomu przeciwciał przeciwko otoczce kwasu hialuronowego"
      ],
      options: [
        "A. Tak, przebycie płonicy daje trwałą odporność na całe życie na wszystkie zakażenia paciorkowcowe",
        "B. Pozostawia trwałą odporność wyłącznie przeciwko konkretnemu typowi toksyny pirogennej (SpeA, B lub C); ponowne zachorowanie na płonicę jest możliwe przy zakażeniu szczepem wytwarzającym inny typ toksyny",
        "C. Nie, płonica nie indukuje żadnej odpowiedzi immunologicznej",
        "D. Odporność po płonicy utrzymuje się ściśle przez 3 miesiące",
        "E. Odporność zależy wyłącznie od poziomu przeciwciał przeciwko otoczce kwasu hialuronowego"
      ],
      correctIdx: 1,
      correct: 1,
      exp: "Prawidłowa odpowiedź: B. Przebycie płonicy indukuje wytworzenie swoistych przeciwciał neutralizujących dany typ egzotoksyny (SpeA, SpeB lub SpeC). Ponieważ istnieje kilka serotypów toksyn pirogennych, pacjent może zachorować na płonicę 2 lub 3 razy w życiu przy kontakcie ze szczepem wytwarzającym inny typ toksyny.",
      expl: "Prawidłowa odpowiedź: B. Przebycie płonicy indukuje wytworzenie swoistych przeciwciał neutralizujących dany typ egzotoksyny (SpeA, SpeB lub SpeC). Ponieważ istnieje kilka serotypów toksyn pirogennych, pacjent może zachorować na płonicę 2 lub 3 razy w życiu przy kontakcie ze szczepem wytwarzającym inny typ toksyny."
    },
    {
      id: 10,
      q: "Jakie jest znaczenie diagnostyczne badania ASO (antystreptolizyny O) w ostrym dyżurze u dziecka z podejrzeniem płonicy?",
      opts: [
        "A. Jest to podstawowe badanie z wyboru potwierdzające rozpoznanie w 1. dobie",
        "B. Wysokie miano ASO w 1. dobie nakazuje natychmiastowe skierowanie na hemodializę",
        "C. ASO nie ma wartości w diagnostyce ostrej fazy choroby, ponieważ narasta dopiero po 1-3 tygodniach od zakażenia; służy do diagnostyki powikłań późnych",
        "D. Ujemne ASO wyklucza zakażenie paciorkowcowe na każdym etapie",
        "E. Badanie ASO zastępuje wymaz z gardła i posiew mikrobiologiczny"
      ],
      options: [
        "A. Jest to podstawowe badanie z wyboru potwierdzające rozpoznanie w 1. dobie",
        "B. Wysokie miano ASO w 1. dobie nakazuje natychmiastowe skierowanie na hemodializę",
        "C. ASO nie ma wartości w diagnostyce ostrej fazy choroby, ponieważ narasta dopiero po 1-3 tygodniach od zakażenia; służy do diagnostyki powikłań późnych",
        "D. Ujemne ASO wyklucza zakażenie paciorkowcowe na każdym etapie",
        "E. Badanie ASO zastępuje wymaz z gardła i posiew mikrobiologiczny"
      ],
      correctIdx: 2,
      correct: 2,
      exp: "Prawidłowa odpowiedź: C. Przeciwciała przeciw streptolizynie O (ASO) pojawiają się we krwi po 7-14 dniach od infekcji, osiągając szczyt po 3-5 tygodniach. W ostrej fazie anginy i płonicy ich miano jest najczęściej prawidłowe. ASO służy jako marker przebytego zakażenia w diagnostyce powikłań immunologicznych (gorączka reumatyczna, APSGN).",
      expl: "Prawidłowa odpowiedź: C. Przeciwciała przeciw streptolizynie O (ASO) pojawiają się we krwi po 7-14 dniach od infekcji, osiągając szczyt po 3-5 tygodniach. W ostrej fazie anginy i płonicy ich miano jest najczęściej prawidłowe. ASO służy jako marker przebytego zakażenia w diagnostyce powikłań immunologicznych (gorączka reumatyczna, APSGN)."
    },
    {
      id: 11,
      q: "Który lek przeciwgorączkowy jest lekiem z wyboru u dziecka chorego na płonicę?",
      opts: [
        "A. Kwas acetylosalicylowy (aspiryna)",
        "B. Paracetamol lub Ibuprofen w dawkach dostosowanych do masy ciała",
        "C. Metamizol w monoterapii dożylnej",
        "D. Deksametazon doustnie w dawce immunosupresyjnej",
        "E. Nimesulid"
      ],
      options: [
        "A. Kwas acetylosalicylowy (aspiryna)",
        "B. Paracetamol lub Ibuprofen w dawkach dostosowanych do masy ciała",
        "C. Metamizol w monoterapii dożylnej",
        "D. Deksametazon doustnie w dawce immunosupresyjnej",
        "E. Nimesulid"
      ],
      correctIdx: 1,
      correct: 1,
      exp: "Prawidłowa odpowiedź: B. Lekami pierwszego wyboru w kontroli gorączki i bólu są paracetamol (15 mg/kg co 4-6 h) oraz ibuprofen (10 mg/kg co 8 h). Kwas acetylosalicylowy jest bezwzględnie przeciwwskazany u dzieci do 12.-16. roku życia ze względu na ryzyko zespołu Reye'a.",
      expl: "Prawidłowa odpowiedź: B. Lekami pierwszego wyboru w kontroli gorączki i bólu są paracetamol (15 mg/kg co 4-6 h) oraz ibuprofen (10 mg/kg co 8 h). Kwas acetylosalicylowy jest bezwzględnie przeciwwskazany u dzieci do 12.-16. roku życia ze względu na ryzyko zespołu Reye'a."
    }
  ],
  flashcards: [
    {
      front: "Jakie są charakterystyczne cechy wysypki w płonicy (szkarlatynie)?",
      back: "• Drobnoplamista (wielkości łebka od szpilki), gęsta, szorstka w dotyku jak papier ścierny.<br>• Zblednięcie wokół ust i nosa (trójkąt Fiłatowa) przy rumianych policzkach.<br>• Wybroczyny linijne w zgięciach stawowych (linie / objaw Pastii).<br>• Po 1-3 tyg. charakterystyczne łuszczenie: drobne na tułowiu, grubopłatkowe na dłoniach i stopach."
    },
    {
      front: "Jak przebiega ewolucja wyglądu języka w płonicy?",
      back: "• 1.-2. doba: język obłożony grubym białym nalotem z przekrwionymi brodawkami na brzegach.<br>• 4.-5. doba: nalot ustępuje od brzegów ku środkowi, odsłaniając żywoczerwony 'język malinowy' ('truskawkowy') z wydatnymi brodawkami grzybowatymi."
    },
    {
      front: "Jaki jest antybiotyk I rzutu w płonicy i jak długo trwa terapia?",
      back: "• Fenoksymetylopenicylina (Penicylina V) doustnie.<br>• Dawkowanie: 100 000–200 000 j.m./kg m.c./dobę w 2 dawkach podzielonych.<br>• Czas trwania: bezwzględnie 10 dni (kluczowe dla pełnej eradykacji i ochrony przed gorączką reumatyczną)."
    },
    {
      front: "Kiedy dziecko chore na płonicę przestaje być zakaźne dla otoczenia?",
      back: "• Po 24 godzinach od podania pierwszej dawki skutecznego antybiotyku (penicyliny).<br>• Bez antybiotykoterapii zakaźność trwa 2-3 tygodnie."
    },
    {
      front: "Jak antybiotykoterapia płonicy wpływa na ryzyko powikłań późnych?",
      back: "• Ostra gorączka reumatyczna: antybiotykoterapia skutecznie ZAPOBIEGA (redukcja o >90%).<br>• Ostre popaciorkowcowe kłębuszkowe zapalenie nerek (APSGN): antybiotykoterapia NIE ZAPOBIEGA wystąpieniu."
    },
    {
      front: "Jakie jest postępowanie w przypadku alergii na penicylinę w płonicy?",
      back: "• Alergia nienatychmiastowa (łagodna osutka): Cefalosporyny I generacji (Cefadroksyl 30 mg/kg/d przez 10 dni).<br>• Alergia natychmiastowa (anafilaksja, obrzęk naczynioruchowy): Makrolidy (Klarytromycyna przez 10 dni, Azytromycyna przez 5 dni) lub Klindamycyna."
    }
  ]
};

async function main() {
  await saveCase(case111);
}
main();

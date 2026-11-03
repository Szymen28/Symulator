const fs = require('fs');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const PASSWORD = '@LEKSzymon28111999';

async function upgradeCase(fname, updater) {
  const enc = JSON.parse(fs.readFileSync('cases/' + fname, 'utf8'));
  const c = await decryptObjectAes(enc, PASSWORD);
  updater(c);
  if (!c.vitalsObj) {
    c.vitalsObj = { hr: 110, bp: "100/60", spo2: 98, rr: 22, temp: 37.5, gcs: 15 };
  }
  const reEnc = await encryptStringAes(JSON.stringify(c, null, 2), PASSWORD);
  fs.writeFileSync('cases/' + fname, JSON.stringify(reEnc, null, 2), 'utf8');
  console.log(`Upgraded clinical storytelling: ${fname}`);
}

async function run() {
  console.log("Starting deep clinical upgrade for cases 106-115...");

  // ==========================================
  // CASE 106: STEC-HUS
  // ==========================================
  await upgradeCase('106_stec_hus.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena na SOR – 4-latek z nagłą bladością, wybroczynami i skąpomoczem",
        desc: "Dyżurujesz na SOR dziecięcym. Zespół ratownictwa przywozi 4-letniego chłopca w asyście zapłakanej matki. 5 dni temu dziecko zjadło niedopieczonego burgera z wołowiny na festynie rodzinnym, po czym wystąpiła wodnisto-krwista biegunka ze skurczowymi bólami brzucha. Dziś biegunka osłabła, ale matka zauważyła dramatyczną zmianę: syn stał się 'blady jak ściana', woskowy, podsypiający, na podudziach i ramionach pojawiły się drobne wybroczyny, a od 14 godzin nie zmoczył ani jednej pieluchy. W badaniu: HR 145/min, RR 135/85 mmHg, podsypiający (GCS 13), blady, zażółcone twardówki, obrzęki powiek. Jaka jest Twoja natychmiastowa hipoteza i pierwsze zlecenia CITO?",
        scenario: "Dyżurujesz na SOR dziecięcym. Zespół ratownictwa przywozi 4-letniego chłopca w asyście zapłakanej matki. 5 dni temu dziecko zjadło niedopieczonego burgera z wołowiny na festynie rodzinnym, po czym wystąpiła wodnisto-krwista biegunka ze skurczowymi bólami brzucha. Dziś biegunka osłabła, ale matka zauważyła dramatyczną zmianę: syn stał się 'blady jak ściana', woskowy, podsypiający, na podudziach i ramionach pojawiły się drobne wybroczyny, a od 14 godzin nie zmoczył ani jednej pieluchy. W badaniu: HR 145/min, RR 135/85 mmHg, podsypiający (GCS 13), blady, zażółcone twardówki, obrzęki powiek. Jaka jest Twoja natychmiastowa hipoteza i pierwsze zlecenia CITO?",
        options: [
          {
            text: "Podejrzewasz typowy zespół hemolityczno-mocznicowy (STEC-HUS / D+ HUS) indukowany toksyną Shiga; zlecasz pilną morfologię z mikroskopową oceną rozmazu krwi, próby nerkowe, elektrolity, koagulogram, LDH, haptoglobinę, próbę Coombsa i badanie kału na obecność toksyny Shiga/STEC.",
            correct: true,
            feedback: "Znakomicie! Klasyczny początek typowego HUS: u małego dziecka po epizodzie krwistej biegunki (często po spożyciu niedogotowanej wołowiny lub niepasteryzowanego mleka skażonych szczepem E. coli wytwarzającym Shiga-like toxin, np. O157:H7) dochodzi do nagłego załamania: bladość (anemia), skaza krwotoczna (trombocytopenia) i anuria (ostre uszkodzenie nerek)."
          },
          {
            text: "Rozpoznajesz zwykłe powikłanie odwodnienia w nieżycie żołądkowo-jelitowym i zalecasz doustne pojenie wodą niegazowaną.",
            correct: false,
            feedback: "Kardynalny błąd! Anuria, woskowa bladość, żółtaczka i wybroczyny to objawy niewydolności wielonarządowej, a nie prostego odwodnienia."
          },
          {
            text: "Stawiasz rozpoznanie ostrego zapalenia wyrostka robaczkowego i kwalifikujesz dziecko do pilnej laparotomii zwiadowczej.",
            correct: false,
            feedback: "Błąd: krwista biegunka poprzedzająca objawy z bladością i oligurią to cechy mikroangiopatii zakrzepowej, nie ostrego brzucha chirurgicznego."
          },
          {
            text: "Podejrzewasz sepsę meningokokową i podajesz domięśniowo ampicylinę bez badań krwi.",
            correct: false,
            feedback: "Brak gorączki, obecny wywiad biegunkowy i żółtaczka przemawiają przeciwko ZOMR/posocznicy meningokokowej."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Analiza wyników CITO – Potwierdzenie triady mikroangiopatii zakrzepowej (TMA)",
        desc: "Otrzymujesz wyniki laboratoryjne na cito: Krew: Hb 5.8 g/dl, Hct 18%, erytrocyty z licznymi schistocytami (>3-4% w rozmazie mikroskopowym), płytki krwi (PLT) 24 G/l, LDH 1850 IU/l (bardzo wysokie), haptoglobina <0.05 g/l (nieoznaczalna), bezpośredni odczyn Coombsa (DAT) UJEMNY. Kreatynina 3.8 mg/dl, mocznik 125 mg/dl, potas 5.9 mmol/l. Koagulogram: PT/INR 1.05, APTT 32 s, fibrynogen 340 mg/dl (w normie). Jaka jest Twoja interpretacja?",
        scenario: "Otrzymujesz wyniki laboratoryjne na cito: Krew: Hb 5.8 g/dl, Hct 18%, erytrocyty z licznymi schistocytami (>3-4% w rozmazie mikroskopowym), płytki krwi (PLT) 24 G/l, LDH 1850 IU/l (bardzo wysokie), haptoglobina <0.05 g/l (nieoznaczalna), bezpośredni odczyn Coombsa (DAT) UJEMNY. Kreatynina 3.8 mg/dl, mocznik 125 mg/dl, potas 5.9 mmol/l. Koagulogram: PT/INR 1.05, APTT 32 s, fibrynogen 340 mg/dl (w normie). Jaka jest Twoja interpretacja?",
        options: [
          {
            text: "Potwierdzasz pełną triadę HUS: 1) mikroangiopatyczna niedokrwistość hemolityczna Coombs-ujemna ze schizocytami, 2) małopłytkowość z zużycia, 3) ostre uszkodzenie nerek (AKI stadium 3 KDIGO). Prawidłowy koagulogram wyklucza DIC!",
            correct: true,
            feedback: "Doskonale! Klasyczne kryteria HUS: MAHA (mechaniczna fragmentacja krwinek na mikrozakrzepach naczyniowych nerek -> schizocyty, LDH wysokie, haptoglobina wyczerpana, Coombs ujemny) + trombocytopenia (zużycie płytek w mikrozakrzepach) + AKI. Prawidłowy PT i fibrynogen to kluczowe kryterium odróżniające HUS od rozsianego wykrzepiania wewnątrznaczyniowego (DIC)!"
          },
          {
            text: "Rozpoznajesz rozsiane wykrzepianie wewnątrznaczyniowe (DIC) i zlecasz pilny wlew heparyny niefrakcjonowanej.",
            correct: false,
            feedback: "Kardynalny błąd! W DIC koagulogram jest głęboko zaburzony (spadek fibrynogenu, wydłużenie PT i APTT). W HUS kaskada krzepnięcia osocza nie jest uogólniona, a heparyna zwiększa ryzyko krwawień śmiertelnych!"
          },
          {
            text: "Rozpoznajesz autoimmunologiczną niedokrwistość hemolityczną (AIHA).",
            correct: false,
            feedback: "Błąd: w AIHA odczyn Coombsa jest wybitnie dodatni, a w rozmazie dominują mikrosferocyty, a nie pofragmentowane schizocyty."
          },
          {
            text: "Stawiasz rozpoznanie idiopatycznej plamicy małopłytkowej (ITP).",
            correct: false,
            feedback: "W ITP nie ma hemolizy ani uszkodzenia nerek."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Bezwzględne przeciwwskazania terapeutyczne w zakażeniach STEC",
        desc: "Młodszy stażysta pyta, jaki antybiotyk i jaki lek przeciwbiegunkowy należy pilnie podać dożylnie, aby 'zabić bakterie E. coli w jelicie i powstrzymać resztki biegunki'. Jakie stanowisko zajmujesz zgodnie ze światowymi wytycznymi nefrologicznymi?",
        scenario: "Młodszy stażysta pyta, jaki antybiotyk i jaki lek przeciwbiegunkowy należy pilnie podać dożylnie, aby 'zabić bakterie E. coli w jelicie i powstrzymać resztki biegunki'. Jakie stanowisko zajmujesz zgodnie ze światowymi wytycznymi nefrologicznymi?",
        options: [
          {
            text: "Kategorycznie zakazujesz antybiotykoterapii oraz leków zwalniających perystaltykę (opioidów/loperamidu); antybiotyki indukują lizę bakterii i masowe uwalnianie toksyny Shiga (Stx1/Stx2), co dramatycznie nasila uszkodzenie śródbłonka i zaostrza przebieg HUS!",
            correct: true,
            feedback: "Wybitnie! To jedno z najważniejszych pytań na LEK: w biegunce wywołanej STEC (szczególnie O157:H7) ANTYBIOTYKI SĄ BEZWZGLĘDNIE PRZECIWWSKAZANE! Antybiotyki (chinolony, beta-laktamy, kotrimoksazol) indukują fagi lityczne bakteryjne, co powoduje lawinowy wyrzut toksyny Shiga do krwioobiegu i 10-krotnie zwiększa ryzyko rozwinięcia ciężkiego HUS i anurii. Leki przeciwperystaltyczne również są przeciwwskazane, bo zatrzymują toksynę w jelicie."
          },
          {
            text: "Zlecasz doustną cyprofloksacynę w połączeniu z loperamidem co 4 godziny.",
            correct: false,
            feedback: "Błąd jatrogenny! Zastosowanie chinolonów i loperamidu to najgorszy możliwy schemat u pacjenta ze STEC."
          },
          {
            text: "Podajesz wankomycynę dożylnie w skojarzeniu z metronidazolem.",
            correct: false,
            feedback: "Błąd: antybiotykoterapia nie ma uzasadnienia i nasila uwalnianie toksyn bakteryjnych."
          },
          {
            text: "Zalecasz leczenie przeciwwirusowe acyklowirem.",
            correct: false,
            feedback: "STEC to zakażenie bakteryjne, acyklowir nie ma żadnego zastosowania."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Strategia przetoczeń krwi – Dylemat płytek krwi (KKP) vs krwinek czerwonych (KKCz)",
        desc: "Pielęgniarka widzi wynik płytek 24 G/l i hemoglobinę 5.8 g/dl. Przygotowuje jednostkę koncentratu krwinek płytkowych (KKP) i pyta, czy podłączyć ją natychmiast przed podaniem krwi.",
        scenario: "Pielęgniarka widzi wynik płytek 24 G/l i hemoglobinę 5.8 g/dl. Przygotowuje jednostkę koncentratu krwinek płytkowych (KKP) i pyta, czy podłączyć ją natychmiast przed podaniem krwi.",
        options: [
          {
            text: "Wstrzymujesz przetoczenie KKP! Przetoczenie płytek krwi w HUS jest przeciwwskazane (dolewa oliwy do ognia zakrzepicy mikronaczyniowej), dopuszczalne jedynie w razie krwotoków zagrażających życiu (np. krwawienie do OUN); zlecasz powolne przetoczenie ubogoleukocytarnego koncentratu krwinek czerwonych (KKCz) z powodu objawowej anemii.",
            correct: true,
            feedback: "Znakomicie! To żelazna reguła nefrologii dziecięcej: w HUS małopłytkowość wynika ze zużycia w zakrzepach naczyniowych. Podanie KKP 'karmi' proces zakrzepowy, prowadząc do zatykania kolejnych naczyń nerkowych i mózgowych! KKP podaje się WYŁĄCZNIE przy masywnym, zagrażającym życiu krwawieniu lub przed pilną neurochirurgią. Głęboka niedokrwistość (Hb <6 g/dl) z tachykardią wymaga ostrożnego przetoczenia zmywanego/przefiltrowanego KKCz (10-15 ml/kg)."
          },
          {
            text: "Podajesz natychmiast 3 jednostki KKP w szybkim bolusie, aby podnieść płytki powyżej 100 G/l.",
            correct: false,
            feedback: "Błąd krytyczny! Przetoczenie płytek nasila mikroangiopatię, może wywołać udar mózgu i nieodwracalną martwicę kory nerek."
          },
          {
            text: "Odstępujesz od jakichkolwiek przetoczeń, nawet KKCz, do czasu powrotu diurezy.",
            correct: false,
            feedback: "Błąd: Hb 5.8 g/dl przy tachykardii 145/min to stan niedotlenienia mięśnia sercowego i mózgu wymagający KKCz."
          },
          {
            text: "Podajesz pełną krew konserwowaną od dawcy niesprawdzonego serologicznie.",
            correct: false,
            feedback: "Niedopuszczalne i śmiertelnie niebezpieczne."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Wskazania do pilnej dializoterapii u dziecka w przebiegu anurii",
        desc: "Mimo ostrożnej płynoterapii i wyrównania wolemii, w 18. godzinie chłopiec nadal ma bezmocz (diureza <0.2 ml/kg/h). W gazometrii: pH 7.21, HCO3- 12 mmol/l, pCO2 28 mmHg (kwasica metaboliczna), potas w surowicy wzrasta do 6.8 mmol/l, w EKG widoczne wysokie, szpiczaste załamki T. Jakie jest Twoje postępowanie ratunkowe?",
        scenario: "Mimo ostrożnej płynoterapii i wyrównania wolemii, w 18. godzinie chłopiec nadal ma bezmocz (diureza <0.2 ml/kg/h). W gazometrii: pH 7.21, HCO3- 12 mmol/l, pCO2 28 mmHg (kwasica metaboliczna), potas w surowicy wzrasta do 6.8 mmol/l, w EKG widoczne wysokie, szpiczaste załamki T. Jakie jest Twoje postępowanie ratunkowe?",
        options: [
          {
            text: "Kwalifikujesz dziecko do pilnego leczenia nerkozastępczego (RRT – preferowana dializa otrzewnowa lub ciągła hemofiltracja CRRT) po natychmiastowej kardioprotekcji glukonolem wapnia i wlewie glukozy z insuliną w celu obniżenia hiperkaliemii.",
            correct: true,
            feedback: "Prawidłowo! Wskazania do pilnej dializy w HUS (kryteria AEIOU): anuria/oliguria oporna na płyny, oporna hiperkaliemia z cechami kardiotoksyczności w EKG, ciężka kwasica metaboliczna, objawy mocznicy lub przewodnienie. U małych dzieci metodą z wyboru jest dializa otrzewnowa (łagodny profil hemodynamiczny, brak konieczności heparynizacji) lub hemodializa ciągła (CRRT)."
          },
          {
            text: "Podajesz 100 mg furosemidu w szybkim bolusie i czekasz kolejne 12 godzin na mocz.",
            correct: false,
            feedback: "Kardynalny błąd! W ostrej martwicy kory nerek w przebiegu mikroangiopatii pętlowe diuretyki nie przywrócą filtracji, a odwlekają dializę ratującą życie."
          },
          {
            text: "Podajesz doustnie tabletki z potasem w celu wyrównania stężenia komórkowego.",
            correct: false,
            feedback: "Śmiertelny błąd! Pacjent ma hiperkaliemię 6.8 mmol/l grożącą zatrzymaniem krążenia w asystolii."
          },
          {
            text: "Odsyłasz dziecko do domu z zaleceniem picia naparu z pokrzywy.",
            correct: false,
            feedback: "Absurdalne postępowanie w śmiertelnym stanie zagrożenia życia."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Monitorowanie powikłań neurologicznych (Neuro-HUS)",
        desc: "W trakcie przygotowywania cewnika dializacyjnego chłopiec nagle doznaje uogólnionego napadu drgawek toniczno-klonicznych trwającego 90 sekund, a po napadzie pozostaje nieprzytomny (GCS 8). Jakie mechanizmy patofizjologiczne odpowiadają za ten stan i jak postępujesz?",
        scenario: "W trakcie przygotowywania cewnika dializacyjnego chłopiec nagle doznaje uogólnionego napadu drgawek toniczno-klonicznych trwającego 90 sekund, a po napadzie pozostaje nieprzytomny (GCS 8). Jakie mechanizmy patofizjologiczne odpowiadają za ten stan i jak postępujesz?",
        options: [
          {
            text: "Rozpoznajesz powikłanie ośrodkowe HUS (neuro-HUS: mikrozakrzepy w naczyniach mózgowych, encefalopatia nadciśnieniowa / zespół PRES); przerywasz drgawki benzodiazepiną (midazolam/diazepam), zabezpieczasz drożność dróg oddechowych, kontrolujesz ciśnienie tętnicze i pilnie zlecasz TK/MRI głowy.",
            correct: true,
            feedback: "Doskonale! Zajęcie OUN (neuro-HUS) to najczęstsza przyczyna zgonu w zespole hemolityczno-mocznicowym. Wynika z odkładania mikrozakrzepów w mikrokrążeniu mózgowym, niedokrwienia oraz encefalopatii nadciśnieniowej (PRES). Wymaga agresywnej kontroli drgawek, obniżenia ciśnienia krwi i pilnego RRT. W skrajnych opornych postaciach rozważa się leczenie eculizumabem lub plazmaferezę."
          },
          {
            text: "Uznajesz, że to zwykłe drgawki gorączkowe i nie podejmujesz żadnych działań diagnostycznych.",
            correct: false,
            feedback: "Błąd krytyczny! Pacjent jest bezgorączkowy, ma ciężką mikroangiopatię, a drgawki to objaw uszkodzenia mózgu w neuro-HUS."
          },
          {
            text: "Wykonujesz natychmiastową punkcję lędźwiową bez wcześniejszego badania obrazowego mózgu.",
            correct: false,
            feedback: "Błąd śmiertelny: przy małopłytkowości 24 G/l i podejrzeniu obrzęku mózgu punkcja grozi wgłobieniem pnia mózgu i krwawieniem podpajęczynówkowym!"
          },
          {
            text: "Podajesz dożylnie 1000 mg fenobarbitalu w 1 minutę.",
            correct: false,
            feedback: "Zbyt gwałtowna dawka grozi zapaścią oddechowo-krążeniową."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Prowadzenie płynoterapii i kontrola nadciśnienia tętniczego",
        desc: "W trakcie dializoterapii ciśnienie tętnicze dziecka wynosi 142/92 mmHg (>99 centyla dla wieku i płci). Jakie zasady bilansowania płynów i farmakoterapii hipotensyjnej wdrażasz u pacjenta ze skrajnym oligomoczem?",
        scenario: "W trakcie dializoterapii ciśnienie tętnicze dziecka wynosi 142/92 mmHg (>99 centyla dla wieku i płci). Jakie zasady bilansowania płynów i farmakoterapii hipotensyjnej wdrażasz u pacjenta ze skrajnym oligomoczem?",
        options: [
          {
            text: "Ścisła restrykcja płynowa (straty niewidzialne ~300-400 ml/m2/d + aktualna diureza i straty z przewodu pokarmowego); lekiem hipotensyjnym z wyboru są blokery kanału wapniowego (amlodypina, nifedypina o przedłużonym uwalnianiu); inhibitory ACE/ARB są BEZWZGLĘDNIE PRZECIWWSKAZANE w ostrym AKI!",
            correct: true,
            feedback: "Prawidłowo! W oligomoczu podaż płynów musi odpowiadać stratom niewidzialnym (perspiratio insensibilis) powiększonym o objętość oddanego moczu. Nadciśnienie w HUS jest objętościowo-zależne i naczynioskurczowe. Lekami pierwszego wyboru są antagoniści wapnia. ACEI i sartany są przeciwwskazane w ostrej fazie, bo znoszą skurcz tętniczki odprowadzającej i pogłębiają spadek GFR!"
          },
          {
            text: "Zlecasz podawanie enalaprylu dożylnie w maksymalnej dawce.",
            correct: false,
            feedback: "Kardynalny błąd! ACE-I w ostrej fazie anurii gwałtownie pogarszają perfuzję kłębuszków nerkowych i nasilają hiperkaliemię."
          },
          {
            text: "Podajesz nieograniczone ilości płynów hipotonicznych (5% glukoza) w dawce 3 litry/dobę.",
            correct: false,
            feedback: "Doprowadzi to do obrzęku mózgu, obrzęku płuc i zgonu z przewodnienia."
          },
          {
            text: "Zalecasz podanie leków beta-adrenolitycznych w monoterapii jako jedyny sposób leczenia anurii.",
            correct: false,
            feedback: "Brak wpływu na przyczynę nadciśnienia i brak eliminacji płynów."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Długoterminowe rokowanie, powikłania odległe i nadzór nefrologiczny",
        desc: "Po 12 dobach intensywnej dializoterapii i leczenia wspomagającego chłopiec wchodzi w fazę poliurii, parametry nerkowe stabilizują się (kreatynina 0.8 mg/dl), a płytki rosną do 180 G/l. Jakie są zalecenia długofalowe i o jakich późnych powikłaniach HUS informujesz rodziców?",
        scenario: "Po 12 dobach intensywnej dializoterapii i leczenia wspomagającego chłopiec wchodzi w fazę poliurii, parametry nerkowe stabilizują się (kreatynina 0.8 mg/dl), a płytki rosną do 180 G/l. Jakie są zalecenia długofalowe i o jakich późnych powikłaniach HUS informujesz rodziców?",
        options: [
          {
            text: "Edukujesz rodziców o konieczności wieloletniej opieki w poradni nefrologicznej: regularna kontrola ciśnienia tętniczego, monitorowanie białkomoczu i eGFR; u 20–30% dzieci po przebytym HUS rozwija się przewlekła choroba nerek (PChN), utrwalone nadciśnienie lub proteinuria z powodu ogniskowego bliznowacenia kłębuszków.",
            correct: true,
            feedback: "Wybitnie! Choć śmiertelność ostra w typowym STEC-HUS spadła poniżej 2-5% dzięki nowoczesnemu RRT, to u niemal jednej trzeciej pacjentów dochodzi do odległych powikłań nerkowych (nefropatia pohusowska: białkomocz, obniżenie rezerwy filtracyjnej, nadciśnienie tętnicze, a nawet schyłkowa niewydolność nerek po 10-20 latach). Wymaga to ścisłego monitorowania przez nefrologa dziecięcego."
          },
          {
            text: "Zapewniasz rodziców, że po wyleczeniu nerki regenerują się w 100% i nie są potrzebne żadne badania kontrolne w życiu.",
            correct: false,
            feedback: "Błąd zaniechania: brak kontroli grozi przeoczeniem utajonej przewlekłej niewydolności nerek."
          },
          {
            text: "Zalecasz profilaktyczną antybiotykoterapię amoksycyliną przez najbliższe 5 lat.",
            correct: false,
            feedback: "Brak wskazań i szkodliwa generacja oporności bakteryjnej."
          },
          {
            text: "Zakazujesz dziecku spożywania jakichkolwiek warzyw i owoców do końca życia.",
            correct: false,
            feedback: "Niedorzeczne zalecenie dietetyczne."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 107: Odpływ pęcherzowo-moczowodowy (VUR)
  // ==========================================
  await upgradeCase('107_odplyw_pecherzowo_moczowodowy_vur.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena w poradni – 2-letnia dziewczynka z nawrotami gorączkowych ZUM",
        desc: "Do poradni nefrologii dziecięcej zgłaszają się rodzice z 2-letnią dziewczynką. W ciągu ostatnich 6 miesięcy dziecko przebyło dwa udokumentowane epizody ostrego odmiedniczkowego zapalenia nerek (APN) z gorączką >39°C, w których wyhodowano E. coli >10^5 CFU/ml. Rodzice zauważyli, że mała wstrzymuje mocz, popłakuje przy mikcji, a ostatnio gorączka znowu wzrosła do 38.3°C. W badaniu: brzuszek miękki, obustronny objaw Goldflama wątpliwy ze względu na wiek, okolica krocza bez cech podrażnienia czy synechii warg sromowych. Jaki algorytm diagnostyczny wdrażasz zgodnie z wytycznymi PTNFD i EAU/ESPU?",
        scenario: "Do poradni nefrologii dziecięcej zgłaszają się rodzice z 2-letnią dziewczynką. W ciągu ostatnich 6 miesięcy dziecko przebyło dwa udokumentowane epizody ostrego odmiedniczkowego zapalenia nerek (APN) z gorączką >39°C, w których wyhodowano E. coli >10^5 CFU/ml. Rodzice zauważyli, że mała wstrzymuje mocz, popłakuje przy mikcji, a ostatnio gorączka znowu wzrosła do 38.3°C. W badaniu: brzuszek miękki, obustronny objaw Goldflama wątpliwy ze względu na wiek, okolica krocza bez cech podrażnienia czy synechii warg sromowych. Jaki algorytm diagnostyczny wdrażasz zgodnie z wytycznymi PTNFD i EAU/ESPU?",
        options: [
          {
            text: "Zlecasz natychmiast badanie ogólne moczu i posiew ze środkowego strumienia, USG nerek i dróg moczowych oraz planujesz cystouretrografię mikcyjną (CUM) po wyleczeniu aktywnej infekcji w celu wykluczenia odpływu pęcherzowo-moczowodowego (VUR).",
            correct: true,
            feedback: "Znakomicie! Nawracające gorączkowe ZUM u dziecka <2-3 r.ż. to bezwzględne wskazanie do diagnostyki w kierunku wad anatomicznych i czynnościowych układu moczowego, w tym odpływu pęcherzowo-moczowodowego (VUR występuje u 30-50% tych dzieci!). Podstawą jest USG, a ostatecznym badaniem potwierdzającym refluks jest cystouretrografia mikcyjna (CUM)."
          },
          {
            text: "Zalecasz wyłącznie podawanie witaminy C i żurawiny, uznając nawroty za fizjologię wieku poniemowlęcego.",
            correct: false,
            feedback: "Kardynalny błąd! U małych dzieci nieleczony refluks wysokiego stopnia prowadzi do bliznowacenia nerek i niewydolności narządu."
          },
          {
            text: "Kwalifikujesz dziecko do natychmiastowej nefrektomii lewostronnej w dniu zgłoszenia.",
            correct: false,
            feedback: "Absurdalna i okaleczająca decyzja bez jakichkolwiek wskazań i badań."
          },
          {
            text: "Wykonujesz natychmiastową urografię dożylną w ostrej fazie gorączkowej.",
            correct: false,
            feedback: "Błąd: urografia jest przestarzała, obciąża kontrastem, a badania inwazyjne w ostrej infekcji są przeciwwskazane."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Badanie ultrasonograficzne układu moczowego – Znaki ostrzegawcze",
        desc: "W wykonanym USG nerek i pęcherza moczowego radiolog opisuje: Nerka prawa o prawidłowej strukturze i wielkości. Nerka lewa: wymiar podłużny 65 mm (poniżej 10. centyla), warstwa miąższowa ścieńczała do 4 mm o niejednorodnej echogeniczności z ubytkami zarysu korowego (podejrzenie blizn), poszerzenie miedniczki nerkowej do 14 mm oraz kielichów do 9 mm, moczowód lewy poszerzony na całym przebiegu (megaureter do 11 mm) aż do ujścia pęcherzowego. Pęcherz moczowy o pogrubiałej ścianie. Co sugeruje ten obraz?",
        scenario: "W wykonanym USG nerek i pęcherza moczowego radiolog opisuje: Nerka prawa o prawidłowej strukturze i wielkości. Nerka lewa: wymiar podłużny 65 mm (poniżej 10. centyla), warstwa miąższowa ścieńczała do 4 mm o niejednorodnej echogeniczności z ubytkami zarysu korowego (podejrzenie blizn), poszerzenie miedniczki nerkowej do 14 mm oraz kielichów do 9 mm, moczowód lewy poszerzony na całym przebiegu (megaureter do 11 mm) aż do ujścia pęcherzowego. Pęcherz moczowy o pogrubiałej ścianie. Co sugeruje ten obraz?",
        options: [
          {
            text: "Obraz wskazuje na odpływ pęcherzowo-moczowodowy wysokiego stopnia (VUR stopnia IV/V) z cechami nefropatii refluksowej (hipoplazja/bliznowacenie miąższu nerkowego) i wtórnym poszerzeniem układu kielichowo-miedniczkowego.",
            correct: true,
            feedback: "Doskonale! Poszerzenie moczowodu na całej długości (megaureter) połączone z dylatacją kielichów i ścieńczeniem miąższu nerki lewej silnie przemawia za odpływem pęcherzowo-moczowodowym wysokiego stopnia (stopień IV lub V) oraz przewlekłym uszkodzeniem pozapalnym (nefropatia refluksowa)."
          },
          {
            text: "Jest to w 100% prawidłowy obraz nerki u 2-letniego dziecka.",
            correct: false,
            feedback: "Błąd: moczowód w warunkach prawidłowych nie jest widoczny w USG, a kielichy nie powinny być poszerzone."
          },
          {
            text: "Obraz jednoznacznie dowodzi guza Wilmsa (nerczaka płodowego).",
            correct: false,
            feedback: "Brak litej masy guzowatej; zmiany to poszerzenie dróg odprowadzających mocz i ścieńczenie miąższu."
          },
          {
            text: "To torbielowatość nerek typu dorosłego (ADPKD).",
            correct: false,
            feedback: "Brak licznych obustronnych torbieli w korze i rdzeniu."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Złoty standard diagnostyki – Cystouretrografia mikcyjna (CUM)",
        desc: "Po pełnym wyleczeniu zakażenia potwierdzonym ujemnym posiewem moczu kwalifikujesz dziewczynkę do cystouretrografii mikcyjnej (CUM). Pielęgniarka i rodzice pytają o warunki i technikę wykonania tego badania. Jakie instrukcje wydajesz?",
        scenario: "Po pełnym wyleczeniu zakażenia potwierdzonym ujemnym posiewem moczu kwalifikujesz dziewczynkę do cystouretrografii mikcyjnej (CUM). Pielęgniarka i rodzice pytają o warunki i technikę wykonania tego badania. Jakie instrukcje wydajesz?",
        options: [
          {
            text: "Badanie wykonuje się w jałowych warunkach po podaniu kontrastu przez cewnik do pęcherza; zdjęcia RTG wykonuje się podczas wypełniania pęcherza oraz obowiązkowo W CZASIE MIKCJI i po opróżnieniu; dziecko wymaga jałowego moczu i osłony przeciwbakteryjnej.",
            correct: true,
            feedback: "Prawidłowo! CUM jest złotym standardem rozpoznawania i klasyfikacji VUR. Kluczowe jest wykonanie zdjęć w fazie mikcji, ponieważ przy wzroście ciśnienia śródpęcherzowego dochodzi do masywnego zarzucania moczu ku górze. Badanie wolno wykonać tylko przy jałowym moczu, stosując profilaktykę antybiotykową (np. furagina/amoksycylina na 3 dni wokół badania), by zapobiec jatrogennej urosepsie."
          },
          {
            text: "Badanie wykonuje się bez cewnika, każąc 2-latce wypić 2 litry kontrastu do żołądka.",
            correct: false,
            feedback: "Błąd: kontrast do CUM podaje się bezpośrednio do pęcherza przez cewnik, nie doustnie!"
          },
          {
            text: "Zdjęcia wykonuje się wyłącznie przed mikcją, zakazując dziecku oddawania moczu.",
            correct: false,
            feedback: "Błąd: bez fazy mikcyjnej nie można ocenić refluksu mikcyjnego ani anatomii cewki moczowej."
          },
          {
            text: "CUM można bezpiecznie wykonać w szczycie gorączki 40°C i ropomoczu.",
            correct: false,
            feedback: "Kardynalny błąd! Cewnikowanie w aktywnej infekcji grozi ciężką urosepsą i wstrząsem septycznym."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Klasyfikacja VUR wg International Reflux Study in Children",
        desc: "W badaniu CUM radiolog stwierdza: po lewej stronie kontrast swobodnie cofa się do moczowodu, wypełnia znacznie poszerzony i kręty moczowód, rozciąga miedniczkę oraz balonowato poszerza kielichy nerkowe z całkowitym zatarciem sklepień kielichowych (fornices) i wygładzeniem brodawek nerkowych. Jaki stopień VUR rozpoznajesz wg międzynarodowej 5-stopniowej skali?",
        scenario: "W badaniu CUM radiolog stwierdza: po lewej stronie kontrast swobodnie cofa się do moczowodu, wypełnia znacznie poszerzony i kręty moczowód, rozciąga miedniczkę oraz balonowato poszerza kielichy nerkowe z całkowitym zatarciem sklepień kielichowych (fornices) i wygładzeniem brodawek nerkowych. Jaki stopień VUR rozpoznajesz wg międzynarodowej 5-stopniowej skali?",
        options: [
          {
            text: "Odpływ pęcherzowo-moczowodowy IV stopnia (VUR stopień IV); cechuje się wyraźnym poszerzeniem moczowodu z jego zagięciami/skrętem oraz poszerzeniem miedniczki i kielichów z zatarciem ostrych kątów sklepień.",
            correct: true,
            feedback: "Znakomicie! Klasyfikacja VUR (skala I-V): Stopień I – odpływ tylko do moczowodu bez poszerzenia; Stopień II – odpływ do UKM bez poszerzenia kielichów; Stopień III – mierne poszerzenie moczowodu i UKM z zachowanymi sklepieniami; Stopień IV – wyraźne poszerzenie i skrętność moczowodu oraz poszerzenie kielichów z zatarciem sklepień; Stopień V – olbrzymi kręty megaureter, balonowate rozdęcie kielichów i zanik brodawek nerkowych. Tutaj mamy typowy stopień IV."
          },
          {
            text: "Odpływ I stopnia, który nie wymaga żadnego postępowania.",
            correct: false,
            feedback: "W stopniu I kontrast dociera jedynie do moczowodu i nie dociera do kielichów."
          },
          {
            text: "Odpływ II stopnia o łagodnym przebiegu.",
            correct: false,
            feedback: "W stopniu II kielichy nerkowe mają prawidłowy kształt i brak jest ich poszerzenia."
          },
          {
            text: "Odpływ stopnia X w skali dziesięciostopniowej.",
            correct: false,
            feedback: "Klasyfikacja międzynarodowa VUR ma dokładnie 5 stopni (I-V)."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Ocena bliznowacenia miąższu nerek – Scyntygrafia DMSA",
        desc: "W celu oceny stopnia trwałego uszkodzenia kory nerek (bliznowacenia pozapalnego) planujesz scyntygrafię statyczną kwasem dimerkaptobursztynowym (99mTc-DMSA). Kiedy należy wykonać to badanie, aby wynik był miarodajny?",
        scenario: "W celu oceny stopnia trwałego uszkodzenia kory nerek (bliznowacenia pozapalnego) planujesz scyntygrafię statyczną kwasem dimerkaptobursztynowym (99mTc-DMSA). Kiedy należy wykonać to badanie, aby wynik był miarodajny?",
        options: [
          {
            text: "Po upływie minimum 4–6 miesięcy od ostatniego epizodu ostrego odmiedniczkowego zapalenia nerek (APN), aby odróżnić trwałą pozapalną bliznę korową od przejściowego ogniska ostrego nacieku zapalnego.",
            correct: true,
            feedback: "Doskonale! Klasyczne zagadnienie LEK: w ostrej fazie infekcji ubytek wychwytu DMSA odzwierciedla jedynie ostry obrzęk i niedokrwienie (tzw. acute lesion). Aby ocenić obecność trwałego uszkodzenia miąższu nerkowego (blizny pozapalnej / nefropatii refluksowej), scyntygrafię DMSA wykonuje się po co najmniej 4–6 miesiącach od zakażenia."
          },
          {
            text: "Natychmiast w trakcie gorączki w pierwszej dobie zakażenia.",
            correct: false,
            feedback: "Błąd: wykaże jedynie przejściowy naciek zapalny i nie pozwoli na ocenę trwałego bliznowacenia."
          },
          {
            text: "DMSA jest badaniem przeciwwskazanym u dzieci z refluksem.",
            correct: false,
            feedback: "Fałsz: DMSA jest złotym standardem oceny blizn miąższu nerkowego."
          },
          {
            text: "Badanie wykonuje się dopiero po ukończeniu 18. roku życia.",
            correct: false,
            feedback: "Opóźnienie badania o 16 lat uniemożliwiłoby zapobieżenie niewydolności nerek."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Przewlekła profilaktyka przeciwbakteryjna (CAP) – Zasady i dobór leku",
        desc: "Do czasu podjęcia decyzji o leczeniu zabiegowym dziewczynka wymaga zabezpieczenia przed kolejnymi epizodami APN niszczącymi nerkę. Jakie postępowanie profilaktyczne wdrażasz zgodnie z wytycznymi?",
        scenario: "Do czasu podjęcia decyzji o leczeniu zabiegowym dziewczynka wymaga zabezpieczenia przed kolejnymi epizodami APN niszczącymi nerkę. Jakie postępowanie profilaktyczne wdrażasz zgodnie z wytycznymi?",
        options: [
          {
            text: "Wdrażasz przewlekłą profilaktykę przeciwbakteryjną (CAP) w pojedynczej dawce wieczornej (1/3 do 1/4 dawki terapeutycznej); lekiem z wyboru jest nitrofurantoina (1-2 mg/kg mc. na noc) lub trimetoprim/kotrimoksazol (u dzieci >2-3 m.ż.).",
            correct: true,
            feedback: "Prawidłowo! Wskazania do przewlekłej profilaktyki przeciwbakteryjnej (CAP): VUR wysokiego stopnia (III–V), nawrotowe gorączkowe ZUM oraz obecność blizn nerkowych. Pojedyncza dawka podana na noc (gdy mocz najdłużej zalega w pęcherzu) hamuje namnażanie bakterii. Nitrofurantoina jest doskonałym lekiem profilaktycznym, gdyż osiąga wysokie stężenia w pęcherzu bez zaburzania flory jelitowej."
          },
          {
            text: "Podajesz gentamycynę domięśniowo codziennie przez 2 lata.",
            correct: false,
            feedback: "Błąd krytyczny! Aminoglikozydy są nefrotoksyczne i ototoksyczne, nie stosuje się ich w przewlekłej profilaktyce doustnej."
          },
          {
            text: "Zalecasz podawanie ciprofloksacyny 3 razy dziennie przez 12 miesięcy.",
            correct: false,
            feedback: "Chinolony są przeciwwskazane do przewlekłej profilaktyki u małych dzieci (artropatia, selekcja oporności)."
          },
          {
            text: "Całkowicie rezygnujesz z jakiejkolwiek profilaktyki mimo IV stopnia VUR.",
            correct: false,
            feedback: "Błąd zaniechania: u dziecka z VUR IV stopnia i bliznami kolejny epizod APN grozi utratą funkcji nerki."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Kwalifikacja do leczenia zabiegowego – Endoskopia vs Operacja otwarta",
        desc: "Dziewczynka ma VUR stopnia IV z widoczną w scyntygrafii DMSA redukcją funkcji nerki lewej do 32% oraz nawrotem gorączki mimo stosowania CAP (tzw. breakthrough infection). Konsultujący urolog dziecięcy omawia opcje leczenia zabiegowego. Jaka metoda jest obecnie metodą pierwszego wyboru o małej inwazyjności?",
        scenario: "Dziewczynka ma VUR stopnia IV z widoczną w scyntygrafii DMSA redukcją funkcji nerki lewej do 32% oraz nawrotem gorączki mimo stosowania CAP (tzw. breakthrough infection). Konsultujący urolog dziecięcy omawia opcje leczenia zabiegowego. Jaka metoda jest obecnie metodą pierwszego wyboru o małej inwazyjności?",
        options: [
          {
            text: "Zabieg endoskopowy z podśluzówkowym wstrzyknięciem substancji uszczelniającej ujście moczowodu (np. kwas hialuronowy z dekstranomerem - Deflux / procedura STING lub HIT); w razie niepowodzenia operacja przeszczepienia moczowodu (ureteroneocystostomia metodą Cohena).",
            correct: true,
            feedback: "Znakomicie! Współczesny standard leczenia VUR: metodą pierwszego rzutu u większości dzieci jest mało inwazyjna korekcja endoskopowa (STING - subureteric transurethral injection / HIT). Polega na wstrzyknięciu obojętnego żelu (Deflux) pod ujście moczowodu, co unosi ujście i przywraca mechanizm zastawkowy (skuteczność ~70-85%). W przypadku niepowodzenia lub skrajnych anomalii wykonuje się operację otwartą/laparoskopową reimplantacji moczowodu (metoda Cohena, Politano-Leadbettera)."
          },
          {
            text: "Natychmiastowa obustronna nefrostomia przezskórna utrzymywana do 18. roku życia.",
            correct: false,
            feedback: "Brak wskazań do okaleczającej nefrostomii przy braku ostrej urosepsy zaporowej."
          },
          {
            text: "Całkowite usunięcie pęcherza moczowego z wytworzeniem stomii.",
            correct: false,
            feedback: "Absurdalna i okaleczająca propozycja w łagodnej wadzie odpływu."
          },
          {
            text: "Ostrzyknięcie ujścia moczowodu płynną parafiną techniczną.",
            correct: false,
            feedback: "Toksyczne i niedopuszczalne."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Leczenie zaburzeń mikcji i defekacji (BBD) oraz profilaktyka nadciśnienia",
        desc: "Zabieg endoskopowy przebiegł pomyślnie. W kontrolnym CUM po 6 miesiącach potwierdzono całkowite ustąpienie refluksu. Rodzice zgłaszają jednak, że mała wypróżnia się co 3-4 dni ze zbitym stolcem, a w ciągu dnia zdarza jej się popuszczanie moczu. Jakie kompleksowe zalecenia wydajesz?",
        scenario: "Zabieg endoskopowy przebiegł pomyślnie. W kontrolnym CUM po 6 miesiącach potwierdzono całkowite ustąpienie refluksu. Rodzice zgłaszają jednak, że mała wypróżnia się co 3-4 dni ze zbitym stolcem, a w ciągu dzieci zdarza jej się popuszczanie moczu. Jakie kompleksowe zalecenia wydajesz?",
        options: [
          {
            text: "Rozpoznajesz zespół zaburzeń pęcherzowo-jelitowych (BBD - Bladder and Bowel Dysfunction); wdrażasz agresywne leczenie zaparć (makrogole/laktuloza, dieta bogatoresztkowa, trening toaletowy), regularne mikcje co 2-3h oraz okresową kontrolę ciśnienia tętniczego ze względu na ryzyko nadciśnienia naczyniowo-nerkowego.",
            correct: true,
            feedback: "Wybitnie! Zespół zaburzeń pęcherzowo-jelitowych (BBD) występuje u ponad 40% dzieci z VUR. Przepełniona odbytnica uciska pęcherz, powoduje niestabilność wypieracza i sprzyja wstępowaniu bakterii. Skuteczne leczenie zaparć to klucz do zapobiegania nawrotom ZUM! Ponadto obecność blizn korowych w nerce lewej rodzi ryzyko nadciśnienia tętniczego w mechanizmie hiperreninowym (nefropatia refluksowa) – ciśnienie krwi musi być mierzone na każdej wizycie."
          },
          {
            text: "Zakazujesz wypróżniania częściej niż raz w tygodniu.",
            correct: false,
            feedback: "Prowadziłoby to do nasilenia zaparć i urosepsy."
          },
          {
            text: "Zalecasz ograniczenie płynów do 200 ml na dobę, aby 'odciążyć nerkę'.",
            correct: false,
            feedback: "Odwodnienie pogłębia zaparcia i zagęszcza mocz, sprzyjając infekcjom."
          },
          {
            text: "Uznajesz, że problem zaparć nie ma żadnego związku z układem moczowym.",
            correct: false,
            feedback: "Błąd: oś pęcherzowo-odbytnicza ma fundamentalne znaczenie w urologii dziecięcej (BBD)."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 108: Popaciorkowcowe KZN (APSGN)
  // ==========================================
  await upgradeCase('108_popaciorkowcowe_kzn_apsgn.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena na SOR – 7-latek z obrzękami twarzy i ciemnym moczem o barwie 'cola'",
        desc: "Dyżurujesz w izbie przyjęć pediatrycznej. Matka zgłasza się z 7-letnim synem. Od 2 dni chłopiec ma wyraźnie obrzęknięte powieki (szczególnie rano), obrzęk twarzy i podudzi, a oddawany mocz przybrał ciemnobrunatną barwę 'popłuczyn mięsnych' lub 'coca-coli'. Ponadto dziecko oddaje go bardzo mało. Z wywiadu: 2.5 tygodnia temu chłopiec przebył wysokogorączkową anginę ropną z silnym bólem gardła, na którą brał amoksycylinę przez 3 dni (odstawioną po ustąpieniu gorączki). W badaniu: HR 92/min, ciśnienie tętnicze 138/88 mmHg (>95 centyla dla wieku), blada, ciastowato obrzęknięta twarz. Jaka jest Twoja wstępna diagnoza i badania CITO?",
        scenario: "Dyżurujesz w izbie przyjęć pediatrycznej. Matka zgłasza się z 7-letnim synem. Od 2 dni chłopiec ma wyraźnie obrzęknięte powieki (szczególnie rano), obrzęk twarzy i podudzi, a oddawany mocz przybrał ciemnobrunatną barwę 'popłuczyn mięsnych' lub 'coca-coli'. Ponadto dziecko oddaje go bardzo mało. Z wywiadu: 2.5 tygodnia temu chłopiec przebył wysokogorączkową anginę ropną z silnym bólem gardła, na którą brał amoksycylinę przez 3 dni (odstawioną po ustąpieniu gorączki). W badaniu: HR 92/min, ciśnienie tętnicze 138/88 mmHg (>95 centyla dla wieku), blada, ciastowato obrzęknięta twarz. Jaka jest Twoja wstępna diagnoza i badania CITO?",
        options: [
          {
            text: "Podejrzewasz ostre popaciorkowcowe kłębuszkowe zapalenie nerek (APSGN) przebiegające jako zespół nefrytyczny; zlecasz natychmiast badanie ogólne moczu z mikroskopową oceną osadu, mocznik, kreatyninę, elektrolity, składowe dopełniacza C3 i C4 oraz miano ASO.",
            correct: true,
            feedback: "Znakomicie! Klasyczny zespół nefrytyczny po infekcji paciorkowcowej (GAS): triada objawów – makrokrwiomocz (ciemny mocz o barwie coli), nadciśnienie tętnicze oraz obrzęki (retencja sodu i wody) i skąpomocz. Występuje po 1–3 tygodniach po zapaleniu gardła (lub 3–6 tygodni po liszajcu skóry). Badania C3, ASO i osad moczu są kluczowe dla potwierdzenia."
          },
          {
            text: "Rozpoznajesz zapalenie pęcherza moczowego i wypisujesz furaginę doustnie do domu.",
            correct: false,
            feedback: "Kardynalny błąd! Ciemny mocz, nadciśnienie tętnicze 138/88 mmHg i obrzęki twarzy to klasyczny zespół nefrytyczny, nie zwykłe zapalenie pęcherza!"
          },
          {
            text: "Stawiasz rozpoznanie kamicy nerkowej i kierujesz dziecko na pilną litotrypsję (ESWL).",
            correct: false,
            feedback: "Brak kolki nerkowej; obrzęki i nadciśnienie wskazują na uogólnione zapalenie kłębuszków."
          },
          {
            text: "Uznajesz, że barwa moczu wynika wyłącznie ze spożycia buraków i odsyłasz pacjenta.",
            correct: false,
            feedback: "Przeoczenie nadciśnienia tętniczego i obrzęków grozi encefalopatią nadciśnieniową i obrzękiem płuc."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Badanie ogólne moczu i osad – Różnicowanie kłębuszkowego źródła krwiomoczu",
        desc: "Laboratorium przekazuje wynik badania moczu: barwa brunatna, mętny, białko 1.2 g/l (podnerczycowe), w osadzie: erytrocyty gęsto zalegające pole widzenia, >80% erytrocytów dysmorficznych (wyługowanych i akantocytów) oraz liczne wałeczki erytrocytarne (czerwonokrwinkowe). Jak interpretujesz te cechy osadu?",
        scenario: "Laboratorium przekazuje wynik badania moczu: barwa brunatna, mętny, białko 1.2 g/l (podnerczycowe), w osadzie: erytrocyty gęsto zalegające pole widzenia, >80% erytrocytów dysmorficznych (wyługowanych i akantocytów) oraz liczne wałeczki erytrocytarne (czerwonokrwinkowe). Jak interpretujesz te cechy osadu?",
        options: [
          {
            text: "Obecność wałeczków erytrocytarnych oraz >80% wyługowanych, dysmorficznych krwinek czerwonych (akantocytów) jest patognomonicznym dowodem KŁĘBUSZKOWEGO pochodzenia krwawienia (glomerulonephritis).",
            correct: true,
            feedback: "Doskonale! Złota zasada nefrologii i częste pytanie LEK: erytrocyty pochodzące z kłębuszka nerkowego ulegają deformacji osmocentrycznej w cewkach (akantocyty, erytrocyty wyługowane/dysmorficzne >80%). Obecność wałeczków erytrocytarnych (odlewów cewek wypełnionych krwinkami zlepionymi białkiem Tamm-Horsfalla) w 100% potwierdza kłębuszkowe zapalenie nerek i wyklucza krwawienie z dolnych dróg moczowych (kamica, guz, uraz)."
          },
          {
            text: "Wynik świadczy o krwawieniu z cewki moczowej w przebiegu urazu mechanicznego.",
            correct: false,
            feedback: "W krwawieniu z dolnych dróg erytrocyty są izomorficzne (prawidłowe krążki), a wałeczki erytrocytarne NIE występują."
          },
          {
            text: "Wałeczki erytrocytarne są zjawiskiem fizjologicznym u dzieci w wieku szkolnym.",
            correct: false,
            feedback: "Wałeczki erytrocytarne zawsze świadczą o patologii kłębuszkowej."
          },
          {
            text: "Obecność białka 1.2 g/l wyklucza chorobę nerek.",
            correct: false,
            feedback: "Białkomocz podnerczycowy jest typowym elementem zespołu nefrytycznego."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Badania serologiczne – Układ dopełniacza C3 i miano ASO",
        desc: "Otrzymujesz wyniki badań immunologicznych: ASO (antystreptolizyna O): 850 IU/ml (norma <200 IU/ml). Składowa C3 dopełniacza: 22 mg/dl (znacznie obniżona, norma 90–180 mg/dl). Składowa C4 dopełniacza: 28 mg/dl (w normie). Kreatynina 1.1 mg/dl (podwyższona jak na wiek), mocznik 64 mg/dl. Jaka jest charakterystyka zmian składowych dopełniacza w APSGN?",
        scenario: "Otrzymujesz wyniki badań immunologicznych: ASO (antystreptolizyna O): 850 IU/ml (norma <200 IU/ml). Składowa C3 dopełniacza: 22 mg/dl (znacznie obniżona, norma 90–180 mg/dl). Składowa C4 dopełniacza: 28 mg/dl (w normie). Kreatynina 1.1 mg/dl (podwyższona jak na wiek), mocznik 64 mg/dl. Jaka jest charakterystyka zmian składowych dopełniacza w APSGN?",
        options: [
          {
            text: "Charakterystyczna jest przejściowa hipokomplementemia z selektywnym, głębokim spadkiem C3 (aktywacja drogi alternatywnej przez antygeny paciorkowcowe SpeB/NAPIr) przy prawidłowym C4; stężenie C3 samoistnie normalizuje się w ciągu 6–8 tygodni.",
            correct: true,
            feedback: "Wybitnie! To kluczowy fakt LEK: w APSGN dochodzi do aktywacji alternatywnej drogi dopełniacza – C3 gwałtownie spada (>90% chorych), podczas gdy C4 pozostaje prawidłowe lub tylko nieznacznie obniżone. Czas powrotu do normy: stężenie C3 NORMALIZUJE SIĘ W CIĄGU 6–8 TYGODNI. Brak normalizacji C3 po 8 tygodniach jest bezwzględnym wskazaniem do wykonania biopsji nerki w kierunku błoniasto-rozplemowego KZN (MPGN) lub tocznia (SLE)!"
          },
          {
            text: "W APSGN składowa C3 zawsze pozostaje podwyższona powyżej 300 mg/dl.",
            correct: false,
            feedback: "Błąd: C3 ulega gwałtownemu zużyciu (hipokomplementemia)."
          },
          {
            text: "Spadek C3 ma charakter nieodwracalny i wymaga comiesięcznych przetoczeń osocza.",
            correct: false,
            feedback: "C3 normalizuje się samoistnie w ciągu 6-8 tygodni w miarę wygasania procesu immunologicznego."
          },
          {
            text: "Miano ASO jest ujemne u 100% chorych po przebytej anginie.",
            correct: false,
            feedback: "W anginie paciorkowcowej ASO rośnie u >80% pacjentów; po zakażeniach skóry (liszajec) czulsza jest anty-DNaza B."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Wskazania do biopsji nerki – Czy jest konieczna na tym etapie?",
        desc: "Zaniepokojony ojciec chłopca przeczytał w internecie o biopsji nerki i żąda jej natychmiastowego wykonania u syna. Jakie stanowisko zajmujesz zgodnie ze standardami nefrologii dziecięcej?",
        scenario: "Zaniepokojony ojciec chłopca przeczytał w internecie o biopsji nerki i żąda jej natychmiastowego wykonania u syna. Jakie stanowisko zajmujesz zgodnie ze standardami nefrologii dziecięcej?",
        options: [
          {
            text: "Odmawiasz wykonania biopsji na tym etapie; w typowym obrazie APSGN (zespół nefrytyczny po infekcji GAS z obniżeniem C3 i wzrostem ASO) biopsja NIE JEST WSKAZANA; wskazaniami byłyby: skąpomocz/anuria >48h, gwałtownie postępujące KZN (RPGN), białkomocz nerczycowy lub utrzymywanie się niskiego C3 >8 tygodni.",
            correct: true,
            feedback: "Prawidłowo! Typowe ostre popaciorkowcowe KZN diagnozuje się i prowadzi klinicznie bez inwazyjnej biopsji nerki. Wskazania do biopsji nerki w zespole nefrytycznym to: gwałtowny spadek GFR (RPGN z półksiężycami), zespół nerczycowy, objawy choroby układowej (SLE), brak cech infekcji paciorkowcowej oraz brak normalizacji stężenia C3 po 6–8 tygodniach lub utrzymywanie się makrokrwiomoczu >4 tygodnie."
          },
          {
            text: "Zgadzasz się i zlecasz pilną obustronną otwartą biopsję nerek w znieczuleniu ogólnym.",
            correct: false,
            feedback: "Narażanie dziecka na powikłania krwotoczne bez wskazań klinicznych."
          },
          {
            text: "Biopsję wykonuje się rutynowo u każdego dziecka z krwiomoczem.",
            correct: false,
            feedback: "Błąd: krwiomocz kłębuszkowy po anginie to typowy APSGN o łagodnym samoograniczającym się przebiegu."
          },
          {
            text: "Biopsja nerki jest całkowicie zakazana u dzieci do 18. roku życia.",
            correct: false,
            feedback: "Biopsja jest standardową procedurą, ale wyłącznie przy ściśle określonych wskazaniach."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Leczenie ostrej fazy APSGN – Postępowanie objawowe",
        desc: "Młodszy lekarz proponuje natychmiastowe wdrożenie dożylnych pulsów metyloprednizolonu (sterydoterapia) oraz cyklofosfamidu, aby 'zahamować proces zapalny w kłębuszkach'. Jakie leczenie jest faktycznie wskazane w typowym APSGN?",
        scenario: "Młodszy lekarz proponuje natychmiastowe wdrożenie dożylnych pulsów metyloprednizolonu (sterydoterapia) oraz cyklofosfamidu, aby 'zahamować proces zapalny w kłębuszkach'. Jakie leczenie jest faktycznie wskazane w typowym APSGN?",
        options: [
          {
            text: "Odrzucasz sterydy i immunosupresję (brak wskazań i brak skuteczności w typowym APSGN); podstawą terapii jest leczenie objawowe: restrykcja sodu w diecie, ograniczenie podaży płynów (straty niewidzialne + diureza) oraz diuretyk pętlowy (furosemid) w celu zwalczenia retencji płynów i nadciśnienia.",
            correct: true,
            feedback: "Znakomicie! Klasyczne pytanie egzaminacyjne: typowe APSGN leczy się WYŁĄCZNIE OBJAWOWO. Nie stosuje się glikokortykosteroidów ani cytostatyków! Ponieważ obrzęki i nadciśnienie wynikają z pierwotnej retencji sodu i wody w nerce (tzw. overfilling), lekiem z wyboru jest furosemid i.v./p.o. oraz bezwzględne ograniczenie soli kuchennej i płynów. Antybiotykoterapię (penicylina) stosuje się tylko wtedy, gdy zakażenie paciorkowcowe jest nadal aktywne (np. w gardle/na skórze)."
          },
          {
            text: "Zalecasz wysokie dawki prednizonu (60 mg/m2/d) przez 6 miesięcy.",
            correct: false,
            feedback: "Błąd w sztuce: sterydy nie wpływają na przebieg APSGN, a wywołują jatrogenną chorobę Cushinga i nasilają nadciśnienie."
          },
          {
            text: "Podajesz 2 litry 0.9% NaCl w bolusie, aby 'przepłukać nerki z wałeczków'.",
            correct: false,
            feedback: "Kardynalny błąd! Pacjent ma retencję sodu i nadciśnienie – podanie soli wywoła ostry obrzęk płuc i niewydolność serca!"
          },
          {
            text: "Zlecasz podawanie preparatów żelaza w celu odbarwienia moczu.",
            correct: false,
            feedback: "Niedorzeczne i nieskuteczne."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Ostre powikłania kardiologiczne i neurologiczne – Encefalopatia nadciśnieniowa",
        desc: "W 12. godzinie hospitalizacji chłopiec skarży się na silny, pulsujący ból głowy, nudności, zaburzenia widzenia ('mroczki przed oczami') i staje się splątany. Ciśnienie tętnicze wynosi 155/102 mmHg. Jakie powikłanie rozpoznajesz i jak natychmiast reagujesz?",
        scenario: "W 12. godzinie hospitalizacji chłopiec skarży się na silny, pulsujący ból głowy, nudności, zaburzenia widzenia ('mroczki przed oczami') i staje się splątany. Ciśnienie tętnicze wynosi 155/102 mmHg. Jakie powikłanie rozpoznajesz i jak natychmiast reagujesz?",
        options: [
          {
            text: "Rozpoznajesz encefalopatię nadciśnieniową (stan nagły w nadciśnieniu / przełom nadciśnieniowy z zagrożeniem drgawkami i obrzękiem mózgu); natychmiast podajesz furosemid dożylnie oraz lek hipotensyjny o kontrolowanym działaniu (np. labetalol, urapidyl lub nikardypinę i.v.) celem ostrożnego obniżenia ciśnienia o maks. 20–25% w pierwszych godzinach.",
            correct: true,
            feedback: "Doskonale! Najgroźniejszym wczesnym powikłaniem APSGN jest encefalopatia nadciśnieniowa oraz ostra niewydolność lewokomorowa z obrzękiem płuc wskutek przewodnienia. Objawy neurologiczne (bóle głowy, zaburzenia widzenia, splątanie, drgawki) wynikają z przełamania autoregulacji krążenia mózgowego i obrzęku naczyniopochodnego. Wymaga to natychmiastowego podania diuretyku pętlowego i kontrolowanej infuzji hipotensyjnej (ostrożnie, bez nagłych spadków RR grożących niedokrwieniem mózgu)."
          },
          {
            text: "Podajesz podjęzykowo krople z nifedypiny o natychmiastowym uwalnianiu.",
            correct: false,
            feedback: "Kardynalny błąd! Krótkodziałająca nifedypina podjęzykowo jest bezwzględnie zakazana ze względu na niekontrolowane spadki RR, udary mózgu i zawały!"
          },
          {
            text: "Uznajesz, że to migrena dziecięca i podajesz paracetamol w czopku.",
            correct: false,
            feedback: "Przeoczenie przełomu nadciśnieniowego 155/102 mmHg grozi zgonem we wgłobieniu mózgu lub krwawieniem śródmózgowym."
          },
          {
            text: "Zalecasz natychmiastową kardiowersję elektryczną 200 J.",
            correct: false,
            feedback: "Pacjent ma rytm zatokowy i nadciśnienie, kardiowersja nie ma żadnego uzasadnienia."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Faza poprawy klinicznej i dynamika ustępowania objawów",
        desc: "Po 4 dobach intensywnego leczenia diuretykiem i restrykcji soli u chłopca pojawia się obfita diureza (faza poliurii). Obrzęki ustępują, masa ciała spada o 2.1 kg, a ciśnienie tętnicze normalizuje się do 102/65 mmHg. Mocz z ciemnobrunatnego staje się słomkowy, ale badanie paskowe nadal wykazuje erytrocyty (erytrocyturia). Matka pyta, jak długo mocz może być nieprawidłowy.",
        scenario: "Po 4 dobach intensywnego leczenia diuretykiem i restrykcji soli u chłopca pojawia się obfita diureza (faza poliurii). Obrzęki ustępują, masa ciała spada o 2.1 kg, a ciśnienie tętnicze normalizuje się do 102/65 mmHg. Mocz z ciemnobrunatnego staje się słomkowy, ale badanie paskowe nadal wykazuje erytrocyty (erytrocyturia). Matka pyta, jak długo mocz może być nieprawidłowy.",
        options: [
          {
            text: "Uspokajasz matkę i wyjaśniasz kalendarz ustępowania objawów: obrzęki i nadciśnienie ustępują w 1–2 tyg., makrokrwiomocz w 2–4 tyg., stężenie C3 normalizuje się po 6–8 tyg., natomiast mikroskopowy krwinkomocz (mikrohematuria) może utrzymywać się nawet przez 1–2 lata i nie świadczy o nawrocie.",
            correct: true,
            feedback: "Wybitnie! Klasyczna dynamika ustępowania APSGN (często sprawdzana na LEK): 1) Diureza powraca i obrzęki ustępują w ciągu kilku dni (do 1-2 tyg.); 2) Ciśnienie tętnicze normalizuje się w 2-3 tyg.; 3) Makroskopowy krwiomocz ustępuje w 2-4 tyg.; 4) C3 dopełniacza wraca do normy w 6-8 tyg.; 5) Białkomocz znika w ciągu 3-6 miesięcy; 6) Izolowany mikroskopowy krwinkomocz może utrzymywać się od 12 do nawet 24 miesięcy bez wpływu na doskonałe rokowanie odległe."
          },
          {
            text: "Informujesz, że utrzymywanie się erytrocytów w moczu po 4 dniach oznacza nieodwracalną marskość nerek i konieczność natychmiastowego przeszczepu.",
            correct: false,
            feedback: "Nieprawda i nieuzasadnione straszenie rodziny pacjenta."
          },
          {
            text: "Zalecasz natychmiastowe ponowne rozpoczęcie chemioterapii cyklofosfamidem.",
            correct: false,
            feedback: "Cyklofosfamid jest toksyczny i przeciwwskazany w ustępującym APSGN."
          },
          {
            text: "Zabraniasz dziecku chodzić do szkoły przez kolejne 10 lat.",
            correct: false,
            feedback: "Absurdalne zalecenie."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Wypis, rokowanie i różnica w zapobieganiu powikłaniom paciorkowcowym",
        desc: "Chłopiec zostaje wypisany w stanie ogólnym bardzo dobrym. Podczas rozmowy edukacyjnej matka pyta, dlaczego wczesna antybiotykoterapia anginy nie zapobiegła chorobie nerek i czy synowi grozi gorączka reumatyczna. Jak tłumaczysz te zależności zgodnie z EBM?",
        scenario: "Chłopiec zostaje wypisany w stanie ogólnym bardzo dobrym. Podczas rozmowy edukacyjnej matka pyta, dlaczego wczesna antybiotykoterapia anginy nie zapobiegła chorobie nerek i czy synowi grozi gorączka reumatyczna. Jak tłumaczysz te zależności zgodnie z EBM?",
        options: [
          {
            text: "Tłumaczysz, że leczenie penicyliną anginy paciorkowcowej skutecznie zapobiega gorączce reumatycznej, ale NIE ZAPOBIEGA popaciorkowcowemu KZN (APSGN); rokowanie u dzieci jest jednak doskonałe (>95-98% całkowitych wyleczeń), a w planie kontroli kluczowe jest oznaczenie C3 za 6-8 tygodni oraz okresowe badanie moczu i RR.",
            correct: true,
            feedback: "Doskonale! To fundamentalny pewniak egzaminacyjny LEK: leczenie antybiotykiem anginy paciorkowcowej (nawet natychmiastowe podanie penicyliny) NIE zapobiega rozwojowi ostrego popaciorkowcowego kłębuszkowego zapalenia nerek (kompleksy immunologiczne z udziałem antygenów SpeB/NAPIr powstają bardzo wcześnie), podczas gdy w 100% zapobiega gorączce reumatycznej! Rokowanie u dzieci z APSGN jest znakomite – pełne wyleczenie u ponad 95% chorych."
          },
          {
            text: "Informujesz, że podanie antybiotyku w anginie w 100% chroni przed chorobami nerek, a lekarz POZ popełnił błąd kryminalny.",
            correct: false,
            feedback: "Fałsz medyczny: antybiotykoterapia nie eliminuje ryzyka APSGN."
          },
          {
            text: "Zalecasz usunięcie obu migdałków podniebiennych w trybie natychmiastowym w dniu wypisu.",
            correct: false,
            feedback: "Tonsillektomia nie ma wskazań po pierwszym epizodzie APSGN i nie chroni przed szczepami nefrytogennymi liszajca."
          },
          {
            text: "Zalecasz przewlekłe comiesięczne iniekcje penicyliny krystalicznej przez 20 lat.",
            correct: false,
            feedback: "Taka profilaktyka (Debecylina) dotyczy gorączki reumatycznej, a nie przebytego APSGN."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 109: Wodonercze wrodzone (UPJO)
  // ==========================================
  await upgradeCase('109_wodonercze_wrodzone_upjo.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena – 3-miesięczne niemowlę z wodonerczem wykrytym prenatalnie",
        desc: "Do poradni urologii dziecięcej zgłaszają się rodzice z 3-miesięcznym chłopcem. W badaniu USG płodu w 32. tygodniu ciąży stwierdzono poszerzenie układu kielichowo-miedniczkowego nerki lewej (APD 12 mm). Dziecko urodziło się o czasie, przybiera na wadze, nie gorączkowało, a mocz oddaje swobodnie. W badaniu przedmiotowym brzuch jest miękki, ale w lewym śródbrzuszu/podżebrzu wyczuwasz gładki, elastyczny, niebolesny opór. Jakie jest Twoje natychmiastowe postępowanie diagnostyczne?",
        scenario: "Do poradni urologii dziecięcej zgłaszają się rodzice z 3-miesięcznym chłopcem. W badaniu USG płodu w 32. tygodniu ciąży stwierdzono poszerzenie układu kielichowo-miedniczkowego nerki lewej (APD 12 mm). Dziecko urodziło się o czasie, przybiera na wadze, nie gorączkowało, a mocz oddaje swobodnie. W badaniu przedmiotowym brzuch jest miękki, ale w lewym śródbrzuszu/podżebrzu wyczuwasz gładki, elastyczny, niebolesny opór. Jakie jest Twoje natychmiastowe postępowanie diagnostyczne?",
        options: [
          {
            text: "Zlecasz pilne USG nerek i dróg moczowych z dokładnym pomiarem wymiaru przednio-tylnego miedniczki nerkowej (APD), grubości miąższu i oceny moczowodów oraz badanie ogólne moczu i posiew moczu.",
            correct: true,
            feedback: "Znakomicie! Wrodzone wodonercze (często rozpoznawane prenatalnie) wymaga weryfikacji ultrasonograficznej po porodzie (optymalnie po 48-72 h życia, gdy mija przejściowe odwodnienie noworodkowe, oraz kontroli w 1-3. miesiącu życia). Pomiar APD (anteroposterior diameter), zróżnicowanie kielichów i ocena moczowodu pozwalają zróżnicować przeszkodę na poziomie połączenia miedniczkowo-moczowodowego (UPJO) od odpływu VUR lub megaureteru."
          },
          {
            text: "Kwalifikujesz dziecko do natychmiastowej nefrektomii w dniu zgłoszenia bez żadnych badań.",
            correct: false,
            feedback: "Kardynalny błąd okaleczający: większość łagodnych poszerzeń miedniczki ustępuje samoistnie, a nerki z wodonerczem mają potencjał regeneracyjny."
          },
          {
            text: "Uznajesz, że wodonercze u niemowląt to norma i zalecasz wizytę za 18 lat.",
            correct: false,
            feedback: "Błąd zaniechania: nieleczone ciężkie wodonercze zaporowe prowadzi do całkowitego zaniku kory nerki."
          },
          {
            text: "Wykonujesz natychmiastowe nakłucie odbarczające nerki grubą igłą przez powłoki brzuszne w gabinecie.",
            correct: false,
            feedback: "Niebezpieczne postępowanie obarczone ryzykiem krwawienia, perforacji jelita i zakażenia."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Badanie ultrasonograficzne – Cechy przeszkody UPJO",
        desc: "Radiolog wykonuje USG nerek: Nerka prawa prawidłowa (APD 3 mm). Nerka lewa: miedniczka nerkowa rozdęta balowato do wymiaru przednio-tylnego APD 26 mm, kielichy nerkowe poszerzone do 11 mm (zaokrąglone), grubość kory nerki lewej zredukowana do 3.5 mm (ścieńczenie miąższu). Moczowód lewy na całej długości NIEWIDOCZNY (nieposzerzony). Jaka jest lokalizacja przeszkody w odpływie moczu?",
        scenario: "Radiolog wykonuje USG nerek: Nerka prawa prawidłowa (APD 3 mm). Nerka lewa: miedniczka nerkowa rozdęta balowato do wymiaru przednio-tylnego APD 26 mm, kielichy nerkowe poszerzone do 11 mm (zaokrąglone), grubość kory nerki lewej zredukowana do 3.5 mm (ścieńczenie miąższu). Moczowód lewy na całej długości NIEWIDOCZNY (nieposzerzony). Jaka jest lokalizacja przeszkody w odpływie moczu?",
        options: [
          {
            text: "Zwężenie połączenia miedniczkowo-moczowodowego (Ureteropelvic Junction Obstruction - UPJO); rozdęta miedniczka i kielichy przy wąskim, nieposzerzonym moczowodzie jednoznacznie lokalizują przeszkodę na granicy miedniczki i moczowodu.",
            correct: true,
            feedback: "Doskonale! To klasyczna cecha UPJO: rozdęcie miedniczki (hydronephrosis) bez poszerzenia moczowodu (brak megaureteru). Gdyby moczowód był poszerzony, przeszkoda znajdowałaby się na poziomie połączenia moczowodowo-pęcherzowego (UVJO) lub w cewce moczowej (zastawka cewki tylnej PUV). UPJO jest najczęstszą wadą zaporową układu moczowego u dzieci."
          },
          {
            text: "Zastawka cewki tylnej (PUV) u niemowlęcia.",
            correct: false,
            feedback: "Zastawka cewki tylnej daje OBUSTURONNE wodonercze, obustronne poszerzenie moczowodów oraz rozdęty pęcherz moczowy o pogrubiałej ścianie."
          },
          {
            text: "Zwężenie ujścia zewnętrznego cewki moczowej.",
            correct: false,
            feedback: "Dawałoby objawy obustronne i zaburzenia mikcji."
          },
          {
            text: "Odpływ pęcherzowo-moczowodowy I stopnia.",
            correct: false,
            feedback: "W refluksie mocz cofa się z pęcherza, moczowód byłby poszerzony."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Badanie czynnościowe – Scyntygrafia dynamiczna MAG3 z testem furosemidowym",
        desc: "Aby odróżnić anatomiczną przeszkodę zaporową od wiotkości miedniczki oraz ocenić ułamkową funkcję wydalniczą nerki lewej (DRF), planujesz scyntygrafię radioizotopową. Jakie badanie jest złotym standardem?",
        scenario: "Aby odróżnić anatomiczną przeszkodę zaporową od wiotkości miedniczki oraz ocenić ułamkową funkcję wydalniczą nerki lewej (DRF), planujesz scyntygrafię radioizotopową. Jakie badanie jest złotym standardem?",
        options: [
          {
            text: "Scyntygrafia dynamiczna z użyciem 99mTc-MAG3 (merkaptoacetylo-triglicyna) połączona z testem furosemidowym (protokół diuretyczny F+20 lub F-15).",
            correct: true,
            feedback: "Prawidłowo! Renografia dynamiczna 99mTc-MAG3 jest badaniem z wyboru w wodonerczu u dzieci. MAG3 jest aktywnie wydalany przez cewki nerkowe (doskonały u niemowląt z niedojrzałą filtracją kłębuszkową). Podanie furosemidu (protokół F+20: diuretyk w 20. minucie) wywołuje gwałtowny wzrost przepływu moczu, co pozwala obiektywnie odróżnić rzeczywiste zwężenie organiczne od nieistotnego poszerzenia atonicznego."
          },
          {
            text: "Scyntygrafia statyczna DMSA w pojedynczym rzucie.",
            correct: false,
            feedback: "DMSA ocenia tylko miąższ i blizny (badanie statyczne), nie ocenia dynamiki odpływu moczu z miedniczki!"
          },
          {
            text: "Tomografia komputerowa całego ciała z potrójną dawką kontrastu.",
            correct: false,
            feedback: "Nieuzasadniona wysoka dawka promieniowania i nefrotoksyczność kontrastu u 3-miesięcznego dziecka."
          },
          {
            text: "Połyk barytowy przewodu pokarmowego.",
            correct: false,
            feedback: "Baryt podaje się do diagnostyki przewodu pokarmowego, nie ma związku z nerkami."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Interpretacja krzywej renograficznej i ułamkowej funkcji nerek (DRF)",
        desc: "Otrzymujesz wynik renografii MAG3: Nerka prawa: krzywa prawidłowa, szybkie wypłukiwanie znacznika po furosemidzie (T1/2 <10 min), ułamkowa funkcja nerki prawej DRF 66%. Nerka lewa: krzywa stale narastająca (zaporowa), brak spadku aktywności po podaniu furosemidu (T1/2 >20 min), ułamkowa funkcja nerki lewej DRF 34%. Jak interpretujesz ten wynik?",
        scenario: "Otrzymujesz wynik renografii MAG3: Nerka prawa: krzywa prawidłowa, szybkie wypłukiwanie znacznika po furosemidzie (T1/2 <10 min), ułamkowa funkcja nerki prawej DRF 66%. Nerka lewa: krzywa stale narastająca (zaporowa), brak spadku aktywności po podaniu furosemidu (T1/2 >20 min), ułamkowa funkcja nerki lewej DRF 34%. Jak interpretujesz ten wynik?",
        options: [
          {
            text: "Potwierdzasz istotną przeszkodę zaporową UPJO z upośledzeniem funkcji nerki lewej: krzywa zaporowa (T1/2 >20 min) oraz spadek wydolności nerki lewej poniżej 40% (DRF 34%) to jednoznaczny dowód dekompensacji narządu.",
            correct: true,
            feedback: "Doskonale! Kryteria rozpoznania istotnej przeszkody w renografii: 1) Czas półtrwania eliminacji znacznika po furosemidzie T1/2 >20 minut (świadczy o bloku mechanicznym); 2) Ułamkowa czynność nerki (Differential Renal Function - DRF) poniżej 40% (norma dla jednej nerki to 45–55%). Wynik DRF 34% wskazuje na postępującą utratę nefronów i konieczność interwencji."
          },
          {
            text: "Wynik dowodzi całkowitego braku przeszkody w odpływie moczu.",
            correct: false,
            feedback: "Błąd: krzywa zaporowa i T1/2 >20 min to klasyczny dowód blokady odpływu."
          },
          {
            text: "Nerka lewa funkcjonuje w 100%, a chora jest nerka prawa.",
            correct: false,
            feedback: "Nerka lewa ma DRF 34%, co oznacza znaczne upośledzenie wydalania po stronie lewej."
          },
          {
            text: "Brak reakcji na furosemid wynika ze zniszczenia pęcherza moczowego.",
            correct: false,
            feedback: "Zastój dotyczy miedniczki nerki lewej, pęcherz jest prawidłowy."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Wskazania do leczenia operacyjnego w UPJO",
        desc: "Kiedy wodonercze wrodzone wymaga interwencji chirurgicznej? Na podstawie jakich kryteriów kwalifikujesz tego 3-miesięcznego chłopca do operacji?",
        scenario: "Kiedy wodonercze wrodzone wymaga interwencji chirurgicznej? Na podstawie jakich kryteriów kwalifikujesz tego 3-miesięcznego chłopca do operacji?",
        options: [
          {
            text: "Kwalifikujesz dziecko do leczenia operacyjnego ze względu na: ułamkową czynność nerki DRF <40%, narastający wymiar APD (>20 mm z rozdęciem kielichów), ścieńczenie miąższu nerkowego oraz potwierdzoną krzywą zaporową w scyntygrafii MAG3.",
            correct: true,
            feedback: "Znakomicie! Bezwzględne wskazania do leczenia operacyjnego UPJO wg wytycznych ESPU/PTU: 1) Upośledzenie ułamkowej funkcji nerki (DRF <40%); 2) Udokumentowany w badaniach kontrolnych spadek DRF o >10%; 3) Znaczne poszerzenie APD (>20–30 mm) ze ścieńczeniem miąższu; 4) Objawowe wodonercze (nawracające ZUM, ból, wyczuwalny guz brzucha). Ten pacjent spełnia kryteria operacyjne."
          },
          {
            text: "Operacja jest wskazana tylko wtedy, gdy nerka przestanie pracować w 0%.",
            correct: false,
            feedback: "Czekanie na całkowite zniszczenie nerki uniemożliwia jej uratowanie."
          },
          {
            text: "Każde poszerzenie miedniczki powyżej 5 mm musi być operowane w 1. dobie życia.",
            correct: false,
            feedback: "Nieprawda: małe poszerzenia (APD 5-10 mm) w większości ulegają samoistnej regresji."
          },
          {
            text: "Wskazaniem do operacji jest wyłącznie płeć żeńska pacjenta.",
            correct: false,
            feedback: "UPJO występuje 2-krotnie częściej u chłopców, płeć nie decyduje o wskazaniach."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Złoty standard chirurgiczny – Pieloplastyka Hynesa-Andersona",
        desc: "Konsultujący urolog dziecięcy omawia z rodzicami technikę planowanego zabiegu rekonstrukcyjnego. Jaka metoda operacyjna jest złotym standardem leczenia zwężenia połączenia miedniczkowo-moczowodowego?",
        scenario: "Konsultujący urolog dziecięcy omawia z rodzicami technikę planowanego zabiegu rekonstrukcyjnego. Jaka metoda operacyjna jest złotym standardem leczenia zwężenia połączenia miedniczkowo-moczowodowego?",
        options: [
          {
            text: "Pieloplastyka sposobem Hynesa-Andersona (resekcyjna plastyka miedniczki nerkowej): wycięcie zwężonego, zmienionego chorobowo fragmentu połączenia miedniczkowo-moczowodowego, redukcja nadmiaru rozdętej miedniczki i wykonanie szerokiego, lejkowatego zespolenia miedniczkowo-moczowodowego.",
            correct: true,
            feedback: "Prawidłowo! Pieloplastyka z rozłączeniem (dismembered pyeloplasty) metodą Hynesa-Andersona (otwarta, laparoskopowa lub z asystą robota) jest złotym standardem o skuteczności przekraczającej 95%. Polega na resekcji adynamicznego zwężenia, odcięciu nadmiaru ściany miedniczki i precyzyjnym zespoleniu jej z rozszerzonym podłużnie moczowodem, zazwyczaj z czasowym pozostawieniem szyny moczowodowej (stentu Double-J)."
          },
          {
            text: "Całkowite wycięcie nerki lewej (nefrektomia radykalna).",
            correct: false,
            feedback: "Błąd w sztuce: nerka ma 34% funkcji i po odbarczeniu odzyska wydolność, nefrektomia to okaleczenie."
          },
          {
            text: "Zespolenie miedniczki nerkowej z żołądkiem.",
            correct: false,
            feedback: "Niedorzeczne i śmiertelnie niebezpieczne."
          },
          {
            text: "Podwiązanie moczowodu lewego grubą nicią jedwabną.",
            correct: false,
            feedback: "Doprowadziłoby do całkowitej tamponady moczowej i pęknięcia nerki."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Prowadzenie wczesnego okresu pooperacyjnego i rola stentu Double-J",
        desc: "Zabieg pieloplastyki laparoskopowej przebiegł bez powikłań. W drogach moczowych pozostawiono cewnik podwójnie zagięty (stent wewnętrzny Double-J / JJ). Pielęgniarka odcinkowa pyta o zasady opieki pooperacyjnej. Jakie wytyczne wydajesz?",
        scenario: "Zabieg pieloplastyki laparoskopowej przebiegł bez powikłań. W drogach moczowych pozostawiono cewnik podwójnie zagięty (stent wewnętrzny Double-J / JJ). Pielęgniarka odcinkowa pyta o zasady opieki pooperacyjnej. Jakie wytyczne wydajesz?",
        options: [
          {
            text: "Monitorowanie diurezy i barwy moczu, profilaktyczna antybiotykoterapia osłonowa (cefalosporyna/amoksycylina z kwasem klawulanowym), kontrola objawów zakażenia i zaplanowanie usunięcia stentu JJ po 4–6 tygodniach w krótkim znieczuleniu.",
            correct: true,
            feedback: "Doskonale! Szyna Double-J zabezpiecza szczelność i drożność świeżo wykonanego zespolenia, chroni przed przeciekiem moczu i bliznowatym zwężeniem w miejscu szwów. Wymaga profilaktyki antybiotykowej na czas obecności ciała obcego w drogach moczowych. Stent usuwa się zazwyczaj po 4–6 tygodniach na drodze cystoskopii."
          },
          {
            text: "Nakazujesz natychmiastowe wyrwanie stentu przez pociągnięcie na sali wybudzeń w 1. godzinie po operacji.",
            correct: false,
            feedback: "Kardynalny błąd! Rozerwałoby to świeże zespolenie i wywołało krwotok oraz zacieki moczowe w przestrzeni zaotrzewnowej."
          },
          {
            text: "Zalecasz pozostawienie stentu JJ bezterminowo na 25 lat.",
            correct: false,
            feedback: "Stent pozostawiony zbyt długo ulega inkrustacji solami moczowymi (zwapnieniu), blokuje odpływ i staje się niemożliwy do usunięcia bez powikłań."
          },
          {
            text: "Zakazujesz podawania jakichkolwiek płynów przez pierwsze 2 tygodnie po operacji.",
            correct: false,
            feedback: "Doprowadziłoby to do ciężkiego wstrząsu hipowolemicznego u 3-miesięcznego niemowlęcia."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Długoterminowy follow-up i kryteria sukcesu terapeutycznego",
        desc: "Stent JJ został bezpiecznie usunięty po 5 tygodniach. Dziecko czuje się świetnie, mocz jest jałowy. Rodzice pytają, jak będzie wyglądał schemat kontroli i czy nerka wróci do prawidłowych rozmiarów.",
        scenario: "Stent JJ został bezpiecznie usunięty po 5 tygodniach. Dziecko czuje się świetnie, mocz jest jałowy. Rodzice pytają, jak będzie wyglądał schemat kontroli i czy nerka wróci do prawidłowych rozmiarów.",
        options: [
          {
            text: "Wyjaśniasz, że poszerzenie miedniczki zmniejsza się powoli w ciągu wielu miesięcy; planujesz kontrolne USG nerek po 3, 6 i 12 miesiącach oraz kontrolną scyntygrafię MAG3 po roku; sukces operacji definiuje się jako stabilizację lub poprawę funkcji nerki (DRF) oraz swobodny drenaż moczu.",
            correct: true,
            feedback: "Wybitnie! Kluczowe informacje dla rodziców: anatomiczne poszerzenie miedniczki po udanej pieloplastyce nie znika natychmiast – miedniczka ma przewlekle rozciągniętą ścianę i jej wymiar zmniejsza się powoli w ciągu 1-2 lat. Najważniejszym kryterium sukcesu pooperacyjnego jest: 1) Poprawa lub stabilizacja ułamkowej funkcji nerki (DRF); 2) Ustąpienie cech zaporowych w scyntygrafii MAG3 (T1/2 <15-20 min); 3) Brak nawrotów zakażeń układu moczowego."
          },
          {
            text: "Uznajesz, że jeśli w USG po tygodniu miedniczka ma 12 mm, operacja się nie udała i należy nerkę wyciąć.",
            correct: false,
            feedback: "Błąd: miedniczka potrzebuje miesięcy na przemodelowanie po odbarczeniu przeszkody."
          },
          {
            text: "Zalecasz comiesięczne wykonywanie tomografii komputerowej z kontrastem przez całe dzieciństwo.",
            correct: false,
            feedback: "Szkodliwe narażenie na promieniowanie, USG i scyntygrafia MAG3 w zupełności wystarczają."
          },
          {
            text: "Zwalniasz dziecko z jakichkolwiek wizyt kontrolnych na zawsze.",
            correct: false,
            feedback: "Błąd zaniechania: u dzieci rozwijających się drogi moczowe rosną i wymagają okresowej kontroli urologicznej."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 110: Odra (Morbilli)
  // ==========================================
  await upgradeCase('110_odra_morbilli.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena w izbie przyjęć – 4-letnie nieszczepione dziecko z triadą 3C",
        desc: "Dyżurujesz w izbie przyjęć szpitala zakaźnego. Rodzice przyprowadzają 4-letniego chłopca. Dziecko nie było szczepione przeciw chorobom zakaźnym (odmowa szczepień MMR ze względów światopoglądowych). Od 4 dni chłopiec ma narastającą gorączkę do 40.1°C, męczący, szczekający, suchy kaszel, obfity katar śluzowo-ropny oraz silne zapalenie spojówek ze światłowstrętem i obrzękiem powiek (tzw. 'zapłakana twarz'). Od wczoraj rodzice zauważyli pierwsze zmiany wysypkowe na skórze głowy. W badaniu: HR 140/min, temp. 40.0°C, dziecko apatyczne, obfita wydzielina z nosa, przekrwione spojówki ze łzawieniem. Jakie podejrzenie wysuwasz na podstawie triady 3C?",
        scenario: "Dyżurujesz w izbie przyjęć szpitala zakaźnego. Rodzice przyprowadzają 4-letniego chłopca. Dziecko nie było szczepione przeciw chorobom zakaźnym (odmowa szczepień MMR ze względów światopoglądowych). Od 4 dni chłopiec ma narastającą gorączkę do 40.1°C, męczący, szczekający, suchy kaszel, obfity katar śluzowo-ropny oraz silne zapalenie spojówek ze światłowstrętem i obrzękiem powiek (tzw. 'zapłakana twarz'). Od wczoraj rodzice zauważyli pierwsze zmiany wysypkowe na skórze głowy. W badaniu: HR 140/min, temp. 40.0°C, dziecko apatyczne, obfita wydzielina z nosa, przekrwione spojówki ze łzawieniem. Jakie podejrzenie wysuwasz na podstawie triady 3C?",
        options: [
          {
            text: "Podejrzewasz odrę (Morbilli / Measles); klasyczny okres zwiastunowy (prodromalny) z wysoką gorączką i triadą '3C' (Cough - kaszel, Coryza - katar, Conjunctivitis - zapalenie spojówek ze światłowstrętem) u dziecka nieszczepionego.",
            correct: true,
            feedback: "Znakomicie! Klasyczny obraz odry: faza prodromalna (3–4 dni) cechuje się wysoką gorączką (często >39–40°C) oraz triadą 3C: Coryza (nieżyt nosa), Cough (męczący suchy kaszel) i Conjunctivitis (zapalenie spojówek ze światłowstrętem i obrzękiem powiek, dające charakterystyczną 'zapłakaną twarz'). Brak szczepienia MMR dramatycznie podnosi prawdopodobieństwo zachorowania."
          },
          {
            text: "Rozpoznajesz zwykłą alergiczną reakcję na pyłki traw i przepisujesz krople do nosa.",
            correct: false,
            feedback: "Gorączka 40°C, apatia i suchy kaszel wykluczają prosty katar sienny."
          },
          {
            text: "Stawiasz rozpoznanie ospy wietrznej z powodu obecności gorączki.",
            correct: false,
            feedback: "Ospa nie przebiega z ciężkim nieżytem dróg oddechowych (brak triady 3C) i daje wykwity pęcherzykowe."
          },
          {
            text: "Podejrzewasz zatrucie salicylanami i zalecasz płukanie żołądka.",
            correct: false,
            feedback: "Brak danych z wywiadu, obecny typowy zespół kataralny zakaźny."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Badanie przedmiotowe jamy ustnej – Patognomoniczne plamki Koplika",
        desc: "Prosisz chłopca o otwarcie ust i oświetlasz latarką diagnostyczną błonę śluzową policzków. Jaki objaw patognomoniczny dla odry starasz się uwidocznić?",
        scenario: "Prosisz chłopca o otwarcie ust i oświetlasz latarką diagnostyczną błonę śluzową policzków. Jaki objaw patognomoniczny dla odry starasz się uwidocznić?",
        options: [
          {
            text: "Plamki Koplika – małe, białawe lub szarobiałe grudki otoczone czerwoną obwódką na błonie śluzowej policzków na wysokości dolnych zębów trzonowych i przedtrzonowych (przypominające 'ziarenka piasku na czerwonym tle').",
            correct: true,
            feedback: "Doskonale! Plamki Koplika są objawem patognomonicznym odry! Pojawiają się na 24–48 godzin przed wystąpieniem wysypki skórnej i znikają w ciągu 1–2 dni po jej pojawieniu się. Ich obecność u dziecka z nieżytem i gorączką pozwala na 100% postawienie pewnego rozpoznania klinicznego jeszcze przed pełnym wysiewem osutki."
          },
          {
            text: "Płomienny malinowy język z powiększonymi brodawkami.",
            correct: false,
            feedback: "Język malinowy jest objawem płonicy (szkarlatyny) lub choroby Kawasakiego, nie odry."
          },
          {
            text: "Afty Mikulicza i owrzodzenia dna jamy ustnej.",
            correct: false,
            feedback: "To zmiany w aftozie nawrotowej, nie mają związku z odrą."
          },
          {
            text: "Błony rzekome szarobrunatne krwawiące przy próbie oderwania.",
            correct: false,
            feedback: "To objaw błonicy (dyfterytu), a nie odry."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Ocena morfologii i rozkładu osutki odrowej",
        desc: "W 4. dobie gorączki pojawia się pełnoobjawowa wysypka. Jakie cechy morfologiczne i jaki kierunek szerzenia się osutki są charakterystyczne dla odry?",
        scenario: "W 4. dobie gorączki pojawia się pełnoobjawowa wysypka. Jakie cechy morfologiczne i jaki kierunek szerzenia się osutki są charakterystyczne dla odry?",
        options: [
          {
            text: "Wysypka plamisto-grudkowa, zlewająca się, o barwie ciemnoczerwonej/purpurowej, o ZSTĘPUJĄCYM kierunku: rozpoczyna się za uszami i na czole przy linii włosów, schodzi na twarz, szyję, tułów i kończyny; ustępuje z brunatnym przebarwieniem i drobnopłatkowym łuszczeniem.",
            correct: true,
            feedback: "Znakomicie! Klasyczny rozkład osutki odrowej: 1) Początek za uszami i na linii włosów; 2) Schodzi w dół (zstępująca): twarz -> szyja -> klatka piersiowa -> tułów -> kończyny (w 3. dobie obejmuje stopy); 3) Wykwity są gruboplamisto-grudkowe, mają tendencję do zlewania się (pozostawiając pasma zdrowej skóry); 4) Ustępowanie w tej samej kolejności z pozostawieniem charakterystycznych brunatnych przebarwień (przebarwienia hemosyderynowe) i łuszczenia naskórka."
          },
          {
            text: "Drobnoplamista wysypka 'papier ścierny' z wolnym trójkątem Fiłatowa.",
            correct: false,
            feedback: "To opis wysypki w płonicy (szkarlatynie)."
          },
          {
            text: "Pęcherzyki z płynem 'krople rosy' na rumieniowym podłożu.",
            correct: false,
            feedback: "To opis wykwitów w ospie wietrznej."
          },
          {
            text: "Girlandowata, koronkowa wysypka na pośladkach i udach.",
            correct: false,
            feedback: "To cecha rumienia zakaźnego (parwowirus B19)."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Procedury epidemiologiczne i izolacja – Wyjątkowa zakaźność wirusa",
        desc: "Pielęgniarka pyta, w jakich warunkach należy umieścić pacjenta i jakie zawiadomienia są obowiązkowe. Jakie procedury epidemiczne natychmiast wdrażasz?",
        scenario: "Pielęgniarka pyta, w jakich warunkach należy umieścić pacjenta i jakie zawiadomienia są obowiązkowe. Jakie procedury epidemiczne natychmiast wdrażasz?",
        options: [
          {
            text: "Natychmiastowa izolacja powietrzno-kropelkowa w izolatce z podciśnieniem (wirus odry utrzymuje się w powietrzu do 2 godzin po wyjściu chorego; wskaźnik R0 = 12–18); personel w maskach FFP2/FFP3; obowiązkowe natychmiastowe zgłoszenie podejrzenia zachorowania do Państwowej Inspekcji Sanitarnej (PSSE) CITO.",
            correct: true,
            feedback: "Wybitnie! Wirus odry (Morbillivirus) jest jednym z najbardziej zakaźnych znanych patogenów ludzkich (R0 wynosi 12–18! Oznacza to, że 1 chory zaraża średnio 15–18 osób podatnych). Szerzy się drogą powietrzną i aerozolową. Wirus może unosić się w powietrzu w pomieszczeniu przez 2 godziny po opuszczeniu go przez pacjenta. Odra podlega natychmiastowemu zgłoszeniu do PSSE w ramach nadzoru epidemiologicznego WHO."
          },
          {
            text: "Pozostawienie dziecka na korytarzu w poczekalni ogólnej z innymi dziećmi bez maseczki.",
            correct: false,
            feedback: "Kardynalny błąd epidemiologiczny! Doprowadziłoby to do masowego ogniska epidemicznego odry na SOR."
          },
          {
            text: "Zgłoszenie do sanepidu dopiero po roku od wyleczenia.",
            correct: false,
            feedback: "Odra podlega zgłoszeniu w trybie natychmiastowym (do 24h)."
          },
          {
            text: "Wirus odry nie jest zakaźny i nie wymaga żadnej izolacji.",
            correct: false,
            feedback: "Fałsz: odra to jedna z najbardziej zaraźliwych chorób świata."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Potwierdzenie laboratoryjne – Diagnostyka serologiczna i molekularna",
        desc: "Zgodnie z wytycznymi WHO i NIZP-PZH każde podejrzenie odry wymaga weryfikacji laboratoryjnej. Jakie materiały biologiczne i jakie testy zlecasz?",
        scenario: "Zgodnie z wytycznymi WHO i NIZP-PZH każde podejrzenie odry wymaga weryfikacji laboratoryjnej. Jakie materiały biologiczne i jakie testy zlecasz?",
        options: [
          {
            text: "Oznaczenie swoistych przeciwciał przeciw wirusowi odry w klasie IgM w surowicy krwi (test ELISA) oraz pobranie wymazu z nosogardła lub próbki moczu do badania RT-PCR w celu wykrycia RNA wirusa odry.",
            correct: true,
            feedback: "Prawidłowo! Potwierdzenie zakażenia odrą opiera się na: 1) Wykryciu przeciwciał anty-odrowych w klasie IgM w surowicy (pojawiają się w ciągu 3 dni od wystąpienia wysypki i utrzymują do 4-8 tygodni); 2) Wykryciu materiału genetycznego wirusa (RT-PCR) z wymazu z gardła/nosogardła lub z moczu (wirus jest wydalany z moczem przez wiele dni)."
          },
          {
            text: "Posiew bakteriologiczny krwi na podłożu Chapmana.",
            correct: false,
            feedback: "Odra to infekcja wirusowa, posiewy bakteryjne nie wykryją wirusa."
          },
          {
            text: "Biopsja skóry ze zmianą plamisto-grudkową do badania histopatologicznego.",
            correct: false,
            feedback: "Inwazyjna i zbędna, diagnostyka opiera się na serologii i RT-PCR."
          },
          {
            text: "Test ujemny na boreliozę potwierdza odrę.",
            correct: false,
            feedback: "Brak związku logicznego."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Farmakoterapia celowana wg WHO – Rola witaminy A",
        desc: "Młodszy rezydent pyta o leczenie przeciwwirusowe i leki wspomagające. Jaki preparat witaminowy jest BEZWZGLĘDNIE ZALECANY przez WHO i wytyczne u każdego dziecka z rozpoznaną odrą?",
        scenario: "Młodszy rezydent pyta o leczenie przeciwwirusowe i leki wspomagające. Jaki preparat witaminowy jest BEZWZGLĘDNIE ZALECANY przez WHO i wytyczne u każdego dziecka z rozpoznaną odrą?",
        options: [
          {
            text: "WITAMINA A (retinol) podawana doustnie w 2 dawkach w 1. i 2. dobie hospitalizacji (dawka zależna od wieku: dla 4-latka 200 000 IU/dobę); witamina A znacząco redukuje ryzyko powikłań płucnych, ślepoty i śmiertelności z powodu odry.",
            correct: true,
            feedback: "Doskonale! Klasyczne pytanie egzaminacyjne LEK i standard WHO: zakażenie wirusem odry prowadzi do gwałtownego wyczerpania zapasów witaminy A w ustroju (upośledzenie bariery nabłonkowej i odporności komórkowej). Suplementacja wysokich dawek witaminy A (doustnie w dwóch kolejnych dniach: <6 m.ż. 50 000 IU, 6–11 m.ż. 100 000 IU, >=12 m.ż. 200 000 IU) redukuje śmiertelność z powodu odry o ponad 50% oraz zapobiega powikłaniom ocznym (kseroftalmia, owrzodzenia rogówki, ślepota) i płucnym."
          },
          {
            text: "Dożylne wlewy witaminy C w dawce 50 gramów na dobę.",
            correct: false,
            feedback: "Brak dowodów naukowych (EBM) na skuteczność megadawek witaminy C."
          },
          {
            text: "Acyklowir w maksymalnej dawce dożylnej.",
            correct: false,
            feedback: "Acyklowir działa na wirusy herpes (HSV, VZV), nie wykazuje żadnej aktywności wobec paramyksowirusa odry."
          },
          {
            text: "Glikokortykosteroidy doustne w wysokich dawkach u każdego chorego.",
            correct: false,
            feedback: "Sterydy nasilają immunosupresję indukowaną odrą i zwiększają ryzyko śmiertelnych nadkażeń bakteryjnych."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Najczęstsze powikłania wczesne i przyczyny zgonu",
        desc: "W 6. dobie gorączka u chłopca nagle ponownie wzrasta do 40.5°C, pojawia się duszność, tachypnoe (RR 48/min), sinica okołowargowa, a osłuchowo nad polami płucnymi słyszalne są liczne trzeszczenia. Jakie jest najczęstsze powikłanie odry będące główną przyczyną zgonu?",
        scenario: "W 6. dobie gorączka u chłopca nagle ponownie wzrasta do 40.5°C, pojawia się duszność, tachypnoe (RR 48/min), sinica okołowargowa, a osłuchowo nad polami płucnymi słyszalne są liczne trzeszczenia. Jakie jest najczęstsze powikłanie odry będące główną przyczyną zgonu?",
        options: [
          {
            text: "Zapalenie płuc (odrowe olbrzymiokomórkowe zapalenie płuc Hechta lub wtórne bakteryjne zapalenie płuc wywołane przez S. pneumoniae, S. aureus lub H. influenzae); zapalenie płuc odpowiada za ponad 60–80% wszystkich zgonów związanych z odrą.",
            correct: true,
            feedback: "Znakomicie! Wirus odry wywołuje ciężką 'anergia odrową' (przemijający głęboki niedobór odporności komórkowej trwający tygodnie/miesiące). Najczęstszym powikłaniem i główną przyczyną zgonu u dzieci jest ZAPALENIE PŁUC – pierwotne wirusowe (z komórkami olbrzymimi Warthina-Finkeldeya) lub wtórne bakteryjne nadkażenie. Inne wczesne powikłania to ostre zapalenie ucha środkowego (najczęstsze ogólnie powikłanie) oraz ostre poinfekcyjne zapalenie mózgu (ADEM, 1 na 1000 zachorowań)."
          },
          {
            text: "Ostre zapalenie wyrostka robaczkowego jako główna przyczyna zgonu.",
            correct: false,
            feedback: "Może wystąpić z powodu obrzęku tkanki limfatycznej, ale nie jest główną przyczyną zgonów w odrze."
          },
          {
            text: "Zawał ściany dolnej serca u 4-latka.",
            correct: false,
            feedback: "Skrajnie nieprawdopodobne u dziecka."
          },
          {
            text: "Pęknięcie tętniaka aorty piersiowej.",
            correct: false,
            feedback: "Brak związku przyczynowo-skutkowego z odrą."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Odległe śmiertelne powikłanie neurologiczne – Podostre stwardniające zapalenie mózgu (SSPE)",
        desc: "Podczas rozmowy o profilaktyce i szczepieniach rodzice pytają o powikłania, które mogą ujawnić się po latach. O jakim nieuleczalnym, śmiertelnym powikłaniu odry informujesz rodziców zgodnie z wiedzą medyczną?",
        scenario: "Podczas rozmowy o profilaktyce i szczepieniach rodzice pytają o powikłania, które mogą ujawnić się po latach. O jakim nieuleczalnym, śmiertelnym powikłaniu odry informujesz rodziców zgodnie z wiedzą medyczną?",
        options: [
          {
            text: "Podostre stwardniające zapalenie mózgu (SSPE - Subacute Sclerosing Panencephalitis); występuje po 5–10 latach od przechorowania odry (ryzyko 1 na 1000–5000 zachorowań u dzieci zakażonych <2. r.ż.), ma charakter postępujący (otępienie, mioklonie, ataksja, spastyczność) i jest w 100% ŚMIERTELNE; jedyną ochroną jest szczepienie MMR.",
            correct: true,
            feedback: "Wybitnie! SSPE (zespół Dawsona) to jedno z najbardziej tragicznych pytań na LEK: jest to powolna, przewlekła encefalopatia wywołana przez zmutowany, przetrwały w neuronach wirus odry. Ujawnia się średnio po 7–10 latach od zachorowania, zwłaszcza gdy dziecko chorowało w wieku poniemowlęcym (<2 r.ż.). Prowadzi nieuchronnie do degradacji intelektualnej, napadów mioklonicznych, śpiączki i zgonu w ciągu 1–3 lat. Choroba jest w 100% nieuleczalna – jedyną skuteczną metodą zapobiegania jest szczepienie ochronne MMR!"
          },
          {
            text: "Choroba Alzheimera ujawniająca się w 6. roku życia.",
            correct: false,
            feedback: "Choroba Alzheimera nie występuje u małych dzieci i nie ma związku z odrą."
          },
          {
            text: "Stwardnienie rozsiane o natychmiastowym przebiegu.",
            correct: false,
            feedback: "SM ma tło autoimmunologiczne, nie jest bezpośrednim zmutowanym zakażeniem odrowym jak SSPE."
          },
          {
            text: "Odra nie daje żadnych powikłań odległych i pozostawia 'superodporność'.",
            correct: false,
            feedback: "Mit antyszczepionkowy: odra niszczy pamięć immunologiczną (immune amnesia) i niesie ryzyko śmiertelnego SSPE."
          }
        ]
      }
    ];
  });

  console.log("Cases 106-110 upgraded!");
}

run().catch(console.error);

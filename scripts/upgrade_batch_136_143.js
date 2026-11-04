const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const updates = {
  136: [
    {
      qIdx: 10, // Q11
      newOpts: [
        "Lekarz wystawia ZUS ZLA na czas gojenia (2-4 tyg.) oraz informuje o kontroli proktologicznej pod kątem przetoki odbytu.",
        "Nacięcie ropnia w trybie doraźnym wyklucza możliwość wystawienia zwolnienia lekarskiego ZUS ZLA na okres dłuższy niż 24 h.",
        "Lekarz ma bezwzględny prawny obowiązek zakwalifikować ropień okołoodbytniczy jako ostrą chorobę zawodową pracownika.",
        "Pacjent po zabiegu nacięcia ropnia traci bezterminowo uprawnienia do prowadzenia pojazdów mechanicznych kategorii B.",
        "Zgoda na zabieg zwalnia personel pielęgniarski z obowiązku prowadzenia dokumentacji medycznej zmian opatrunków."
      ]
    }
  ],
  137: [
    {
      qIdx: 4, // Q5
      newOpts: [
        "Aktywne krwawienie tętnicze będące wskazaniem do przezcewnikowej embolizacji tętnicy śledzionowej (SAE) lub operacji.",
        "Prawidłowe, bogate unaczynienie miazgi białej i czerwonej śledziony w fazie wczesnotętniczej badania wielofazowego.",
        "Przebyte w dzieciństwie zapalenie wirusowe wątroby typu A z następową łagodną splenomegalią bez cech uszkodzenia narządu.",
        "Wrodzoną torbiel bąblowcową miąższu śledziony ze zwapnieniem torebki zewnętrznej bez cech krwawienia do otrzewnej.",
        "Całkowity brak cech uszkodzenia narządów miąższowych jamy brzusznej i możliwość natychmiastowego wypisu chorego do domu."
      ]
    }
  ],
  138: [
    {
      qIdx: 2, // Q3
      newOpts: [
        "Przewlekłe utajone krwawienie prowadzące do ciężkiej mikrocytarnej niedokrwistości z niedoboru żelaza.",
        "Wczesne wystąpienie mechanicznej niedrożności jelit z napadowym bólem kolkowym i zatrzymaniem stolca.",
        "Obecność stolców ołówkowatych oraz częste, bolesne i bezskuteczne parcie naglące na stolec (tenesmus).",
        "Wybitnie łagodny przebieg kliniczny bez tendencji do naciekania okolicznych tkanek i bez odległych przerzutów.",
        "Brak jakichkolwiek wskazań do resekcji chirurgicznej i wyłączne stosowanie radioterapii paliatywnej."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "Odbarczenie niedrożności, przygotowanie jelita i wykonanie planowej resekcji z zespoleniem bez konieczności stomii.",
        "Całkowite wyleczenie raka jelita grubego drogą ablacji termicznej bez konieczności resekcji chirurgicznej guza.",
        "Natychmiastowe zniszczenie wszystkich synchronicznych przerzutów nowotworowych w obu płatach miąższu wątroby.",
        "Całkowite zastąpienie pooperacyjnej radioterapii miednicy oraz adiuwantowej chemioterapii wielolekowej.",
        "Trwałe mechaniczne zamknięcie ujścia wyrostka robaczkowego w celu zapobieżenia ostremu zapaleniu wyrostka."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "Resekcji jelita z guzem, ślepym zaszyciu kikuta odbytnicy i wyłonieniu bliższego końca jako pojedynczej kolostomii.",
        "Wycięciu całego żołądka z następowym zespoleniem przełykowo-czczym oraz pozostawieniu guza esicy bez resekcji.",
        "Założeniu laparoskopowej opaski uciskowej na pień aorty brzusznej poniżej odejścia tętnicy krezkowej dolnej.",
        "Wycięciu prawej połowy wątroby i śledziony z pozostawieniem guza pierwotnego jelita grubego in situ.",
        "Wytworzeniu zespolenia omijającego pomiędzy kątnicą a pęcherzem moczowym bez resekcji nowotworu esicy."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Szpital wystawia Kartę DiLO przy wypisie, zwołuje konsylium onkologiczne (KDO) i wyznacza koordynatora leczenia.",
        "Karta DiLO może być wystawiona wyłącznie po upływie 12 miesięcy od zabiegu operacyjnego przez lekarza POZ.",
        "Pacjent po resekcji jelita traci prawo do refundowanej chemioterapii, jeśli nie wykonał kolonoskopii przed 50 r.ż.",
        "Lekarz ma bezwzględny prawny zakaz ujawniania pacjentowi złośliwego charakteru rozpoznanego gruczolakoraka.",
        "Zgoda na procedurę Hartmanna zwalnia szpital z obowiązku zgłoszenia nowotworu do Krajowego Rejestru Nowotworów."
      ]
    }
  ],
  139: [
    {
      qIdx: 1, // Q2
      newOpts: [
        "Zgięcie śledzionowe (punkt Griffithsa) oraz połączenie odbytniczo-esicze (punkt Sudecka) o słabym krążeniu obocznym.",
        "Kątnica w okolicy zastawki krętniczo-kątniczej Bauhina oraz wyrostek robaczkowy unaczynione przez pień krętniczy.",
        "Okrężnica poprzeczna w części środkowej zaopatrywana przez szerokie gałęzie łuku Riolana i tętnicę krezkową górną.",
        "Bańka odbytnicy zaopatrywana przez tętnicę odbytniczą dolną i środkową bezpośrednio odchodzące od tętnicy biodrowej.",
        "Zgięcie wątrobowe okrężnicy oraz wstępnica zaopatrywane przez gałęzie tętnicy krętniczo-okrężniczej i okrężniczej prawej."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "Nagły kurczowy ból w lewym boku, naglące bolesne parcie na stolec oraz krew w stolcu po epizodzie hipotonii.",
        "Tępy ból w prawym podżebrzu, wysoka żółtaczka mechaniczna oraz całkowite odbarwienie stolca ze świądem skóry.",
        "Prawostronny ból brzucha, masywne wymioty treścią kałową oraz brak jakichkolwiek domieszek krwi w stolcu.",
        "Brak jakichkolwiek dolegliwości bólowych, obfite stolce tłuszczowe oraz gwałtowny spadek masy ciała o 15 kg.",
        "Ból opasujący w nadbrzuszu, sinica marmurkowata wokół pępka (objaw Cullena) oraz wysokie stężenie amylazy."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "W IC ból jest łagodniejszy, wcześnie występuje krew w stolcu, a 80-85% przypadków cofa się przy leczeniu zachowawczym.",
        "W IC dochodzi do natychmiastowej pełnej martwicy całego jelita grubego wymagającej totalnej kolektomii u 100% chorych.",
        "W IC ból jest zlokalizowany wyłącznie w okolicy wyrostka robaczkowego, a krwawienie z przewodu pokarmowego nie występuje.",
        "W AMI ból ustępuje samoistnie po 2 godzinach, natomiast w IC prowadzi zawsze do wstrząsu krwotocznego z przetoką.",
        "Oba stany kliniczne charakteryzują się identycznym przebiegiem i wymagają dokładnie takiego samego leczenia operacyjnego."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "Płynoterapia dożylna, odstawienie wazokonstriktorów/diuretyków, odpoczynek jelita oraz antybiotykoterapia szerokowidmowa.",
        "Natychmiastowa resekcja całej prawej połowy okrężnicy z zespoleniem omijającym i wysokimi dawkami noradrenaliny.",
        "Podanie doustnych osmotycznych leków przeczyszczających w dużej dawce w celu mechanicznego opróżnienia światła jelita.",
        "Intensywne podawanie niesteroidowych leków przeciwzapalnych w czopkach doodbytniczych bez uzupełniania łożyska naczyniowego.",
        "Wdrożenie doustnego leczenia przeciwkrzepliwego warfaryną z docelowym wskaźnikiem INR przekraczającym wartość 4,0."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "Pojawienie się objawów rozlanego zapalenia otrzewnej, perforacji lub wstrząsu septycznego z kwasicą mleczanową.",
        "Pojedynczy epizod oddania luźniejszego stolca z niewielką smugą świeżej krwi na papierze toaletowym.",
        "Spadek liczby leukocytów w morfologii krwi obwodowej z 14 000/µl do prawidłowej wartości 7 500/µl.",
        "Zmniejszenie nasilenia bólu brzucha po rozpoczęciu dożylnego nawadniania i odstawieniu leków moczopędnych.",
        "Prawidłowy obraz ściany esicy w kontrolnym badaniu ultrasonograficznym jamy brzusznej z opcją Doppler."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "Wyraźnemu obrzękowi błony podśluzowej ze wzmocnieniem kontrastowym przekrwionej śluzówki oraz surowicówki.",
        "Całkowitemu zwapnieniu ściany jelita grubego na tle przewlekłego odkładania się soli wapnia w błonie mięśniowej.",
        "Obecności mnogich polipów gruczolakowatych o średnicy powyżej 2 centymetrów w świetle okrężnicy zstępującej.",
        "Wypadaniu pętli jelita cienkiego przez ubytek w krezce okrężnicy do lewego zachyłka okołodwunastniczego.",
        "Obecności ciał obcych o gęstości metalu zalegających w świetle kątnicy i wywołujących miejscowy odczyn zapalny."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Lekarz prowadzi systematyczny zapis stanu chorego, uzasadnia wybór terapii i informuje o ryzyku operacji przy martwicy.",
        "Lekarz ma bezwzględny zakaz odnotowywania parametrów życiowych i stężenia mleczanów częściej niż raz na 72 godziny.",
        "Podjęcie leczenia zachowawczego zwalnia personel lekarski z konieczności uzyskiwania jakiejkolwiek zgody pacjenta.",
        "Ordynator oddziału ma prawny obowiązek zawiadomić prokuraturę o każdym przypadku podjętej terapii zachowawczej.",
        "Zasady KEL zabraniają informowania rodziny o możliwości pogorszenia stanu klinicznego chorego z niedokrwieniem."
      ]
    }
  ],
  140: [
    {
      qIdx: 2, // Q3
      newOpts: [
        "Wzrost RR wypłukuje skrzeplinę w zaotrzewnej, a duże objętości płynów nasilają koagulopatię i hipotermię.",
        "Podanie płynów wywołuje natychmiastowe zablokowanie wydzielania reniny i nieodwracalne zatrzymanie akcji serca.",
        "Szybka płynoterapia powoduje gwałtowny skurcz tętnic nerkowych i natychmiastową martwicę kory obu nerek.",
        "Podwyższenie ciśnienia tętniczego całkowicie uniemożliwia ocenę anatomii naczyń w tomografii komputerowej.",
        "Płyny krystaloidowe wchodzą w bezpośrednią reakcję chemiczną ze ścianą tętniaka prowadząc do jej rozpuszczenia."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "Natychmiastowa dekompresyjna laparotomia ratunkowa i pozostawienie jamy brzusznej otwartej (laparostomia).",
        "Zwiększenie objętości podawanych krystaloidów do 10 litrów na dobę celem podniesienia rzutu serca.",
        "Podanie wysokich dawek leków wazopresyjnych i obkurczających łożysko naczyniowe bez otwierania powłok.",
        "Zalecenie intensywnego ucisku powłok brzusznych za pomocą elastycznego pasa ortopedycznego.",
        "Zastosowanie wyłącznie doustnych leków rozkurczowych i obserwacja ciśnienia w pęcherzu przez 48 godzin."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Zespół chirurgów podejmuje natychmiast operację ratującą życie bez zgody, z wpisem i powiadomieniem sądu.",
        "Chirurdzy muszą wstrzymać się z otwarciem jamy brzusznej do czasu uzyskania pisemnej zgody sądu opiekuńczego.",
        "Do wykonania procedury ratunkowej konieczne jest uzyskanie zgody sąsiada lub dowolnego znajomego pacjenta.",
        "Brak przytomności chorego stanowi bezwzględne prawne przeciwwskazanie do wdrożenia jakiegokolwiek leczenia.",
        "Zgodę na zabieg operacyjny u każdego nieprzytomnego pacjenta musi wydać na piśmie prokurator dyżurny."
      ]
    }
  ],
  141: [
    {
      qIdx: 5, // Q6
      newOpts: [
        "Poreperfuzyjnym zespole ciasnoty przedziałów powięziowych wymagającym natychmiastowej fasciotomii.",
        "Fizjologicznym przekrwieniu czynnym tkanek miękkich podudzia niewymagającym żadnej interwencji.",
        "Wystąpieniu ostrej zakrzepicy żyły odpiszczelowej powierzchownej leczonej wyłącznie maścią heparynową.",
        "Rozwoju powierzchownej róży paciorkowcowej podudzia wymagającej doustnej penicyliny fenoksymetylowej.",
        "Zwichnięciu stawu skokowo-goleniowego powstałym w wyniku niewłaściwego ułożenia kończyny na szynie."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "Serce (migotanie przedsionków, skrzeplina w lewej komorze po zawale, wady zastawek i kardiomiopatie).",
        "Żyły głębokie kończyn dolnych w przebiegu typowej zakrzepicy żylnej przy zachowanej szczelności przegród.",
        "Drobne tętniczki palcowe stóp w przebiegu zaawansowanej angiopatii cukrzycowej i neuropatii czuciowej.",
        "Torbiel Bakera w dole podkolanowym ulegająca okresowemu uciskowi na gałęzie tętnicy piszczelowej tylnej.",
        "Zatoki opony twardej w mózgowiu w wyniku wstecznego przepływu krwi w układzie żylnym kręgosłupa."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Lekarz informuje o zabiegu, ryzyku zespołu poreperfuzyjnego i amputacji, odbierając pisemną świadomą zgodę.",
        "Lekarz jest zwolniony z obowiązku informowania pacjenta o jakimkolwiek ryzyku utraty kończyny lub powikłań.",
        "W przypadku ostrych stanów naczyniowych prawo bezwzględnie zabrania odbierania pisemnej zgody od chorego.",
        "Zgodę na zabieg embolektomii cewnikiem Fogarty'ego może wydać wyłącznie ordynator oddziału anestezjologii.",
        "Wystąpienie zespołu ciasnoty po zabiegu stanowi automatyczną przesłankę winy lekarza bez względu na stan naczynia."
      ]
    }
  ],
  142: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "Spoczynkowy ból niedokrwienny trwający >2 tyg. lub niegojące się owrzodzenie/martwica stopy na tle miażdżycy.",
        "Pojawienie się chromania przestankowego po przejściu dystansu powyżej 500 metrów na płaskim terenie.",
        "Obecność żylaków siatkowatych oraz pajączków naczyniowych w okolicy kostki przyśrodkowej goleni.",
        "Przemijający obrzęk ciastowaty wokół kostek nasilający się wieczorem po wielogodzinnym staniu w pracy.",
        "Ból kręgosłupa lędźwiowego promieniujący wzdłuż dermatomu L5 z osłabieniem odruchu ze ścięgna Achillesa."
      ]
    },
    {
      qIdx: 2, // Q3
      newOpts: [
        "Tętnice podudzia i stopy są silnie uwapnione (stwardnienie Mönckeberga), co uniemożliwia ich ściśnięcie mankietem.",
        "Chorzy z cukrzycą mają fizjologicznie wyższe ciśnienie na stopach niż w aorcie wstępującej i tętnicy ramiennej.",
        "U pacjentów diabetologicznych dochodzi do całkowitej aplazji tętnicy piszczelowej przedniej i grzbietowej stopy.",
        "Pomiar ABI u chorych na cukrzycę wywołuje natychmiastowe pęknięcie blaszki miażdżycowej i ostry zator obwodowy.",
        "Metoda ta jest zastrzeżona wyłącznie do diagnostyki zatorowości płucnej i nie ma zastosowania w kończynach."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "Kwasem acetylosalicylowym w dawce 100 mg raz/d + rywaroksabanem w dawce naczyniowej 2,5 mg 2x/d.",
        "Warfaryną w dawce nasycającej utrzymującej wskaźnik krzepnięcia INR stale powyżej wartości 4,0.",
        "Klopidogrelem w potrójnej dawce uderzeniowej 300 mg trzy razy na dobę przez okres 12 miesięcy.",
        "Heparyną drobnocząsteczkową we wstrzyknięciach podskórnych podawaną w dawce terapeutycznej przez 5 lat.",
        "Kwasem acetylosalicylowym w dawce 500 mg w skojarzeniu z ibuprofenem w dawce 800 mg dwa razy dziennie."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "Utrzymanie martwicy w stanie suchym (dezynfekcja jodowa, suchy jałowy opatrunek) i odroczenie resekcji do udrożnienia.",
        "Natychmiastowe mechaniczne wycięcie martwicy skalpelem do kości w gabinecie zabiegowym bez znieczulenia.",
        "Zalecenie codziennego moczenia stopy w misce z gorącą wodą z dodatkiem szarego mydła potasowego przez 60 minut.",
        "Nałożenie wilgotnych okładów z maści ichtiolowej pod szczelną folią okluzyjną na okres co najmniej 14 dni.",
        "Wprowadzenie pijawek lekarskich na brzeg martwicy w celu poprawy lokalnego drenażu mikrokrążenia tkankowego."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "< 55 mg/dl (< 1,4 mmol/l) oraz redukcja o co najmniej 50% w stosunku do wartości wyjściowej stężenia.",
        "< 115 mg/dl (< 3,0 mmol/l) bez konieczności procentowej redukcji stężenia wyjściowego cholesterolu.",
        "< 190 mg/dl (< 5,0 mmol/l) przy zachowaniu prawidłowego stężenia triglicerydów w surowicy krwi.",
        "Stężenie frakcji LDL nie ma znaczenia prognostycznego w chorobach tętnic obwodowych i nie podlega celom.",
        "Pomiędzy 150 a 200 mg/dl w celu zabezpieczenia komórkowych procesów naprawczych błon biologicznych."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "Specjalistyczne obuwie z indywidualną wkładką odciążającą przodostopie oraz wózek inwalidzki w razie niesprawności.",
        "Wyłącznie skierowanie do zakładu opiekuńczo-leczniczego (ZOL) z administracyjnym zakazem opuszczania placówki.",
        "Karnet na serię 30 zabiegów ogólnoustrojowej krioterapii w kriokomorze bez konsultacji naczyniowej.",
        "Płatne w 100% przez chorego ortezy kończyn dolnych bez jakiejkolwiek możliwości refundacji ze środków NFZ.",
        "Zwolnienie z obowiązku prowadzenia kartoteki medycznej w poradni stopy cukrzycowej i angiologicznej."
      ]
    }
  ],
  143: [
    {
      qIdx: 1, // Q2
      newOpts: [
        "Tętnicy szyjnej wewnętrznej po tej samej stronie co zaburzenia widzenia (homolateralnie).",
        "Tętnicy szyjnej wewnętrznej po stronie przeciwnej do objawów ocznych (kontralateralnie).",
        "Układu kręgowo-podstawnego zaopatrującego struktury pnia mózgu i płaty potyliczne mózgu.",
        "Tętnicy rdzeniowej przedniej zaopatrującej przednie rogi rdzenia kręgowego na poziomie szyjnym.",
        "Pnia żyły głównej górnej oraz żył podobojczykowych w przebiegu zespołu ciasnoty górnego otworu."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "Porównanie średnicy światła w miejscu zwężenia do średnicy prawidłowego odcinka tętnicy szyjnej wewnętrznej poza opuszką.",
        "Porównanie średnicy światła w zwężeniu do całkowitej średnicy zewnętrznej tętnicy szyjnej wspólnej poniżej podziału.",
        "Porównanie średnicy stenozy do szacowanej pierwotnej średnicy anatomicznej opuszki tętnicy szyjnej przed chorobą.",
        "Ocena wyłącznie pola powierzchni przekroju poprzecznego żyły szyjnej wewnętrznej w badaniu ultrasonograficznym.",
        "Wyliczenie stosunku długości blaszki miażdżycowej do całkowitego wzrostu pacjenta i obwodu klatki piersiowej."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "Trudnych warunków do operacji otwartej: szyi po radioterapii, restenozy po CEA lub wysokiego odejścia zwężenia.",
        "Obecności masywnych, okrężnych zwapnień łuku aorty u pacjenta w wieku 85 lat ze świeżym zawałem serca.",
        "Występowania udokumentowanego uczulenia pacjenta na środki stosowane do znieczulenia nasiękowego.",
        "Obecności ostrego tętniaka rozwarstwiającego aorty wstępującej typu Stanford A z niedomykalnością aortalną.",
        "Niewielkiego bezobjawowego zwężenia tętnicy szyjnej o stopniu stenozy poniżej 20% w badaniu USG Doppler."
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

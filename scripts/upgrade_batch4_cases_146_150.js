const fs = require('fs');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const PASSWORD = '@LEKSzymon28111999';

async function upgradeCase(fname, updater) {
  const enc = JSON.parse(fs.readFileSync('cases/' + fname, 'utf8'));
  const c = await decryptObjectAes(enc, PASSWORD);
  updater(c);
  if (!c.vitalsObj) {
    c.vitalsObj = { hr: 90, bp: "120/80", spo2: 98, rr: 16, temp: 36.6, gcs: 15 };
  }
  const reEnc = await encryptStringAes(JSON.stringify(c, null, 2), PASSWORD);
  fs.writeFileSync('cases/' + fname, JSON.stringify(reEnc, null, 2), 'utf8');
  console.log(`Upgraded clinical storytelling: ${fname}`);
}

async function run() {
  console.log("Starting deep clinical upgrade for cases 146-150 (Vascular & Thoracic Trauma)...");

  // ==========================================
  // CASE 146: Zespół usidlenia tętnicy podkolanowej (PAES)
  // ==========================================
  await upgradeCase('146_zespol_usidlenia_tetnicy_podkolanowej_paes.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena w poradni naczyniowej – 24-letni maratończyk z nietypowym chromaniem",
        desc: "Do poradni chirurgii naczyniowej zgłasza się 24-letni wysportowany mężczyzna, instruktor fitness i biegacz długodystansowy. Od 6 miesięcy zmaga się z nietypowym problemem: podczas biegu na dystansie powyżej 300-400 metrów lub przy energicznym marszu pod górę pojawia się silny, kurczowy ból i uczucie zdrętwienia prawej łydki oraz chłód prawej stopy, zmuszający go do zatrzymania się. Po 3-5 minutach odpoczynku na stojąco ból całkowicie ustępuje. W wywiadzie: pacjent nigdy nie palił papierosów, nie ma cukrzycy, nadciśnienia ani dyslipidemii. Był konsultowany przez ortopedów, którzy wykluczyli shin splints i urazy ścięgien. W badaniu w pozycji leżącej: tętno na prawej tętnicy udowej, podkolanowej, grzbietowej stopy i piszczelowej tylnej jest doskonale wyczuwalne, symetryczne, ABI w spoczynku wynosi 1.05. Jaka jest Twoja robocza hipoteza diagnostyczna?",
        scenario: "Do poradni chirurgii naczyniowej zgłasza się 24-letni wysportowany mężczyzna, instruktor fitness i biegacz długodystansowy. Od 6 miesięcy zmaga się z nietypowym problemem: podczas biegu na dystansie powyżej 300-400 metrów lub przy energicznym marszu pod górę pojawia się silny, kurczowy ból i uczucie zdrętwienia prawej łydki oraz chłód prawej stopy, zmuszający go do zatrzymania się. Po 3-5 minutach odpoczynku na stojąco ból całkowicie ustępuje. W wywiadzie: pacjent nigdy nie palił papierosów, nie ma cukrzycy, nadciśnienia ani dyslipidemii. Był konsultowany przez ortopedów, którzy wykluczyli shin splints i urazy ścięgien. W badaniu w pozycji leżącej: tętno na prawej tętnicy udowej, podkolanowej, grzbietowej stopy i piszczelowej tylnej jest doskonale wyczuwalne, symetryczne, ABI w spoczynku wynosi 1.05. Jaka jest Twoja robocza hipoteza diagnostyczna?",
        options: [
          {
            text: "Zespół usidlenia tętnicy podkolanowej (PAES - Popliteal Artery Entrapment Syndrome) – wrodzona anomalia anatomiczna relacji tętnicy podkolanowej i głowy przyśrodkowej mięśnia brzuchatego łydki, wywołująca czynnościowe chromanie przestankowe u młodego sportowca.",
            correct: true,
            feedback: "Znakomicie! Klasyczny profil pacjenta z PAES: młody, wysportowany mężczyzna (<30 r.ż.) bez jakichkolwiek czynników ryzyka miażdżycy, zgłaszający podręcznikowe objawy chromania przestankowego łydki. W spoczynku tętno jest prawidłowe, ponieważ mięśnie są rozluźnione. Podczas pracy mięśniowej dochodzi do mechanicznego ucisku tętnicy podkolanowej przez nieprawidłowo przebiegającą głowę przyśrodkową mięśnia brzuchatego łydki (caput mediale musculi gastrocnemii)."
          },
          {
            text: "Ciężka miażdżyca zarostowa tętnic kończyn dolnych w IV stopniu wg Fontaine'a.",
            correct: false,
            feedback: "Błąd! Miażdżyca u 24-letniego sportowca bez czynników ryzyka jest skrajnie nieprawdopodobna, a tętno spoczynkowe i ABI 1.05 wykluczają zaawansowaną miażdżycę."
          },
          {
            text: "Zwyrodnienie wielostawowe kolana, zaleć kwas hialuronowy dostawowo.",
            correct: false,
            feedback: "Objawy mają charakter czysto naczyniowy związany z wysiłkiem (chromanie), stawy kolanowe są prawidłowe."
          },
          {
            text: "Histeryczne zaburzenia konwersyjne, skieruj na psychoterapię.",
            correct: false,
            feedback: "Niedopuszczalne lekceważenie objawów naczyniowych grożące utratą kończyny!"
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Badanie przedmiotowe – manewry prowokacyjne w PAES",
        desc: "Jaki specyficzny manewr prowokacyjny podczas badania palpacyjnego tętna obwodowego na stopie pozwala wysunąć silne podejrzenie kliniczne zespołu usidlenia tętnicy podkolanowej?",
        scenario: "Jaki specyficzny manewr prowokacyjny podczas badania palpacyjnego tętna obwodowego na stopie pozwala wysunąć silne podejrzenie kliniczne zespołu usidlenia tętnicy podkolanowej?",
        options: [
          {
            text: "Palpacja tętna na tętnicy grzbietowej stopy lub piszczelowej tylnej podczas aktywnego zgięcia podeszwowego stopy z oporem (skurcz mięśnia brzuchatego łydki) LUB podczas biernego przeprostu w stawie kolanowym połączonego ze zgięciem grzbietowym stopy – zanik lub wyraźne osłabienie tętna i pojawienie się szmeru naczyniowego potwierdza uciskanie tętnicy.",
            correct: true,
            feedback: "Dokładnie tak! Podręcznikowy manewr diagnostyczny w PAES: badający trzyma palce na tętnicy grzbietowej stopy (lub przykłada głowicę Doppler) i prosi pacjenta o mocne zgięcie podeszwowe stopy przeciw oporowi ręki badającego. Skurczona głowa przyśrodkowa mięśnia brzuchatego łydki dociska tętnicę podkolanową do kłykcia kości udowej, powodując natychmiastowy zanik tętna i spadek wskaźnika ABI! Po rozluźnieniu mięśnia tętno natychmiast powraca."
          },
          {
            text: "Próba Valsalvy z zatrzymaniem oddechu na 60 sekund.",
            correct: false,
            feedback: "Próba Valsalvy nie wpływa selektywnie na anatomię dołu podkolanowego."
          },
          {
            text: "Uderzenie młotkiem neurologicznym w rzepkę.",
            correct: false,
            feedback: "To odruch kolanowy (L2-L4), nie ocenia przepływu naczyniowego."
          },
          {
            text: "Uniesienie rąk do góry (próba Wrighta).",
            correct: false,
            feedback: "Próba Wrighta służy do diagnostyki zespołu górnego otworu klatki piersiowej (TOS) dla kończyny górnej."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Przyłóżkowe USG Duplex Doppler z testem dynamicznym",
        desc: "Wykonujesz dynamiczne badanie USG Duplex Doppler dołu podkolanowego. W spoczynku: przepływ w tętnicy podkolanowej trójfazowy, prędkość prawidłowa. Podczas zgięcia podeszwowego stopy z oporem: światło tętnicy podkolanowej ulega całkowitemu zaciśnięciu, przepływ w spektrum Doppler zanika (PSV = 0 cm/s), a dystalnie na podudziu rejestruje się zapaść fali przepływu. Jakie badanie obrazowe jest kolejnym krokiem w celu precyzyjnego uwidocznienia anomalii anatomicznej (złoty standard)?",
        scenario: "Wykonujesz dynamiczne badanie USG Duplex Doppler dołu podkolanowego. W spoczynku: przepływ w tętnicy podkolanowej trójfazowy, prędkość prawidłowa. Podczas zgięcia podeszwowego stopy z oporem: światło tętnicy podkolanowej ulega całkowitemu zaciśnięciu, przepływ w spektrum Doppler zanika (PSV = 0 cm/s), a dystalnie na podudziu rejestruje się zapaść fali przepływu. Jakie badanie obrazowe jest kolejnym krokiem w celu precyzyjnego uwidocznienia anomalii anatomicznej (złoty standard)?",
        options: [
          {
            text: "Rezonans magnetyczny (angio-MRI) dołu podkolanowego i kończyny dolnej w spoczynku i po manewrach prowokacyjnych – złoty standard obrazowania relacji anatomicznych mięśni, ścięgien i tętnicy podkolanowej.",
            correct: true,
            feedback: "Znakomicie! Rezonans magnetyczny (MRI / angio-MR) jest metodą z wyboru w PAES, ponieważ w przeciwieństwie do samej angiografii doskonale uwidacznia tkanki miękkie: początek, przebieg i anomalie ścięgniste głowy przyśrodkowej mięśnia brzuchatego łydki oraz precyzyjny punkt ucisku tętnicy podkolanowej."
          },
          {
            text: "RTG kości podudzia w projekcji bocznej.",
            correct: false,
            feedback: "Zwykłe RTG nie uwidacznia naczyń krwionośnych ani mięśni."
          },
          {
            text: "Scyntygrafia kości z użyciem technetu.",
            correct: false,
            feedback: "Służy do wykrywania przerzutów nowotworowych lub zapalenia kości, a nie anomalii naczyniowych."
          },
          {
            text: "Badanie kału na krew utajoną.",
            correct: false,
            feedback: "Całkowity brak związku."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Klasyfikacja anatomiczna PAES i wynik angio-MRI",
        desc: "Opis angio-MRI: 'Tętnica podkolanowa prawa biegnie nietypowo, zbaczając przyśrodkowo wokół prawidłowo przyczepionej głowy przyśrodkowej mięśnia brzuchatego łydki (typ I wg klasyfikacji Whelan/Love). W miejscu zagięcia ściana tętnicy wykazuje pogrubienie, ale bez obecności tętniaka ani skrzeplin przyściennych'. Jakie groźne powikłanie naczyniowe rozwija się w nieleczonym PAES w wyniku przewlekłego mikrourazu mechanicznego?",
        scenario: "Opis angio-MRI: 'Tętnica podkolanowa prawa biegnie nietypowo, zbaczając przyśrodkowo wokół prawidłowo przyczepionej głowy przyśrodkowej mięśnia brzuchatego łydki (typ I wg klasyfikacji Whelan/Love). W miejscu zagięcia ściana tętnicy wykazuje pogrubienie, ale bez obecności tętniaka ani skrzeplin przyściennych'. Jakie groźne powikłanie naczyniowe rozwija się w nieleczonym PAES w wyniku przewlekłego mikrourazu mechanicznego?",
        options: [
          {
            text: "Przewlekłe uszkadzanie ściany tętnicy przez ucisk mięśniowy prowadzi do włóknienia intimy, powstania tętniaka pozaprzezwężeniowego (post-stenotic aneurysm) ze skrzepliną przyścienną, co grozi nagłą zakrzepicą tętnicy podkolanowej lub obwodową zatorowością tętnic goleni i ostrym niedokrwieniem kończyny (ALI).",
            correct: true,
            feedback: "Wybitna patofizjologia chirurgiczna! W PAES powtarzający się przy każdym kroku uraz mechaniczny tętnicy niszczy włókna sprężyste i śródbłonek. Dochodzi do miejscowego zwapnienia, tętniakowatego poszerzenia dystalnie od ucisku (efekt Bernoulli/Venturi) i powstawania skrzeplin. U ponad 30% młodych chorych pierwszym dramatycznym objawem nierozpoznanego wcześniej PAES jest nagła ostra zakrzepica tętnicy podkolanowej i groźba amputacji!"
          },
          {
            text: "Samoistne przekształcenie tętnicy podkolanowej w nerw kulszowy.",
            correct: false,
            feedback: "Absurd biologiczny."
          },
          {
            text: "Zanik kości piszczelowej w ciągu 24 godzin.",
            correct: false,
            feedback: "Niedorzeczne."
          },
          {
            text: "Brak jakichkolwiek powikłań, stan ten zawsze cofa się samoistnie.",
            correct: false,
            feedback: "PAES to wada wrodzona anatomiczna – nigdy nie cofa się samoistnie i wymaga interwencji chirurgicznej."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Wybór metody leczenia – dlaczego angioplastyka (stent) jest błędem sztuki?",
        desc: "Kardiolog interwencyjny proponuje: 'Wprowadźmy cewnik przez pachwinę i załóżmy samorozprężalny stent do tętnicy podkolanowej, żeby mięsień jej nie zaciskał'. Jaka jest Twoja odpowiedź jako chirurga naczyniowego?",
        scenario: "Kardiolog interwencyjny proponuje: 'Wprowadźmy cewnik przez pachwinę i załóżmy samorozprężalny stent do tętnicy podkolanowej, żeby mięsień jej nie zaciskał'. Jaka jest Twoja odpowiedź jako chirurga naczyniowego?",
        options: [
          {
            text: "Zabieg wewnątrznaczyniowy ze stentowaniem w PAES jest BEZWZGLĘDNIE PRZECIWWSKAZANY i stanowi kardynalny błąd sztuki; zewnętrzny ucisk mięśniowy doprowadzi do natychmiastowego złamania lub zgniecenia stentu, ostrej zakrzepicy i utraty kończyny. Jedynym właściwym leczeniem jest otwarta operacja chirurgiczna (odbarczenie anatomiczne).",
            correct: true,
            feedback: "Znakomicie! To krytyczny punkt edukacyjny LEK i wytycznych naczyniowych: stenty NIE są odporne na powtarzające się, potężne siły ściskające i ścinające wywierane przez pracujące mięśnie szkieletowe. Wszczepienie stentu w PAES bez uwolnienia mięśnia prowadzi do pęknięcia stentu (stent fracture) i ostrej okluzji naczynia! Leczeniem z wyboru jest wyłącznie dekompresja chirurgiczna."
          },
          {
            text: "Zgadzam się, stentowanie to doskonały pomysł, najlepiej założyć dwa stenty jeden w drugi.",
            correct: false,
            feedback: "Kardynalny błąd zagrażający utratą nogi!"
          },
          {
            text: "Zamiast stentu należy wstrzyknąć klej cyjanoakrylowy do tętnicy.",
            correct: false,
            feedback: "Niedorzeczne."
          },
          {
            text: "Wskazana jest wyłącznie radioterapia dołu podkolanowego.",
            correct: false,
            feedback: "Błędne postępowanie."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Technika zabiegu operacyjnego dekompresji (mieotomia)",
        desc: "Pacjent zostaje zakwalifikowany do planowej operacji odbarczającej. Na czym polega zabieg chirurgiczny w niepowikłanym typie I PAES bez trwałego uszkodzenia ściany tętnicy?",
        scenario: "Pacjent zostaje zakwalifikowany do planowej operacji odbarczającej. Na czym polega zabieg chirurgiczny w niepowikłanym typie I PAES bez trwałego uszkodzenia ściany tętnicy?",
        options: [
          {
            text: "Chirurgiczne dotarcie do dołu podkolanowego (z cięcia tylnego w kształcie litery S lub cięcia przyśrodkowego) i wykonanie mieotomii (przecięcia nieprawidłowo przebiegającej głowy przyśrodkowej mięśnia brzuchatego łydki lub pasm włóknistych), uwolnienie tętnicy podkolanowej i przywrócenie jej anatomicznego, prostego przebiegu.",
            correct: true,
            feedback: "Dokładnie tak! Standardowy zabieg w PAES: uwolnienie tętnicy (decompression) poprzez przecięcie nieprawidłowej brzuśca mięśnia brzuchatego łydki (lub jej reimplantację w prawidłowe miejsce anatomiczne na kłykciu kości udowej). Przecięcie fragmentu mięśnia nie upośledza sprawności fizycznej sportowca, a całkowicie likwiduje ucisk naczynia. Jeśli tętnica była nienaruszona, nie wymaga rekonstrukcji naczyniowej."
          },
          {
            text: "Całkowite wycięcie kości udowej i zastąpienie jej protezą tytanową.",
            correct: false,
            feedback: "Absurdalnie okaleczający zabieg."
          },
          {
            text: "Podwiązanie tętnicy podkolanowej i pozostawienie nogi bez zaopatrzenia.",
            correct: false,
            feedback: "Doprowadziłoby do martwicy podudzia."
          },
          {
            text: "Przecięcie nerwu kulszowego w celu zniesienia czucia bólu.",
            correct: false,
            feedback: "Doprowadziłoby do całkowitego porażenia stopy."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Postępowanie w przypadku współistniejącego tętniaka lub okluzji tętnicy",
        desc: "Gdyby u pacjenta doszło już do powstania tętniaka tętnicy podkolanowej ze zwłóknieniem ściany w miejscu przewlekłego ucisku, jak należałoby rozszerzyć zabieg operacyjny?",
        scenario: "Gdyby u pacjenta doszło już do powstania tętniaka tętnicy podkolanowej ze zwłóknieniem ściany w miejscu przewlekłego ucisku, jak należałoby rozszerzyć zabieg operacyjny?",
        options: [
          {
            text: "Poza mieotomią odbarczającą konieczne jest wycięcie zmienionego tętniakowato odcinka tętnicy podkolanowej i rekonstrukcja naczyniowa za pomocą wstawki z autogennej odwróconej żyły odpiszczelowej (vein graft interposition).",
            correct: true,
            feedback: "Znakomicie! W zaawansowanym PAES z uszkodzeniem ściany samo odbarczenie mięśnia nie wystarcza – uszkodzona ściana naczynia grozi pęknięciem lub zatorowością. Należy wówczas zrekonstruować naczynie pomostem żylnym (własna żyła odpiszczelowa pacjenta jest materiałem z wyboru)."
          },
          {
            text: "Podanie aspiryny i pozostawienie tętniaka.",
            correct: false,
            feedback: "Błąd! Tętniak tętnicy podkolanowej ma skrajną tendencję do wykrzepiania i zatorowości obwodowej."
          },
          {
            text: "Zastosowanie wyłącznie maści z kasztanowca.",
            correct: false,
            feedback: "Niedorzeczne."
          },
          {
            text: "Wszczepienie rurki plastikowej z PCV kupionej w markecie budowlanym.",
            correct: false,
            feedback: "Niedopuszczalne."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Wyniki odległe, rehabilitacja i diagnostyka drugiej kończyny",
        desc: "Operacja uwolnienia tętnicy przebiegła wzorowo. Pacjent odzyskał pełny, niezakłócony przepływ w tętnicy podkolanowej nawet przy maksymalnym zgięciu stopy. Jakie kluczowe badanie musisz zlecić w odniesieniu do LEWEJ (przeciwległej) kończyny dolnej przed powrotem sportowca do treningów?",
        scenario: "Operacja uwolnienia tętnicy przebiegła wzorowo. Pacjent odzyskał pełny, niezakłócony przepływ w tętnicy podkolanowej nawet przy maksymalnym zgięciu stopy. Jakie kluczowe badanie musisz zlecić w odniesieniu do LEWEJ (przeciwległej) kończyny dolnej przed powrotem sportowca do treningów?",
        options: [
          {
            text: "Wykonanie badania USG Doppler / MRI tętnic podkolanowych lewej kończyny dolnej, ponieważ wada anatomiczna w PAES występuje OBUSTRONNIE u nawet 30-50% pacjentów (często bezobjawowo w drugiej nodze).",
            correct: true,
            feedback: "Wybitna czujność kliniczna! Zespół usidlenia tętnicy podkolanowej jako anomalia embriologiczna cechuje się wysoką symetrią – u co drugiego pacjenta występuje obustronnie! Wczesne wykrycie ucisku w drugiej kończynie pozwala zaplanować profilaktyczną dekompresję, zanim dojdzie do nieodwracalnego uszkodzenia tętnicy i zatoru. Po 6-8 tygodniach rekonwalescencji pacjent może powrócić do wyczynowego biegania."
          },
          {
            text: "Brak konieczności jakichkolwiek badań, człowiek nigdy nie ma wad w dwóch nogach.",
            correct: false,
            feedback: "Błąd! PAES występuje obustronnie w 30-50% przypadków."
          },
          {
            text: "Zalecenie dożywotniego zakazu wstawania z łóżka.",
            correct: false,
            feedback: "Pacjent po udanej mieotomii jest w pełni wyleczony."
          },
          {
            text: "Profilaktyczna amputacja lewej nogi.",
            correct: false,
            feedback: "Absurdalny błąd."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 147: Zespół podkradania tętnicy podobojczykowej (SSS)
  // ==========================================
  await upgradeCase('147_zespol_podkradania_tetnicy_podobojczykowej.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena w gabinecie lekarza POZ/neurologa – 62-latek z zawrotami głowy przy pracy rękami",
        desc: "Do poradni zgłasza się 62-letni mężczyzna, wieloletni palacz tytoniu z nadciśnieniem tętniczym i chorobą niedokrwienną serca. Pacjent skarży się na nawracające, niezwykle uciążliwe epizody: podczas wieszania firanek, mycia okien lub rąbania drewna (intensywnej pracy lewą ręką uniesioną ku górze) nagle pojawiają się u niego silne zawroty głowy, uczucie wirowania otoczenia, mroczki przed oczami, podwójne widzenie (diplopia), niestabilność chodu, a dwukrotnie doszło do nagłego osunięcia się na kolana bez utraty przytomności (tzw. drop attacks). Po opuszczeniu ręki i krótkim odpoczynku objawy neurologiczne całkowicie ustępują. Dodatkowo chory zauważył, że lewa ręka szybciej się męczy i jest chłodniejsza. Jaka jest Twoja robocza diagnoza kliniczna?",
        scenario: "Do poradni zgłasza się 62-letni mężczyzna, wieloletni palacz tytoniu z nadciśnieniem tętniczym i chorobą niedokrwienną serca. Pacjent skarży się na nawracające, niezwykle uciążliwe epizody: podczas wieszania firanek, mycia okien lub rąbania drewna (intensywnej pracy lewą ręką uniesioną ku górze) nagle pojawiają się u niego silne zawroty głowy, uczucie wirowania otoczenia, mroczki przed oczami, podwójne widzenie (diplopia), niestabilność chodu, a dwukrotnie doszło do nagłego osunięcia się na kolana bez utraty przytomności (tzw. drop attacks). Po opuszczeniu ręki i krótkim odpoczynku objawy neurologiczne całkowicie ustępują. Dodatkowo chory zauważył, że lewa ręka szybciej się męczy i jest chłodniejsza. Jaka jest Twoja robocza diagnoza kliniczna?",
        options: [
          {
            text: "Zespół podkradania tętnicy podobojczykowej (Subclavian Steal Syndrome - SSS) z objawami przemijającego niedokrwienia mózgowia w dorzeczu kręgowo-podstawnym (vertebrobasilar insufficiency) wywołanego pracą lewej kończyny górnej.",
            correct: true,
            feedback: "Znakomicie! Klasyczny, podręcznikowy obraz kliniczny zespołu podkradania tętnicy podobojczykowej (SSS): ciasne zwężenie lub niedrożność proksymalnego odcinka tętnicy podobojczykowej (przed odejściem tętnicy kręgowej, najczęściej po stronie lewej). Podczas wysiłku naczynia mięśni lewego ramienia rozszerzają się, ciśnienie za zwężeniem gwałtownie spada, a krew z koła Willisa i prawej tętnicy kręgowej zaczyna płynąć WSTECZNIE w dół lewej tętnicy kręgowej do ramienia – dochodzi do 'okradania' móżdżku i pnia mózgu z krwi, co daje zawroty głowy, diplopię, ataksję i drop attacks!"
          },
          {
            text: "Łagodne napadowe położeniowe zawroty głowy (BPPV), zaleć manewr Epleya.",
            correct: false,
            feedback: "W BPPV zawroty zależą od pozycji głowy, a nie od pracy mięśniowej kończyny górnej i nie towarzyszy im męczliwość ręki ani asymetria tętna."
          },
          {
            text: "Zapalenie ucha środkowego lewostronne, przepisz krople do uszu.",
            correct: false,
            feedback: "Brak związku z wysiłkiem lewej ręki i objawami niedokrwienia mózgowego."
          },
          {
            text: "Choroba Alzheimera w stadium początkowym.",
            correct: false,
            feedback: "Niedorzeczne rozpoznanie w kontekście incydentów naczyniowych."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Badanie przedmiotowe – obustronny pomiar ciśnienia tętniczego i tętna",
        desc: "Jakie dwa podstawowe badania fizykalne musisz natychmiast wykonać w gabinecie, aby potwierdzić podejrzenie zespołu podkradania tętnicy podobojczykowej?",
        scenario: "Jakie dwa podstawowe badania fizykalne musisz natychmiast wykonać w gabinecie, aby potwierdzić podejrzenie zespołu podkradania tętnicy podobojczykowej?",
        options: [
          {
            text: "Obustronny pomiar ciśnienia tętniczego na obu ramionach (stwierdzenie asymetrii ciśnienia skurczowego SBP >15-20 mmHg na niekorzyść chorej kończyny) oraz jednoczesna palpacja tętna na tętnicach promieniowych (stwierdzenie osłabienia lub opóźnienia fali tętna na chorym ramieniu) i osłuchiwanie dołków nadobojczykowych (szmer naczyniowy).",
            correct: true,
            feedback: "Dokładnie tak! Złota zasada internistyczna: u każdego pacjenta z zawrotami głowy lub podejrzeniem chorób naczyniowych ciśnienie tętnicze mierzy się NA OBU RAMIONACH! W zespole podkradania tętnicy podobojczykowej różnica ciśnienia skurczowego między ramieniem zdrowym a chorym wynosi niemal zawsze >20 mmHg (często 30-50 mmHg!). Tętno po stronie zwężenia jest wyraźnie słabsze i opóźnione."
          },
          {
            text: "Pomiar obwodu głowy i badanie wzroku tablicami Snellena.",
            correct: false,
            feedback: "Niewystarczające i nie bada hemodynamicznych skutków zwężenia tętnicy podobojczykowej."
          },
          {
            text: "Opukiwanie zatok przynosowych.",
            correct: false,
            feedback: "Brak związku."
          },
          {
            text: "Pomiar temperatury w odbycie.",
            correct: false,
            feedback: "Niedorzeczne."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Wynik badania fizykalnego u naszego pacjenta",
        desc: "Mierzysz ciśnienie tętnicze: prawe ramię = 150/85 mmHg, lewe ramię = 105/65 mmHg (różnica SBP wynosi aż 45 mmHg!). Tętno na lewej tętnicy promieniowej jest leniwe i słabo napięte, a nad lewym dołem nadobojczykowym wysłuchujesz szorstki szmer skurczowy. Jakie badanie ultrasonograficzne jest badaniem pierwszego rzutu do obiektywizacji przepływu mózgowego?",
        scenario: "Mierzysz ciśnienie tętnicze: prawe ramię = 150/85 mmHg, lewe ramię = 105/65 mmHg (różnica SBP wynosi aż 45 mmHg!). Tętno na lewej tętnicy promieniowej jest leniwe i słabo napięte, a nad lewym dołem nadobojczykowym wysłuchujesz szorstki szmer skurczowy. Jakie badanie ultrasonograficzne jest badaniem pierwszego rzutu do obiektywizacji przepływu mózgowego?",
        options: [
          {
            text: "Badanie USG Duplex Doppler tętnic dogłowowych (szyjnych i kręgowych) z oceną kierunku przepływu w lewej tętnicy kręgowej w spoczynku oraz podczas próby reaktywnego przekrwienia (test mankietowy).",
            correct: true,
            feedback: "Prawidłowo! Badanie Duplex Doppler naczyń domózgowych pozwala bezpośrednio uwidocznić odwrócenie kierunku przepływu w tętnicy kręgowej (przepływ wsteczny / odgłowowy). Test mankietowy (zaciśnięcie mankietu ciśnieniomierza na chorym ramieniu powyżej ciśnienia skurczowego na 3 minuty i gwałtowne spuszczenie powietrza) wywołuje masywne przekrwienie reaktywne i natychmiastowe nasilenie wstecznego podkradania krwi z mózgu!"
          },
          {
            text: "USG tarczycy z biopsją cienkoigłową.",
            correct: false,
            feedback: "Tarczyca nie odpowiada za zjawisko podkradania naczyniowego."
          },
          {
            text: "Echo serca przezprzełykowe.",
            correct: false,
            feedback: "Choć może uwidocznić łuk aorty, badaniem z wyboru dla tętnic kręgowych jest USG Duplex naczyń szyjnych."
          },
          {
            text: "Prześwietlenie RTG czaszki.",
            correct: false,
            feedback: "RTG kości czaszki nie pokazuje kierunku przepływu krwi w tętnicach."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Spektrum ultrasonograficzne – stadia zespołu podkradania tętnicy kręgowej",
        desc: "Ultrasonografista opisuje przepływ w lewej tętnicy kręgowej: w spoczynku stwierdza się głębokie skurczowe wcięcie fali przepływu z odwróceniem fazy skurczowej (tzw. zjawisko 'królika' / rabbit sign), a po próbie przekrwienia lewego ramienia przepływ staje się całkowicie odwrócony (wsteczny, skierowany ku dołowi) w całym cyklu pracy serca. Jakie stadia podkradania wyróżnia się w ultrasonografii naczyniowej?",
        scenario: "Ultrasonografista opisuje przepływ w lewej tętnicy kręgowej: w spoczynku stwierdza się głębokie skurczowe wcięcie fali przepływu z odwróceniem fazy skurczowej (tzw. zjawisko 'królika' / rabbit sign), a po próbie przekrwienia lewego ramienia przepływ staje się całkowicie odwrócony (wsteczny, skierowany ku dołowi) w całym cyklu pracy serca. Jakie stadia podkradania wyróżnia się w ultrasonografii naczyniowej?",
        options: [
          {
            text: "Stopień I (utajony/pre-steal – objaw królika / przejściowe wyhamowanie w skurczu), Stopień II (częściowy/przemijający – przepływ wsteczny w skurczu, a prawidłowy w rozkurczu) oraz Stopień III (pełny/utrwalony steal – całkowicie wsteczny przepływ w skurczu i rozkurczu); u pacjenta występuje pełny hemodynamiczny zespół podkradania.",
            correct: true,
            feedback: "Wybitna precyzja! Klasyfikacja ultrasonograficzna zespołów podkradania: Stopień I (wczesne podkradanie / rabbit ear waveform), Stopień II (przepływ dwukierunkowy naprzemienny – 'to-and-fro'), Stopień III (stały przepływ wsteczny od mózgu do ramienia). U naszego pacjenta próba wysiłkowa ramienia indukuje pełne odwrócenie przepływu, co koreluje z objawami neurologicznymi (vertebrobasilar insufficiency)."
          },
          {
            text: "W USG nie ma żadnych stadiów, krew płynie zawsze tylko w jedną stronę.",
            correct: false,
            feedback: "Błędne rozumienie dynamiki płynów – gradient ciśnień odwraca kierunek przepływu."
          },
          {
            text: "Objaw królika oznacza zakażenie tularemią.",
            correct: false,
            feedback: "Zbieżność nazw – falowy zarys przypominający uszy królika to określenie spektrum dopplerowskiego."
          },
          {
            text: "Stopień III oznacza, że mózg przestał całkowicie pracować.",
            correct: false,
            feedback: "Oznacza odwrócenie kierunku przepływu w tętnicy kręgowej, a nie śmierć mózgu."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Weryfikacja angiograficzna – angio-TK lub angio-MRI łuku aorty",
        desc: "W celu zaplanowania leczenia zabiegowego wykonano pilną angio-TK łuku aorty i naczyń dogłowowych. Badanie wykazało: zwapniałą blaszkę miażdżycową zwężającą odejście lewej tętnicy podobojczykowej o 85%, przed odejściem tętnicy kręgowej lewej; pień ramienno-głowowy i tętnice szyjne drożne. Jakie są opcje leczenia zabiegowego wg współczesnych wytycznych ESVS?",
        scenario: "W celu zaplanowania leczenia zabiegowego wykonano pilną angio-TK łuku aorty i naczyń dogłowowych. Badanie wykazało: zwapniałą blaszkę miażdżycową zwężającą odejście lewej tętnicy podobojczykowej o 85%, przed odejściem tętnicy kręgowej lewej; pień ramienno-głowowy i tętnice szyjne drożne. Jakie są opcje leczenia zabiegowego wg współczesnych wytycznych ESVS?",
        options: [
          {
            text: "Metodą pierwszego wyboru jest przezskórna angioplastyka balonowa z implantacją stentu (PTA + stent) do lewej tętnicy podobojczykowej z dostępu przez tętnicę udową lub promieniową; alternatywą chirurgiczną w razie niepowodzenia jest pomostowanie szyjno-podobojczykowe (carotid-subclavian bypass) lub transpozycja naczynia.",
            correct: true,
            feedback: "Znakomicie! Wytyczne ESVS (European Society for Vascular Surgery): u chorych z objawowym SSS leczenie endowaskularne (PTA ze stentem balonowo-rozprężalnym) jest metodą pierwszego rzutu ze względu na znikomą inwazyjność, wysoki odsetek sukcesu (>95%) i niskie ryzyko powikłań. Zabieg wykonuje się w znieczuleniu miejscowym. Chirurgia otwarta (by-pass z żyły lub sztucznej protezy łączący tętnicę szyjną wspólną z podobojczykową) rezerwowana jest dla skrajnie zwapniałych, długich okluzji naczynia."
          },
          {
            text: "Bezwzględna torakotomia otwarta z wycięciem całego łuku aorty u każdego chorego.",
            correct: false,
            feedback: "Otwarta torakotomia to zabieg o ogromnej śmiertelności, całkowicie wyparty w tym wskazaniu przez małoinwazyjne stentowanie endowaskularne."
          },
          {
            text: "Wskazane jest wyłącznie noszenie temblaka na lewej ręce i zakaz ruszania nią do końca życia.",
            correct: false,
            feedback: "Niedorzeczne."
          },
          {
            text: "Podwiązanie obu tętnic kręgowych.",
            correct: false,
            feedback: "Podwiązanie tętnic kręgowych wywołałoby zawał pnia mózgu i zgon."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Szczególna odmiana SSS – Zespół podkradania wieńcowo-podobojczykowego (Coronary-Subclavian Steal)",
        desc: "Dyżurny kardiochirurg zwraca uwagę na szczególne zagrożenie: gdyby pacjent w przeszłości przebył operację by-passów aortalno-wieńcowych (CABG) z użyciem lewej tętnicy piersiowej wewnętrznej (LIMA) wszytej do gałęzi przedniej zstępującej (LAD), do jakiego groźnego powjawu doszłoby przy pracy lewą ręką?",
        scenario: "Dyżurny kardiochirurg zwraca uwagę na szczególne zagrożenie: gdyby pacjent w przeszłości przebył operację by-passów aortalno-wieńcowych (CABG) z użyciem lewej tętnicy piersiowej wewnętrznej (LIMA) wszytej do gałęzi przedniej zstępującej (LAD), do jakiego groźnego powjawu doszłoby przy pracy lewą ręką?",
        options: [
          {
            text: "Zespół podkradania wieńcowo-podobojczykowego (Coronary-Subclavian Steal Syndrome): praca lewą ręką powoduje odwrócenie przepływu w pomoście LIMA-LAD i 'wysysanie' krwi z tętnicy wieńcowej do ramienia, wywołując ostry ból dławicowy, niedokrwienie mięśnia sercowego lub zawał serca w trakcie wysiłku kończyny górnej!",
            correct: true,
            feedback: "Genialna korelacja kardiochirurgiczna! Częste pytanie na egzaminach specjalizacyjnych i LEK: lewa tętnica piersiowa wewnętrzna (LIMA) odchodzi od tętnicy podobojczykowej. Jeśli u chorego z by-passem LIMA-LAD dojdzie do zwężenia odejścia tętnicy podobojczykowej, praca lewym ramieniem kradnie krew nie tylko z mózgu (przez t. kręgową), ale także z serca (przez pomost LIMA), powodując dławicę piersiową (angina pectoris) wywoływaną pracą ręki!"
          },
          {
            text: "Do pęknięcia zastawki aortalnej z nagłą asystolią.",
            correct: false,
            feedback: "Zastawka aortalna nie ulega pęknięciu od zwężenia tętnicy podobojczykowej."
          },
          {
            text: "Do obrzęku płuc wywołanego refluksem żołądkowym.",
            correct: false,
            feedback: "Brak związku patofizjologicznego."
          },
          {
            text: "Ręka staje się całkowicie niewidzialna na zdjęciu RTG.",
            correct: false,
            feedback: "Absurdalne stwierdzenie."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Wykonanie zabiegu endowaskularnego i kontrola hemostazy",
        desc: "U naszego pacjenta wykonano udany zabieg przezskórnej angioplastyki ze stentem balonowo-rozprężalnym lewej tętnicy podobojczykowej z dostępu przez prawą tętnicę udową. Po rozprężeniu stentu gradient ciśnień uległ całkowitemu zniesieniu, a kontrolna angiografia wykazała natychmiastowy powrót prawidłowego, fizjologicznego, dogłowowego kierunku przepływu w lewej tętnicy kręgowej. Jakie ciśnienie tętnicze stwierdzasz po zabiegu na lewym ramieniu?",
        scenario: "U naszego pacjenta wykonano udany zabieg przezskórnej angioplastyki ze stentem balonowo-rozprężalnym lewej tętnicy podobojczykowej z dostępu przez prawą tętnicę udową. Po rozprężeniu stentu gradient ciśnień uległ całkowitemu zniesieniu, a kontrolna angiografia wykazała natychmiastowy powrót prawidłowego, fizjologicznego, dogłowowego kierunku przepływu w lewej tętnicy kręgowej. Jakie ciśnienie tętnicze stwierdzasz po zabiegu na lewym ramieniu?",
        options: [
          {
            text: "Wyrównanie ciśnienia tętniczego na obu kończynach górnych (lewe ramię: 145/80 mmHg, prawe ramię: 148/82 mmHg, różnica <5 mmHg), powrót symetrycznego, dobrze napiętego tętna na obu tętnicach promieniowych i całkowite ustąpienie szmeru nadobojczykowego.",
            correct: true,
            feedback: "Dokładnie tak! Natychmiastowym hemodynamicznym dowodem skuteczności udrożnienia tętnicy podobojczykowej jest zniesienie asymetrii ciśnień między ramionami oraz normalizacja fali tętna obwodowego. Pacjent nie zgłasza już zawrotów głowy przy unoszeniu ręki."
          },
          {
            text: "Spadek ciśnienia na lewym ramieniu do 0 mmHg.",
            correct: false,
            feedback: "Ciśnienie 0 mmHg oznaczałoby zamknięcie naczynia i błąd zabiegu."
          },
          {
            text: "Wzrost ciśnienia do 300/180 mmHg na lewym ramieniu.",
            correct: false,
            feedback: "Niedorzeczne."
          },
          {
            text: "Ciśnienie pozostaje asymetryczne z różnicą 80 mmHg.",
            correct: false,
            feedback: "Świadczyłoby o niepowodzeniu zabiegu."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Prewencja wtórna i farmakoterapia po implantacji stentu",
        desc: "Jaką farmakoterapię przeciwpłytkową i hipotensyjno-lipidową zalecasz pacjentowi przy wypisie ze szpitala zgodnie ze standardami naczyniowymi?",
        scenario: "Jaką farmakoterapię przeciwpłytkową i hipotensyjno-lipidową zalecasz pacjentowi przy wypisie ze szpitala zgodnie ze standardami naczyniowymi?",
        options: [
          {
            text: "Podwójna terapia przeciwpłytkowa (DAPT: ASA 75-100 mg + klopidogrel 75 mg) przez minimum 1-3 miesiące, a następnie monoterapia ASA lub klopidogrelem do końca życia, wysoka dawka statyny (atorwastatyna 40-80 mg, cel LDL <55 mg/dL), optymalizacja leczenia nadciśnienia tętniczego (ACE-I) oraz bezwzględne zaprzestanie palenia tytoniu.",
            correct: true,
            feedback: "Wybitnie! Standard postępowania po implantacji stentu do tętnicy podobojczykowej: DAPT zapobiega wczesnej podostrej zakrzepicy stentu do czasu jego pełnej endotelizacji. Agresywna redukcja LDL (<55 mg/dl) i kontrola ciśnienia tętniczego hamują progresję miażdżycy w innych łożyskach naczyniowych (wieńcowym i mózgowym)."
          },
          {
            text: "Odstawienie wszelkich leków i zalecenie palenia tytoniu.",
            correct: false,
            feedback: "Kardynalny błąd zagrażający zawałem i zakrzepicą stentu."
          },
          {
            text: "Wyłącznie leki homeopatyczne.",
            correct: false,
            feedback: "Niedopuszczalne."
          },
          {
            text: "Dożywotnia dializoterapia.",
            correct: false,
            feedback: "Pacjent ma prawidłową czynność nerek."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 148: Polytrauma / Uraz wielonarządowy
  // ==========================================
  await upgradeCase('148_polytrauma_uraz_wielonarzadowy.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena w obszarze resuscytacyjnym (Trauma Room) – 32-letni motocyklista",
        desc: "ZRM przywozi na kodzie czerwonym 32-letniego motocyklistę po czołowym zderzeniu z samochodem ciężarowym przy prędkości szacowanej na 90 km/h. Chory wyrzucony z motocykla na odległość 15 metrów. Na desce ortopedycznej w kołnierzu szyjnym. Stan pacjenta: blady, podsypiający, jęczy z bólu, chaotycznie odpowiada na pytania (GCS 11: E3 V3 M5). Parametry życiowe: HR 138/min (nitkowate tętno na t. promieniowej), BP 76/42 mmHg, SpO2 91% na masce z rezerwuarem, RR 28/min. W badaniu 'na wejściu': asymetryczna klatka piersiowa z otarciami po stronie prawej, brzuch deskowato twardy i wzdęty, niestabilność obręczy miednicy przy delikatnym teście uciskowym, patologiczna ruchomość i skrócenie prawego uda. Jakie jest Twoje natychmiastowe rozpoznanie i priorytet organizacyjny?",
        scenario: "ZRM przywozi na kodzie czerwonym 32-letniego motocyklistę po czołowym zderzeniu z samochodem ciężarowym przy prędkości szacowanej na 90 km/h. Chory wyrzucony z motocykla na odległość 15 metrów. Na desce ortopedycznej w kołnierzu szyjnym. Stan pacjenta: blady, podsypiający, jęczy z bólu, chaotycznie odpowiada na pytania (GCS 11: E3 V3 M5). Parametry życiowe: HR 138/min (nitkowate tętno na t. promieniowej), BP 76/42 mmHg, SpO2 91% na masce z rezerwuarem, RR 28/min. W badaniu 'na wejściu': asymetryczna klatka piersiowa z otarciami po stronie prawej, brzuch deskowato twardy i wzdęty, niestabilność obręczy miednicy przy delikatnym teście uciskowym, patologiczna ruchomość i skrócenie prawego uda. Jakie jest Twoje natychmiastowe rozpoznanie i priorytet organizacyjny?",
        options: [
          {
            text: "Uraz wielonarządowy (Polytrauma) z ciężkim wstrząsem krwotocznym (stopień IV wg ATLS, utrata >40% objętości krwi krążącej) zagrażającym zatrzymaniem krążenia; natychmiastowe objęcie roli Lidera Zespołu Urazowego (Trauma Team Leader) i wdrożenie protokołu ATLS ABCDE.",
            correct: true,
            feedback: "Znakomicie! Polytrauma (uraz wielonarządowy) definiowana jest jako jednoczesne uszkodzenie co najmniej dwóch jam ciała lub układów narządowych, z których przynajmniej jedno stanowi bezpośrednie zagrożenie życia (ISS >15-16). Chory znajduje się w IV stopniu wstrząsu krwotocznego (tachykardia >120-140/min, ciężka hipotonia SBP <80 mmHg, zaburzenia świadomości GCS 11). Każda sekunda zwłoki decyduje o przeżyciu."
          },
          {
            text: "Stan pacjenta jest stabilny, kierujesz go do kolejki do planowego RTG kończyn dolnych.",
            correct: false,
            feedback: "Kardynalny błąd zwiastujący natychmiastowy zgon chorego w kolejce do RTG!"
          },
          {
            text: "Izolowany uraz głowy, podaj mannitol i czekaj na neurologa.",
            correct: false,
            feedback: "Hipotonia 76/42 mmHg i tachykardia 138/min w urazie tępym są wywołane KRWOTOKIEM wewnętrznym (brzuch, miednica, udo), a nie izolowanym urazem głowy!"
          },
          {
            text: "Wstrząs septyczny z powodu zapalenia płuc.",
            correct: false,
            feedback: "U pacjenta po wypadku z licznymi złamaniami i krwawieniem to wstrząs hipowolemiczny/krwotoczny."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Protokół ATLS – Sekwencja ABCDE w pierwszych 3 minutach",
        desc: "Jako lider zespołu urazowego koordynujesz jednoczesne działania zespołu. Jakie natychmiastowe procedury ratujące życie wdrażasz w poszczególnych punktach ABC?",
        scenario: "Jako lider zespołu urazowego koordynujesz jednoczesne działania zespołu. Jakie natychmiastowe procedury ratujące życie wdrażasz w poszczególnych punktach ABC?",
        options: [
          {
            text: "A: Udrożnienie dróg oddechowych z ręczną stabilizacją kręgosłupa szyjnego; B: Osłuchanie klatki piersiowej i dekompresja ewentualnej odmy prężnej; C: Założenie pasa miednicowego (pelvic binder) na krętarze większe, unieruchomienie złamania uda szyną wyciągową, zaopatrzenie 2 dużych kaniul naczyniowych (14-16G) lub dostęp doszpikowy (IO), pobranie grupy krwi i próby krzyżowej.",
            correct: true,
            feedback: "Perfekcyjna realizacja protokołu ATLS! W niestabilnym złamaniu miednicy pas miednicowy (pelvic binder) założony na wysokości krętarzy większych zmniejsza objętość miednicy mniejszej, tamponując krwawienie z żylnych splotów zaotrzewnowych (może tam zmieścić się nawet kilka litrów krwi!). Unieruchomienie złamanej kości udowej (tamponada krwiaka do 1000-1500 ml) oraz zabezpieczenie dróg oddechowych to kluczowe priorytety resuscytacji."
          },
          {
            text: "Zlecasz natychmiastowe zdjęcie kołnierza ortopedycznego i energiczne zginanie szyi we wszystkich kierunkach.",
            correct: false,
            feedback: "Śmiertelnie niebezpieczne! Grozi przerwaniem rdzenia kręgowego przy niestabilnym złamaniu kręgów szyjnych."
          },
          {
            text: "Wielokrotne manualne ściskanie i rozwieranie miednicy przez różnych członków zespołu.",
            correct: false,
            feedback: "Kardynalny błąd! Badanie stabilności miednicy wykonuje się TYLKO RAZ bardzo delikatnie; ponowne 'bujanie miednicą' niszczy powstałe skrzepy i nasila śmiertelny krwotok!"
          },
          {
            text: "Podanie dożylnie 5 litrów glukozy 5%.",
            correct: false,
            feedback: "Czysta glukoza wywoła obrzęk mózgu i nie uzupełni objętości wewnątrznaczyniowej."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Badanie E-FAST w Trauma Room – lokalizacja źródeł krwawienia",
        desc: "Wykonywane jest badanie E-FAST. Wynik: Przestrzeń Morisona – obecny wolny płyn (krew) w jamie otrzewnej (grubość pasma 22 mm). Zachyłek Kollera – wolny płyn. Miednica – wolny płyn wokół pęcherza. Prawa jama opłucnej – brak objawu ślizgania płuca (lung sliding) w przednich polach, obecny objaw 'kodu kreskowego' (barcode sign) w M-mode świadczący o odmie opłucnowej, w kącie przeponowym płyn bezechowy (krwiak opłucnej). Co robisz natychmiast przy łóżku pacjenta?",
        scenario: "Wykonywane jest badanie E-FAST. Wynik: Przestrzeń Morisona – obecny wolny płyn (krew) w jamie otrzewnej (grubość pasma 22 mm). Zachyłek Kollera – wolny płyn. Miednica – wolny płyn wokół pęcherza. Prawa jama opłucnej – brak objawu ślizgania płuca (lung sliding) w przednich polach, obecny objaw 'kodu kreskowego' (barcode sign) w M-mode świadczący o odmie opłucnowej, w kącie przeponowym płyn bezechowy (krwiak opłucnej). Co robisz natychmiast przy łóżku pacjenta?",
        options: [
          {
            text: "Natychmiastowy drenaż prawej jamy opłucnej grubym drenem (28-32F) w V przestrzeni międzyżebrowej w linii pachowej przedniej/środkowej celem odbarczenia odmy prężnej i krwiaka opłucnej; potwierdzenie krwawienia do otrzewnej (haemoperitoneum) u niestabilnego chorego stanowi bezpośrednie wskazanie do natychmiastowej laparotomii.",
            correct: true,
            feedback: "Znakomicie! E-FAST wykazał odmę z krwiakiem opłucnej (haemopneumothorax) po stronie prawej – odbarczenie drenem jest natychmiastowym priorytetem B przed intubacją i wentylacją mechaniczną z dodatnim ciśnieniem (która bez drenażu zamieniłaby odmę w odmę prężną i asystolię!). Obecność obfitego płynu w jamie brzusznej u pacjenta niestabilnego hemodynamicznie oznacza konieczność natychmiastowej operacji."
          },
          {
            text: "Zlecasz leczenie zachowawcze i czekasz 6 godzin na samoistne wchłonięcie krwi.",
            correct: false,
            feedback: "Chory umrze z powodu uduszenia i wykrwawienia."
          },
          {
            text: "Wykonujesz natychmiastowe nakłucie lędźwiowe.",
            correct: false,
            feedback: "Bezwzględnie przeciwwskazane i absurdalne."
          },
          {
            text: "Wyjeżdżasz z niestabilnym chorym natychmiast na 45-minutowe badanie całego ciała w rezonansie magnetycznym.",
            correct: false,
            feedback: "Śmiertelny błąd! Pacjent we wstrząsie nie przeżyje badania MRI."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Uruchomienie Protokołu Masywnej Transfuzji (MTP) i kwas traneksamowy (TXA)",
        desc: "Morfologia z gazometrii: Hb 6.8 g/dL, pH 7.15, BE -11 mmol/L, mleczany 6.2 mmol/L. Pacjent jest w głębokiej kwasicy metabolicznej i wstrząsie krwotocznym. Jakie leczenie płynowo-transfuzyjne wdrażasz zgodnie z wytycznymi Europejskimi (European Trauma Guidelines)?",
        scenario: "Morfologia z gazometrii: Hb 6.8 g/dL, pH 7.15, BE -11 mmol/L, mleczany 6.2 mmol/L. Pacjent jest w głębokiej kwasicy metabolicznej i wstrząsie krwotocznym. Jakie leczenie płynowo-transfuzyjne wdrażasz zgodnie z wytycznymi Europejskimi (European Trauma Guidelines)?",
        options: [
          {
            text: "Uruchomienie Protokołu Masywnej Transfuzji (MTP) w zrównoważonym stosunku 1:1:1 (KKCz : FFP : KKP) z użyciem podgrzewacza płynów i szybkiej przetaczarki (rapid infuser), natychmiastowe podanie kwasu traneksamowego (TXA 1 g i.v. w ciągu 10 min, następnie 1 g we wlewie na 8h) oraz suplementacja wapnia (CaCl2) w celu utrzymania Ca2+ zjonizowanego >1.1 mmol/L.",
            correct: true,
            feedback: "Perfekcyjna, nowoczesna hemostatyczna resuscytacja urazowa! Protokół zbilansowanej transfuzji 1:1:1 (tzw. damage control resuscitation) zapobiega koagulopatii z rozcieńczenia. Kwas traneksamowy (TXA) podany w ciągu 3h od urazu istotnie redukuje śmiertelność (badanie CRASH-2). Wapń jest kofaktorem krzepnięcia (IV czynnik krzepnięcia) – przetaczany cytrynian z preparatów krwi wiąże wolny wapń, a hipokalcemia paraliżuje hemostazę i kurczliwość serca (tzw. diament śmierci: kwasica, hipotermia, koagulopatia, hipokalcemia)!"
          },
          {
            text: "Wlew 6 litrów zimnej soli fizjologicznej 0.9% NaCl bez przetaczania krwi.",
            correct: false,
            feedback: "Zimna sól fizjologiczna wywoła hipotermię, kwasicę hiperchloremiczną i zgon."
          },
          {
            text: "Odstąpienie od kwasu traneksamowego, ponieważ TXA wolno podawać tylko po 24 godzinach.",
            correct: false,
            feedback: "Błąd! TXA podany po upływie 3 godzin od urazu zwiększa śmiertelność – musi być podany jak najszybciej w pierwszych 3h!"
          },
          {
            text: "Podanie wyłącznie leków przeczyszczających.",
            correct: false,
            feedback: "Niedorzeczne."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Filozofia Damage Control Surgery (DCS) – walka ze 'Śmiertelną Triadą'",
        desc: "Chory trafia prosto na blok operacyjny. Co oznacza koncepcja chirurgii kontroli uszkodzeń (Damage Control Surgery - DCS) w przeciwieństwie do tradycyjnej operacji definitywnej i przed jakimi zjawiskami chroni chorego?",
        scenario: "Chory trafia prosto na blok operacyjny. Co oznacza koncepcja chirurgii kontroli uszkodzeń (Damage Control Surgery - DCS) w przeciwieństwie do tradycyjnej operacji definitywnej i przed jakimi zjawiskami chroni chorego?",
        options: [
          {
            text: "DCS to taktyka operacyjna polegająca na rezygnacji z czasochłonnych zabiegów rekonstrukcyjnych na rzecz natychmiastowego opanowania krwotoku i skażenia kałowego, a następnie szybkiego zakończenia operacji i przekazania chorego na OIT w celu przerwania 'Śmiertelnej Triady' (kwasica, hipotermia, koagulopatia); operacje definitywne odracza się o 24-48 godzin.",
            correct: true,
            feedback: "Genialnie! Klasyczny fundament chirurgii urazowej: u wykrwawionego pacjenta 'Śmiertelna Triada' (kwasica + hipotermia <35°C + koagulopatia) sprawia, że pacjent umiera nie z powodu ran anatomicznych, lecz wyczerpania rezerw fizjologicznych. Długotrwała, wielogodzinna operacja definitywna jest 'drugim ciosem' (second hit) i kończy się zgonem na stole. DCS ratuje życie poprzez ograniczenie pierwszej operacji do minimum!"
          },
          {
            text: "DCS polega na jednoczesnym wykonaniu wszystkich możliwych operacji estetycznych i plastycznych.",
            correct: false,
            feedback: "Absurdalny brak zrozumienia."
          },
          {
            text: "DCS oznacza odmowę operacji i wyłącznie modlitwę za chorego.",
            correct: false,
            feedback: "Niedorzeczne."
          },
          {
            text: "DCS stosuje się wyłącznie u pacjentów ze złamaniem małego palca.",
            correct: false,
            feedback: "Błędne pojęcie."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Faza 1 DCS – Śródoperacyjne zaopatrzenie w Damage Control Laparotomy",
        desc: "Chirurdzy otwierają jamę brzuszną z cięcia pośrodkowego. W jamie otrzewnej stwierdzają 2000 ml krwi i skrzepów, pęknięcie wątroby segmentu VI/VII oraz rozerwanie krezki jelita krętego na odcinku 15 cm z martwicą pętli jelita. Jakie techniki stosuje się w Fazie 1 DCS?",
        scenario: "Chirurdzy otwierają jamę brzuszną z cięcia pośrodkowego. W jamie otrzewnej stwierdzają 2000 ml krwi i skrzepów, pęknięcie wątroby segmentu VI/VII oraz rozerwanie krezki jelita krętego na odcinku 15 cm z martwicą pętli jelita. Jakie techniki stosuje się w Fazie 1 DCS?",
        options: [
          {
            text: "Ewakuacja skrzepów, packing wątroby serwetami operacyjnymi (perihepatic packing) w celu hemostazy uciskowej, szybka resekcja martwiczego jelita za pomocą staplerów mechanicznych z pozostawieniem jelita na głucho (BEZ wykonywania czasochłonnego zespolenia!) oraz tymczasowe zamknięcie powłok brzusznych techniką otwartego brzucha (laparostomia / Bogota bag / opatrunek podciśnieniowy NPWT).",
            correct: true,
            feedback: "Doskonale! Prawidłowa sekwencja Fazy 1 DCS: 1) Czterokwadrantowy packing (upakowanie serwet wokół wątroby); 2) Zatamowanie krwawień chirurgicznych; 3) Opanowanie skażenia (staplerowe odcięcie uszkodzonego jelita, bez zespoleń – wykonanie zespolenia w stanie wstrząsu i kwasicy skończyłoby się jego natychmiastowym rozejściem!); 4) Pozostawienie 'otwartego brzucha' (laparostomii) zapobiega zespołowi ciasnoty wewnątrzbrzusznej (ACS). Całość trwa <60 minut!"
          },
          {
            text: "Wykonanie anatomicznej resekcji prawej połowy wątroby i 8 zespoleń jelitowych ręcznymi szwami piętrowymi.",
            correct: false,
            feedback: "Wielogodzinna operacja w ciężkiej hipotermii i koagulopatii skończyłaby się zgonem na stole operacyjnym."
          },
          {
            text: "Zaszycie powłok brzusznych pod maksymalnym napięciem szwem metalowym.",
            correct: false,
            feedback: "Wywołałoby natychmiastowy śmiertelny zespół ciasnoty wewnątrzbrzusznej (ACS)."
          },
          {
            text: "Pozostawienie narzędzi chirurgicznych w brzuchu jako drenów.",
            correct: false,
            feedback: "Niedopuszczalne."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Faza 2 DCS – Intensywna terapia i optymalizacja na OIT (Resuscitation Phase)",
        desc: "Chory z otwartym brzuchem zaopatrzonym opatrunkiem podciśnieniowym trafia na OIT. Złamanie uda i miednicy zabezpieczono zewnętrznie. Jakie są główne cele Fazy 2 DCS na OIT w ciągu kolejnych 24-48 godzin przed planowaną powtórną operacją?",
        scenario: "Chory z otwartym brzuchem zaopatrzonym opatrunkiem podciśnieniowym trafia na OIT. Złamanie uda i miednicy zabezpieczono zewnętrznie. Jakie są główne cele Fazy 2 DCS na OIT w ciągu kolejnych 24-48 godzin przed planowaną powtórną operacją?",
        options: [
          {
            text: "Aktywne ogrzanie pacjenta (cel temp. >36.0°C), wyrównanie kwasicy (normalizacja pH i mleczanów), korekta koagulopatii (osocze, krioprecypitat, fibrynogen >1.5-2.0 g/L, płytki >50-100 G/L) oraz monitorowanie ciśnienia śródbrzusznego (IAP w pęcherzu) i stabilizacja hemodynamiczna.",
            correct: true,
            feedback: "Znakomicie! Faza 2 DCS to walka o fizjologiczny powrót do życia: dopóki pacjent jest w hipotermii, enzymy kaskady krzepnięcia nie działają, a kwasica uniemożliwia skurcz naczyń. Dopiero po odwróceniu triady śmierci (ogrzanie, hemostaza, korekta gazometrii i mleczanów) pacjent staje się zdolny do przetrwania operacji rekonstrukcyjnej!"
          },
          {
            text: "Ochłodzenie pacjenta do 28°C i całkowite odstawienie tlenu.",
            correct: false,
            feedback: "Głęboka hipotermia zablokuje hemostazę i wywoła migotanie komór."
          },
          {
            text: "Natychmiastowe wypisanie pacjenta do domu.",
            correct: false,
            feedback: "Niedorzeczne."
          },
          {
            text: "Przetoczenie 20 litrów samej wody destylowanej.",
            correct: false,
            feedback: "Wywołałoby masywną hemolizę i zgon."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Faza 3 DCS – Planowa reoperacja (Second Look) i leczenie definitywne",
        desc: "Po 36 godzinach intensywnej terapii na OIT: pacjent ma temperaturę 36.8°C, pH 7.38, mleczany 1.4 mmol/L, parametry krzepnięcia w normie, stabilne krążenie. Wraca na blok operacyjny do Fazy 3 DCS. Co obejmuje ten etap?",
        scenario: "Po 36 godzinach intensywnej terapii na OIT: pacjent ma temperaturę 36.8°C, pH 7.38, mleczany 1.4 mmol/L, parametry krzepnięcia w normie, stabilne krążenie. Wraca na blok operacyjny do Fazy 3 DCS. Co obejmuje ten etap?",
        options: [
          {
            text: "Usunięcie serwet z wątroby (depacking), ostateczna kontrola hemostazy, odtworzenie ciągłości przewodu pokarmowego (zespolenie jelitowe lub stomia), dokładna rewizja pozostałych narządów jamy brzusznej oraz definitywne zamknięcie powłok brzusznych (lub kontynuacja zamykania stopniowego).",
            correct: true,
            feedback: "Wybitnie! Faza 3 DCS to planowy 'second look': bezpieczne usunięcie serwet (po 24-48h naczynia są już zakrzepnięte), ostateczna hemostaza, wykonanie planowego zespolenia jelitowego u pacjenta z prawidłowym ukrwieniem i zamknięcie powłok. W ten sposób pacjent ocalił życie dzięki trójfazowej strategii Damage Control!"
          },
          {
            text: "Pozostawienie serwet w jamie brzusznej na zawsze.",
            correct: false,
            feedback: "Pozostawienie serwet doprowadziłoby do ropni wewnątrzbrzusznych i sepsy."
          },
          {
            text: "Usunięcie całego przewodu pokarmowego.",
            correct: false,
            feedback: "Absurdalny błąd."
          },
          {
            text: "Zaszycie brzucha bez wyciągania serwet i bez oglądania jelit.",
            correct: false,
            feedback: "Kardynalny błąd chirurgiczny."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 149: Wiotka klatka piersiowa (Flail Chest)
  // ==========================================
  await upgradeCase('149_wiotka_klatka_piersiowa_flail_chest.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena w obszarze resuscytacji – 45-letni robotnik po upadku z rusztowania",
        desc: "ZRM przywozi 45-letniego robotnika budowlanego, który spadł z wysokości 4 metrów na metalowe rusztowanie, uderzając prawą połową klatki piersiowej. Pacjent jest przytomny, ale z powodu rozdzierającego bólu klatki piersiowej ledwo mówi, łapie płytkie, urywane oddechy i jest siny. Parametry: HR 122/min, BP 110/70 mmHg, SpO2 84% na powietrzu atmosferycznym (90% na tlenie 15 L/min), RR 34/min. Podczas oglądania klatki piersiowej zauważasz dramatyczne zjawisko: przednio-boczny fragment prawej ściany klatki piersiowej podczas każdego wdechu zapada się do wnętrza klatki, a podczas wydechu uwypukla się na zewnątrz! W badaniu palpacyjnym wyczuwalne są trzaski kostne i krepitacja podskórna. Jaka jest Twoja natychmiastowa diagnoza kliniczna?",
        scenario: "ZRM przywozi 45-letniego robotnika budowlanego, który spadł z wysokości 4 metrów na metalowe rusztowanie, uderzając prawą połową klatki piersiowej. Pacjent jest przytomny, ale z powodu rozdzierającego bólu klatki piersiowej ledwo mówi, łapie płytkie, urywane oddechy i jest siny. Parametry: HR 122/min, BP 110/70 mmHg, SpO2 84% na powietrzu atmosferycznym (90% na tlenie 15 L/min), RR 34/min. Podczas oglądania klatki piersiowej zauważasz dramatyczne zjawisko: przednio-boczny fragment prawej ściany klatki piersiowej podczas każdego wdechu zapada się do wnętrza klatki, a podczas wydechu uwypukla się na zewnątrz! W badaniu palpacyjnym wyczuwalne są trzaski kostne i krepitacja podskórna. Jaka jest Twoja natychmiastowa diagnoza kliniczna?",
        options: [
          {
            text: "Wiotka klatka piersiowa (Flail chest) z charakterystycznym oddechem paradoksalnym oraz ciężką niewydolnością oddechową w przebiegu towarzyszącego stłuczenia płuca (pulmonary contusion).",
            correct: true,
            feedback: "Znakomicie! Flail chest (wiotka klatka piersiowa) to stan zagrażający życiu, definiowany anatomicznie jako złamanie co najmniej 3 sąsiednich żeber w co najmniej 2 miejscach, co powoduje powstanie wolnego, niestabilnego segmentu kostnego ściany klatki piersiowej. Oddech paradoksalny (paradoxical breathing) polega na zapadaniu się wolnego fragmentu w fazie wdechu (wskutek ujemnego ciśnienia w jamie opłucnej) i uwypuklaniu w fazie wydechu. Główną przyczyną hipoksemii jest jednak towarzyszące stłuczenie miąższu płuca!"
          },
          {
            text: "Zwykłe stłuczenie mięśni międzyżebrowych, pacjent przesadza z bólem.",
            correct: false,
            feedback: "Zapadanie się fragmentu klatki i SpO2 84% to ciężkie uszkodzenie szkieletu klatki piersiowej i płuc, a nie zwykłe stłuczenie mięśni!"
          },
          {
            text: "Porażenie nerwu przeponowego bez złamań kostnych.",
            correct: false,
            feedback: "Krepitacja kostna i wyłamany segment żeber wykluczają brak złamań."
          },
          {
            text: "Napad paniki z hiperwentylacją u robotnika.",
            correct: false,
            feedback: "Śmiertelnie groźne zbagatelizowanie ciężkiego urazu klatki piersiowej."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Patofizjologia niewydolności oddechowej w klatce wiotkiej",
        desc: "Rezydent pyta Cię, co jest główną bezpośrednią przyczyną głębokiej hipoksemii i niewydolności oddechowej u chorych z wiotką klatką piersiową. Jak brzmi współczesne wyjaśnienie patofizjologiczne?",
        scenario: "Rezydent pyta Cię, co jest główną bezpośrednią przyczyną głębokiej hipoksemii i niewydolności oddechowej u chorych z wiotką klatką piersiową. Jak brzmi współczesne wyjaśnienie patofizjologiczne?",
        options: [
          {
            text: "Główną przyczyną zagrażającej życiu hipoksemii jest podległe stłuczenie płuca (pulmonary contusion – wybroczyny pęcherzykowe, obrzęk i zaburzenie stosunku wentylacji do perfuzji V/Q z przeciekiem płucnym) połączone z płytkim oddechem z powodu potężnego bólu opłucnowego i upośledzeniem mechaniki wentylacji.",
            correct: true,
            feedback: "Wybitna patofizjologia ATLS! Dawniej sądzono, że przyczyną jest tzw. 'powietrze wahadłowe' (Pendelluft). Współczesne badania udowodniły, że kluczowym zabójcą w klatce wiotkiej jest STŁUCZENIE PŁUCA (kontuzja miąższu płucnego leżącego pod wyłamanym segmentem) oraz blokada oddechowa wywołana bólem (pacjent nie jest w stanie nabrać powietrza ani efektywnie odkaszlnąć, co prowadzi do retencji wydzieliny i niedodmy)."
          },
          {
            text: "Jedyną przyczyną jest pęknięcie aorty piersiowej u każdego chorego.",
            correct: false,
            feedback: "Pęknięcie aorty nie jest stałym elementem flail chest."
          },
          {
            text: "Wiotka klatka piersiowa nie wpływa na oddychanie, hipoksemia wynika z braku żelaza.",
            correct: false,
            feedback: "Absurdalne twierdzenie."
          },
          {
            text: "Przyczyną jest wyłączne uszkodzenie ośrodka oddechowego w rdzeniu przedłużonym.",
            correct: false,
            feedback: "Błąd – przyczyna leży obwodowo w mechanice klatki i miąższu płuca."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Diagnostyka obrazowa – RTG i pilna tomografia komputerowa (TK)",
        desc: "Jakie badania obrazowe wykonujesz w celu precyzyjnej oceny stopnia uszkodzenia szkieletu klatki piersiowej i miąższu płuca?",
        scenario: "Jakie badania obrazowe wykonujesz w celu precyzyjnej oceny stopnia uszkodzenia szkieletu klatki piersiowej i miąższu płuca?",
        options: [
          {
            text: "Przyłóżkowe RTG klatki piersiowej (szybkie wykluczenie odmy prężnej i masywnego krwiaka), a po wstępnej stabilizacji pilna wielorzędowa tomografia komputerowa (TK) klatki piersiowej z rekonstrukcjami 3D szkieletu żeber oraz oknem płucnym (ocena rozległości stłuczenia płuca).",
            correct: true,
            feedback: "Prawidłowo! Zwykłe RTG pozwala natychmiast wykluczyć odmę lub krew w opłucnej, ale nie docenia nawet 50% złamań żeber. TK klatki piersiowej z rekonstrukcją trójwymiarową (3D-CT) jest 'złotym standardem' do planowania ewentualnej stabilizacji operacyjnej (SSRF) oraz precyzyjnego oszacowania objętości stłuczonego miąższu płuca (zagęszczenia 'mlecznej szyby' i konsolidacje)."
          },
          {
            text: "Badanie USG jamy brzusznej jest jedynym wymaganym badaniem.",
            correct: false,
            feedback: "USG brzucha nie ocenia precyzyjnie złamań klatki piersiowej."
          },
          {
            text: "Bronchoskopia sztywna jako jedyne badanie obrazowe.",
            correct: false,
            feedback: "Bronchoskopia nie obrazuje kości żeber."
          },
          {
            text: "Scyntygrafia wentylacyjna płuc gazem szlachetnym.",
            correct: false,
            feedback: "Całkowicie niedostępna i nieprzydatna w ostrym urazie."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Postępowanie przeciwbólowe – Rola znieczulenia zewnątrzoponowego (TEA)",
        desc: "Jaki jest najważniejszy element terapii zachowawczej u chorych z wiotką klatką piersiową i mnogimi złamaniami żeber, decydujący o uniknięciu intubacji i zapalenia płuc?",
        scenario: "Jaki jest najważniejszy element terapii zachowawczej u chorych z wiotką klatką piersiową i mnogimi złamaniami żeber, decydujący o uniknięciu intubacji i zapalenia płuc?",
        options: [
          {
            text: "Agresywna, wielopoziomowa analgezja regionalna – złotym standardem jest ciągłe znieczulenie zewnątrzoponowe piersiowe (TEA - Thoracic Epidural Analgesia) LUB blokada przykręgowa (PVB) / blokada powięziowa mięśnia najszerszego grzbietu / nerwów międzyżebrowych, uzupełniona analgezją systemową multimodalną.",
            correct: true,
            feedback: "Znakomicie! Wytyczne EAST i anestezjologiczne: skuteczna analgezja regionalna (TEA lub blokady przykręgowe) to najważniejszy czynnik leczenia mnogich złamań żeber. Zniesienie potwornego bólu opłucnowego pozwala pacjentowi na głębokie oddychanie, efektywny kaszel i toaletę drzewa oskrzelowego, co zapobiega niedodmie, retencji śluzu i respiratorowemu zapaleniu płuc!"
          },
          {
            text: "Ciasne owinięcie klatki piersiowej bandażem elastycznym i plastrami ('oklejanie żeber').",
            correct: false,
            feedback: "Śmiertelny, archaiczny błąd! Ciasne bandażowanie klatki piersiowej ogranicza wentylację, drastycznie nasila niedodmę i przyspiesza niewydolność oddechową oraz zgon!"
          },
          {
            text: "Podanie wyłącznie paracetamolu w syropie.",
            correct: false,
            feedback: "Paracetamol jest kroplą w morzu potrzeb przy mnogich złamaniach żeber."
          },
          {
            text: "Zakaz jakichkolwiek leków przeciwbólowych, aby pacjent 'kontrolował ból wrogiem'.",
            correct: false,
            feedback: "Niedopuszczalne i nieludzkie."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Wsparcie oddechowe – tzw. wewnętrzna stabilizacja pneumatyczna",
        desc: "Mimo wdrożenia znieczulenia regionalnego, z powodu rozległego stłuczenia płuca pacjent narasta w kwasicę oddechową (pH 7.22, PaCO2 58 mmHg, PaO2 55 mmHg na masce z rezerwuarem). Na czym polega tzw. 'wewnętrzna stabilizacja pneumatyczna' wiotkiej klatki piersiowej?",
        scenario: "Mimo wdrożenia znieczulenia regionalnego, z powodu rozległego stłuczenia płuca pacjent narasta w kwasicę oddechową (pH 7.22, PaCO2 58 mmHg, PaO2 55 mmHg na masce z rezerwuarem). Na czym polega tzw. 'wewnętrzna stabilizacja pneumatyczna' wiotkiej klatki piersiowej?",
        options: [
          {
            text: "Zastosowanie wentylacji mechanicznej z dodatnim ciśnieniem końcowowydechowym (PEEP) przez intubację dotchawiczą (lub u wybranych chorych nieinwazyjnej wentylacji NIV/CPAP), co od wewnątrz 'rozpiera' zapadnięte pęcherzyki płucne i stabilizuje wyłamany segment ściany klatki piersiowej.",
            correct: true,
            feedback: "Doskonale! Wentylacja z dodatnim ciśnieniem (Positive Pressure Ventilation z PEEP) działa jak wewnętrzne rusztowanie (pneumatic stabilization): ciśnienie w drogach oddechowych jest wyższe niż atmosferyczne, co wypycha wyłamany fragment żeber na zewnątrz, likwiduje oddech paradoksalny i rekrutuje niedodmowe pęcherzyki w stłuczonym płucu."
          },
          {
            text: "Wprowadzenie rury odkurzacza do przełyku.",
            correct: false,
            feedback: "Niedorzeczne."
          },
          {
            text: "Wstrzyknięcie pianki montażowej do jamy opłucnej.",
            correct: false,
            feedback: "Absurdalny błąd."
          },
          {
            text: "Zalecenie wstrzymania oddechu na 30 minut.",
            correct: false,
            feedback: "Śmiertelne."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Kwalifikacja do operacyjnej stabilizacji żeber (SSRF - Surgical Stabilization of Rib Fractures)",
        desc: "Kiedy wg wytycznych klatki piersiowej (CWIG - Chest Wall Injury Group) wskazana jest chirurgiczna stabilizacja żeber (SSRF) z użyciem tytanowych płytek i śrub?",
        scenario: "Kiedy wg wytycznych klatki piersiowej (CWIG - Chest Wall Injury Group) wskazana jest chirurgiczna stabilizacja żeber (SSRF) z użyciem tytanowych płytek i śrub?",
        options: [
          {
            text: "Wskazania obejmują: wiotką klatkę piersiową z koniecznością intubacji i niemożnością odłączenia od respiratora (weaning failure), ciężką deformację ściany klatki piersiowej, mnogie złamania z przemieszczeniem >100% szerokości żebra oraz konieczność wykonania torakotomii z innych przyczyn urazowych.",
            correct: true,
            feedback: "Znakomicie! Chirurgiczna stabilizacja żeber (SSRF - Surgical Stabilization of Rib Fractures): operacyjne zespolenie złamanych żeber za pomocą anatomicznych płytek tytanowych skraca czas wentylacji mechanicznej, zmniejsza częstość zapaleń płuc, skraca pobyt na OIT i redukuje przewlekły ból i deformację klatki piersiowej!"
          },
          {
            text: "SSRF wykonuje się u każdego pacjenta ze złamaniem pojedynczego żebra bez przemieszczenia.",
            correct: false,
            feedback: "Pojedyncze złamania żeber leczy się wyłącznie zachowawczo (leki przeciwbólowe)."
          },
          {
            text: "Operacja jest bezwzględnie zakazana w każdym przypadku złamań żeber.",
            correct: false,
            feedback: "Fałsz – SSRF jest uznaną, nowoczesną metodą leczenia flail chest."
          },
          {
            text: "Wskazaniem jest wyłącznie chęć poprawy opalenizny na klatce.",
            correct: false,
            feedback: "Niedorzeczne."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Płynoterapia w stłuczeniu płuca – zasada restrykcji płynowej",
        desc: "Pielęgniarka pyta Cię o zlecenie płynów dożylnych. Jakie zasady płynoterapii obowiązują u chorego ze stłuczeniem płuca i wiotką klatką piersiową, u którego nie ma wstrząsu krwotocznego?",
        scenario: "Pielęgniarka pyta Cię o zlecenie płynów dożylnych. Jakie zasady płynoterapii obowiązują u chorego ze stłuczeniem płuca i wiotką klatką piersiową, u którego nie ma wstrząsu krwotocznego?",
        options: [
          {
            text: "Ścisła restrykcja płynowa (eunowolemia / bilans płynowy 'na sucho') – uszkodzone naczynia kapilarne w stłuczonym płucu mają zwiększoną przepuszczalność, a nadmierna płynoterapia krystaloidami prowadzi do gwałtownego obrzęku płuc i załamania wymiany gazowej.",
            correct: true,
            feedback: "Wybitna wiedza intensywistyczna! Uszkodzone miąższowo płuco zachowuje się jak w ARDS: bariera pęcherzykowo-włośniczkowa przecieka. Agresywne podawanie krystaloidów ('przelanie pacjenta') powoduje natychmiastowe zalanie pęcherzyków płucnych płynem obrzękowym i zgon z powodu ostrej hipoksemii. Płynoterapię prowadzi się restrykcyjnie pod kontrolą rzutu serca i diurezy."
          },
          {
            text: "Przetoczenie 10 litrów soli fizjologicznej w pierwszej dobie.",
            correct: false,
            feedback: "Zabójczy błąd! Chory utopi się we własnym obrzęku płuc."
          },
          {
            text: "Całkowity brak jakichkolwiek płynów przez 14 dni.",
            correct: false,
            feedback: "Doprowadziłoby do odwodnienia i ostrej niewydolności nerek."
          },
          {
            text: "Podawanie wyłącznie wody morskiej dożylnie.",
            correct: false,
            feedback: "Niedopuszczalne."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Powikłania odległe i rehabilitacja oddechowa",
        desc: "U pacjenta wykonano zabieg SSRF stabilizacji żeber 4-7 po prawej stronie płytkami tytanowymi. Po 48 godzinach chory został pomyślnie rozintubowany. Jakie zalecenia rehabilitacyjne i profilaktyczne wdrażasz przed przeniesieniem na oddział chirurgii?",
        scenario: "U pacjenta wykonano zabieg SSRF stabilizacji żeber 4-7 po prawej stronie płytkami tytanowymi. Po 48 godzinach chory został pomyślnie rozintubowany. Jakie zalecenia rehabilitacyjne i profilaktyczne wdrażasz przed przeniesieniem na oddział chirurgii?",
        options: [
          {
            text: "Wczesna i intensywna rehabilitacja oddechowa (ćwiczenia z trenażerem oddechowym z przepływem objętościowym – spirometr motywacyjny / Voldyne, oklepywanie klatki, wczesna pionizacja), kontynuacja skutecznej analgezji oraz profilaktyka przeciwzakrzepowa (HDCz).",
            correct: true,
            feedback: "Znakomicie! Spirometria motywacyjna (incentive spirometry) zapobiega niedodmie i przyspiesza reekspansję stłuczonych segmentów płuca. Wczesna pionizacja i skuteczna analgezja są kluczem do pełnego powrotu do sprawności zawodowej."
          },
          {
            text: "Nakaz leżenia płasko na brzuchu bez ruchu przez 2 miesiące.",
            correct: false,
            feedback: "Leżenie bez ruchu doprowadzi do zakrzepicy, zatoru płucnego i odleżyn."
          },
          {
            text: "Zalecenie palenia 2 paczek papierosów dziennie w celu 'rozszerzenia oskrzeli'.",
            correct: false,
            feedback: "Dym tytoniowy zniszczy rzęski nabłonka oddechowego i wywoła zakażenie."
          },
          {
            text: "Zakaz jakichkolwiek ćwiczeń oddechowych.",
            correct: false,
            feedback: "Brak rehabilitacji oddechowej prowadzi do przewlekłej niedodmy i zrostów opłucnowych."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 150: Masywny krwiak opłucnej (Haemothorax)
  // ==========================================
  await upgradeCase('150_masywny_krwiak_oplucnej_haemothorax.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena w obszarze resuscytacji SOR – 35-latek po wypadku komunikacyjnym",
        desc: "Na salę reanimacyjną SOR ZRM przywozi 35-letniego mężczyznę, kierowcę samochodu osobowego po zderzeniu czołowym (brak zapiętych pasów, uderzenie klatką piersiową w koło kierownicy). Pacjent jest blady, zlany zimnym potem, ma nasilającą się duszność i skarży się na potworny ból prawej połowy klatki piersiowej. Parametry życiowe: HR 126/min, BP 86/52 mmHg, SpO2 89% na wąsach tlenowych, RR 30/min. W badaniu przedmiotowym klatki piersiowej: po stronie prawej wyraźne zniesienie szmerów oddechowych (cisza oddechowa nad dolnymi i środkowymi polami płuca prawego) oraz stłumiony (tępy jak nad udem) odgłos opukowy. Żyły szyjne są zapadnięte. Tchawica w linii pośrodkowej. Jaka jest Twoja natychmiastowa diagnoza kliniczna?",
        scenario: "Na salę reanimacyjną SOR ZRM przywozi 35-letniego mężczyznę, kierowcę samochodu osobowego po zderzeniu czołowym (brak zapiętych pasów, uderzenie klatką piersiową w koło kierownicy). Pacjent jest blady, zlany zimnym potem, ma nasilającą się duszność i skarży się na potworny ból prawej połowy klatki piersiowej. Parametry życiowe: HR 126/min, BP 86/52 mmHg, SpO2 89% na wąsach tlenowych, RR 30/min. W badaniu przedmiotowym klatki piersiowej: po stronie prawej wyraźne zniesienie szmerów oddechowych (cisza oddechowa nad dolnymi i środkowymi polami płuca prawego) oraz stłumiony (tępy jak nad udem) odgłos opukowy. Żyły szyjne są zapadnięte. Tchawica w linii pośrodkowej. Jaka jest Twoja natychmiastowa diagnoza kliniczna?",
        options: [
          {
            text: "Krwiak prawej jamy opłucnej (Haemothorax) ze wstrząsem hipowolemicznym/krwotocznym w przebiegu tępego urazu klatki piersiowej (najprawdopodobniej uszkodzenie naczyń międzyżebrowych, piersiowych wewnętrznych lub miąższu płuca).",
            correct: true,
            feedback: "Znakomicie! Klasyczna prezentacja krwiaka opłucnej (haemothorax): zniesienie szmerów oddechowych + STŁUMIENIE odgłosu opukowego po stronie urazu, połączone z objawami wstrząsu krwotocznego (tachykardia, hipotonia, bladość, zapadnięte żyły szyjne). Jama opłucnowa może pomieścić nawet 2000-3000 ml krwi, co stanowi niemal połowę objętości krwi krążącej dorosłego człowieka!"
          },
          {
            text: "Odma prężna prawostronna wymagająca natychmiastowego nakłucia igłą w II przestrzeni międzyżebrowej.",
            correct: false,
            feedback: "Kardynalny błąd różnicowania na LEK! W odmie prężnej odgłos opukowy jest BĘBENKOWY (hiperrezonant), żyły szyjne są NADMIERNIE WYPEŁNIONE (zastój z ucisku żyły głównej), a tchawica jest przesunięta na stronę przeciwną. Tutaj odgłos jest STŁUMIONY (tępy), a żyły zapadnięte – to obecność PŁYNU (krwi), a nie powietrza!"
          },
          {
            text: "Zwykłe przeziębienie z kaszlem.",
            correct: false,
            feedback: "Absurdalne lekceważenie wstrząsu pourazowego."
          },
          {
            text: "Pęknięcie wrzodu żołądka z zapaleniem otrzewnej.",
            correct: false,
            feedback: "Objawy dotyczą klatki piersiowej (zniesienie szmerów i stłumienie opuku)."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Badanie ultrasonograficzne E-FAST – objaw kręgosłupa (Spine Sign)",
        desc: "Przykładasz głowicę USG do prawego kąta przeponowo-żebrowego w linii pachowej tylnej. Co uwidacznia E-FAST w przypadku krwiaka opłucnej?",
        scenario: "Przykładasz głowicę USG do prawego kąta przeponowo-żebrowego w linii pachowej tylnej. Co uwidacznia E-FAST w przypadku krwiaka opłucnej?",
        options: [
          {
            text: "Bezechową/hipoechogenną przestrzeń płynową powyżej kopuły przepony, unoszący się 'pływający' płat stłuczonego płuca (jellyfish sign) oraz dodatni 'objaw kręgosłupa' (spine sign) – linia trzonów kręgów widoczna powyżej przepony dzięki lepszemu przewodzeniu fali ultradźwiękowej przez płyn.",
            correct: true,
            feedback: "Wybitna znajomość ultrasonografii ratunkowej! Zwykle powietrze w zdrowym płucu rozprasza ultradźwięki i uniemożliwia uwidocznienie kręgosłupa powyżej przepony. Gdy jama opłucnej wypełnia się płynem (krwią), tworzy 'okno akustyczne' i linia kręgów staje się widoczna dogłowowo powyżej przepony (spine sign). Płyn w opłucnej uciska płuco, dając objaw meduzy (jellyfish sign)."
          },
          {
            text: "Prawidłowy obraz zdrowego płuca bez żadnych zmian.",
            correct: false,
            feedback: "Płyn w opłucnej daje jednoznaczny, wyraźny obraz ultrasonograficzny."
          },
          {
            text: "Obecność kamieni żółciowych w prawym płucu.",
            correct: false,
            feedback: "Niedorzeczne."
          },
          {
            text: "E-FAST nie potrafi wykryć płynu w opłucnej.",
            correct: false,
            feedback: "E-FAST ma czułość >95% w wykrywaniu płynu w jamie opłucnej (wykrywa już 50 ml płynu, podczas gdy RTG na stojąco wymaga min. 150-200 ml, a na leżąco >500 ml!)."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Natychmiastowe postępowanie zabiegowe – Drenaż jamy opłucnej (Torakostomia)",
        desc: "Jakie jest natychmiastowe postępowanie zabiegowe z wyboru ratujące życie u tego pacjenta?",
        scenario: "Jakie jest natychmiastowe postępowanie zabiegowe z wyboru ratujące życie u tego pacjenta?",
        options: [
          {
            text: "Założenie grubego drenu do prawej jamy opłucnej (rozmiar 28-32 French) w tzw. 'trójkącie bezpieczeństwa' (V przestrzeń międzyżebrowa w linii pachowej środkowej/przedniej, tuż nad górnym brzegiem VI żebra) i podłączenie do układu ssącego/zastawkowego z pomiarem objętości ewakuowanej krwi.",
            correct: true,
            feedback: "Doskonale! Zgodnie z wytycznymi ATLS: drenaż jamy opłucnej (torakostomia drenowa) grubym drenem (28-32F) jest jednoczesnym zabiegiem diagnostycznym i terapeutycznym. Dren musi być odpowiednio gruby, aby nie uległ zatkaniu przez skrzepy krwi. Trójkąt bezpieczeństwa: brzeg dolny m. piersiowego większego, brzeg przedni m. najszerszego grzbietu, linia sutkowa / V przestrzeń międzyżebrowa. Wprowadzenie tuż nad górnym brzegiem żebra chroni pęczek naczyniowo-nerwowy międzyżebrowy biegnący w bruździe pod dolnym brzegiem żebra!"
          },
          {
            text: "Nakłucie cienką igłą insulinową w dołku podsercowym.",
            correct: false,
            feedback: "Całkowicie nieskuteczne i niebezpieczne."
          },
          {
            text: "Podanie syropu wykrztuśnego, aby pacjent odkaszlnął krew.",
            correct: false,
            feedback: "Krew znajduje się w jamie opłucnej, a nie w drogach oddechowych!"
          },
          {
            text: "Założenie drenu do żołądka.",
            correct: false,
            feedback: "Mylisz sondę żołądkową z drenażem opłucnej."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Wskazania bezwzględne do natychmiastowej torakotomii ratunkowej (Kanon LEK/ATLS)",
        desc: "Zaraz po wprowadzeniu drenu do butli drenażowej z impetem spływa 1750 ml ciemnej, płynnej krwi ze skrzepami. Ciśnienie pacjenta wynosi 80/45 mmHg, tętno 130/min. Jakie są klasyczne kryteria bezwzględnych wskazań do pilnej torakotomii ratunkowej wg standardów ATLS i co decydujesz w tej chwili?",
        scenario: "Zaraz po wprowadzeniu drenu do butli drenażowej z impetem spływa 1750 ml ciemnej, płynnej krwi ze skrzepami. Ciśnienie pacjenta wynosi 80/45 mmHg, tętno 130/min. Jakie są klasyczne kryteria bezwzględnych wskazań do pilnej torakotomii ratunkowej wg standardów ATLS i co decydujesz w tej chwili?",
        options: [
          {
            text: "Kryteria pilnej torakotomii ratunkowej to: początkowy drenaż krwi >1500 ml (masywny krwiak opłucnej) LUB utrzymujące się krwawienie z drenu >200-300 ml/h przez kolejne 3-4 godziny LUB niestabilność hemodynamiczna mimo resuscytacji; chory wymaga natychmiastowego transportu na blok operacyjny do ratunkowej torakotomii!",
            correct: true,
            feedback: "Wybitna znajomość żelaznych reguł ATLS i pytań egzaminacyjnych LEK! Ewakuacja >=1500 ml krwi natychmiast po drenażu definiuje MASYWNY KRWIAK OPŁUCNEJ (Massive Hemothorax) i jest bezwzględnym wskazaniem do natychmiastowej torakotomii na sali operacyjnej. Świadczy to o uszkodzeniu dużego naczynia krążenia systemowego (tętnica międzyżebrowa, piersiowa wewnętrzna, naczynia wnęki płuca), które nie zamknie się samoistnie pod niskim ciśnieniem opłucnej."
          },
          {
            text: "1750 ml to norma, zaciskasz dren kleszczykami i odsyłasz pacjenta na salę ogólną.",
            correct: false,
            feedback: "Zaciśnięcie drenu w masywnym krwiaku doprowadzi do tamponady klatki piersiowej, zatrzymania krążenia i zgonu!"
          },
          {
            text: "Torakotomię wykonuje się dopiero wtedy, gdy spłynie minimum 5 litrów krwi.",
            correct: false,
            feedback: "5 litrów to cała krew człowieka – chory wykrwawiłby się na śmierć dawno wcześniej!"
          },
          {
            text: "Czekasz 24 godziny na wynik posiewu krwi z drenu.",
            correct: false,
            feedback: "Śmiertelny błąd."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Autotransfuzja krwi z drenażu (Cell Saver / autotransfuzja opłucnowa)",
        desc: "Krew ewakuowana z jamy opłucnej płynie wartkim strumieniem. Zanim dotrą zamówione jednostki KKCz z banku krwi, jaką procedurę ratującą życie można natychmiast wykorzystać w dedykowanych zestawach drenażowych?",
        scenario: "Krew ewakuowana z jamy opłucnej płynie wartkim strumieniem. Zanim dotrą zamówione jednostki KKCz z banku krwi, jaką procedurę ratującą życie można natychmiast wykorzystać w dedykowanych zestawach drenażowych?",
        options: [
          {
            text: "Autotransfuzję krwi opłucnowej (autologous blood transfusion) – krew ze świeżego, jałowego krwiaka opłucnej zebrana do specjalnego pojemnika z filtrem może być natychmiast przetoczona z powrotem do łożyska naczyniowego pacjenta (jest zdefibrynowana, ciepła i w pełni zgodna grupowo).",
            correct: true,
            feedback: "Znakomicie! Autotransfuzja w masywnym krwiaku opłucnej to cenna technika ratunkowa: krew w opłucnej ulega naturalnej defibrynacji przez ruchy oddechowe i serce, dzięki czemu rzadko krzepnie w drenie. Po przefiltrowaniu (lub przepłukaniu w aparacie Cell Saver) może być natychmiast podana choremu, ratując go przed zgonem z wykrwawienia przed przyjazdem krwi z banku krwi."
          },
          {
            text: "Wylanie krwi do zlewu, ponieważ krew poza naczyniem staje się natychmiast trucizną.",
            correct: false,
            feedback: "W stanie krytycznego wstrząsu utrata własnej krwi pacjenta bez próby autotransfuzji pogłębia wykrwawienie."
          },
          {
            text: "Podanie tej krwi doustnie pacjentowi do wypicia.",
            correct: false,
            feedback: "Niedorzeczne i nieskuteczne."
          },
          {
            text: "Przetoczenie tej krwi innemu pacjentowi na sali bez sprawdzania grupy.",
            correct: false,
            feedback: "Kardynalny błąd zagrażający śmiertelnym odczynem poprzetoczeniowym u innego chorego!"
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Śródoperacyjna technika torakotomii ratunkowej",
        desc: "Chory trafia natychmiast na salę operacyjną. Torakochirurg wykonuje prawostronną torakotomię przednio-boczną w V przestrzeni międzyżebrowej. Po rozwarciu żeber ewakuuje skrzepy krwi i lokalizuje krwawienie: rozerwana tylna tętnica międzyżebrowa IV oraz głębokie pęknięcie miąższu płuca prawego. W jaki sposób chirurdzy zaopatrują te uszkodzenia?",
        scenario: "Chory trafia natychmiast na salę operacyjną. Torakochirurg wykonuje prawostronną torakotomię przednio-boczną w V przestrzeni międzyżebrowej. Po rozwarciu żeber ewakuuje skrzepy krwi i lokalizuje krwawienie: rozerwana tylna tętnica międzyżebrowa IV oraz głębokie pęknięcie miąższu płuca prawego. W jaki sposób chirurdzy zaopatrują te uszkodzenia?",
        options: [
          {
            text: "Podwiązanie lub koagulacja/założenie szwów naczyniowych na krwawiącą tętnicę międzyżebrową oraz zaopatrzenie pęknięcia miąższu płuca (szew miąższowy / traktotomia płucna lub anatomiczna resekcja klinowa staplerem), po czym płukanie jamy opłucnej i założenie dwóch drenów (górnego i dolnego).",
            correct: true,
            feedback: "Prawidłowo! Tętnice międzyżebrowe odchodzą wprost od aorty – krwawią pod wysokim ciśnieniem tętniczym i wymagają chirurgicznego podkłucia lub podwiązania. Krwawienie z miąższu płucnego (układ niskociśnieniowy) zaopatruje się szwami hemostatycznymi lub staplerową resekcją klinową. Dren dolny służy do drenażu płynów, a górny do ewakuacji powietrza."
          },
          {
            text: "Wycięcie całego prawego płuca u każdego pacjenta bez względu na rodzaj rany.",
            correct: false,
            feedback: "Pneumonektomia pourazowa wiąże się ze śmiertelnością rzędu 70-80% – dąży się do oszczędzenia miąższu płuca."
          },
          {
            text: "Wstrzyknięcie cementu do jamy opłucnej.",
            correct: false,
            feedback: "Absurdalny błąd."
          },
          {
            text: "Zaszycie klatki piersiowej bez zatamowania krwawienia z tętnicy.",
            correct: false,
            feedback: "Doprowadziłoby do natychmiastowego ponownego krwotoku i zgonu."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Powikłanie nieodbarczonego krwiaka opłucnej – Zrosty i zakażony krwiak (Empyema / Fibrothorax)",
        desc: "Rezydent pyta Cię: co stałoby się, gdyby krwiak opłucnej nie został całkowicie zdrenowany i w jamie opłucnej pozostałoby kilkaset mililitrów zorganizowanych skrzepów krwi? Jakie powikłania rozwijają się w takim przypadku?",
        scenario: "Rezydent pyta Cię: co stałoby się, gdyby krwiak opłucnej nie został całkowicie zdrenowany i w jamie opłucnej pozostałoby kilkaset mililitrów zorganizowanych skrzepów krwi? Jakie powikłania rozwijają się w takim przypadku?",
        options: [
          {
            text: "Zakażenie krwiaka prowadzące do ropniaka opłucnej (Empyema pleurae) oraz organizacja skrzepów z wytworzeniem grubego pancerza włóknistego (Fibrothorax), który 'więzi' płuco (trapped lung), uniemożliwia jego rozprężenie i wymaga późniejszej operacji dekortykacji płuca.",
            correct: true,
            feedback: "Wybitna patologia chirurgiczna! Krew w jamie opłucnej jest doskonałą pożywką dla bakterii – nieodprowadzony krwiak ulega zakażeniu u nawet 10-20% chorych, tworząc pourazowy ropniak opłucnej. Ponadto fibroblasty organizują skrzep w twardą, nieelastyczną skorupę włóknistą (fibrothorax), która więzi płuco. W takich przypadkach konieczna bywa torakoskopia (VATS) lub otwarta dekortykacja (złuszczenie pancerza włóknistego z płuca)."
          },
          {
            text: "Krew w opłucnej zamienia się w nową wątrobę.",
            correct: false,
            feedback: "Absurd biologiczny."
          },
          {
            text: "Nie ma żadnych powikłań, skrzepy zawsze rozpuszczają się same bez śladu.",
            correct: false,
            feedback: "Nieprawda – niezdrenowany krwiak prowadzi do trwałego inwalidztwa oddechowego lub sepsy."
          },
          {
            text: "Płuco powiększa się trzykrotnie.",
            correct: false,
            feedback: "Wręcz przeciwnie – ulega zaciśnięciu i uwięzieniu (trapped lung)."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Kryteria bezpiecznego usunięcia drenu opłucnowego",
        desc: "Operacja zakończyła się pełnym sukcesem. W 3. dobie po zabiegu pacjent jest stabilny, oddycha swobodnie, kontrolne RTG wykazuje pełne rozprężenie prawego płuca do ścian klatki. Kiedy można bezpiecznie usunąć dren z jamy opłucnej?",
        scenario: "Operacja zakończyła się pełnym sukcesem. W 3. dobie po zabiegu pacjent jest stabilny, oddycha swobodnie, kontrolne RTG wykazuje pełne rozprężenie prawego płuca do ścian klatki. Kiedy można bezpiecznie usunąć dren z jamy opłucnej?",
        options: [
          {
            text: "Kiedy w kontrolnym RTG płuco jest w pełni rozprężone, brak przecieku powietrza w układzie drenażowym (brak 'bąblowania' przy kaszlu) oraz dobowy drenaż płynu wynosi poniżej 100-150 ml/dobę i ma charakter surowiczy (nie krwisty ani ropny); usunięcie wykonuje się na szczycie wdechu lub wydechu (próba Valsalvy) z natychmiastowym zawiązaniem szwu kapciuchowego.",
            correct: true,
            feedback: "Perfekcyjna procedura chirurgiczna! Żelazne kryteria usunięcia drenu opłucnowego: 1) Pełna reekspansja płuca potwierdzona radiologicznie; 2) Całkowity brak przecieku powietrza (air leak); 3) Objętość drenażu płynowego <100-150 ml/24h o prawidłowym wyglądzie surowiczym. Dren usuwa się szybko na szczycie wdechu lub wydechu przy zaciśniętym szwie materacowym/kapciuchowym, aby powietrze atmosferyczne nie zostało zassane do opłucnej (odma jatrogenna)!"
          },
          {
            text: "Dren usuwa się natychmiast na sali operacyjnej po zaszyciu powłok.",
            correct: false,
            feedback: "Usunięcie drenu na sali operacyjnej doprowadziłoby do natychmiastowego nawrotu krwiaka lub odmy."
          },
          {
            text: "Dren musi tkwić w opłucnej przez minimum 2 lata.",
            correct: false,
            feedback: "Zbyt długi drenaż prowadzi do zakażenia jamy opłucnej."
          },
          {
            text: "Dren wyciąga się powoli po 1 centymetrze na dobę przez miesiąc.",
            correct: false,
            feedback: "Dren opłucnowy usuwa się jednym sprawnym ruchem na próbie Valsalvy."
          }
        ]
      }
    ];
  });

  console.log("Cases 146-150 upgrade completed successfully!");
}

run().catch(err => {
  console.error("Error upgrading cases 146-150:", err);
  process.exit(1);
});

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
  console.log("Starting deep clinical upgrade for cases 141-145 (Vascular Surgery)...");

  // ==========================================
  // CASE 141: Ostre niedokrwienie kończyny dolnej (ALI)
  // ==========================================
  await upgradeCase('141_ostre_niedokrwienie_konczyny_dolnej.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena na ostrym dyżurze naczyniowym – 69-latek z nagłym bólem prawej nogi",
        desc: "Na ostry dyżur chirurgii naczyniowej zgłasza się 69-letni mężczyzna. Przed 4 godzinami, podczas siedzenia w fotelu, poczuł nagły, niezwykle silny ból prawej kończyny dolnej od kolana w dół. Pacjent opisuje to jako 'porażenie prądem i uderzenie lodowatej fali'. Stopa natychmiast zrobiła się blada jak kreda i zdrętwiała. W wywiadzie: utrwalone migotanie przedsionków (AF), jednak chory samowolnie odstawił doustny antykoagulant 2 miesiące temu z powodu krwawień z dziąseł. W badaniu: HR 116/min (niemiarowe, AF), BP 145/85 mmHg. Prawa stopa i podudzie są trupio blade, chłodne w dotyku (różnica temperatur w porównaniu z lewą nogą), tętno na tętnicy udowej wspólnej w prawej pachwinie jest dobrze wyczuwalne, natomiast brak tętna na tętnicy podkolanowej, grzbietowej stopy i piszczelowej tylnej. Jaka jest Twoja natychmiastowa diagnoza kliniczna?",
        scenario: "Na ostry dyżur chirurgii naczyniowej zgłasza się 69-letni mężczyzna. Przed 4 godzinami, podczas siedzenia w fotelu, poczuł nagły, niezwykle silny ból prawej kończyny dolnej od kolana w dół. Pacjent opisuje to jako 'porażenie prądem i uderzenie lodowatej fali'. Stopa natychmiast zrobiła się blada jak kreda i zdrętwiała. W wywiadzie: utrwalone migotanie przedsionków (AF), jednak chory samowolnie odstawił doustny antykoagulant 2 miesiące temu z powodu krwawień z dziąseł. W badaniu: HR 116/min (niemiarowe, AF), BP 145/85 mmHg. Prawa stopa i podudzie są trupio blade, chłodne w dotyku (różnica temperatur w porównaniu z lewą nogą), tętno na tętnicy udowej wspólnej w prawej pachwinie jest dobrze wyczuwalne, natomiast brak tętna na tętnicy podkolanowej, grzbietowej stopy i piszczelowej tylnej. Jaka jest Twoja natychmiastowa diagnoza kliniczna?",
        options: [
          {
            text: "Ostre niedokrwienie prawej kończyny dolnej (ALI - Acute Limb Ischemia) najprawdopodobniej na podłożu zatoru kardiogennego tętnicy udowej/podkolanowej w przebiegu nieleczonego migotania przedsionków; stan bezpośredniego zagrożenia utratą kończyny.",
            correct: true,
            feedback: "Znakomicie! Klasyczna etiologia ostrego niedokrwienia kończyny (ALI): materiał zatorowy (skrzeplina z uszka lewego przedsionka w AF) urywa się i blokuje bifurkację tętnicy (najczęściej podział tętnicy udowej wspólnej lub tętnicę podkolanową). Objawy rozwijają się w ciągu sekund lub minut u chorego bez wcześniejszego krążenia obocznego, co daje dramatyczny, pełnoobjawowy obraz kliniczny."
          },
          {
            text: "Ostra rwa kulszowa (ischialgia) prawostronna, zlecasz domięśniowy diklofenak i konsultację neurologiczną w poradni.",
            correct: false,
            feedback: "Śmiertelny błąd! Brak tętna, bladość i oziębienie stopy to cechy zapaści krążenia tętniczego, a nie ucisku korzenia nerwowego. Pomyłka ALI z rwą kulszową to kardynalny błąd prowadzący do nieodwracalnej martwicy i amputacji nogi!"
          },
          {
            text: "Zakrzepica żył głębokich (DVT) typu phlegmasia alba dolens.",
            correct: false,
            feedback: "W DVT dominuje masywny obrzęk kończyny, a tętno obwodowe jest zazwyczaj zachowane (o ile nie ma phlegmasia cerulea dolens z sinicą i brakiem tętna). Brak tętna i nagły początek po epizodzie AF jednoznacznie wskazują na zator tętniczy."
          },
          {
            text: "Róża pęcherzowa podudzia, zlecasz ampicylinę z sulbaktamem.",
            correct: false,
            feedback: "W róży kończyna jest żywoczerwona, gorąca i obrzęknięta, a nie blada i lodowata."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Badanie przedmiotowe – reguła 6xP i ocena zaawansowania niedokrwienia",
        desc: "Przystępujesz do szczegółowej oceny neurologiczno-naczyniowej prawej kończyny. Jakie objawy wchodzą w skład klasycznej reguły '6xP' ostrego niedokrwienia i co stwierdzasz u chorego?",
        scenario: "Przystępujesz do szczegółowej oceny neurologiczno-naczyniowej prawej kończyny. Jakie objawy wchodzą w skład klasycznej reguły '6xP' ostrego niedokrwienia i co stwierdzasz u chorego?",
        options: [
          {
            text: "Reguła 6xP: Pain (ból), Pallor (bladość), Pulselessness (brak tętna), Paresthesia (parestezje/drętwienie), Paralysis (niedowład/porażenie ruchowe), Poikilothermia (ziębnięcie/oziębienie kończyny); obecność niedowładu (opadanie stopy) wskazuje na zaawansowane niedokrwienie bezpośrednio zagrażające martwicą.",
            correct: true,
            feedback: "Perfekcyjnie! Reguła 6xP to żelazny kanon chirurgii naczyniowej i pytań egzaminacyjnych LEK. Upośledzenie czucia (paresthesia) i osłabienie siły mięśniowej/niedowład (paralysis) świadczą o ciężkim niedotlenieniu pni nerwowych i mięśni, które są najbardziej wrażliwe na anoksję (mięśnie szkieletowe tolerują ciepłe niedokrwienie tylko przez 4-6 godzin!)."
          },
          {
            text: "Reguła 6xP obejmuje: Petechiae, Purpura, Pruritus, Pyrexia, Polyuria, Pallor.",
            correct: false,
            feedback: "Błędne pojęcia (to objawy skazy krwotocznej/zapalenia naczyń, a nie ostrego niedokrwienia tętniczego)."
          },
          {
            text: "Jedynym istotnym objawem 6xP jest świąd skóry (Pruritus), reszta objawów nie ma znaczenia rokowniczego.",
            correct: false,
            feedback: "Niedorzeczne."
          },
          {
            text: "Reguła 6xP odnosi się wyłącznie do zawału śledziony.",
            correct: false,
            feedback: "Reguła 6xP definiuje ostre niedokrwienie kończyny."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Klasyfikacja ostrego niedokrwienia kończyn wg Rutherforda",
        desc: "Badanie neurologiczne: pacjent zgłasza brak czucia w obrębie palców i śródstopia, przy próbie zgięcia grzbietowego stopy i palucha siła mięśniowa jest wyraźnie osłabiona (niedowład stopy 2/5 w skali Lovetta). Przyłóżkowy detektor USG Doppler (pencil Doppler) wykazuje brak sygnału przepływu tętniczego nad tętnicą grzbietową stopy, natomiast w żyłach podudzia słyszalny jest jeszcze słaby przepływ żylny. Do której klasy wg zmodyfikowanej klasyfikacji Rutherforda zaliczasz tę kończynę?",
        scenario: "Badanie neurologiczne: pacjent zgłasza brak czucia w obrębie palców i śródstopia, przy próbie zgięcia grzbietowego stopy i palucha siła mięśniowa jest wyraźnie osłabiona (niedowład stopy 2/5 w skali Lovetta). Przyłóżkowy detektor USG Doppler (pencil Doppler) wykazuje brak sygnału przepływu tętniczego nad tętnicą grzbietową stopy, natomiast w żyłach podudzia słyszalny jest jeszcze słaby przepływ żylny. Do której klasy wg zmodyfikowanej klasyfikacji Rutherforda zaliczasz tę kończynę?",
        options: [
          {
            text: "Klasa IIb (kończyna bezpośrednio zagrożona utratą / Immediately threatened) – ubytek czucia obejmujący więcej niż palce, osłabienie siły mięśniowej (niedowład), brak tętniczego sygnału Doppler przy zachowanym sygnale żylnym; wymaga natychmiastowej rewaskularyzacji ratunkowej w oknie <6 godzin.",
            correct: true,
            feedback: "Wybitna precyzja kliniczna! Klasyfikacja Rutherforda ALI: Klasa I (żywotna – brak ubytków czucia i ruchu, Doppler tętniczy słyszalny); Klasa IIa (zagrożenie graniczne – ubytek czucia tylko na palcach, brak deficytu ruchowego, Doppler tętniczy często niesłyszalny); Klasa IIb (bezpośrednio zagrożona – ubytek czucia powyżej palców + NIEDOWŁAD MIĘŚNIOWY, Doppler tętniczy niesłyszalny, żylny słyszalny) -> okno ratunkowe to minuty/godziny; Klasa III (nieodwracalne uszkodzenie – utrwalone stężenie mięśniowe, brak sygnału tętniczego i żylnego -> bezwzględne wskazanie do pierwotnej amputacji)."
          },
          {
            text: "Klasa I (kończyna żywotna), można spokojnie poczekać do rana z decyzją o leczeniu.",
            correct: false,
            feedback: "Błąd! Obecność niedowładu ruchowego bezwzględnie wyklucza klasę I. Zwłoka doprowadzi do nieodwracalnego obumarcia kończyny."
          },
          {
            text: "Klasa III (kończyna martwa), należy natychmiast wykonać amputację udową bez próby ratowania naczynia.",
            correct: false,
            feedback: "Fałsz! W klasie III mięśnie są w utrwalonym stężeniu (rigor), a sygnał żylny Doppler jest niesłyszalny. Tu sygnał żylny jest zachowany, a mięśnie nie są stężałe – kończyna jest w klasie IIb i musi być natychmiast operowana w celu jej uratowania!"
          },
          {
            text: "Klasa IV wg NYHA, wskazana implantacja kardiowertera-defibrylatora.",
            correct: false,
            feedback: "Klasyfikacja NYHA dotyczy przewlekłej niewydolności serca, a nie niedokrwienia kończyn."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Natychmiastowe postępowanie farmakologiczne na SOR",
        desc: "Podczas gdy sala operacyjna jest przygotowywana, jaki lek musisz podać natychmiast dożylnie jako farmakologiczne postępowanie pierwszego rzutu wg wytycznych ESVS (European Society for Vascular Surgery)?",
        scenario: "Podczas gdy sala operacyjna jest przygotowywana, jaki lek musisz podać natychmiast dożylnie jako farmakologiczne postępowanie pierwszego rzutu wg wytycznych ESVS (European Society for Vascular Surgery)?",
        options: [
          {
            text: "Natychmiastowy dożylny bolus niefrakcjonowanej heparyny (UFH) w dawce 5000-8000 j.m. (lub 80 j.m./kg m.c.), a następnie ciągły wlew dożylny pod kontrolą APTT (cel 1.5-2.5 razy norma), aby zahamować narastanie i propagację skrzepliny w mikrokrążeniu oraz łożysku obwodowym.",
            correct: true,
            feedback: "Znakomicie! Bezwzględny standard postępowania: podanie bolusa heparyny niefrakcjonowanej (UFH) natychmiast po wysunięciu podejrzenia ostrego niedokrwienia kończyny. Heparyna nie rozpuści istniejącego zatoru, ale zapobiega narastaniu zakrzepicy wstępującej i zstępującej (tzw. ogona skrzepliny) w mikrokrążeniu poniżej przeszkody, co decyduje o szansach powodzenia późniejszej rewaskularyzacji."
          },
          {
            text: "Doustna aspiryna 75 mg i witamina C w kroplach.",
            correct: false,
            feedback: "Całkowicie niewystarczające w ostrym zatorze dużej tętnicy."
          },
          {
            text: "Wlew z mannitolu i furosemidu w celu odwodnienia kończyny.",
            correct: false,
            feedback: "Odwodnienie zagęszcza krew i przyspiesza zakrzepicę naczyniową."
          },
          {
            text: "Ogrzanie nogi termoforami i gorącymi okładami.",
            correct: false,
            feedback: "Groźny błąd! Zewnętrzne ogrzewanie niedokrwionej kończyny dramatycznie zwiększa miejscowe zapotrzebowanie metaboliczne tkanek na tlen i przyspiesza martwicę skóry oraz powstawanie oparzeń!"
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Wybór metody rewaskularyzacji – embolektomia cewnikiem Fogarty'ego",
        desc: "Kończyna jest w klasie IIb wg Rutherforda (bezpośrednie zagrożenie utraty, niedowład, czas trwania objawów 4 godziny). Jakie jest postępowanie zabiegowe z wyboru wg wytycznych?",
        scenario: "Kończyna jest w klasie IIb wg Rutherforda (bezpośrednie zagrożenie utraty, niedowład, czas trwania objawów 4 godziny). Jakie jest postępowanie zabiegowe z wyboru wg wytycznych?",
        options: [
          {
            text: "Pilna chirurgiczna embolektomia za pomocą cewnika z balonikiem Fogarty'ego (najczęściej z nacięcia tętnicy udowej wspólnej i głębokiej w znieczuleniu miejscowym/ogólnym na sali naczyniowej/hybrydowej) bez tracenia czasu na czasochłonne badania obrazowe (jak angio-TK).",
            correct: true,
            feedback: "Doskonale! W klasie IIb wg Rutherforda okno czasowe do wystąpienia nieodwracalnej martwicy wynosi poniżej 6 godzin. Wykonywanie angio-TK lub próba celowanej trombolizy dotętniczej (która wymaga 12-24 godzin infuzji rtPA) grozi przekroczeniem okna żywotności. Chirurgiczna embolektomia cewnikiem Fogarty'ego jest szybka (kilkanaście minut), wysoce skuteczna i natychmiast przywraca napływ krwi!"
          },
          {
            text: "Wdrożenie dożylnej trombolizy ogólnoustrojowej alteplazą przez 48 godzin na oddziale zachowawczym.",
            correct: false,
            feedback: "Tromboliza ogólnoustrojowa jest w ALI nieskuteczna, grozi śmiertelnym krwotokiem mózgowym i trwa zbyt długo dla kończyny w klasie IIb."
          },
          {
            text: "Skierowanie na badanie rezonansu magnetycznego z terminem za 3 dni.",
            correct: false,
            feedback: "Za 3 dni noga będzie w stanie zgorzeli wymagającej wysokiej amputacji."
          },
          {
            text: "Założenie gipsu udowego z powodu podejrzenia złamania kości piszczelowej.",
            correct: false,
            feedback: "Absurdalny błąd zagrażający życiu i kończynie."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Śródoperacyjna technika embolektomii cewnikiem Fogarty'ego",
        desc: "Na sali operacyjnej chirurg naczyniowy odsłania tętnicę udową wspólną, powierzchowną i głęboką w prawej pachwinie. Po podłużnym lub poprzecznym nacięciu tętnicy wprowadza cewnik Fogarty'ego. Na czym polega technika tego zabiegu (wynaleziona przez Thomasa Fogarty'ego)?",
        scenario: "Na sali operacyjnej chirurg naczyniowy odsłania tętnicę udową wspólną, powierzchowną i głęboką w prawej pachwinie. Po podłużnym lub poprzecznym nacięciu tętnicy wprowadza cewnik Fogarty'ego. Na czym polega technika tego zabiegu (wynaleziona przez Thomasa Fogarty'ego)?",
        options: [
          {
            text: "Cewnik z opróżnionym miękkim balonikiem wprowadza się poza skrzeplinę/zator, następnie napełnia balonik płynem (solą fizjologiczną) do oporu ściany naczynia i wycofuje cewnik, usuwając masy zatorowe przez nacięcie w tętnicy (arteriotomię), uzyskując prawidłowy napływ i odpływ krwi.",
            correct: true,
            feedback: "Znakomicie! Cewnik Fogarty'ego (wprowadzony w 1963 r.) zrewolucjonizował chirurgię naczyniową: cienki cewnik mija zator, po czym balonik na jego końcu jest delikatnie wypełniany i mechanicznie 'wyciąga' cały materiał zatorowy i wtórne skrzepliny z dystalnego łożyska naczyniowego. Po zabiegu kontroluje się śródoperacyjnie przepływ (angiografia kontrolna lub Doppler)."
          },
          {
            text: "Cewnik Fogarty'ego służy do nacinania tętnicy od środka za pomocą wysuwanego ostrza skalpela.",
            correct: false,
            feedback: "Absolutnie nie! Ostrze rozcięłoby naczynie od wewnątrz i spowodowało śmiertelny krwotok."
          },
          {
            text: "Balonik wypełnia się cementem kostnym, aby trwale zabetonować tętnicę.",
            correct: false,
            feedback: "Niedorzeczne."
          },
          {
            text: "Cewnik wprowadza się wyłącznie do pęcherza moczowego pacjenta.",
            correct: false,
            feedback: "Mylisz cewnik naczyniowy Fogarty'ego z cewnikiem Foleya do pęcherza."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Zespół poreperfuzyjny i zespół ciasnoty przedziałów powięziowych (Compartment Syndrome)",
        desc: "Po usunięciu zatoru i odzyskaniu tętna na stopie pacjent trafia na salę pooperacyjną. Po 3 godzinach stopa staje się ciepła i różowa, jednak podudzie gwałtownie puchnie, staje się twarde jak deska, a pacjent krzyczy z powodu rozdzierającego bólu łydki, który drastycznie nasila się przy biernym grzbietowym zgięciu palców stopy. Ciśnienie w przedziale przednim podudzia zmierzone manometrem wynosi 38 mmHg. Jakie powikłanie rozpoznajesz i jakie jest leczenie z wyboru?",
        scenario: "Po usunięciu zatoru i odzyskaniu tętna na stopie pacjent trafia na salę pooperacyjną. Po 3 godzinach stopa staje się ciepła i różowa, jednak podudzie gwałtownie puchnie, staje się twarde jak deska, a pacjent krzyczy z powodu rozdzierającego bólu łydki, który drastycznie nasila się przy biernym grzbietowym zgięciu palców stopy. Ciśnienie w przedziale przednim podudzia zmierzone manometrem wynosi 38 mmHg. Jakie powikłanie rozpoznajesz i jakie jest leczenie z wyboru?",
        options: [
          {
            text: "Zespół ciasnoty przedziałów powięziowych podudzia (Compartment Syndrome) w przebiegu zespołu poreperfuzyjnego (obrzęk niedotlenionych mięśni w zamkniętych powięziach podudzia, ucisk naczyń i nerwów przy ciśnieniu >30 mmHg); wymaga natychmiastowej, ratunkowej 4-przedziałowej fasciotomii podudzia z dwóch cięć skórnych.",
            correct: true,
            feedback: "Wybitnie! Podręcznikowe zagadnienie powikłań reperfuzji po ostrym niedokrwieniu: po przywróceniu przepływu dochodzi do masywnego obrzęku komórek mięśniowych i przesięku kapilarnego. Mięśnie podudzia zamknięte są w czterech sztywnych przedziałach powięziowych (przednim, bocznym, tylnym powierzchownym i tylnym głębokim). Wzrost ciśnienia śródpowięziowego powyżej 30 mmHg (lub delta-P <30 mmHg od ciśnienia rozkurczowego) odcina mikrokrążenie. Najwcześniejszy objaw: ból nie do uśmierzenia nasilający się przy BIERNYM rozciąganiu mięśni! Leczenie: natychmiastowa podłużna fasciotomia odbarczająca wszystkie 4 przedziały (fasciotomia 2-cięciowa)."
          },
          {
            text: "Obrzęk z powodu zastoju żylnego, zaleć założenie ciasnych pończoch uciskowych i uniesienie kończyny.",
            correct: false,
            feedback: "Śmiertelny błąd! Ciasny ucisk w zespole ciasnoty przyspieszy całkowitą martwicę mięśni (przykurcz Volkmanna kończyny dolnej) i rhabdomiolizę z ostrą niewydolnością nerek!"
          },
          {
            text: "Płaskostopie poprzeczne, wystarczy wkładka ortopedyczna do buta.",
            correct: false,
            feedback: "Niedorzeczne."
          },
          {
            text: "Nawrót zatoru tętniczego, podaj drugą dawkę aspiryny doustnie.",
            correct: false,
            feedback: "Tętno jest obecne, a stopa różowa – problemem jest wysokie ciśnienie śródpowięziowe wymagające fasciotomii!"
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Profilaktyka powikłań ogólnoustrojowych reperfuzji i prewencja wtórna",
        desc: "Wykonano fasciotomię, odbarczając przedziały podudzia. W badaniach laboratoryjnych po zabiegu: kinaza kreatynowa (CK) wzrosła do 28 000 U/L, mioglobina w moczu dodatnia (mocz koloru ciemnego piwa), potas w surowicy K+ 5.8 mmol/L. Jakie leczenie nefrologiczne wdrażasz oraz jaka farmakoterapia długoterminowa jest bezwzględnie wymagana przed wypisem?",
        scenario: "Wykonano fasciotomię, odbarczając przedziały podudzia. W badaniach laboratoryjnych po zabiegu: kinaza kreatynowa (CK) wzrosła do 28 000 U/L, mioglobina w moczu dodatnia (mocz koloru ciemnego piwa), potas w surowicy K+ 5.8 mmol/L. Jakie leczenie nefrologiczne wdrażasz oraz jaka farmakoterapia długoterminowa jest bezwzględnie wymagana przed wypisem?",
        options: [
          {
            text: "Intensywne nawadnianie dożylne z alkalizacją moczu (wodorowęglan sodu NaHCO3, cel pH moczu >6.5) oraz wymuszona diureza celem ochrony nerek przed nefropatią mioglobinuryczną (AKI) i leczenie hiperkaliemii; długoterminowo: bezwzględne wdrożenie stałej antykoagulacji (NOAC np. apiksaban/rywaroksaban lub VKA) w celu prewencji nawrotu zatorowości kardiogennej w migotaniu przedsionków.",
            correct: true,
            feedback: "Perfekcyjna, holistyczna wiedza lekarska! Zespół poreperfuzyjny wiąże się z rabdomiolizą – mioglobina w kwaśnym środowisku cewek nerkowych tworzy toksyczną ferrihemianę i wałeczki mioglobinowe, wywołując ostre uszkodzenie nerek (AKI). Płynoterapia + alkalizacja moczu zapobiegają krystalizacji mioglobiny. Prewencja wtórna to powrót do dożywotniego leczenia przeciwkrzepliwego (NOAC), którego odstawienie było bezpośrednią przyczyną zatoru!"
          },
          {
            text: "Ograniczenie płynów do 500 ml/dobę i zakaz leków przeciwzakrzepowych ze względu na fasciotomię.",
            correct: false,
            feedback: "Odwodnienie przy rabdomiolizie doprowadzi do natychmiastowej bezmoczowej niewydolności nerek wymagającej dializoterapii."
          },
          {
            text: "Zalecenie picia soku z grejpfrutów i brak jakichkolwiek leków.",
            correct: false,
            feedback: "Błędne i niebezpieczne."
          },
          {
            text: "Podanie dożylne chlorku potasu w bolusie.",
            correct: false,
            feedback: "Śmiertelny błąd! Pacjent ma hiperkaliemię 5.8 mmol/l – podanie potasu wywoła asystolię lub migotanie komór!"
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 142: Przewlekłe krytyczne niedokrwienie kończyn (CLTI)
  // ==========================================
  await upgradeCase('142_przewlekle_krytyczne_niedokrwienie_clti.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena w poradni naczyniowej – 72-letni cukrzyk z bólem spoczynkowym i owrzodzeniem",
        desc: "Do poradni chirurgii naczyniowej zgłasza się 72-letni mężczyzna, wieloletni palacz tytoniu (50 paczkolat) z cukrzycą typu 2, nadciśnieniem tętniczym i hipercholesterolemią. Pacjent od 2 miesięcy nie może spać w nocy z powodu palącego, nieznośnego bólu prawej stopy i palców. Zauważył, że ból łagodnieje, gdy opuszcza chorą nogę z łóżka ku podłodze lub śpi w fotelu. Od 3 tygodni na opuszce palucha prawej stopy pojawiło się niegojące się, bolesne owrzodzenie z ciemnym, suchym strupem na dnie. W badaniu: prawa stopa chłodna, po uniesieniu do góry po 30 sekundach staje się kredowoblada (objaw Ratschowa), a po opuszczeniu pojawia się wolne, ciemnoczerwone przekrwienie reaktywne. Tętno na prawej tętnicy udowej słabo wyczuwalne, na obwodzie (t. podkolanowa, grzbietowa stopy, piszczelowa tylna) niewyczuwalne. Jaka jest Twoja diagnoza kliniczna?",
        scenario: "Do poradni chirurgii naczyniowej zgłasza się 72-letni mężczyzna, wieloletni palacz tytoniu (50 paczkolat) z cukrzycą typu 2, nadciśnieniem tętniczym i hipercholesterolemią. Pacjent od 2 miesięcy nie może spać w nocy z powodu palącego, nieznośnego bólu prawej stopy i palców. Zauważył, że ból łagodnieje, gdy opuszcza chorą nogę z łóżka ku podłodze lub śpi w fotelu. Od 3 tygodni na opuszce palucha prawej stopy pojawiło się niegojące się, bolesne owrzodzenie z ciemnym, suchym strupem na dnie. W badaniu: prawa stopa chłodna, po uniesieniu do góry po 30 sekundach staje się kredowoblada (objaw Ratschowa), a po opuszczeniu pojawia się wolne, ciemnoczerwone przekrwienie reaktywne. Tętno na prawej tętnicy udowej słabo wyczuwalne, na obwodzie (t. podkolanowa, grzbietowa stopy, piszczelowa tylna) niewyczuwalne. Jaka jest Twoja diagnoza kliniczna?",
        options: [
          {
            text: "Przewlekłe zagrażające kończynie niedokrwienie (CLTI - Chronic Limb-Threatening Ischemia) w przebiegu uogólnionej miażdżycy zarostowej tętnic kończyn dolnych (LEAD) – stopień IV wg klasyfikacji Fontaine'a (stopień 5/6 wg Rutherforda).",
            correct: true,
            feedback: "Znakomicie! Klasyczny, podręcznikowy obraz CLTI (dawniej określanego jako krytyczne niedokrwienie kończyn – CLI): przewlekły ból spoczynkowy trwający >2 tygodnie (łagodzony grawitacyjnie przez opuszczenie kończyny) oraz obecność niegojącego się owrzodzenia troficznego lub martwicy. Wg klasyfikacji Fontaine'a: I – bezobjawowe, II – chromanie przestankowe, III – ból spoczynkowy, IV – owrzodzenie/martwica. Bez szybkiej rewaskularyzacji ryzyko amputacji kończyny w ciągu roku wynosi ok. 25-40%!"
          },
          {
            text: "Czysta polineuropatia cukrzycowa czuciowa, wystarczy wyrównać glikemię i wdrożyć kwas alfa-liponowy.",
            correct: false,
            feedback: "Błąd! Neuropatia cukrzycowa daje brak czucia (tzw. stopa bezbólowa, ciepła), podczas gdy tu dominuje skrajny ból naczyniowy spoczynkowy, zblednięcie w próbie Ratschowa i brak tętna obwodowego."
          },
          {
            text: "Dna moczanowa (podagra) palucha, zlecasz kolchicynę i allopurynol.",
            correct: false,
            feedback: "W podagrze staw śródstopno-paliczkowy I jest obrzęknięty, czerwony i gorący, a tętno zachowane. Martwica niedokrwienna i ból całej stopy łagodzony opuszczaniem to nie podagra."
          },
          {
            text: "Zwyrodnienie stawów kręgosłupa L-S z uciskiem na worek oponowy.",
            correct: false,
            feedback: "Brak tętna obwodowego i martwicze owrzodzenie na palcu to bezsprzeczny dowód zaawansowanej choroby naczyniowej."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Badanie wskaźnika kostka-ramię (ABI) – pułapka stwardnienia tętnic Mönckeberga",
        desc: "Wykonujesz badanie ciśnienia skurczowego za pomocą aparatu z mankietem i sondy Doppler. Ciśnienie na ramieniu wynosi 140 mmHg, natomiast ciśnienie na tętnicy piszczelowej tylnej wynosi... 210 mmHg, co daje wskaźnik kostka-ramię (ABI) równy 1.50. Chory pyta, czy to oznacza, że ma 'doskonały przepływ krwi'. Jak tłumaczysz ten wynik w oparciu o wiedzę naczyniową?",
        scenario: "Wykonujesz badanie ciśnienia skurczowego za pomocą aparatu z mankietem i sondy Doppler. Ciśnienie na ramieniu wynosi 140 mmHg, natomiast ciśnienie na tętnicy piszczelowej tylnej wynosi... 210 mmHg, co daje wskaźnik kostka-ramię (ABI) równy 1.50. Chory pyta, czy to oznacza, że ma 'doskonały przepływ krwi'. Jak tłumaczysz ten wynik w oparciu o wiedzę naczyniową?",
        options: [
          {
            text: "Wynik ABI >1.40 jest fałszywie zawyżony z powodu nieściśliwości zwapniałych tętnic (stwardnienie błony środkowej tętnic Mönckeberga / mediacalcinosis typowe dla cukrzycy i PChN); badanie ABI jest w tej sytuacji niewiarygodne i wymaga wykonania pomiaru ciśnienia na paluchu (wskaźnik paluch-ramię TBI) lub przezskórnego ciśnienia tlenu (TcPO2).",
            correct: true,
            feedback: "Wybitna znajomość pułapek diagnostycznych LEK! Prawidłowy ABI wynosi 0.9-1.3. Wartość ABI <0.9 oznacza miażdżycę tętnic, a <0.4 krytyczne niedokrwienie. Jednak u chorych na cukrzycę i z przewlekłą chorobą nerek dochodzi do masywnego zwapnienia błony środkowej naczyń (stwardnienie Mönckeberga). Sztywne naczynia nie dają się ucisnąć mankietem, dając fałszywie wysokie wyniki ABI >1.40! Tętnice palców rzadziej ulegają mediakalcynozie, dlatego złotym standardem alternatywnym jest wskaźnik paluch-ramię (TBI <0.7 oznacza niedokrwienie) lub pomiar TcPO2 (<30 mmHg)."
          },
          {
            text: "Wynik ABI 1.50 dowodzi rewelacyjnego ukrwienia nogi i wyklucza jakąkolwiek chorobę naczyniową.",
            correct: false,
            feedback: "Zabójcza pomyłka! Pacjent z ABI 1.50 i owrzodzeniem cukrzycowym może mieć skrajne niedokrwienie z powodu mediakalcynozy."
          },
          {
            text: "ABI powyżej 1.4 oznacza natychmiastowe wskazanie do przetoczenia 4 jednostek osocza.",
            correct: false,
            feedback: "Absurdalna interpretacja."
          },
          {
            text: "Aparat jest zepsuty, badanie należy powtórzyć na uchu pacjenta.",
            correct: false,
            feedback: "Niedorzeczne."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Pomiary mikrokrążenia – wskaźnik paluch-ramię (TBI) i TcPO2",
        desc: "Wykonano pomiar ciśnienia skurczowego na paluchu za pomocą miniaturowego mankietu fotopletyzmograficznego oraz pomiar przezskórnego ciśnienia tlenu (TcPO2). Wyniki: ciśnienie na paluchu = 20 mmHg (TBI = 0.14, norma >0.70), TcPO2 na grzbiecie stopy = 18 mmHg. Jak interpretujesz te parametry w kontekście gojenia rany i definicji CLTI wg wytycznych Global Vascular Guidelines (GVG)?",
        scenario: "Wykonano pomiar ciśnienia skurczowego na paluchu za pomocą miniaturowego mankietu fotopletyzmograficznego oraz pomiar przezskórnego ciśnienia tlenu (TcPO2). Wyniki: ciśnienie na paluchu = 20 mmHg (TBI = 0.14, norma >0.70), TcPO2 na grzbiecie stopy = 18 mmHg. Jak interpretujesz te parametry w kontekście gojenia rany i definicji CLTI wg wytycznych Global Vascular Guidelines (GVG)?",
        options: [
          {
            text: "Parametry te jednoznacznie potwierdzają skrajne niedokrwienie mikrokrążenia (ciśnienie na paluchu <30 mmHg oraz TcPO2 <30 mmHg wskazują na całkowity brak możliwości samoistnego wygojenia rany i wysokie ryzyko amputacji bez pilnej rewaskularyzacji).",
            correct: true,
            feedback: "Dokładnie tak! Zgodnie z Global Vascular Guidelines (GVG) i wytycznymi ESVS: ciśnienie skurczowe na kostce <50 mmHg, na paluchu <30 mmHg lub TcPO2 <30 mmHg to hemodynamiczne kryteria CLTI. Przy TcPO2 <20-30 mmHg tkanki nie mają wystarczającej ilości tlenu do syntezy kolagenu i migracji fibroblastów – rana bez poprawy ukrwienia nigdy się nie zagoi, lecz ulegnie wtórnemu zakażeniu i zgorzeli."
          },
          {
            text: "TcPO2 18 mmHg oznacza prawidłowe natlenienie, rana zagoi się po samym posmarowaniu maścią z antybiotykiem.",
            correct: false,
            feedback: "Błąd! Norma TcPO2 u zdrowego człowieka wynosi >50-60 mmHg. Wartość 18 mmHg to krytyczne niedotlenienie tkanek."
          },
          {
            text: "Ciśnienie na paluchu 20 mmHg jest wartością idealną.",
            correct: false,
            feedback: "Norma wynosi >60-70 mmHg (TBI >0.7)."
          },
          {
            text: "Brak możliwości gojenia wynika wyłącznie z braku witaminy D w diecie.",
            correct: false,
            feedback: "Przyczyną jest mechaniczne zamknięcie tętnic przez blaszki miażdżycowe."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Klasyfikacja WIfI (Wound, Ischemia, foot Infection)",
        desc: "Konsultant chirurgii naczyniowej prosi Cię o ocenę chorego w nowoczesnej klasyfikacji WIfI (Society for Vascular Surgery). Owrzodzenie obejmuje opuszka palucha bez odsłonięcia kości (Wound 1), niedokrwienie jest ciężkie (Ischemia 3 – ciśnienie na paluchu <30 mmHg), brak cech uogólnionego i głębokiego zakażenia (foot Infection 0). Co daje klasyfikacja WIfI w planowaniu leczenia?",
        scenario: "Konsultant chirurgii naczyniowej prosi Cię o ocenę chorego w nowoczesnej klasyfikacji WIfI (Society for Vascular Surgery). Owrzodzenie obejmuje opuszka palucha bez odsłonięcia kości (Wound 1), niedokrwienie jest ciężkie (Ischemia 3 – ciśnienie na paluchu <30 mmHg), brak cech uogólnionego i głębokiego zakażenia (foot Infection 0). Co daje klasyfikacja WIfI w planowaniu leczenia?",
        options: [
          {
            text: "Klasyfikacja WIfI precyzyjnie stratyfikuje 1-roczne ryzyko amputacji kończyny oraz prognozuje korzyść z wykonania zabiegu rewaskularyzacji; w tym przypadku ryzyko amputacji jest wysokie, a korzyść z przywrócenia bezpośredniego napływu tętniczego do stopy jest maksymalna.",
            correct: true,
            feedback: "Znakomicie! Klasyfikacja WIfI zintegrowała 3 kluczowe składowe patologii stopy naczyniowej: Wielkość rany (Wound 0-3), Stopień niedokrwienia (Ischemia 0-3) oraz Stopień infekcji (foot Infection 0-3). Pozwala to precyzyjnie przewidzieć, którzy chorzy odniosą korzyść z rewaskularyzacji naczyniowej, a którzy wymagają natychmiastowego drenażu infekcji lub pierwotnej amputacji."
          },
          {
            text: "Klasyfikacja WIfI ocenia jedynie jakość sieci bezprzewodowej w szpitalu.",
            correct: false,
            feedback: "Zbieżność nazw – WIfI w medycynie oznacza Wound, Ischemia, foot Infection."
          },
          {
            text: "Klasyfikacja WIfI służy do doboru rozmiaru obuwia ortopedycznego.",
            correct: false,
            feedback: "Niedorzeczne."
          },
          {
            text: "Wskazuje na bezwzględną konieczność natychmiastowej amputacji na poziomie uda bez badań obrazowych.",
            correct: false,
            feedback: "Błąd! Stopień W1 I3 fI0 ma wysokie prawdopodobieństwo uratowania kończyny po skutecznej rewaskularyzacji!"
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Obrazowanie anatomii naczyniowej przed rewaskularyzacją",
        desc: "Jakie badanie obrazowe jest badaniem z wyboru w celu zaplanowania techniki operacyjnej/wewnątrznaczyniowej rewaskularyzacji u chorego z CLTI i cukrzycą?",
        scenario: "Jakie badanie obrazowe jest badaniem z wyboru w celu zaplanowania techniki operacyjnej/wewnątrznaczyniowej rewaskularyzacji u chorego z CLTI i cukrzycą?",
        options: [
          {
            text: "Badanie USG duplex Doppler tętnic kończyn dolnych uzupełnione o angio-TK (z odpowiednią ochroną nerek i nawodnieniem) LUB cyfrową angiografię subtrakcyjną (DSA) obejmującą tętnice podudzia i łuk podeszwowy stopy.",
            correct: true,
            feedback: "Prawidłowo! Przed zabiegiem konieczna jest precyzyjna 'mapa naczyniowa' całego układu – od aorty, przez tętnice biodrowe, udowe, podkolanowe, aż po naczynia goleni (tętnica piszczelowa przednia, tylna i strzałkowa) oraz tętnice stopy (angiosom). Cukrzyca charakteryzuje się zajęciem małych tętnic poniżej kolana (arteriopatia obwodowa podkolanowa i goleni)."
          },
          {
            text: "Wystarczy zwykłe RTG stopy w projekcji AP bez kontrastu.",
            correct: false,
            feedback: "Zwykłe RTG uwidacznia jedynie kości (może wykluczyć osteomyelitis), ale nie pokazuje drożności światła tętnic."
          },
          {
            text: "Scyntygrafia tarczycy jodem radioaktywnym.",
            correct: false,
            feedback: "Całkowity brak związku."
          },
          {
            text: "Gastroskopia z biopsją błony śluzowej żołądka.",
            correct: false,
            feedback: "Niedorzeczne."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Wybór metody rewaskularyzacji – chirurgia wewnątrznaczyniowa (PTA/stent) vs bypass chirurgiczny",
        desc: "Angio-TK i angiografia wykazały: zwężenie tętnicy udowej powierzchownej (SFA) na odcinku 6 cm oraz drożną tętnicę piszczelową przednią zaopatrującą angiosom palucha. Jakie są nowoczesne opcje rewaskularyzacji wg koncepcji angiosomów?",
        scenario: "Angio-TK i angiografia wykazały: zwężenie tętnicy udowej powierzchownej (SFA) na odcinku 6 cm oraz drożną tętnicę piszczelową przednią zaopatrującą angiosom palucha. Jakie są nowoczesne opcje rewaskularyzacji wg koncepcji angiosomów?",
        options: [
          {
            text: "Przezskórna angioplastyka balonowa (PTA) z ewentualną implantacją stentu / balonu uwalniającego lek (DCB) w tętnicy udowej jako metoda pierwszego rzutu (endovascular-first strategy), a w razie niepowodzenia lub zmian wielopoziomowych – chirurgiczne pomostowanie omijające (by-pass udowo-piszczelowy) z użyciem własnej, odwróconej żyły odpiszczelowej (autologous saphenous vein).",
            correct: true,
            feedback: "Znakomicie! Wytyczne ESVS i Global Vascular Guidelines: w zmianach krótkich/pośrednich (TASC A-B) preferuje się zabieg wewnątrznaczyniowy (PTA/stent) ze względu na znikomą inwazyjność i szybkie gojenie u obciążonego sercowo cukrzyka. Przy długich niedrożnościach i dostępnej własnej żyle odpiszczelowej (VSM) złotym standardem chirurgii otwartej pozostaje pomostowanie autogenną żyłą (by-pass żylny ma znacznie wyższą drożność odległą niż proteza sztuczna PTFE poniżej kolana!). Rewaskularyzacja celowana w odpowiedni angiosom (tu t. piszczelowa przednia dla palucha) przyspiesza gojenie owrzodzenia."
          },
          {
            text: "Bezwzględna wysoka amputacja udowa, ponieważ u chorych na cukrzycę rewaskularyzacja nigdy się nie udaje.",
            correct: false,
            feedback: "Zabójczo błędne podejście! Współczesna chirurgia naczyniowa ratuje kończyny u >85% chorych dzięki rewaskularyzacji."
          },
          {
            text: "Zastosowanie wyłącznie pijawki lekarskiej na ranę palucha.",
            correct: false,
            feedback: "Pijawki nie udrożnią zarośniętej tętnicy udowej."
          },
          {
            text: "Wszczepienie stentu z plastiku do żyły głównej dolnej.",
            correct: false,
            feedback: "Niedorzeczne."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Kompleksowa farmakoterapia 'Best Medical Therapy' (BMT)",
        desc: "U chorego wykonano z sukcesem zabieg PTA tętnicy udowej i piszczelowej przedniej, uzyskując powrót tętna na tętnicy grzbietowej stopy i wzrost TcPO2 do 46 mmHg. Jakie leczenie farmakologiczne (tzw. Best Medical Therapy) musisz bezwzględnie wdrożyć w celu poprawy przeżycia i utrzymania drożności naczynia?",
        scenario: "U chorego wykonano z sukcesem zabieg PTA tętnicy udowej i piszczelowej przedniej, uzyskując powrót tętna na tętnicy grzbietowej stopy i wzrost TcPO2 do 46 mmHg. Jakie leczenie farmakologiczne (tzw. Best Medical Therapy) musisz bezwzględnie wdrożyć w celu poprawy przeżycia i utrzymania drożności naczynia?",
        options: [
          {
            text: "Lek przeciwpłytkowy (klopidogrel 75 mg/d lub ASA 75-100 mg/d, ewentualnie ASA + mała dawka rywaroksabanu 2x2.5 mg wg badania COMPASS/VOYAGER-PAD), statyna w wysokiej dawce (atorwastatyna 40-80 mg lub rosuwastatyna 20-40 mg z celem LDL <55 mg/dL), inhibitor ACE/ARB, optymalizacja kontroli cukrzycy (preferowane SGLT2i / agonista GLP-1) oraz bezwzględne zaprzestanie palenia tytoniu.",
            correct: true,
            feedback: "Wybitnie! Pacjent z CLTI ma ryzyko zgonu z przyczyn sercowo-naczyniowych (zawał, udar) sięgające 20-25% w ciągu roku! Kompleksowa farmakoterapia naczyniowa (BMT): 1) Silna statyna (cel LDL <55 mg/dl i redukcja o min. 50%); 2) Przeciwpłytkowe (klopidogrel jest preferowany nad ASA w miażdżycy kończyn wg CAPRIE; w badaniu VOYAGER-PAD połączenie ASA + rywaroksaban 2x2.5 mg po rewaskularyzacji istotnie zmniejsza ryzyko ostrego niedokrwienia i amputacji); 3) ACE-I; 4) Ścisły zakaz palenia."
          },
          {
            text: "Odstawienie wszystkich leków i zalecenie diety bogatej w tłuszcze zwierzęce.",
            correct: false,
            feedback: "Błąd przyspieszający zawał i zgon."
          },
          {
            text: "Tylko i wyłącznie suplementacja witaminy B12.",
            correct: false,
            feedback: "Niewystarczające."
          },
          {
            text: "Podawanie dożylnej heparyny przez całe pozostałe życie pacjenta.",
            correct: false,
            feedback: "Heparynę i.v. podaje się krótkoterminowo w stanach ostrych, a nie przewlekle w domu."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Miejscowe leczenie rany, odciążenie i profilaktyka zespołu stopy cukrzycowej",
        desc: "Co zalecasz w zakresie miejscowego leczenia martwiczego owrzodzenia palucha po udanej rewaskularyzacji, aby doprowadzić do całkowitego wygojenia?",
        scenario: "Co zalecasz w zakresie miejscowego leczenia martwiczego owrzodzenia palucha po udanej rewaskularyzacji, aby doprowadzić do całkowitego wygojenia?",
        options: [
          {
            text: "Chirurgiczne oczyszczenie martwicy (necrosectomia / debridement) w warunkach jałowych po przywróceniu ukrwienia, nowoczesne wilgotne opatrunki specjalistyczne, bezwzględne biomechaniczne odciążenie przodostopia (specjalne obuwie odciążające / orteza typu Total Contact Cast) oraz regularna kontrola w gabinecie stopy cukrzycowej.",
            correct: true,
            feedback: "Doskonale! Złota zasada leczenia owrzodzeń niedokrwienno-cukrzycowych: 1) Najpierw rewaskularyzacja, dopiero po uzyskaniu ukrwienia chirurgiczne oczyszczenie martwicy (wcześniejsze skrobanie martwicy na niedokrwionej stopie prowadzi do poszerzenia zgorzeli!); 2) Bezwzględne odciążenie (Total Contact Cast / but odciążający) – bez usunięcia nacisku mechanicznego rana nigdy się nie zamknie; 3) Opatrunki hydrożelowe/alginianowe."
          },
          {
            text: "Moczenie stopy w gorącej wodzie z szarym mydłem przez 2 godziny dziennie i chodzenie boso po dywanie.",
            correct: false,
            feedback: "Moczenie i maceracja tkanek oraz chodzenie boso u neuropaty z owrzodzeniem to prosta droga do zakażenia beztlenowcami, sepsy i natychmiastowej amputacji!"
          },
          {
            text: "Posypywanie rany sproszkowanym kwasem bornym i szczelne zaklejenie taśmą naprawczą.",
            correct: false,
            feedback: "Niedopuszczalne i szkodliwe."
          },
          {
            text: "Zalecenie intensywnego biegania maratonów w celu rozmasowania palucha.",
            correct: false,
            feedback: "Niedorzeczne."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 143: Objawowe zwężenie tętnicy szyjnej
  // ==========================================
  await upgradeCase('143_objawowe_zwezenie_tetnicy_szyjnej.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena w gabinecie neurologicznym/SOR – 68-latek z epizodem amaurosis fugax",
        desc: "Do oddziału ratunkowego zgłasza się 68-letni mężczyzna, palacz tytoniu z nadciśnieniem tętniczym. Przed 3 godzinami doznał nagłego, bezbolesnego zaniewidzenia lewego oka. Pacjent opisuje to zjawisko słowami: 'Nagle od góry opadła ciemna kurtyna i przez 10 minut nic nie widziałem na lewe oko, po czym widzenie stopniowo wróciło do normy'. Jednocześnie zauważył przejściowe, trwające kilkanaście minut osłabienie siły i zręczności prawej ręki (wypadł mu kubek z kawą). Obecnie dolegliwości ustąpiły całkowicie. W badaniu: HR 78/min, BP 155/90 mmHg. W badaniu neurologicznym bez ubytków ogniskowych. Przy osłuchiwaniu tętnic szyjnych słyszalny jest głośny, szorstki szmer skurczowy poniżej kąta żuchwy po stronie lewej. Jaka jest Twoja diagnoza?",
        scenario: "Do oddziału ratunkowego zgłasza się 68-letni mężczyzna, palacz tytoniu z nadciśnieniem tętniczym. Przed 3 godzinami doznał nagłego, bezbolesnego zaniewidzenia lewego oka. Pacjent opisuje to zjawisko słowami: 'Nagle od góry opadła ciemna kurtyna i przez 10 minut nic nie widziałem na lewe oko, po czym widzenie stopniowo wróciło do normy'. Jednocześnie zauważył przejściowe, trwające kilkanaście minut osłabienie siły i zręczności prawej ręki (wypadł mu kubek z kawą). Obecnie dolegliwości ustąpiły całkowicie. W badaniu: HR 78/min, BP 155/90 mmHg. W badaniu neurologicznym bez ubytków ogniskowych. Przy osłuchiwaniu tętnic szyjnych słyszalny jest głośny, szorstki szmer skurczowy poniżej kąta żuchwy po stronie lewej. Jaka jest Twoja diagnoza?",
        options: [
          {
            text: "Przemijające niedokrwienie mózgu (TIA) oraz przemijająca ślepota jednooczna (Amaurosis fugax) w przebiegu objawowego hemodynamicznie istotnego zwężenia lewej tętnicy szyjnej wewnętrznej (ICA); stan bezpośredniego zagrożenia dokonanym udarem niedokrwiennym mózgu.",
            correct: true,
            feedback: "Znakomicie! Klasyczny zespół TIA: amaurosis fugax (przemijające zaniewidzenie jednooczne) po stronie tożsamej (lewe oko – zator z tętnicy szyjnej do tętnicy środkowej siatkówki) oraz niedowład połowiczy po stronie przeciwnej (prawa ręka – skrzyżowanie dróg piramidowych). Szmer skurczowy nad bifurkacją szyjną to klasyczny objaw turbulentnego przepływu przez ciasno zwężoną tętnicę szyjną. Ryzyko wystąpienia pełnego udaru mózgu w ciągu pierwszych 48-72 godzin u takiego chorego wynosi kilkanaście procent!"
          },
          {
            text: "Odwarstwienie siatkówki lewego oka, kierujesz pacjenta do planowej poradni okulistycznej za miesiąc.",
            correct: false,
            feedback: "Odwarstwienie siatkówki nie ustępuje samoistnie po 10 minutach i nie daje jednoczesnego niedowładu ręki! To był incydent naczyniowy mózgowo-siatkówkowy."
          },
          {
            text: "Napad padaczkowy Jacksona z porażeniem Todda.",
            correct: false,
            feedback: "W napadzie Jacksona występują drgawki kloniczne, a amaurosis fugax to typowy mikrozator siatkówkowy z blaszki miażdżycowej."
          },
          {
            text: "Zespół cieśni nadgarstka prawego i zaćma lewego oka.",
            correct: false,
            feedback: "Niedorzeczne zbagatelizowanie stanu zagrożenia udarem mózgu."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Pilna ocena ryzyka udaru – skala ABCD2 i hospitalizacja",
        desc: "Jak oceniasz ryzyko wystąpienia dokonanego udaru mózgu w skali ABCD2 i jakie podejmujesz natychmiastowe kroki organizacyjne?",
        scenario: "Jak oceniasz ryzyko wystąpienia dokonanego udaru mózgu w skali ABCD2 i jakie podejmujesz natychmiastowe kroki organizacyjne?",
        options: [
          {
            text: "Ocena w skali ABCD2: Age >=60 (1 pkt), BP >=140/90 (1 pkt), Clinical features: jednostronne osłabienie (2 pkt), Duration >=60 min (0 pkt, trwało <60 min = 1 pkt), Diabetes: brak (0 pkt) -> suma 5 pkt (wysokie ryzyko udaru); chory wymaga natychmiastowej hospitalizacji na oddziale udarowym/neurologii w celu pilnej diagnostyki naczyniowej.",
            correct: true,
            feedback: "Doskonale! Skala ABCD2 stratyfikuje ryzyko udaru po TIA: wynik >=4 pkt oznacza wysokie ryzyko (do 10% ryzyka udaru w ciągu 48h i kilkanaście procent w 7 dni). Wszyscy chorzy z podejrzeniem objawowego zwężenia tętnicy szyjnej i wysokim wynikiem ABCD2 muszą być natychmiast hospitalizowani w celu pilnej diagnostyki i ewentualnego zabiegu operacyjnego!"
          },
          {
            text: "Wynik ABCD2 wynosi 0 pkt, wypisujesz pacjenta do domu ze zwolnieniem L4 na 3 dni.",
            correct: false,
            feedback: "Zabójczy błąd! Pacjent ma wiek 68 lat, podwyższone ciśnienie i osłabienie ręki – to wysokie ryzyko udaru."
          },
          {
            text: "Skala ABCD2 służy do oceny ryzyka raka prostaty.",
            correct: false,
            feedback: "Absurdalna pomyłka."
          },
          {
            text: "TIA nie wymaga hospitalizacji, wystarczy wypić melisę.",
            correct: false,
            feedback: "TIA to czerwony alarm zwiastujący udar niedokrwienny mózgu."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Przyłóżkowe USG Duplex Doppler tętnic szyjnych i kręgowych",
        desc: "Wykonano pilne badanie ultrasonograficzne Duplex Doppler naczyń domózgowych. W lewej tętnicy szyjnej wewnętrznej (ICA) stwierdzono: hipoechogenną, nieregularną blaszkę miażdżycową z owrzodzeniem, szczytowa prędkość skurczowa (PSV) wynosi 310 cm/s, a końcoworozkurczowa (EDV) 125 cm/s; stosunek prędkości ICA/CCA wynosi 4.8. Prawa ICA: blaszka bez istotnego zwężenia hemodynamicznego (PSV 90 cm/s). Tętnice kręgowe ze spektrum dogłowowym. Jak interpretujesz stopień zwężenia lewej ICA wg kryteriów ultrasonograficznych?",
        scenario: "Wykonano pilne badanie ultrasonograficzne Duplex Doppler naczyń domózgowych. W lewej tętnicy szyjnej wewnętrznej (ICA) stwierdzono: hipoechogenną, nieregularną blaszkę miażdżycową z owrzodzeniem, szczytowa prędkość skurczowa (PSV) wynosi 310 cm/s, a końcoworozkurczowa (EDV) 125 cm/s; stosunek prędkości ICA/CCA wynosi 4.8. Prawa ICA: blaszka bez istotnego zwężenia hemodynamicznego (PSV 90 cm/s). Tętnice kręgowe ze spektrum dogłowowym. Jak interpretujesz stopień zwężenia lewej ICA wg kryteriów ultrasonograficznych?",
        options: [
          {
            text: "Ciężkie, krytyczne zwężenie lewej tętnicy szyjnej wewnętrznej (ICA) rzędu 70-99% wg kryteriów NASCET (PSV >230 cm/s, EDV >100 cm/s, ICA/CCA >4.0) z cechami blaszki niestabilnej (owrzodzenie, hipoechogenność).",
            correct: true,
            feedback: "Znakomicie! Ultrasonograficzne kryteria stopnia zwężenia tętnicy szyjnej wewnętrznej wg zaleceń Society of Radiologists in Ultrasound (SRU) i wytycznych europejskich: PSV <125 cm/s (zwężenie <50%), PSV 125-230 cm/s (zwężenie 50-69%), PSV >230 cm/s, EDV >100 cm/s oraz wskaźnik ICA/CCA >4.0 odpowiadają ciasnemu zwężeniu 70-99% wg skali NASCET. Owrzodzona blaszka jest źródłem kolejnych mikrozatorów!"
          },
          {
            text: "Zwężenie nieistotne hemodynamicznie (<30%), prędkość 310 cm/s świadczy o rozszerzeniu naczynia.",
            correct: false,
            feedback: "Zgodnie z prawem Bernoulliego i ciągłości strugi prędkość rośnie w miejscu ZWĘŻENIA. PSV 310 cm/s to skrajne przyspieszenie w ciasnym zwężeniu!"
          },
          {
            text: "Całkowita niedrożność (100%) lewej tętnicy szyjnej.",
            correct: false,
            feedback: "Przy całkowitej niedrożności (okluzji 100%) nie ma przepływu (PSV = 0 cm/s)."
          },
          {
            text: "Przepływ jest prawidłowy, szmer wywołała tarczyca.",
            correct: false,
            feedback: "Kryteria Dopplera jednoznacznie definiują ciasne zwężenie naczyniowe."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Weryfikacja radiologiczna – angio-TK lub angio-MRI łuku aorty i naczyń mózgowych",
        desc: "Zgodnie z wytycznymi przed kwalifikacją do zabiegu inwazyjnego wykonano pilną angio-TK (lub angio-MR) głowy i szyi. Co musi ocenić to badanie?",
        scenario: "Zgodnie z wytycznymi przed kwalifikacją do zabiegu inwazyjnego wykonano pilną angio-TK (lub angio-MR) głowy i szyi. Co musi ocenić to badanie?",
        options: [
          {
            text: "Potwierdzenie stopnia zwężenia wg metodyki NASCET, ocenę obecności świeżych ognisk niedokrwiennych w mózgowiu, drożność koła tętniczego Willisa oraz anatomię łuku aorty i odejść naczyń (ocena ewentualnych przeszkód technicznych do operacji lub stentowania).",
            correct: true,
            feedback: "Prawidłowo! Przed interwencją konieczne jest: 1) Potwierdzenie zwężenia drugą niezależną metodą obrazową; 2) TK/MRI mózgowia wykluczające bezobjawowy świeży duży udar krwotoczny; 3) Ocena krążenia obocznego przez koło Willisa (t. łącząca przednia i tylna); 4) Ocena dostępności chirurgicznej (wysokość podziału tętnicy szyjnej wspólnej względem żuchwy)."
          },
          {
            text: "Badanie ma ocenić wyłącznie obecność próchnicy w zębach.",
            correct: false,
            feedback: "Niedorzeczne."
          },
          {
            text: "Angio-TK jest zbędne, wystarczy prześwietlenie klatki piersiowej.",
            correct: false,
            feedback: "RTG klatki piersiowej nie obrazuje naczyń szyjnych i mózgowych."
          },
          {
            text: "Badanie ma ocenić pojemność płuc.",
            correct: false,
            feedback: "Błędne pojęcie."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Wskazania do leczenia zabiegowego i krytyczne 'okno czasowe' (Time is Brain)",
        desc: "Angio-TK potwierdza zwężenie lewej ICA wynoszące 80% wg NASCET bez świeżego ogniska martwicy w mózgu. Pacjent przebył TIA 2 dni temu. Jakie są aktualne wytyczne ESVS (European Society for Vascular Surgery) dotyczące wskazań i optymalnego czasu operacji u chorych z objawowym zwężeniem tętnicy szyjnej?",
        scenario: "Angio-TK potwierdza zwężenie lewej ICA wynoszące 80% wg NASCET bez świeżego ogniska martwicy w mózgu. Pacjent przebył TIA 2 dni temu. Jakie są aktualne wytyczne ESVS (European Society for Vascular Surgery) dotyczące wskazań i optymalnego czasu operacji u chorych z objawowym zwężeniem tętnicy szyjnej?",
        options: [
          {
            text: "U pacjentów z objawowym zwężeniem ICA 70-99% bezwzględnie zaleca się pilną endarterektomię tętnicy szyjnej (CEA) wykonaną tak szybko, jak to możliwe – optymalnie w ciągu pierwszych 14 dni (a najlepiej w ciągu pierwszych 7 dni) od wystąpienia objawów neurologicznych.",
            correct: true,
            feedback: "Wybitna wiedza z najnowszych wytycznych! Badania ECST i NASCET udowodniły, że korzyść z operacji (redukcja bezwzględna ryzyka udaru o kilkanaście procent) jest NAJWIĘKSZA, gdy zabieg zostanie wykonany w ciągu pierwszych 14 dni od TIA/udaru. Dawna praktyka 'odczekiwania 4-6 tygodni' była błędna, ponieważ w tym czasie u wielu chorych dochodzi do śmiertelnego lub inwalidyzującego dokonanego udaru mózgu!"
          },
          {
            text: "Operację odracza się bezwzględnie o minimum 6 miesięcy, prowadząc wyłącznie obserwację.",
            correct: false,
            feedback: "Przestarzały, śmiertelny błąd! Po 6 miesiącach ryzyko zatorowości jest najwyższe na początku."
          },
          {
            text: "Chorych z TIA operuje się dopiero wtedy, gdy zwężenie osiągnie 100% (całkowita okluzja).",
            correct: false,
            feedback: "Gdy tętnica ulegnie całkowitej okluzji (100%), zabieg CEA jest z reguły przeciwwskazany i nieskuteczny (skrzeplina zamyka całe naczynie aż do syfonu)."
          },
          {
            text: "Objawowe zwężenie 80% leczy się wyłącznie akupunkturą.",
            correct: false,
            feedback: "Niedorzeczne."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Wybór metody zabiegowej – Endarterektomia (CEA) vs Stentowanie (CAS)",
        desc: "Chirurg naczyniowy i neurolog kwalifikują pacjenta do zabiegu. Kiedy wybiera się klasyczną endarterektomię tętnicy szyjnej (CEA), a w jakich sytuacjach preferuje się przezskórne stentowanie tętnicy szyjnej (CAS)?",
        scenario: "Chirurg naczyniowy i neurolog kwalifikują pacjenta do zabiegu. Kiedy wybiera się klasyczną endarterektomię tętnicy szyjnej (CEA), a w jakich sytuacjach preferuje się przezskórne stentowanie tętnicy szyjnej (CAS)?",
        options: [
          {
            text: "Metodą z wyboru u większości chorych (zwłaszcza w wieku >=70 lat i o standardowej anatomii) jest endarterektomia tętnicy szyjnej (CEA), ponieważ wiąże się z niższym ryzykiem okołooperacyjnego udaru niż CAS; stentowanie (CAS) rezerwuje się dla chorych wysokiego ryzyka chirurgicznego ('wroga szyja' po radioterapii, stan po wcześniejszej operacji szyi, wysoki podział tętnicy niedostępny chirurgicznie, nawrót zwężenia po CEA).",
            correct: true,
            feedback: "Perfekcyjna synteza wytycznych ESVS! W licznych badaniach (CREST, ICSS) wykazano, że CEA wiąże się ze statystycznie istotnie mniejszym ryzykiem okołooperacyjnego udaru mózgu i zgonu niż CAS, szczególnie u osób starszych (ze względu na trudności przejścia cewnikiem przez zwapniały łuk aorty i ryzyko mikrozatorowości mózgowej przy manipulacjach naczyniowych). Stentowanie (CAS) wymaga ponadto bezwzględnego stosowania filtrów neuroprotekcji mózgowej (EPD)."
          },
          {
            text: "CAS jest zawsze metodą pierwszego wyboru u każdego chorego bez wyjątku, a CEA została całkowicie zakazana.",
            correct: false,
            feedback: "Nieprawda – to CEA pozostaje 'złotym standardem' w wytycznych."
          },
          {
            text: "Wybór metody zależy wyłącznie od koloru oczu pacjenta.",
            correct: false,
            feedback: "Niedorzeczne."
          },
          {
            text: "W obydwu metodach usuwa się całą głowę pacjenta.",
            correct: false,
            feedback: "Absurdalne stwierdzenie."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Śródoperacyjna technika CEA – ochrona mózgowia i nerwów czaszkowych",
        desc: "Podczas operacji endarterektomii (CEA) chirurg klemem naczyniowym zamyka przepływ w tętnicy szyjnej wspólnej i wewnętrznej na czas wyłuszczenia blaszki miażdżycowej. Jakie nerwy czaszkowe przebiegają w polu operacyjnym i są narażone na uszkodzenie oraz jak chroni się mózg przed niedokrwieniem podczas zaklemowania naczynia?",
        scenario: "Podczas operacji endarterektomii (CEA) chirurg klemem naczyniowym zamyka przepływ w tętnicy szyjnej wspólnej i wewnętrznej na czas wyłuszczenia blaszki miażdżycowej. Jakie nerwy czaszkowe przebiegają w polu operacyjnym i są narażone na uszkodzenie oraz jak chroni się mózg przed niedokrwieniem podczas zaklemowania naczynia?",
        options: [
          {
            text: "Zagrożone są: nerw podjęzykowy (XII – zbaczanie języka), nerw krtaniowy wsteczny / błędny (X – chrypka), nerw językowo-gardłowy (IX – dysfagia) oraz gałąź brzeżna żuchwy nerwu twarzowego (VII – asymetria kącika ust); mózg chroni się poprzez monitorowanie (np. neuromonitoring EEG, NIRS lub przytomny pacjent w znieczuleniu przewodowym) i w razie niedostatecznego krążenia obocznego zakłada się czasowy shunt (bocznik) wewnątrznaczyniowy.",
            correct: true,
            feedback: "Wybitna anatomia chirurgiczna! Zagadnienie uszkodzenia nerwów czaszkowych w CEA to częste pytanie LEK: 1) Nerw podjęzykowy (XII) – najczęstsze uszkodzenie, objawia się zbaczaniem języka na stronę operowaną; 2) Nerw krtaniowy wsteczny (od X) – chrypka; 3) Nerw brzeżny żuchwy (od VII) – opadanie kącika ust. Shunt (bocznik tymczasowy) pozwala utrzymać perfuzję mózgu podczas wyłuszczania blaszki u chorych z niewydolnym kołem Willisa."
          },
          {
            text: "W polu operacyjnym nie ma żadnych nerwów, szyja zawiera wyłącznie tłuszcz.",
            correct: false,
            feedback: "Błąd anatomiczny."
          },
          {
            text: "Podczas operacji CEA mózg nie potrzebuje w ogóle krwi przez 4 godziny.",
            correct: false,
            feedback: "Mózg bez przepływu krwi obumiera po 3-5 minutach!"
          },
          {
            text: "Uszkodzenie nerwu węchowego (I) jest jedynym możliwym powikłaniem.",
            correct: false,
            feedback: "Nerw węchowy znajduje się w jamie nosowej i podstawie przedniego dołu czaszki, daleko od tętnicy szyjnej na szyi."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Opieka pooperacyjna – Zespół hiperperfuzji mózgowej (CHS) i farmakoterapia",
        desc: "Operacja CEA przebiegła pomyślnie. W 2. dobie po zabiegu pacjent zgłasza silny, pulsujący ból głowy po stronie operowanej, nudności, a ciśnienie tętnicze wzrasta do 185/105 mmHg. Pielęgniarka zauważa drżenia mięśniowe lewej połowy twarzy. Jakie groźne powikłanie podejrzewasz (Cerebral Hyperperfusion Syndrome) i jak należy postępować?",
        scenario: "Operacja CEA przebiegła pomyślnie. W 2. dobie po zabiegu pacjent zgłasza silny, pulsujący ból głowy po stronie operowanej, nudności, a ciśnienie tętnicze wzrasta do 185/105 mmHg. Pielęgniarka zauważa drżenia mięśniowe lewej połowy twarzy. Jakie groźne powikłanie podejrzewasz (Cerebral Hyperperfusion Syndrome) i jak należy postępować?",
        options: [
          {
            text: "Zespół hiperperfuzji mózgowej (CHS - Cerebral Hyperperfusion Syndrome) wywołany nagłym, masywnym napływem krwi pod wysokim ciśnieniem do naczyniowego łożyska mózgowego, które utraciło zdolność autoregulacji; wymaga natychmiastowego, agresywnego obniżenia ciśnienia tętniczego (labetalol, urapidil i.v., cel SBP <140 mmHg) oraz pilnego TK głowy celem wykluczenia obrzęku mózgu i krwotoku śródmózgowego.",
            correct: true,
            feedback: "Wybitna czujność kliniczna! CHS występuje u ok. 1-3% chorych po udanej CEA/CAS: przewlekle niedokrwione naczynia mózgowe były maksymalnie rozszerzone. Po usunięciu ciasnego zwężenia i wzroście ciśnienia tętniczego dochodzi do przekrwienia i obrzęku naczyniopochodnego (breakdown of autoregulation), co grozi masywnym udarem krwotocznym! Ścisła kontrola ciśnienia tętniczego (SBP <140 mmHg) po CEA jest kluczowym elementem opieki pooperacyjnej. Długoterminowo: ASA/klopidogrel + wysoka dawka statyny."
          },
          {
            text: "To zwykły ból głowy z przemęczenia, podaj tabletkę paracetamolu i podnieś ciśnienie powyżej 200 mmHg.",
            correct: false,
            feedback: "Śmiertelny błąd! Wzrost ciśnienia doprowadzi do pęknięcia naczyń mózgowych i zgonu z powodu krwiaka śródmózgowego."
          },
          {
            text: "Zalecenie picia dużej ilości kawy.",
            correct: false,
            feedback: "Kofeina podniosłaby ciśnienie i pogłębiła encefalopatię."
          },
          {
            text: "Konieczność natychmiastowego usunięcia drugiej tętnicy szyjnej.",
            correct: false,
            feedback: "Niedorzeczne."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 144: Zakrzepica żył głębokich (DVT)
  // ==========================================
  await upgradeCase('144_zakrzepica_zyl_glebokich_dvt.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena w gabinecie lekarza dyżurnego – 54-letnia kobieta z asymetrycznym obrzękiem łydki",
        desc: "Do izby przyjęć zgłasza się 54-letnia kobieta. Przed 2 dniami wróciła z 11-godzinnego lotu samolotem ze Stanów Zjednoczonych. Ponadto 3 tygodnie temu przebyła artroskopię prawego stawu kolanowego. Od wczoraj odczuwa narastający ból i uczucie rozpierania prawej łydki, które nasila się przy chodzeniu. W badaniu: HR 82/min, BP 125/75 mmHg, temp. 37.1°C. Prawa kończyna dolna jest wyraźnie obrzęknięta – obwód prawej łydki mierzony 10 cm poniżej guzowatości piszczeli jest o 4.0 cm większy niż łydki lewej. Skóra na prawej goleni jest lekko ocieplona, widoczne są poszerzone żyły powierzchowne na przedniej powierzchni piszczeli (objaw Pratta). Przy gwałtownym grzbietowym zgięciu stopy pacjentka zgłasza ostry ból w łydce (objaw Homansa). Jaka jest Twoja diagnoza robocza?",
        scenario: "Do izby przyjęć zgłasza się 54-letnia kobieta. Przed 2 dniami wróciła z 11-godzinnego lotu samolotem ze Stanów Zjednoczonych. Ponadto 3 tygodnie temu przebyła artroskopię prawego stawu kolanowego. Od wczoraj odczuwa narastający ból i uczucie rozpierania prawej łydki, które nasila się przy chodzeniu. W badaniu: HR 82/min, BP 125/75 mmHg, temp. 37.1°C. Prawa kończyna dolna jest wyraźnie obrzęknięta – obwód prawej łydki mierzony 10 cm poniżej guzowatości piszczeli jest o 4.0 cm większy niż łydki lewej. Skóra na prawej goleni jest lekko ocieplona, widoczne są poszerzone żyły powierzchowne na przedniej powierzchni piszczeli (objaw Pratta). Przy gwałtownym grzbietowym zgięciu stopy pacjentka zgłasza ostry ból w łydce (objaw Homansa). Jaka jest Twoja diagnoza robocza?",
        options: [
          {
            text: "Zakrzepica żył głębokich prawej kończyny dolnej (DVT - Deep Vein Thrombosis) z wysokim ryzykiem zatorowości płucnej (PE), sprowokowana unieruchomieniem podczas długiego lotu oraz niedawnym zabiegiem ortopedycznym (triada Virchowa).",
            correct: true,
            feedback: "Znakomicie! Klasyczna prezentacja DVT: jednostronny ból, obrzęk goleni (asymetria obwodów >3 cm), poszerzenie żył krążenia obocznego (objaw Pratta) oraz ból przy zgięciu grzbietowym stopy (objaw Homansa – choć mało swoisty, często wspominany na LEK). Pacjentka spełnia triadę Virchowa: zastój żylny (lot długodystansowy), uszkodzenie ściany naczynia (zabieg operacyjny) i stan nadkrzepliwości."
          },
          {
            text: "Pęknięcie ścięgna Achillesa, zlecasz gips stopowo-goleniowy na 6 tygodni.",
            correct: false,
            feedback: "Przy pęknięciu ścięgna Achillesa dochodzi do nagłego trzasku i braku możliwości wspięcia na palce (test Thomsona), a nie uogólnionego obrzęku łydki z poszerzeniem żył powierzchownych."
          },
          {
            text: "Zwykłe zakwasy mięśniowe (DOMS), zalecasz gorącą kąpiel i masaż łydki.",
            correct: false,
            feedback: "Masaż łydki u pacjenta z DVT jest śmiertelnie niebezpieczny – może mechanicznie oderwać skrzeplinę i spowodować natychmiastowy zator tętnicy płucnej!"
          },
          {
            text: "Przewlekła niewydolność nerek, ponieważ obrzęki nóg zawsze wynikają z nerek.",
            correct: false,
            feedback: "Obrzęki nerkowe lub sercowe są symetryczne i obustronne. Asymetryczny obrzęk jednej kończyny to niemal zawsze patologia naczyniowa (DVT lub obrzęk limfatyczny)."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Stratyfikacja prawdopodobieństwa klinicznego – Skala Wellsa dla DVT",
        desc: "Zgodnie z wytycznymi ESC i Towarzystwa Internistów Polskich przystępujesz do obiektywizacji podejrzenia za pomocą skali Wellsa. Policz punkty u pacjentki: niedawny zabieg operacyjny w znieczuleniu (+1), unieruchomienie / długi lot (+1), obrzęk całej kończyny (+1), różnica obwodów łydek >3 cm (+1), bolesność wzdłuż przebiegu żył głębokich (+1), brak alternatywnego rozpoznania równie prawdopodobnego (+1). Jaki jest wynik w skali Wellsa i co to oznacza?",
        scenario: "Zgodnie z wytycznymi ESC i Towarzystwa Internistów Polskich przystępujesz do obiektywizacji podejrzenia za pomocą skali Wellsa. Policz punkty u pacjentki: niedawny zabieg operacyjny w znieczuleniu (+1), unieruchomienie / długi lot (+1), obrzęk całej kończyny (+1), różnica obwodów łydek >3 cm (+1), bolesność wzdłuż przebiegu żył głębokich (+1), brak alternatywnego rozpoznania równie prawdopodobnego (+1). Jaki jest wynik w skali Wellsa i co to oznacza?",
        options: [
          {
            text: "Wynik >=3 punkty: wysokie prawdopodobieństwo kliniczne DVT (high clinical probability); zgodnie z algorytmem diagnostycznym pierwszym badaniem z wyboru jest natychmiastowe wykonanie testu kompresyjnego USG (CUS) żył głębokich, bez czekania na stężenie D-dimerów.",
            correct: true,
            feedback: "Dokładnie tak! Algorytm diagnostyczny DVT: u pacjentów z WYSOKIM prawdopodobieństwem klinicznym (Wells >=3 pkt lub >=2 w skali 2-stopniowej) badaniem pierwszego rzutu jest ultrasonograficzny test uciskowy (CUS). Oznaczanie D-dimerów ma kluczowe znaczenie przy niskim prawdopodobieństwie klinicznym (służy do wykluczenia choroby ze względu na wysoką ujemną wartość predykcyjną NPV); przy wysokim prawdopodobieństwie ujemny D-dimer nie wyklucza DVT w sposób bezpieczny!"
          },
          {
            text: "Wynik Wellsa oznacza niskie ryzyko, należy oznaczyć D-dimery i w razie wyniku ujemnego odesłać chorą do domu.",
            correct: false,
            feedback: "Chora ma aż 5-6 punktów w skali Wellsa (obrzęk >3 cm, zabieg, unieruchomienie) – to podręcznikowo wysokie ryzyko DVT."
          },
          {
            text: "Skala Wellsa ma zastosowanie wyłącznie w chorobach tarczycy.",
            correct: false,
            feedback: "Skala Wellsa to podstawowe narzędzie diagnostyki DVT i PE."
          },
          {
            text: "Wysoki wynik Wellsa oznacza, że pacjentka musi mieć natychmiast amputowaną nogę.",
            correct: false,
            feedback: "Niedorzeczne."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Ultrasonograficzny test uciskowy (CUS - Compression Ultrasound) żył",
        desc: "Wykonujesz przyłóżkowe badanie ultrasonograficzne układu żylnego prawej kończyny dolnej od więzadła pachwinowego do dołu podkolanowego. Jakie jest kluczowe kryterium diagnostyczne obecności zakrzepicy żył głębokich w teście CUS?",
        scenario: "Wykonujesz przyłóżkowe badanie ultrasonograficzne układu żylnego prawej kończyny dolnej od więzadła pachwinowego do dołu podkolanowego. Jakie jest kluczowe kryterium diagnostyczne obecności zakrzepicy żył głębokich w teście CUS?",
        options: [
          {
            text: "Brak pełnego zapadania się (brak ściśliwości) światła żyły pod umiarkowanym uciskiem głowicy ultrasonograficznej (brak kompresji żyły podkolanowej i udowej) oraz obecność hipoechogennych mas skrzepliny w świetle naczynia i brak prawidłowego przepływu fazowego z oddechem.",
            correct: true,
            feedback: "Znakomicie! Brak ściśliwości ściany żyły pod uciskiem głowicy (incompressibility) to najważniejsze, najbardziej swoiste i czułe kryterium diagnostyczne DVT (czułość >95% dla zakrzepicy proksymalnej). Zdrowa żyła pod delikatnym uciskiem zapada się całkowicie ('ściana do ściany'). Jeśli w świetle znajduje się skrzeplina, żyła nie daje się ucisnąć."
          },
          {
            text: "Obecność tętna w żyle świadczy o zakrzepicy.",
            correct: false,
            feedback: "Żyły nie tętnią synchronicznie z sercem (chyba że występuje ciężka niedomykalność trójdzielna)."
          },
          {
            text: "Zapadanie się żyły w 100% pod uciskiem potwierdza masywną zakrzepicę.",
            correct: false,
            feedback: "Całkowite zapadanie się żyły pod uciskiem wyklucza zakrzepicę w badanym segmencie!"
          },
          {
            text: "Kryterium jest wyłącznie grubość kości piszczelowej.",
            correct: false,
            feedback: "Niedorzeczne."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Wybór leczenia przeciwkrzepliwego pierwszej linii wg wytycznych CHEST i ESC",
        desc: "Badanie CUS potwierdziło zakrzepicę żyły podkolanowej i udowej prawej. Pacjentka nie ma cech zatorowości płucnej (SpO2 98%, HR 80/min, brak duszności), czynność nerek jest prawidłowa (eGFR 88 ml/min/1.73m2), masa ciała 70 kg. Jaka grupa leków przeciwkrzepliwych jest obecnie leczeniem pierwszego wyboru u pacjentki bez choroby nowotworowej?",
        scenario: "Badanie CUS potwierdziło zakrzepicę żyły podkolanowej i udowej prawej. Pacjentka nie ma cech zatorowości płucnej (SpO2 98%, HR 80/min, brak duszności), czynność nerek jest prawidłowa (eGFR 88 ml/min/1.73m2), masa ciała 70 kg. Jaka grupa leków przeciwkrzepliwych jest obecnie leczeniem pierwszego wyboru u pacjentki bez choroby nowotworowej?",
        options: [
          {
            text: "Doustne antykoagulanty niebędące antagonistami witaminy K (NOAC/DOAC) – rywaroksaban (15 mg 2x/d przez 21 dni, potem 20 mg 1x/d) LUB apiksaban (10 mg 2x/d przez 7 dni, potem 5 mg 2x/d) w monoterapii od pierwszego dnia, bez konieczności początkowego podawania heparyny drogą pozajelitową.",
            correct: true,
            feedback: "Perfekcyjnie! Zgodnie z wytycznymi CHEST i ESC leki z grupy NOAC/DOAC (inhibitory czynnika Xa – apiksaban, rywaroksaban lub bezpośredni inhibitor trombiny – dabigatran) są lekami pierwszego wyboru nad antagonistami witaminy K (acenokumarol/warfaryna). Zaletą apiksabanu i rywaroksabanu jest możliwość natychmiastowego rozpoczęcia leczenia doustnego od dawki nasycającej bez konieczności 'pomostu' z heparyny drobnocząsteczkowej (HDCz)!"
          },
          {
            text: "Wyłącznie kwas acetylosalicylowy (aspiryna) w dawce 75 mg raz na dobę.",
            correct: false,
            feedback: "Aspiryna jest lekiem przeciwpłytkowym i jest CAŁKOWICIE NIESKUTECZNA w leczeniu ostrej zakrzepicy żył głębokich!"
          },
          {
            text: "Dożylna streptokinaza przez 14 dni u każdego chorego z DVT.",
            correct: false,
            feedback: "Tromboliza ogólnoustrojowa w niepowikłanej DVT jest przeciwwskazana z powodu wysokiego ryzyka krwawień mózgowych."
          },
          {
            text: "Zastosowanie pijawek na podudzie i leżenie w łóżku przez miesiąc.",
            correct: false,
            feedback: "Niedopuszczalne i szkodliwe."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Mobilizacja pacjenta a ryzyko zatorowości płucnej – obalenie mitu unieruchomienia",
        desc: "Pacjentka pyta z lękiem: 'Panie doktorze, czy ja muszę teraz leżeć plackiem w łóżku przez 2 tygodnie, żeby ta skrzeplina się nie urwała i nie poleciała do płuc?'. Co odpowiadasz zgodnie ze współczesną wiedzą medyczną?",
        scenario: "Pacjentka pyta z lękiem: 'Panie doktorze, czy ja muszę teraz leżeć plackiem w łóżku przez 2 tygodnie, żeby ta skrzeplina się nie urwała i nie poleciała do płuc?'. Co odpowiadasz zgodnie ze współczesną wiedzą medyczną?",
        options: [
          {
            text: "Współczesne wytyczne zalecają wczesne uruchomienie i chodzenie w kompresjoterapii (pończochy elastyczne / bandażowanie) zaraz po wdrożeniu skutecznej antykoagulacji; unieruchomienie w łóżku nie zmniejsza ryzyka zatorowości płucnej, a nasila zastój żylny i opóźnia ustępowanie obrzęku.",
            correct: true,
            feedback: "Wybitnie! Historyczny dogmat o konieczności ścisłego leżenia w łóżku przez tygodnie po rozpoznaniu DVT został całkowicie obalony. Badania kliniczne wykazały, że wczesne uruchomienie po podaniu leku przeciwkrzepliwego jest całkowicie bezpieczne, nie zwiększa ryzyka zatorowości płucnej, a praca pompy mięśniowej łydki poprawia drenaż żylny i przyspiesza rekanalizację naczynia."
          },
          {
            text: "Tak, bezwzględny zakaz wstawania nawet do toalety przez minimum 30 dni.",
            correct: false,
            feedback: "Przestarzały, szkodliwy pogląd sprzed 50 lat."
          },
          {
            text: "Zalecasz skoki na trampolinie w celu 'wytrząśnięcia' skrzepliny.",
            correct: false,
            feedback: "Niedorzeczne."
          },
          {
            text: "Kończyna musi być unieruchomiona w szynie gipsowej.",
            correct: false,
            feedback: "Gips nasiliłby zakrzepicę."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Czas trwania leczenia przeciwkrzepliwego – czynnik sprowokowany vs niesprowokowany",
        desc: "Jak długo pacjentka powinna przyjmować lek przeciwkrzepliwy, biorąc pod uwagę okoliczności wystąpienia zakrzepicy?",
        scenario: "Jak długo pacjentka powinna przyjmować lek przeciwkrzepliwy, biorąc pod uwagę okoliczności wystąpienia zakrzepicy?",
        options: [
          {
            text: "Dokładnie 3 miesiące – jest to zakrzepica sprowokowana przemijającym dużym/pośrednim czynnikiem ryzyka (zabieg chirurgiczny, długi lot); po 3 miesiącach leczenie przeciwkrzepliwe można bezpiecznie zakończyć, o ile czynniki ryzyka ustąpiły.",
            correct: true,
            feedback: "Znakomicie! Wytyczne CHEST i ESC: w zakrzepicy żył głębokich sprowokowanej przemijającym czynnikiem ryzyka (operacja, uraz, unieruchomienie) rekomendowany czas leczenia wynosi 3 miesiące. Przewlekłe (bezterminowe) leczenie przeciwkrzepliwe rezerwuje się dla zakrzepicy niesprowokowanej (idiopatycznej), nawrotowej lub związanej z aktywnym nowotworem złośliwym / zespołem antyfosfolipidowym."
          },
          {
            text: "Do końca życia bez możliwości odstawienia.",
            correct: false,
            feedback: "Dożywotnia antykoagulacja u pacjentki ze sprowokowanym pierwszym epizodem niepotrzebnie narażałaby ją na ryzyko krwawień."
          },
          {
            text: "Wystarczą 3 dni przyjmowania tabletek.",
            correct: false,
            feedback: "3 dni to za mało – ryzyko nawrotu i zatoru płucnego wynosiłoby ponad 50%!"
          },
          {
            text: "Lek odstawia się natychmiast, gdy tylko przestanie boleć noga.",
            correct: false,
            feedback: "Ustąpienie bólu następuje w ciągu kilku dni, ale organizacja skrzepliny trwa tygodniami."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Profilaktyka Zespołu Pozakrzepowego (PTS - Post-Thrombotic Syndrome)",
        desc: "Co zalecasz pacjentce, aby zapobiec rozwojowi przewlekłego zespołu pozakrzepowego (PTS), objawiającego się trwałym obrzękiem, hiperpigmentacją skóry i owrzodzeniami podudzia?",
        scenario: "Co zalecasz pacjentce, aby zapobiec rozwojowi przewlekłego zespołu pozakrzepowego (PTS), objawiającego się trwałym obrzękiem, hiperpigmentacją skóry i owrzodzeniami podudzia?",
        options: [
          {
            text: "Stosowanie kompresjoterapii (indywidualnie dobrane medyczne pończochy lub podkolanówki o stopniowanym ucisku II klasy kompresji 23-32 mmHg) noszone w ciągu dnia przez minimum 6-24 miesiące oraz unikanie długiego stania i odpoczynek z uniesionymi kończynami.",
            correct: true,
            feedback: "Doskonale! Zespół pozakrzepowy (PTS) rozwija się u 20-50% chorych po przebytej DVT w wyniku zniszczenia zastawek żylnych i trwałego nadciśnienia żylnego. Kompresjoterapia o stopniowanym ucisku (klasa II) wspomaga odpływ żylny, redukuje obrzęki i istotnie zmniejsza nasilenie objawów PTS."
          },
          {
            text: "Chodzenie na wysokich obcasach przez cały dzień.",
            correct: false,
            feedback: "Wysokie obcasy upośledzają pracę pompy mięśniowej łydki."
          },
          {
            text: "Picie octu jabłkowego na czczo.",
            correct: false,
            feedback: "Niedorzeczne."
          },
          {
            text: "Całkowity zakaz noszenia jakichkolwiek pończoch uciskowych.",
            correct: false,
            feedback: "Kompresjoterapia jest podstawową niefarmakologiczną metodą leczenia przewlekłej niewydolności żylnej."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Profilaktyka pierwotna przed kolejnymi podróżami lotniczymi",
        desc: "Pacjentka pyta, jak ma się przygotować do kolejnego lotu samolotem za rok, gdy zakończy już 3-miesięczną antykoagulację. Jakie są zalecenia profilaktyczne dla osób po przebytej DVT planujących lot >4-6 godzin?",
        scenario: "Pacjentka pyta, jak ma się przygotować do kolejnego lotu samolotem za rok, gdy zakończy już 3-miesięczną antykoagulację. Jakie są zalecenia profilaktyczne dla osób po przebytej DVT planujących lot >4-6 godzin?",
        options: [
          {
            text: "Założenie podkolanówek kompresyjnych o stopniowanym ucisku (I lub II klasy), częste ćwiczenia izometryczne łydek i spacery po pokładzie samolotu, obfite nawodnienie doustne, unikanie alkoholu i leków nasennych oraz – z uwagi na przebyte DVT – podanie profilaktycznej dawki HDCz (np. enoksaparyna 40 mg s.c.) lub NOAC na 2-3 godziny przed odlotem.",
            correct: true,
            feedback: "Wybitna precyzja! Osoba po przebytej DVT należy do grupy podwyższonego ryzyka zakrzepowo-zatorowego w podróżach trwających >4-6 godzin (tzw. zespół klasy ekonomicznej). Połączenie niefarmakologicznych metod (kompresja, ruch, nawodnienie) z jednorazową dawką profilaktyczną HDCz s.c. lub NOAC zapewnia optymalną ochronę."
          },
          {
            text: "Przyjęcie podwójnej dawki leków nasennych, aby przespać cały lot w bezruchu.",
            correct: false,
            feedback: "Głębokie uśpienie i wielogodzinny bezruch dramatycznie zwiększają ryzyko ponownej zakrzepicy!"
          },
          {
            text: "Picie wyłącznie alkoholu wysokoprocentowego w celu 'rozrzedzenia krwi'.",
            correct: false,
            feedback: "Alkohol odwadnia i zagęszcza krew, nasilając ryzyko zakrzepicy."
          },
          {
            text: "Brak jakichkolwiek zaleceń, przebyte DVT uodparnia na kolejne zakrzepy.",
            correct: false,
            feedback: "Przebyty epizod DVT jest jednym z najsilniejszych czynników ryzyka kolejnego incydentu!"
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 145: Zakrzepowe zapalenie żył powierzchownych (SVT)
  // ==========================================
  await upgradeCase('145_zakrzepowe_zapalenie_zyl_powierzchownych_svt.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena na ostrym dyżurze chirurgicznym – 48-latek z bolesnym powrózkiem na udzie",
        desc: "Do chirurga dyżurnego zgłasza się 48-letni mężczyzna z wieloletnimi, zaniedbanymi żylakami kończyn dolnych. Przed 3 dniami zauważył bolesne zgrubienie na przyśrodkowej powierzchni lewego uda. Od wczoraj zmiana stała się skrajnie bolesna, twarda, a skóra nad nią jest zaczerwieniona i gorąca. W badaniu: wzdłuż przebiegu pnia żyły odpiszczelowej (VSM - Vena Saphena Magna) na przyśrodkowej powierzchni uda wyczuwalny jest twardy, obrzęknięty, bolesny jak powróz wał o długości ok. 12 cm. Nad zmianą występuje rumień i miejscowe ocieplenie. Zmiana sięga ku górze do wysokości ok. 5-6 cm poniżej fałdu pachwinowego. Kończyna nie wykazuje uogólnionego obrzęku podudzia. Jaka jest Twoja diagnoza robocza?",
        scenario: "Do chirurga dyżurnego zgłasza się 48-letni mężczyzna z wieloletnimi, zaniedbanymi żylakami kończyn dolnych. Przed 3 dniami zauważył bolesne zgrubienie na przyśrodkowej powierzchni lewego uda. Od wczoraj zmiana stała się skrajnie bolesna, twarda, a skóra nad nią jest zaczerwieniona i gorąca. W badaniu: wzdłuż przebiegu pnia żyły odpiszczelowej (VSM - Vena Saphena Magna) na przyśrodkowej powierzchni uda wyczuwalny jest twardy, obrzęknięty, bolesny jak powróz wał o długości ok. 12 cm. Nad zmianą występuje rumień i miejscowe ocieplenie. Zmiana sięga ku górze do wysokości ok. 5-6 cm poniżej fałdu pachwinowego. Kończyna nie wykazuje uogólnionego obrzęku podudzia. Jaka jest Twoja diagnoza robocza?",
        options: [
          {
            text: "Zakrzepowe zapalenie żył powierzchownych (SVT - Superficial Vein Thrombosis) pnia żyły odpiszczelowej (VSM) lewego uda z potencjalnym zagrożeniem propagacji skrzepliny do układu żył głębokich.",
            correct: true,
            feedback: "Znakomicie! Klasyczny obraz SVT (thrombophlebitis superficialis): bolesny, twardy powrózkowaty naciek wzdłuż przebiegu żyły powierzchownej z odczynem zapalnym skóry (rumień, ucieplenie). Najczęściej rozwija się w zmienionej żylakowato żyle odpiszczelowej (VSM). Kluczowe znaczenie ma lokalizacja: skrzeplina w pniu VSM na udzie stwarza wysokie ryzyko migracji do żyły udowej wspólnej!"
          },
          {
            text: "Róża (erysipelas) lewego uda, wdrażasz wyłącznie penicylinę krystaliczną.",
            correct: false,
            feedback: "W róży rumień ma ostro odgraniczone, uniesione brzegi i szerzy się płaszczyznowo na skórze, towarzyszy mu wysoka gorączka z dreszczami, bez obecności wyczuwalnego zgrubiałego powrózka naczyniowego."
          },
          {
            text: "Ukąszenie pająka pustelnika brunatnego.",
            correct: false,
            feedback: "Niedorzeczne rozpoznanie w warunkach europejskich."
          },
          {
            text: "Zwykły krwiak podskórny po urazie, nakłuj igłą i załóż plaster.",
            correct: false,
            feedback: "Błąd! Nakłucie zakrzepniętej żyły powierzchownej grozi zakażeniem i sepsą."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Pilna diagnostyka obrazowa – USG Duplex Doppler i 'zasada 3 centymetrów'",
        desc: "Dlaczego u każdego pacjenta z podejrzeniem zakrzepicy żył powierzchownych pnia VSM lub VSP bezwzględnie konieczne jest wykonanie pełnego badania USG Duplex Doppler i na czym polega krytyczna 'zasada 3 centymetrów'?",
        scenario: "Dlaczego u każdego pacjenta z podejrzeniem zakrzepicy żył powierzchownych pnia VSM lub VSP bezwzględnie konieczne jest wykonanie pełnego badania USG Duplex Doppler i na czym polega krytyczna 'zasada 3 centymetrów'?",
        options: [
          {
            text: "USG musi wykluczyć współistniejącą niemą zakrzepicę żył głębokich DVT (występuje u nawet 20-25% chorych z SVT!) oraz zmierzyć odległość czoła skrzepliny od ujścia odpiszczelowo-udowego (SFJ); jeśli skrzeplina zbliża się na odległość <3 cm od ujścia do żyły głębokiej, stan ten traktuje się jak zakrzepicę żył głębokich ze względu na wysokie ryzyko zatorowości płucnej.",
            correct: true,
            feedback: "Wybitna znajomość wytycznych ESVS i CHEST! To jedno z ulubionych i najważniejszych pytań egzaminacyjnych LEK: 1) SVT często współistnieje z niemą DVT; 2) Badanie fizykalne niedoszacowuje zasięgu skrzepliny w żyle średnio o kilka centymetrów w porównaniu z USG; 3) 'Zasada 3 cm': skrzeplina w VSM dochodząca na odległość <3 cm od połączenia odpiszczelowo-udowego (SFJ – saphenofemoral junction) lub odstrzałkowo-podkolanowego (SPJ) stwarza bezpośrednie ryzyko urwania i zatoru tętnicy płucnej – wymaga pełnego leczenia przeciwkrzepliwego w dawkach terapeutycznych (jak w DVT) lub krosektomii!"
          },
          {
            text: "USG jest zbędne, badanie palpacyjne ręką jest w 100% wystarczające.",
            correct: false,
            feedback: "Zabójczy błąd! Badanie palpacyjne nie jest w stanie ocenić głębokości czoła skrzepliny ani wykluczyć DVT."
          },
          {
            text: "Zasada 3 cm oznacza, że pończocha uciskowa musi być 3 cm krótsza od nogi.",
            correct: false,
            feedback: "Błędna interpretacja."
          },
          {
            text: "USG służy wyłącznie do oceny grubości kości udowej.",
            correct: false,
            feedback: "Niedorzeczne."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Wynik USG Doppler u naszego pacjenta",
        desc: "Lekarz wykonujący USG Doppler podaje wynik: 'Pień VSM lewego uda wypełniony hipoechogenną skrzepliną na odcinku 14 cm. Czoło skrzepliny znajduje się w odległości 4.5 cm od ujścia odpiszczelowo-udowego (SFJ). Żyła udowa wspólna, powierzchowna i podkolanowa są w pełni drożne, prawidłowo zapadają się pod uciskiem głowicy, brak cech DVT'. Do jakiej kategorii kwalifikuje się ten chory?",
        scenario: "Lekarz wykonujący USG Doppler podaje wynik: 'Pień VSM lewego uda wypełniony hipoechogenną skrzepliną na odcinku 14 cm. Czoło skrzepliny znajduje się w odległości 4.5 cm od ujścia odpiszczelowo-udowego (SFJ). Żyła udowa wspólna, powierzchowna i podkolanowa są w pełni drożne, prawidłowo zapadają się pod uciskiem głowicy, brak cech DVT'. Do jakiej kategorii kwalifikuje się ten chory?",
        options: [
          {
            text: "Rozległe zakrzepowe zapalenie żyły powierzchownej (długość skrzepliny >5 cm, odległość od ujścia SFJ >3 cm) bez zajęcia układu żył głębokich – wskazana farmakoterapia przeciwkrzepliwa w dawce profilaktycznej przez 45 dni wg badania CALISTO.",
            correct: true,
            feedback: "Dokładnie tak! Pacjent ma skrzeplinę o długości 14 cm (>5 cm) i odległość od SFJ 4.5 cm (>3 cm). Spełnia kryteria włączenia do protokołu leczenia przeciwkrzepliwego zapobiegającego propagacji do żył głębokich i zatorowości płucnej."
          },
          {
            text: "Zakrzepica żył głębokich wymagająca trombolizy celowanej.",
            correct: false,
            feedback: "Żyły głębokie są całkowicie wolne od skrzeplin."
          },
          {
            text: "Stan całkowicie fizjologiczny, nie wymaga żadnego leczenia.",
            correct: false,
            feedback: "Pozostawienie 14-centymetrowej skrzepliny w VSM bez leczenia doprowadzi w ciągu kilku dni do propagacji do żyły udowej wspólnej i zatoru płucnego u 10-15% chorych!"
          },
          {
            text: "Wskazanie do natychmiastowej amputacji kończyny na poziomie uda.",
            correct: false,
            feedback: "Absurdalny błąd."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Farmakoterapia przeciwkrzepliwa z wyboru – badanie CALISTO i wytyczne CHEST/ESVS",
        desc: "Jaki schemat farmakoterapii przeciwkrzepliwej jest lekiem pierwszego wyboru o najwyższym poziomie dowodów naukowych (klasa I, poziom A) w leczeniu zakrzepicy żył powierzchownych o długości >5 cm i odległości >3 cm od SFJ?",
        scenario: "Jaki schemat farmakoterapii przeciwkrzepliwej jest lekiem pierwszego wyboru o najwyższym poziomie dowodów naukowych (klasa I, poziom A) w leczeniu zakrzepicy żył powierzchownych o długości >5 cm i odległości >3 cm od SFJ?",
        options: [
          {
            text: "Fondaparynuks w dawce profilaktycznej 2.5 mg podskórnie (s.c.) raz na dobę przez 45 dni (w oparciu o przełomowe badanie CALISTO); alternatywnie rywaroksaban 10 mg doustnie raz na dobę przez 45 dni (badanie SURPRISE) lub HDCz w dawce pośredniej.",
            correct: true,
            feedback: "Perfekcyjna, nowoczesna wiedza farmakologiczna! Przełomowe badanie CALISTO (3000 pacjentów) udowodniło, że fondaparynuks 2.5 mg s.c. 1x/d przez 45 dni redukuje ryzyko zgonu, zatorowości płucnej, DVT i progresji SVT o aż 85% w porównaniu z placebo, przy znikomym ryzyku krwawień! Jest to złoty standard w wytycznych CHEST i ESVS. Alternatywą doustną jest NOAC w małej dawce (rywaroksaban 10 mg/d)."
          },
          {
            text: "Antybiotykoterapia amoksycyliną przez 3 dni i zakaz jakichkolwiek leków przeciwkrzepliwych.",
            correct: false,
            feedback: "SVT nie jest infekcją bakteryjną! Antybiotyki są całkowicie zbędne i nieskuteczne."
          },
          {
            text: "Warfaryna z celem INR 4.0-5.0 przez 5 lat.",
            correct: false,
            feedback: "Docelowe INR 4-5 grozi śmiertelnymi krwotokami, a warfaryna nie jest lekiem pierwszego wyboru w SVT."
          },
          {
            text: "Dożylny wlew z witaminy K.",
            correct: false,
            feedback: "Witamina K to antidotum na leki przeciwkrzepliwe, nasiliłaby zakrzepicę."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Postępowanie objawowe i miejscowe – kompresjoterapia i NLPZ",
        desc: "Jakie leczenie miejscowe i niefarmakologiczne ordynujesz pacjentowi w celu natychmiastowego złagodzenia bólu i odczynu zapalnego?",
        scenario: "Jakie leczenie miejscowe i niefarmakologiczne ordynujesz pacjentowi w celu natychmiastowego złagodzenia bólu i odczynu zapalnego?",
        options: [
          {
            text: "Zimne okłady miejscowe, doustne lub miejscowe niesteroidowe leki przeciwzapalne (NLPZ), maści z heparyną oraz kompresjoterapię (bandażowanie elastyczne lub pończocha o stopniowanym ucisku) i ZALECENIE NORMALNEJ AKTYWNOŚCI FIZYCZNEJ (chodzenie).",
            correct: true,
            feedback: "Znakomicie! Zimne okłady i NLPZ szybko łagodzą odczyn zapalny i dolegliwości bólowe. Kompresjoterapia wspomaga drenaż i zmniejsza bolesność. Podobnie jak w DVT, chory NIE POWINIEN leżeć w łóżku – chodzenie uruchamia pompę mięśniową i zmniejsza zastój żylny."
          },
          {
            text: "Gorące kąpiele w wannie i okłady rozgrzewające.",
            correct: false,
            feedback: "Gorące okłady nasilają rozszerzenie naczyń, ból, stan zapalny i ryzyko oderwania skrzepliny!"
          },
          {
            text: "Ścisłe unieruchomienie w łóżku przez 3 tygodnie.",
            correct: false,
            feedback: "Unieruchomienie zwiększa ryzyko progresji zakrzepicy do żył głębokich."
          },
          {
            text: "Nacinanie skóry żyletką nad żylakiem w celu upuszczenia krwi.",
            correct: false,
            feedback: "Niedopuszczalne barbarzyństwo medyczne!"
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Sytuacja szczególna – skrzeplina dochodząca na <3 cm do ujścia odpiszczelowo-udowego (SFJ)",
        desc: "Wyobraź sobie, że w kontrolnym badaniu USG po 7 dniach stwierdzono progresję skrzepliny, która zbliżyła się na odległość 1.5 cm od ujścia do żyły udowej wspólnej (SFJ). Jakie postępowanie terapeutyczne jest wówczas bezwzględnie wymagane?",
        scenario: "Wyobraź sobie, że w kontrolnym badaniu USG po 7 dniach stwierdzono progresję skrzepliny, która zbliżyła się na odległość 1.5 cm od ujścia do żyły udowej wspólnej (SFJ). Jakie postępowanie terapeutyczne jest wówczas bezwzględnie wymagane?",
        options: [
          {
            text: "Wdrożenie PEŁNEJ TERAPEUTYCZNEJ dawki leku przeciwkrzepliwego (np. terapeutyczna dawka NOAC jak w DVT lub pełna dawka HDCz 1 mg/kg m.c. 2x/d) LUB pilne chirurgiczne podwiązanie żyły odpiszczelowej przy jej ujściu do żyły udowej (krosektomia) w znieczuleniu miejscowym/ogólnym, aby mechanicznie zablokować wpadnięcie skrzepliny do żyły udowej.",
            correct: true,
            feedback: "Wybitnie! Skrzeplina w odległości <3 cm od SFJ (lub wpadająca do żyły udowej) jest stanem bezpośredniego zagrożenia zatorowością płucną (ang. juxtafemoral thrombosis). W tej sytuacji dawki profilaktyczne są za małe – konieczna jest pełna dawka terapeutyczna antykoagulacji przez min. 3 miesiące lub natychmiastowe chirurgiczne odcięcie i podwiązanie ujścia VSM (krosektomia) na poziomie pachwiny."
          },
          {
            text: "Zmniejszenie dawki leków o połowę i zalecenie leżenia.",
            correct: false,
            feedback: "Śmiertelny błąd! Zmniejszenie dawki doprowadzi do pełnego zatoru tętnicy płucnej."
          },
          {
            text: "Podanie wyłącznie syropu przeciwkaszlowego.",
            correct: false,
            feedback: "Niedorzeczne."
          },
          {
            text: "Pozostawienie bez zmian, ponieważ 1.5 cm to bezpieczna odległość.",
            correct: false,
            feedback: "Błąd! 1.5 cm to strefa krytyczna bezpośredniego przejścia skrzepliny do żyły udowej wspólnej!"
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Diagnostyka przyczynowa nawracającej zakrzepicy żył powierzchownych – Zespół Trousseau",
        desc: "Dyżurny internista pyta Cię: gdyby pacjent nie miał żylaków, a zakrzepowe zapalenie żył powierzchownych miało charakter wędrujący (thrombophlebitis migrans – pojawiało się w różnych, nietypowych miejscach ciała, np. na ramionach i klatce piersiowej), jaki groźny zespół paraneoplastyczny należałoby bezwzględnie podejrzewać?",
        scenario: "Dyżurny internista pyta Cię: gdyby pacjent nie miał żylaków, a zakrzepowe zapalenie żył powierzchownych miało charakter wędrujący (thrombophlebitis migrans – pojawiało się w różnych, nietypowych miejscach ciała, np. na ramionach i klatce piersiowej), jaki groźny zespół paraneoplastyczny należałoby bezwzględnie podejrzewać?",
        options: [
          {
            text: "Zespół Trousseau (thrombophlebitis migrans) – paraneoplastyczny stan nadkrzepliwości zwiastujący obecność zaawansowanego nowotworu złośliwego narządów jamy brzusznej (przede wszystkim raka trzustki, żołądka, płuc lub jelita grubego); wymaga pilnej, pogłębionej diagnostyki onkologicznej (TK klatki, brzucha i miednicy, endoskopia).",
            correct: true,
            feedback: "Genialnie! Zespół Trousseau (opisany przez francuskiego lekarza Armanda Trousseau, który sam u siebie zdiagnozował ten objaw w przebiegu raka żołądka): wędrujące zakrzepowe zapalenie żył powierzchownych pojawiające się w zdrowych żyłach kończyn górnych i tułowia. Wytwarzana przez komórki nowotworowe mucyna i czynnik tkankowy (TF) indukują uogólnioną aktywację kaskady krzepnięcia. To jeden z klasycznych 'hitów' egzaminacyjnych LEK!"
          },
          {
            text: "Zespół Hornera, wywołany guzem szczytu płuca.",
            correct: false,
            feedback: "Zespół Hornera to opadnięcie powieki (ptosis), zwężenie źrenicy (miosis) i zapadnięcie gałki ocznej (enophthalmus) w wyniku uszkodzenia pnia współczulnego, a nie wędrujące zapalenie żył."
          },
          {
            text: "Zespół Turnera (kariotyp 45,X0).",
            correct: false,
            feedback: "To aberracja chromosomowa u kobiet, niemająca związku z zespołem paraneoplastycznym."
          },
          {
            text: "Zespół cushingoidalny od sterydów.",
            correct: false,
            feedback: "Błędne skojarzenie."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Planowanie leczenia definitywnego przewlekłej niewydolności żylnej",
        desc: "Po 45 dniach leczenia fondaparynuksem skrzeplina w VSM uległa pełnej rekanalizacji i włóknieniu, dolegliwości ustąpiły. Pacjent ma jednak zaawansowaną niewydolność żylną z niewydolnością ujścia odpiszczelowo-udowego (SFJ). Co proponujesz jako definitywne leczenie przyczynowe w celu zapobieżenia nawrotom?",
        scenario: "Po 45 dniach leczenia fondaparynuksem skrzeplina w VSM uległa pełnej rekanalizacji i włóknieniu, dolegliwości ustąpiły. Pacjent ma jednak zaawansowaną niewydolność żylną z niewydolnością ujścia odpiszczelowo-udowego (SFJ). Co proponujesz jako definitywne leczenie przyczynowe w celu zapobieżenia nawrotom?",
        options: [
          {
            text: "Planowe leczenie operacyjne lub endowaskularne żylaków (np. wewnątrznaczyniowa ablacja laserowa EVLA / radiofrekwencyjna RFA lub klasyczny stripping żyły odpiszczelowej ze safenektomią i flebektomią) po ustąpieniu ostrej fazy zapalnej, co usuwa refluks żylny i trwale zapobiega kolejnym epizodom zakrzepicy powierzchownej.",
            correct: true,
            feedback: "Znakomicie! Usunięcie lub ablacja niewydolnego pnia VSM (EVLA/RFA/stripping) po wygaszeniu stanu ostrego eliminuje przyczynę zastoju żylnego i chroni przed nawrotami zakrzepicy powierzchownej oraz rozwojem owrzodzeń żylnych goleni."
          },
          {
            text: "Zakaz jakichkolwiek zabiegów na żylakach do końca życia.",
            correct: false,
            feedback: "Pozostawienie niewydolnej VSM skazuje chorego na nawracające zakrzepice i owrzodzenia."
          },
          {
            text: "Przewlekłe przyjmowanie antybiotyków przez 10 lat.",
            correct: false,
            feedback: "Żylaki to problem biomechaniczny zastawek żylnych, a nie bakteryjny."
          },
          {
            text: "Konieczność amputacji stopy.",
            correct: false,
            feedback: "Niedorzeczne."
          }
        ]
      }
    ];
  });

  console.log("Cases 141-145 upgrade completed successfully!");
}

run().catch(err => {
  console.error("Error upgrading cases 141-145:", err);
  process.exit(1);
});

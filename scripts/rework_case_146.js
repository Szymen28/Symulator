const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const case146 = {
  id: 146,
  dept: "Chirurgia naczyniowa",
  title: "Zespół usidlenia tętnicy podkolanowej (Popliteal Artery Entrapment Syndrome – PAES)",
  shortTitle: "24-letni Jakub – Bolesne kurcze łydki u młodego biegacza podczas treningu bez czynników ryzyka miażdżycy (Zespół usidlenia tętnicy podkolanowej / PAES)",
  diagnosisTitle: "Zespół usidlenia tętnicy podkolanowej prawej (PAES typ II) – ucisk przez nieprawidłową głowę przyśrodkową m. brzuchatego łydki, test prowokacyjny, Angio-MRI, miotomia odbarczająca",
  vitals: [
    { name: "Częstość akcji serca", val: "64/min", status: "vital-ok" },
    { name: "Ciśnienie tętnicze", val: "120/75 mmHg", status: "vital-ok" },
    { name: "Temperatura ciała", val: "36.6 °C", status: "vital-ok" },
    { name: "Saturacja SpO2", val: "99%", status: "vital-ok" }
  ],
  vitalsObj: {
    hr: 64,
    bp: "120/75",
    spo2: 99,
    rr: 14,
    temp: 36.6,
    gcs: 15
  },
  story: "<p><strong>Pacjent:</strong> 24-letni mężczyzna, student akademii wychowania fizycznego i wyczynowy biegacz średniodystansowy, zgłosił się do poradni naczyniowej z powodu nawracającego od 6 miesięcy, dotkliwego, kurczowego bólu prawej łydki, który pojawia się wyłącznie podczas intensywnego biegu lub marszu pod górę po pokonaniu ok. 200-300 metrów i natychmiast zmusza go do zatrzymania się.</p><p><strong>Wywiad chorobowy:</strong> Po zaprzestaniu biegu ból łydki całkowicie ustępuje w ciągu 2-3 minut spoczynku (klasyczny obraz chromania przestankowego). W ostatnich tygodniach pacjent zauważył, że podczas napadu bólu prawa stopa staje się blada i drętwieje. Pacjent jest szczupły, wysportowany, nigdy nie palił tytoniu, nie choruje na cukrzycę ani nadciśnienie, w rodzinie brak chorób sercowo-naczyniowych. Był wcześniej wielokrotnie diagnozowany przez fizjoterapeutów z podejrzeniem 'przeciążenia mięśni' lub 'zapalenia ścięgna Achillesa', jednak fizjoterapia i leki przeciwzapalne nie przyniosły żadnej poprawy.</p><p><strong>Badanie przedmiotowe na SOR:</strong> W spoczynku pacjent bez żadnych dolegliwości. W badaniu naczyniowym w pozycji leżącej: tętno na tętnicy udowej, podkolanowej, grzbietowej stopy i piszczelowej tylnej prawej jest całkowicie prawidłowe, symetryczne z kończyną lewą; wskaźnik kostka-ramię w spoczynku (ABI) wynosi 1,05. W trakcie badania wykonano test prowokacyjny: podczas czynnego zgięcia podeszwowego prawej stopy z oporem (silne napięcie mięśnia brzuchatego łydki) lub maksymalnego biernego zgięcia grzbietowego stopy przy wyprostowanym kolanie tętno na tętnicy grzbietowej stopy i piszczelowej tylnej prawej całkowicie zanika! Po powrocie stopy do pozycji neutralnej tętno natychmiast powraca. Badanie neurologiczne i układ kostno-stawowy bez odchyleń.</p>",
  labs: [
    {
      name: "Morfologia krwi i hemostaza",
      items: [
        { name: "Hemoglobina (Hb)", val: "15.4 g/dl", norm: "13.5 - 17.5 g/dl", flag: "NORMAL" },
        { name: "Hematokryt (Hct)", val: "45.0 %", norm: "40.0 - 52.0 %", flag: "NORMAL" },
        { name: "Leukocyty (WBC)", val: "6.2 G/l", norm: "4.0 - 10.0 G/l", flag: "NORMAL" },
        { name: "Płytki krwi (PLT)", val: "230 G/l", norm: "150 - 400 G/l", flag: "NORMAL" },
        { name: "INR", val: "1.00", norm: "0.8 - 1.2", flag: "NORMAL" },
        { name: "APTT", val: "28 s", norm: "26 - 36 s", flag: "NORMAL" }
      ]
    },
    {
      name: "Biochemia i profil metaboliczny",
      items: [
        { name: "Cholesterol całkowity", val: "165 mg/dl", norm: "< 190 mg/dl", flag: "NORMAL" },
        { name: "Cholesterol LDL", val: "88 mg/dl", norm: "< 115 mg/dl (niskie ryzyko)", flag: "NORMAL" },
        { name: "Trójglicerydy", val: "90 mg/dl", norm: "< 150 mg/dl", flag: "NORMAL" },
        { name: "Glukoza na czczo", val: "84 mg/dl", norm: "70 - 99 mg/dl", flag: "NORMAL" },
        { name: "Kreatynina", val: "0.90 mg/dl", norm: "0.7 - 1.2 mg/dl", flag: "NORMAL" },
        { name: "Kinaza fosfokreatynowa (CPK)", val: "135 IU/l", norm: "38 - 174 IU/l", flag: "NORMAL" },
        { name: "CRP", val: "0.8 mg/l", norm: "< 5.0 mg/l", flag: "NORMAL" }
      ]
    }
  ],
  steps: [
    {
      title: "Krok 1: Wstępna ocena kliniczna i wywiad",
      text: "Lekarz ocenia 24-letniego sportowca z typowym chromaniem przestankowym łydki, u którego wykluczono czynniki ryzyka miażdżycy. Jakie jednostki chorobowe należy w pierwszej kolejności podejrzewać u młodego człowieka (<30 lat) z chromaniem przestankowym kończyny dolnej?",
      options: [
        "Zespół usidlenia tętnicy podkolanowej (PAES), torbielowate zwyrodnienie przydanki tętnicy podkolanowej (CAD), przewlekły zespół ciasnoty przedziałów powięziowych (CECS) oraz chorobę Buergera",
        "Uogólnioną miażdżycę zarostową aorty i tętnic biodrowych",
        "Neuropatię w przebiegu ciężkiej cukrzycy typu 2",
        "Zesztywniające zapalenie stawów kręgosłupa (ZZSK)"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Wystąpienie chromania przestankowego u osoby młodej (<30-40 lat), aktywnej fizycznie, bez czynników ryzyka sercowo-naczyniowego (brak palenia, cukrzycy, dyslipidemii) jest rzadkością i wymaga natychmiastowego poszukiwania przyczyn naczyniowych nienaczynioruchowych/niemżdżycowych:</strong><br>1. <strong>Zespół usidlenia tętnicy podkolanowej (PAES – Popliteal Artery Entrapment Syndrome):</strong> anatomiczny lub czynnościowy ucisk tętnicy przez mięśnie dołu podkolanowego.<br>2. <strong>Cystic Adventitial Disease (CAD):</strong> torbielowate zwyrodnienie przydanki tętnicy podkolanowej z uciskiem światła przez galaretowatą torbiel.<br>3. <strong>Chronic Exertional Compartment Syndrome (CECS):</strong> wysiłkowy zespół ciasnoty powięziowej.<br>4. <strong>Choroba Buergera (Thromboangiitis obliterans):</strong> u młodych nałogowych palaczy tytoniu.",
        "❌ BŁĄD! <strong>Miażdżyca w wieku 24 lat bez hipercholesterolemii rodzinnej jest skrajnie nieprawdopodobna.</strong>",
        "❌ BŁĄD! <strong>Glikemia pacjenta wynosi 84 mg/dl, brak cukrzycy.</strong>",
        "❌ BŁĄD! <strong>ZZSK dotyczy stawów krzyżowo-biodrowych i kręgosłupa, nie daje zaniku tętna na stopie.</strong>"
      ]
    },
    {
      title: "Krok 2: Badanie przedmiotowe i testy prowokacyjne w PAES",
      text: "W spoczynku tętno na stopach jest w pełni symetryczne i prawidłowe. Jaki test prowokacyjny w badaniu fizykalnym lub USG Doppler pozwala na wstępne potwierdzenie usidlenia tętnicy podkolanowej?",
      options: [
        "Badanie tętna na tętnicy grzbietowej stopy i piszczelowej tylnej podczas czynnego zgięcia podeszwowego stopy z oporem lub maksymalnego biernego zgięcia grzbietowego przy wyprostowanym kolanie – dochodzi wówczas do całkowitego zaniku lub znacznego osłabienia tętna i przepływu krwi!",
        "Próba Romberga z zamkniętymi oczami",
        "Test prowokacji zimnem z zanurzeniem rąk w lodzie",
        "Próba pionizacyjna na stole uchylnym (tilt test)"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Cechą charakterystyczną zespołu usidlenia tętnicy podkolanowej (PAES) jest całkowity brak objawów i prawidłowe tętno w spoczynku!</strong> Dopiero skurcz lub napięcie mięśni łydki wywołuje mechaniczny ucisk naczynia. W teście prowokacyjnym prosi się pacjenta o <strong>silne czynne zgięcie podeszwowe stopy (plantar flexion) przeciw oporowi badającego</strong> (co powoduje skurcz i zgrubienie głowy przyśrodkowej mięśnia brzuchatego łydki) lub <strong>maksymalne bierne zgięcie grzbietowe stopy (dorsiflexion) przy wyprostowanym kolanie</strong> (co rozciąga ścięgno mięśnia nad tętnicą). Dochodzi wówczas do <strong>zaciśnięcia tętnicy podkolanowej, zaniku tętna na stopie oraz zaniku sygnału dopplerowskiego</strong>.",
        "❌ BŁĄD! <strong>Próba Romberga bada zmysł równowagi i sznury tylne rdzenia.</strong>",
        "❌ BŁĄD! <strong>Próba zimna to diagnostyka objawu Raynauda.</strong>",
        "❌ BŁĄD! <strong>Tilt test ocenia omdlenia wazowagale.</strong>"
      ]
    },
    {
      title: "Krok 3: Patogeneza i klasyfikacja anatomiczna PAES",
      text: "Usidlenie tętnicy podkolanowej wynika z wrodzonej anomalii embriologicznej rozwoju dołu podkolanowego. Jaka struktura anatomiczna najczęściej odpowiada za mechaniczny ucisk tętnicy podkolanowej w klasyfikacji Love i Whelana / Richa?",
      options: [
        "Głowa przyśrodkowa mięśnia brzuchatego łydki (medial head of gastrocnemius muscle) – jej nieprawidłowy, boczny przyczep ścięgnisty do kości udowej lub ektopowy przebieg tętnicy podkolanowej przyśrodkowo od prawidłowego przyczepu mięśnia",
        "Ścięgno mięśnia czworogłowego uda u podstawy rzepki",
        "Więzadło krzyżowe przednie (ACL) wewnątrz stawu kolanowego",
        "Nerw kulszowy w otworze kulszowym większym"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Embriogeneza dołu podkolanowego jest złożona: tętnica podkolanowa rozwija się równolegle z migracją głów mięśnia brzuchatego łydki.</strong> W klasyfikacji Love-Whelana wyróżnia się typy:<br>- <strong>Typ I:</strong> prawidłowy przyczep głowy przyśrodkowej m. brzuchatego (MHG), ale tętnica podkolanowa zbacza przyśrodkowo, owijając się wokół ścięgna mięśnia.<br>- <strong>Typ II:</strong> głowa przyśrodkowa m. brzuchatego przyczepia się bardziej bocznie na kłykciu kości udowej, uciskając biegnącą prawidłowo tętnicę.<br>- <strong>Typ III:</strong> dodatkowe pasmo mięśniowe z MHG obejmuje tętnicę podkolanową.<br>- <strong>Typ IV:</strong> tętnica podkolanowa przebiega głęboko, uwięziona pod mięśniem podkolanowym (m. popliteus).<br>- <strong>Typ V:</strong> jednoczesne uwięźnienie tętnicy ORAZ żyły podkolanowej.<br>- <strong>Typ VI:</strong> uwięźnienie czynnościowe (przerośnięte, hipertroficzne mięśnie u sportowców bez wady anatomicznej).",
        "❌ BŁĄD! <strong>Ścięgno czworogłowego leży na przedniej powierzchni uda i rzepki, nie w dole podkolanowym.</strong>",
        "❌ BŁĄD! <strong>ACL leży wewnątrz stawu kolanowego.</strong>",
        "❌ BŁĄD! <strong>Nerw kulszowy nie uciska tętnicy w dole podkolanowym.</strong>"
      ]
    },
    {
      title: "Krok 4: Diagnostyka obrazowa z wyboru – Angio-MRI z próbami czynnościowymi",
      text: "Lekarz planuje definitywne badanie obrazowe celem uwidocznienia relacji anatomicznych mięśni i naczynia. Jakie badanie jest złotym standardem diagnostyki PAES?",
      options: [
        "Rezonans magnetyczny z angiografią (Angio-MRI) dołu podkolanowego w spoczynku oraz z prowokacyjnym zgięciem stopy – pozwala na jednoczesną, precyzyjną ocenę relacji tkanek miękkich (mięśni, ścięgien) do światła tętnicy podkolanowej",
        "Przeglądowe zdjęcie rentgenowskie stawu kolanowego",
        "Scyntygrafia kości z technetem",
        "Kolonoskopia diagnostyczna z biopsją śluzówki"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Angio-MRI (rezonans magnetyczny naczyniowy) jest badaniem z wyboru w diagnostyce zespołu usidlenia tętnicy podkolanowej!</strong> W przeciwieństwie do tradycyjnej angiografii (która pokazuje wyłącznie światło naczynia, a nie to, co je uciska), MRI doskonale obrazuje tkanki miękkie: nieprawidłowe przyczepy ścięgien, ektopowe pasma mięśniowe, anomalny przebieg naczynia oraz pozwala na ocenę czynnościową (badanie w pozycji neutralnej i w zgięciu stopy). Równie wysoką wartość ma dynamiczna wielorzędowa tomografia komputerowa (Angio-TK).",
        "❌ BŁĄD! <strong>Zwykłe RTG pokazuje kości, nie uwidacznia mięśni ani tętnic.</strong>",
        "❌ BŁĄD! <strong>Scyntygrafia ocenia metabolizm tkanki kostnej.</strong>",
        "❌ BŁĄD! <strong>Kolonoskopia nie ma żadnego związku z dołem podkolanowym.</strong>"
      ]
    },
    {
      title: "Krok 5: Powikłania naczyniowe nieleczonego zespołu usidlenia",
      text: "Dlaczego PAES wymaga leczenia zabiegowego, nawet jeśli pacjent odczuwa ból tylko przy ciężkim wysiłku sportowym? Jakie niebezpieczne powikłania naczyniowe rozwijają się w wyniku przewlekłego ucisku tętnicy podkolanowej?",
      options: [
        "Przewlekły mechaniczny mikrouraz ściany naczynia prowadzi do zwłóknienia, uszkodzenia przydanki i błony wewnętrznej, powstawania tętniaka pozawężeniowego (post-stenotic aneurysm), zakrzepicy przyściennej oraz grozi nagłym ostrym zatorowym niedokrwieniem stopy (ALI) i amputacją!",
        "Nie ma żadnych powikłań; choroba samoistnie ustępuje po 30. roku życia",
        "Prowadzi do ostrego zapalenia trzustki",
        "Wywołuje samoistne pęknięcie kości piszczelowej"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>PAES jest chorobą postępującą!</strong> Każdy krok i skurcz mięśnia uderza w tętnicę, powodując mikrourazy mechaniczne. Z biegiem lat prowadzi to do: <strong>zwłóknienia i trwałego zwężenia tętnicy, pęknięć blaszki wewnętrznej, formowania tętniaka za miejscem zwężenia (post-stenotic aneurysm)</strong> wskutek zjawisk hemodynamicznych (turbulencje przepływu). W tętniaku formują się skrzepliny, które mogą nagle odciąć przepływ lub urwać się, wywołując <strong>ostre niedokrwienie kończyny dolnej (ALI) z zatorowością tętnic stopy</strong>, co u 10-15% późno zdiagnozowanych młodych pacjentów kończy się amputacją!",
        "❌ BŁĄD! <strong>PAES nie ustępuje samoistnie –</strong> anomalia anatomiczna jest wrodzona i trwała.",
        "❌ BŁĄD! <strong>Nie ma powikłań trzustkowych.</strong>",
        "❌ BŁĄD! <strong>Kość piszczelowa pozostaje nienaruszona.</strong>"
      ]
    },
    {
      title: "Krok 6: Zabieg chirurgiczny z wyboru w PAES",
      text: "U 24-latka rozpoznano anatomiczny zespół usidlenia typu II (ucisk przez ektopowy przyczep głowy przyśrodkowej m. brzuchatego) bez trwałego uszkodzenia ściany tętnicy w spoczynku. Jaka operacja jest leczeniem z wyboru?",
      options: [
        "Chirurgiczne odbarczenie anatomiczne – miotomia (przecięcie) ektopowego ścięgna/mięśnia głowy przyśrodkowej mięśnia brzuchatego łydki (z dostępu tylnego w dole podkolanowym w kształcie litery S lub dostępu przyśrodkowego)",
        "Amputacja kończyny na poziomie uda",
        "Wycięcie całej kości udowej",
        "Podanie leków przeciwcukrzycowych i okładów z borowiny"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Leczeniem z wyboru w anatomicznych postaciach PAES (typy I-IV) jest operacja chirurgicznego odbarczenia (surgical decompression / myotomy):</strong><br>Zabieg polega na odsłonięciu dołu podkolanowego (najczęściej z dostępu tylnego esowatego w ułożeniu na brzuchu lub dostępu przyśrodkowego), identyfikacji naczynia oraz <strong>przecięciu ektopowego brzuśca lub ścięgna głowy przyśrodkowej mięśnia brzuchatego łydki (myotomia / tenotomia)</strong> uciskającego tętnicę podkolanową. Przywraca to swobodny, nienaruszony przebieg naczynia. Jeśli ściana tętnicy nie uległa trwałemu zbliznowaceniu, odbarczenie jest w pełni wystarczające i zapewnia 100% wyleczenie!",
        "❌ BŁĄD! <strong>Amputacja u młodego chorego z odwracalnym uciskiem to błąd w sztuce!</strong>",
        "❌ BŁĄD! <strong>Kość udowa jest nienaruszona.</strong>",
        "❌ BŁĄD! <strong>Leczenie zachowawcze nie likwiduje mechanicznej przeszkody anatomicznej.</strong>"
      ]
    },
    {
      title: "Krok 7: Dlaczego stentowanie wewnątrznaczyniowe jest kardynalnym błędem w PAES?",
      text: "Młody chirurg sugeruje: 'Może zamiast operacji otwartej po prostu wstawmy stent samorozprężalny do tętnicy podkolanowej?'. Dlaczego angioplastyka i stentowanie (CAS/PTA) są BEZWZGLĘDNIE PRZECIWWSKAZANE w zespole usidlenia tętnicy podkolanowej?",
      options: [
        "Stentowanie nie eliminuje przyczyny zewnętrznego ucisku mięśniowego; potężne siły mechaniczne pracującego mięśnia brzuchatego łydki doprowadzają do natychmiastowego zgniecenia, złamania stentu (stent fracture) i piorunującej zakrzepicy tętnicy podkolanowej!",
        "Stenty są zakazane u osób poniżej 50. roku życia z powodów prawnych",
        "Wprowadzenie stentu powoduje natychmiastowe wypadanie włosów",
        "W tętnicy podkolanowej krew płynie zbyt szybko, aby stent mógł się utrzymać"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>To kardynalna pułapka chirurgii naczyniowej, często sprawdzana na egzaminach specjalizacyjnych i LEK!</strong> Stentowanie w PAES jest <strong>bezwzględnie przeciwwskazane</strong>! Stent metalowy wprowadzony w miejsce zewnętrznego ucisku biomechanicznego podlega potężnym siłom ścinającym i zgniatającym generowanym przez kurczący się mięsień łydki. Skutkuje to <strong>złamaniem konstrukcji stentu (stent fracture), perforacją ściany naczynia, odczynem hiperplazji neointimy i ostrą zakrzepicą zatorową</strong> w ciągu kilku tygodni! Jedyną prawidłową metodą jest usunięcie przyczyny zewnętrznej (miotomia). Stentowanie bez odbarczenia mięśniowego to błąd sztuki lekarskiej.",
        "❌ BŁĄD! <strong>Stenty można stosować u młodych chorych w innych wskazaniach (np. urazy naczyniowe), ale nie w ucisku mechanicznym z zewnątrz!</strong>",
        "❌ BŁĄD! <strong>Nie ma powikłań dermatologicznych.</strong>",
        "❌ BŁĄD! <strong>Prędkość przepływu nie jest przeszkodą dla stentowania w innych chorobach.</strong>"
      ]
    },
    {
      title: "Krok 8: Postępowanie w zaawansowanym uszkodzeniu ściany naczynia i rokowanie",
      text: "Gdyby u pacjenta doszło już do zbliznowacenia ściany tętnicy lub wytworzenia tętniaka pozawężeniowego ze skrzepliną, jakie postępowanie chirurgiczne należy połączyć z miotomią odbarczającą?",
      options: [
        "Resekcję uszkodzonego odcinka tętnicy podkolanowej i rekonstrukcję naczyniową za pomocą wstawki z autologicznej odwróconej żyły odpiszczelowej (vein graft interposition)",
        "Wszczepienie sztucznej zastawki aortalnej do dołu podkolanowego",
        "Całkowite usunięcie układu żylnego kończyny dolnej",
        "Podwiązanie tętnicy podkolanowej bez odtwarzania ciągłości naczyniowej"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Jeśli w wyniku wieloletniego ucisku doszło do nieodwracalnego zwłóknienia ściany, tętniaka lub okluzji tętnicy podkolanowej, samo odbarczenie mięśniowe nie przywróci prawidłowej perfuzji.</strong> W takich przypadkach wykonuje się: <strong>odbarczenie mięśniowe (miotomię) połączone z resekcją zmienionego odcinka tętnicy podkolanowej i wszczepieniem wstawki z własnej żyły odpiszczelowej (interpozycja żyły odpiszczelowej koniec-do-końca lub krótki bypass żylny)</strong>. Po zabiegu pacjenci odzyskują pełną wydolność fizyczną i mogą powrócić do sportu wyczynowego.",
        "❌ BŁĄD! <strong>Zastawka sercowa nie ma zastosowania w tętnicy podkolanowej.</strong>",
        "❌ BŁĄD! <strong>Układ żylny jest zdrowy i niezbędny do drenażu kończyny.</strong>",
        "❌ BŁĄD! <strong>Podwiązanie tętnicy bez rekonstrukcji wywołałoby krytyczne niedokrwienie kończyny.</strong>"
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Anomalia embriologiczna",
      title: "Ektopowy przyczep głowy przyśrodkowej brzuchatego",
      short: "Wrodzone uwięźnienie naczynia w dole podkolanowym",
      detail: "Zaburzenie migracji zawiązków mięśniowych w 8.-10. tygodniu życia płodowego skutkuje przyczepem głowy przyśrodkowej mięśnia brzuchatego łydki bocznie od tętnicy podkolanowej lub anomalnym przebiegiem naczynia.",
      target: "Dół podkolanowy (fossa poplitea)",
      drugTarget: "<span class='dose-pill'>Miotomia chirurgiczna</span> przecięcie ektopowego przyczepu mięśnia"
    },
    {
      badge: "Dynamiczny ucisk",
      title: "Zaciśnięcie światła podczas zgięcia stopy",
      short: "Skurcz m. brzuchatego łydki odcinający perfuzję obwodową",
      detail: "W spoczynku tętnica zachowuje drożność. Podczas biegu napięcie mięśnia dociska naczynie do kłykcia kości udowej, powodując przejściowe całkowite zamknięcie światła i ból niedokrwienny łydki.",
      target: "Tętnica podkolanowa (arteria poplitea)",
      drugTarget: "<span class='dose-pill'>Test prowokacyjny zgięcia stopy</span> kliniczna ocena zaniku tętna"
    },
    {
      badge: "Mikrouraz mechaniczny",
      title: "Zwłóknienie ściany i tętniak pozawężeniowy",
      short: "Uszkodzenie elastyny i powstawanie tętniaka ze skrzepliną",
      detail: "Powtarzające się tysiące razy uderzenia ścięgna w ścianę naczynia niszczą włókna sprężyste. Poniżej stenozy turbulencje generują tętniaka rzekomego ze skrzeplinami przyściennymi.",
      target: "Ściana tętnicy podkolanowej dystalnie od ucisku",
      drugTarget: "<span class='dose-pill'>Rekonstrukcja wstawką żylną GSV</span> w razie tętniaka"
    },
    {
      badge: "Zagrożenie zatorowe",
      title: "Ostre niedokrwienie stopy (ALI) u sportowca",
      short: "Embolizacja obwodowa z tętniaka podkolanowego",
      detail: "Skrzepliny z tętniaka pozawężeniowego urywają się i zatykają tętnicę piszczelową przednią i tylną, prowadząc do ostrego zatorowego niedokrwienia stopy z ryzykiem amputacji.",
      target: "Tętnice podudzia i stopy",
      drugTarget: "<span class='dose-pill'>Wczesne rozpoznanie w Angio-MRI</span> ochrona przed utratą kończyny"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: PAES vs Miażdżyca zarostowa (PAD) vs Zespół ciasnoty powięziowej wysiłkowej (CECS) vs Ucisk torbielowaty przydanki (CAD)",
    headers: ["Cecha kliniczna", "Zespół usidlenia (PAES)", "Miażdżyca tętnic (PAD)", "Przewlekła ciasnota powięziowa (CECS)", "Torbielowate zwyrodnienie przydanki (CAD)", "Tendinopatia ścięgna Achillesa"],
    rows: [
      ["Wiek pacjenta i populacja", "Młody wiek (<30 lat), sportowcy, biegacze; brak czynników ryzyka miażdżycy", "Podeszły wiek (>60 lat), palacze tytoniu, cukrzycy, nadciśnienie, hiperlipidemia", "Młodzi sportowcy, biegacze długodystansowi, rekruci wojskowi", "Mężczyźni w średnim wieku (30-50 lat), brak czynników ryzyka miażdżycy", "Sportowcy w każdym wieku, biegacze; brak związku z układem naczyniowym"],
      ["Tętno na stopie w spoczynku", "Prawidłowe i w pełni wyczuwalne na obu stopach w spoczynku", "Brak tętna lub znacznie osłabione w spoczynku; ABI <0,9", "Prawidłowe i symetryczne w spoczynku i podczas wysiłku", "Może być prawidłowe w spoczynku lub osłabione przy dużej torbieli", "Całkowicie prawidłowe i symetryczne"],
      ["Testy prowokacyjne (zgięcie stopy)", "Całkowity zanik tętna na stopie podczas zgięcia podeszwowego z oporem lub zgięcia grzbietowego!", "Brak zmian tętna podczas manewrów stopy; tętno stale osłabione", "Tętno tętnicze zachowane podczas manewrów; twardość komór powięziowych", "Możliwy objaw Ishikawy (zanik tętna przy zgięciu kolana pod kątem ostrym)", "Brak wpływu na tętno tętnicze; ból przy rozciąganiu ścięgna"],
      ["Złoty standard diagnostyczny", "Angio-MRI z próbami czynnościowymi (obrazuje ucisk mięśniowy na naczynie)", "USG Duplex Doppler, Angio-TK (blaszki miażdżycowe, zwapnienia tętnic)", "Inwazyjny pomiar ciśnienia wewnątrzpowięziowego igłą przed i po biegu (>30 mmHg)", "Angio-MRI / USG (charakterystyczne torbiele śródścienne w przydance ICA/PA)", "USG ścięgna Achillesa (pogrubienie, hipoechogeniczność, neowaskularyzacja)"],
      ["Charakterystyka bólu", "Ból kurczowy łydki i drętwienie stopy po określonym dystansie biegu; mija po 2-3 min", "Klasyczne chromanie przestankowe po marszu; z czasem ból spoczynkowy", "Rozpierający ból, twardość powłok goleni, parestezje grzbietu stopy podczas biegu", "Chromanie przestankowe o zmiennym natężeniu, czasem gwałtowny początek", "Miejscowy ból palpacyjny ścięgna 2-6 cm powyżej pięty, sztywność poranna"],
      ["Leczenie z wyboru", "Chirurgiczne odbarczenie (miotomia głowy przyśrodkowej m. brzuchatego łydki)", "Rewaskularyzacja (PTA/stent, bypass) + statyny + leczenie przeciwpłytkowe", "Fasciotomia odbarczająca przedziałów powięziowych goleni", "Wyłuszczenie torbieli przydanki z zachowaniem tętnicy lub resekcja ze wstawką żylną", "Rehabilitacja, ćwiczenia ekscentryczne, ortezy; brak leczenia operacyjnego"]
    ]
  },
  dutySummary: {
    overview: "Zespół usidlenia tętnicy podkolanowej (PAES – Popliteal Artery Entrapment Syndrome) jest rzadką, wrodzoną anomalią anatomiczną polegającą na ucisku tętnicy podkolanowej przez nieprawidłowo przebiegające pasma mięśniowe lub ścięgniste (najczęściej głowę przyśrodkową mięśnia brzuchatego łydki). Dotyczy typowo młodych, sprawnych fizycznie osób bez czynników ryzyka miażdżycy. Wczesne rozpoznanie i odbarczenie chirurgiczne zapobiegają tętniakowi pozawężeniowemu i zatorowości obwodowej.",
    diagnostics: "1. Ocena kliniczna: chromanie przestankowe u młodej osoby (<30 lat), sportowca bez wywiadu miażdżycowego.<br>2. Testy prowokacyjne w badaniu fizykalnym: zanik tętna na tętnicy grzbietowej stopy podczas czynnego zgięcia podeszwowego stopy z oporem lub biernego maksymalnego zgięcia grzbietowego.<br>3. USG Duplex Doppler z próbami czynnościowymi: wykazanie zatrzymania przepływu krwi w tętnicy podkolanowej podczas prowokacji ruchowej.<br>4. Angio-MRI dołu podkolanowego (złoty standard): uwidocznienie anomalii anatomicznych tkanek miękkich (ektopowe przyczepy, dodatkowe pasma mięśniowe) oraz ocena drożności naczynia.<br>5. Cyfrowa angiografia subtrakcyjna (DSA): wykazuje przyśrodkowe odchylenie tętnicy podkolanowej lub zaciśnięcie światła naczynia podczas manewrów prowokacyjnych.",
    drugsAndDoses: "1. Leki przeciwpłytkowe w okresie diagnostyki i przygotowania do operacji:<br>   - <span class='dose-pill'>Kwas acetylosalicylowy 75-100 mg raz/dobę p.o.</span> w celu ochrony przed mikrozakrzepami na uszkodzonym śródbłonku.<br>2. W przypadku stwierdzenia ostrej zakrzepicy tętniczej lub zatoru stopy:<br>   - <span class='dose-pill'>Heparyna niefrakcjonowana (UFH) 5000 j.m. i.v. bolus</span>, a następnie wlew ciągły.<br>3. <span class='dose-pill'>Bezwzględny zakaz stosowania stentów wewnątrznaczyniowych</span> bez odbarczenia chirurgicznego (stent ulegnie zmiażdżeniu i zakrzepicy!).",
    procedures: "1. Chirurgiczne odbarczenie naczynia (Surgical decompression / myotomy): przecięcie nieprawidłowego przyczepu ścięgnistego lub brzuśca głowy przyśrodkowej mięśnia brzuchatego łydki z dostępu tylnego esowatego w dole podkolanowym.<br>2. Śródoperacyjna ocena żywotności i ściany tętnicy podkolanowej po odbarczeniu.<br>3. Rekonstrukcja naczyniowa (interpozycja autologicznej wstawki żylnej GSV lub krótki bypass żylny): konieczna w przypadku stwierdzenia tętniaka pozawężeniowego, pęknięcia ściany lub trwałego zwłóknienia światła naczynia.<br>4. Pooperacyjna rehabilitacja naczyniowo-ruchowa umożliwiająca pełny powrót do sportu wyczynowego.",
    monitoring: "1. Kontrola tętna obwodowego na stopie w spoczynku i po wysiłku bezpośrednio po zabiegu.<br>2. Badanie USG Duplex Doppler po 1, 3, 6 i 12 miesiącach celem potwierdzenia prawidłowego przepływu bez cech resztkowego ucisku.<br>3. Monitorowanie gojenia rany w dole podkolanowym i funkcji zginaczy stopy.<br>4. Stopniowy, kontrolowany powrót do treningów biegowych po około 6-8 tygodniach od operacji."
  },
  lekQuestions: [
    {
      question: "Wystąpienie typowego chromania przestankowego łydki u młodego (20-30 lat), szczupłego sportowca bez czynników ryzyka miażdżycy, u którego w spoczynku tętno na stopach jest prawidłowe, powinno w pierwszej kolejności nasunąć podejrzenie:",
      options: [
        "Zespołu usidlenia tętnicy podkolanowej (PAES – Popliteal Artery Entrapment Syndrome)",
        "Rozwarstwienia aorty brzusznej typu Stanford B",
        "Wrodzonego braku tętnicy udowej powierzchownej",
        "Zesztywniającego zapalenia stawów kręgosłupa",
        "Zespołu Guillaina-Barrégo"
      ],
      correct: 0,
      expl: "Zespół usidlenia tętnicy podkolanowej (PAES) jest klasyczną przyczyną chromania przestankowego u młodych, aktywnych fizycznie osób (zwłaszcza sportowców i żołnierzy) bez czynników ryzyka miażdżycy. W spoczynku tętno jest prawidłowe, a objawy niedokrwienia pojawiają się dopiero w trakcie pracy mięśni nóg."
    },
    {
      question: "Jaki test prowokacyjny w badaniu fizykalnym pozwala na wysunięcie podejrzenia zespołu usidlenia tętnicy podkolanowej (PAES)?",
      options: [
        "Badanie tętna na tętnicy grzbietowej stopy podczas czynnego zgięcia podeszwowego stopy z oporem lub biernego zgięcia grzbietowego przy wyprostowanym kolanie",
        "Badanie odruchów ścięgnistych młoteczkiem neurologicznym",
        "Uniesienie kończyny górnej z głębokim wdechem (próba Adsona)",
        "Pomiar ciśnienia tętniczego na obu ramionach",
        "Próba Trendelenburga dla żył powierzchownych"
      ],
      correct: 0,
      expl: "W PAES czynne zgięcie podeszwowe stopy przeciw oporowi (skurcz mięśnia brzuchatego łydki) lub maksymalne bierne zgięcie grzbietowe przy wyprostowanym stawie kolanowym (naciągnięcie ścięgna) powoduje mechaniczne zaciśnięcie tętnicy podkolanowej, co manifestuje się nagłym zanikiem wyczuwalnego tętna na tętnicy grzbietowej stopy i piszczelowej tylnej."
    },
    {
      question: "Zgodnie z klasyfikacją anatomiczną Love-Whelana i Richa, najczęstszą przyczyną usidlenia tętnicy podkolanowej w PAES jest anomalia dotycząca:",
      options: [
        "Głowy przyśrodkowej mięśnia brzuchatego łydki (medial head of gastrocnemius)",
        "Mięśnia czworogłowego uda",
        "Więzadła pobocznego piszczelowego (MCL)",
        "Ścięgna mięśnia pośladkowego wielkiego",
        "Mięśnia piszczelowego przedniego"
      ],
      correct: 0,
      expl: "W zdecydowanej większości przypadków PAES (typy I-III wg Richa) anomalia dotyczy głowy przyśrodkowej mięśnia brzuchatego łydki (MHG) – jej ektopowego przyczepu na kości udowej, dodatkowych pasm mięśniowych lub nieprawidłowego przebiegu tętnicy podkolanowej owijającej się wokół prawidłowego przyczepu tego mięśnia."
    },
    {
      question: "Badaniem obrazowym z wyboru o najwyższej wartości diagnostycznej w zespole usidlenia tętnicy podkolanowej jest:",
      options: [
        "Rezonans magnetyczny z angiografią (Angio-MRI) dołu podkolanowego z próbami czynnościowymi",
        "Przeglądowe zdjęcie RTG stawu kolanowego na stojąco",
        "Pletyzmografia płucna",
        "Scyntygrafia perfuzyjna mięśnia sercowego",
        "Tomografia komputerowa głowy bez kontrastu"
      ],
      correct: 0,
      expl: "Angio-MRI (rezonans magnetyczny) jest badaniem z wyboru w PAES, ponieważ w przeciwieństwie do angiografii klasycznej uwidacznia nie tylko światło naczynia, ale przede wszystkim relacje anatomiczne otaczających tkanek miękkich – ścięgien, mięśni i kości – oraz pozwala na ocenę czynnościową przepływu w pozycji spoczynkowej i prowokacyjnej."
    },
    {
      question: "Dlaczego angioplastyka balonowa i wszczepienie stentu naczyniowego (PTA/stent) są BEZWZGLĘDNIE PRZECIWWSKAZANE w anatomicznym zespole usidlenia tętnicy podkolanowej?",
      options: [
        "Siły mechaniczne wywierane przez pracujący mięsień powodują zgniecenie, złamanie stentu i ostrą zakrzepicę naczynia bez usunięcia przyczyny ucisku",
        "Stenty metalowe ulegają natychmiastowej korozji chemicznej pod wpływem kwasu mlekowego",
        "W tętnicy podkolanowej krew nie krzepnie",
        "Stentowanie tętnic jest zakazane u sportowców przez przepisy antydopingowe WADA",
        "Zabieg ten wywołuje natychmiastowe zrośnięcie rzepki z kością udową"
      ],
      correct: 0,
      expl: "Stentowanie w PAES jest kardynalnym błędem sztuki lekarskiej. Ponieważ zwężenie wynika z ucisku mięśniowego z zewnątrz, stent wprowadzony do światła naczynia podlega powtarzalnemu zgniataniu podczas każdego kroku. Prowadzi to do zmiażdżenia i złamania stentu (stent fracture), uszkodzenia ściany naczynia i ostrej zakrzepicy tętniczej."
    },
    {
      question: "Leczeniem z wyboru u pacjenta z anatomicznym zespołem usidlenia tętnicy podkolanowej bez uszkodzenia ściany naczynia jest:",
      options: [
        "Chirurgiczne odbarczenie naczynia poprzez miotomię (przecięcie) ektopowego przyczepu głowy przyśrodkowej mięśnia brzuchatego łydki",
        "Amputacja kończyny dolnej na poziomie podudzia",
        "Długotrwała farmakoterapia doustnymi antykoagulantami bez operacji",
        "Wstrzyknięcie glikokortykosteroidów do jamy stawu kolanowego",
        "Zalecenie całkowitej rezygnacji z chodzenia i poruszanie się na wózku"
      ],
      correct: 0,
      expl: "Leczeniem z wyboru w anatomicznych postaciach PAES jest chirurgiczne odbarczenie (surgical decompression) polegające na miotomii – operacyjnym przecięciu uciskającego ścięgna lub brzuśca głowy przyśrodkowej mięśnia brzuchatego łydki z dostępu w dole podkolanowym. Pozwala to na pełne uwolnienie naczynia i powrót do sportu."
    },
    {
      question: "Nieleczony zespół usidlenia tętnicy podkolanowej stwarza ryzyko rozwoju powikłania w postaci:",
      options: [
        "Tętniaka pozawężeniowego tętnicy podkolanowej, zakrzepicy i ostrego niedokrwienia stopy w mechanizmie zatorowości obwodowej",
        "Wrzodziejącego zapalenia jelita grubego",
        "Ostrej niewydolności wątroby z encefalopatią",
        "Odmy opłucnowej prężnej",
        "Wrodzonego zwichnięcia stawu biodrowego"
      ],
      correct: 0,
      expl: "Przewlekłe mikrourazy mechaniczne ściany naczynia i turbulencje przepływu krwi dystalnie od ucisku prowadzą do zniszczenia elastyny i powstania tętniaka pozastenoitycznego (post-stenotic aneurysm). W tętniaku gromadzą się skrzepliny przyścienne, które mogą ulec urwaniu i wywołać ostre zatorowe niedokrwienie stopy z zagrożeniem amputacją."
    },
    {
      question: "Czym różni się torbielowate zwyrodnienie przydanki tętnicy podkolanowej (Cystic Adventitial Disease – CAD) od zespołu usidlenia tętnicy podkolanowej (PAES)?",
      options: [
        "W CAD zwężenie naczynia wynika z obecności torbieli śródściennej wypełnionej galaretowatą mucyną w obrębie przydanki tętnicy, bez anomalii anatomicznej mięśni",
        "CAD dotyczy wyłącznie małych dzieci w 1. roku życia",
        "W CAD ból pojawia się wyłącznie podczas snu",
        "CAD leczy się wyłącznie aspiryną w małej dawce",
        "CAD jest chorobą nowotworową złośliwą dającą przerzuty do mózgu"
      ],
      correct: 0,
      expl: "Cystic Adventitial Disease (CAD) to rzadka, nienowotworowa choroba, w której w przydance tętnicy podkolanowej tworzą się jedno- lub wielokomorowe torbiele wypełnione gęstym, galaretowatym płynem bogatym w proteoglikany i mucynę. Torbiel wpukla się do światła naczynia, powodując zwężenie i chromanie u młodych mężczyzn, bez współistnienia wady mięśniowej typowej dla PAES."
    },
    {
      question: "Typ VI zespołu usidlenia tętnicy podkolanowej (tzw. postać czynnościowa) charakteryzuje się:",
      options: [
        "Uciskiem naczynia przez znacznie przerośnięty, hipertroficzny mięsień brzuchaty łydki u wyczynowych sportowców przy braku wrodzonej wady anatomicznej przyczepu",
        "Całkowitym brakiem tętnicy podkolanowej od urodzenia",
        "Porażeniem nerwu strzałkowego wspólnego",
        "Obecnością tętniaka aorty brzusznej",
        "Występowaniem wyłącznie u kobiet w ciąży"
      ],
      correct: 0,
      expl: "Typ VI PAES (postać czynnościowa – functional PAES) występuje u osób z prawidłową anatomią embriologiczną dołu podkolanowego, u których dochodzi do ucisku naczynia wskutek masywnego przerostu (hipertrofii) mięśnia brzuchatego łydki pod wpływem intensywnego treningu siłowego lub lekkoatletycznego."
    },
    {
      question: "Objaw Ishikawy w diagnostyce naczyniowej dotyczy:",
      options: [
        "Zaniku tętna na stopie przy ostrym zgięciu w stawie kolanowym u pacjentów z torbielowatym zwyrodnieniem przydanki tętnicy podkolanowej (CAD)",
        "Bólu brzucha po spożyciu tłustego posiłku",
        "Wzrostu ciśnienia tętniczego po wypiciu kawy",
        "Zaczerwienienia twarzy pod wpływem emocji",
        "Brak tętna na tętnicy promieniowej przy ucisku obojczyka"
      ],
      correct: 0,
      expl: "Objaw Ishikawy (Ishikawa sign) polega na zaniku tętna na tętnicy grzbietowej stopy podczas maksymalnego zgięcia kończyny w stawie kolanowym. Jest charakterystycznym objawem opisanym w torbielowatym zwyrodnieniu przydanki tętnicy podkolanowej (CAD), gdzie zgięcie kolana zwiększa ucisk płynu w torbieli na światło naczynia."
    },
    {
      question: "W przypadku stwierdzenia zaawansowanego zbliznowacenia i okluzji tętnicy podkolanowej w przebiegu przewlekłego PAES, optymalną procedurą naczyniową skojarzoną z miotomią jest:",
      options: [
        "Resekcja zmienionego odcinka tętnicy i rekonstrukcja za pomocą wstawki z autologicznej żyły odpiszczelowej (GSV interposition)",
        "Wszczepienie stentu metalowego ze stali nierdzewnej",
        "Wycięcie nerwu piszczelowego",
        "Podwiązanie tętnicy udowej wspólnej w pachwinie",
        "Przeszczepienie allogenicznej tętnicy od dawcy zmarłego"
      ],
      feedback: "",
      correct: 0,
      expl: "Gdy w przebiegu PAES doszło do nieodwracalnego uszkodzenia ściany naczynia (tętniak, zakrzepica, fibroza), standardem jest chirurgiczne odbarczenie (miotomia) połączone z wycięciem zniszczonego fragmentu tętnicy podkolanowej i odtworzeniem ciągłości naczyniowej za pomocą wstawki z własnej żyły odpiszczelowej (vein graft interposition) ze względu na jej doskonałą elastyczność w zgięciu kolana."
    }
  ],
  flashcards: [
    {
      front: "Co to jest PAES (zespół usidlenia tętnicy podkolanowej)?",
      back: "Wrodzona anomalia anatomiczna polegająca na ucisku tętnicy podkolanowej przez głowę przyśrodkową m. brzuchatego łydki. Występuje u młodych sportowców bez miażdżycy z chromaniem łydki."
    },
    {
      front: "Jaki test prowokacyjny wykonuje się w podejrzeniu PAES?",
      back: "Badanie tętna na stopie podczas czynnego zgięcia podeszwowego z oporem lub biernego zgięcia grzbietowego przy wyprostowanym kolanie – dochodzi do całkowitego zaniku tętna i przepływu!"
    },
    {
      front: "Jakie jest badanie obrazowe z wyboru w diagnostyce PAES?",
      back: "Angio-MRI dołu podkolanowego z próbami czynnościowymi. Obrazuje nie tylko światło naczynia, ale przede wszystkim tkanki miękkie i ektopowe ścięgna uciskające tętnicę."
    },
    {
      front: "Dlaczego stentowanie wewnątrznaczyniowe jest zakazane w PAES?",
      back: "Ponieważ nie usuwa przyczyny ucisku mięśniowego. Kurczący się mięsień zgniata i łamie stent (stent fracture), co prowadzi do natychmiastowej zakrzepicy tętnicy podkolanowej."
    },
    {
      front: "Jakie jest leczenie chirurgiczne z wyboru w PAES?",
      back: "Odbarczenie operacyjne – miotomia (przecięcie) ektopowego przyczepu głowy przyśrodkowej m. brzuchatego łydki. W razie tętniaka: resekcja ze wstawką z żyły odpiszczelowej (GSV)."
    },
    {
      front: "Jakie powikłania grożą przy nieleczonym PAES?",
      back: "Przewlekły mikrouraz naczynia prowadzi do tętniaka pozawężeniowego, zakrzepicy przyściennej i ostrego niedokrwienia stopy z zatorowości obwodowej (ryzyko amputacji!)."
    }
  ]
};

async function run() {
  console.log("Generating Case 146: Zespół usidlenia tętnicy podkolanowej (PAES)...");
  
  // Mirroring
  case146.steps.forEach(s => {
    s.correct = 0;
    s.correctIdx = 0;
    s.question = s.title;
    s.explanation = s.feedback ? s.feedback[0] : "";
  });
  
  case146.lekQuestions.forEach(q => {
    q.opts = q.options;
    q.correctIdx = q.correct;
    q.exp = q.expl;
  });
  
  const enc = await encryptStringAes(JSON.stringify(case146, null, 2), MASTER_KEY);
  fs.writeFileSync(path.join('cases', '146_zespol_usidlenia_tetnicy_podkolanowej_paes.json'), JSON.stringify(enc, null, 2), 'utf8');
  console.log("[SAVED] Case #146: 146_zespol_usidlenia_tetnicy_podkolanowej_paes.json (LEK Qs: " + case146.lekQuestions.length + ", Steps: " + case146.steps.length + ", Flashcards: " + case146.flashcards.length + ")");
}

run();

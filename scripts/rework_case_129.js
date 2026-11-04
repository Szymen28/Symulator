const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');

const MASTER_KEY = '@LEKSzymon28111999';
const CASES_DIR = path.join(__dirname, '..', 'cases');

console.log("Generating Case 129: Perforacja wrzodu trawiennego...");

async function saveCase(caseData) {
  const filePath = path.join(CASES_DIR, caseData.filename);
  const jsonStr = JSON.stringify(caseData, null, 2);
  const encrypted = await encryptStringAes(jsonStr, MASTER_KEY);
  fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), 'utf8');
  console.log(`[SAVED] Case #${caseData.id}: ${caseData.filename} (LEK Qs: ${caseData.lekQuestions.length}, Steps: ${caseData.steps.length}, Flashcards: ${caseData.flashcards.length})`);
}

const case129 = {
  id: 129,
  filename: "129_perforacja_wrzodu_trawiennego.json",
  dept: "Chirurgia ogólna",
  shortTitle: "61-letni Janusz – Piorunujący ból brzucha jak 'uderzenie nożem', brzuch deskowaty i sierp powietrza pod przeponą (Perforacja wrzodu trawiennego)",
  diagnosisTitle: "Przedziurawienie (perforacja) wrzodu trawiennego przedniej ściany opuszki dwunastnicy powikłane rozlanym chemicznym i bakteryjnym zapaleniem otrzewnej (Peritonitis diffusa)",
  vitals: [
    { label: "Nasilenie bólu brzucha", val: "10 / 10 w skali NRS", sub: "Piorunujący ból jak 'cios nożem'", status: "vital-crit" },
    { label: "Częstość akcji serca (HR)", val: "118/min", sub: "Tachykardia w przebiegu ostrego zapalenia otrzewnej", status: "vital-crit" },
    { label: "Napięcie powłok brzucha", val: "Brzuch deskowaty", sub: "Mimowolna, skrajna obrona mięśniowa (défense)", status: "vital-crit" },
    { label: "RTG klatki piersiowej", val: "Sierp powietrza pod przeponą", sub: "Pneumoperitoneum (wolny gaz w jamie otrzewnej)", status: "vital-crit" }
  ],
  vitalsObj: { hr: 118, bp: "105/65", spo2: 96, rr: 24, temp: 37.9, gcs: 15 },
  story: `<p><strong>Pacjent:</strong> 61-letni Janusz, emerytowany kierowca zawodowy, został przywieziony na sygnale przez zespół ratownictwa medycznego na szpitalny oddział ratunkowy z powodu nagłego, obezwładniającego bólu brzucha, który pojawił się dokładnie 3 godziny temu i został określony przez chorego jako 'uderzenie nożem prosto w żołądek'.</p><p><strong>Wywiad chorobowy:</strong> Ból rozpoczął się o godzinie 11:15, gdy pacjent siedział w fotelu – był tak potworny i nagły, że mężczyzna osunął się na podłogę, zalał zimnym potem i nie był w stanie samodzielnie wstać ani zaczerpnąć głębszego oddechu. Od kilku miesięcy chory odczuwał pieczenie i 'ssanie' w nadbrzuszu na czczo i w nocy, które łagodził posiłkami lub mlekiem. Ze względu na przewlekłe bóle kręgosłupa i stawów kolanowych od ponad 3 tygodni codziennie przyjmował bez recepty ketoprofen w dawce 200 mg/dobę oraz diklofenak bez jakiejkolwiek osłony inhibitorami pompy protonowej (IPP). Pali od 40 lat (ok. 1 paczkę dziennie), neguje nadużywanie alkoholu. Przed przyjazdem ZRM zwymiotował raz niewielką ilością ciemnobrunatnej treści.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Pacjent leży nieruchomo na plecach z podkurczonymi nogami, boi się poruszyć choćby o centymetr, jęczy z bólu, skóra blada, zlana chłodnym potem. Tor oddychania wyłącznie piersiowy, płytki (RR 24/min), ponieważ jakikolwiek ruch przepony nasila ból do poziomu nie do zniesienia. Brzuch na poziomie klatki piersiowej, całkowicie nieruchomy oddechowo. Przy delikatnej próbie palpacji stwierdza się klasyczny <strong>brzuch deskowaty</strong> – twarde jak deska, symetryczne, mimowolne napięcie mięśni prostych i skośnych całego brzucha, uniemożliwiające jakiekolwiek wgłębienie powłok. Objaw Blumberga silnie dodatni we wszystkich czterech kwadrantach brzucha. W opukiwaniu: <em>zanik stłumienia wątrobowego</em> (odgłos bębenkowy nad prawym łukiem żebrowym świadczący o obecności wolnego gazu pod kopułą przepony). Osłuchowo nad całą jamą brzuszną panuje 'martwa cisza' – całkowity brak jakichkolwiek szmerów perystaltycznych (porażenie perystaltyki). W badaniu per rectum (DRE): silna bolesność otrzewnej w zachyłku Douglasa.</p>`,
  labs: {
    "Wskaźniki zapalne i gazometria": [
      { name: "Leukocyty (WBC)", val: "17,8 tys./µl", norm: "4,0 - 10,0 tys./µl", flag: "CRIT_HIGH" },
      { name: "Granulocyty obojętnochłonne (NEUT)", val: "88 % (15,6 tys./µl)", norm: "45 - 70 %", flag: "CRIT_HIGH" },
      { name: "Przesunięcie w lewo (pałeczki)", val: "14 %", norm: "< 5 %", flag: "HIGH" },
      { name: "Białko C-reaktywne (CRP)", val: "84,0 mg/l", norm: "< 5,0 mg/l", flag: "CRIT_HIGH" },
      { name: "Mleczany we krwi tętniczej", val: "2,6 mmol/l", norm: "0,5 - 2,0 mmol/l", flag: "HIGH" },
      { name: "pH krwi tętniczej", val: "7,34", norm: "7,35 - 7,45", flag: "LOW" },
      { name: "Hemoglobina (Hb)", val: "13,9 g/dl", norm: "13,5 - 17,5 g/dl", flag: "NORMAL" }
    ],
    "Biochemia i enzymy": [
      { name: "Amylaza w surowicy", val: "145 U/l", norm: "28 - 100 U/l", flag: "HIGH" },
      { name: "Lipaza w surowicy", val: "68 U/l", norm: "13 - 60 U/l", flag: "NORMAL" },
      { name: "Kreatynina w surowicy", val: "1,15 mg/dl", norm: "0,70 - 1,20 mg/dl", flag: "NORMAL" },
      { name: "Mocznik", val: "48 mg/dl", norm: "15 - 45 mg/dl", flag: "HIGH" },
      { name: "Sód (Na+)", val: "138 mmol/l", norm: "135 - 145 mmol/l", flag: "NORMAL" },
      { name: "Potas (K+)", val: "4,3 mmol/l", norm: "3,5 - 5,1 mmol/l", flag: "NORMAL" }
    ],
    "Pilne RTG klatki piersiowej w pozycji stojącej": [
      { name: "Kopuły przepony", val: "Obecność wyraźnego, wąskiego sierpa wolnego gazu pod prawą i lewą kopułą przepony (Pneumoperitoneum)", norm: "Brak gazu podprzeponowego", flag: "CRIT_HIGH" },
      { name: "Pola płucne", val: "Pola płucne bez nacieków, kąty przeponowo-żebrowe wolne", norm: "Prawidłowe", flag: "NORMAL" }
    ]
  },
  steps: [
    {
      title: "Krok 1: Identyfikacja nagłego bólu brzucha i objawów rozlanego zapalenia otrzewnej",
      text: "Pacjent zgłasza nagły początek bólu o godzinie 11:15 o charakterze 'ciosu nożem'. W badaniu fizykalnym stwierdzasz brzuch deskowaty, zanik stłumienia wątrobowego oraz martwą ciszę perystaltyczną. Co oznacza 'brzuch deskowaty' i zanik stłumienia wątrobowego?",
      options: [
        "Brzuch deskowaty to mimowolne, odruchowe napięcie powłok w odpowiedzi na rozlane zapalenie otrzewnej (peritonitis diffusa); zanik stłumienia wątrobowego świadczy o obecności wolnego gazu w jamie otrzewnej (odma otrzewnowa) gromadzącego się nad wątrobą w wyniku perforacji przewodu pokarmowego",
        "Brzuch deskowaty oznacza skurcz mięśni po wysiłku fizycznym, a zanik stłumienia wątrobowego to wrodzona aplazja wątroby",
        "Jest to objaw zawału ściany dolnej serca z odruchowym porażeniem przepony",
        "Świadczy o ostrej kamicy moczowodowej z zatrzymaniem moczu"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Brzuch deskowaty (défense musculaire uogólniona) jest najsilniejszym objawem rozlanego zapalenia otrzewnej ściennej</strong> wywołanego wylaniem żrącego kwasu solnego, pepsyny i treści pokarmowej do jamy brzusznej. Z kolei <strong>zanik stłumienia wątrobowego</strong> w opukiwaniu nad prawym łukiem żebrowym wynika z gromadzenia się wolnego gazu (powietrza z żołądka/dwunastnicy) między przednią ścianą klatki piersiowej a wątrobą w pozycji pionowej lub półsiedzącej.",
        "❌ BŁĄD! <strong>Wysiłkowy skurcz mięśni nie daje objawu Blumberga ani martwej ciszy osłuchowej;</strong> aplazja wątroby jest wadą letalną niemowląt.",
        "❌ BŁĄD! <strong>Chociaż zawał dolnej ściany może dawać ból w nadbrzuszu,</strong> nigdy nie wywołuje sierpa powietrza pod przeponą ani brzucha deskowatego.",
        "❌ BŁĄD! <strong>W kolce nerkowej pacjent jest skrajnie niespokojny, 'rzuca się z bólu',</strong> a brzuch jest miękki."
      ]
    },
    {
      title: "Krok 2: Badanie obrazowe z wyboru i interpretacja 'sierpa powietrza'",
      text: "W celu potwierdzenia przedziurawienia narządu drążonego zlecasz pilne badanie rentgenowskie. Jakie projekcje RTG są zalecane i co uwidacznia obecność 'sierpa powietrza' pod przeponą?",
      options: [
        "RTG klatki piersiowej lub przeglądowe RTG jamy brzusznej w pozycji stojącej (obejmujące kopuły przepony); obecność sierpa powietrza pod kopułą przepony definiuje odmę otrzewnową (pneumoperitoneum) i potwierdza perforację przewodu pokarmowego",
        "RTG jamy brzusznej wyłącznie na leżąco (AP na wznak)",
        "Mammografia obu piersi",
        "RTG celowane na kość krzyżową"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Badaniem pierwszego rzutu o wysokiej dostępności jest RTG klatki piersiowej na stojąco lub przeglądowe RTG brzucha na stojąco.</strong> Gaz jako lżejszy od płynów unosi się do najwyższego punktu jamy otrzewnej, tworząc charakterystyczny półksiężycowaty 'sierp powietrza' pod prawą kopułą przepony (pomiędzy przeponą a wątrobą). Jeśli pacjent nie może ustać, wykonuje się RTG na lewym boku z promieniem poziomym (gaz gromadzi się nad prawym brzegiem wątroby).",
        "❌ BŁĄD! <strong>W pozycji leżącej na wznak wolny gaz rozprasza się pod przednią ścianą brzucha i jest bardzo trudny do wykrycia na zwykłym RTG</strong> (wymaga wtedy poszukiwania objawu Riglera).",
        "❌ BŁĄD! <strong>Mammografia nie ocenia narządów jamy brzusznej.</strong>",
        "❌ BŁĄD! <strong>RTG kości krzyżowej nie wykaże odmy podprzeponowej.</strong>"
      ]
    },
    {
      title: "Krok 3: Badanie BEZWZGLĘDNIE PRZECIWWSKAZANE w podejrzeniu perforacji",
      text: "Lekarz stażysta proponuje: 'Pacjent od miesięcy miał objawy choroby wrzodowej. Zróbmy pilną gastroskopię, żeby obejrzeć dno wrzodu i pobrać wycinki'. Jak reagujesz na tę propozycję?",
      options: [
        "Gastroskopia w ostrej perforacji wrzodu jest BEZWZGLĘDNIE PRZECIWWSKAZANA! Wdmuchiwanie powietrza przez endoskop powiększa otwór perforacyjny, wtłacza olbrzymie ilości gazu i treści do otrzewnej i drastycznie pogarsza stan chorego",
        "Zgadzasz się, gastroskopia jest badaniem pierwszego rzutu w perforacji",
        "Zalecasz podanie doustne 500 ml gęstej zawiesiny siarczanu baru przed gastroskopią",
        "Zalecasz odroczenie operacji i wykonanie gastroskopii rano na czczo"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Endoskopia górnego odcinka przewodu pokarmowego (gastroskopia) jest bezwzględnie przeciwwskazana przy podejrzeniu lub potwierdzeniu wolnej perforacji do otrzewnej!</strong> Wtłaczanie powietrza (insuflacja) w celu rozszerzenia światła żołądka powoduje gwałtowny wzrost ciśnienia w jamie otrzewnej, rozszerza otwór perforacyjny i wtłacza kolejne litry zakażonej treści do otrzewnej. Równie śmiertelnym błędem byłoby podanie doustnego kontrastu barytowego (baryt wywołuje nieodwracalne, ziarniniakowe, zrostowe zapalenie otrzewnej o ogromnej śmiertelności!).",
        "❌ BŁĄD! <strong>Gastroskopia u chorego z perforacją to kardynalny błąd zagrażający życiu.</strong>",
        "❌ BŁĄD! <strong>Siarczan baru w otrzewnej wywołuje chemiczne zapalenie otrzewnej o śmiertelności bliskiej 50%;</strong> jeśli konieczny jest kontrast doustny (np. w TK), stosuje się wyłącznie związki rozpuszczalne w wodzie (Gastrografin)!",
        "❌ BŁĄD! <strong>Pacjent z perforacją wymaga natychmiastowej operacji w trybie pilnym,</strong> a nie odraczania na kolejny dzień."
      ]
    },
    {
      title: "Krok 4: Przyczyny perforacji – NLPZ vs Helicobacter pylori",
      text: "W wywiadzie Janusz przyjmował przez 3 tygodnie ketoprofen i diklofenak bez leków osłonowych. Jaki jest patomechanizm powstawania wrzodów i ich perforacji pod wpływem niesteroidowych leków przeciwzapalnych (NLPZ)?",
      options: [
        "NLPZ hamują cyklooksygenazę-1 (COX-1), co blokuje syntezę prostaglandyn (PGE2, PGI2) odpowiedzialnych za wydzielanie śluzu, wodorowęglanów i prawidłowy przepływ krwi w błonie śluzowej żołądka i dwunastnicy, prowadząc do głębokiej martwicy ściany pod wpływem kwasu solnego",
        "NLPZ bezpośrednio trawią ścianę żołądka działając jak kwas siarkowy",
        "NLPZ stymulują nadmierny rozrost Helicobacter pylori w świetle przewodu pokarmowego",
        "Leki przeciwbólowe niszczą układ krzepnięcia, powodując zawał wątroby"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Głównym mechanizmem wrzodotwórczym NLPZ jest układowe hamowanie enzymu COX-1 (konstytutywnego).</strong> Prowadzi to do zablokowania wytwarzania prostaglandyny E2 i prostacykliny, które stanowią fundament bariery ochronnej żołądka: stymulują wydzielanie ochronnego śluzu, wodorowęglanów (HCO3-) oraz utrzymują przepływ mikronaczyniowy w śluzówce. Brak prostaglandyn obnaża komórki nabłonka na niszczące działanie kwasu solnego i pepsyny, co prowadzi do drążącego owrzodzenia i perforacji całej grubości ściany.",
        "❌ BŁĄD! <strong>NLPZ nie są kwasami nieorganicznymi trawiącymi mechanicznie ścianę;</strong> działają poprzez enzymatyczny szlak kwasu arachidonowego.",
        "❌ BŁĄD! <strong>NLPZ nie przyspieszają namnażania bakterii H. pylori,</strong> aczkolwiek koinfekcja H. pylori i stosowanie NLPZ wykazują silny synergizm w ryzyku powikłań wrzodowych.",
        "❌ BŁĄD! <strong>NLPZ wpływają na agregację płytek (COX-1),</strong> ale przyczyną perforacji jest rozpad ściany narządu, a nie zawał wątroby."
      ]
    },
    {
      title: "Krok 5: Przygotowanie przedoperacyjne na SOR",
      text: "Chirurg kwalifikuje Janusza do pilnej operacji w trybie ostrym. Jakie procedury resuscytacyjne i farmakologiczne należy wdrożyć natychmiast na sali reanimacyjnej SOR?",
      options: [
        "Ścisła dieta (NPO), wprowadzenie zgłębnika żołądkowego (sondy) i odessanie zalegającej treści, agresywna płynoterapia krystaloidowa i.v., podanie inhibitora pompy protonowej w dużej dawce dożylnej (pantoprazol 80 mg bolus), empiryczna antybiotykoterapia o szerokim spektrum (np. cefalosporyna III gen. + metronidazol) oraz analgezja dożylna",
        "Podanie choremu doustnie 1 litra zimnego mleka w celu zneutralizowania kwasu w żołądku",
        "Zalecenie picia dużej ilości ciepłej herbaty i podanie czopka glicerynowego",
        "Podanie wlewu z wodorowęglanu sodu doustnie bez wkłucia dożylnego"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Standard postępowania przeciwwstrząsowego i przygotowania do operacji perforacji obejmuje:</strong> 1. Status NPO (nic doustnie), 2. Założenie sondy żołądkowej (dekompresja i odessanie soku żołądkowego, by zmniejszyć dalszy wyciek do otrzewnej), 3. Wlew krystaloidów (<span class='dose-pill'>PWE 20-30 ml/kg i.v.</span>) w celu uzupełnienia sekwestracji płynów w otrzewnej, 4. Inhibitor pompy protonowej w wysokiej dawce (<span class='dose-pill'>Pantoprazol 80 mg i.v. bolus</span>, potem wlew 8 mg/h), 5. Antybiotykoterapia empiryczna (<span class='dose-pill'>Ceftriakson 2 g i.v.</span> + <span class='dose-pill'>Metronidazol 500 mg i.v.</span>), 6. Cewnik Foleya (kontrola diurezy), 7. Skuteczna analgezja opioidowa.",
        "❌ BŁĄD! <strong>Podawanie czegokolwiek doustnie (mleko, woda) jest śmiertelnym błędem –</strong> cała płynna treść przez otwór perforacyjny natychmiast wyleje się do jamy otrzewnej!",
        "❌ BŁĄD! <strong>Płyny doustne i leki przeczyszczające są bezwzględnie zabronione.</strong>",
        "❌ BŁĄD! <strong>Wodorowęglan sodu podany doustnie w reakcji z HCl wydziela olbrzymie ilości dwutlenku węgla (CO2),</strong> co doprowadziłoby do eksplozji żołądka i nasilenia odmy otrzewnowej."
      ]
    },
    {
      title: "Krok 6: Technika chirurgiczna zaopatrzenia perforacji (Łata Grahama)",
      text: "Podczas laparotomii chirurg uwidacznia 6-milimetrowy otwór perforacyjny na przedniej ścianie opuszki dwunastnicy, otoczony stwardniałym wałem zapalnym. Jaka jest klasyczna, standardowa metoda chirurgicznego zaopatrzenia tej perforacji?",
      options: [
        "Zszycie otworu perforacyjnego szwami pojedynczymi i pokrycie linii szwów uszypułowanym płatem sieci większej (tzw. łata Grahama / omentoplastyka) oraz obfite płukanie otrzewnej kilkoma litrami soli fizjologicznej",
        "Całkowita gastrektomia z zespoleniem przełykowo-jelitowym Roux-en-Y",
        "Pozostawienie otworu bez szycia i założenie wyłącznie drenu gumowego",
        "Wprowadzenie rurki z tworzywa sztucznego przez otwór na zewnątrz powłok"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Standardem chirurgicznym leczenia perforacji wrzodu dwunastnicy lub odźwiernika jest pierwotne zamknięcie otworu i omentoplastyka uszypułowanym fragmentem sieci większej (technika Grahama / Cellana-Jonesa / Graham patch).</strong> Przełożenie bogato unaczynionego płata sieci większej uszczelnia linię szwów i zabezpiecza przed rozejściem się zeszycia w obrzękniętej, kruchej ścianie dwunastnicy. Kluczowym elementem operacji jest również obfite toaletowanie i płukanie całej jamy otrzewnej (zwykle 5-10 litrów ciepłego 0,9% NaCl) celem usunięcia kwasu, włóknika i bakterii.",
        "❌ BŁĄD! <strong>Całkowite usunięcie żołądka (gastrektomia) to zbyt rozległa, obarczona wysoką śmiertelnością operacja,</strong> niewskazana w łagodnej chorobie wrzodowej.",
        "❌ BŁĄD! <strong>Brak zamknięcia otworu spowodowałby przetokę dwunastniczą z utratą soków trawiennych i śmierć z kacheksji septycznej.</strong>",
        "❌ BŁĄD! <strong>Wyłonienie dwunastnicy na zewnątrz to postępowanie historyczne,</strong> obecnie niestosowane."
      ]
    },
    {
      title: "Krok 7: Zróżnicowanie perforacji wrzodu przedniej vs tylnej ściany",
      text: "Dlaczego wrzody przedniej ściany dwunastnicy i żołądka manifestują się perforacją i zapaleniem otrzewnej, a wrzody ściany tylnej dają zupełnie inny obraz kliniczny?",
      options: [
        "Przednia ściana graniczy bezpośrednio z wolną jamą otrzewnej, więc przedziurawienie wylewa treść do worka otrzewnowego; ściana tylna przylega do trzustki i tętnicy żołądkowo-dwunastniczej (GDA), dlatego jej owrzodzenia penetrują do trzustki lub dają masywny krwotok z naczynia tętniczego",
        "Przednia ściana nie ma błony śluzowej, dlatego łatwiej pęka",
        "Ściana tylna żołądka jest zrośnięta z kręgosłupem i nie może ulec owrzodzeniu",
        "Perforacja ściany tylnej wylewa treść bezpośrednio do lewej komory serca"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>To kardynalna zależność anatomiczno-kliniczna pytana na LEK:</strong><br>- <strong>Przednia ściana żołądka i opuszki dwunastnicy:</strong> pokryta otrzewną, wolna przestrzeń – powikłaniem jest <strong>PERFORACJA</strong> z odmą otrzewnową i rozlanym zapaleniem otrzewnej.<br>- <strong>Tylna ściana opuszki dwunastnicy:</strong> przylega bezpośrednio do głowy trzustki i pnia tętnicy żołądkowo-dwunastniczej (arteria gastroduodenalis – GDA) – powikłaniem jest <strong>MASYWNY KRWOTOK</strong> z przewodu pokarmowego (krwawe wymioty, smolisty stolec, wstrząs krwotoczny) lub penetracja do miąższu trzustki.",
        "❌ BŁĄD! <strong>Błona śluzowa wyściela całe światło żołądka i dwunastnicy.</strong>",
        "❌ BŁĄD! <strong>Ściana tylna nie zrasta się z kręgosłupem;</strong> graniczy z torbą sieciową i trzustką.",
        "❌ BŁĄD! <strong>Żołądek leży pod przeponą,</strong> serce w klatce piersiowej; nie ma bezpośredniego kontaktu."
      ]
    },
    {
      title: "Krok 8: Postępowanie pooperacyjne i profilaktyka nawrotu choroby wrzodowej",
      text: "Janusz pomyślnie przeszedł operację zeszycia wrzodu łatą Grahama. Jakie postępowanie farmakologiczne po zabiegu jest bezwzględnie konieczne, aby zapobiec ponownej perforacji lub nawrotom owrzodzenia?",
      options: [
        "Diagnostyka i eradykacja zakażenia Helicobacter pylori (terapia poczwórna z bizmutem przez 14 dni), kontynuacja leczenia IPP przez co najmniej 6-8 tygodni oraz bezwzględny zakaz stosowania klasycznych NLPZ bez protekcji IPP",
        "Podawanie kwasu acetylosalicylowego w dawce 500 mg 3 razy dziennie celem poprawy ukrwienia",
        "Brak konieczności leczenia farmakologicznego, gdyż usunięcie wrzodu operacyjnie uodparnia na całe życie",
        "Wypisanie do domu w 2. dobie bez leków i z zaleceniem diety bogatej w ostre przyprawy"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Zeszycie perforacji jest zabiegiem ratującym życie, ale NIE leczy przyczyny choroby wrzodowej!</strong> Po operacji konieczna jest diagnostyka zakażenia Helicobacter pylori (np. testem oddechowym lub antygenem w kale po odstawieniu IPP) i eradykacja (terapia poczwórna z bizmutem przez 14 dni), kontynuacja IPP przez 6-8 tygodni oraz bezwzględna edukacja pacjenta dotycząca <strong>zakazu przyjmowania leków z grupy NLPZ</strong> bez konsultacji lekarskiej i bez osłony IPP.",
        "❌ BŁĄD! <strong>Podanie aspiryny w dużej dawce po perforacji wrzodu doprowadziłoby do ponownego przedziurawienia ściany żołądka!</strong>",
        "❌ BŁĄD! <strong>Choroba wrzodowa to schorzenie przewlekłe;</strong> operacja jedynie zaopatrzyła powikłanie mechaniczne.",
        "❌ BŁĄD! <strong>Pozostawienie pacjenta bez leków przeciwkwasowych i eradykacji grozi nawrotem wrzodu u ponad 60-80% chorych.</strong>"
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Załamanie bariery",
      title: "Zahamowanie COX-1 i ubytek błony śluzowej",
      short: "Niedobór prostaglandyn pod wpływem NLPZ",
      detail: "Blokada enzymu COX-1 przez ketoprofen drastycznie redukuje stężenie PGE2 w błonie śluzowej. Dochodzi do spadku wydzielania śluzu i dwuwęglanów oraz hipoperfuzji mikronaczyniowej, co umożliwia pepsynie i HCl penetrację w głąb ściany.",
      target: "Błona śluzowa opuszki dwunastnicy",
      drugTarget: "<span class='dose-pill'>Pantoprazol 80 mg i.v. bolus</span>, potem wlew 8 mg/h – supresja wydzielania HCl"
    },
    {
      badge: "Przedziurawienie",
      title: "Perforacja pełnej grubości ściany narządu",
      short: "Martwica rozpływna i wytworzenie otworu perforacyjnego",
      detail: "Owrzodzenie przekracza błonę mięśniową i surowiczą na przedniej ścianie dwunastnicy. Powstaje przetoka do wolnej jamy otrzewnej, przez którą pod ciśnieniem wydostaje się sok trawienny i wolny gaz.",
      target: "Przednia ściana opuszki dwunastnicy",
      drugTarget: "<span class='dose-pill'>Łata Grahama (omentoplastyka)</span> uszczelnienie ubytku uszypułowaną siecią"
    },
    {
      badge: "Chemiczne zapalenie",
      title: "Wylanie HCl i żółci do jamy otrzewnej",
      short: "Skrajne podrażnienie receptorów bólowych otrzewnej",
      detail: "Kwaśna treść żołądkowa (pH 1-2) działa jak żrący kwas na bogato unerwioną otrzewną ścienną. Wyzwala to piorunujący ból somatyczny (cios nożem), odruchowy 'brzuch deskowaty' i masywny wysięk płynu.",
      target: "Otrzewna ścienna i n. międzyżebrowe Th7-Th12",
      drugTarget: "<span class='dose-pill'>Płukanie otrzewnej 5-10 l NaCl 0,9%</span> usunięcie kwasu i enzymów trawiennych"
    },
    {
      badge: "Sepsa bakteryjna",
      title: "Bakteryjne zapalenie otrzewnej i wstrząs",
      short: "Translokacja flory bakteryjnej po 12 godzinach",
      detail: "Po fazie chemicznej następuje inwazja bakterii jelitowych (Gram-ujemnych i beztlenowców). Otrzewna traci zdolność resorpcji, dochodzi do hipowolemii, kwasicy mleczanowej i sepsy z porażeniem perystaltyki.",
      target: "Mikroflora jamy otrzewnej i śródbłonek",
      drugTarget: "<span class='dose-pill'>Ceftriakson 2 g i.v.</span> + <span class='dose-pill'>Metronidazol 500 mg i.v.</span> zwalczanie bakteriemii"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Perforacja wrzodu trawiennego vs Inne ostre stany brzuszne o nagłym początku",
    headers: ["Cecha kliniczna", "Perforacja wrzodu trawiennego", "Ostre zapalenie trzustki (OZT)", "Pęknięty tętniak aorty brzusznej (rAAA)", "Ostre niedokrwienie krezki (SMA)", "Niedrożność mechaniczna jelit (SBO)"],
    rows: [
      ["Początek i charakter bólu", "Piorunujący, sekunda po sekundzie, jak 'uderzenie nożem' w nadbrzuszu", "Nagły, silny, opasujący ból w nadbrzuszu promieniujący do pleców", "Nagły ból brzucha i okolicy lędźwiowo-krzyżowej ze wstrząsem", "Nagły ból nieproporcjonalnie silny w stosunku do badania fizykalnego", "Ból kurczowy, kolkowy, falowy, zlokalizowany wokół pępka"],
      ["Napięcie powłok brzucha", "Brzuch deskowaty (ekstremalna mimowolna obrona na całym brzuchu)", "Wzmożone napięcie w nadbrzuszu, brzuch często 'ciastowaty'", "Możliwy wyczuwalny tętniący guz, obrona w fazie wstrząsu", "Początkowo brzuch miękki i niebolesny palpacyjnie (dysocjacja!)", "Brzuch wzdęty, miękki pomiędzy falami skurczów"],
      ["Wolne powietrze (Pneumoperitoneum)", "Obecne w >75-80% (sierp powietrza pod przeponą w RTG/TK)", "Całkowity brak wolnego powietrza", "Brak wolnego powietrza (widoczny krwiak zaotrzewnowy)", "Początkowo brak; gaz w ścianie jelita (pneumatosis) w martwicy", "Brak wolnego powietrza (widoczne poziomy płynów w jelitach)"],
      ["Szmery perystaltyczne", "Martwa cisza (odruchowe porażenie perystaltyki od pierwszych minut)", "Osłabione lub leniwe", "Zwykle osłabione", "Początkowo żywa, hiperaktywna, w martwicy cisza", "Wzmożone, metaliczne, ze stawianiem się pętli jelitowych"],
      ["Stłumienie wątrobowe", "Zanik stłumienia wątrobowego (odgłos bębenkowy nad wątrobą)", "Zachowane prawidłowe stłumienie wątrobowe", "Zachowane", "Zachowane", "Zachowane lub przemieszczone przez pętle jelit"],
      ["Leczenie pierwszego rzutu", "Pilna operacja: laparotomia/laparoskopia, zszycie + łata Grahama", "Leczenie zachowawcze (płynoterapia, analgezja, żywienie)", "Natychmiastowa operacja naczyniowa (EVAR lub otwarta rekonstrukcja)", "Pilna embolektomia naczyniowa SMA + ocena żywotności jelita", "Dekompresja sondą, test z Gastrografiną lub operacja uwolnienia zrostów"]
    ]
  },
  dutySummary: {
    overview: "Przedziurawienie (perforacja) wrzodu trawiennego jest stanem bezpośredniego zagrożenia życia, w którym treść żołądkowo-dwunastnicza przedostaje się do jamy otrzewnej, wywołując w pierwszych godzinach chemiczne, a następnie bakteryjne zapalenie otrzewnej. Najczęściej dotyczy przedniej ściany opuszki dwunastnicy u pacjentów przyjmujących NLPZ lub zakażonych H. pylori. Wymaga natychmiastowej interwencji chirurgicznej.",
    diagnostics: "1. Ocena kliniczna: nagły początek bólu ('cios nożem'), brzuch deskowaty, zanik stłumienia wątrobowego, martwa cisza osłuchowa.<br>2. Przeglądowe RTG klatki piersiowej lub brzucha na stojąco (lub na lewym boku) – poszukiwanie 'sierpa powietrza' pod kopułami przepony (pneumoperitoneum).<br>3. Tomografia komputerowa (TK) jamy brzusznej z kontrastem i.v. – badanie z wyboru przy niejednoznacznym RTG (uwidacznia ubytek ściany i wolny gaz).<br>4. Morfologia krwi (leukocytoza z przesunięciem w lewo), gazometria (kwasica metaboliczna, mleczany), parametry nerkowe i koagulologiczne.<br>5. GASTROSKOPIA I KONTRAST BARYTOWY SĄ BEZWZGLĘDNIE PRZECIWWSKAZANE!",
    drugsAndDoses: "1. Wysokie dawki inhibitorów pompy protonowej (IPP):<br>   - <span class='dose-pill'>Pantoprazol 80 mg i.v. w bolusie</span>, a następnie wlew ciągły <span class='dose-pill'>Pantoprazol 8 mg/h i.v.</span> przez 72 godziny.<br>2. Antybiotykoterapia empiryczna dożylna o szerokim spektrum:<br>   - <span class='dose-pill'>Ceftriakson 2 g i.v. raz/dobę</span> + <span class='dose-pill'>Metronidazol 500 mg i.v. co 8 h</span> LUB<br>   - <span class='dose-pill'>Piperacylina z tazobaktamem 4,5 g i.v. co 8 h</span>.<br>3. Resuscytacja płynowa: <span class='dose-pill'>Płyn wieloelektrolitowy (PWE) 20-30 ml/kg i.v.</span> w celu uzupełnienia 'trzeciej przestrzeni'.<br>4. Analgezja parenteralna: <span class='dose-pill'>Morfina 5-10 mg s.c./i.v.</span> lub buprenorfina.",
    procedures: "1. Natychmiastowe założenie zgłębnika żołądkowego (sondy) i odessanie treści żołądkowej celem minimalizacji dalszego wycieku do otrzewnej.<br>2. Założenie cewnika moczowego (kontrola diurezy godzinowej).<br>3. Pilna laparotomia lub laparoskopia z pierwotnym zeszyciem otworu perforacyjnego szwami pojedynczymi i pokryciem uszypułowanym płatem sieci większej (łata Grahama / omentoplastyka).<br>4. Płukanie jamy otrzewnej dużą objętością (5-10 litrów) ciepłej soli fizjologicznej i pozostawienie drenażu grawitacyjnego.",
    monitoring: "1. Ścisły reżim NPO do czasu powrotu perystaltyki jelitowej i usunięcia sondy żołądkowej (zwykle 2-4 doba).<br>2. Kontrola wskaźników zapalnych (spadek leukocytozy i CRP), parametrów nerkowych i bilansu płynów.<br>3. Obserwacja treści drenów otrzewnowych w poszukiwaniu żółci lub treści pokarmowej (nieszczelność zeszycia).<br>4. Po zagojeniu: diagnostyka zakażenia Helicobacter pylori i obligatoryjna eradykacja (terapia poczwórna z bizmutem przez 14 dni) oraz kontrolna gastroskopia po 6-8 tygodniach."
  },
  lekQuestions: [
    {
      question: "Nagły, niezwykle silny ból brzucha porównywany przez chorego do 'uderzenia nożem' w nadbrzuszu, z towarzyszącym 'brzuchem deskowatym' i zanikiem stłumienia wątrobowego, jest patognomoniczny dla:",
      options: [
        "Perforacji wrzodu trawiennego żołądka lub dwunastnicy",
        "Ostrego kamiczego zapalenia pęcherzyka żółciowego",
        "Niepowikłanej kolki nerkowej",
        "Zespołu jelita drażliwego (IBS)",
        "Wrzodziejącego zapalenia jelita grubego w stadium remisji"
      ],
      correct: 0,
      expl: "Piorunujący ból brzucha o charakterze 'ciosu nożem', połączony z mimowolną obroną mięśniową całego brzucha ('brzuch deskowaty') oraz zanikiem stłumienia wątrobowego w opukiwaniu to klasyczny obraz perforacji wrzodu trawiennego do wolnej jamy otrzewnej z następowym chemicznym zapaleniem otrzewnej."
    },
    {
      question: "Które z poniższych badań jest BEZWZGLĘDNIE PRZECIWWSKAZANE u pacjenta z podejrzeniem perforacji wrzodu trawiennego do jamy otrzewnej?",
      options: [
        "Gastroskopia oraz doustne badanie kontrastowe z siarczanem baru",
        "Przeglądowe RTG klatki piersiowej w pozycji stojącej",
        "Tomografia komputerowa jamy brzusznej z kontrastem dożylnym",
        "Ultrasonografia jamy brzusznej przy łóżku chorego",
        "Badanie stężenia amylazy i lipazy w surowicy krwi"
      ],
      correct: 0,
      expl: "Zarówno gastroskopia (insuflacja powietrza do żołądka wtłacza gaz i treść do otrzewnej powiększając perforację), jak i doustny wlew zawiesiny siarczanu baru (baryt w jamie otrzewnej wywołuje nieodwracalne, śmiertelne ziarniniakowe zapalenie otrzewnej) są bezwzględnie przeciwwskazane przy podejrzeniu przedziurawienia przewodu pokarmowego."
    },
    {
      question: "Zanik stłumienia wątrobowego w badaniu fizykalnym u pacjenta z ostrym brzuchem wynika z:",
      options: [
        "Obecności wolnego gazu w jamie otrzewnej (pneumoperitoneum) gromadzącego się pomiędzy wątrobą a ścianą klatki piersiowej",
        "Ostrego zaniku miąższu wątroby w przebiegu marskości",
        "Wypchnięcia wątroby do klatki piersiowej przez przepuklinę przeponową",
        "Masywnego powiększenia pęcherza moczowego",
        "Zatkania żyły wrotnej przez skrzeplinę"
      ],
      correct: 0,
      expl: "Fizjologicznie opukiwanie przestrzeni międzyżebrowych nad wątrobą daje odgłos stłumiony. W przypadku perforacji narządu drążonego wolny gaz unosi się ku górze i gromadzi się pod kopułą przepony i przed przednią powierzchnią wątroby, zastępując stłumienie odgłosem bębenkowym (tzw. objaw zaniku stłumienia wątrobowego)."
    },
    {
      question: "Klasyczna metoda chirurgicznego zaopatrzenia przedziurawionego wrzodu opuszki dwunastnicy polega na:",
      options: [
        "Zszyciu otworu perforacyjnego szwami pojedynczymi i pokryciu uszypułowanym płatem sieci większej (łata Grahama)",
        "Całkowitym wycięciu żołądka z zespoleniem Roux-en-Y",
        "Założeniu opaski uciskowej na odźwiernik",
        "Wycięciu całej dwunastnicy z głową trzustki (operacja Whipple'a)",
        "Pozostawieniu drenu w otworze bez szycia ściany narządu"
      ],
      correct: 0,
      expl: "Standardem leczenia chirurgicznego perforacji wrzodu trawiennego jest technika Grahama (omentoplastyka) – otwór perforacyjny zostaje zamknięty szwami pojedynczymi, a linia szycia jest pokryta i wzmocniona uszypułowanym fragmentem bogato unaczynionej sieci większej, co zapobiega nieszczelności w zmienionej zapalnie tkance."
    },
    {
      question: "Wrzody przedniej ściany dwunastnicy najczęściej powikłane są perforacją do otrzewnej, natomiast wrzody tylnej ściany opuszki dwunastnicy typowo powikłane są:",
      options: [
        "Masywnym krwawieniem z przewodu pokarmowego wskutek nadżarcia tętnicy żołądkowo-dwunastniczej (GDA) lub drążeniem do trzustki",
        "Zatorowością tętnicy krezkowej górnej",
        "Perforacją do lewej komory serca",
        "Przetoką żołądkowo-oskrzelową",
        "Pęknięciem śledziony"
      ],
      correct: 0,
      expl: "Anatomicznie przednia ściana dwunastnicy graniczy z wolną jamą otrzewnej (dlatego pęka do otrzewnej dając odmę), natomiast tylna ściana opuszki dwunastnicy bezpośrednio przylega do głowy trzustki oraz przebiegającej tam tętnicy żołądkowo-dwunastniczej (a. gastroduodenalis – GDA). Wrzód tylnej ściany niszczy ścianę tętnicy, wywołując masywny, zagrażający życiu krwotok tętniczy lub drąży do miąższu trzustki."
    },
    {
      question: "W jaki sposób niesteroidowe leki przeciwzapalne (NLPZ, np. ketoprofen) indukują powstawanie i pękanie wrzodów trawiennych?",
      options: [
        "Poprzez układowe hamowanie enzymu COX-1, co prowadzi do niedoboru prostaglandyn (PGE2 i PGI2) chroniących błonę śluzową żołądka i dwunastnicy",
        "Przez bezpośrednie podwyższanie pH soku żołądkowego do wartości zasadowych",
        "Przez niszczenie komórek okładzinowych produkujących kwas solny",
        "Poprzez wywoływanie zakrzepicy żyły śledzionowej",
        "NLPZ nie mają żadnego wpływu na powstawanie wrzodów żołądka"
      ],
      correct: 0,
      expl: "Enzym COX-1 odpowiada za syntezę endogennych prostaglandyn (PGE2, prostacyklina), które stymulują wydzielanie śluzu i dwuwęglanów, hamują wydzielanie kwasu solnego i zapewniają mikrokrażenie śluzówkowe. Hamowanie COX-1 przez NLPZ pozbawia błonę śluzową mechanizmów obronnych, co prowadzi do owrzodzeń trawiennych i ich powikłań (krwawienia, perforacje)."
    },
    {
      question: "Pojawienie się tzw. 'fazy pozornej poprawy' (fazy cichej) po 6-12 godzinach od perforacji wrzodu trawiennego wynika z:",
      options: [
        "Rozcieńczenia kwaśnej treści żołądkowej przez obfity wysięk surowiczy z otrzewnej, co przejściowo zmniejsza stymulację chemiczną nocyceptorów",
        "Samoistnego zarośnięcia otworu perforacyjnego bez konieczności leczenia",
        "Całkowitego wyleczenia zapalenia otrzewnej przez mechanizmy komórkowe",
        "Gwałtownego spadku leukocytozy i braku stanu zapalnego",
        "Wydzielenia olbrzymich dawek endorfin całkowicie eliminujących chorobę"
      ],
      correct: 0,
      expl: "W przebiegu perforacji wrzodu po początkowym potwornym bólu (faza chemiczna) po kilku godzinach dochodzi do fazy pozornej ulgi: wydzielający się obficie wysięk otrzewnowy neutralizuje i rozcieńcza kwas solny, co chwilowo łagodzi ból. Jest to jednak zjawisko zwodnicze – wkrótce rozwija się bakteryjne zapalenie otrzewnej i wstrząs septyczny."
    },
    {
      question: "Obecność objawu Riglera na przeglądowym zdjęciu rentgenowskim jamy brzusznej wykonanym w pozycji leżącej polega na:",
      options: [
        "Widoczności ściany jelita z obu stron (zarówno od strony światła, jak i od strony jamy otrzewnej) wskutek obecności gazu wewnątrz i na zewnątrz jelita",
        "Obecności poziomej linii płynu w żołądku",
        "Zwapnieniu ściany pęcherzyka żółciowego (pęcherzyk porcelanowy)",
        "Poszerzeniu pętli esicy w kształcie ziarna kawy",
        "Obecności zębów w jamie miednicy mniejszej"
      ],
      correct: 0,
      expl: "Objaw Riglera (tzw. objaw podwójnej ściany) jest radiologicznym objawem odmy otrzewnowej (pneumoperitoneum) widocznym na RTG jamy brzusznej na leżąco na wznak. Gdy gaz znajduje się zarówno wewnątrz światła pętli jelitowej, jak i na zewnątrz niej w wolnej jamie otrzewnej, ściana jelita staje się wyraźnie zarysowana z obu stron."
    },
    {
      question: "U pacjenta po udanym operacyjnym zaopatrzeniu perforacji wrzodu trawiennego bezwzględnym standardem farmakologicznym zapobiegającym nawrotowi jest:",
      options: [
        "Diagnostyka i eradykacja zakażenia Helicobacter pylori, kontynuacja terapii IPP przez 6-8 tygodni oraz unikanie klasycznych NLPZ",
        "Przewlekłe przyjmowanie kwasu acetylosalicylowego w dawce 1 g dziennie",
        "Dożywotnie stosowanie diety wyłącznie płynnej bez węglowodanów",
        "Okresowe przetoczenia osocza świeżo mrożonego",
        "Podawanie leków rozkurczowych przed każdym posiłkiem"
      ],
      correct: 0,
      expl: "Operacja zamyka przedziurawienie, ale nie eliminuje przyczyny choroby wrzodowej. Większość wrzodów wywołana jest zakażeniem H. pylori lub NLPZ. Standardem postępowania pooperacyjnego jest obligatoryjne zbadanie i eradykacja H. pylori, kilkutygodniowa kuracja IPP oraz wyeliminowanie leków z grupy NLPZ."
    },
    {
      question: "Wskaż najczęstsze anatomiczne umiejscowienie wrzodu trawiennego ulegającego przedziurawieniu (perforacji):",
      options: [
        "Przednia ściana opuszki dwunastnicy",
        "Dno żołądka",
        "Tylna ściana trzonu żołądka",
        "Część zstępująca dwunastnicy poniżej brodawki Vatera",
        "Dolna 1/3 przełyku"
      ],
      correct: 0,
      expl: "Ponad 60% wszystkich perforacji wrzodowych lokalizuje się na przedniej ścianie opuszki dwunastnicy (bulbus duodeni). Kolejną częstą lokalizacją jest przednia ściana odźwiernika i krzywizny mniejszej żołądka. Wynika to z faktu, że przednia ściana dwunastnicy jest słabo unaczyniona w porównaniu z tylną i bezpośrednio graniczy z jamą otrzewnej."
    },
    {
      question: "Jakie postępowanie w zakresie leczenia przeciwbólowego jest prawidłowe u pacjenta z podejrzeniem perforacji wrzodu i rozlanego zapalenia otrzewnej na SOR przed operacją?",
      options: [
        "Należy wdrożyć skuteczną analgezję parenteralną (np. paracetamol i.v. oraz miareczkowane opioidy i.v.), gdyż łagodzenie cierpienia nie opóźnia ani nie utrudnia podjęcia decyzji o pilnej operacji",
        "Bezwzględnie zakazuje się podawania jakichkolwiek leków przeciwbólowych aż do nacięcia powłok na bloku",
        "Należy podać wyłącznie znieczulenie miejscowe powłok lignokainą",
        "Podaje się doustnie wysokie dawki ibuprofenu",
        "Leki przeciwbólowe wolno podać dopiero w 3. dobie pooperacyjnej"
      ],
      correct: 0,
      expl: "Zgodnie z aktualną wiedzą medyczną (EBM) i wytycznymi chirurgicznymi pacjent z ostrym brzuchem i zapaleniem otrzewnej ma prawo do natychmiastowej i skutecznej analgezji. Podanie dożylnych leków przeciwbólowych (w tym opioidów, np. morfiny) nie zaciera obrazu otrzewnowego w stopniu uniemożliwiającym podjęcie decyzji o laparotomii, a redukuje wstrząs bólowy."
    }
  ],
  flashcards: [
    {
      front: "Wymień triadę objawów klinicznych perforacji wrzodu trawiennego do jamy otrzewnej.",
      back: "1. Nagły, piorunujący ból brzucha jak 'uderzenie nożem' w nadbrzuszu\n2. 'Brzuch deskowaty' (skrajna, mimowolna obrona mięśniowa całego brzucha)\n3. Zanik stłumienia wątrobowego w opukiwaniu + martwa cisza osłuchowa."
    },
    {
      front: "Jakie badanie obrazowe jest badaniem pierwszego rzutu w perforacji wrzodu i co uwidacznia?",
      back: "Przeglądowe RTG klatki piersiowej lub brzucha w pozycji stojącej – uwidacznia 'sierp wolnego powietrza' pod kopułami przepony (pneumoperitoneum / odmę otrzewnową)."
    },
    {
      front: "Jakie 2 procedury diagnostyczne są BEZWZGLĘDNIE PRZECIWWSKAZANE w perforacji wrzodu?",
      back: "1. Gastroskopia (wdmuchiwanie powietrza powiększa otwór i wtłacza litry gazu i treści do otrzewnej)\n2. Doustny kontrast barytowy (siarczan baru wywołuje śmiertelne, ziarniniakowe zapalenie otrzewnej)."
    },
    {
      front: "Na czym polega chirurgiczne zaopatrzenie perforacji wrzodu metodą Grahama (łata Grahama)?",
      back: "Zszycie otworu perforacyjnego szwami pojedynczymi i pokrycie linii szwów uszypułowanym płatem sieci większej (omentoplastyka) + obfite płukanie otrzewnej solą fizjologiczną."
    },
    {
      front: "Czym różni się powikłanie wrzodu przedniej ściany dwunastnicy od wrzodu tylnej ściany?",
      back: "Przednia ściana: PERFORACJA do wolnej jamy otrzewnej z zapaleniem otrzewnej i odmą.\nTylna ściana: MASYWNY KRWOTOK tętniczy z tętnicy żołądkowo-dwunastniczej (GDA) lub penetracja do trzustki."
    },
    {
      front: "W jaki sposób NLPZ wywołują owrzodzenia i perforacje przewodu pokarmowego?",
      back: "Hamują enzym COX-1, blokując syntezę cytoprotekcyjnych prostaglandyn (PGE2, PGI2). Powoduje to zanik śluzu i dwuwęglanów oraz niedokrwienie śluzówki pod wpływem kwasu solnego."
    }
  ]
};

// Mirror fields for schema compatibility
case129.steps.forEach(step => {
  step.question = step.title;
  step.explanation = step.feedback;
});
case129.lekQuestions.forEach(q => {
  q.opts = q.options;
  q.correctIdx = q.correct;
  q.exp = q.expl;
});

saveCase(case129);

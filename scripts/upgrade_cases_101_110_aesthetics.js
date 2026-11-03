const fs = require('fs');
const crypto = require('crypto');

async function deriveAesKey(password, salt) {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

async function decrypt(data, password) {
  const salt = Buffer.from(data.salt, 'base64');
  const iv = Buffer.from(data.iv, 'base64');
  const key = await deriveAesKey(password, salt);
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, Buffer.from(data.ciphertext, 'base64'));
  return JSON.parse(new TextDecoder().decode(decrypted));
}

async function encrypt(obj, password) {
  const plainText = JSON.stringify(obj);
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  const key = await deriveAesKey(password, salt);
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    new TextEncoder().encode(plainText)
  );
  return {
    encrypted: true,
    salt: salt.toString('base64'),
    iv: iv.toString('base64'),
    ciphertext: Buffer.from(ciphertext).toString('base64')
  };
}

const UPGRADES = {
  101: {
    story: `<p><strong>Pacjent:</strong> 18-miesięczny Staś (masa ciała 9,1 kg, <3. centyla) zgłasza się z rodzicami do Poradni Gastroenterologii Dziecięcej z powodu postępującego braku łaknienia, zahamowania rozwoju fizycznego oraz zmiany charakteru stolców.</p><p><strong>Wywiad chorobowy:</strong> Dziecko od około 6–7 miesięcy stopniowo traci apetyt, stało się drażliwe, apatyczne i płaczliwe. W 9. miesiącu życia masa ciała znajdowała się na 50. centylu, obecnie spadła poniżej 3. centyla ('wypadnięcie z siatek centylowych'). Stolce oddawane są 3–5 razy na dobę, są bardzo obfite, błyszczące, blade, o wybitnie gnilnym zapachu i trudne do zmycia z nocnika. W wywiadzie żywieniowym: gluten (kaszka manna) wprowadzono w 7. miesiącu życia.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Widoczne cechy znacznego niedożywienia: bladość powłok skórnych i spojówek, suchość naskórka, cienkie i łamliwe włosy. Klatka piersiowa szczupła z wyraźnym zarysem żeber, brzuch dysproporcjonalnie duży, wzdęty, bębenkowy ('brzuch żabi'). Na pośladkach widoczny jest niemal całkowity zanik tkanki tłuszczowej i podskórnej z obwisłymi fałdami wiotkiej skóry ('objaw wiszących portek'). Rozwój psychomotoryczny dotychczas harmonijny.</p>`,
    vitals: [
      { label: "Masa ciała", val: "9,1 kg (<3. pc)", sub: "Ubytek z 50. centyla (wyniszczenie)", status: "vital-crit" },
      { label: "Brzuch / Skóra", val: "Żabi brzuch | Wiszące portki", sub: "Atrofia mięśniowa pośladków", status: "vital-crit" },
      { label: "Wzrost", val: "77 cm (10. pc)", sub: "Spłaszczenie krzywej wzrastania", status: "vital-warn" },
      { label: "HR / Temp", val: "108/min | 36,7°C", sub: "Parametry krążeniowo-oddechowe stabilne", status: "vital-ok" }
    ],
    diffTitle: "⚔️ Tabela Różnicowa: Celiakia vs Mukowiscydoza vs Alergia na białka mleka krowiego (ABMK) vs Giardioza",
    dutySummary: {
      overview: "Celiakia (choroba trzewna) jest ogólnoustrojową chorobą autoimmunologiczną wyzwalaną spożyciem glutenu (pszenica, żyto, jęczmień) u osób predysponowanych genetycznie (HLA-DQ2 lub HLA-DQ8). Charakteryzuje się enteropatią z atrofią kosmków jelitowych, obecnością autoprzeciwciał (anty-tTG IgA, EMA IgA) oraz szerokim spektrum manifestacji (od klasycznej triady złego wchłaniania u niemowląt po izolowaną anemię, afty czy osteoporozę u dorosłych).",
      diagnostics: "1) <strong>Badanie I rzutu</strong>: jednoczesne oznaczenie <span class='dose-pill'>anty-tTG IgA</span> + całkowite stężenie <span class='dose-pill'>IgA</span> w surowicy (wykluczenie wrodzonego selektywnego niedoboru IgA!).<br>2) <strong>Ścieżka bezbiopsyjna ESPGHAN 2020</strong>: przy prawidłowym IgA i mianie <span class='dose-pill'>anty-tTG IgA ≥10× GGN</span> pobierz drugą próbkę krwi na <span class='dose-pill'>EMA IgA</span>. Jeśli EMA(+) -> pewne rozpoznanie celiakii <strong>BEZ biopsji dwunastnicy i BEZ badania HLA</strong>!<br>3) <strong>Gdy anty-tTG <10× GGN</strong>: konieczna gastroskopia z pobraniem min. 4 wycinków z dwunastnicy zstępującej i 1 z opuszki (klasyfikacja Marsha 1–3).<br>4) <strong>Przy niedoborze IgA (<0,2 g/l)</strong>: oznacz przeciwciała w klasie IgG: <span class='dose-pill'>anty-tTG IgG</span> lub <span class='dose-pill'>anty-DGP IgG</span>.<br>5) Badanie genetyczne <span class='dose-pill'>HLA-DQ2/DQ8</span> ma ujemną wartość predykcyjną bliską 100% (służy wyłącznie do wykluczenia).",
      drugsAndDoses: "1) <strong>Dieta bezglutenowa (GFD)</strong>: jedyne leczenie przyczynowe na całe życie (<span class='dose-pill'>próg <20 ppm glutenu</span>; bezwzględna eliminacja pszenicy, żyta i jęczmienia).<br>2) <strong>Żelazo elementarne</strong>: <span class='dose-pill'>3–6 mg Fe/kg m.c./dobę p.o.</span> w 2–3 dawkach podzielonych między posiłkami przez min. 3 miesiące.<br>3) <strong>Witamina D3 (cholekalcyferol)</strong>: <span class='dose-pill'>1000–2000 IU/dobę p.o.</span> zależnie od stężenia 25(OH)D.<br>4) <strong>Kwas foliowy</strong>: <span class='dose-pill'>1–5 mg/dobę p.o.</span> przez pierwsze 1–2 miesiące.<br>5) <strong>Wapń elementarny</strong>: <span class='dose-pill'>500–1000 mg/dobę p.o.</span> w razie cech hipokalcemii / osteopenii.",
      procedures: "Konsultacja wykwalifikowanego dietetyka klinicznego; nauka czytania etykiet (symbol Przekreślonego Kłosa) i prewencji zanieczyszczeń krzyżowych w kuchni; u dzieci z mianem <10× GGN – wykonanie ezofagogastroduodenoskopii w sedacji z wielomiejscową biopsją opuszki i części zstępującej dwunastnicy.",
      monitoring: "Kontrola kliniczna (masa ciała, wzrost na siatkach centylowych, obwód brzucha) co 3–6 miesięcy w 1. roku leczenia; kontrola serologiczna <span class='dose-pill'>anty-tTG IgA</span> po 6 i 12 miesiącach od wdrożenia diety (spadek miana potwierdza adherencję do diety); badania przesiewowe u wszystkich krewnych I stopnia oraz coroczny screening w grupach ryzyka (cukrzyca typu 1, choroba Hashimoto, zespół Downa, zespół Turnera)."
    }
  },
  102: {
    story: `<p><strong>Pacjentka:</strong> 3-miesięczna Zuzia przywieziona przez matkę do Poradni Pediatrycznej z powodu bolesnych skurczów brzucha, ulewań oraz pojawienia się krwi w stolcu.</p><p><strong>Wywiad chorobowy:</strong> Dziewczynka karmiona wyłącznie piersią do 10. tygodnia życia. Z powodu hipogalaktii u matki wprowadzono dokarmianie standardową mieszanką mleka początkowego. W ciągu 10 dni od wprowadzenia mieszanki pojawiły się gwałtowne dolegliwości: niemowlę pręży się i przeraźliwie płacze podczas i po karmieniu, obficie ulewa, cierpi na bolesne wzdęcia i 'kolki' trwające po kilka godzin dziennie. Stolce zmieniły charakter – luźne, 'strzelające', ze śluzem, a od 3 dni matka obserwuje pasma i kropelki świeżej krwi.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Na policzkach widoczny lśniący, sączący rumień ('lakierowane policzki'), łuszczące się zmiany w zgięciach łokciowych i za uszami (AZS) oraz nasilona ciemieniucha. Brzuch nieco wzdęty, bolesny w rzucie okrężnicy, bez oporów patologicznych i objawów otrzewnowych. Odbyt bez cech szczeliny ani przetoki, skóra krocza z odparzeniem rumieniowym.</p>`,
    vitals: [
      { label: "Stolec / Krew", val: "6–8/d | Pasma krwi", sub: "Alergiczne zapalenie prostnicy (FPIAP)", status: "vital-crit" },
      { label: "Skóra / AZS", val: "Lakierowane policzki", sub: "Sączący rumień i ciemieniucha", status: "vital-warn" },
      { label: "Masa ciała", val: "5,4 kg (25. pc)", sub: "Spadek z 50. centyla (zahamowanie przyrostu)", status: "vital-warn" },
      { label: "HR / Temp", val: "128/min | 36,8°C", sub: "Czynność serca i ciepłota w normie", status: "vital-ok" }
    ],
    diffTitle: "⚔️ Tabela Różnicowa: Alergia na białka mleka krowiego (ABMK) vs Wgłobienie jelita vs Szczelina odbytu vs Nietolerancja laktozy",
    dutySummary: {
      overview: "Alergia na białka mleka krowiego (ABMK / CMPA) jest najczęstszą alergią pokarmową wieku niemowlęcego (2–3% populacji). Dzieli się na postać IgE-zależną (natychmiastowe objawy skórne i oddechowe, groźba anafilaksji) oraz IgE-niezależną (opóźnione objawy przewodu pokarmowego: FPIAP – zapalenie prostnicy i okrężnicy, FPIES – zespół enterokolopatii wywołany białkami pokarmowymi). U 80–90% dzieci samoistna tolerancja wykształca się do 3.–5. roku życia.",
      diagnostics: "1) <strong>Złoty standard</strong>: próba eliminacji i prowokacji (ustąpienie objawów po wdrożeniu diety bezmlecznej na 2–4 tygodnie i ich nawrót po ponownym podaniu białek mleka krowiego).<br>2) <strong>Morfologia z rozmazem</strong>: cechy eozynofilii, mierna niedokrwistość mikrocytarna.<br>3) <strong>Badanie kału</strong>: obecność erytrocytów, leukocytów, brak patogenów bakteryjnych i pasożytów, kalprotektyna w kale podwyższona.<br>4) <strong>Testy alergologiczne</strong>: swoiste sIgE w surowicy oraz punktowe testy skórne (SPT) są dodatnie w postaci IgE-zależnej, lecz <strong>UJEMNE</strong> w postaci żołądkowo-jelitowej FPIAP/FPIES (postać komórkowa!).",
      drugsAndDoses: "1) <strong>Mieszanka o znacznym stopniu hydrolizy (eHF)</strong>: preparat I wyboru (<span class='dose-pill'>hydrolizat kazeiny lub serwatki</span>) przez minimum 6 miesięcy lub do ukończenia 9.–12. miesiąca życia.<br>2) <strong>Mieszanka elementarna (AAF)</strong>: syntetyczne wolne aminokwasy (<span class='dose-pill'>AAF p.o.</span>) w przypadku braku poprawy po eHF, ciężkiej anafilaksji lub FPIES ze wstrząsem.<br>3) <strong>Dieta eliminacyjna u matki karmiącej</strong>: całkowite wykluczenie nabiału z suplementacją wapnia <span class='dose-pill'>1000 mg/dobę p.o.</span> i witaminy D3 <span class='dose-pill'>800–1000 IU/d</span>.<br>4) <strong>Preparaty żelaza elementarnego</strong>: <span class='dose-pill'>2–3 mg Fe/kg m.c./dobę p.o.</span> przy anemizacji z mikroskopowego krwawienia.<br>5) <strong>Miejscowe GKS na AZS</strong>: Hydrokortyzon 1% krem <span class='dose-pill'>1–2×/dobę przez max 5–7 dni</span>.",
      procedures: "Edukacja rodziców w zakresie bezwzględnego unikania ukrytych źródeł białek serwatkowych i kazeiny w żywności przetworzonej; w postaci IgE-zależnej z wywiadem anafilaksji – zaopatrzenie w autowstrzykiwacz z adrenaliną.",
      monitoring: "Ocena krzywej wzrastania (masa i długość ciała na siatkach centylowych) co 4–6 tygodni; próba prowokacji diagnostycznej pod nadzorem lekarskim po 6–12 miesiącach leczenia dietetycznego w celu weryfikacji nabycia tolerancji immunologicznej."
    }
  },
  103: {
    story: `<p><strong>Pacjent:</strong> 7-letni Bartek przywieziony przez rodziców na SOR Dziecięcy z powodu silnego bólu brzucha, nudności, dwukrotnych wymiotów i gorączki do 38,4°C.</p><p><strong>Wywiad chorobowy:</strong> Dolegliwości zaczęły się około 18 godzin wcześniej: początkowo tępy, rozlany ból w okolicy okołopępkowej i nadbrzuszu, połączony z całkowitą utratą apetytu (jadłowstręt – 'objaw hamburgera'). W ciągu ostatnich 6 godzin ból wyraźnie przemieścił się do prawego dołu biodrowego i zmienił charakter na ostry, nasilający się przy każdym kroku, kaszlu i wstrząsach w samochodzie.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Chłopiec leży z podkurczoną prawą kończyną dolną, porusza się z trudem pochylony ku przodowi. W badaniu jamy brzusznej: wyraźna obrona mięśniowa i bolesność uciskowa w punkcie McBurneya oraz w punkcie Lanza. Dodatni objaw Blumberga, dodatni objaw Rovsinga, dodatni bolesny objaw Jaworskiego (podrażnienie m. biodrowo-lędźwiowego) oraz dodatni objaw kaszlowy. Perystaltyka jelitowa leniwa, osłabiona.</p>`,
    vitals: [
      { label: "Ból brzucha", val: "8/10 | Prawy dół", sub: "Punkt McBurneya | Objaw Blumberga (+)", status: "vital-crit" },
      { label: "Brzuch / Obrona", val: "Obrona mięśniowa (+)", sub: "Objaw Rovsinga i Jaworskiego (+)", status: "vital-crit" },
      { label: "Leukocytoza / CRP", val: "16,4 tys. | CRP 68", sub: "Leukocytoza z neutrofilią (84%)", status: "vital-warn" },
      { label: "Temp / HR", val: "38,4°C | 114/min", sub: "Gorączka i tachykardia odczynowa", status: "vital-warn" }
    ],
    diffTitle: "⚔️ Tabela Różnicowa: Ostre zapalenie wyrostka robaczkowego vs Zapalenie węzłów chłonnych krezki vs Zapalenie uchyłka Meckela vs Skręt jądra / przydatków",
    dutySummary: {
      overview: "Ostre zapalenie wyrostka robaczkowego (appendicitis acuta) jest najczęstszą przyczyną ostrego brzucha wymagającą interwencji chirurgicznej u dzieci. Klasyczna sekwencja Kocha obejmuje: jadłowstręt -> tępy ból okołopępkowy (trzewny) -> nudności/wymioty -> przemieszczenie bólu do prawego dołu biodrowego (somatyczny) -> gorączka. U małych dzieci ryzyko perforacji jest wyższe ze względu na cienką ścianę wyrostka i słabo rozwiniętą sieć większą.",
      diagnostics: "1) <strong>Badanie podmiotowe i przedmiotowe</strong>: triada objawów otrzewnowych (Blumberg, Rovsing, obrona mięśniowa) + objawy mięśniowe (Jaworski / psoas sign, obturator sign).<br>2) <strong>USG jamy brzusznej (metoda z wyboru)</strong>: niepodatny na ucisk wyrostek o średnicy <span class='dose-pill'>≥6 mm</span>, pogrubiała ściana, hiperechogeniczny naciek tłuszczowy, obecność kamienia kałowego (coprolith) lub płynu w jamie otrzewnej.<br>3) <strong>Morfologia z rozmazem</strong>: leukocytoza <span class='dose-pill'>15–20 tys./µl</span> z przesunięciem obrazu w lewo (neutrofilia).<br>4) <strong>Skala Alvarado / PAS (Pediatric Appendicitis Score)</strong>: stratyfikacja ryzyka kwalifikująca do pilnej operacji vs obserwacji.<br>5) <strong>Badanie ogólne moczu</strong>: wykluczenie ZUM (może wystąpić jałowy leukocytomocz z sąsiedztwa zapalnego).",
      drugsAndDoses: "1) <strong>Antybiotykoterapia okołozabiegowa i.v.</strong>:<br>• Cefuroksym <span class='dose-pill'>50 mg/kg m.c. i.v.</span> (max 1,5 g) + Metronidazol <span class='dose-pill'>10 mg/kg m.c. i.v.</span> (max 500 mg) podane 30–60 min przed nacięciem skóry.<br>2) <strong>Płynoterapia dożylna</strong>:<br>• Wyrównanie deficytu: 0,9% NaCl lub Plazmalyte <span class='dose-pill'>10–20 ml/kg m.c. w 1–2 h</span>, następnie płyn infuzyjny z 5% glukozą w dawce podtrzymującej wg reguły Hollidaya-Segara.<br>3) <strong>Leczenie przeciwbólowe</strong>:<br>• Paracetamol <span class='dose-pill'>15 mg/kg m.c. i.v.</span> co 6 h.<br>• Ibuprofen <span class='dose-pill'>10 mg/kg m.c. p.o./p.r.</span> (po wykluczeniu wskazań do natychmiastowej laparotomii).",
      procedures: "Pilna apendektomia laparoskopowa (lub klasyczna); ścisły reżim 'nic doustnie' (NPO); pobranie wymazu na posiew w przypadku perforacji lub obecności ropy w otrzewnej.",
      monitoring: "Monitorowanie parametrów życiowych (HR, BP, temp) co 2–4 h; kontrola powrotu perystaltyki jelitowej i tolerancji diety doustnej; obserwacja rany pooperacyjnej pod kątem ropienia lub zakażenia tkanek miękkich."
    }
  },
  104: {
    story: `<p><strong>Pacjent:</strong> 5-miesięczny Jaś przywieziony w trybie natychmiastowym przez ZRM do Czerwonego Obszaru SOR Dziecięcego z powodu gwałtownie narastających objawów wstrząsu, hipotermii i wybroczyn na skórze.</p><p><strong>Wywiad chorobowy:</strong> Dziecko było całkowicie zdrowe do wczorajszego wieczora. Nagle wystąpiła gorączka 39,8°C, wymioty 'chlustające' oraz skrajne rozdrażnienie przechodzące w apatię. W ciągu ostatnich 3 godzin na kończynach dolnych pojawiły się drobne, bordowe plamki, które w oczach rodziców powiększały się i zlewały w ciemnofioletowe wybroczyny.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Niemowlę w stanie krytycznym, podsypiające, reaguje jedynie jękiem na ból (GCS 8 pkt). Skóra chłodna, marmurkowata, czas nawrotu włośniczkowego (CRT) wynosi aż 5 sekund! Na tułowiu i kończynach obecne liczne, plamiste i gwiazdkowate wybroczyny krwotoczne (petechie i plamica), które NIE bledną pod uciskiem szklanki (dodatni test szklankowy!). Tętno na tętnicach obwodowych ledwo wyczuwalne, nitkowate. Ciemię przednie jest wyraźnie napięte i tętniące.</p>`,
    vitals: [
      { label: "Ciśnienie / CRT", val: "58/34 mmHg | CRT 5 s", sub: "Głęboki dekompensowany wstrząs septyczny!", status: "vital-crit" },
      { label: "Wykwity skórne", val: "Plamica (test szklanki +)", sub: "Zespół Waterhouse'a-Friderichsena (DIC)", status: "vital-crit" },
      { label: "Świadomość / Ciemię", val: "GCS 8 pkt | Napięte ciemię", sub: "Ciężkie zaburzenia OUN / ZOMR", status: "vital-crit" },
      { label: "Temp / HR", val: "35,8°C | 185/min", sub: "Hipotermia i skrajna tachykardia wstrząsowa", status: "vital-crit" }
    ],
    diffTitle: "⚔️ Tabela Różnicowa: Posocznica meningokokowa vs Plamica Henocha-Schönleina (IgAV) vs Małopłytkowość immunologiczna (ITP) vs Zespół wstrząsu toksycznego (TSS)",
    dutySummary: {
      overview: "Posocznica meningokokowa wywołana przez Neisseria meningitidis (najczęściej serogrupa B lub C) to piorunująca postać inwazyjnej choroby meningokokowej (IChM). Charakteryzuje się gwałtownym rozwojem wstrząsu septycznego z zespołem rozsianego wykrzepiania wewnątrznaczyniowego (DIC) i martwicą krwotoczną nadnerczy (zespół Waterhouse'a-Friderichsena). Śmiertelność w postaci piorunującej sięga 20–50% w ciągu kilkunastu godzin.",
      diagnostics: "1) <strong>Test szklankowy (glass test)</strong>: patognomoniczne wybroczyny plamicze nieblednące pod uciskiem.<br>2) <strong>Morfologia, koagulologia i gazometria CITO</strong>: małopłytkowość (<span class='dose-pill'>PLT <50 tys./µl</span>), wydłużenie PT/APTT, spadek fibrynogenu (<1,5 g/l), wysokie D-dimery (DIC), kwasica mleczanowa (<span class='dose-pill'>mleczany >4 mmol/l</span>).<br>3) <strong>Posiewy krwi i wymaz z wybroczyny</strong>: pobrać natychmiast, lecz <strong>BEZ opóźniania antybiotykoterapii</strong>.<br>4) <strong>Nakłucie lędźwiowe (LP)</strong>: <strong>BEZWZGLĘDNIE PRZECIWWSKAZANE</strong> w ostrej fazie wstrząsu, zaburzeniach krzepnięcia i cechach wzmożonego ICP!",
      drugsAndDoses: "1) <strong>Antybiotykoterapia empiryczna natychmiast</strong>:<br>• Ceftriakson <span class='dose-pill'>100 mg/kg m.c. i.v.</span> (max 4 g) w bolusie.<br>• lub Cefotaksym <span class='dose-pill'>50 mg/kg m.c. i.v.</span> (max 2 g co 6 h).<br>2) <strong>Płynoterapia resuscytacyjna</strong>:<br>• Zrównoważone krystaloidy <span class='dose-pill'>10–20 ml/kg m.c. w 10–20 min</span> powtarzane pod kontrolą objawów przeciążenia krążenia.<br>3) <strong>Wsparcie aminami katecholowymi</strong>:<br>• Noradrenalina <span class='dose-pill'>0,05–0,3 µg/kg/min</span> we wlewie ciągłym przy wstrząsie opornym na płyny.<br>4) <strong>Glikokortykosteroidy (substytucja nadnerczowa)</strong>:<br>• Hydrokortyzon <span class='dose-pill'>2–4 mg/kg m.c. i.v.</span> w podejrzeniu ostrej niedoczynności kory nadnerczy.<br>5) <strong>Deksametazon</strong>: <span class='dose-pill'>0,15 mg/kg m.c. i.v.</span> przed lub z 1. dawką antybiotyku w ZOMR.",
      procedures: "Dwa kaniule dożylne o dużym świetle lub natychmiastowe wkłucie doszpikowe (IO) przy braku dostępu w ciągu 60 sekund; intubacja i wentylacja mechaniczna w sedacji przy GCS ≤8; powiadomienie Państwowej Inspekcji Sanitarnej (Sanepid) w trybie natychmiastowym.",
      monitoring: "Ciągły monitoring kardiomonitorem, kapnografia, inwazyjny pomiar ciśnienia tętniczego (linia tętnicza), diureza godzinowa przez cewnik Foleya (cel ≥1 ml/kg/h); chemoprofilaktyka osób z kontaktu (Ryfampicyna, Ceftriakson lub Cyprofloksacyna)."
    }
  },
  105: {
    story: `<p><strong>Pacjent:</strong> 3-letni Jaś zgłasza się z rodzicami do Izby Przyjęć Oddziału Pediatrii z powodu narastających od tygodnia obrzęków powiek, moszny i podudzi oraz zmniejszenia ilości oddawanego moczu.</p><p><strong>Wywiad chorobowy:</strong> Przed 2 tygodniami chłopiec przebył łagodną infekcję górnych dróg oddechowych. Od 6 dni rodzice zauważyli ciastowate obrzęki powiek pojawiające się rano po przebudzeniu, które z czasem zaczęły obejmować podudzia, brzuch oraz mosznę. Mocz stał się pienisty, a jego dobowa objętość wyraźnie zmalała (oliguria). W ciągu 5 dni masa ciała dziecka wzrosła o 2,5 kg (z 14,0 kg do 16,5 kg) w wyniku zatrzymania wody.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Widoczne masywne, blade, symetryczne, ciastowate obrzęki wokół oczodołów, na grzbietach rąk i stóp oraz na goleniach (pozostawiające dołek po ucisku). Worek mosznowy powiększony, napięty, obrzęknięty. Brzuch powiększony, bębenkowy z wyraźnym stłumieniem w partiach bocznych i dodatnim objawem chełbotania (wodobrzusze – ascites). Osłuchowo szmer pęcherzykowy prawidłowy, akcja serca 105/min, ciśnienie tętnicze 98/62 mmHg (w granicach normy).</p>`,
    vitals: [
      { label: "Białkomocz / Mocz", val: "Pienisty | >50 mg/kg/d", sub: "Masywny selektywny białkomocz nerczycowy", status: "vital-crit" },
      { label: "Albumina / Obrzęki", val: "Albuminy 16 g/l | +2,5 kg", sub: "Ciężka hipoalbuminemia (<25 g/l) i uogólnione obrzęki", status: "vital-crit" },
      { label: "Lipidogram", val: "Cholesterol 460 mg/dl", sub: "Ciężka hipercholesterolemia kompensacyjna", status: "vital-warn" },
      { label: "BP / HR", val: "98/62 mmHg | 105/min", sub: "Ciśnienie w normie centylowej (brak cech KZN)", status: "vital-ok" }
    ],
    diffTitle: "⚔️ Tabela Różnicowa: Zespół nerczycowy (MCD) vs Ostre popaciorkowcowe KZN vs Niewydolność serca vs Obrzęk naczynioruchowy",
    dutySummary: {
      overview: "Zespół nerczycowy u dzieci najczęściej (85–90%) wynika z submikroskopowego kłębuszkowego zapalenia nerek (zmiany minimalnej – MCD). Definiowany jest przez tetradę: masywny białkomocz (>50 mg/kg m.c./dobę lub wskaźnik białko/kreatynina w moczu Up/cr >2 mg/mg), hipoalbuminemię (<25 g/l), uogólnione obrzęki oraz hiperlipidemię. U dzieci w wieku 1–10 lat bez cech nefrytycznych rozpoczyna się empiryczną sterydoterapię BEZ uprzedniej biopsji nerki.",
      diagnostics: "1) <strong>Badanie ogólne moczu i białkomocz dobowy</strong>: białkomocz <span class='dose-pill'>>50 mg/kg/d</span> lub UPCR <span class='dose-pill'>>2 mg/mg</span>; osad ubogi (brak wałeczków erytrocytowych).<br>2) <strong>Biochemia krwi</strong>: hipoalbuminemia (<span class='dose-pill'>albumina <25 g/l</span>), hipercholesterolemia (<span class='dose-pill'>cholesterol całkowity >200–500 mg/dl</span>), mocznik i kreatynina zwykle w normie.<br>3) <strong>Składowe dopełniacza (C3, C4)</strong>: w MCD stężenia C3 i C4 są <strong>PRAWIDŁOWE</strong> (obniżenie sugeruje toczeń lub MPGN!).<br>4) <strong>Próba tuberkulinowa / QuantiFERON</strong>: konieczna przed włączeniem wysokich dawek GKS.<br>5) <strong>USG nerek</strong>: nerki prawidłowe lub powiększone, o wzmożonej echogeniczności kory.",
      drugsAndDoses: "1) <strong>Glikokortykosteroidy (leczenie I rzutu)</strong>:<br>• Prednizon <span class='dose-pill'>60 mg/m² m.c./dobę</span> lub <span class='dose-pill'>2 mg/kg m.c./dobę p.o.</span> (max 60 mg/d) w dawce pojedynczej rano przez 4–6 tygodni, następnie redukcja do dawki alternującej <span class='dose-pill'>40 mg/m² co drugi dzień</span> przez kolejne 4–6 tygodni.<br>2) <strong>20% roztwór albuminy ludzkiej</strong>:<br>• <span class='dose-pill'>0,5–1,0 g/kg m.c. i.v.</span> we wlewie trwającym 2–4 h (wskazana przy hipowolemii objawowej, oligurii lub masywnym wodobrzuszu).<br>3) <strong>Furosemid</strong>:<br>• <span class='dose-pill'>1–2 mg/kg m.c. i.v.</span> podany pod koniec lub tuż po zakończeniu wlewu albuminy.<br>4) <strong>Inhibitor pompy protonowej (osłona)</strong>:<br>• Omeprazol <span class='dose-pill'>1 mg/kg m.c./d p.o.</span>.<br>5) <strong>Suplementacja</strong>:<br>• Wapń <span class='dose-pill'>500 mg/d</span> + Witamina D3 <span class='dose-pill'>1000 IU/d</span>.",
      procedures: "Ograniczenie podaży sodu w diecie (<2 g NaCl/dobę); restrykcja płynowa wyłącznie w fazie nasilonych obrzęków i oligurii; biopsja nerki zarezerwowana dla przypadków sterydooporności, wieku <1 r.ż. lub >12 r.ż., trwałego nadciśnienia lub hipokomplementemii.",
      monitoring: "Codzienny pomiar masy ciała rano na czczo; codzienne badanie paskowe moczu na obecność białka (remisja = brak białka w moczu przez 3 kolejne dni); pomiar ciśnienia tętniczego 2× dziennie; profilaktyka przeciwzakrzepowa przy albuminie <20 g/l."
    }
  },
  106: {
    story: `<p><strong>Pacjentka:</strong> 2,5-letnia Martynka przywieziona na SOR Dziecięcy z powodu narastającej bladości powłok, wybroczyn na skórze, żółtaczki oraz bezmoczu trwającego od 14 godzin.</p><p><strong>Wywiad chorobowy:</strong> Przed 6 dniami u dziewczynki wystąpiła ostra, wodnisto-śluzowa biegunka z kurczowymi bólami brzucha i stanem podgorączkowym. W 3. dobie stolce stały się obfite i niemal czysto krwiste. Lekarz POZ zlecił amoksycylinę z kwasem klawulanowym. Wczoraj biegunka ustąpiła, jednak dziecko stało się skrajnie senne, apatyczne, pożółkłe i 'blado-woskowe', a od nocy nie oddało ani kropli moczu. W wywiadzie: picie niepasteryzowanego mleka w gospodarstwie agroturystycznym.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Dziecko podsypiające, blade jak ściana, z zaznaczoną żółtaczką twardówek. Na przedramionach, podudziach i klatce piersiowej obecne drobne wybroczyny krwotoczne (petechie). Obrzęki wokół kostek i powiek. Brzuch wzdęty, nieco tkliwy rozlanie, bez objawów otrzewnowych. Oddech kwasiczy przyspieszony (RR 32/min). Ciśnienie tętnicze 124/82 mmHg (>99. centyla – nadciśnienie z przewodnienia). Diureza zerowa (anuria).</p>`,
    vitals: [
      { label: "Morfologia / Rozpad", val: "Hb 6,2 g/dl | PLT 28 tys.", sub: "Niedokrwistość MAHA + małopłytkowość ze zużycia", status: "vital-crit" },
      { label: "Nerki / Diureza", val: "Kreatynina 3,8 | Anuria 14 h", sub: "Ciężkie ostre uszkodzenie nerek (AKI 3)", status: "vital-crit" },
      { label: "Rozmaz krwi", val: "Schistocyty 4,8% (+++)", sub: "Mechaniczna fragmentacja erytrocytów w mikrozakrzepach", status: "vital-crit" },
      { label: "BP / Równowaga", val: "124/82 mmHg | pH 7,22", sub: "Nadciśnienie hiperwolemiczne i kwasica metaboliczna", status: "vital-warn" }
    ],
    diffTitle: "⚔️ Tabela Różnicowa: Typowy STEC-HUS vs Atypowy aHUS vs Zakrzepowa plamica małopłytkowa (TTP) vs DIC",
    dutySummary: {
      overview: "Typowy zespół hemolityczno-mocznicowy (STEC-HUS / D+ HUS) wywoływany jest przez bakterie wytwarzające toksynę Shiga (głównie E. coli O157:H7). Charakteryzuje się klasyczną triadą: mikroangiopatyczna niedokrwistość hemolityczna (MAHA z obecnością schistocytów), małopłytkowość ze zużycia oraz ostre uszkodzenie nerek (AKI). Podanie antybiotyków w fazie biegunki krwotocznej zwiększa uwalnianie toksyny Shiga i nasila ryzyko rozwoju HUS!",
      diagnostics: "1) <strong>Morfologia i rozmaz krwi obwodowej</strong>: ciężka anemia, małopłytkowość (<span class='dose-pill'>PLT <50 tys./µl</span>), obecność licznych <span class='dose-pill'>schistocytów (>1–2%)</span>.<br>2) <strong>Cechy hemolizy wewnątrznaczyniowej</strong>: ujemny bezpośredni test Coombsa (odczyn antyglobulinowy), podwyższona dehydrogenaza mleczanowa (<span class='dose-pill'>LDH >1000 IU/l</span>), spadek haptoglobiny (<0,1 g/l), hiperbilirubinemia pośrednia.<br>3) <strong>Parametry nerkowe</strong>: gwałtowny wzrost mocznika i kreatyniny, kwasica metaboliczna, hiperkaliemia.<br>4) <strong>Mikrobiologia kału</strong>: PCR w kierunku genów toksyny Shiga (stx1, stx2) lub posiew na agarze MacConkeya z sorbitolem (SMAC).",
      drugsAndDoses: "1) <strong>Przetoczenie ubogoleukocytarnego koncentratu krwinek czerwonych (ME-KKC)</strong>:<br>• <span class='dose-pill'>10–15 ml/kg m.c. powolny wlew</span> (wskazanie: Hb <6–7 g/dl z objawami niedotlenienia).<br>2) <strong>Bezwzględny ZAKAZ rutynowego przetaczania KKP</strong>:<br>• Płytki podaje się <strong>WYŁĄCZNIE przy zagrażającym życiu krwawieniu</strong> lub przed zabiegiem inwazyjnym (przetoczenie płytek nasila mikrozakrzepy!).<br>3) <strong>Bezwzględny ZAKAZ podawania antybiotyków</strong> i leków hamujących perystaltykę (loperamid).<br>4) <strong>Leczenie nadciśnienia tętniczego</strong>:<br>• Amlodypina <span class='dose-pill'>0,1–0,2 mg/kg m.c./dobę p.o.</span> lub Labetalol.<br>5) <strong>Leczenie nerkozastępcze</strong>:<br>• Dializoterapia otrzewnowa lub hemodializa w anurii, hiperkaliemii opornej na leczenie lub przewodnieniu.",
      procedures: "Ścisły bilans płynów co godzinę; w fazie anurii podaż płynów ograniczona do strat bezwzględnych (perspiratio insensibilis: 300–400 ml/m² m.c./d) + objętość wydalonego moczu i stolca; założenie cewnika do dializy otrzewnowej.",
      monitoring: "Kontrola jonogramu, gazometrii i morfologii co 6–12 h; ciągły pomiar ciśnienia tętniczego; ocena neurologiczna (ryzyko encefalopatii HUS i drgawek)."
    }
  },
  107: {
    story: `<p><strong>Pacjentka:</strong> 2-letnia Hania przywieziona przez Zespół Ratownictwa Medycznego na SOR Dziecięcy po nagłym napadzie drgawek w domu przy gorączce 39,6°C.</p><p><strong>Wywiad chorobowy:</strong> Dziewczynka od rana miała katar i stan podgorączkowy. Po południu temperatura gwałtownie skoczyła do 39,6°C. Około 25 minut temu u dziecka wystąpił nagły napad: utrata przytomności, zblednięcie, wygięcie ciała ku tyłowi (faza toniczna), a następnie symetryczne, rytmiczne drżenia wszystkich czterech kończyn ze ślinotokiem i sinicą wokół ust (faza kloniczna). Napad trwał około 2,5 minuty i ustąpił samoistnie przed przyjazdem karetki. Był to pierwszy taki epizod w życiu dziecka.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Dziewczynka podsypiająca w stanie ponapadowym (sen poresorpcyny), po kilkunastu minutach łatwo wybudza się, nawiązuje prawidłowy kontakt wzrokowy, płacze na widok lekarza, pije wodę. Temperatura ciała obniżona do 38,1°C po podaniu leku przeciwgorączkowego w karetce. W badaniu neurologicznym: symetryczne odruchy głębokie, brak jakichkolwiek ubytków ogniskowych, brak niedowładu Todda. Objawy oponowe ujemne. Otoskopia: przekrwiona, pogrubiała, zmatowiała błona bębenkowa ucha prawego z uwypukleniem (ostre zapalenie ucha środkowego – AOM).</p>`,
    vitals: [
      { label: "Napad drgawkowy", val: "Uogólniony (2,5 min)", sub: "Klasyczne drgawki gorączkowe proste (FS)", status: "vital-warn" },
      { label: "Stan neurologiczny", val: "Brak ubytków | GCS 15", sub: "Odruchy symetryczne, brak niedowładu Todda", status: "vital-ok" },
      { label: "Temperatura", val: "39,6°C → 38,1°C", sub: "Gwałtowny skok w przebiegu zapalenia ucha (AOM)", status: "vital-warn" },
      { label: "HR / SpO2", val: "122/min | SpO2 99%", sub: "Wydolność krążeniowo-oddechowa prawidłowa", status: "vital-ok" }
    ],
    diffTitle: "⚔️ Tabela Różnicowa: Drgawki gorączkowe proste vs Drgawki gorączkowe złożone vs ZOMR / Zapalenie mózgu vs Padaczka z gorączką",
    dutySummary: {
      overview: "Drgawki gorączkowe (febrile seizures) to najczęstsza postać zaburzeń napadowych u dzieci między 6. miesiącem a 5. rokiem życia (szczyt: 18. m.ż.). Postać prosta (80–85%) charakteryzuje się: napadem uogólnionym, czasem trwania <15 minut, pojedynczym epizodem w ciągu 24 godzin oraz brakiem ubytków neurologicznych ponapadowo. Drgawki gorączkowe proste NIE zwiększają ryzyka padaczki (ryzyko ~1–2% jak w populacji ogólnej) i NIE wymagają rutynowego EEG ani neuroobrazowania.",
      diagnostics: "1) <strong>Badanie przedmiotowe i neurologiczne</strong>: ocena objawów oponowych, napięcia ciemiączka, odruchów i symetrii ruchowej (wykluczenie niedowładu Todda).<br>2) <strong>Poszukiwanie ogniska infekcji</strong>: otoskopia (AOM), gardło (angina, herpangina), układ moczowy (ZUM), układ oddechowy.<br>3) <strong>Nakłucie lędźwiowe (LP)</strong>: bezwzględnie wskazane przy objawach oponowych, przedłużonym stanie ponapadowym, u niemowląt <6.–12. m.ż. lub dzieci wcześniej leczonych antybiotykiem (maskowanie ZOMR).<br>4) <strong>EEG i TK/MR głowy</strong>: <strong>NIE są wskazane</strong> w drgawkach gorączkowych prostych!",
      drugsAndDoses: "1) <strong>Przerwanie napadu trwającego >5 minut</strong>:<br>• Diazepam doodbytniczo <span class='dose-pill'>0,5 mg/kg m.c. p.r.</span> (wlewka) lub<br>• Midazolam na błonę śluzową policzka (bukalnie) <span class='dose-pill'>0,2–0,3 mg/kg m.c.</span>.<br>2) <strong>Leczenie przeciwgorączkowe (komfort dziecka)</strong>:<br>• Paracetamol <span class='dose-pill'>15 mg/kg m.c. p.o. / p.r.</span> co 4–6 h (max 60 mg/kg/d).<br>• Ibuprofen <span class='dose-pill'>10 mg/kg m.c. p.o.</span> co 8 h (max 30 mg/kg/d).<br>3) <strong>Leczenie przyczynowe (AOM)</strong>:<br>• Amoksycylina <span class='dose-pill'>90 mg/kg m.c./dobę p.o.</span> w 2 dawkach podzielonych przez 10 dni.<br>4) <strong>ZAKAZ przewlekłego stosowania leków przeciwpadaczkowych</strong> w drgawkach prostych.",
      procedures: "Zapewnienie drożności dróg oddechowych, ułożenie w pozycji bezpiecznej na boku, ochrona głowy przed urazem; edukacja rodziców w zakresie postępowania podczas ewentualnego kolejnego napadu w domu; zaopatrzenie w ampułkostrzykawkę z wlewką diazepamu.",
      monitoring: "Obserwacja na oddziale/SOR przez 4–6 godzin do pełnego powrotu logicznego kontaktu i ustąpienia gorączki; wypis do domu przy stabilnym stanie klinicznym."
    }
  },
  108: {
    story: `<p><strong>Pacjent:</strong> 7-letni Bartek zgłasza się z rodzicami do Izby Przyjęć Pediatrycznej z powodu ciemnego moczu 'o barwie coli / popłuczyn mięsnych', obrzęków powiek i twarzy oraz bólów głowy.</p><p><strong>Wywiad chorobowy:</strong> Dokładnie 2,5 tygodnia temu chłopiec przebył ciężką anginę paciorkowcową (ostre zapalenie gardła i migdałków z nalotami i gorączką 39°C), leczoną amoksycyliną przez zaledwie 3 dni z powodu samoistnej poprawy. Od wczoraj rodzice zauważyli obrzęk powiek (zwłaszcza po nocy) oraz zmianę zabarwienia moczu na ciemnobrązowy, herbaciany. Chłopiec skarży się na ból głowy i uczucie zmęczenia.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Widoczne umiarkowane, ciastowate obrzęki powiek i twarzy oraz mierne obrzęki ciastowate wokół kostek. Gardło blade, migdałki bez ostrych zmian zapalnych, węzły chłonne podżuchwowe miernie powiększone. W badaniu układu krążenia: tony serca czyste, akcja serca 88/min, ciśnienie tętnicze wynosi 138/90 mmHg (>99. centyla + 5 mmHg – wyraźne nadciśnienie tętnicze II stopnia!). Brzuch miękki, bez bolesności, objaw Goldflama obustronnie ujemny.</p>`,
    vitals: [
      { label: "Ciśnienie tętnicze", val: "138/90 mmHg (>99. pc)", sub: "Nadciśnienie tętnicze hiperwolemiczne z oligurią", status: "vital-crit" },
      { label: "Mocz / Krwinkomocz", val: "Barwa herbaty/coli", sub: "Erytrocyty wyługowane i wałeczki czerwonokrwinkowe", status: "vital-crit" },
      { label: "Dopełniacz / Serologia", val: "C3 22 mg/dl (↓) | ASO 1450", sub: "Aktywacja alternatywnej drogi dopełniacza", status: "vital-warn" },
      { label: "Kreatynina / GFR", val: "1,1 mg/dl | GFR 52", sub: "Przejściowe ostre uszkodzenie nerek (AKI 1/2)", status: "vital-warn" }
    ],
    diffTitle: "⚔️ Tabela Różnicowa: Ostre popaciorkowcowe KZN (APSGN) vs Nefropatia IgA (choroba Bergera) vs Zespół Alporta vs Zespół nerczycowy",
    dutySummary: {
      overview: "Ostre popaciorkowcowe kłębuszkowe zapalenie nerek (APSGN) to klasyczny zespół nefrytyczny wywoływany przez nefrytogenne szczepy Streptococcus pyogenes (grupa A – GAS). Rozwija się typowo po 1–3 tygodniach od zapalenia gardła lub po 3–6 tygodniach od liszajca zakaźnego skóry. Charakteryzuje się triadą Addisa: krwiomocz/krwinkomocz kłębuszkowy ('mocz o barwie coli'), obrzęki (głównie wokół oczu) oraz nadciśnienie tętnicze z oligurią i przejściowym spadkiem GFR.",
      diagnostics: "1) <strong>Badanie ogólne moczu i osad</strong>: hematuria z obecnością <span class='dose-pill'>erytrocytów wyługowanych i dysmorficznych (>80%)</span> oraz <span class='dose-pill'>wałeczków erytrocytowych</span>; mierny białkomocz nienfercycowy (<1 g/m²/d).<br>2) <strong>Układ dopełniacza</strong>: <strong>selektywny spadek składowej C3</strong> przy <strong>PRAWIDŁOWYM C4</strong> (normalizacja C3 następuje w ciągu 6–8 tygodni).<br>3) <strong>Serologia paciorkowcowa</strong>: podwyższone lub narastające miano antystreptolizyny O (<span class='dose-pill'>ASO >200–1000 IU/ml</span>) po anginie lub anty-DNazy B po infekcji skórnej.<br>4) <strong>Biochemia krwi</strong>: podwyższenie mocznika i kreatyniny, hiperkaliemia w fazie skąpomoczu.<br>5) Biopsja nerki wskazana wyłącznie przy braku poprawy, utrzymującym się spadku C3 >8 tyg. lub zespole nerczycowym.",
      drugsAndDoses: "1) <strong>Diuretyk pętlowy (leczenie I rzutu w przewodnieniu i nadciśnieniu)</strong>:<br>• Furosemid <span class='dose-pill'>1–2 mg/kg m.c. i.v. lub p.o.</span> (max 4 mg/kg/d).<br>2) <strong>Leki hipotensyjne (przy braku kontroli ciśnienia samym diuretykiem)</strong>:<br>• Amlodypina <span class='dose-pill'>0,1–0,2 mg/kg m.c./dobę p.o.</span> lub Labetalol.<br>• Unikać ACE-I / ARB w ostrej fazie oligurii i hiperkaliemii!<br>3) <strong>Eradykacja ogniska paciorkowcowego</strong>:<br>• Fenoksymetylopenicylina <span class='dose-pill'>50 000–100 000 j.m./kg m.c./dobę p.o.</span> w 2–3 dawkach przez 10 dni.<br>4) <strong>Restrykcja dietetyczna</strong>:<br>• Ograniczenie sodu (<span class='dose-pill'><1 g Na+/dobę</span>) oraz restrykcja płynów (bilans: diureza + 400 ml/m² m.c./dobę).",
      procedures: "Ścisła kontrola bilansu płynów; codzienne ważenie o stałej porze; pomiar ciśnienia tętniczego co 4 h; w rzadkich przypadkach ciężkiego AKI z mocznicą – czasowa hemodializa.",
      monitoring: "Monitorowanie parametrów nerkowych i elektrolitów do ustąpienia oligurii; kontrola stężenia C3 po 6–8 tygodniach (musi powrócić do normy!); kontrolne badanie moczu co miesiąc przez 6 miesięcy (mikrohematuria może utrzymywać się do 1–2 lat bez negatywnych następstw)."
    }
  },
  109: {
    story: `<p><strong>Pacjent:</strong> 3-miesięczny Tymon przyjęty na Oddział Chirurgii i Urologii Dziecięcej w celu pilnej weryfikacji i operacyjnego leczenia wrodzonego wodonercza nerki lewej.</p><p><strong>Wywiad chorobowy:</strong> W badaniu prenatalnym USG w 32. tygodniu ciąży stwierdzono poszerzenie miedniczki nerkowej lewej do 14 mm. W pierwszym USG po porodzie (5. doba życia) wymiar przednio-tylny miedniczki (APD) wynosił 22 mm. W kontrolnym USG w 3. miesiącu życia stwierdzono dramatyczną progresję zastoju: APD wzrosło do 35 mm, kielichy balonowato poszerzone, a miąższ kory nerki lewej uległ ścieńczeniu do zaledwie 2,8 mm (IV stopień wg Society for Fetal Urology – SFU). Chłopiec bez objawów ogólnych, dotąd nie gorączkował.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Niemowlę w stanie ogólnym dobrym, pogodne, dobrze odżywione. W badaniu palpacyjnym brzucha: w lewym podżebrzu i jamie biodrowej wyczuwalny jest gładki, elastyczny, balotujący, niebolesny opór wielkości mandarynki (powiększona zaporowo lewa nerka). Prawa nerka niewyczuwalna. Moczowód lewy w USG niewidoczny na całej długości (co potwierdza przeszkodę na poziomie połączenia miedniczkowo-moczowodowego – UPJO). Narządy płciowe zewnętrzne męskie prawidłowe, jądra w worku mosznowym.</p>`,
    vitals: [
      { label: "USG / Zastój", val: "APD 35 mm | SFU IV", sub: "Ekstremalne wodonercze ze ścieńczeniem kory do 2,8 mm!", status: "vital-crit" },
      { label: "Palpacja brzucha", val: "Balotujący opór L", sub: "Powiększona elastyczna nerka lewa (wodonercze)", status: "vital-warn" },
      { label: "Scyntygrafia MAG3", val: "Nerka L: 34% | T1/2 >30 min", sub: "Krzywa mechanicznie zaporowa bez reakcji na furosemid", status: "vital-crit" },
      { label: "BP / Temp", val: "84/52 mmHg | 36,8°C", sub: "Ciśnienie tętnicze i temperatura prawidłowe", status: "vital-ok" }
    ],
    diffTitle: "⚔️ Tabela Różnicowa: Zwężenie połączenia miedniczkowo-moczowodowego (UPJO) vs Odpływ pęcherzowo-moczowodowy (VUR) vs Zdwojenie UKM z moczowodem ektopowym vs Guz Wilmsa",
    dutySummary: {
      overview: "Wrodzone zwężenie połączenia miedniczkowo-moczowodowego (UPJO / ureteropelvic junction obstruction) jest najczęstszą przyczyną wodonercza u noworodków i niemowląt (częściej po stronie lewej i u chłopców). Może wynikać z nieprawidłowości wewnętrznych (segment bezelastyczny mięśniówki) lub zewnętrznych (naczynie dodatkowe dolnobiegunowe crossing vessel). Postępujące ścieńczenie kory nerkowej i spadek funkcji poniżej 40% stanowią bezwzględne wskazanie do operacji naprawczej.",
      diagnostics: "1) <strong>USG nerek i dróg moczowych</strong>: ocena APD miedniczki (<span class='dose-pill'>APD >15–20 mm</span> wskazuje na istotną obstrukcję), stopień wodonercza wg SFU (I–IV), grubość miąższu kory nerkowej, brak poszerzenia moczowodu.<br>2) <strong>Scyntygrafia dynamiczna z furosemidem (99mTc-MAG3 F+20)</strong>: złoty standard oceny przeszkody mechanicznej – wyznaczenie rozdzielczej funkcji nerek (DRF) oraz czasu eliminacji znacznika (<span class='dose-pill'>T1/2 >20 minut</span> świadczy o utrwalonej zaporze).<br>3) <strong>Cystografia mikcyjna (CUM)</strong>: wykluczenie wspólistniejącego odpływu pęcherzowo-moczowodowego (VUR).<br>4) Badanie ogólne i posiew moczu: wykluczenie zakażenia układu moczowego (ZUM).",
      drugsAndDoses: "1) <strong>Profilaktyka przeciwbakteryjna ZUM (do czasu zabiegu)</strong>:<br>• Amoksycylina <span class='dose-pill'>10–15 mg/kg m.c. 1×/dobę na noc p.o.</span> (u noworodków i niemowląt <3. m.ż.) lub<br>• Nitrofurantoina / Kotrimoksazol <span class='dose-pill'>1–2 mg/kg m.c. 1×/d</span> (u niemowląt >3. m.ż.).<br>2) <strong>Leczenie bólu pooperacyjnego</strong>:<br>• Paracetamol <span class='dose-pill'>15 mg/kg m.c. i.v.</span> co 6 h.<br>• Ibuprofen <span class='dose-pill'>10 mg/kg m.c. p.o.</span>.",
      procedures: "Operacja naprawcza: pieloplastyka sposobem Hynesa-Andersona (resekcja zwężonego odcinka, redukcja rozdętej miedniczki i zespolenie moczowodu z miedniczką metodą otwarta, laparoskopową lub robotyczną); czasowe założenie cewnika wewnętrznego Double-J (DJ) na 4–6 tygodni.",
      monitoring: "Kontrolne USG po 6 tygodniach, 3 i 6 miesiącach od zabiegu (ocena regresji wodonercza i grubości kory); kontrolna scyntygrafia MAG3 po 6–12 miesiącach w celu potwierdzenia drożności zespolenia i regeneracji funkcji nerki."
    }
  },
  110: {
    story: `<p><strong>Pacjent:</strong> 4-letni Antoś przywieziony przez rodziców na Izbę Przyjęć Oddziału Chorób Zakaźnych Dziecięcych z powodu gorączki do 40,0°C, duszności, obustronnego zapalenia spojówek i zstępującej wysypki.</p><p><strong>Wywiad chorobowy:</strong> Od 4 dni chłopiec wysoko gorączkuje (39,5–40,0°C), ma szczekający, męczący kaszel, obfity surowiczy wyciek z nosa oraz silne zapalenie spojówek ze światłowstrętem i obrzękiem powiek (triada '3C': Cough, Coryza, Conjunctivitis). Dziecko chowa głowę w poduszkę i płacze przy włączeniu światła. Dziś rano za uszami i na linii włosów pojawiła się ciemnoczerwona, gruboplamisto-grudkowa wysypka, która zstępuje na twarz i klatkę piersiową. W wywiadzie: rodzice odmówili szczepień (chłopiec nieszczepiony przeciw odrze – brak MMR), a przed 10 dniami wrócili z zagranicy.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Dziecko podsypiające, cierpiące, z tachypnoe (36/min) i zaciąganiem międzyżebrzy. Saturacja SpO2 93% na powietrzu atmosferycznym. Na błonie śluzowej policzków na wysokości zębów przedtrzonowych widoczne są liczne drobne, szarobiałe grudki otoczone czerwoną obwódką przypominające ziarenka piasku (patognomoniczne plamki Koplika!). Na twarzy, szyi i tułowiu zlewająca się osutka plamisto-grudkowa o barwie żywoczerwonej do brunatnej. Osłuchowo nad płucami liczne rozsiane trzeszczenia i rzężenia drobnobańkowe (cechy pierwotnego odrowego olbrzymiokomórkowego zapalenia płuc Hechta).</p>`,
    vitals: [
      { label: "Saturacja / Duszność", val: "SpO2 93% | RR 36/min", sub: "Hipoksemia i zapalenie płuc Hechta (niewydolność)", status: "vital-crit" },
      { label: "Błony śluzowe", val: "Plamki Koplika | Triada 3C", sub: "Patognomoniczne grudki na śluzówce policzków", status: "vital-crit" },
      { label: "Wysypka", val: "Zstępująca gruboplamista", sub: "Żywoczerwona do brunatnej zlewająca się osutka", status: "vital-warn" },
      { label: "Temp / HR", val: "39,9°C | 144/min", sub: "Wysoka gorączka z tachykardią odczynową", status: "vital-crit" }
    ],
    diffTitle: "⚔️ Tabela Różnicowa: Odra (Morbilli) vs Różyczka (Rubeola) vs Rumień zakaźny (Parwowirus B19) vs Gorączka trzydniowa (HHV-6) vs Choroba Kawasakiego",
    dutySummary: {
      overview: "Odra (morbilli) to wysoce zakaźna (wskaźnik R0 = 12–18!) ostra choroba wirusowa wywoływana przez Morbillivirus z rodziny Paramyxoviridae. Przebiega w dwóch fazach: zwiastunowej (wysoka gorączka, triada 3C: kaszel, nieżyt nosa, zapalenie spojówek ze światłowstrętem oraz patognomoniczne plamki Koplika) oraz wysypkowej (zstępująca, zlewająca się ciemnoczerwona osutka plamisto-grudkowa, ustępująca z otrębiastym łuszczeniem). Najczęstsze powikłania to zapalenie ucha środkowego i płuc; najgroźniejsze to odrowe olbrzymiokomórkowe zapalenie płuc Hechta oraz podostre stwardniające zapalenie mózgu (SSPE).",
      diagnostics: "1) <strong>Obraz kliniczny</strong>: triada 3C + patognomoniczne <span class='dose-pill'>plamki Koplika</span> na błonie śluzowej policzków (pojawiają się 1–2 dni przed wysypką i znikają po 1–2 dniach jej trwania).<br>2) <strong>Serologia</strong>: obecność swoistych przeciwciał <span class='dose-pill'>anty-Measles IgM</span> w surowicy lub 4-krotny wzrost miana IgG w odstępie 2–4 tygodni.<br>3) <strong>RT-PCR</strong>: wykrycie RNA wirusa odry w wymazie z gardła, nosogardła lub próbce moczu.<br>4) <strong>RTG klatki piersiowej</strong>: przy cechach duszności – obustronne śródmiąższowe lub plamiste zagęszczenia (olbrzymiokomórkowe zapalenie płuc Hechta).",
      drugsAndDoses: "1) <strong>Witamina A (protokół WHO – redukuje śmiertelność i powikłania oczne)</strong>:<br>• Dzieci ≥1 r.ż.: <span class='dose-pill'>200 000 IU p.o. 1×/d przez 2 kolejne dni</span>.<br>• Dzieci 6–11 m.ż.: <span class='dose-pill'>100 000 IU p.o. 1×/d przez 2 dni</span>.<br>2) <strong>Bierna immunoprofilaktyka poekspozycyjna (dla nieszczepionych kontaktów z grupy ryzyka)</strong>:<br>• Swoista lub standardowa immunoglobulina ludzka (HNIG) <span class='dose-pill'>0,5 ml/kg m.c. i.m.</span> (max 15 ml) podana w ciągu <strong>do 6 dni od ekspozycji</strong>.<br>3) <strong>Czynna immunoprofilaktyka poekspozycyjna</strong>:<br>• Szczepionka MMR podana podatnym osobom w ciągu <strong>do 72 godzin od ekspozycji</strong>.<br>4) <strong>Leczenie objawowe</strong>:<br>• Tlenoterapia bierna przez wąsy tlenowe lub maskę (cel SpO2 ≥94%).<br>• Paracetamol <span class='dose-pill'>15 mg/kg m.c. p.o. / i.v.</span> co 6 h.<br>• Ibuprofen <span class='dose-pill'>10 mg/kg m.c. p.o.</span> co 8 h.",
      procedures: "Ścisła izolacja powietrzno-kropelkowa chorego (przez 4 dni przed do 4 dni po wystąpieniu wysypki; u pacjentów z niedoborem odporności przez cały czas trwania choroby); zaciemnienie pokoju ze względu na bolesny światłowstręt; obowiązkowe zgłoszenie do Sanepidu w trybie natychmiastowym.",
      monitoring: "Monitorowanie SpO2 i częstości oddechów (ryzyko nagłego załamania oddechowego w zapaleniu płuc); obserwacja neurologiczna (ryzyko ostrego zapalenia mózgu u 1 na 1000 chorych)."
    }
  }
};

async function run() {
  const manifest = JSON.parse(fs.readFileSync('cases/manifest.json', 'utf8'));

  for (const [idStr, upg] of Object.entries(UPGRADES)) {
    const id = parseInt(idStr, 10);
    const fn = manifest.find(f => f.startsWith(String(id) + '_'));
    if (!fn) {
      console.error('Nie znaleziono pliku dla id:', id);
      continue;
    }
    const raw = JSON.parse(fs.readFileSync('cases/' + fn, 'utf8'));
    const c = await decrypt(raw, '@LEKSzymon28111999');

    // Update aesthetics
    c.story = upg.story;
    c.vitals = upg.vitals;
    if (c.diffTable) {
      c.diffTable.title = upg.diffTitle;
    }
    c.dutySummary = upg.dutySummary;

    // Check steps options feedback format
    if (c.steps && Array.isArray(c.steps)) {
      c.steps.forEach(st => {
        if (st.options && Array.isArray(st.options)) {
          st.options.forEach(opt => {
            if (opt.isCorrect && !opt.feedback.startsWith('✅')) {
              opt.feedback = '✅ PRAWIDŁOWO! ' + opt.feedback;
            } else if (!opt.isCorrect && !opt.feedback.startsWith('❌')) {
              opt.feedback = '❌ BŁĄD! ' + opt.feedback;
            }
          });
        }
      });
    }

    // Encrypt and write back
    const encryptedPayload = await encrypt(c, '@LEKSzymon28111999');
    fs.writeFileSync('cases/' + fn, JSON.stringify(encryptedPayload, null, 2), 'utf8');
    console.log(`Pomyślnie zaktualizowano estetykę i zaszyfrowano przypadek #${id} (${fn})`);
  }
}

run();

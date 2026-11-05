const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const MASTER_KEY = '@LEKSzymon28111999';

async function deriveAesKey(password, salt) {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, baseKey, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}

async function decrypt(data, password) {
  const salt = Buffer.from(data.salt, 'base64');
  const iv = Buffer.from(data.iv, 'base64');
  const key = await deriveAesKey(password, salt);
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, Buffer.from(data.ciphertext, 'base64'));
  return JSON.parse(new TextDecoder().decode(decrypted));
}

async function encrypt(obj, password) {
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  const key = await deriveAesKey(password, salt);
  const plaintext = new TextEncoder().encode(JSON.stringify(obj));
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plaintext);
  return {
    encrypted: true,
    algorithm: 'AES-256-GCM',
    iterations: 100000,
    salt: Buffer.from(salt).toString('base64'),
    iv: Buffer.from(iv).toString('base64'),
    ciphertext: Buffer.from(ciphertext).toString('base64')
  };
}

function verifyStepBalance(steps, caseId) {
  steps.forEach((s, idx) => {
    const lens = s.options.map(o => o.text.length);
    const max = Math.max(...lens);
    const min = Math.min(...lens);
    const ratio = max / min;
    if (ratio >= 1.5) {
      console.warn(`[WARN] Case ${caseId} Step ${idx + 1} ratio: ${ratio.toFixed(2)} (Min: ${min}, Max: ${max})`);
    }
  });
}

// BATCH 3: CASES 161 - 165 (8 STEPS EACH)
const batch3Steps = {
  161: [
    {
      title: "Krok 1: Wstępna ocena ABCDE i rozpoznanie ostrego zespołu pniowego",
      desc: "56-latek trafia na SOR z nagłymi zawrotami głowy, nudnościami, wymiotami, czkawką, chrypką i utratą równowagi. RR 165/95 mmHg, HR 82/min, SpO2 96%.",
      options: [
        {
          text: "Wstępna ocena ABCDE, kaniulacja żyły, tlenoterapia bierna, pomiar glikemii CITO, EKG oraz pilna ocena drożności dróg oddechowych pod kątem zaburzeń połykania.",
          isCorrect: true,
          feedback: "Prawidłowo! Nagłe zawroty głowy z czkawką, ataksją i dysfagią to klasyczny początek zespołu Wallenberga (zawał bocznej części opuszki w dorzeczu PICA)."
        },
        {
          text: "Podanie doustnej tabletki hydroksyzyny 25 mg z podejrzeniem łagodnych zawrotów lokomocyjnych i zalecenie powrotu do domu autobusem miejskim.",
          isCorrect: false,
          feedback: "Błąd. Pacjent z ostrym zespołem pniowym i zaburzeniami połykania po podaniu leku p.o. natychmiast ulegnie zachłyśnięciu ze skutkiem śmiertelnym."
        },
        {
          text: "Wykonanie próby kalorycznej błędnika za pomocą wlewania lodowatej wody do przewodów słuchowych przed badaniem neurologicznym pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Próba kaloryczna w ostrym zawale pnia jest przeciwwskazana, wywołuje gwałtowne wymioty i stwarza wysokie ryzyko aspiracji treści żołądkowej."
        },
        {
          text: "Wdrożenie dożylnego wlewu mannitolu w dawce 500 ml bez oceny neurologicznej pod kątem rzekomego ostrego wodobrzusza u pacjenta na SOR.",
          isCorrect: false,
          feedback: "Błąd. Zespół dotyczy pnia mózgu, a nie jamy brzusznej; diagnostyka i postępowanie muszą skupić się na układzie nerwowym."
        }
      ]
    },
    {
      title: "Krok 2: Badanie neurologiczne i rozszczepione zaburzenia czucia",
      desc: "W badaniu przedmiotowym stwierdzono: opadanie powieki i zwężenie źrenicy po stronie lewej (zespół Hornera) oraz ataksję. Jaki wzorzec czuciowy potwierdza uszkodzenie opuszki?",
      options: [
        {
          text: "Rozszczepione zaburzenia czucia: upośledzenie czucia bólu i temperatury na twarzy po stronie lewej (ipsilateralnie) oraz na tułowiu i kończynach po stronie prawej.",
          isCorrect: true,
          feedback: "Prawidłowo! Wynika to z uszkodzenia jądra pasma rdzeniowego nerwu V (twarz ipsilateralnie) oraz wstępującej drogi rdzeniowo-wzgórzowej (tułów kontralateralnie)."
        },
        {
          text: "Całkowite, symetryczne znieczulenie na dotyk i wibrację w obrębie obu dłoni i stóp o charakterze klasycznych rękawiczek i skarpetek.",
          isCorrect: false,
          feedback: "Błąd. Taki symetryczny wzorzec obwodowy odpowiada przewlekłej polineuropatii cukrzycowej, a nie ostremu naczyniowemu uszkodzeniu pnia mózgu."
        },
        {
          text: "Porażenie wiotkie wszystkich czterech kończyn z całkowitym brakiem jakichkolwiek odruchów głębokich w mechanizmie wstrząsu rdzeniowego.",
          isCorrect: false,
          feedback: "Błąd. W zespole Wallenberga drogi piramidowe biegnące brzusznie są zaoszczędzone; brak jest niedowładu połowiczego kończyn."
        },
        {
          text: "Jednostronna utrata węchu i smaku w przednich dwóch trzecich języka bez jakichkolwiek zaburzeń czucia temperatury i bólu na ciele.",
          isCorrect: false,
          feedback: "Błąd. Uszkodzenie dotyczy bocznej opuszki i nerwów V, IX, X oraz układu współczulnego, a nie nerwu węchowego czy twarzowego."
        }
      ]
    },
    {
      title: "Krok 3: Ocena opuszkowych nerwów czaszkowych (n. IX, X, XI)",
      desc: "Jakie deficyty ze strony dolnych nerwów czaszkowych stwarzają bezpośrednie zagrożenie życia i wymagają natychmiastowego zabezpieczenia?",
      options: [
        {
          text: "Dysfagia, dyzartria, chrypka, osłabienie odruchu gardłowego oraz opadanie podniebienia miękkiego po stronie uszkodzenia (uszkodzenie jądra dwuznacznego).",
          isCorrect: true,
          feedback: "Prawidłowo! Uszkodzenie jądra dwuznacznego (nucleus ambiguus) powoduje porażenie podniebienia, gardła i krtani, grożąc ciężkim zachłyśnięciem i bezdechem."
        },
        {
          text: "Opadanie kącika ust i niemożność domknięcia szpary powiekowej po stronie przeciwnej w mechanizmie obwodowego porażenia nerwu twarzowego.",
          isCorrect: false,
          feedback: "Błąd. Porażenie Bella dotyczy nerwu VII w moście; w zespole opuszki objawy dotyczą nerwów IX i X (połykanie, fonacja)."
        },
        {
          text: "Całkowita ślepota obuoczna z zanikiem tarcz nerwów wzrokowych bez jakichkolwiek zaburzeń połykania ani chrypki u pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Nerw wzrokowy nie przebiega w opuszce; objawy opuszkowe to dysfagia, dyzartria i zespół Hornera."
        },
        {
          text: "Izolowane jednostronne porażenie nerwu bloczkowego z dwojeniem widzenia nasilającym się przy patrzeniu w dół i ku nosowi.",
          isCorrect: false,
          feedback: "Błąd. Jądro nerwu IV znajduje się w śródmózgowiu, a zespół Wallenberga to udar bocznej części rdzenia przedłużonego (opuszki)."
        }
      ]
    },
    {
      title: "Krok 4: Zabezpieczenie dróg oddechowych i reżim 'Nil Per Os' (NPO)",
      desc: "Ze względu na ciężką dysfagię pacjent ma zniesiony odruch połykania i odruch kaszlowy. Jaka jest natychmiastowa dyspozycja dotycząca żywienia i leków?",
      options: [
        {
          text: "Bezwzględny zakaz podawania czegokolwiek drogą doustną (reżim NPO), założenie zgłębnika żołądkowego pod kontrolą wzroku oraz leki wyłącznie parenteralnie.",
          isCorrect: true,
          feedback: "Prawidłowo! Porażenie gardła u chorych z zespołem Wallenberga niesie skrajne ryzyko śmiertelnego zachłystowego zapalenia płuc lub uduszenia."
        },
        {
          text: "Podanie pacjentowi dużej szklanki ciepłej wody ze środkiem zagęszczającym w celu przeprowadzenia natychmiastowej próby połykania na sali SOR.",
          isCorrect: false,
          feedback: "Błąd. Podanie płynu pacjentowi ze zniesionym odruchem gardłowym doprowadzi do natychmiastowej aspiracji do drzewa oskrzelowego i ostrej hipoksji."
        },
        {
          text: "Zalecenie spożywania wyłącznie posiłków stałych w postaci twardych sucharów w celu mechanicznego pobudzenia mięśni zwieraczy gardła.",
          isCorrect: false,
          feedback: "Błąd. Ciało stałe utknie w krtani pacjenta pozbawionego czucia i ruchomości gardła, wywołując natychmiastowe uduszenie."
        },
        {
          text: "Podanie dożylne 100 mg suksametonium w celu zwiotczenia mięśni szyi i ułatwienia samoistnego połykania śliny przez pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Suksametonium to lek zwiotczający stosowany do intubacji; podany bez wentylacji mechanicznej wywoła zgon przez uduszenie."
        }
      ]
    },
    {
      title: "Krok 5: Pilna diagnostyka neuroobrazowa (DWI-MR mózgu)",
      desc: "TK głowy bez kontrastu w pierwszych godzinach udaru pnia mózgu często nie wykazuje zmian. Jakie badanie obrazowe jest złotym standardem w zawale opuszki?",
      options: [
        {
          text: "Rezonans magnetyczny mózgu z sekwencją dyfuzji (DWI-MR), który z wysoką czułością uwidacznia wczesne ognisko niedokrwienne w bocznej części opuszki.",
          isCorrect: true,
          feedback: "Prawidłowo! W sekwencjach DWI-MR świeży zawał opuszki świeci jaskrawo od pierwszych minut; TK tylnego dołu jest zaburzona przez artefakty kości piramidy."
        },
        {
          text: "Przeglądowe zdjęcie RTG zatok obocznych nosa w projekcji Watersa w celu wykluczenia zapalenia zatoki szczękowej jako przyczyny ataksji.",
          isCorrect: false,
          feedback: "Błąd. Zapalenie zatok nie wywołuje zespołu Hornera ani ataksji; zawał pnia wymaga zaawansowanego neuroobrazowania MR."
        },
        {
          text: "Zdjęcie rentgenowskie żuchwy w projekcji skośnej w celu oceny stawów skroniowo-żuchwowych przed badaniem neurologicznym.",
          isCorrect: false,
          feedback: "Błąd. RTG żuchwy nie ma żadnego zastosowania w udarze mózgu i nie pozwala na ocenę tkanek mózgowia."
        },
        {
          text: "Scyntygrafia tarczycy z użyciem jodu-131 w celu oceny wychwytu znacznika przez gruczoł tarczowy u pacjenta na ostrym dyżurze.",
          isCorrect: false,
          feedback: "Błąd. Badanie izotopowe tarczycy jest czasochłonne, niepotrzebnie obciąża pacjenta i nie diagnozuje ostrego udaru pnia mózgu."
        }
      ]
    },
    {
      title: "Krok 6: Diagnostyka naczyniowa CITO i wykluczenie rozwarstwienia tętnicy kręgowej",
      desc: "Udar bocznej części opuszki powstaje w wyniku zamknięcia tętnicy kręgowej (VA) lub PICA. U kogo i jakie badanie naczyniowe należy pilnie wykonać?",
      options: [
        {
          text: "Angio-TK lub angio-MR tętnic szyjnych i kręgowych (CTA/MRA) pod kątem rozwarstwienia tętnicy kręgowej (zwłaszcza po urazie szyi lub manipulacjach kręgosłupa).",
          isCorrect: true,
          feedback: "Prawidłowo! Rozwarstwienie tętnicy kręgowej (VAD) to częsta przyczyna zespołu Wallenberga u osób młodych/w średnim wieku; wymaga pilnego obrazowania."
        },
        {
          text: "Flebografia wstępująca żył głębokich podudzia z nakłuciem żył grzbietowych stopy jako jedyne badanie naczyniowe.",
          isCorrect: false,
          feedback: "Błąd. Naczynia kończyn dolnych nie zaopatrują pnia mózgu; diagnostyka naczyniowa musi obejmować dorzecze kręgowo-podstawne."
        },
        {
          text: "Wykonanie próby opaskowej Rumpla-Leedego na przedramieniu w celu oceny kruchości naczyń kapilarnych u pacjenta z udarem pnia.",
          isCorrect: false,
          feedback: "Błąd. Próba opaskowa bada skazy naczyniowe i nie ma żadnej wartości w diagnostyce rozwarstwienia dużych tętnic domózgowych."
        },
        {
          text: "Pielografia dożylna z podaniem kontrastu moczowego w celu oceny wydalania nerkowego przed transportem do pracowni naczyniowej.",
          isCorrect: false,
          feedback: "Błąd. Urografia ocenia układ moczowy; w udarze pnia konieczna jest pilna angiografia naczyń domózgowych (CTA/MRA)."
        }
      ]
    },
    {
      title: "Krok 7: Farmakoterapia celowana (Leczenie przeciwpłytkowe / Antykoagulacja)",
      desc: "Objawy trwają od 6 godzin (poza oknem trombolizy dożylnej). Angio-TK wykluczyło rozwarstwienie, potwierdzając zakrzepicę PICA na tle miażdżycy. Jakie leczenie wdrożyć?",
      options: [
        {
          text: "Kwas acetylosalicylowy (ASA) w dawce nasycającej 150–300 mg (przez zgłębnik żołądkowy z uwagi na dysfagię) oraz atorwastatynę 80 mg/dobę.",
          isCorrect: true,
          feedback: "Prawidłowo! Leki przeciwpłytkowe podane w pierwszych 48 h redukują ryzyko nawrotu udaru. Ze względu na dysfagię tabletki należy podać przez sondę."
        },
        {
          text: "Zalecenie podania ASA w postaci twardej tabletki do połykania i zmuszenie pacjenta do jej popicia szklanką zimnego mleka.",
          isCorrect: false,
          feedback: "Błąd. Zmuszanie pacjenta z porażeniem nerwów IX i X do połykania doprowadzi do natychmiastowej aspiracji tabletki do dróg oddechowych."
        },
        {
          text: "Wdrożenie dożylnej trombolizy streptokinazą w dawce 1,5 mln j.m. pomimo upływu 6 godzin od początku zachorowania.",
          isCorrect: false,
          feedback: "Błąd. Okno dla trombolizy dożylnej wynosi 4,5 godziny; podanie po tym czasie stwarza śmiertelne ryzyko ukrwotocznienia ogniska w pniu."
        },
        {
          text: "Podanie dożylne heparyny niefrakcjonowanej z zamiarem wydłużenia czasu APTT powyżej 180 sekund bez kontroli laboratoryjnej.",
          isCorrect: false,
          feedback: "Błąd. Niekontrolowana heparynizacja nie poprawia rokowania w udarze niedokrwiennym, a grozi masywnym krwotokiem śródmózgowym."
        }
      ]
    },
    {
      title: "Krok 8: Nadzór na Oddziale Udarowym i dyspozycja końcowa",
      desc: "Pacjent jest stabilny hemodynamicznie, z cechami ataksji i zaburzeń połykania. Jaka jest dyspozycja i kluczowe elementy wczesnej rehabilitacji?",
      options: [
        {
          text: "Hospitalizacja na Oddziale Udarowym, monitorowanie oddechu i rytmu serca, wczesna rehabilitacja logopedyczna połykania oraz fizjoterapia ataksji.",
          isCorrect: true,
          feedback: "Prawidłowo! W zespole Wallenberga rokowanie co do powrotu funkcji połykania i chodu jest na ogół pomyślne przy wczesnej intensywnej rehabilitacji."
        },
        {
          text: "Wypisanie pacjenta do domu w tym samym dniu z zaleceniem samodzielnego leczenia dysfagii za pomocą ćwiczeń wokalnych.",
          isCorrect: false,
          feedback: "Błąd. Pacjent z ostrym udarem pnia mózgu wymaga bezwzględnej hospitalizacji z uwagi na ryzyko powikłań oddechowych i niestabilności autonomicznej."
        },
        {
          text: "Przekazanie pacjenta do zakładu opiekuńczo-leczniczego z rozpoznaniem nieodwracalnego inwalidztwa bez prób rehabilitacji.",
          isCorrect: false,
          feedback: "Błąd. Zespół Wallenberga charakteryzuje się dobrą plastycznością kompensacyjną; pacjenci często odzyskują pełną zdolność połykania."
        },
        {
          text: "Założenie gipsu biodrowego na obie kończyny dolne w celu unieruchomienia pacjenta z powodu ataksji móżdżkowej.",
          isCorrect: false,
          feedback: "Błąd. Unieruchomienie gipsowe w udarze mózgu to rażący błąd powodujący zakrzepicę żył głębokich i odleżyny; konieczna jest wczesna mobilizacja."
        }
      ]
    }
  ],

  162: [
    {
      title: "Krok 1: Triage urazowy ABCDE i rozpoznanie klasycznej 'przerwy jasnej'",
      desc: "24-latek po urazie okolicy skroniowej (uderzenie kijem). Początkowo nieprzytomny przez 5 min, potem przytomny w pełnym kontakcie (lucid interval), a po 2 h narastająco senny. GCS spada do 9.",
      options: [
        {
          text: "Wstępna ocena ABCDE, unieruchomienie kręgosłupa szyjnego, tlenoterapia, kaniulacja żył, pilna ocena źrenic i natychmiastowe wezwanie pracowni TK głowy.",
          isCorrect: true,
          feedback: "Prawidłowo! Uraz skroni z przerwą jasną (lucid interval) i wtórnym pogorszeniem świadomości to podręcznikowy obraz ostrego krwiaka nadtwardówkowego (EDH)."
        },
        {
          text: "Zalecenie podania mocnej kawy i wypisanie pacjenta do domu pod opiekę kolegów z zaleceniem wyspania się po urazie głowy.",
          isCorrect: false,
          feedback: "Błąd. Pogorszenie świadomości po przerwie jasnej to objaw gwałtownego ucisku mózgu przez krwiak; odesłanie pacjenta skończy się zgonem w ciągu 2 godzin."
        },
        {
          text: "Podanie dożylne 20 mg diazepamu w celu wyciszenia niepokoju pacjenta przed wykonaniem jakichkolwiek badań obrazowych czaszki.",
          isCorrect: false,
          feedback: "Błąd. Sedacja bez zabezpieczenia dróg oddechowych uniemożliwia neurologiczną ocenę dynamiki ciasnoty i grozi zachłyśnięciem."
        },
        {
          text: "Założenie kołnierza gipsowego na całą klatkę piersiową i głowę pacjenta bez sprawdzania drożności dróg oddechowych na sali SOR.",
          isCorrect: false,
          feedback: "Błąd. Unieruchomienie kręgosłupa realizuje się kołnierzem szyjnym; gips utrudnia dostęp do dróg oddechowych i jest błędem."
        }
      ]
    },
    {
      title: "Krok 2: Badanie neurologiczne i anizokoria (Objaw Hutchinsona)",
      desc: "W trakcie badania na SOR prawa źrenica pacjenta staje się szeroka, sztywna i nie reaguje na światło, podczas gdy lewa źrenica reaguje prawidłowo. Co oznacza ten objaw?",
      options: [
        {
          text: "Wklinowanie haka zakrętu hipokampa pod namiot móżdżku z uciskiem prawego nerwu okoruchowego (n. III); bezpośrednie zagrożenie wklinowaniem pnia mózgu.",
          isCorrect: true,
          feedback: "Prawidłowo! Szeroka, sztywna źrenica po stronie krwiaka (objaw Hutchinsona) to alarmujący objaw ciasnoty podnamiotowej wymagający natychmiastowej kraniotomii."
        },
        {
          text: "Fizjologiczny wariant anatomiczny źrenic niewymagający żadnej interwencji ani pośpiechu diagnostycznego u młodego mężczyzny.",
          isCorrect: false,
          feedback: "Błąd. Nowo powstała asymetria źrenic po urazie głowy z pogorszeniem stanu świadomości to pewny objaw zagrażającego wklinowania mózgu."
        },
        {
          text: "Objaw zatrucia alkoholem metylowym wymagający natychmiastowego płukania żołądka roztworem węgla aktywowanego.",
          isCorrect: false,
          feedback: "Błąd. Asymetria źrenic po urazie głowy wynika z mechanicznego ucisku nerwu III, a nie z zatrucia toksykologicznego."
        },
        {
          text: "Miejscowe zapalenie spojówki prawej gałki ocznej wymagające podania kropli z neomycyną do worka spojówkowego.",
          isCorrect: false,
          feedback: "Błąd. Zapalenie spojówek nie powoduje sztywnego poszerzenia źrenicy ani śpiączki; to objaw wklinowania wewnątrzczaszkowego."
        }
      ]
    },
    {
      title: "Krok 3: Pilna tomografia komputerowa głowy bez kontrastu (NCCT)",
      desc: "Jaki jest charakterystyczny obraz radiologiczny ostrego krwiaka nadtwardówkowego (EDH) w badaniu TK głowy bez kontrastu?",
      options: [
        {
          text: "Jednorodnie hiperdensyjna (jasna), soczewkowata (dwuwypukła) masa przymózgowa, która nie przekracza szwów czaszki, często z widoczną szczeliną złamania kości.",
          isCorrect: true,
          feedback: "Prawidłowo! Krew tętnicza odwarstwia oponę twardą od kości do linii szwów czaszkowych, tworząc charakterystyczny dwuwypukły kształt soczewki."
        },
        {
          text: "Sierpowata masa krwi o zmiennej gęstości swobodnie przekraczająca szwy czaszki i rozlewająca się wzdłuż całej półkuli mózgu.",
          isCorrect: false,
          feedback: "Błąd. Kształt półksiężycowaty/sierpowaty jest typowy dla krwiaka podtwardówkowego (SDH), a nie nadtwardówkowego (EDH)."
        },
        {
          text: "Całkowity brak jakichkolwiek odchyleń od normy z idealnie symetrycznym obrazem bruzd i komór mózgu w badaniu tomograficznym.",
          isCorrect: false,
          feedback: "Błąd. EDH tworzy wyraźną hiperdensyjną soczewkę uciskającą mózgowie i przemieszczającą struktury linii pośrodkowej."
        },
        {
          text: "Rozlane zwapnienia w obrębie obu splotów naczyniastych bez obecności wynaczynionej krwi w przestrzeniach płynowych czaszki.",
          isCorrect: false,
          feedback: "Błąd. Fizjologiczne zwapnienia nie mają związku z ostrym urazem czaszkowo-mózgowym i krwiakiem nadtwardówkowym."
        }
      ]
    },
    {
      title: "Krok 4: Zabezpieczenie dróg oddechowych (Intubacja przy GCS <= 8)",
      desc: "Podczas przygotowań do transportu na blok operacyjny stan świadomości pacjenta ulega dalszemu pogorszeniu do GCS 7 (E1V2M4). Jaka jest natychmiastowa decyzja anestezjologiczna?",
      options: [
        {
          text: "Natychmiastowa intubacja dotchawicza w sekwencji szybkiej indukcji (RSI) z ręczną stabilizacją osiową kręgosłupa szyjnego i neuroprotekcyjną wentylacją.",
          isCorrect: true,
          feedback: "Prawidłowo! GCS <= 8 to bezwzględne wskazanie do intubacji. Chroni to przed zachłyśnięciem, hipoksją (PaO2 < 60) i hiperkapnią (PaCO2 > 45), które drastycznie podnoszą ICP."
        },
        {
          text: "Zastosowanie biernej tlenoterapii przez wąsy tlenowe z przepływem 1 l/min i oczekiwanie na samoistne wybudzenie pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Pacjent w śpiączce (GCS 7) traci odruchy obronne; bierność doprowadzi do natychmiastowej asfiksji i zatrzymania krążenia."
        },
        {
          text: "Podanie dożylne leków wymiotnych w celu oczyszczenia przewodu pokarmowego przed planowanym zabiegiem neurochirurgicznym.",
          isCorrect: false,
          feedback: "Błąd. Wywołanie wymiotów u pacjenta nieprzytomnego bez rurki intubacyjnej wywoła śmiertelne zachłyśnięcie i skok ciśnienia śródczaszkowego."
        },
        {
          text: "Ułożenie pacjenta na brzuchu z twarzą w dół na twardym podłożu w celu ułatwienia samoistnego drenażu wydzieliny z jamy ustnej.",
          isCorrect: false,
          feedback: "Błąd. Pozycja na brzuchu u pacjenta po urazie czaszkowo-mózgowym uniemożliwia kontrolę oddechu i grozi uszkodzeniem rdzenia szyjnego."
        }
      ]
    },
    {
      title: "Krok 5: Doraźne leczenie ciasnoty wewnątrzczaszkowej na czas transportu",
      desc: "Ciśnienie śródczaszkowe gwałtownie rośnie, przesunięcie struktur linii pośrodkowej wynosi 8 mm. Jakie leczenie osmotyczne należy podać w drodze na blok operacyjny?",
      options: [
        {
          text: "Uniesienie wezgłowia łóżka o 30° oraz podanie 20% mannitolu w dawce 1 g/kg m.c. w szybkim wlewie (lub 3% hipertonicznej soli fizjologicznej NaCl).",
          isCorrect: true,
          feedback: "Prawidłowo! Terapia hiperosmolarna szybko odwadnia tkankę mózgową, obniża ICP i zyskuje krytyczne minuty potrzebne do dotarcia na salę operacyjną."
        },
        {
          text: "Podanie 2000 ml czystej 5% glukozy w szybkim wlewie pod ciśnieniem bezpośrednio przed otwarciem czaszki.",
          isCorrect: false,
          feedback: "Błąd. Roztwory glukozy są hipoosmolotyczne po zmetabolizowaniu cukru; spowodują gwałtowny obrzęk mózgu i natychmiastowe wklinowanie."
        },
        {
          text: "Zastosowanie głębokiej hiperwentylacji do wartości PaCO2 poniżej 20 mmHg przez okres co najmniej 4 godzin.",
          isCorrect: false,
          feedback: "Błąd. Skrajna hipokapnia (pCO2 < 25) wywołuje silny skurcz naczyń mózgowych i wtórny zawał niedokrwienny mózgu; cel to łagodna hipokapnia (30-35)."
        },
        {
          text: "Podanie wysokich dawek dożylnego furosemidu bez kontroli ciśnienia tętniczego, dążąc do wywołania ciężkiej hipotonii.",
          isCorrect: false,
          feedback: "Błąd. Hipotensja w urazie mózgu drastycznie obniża ciśnienie perfuzji mózgowej (CPP = MAP - ICP) i podwaja śmiertelność."
        }
      ]
    },
    {
      title: "Krok 6: Źródło krwawienia i anatomia patologiczna EDH",
      desc: "Uszkodzenie jakiej struktury naczyniowej odpowiada za powstawanie ostrego krwiaka nadtwardówkowego w okolicy skroniowej w > 85% przypadków?",
      options: [
        {
          text: "Tętnica oponowa środkowa (arteria meningea media) biegnąca po wewnętrznej powierzchni łuski kości skroniowej w okolicy pterionu.",
          isCorrect: true,
          feedback: "Prawidłowo! Pterion to najcieńsze miejsce czaszki; złamanie kości skroniowej w tym rejonie rozrywa tętnicę oponową środkową, dając krwawienie tętnicze pod wysokim ciśnieniem."
        },
        {
          text: "Żyły mostkowe łączące bezpośrednio powierzchnię kory mózgowia z zatoką strzałkową górną w obrębie sklepienia czaszki pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Rozerwanie żył mostkowych odpowiada za krwiaka podtwardówkowego (SDH), a nie nadtwardówkowego (EDH)."
        },
        {
          text: "Główny pień żyły wrotnej wątrobowej wraz ze splotami naczyniowymi krezkowymi dolnymi w obrębie jamy brzusznej pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Naczynia jamy brzusznej nie mają żadnego anatomicznego połączenia z przestrzenią nadtwardówkową czaszki."
        },
        {
          text: "Splot naczyniówkowy komory czwartej mózgu wraz z naczyniami żylnymi zlokalizowanymi w obrębie tylnego dołu czaszki pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Krwawienie ze splotu naczyniówki daje krwotok dokomorowy (IVH), a nie przymózgowy krwiak nadtwardówkowy okolicy skroniowej."
        }
      ]
    },
    {
      title: "Krok 7: Kwalifikacja i zabieg operacyjny ratujący życie",
      desc: "Objętość krwiaka wynosi 45 cm3, przesunięcie linii pośrodkowej 8 mm, anizokoria. Jakie jest leczenie chirurgiczne z wyboru?",
      options: [
        {
          text: "Natychmiastowa kraniotomia skroniowa, ewakuacja krwiaka, podkłucie lub koagulacja krwawiącej tętnicy oponowej środkowej i podwieszenie opony twardej.",
          isCorrect: true,
          feedback: "Prawidłowo! Pilna kraniotomia odbarczająca pozwala na ewakuację skrzepów, hemostazę krwawiącej tętnicy i natychmiastowe zniesienie ucisku na pień mózgu."
        },
        {
          text: "Wykonanie nakłucia lędźwiowego w celu upuszczenia 50 ml płynu mózgowo-rdzeniowego i odbarczenia ciasnoty wewnątrzczaszkowej.",
          isCorrect: false,
          feedback: "Błąd. Nakłucie lędźwiowe w ciasnocie z anizokorią wywoła natychmiastowe wklinowanie migdałków móżdżku do otworu wielkiego i natychmiastowy zgon."
        },
        {
          text: "Leczenie zachowawcze wyczekujące w ciemnym pokoju z zaleceniem kontrolnego badania tomograficznego za 14 dni.",
          isCorrect: false,
          feedback: "Błąd. Krwiak tętniczy o objętości 45 ml z anizokorią bez odbarczenia doprowadzi do zgonu pacjenta w ciągu kilkudziesięciu minut."
        },
        {
          text: "Wstrzyknięcie do krwiaka 500 mg kwasu hialuronowego w celu związania płynnej frakcji wynaczynionej krwi.",
          isCorrect: false,
          feedback: "Błąd. Wstrzyknięcie czegokolwiek do krwiaka zwiększyłoby masę uciskową i przyspieszyło śmiertelne wklinowanie mózgu."
        }
      ]
    },
    {
      title: "Krok 8: Opieka pooperacyjna na OIT i rokowanie",
      desc: "Zabieg przebiegł pomyślnie, krwiak ewakuowano, krwawiące naczynie skoagulowano. Źrenice stały się symetryczne. Jakie jest rokowanie pacjenta?",
      options: [
        {
          text: "Rokowanie jest bardzo dobre (możliwy pełny powrót do zdrowia), pod warunkiem że odbarczenie wykonano przed nieodwracalnym niedokrwieniem pnia mózgu.",
          isCorrect: true,
          feedback: "Prawidłowo! W EDH mózg pod krwiakiem jest pierwotnie nieuszkodzony; szybka ewakuacja przed zawałem pnia daje doskonałe wyniki czynnościowe."
        },
        {
          text: "Rokowanie jest bezwzględnie śmiertelne niezależnie od szybkości interwencji chirurgicznej i stopnia zaawansowania krwiaka.",
          isCorrect: false,
          feedback: "Błąd. EDH ma najlepsze rokowanie spośród wszystkich pourazowych krwiaków przymózgowych, jeśli operacja nastąpi odpowiednio wcześnie."
        },
        {
          text: "Pacjent bezwzględnie rozwinie trwałe porażenie czterokończynowe i głębokie otępienie naczyniowe w każdym przypadku EDH.",
          isCorrect: false,
          feedback: "Błąd. U młodych pacjentów po wczesnej ewakuacji krwiaka większość powraca do całkowitej sprawności i pracy zawodowej."
        },
        {
          text: "Konieczność dożywotniego leczenia immunosupresyjnego cyklosporyną w celu zapobiegania odrzuceniu przeszczepionej kości sklepienia.",
          isCorrect: false,
          feedback: "Błąd. Kraniotomia wykorzystuje własną kość pacjenta (autograft); nie wymaga żadnej immunosupresji."
        }
      ]
    }
  ],

  163: [
    {
      title: "Krok 1: Wstępna ocena ABCDE i rozpoznanie ostrego bólu oka z bólami głowy",
      desc: "64-latka zgłasza się z nagłym, silnym bólem prawego oka i połowy głowy, nudnościami, wymiotami i widzeniem tęczowych kół wokół źródeł światła. RR 160/95 mmHg, HR 92/min.",
      options: [
        {
          text: "Wstępna ocena ABCDE, kaniulacja żyły, podanie leków przeciwwymiotnych i przeciwbólowych oraz natychmiastowe badanie okulistyczne w kierunku jaskry ostrej.",
          isCorrect: true,
          feedback: "Prawidłowo! Zespół objawów (ból oka, głowy, nudności, tęczowe koła) to podręcznikowy obraz ostrego zamknięcia kąta przesączania (AACG)."
        },
        {
          text: "Rozpoznanie ostrego zapalenia żołądkowo-jelitowego i odesłanie pacjentki do oddziału zakaźnego bez oglądania gałek ocznych.",
          isCorrect: false,
          feedback: "Błąd. Nudności i wymioty w jaskrze są objawem wegetatywnym wywołanym podrażnieniem nerwu trójdzielnego; zlekceważenie oka grozi ślepotą."
        },
        {
          text: "Podanie kropli rozszerzających źrenicę (1% atropiny) do prawego oka w celu ułatwienia badania dna oka przez lekarza dyżurnego SOR.",
          isCorrect: false,
          feedback: "Błąd. Podanie leku mydriatycznego w ostrym kącie zepchnie tęczówkę w kąt przesączania i wywoła natychmiastową nieodwracalną utratę wzroku!"
        },
        {
          text: "Wykonanie nakłucia lędźwiowego w celu poszukiwania zapalenia opon mózgowo-rdzeniowych u pacjentki z bólem oka i wymiotami.",
          isCorrect: false,
          feedback: "Błąd. Objawy dotyczą gałki ocznej; diagnostyka okulistyczna i pomiar ciśnienia wewnątrzgałkowego są priorytetem przed procedurami inwazyjnymi."
        }
      ]
    },
    {
      title: "Krok 2: Badanie przedmiotowe oka w lampie szczelinowej i badanie palpacyjne",
      desc: "Jakie odchylenia w badaniu przedmiotowym gałki ocznej potwierdzają ostre zamknięcie kąta przesączania?",
      options: [
        {
          text: "Przekrwienie rzęskowe (oko czerwone), obrzęk i zamglenie rogówki, średnio szeroka sztywna źrenica oraz twarda jak kamień gałka oczna przy badaniu palpacyjnym.",
          isCorrect: true,
          feedback: "Prawidłowo! Obrzęk rogówki, sztywna średnio szeroka źrenica (porażenie zwieracza z niedokrwienia) i wzmożone napięcie gałki to cechy patognomoniczne."
        },
        {
          text: "Idealnie przejrzysta rogówka, wąska szpilkowata źrenica reagująca żywo na światło oraz miękka, zapadnięta gałka oczna.",
          isCorrect: false,
          feedback: "Błąd. W jaskrze ostrej źrenica jest poszerzona i zablokowana, a wysokie ciśnienie płynu czyni gałkę oczną twardą jak kamień."
        },
        {
          text: "Obfita ropa w worku spojówkowym sklejająca rzęsy z całkowitym brakiem jakiegokolwiek bólu głowy u pacjentki.",
          isCorrect: false,
          feedback: "Błąd. Ropny wyciek wskazuje na bakteryjne zapalenie spojówek, które nie powoduje zniekształcenia źrenicy, wymiotów ani twardości gałki."
        },
        {
          text: "Obecność ciała obcego ze stali magnetycznej wbitego głęboko w soczewkę oka u pacjentki bez wywiadu urazowego.",
          isCorrect: false,
          feedback: "Błąd. Objawy wynikają z bloku anatomicznego kąta przesączania u predysponowanej osoby, a nie z penetrującego urazu gałki ocznej."
        }
      ]
    },
    {
      title: "Krok 3: Tonometria CITO (Pomiar ciśnienia wewnątrzgałkowego IOP)",
      desc: "Zmierzono ciśnienie wewnątrzgałkowe (IOP) za pomocą tonometru aplanacyjnego. Jaki wynik potwierdza napad jaskry ostrej (norma 10–21 mmHg)?",
      options: [
        {
          text: "Wzrost ciśnienia wewnątrzgałkowego do wartości 50–70 mmHg (lub wyższych), stanowiący bezpośrednie zagrożenie martwicą niedokrwienną nerwu wzrokowego.",
          isCorrect: true,
          feedback: "Prawidłowo! Skrajny wzrost IOP (> 50 mmHg) odcina przepływ krwi w naczyniach siatkówki i tarczy nerwu II; zwłoka w leczeniu grozi ślepotą w ciągu kilku godzin."
        },
        {
          text: "Spadek ciśnienia wewnątrzgałkowego poniżej 4 mmHg świadczący o całkowitym wycieku cieczy wodnistej na zewnątrz gałki.",
          isCorrect: false,
          feedback: "Błąd. W jaskrze ostrej płyn nie może odpłynąć przez zablokowaną beleczkowatą siatkę kąta, co wywołuje skrajny wzrost, a nie spadek ciśnienia."
        },
        {
          text: "Prawidłowe ciśnienie wewnątrzgałkowe wynoszące dokładnie 14 mmHg w obu oczach wykluczające jakąkolwiek patologię okulistyczną.",
          isCorrect: false,
          feedback: "Błąd. Twarda jak kamień gałka oczna z obrzękiem rogówki w ostrym napadzie zawsze wykazuje skrajnie wysokie wartości ciśnienia (IOP > 40-50)."
        },
        {
          text: "Różnica ciśnień pomiędzy okiem lewym a prawym nieprzekraczająca 0,5 mmHg przy braku jakichkolwiek odchyleń od normy.",
          isCorrect: false,
          feedback: "Błąd. Napad jaskry ostrej zazwyczaj dotyczy jednego oka, wywołując potężną asymetrię ciśnień (np. 65 mmHg w chorym vs 16 mmHg w zdrowym)."
        }
      ]
    },
    {
      title: "Krok 4: Natychmiastowe obniżenie ciśnienia ogólnego (Acetazolamid / Mannitol)",
      desc: "Jakie leczenie farmakologiczne o działaniu ogólnoustrojowym należy wdrożyć natychmiast w celu zatrzymania produkcji i odwodnienia gałki ocznej?",
      options: [
        {
          text: "Acetazolamid 500 mg dożylnie (inhibitor anhydrazy węglanowej) oraz w razie braku spadku IOP – 20% mannitol 1–2 g/kg m.c. w szybkim wlewie i.v.",
          isCorrect: true,
          feedback: "Prawidłowo! Acetazolamid i.v. hamuje syntezę cieczy wodnistej w ciele rzęskowym, a mannitol osmotycznie odwadnia ciało szkliste, obniżając IOP."
        },
        {
          text: "Podanie dożylne 1000 ml 0,9% NaCl w szybkim bolusie pod ciśnieniem w celu rozcieńczenia cieczy wodnistej w komorze przedniej.",
          isCorrect: false,
          feedback: "Błąd. Szybka płynoterapia może nasilić produkcję cieczy wodnistej i zwiększyć ciśnienie w gałce ocznej."
        },
        {
          text: "Podanie dużych dawek witaminy A w kroplach doustnych w celu regeneracji rodopsyny w komórkach pręcikowych siatkówki oka.",
          isCorrect: false,
          feedback: "Błąd. Witamina A nie ma wpływu na ciśnienie wewnątrzgałkowe ani kąt przesączania; nie stanowi leku ratunkowego w jaskrze ostrej."
        },
        {
          text: "Zastosowanie dożylnego wlewu noradrenaliny w wysokiej dawce w celu wywołania skurczu naczyń gałki ocznej u normotensyjnej pacjentki.",
          isCorrect: false,
          feedback: "Błąd. Wazopresory podniosą ciśnienie tętnicze i nie odblokują kąta przesączania; lekiem z wyboru są inhibitory anhydrazy i diuretyki osmotyczne."
        }
      ]
    },
    {
      title: "Krok 5: Miejscowa farmakoterapia okulistyczna (Krople hipotensyjne)",
      desc: "Jakie krople do oczu należy zastosować miejscowo równolegle z lekami ogólnoustrojowymi?",
      options: [
        {
          text: "Miejscowy beta-bloker (np. tymolol 0,5%), alfa-2-agonista (np. brymonidyna 0,2%) oraz miejscowy steryd (np. deksametazon) w celu redukcji stanu zapalnego.",
          isCorrect: true,
          feedback: "Prawidłowo! Tymolol i brymonidyna zmniejszają produkcję cieczy wodnistej, a steryd miejscowy wygasza wtórny odczyn zapalny w przednim odcinku oka."
        },
        {
          text: "Krople rozszerzające źrenicę zawierające 10% fenylefrynę i tropikamid podawane co 5 minut do chorego oka.",
          isCorrect: false,
          feedback: "Błąd. Leki rozszerzające źrenicę są bezwzględnie zakazane w zamkniętym kącie; całkowicie blokują beleczkowanie i prowadzą do ślepoty."
        },
        {
          text: "Zakraplanie czystej oliwy z oliwek o temperaturze pokojowej w celu nawilżenia wysuszonego nabłonka rogówki oka.",
          isCorrect: false,
          feedback: "Błąd. Zanieczyszczone płyny domowe wywołają zapalenie wnętrza gałki ocznej i nie wpływają na ciśnienie wewnątrzgałkowe."
        },
        {
          text: "Stosowanie wyłącznie soli fizjologicznej bez konserwantów bez podawania jakichkolwiek leków obniżających ciśnienie w oku.",
          isCorrect: false,
          feedback: "Błąd. Sama sól fizjologiczna nie obniży ciśnienia 60 mmHg; konieczne są silne miejscowe leki hipotensyjne i ogólne."
        }
      ]
    },
    {
      title: "Krok 6: Zastosowanie leków zwężających źrenicę (Miotyki / Pilokarpina)",
      desc: "Kiedy i w jaki sposób należy podać krople z pilokarpiny (miotyka zwężającego źrenicę i odciągającego tęczówkę od kąta przesączania)?",
      options: [
        {
          text: "Pilokarpinę 1–2% podaje się dopiero po wstępnym obniżeniu IOP (< 40 mmHg), gdy ustąpi niedokrwienne porażenie zwieracza źrenicy i odzyska on reaktywność.",
          isCorrect: true,
          feedback: "Prawidłowo! Przy IOP > 50 mmHg zwieracz źrenicy jest porażony niedokrwiennie i pilokarpina nie działa; podaje się ją po zadziałaniu acetazolamidu i mannitolu."
        },
        {
          text: "Pilokarpinę należy podać w dawce uderzeniowej 50 kropli bezpośrednio przed jakimkolwiek innym lekiem ogólnoustrojowym przy IOP 70 mmHg.",
          isCorrect: false,
          feedback: "Błąd. Przy skrajnym ciśnieniu zwieracz nie zareaguje, a nadmiar pilokarpiny może wchłonąć się ogólnoustrojowo i wywołać objawy cholinergiczne."
        },
        {
          text: "Pilokarpina jest lekiem bezwzględnie przeciwwskazanym w jaskrze z zamkniętym kątem i wolno ją stosować jedynie w zaćmie jądrowej.",
          isCorrect: false,
          feedback: "Błąd. Wręcz przeciwnie – zwężenie źrenicy odciąga obwód tęczówki od siatki beleczkowej, otwierając kąt; jest to lek kluczowy po obniżeniu IOP."
        },
        {
          text: "Pilokarpinę należy wstrzykiwać wyłącznie dożylnie w dawce 500 mg w celu wywołania uogólnionego skurczu mięśni gładkich ustroju.",
          isCorrect: false,
          feedback: "Błąd. Dożylne podanie pilokarpiny wywołałoby śmiertelny przełom cholinergiczny (bradykardia, obrzęk płuc, drgawki); lek stosuje się miejscowo w kroplach."
        }
      ]
    },
    {
      title: "Krok 7: Zabezpieczenie drugiego oka (Oko współczulne)",
      desc: "Napad ostrego zamknięcia kąta wystąpił w prawym oku. Jakie postępowanie należy wdrożyć w odniesieniu do lewego, bezobjawowego oka pacjentki?",
      options: [
        {
          text: "Profilaktyczne podanie pilokarpiny 1% do drugiego oka oraz planowa laserowa irydotomia obwodowa drugiego oka z uwagi na obustronną predyspozycję anatomiczną.",
          isCorrect: true,
          feedback: "Prawidłowo! Wąski kąt przesączania jest cechą obustronną. Bez profilaktyki drugie oko rozwija ostry napad jaskry w ciągu kilku lat u > 50% chorych."
        },
        {
          text: "Całkowite zignorowanie drugiego oka, ponieważ napad jaskry ostrej uodparnia drugie oko na jakiekolwiek zmiany ciśnienia do końca życia.",
          isCorrect: false,
          feedback: "Błąd. Nie ma żadnego zjawiska 'uodpornienia'; drugie oko ma identyczną budowę anatomiczną (płytka komora przednia) i jest w skrajnym zagrożeniu."
        },
        {
          text: "Zalecenie profilaktycznego chirurgicznego usunięcia lewej gałki ocznej w celu ochrony przed przyszłym bólem głowy.",
          isCorrect: false,
          feedback: "Błąd. Enukleacja zdrowego oka to absurdalny i okaleczający błąd; profilaktyka polega na bezpiecznej laserowej irydotomii obwodowej."
        },
        {
          text: "Zakraplanie do drugiego oka kropli rozszerzających źrenicę w celu przyspieszenia naturalnego odpływu cieczy wodnistej.",
          isCorrect: false,
          feedback: "Błąd. Krople mydriatyczne w oku z wąskim kątem natychmiast wywołają jatrogenny napad jaskry ostrej w drugim oku!"
        }
      ]
    },
    {
      title: "Krok 8: Leczenie definitywne (Laserowa irydotomia obwodowa)",
      desc: "Po zastosowaniu acetazolamidu, mannitolu i kropli ciśnienie w oku spadło do 18 mmHg, a rogówka odzyskała przejrzystość. Jaki jest definitywny zabieg z wyboru?",
      options: [
        {
          text: "Laserowa irydotomia obwodowa Nd:YAG (wytworzenie otworu w obwodowej części tęczówki łączącego komorę tylną z przednią i wyrównującego ciśnienia).",
          isCorrect: true,
          feedback: "Prawidłowo! Irydotomia laserowa YAG tworzy alternatywną drogę przepływu cieczy wodnistej, trwale likwiduje blok źreniczny i zapobiega nawrotom napadu."
        },
        {
          text: "Wykonanie głębokiej enukleacji gałki ocznej i zastąpienie jej ruchomą protezą akrylową w celu całkowitego wyleczenia.",
          isCorrect: false,
          feedback: "Błąd. Usunięcie oka, które odzyskało prawidłowe ciśnienie i wzrok, jest działaniem bezprawnym i błędem lekarskim."
        },
        {
          text: "Założenie zewnętrznego opatrunku uciskowego z opaską elastyczną na okres 6 miesięcy bez wykonywania jakichkolwiek zabiegów laserowych.",
          isCorrect: false,
          feedback: "Błąd. Opatrunek uciskowy z zewnątrz podniesie ciśnienie w gałce ocznej i nie usunie przyczyny bloku anatomicznego tęczówki."
        },
        {
          text: "Wstrzyknięcie do wnętrza komory przedniej oka 10 ml cementu kostnego w celu mechanicznego usztywnienia kąta przesączania.",
          isCorrect: false,
          feedback: "Błąd. Cement zniszczyłby wszystkie struktury oka i doprowadził do nieodwracalnej utraty widzenia."
        }
      ]
    }
  ],

  164: [
    {
      title: "Krok 1: Wstępna ocena ABCDE i rozpoznanie ostrego zawału siatkówki",
      desc: "71-latek zgłasza się z nagłą, całkowitą i bezbolesną utratą widzenia w lewym oku, która wystąpiła nagle 45 minut temu podczas śniadania. RR 165/90 mmHg, HR 76/min.",
      options: [
        {
          text: "Wstępna ocena ABCDE, kaniulacja żyły, wykluczenie urazu i bólu, EKG oraz natychmiastowe potraktowanie pacjenta jako ekwiwalentu udaru mózgu (kod udarowy).",
          isCorrect: true,
          feedback: "Prawidłowo! Nagła bezbolesna jednooczna utrata widzenia to objaw zatoru tętnicy środkowej siatkówki (CRAO) – ekwiwalentu udaru niedokrwiennego mózgowia."
        },
        {
          text: "Zalecenie zażycia kropli nawilżających ze świetlikiem i zgłoszenia się do poradni okulistycznej za 3 tygodnie na badanie ostrości wzroku.",
          isCorrect: false,
          feedback: "Błąd. W zatorze CRAO okno terapeutyczne na uratowanie widzenia to zaledwie kilkadziesiąt minut do 4 godzin; zwłoka prowadzi do trwałej ślepoty."
        },
        {
          text: "Podanie dożylne 100 mg morfiny w szybkim bolusie z podejrzeniem rzekomego ostrego zawału tylnej ściany mięśnia sercowego.",
          isCorrect: false,
          feedback: "Błąd. Pacjent nie zgłasza bólu klatki ani oka; utrata widzenia to problem naczyniowy oka wymagający pilnego udrożnienia tętnicy siatkówki."
        },
        {
          text: "Wykonanie natychmiastowej amputacji małżowiny usznej po stronie chorego oka w celu zmniejszenia oporu w naczyniach głowy.",
          isCorrect: false,
          feedback: "Błąd. Postępowanie całkowicie absurdalne i okaleczające; CRAO wymaga interwencji w mikrokrążeniu tętniczym siatkówki."
        }
      ]
    },
    {
      title: "Krok 2: Badanie dna oka w oftalmoskopii (Objaw wisienki)",
      desc: "Wykonano badanie dna oka po uprzednim poszerzeniu źrenicy. Jaki obraz oftalmoskopowy jest patognomoniczny dla ostrego zatoru tętnicy środkowej siatkówki (CRAO)?",
      options: [
        {
          text: "Blada, mlecznobiała, obrzęknięta siatkówka z widocznym w dołku środkowym jaskrawoczerwonym punktem – tzw. objawem wisienki na dnie oka (cherry-red spot).",
          isCorrect: true,
          feedback: "Prawidłowo! Obrzęk niedokrwienny warstwy włókien nerwowych powoduje jej zblednięcie; w dołku, gdzie siatkówka jest najcieńsza, prześwituje unaczyniona naczyniówka."
        },
        {
          text: "Obecność licznych płomykowatych wybroczyn krwotocznych we wszystkich czterech kwadrantach dna oka dających obraz 'krwią zalanego dna oka'.",
          isCorrect: false,
          feedback: "Błąd. Obraz 'krwią zalanego dna oka' jest typowy dla zakrzepu żyły środkowej siatkówki (CRVO), a nie dla zatoru tętnicy (CRAO)."
        },
        {
          text: "Idealnie różowe dno oka z symetrycznymi, szerokimi naczyniami tętniczymi i żylnymi bez jakichkolwiek cech obrzęku siatkówki.",
          isCorrect: false,
          feedback: "Błąd. W CRAO dochodzi do natychmiastowego zblednięcia siatkówki i zwężenia tętnic do wąskich nitek, w których widać segmentację słupa krwi."
        },
        {
          text: "Całkowite odwarstwienie siatkówki w postaci pęcherza z widocznym olbrzymim rozdarciem w dolnym kwadrancie skroniowym.",
          isCorrect: false,
          feedback: "Błąd. Odwarstwienie siatkówki (rhegmatogenous retinal detachment) daje objaw 'zasłony' w polu widzenia i fałdy siatkówki, a nie mlecznobiały obrzęk z wisienką."
        }
      ]
    },
    {
      title: "Krok 3: Okno czasowe i patofizjologia martwicy komórek zwojowych",
      desc: "Ile wynosi krytyczne okno czasowe od momentu zamknięcia tętnicy środkowej siatkówki, po którym dochodzi do nieodwracalnej martwicy komórek nerwowych?",
      options: [
        {
          text: "Komórki zwojowe siatkówki ulegają nieodwracalnej martwicy po 90–240 minutach (do 4–4,5 h); interwencja ratunkowa musi nastąpić natychmiast.",
          isCorrect: true,
          feedback: "Prawidłowo! Siatkówka jest częścią ośrodkowego układu nerwowego o najwyższym metabolizmie tlenowym; po 4 godzinach niedokrwienia szanse na wzrok są minimalne."
        },
        {
          text: "Okno czasowe wynosi 14 dni, dlatego pacjent może bezpiecznie zaczekać na planowe badanie w poradni okulistycznej.",
          isCorrect: false,
          feedback: "Błąd. Po kilkunastu godzinach dochodzi do całkowitego zaniku komórek zwojowych i trwałej ślepoty; czas ma kluczowe znaczenie."
        },
        {
          text: "Siatkówka oka nie potrzebuje dopływu tlenu, ponieważ pobiera składniki odżywcze bezpośrednio z powietrza atmosferycznego przez rogówkę.",
          isCorrect: false,
          feedback: "Błąd. Rogówka pobiera tlen z powietrza, ale siatkówka leży głęboko w oku i jest w 100% zależna od perfuzji naczyniowej tętnicy środkowej siatkówki."
        },
        {
          text: "Okno terapeutyczne wynosi dokładnie 30 sekund, po czym cała gałka oczna ulega samoistnemu stopieniu.",
          isCorrect: false,
          feedback: "Błąd. Martwica komórek nerwowych rozwija się w ciągu 90–240 minut, co daje wąskie, ale realne okno na interwencję ratunkową."
        }
      ]
    },
    {
      title: "Krok 4: Doraźne mechaniczne procedury ratunkowe (Masaż gałki i karbogen)",
      desc: "Jakie proste procedury mechaniczne może natychmiast wdrożyć lekarz SOR w celu próby przemieszczenia zatoru w głąb łożyska naczyniowego?",
      options: [
        {
          text: "Masaż gałki ocznej (naprzemienny ucisk przez powieki przez 10–15 s i zwolnienie) oraz oddychanie do torebki papierowej (lub karbogen: 95% O2 + 5% CO2).",
          isCorrect: true,
          feedback: "Prawidłowo! Masaż wywołuje gwałtowne wahania IOP ułatwiające przesunięcie zatoru do mniejszych gałązek, a CO2 działa silnie wazodylatacyjnie na tętnice siatkówki."
        },
        {
          text: "Intensywne uciskanie obu gałek ocznych przez 30 minut z siłą 20 kg bez jakichkolwiek przerw na odbarczenie.",
          isCorrect: false,
          feedback: "Błąd. Taki ciągły ucisk doprowadzi do pęknięcia gałki ocznej, uszkodzenia rogówki i odcięcia krążenia w całym oczodole."
        },
        {
          text: "Podanie do oka 10 ml wrzącej wody w celu rozpuszczenia kryształków cholesterolu w naczyniach tętniczych siatkówki.",
          isCorrect: false,
          feedback: "Błąd. Wrzątek wywoła oparzenie rogówki i nieodwracalne zniszczenie oka; procedury muszą być bezpieczne i zgodne ze sztuką."
        },
        {
          text: "Nakazanie pacjentowi intensywnego wstrzymywania oddechu w próbie Valsalvy przez okres co najmniej 15 minut.",
          isCorrect: false,
          feedback: "Błąd. Długotrwała próba Valsalvy drastycznie zwiększa ciśnienie żylne i utrudnia odpływ krwi z głowy, pogarszając perfuzję siatkówki."
        }
      ]
    },
    {
      title: "Krok 5: Doraźne farmakologiczne obniżenie ciśnienia wewnątrzgałkowego",
      desc: "Gwałtowne obniżenie IOP zwiększa ciśnienie perfuzyjne siatkówki i pomaga przepchnąć zator. Jakie leki i zabieg może wykonać okulista na SOR?",
      options: [
        {
          text: "Podanie acetazolamidu 500 mg i.v., kropli hipotensyjnych (tymolol 0,5%) oraz wykonanie paracentezy komory przedniej (nakłucie igłą 27G i upuszczenie płynu).",
          isCorrect: true,
          feedback: "Prawidłowo! Spadek IOP gwałtownie zwiększa gradient ciśnień w tętnicy środkowej siatkówki, sprzyjając embolizacji dystalnej i odbarczeniu plamki."
        },
        {
          text: "Wstrzyknięcie do komory przedniej oka 2 ml czystego wosku pszczelego w celu usztywnienia rogówki pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Wstrzyknięcie wosku doprowadziłoby do całkowitego zniszczenia struktur oka i trwałej utraty widzenia."
        },
        {
          text: "Zastosowanie dożylnego wlewu glukozy 40% w objętości 1000 ml w celu wywołania obrzęku komórek zwojowych siatkówki.",
          isCorrect: false,
          feedback: "Błąd. Hipertoniczna glukoza nie jest lekiem z wyboru w CRAO; celem jest szybkie obniżenie ciśnienia wewnątrzgałkowego lekami hamującymi ciecz wodnistą."
        },
        {
          text: "Zalecenie picia 4 litrów wody mineralnej wysokozmineralizowanej w ciągu pierwszych 10 minut dyżuru na SOR.",
          isCorrect: false,
          feedback: "Błąd. Wypicie dużej ilości płynów może paradoksalnie podnieść ciśnienie wewnątrzgałkowe, utrudniając przepływ krwi przez siatkówkę."
        }
      ]
    },
    {
      title: "Krok 6: Zaawansowane leczenie trombolityczne w oknie czasowym",
      desc: "Jeśli pacjent trafi do wyspecjalizowanego ośrodka udarowego w czasie < 4,5 h od początku objawów, jaka terapia celowana może być rozważona?",
      options: [
        {
          text: "Selektywna dotętnicza fibrynoliza (podanie alteplazy bezpośrednio do tętnicy ocznej w pracowni angiograficznej) lub dożylna tromboliza rtPA.",
          isCorrect: true,
          feedback: "Prawidłowo! W wyspecjalizowanych centrach w oknie < 4,5 h tromboliza może rozpuścić zator zakrzepowy i przywrócić perfuzję plamki."
        },
        {
          text: "Podanie dożylne 1000 mg witaminy K w celu natychmiastowego zagęszczenia krwi i wzmocnienia ściany naczynia siatkówkowego.",
          isCorrect: false,
          feedback: "Błąd. Witamina K promuje syntezę czynników krzepnięcia i nasila zakrzepicę; celem w zatorowości tętniczej jest tromboliza i leki przeciwkrzepliwe."
        },
        {
          text: "Wykonanie całkowitej transfuzji wymiennej krwi u pacjenta na sali operacyjnej okulistyki bez wskazań hematologicznych.",
          isCorrect: false,
          feedback: "Błąd. Transfuzja wymienna jest procedurą obarczoną ryzykiem i nie rozpuści zatoru w tętnicy siatkówki."
        },
        {
          text: "Zastosowanie naświetlania promieniami UV-C bezpośrednio na otwartą rogówkę oka w celu dezynfekcji naczyniowej.",
          isCorrect: false,
          feedback: "Błąd. Promieniowanie UV wywoła ciężkie oparzenie rogówki i zaćmę popromienną; jest bezwzględnie szkodliwe dla tkanek oka."
        }
      ]
    },
    {
      title: "Krok 7: Diagnostyka etiologiczna źródła zatoru (Naczynia szyjne i serce)",
      desc: "Zator tętnicy siatkówki najczęściej pochodzi ze skrzepliny lub blaszki miażdżycowej. Jakie badania diagnostyczne należy pilnie wykonać?",
      options: [
        {
          text: "Pilne USG Doppler tętnic szyjnych (poszukiwanie zwężenia ICA i zatoru Hollenhorsta), badanie ECHO serca oraz Holter EKG pod kątem arytmii.",
          isCorrect: true,
          feedback: "Prawidłowo! CRAO to zwiastun udaru mózgu; > 70% zatorów pochodzi z blaszki miażdżycowej tętnicy szyjnej wewnętrznej lub z uszka lewego przedsionka w AF."
        },
        {
          text: "Przeglądowe zdjęcie RTG obu stóp w celu poszukiwania ostrogi piętowej jako potencjalnego źródła mikrozatorowości tętniczej w głowie.",
          isCorrect: false,
          feedback: "Błąd. Ostroga piętowa to zmiana zwyrodnieniowa kości stopy i nie ma żadnego związku z układem krążenia tętniczego głowy."
        },
        {
          text: "Badanie laboratoryjne kału na obecność resztek niestrawionego pokarmu i jaj pasożytów jako rzekomy element diagnostyki zatorowości oka.",
          isCorrect: false,
          feedback: "Błąd. Przewód pokarmowy nie ma związku z zatorowością tętniczą siatkówki; badania muszą skupić się na tętnicach szyjnych i sercu."
        },
        {
          text: "Wykonanie głębokiej biopsji mięśnia czworogłowego uda u każdego pacjenta z nagłą ślepotą jednooczną na ostrym dyżurze okulistycznym.",
          isCorrect: false,
          feedback: "Błąd. Biopsja mięśnia jest procedurą inwazyjną stosowaną w miopatiach i jest całkowicie bezzasadna w zatorze tętnicy siatkówki."
        }
      ]
    },
    {
      title: "Krok 8: Profilaktyka wtórna i dyspozycja na Oddział Udarowy",
      desc: "Jakie leczenie przewlekłe i dyspozycja oddziałowa są kluczowe dla ochrony pacjenta przed wystąpieniem dokonanego udaru mózgu w kolejnych dniach?",
      options: [
        {
          text: "Hospitalizacja na Oddziale Udarowym / Neurologii, wdrożenie leczenia przeciwpłytkowego (ASA / klopidogrel), wysokiej dawki statyny oraz kontrola ciśnienia tętniczego.",
          isCorrect: true,
          feedback: "Prawidłowo! Pacjent z CRAO ma skrajnie wysokie ryzyko udaru niedokrwiennego mózgu w ciągu pierwszych tygodni; wymaga pełnego protokołu ochrony naczyniowej."
        },
        {
          text: "Wypisanie pacjenta do domu bez leków z informacją, że utrata wzroku w jednym oku nie wpływa na ogólny stan zdrowia ani ryzyko udaru.",
          isCorrect: false,
          feedback: "Błąd. Nieleczony pacjent po CRAO w ciągu kilku miesięcy może doznać zawału mózgu z niedowładem połowiczym lub zgonu naczyniowego."
        },
        {
          text: "Zalecenie stosowania wyłącznie naparu z zielonej herbaty i całkowitego unikania kontaktu z personelem medycznym przez 12 miesięcy.",
          isCorrect: false,
          feedback: "Błąd. Pacjent wymaga profesjonalnej opieki naczyniowej, leków przeciwpłytkowych i kwalifikacji do ewentualnej endarterektomii tętnicy szyjnej."
        },
        {
          text: "Wdrożenie dożywotniej chemioterapii metotreksatem w dawkach onkologicznych z podejrzeniem chłoniaka złośliwego gałki ocznej.",
          isCorrect: false,
          feedback: "Błąd. CRAO jest chorobą naczyniową (zakrzepowo-zatorową), a nie nowotworową; cytostatyki są całkowicie przeciwwskazane."
        }
      ]
    }
  ],

  165: [
    {
      title: "Krok 1: Wstępna ocena ABCDE i rozpoznanie ostrej infekcji głębokiej szyi",
      desc: "28-latek zgłasza się z dramatycznym bólem gardła po stronie lewej promieniującym do ucha, szczękościskiem (trismus), gorączką 39,2°C i głosem 'gorącego kartofla'. RR 120/75 mmHg, HR 105/min.",
      options: [
        {
          text: "Wstępna ocena ABCDE, zabezpieczenie drożności dróg oddechowych, tlenoterapia, kaniulacja żyły, pobranie krwi na morfologię i CRP oraz analgezja dożylna.",
          isCorrect: true,
          feedback: "Prawidłowo! Triada: jednostronny ból gardła, szczękościsk i 'mowa kluskowata' (hot potato voice) to klasyczny obraz ropnia okołomigdałkowego (peritonsillar abscess)."
        },
        {
          text: "Podanie pacjentowi twardego jabłka do żucia w celu siłowego rozbicia szczękościsku i rozszerzenia szpary ustnej przed badaniem.",
          isCorrect: false,
          feedback: "Błąd. Próba siłowego żucia przy ropniu nasila ból, stwarza ryzyko skurczu krtani i aspiracji ciała obcego do tchawicy."
        },
        {
          text: "Zalecenie płukania gardła wrzątkiem z solą kuchenną w warunkach domowych i powrót do domu na odpoczynek nocny.",
          isCorrect: false,
          feedback: "Błąd. Ropień okołomigdałkowy grozi sepsą, zstępującym zapaleniem śródpiersia i obrzękiem krtani; wymaga natychmiastowego zaopatrzenia zabiegowego."
        },
        {
          text: "Wykonanie nakłucia opłucnej igłą odbarczającą u pacjenta z bólem gardła i gorączką bez objawów ze strony klatki piersiowej.",
          isCorrect: false,
          feedback: "Błąd. Patologia dotyczy przestrzeni okołomigdałkowej gardła; nakłucie klatki piersiowej jest całkowicie bezpodstawne i niebezpieczne."
        }
      ]
    },
    {
      title: "Krok 2: Badanie laryngologiczne gardła i jamy ustnej",
      desc: "W ostrożnym badaniu jamy ustnej przy użyciu szpatułki (pomimo szczękościsku) co potwierdza obecność ropnia okołomigdałkowego?",
      options: [
        {
          text: "Asymetryczne, chełboczące uwypuklenie łuku podniebienno-językowego, zepchnięcie lewego migdałka do linii pośrodkowej i zbaczanie języczka na stronę zdrową (prawą).",
          isCorrect: true,
          feedback: "Prawidłowo! Wypchnięcie migdałka do środka i zbaczanie obrzękniętego języczka na stronę przeciwną (zdrową) to kluczowe cechy ropnia okołomigdałkowego."
        },
        {
          text: "Idealnie symetryczne, drobne migdałki schowane za łukami podniebiennymi z prawidłowo ustawionym języczkiem w linii pośrodkowej.",
          isCorrect: false,
          feedback: "Błąd. Ropień okołomigdałkowy wywołuje wyraźną, masywną asymetrię łuków gardłowych i przemieszczenie języczka w stronę przeciwną."
        },
        {
          text: "Obecność czarnego nalotu martwiczego na wargach i czubku języka bez jakichkolwiek zmian na podniebieniu miękkim.",
          isCorrect: false,
          feedback: "Błąd. Zmiany zlokalizowane są w loży migdałka i przestrzeni okołomigdałkowej, dając uwypuklenie podniebienia miękkiego."
        },
        {
          text: "Całkowity brak migdałków podniebiennych w badaniu wzrokowym spowodowany ich rzekomym wyparowaniem pod wpływem gorączki.",
          isCorrect: false,
          feedback: "Błąd. Tkanki nie ulegają wyparowaniu; migdałek jest powiększony, zepchnięty przez zbiornik ropny gromadzący się między torebką migdałka a powięzią gardła."
        }
      ]
    },
    {
      title: "Krok 3: Ocena drożności dróg oddechowych i wykluczenie powikłań zstępujących",
      desc: "Na jakie groźne powikłanie ropnia przestrzeni głębokich szyi, zagrażające nagłym uduszeniem lub sepsą, należy bezwzględnie zwrócić uwagę?",
      options: [
        {
          text: "Obrzęk krtani (duszność krtaniowa) oraz szerzenie się zakażenia do przestrzeni przygardłowej i śródpiersia (zstępujące zapalenie śródpiersia).",
          isCorrect: true,
          feedback: "Prawidłowo! Nierozpoznany ropień może przebić się do przestrzeni zagardłowej/przygardłowej i spłynąć do śródpiersia (śmiertelność > 40%) lub zamknąć krtań."
        },
        {
          text: "Przejście procesu zapalnego na dystalne stawy skokowe z koniecznością natychmiastowego unieruchomienia obu nóg w syntetycznym opatrunku gipsowym.",
          isCorrect: false,
          feedback: "Błąd. Ropień okołomigdałkowy szerzy się w przestrzeniach powięziowych szyi i śródpiersia, a nie w dystalnych stawach kończyn dolnych."
        },
        {
          text: "Rozwój ostrej zaćmy obuocznej oraz ślepoty w mechanizmie rzekomego ucisku ropnia gardła na skrzyżowanie nerwów wzrokowych w mózgowiu pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Przestrzeń okołomigdałkowa leży poniżej podstawy czaszki; jej powikłania dotyczą dróg oddechowych, naczyń szyjnych (zespół Lemierre'a) i śródpiersia."
        },
        {
          text: "Samoistne pęknięcie śledziony w jamie brzusznej z krwotokiem wewnętrznym bez jakichkolwiek objawów miejscowych w obrębie gardła pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Pęknięcie śledziony może wystąpić w mononukleozie, ale w bakteryjnym ropniu okołomigdałkowym kluczowym zagrożeniem jest duszność i zapalenie śródpiersia."
        }
      ]
    },
    {
      title: "Krok 4: Analgezja dożylna i znieczulenie miejscowe przed zabiegiem",
      desc: "Szczękościsk i silny ból utrudniają interwencję zabiegową. Jakie przygotowanie farmakologiczne należy zastosować przed procedurą odbarczenia?",
      options: [
        {
          text: "Dożylne leki przeciwbólowe (np. paracetamol 1000 mg i.v. + tramadol 100 mg i.v.) oraz znieczulenie miejscowe błony śluzowej 10% aerozolem lidokainy.",
          isCorrect: true,
          feedback: "Prawidłowo! Skuteczna analgezja ogólna i znieczulenie miejscowe powierzchniowe (lub nasiękowe) łagodzą szczękościsk i umożliwiają bezpieczne nacięcie ropnia."
        },
        {
          text: "Całkowity zakaz stosowania jakichkolwiek leków przeciwbólowych i wykonanie zabiegu 'na żywo' w celu ukarania pacjenta za opóźnienie wizyty.",
          isCorrect: false,
          feedback: "Błąd. Postępowanie niehumanitarne, nieetyczne i niezgodne z prawem; pacjent ma prawo do skutecznego uśmierzania bólu przed zabiegiem."
        },
        {
          text: "Wprowadzenie pacjenta w głęboką sedację wziewną eterem bez obecności anestezjologa na korytarzu izby przyjęć.",
          isCorrect: false,
          feedback: "Błąd. Znieczulenie ogólne bez zabezpieczenia dróg oddechowych rurką z uszczelnionym mankietem grozi aspiracją ewakuowanej ropy i uduszeniem!"
        },
        {
          text: "Podanie dożylne 1000 mg morfiny w szybkim bolusie w celu natychmiastowego wywołania bezdechu u pacjenta przed zabiegiem.",
          isCorrect: false,
          feedback: "Błąd. Taka dawka morfiny jest śmiertelna; leki opioidowe dawkuje się ostrożnie i miareczkowanie pod nadzorem parametrów życiowych."
        }
      ]
    },
    {
      title: "Krok 5: Zabiegowe odbarczenie ropnia (Punkcja i nacięcie)",
      desc: "Jaka jest procedura zabiegowa z wyboru w leczeniu ostrego ropnia okołomigdałkowego wykonywana przez laryngologa na ostrym dyżurze?",
      options: [
        {
          text: "Punkcja igłą w punkcie uwypuklenia (ewakuacja ropy), nacięcie skalpelem i poszerzenie kleszczykami Peana w celu pełnego drenażu loży ropnia.",
          isCorrect: true,
          feedback: "Prawidłowo! Ewakuacja ropy przynosi natychmiastową ulgę w bólu, znosi szczękościsk i zapobiega szerzeniu się zakażenia do tkanek głębokich szyi."
        },
        {
          text: "Wykonanie głębokiego cięcia przez skórę karku od tyłu i próba dotarcia do migdałka podniebiennego od strony kręgosłupa szyjnego pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Ropień okołomigdałkowy odbarcza się drogą wewnątrzustną przez podniebienie miękkie; dostęp tylny uszkodziłby rdzeń i naczynia kręgowe."
        },
        {
          text: "Zalecenie picia gęstego syropu z cebuli i miodu oraz całkowite zaniechanie jakichkolwiek procedur drenażowych w obrębie jamy ustnej pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Uformowany ropień (zbiornik ropy) wymaga bezwzględnego drenażu chirurgicznego; sama farmakoterapia nie wystarcza (Ubi pus, ibi evacua)."
        },
        {
          text: "Zmiażdżenie obu migdałków kleszczami mechanicznymi bez aspiracji treści ropnej ani nacinania śluzówki jamy ustnej pacjenta na ostrym dyżurze.",
          isCorrect: false,
          feedback: "Błąd. Zmiażdżenie tkanek wywołałoby masywny krwotok z tętnic migdałkowych i nie zapewniło kontrolowanego drenażu ropy."
        }
      ]
    },
    {
      title: "Krok 6: Diagnostyka mikrobiologiczna i posiew aspiratu",
      desc: "Z nacięcia uzyskano 12 ml gęstej, cuchnącej treści ropnej. Jakie postępowanie z materiałem biologicznym jest standardem?",
      options: [
        {
          text: "Pobranie ropy na posiew w kierunku bakterii tlenowych i beztlenowych oraz wykonanie preparatu bezpośredniego barwionego metodą Grama i antybiogramu.",
          isCorrect: true,
          feedback: "Prawidłowo! Etiologia ropnia okołomigdałkowego jest zazwyczaj mieszana (Streptococcus pyogenes, Fusobacterium necrophorum, Prevotella); posiew warunkuje celowaną terapię."
        },
        {
          text: "Natychmiastowe wylanie całej uzyskanej treści ropnej do zlewu bez jakichkolwiek badań mikrobiologicznych ani laboratoryjnych.",
          isCorrect: false,
          feedback: "Błąd. Brak posiewu uniemożliwia modyfikację antybiotykoterapii w przypadku oporności patogenów lub braku poprawy klinicznej."
        },
        {
          text: "Wstrzyknięcie pobranej ropy z powrotem do loży migdałka w celu pobudzenia miejscowej odporności leukocytarnej.",
          isCorrect: false,
          feedback: "Błąd. Działanie kuriozalne i skrajnie szkodliwe; podstawową zasadą chirurgii jest całkowita i trwała ewakuacja treści ropnej na zewnątrz."
        },
        {
          text: "Poddanie ropy działaniu promieniowania mikrofalowego w kuchence na korytarzu oddziału w celu jej sterylizacji.",
          isCorrect: false,
          feedback: "Błąd. Materiał przesyła się niezwłocznie w jałowym podłożu transportowym do certyfikowanego laboratorium mikrobiologicznego."
        }
      ]
    },
    {
      title: "Krok 7: Celowana antybiotykoterapia parenteralna i sterydoterapia",
      desc: "Jaki zestaw leków dożylnych należy wdrożyć po chirurgicznym zdrenowaniu ropnia okołomigdałkowego?",
      options: [
        {
          text: "Antybiotykoterapia dożylna pokrywająca paciorkowce i beztlenowce (np. ampicylina z sulbaktamem 1,5–3 g i.v. co 6 h lub ceftriakson + metronidazol) oraz deksametazon i.v.",
          isCorrect: true,
          feedback: "Prawidłowo! Skojarzenie antybiotyków beta-laktamowych z inhibitorem/metronidazolem zapewnia eradykację flory beztlenowej, a steryd (deksametazon) szybko redukuje obrzęk i trismus."
        },
        {
          text: "Monoterapia doustnym lekiem przeciwgrzybiczym (nystatyną w zawiesinie) bez podawania jakichkolwiek antybiotyków przeciwbakteryjnych.",
          isCorrect: false,
          feedback: "Błąd. Nystatyna działa wyłącznie miejscowo na drożdżaki i nie leczy bakteryjnej infekcji głębokich przestrzeni szyi."
        },
        {
          text: "Wdrożenie dożylnego wlewu amikacyny w monoterapii w dawce 5000 mg na dobę bez monitorowania stężenia leku we krwi ani wydolności nerek.",
          isCorrect: false,
          feedback: "Błąd. Aminoglikozydy są nieskuteczne wobec beztlenowców w środowisku ropnym i kwasowym, a taka dawka wywoła całkowitą nieodwracalną głuchotę i bezmocz."
        },
        {
          text: "Podanie dożylne chloramfenikolu w dawce uderzeniowej 20 g z zamiarem natychmiastowej sterylizacji całego krwioobiegu pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Taka dawka chloramfenikolu wywołałaby śmiertelną aplazję szpiku kostnego i zespół szarego dziecka; lek nie jest standardem w ropniu gardła."
        }
      ]
    },
    {
      title: "Krok 8: Wskazania do tonsillektomii i dyspozycja pooperacyjna",
      desc: "Pacjent czuje natychmiastową ulgę, gorączka spada. W wywiadzie podaje 5 przebytych angin bakteryjnych w ciągu ostatnich 2 lat. Jaka jest dyspozycja i plan leczenia?",
      options: [
        {
          text: "Hospitalizacja na oddziale laryngologii, płukanie loży ropnia, antybiotykoterapia parenteralna i kwalifikacja do planowej obustronnej tonsillektomii po 4–6 tygodniach.",
          isCorrect: true,
          feedback: "Prawidłowo! Nawrotowe anginy i przebyty ropień okołomigdałkowy są bezwzględnym wskazaniem do planowego wycięcia migdałków podniebiennych (tonsillectomia a froid)."
        },
        {
          text: "Natychmiastowe wypisanie pacjenta do domu bezpośrednio z fotela zabiegowego bez antybiotyków ani kontroli laryngologicznej.",
          isCorrect: false,
          feedback: "Błąd. Nacięty ropień ma tendencję do ponownego zamykania się i nawrotu wysięku; wymaga płukania, antybiotykoterapii i nadzoru przez min. 24-48 h."
        },
        {
          text: "Zalecenie całkowitego usunięcia krtani i strun głosowych w celu trwałego wyeliminowania ryzyka infekcji gardła w przyszłości.",
          isCorrect: false,
          feedback: "Błąd. Laryngektomia jest operacją onkologiczną w zaawansowanym raku krtani; wykonywanie jej z powodu ropnia migdałka byłoby zbrodnią lekarską."
        },
        {
          text: "Wdrożenie dożywotniej kwarantanny w warunkach szpitala jednoimiennego z powodu nosicielstwa bakterii w jamie ustnej.",
          isCorrect: false,
          feedback: "Błąd. Bakterie wywołujące ropień to typowa flora oportunistyczna górnych dróg oddechowych; pacjent nie wymaga żadnej kwarantanny."
        }
      ]
    }
  ]
};

async function run() {
  const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'cases', 'manifest.json'), 'utf8'));
  console.log('Expanding steps to 8 for Cases 161-165...');

  for (let id = 161; id <= 165; id++) {
    const file = manifest[id - 1];
    const fullPath = path.join(__dirname, '..', 'cases', file);
    const raw = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    const c = await decrypt(raw, MASTER_KEY);

    const newSteps = batch3Steps[id];
    verifyStepBalance(newSteps, id);
    c.steps = newSteps;

    const enc = await encrypt(c, MASTER_KEY);
    fs.writeFileSync(fullPath, JSON.stringify(enc, null, 2), 'utf8');
    console.log(`✓ Case #${id} updated with ${newSteps.length} full steps!`);
  }
}

run();

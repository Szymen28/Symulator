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

// BATCH 4: CASES 166 - 170 (8 STEPS EACH)
const batch4Steps = {
  166: [
    {
      title: "Krok 1: Wstępna ocena ABCDE i prawidłowa pozycja pacjenta",
      desc: "68-latek z nieleczonym nadciśnieniem tętniczym przywieziony z obfitym krwawieniem z obu przewodów nosowych i gardła. RR 195/105 mmHg, HR 98/min, blady, zakrwawiony.",
      options: [
        {
          text: "Wstępna ocena ABCDE, pozycja siedząca z głową lekko pochyloną do przodu, wypluwanie krwi do nerki, tlen, kaniulacja żyły i monitorowanie parametrów.",
          isCorrect: true,
          feedback: "Prawidłowo! Pochylenie głowy do przodu zapobiega połykaniu i zachłyśnięciu krwią do dróg oddechowych (odchylanie głowy w tył jest rażącym błędem!)."
        },
        {
          text: "Ułożenie pacjenta płasko na plecach z głową odchyloną maksymalnie ku tyłowi i polecenie połykania spływającej krwi do żołądka.",
          isCorrect: false,
          feedback: "Błąd. Odchylenie głowy w tył powoduje zachłyśnięcie krwią, skurcz krtani, a połknięta krew wywołuje nudności i gwałtowne krwawe wymioty."
        },
        {
          text: "Wdrożenie natychmiastowej intubacji dotchawiczej w pozycji stojącej bez wcześniejszej próby mechanicznego opanowania krwawienia.",
          isCorrect: false,
          feedback: "Błąd. Intubacja w pozycji stojącej jest technicznie niewykonalna; intubacja jest ostatecznością w załamaniu oddechowym lub śpiączce."
        },
        {
          text: "Podanie dożylne 1000 mg heparyny niefrakcjonowanej w celu rozpuszczenia skrzepów zatykających przewody nosowe u pacjenta na sali SOR.",
          isCorrect: false,
          feedback: "Błąd. Heparyna w trakcie aktywnego krwotoku całkowicie zniesie hemostazę i doprowadzi do masywnego wykrwawienia ze skutkiem śmiertelnym."
        }
      ]
    },
    {
      title: "Krok 2: Oczyszczenie jam nosa i bezpośredni ucisk mechaniczny",
      desc: "Przed przystąpieniem do jakichkolwiek zaawansowanych procedur, jaki podstawowy manewr hemostatyczny należy wykonać na sali przyjęć?",
      options: [
        {
          text: "Dokładne wydmuchanie skrzepów z nosa, a następnie ciągły, obustronny ucisk skrzydełek nosa palcami do przegrody przez pełne 10–15 minut bez odrywania rąk.",
          isCorrect: true,
          feedback: "Prawidłowo! Usunięcie skrzepów umożliwia bezpośredni docisk krwawiącego naczynia. Ciągły ucisk skrzydełek nosa zatrzymuje > 80% krwawień przednich."
        },
        {
          text: "Wprowadzenie suchych wacików kosmetycznych na głębokość 1 mm i natychmiastowe zwolnienie ucisku po 5 sekundach obserwacji.",
          isCorrect: false,
          feedback: "Błąd. Zbyt krótki ucisk nie pozwala na wytworzenie stabilnego czopa płytkowego; ucisk musi trwać nieprzerwanie minimum 10–15 minut."
        },
        {
          text: "Zalecenie intensywnego wciągania powietrza przez nos i powstrzymywania jakiegokolwiek wydmuchiwania skrzepów krwi z jam nosowych.",
          isCorrect: false,
          feedback: "Błąd. Pozostawione skrzepy podtrzymują krwawienie poprzez fibrynolizę; jamy nosa należy dokładnie oczyścić przed hemostazą."
        },
        {
          text: "Zastosowanie zewnętrznych okładów z gorącej parafiny na nasadę nosa w celu rozszerzenia naczyń splotu naczyniowego.",
          isCorrect: false,
          feedback: "Błąd. Ciepło nasila przekrwienie i krwawienie; w epistaxis stosuje się zimne okłady na kark i nasadę nosa w celu wazokonstrukcji."
        }
      ]
    },
    {
      title: "Krok 3: Miejscowa hemostaza farmakologiczna i anemizacja śluzówki",
      desc: "Po 15 minutach ucisku z nosa nadal sączy się krew. Jaki preparat miejscowy należy założyć do jamy nosa przed wziernikowaniem rynoskopowym?",
      options: [
        {
          text: "Wacik nasączony lekiem obkurczającym naczynia (np. 0,1% ksylometazolina / adrenalina 1:1000) z dodatkiem 2% lidokainy na okres 5–10 minut pod kontrolą wzroku.",
          isCorrect: true,
          feedback: "Prawidłowo! Leki wazokonstrykcyjne obkurczają naczynia błony śluzowej i zatrzymują drobne krwawienia, a lidokaina znieczula nos przed tamponadą."
        },
        {
          text: "Gazik nasączony czystym 96% alkoholem etylowym w celu chemicznej denaturacji tkanek małżowiny nosowej dolnej.",
          isCorrect: false,
          feedback: "Błąd. Spirytus wywoła ciężkie oparzenie chemiczne śluzówki nosa, martwicę i nasilenie krwawienia; jest bezwzględnie przeciwwskazany."
        },
        {
          text: "Wprowadzenie do przewodów nosowych proszku z mielonego pieprzu kajeńskiego w celu stymulacji odruchu kichania u pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Kichanie gwałtownie podnosi ciśnienie w naczyniach głowy i wywoła natychmiastowe rozerwanie splotów naczyniowych nosa."
        },
        {
          text: "Zakraplanie płynnej parafiny bez jakichkolwiek leków obkurczających naczynia krwionośne błony śluzowej nosa.",
          isCorrect: false,
          feedback: "Błąd. Parafina nawilża śluzówkę w krwawieniach przewlekłych, ale nie ma żadnego działania hemostatycznego w ostrym krwotoku."
        }
      ]
    },
    {
      title: "Krok 4: Różnicowanie krwawienia przedniego vs tylnego",
      desc: "W rynoskopii przedniej nie widać krwawiącego naczynia na przegrodzie nosa (splot Kiesselbacha), a krew obficie spływa po tylnej ścianie gardła. Co to oznacza?",
      options: [
        {
          text: "Krwawienie tylne (najczęściej z gałęzi tętnicy klinowo-podniebiennej – splot Woodruffa); wymaga założenia tamponady tylnej lub hemostazy inwazyjnej.",
          isCorrect: true,
          feedback: "Prawidłowo! Krwawienia tylne występują u osób starszych z nadciśnieniem i miażdżycą, są obfite, nie ustępują po ucisku przednim i grożą aspiracją."
        },
        {
          text: "Fizjologiczny wariant oczyszczania zatok obocznych nosa niewymagający żadnej interwencji ani leczenia ze strony personelu medycznego.",
          isCorrect: false,
          feedback: "Błąd. Krwawienie tylne to stan nagły, grożący wstrząsem hipowolemicznym, zachłyśnięciem krwią i zgonem; wymaga natychmiastowego zaopatrzenia."
        },
        {
          text: "Krwawienie z żylaków przełyku wydostające się przez jamę nosową w mechanizmie odwróconej fali perystaltycznej.",
          isCorrect: false,
          feedback: "Błąd. Żylaki przełyku dają krwawe wymioty z przewodu pokarmowego; spływanie krwi z nosogardła to typowy obraz epistaxis posterior."
        },
        {
          text: "Objaw pęknięcia tętniaka aorty brzusznej z przetoką do nosogardła u pacjenta z nieleczonym nadciśnieniem tętniczym.",
          isCorrect: false,
          feedback: "Błąd. Tętniak aorty brzusznej leży w jamie brzusznej i nie ma anatomicznego połączenia z jamą nosową."
        }
      ]
    },
    {
      title: "Krok 5: Tamponada przednia nosa (Wybór techniki)",
      desc: "Zanim wdroży się procedury inwazyjne, jaką tamponadę przednią należy założyć w celu próby zaopatrzenia jamy nosowej?",
      options: [
        {
          text: "Wprowadzenie tamponu hydrofilowego (np. Merocel) nasączonego solą fizjologiczną lub setonu gazowego warstwowo 'w harmonijkę' od dna nosa ku górze.",
          isCorrect: true,
          feedback: "Prawidłowo! Merocel pęcznieje pod wpływem płynu, wywierając równomierny nacisk na ściany nosa. Seton warstwowy musi wypełniać całą jamę nosową."
        },
        {
          text: "Wprowadzenie suchej waty higienicznej luźno do przedsionka nosa na głębokość 5 milimetrów bez dociskania ścian.",
          isCorrect: false,
          feedback: "Błąd. Luźna wata w przedsionku nie wywiera nacisku na naczynia krwionośne, nasącza się krwią i maskuje krwawienie tylne."
        },
        {
          text: "Wstrzyknięcie do obu przewodów nosowych 50 ml pianki poliuretanowej budowlanej w celu mechanicznego zablokowania przepływu.",
          isCorrect: false,
          feedback: "Błąd. Materiały techniczne są toksyczne, wywołają martwicę śluzówki i zgon pacjenta; stosuje się certyfikowane tampony medyczne."
        },
        {
          text: "Wypalenie wnętrza jamy nosowej palnikiem gazowym bez wcześniejszego znieczulenia ani wziernikowania rynoskopowego.",
          isCorrect: false,
          feedback: "Błąd. Koagulację wykonuje się bipolarnie lub chemicznie (azotan srebra) punktowo; palnik gazowy to niedopuszczalne okaleczenie."
        }
      ]
    },
    {
      title: "Krok 6: Postępowanie w krwawieniu tylnym (Tamponada tylna)",
      desc: "Mimo prawidłowej tamponady przedniej krew nadal wartko spływa do gardła i jamy ustnej. Jaka procedura ratunkowa jest wskazana natychmiast?",
      options: [
        {
          text: "Założenie tamponady tylnej: cewnik z podwójnym balonem (np. Rapid Rhino / Epistat) lub cewnik Foleya wprowadzony do nosogardła i wypełniony 10–15 ml płynu.",
          isCorrect: true,
          feedback: "Prawidłowo! Balon dociska ujście tylne nosa (choanae), a przednia część cewnika uszczelnia jamę nosową, skutecznie tamując krwawienie z tętnicy klinowo-podniebiennej."
        },
        {
          text: "Natychmiastowe usunięcie wszystkich opatrunków i polecenie pacjentowi intensywnego płukania gardła zimną wodą z kranu.",
          isCorrect: false,
          feedback: "Błąd. Usunięcie opatrunku bez zaopatrzenia krwawienia tylnego doprowadzi do gwałtownego nasilenia krwotoku i wstrząsu."
        },
        {
          text: "Wykonanie tracheotomii ratunkowej na korytarzu izby przyjęć jako jedynej metody zatrzymania krwotoku z nosa.",
          isCorrect: false,
          feedback: "Błąd. Tracheotomia zabezpiecza drogi oddechowe, ale nie tamuje naczyń nosogardła; właściwą procedurą jest tamponada tylna."
        },
        {
          text: "Podanie dożylne 100 mg diazepamu i pozostawienie pacjenta bez opieki w ciemnym pomieszczeniu na sali obserwacyjnej.",
          isCorrect: false,
          feedback: "Błąd. Głęboka sedacja u krwawiącego do gardła pacjenta wywoła zgon w mechanizmie zachłyśnięcia krwią i asfiksji."
        }
      ]
    },
    {
      title: "Krok 7: Kontrola ciśnienia tętniczego i koagulopatii",
      desc: "Ciśnienie wynosi 195/105 mmHg. Pacjent przyjmuje przewlekle kwas acetylosalicylowy. Jakie leczenie farmakologiczne należy wdrożyć równolegle z tamponadą?",
      options: [
        {
          text: "Płynne obniżenie RR (urapidyl lub labetalol i.v.), podanie kwasu traneksamowego 1 g i.v. oraz pilna ocena koagulogramu i morfologii krwi obwodowej.",
          isCorrect: true,
          feedback: "Prawidłowo! Wysokie ciśnienie tętnicze podtrzymuje krwawienie naczyniowe; jego kontrolowane obniżenie wraz z kwasem traneksamowym ułatwia hemostazę."
        },
        {
          text: "Podanie dożylne adrenaliny w dawce 1 mg w bolusie w celu dalszego podwyższenia ciśnienia tętniczego krwi pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Dalszy wzrost ciśnienia doprowadzi do udaru krwotocznego mózgu, pęknięcia aorty lub katastrofalnego nasilenia krwawienia."
        },
        {
          text: "Podanie pacjentowi 500 ml czystej wódki doustnie w celu 'rozszerzenia naczyń obwodowych' i uspokojenia emocjonalnego.",
          isCorrect: false,
          feedback: "Błąd. Alkohol zaburza czynność płytek krwi, rozszerza naczynia i nasila krwawienie; podawanie alkoholu na SOR jest błędem."
        },
        {
          text: "Całkowite zaniechanie kontroli ciśnienia tętniczego z obawy przed wystąpieniem łagodnych zawrotów głowy u pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Nieleczony przełom nadciśnieniowy uniemożliwia stabilne zaopatrzenie epistaxis i grozi powikłaniami narządowymi."
        }
      ]
    },
    {
      title: "Krok 8: Hospitalizacja laryngologiczna i procedury inwazyjne",
      desc: "Krwawienie ustąpiło po założeniu tamponady tylnej balonowej. Jaka jest dyspozycja i dalszy nadzór nad pacjentem z tamponadą tylną?",
      options: [
        {
          text: "Bezwzględna hospitalizacja na oddziale laryngologii, tlenoterapia, osłona antybiotykowa, a przy nawrocie – embolizacja lub endoskopowe podwiązanie tętnicy SPA.",
          isCorrect: true,
          feedback: "Prawidłowo! Tamponada tylna niesie ryzyko odruchu nosowo-płucnego, hipoksji i bezdechów; pacjent wymaga ścisłego monitorowania w szpitalu przez 48–72 h."
        },
        {
          text: "Wypisanie pacjenta do domu z zaleceniem samodzielnego usunięcia cewnika Foleya za pomocą nożyczek kuchennych po 2 godzinach.",
          isCorrect: false,
          feedback: "Błąd. Samodzielne usuwanie tamponady tylnej grozi masywnym nawrotem krwotoku w domu i zgonem z wykrwawienia."
        },
        {
          text: "Przekazanie pacjenta na oddział dermatologii w celu leczenia rzekomego łojotokowego zapalenia skóry nosa i twarzy u starszego chorego.",
          isCorrect: false,
          feedback: "Błąd. Ciężkie krwawienie z nosa to domena otolaryngologii, wymagająca specjalistycznego nadzoru i ewentualnego zaopatrzenia chirurgicznego."
        },
        {
          text: "Zalecenie natychmiastowego powrotu do pracy fizycznej na budowie i dźwigania ciężarów bez jakichkolwiek ograniczeń.",
          isCorrect: false,
          feedback: "Błąd. Wysiłek fizyczny i schylanie się drastycznie podnoszą ciśnienie żylne w głowie i wywołują natychmiastowy nawrót krwotoku."
        }
      ]
    }
  ],

  167: [
    {
      title: "Krok 1: Wstępna ocena ABCDE i rozpoznanie ostrego zespołu kolkowego",
      desc: "39-latek przywieziony z nagłym, rozdzierającym, falowym bólem okolicy lędźwiowej prawej promieniującym do pachwiny i jądra. Jest skrajnie niespokojny, 'nie może znaleźć miejsca'. RR 155/90, HR 102/min.",
      options: [
        {
          text: "Wstępna ocena ABCDE, kaniulacja żyły, pobranie krwi na morfologię, CRP, kreatyninę i elektrolity oraz natychmiastowa agresywna analgezja dożylna.",
          isCorrect: true,
          feedback: "Prawidłowo! Niepokój ruchowy z falowym bólem lędźwiowym promieniującym do narządów płciowych to klasyczny obraz ostrej kolki nerkowej."
        },
        {
          text: "Zalecenie natychmiastowego wykonania 100 głębokich skłonów i skoków ze schodów w celu 'mechanicznego wytrząśnięcia' kamienia moczowodowego.",
          isCorrect: false,
          feedback: "Błąd. Skoki przy ostrym zatkaniu moczowodu wywołają gwałtowny skok ciśnienia w miedniczce, pęknięcie sklepienia kielicha i zapaść z bólu."
        },
        {
          text: "Wypisanie pacjenta z poczekalni SOR bez leków z zaleceniem zgłoszenia się do poradni urologicznej w kolejnym miesiącu.",
          isCorrect: false,
          feedback: "Błąd. Ból w kolce nerkowej jest jednym z najsilniejszych doznań bólowych w medycynie; natychmiastowe uśmierzenie bólu jest obowiązkiem lekarza."
        },
        {
          text: "Podanie doustnego oleju rycynowego w objętości 200 ml w celu przeczyszczenia przewodu pokarmowego u wymiotującego pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Środki przeczyszczające nasilą nudności, odwodnienie i nie mają wpływu na odpływ moczu ze zablokowanego moczowodu."
        }
      ]
    },
    {
      title: "Krok 2: Analgezja ratunkowa I rzutu (NLPZ vs Opioidy)",
      desc: "Jaka grupa leków przeciwbólowych stanowi I rzut z wyboru o najwyższej skuteczności w uśmierzaniu ostrego bólu w kolce nerkowej wg wytycznych EAU?",
      options: [
        {
          text: "Niesteroidowe leki przeciwzapalne i.v. (np. ketoprofen 100 mg lub deksketoprofen 50 mg), które zmniejszają filtrację kłębuszkową, obrzęk i ciśnienie w UKM.",
          isCorrect: true,
          feedback: "Prawidłowo! NLPZ hamują syntezę prostaglandyn, zmniejszają przepływ nerkowy i ciśnienie w miedniczce nerkowej, przewyższając skutecznością opioidy."
        },
        {
          text: "Podanie wyłącznie kwasu acetylosalicylowego w małej dawce 75 mg doustnie w celu protekcji kardiologicznej u pacjenta na sali SOR.",
          isCorrect: false,
          feedback: "Błąd. Mała dawka aspiryny nie ma działania przeciwbólowego w kolce nerkowej i nie zmniejsza ciśnienia w zablokowanym moczowodzie."
        },
        {
          text: "Wdrożenie wziewnego podtlenku azotu bez podawania jakichkolwiek leków przeciwzapalnych ani rozkurczowych drogą dożylną.",
          isCorrect: false,
          feedback: "Błąd. Leki wziewne działają krótkotrwale; podstawą opanowania patomechanizmu kolki nerkowej są leki z grupy NLPZ podawane parenteralnie."
        },
        {
          text: "Całkowity zakaz podawania leków przeciwbólowych do czasu uzyskania pisemnej opinii konsultanta wojewódzkiego w dziedzinie urologii.",
          isCorrect: false,
          feedback: "Błąd. Zwłoka w uśmierzaniu ostrego bólu jest nieetyczna i stanowi rażące zaniedbanie podstawowych praw pacjenta."
        }
      ]
    },
    {
      title: "Krok 3: Analgezja ratunkowa II rzutu i leki spazmolityczne",
      desc: "Po 20 minutach od podania ketoprofenu ból zmniejszył się jedynie częściowo (z 10/10 na 7/10), pacjent nadal wymiotuje. Jakie leczenie skojarzone dołączyć?",
      options: [
        {
          text: "Opioid dożylnie (np. morfina 5 mg i.v. miareczkowana lub tramadol 100 mg i.v.), lek spazmolityczny (drotaweryna 40–80 mg i.v.) oraz ondansetron 4–8 mg i.v.",
          isCorrect: true,
          feedback: "Prawidłowo! W przypadku niewystarczającej skuteczności NLPZ dołącza się opioidy i leki rozkurczające mięśnie gładkie oraz leki przeciwwymiotne."
        },
        {
          text: "Podanie dożylne 100 mg suksametonium w szybkim bolusie w celu zwiotczenia całego układu mięśniowego pacjenta na sali obserwacyjnej.",
          isCorrect: false,
          feedback: "Błąd. Suksametonium poraża mięśnie oddechowe, wywołując bezdech i zgon bez natychmiastowej intubacji i wentylacji mechanicznej."
        },
        {
          text: "Zastosowanie dożylnego wlewu mannitolu 20% w dawce 500 ml w celu wymuszenia masywnej diurezy przez zablokowany moczowód.",
          isCorrect: false,
          feedback: "Błąd. Wymuszona diureza osmotyczna przy całkowitej przeszkodzie drastycznie podnosi ciśnienie w nerce, nasilając ból i grożąc pęknięciem kielicha!"
        },
        {
          text: "Zalecenie natychmiastowego wypicia 3 litrów piwa w celu 'przepłukania nerek' u pacjenta z ostrymi nudnościami i wymiotami.",
          isCorrect: false,
          feedback: "Błąd. Podaż płynów w ostrej fazie nasila produkcję moczu, potęgując bolesne napięcie torebki nerkowej; nawadnianie stosuje się po odblokowaniu."
        }
      ]
    },
    {
      title: "Krok 4: Badanie ogólne moczu i weryfikacja laboratoryjna",
      desc: "Pobrano mocz do badania ogólnego. Jaki wynik jest najbardziej typowy dla kamicy moczowodowej i na jaki parametr należy zwrócić szczególną uwagę?",
      options: [
        {
          text: "Krwinkomocz lub makroskopowy krwiomocz (obecny w 85–90% przypadków); należy bezwzględnie ocenić obecność leukocyturii i azotynów (cechy zakażenia).",
          isCorrect: true,
          feedback: "Prawidłowo! Schodzący złóg rani błonę śluzową moczowodu, powodując erytrocyturię. Współistnienie leukocyturii i gorączki oznacza zakażenie zastoinowe!"
        },
        {
          text: "Obecność obfitego białkomoczu nerczycowego (> 10 g/dobę) z masywnymi wałeczkami woskowymi w każdym polu widzenia.",
          isCorrect: false,
          feedback: "Błąd. Białkomocz nerczycowy charakteryzuje kłębuszkowe zapalenia nerek, a nie ostrą kamicę moczowodową z mechaniczną przeszkodą."
        },
        {
          text: "Całkowity brak jakichkolwiek elementów morfotycznych w moczu wykluczający kamicę moczowodową w 100% przypadków.",
          isCorrect: false,
          feedback: "Błąd. W 10–15% przypadków ostrej kolki krwinkomocz może być nieobecny (np. przy całkowitej niedrożności moczowodu z brakiem dopływu moczu z chorej nerki)."
        },
        {
          text: "Wykrycie obecności czystego alkoholu benzylowego w osadzie moczu u pacjenta bez wywiadu narażenia zawodowego.",
          isCorrect: false,
          feedback: "Błąd. Badanie moczu ocenia erytrocyty, leukocyty, białko i kryształy (szczawiany, moczany), a nie alkohole techniczne."
        }
      ]
    },
    {
      title: "Krok 5: Diagnostyka obrazowa CITO (Tomografia vs USG)",
      desc: "Jakie badanie obrazowe jest złotym standardem o najwyższej czułości i swoistości w diagnostyce ostrego bólu w boku i podejrzenia kamicy?",
      options: [
        {
          text: "Niskodawkowa tomografia komputerowa bez środka cieniującego (low-dose NCCT miednicy i brzucha), uwidaczniająca złogi o dowolnym składzie z dokładnością > 98%.",
          isCorrect: true,
          feedback: "Prawidłowo! Low-dose NCCT to złoty standard wg EAU. Precyzyjnie określa wielkość złogu (w mm), lokalizację, twardość w jednostkach Hounsfielda i wodonercze."
        },
        {
          text: "Przeglądowe zdjęcie RTG klatki piersiowej w projekcji bocznej jako jedyne badanie obrazowe niezbędne w diagnostyce kamicy nerkowej.",
          isCorrect: false,
          feedback: "Błąd. RTG klatki piersiowej nie obejmuje układu moczowego i nie pozwala na uwidocznienie złogów w moczowodach."
        },
        {
          text: "Klasyczna urografia dożylna z podaniem jodowego kontrastu i serią 10 zdjęć rentgenowskich w trakcie aktywnego ataku ostrego bólu.",
          isCorrect: false,
          feedback: "Błąd. Dawna urografia została wyparta przez tomografię bez kontrastu; kontrast w ostrej kolce może wywołać nefropatię kontrastową (CIN)."
        },
        {
          text: "Wykonanie scyntygrafii dynamicznej nerek z użyciem radiofarmaceutyku 99mTc-DTPA w warunkach sali reanimacyjnej SOR u pacjenta z kolką.",
          isCorrect: false,
          feedback: "Błąd. Scyntygrafia ocenia czynność nerek w chorobach przewlekłych, a nie anatomię i lokalizację ostrego złogu w moczowodzie."
        }
      ]
    },
    {
      title: "Krok 6: Rozpoznanie zakażonego wodonercza (Stan zagrożenia życia)",
      desc: "U pacjenta z kolką nerkową pojawia się gorączka 38,8°C, dreszcze, leukocytoza 17 500/µl, a w TK opisano wodonercze ze złogiem 7 mm. Co oznacza ten stan?",
      options: [
        {
          text: "Zakażone wodonercze (zastój moczu powikłany septycznym zapaleniem nerki) – stan bezpośredniego zagrożenia wstrząsem septycznym wymagający pilnego odbarczenia.",
          isCorrect: true,
          feedback: "Prawidłowo! Zastój zakażonego moczu pod wysokim ciśnieniem (pyonephrosis) prowadzi do bakteriemii i sepsy urologicznej; śmiertelność bez drenażu sięga 40%."
        },
        {
          text: "Łagodne podrażnienie śluzówki niewymagające żadnej modyfikacji leczenia ani włączania antybiotykoterapii dożylnej.",
          isCorrect: false,
          feedback: "Błąd. Gorączka i dreszcze w kolce nerkowej to objaw alarmowy ('red flag') wskazujący na urosepsę zastoinową; bierność doprowadzi do wstrząsu."
        },
        {
          text: "Wskazanie do natychmiastowego wypisania pacjenta do domu z zaleceniem picia naparu z żurawiny przez 14 dni.",
          isCorrect: false,
          feedback: "Błąd. Wypisanie pacjenta z zakażonym wodonerczem do domu jest rażącym błędem w sztuce i bezpośrednim narażeniem na zgon z posocznicy."
        },
        {
          text: "Objaw ostrej niewydolności kory nadnerczy wymagający natychmiastowego podania 1000 mg deksametazonu dożylnie.",
          isCorrect: false,
          feedback: "Błąd. Obraz kliniczny wynika z powikłania infekcyjnego przeszkody w moczowodzie, a nie z pierwotnego przełomu nadnerczowego."
        }
      ]
    },
    {
      title: "Krok 7: Postępowanie zabiegowe w zakażonym wodonerczu",
      desc: "Jakie jest bezwzględne i natychmiastowe postępowanie zabiegowe w przypadku zakażonego wodonercza wg wytycznych Europejskiego Towarzystwa Urologicznego?",
      options: [
        {
          text: "Pilne odbarczenie układu moczowego: założenie cewnika podwójnie zagiętego JJ (Double-J) do moczowodu lub nefrostomia przezskórna (PCN) + antybiotyki i.v.",
          isCorrect: true,
          feedback: "Prawidłowo! Kluczem do opanowania urosepsy jest natychmiastowy drenaż zakażonego moczu (cewnik JJ lub nefrostomia). Kruszenie złogu (URSL) jest w sepsie przeciwwskazane!"
        },
        {
          text: "Natychmiastowe wykonanie zabiegu litotrypsji pozaustrojowej falą uderzeniową (ESWL) bezpośrednio w trakcie trwającej gorączki.",
          isCorrect: false,
          feedback: "Błąd. ESWL w zakażonym wodonerczu jest bezwzględnie przeciwwskazana – fala uderzeniowa rozbija naczynia i wywołuje masywny wysiew bakterii i wstrząs septyczny."
        },
        {
          text: "Zastosowanie głodówki i całkowite wstrzymanie antybiotykoterapii do czasu uzyskania ujemnych posiewów krwi.",
          isCorrect: false,
          feedback: "Błąd. Zakażone wodonercze wymaga natychmiastowej empirycznej antybiotykoterapii o szerokim spektrum (np. ceftriakson, piperacylina/tazobaktam)."
        },
        {
          text: "Wykonanie natychmiastowego wycięcia całej nerki wraz z nadnerczem drogą klasycznej otwartej laparotomii lędźwiowej.",
          isCorrect: false,
          feedback: "Błąd. Nefrektomia nie jest metodą pierwszego rzutu; prawidłowe odbarczenie (JJ lub PCN) pozwala na uratowanie nerwy i wyleczenie infekcji."
        }
      ]
    },
    {
      title: "Krok 8: Farmakologiczna terapia wydalająca (MET) u pacjenta niepowikłanego",
      desc: "Gdyby u pacjenta nie było cech infekcji, złóg miał 4 mm i leżał w przypęcherzowym odcinku moczowodu, jakie leczenie zachowawcze (MET) przyspiesza pasaż?",
      options: [
        {
          text: "Lek z grupy alfa-1-adrenolityków (np. tamsulozyna 0,4 mg 1x/d doustnie) w połączeniu z odpowiednim nawodnieniem i doraźnymi analgetykami.",
          isCorrect: true,
          feedback: "Prawidłowo! Tamsulozyna rozluźnia mięśniówkę gładką dystalnego odcinka moczowodu, ułatwiając i przyspieszając samoistne wydalenie złogów < 5–6 mm."
        },
        {
          text: "Podawanie doustnego preparatu wapnia w dawce 3000 mg na dobę w celu 'związania' wolnego kwasu szczawiowego w moczowodzie.",
          isCorrect: false,
          feedback: "Błąd. Nadmiar wapnia nasila hiperkalciurię i może przyspieszyć krystalizację kolejnych warstw złogu w układzie moczowym."
        },
        {
          text: "Zastosowanie całkowitej immobilizacji pacjenta w łóżku przez 30 dni z zakazem wstawania nawet do toalety.",
          isCorrect: false,
          feedback: "Błąd. Aktywność fizyczna i grawitacja sprzyjają przesuwaniu się małego złogu w dół moczowodu; leżenie w łóżku nasila resorpcję kości i hiperkalciurię."
        },
        {
          text: "Wdrożenie leczenia digoksyną w dawce 0,5 mg dożylnie w celu stymulacji pompy sodowo-potasowej w komórkach nabłonka dróg moczowych.",
          isCorrect: false,
          feedback: "Błąd. Glikozydy naparstnicy stosuje się w niewydolności serca i migotaniu przedsionków; nie mają żadnego wpływu na perystaltykę moczowodu."
        }
      ]
    }
  ],

  168: [
    {
      title: "Krok 1: Wstępna ocena ABCDE i rozpoznanie ostrej retencji moczu",
      desc: "72-latek zgłasza się z niemożnością oddania moczu od 14 godzin, narastającym, rozdzierającym bólem i rozpieraniem w podbrzuszu. RR 175/95 mmHg, HR 105/min.",
      options: [
        {
          text: "Wstępna ocena ABCDE, badanie palpacyjne podbrzusza (poszukiwanie guza pęcherzowego), przyłóżkowe USG pęcherza i natychmiastowe przygotowanie do cewnikowania.",
          isCorrect: true,
          feedback: "Prawidłowo! Ostry ból podbrzusza z niemożnością mikcji u starszego mężczyzny wskazuje na ostre zatrzymanie moczu (AUR), najczęściej w przebiegu BPH."
        },
        {
          text: "Zalecenie wypicia 2 litrów wody mineralnej i zażycia podwójnej dawki furosemidu w celu 'przełamania oporu cewki moczowej'.",
          isCorrect: false,
          feedback: "Błąd. Podanie diuretyków przy zablokowanym odpływie wywoła gwałtowny napływ moczu do przepełnionego pęcherza, skrajny ból i ryzyko pęknięcia pęcherza!"
        },
        {
          text: "Podanie dożylne 20 mg diazepamu z podejrzeniem ostrej histerii konwersyjnej i odesłanie pacjenta na oddział psychiatryczny.",
          isCorrect: false,
          feedback: "Błąd. Zatrzymanie moczu to problem urologiczny wymagający natychmiastowego mechanicznego drenażu cewnikiem Foleya, a nie leków psychotropowych."
        },
        {
          text: "Wykonanie natychmiastowej punkcji opłucnej igłą odbarczającą u pacjenta zgłaszającego silny ból i napięcie w podbrzuszu.",
          isCorrect: false,
          feedback: "Błąd. Patologia dotyczy miednicy mniejszej i pęcherza moczowego; interwencja w klatce piersiowej jest całkowicie bezpodstawna."
        }
      ]
    },
    {
      title: "Krok 2: Badanie przedmiotowe i przyłóżkowe USG pęcherza (BladderScan)",
      desc: "W badaniu palpacyjnym nad spojeniem łonowym wyczuwalny jest napięty, bolesny guz sięgający pępka, dający stłumiony odgłos opukowy. Co potwierdza USG?",
      options: [
        {
          text: "Obecność znacznie powiększonego, przepełnionego pęcherza moczowego o objętości zalegania > 800–1000 ml moczu (globus vesicalis).",
          isCorrect: true,
          feedback: "Prawidłowo! Badanie USG lub BladderScan szybko i nieinwazyjnie potwierdza obecność 'guza pęcherzowego' (przepełnionego pęcherza moczowego)."
        },
        {
          text: "Całkowity brak pęcherza moczowego spowodowany jego rzekomym zarośnięciem tkanką łączną w ciągu ostatnich kilkunastu godzin.",
          isCorrect: false,
          feedback: "Błąd. Narządy anatomiczne nie zarastają w ciągu kilku godzin; badanie uwidacznia olbrzymi bezechowy zbiornik płynu w miednicy mniejszej."
        },
        {
          text: "Obecność obfitego płynu w jamie opłucnej spychającego pęcherz moczowy w stronę prawego łuku żebrowego pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Jama opłucna leży w klatce piersiowej; guz nad spojeniem łonowym to przepełniony moczem pęcherz moczowy."
        },
        {
          text: "Uwidocznienie prawidłowego, pustego pęcherza moczowego o objętości poniżej 15 ml wykluczające jakąkolwiek retencję moczu.",
          isCorrect: false,
          feedback: "Błąd. Pusty pęcherz przy braku mikcji świadczyłby o bezmoczu nerkowym (anuria); bolesny guz nad spojeniem łonowym to pewny dowód retencji."
        }
      ]
    },
    {
      title: "Krok 3: Natychmiastowe odbarczenie pęcherza drogą cewnikowania",
      desc: "Jaka jest procedura I rzutu w celu natychmiastowego odbarczenia przepełnionego pęcherza moczowego i uśmierzenia bólu?",
      options: [
        {
          text: "Wprowadzenie cewnika Foleya (rozmiar 16–18 Ch) do pęcherza przez cewkę moczową z obfitym użyciem jałowego żelu ze znieczuleniem miejscowym (lidokainą).",
          isCorrect: true,
          feedback: "Prawidłowo! Cewnikowanie cewki moczowej jest procedurą I rzutu. Wprowadzenie żelu z lidokainą do cewki zmniejsza ból i ułatwia pasaż przez stercz."
        },
        {
          text: "Wprowadzenie grubego metalowego pręta bez jakiegokolwiek żelu poślizgowego w celu siłowego rozerwania zwieracza cewki moczowej.",
          isCorrect: false,
          feedback: "Błąd. Próby wprowadzania twardych narzędzi 'na siłę' prowadzą do rozerwania cewki moczowej, powstania drogi fałszywej i masywnego krwotoku."
        },
        {
          text: "Zalecenie pacjentowi wykonywania energicznych podskoków na jednej nodze przez 45 minut w celu odruchowego rozluźnienia mięśni krocza.",
          isCorrect: false,
          feedback: "Błąd. Skoki przy pęcherzu wypełnionym 1000 ml moczu nasilają ból i grożą jego pęknięciem; jedynym skutecznym działaniem jest drenaż."
        },
        {
          text: "Wykonanie natychmiastowej amputacji prącia w znieczuleniu miejscowym w celu trwałego udrożnienia odpływu moczu z pęcherza.",
          isCorrect: false,
          feedback: "Błąd. Postępowanie całkowicie absurdalne i zbrodnicze; cewnikowanie foleyem jest prostą i bezpieczną procedurą medyczną."
        }
      ]
    },
    {
      title: "Krok 4: Postępowanie przy trudnym cewnikowaniu (Przeszkoda sterczowa)",
      desc: "Podczas próby założenia standardowego cewnika Foleya napotkano elastyczny, sprężysty opór w cewce sterczowej i cewnik nie wchodzi. Jak postąpić?",
      options: [
        {
          text: "Zastosowanie cewnika z zagiętym dziobem (cewnik Tiemanna) wprowadzanego dziobem ku górze, a w razie niepowodzenia – przezskórna cystostomia nadłonowa.",
          isCorrect: true,
          feedback: "Prawidłowo! Zagięty dziób cewnika Tiemanna omija uniesiony płat środkowy prostaty. W razie oporu nie wolno forsować cewnikowania; wykonuje się nakłucie nadłonowe."
        },
        {
          text: "Forsowne pchanie cewnika z maksymalną siłą obu rąk aż do pokonania oporu niezależnie od pojawienia się krwawienia z cewki.",
          isCorrect: false,
          feedback: "Błąd. Forsowne pchanie cewnika rozrywa cewkę moczową i tworzy śmiertelnie groźną 'drogę fałszywą' (fausse route) w tkankach miednicy."
        },
        {
          text: "Zrezygnowanie z jakiegokolwiek odbarczenia i odesłanie pacjenta do domu z zaleceniem powrotu za 48 godzin.",
          isCorrect: false,
          feedback: "Błąd. Pozostawienie pacjenta z ostrym zatrzymaniem moczu doprowadzi do pęknięcia pęcherza, ostrej niewydolności nerek i zgonu w męczarniach."
        },
        {
          text: "Podanie do cewki moczowej 50 ml stężonego kwasu siarkowego w celu chemicznego wypalenia przerostu gruczołu krokowego.",
          isCorrect: false,
          feedback: "Błąd. Kwas wywołałby martwicę prącia i zgon pacjenta; w trudnym cewnikowaniu bezpiecznym ratunkiem jest nakłucie nadłonowe (cystostomia)."
        }
      ]
    },
    {
      title: "Krok 5: Zapobieganie powikłaniom odbarczenia (Krwawienie ex vacuo)",
      desc: "Po założeniu cewnika natychmiast wypłynęło 900 ml moczu. Pacjent odczuwa ulgę, a w drenie mocz staje się lekko podbarwiony na różowo. Co oznacza to zjawisko?",
      options: [
        {
          text: "Łagodne krwawienie z odbarczenia (haematuria ex vacuo) wynikające z nagłego spadku ciśnienia i pękania drobnych naczyń błony śluzowej pęcherza.",
          isCorrect: true,
          feedback: "Prawidłowo! Spadek ciśnienia w pęcherzu powoduje przekrwienie i mikroskopijne pęknięcia naczyń śluzówki; rzadko wymaga interwencji poza drenażem."
        },
        {
          text: "Pęknięcie tętnicy biodrowej wspólnej z krwotokiem do pęcherza moczowego wymagające natychmiastowej amputacji kończyny dolnej.",
          isCorrect: false,
          feedback: "Błąd. Różowe zabarwienie moczu po ewakuacji dużej objętości to typowa haematuria ex vacuo o łagodnym przebiegu."
        },
        {
          text: "Objaw całkowitej i nieodwracalnej martwicy obu nerek wymagający natychmiastowego przeszczepienia nerek od dawcy zmarłego.",
          isCorrect: false,
          feedback: "Błąd. Krwawienie ex vacuo dotyczy śluzówki pęcherza moczowego i nie świadczy o martwicy miąższu nerek."
        },
        {
          text: "Wskazanie do natychmiastowego zaciśnięcia cewnika kleszczykami na kolejne 72 godziny w celu zatamowania wypływu moczu.",
          isCorrect: false,
          feedback: "Błąd. Zaciśnięcie cewnika odtworzy ostre zatrzymanie moczu i bolesne przepełnienie pęcherza; drenaż powinien być stały i swobodny."
        }
      ]
    },
    {
      title: "Krok 6: Monitorowanie i rozpoznanie poliurii poprzeszkodowej",
      desc: "W ciągu pierwszych 2 godzin po założeniu cewnika z pęcherza wydzieliło się 1100 ml moczu (550 ml/h). Jakie powikłanie należy rozpoznać i monitorować?",
      options: [
        {
          text: "Poliurię poprzeszkodową (post-obstructive diuresis: diureza > 200 ml/h); konieczne jest monitorowanie elektrolitów i dożylne uzupełnianie 50–75% utraty płynów.",
          isCorrect: true,
          feedback: "Prawidłowo! Po odbarczeniu długotrwałej przeszkody nerki tracą zdolność zagęszczania moczu; masywna diureza grozi głębokim odwodnieniem i hipokaliemią."
        },
        {
          text: "Ostrą moczówkę prostą centralną wywołaną urazem przysadki mózgowej podczas wprowadzania cewnika do cewki moczowej.",
          isCorrect: false,
          feedback: "Błąd. Cewnikowanie prącia nie ma żadnego wpływu na przysadkę mózgową; poliuria wynika z mechanizmów nerkowych i wypłukania rdzenia nerki."
        },
        {
          text: "Objaw całkowitego wyleczenia pacjenta i zalecenie natychmiastowego usunięcia cewnika oraz wypisania chorego do domu.",
          isCorrect: false,
          feedback: "Błąd. Pacjent z masywną poliurią poprzeszkodową wymaga hospitalizacji i monitorowania bilansu płynów z uwagi na ryzyko wstrząsu hipowolemicznego."
        },
        {
          text: "Wskazanie do natychmiastowego podania wysokich dawek wazopresyny i desmopresyny w celu całkowitego zatrzymania wydalania moczu.",
          isCorrect: false,
          feedback: "Błąd. Nerki w fazie poliurii są oporne na ADH; próba farmakologicznego blokowania diurezy może wywołać ciężką hiponatremię i obrzęk mózgu."
        }
      ]
    },
    {
      title: "Krok 7: Diagnostyka laboratoryjna powikłań nerkowych (Pozanerkowe AKI)",
      desc: "Jakie badania laboratoryjne krwi należy pilnie ocenić u każdego pacjenta z ostrym zatrzymaniem moczu trwającym kilkanaście godzin?",
      options: [
        {
          text: "Stężenie kreatyniny, mocznika, sodu, potasu (ocena wodonercza i pozanerkowego ostrego uszkodzenia nerek – AKI) oraz gazometrię i badanie ogólne moczu.",
          isCorrect: true,
          feedback: "Prawidłowo! Wzrost ciśnienia w pęcherzu przenosi się na moczowody i nerki, wywołując pozanerkowe AKI i groźną dla życia hiperkaliemię."
        },
        {
          text: "Oznaczenie wyłącznie stężenia enzymów sercowych (troponiny T i CK-MB) bez oznaczania parametrów nerkowych.",
          isCorrect: false,
          feedback: "Błąd. Kluczowym zagrożeniem w retencji moczu jest uszkodzenie nerek i zaburzenia elektrolitowe (potas, sód); ocena nerek jest priorytetem."
        },
        {
          text: "Izolowane badanie poziomu witaminy D3 i parathormonu w celu poszukiwania osteoporozy u starszego mężczyzny.",
          isCorrect: false,
          feedback: "Błąd. Diagnostyka metaboliczna kości nie ma znaczenia w ostrym dyżurze urologicznym z zatrzymaniem moczu."
        },
        {
          text: "Wykonywanie wyłącznie testu potowego na zawartość chlorków pod kątem mukowiscydozy u 72-letniego pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Mukowiscydoza jest chorobą genetyczną diagnozowaną w dzieciństwie; u 72-latka przyczyną retencji jest łagodny rozrost stercza (BPH)."
        }
      ]
    },
    {
      title: "Krok 8: Farmakoterapia celowana BPH i dyspozycja końcowa",
      desc: "Zatrzymanie moczu ustąpiło, parametry nerkowe są stabilne. Pacjent ma cewnik. Jaki lek należy włączyć przed planowaną próbą usunięcia cewnika (TWOC)?",
      options: [
        {
          text: "Selektywny alfa-1-adrenolityk (np. tamsulozyna 0,4 mg 1x/d p.o.), który rozkurcza mięśnie gładkie szyi pęcherza i stercza; próba usunięcia cewnika po 3–7 dniach.",
          isCorrect: true,
          feedback: "Prawidłowo! Alfa-blokery znamiennie zwiększają szansę na pomyślną mikcję po usunięciu cewnika (TWOC – Trial Without Catheter) u chorych z BPH."
        },
        {
          text: "Lek cholinolityczny rozszerzający pęcherz (np. oksybutynina) podawany w potrójnej dawce dobowej bezpośrednio przed usunięciem cewnika.",
          isCorrect: false,
          feedback: "Błąd. Leki cholinolityczne porażają mięsień wypieracz pęcherza i same wywołują zatrzymanie moczu; są bezwzględnie przeciwwskazane!"
        },
        {
          text: "Usunięcie cewnika natychmiast po 15 minutach od założenia i wypisanie pacjenta bez jakichkolwiek leków ani zaleceń.",
          isCorrect: false,
          feedback: "Błąd. Natychmiastowe usunięcie cewnika bez leczenia alfa-blokerem skończy się ponownym ostrym zatrzymaniem moczu w ciągu kilku godzin."
        },
        {
          text: "Podanie dożylne atropiny w dawce 5 mg w celu trwałego zablokowania czynności układu przywspółczulnego u pacjenta urologicznego.",
          isCorrect: false,
          feedback: "Błąd. Atropina poraża pęcherz moczowy, wywołuje tachykardię i suchość w ustach, nasilając retencję moczu; lekiem z wyboru jest alfa-bloker."
        }
      ]
    }
  ],

  169: [
    {
      title: "Krok 1: Wstępna ocena ABCDE i rozpoznanie ostrego zespołu mosznowego",
      desc: "16-latek zgłasza się z nagłym, rozdzierającym bólem lewego jądra od 2 godzin, nudnościami, wymiotami i bladością powłok skórnych. RR 125/80 mmHg, HR 105/min.",
      options: [
        {
          text: "Wstępna ocena ABCDE, kaniulacja żyły, natychmiastowa analgezja parenteralna, badanie fizykalne moszny i pilna konsultacja urologiczna w oknie czasowym.",
          isCorrect: true,
          feedback: "Prawidłowo! Ostry ból jądra u nastolatka to stan bezpośredniego zagrożenia utratą gonady w mechanizmie skrętu szypuły naczyniowej (torsio testis)."
        },
        {
          text: "Zalecenie zażycia ciepłej kąpieli i zgłoszenia się do poradni rejonowej po zakończeniu roku szkolnego, jeśli obrzęk nie ustąpi.",
          isCorrect: false,
          feedback: "Błąd. Skręt jądra to absolutny stan nagły; zwłoka powyżej 6 godzin prowadzi do nieodwracalnej martwicy i konieczności amputacji jądra."
        },
        {
          text: "Podanie doustnego preparatu magnezu i polecenie pacjentowi wykonywania energicznych podskoków na lewej nodze na sali SOR.",
          isCorrect: false,
          feedback: "Błąd. Aktywność fizyczna pogłębia zaciśnięcie naczyń powrózka nasiennego i przyspiesza martwicę niedokrwienną jądra."
        },
        {
          text: "Wykonanie nakłucia lędźwiowego w celu poszukiwania zapalenia opon mózgowo-rdzeniowych jako rzekomej przyczyny nudności i wymiotów.",
          isCorrect: false,
          feedback: "Błąd. Nudności i wymioty wynikają z silnego odczynu wegetatywnego ze splotu jądrowego; diagnostyka musi skupić się na mosznie."
        }
      ]
    },
    {
      title: "Krok 2: Badanie fizykalne moszny i objawy swoiste",
      desc: "Jakie objawy w badaniu palpacyjnym moszny silnie przemawiają za skrętem jądra, a przeciwko zapaleniu najądrza?",
      options: [
        {
          text: "Jądro uniesione wysoko, leżące poprzecznie (horyzontalnie), powiększone, zniesienie odruchu mosznowego oraz ujemny objaw Prehna (brak ulgi po uniesieniu jądra).",
          isCorrect: true,
          feedback: "Prawidłowo! Skrócenie powrózka unosi jądro, brak odruchu cremasteric ma czułość > 95%, a ujemny objaw Prehna różnicuje skręt z zapaleniem najądrza."
        },
        {
          text: "Idealnie symetryczne, miękkie, niebolesne jądra swobodnie spoczywające na dnie worka mosznowego z zachowanym żywym odruchem mosznowym.",
          isCorrect: false,
          feedback: "Błąd. W skręcie jądro jest skrajnie bolesne, uniesione, napięte i leży poprzecznie z powodu skrócenia skręconego powrózka."
        },
        {
          text: "Obecność obfitego wycieku ropnego z obu nozdrzy przednich bez jakichkolwiek zmian anatomicznych w obrębie worka mosznowego.",
          isCorrect: false,
          feedback: "Błąd. Objawy dotyczą narządów płciowych męskich; badanie moszny jest kluczowym elementem badania fizykalnego."
        },
        {
          text: "Dodatni objaw Prehna (całkowite i natychmiastowe ustąpienie bólu po delikatnym podtrzymaniu jądra ręką lekarza).",
          isCorrect: false,
          feedback: "Błąd. Dodatni objaw Prehna (ulga po uniesieniu) jest typowy dla zapalenia najądrza (epididymitis); w skręcie uniesienie jądra nasila lub nie zmienia bólu."
        }
      ]
    },
    {
      title: "Krok 3: Różnicowanie ze skrętem przyczepka jądra",
      desc: "Częstą przyczyną bólu moszny u chłopców jest skręt przyczepka jądra (hydatid of Morgagni). Jaki objaw wzrokowy jest dla niego charakterystyczny?",
      options: [
        {
          text: "Objaw niebieskiej plamki (blue dot sign) – widoczny przez skórę moszny sinawy guzek na górnym biegunie jądra przy zachowanym prawidłowym przepływie w jądrze.",
          isCorrect: true,
          feedback: "Prawidłowo! 'Blue dot sign' odpowiada martwicy niedokrwiennej przyczepka; nie zagraża utratą jądra i często może być leczony zachowawczo (NLPZ)."
        },
        {
          text: "Obecność żółtego pęcherza z płynem surowiczym pokrywającego całą powierzchnię prącia i worka mosznowego pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Taki objaw nie odpowiada skrętowi przyczepka; w skręcie przyczepka siny punkcik widoczny jest punktowo na górnym biegunie jądra."
        },
        {
          text: "Całkowite zniknięcie obu jąder z worka mosznowego z powodu ich wstąpienia do jamy brzusznej i klatki piersiowej pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Jądra nie mogą przemieścić się do klatki piersiowej; anatomiczną barierą jest przepona i kanały pachwinowe."
        },
        {
          text: "Intensywne świecenie tkanek moszny w ciemności zielonym światłem fluorescencyjnym bez użycia jakiejkolwiek lampy Wooda ani filtrów optycznych.",
          isCorrect: false,
          feedback: "Błąd. Tkanki ludzkie nie fluoryzują samoistnie; badanie polega na dokładnej ocenie palpacyjnej i wzrokowej przy dobrym oświetleniu."
        }
      ]
    },
    {
      title: "Krok 4: Diagnostyka obrazowa CITO (USG Doppler moszny)",
      desc: "Jakie badanie obrazowe jest metodą z wyboru w ocenie unaczynienia miąższu jądra i jaka jest nadrzędna zasada postępowania w razie wątpliwości?",
      options: [
        {
          text: "USG Doppler moszny (brak lub asymetria przepływu); jeśli USG jest niejednoznaczne lub niedostępne, nie wolno opóźniać pilnej rewizji chirurgicznej!",
          isCorrect: true,
          feedback: "Prawidłowo! USG Doppler potwierdza brak przepływu tętniczego. Jeśli badanie opóźniałoby operację lub wynik budzi wątpliwości – operuje się natychmiast!"
        },
        {
          text: "Zlecenie tomografii komputerowej miednicy z potrójnym kontrastem i oczekiwanie na badanie przez 6 godzin na sali obserwacyjnej.",
          isCorrect: false,
          feedback: "Błąd. Oczekiwanie na TK marnuje krytyczne okno czasowe; USG wykonuje się przyłóżkowo w kilka minut, a złotym standardem jest eksploracja moszny."
        },
        {
          text: "Zdjęcie rentgenowskie miednicy w projekcji osiowej w celu poszukiwania ciał obcych w worku mosznowym.",
          isCorrect: false,
          feedback: "Błąd. RTG nie obrazuje naczyń ani miąższu jądra; jedynym przydatnym badaniem obrazowym jest ultrasonografia z kolorowym Dopplerem."
        },
        {
          text: "Kolonoskopia diagnostyczna w celu wykluczenia polipów jelita grubego przed badaniem narządów moszny.",
          isCorrect: false,
          feedback: "Błąd. Endoskopia przewodu pokarmowego jest całkowicie bezzasadna i opóźnia ratowanie niedokrwionego jądra."
        }
      ]
    },
    {
      title: "Krok 5: Krytyczne okno czasowe dla ratowania gonady",
      desc: "Ile wynosi 'złote okno czasowe' od początku bólu, w którym szansa na uratowanie czynności i żywotności jądra wynosi > 90%?",
      options: [
        {
          text: "Złote okno czasowe wynosi do 6 godzin od początku dolegliwości; po 12 godzinach szansa na uratowanie spada poniżej 50%, a po 24 godzinach wynosi < 10%.",
          isCorrect: true,
          feedback: "Prawidłowo! Czas to jądro ('Time is testicle'). Każda godzina zwłoki prowadzi do nieodwracalnej martwicy komórek Leydiga i kanalików nasiennych."
        },
        {
          text: "Okno czasowe wynosi 7 dni, dlatego operację można bezpiecznie odłożyć na planowy dzień operacyjny w kolejnym tygodniu.",
          isCorrect: false,
          feedback: "Błąd. Po 24 godzinach jądro ulega całkowitej martwicy krwotocznej i rozpadowi; zwłoka 7 dni oznacza bezwzględną utratę narządu."
        },
        {
          text: "Jądro ludzkie jest całkowicie niewrażliwe na niedokrwienie i może przetrwać bez dopływu krwi przez okres do 3 miesięcy.",
          isCorrect: false,
          feedback: "Błąd. Gonady męskie są niezwykle wrażliwe na hipoksję ze względu na wysoki metabolizm spermatogenezy; 6 godzin to bezpieczna granica."
        },
        {
          text: "Okno czasowe wynosi dokładnie 4 minuty, po czym cała moszna ulega samoistnemu zwapnieniu i zbliznowaceniu.",
          isCorrect: false,
          feedback: "Błąd. Złote okno wynosi do 6 godzin, co pozwala na sprawny transport na blok operacyjny i odkręcenie powrózka nasiennego."
        }
      ]
    },
    {
      title: "Krok 6: Doraźna próba derotacji manualnej na SOR ('Otwieranie książki')",
      desc: "Przed transportem na blok operacyjny urolog podejmuje próbę ręcznego odkręcenia powrózka nasiennego. W jakim kierunku wykonuje się derotację lewego jądra?",
      options: [
        {
          text: "Odkręcanie od linii pośrodkowej na zewnątrz (od przyśrodka do boku, 'jak otwieranie książki') o 180–360°; ustąpienie bólu świadczy o powodzeniu manewru.",
          isCorrect: true,
          feedback: "Prawidłowo! W > 80% przypadków jądro skręca się do wewnątrz; ręczna derotacja na zewnątrz może natychmiast przywrócić ukrwienie przed operacją."
        },
        {
          text: "Skręcanie jądra jeszcze silniej do wewnątrz w stronę szwu moszny z maksymalną siłą fizyczną lekarza badającego.",
          isCorrect: false,
          feedback: "Błąd. Skręcenie w złą stronę pogłębi zaciśnięcie naczyń krwionośnych i przyspieszy martwicę; derotację wykonuje się na zewnątrz ('open book')."
        },
        {
          text: "Pociąganie za powrózek nasienny ku dołowi z użyciem kleszczy chirurgicznych przez nienaruszoną skórę worka mosznowego.",
          isCorrect: false,
          feedback: "Błąd. Pociąganie uszkodzi skórę i nasili niedokrwienie; derotacja manualna polega na delikatnym obrocie jądra w osi podłużnej."
        },
        {
          text: "Nawet pomyślna derotacja manualna z ustąpieniem bólu zwalnia z konieczności operacji i pacjenta można natychmiast wypisać do domu.",
          isCorrect: false,
          feedback: "Błąd. Derotacja manualna nie eliminuje anatomicznej predyspozycji (anomalia bell-clapper); operacja z orchidopeksją jest nadal bezwzględnie konieczna!"
        }
      ]
    },
    {
      title: "Krok 7: Pilna rewizja chirurgiczna moszny (Eksploracja operacyjna)",
      desc: "Pacjent trafia na blok operacyjny. Urolog nacina mosznę, wyłania jądro i odkręca szypułę powrózka nasiennego. Jądro jest ciemnofioletowe. Jak postąpić?",
      options: [
        {
          text: "Ogrzanie jądra wilgotnym gazikiem z 0,9% NaCl przez 10–15 minut pod 100% tlenem i ponowna ocena powrotu różowego zabarwienia i krwawienia po nacięciu osłonki.",
          isCorrect: true,
          feedback: "Prawidłowo! Nie wolno pochopnie usuwać ciemnego jądra. Po ogrzaniu wiele jąder odzyskuje perfuzję i zachowuje funkcję endokrynną."
        },
        {
          text: "Natychmiastowe odcięcie jądra i wyrzucenie do odpadów medycznych bez próby ogrzania ani oceny powrotu ukrwienia.",
          isCorrect: false,
          feedback: "Błąd. Pochopna orchidektomia u 16-latka to nieodwracalna utrata tkanki rozrodczej; należy zawsze podjąć próbę rewaskularyzacji."
        },
        {
          text: "Wstrzyknięcie do jądra 100 ml stężonego kwasu solnego w celu chemicznej dezynfekcji zrębu gonady na stole operacyjnym.",
          isCorrect: false,
          feedback: "Błąd. Działanie zbrodnicze i absurdalne; tkanki płucze się wyłącznie jałową, ciepłą solą fizjologiczną."
        },
        {
          text: "Pozostawienie skręconego jądra w niezmienionej pozycji i natychmiastowe zaszycie moszny szwami niewchłanialnymi.",
          isCorrect: false,
          feedback: "Błąd. Zaniechanie odkręcenia powrózka doprowadzi do całkowitej zgorzeli jądra i ciężkiego ropnego zapalenia moszny."
        }
      ]
    },
    {
      title: "Krok 8: Obustronna orchidopeksja i profilaktyka nawrotów",
      desc: "Jądro odzyskało prawidłowe zabarwienie i perfuzję. Jaki kluczowy element techniki operacyjnej musi być bezwzględnie wykonany w odniesieniu do obu jąder?",
      options: [
        {
          text: "Obustronna orchidopeksja (przyszycie obu jąder do osłonek moszny), ponieważ anatomiczna anomalia 'serca dzwonu' (bell-clapper) niemal zawsze występuje obustronnie.",
          isCorrect: true,
          feedback: "Prawidłowo! Zespół dzwonu (zbyt wysokie odejście osłonki pochwowej) jest wadą symetryczną; brak fiksacji drugiego jądra grozi jego skrętem w przyszłości."
        },
        {
          text: "Profilaktyczne usunięcie drugiego, całkowicie zdrowego jądra w celu 'wyrównania symetrii' worka mosznowego pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Wycięcie zdrowego jądra doprowadziłoby do całkowitej bezdzietności i kastracji chirurgicznej; drugie jądro należy bezwzględnie zachować i umocować."
        },
        {
          text: "Wypisanie pacjenta ze stołu operacyjnego bezpośrednio do domu z zaleceniem powrotu do wyczynowej gry w piłkę nożną w tym samym dniu zabiegu.",
          isCorrect: false,
          feedback: "Błąd. Po operacji moszny obowiązuje reżim oszczędzający i noszenie suspensorium przez kilka tygodni."
        },
        {
          text: "Wdrożenie dożywotniego unieruchomienia w łóżku ortopedycznym z zakazem podejmowania jakiejkolwiek nauki szkolnej.",
          isCorrect: false,
          feedback: "Błąd. Po wygojeniu rany pacjent powraca do pełnej sprawności fizycznej i normalnego funkcjonowania społecznego."
        }
      ]
    }
  ],

  170: [
    {
      title: "Krok 1: Wstępna ocena ABCDE i różnicowanie bolesnego wzwodu",
      desc: "32-latek zgłasza się z powodu bolesnego, przetrwałego wzwodu prącia trwającego od 6 godzin po zażyciu leku na potencję i alkoholu. W badaniu: ciała jamiste deskowato twarde, żołądź wiotka.",
      options: [
        {
          text: "Wstępna ocena ABCDE, kaniulacja żyły, skuteczna analgezja parenteralna, ocena czasu trwania erekcji i natychmiastowe różnicowanie typu priapizmu.",
          isCorrect: true,
          feedback: "Prawidłowo! Bolesny, twardy wzwód z wiotką żołędzią trwający > 4 h to klasyczny obraz priapizmu niedokrwiennego (low-flow) – stanu nagłego w urologii."
        },
        {
          text: "Zalecenie zażycia kolejnej podwójnej dawki sildenafilu w celu 'przełamania oporu' naczyń żylnych prącia pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Inhibitory PDE5 nasilają wzwód; podanie kolejnej dawki doprowadzi do całkowitej martwicy niedokrwiennej ciał jamistych."
        },
        {
          text: "Polecenie pacjentowi wykonywania energicznych ćwiczeń siłowych ze sztangą w celu odprowadzenia krwi do mięśni czworogłowych.",
          isCorrect: false,
          feedback: "Błąd. W priapizmie niedokrwiennym krew jest uwięziona przez skurcz beleczek i kwasicę; wysiłek nie odblokuje zaciśniętego odpływu żylnego."
        },
        {
          text: "Wypisanie pacjenta do domu z informacją, że wzwód jest powodem do dumy i nie wymaga żadnej interwencji medycznej.",
          isCorrect: false,
          feedback: "Błąd. Priapizm niedokrwienny trwający > 12–24 h prowadzi do nieodwracalnego włóknienia ciał jamistych i trwałej utraty potencji."
        }
      ]
    },
    {
      title: "Krok 2: Różnicowanie priapizmu niedokrwiennego (Low-flow) i tętniczego (High-flow)",
      desc: "Dlaczego precyzyjne odróżnienie priapizmu niedokrwiennego od tętniczego (pourazowego) ma fundamentalne znaczenie dla postępowania ratunkowego?",
      options: [
        {
          text: "Priapizm niedokrwienny to bolesny stan nagły z zespołem ciasnoty i kwasicą (wymaga pilnej dekompresji); priapizm tętniczy jest bezbolesny i nie grozi martwicą.",
          isCorrect: true,
          feedback: "Prawidłowo! Priapizm low-flow to stan nagły (krew nie krąży, narasta kwasica). Priapizm high-flow (z przetoki tętniczej po urazie) nie grozi martwicą tkanek."
        },
        {
          text: "Oba typy priapizmu leczy się dokładnie tak samo poprzez natychmiastowe chirurgiczne wycięcie całego prącia drogą laparotomii.",
          isCorrect: false,
          feedback: "Błąd. Priapizm low-flow leczy się aspiracją i fenylefryną, a high-flow embolizacją przetoki; amputacja prącia jest niedopuszczalna."
        },
        {
          text: "Priapizm tętniczy jest zawsze wywołany przez zakażenie wirusem wścieklizny i wymaga podania surowicy odpornościowej.",
          isCorrect: false,
          feedback: "Błąd. Priapizm tętniczy wynika z przetoki naczyniowej po tępym urazie krocza, a nie z infekcji wirusowej."
        },
        {
          text: "W priapizmie niedokrwiennym prącie jest całkowicie miękkie, a w tętniczym ma temperaturę poniżej zera stopni Celsjusza.",
          isCorrect: false,
          feedback: "Błąd. W niedokrwiennym ciała jamiste są twarde jak drewno i zimne z powodu braku dopływu świeżej krwi; w tętniczym prącie jest ucieplone."
        }
      ]
    },
    {
      title: "Krok 3: Gazometria krwi zaaspirowanej z ciał jamistych CITO",
      desc: "Jakie badanie laboratoryjne jest złotym standardem potwierdzającym priapizm niedokrwienny i jaki wynik jest dla niego charakterystyczny?",
      options: [
        {
          text: "Gazometria krwi zaaspirowanej z ciała jamistego (nakłucie igłą 19–21G): ciemna krew wykazująca kwasicę (pH < 7,25), hipoksję (pO2 < 30 mmHg) i hiperkapnię (pCO2 > 60).",
          isCorrect: true,
          feedback: "Prawidłowo! Profil gazometryczny krwi z ciał jamistych odpowiada głębokiej kwasicy beztlenowej i zastojowi, jednoznacznie potwierdzając priapizm low-flow."
        },
        {
          text: "Krew jasnoczerwona o cechach krwi tętniczej: pH > 7,40, pO2 > 90 mmHg i pCO2 < 40 mmHg z prawidłowym wysyceniem tlenem.",
          isCorrect: false,
          feedback: "Błąd. Taki gazometryczny profil tętniczy jest charakterystyczny dla priapizmu tętniczego (high-flow), a nie niedokrwiennego."
        },
        {
          text: "Badanie poziomu prolaktyny i hormonu luteinizującego w surowicy krwi jako jedyne badanie laboratoryjne na ostrym dyżurze.",
          isCorrect: false,
          feedback: "Błąd. Hormony przysadkowe nie diagnozują ostrego niedokrwienia ciał jamistych; kluczowa jest bezpośrednia gazometria aspiratu z prącia."
        },
        {
          text: "Oznaczenie miana przeciwciał przeciwjądrowych ANA z moczu jako bezwzględny wymóg przed jakimkolwiek nakłuciem ciał jamistych.",
          isCorrect: false,
          feedback: "Błąd. Badania autoimmunologiczne są bezużyteczne w ostrej retencji krwi w ciałach jamistych i niepotrzebnie opóźniają pomoc."
        }
      ]
    },
    {
      title: "Krok 4: Aspiracja zastoinowej krwi i płukanie ciał jamistych",
      desc: "Po znieczuleniu miejscowym (blokada nerwów grzbietowych prącia) przystąpiono do zabiegu. Jaki jest pierwszy etap postępowania zabiegowego?",
      options: [
        {
          text: "Nakłucie ciała jamistego igłą 19–21G z boku prącia, odessanie 20–50 ml ciemnej krwi i płukanie 0,9% NaCl do uzyskania krwi jasnoczerwonej.",
          isCorrect: true,
          feedback: "Prawidłowo! Aspiracja skrzepów i odkwaszenie tkanek solą fizjologiczną obniża ciśnienie w ciałach jamistych i przygotowuje receptory na sympatykomimetyki."
        },
        {
          text: "Wykonanie nacięcia wzdłużnego całego prącia nożyczkami chirurgicznymi bez wcześniejszego nakłucia cienką igłą ani płukania ciał jamistych.",
          isCorrect: false,
          feedback: "Błąd. Rozległe nacinanie tkanek bez wskazań prowadzi do trwałego okaleczenia; procedurę rozpoczyna się od małoinwazyjnej aspiracji igłowej."
        },
        {
          text: "Wstrzyknięcie do ciał jamistych 50 ml czystej parafiny ciekłej w celu mechanicznego rozszerzenia zatok naczyniowych.",
          isCorrect: false,
          feedback: "Błąd. Parafina zniszczyłaby strukturę śródbłonka i wywołała ziarniniaki ciała obcego; płukanie wykonuje się wyłącznie jałową solą fizjologiczną."
        },
        {
          text: "Założenie ciasnej opaski uciskowej na podstawę prącia i pozostawienie jej na 12 godzin w celu zatamowania napływu krwi.",
          isCorrect: false,
          feedback: "Błąd. Opaska uciskowa całkowicie odetnie dopływ krwi tętniczej i przyspieszy martwicę zgorzelinową prącia ze skutkiem septycznym."
        }
      ]
    },
    {
      title: "Krok 5: Farmakoterapia naczyniowa do ciał jamistych (Sympatykomimetyki)",
      desc: "Samo odessanie krwi nie spowodowało trwałego zwiotczenia prącia. Jaki lek podawany dokawernozalnie (do ciał jamistych) jest lekiem I rzutu wg wytycznych AUA/EAU?",
      options: [
        {
          text: "Fenylefryna (czysty alfa-1-agonista) w dawce 100–500 µg wstrzykiwana dokawernozalnie co 3–5 minut pod ścisłą kontrolą ciśnienia tętniczego i EKG (max 1000 µg/h).",
          isCorrect: true,
          feedback: "Prawidłowo! Fenylefryna obkurcza mięśnie gładkie beleczek ciał jamistych, otwierając odpływ żylny i powodując detumescencję bez nadmiernej stymulacji beta-adrenergicznej serca."
        },
        {
          text: "Izoprenalina (silny beta-agonista) podawana w ciągłym wlewie dożylnym w celu przyspieszenia akcji serca do 180/min.",
          isCorrect: false,
          feedback: "Błąd. Beta-agonisty nie wywołują skurczu beleczek prącia, a stwarzają śmiertelne ryzyko zaburzeń rytmu serca."
        },
        {
          text: "Podanie do ciał jamistych nitrogliceryny w aerozolu w celu wywołania maksymalnej wazodylatacji naczyń miednicy.",
          isCorrect: false,
          feedback: "Błąd. Nitrogliceryna i tlenek azotu to przekaźniki wywołujące erekcję; ich podanie nasiliłoby wzwód i pogłębiło niedokrwienie."
        },
        {
          text: "Wstrzyknięcie do prącia insuliny krótzkodziałającej w dawce 100 jednostek w celu obniżenia lokalnego stężenia glukozy.",
          isCorrect: false,
          feedback: "Błąd. Insulina nie wpływa na napięcie naczyń prącia, a wchłonięta do krążenia ogólnego wywoła śmiertelną hipoglikemię."
        }
      ]
    },
    {
      title: "Krok 6: Monitorowanie bezpieczeństwa i powikłań fenylefryny",
      desc: "Na jakie ogólnoustrojowe powikłania krążeniowe należy bezwzględnie uważać podczas frakcjonowanego podawania fenylefryny do ciał jamistych?",
      options: [
        {
          text: "Nagły przełom nadciśnieniowy (ciężki skok ciśnienia tętniczego), odruchowa bradykardia oraz zaburzenia rytmu serca wywołane ucieczką leku do krążenia ogólnego.",
          isCorrect: true,
          feedback: "Prawidłowo! Fenylefryna podana do prącia może przedostać się do krążenia systemowego; pacjent musi być stale monitorowany (kardiomonitor, ciśnieniomierz)."
        },
        {
          text: "Gwałtowny spadek ciśnienia tętniczego do zera z asystolią i zatrzymaniem krążenia w mechanizmie wstrząsu anafilaktycznego u pacjenta na sali zabiegowej.",
          isCorrect: false,
          feedback: "Błąd. Fenylefryna jest silnym lekiem naczyniozwężającym, dlatego wywołuje skok ciśnienia i bradykardię odruchową, a nie hipotensję."
        },
        {
          text: "Wystąpienie ostrej niewydolności trzustki z samostrawieniem narządów jamy brzusznej u pacjenta leczonego dokawernozalnie na sali zabiegowej.",
          isCorrect: false,
          feedback: "Błąd. Fenylefryna działa na receptory alfa-1 adrenergiczne w naczyniach krwionośnych i nie wywołuje ostrego zapalenia trzustki."
        },
        {
          text: "Całkowita i nagła utrata owłosienia na całym ciele pacjenta bezpośrednio po iniekcji leku do ciał jamistych prącia na sali zabiegowej.",
          isCorrect: false,
          feedback: "Błąd. Leki sympatykomimetyczne nie wpływają na mieszki włosowe; kluczowe powikłania to nadciśnienie i zaburzenia rytmu serca."
        }
      ]
    },
    {
      title: "Krok 7: Kwalifikacja operacyjna przy braku detumescencji (Zespolenia jamiste)",
      desc: "Wielokrotna aspiracja i iniekcje fenylefryny nie przyniosły trwałego ustąpienia wzwodu, a czas trwania priapizmu przekroczył 24 godziny. Jaka jest interwencja urologiczna?",
      options: [
        {
          text: "Pilne wytworzenie przetoki żołędziowo-jamistej (shunt dystalny typu Wintera lub Al-Ghoraba) w celu wytworzenia odpływu krwi do żołędzi i żył grzbietowych.",
          isCorrect: true,
          feedback: "Prawidłowo! Nieskuteczność farmakoterapii i czas > 24 h to wskazanie do chirurgicznego wytworzenia przetoki (shunt) omijającej zablokowany odpływ żylny."
        },
        {
          text: "Zalecenie pacjentowi powrotu do domu i oczekiwania na samoistne ustąpienie wzwodu w ciągu kolejnych 3 miesięcy bez żadnego leczenia.",
          isCorrect: false,
          feedback: "Błąd. Brak interwencji chirurgicznej doprowadzi do całkowitej martwicy i zgorzeli ciał jamistych z trwałym zniszczeniem narządu."
        },
        {
          text: "Założenie zewnętrznej szyny gipsowej na całe prącie w celu mechanicznego spłaszczenia ciał jamistych i unieruchomienia narządu.",
          isCorrect: false,
          feedback: "Błąd. Szyna gipsowa wywoła odleżyny, martwicę skóry prącia i nie zapewni odpływu krwi z zablokowanych ciał jamistych."
        },
        {
          text: "Podanie dożylne 10 litrów zimnej wody z lodem w celu ogólnego wychłodzenia organizmu pacjenta na sali operacyjnej urologii.",
          isCorrect: false,
          feedback: "Błąd. Wychłodzenie organizmu doprowadzi do zatrzymania krążenia w hipotermii, nie rozwiązując mechanicznego bloku w prąciu."
        }
      ]
    },
    {
      title: "Krok 8: Rokowanie odległe i powikłania (Włóknienie ciał jamistych)",
      desc: "Wzwód ustąpił po wykonaniu przetoki dystalnej w 30. godzinie od początku objawów. O jakim powikłaniu odległym należy bezwzględnie uprzedzić pacjenta?",
      options: [
        {
          text: "Bardzo wysokie ryzyko trwałej impotencji (zaburzeń erekcji u > 80–90% chorych) z powodu nieodwracalnego włóknienia mięśniówki ciał jamistych po > 24 h niedokrwienia.",
          isCorrect: true,
          feedback: "Prawidłowo! Po 24 h niedokrwienia dochodzi do martwicy komórek mięśniowych i nieodwracalnego włóknienia; pacjent może w przyszłości wymagać protezy prącia."
        },
        {
          text: "Zapewnienie pacjenta, że po 30 godzinach niedokrwienia jego potencja i erekcje będą w 100% prawidłowe i silniejsze niż przed incydentem.",
          isCorrect: false,
          feedback: "Błąd. Tak długa hipoksja niemal zawsze prowadzi do trwałego uszkodzenia mechanizmu erekcyjnego; fałszywe uspokajanie jest błędem."
        },
        {
          text: "Poinformowanie o nieuchronnym rozwoju raka płaskonabłonkowego prącia w ciągu najbliższych 48 godzin od epizodu priapizmu.",
          isCorrect: false,
          feedback: "Błąd. Priapizm niedokrwienny nie jest chorobą nowotworową i nie wywołuje raka; powikłaniem jest włóknienie i impotencja."
        },
        {
          text: "Konieczność dożywotniego cewnikowania pęcherza moczowego z powodu całkowitego zaniku cewki moczowej u pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Ciało gąbczaste i cewka moczowa w priapizmie są zaoszczędzone; po wygojeniu przetoki pacjent oddaje mocz prawidłowo."
        }
      ]
    }
  ]
};

async function run() {
  const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'cases', 'manifest.json'), 'utf8'));
  console.log('Expanding steps to 8 for Cases 166-170...');

  for (let id = 166; id <= 170; id++) {
    const file = manifest[id - 1];
    const fullPath = path.join(__dirname, '..', 'cases', file);
    const raw = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    const c = await decrypt(raw, MASTER_KEY);

    const newSteps = batch4Steps[id];
    verifyStepBalance(newSteps, id);
    c.steps = newSteps;

    const enc = await encrypt(c, MASTER_KEY);
    fs.writeFileSync(fullPath, JSON.stringify(enc, null, 2), 'utf8');
    console.log(`✓ Case #${id} updated with ${newSteps.length} full steps!`);
  }
}

run();

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

// BATCH 2: CASES 156 - 160 (8 STEPS EACH)
const batch2Steps = {
  156: [
    {
      title: "Krok 1: Wstępna ocena ABCDE i różnicowanie nagłego bólu po stosunku",
      desc: "22-latka zgłasza się z nagłym, silnym bólem podbrzusza (8/10), który wystąpił bezpośrednio po stosunku płciowym. Występuje bladość, zawroty głowy, RR 105/65 mmHg, HR 105/min.",
      options: [
        {
          text: "Wstępna ocena ABCDE, tlenoterapia, założenie dwóch kaniul dożylnych (16–18G), pobranie krwi na morfologię, grupę krwi i próbę krzyżową oraz wlew krystaloidów.",
          isCorrect: true,
          feedback: "Prawidłowo! Ostry ból podbrzusza po współżyciu z tachykardią i bladością budzi podejrzenie pęknięcia torbieli ciałka żółtego i krwawienia do otrzewnej."
        },
        {
          text: "Zalecenie natychmiastowego opuszczenia izby przyjęć i zażycia gorącej kąpieli rozluźniającej mięśnie miednicy w warunkach domowych.",
          isCorrect: false,
          feedback: "Błąd. Gorąca kąpiel rozszerza naczynia krwionośne i nasila krwawienie wewnętrzne do jamy otrzewnej, co grozi głębokim wstrząsem."
        },
        {
          text: "Podanie doustnego preparatu żelaza w wysokiej dawce bez zabezpieczenia dostępu dożylnego ani monitorowania parametrów życiowych pacjentki.",
          isCorrect: false,
          feedback: "Błąd. Żelazo doustne nie leczy ostrej utraty krwi; priorytetem jest stabilizacja hemodynamiczna i ocena źródła krwawienia."
        },
        {
          text: "Wykonanie intensywnego masażu powłok brzusznych za pomocą wałka rehabilitacyjnego w celu odprowadzenia rzekomej uwięźniętej przepukliny.",
          isCorrect: false,
          feedback: "Błąd. Ugniatanie powłok brzusznych może zwiększyć krwawienie z pękniętej torbieli i nasilić objawy ostrego zapalenia otrzewnej."
        }
      ]
    },
    {
      title: "Krok 2: Pilne wykluczenie ciąży ektopowej CITO",
      desc: "Przed wdrożeniem jakiejkolwiek procedury inwazyjnej konieczne jest różnicowanie z pękniętą ciążą pozamaciczną. Jakie badanie jest kluczowe?",
      options: [
        {
          text: "Oznaczenie stężenia beta-hCG w surowicy krwi lub szybki test ciążowy z moczu; ujemny wynik jednoznacznie wyklucza ciążę ektopową.",
          isCorrect: true,
          feedback: "Prawidłowo! Wynik beta-hCG pozwala na natychmiastowe odróżnienie pękniętej ciąży jajowodowej od pęknięcia torbieli czynnościowej jajnika."
        },
        {
          text: "Oznaczenie przeciwciał przeciwko tyreoperoksydazie (anty-TPO) w celu oceny autoimmunologicznego zapalenia tarczycy typu Hashimoto.",
          isCorrect: false,
          feedback: "Błąd. Przeciwciała tarczycowe nie mają żadnego związku z ostrym krwawieniem do jamy otrzewnej po stosunku płciowym."
        },
        {
          text: "Izolowane pobranie wymazu cytologicznego z tarczy szyjki macicy i oczekiwanie na wynik badania patomorfologicznego przez 14 dni.",
          isCorrect: false,
          feedback: "Błąd. Cytologia to badanie przesiewowe w kierunku raka szyjki; nie ma żadnej wartości w diagnostyce ostrych stanów nagłych."
        },
        {
          text: "Wykonanie testu obciążenia glukozą (OGTT) w celu oceny insulinooporności przed podjęciem decyzji o leczeniu operacyjnym.",
          isCorrect: false,
          feedback: "Błąd. Krzywa cukrowa jest bezużyteczna w ostrym brzuchu i opóźnia rozpoznanie krwotoku do jamy otrzewnej."
        }
      ]
    },
    {
      title: "Krok 3: Badanie ginekologiczne i weryfikacja objawów otrzewnowych",
      desc: "W badaniu palpacyjnym brzucha stwierdzono objaw Blumberga w podbrzuszu. Co wykaże badanie ginekologiczne we wziernikach i badanie dwuręczne?",
      options: [
        {
          text: "Silną bolesność przy poruszaniu szyjką macicy, wygórowanie i bolesność sklepienia tylnego pochwy (objaw Douglasa) bez cech obfitego krwawienia z szyjki.",
          isCorrect: true,
          feedback: "Prawidłowo! Krew spływająca do najniższego punktu miednicy (zatoki Douglasa) drażni otrzewną, powodując bolesne uwypuklenie tylnego sklepienia pochwy."
        },
        {
          text: "Całkowity brak jakiejkolwiek bolesności przy badaniu narządów rodnych i wiotkie, zapadnięte sklepienia pochwy bez obecności płynu.",
          isCorrect: false,
          feedback: "Błąd. Obecność krwi w jamie otrzewnej wywołuje silne podrażnienie chemiczne i wyraźną bolesność sklepienia tylnego w badaniu dwuręcznym."
        },
        {
          text: "Obecność obfitego ropnego wycieku z kanału szyjki macicy z pęcherzykami gazu o zapachu zgnilizny charakterystycznego dla gangreny.",
          isCorrect: false,
          feedback: "Błąd. Pęknięcie torbieli nie jest pierwotną infekcją bakteryjną; objawy wynikają z jałowego hemoperitoneum."
        },
        {
          text: "Stwierdzenie obecności tkanek płodu wydostających się przez całkowicie rozwarte ujście zewnętrzne szyjki macicy.",
          isCorrect: false,
          feedback: "Błąd. Ujemna próba ciążowa beta-hCG całkowicie wyklucza poronienie lub obecność elementów jaja płodowego."
        }
      ]
    },
    {
      title: "Krok 4: Ultrasonografia przyłóżkowa POCUS / TVS",
      desc: "Wykonano pilne USG przezpochwowe oraz USG jamy brzusznej (FAST). Jaki obraz ultrasonograficzny potwierdza rozpoznanie?",
      options: [
        {
          text: "Obecność wolnego płynu z echami krwi w zatoce Douglasa i przestrzeni Morisona oraz zapadnięta, grubościenna torbiel jajnika z resztkami skrzepu.",
          isCorrect: true,
          feedback: "Prawidłowo! USG potwierdza hemoperitoneum (krew w miednicy i jamie brzusznej) oraz zapadniętą torbiel ciałka żółtego o nieregularnym obrysie."
        },
        {
          text: "Prawidłowy obraz narządów miednicy mniejszej bez jakichkolwiek śladów płynu w jamie otrzewnej wykluczający krwawienie w 100%.",
          isCorrect: false,
          feedback: "Błąd. Przy pęknięciu naczynia torbieli wolny płyn (krew) niemal zawsze gromadzi się w jamie Douglasa i jest dobrze widoczny w USG."
        },
        {
          text: "Obecność obustronnych litych guzów jajnika o średnicy > 20 cm naciekających pęcherz moczowy i odbytnicę u młodej pacjentki.",
          isCorrect: false,
          feedback: "Błąd. Taki obraz odpowiada zaawansowanemu nowotworowi złośliwemu, a nie nagłemu pęknięciu czynnościowej torbieli ciałka żółtego."
        },
        {
          text: "Uwidocznienie licznych pętli jelita cienkiego uwięźniętych w kanale udowym bez obecności narządów rodnych w miednicy.",
          isCorrect: false,
          feedback: "Błąd. Przepuklina udowa rzadko występuje u młodych kobiet, a ból podbrzusza po stosunku z ujemnym hCG to domena ginekologii."
        }
      ]
    },
    {
      title: "Krok 5: Analgezja multimodalna i płynoterapia ratunkowa",
      desc: "Pacjentka odczuwa silny ból brzucha (7/10). Jakie leczenie farmakologiczne należy wdrożyć na czas przygotowania do dalszego postępowania?",
      options: [
        {
          text: "Paracetamol 1000 mg i.v. w skojarzeniu z metamizolem 1000 mg i.v. (lub opioidem: fentanyl/morfina) oraz kontrolowany wlew zbilansowanych krystaloidów.",
          isCorrect: true,
          feedback: "Prawidłowo! Analgezja dożylna uśmierza ból bez maskowania wskazań operacyjnych, a płynoterapia wyrównuje wolemię w przypadku utraty krwi."
        },
        {
          text: "Podanie kwasu acetylosalicylowego w dawce 1000 mg dożylnie w celu szybkiego zniesienia stanu zapalnego błony śluzowej miednicy.",
          isCorrect: false,
          feedback: "Błąd. Aspiryna hamuje czynność płytek krwi i nasila krwawienie do jamy otrzewnej; NLPZ o działaniu antyagregacyjnym są przeciwwskazane."
        },
        {
          text: "Całkowite wstrzymanie leków przeciwbólowych do czasu podjęcia decyzji przez ordynatora oddziału chirurgii w dniu kolejnym.",
          isCorrect: false,
          feedback: "Błąd. Pozostawianie pacjentki w cierpieniu jest niehumanitarne i niezgodne ze sztuką medyczną; analgezja jest standardem postępowania."
        },
        {
          text: "Zastosowanie dożylnego wlewu mannitolu 20% w dawce 500 ml w celu odwodnienia tkanek miednicy mniejszej i zmniejszenia obrzęku.",
          isCorrect: false,
          feedback: "Błąd. Mannitol nasila diurezę osmotyczną i pogłębia hipowolemię u krwawiącej pacjentki; lek ten stosuje się w obrzęku mózgu."
        }
      ]
    },
    {
      title: "Krok 6: Monitorowanie laboratoryjne dynamiki krwawienia",
      desc: "Początkowa morfologia: Hb 12,2 g/dl, Hct 36%. Po 3 godzinach obserwacji: Hb 9,4 g/dl, Hct 28%, RR 95/55 mmHg, HR 112/min. Jak interpretować te wyniki?",
      options: [
        {
          text: "Aktywne, postępujące krwawienie do jamy otrzewnej ze spadkiem stężenia hemoglobiny i cechami dekompensacji hemodynamicznej wymagające interwencji.",
          isCorrect: true,
          feedback: "Prawidłowo! Istotny spadek Hb w krótkim czasie z tachykardią i hipotensją świadczy o trwającym krwotoku wewnętrznym przekraczającym hemostazę samoistną."
        },
        {
          text: "Błąd laboratoryjny analizatora hematologicznego; zalecenie zignorowania wyników i wypisania pacjentki do domu na żądanie.",
          isCorrect: false,
          feedback: "Błąd. Spadek Hb z 12,2 na 9,4 g/dl w połączeniu z tachykardią i hipotensją to pewny objaw postępującego krwotoku wewnętrznego."
        },
        {
          text: "Objaw fizjologicznego rozcieńczenia krwi po posiłku bez jakiegokolwiek znaczenia klinicznego dla młodej kobiety.",
          isCorrect: false,
          feedback: "Błąd. Taki spadek parametrów czerwonokrwinkowych nigdy nie jest fizjologią i wskazuje na utratę co najmniej kilkuset mililitrów krwi."
        },
        {
          text: "Wskazanie do natychmiastowego wdrożenia chemioterapii przeciwnowotworowej z powodu podejrzenia ostrej białaczki szpikowej.",
          isCorrect: false,
          feedback: "Błąd. Obraz wynika z pęknięcia naczynia torbieli jajnika, a nie z pierwotnej choroby rozrostowej szpiku kostnego."
        }
      ]
    },
    {
      title: "Krok 7: Kwalifikacja do leczenia operacyjnego vs zachowawczego",
      desc: "U pacjentek z pękniętą torbielą jajnika leczenie może być zachowawcze lub operacyjne. Co w tym przypadku decyduje o konieczności natychmiastowej operacji?",
      options: [
        {
          text: "Niestabilność hemodynamiczna, postępujący spadek hemoglobiny oraz duża objętość krwi w otrzewnej (brak hemostazy samoistnej) kwalifikują do pilnej laparoskopii.",
          isCorrect: true,
          feedback: "Prawidłowo! Leczenie zachowawcze jest możliwe wyłącznie u stabilnych pacjentek bez cech aktywnego krwotoku; niestabilność wymaga rewizji chirurgicznej."
        },
        {
          text: "Wiek pacjentki poniżej 30 roku życia; każda kobieta w tym wieku z pęknięciem torbieli musi mieć bezwzględnie usunięty jajnik drogą laparotomii.",
          isCorrect: false,
          feedback: "Błąd. Sam wiek nie determinuje operacji, a współczesnym celem jest zachowanie jajnika, a nie jego rutynowe usunięcie."
        },
        {
          text: "Brak zgody ubezpieczyciela na hospitalizację zachowawczą na oddziale ginekologii w ramach kontraktu z funduszem zdrowia.",
          isCorrect: false,
          feedback: "Błąd. Wskazania do zabiegu ratującego życie wynikają wyłącznie ze stanu klinicznego pacjentki, a nie procedur rozliczeniowych."
        },
        {
          text: "Chęć wykonania rutynowego wycięcia wyrostka robaczkowego 'przy okazji' u każdej pacjentki zgłaszającej się na ostry dyżur ginekologiczny.",
          isCorrect: false,
          feedback: "Błąd. Wyrostek usuwa się wyłącznie w razie zapalenia; wskazaniem do operacji jest opanowanie krwotoku z pękniętej torbieli."
        }
      ]
    },
    {
      title: "Krok 8: Śródoperacyjna hemostaza i oszczędzające zaopatrzenie jajnika",
      desc: "W trakcie laparoskopii ewakuowano 600 ml krwi z jamy otrzewnej. Z brzegu pękniętej torbieli prawego jajnika sączy się krew. Jaka jest technika zaopatrzenia?",
      options: [
        {
          text: "Miejscowa hemostaza bipolarowa krwawiących naczyń lub założenie szwów hemostatycznych na jajnik z maksymalnym zaoszczędzeniem zdrowego zrębu gonady.",
          isCorrect: true,
          feedback: "Prawidłowo! U młodej kobiety z torbielą czynnościową należy bezwzględnie zachować jajnik; usuwa się jedynie patologiczne tkanki po koagulacji."
        },
        {
          text: "Całkowite usunięcie prawego jajnika wraz z jajowodem i wycięciem macicy w celu uniknięcia jakichkolwiek nawrotów krwawień w przyszłości.",
          isCorrect: false,
          feedback: "Błąd. Histerektomia z adneksektomią u 22-latki z powodu krwawiącego ciałka żółtego jest rażącym i okaleczającym błędem lekarskim."
        },
        {
          text: "Zalanie jamy otrzewnej 10 litrami stężonego spirytusu salicylowego w celu sterylizacji i chemicznego obkurczenia tkanek miednicy.",
          isCorrect: false,
          feedback: "Błąd. Spirytus w otrzewnej wywołałby śmiertelne oparzenie chemiczne narządów i zapaść krążeniową; jamę płucze się solą fizjologiczną."
        },
        {
          text: "Pozostawienie krwawiącego jajnika bez jakiejkolwiek interwencji i zamknięcie powłok z założeniem jednego drenu grawitacyjnego.",
          isCorrect: false,
          feedback: "Błąd. Brak zaopatrzenia naczynia doprowadzi do dalszego krwawienia pooperacyjnego i konieczności powtórnej reoperacji ratunkowej."
        }
      ]
    }
  ],

  157: [
    {
      title: "Krok 1: Wstępna ocena ABCDE i rozpoznanie ostrego zespołu miednicznego",
      desc: "25-latka zgłasza się z silnym, obustronnym bólem podbrzusza od 3 dni, gorączką 38,9°C i ropnymi upławami. RR 110/70 mmHg, HR 105/min, Temp 38,9°C.",
      options: [
        {
          text: "Wstępna ocena ABCDE, kaniulacja żyły obwodowej (18G), pobranie krwi na morfologię, CRP, prokalcytoninę, beta-hCG oraz posiewy i wdrożenie nawadniania.",
          isCorrect: true,
          feedback: "Prawidłowo! Zespół bólowy miednicy mniejszej z gorączką i ropnymi upławami u młodej kobiety budzi silne podejrzenie ostrego PID (Pelvic Inflammatory Disease)."
        },
        {
          text: "Podanie doustnego preparatu wapnia i magnezu oraz zalecenie natychmiastowego powrotu do domu i stosowania ciepłych okładów na podbrzusze.",
          isCorrect: false,
          feedback: "Błąd. Ostre zapalenie miednicy z wysoką gorączką to groźna infekcja wstępująca; brak leczenia grozi ropniem przydatków i sepsą."
        },
        {
          text: "Wykonanie nakłucia jamy opłucnej igłą odbarczającą w celu wykluczenia odmy prężnej u pacjentki z gorączką i bólem brzucha.",
          isCorrect: false,
          feedback: "Błąd. Dolegliwości dotyczą miednicy mniejszej i narządów rodnych; nakłucie klatki piersiowej jest bezpodstawne i niebezpieczne."
        },
        {
          text: "Podanie dożylne 100 mg morfiny w szybkim bolusie bez monitorowania parametrów życiowych ani pobrania krwi na badania laboratoryjne.",
          isCorrect: false,
          feedback: "Błąd. Taka dawka morfiny wywoła natychmiastowe zatrzymanie oddechu; analgezja musi być bezpieczna i dostosowana do masy ciała."
        }
      ]
    },
    {
      title: "Krok 2: Badanie dwuręczne i objaw Chandelier",
      desc: "W trakcie badania ginekologicznego we wziernikach stwierdzono śluzowo-ropną wydzielinę z szyjki macicy. Jaki objaw w badaniu dwuręcznym jest patognomoniczny dla PID?",
      options: [
        {
          text: "Skrajna bolesność przy poruszaniu szyjką macicy (objaw Chandelier / kołysania szyjki) oraz obustronna tkliwość i obrzmienie przydatków w badaniu palpacyjnym.",
          isCorrect: true,
          feedback: "Prawidłowo! Objaw Chandelier (ból tak silny, że pacjentka 'chce skoczyć do żyrandola') oraz tkliwość przydatków i trzonu macicy to kluczowe kryteria kliniczne PID."
        },
        {
          text: "Całkowity brak czucia bólu w obrębie miednicy mniejszej przy głębokim ucisku szyjki macicy i przydatków świadczący o pełnym porażeniu nerwów.",
          isCorrect: false,
          feedback: "Błąd. Ostre zapalenie narządów miednicy charakteryzuje się wybitną bolesnością; brak czucia nie jest cechą PID."
        },
        {
          text: "Wyczuwalna w badaniu przez pochwę obecność twardego, niebolesnego kamienia moczowodowego zamykającego całkowicie światło cewki moczowej.",
          isCorrect: false,
          feedback: "Błąd. Kamica moczowodowa ma inny obraz kliniczny (kolka nerkowa); ropne upławy i bolesność szyjki wskazują na zakażenie wstępujące."
        },
        {
          text: "Stwierdzenie obecności uchyłka Meckela wypadającego bezpośrednio przez nienaruszoną ścianę przednią pochwy pacjentki.",
          isCorrect: false,
          feedback: "Błąd. Uchyłek Meckela znajduje się w jamie brzusznej (jelito kręte) i nie wpukla się do pochwy; badanie potwierdza stan zapalny przydatków."
        }
      ]
    },
    {
      title: "Krok 3: Diagnostyka mikrobiologiczna i laboratoryjna CITO",
      desc: "Jakie badania mikrobiologiczne z wymazu z kanału szyjki macicy stanowią złoty standard identyfikacji patogenów wywołujących PID?",
      options: [
        {
          text: "Badanie molekularne metodą amplifikacji kwasów nukleinowych (NAAT / PCR) w kierunku Neisseria gonorrhoeae i Chlamydia trachomatis oraz ocena flory beztlenowej.",
          isCorrect: true,
          feedback: "Prawidłowo! NAAT to najczulsza metoda wykrywania rzeżączki i chlamydiozy – głównych czynników etiologicznych PID u młodych aktywnych seksualnie kobiet."
        },
        {
          text: "Ocena mikroskopowa wyłącznie pod kątem obecności jaj pasożytów jelitowych (owsików i glisty ludzkiej) w treści pochwowej.",
          isCorrect: false,
          feedback: "Błąd. Pasożyty jelitowe nie są typową przyczyną PID; kluczowe są patogeny przenoszone drogą płciową (N. gonorrhoeae, C. trachomatis, Mycoplasma genitalium)."
        },
        {
          text: "Izolowane wykonanie odczynu WR (Wassermanna) i wstrzymanie wdrożenia jakiejkolwiek antybiotykoterapii do czasu uzyskania wyniku za 7 dni.",
          isCorrect: false,
          feedback: "Błąd. Oczekiwanie na odczyny kiłowe opóźnia leczenie ostrego zapalenia; antybiotykoterapię empiryczną wdraża się natychmiast po pobraniu wymazów."
        },
        {
          text: "Posiew plwociny w kierunku prątków gruźlicy jako jedyne badanie mikrobiologiczne zlecone u pacjentki z objawami miednicznymi.",
          isCorrect: false,
          feedback: "Błąd. Badanie plwociny nie diagnozuje ostrego zakażenia dróg rodnych; materiał należy pobrać bezpośrednio z kanału szyjki macicy."
        }
      ]
    },
    {
      title: "Krok 4: Ultrasonografia przezpochwowa (TVS) w diagnostyce powikłań",
      desc: "Wykonano USG miednicy mniejszej. Na jakie powikłanie zapalenia przydatków, stanowiące wskazanie do pilnego leczenia szpitalnego, należy zwrócić uwagę?",
      options: [
        {
          text: "Obecność ropnia jajowodowo-jajnikowego (TOA – tubo-ovarian abscess) o charakterze złożonej, grubościennej masy z płynem i przegrodami w przydatkach.",
          isCorrect: true,
          feedback: "Prawidłowo! Ropień TOA to najgroźniejsze ostre powikłanie PID; grozi pęknięciem, rozlanym zapaleniem otrzewnej i wstrząsem septycznym."
        },
        {
          text: "Uwidocznienie prawidłowych, drobnych pęcherzyków antralnych w korze jajnika jako rzekomego dowodu na złośliwy nowotwór zarodkowy.",
          isCorrect: false,
          feedback: "Błąd. Pęcherzyki antralne to prawidłowa struktura jajnika w wieku rozrodczym, a nie powikłanie zapalne ani nowotwór."
        },
        {
          text: "Obecność zwapnień w torebce stawu biodrowego jako bezpośredniej przyczyny gorączki septycznej i upławów u pacjentki.",
          isCorrect: false,
          feedback: "Błąd. Staw biodrowy nie ma związku z ropnym zapaleniem przydatków i zakażeniem wstępującym z dróg rodnych."
        },
        {
          text: "Brak macicy w badaniu ultrasonograficznym spowodowany jej rzekomym zniszczeniem przez bakterie w ciągu ostatnich 24 godzin.",
          isCorrect: false,
          feedback: "Błąd. Infekcja bakteryjna nie prowadzi do rozpuszczenia całego narządu; w USG ocenia się grubość endometrium, jajowody i obecność zbiorników ropnych."
        }
      ]
    },
    {
      title: "Krok 5: Kryteria kwalifikacji do hospitalizacji",
      desc: "Pacjentka ma gorączkę 38,9°C, nudności, leukocytozę 16 800/µl, CRP 95 mg/l i silny ból brzucha. Czy kwalifikuje się do leczenia ambulatoryjnego czy szpitalnego?",
      options: [
        {
          text: "Kwalifikacja do hospitalizacji; wysoka gorączka, znaczna leukocytoza, objawy otrzewnowe, nudności uniemożliwiające leczenie doustne to wskazania do terapii i.v.",
          isCorrect: true,
          feedback: "Prawidłowo! Ciężki stan ogólny, gorączka > 38,5°C, nietolerancja leków p.o. i podejrzenie ropnia TOA bezwzględnie wymagają leczenia szpitalnego drogą dożylną."
        },
        {
          text: "Wypisanie do domu z zaleceniem picia naparu z rumianku i zgłoszenia się na kontrolę za 3 tygodnie, jeśli upławy nie ustąpią.",
          isCorrect: false,
          feedback: "Błąd. Ostre PID z cechami uogólnionej reakcji zapalnej leczone domowymi sposobami skończy się sepsą, niepłodnością lub zrostami otrzewnowymi."
        },
        {
          text: "Skierowanie pacjentki do sanatorium uzdrowiskowego w celu odbycia serii kąpieli borowinowych w trybie pilnym.",
          isCorrect: false,
          feedback: "Błąd. Zabiegi termiczne w ostrym stanie zapalnym są bezwzględnie przeciwwskazane, gdyż nasilają przekrwienie i ułatwiają rozsiew zakażenia."
        },
        {
          text: "Zalecenie natychmiastowej izolacji domowej na okres 40 dni z całkowitym zakazem przyjmowania jakichkolwiek leków przeciwbakteryjnych.",
          isCorrect: false,
          feedback: "Błąd. PID wymaga natychmiastowej celowanej antybiotykoterapii wielolekowej w celu ochrony narządu rodnego i zachowania płodności."
        }
      ]
    },
    {
      title: "Krok 6: Dobór empirycznej antybiotykoterapii parenteralnej I rzutu",
      desc: "Jaki schemat antybiotykoterapii dożylnej jest rekomendowany przez wytyczne (PTGiP / CDC) w leczeniu szpitalnym ostrego PID?",
      options: [
        {
          text: "Ceftriakson 1–2 g i.v. 1x/d z doksycykliną 100 mg p.o./i.v. co 12 h oraz metronidazolem 500 mg i.v. co 12 h (pokrycie N. gonorrhoeae, chlamydii i beztlenowców).",
          isCorrect: true,
          feedback: "Prawidłowo! Schemat ten zapewnia szerokie pokrycie patogenów rzeżączki, chlamydii oraz beztlenowców kolonizujących dolne drogi rodne."
        },
        {
          text: "Zastosowanie monoterapii wankomycyną w pojedynczej dawce 500 mg dożylnie bez kojarzenia z jakimkolwiek innym lekiem przeciwbakteryjnym o szerokim spektrum.",
          isCorrect: false,
          feedback: "Błąd. Wankomycyna działa wyłącznie na bakterie Gram-dodatnie i nie pokrywa rzeżączki, chlamydiozy ani pałeczek jelitowych Gram-ujemnych."
        },
        {
          text: "Stosowanie wyłącznie flukonazolu 150 mg jednorazowo doustnie z błędnym założeniem, że jedyną przyczyną gorączki jest izolowana kandydoza pochwy.",
          isCorrect: false,
          feedback: "Błąd. Drożdżyca nie wywołuje ostrego PID, zapalenia otrzewnej ani gorączki 39°C; konieczna jest agresywna antybiotykoterapia przeciwbakteryjna."
        },
        {
          text: "Dożylne podanie ampicyliny w małej dawce 250 mg jednorazowo bez pokrycia patogenów atypowych, chlamydii ani bakterii beztlenowych miednicy.",
          isCorrect: false,
          feedback: "Błąd. Chlamydia trachomatis nie posiada ściany komórkowej wrażliwej na aminopenicyliny; schemat nie pokrywa patogenów atypowych."
        }
      ]
    },
    {
      title: "Krok 7: Ocena odpowiedzi klinicznej w 48–72 godzinie terapii",
      desc: "Po 48 godzinach dożylnej antybiotykoterapii gorączka ustąpiła (36,8°C), ból podbrzusza znacznie zmalał, leukocytoza spadła do 9 200/µl. Jakie jest dalsze postępowanie?",
      options: [
        {
          text: "Kontynuacja antybiotykoterapii dożylnej przez 24–48 h od poprawy, a następnie przejście na leczenie doustne (doksycyklina + metronidazol) do łącznego czasu 14 dni.",
          isCorrect: true,
          feedback: "Prawidłowo! Pełny 14-dniowy kurs antybiotykoterapii jest kluczowy dla eradykacji chlamydii i zapobiegania trwałemu uszkodzeniu rzęsek jajowodów."
        },
        {
          text: "Natychmiastowe zakończenie wszelkiego leczenia po 48 godzinach i wypisanie pacjentki bez jakichkolwiek dalszych zaleceń lekarskich.",
          isCorrect: false,
          feedback: "Błąd. Przedwczesne przerwanie leczenia po ustąpieniu gorączki prowadzi do szybkiego nawrotu infekcji, przewlekłego bólu i zrostów miednicy."
        },
        {
          text: "Kwalifikacja pacjentki do natychmiastowej laparotomii zwiadowczej pomimo pełnej poprawy klinicznej i normalizacji parametrów zapalnych.",
          isCorrect: false,
          feedback: "Błąd. Przy skuteczności leczenia zachowawczego operacja nie jest wskazana; interwencja chirurgiczna dotyczy powikłań (np. pękniętego ropnia TOA)."
        },
        {
          text: "Zamiana antybiotyków na leki przeciwgrzybicze podawane dożylnie przez kolejne 6 miesięcy w ramach profilaktyki wtórnej.",
          isCorrect: false,
          feedback: "Błąd. Długotrwała terapia przeciwgrzybicza bez wskazań jest bezpodstawna i wysoce hepatotoksyczna."
        }
      ]
    },
    {
      title: "Krok 8: Profilaktyka powikłań odległych i leczenie partnera",
      desc: "Przed wypisem pacjentka pyta o ryzyko powikłań oraz postępowanie wobec partnera seksualnego. Jakie zalecenia należy bezwzględnie przekazać?",
      options: [
        {
          text: "Konieczność przebadania i jednoczesnego przeleczenia partnera seksualnego (oraz wstrzemięźliwość do ukończenia kuracji) w celu zapobiegania reinfekcji i niepłodności.",
          isCorrect: true,
          feedback: "Prawidłowo! Brak leczenia partnera prowadzi do natychmiastowej reinfekcji ('efekt ping-ponga'). PID zwiększa ryzyko niepłodności jajowodowej i ciąży ektopowej."
        },
        {
          text: "Zapewnienie pacjentki, że partner nie wymaga żadnego leczenia, ponieważ mężczyźni są całkowicie odporni na zakażenia dwoinką rzeżączki i chlamydią.",
          isCorrect: false,
          feedback: "Błąd. Mężczyźni często są bezobjawowymi lub skąpoobjawowymi nosicielami chlamydiozy; nieleczony partner natychmiast ponownie zakazi pacjentkę."
        },
        {
          text: "Zalecenie stosowania wyłącznie irygacji pochwy z wody utlenionej po każdym kolejnym stosunku płciowym jako jedynej metody ochrony.",
          isCorrect: false,
          feedback: "Błąd. Irygacje niszczą naturalną florę pałeczek kwasu mlekowego (Lactobacillus), ułatwiając wstępowanie patogenów do jamy macicy."
        },
        {
          text: "Poinformowanie pacjentki, że przebyty epizod PID gwarantuje trwałą odporność immunologiczną przeciwko wszystkim patogenom miednicy.",
          isCorrect: false,
          feedback: "Błąd. Przebycie PID nie pozostawia odporności; każdy kolejny epizod gwałtownie podwaja ryzyko trwałej niedrożności jajowodów i niepłodności."
        }
      ]
    }
  ],

  158: [
    {
      title: "Krok 1: Wstępna ocena ABCDE i rozpoznanie piorunującego bólu głowy",
      desc: "48-latek trafia na SOR z powodu nagłego, obezwładniającego bólu głowy o natychmiastowym początku ('jak uderzenie pioruna' – thunderclap headache), nudnościami i światłowstrętem. RR 175/100 mmHg.",
      options: [
        {
          text: "Wstępna ocena ABCDE, tlenoterapia, kaniulacja żyły, sedacja bólu, ocena objawów oponowych (sztywność karku) i natychmiastowe skierowanie na TK głowy bez kontrastu.",
          isCorrect: true,
          feedback: "Prawidłowo! Piorunujący ból głowy osiągający szczyt w < 1 minutę to klasyczny objaw krwawienia podpajęczynówkowego (SAH), najczęściej z pękniętego tętniaka."
        },
        {
          text: "Zalecenie zażycia aspiryny 500 mg doustnie z podejrzeniem ostrego napadu migreny bez aury i odesłanie pacjenta do domu na odpoczynek.",
          isCorrect: false,
          feedback: "Błąd. W krwawieniu podpajęczynówkowym podanie kwasu acetylosalicylowego nasila krwotok, a odesłanie pacjenta grozi zgonem w mechanizmie ponownego pęknięcia tętniaka."
        },
        {
          text: "Wykonanie próby wysiłkowej na cykloergometrze rowerowym w celu sprawdzenia wydolności fizycznej przed badaniem neurologicznym.",
          isCorrect: false,
          feedback: "Błąd. Wzrost ciśnienia krwi podczas wysiłku doprowadziłby do natychmiastowego ponownego krwotoku podpajęczynówkowego i wklinowania pnia mózgu."
        },
        {
          text: "Podanie dożylne 100 mg rtęci w celu chemicznego obciążenia naczyń podstawy mózgu i zahamowania pulsowania tętniaka.",
          isCorrect: false,
          feedback: "Błąd. Związki rtęci są skrajnie toksyczne i nie mają żadnego zastosowania medycznego; stanowią śmiertelną truciznę."
        }
      ]
    },
    {
      title: "Krok 2: Pilna tomografia komputerowa głowy bez kontrastu (NCCT)",
      desc: "Jakie jest badanie obrazowe I rzutu z wyboru w diagnostyce krwawienia podpajęczynówkowego w pierwszych godzinach od początku objawów?",
      options: [
        {
          text: "Tomografia komputerowa głowy bez środka cieniującego (NCCT); w pierwszych 6 godzinach czułość w wykrywaniu wynaczynionej krwi wynosi niemal 100%.",
          isCorrect: true,
          feedback: "Prawidłowo! Niekontrastowe TK głowy (NCCT) to złoty standard I rzutu. Uwidacznia hiperdensyjną krew w zbiornikach podstawy, bruzdach i komorach mózgu."
        },
        {
          text: "Przeglądowe zdjęcie rentgenowskie czaszki (RTG) w projekcji przednio-tylnej i bocznej w celu oceny grubości kości sklepienia czaszki.",
          isCorrect: false,
          feedback: "Błąd. RTG czaszki uwidacznia jedynie kości i jest całkowicie ślepe na krwawienie podpajęczynówkowe w obrębie mózgowia."
        },
        {
          text: "Elektroencefalografia (EEG) z próbą fotostymulacji w celu natychmiastowego wykrycia ogniska krwotoku podpajęczynówkowego.",
          isCorrect: false,
          feedback: "Błąd. EEG rejestruje potencjały bioelektryczne kory i nie pozwala na bezpośrednią ocenę obecności wynaczynionej krwi w przestrzeni płynowej."
        },
        {
          text: "Ultrasonografia przezciemiączkowa głowicą sektorową wykonywana rutynowo przez kość czołową u dorosłego pacjenta na sali SOR.",
          isCorrect: false,
          feedback: "Błąd. U dorosłych zarośnięte kości czaszki całkowicie pochłaniają ultradźwięki; USG przezciemiączkowe stosuje się wyłącznie u niemowląt."
        }
      ]
    },
    {
      title: "Krok 3: Postępowanie w przypadku ujemnego wyniku TK (Protokół LP)",
      desc: "Gdyby TK głowy wykonane w 12. godzinie było ujemne, a podejrzenie SAH w wywiadzie pozostaje wysokie, jaka procedura jest niezbędna?",
      options: [
        {
          text: "Nakłucie lędźwiowe (LP) po min. 6–12 h od początku bólu w celu oceny ksantochromii płynu mózgowo-rdzeniowego metodą spektrofotometrii.",
          isCorrect: true,
          feedback: "Prawidłowo! Jeśli TK jest ujemne, wykonuje się LP. Ksantochromia (żółte zabarwienie od bilirubiny z lizy erytrocytów) potwierdza przebyte SAH."
        },
        {
          text: "Natychmiastowe wypisanie pacjenta z rozpoznaniem nerwicy lękowej bez wykonywania jakichkolwiek dalszych badań inwazyjnych.",
          isCorrect: false,
          feedback: "Błąd. W 2–5% przypadków TK może być fałszywie ujemne (zwłaszcza po kilkunastu godzinach); zaniechanie LP grozi przeoczeniem tętniaka."
        },
        {
          text: "Zlecenie gastroskopii w celu wykluczenia krwawienia z wrzodu trawiennego żołądka jako przyczyny piorunującego bólu głowy.",
          isCorrect: false,
          feedback: "Błąd. Gastroskopia nie ma związku z patologią wewnątrzczaszkową; diagnostyka skupia się na przestrzeni podpajęczynówkowej mózgu."
        },
        {
          text: "Wykonanie biopsji tętnicy skroniowej w celu poszukiwania olbrzymiokomórkowego zapalenia naczyń u 48-letniego pacjenta z piorunującym bólem.",
          isCorrect: false,
          feedback: "Błąd. Olbrzymiokomórkowe zapalenie tętnic występuje po 50. r.ż. i daje ból podostry; nagły 'uderzenie pioruna' wymaga diagnostyki SAH."
        }
      ]
    },
    {
      title: "Krok 4: Skale kliniczne i angiografia naczyniowa (Identyfikacja tętniaka)",
      desc: "TK potwierdziło krew w przestrzeni podpajęczynówkowej (Fisher 3, Hunt-Hess II). Jakie badanie naczyniowe należy wykonać CITO w celu znalezienia źródła krwawienia?",
      options: [
        {
          text: "Angio-TK tętnic mózgowych (CTA) lub cyfrowa angiografia subtrakcyjna (DSA) w celu uwidocznienia tętniaka i kwalifikacji do zabiegu zabezpieczającego.",
          isCorrect: true,
          feedback: "Prawidłowo! Angio-TK pozwala na błyskawiczne zlokalizowanie tętniaka (np. tętnicy łączącej przedniej ACoA) i zaplanowanie embolizacji lub klipsowania."
        },
        {
          text: "Pletyzmografia kończyn dolnych w celu wykluczenia żylaków podudzi jako rzekomego źródła krwotoku podpajęczynówkowego.",
          isCorrect: false,
          feedback: "Błąd. Tętniaki mózgowe znajdują się w kołach tętniczych mózgowia (koło Willisa); naczynia kończyn dolnych nie mają tu żadnego związku."
        },
        {
          text: "Wykonanie wlewu kontrastu barytowego do jelita grubego (wlew doodbytniczy) pod kontrolą skopii rentgenowskiej.",
          isCorrect: false,
          feedback: "Błąd. Diagnostyka przewodu pokarmowego jest całkowicie nieuzasadniona w krwawieniu wewnątrzczaszkowym i opóźnia leczenie tętniaka."
        },
        {
          text: "Cynkometria włosów i paznokci w celu poszukiwania niedoborów mikroelementów wpływających na elastyczność ścian naczyń krwionośnych.",
          isCorrect: false,
          feedback: "Błąd. Badania włosów nie mają żadnego znaczenia w medycynie ratunkowej; priorytetem jest pilne obrazowanie naczyniowe CTA/DSA."
        }
      ]
    },
    {
      title: "Krok 5: Neuroprotekcja i zapobieganie skurczowi naczyniowemu (DCI)",
      desc: "Pęknięcie tętniaka stwarza ryzyko opóźnionego niedokrwienia mózgu w mechanizmie skurczu naczyniowego (vasospasm). Jaki lek o udowodnionej skuteczności należy wdrożyć?",
      options: [
        {
          text: "Nimodypina w dawce 60 mg doustnie (lub przez zgłębnik żołądkowy) co 4 godziny przez 21 dni od wystąpienia krwawienia podpajęczynówkowego.",
          isCorrect: true,
          feedback: "Prawidłowo! Nimodypina (bloker kanałów wapniowych z grupy dihydropirydyn) wykazuje selektywne działanie neuroprotekcyjne i zmniejsza ryzyko zawału mózgu."
        },
        {
          text: "Werapamil w szybkim bolusie dożylnym 50 mg co godzinę bez kontroli ciśnienia tętniczego ani zapisu elektrokardiograficznego.",
          isCorrect: false,
          feedback: "Błąd. Taka dawka werapamilu doprowadzi do zatrzymania akcji serca w bloku AV III stopnia i głębokiej zapaści krążeniowej."
        },
        {
          text: "Całkowite ograniczenie podaży płynów do 500 ml na dobę w celu wywołania ciężkiej hipowolemii zapobiegającej wzrostowi ciśnienia w naczyniach.",
          isCorrect: false,
          feedback: "Błąd. Hipowolemia drastycznie zwiększa ryzyko zawału niedokrwiennego mózgu w mechanizmie skurczu naczyniowego; obowiązuje normowolemia."
        },
        {
          text: "Podanie dożylne amfetaminy w dawce 100 mg w celu pobudzenia kory mózgowej i zapobiegania senności u pacjenta neurologicznego.",
          isCorrect: false,
          feedback: "Błąd. Amfetamina wywołałaby skrajny skok ciśnienia tętniczego i natychmiastowe śmiertelne ponowne pęknięcie tętniaka mózgu."
        }
      ]
    },
    {
      title: "Krok 6: Ścisła kontrola ciśnienia tętniczego przed zaopatrzeniem tętniaka",
      desc: "Przed zabezpieczeniem tętniaka wysokie ciśnienie tętnicze (RR 175/100 mmHg) stwarza skrajne ryzyko rebleeding. Jakie są cele ciśnieniowe i leki z wyboru?",
      options: [
        {
          text: "Obniżenie ciśnienia skurczowego (SBP) poniżej 160 mmHg (lub < 140 mmHg) za pomocą dożylnego labetalolu lub urapidylu z zachowaniem perfuzji mózgu (CPP).",
          isCorrect: true,
          feedback: "Prawidłowo! Kontrola ciśnienia zapobiega ponownemu pęknięciu tętniaka (najwyższe ryzyko w pierwszych 24 h), nie dopuszczając do nadmiernej hipotonii."
        },
        {
          text: "Gwałtowne obniżenie ciśnienia skurczowego poniżej 80 mmHg za pomocą nitroprusydku sodu w celu całkowitego odbarczenia tętniaka.",
          isCorrect: false,
          feedback: "Błąd. Zbyt głęboki spadek ciśnienia prowadzi do zawału niedokrwiennego mózgu w warunkach podwyższonego ciśnienia śródczaszkowego (ICP)."
        },
        {
          text: "Zaniechanie jakiejkolwiek kontroli ciśnienia i podanie noradrenaliny w celu utrzymania ciśnienia skurczowego powyżej 240 mmHg.",
          isCorrect: false,
          feedback: "Błąd. Ciśnienie > 200 mmHg przed zaopatrzeniem tętniaka doprowadzi do natychmiastowego ponownego krwotoku o śmiertelności przekraczającej 70%."
        },
        {
          text: "Podanie dożylne furosemidu w dawce 200 mg w celu szybkiej redukcji wolemii przed transportem pacjenta na salę angiograficzną.",
          isCorrect: false,
          feedback: "Błąd. Pętlowe diuretyki wywołują hipowolemię i zaburzenia elektrolitowe, nasilając ryzyko opóźnionego niedokrwienia mózgu."
        }
      ]
    },
    {
      title: "Krok 7: Zabezpieczenie pękniętego tętniaka w oknie 24 godzin",
      desc: "Angio-TK uwidoczniło tętniak workowaty tętnicy łączącej przedniej o wymiarach 6x5 mm. Jakie postępowanie definitywne należy wdrożyć w ciągu 24 h?",
      options: [
        {
          text: "Pilne wyłączenie tętniaka z krążenia metodą wewnątrznaczyniową (embolizacja sprężynkami – koiling) lub neurochirurgiczną (klipsowanie tętniaka).",
          isCorrect: true,
          feedback: "Prawidłowo! Wczesne zabezpieczenie tętniaka (< 24 h) zapobiega nawrotowi krwawienia i umożliwia bezpieczne agresywne leczenie skurczu naczyniowego."
        },
        {
          text: "Odrocznie operacji na okres 6 miesięcy w celu umożliwienia samoistnego zarośnięcia tętniaka tkanką łączną włóknistą.",
          isCorrect: false,
          feedback: "Błąd. Pęknięty niezabezpieczony tętniak w ciągu pierwszych 4 tygodni pęka ponownie u > 30% pacjentów, niosąc za sobą skrajną śmiertelność."
        },
        {
          text: "Zastosowanie zewnętrznego naświetlania promieniami gamma (Gamma Knife) jako metody natychmiastowego zatamowania krwawienia z tętniaka.",
          isCorrect: false,
          feedback: "Błąd. Radiochirurgia wymaga miesięcy lub lat do obliteracji naczynia i nie ma żadnego zastosowania w ostrym pęknięciu tętniaka mózgu."
        },
        {
          text: "Wstrzyknięcie do krążenia ogólnego 1000 mg trombiny bydlęcej w celu wywołania uogólnionego wykrzepiania wewnątrz tętniaka.",
          isCorrect: false,
          feedback: "Błąd. Trombina podana ogólnoustrojowo wywołałaby natychmiastowy zawał serca, zatorowość płucną i śmiertelny udar niedokrwienny."
        }
      ]
    },
    {
      title: "Krok 8: Nadzór na OION / OIT i powikłania wczesne",
      desc: "Tętniak został pomyślnie skoilowany. W 2. dobie pacjent staje się podsypiający, a kontrolne TK wykazuje poszerzenie układu komorowego. Co to oznacza?",
      options: [
        {
          text: "Ostre wodogłowie pokrwotoczne (zaburzenie wchłaniania PMR przez ziarnistości pajęczynówki) wymagające pilnego założenia drenażu komorowego (EVD).",
          isCorrect: true,
          feedback: "Prawidłowo! Ostre wodogłowie po SAH rozwija się w wyniku zatkania dróg odpływu PMR krwią; drenaż komorowy zewnętrzny ratuje przed wgłobieniem."
        },
        {
          text: "Fizjologiczny proces regeneracji tkanki nerwowej niewymagający żadnej interwencji ani modyfikacji dotychczasowego postępowania.",
          isCorrect: false,
          feedback: "Błąd. Narastanie układu komorowego z pogorszeniem stanu świadomości to ostre wodogłowie grożące wklinowaniem pnia mózgu i zgonem."
        },
        {
          text: "Wskazanie do natychmiastowego odstawienia nimodypiny i wdrożenia leczenia dużymi dawkami sterydów anabolicznych dożylnie.",
          isCorrect: false,
          feedback: "Błąd. Nimodypina chroni przed skurczem naczyniowym; sterydy nie leczą ostrego wodogłowia obturacyjnego."
        },
        {
          text: "Zalecenie podania leków wymiotnych w celu obniżenia ciśnienia w jamie brzusznej i odbarczenia układu żylnego głowy.",
          isCorrect: false,
          feedback: "Błąd. Wymioty gwałtownie podnoszą ciśnienie śródczaszkowe (ICP) i prowokują wgłobienie migdałków móżdżku do otworu wielkiego."
        }
      ]
    }
  ],

  159: [
    {
      title: "Krok 1: Triage udarowy ABCDE i zabezpieczenie parametrów życiowych",
      desc: "62-latek z nieleczonym nadciśnieniem tętniczym trafia na SOR z nagłym niedowładem połowiczym lewostronnym, afazją ruchową i spadkiem GCS do 11. RR 210/115 mmHg.",
      options: [
        {
          text: "Zabezpieczenie drożności dróg oddechowych, tlenoterapia (cel SpO2 >= 95%), dwa wkłucia i.v., pomiar glikemii CITO i pilny transport na tomografię komputerową.",
          isCorrect: true,
          feedback: "Prawidłowo! Podejrzenie ostrego udaru mózgu wymaga natychmiastowego wykluczenia hipoglikemii, stabilizacji ABCDE i wykonania pilnego badania neuroobrazowego."
        },
        {
          text: "Podanie podjęzykowej nifedypiny w kroplach w celu natychmiastowego zbicia ciśnienia tętniczego do wartości 90/60 mmHg przed transportem.",
          isCorrect: false,
          feedback: "Błąd. Niefedypina w kroplach wywołuje niekontrolowany spadek ciśnienia, zapaść perfuzji mózgowej i wtórny zawał wokół ogniska krwotocznego."
        },
        {
          text: "Zalecenie podania 500 ml 40% roztworu glukozy bez sprawdzania wyjściowego stężenia cukru we krwi obwodowej pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Podanie hipertonicznej glukozy w udarze bez hipoglikemii nasila obrzęk mózgu i kwasicę mleczanową w tkance nerwowej."
        },
        {
          text: "Wykonanie próby pionizacji pacjenta na sali przyjęć i polecenie wykonania spaceru w celu weryfikacji siły mięśniowej kończyny dolnej.",
          isCorrect: false,
          feedback: "Błąd. Próba chodzenia u pacjenta z ostrym niedowładem połowiczym i zaburzeniami świadomości grozi upadkiem, urazem głowy i złamaniami."
        }
      ]
    },
    {
      title: "Krok 2: Pilna neuroobrazowa diagnostyka różnicowa (Udar niedokrwienny vs ICH)",
      desc: "Jakie badanie obrazowe jest bezwzględnym standardem CITO w różnicowaniu udaru niedokrwiennego z krwotokiem śródmózgowym (ICH)?",
      options: [
        {
          text: "Tomografia komputerowa głowy bez kontrastu (NCCT), która natychmiastowo uwidacznia ognisko krwotoczne jako obszar hiperdensyjny (jasny).",
          isCorrect: true,
          feedback: "Prawidłowo! Niekontrastowe TK głowy natychmiast różnicuje udar krwotoczny (hiperdensyjny krwiak) od niedokrwiennego, decydując o dalszym leczeniu."
        },
        {
          text: "Elektromiografia (EMG) kończyny niedowładnej w celu oceny przewodnictwa we włóknach nerwowych obwodowych na ostrym dyżurze.",
          isCorrect: false,
          feedback: "Błąd. EMG służy diagnostyce chorób nerwowo-mięśniowych obwodowych; w udarze uszkodzenie dotyczy ośrodkowego układu nerwowego."
        },
        {
          text: "Scyntygrafia kości czaszki z użyciem izotopu technetu-99m w celu poszukiwania mikropęknięć w strukturze kości ciemieniowej.",
          isCorrect: false,
          feedback: "Błąd. Scyntygrafia kości jest czasochłonna, nie uwidacznia tkanki mózgowej ani krwawienia i jest bezużyteczna w udarze mózgu."
        },
        {
          text: "Zdjęcie przeglądowe klatki piersiowej w projekcji leżącej jako jedyne badanie obrazowe przed włączeniem trombolizy dożylnej.",
          isCorrect: false,
          feedback: "Błąd. Podanie trombolizy (rtPA) u pacjenta z krwotokiem śródmózgowym bez wcześniejszego TK głowy doprowadziłoby do natychmiastowego zgonu."
        }
      ]
    },
    {
      title: "Krok 3: Pilne i kontrolowane obniżanie ciśnienia tętniczego",
      desc: "TK potwierdziło krwiak śródmózgowy w jądrach podkorowych o objętości 25 ml. RR wynosi 210/115 mmHg. Jakie są aktualne wytyczne kontroli ciśnienia tętniczego?",
      options: [
        {
          text: "Płynne i bezpieczne obniżenie ciśnienia skurczowego (SBP) do przedziału 130–140 mmHg za pomocą dożylnego urapidylu lub labetalolu w ciągłym wlewie.",
          isCorrect: true,
          feedback: "Prawidłowo! Szybkie i bezpieczne obniżenie SBP do 130–140 mmHg zmniejsza ryzyko ekspansji krwiaka bez pogarszania perfuzji mózgowej (badania INTERACT-2, ATACH-2)."
        },
        {
          text: "Utrzymywanie ciśnienia skurczowego powyżej 220 mmHg w celu wymuszenia przepływu krwi przez uszkodzone naczynia mózgowe.",
          isCorrect: false,
          feedback: "Błąd. Ciśnienie > 200 mmHg prowadzi do gwałtownej ekspansji krwiaka w pierwszych godzinach, wklinowania i zgonu pacjenta."
        },
        {
          text: "Agresywne obniżenie ciśnienia skurczowego poniżej 90 mmHg za pomocą wysokich dawek wazodylatatorów w ciągu pierwszych 5 minut.",
          isCorrect: false,
          feedback: "Błąd. Zbyt drastyczny spadek RR wywołuje głębokie niedokrwienie półcienia wokół krwiaka i załamanie rzutu sercowego."
        },
        {
          text: "Podanie dożylnej kofeiny i efedryny w celu podtrzymania skurczu naczyń i stymulacji ośrodka oddechowego w pniu mózgu.",
          isCorrect: false,
          feedback: "Błąd. Sympatykomimetyki drastycznie podnoszą ciśnienie i przyspieszają akcję serca, wywołując powiększenie krwiaka."
        }
      ]
    },
    {
      title: "Krok 4: Pilne odwracanie koagulopatii u pacjentów leczonych przeciwkrzepliwie",
      desc: "Gdyby pacjent przyjmował doustny antykoagulant z grupy antagonistów witaminy K (acenokumarol/warfarynę) i miał INR 3,2, jakie leczenie należy podać natychmiast?",
      options: [
        {
          text: "Koncentrat czynników zespołu protrombiny (4F-PCC) w dawce dostosowanej do INR i masy ciała w skojarzeniu z witaminą K1 10 mg i.v. w powolnym wlewie.",
          isCorrect: true,
          feedback: "Prawidłowo! 4F-PCC normalizuje INR w ciągu 15–30 minut (znacznie szybciej i bezpieczniej niż FFP, bez przeciążenia objętościowego). Witamina K podtrzymuje hemostazę."
        },
        {
          text: "Podanie wyłącznie witaminy C w dawce 500 mg doustnie i oczekiwanie na samoistny spadek INR przez najbliższe 5 dni.",
          isCorrect: false,
          feedback: "Błąd. Witamina C nie ma wpływu na układ krzepnięcia; brak natychmiastowego odwrócenia VKA doprowadzi do śmiertelnego rozlania krwiaka."
        },
        {
          text: "Wdrożenie dożylnej trombolizy rekombinowanym tkankowym aktywatorem plazminogenu (alteplazą) w dawce 0,9 mg/kg m.c.",
          isCorrect: false,
          feedback: "Błąd. Alteplaza rozpuszcza skrzepy; jej podanie w krwotoku śródmózgowym z koagulopatią wywoła natychmiastowe śmiertelne zalanie mózgowia."
        },
        {
          text: "Przetoczenie 20 litrów 5% glukozy w celu mechanicznego wypłukania cząsteczek antykoagulantu z przestrzeni wewnątrznaczyniowej.",
          isCorrect: false,
          feedback: "Błąd. Taka objętość płynu hipotonicznego wywołałaby skrajny obrzęk mózgu, załamanie gospodarki wodno-elektrolitowej i zgon."
        }
      ]
    },
    {
      title: "Krok 5: Ocena cech ekspansji krwiaka i objawu plamki (Spot sign)",
      desc: "Wykonano badanie angio-TK głowy. Radiolog opisuje obecność ogniska wynaczynienia kontrastu wewnątrz krwiaka (tzw. spot sign). Co oznacza ten objaw?",
      options: [
        {
          text: "Aktywne wynaczynianie krwi wewnątrz krwiaka, świadczące o bardzo wysokim ryzyku wczesnej ekspansji krwiaka i pogorszenia stanu neurologicznego.",
          isCorrect: true,
          feedback: "Prawidłowo! Dodatni 'spot sign' w CTA to silny predyktor powiększania się krwiaka w pierwszych 24 h; wymaga rygorystycznej kontroli ciśnienia i hemostazy."
        },
        {
          text: "Objaw całkowitej i trwałej hemostazy wykluczający jakąkolwiek dalszą ekspansję krwiaka w kolejnych dobach hospitalizacji.",
          isCorrect: false,
          feedback: "Błąd. Obecność kontrastu wewnątrz krwiaka to bezpośredni dowód na aktywne wyciekanie krwi z uszkodzonego naczynia krwionośnego."
        },
        {
          text: "Zwapnienie splotu naczyniastego komory bocznej będące całkowicie bezobjawowym wariantem anatomicznym u starszych pacjentów.",
          isCorrect: false,
          feedback: "Błąd. Spot sign to wynaczynienie kontrastu, a nie fizjologiczne zwapnienie; ma kluczowe znaczenie rokownicze w ICH."
        },
        {
          text: "Artefakt ruchowy wywołany mruganiem powiekami przez pacjenta podczas skanowania aparatem tomograficznym.",
          isCorrect: false,
          feedback: "Błąd. Doświadczony radiolog odróżnia artefakty od zakontrastowanego naczynia krwawiącego do wnętrza tkanki mózgowej."
        }
      ]
    },
    {
      title: "Krok 6: Postępowanie w zespole wzmożonego ciśnienia wewnątrzczaszkowego (ICP)",
      desc: "W 6. godzinie pacjent staje się głęboko soporotyczny, lewa źrenica poszerza się i słabiej reaguje na światło (cechy ciasnoty i wgłobienia). Jakie jest leczenie ratunkowe?",
      options: [
        {
          text: "Uniesienie wezgłowia łóżka o 30°, intubacja dotchawicza z krótkotrwałą hiperwentylacją (pCO2 30–35 mmHg) oraz podanie mannitolu 20% (0,5–1 g/kg) lub 3% NaCl.",
          isCorrect: true,
          feedback: "Prawidłowo! Terapia osmotyczna (mannitol lub sól hipertoniczna) wraz z uniesieniem głowy i normowentylacją szybko obniża ciśnienie wewnątrzczaszkowe (ICP)."
        },
        {
          text: "Ułożenie pacjenta w pozycji Trendelenburga (głową w dół) i podanie 1000 ml czystej wody destylowanej dożylnie w szybkim bolusie.",
          isCorrect: false,
          feedback: "Błąd. Pozycja Trendelenburga drastycznie zwiększa zastój żylny w głowie i ICP, a woda destylowana wywołuje śmiertelną hemolizę i obrzęk mózgu."
        },
        {
          text: "Zastosowanie wysokich dawek deksametazonu (16 mg i.v.) w celu redukcji obrzęku mózgu wokół ogniska krwotocznego.",
          isCorrect: false,
          feedback: "Błąd. Glikokortykosteroidy w udarze krwotocznym są nieskuteczne, zwiększają śmiertelność, ryzyko infekcji i hiperglikemii; są przeciwwskazane."
        },
        {
          text: "Wdrożenie hipotermii farmakologicznej poprzez okładanie ciała pacjenta suchym lodem bez znieczulenia ani intubacji.",
          isCorrect: false,
          feedback: "Błąd. Niekontrolowana hipotermia bez sedacji wywoła drżenia mięśniowe, gwałtowny wzrost metabolizmu i nagłe zatrzymanie krążenia."
        }
      ]
    },
    {
      title: "Krok 7: Kwalifikacja do leczenia neurochirurgicznego",
      desc: "W jakiej lokalizacji krwotok śródmózgowy stanowi bezwzględne wskazanie do pilnej operacji odbarczającej w trybie natychmiastowym?",
      options: [
        {
          text: "Krwiak móżdżku o średnicy > 3 cm wywołujący ucisk pnia mózgu lub ostre wodogłowie obturacyjne; bezwzględne wskazanie do natychmiastowej kraniektomii.",
          isCorrect: true,
          feedback: "Prawidłowo! Krwiaki tylnego dołu czaszki (móżdżku) zagrażają uciśnięciem ośrodków krążenia i oddychania w pniu mózgu; wymagają natychmiastowej dekompresji."
        },
        {
          text: "Drobne ognisko krwotoczne o średnicy 3 mm w korze płata potylicznego u pacjenta całkowicie przytomnego bez żadnych deficytów.",
          isCorrect: false,
          feedback: "Błąd. Małe krwiaki korowe bez deficytów leczy się zachowawczo; operacja wiązałaby się z nieuzasadnionym uszkodzeniem tkanki mózgowej."
        },
        {
          text: "Głęboki krwiak pnia mózgu u pacjenta w stanie śmierci mózgu z całkowitym brakiem jakichkolwiek odruchów pniowych.",
          isCorrect: false,
          feedback: "Błąd. Krwiaki pnia mózgu nie kwalifikują się do rutynowego odbarczenia chirurgicznego ze względu na skrajne ryzyko jatrogennego zniszczenia pnia."
        },
        {
          text: "Krwotok do przysadki mózgowej bez ucisku na skrzyżowanie wzrokowe u pacjenta z łagodnym bólem głowy bez zaburzeń widzenia.",
          isCorrect: false,
          feedback: "Błąd. Apopleksja przysadki bez ucisku na skrzyżowanie i bez zaburzeń widzenia może być leczona zachowawczo substytucją hydrokortyzonem."
        }
      ]
    },
    {
      title: "Krok 8: Dyspozycja końcowa i wczesna profilaktyka powikłań na Oddziale Udarowym",
      desc: "Krwiak zlokalizowany w jądrach podkorowych nie kwalifikuje się do operacji. Ciśnienie ustabilizowano na poziomie 135/85 mmHg. Jaka jest dyspozycja i cele opieki?",
      options: [
        {
          text: "Hospitalizacja na Oddziale Udarowym / OIT, ciągłe monitorowanie neurologiczne, normoglikemia, normotermia, profilaktyka zachłystowego zapalenia płuc i DVT.",
          isCorrect: true,
          feedback: "Prawidłowo! Kompleksowa opieka w dedykowanym oddziale udarowym znamiennie zmniejsza śmiertelność i stopień niepełnosprawności u pacjentów z ICH."
        },
        {
          text: "Wypisanie pacjenta do domu z zaleceniem powrotu do pracy fizycznej po 48 godzinach od ustąpienia objawów ostrego bólu głowy.",
          isCorrect: false,
          feedback: "Błąd. Pacjent z krwotokiem śródmózgowym i niedowładem połowiczym wymaga wielotygodniowej hospitalizacji i intensywnej neurorehabilitacji."
        },
        {
          text: "Przekazanie pacjenta do hospicjum stacjonarnego bez podejmowania jakichkolwiek prób rehabilitacji ruchowej ani logopedycznej.",
          isCorrect: false,
          feedback: "Błąd. Krwotok śródmózgowy ma potencjał do znacznej poprawy funkcjonalnej; wczesna rehabilitacja daje szansę na samodzielność."
        },
        {
          text: "Wdrożenie doustnej antykoagulacji antagonistami witaminy K w dawce nasycającej już w pierwszej dobie po wystąpieniu krwotoku.",
          isCorrect: false,
          feedback: "Błąd. Włączenie antykoagulacji w ostrej fazie ICH doprowadziłoby do natychmiastowego powiększenia krwiaka i zgonu pacjenta."
        }
      ]
    }
  ],

  160: [
    {
      title: "Krok 1: Wstępna ocena ABCDE i różnicowanie przemijających objawów ogniskowych",
      desc: "67-latek przywieziony po nagłym, 35-minutowym epizodzie osłabienia prawej ręki i zaburzeń mowy, które całkowicie ustąpiły przed przyjazdem na SOR. RR 150/90 mmHg, HR 78/min.",
      options: [
        {
          text: "Wstępna ocena ABCDE, zabezpieczenie kaniuli dożylnej, natychmiastowy pomiar glikemii (wykluczenie hipoglikemii), EKG i pilne skierowanie na TK głowy.",
          isCorrect: true,
          feedback: "Prawidłowo! Całkowite ustąpienie deficytu neurologicznego w < 24 h sugeruje TIA, lecz wymaga pilnego wykluczenia hipoglikemii i zmian organicznych w neuroobrazowaniu."
        },
        {
          text: "Poinformowanie pacjenta, że skoro objawy całkowicie ustąpiły, jest w 100% zdrowy i może natychmiast bezpiecznie opuścić szpital bez badań.",
          isCorrect: false,
          feedback: "Błąd. Po TIA ryzyko pełnoobjawowego, kaleczącego udaru niedokrwiennego w ciągu kolejnych 48 godzin wynosi nawet do 10–15%."
        },
        {
          text: "Podanie dożylnej trombolizy (alteplazy 0,9 mg/kg) w celu wypłukania mikrozakrzepów z naczyń mózgowych u pacjenta bez deficytów.",
          isCorrect: false,
          feedback: "Błąd. Tromboliza jest wskazana w trwającym ostrym udarze niedokrwiennym; ustąpienie objawów (TIA) jest przeciwwskazaniem do podania rtPA."
        },
        {
          text: "Podanie doustnej glukozy 75 g w ramach rutynowego testu tolerancji glukozy przed wykonaniem jakichkolwiek badań obrazowych głowy.",
          isCorrect: false,
          feedback: "Błąd. Krzywa cukrowa nie ma zastosowania w ostrym TIA; priorytetem jest pilne obrazowanie mózgowia i naczyń domózgowych."
        }
      ]
    },
    {
      title: "Krok 2: Pilne wykluczenie zmian organicznych w neuroobrazowaniu",
      desc: "Jakie badanie obrazowe jest I rzutu w trybie ostrym, a jakie stanowi złoty standard wykrywania świeżych mikroskopijnych ognisk niedokrwienia?",
      options: [
        {
          text: "TK głowy bez kontrastu CITO w celu natychmiastowego wykluczenia krwawienia, a docelowo rezonans magnetyczny (DWI-MR) o najwyższej czułości dla świeżego niedokrwienia.",
          isCorrect: true,
          feedback: "Prawidłowo! TK wyklucza krwiaka lub guz, natomiast sekwencja DWI w MR wykrywa nawet kilkumilimetrowe ostre ogniska niedokrwienne u chorych z TIA."
        },
        {
          text: "Zdjęcie rentgenowskie kręgosłupa szyjnego w projekcji czynnościowej jako jedyne badanie obrazowe niezbędne w diagnostyce TIA.",
          isCorrect: false,
          feedback: "Błąd. RTG kręgosłupa nie obrazuje mózgowia ani naczyń wewnątrzczaszkowych; nie pozwala na ocenę ryzyka udaru niedokrwiennego."
        },
        {
          text: "Mielografia z podaniem kontrastu do kanału kręgowego w celu poszukiwania ucisku na rdzeń kręgowy na poziomie lędźwiowym.",
          isCorrect: false,
          feedback: "Błąd. Objawy dotyczyły twarzy i ręki (kora mózgu, dorzecze MCA); badanie odcinka lędźwiowego jest bezcelowe i inwazyjne."
        },
        {
          text: "Termografia twarzy w podczerwieni w celu oceny symetrii temperatury powłok skórnych u pacjenta po epizodzie neurologicznym.",
          isCorrect: false,
          feedback: "Błąd. Termografia nie ma żadnego zastosowania w nowoczesnej neurologii naczyniowej; standardem jest TK i MR mózgowia."
        }
      ]
    },
    {
      title: "Krok 3: Stratyfikacja ryzyka udaru w skali ABCD²",
      desc: "W skali ABCD² pacjent otrzymuje punkty za: wiek 67 lat (1 pkt), BP 150/90 (1 pkt), jednostronny niedowład (2 pkt), czas 35 min (1 pkt). Suma = 5 pkt. Co oznacza ten wynik?",
      options: [
        {
          text: "Wysokie ryzyko udaru niedokrwiennego (wynik 4–5 pkt oznacza umiarkowane/wysokie ryzyko, wymagające pilnej hospitalizacji i natychmiastowej diagnostyki).",
          isCorrect: true,
          feedback: "Prawidłowo! Wynik ABCD² >= 4 pkt wskazuje na wysokie ryzyko wczesnego udaru mózgu i stanowi bezwzględne wskazanie do pilnej hospitalizacji na oddziale udarowym."
        },
        {
          text: "Zerowe ryzyko wystąpienia jakichkolwiek powikłań naczyniowych w ciągu kolejnych 10 lat życia pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Wręcz przeciwnie – pacjent znajduje się w grupie wysokiego ryzyka i bez wdrożenia profilaktyki może rozwinąć inwalidzący udar w ciągu 48 h."
        },
        {
          text: "Wskazanie do natychmiastowego leczenia przeciwpasożytniczego z podejrzeniem wągrzycy ośrodkowego układu nerwowego.",
          isCorrect: false,
          feedback: "Błąd. Skala ABCD² służy do oceny ryzyka udaru mózgu po TIA, a nie do diagnostyki chorób inwazyjnych."
        },
        {
          text: "Konieczność natychmiastowego wykonania operacji wszczepienia zastawki komorowo-otrzewnowej bez badań obrazowych.",
          isCorrect: false,
          feedback: "Błąd. TIA nie ma związku z wodogłowiem zastoinowym; pacjent wymaga diagnostyki naczyniowo-sercowej."
        }
      ]
    },
    {
      title: "Krok 4: Wdrożenie natychmiastowej podwójnej terapii przeciwpłytkowej (DAPT)",
      desc: "Po wykluczeniu krwawienia w TK, jakie wczesne leczenie przeciwpłytkowe ma udowodnioną skuteczność w zapobieganiu wczesnemu udarowi (badania POINT, CHANCE)?",
      options: [
        {
          text: "Podwójna terapia przeciwpłytkowa (DAPT): kwas acetylosalicylowy (ASA) w dawce nasycającej 150–300 mg + klopidogrel 300 mg, kontynuowane przez 21 dni.",
          isCorrect: true,
          feedback: "Prawidłowo! DAPT (ASA + klopidogrel) wdrożona w pierwszych 24 h po TIA o wysokim ryzyku (ABCD² >= 4) redukuje ryzyko udaru o 25–30% w porównaniu z monoterapią."
        },
        {
          text: "Monoterapia heparyną niefrakcjonowaną we wlewie ciągłym przez 6 miesięcy bez podawania jakichkolwiek leków przeciwpłytkowych.",
          isCorrect: false,
          feedback: "Błąd. Rutynowa pełna antykoagulacja w niekardiogennym TIA zwiększa ryzyko krwawień śródczaszkowych bez dodatkowej korzyści w porównaniu z DAPT."
        },
        {
          text: "Całkowity zakaz stosowania leków hamujących czynność płytek krwi ze względu na rzekome ryzyko natychmiastowej atrofii kory mózgowej.",
          isCorrect: false,
          feedback: "Błąd. Leki przeciwpłytkowe są filarem leczenia naczyniowego TIA; ich brak drastycznie zwiększa ryzyko dokonanego udaru."
        },
        {
          text: "Podanie dożylne streptokinazy w dawce 1 500 000 j.m. w powolnym wlewie kroplowym w celu lizy mikroskopijnych blaszek miażdżycowych.",
          isCorrect: false,
          feedback: "Błąd. Tromboliza w TIA jest bezwzględnie przeciwwskazana i grozi wywołaniem jatrogennego krwotoku do mózgu."
        }
      ]
    },
    {
      title: "Krok 5: Diagnostyka naczyniowa CITO (Tętnice szyjne i kręgowe)",
      desc: "Jakie nieinwazyjne badanie obrazowe naczyń domózgowych należy pilnie wykonać u każdego pacjenta z TIA w celu kwalifikacji do rewaskularyzacji?",
      options: [
        {
          text: "Pilne badanie USG Doppler tętnic szyjnych i kręgowych (duplex scan) lub angio-TK tętnic szyjnych w celu oceny stopnia zwężenia tętnicy szyjnej wewnętrznej (ICA).",
          isCorrect: true,
          feedback: "Prawidłowo! Wykrycie objawowego zwężenia tętnicy szyjnej wewnętrznej (ICA 70–99%) jest wskazaniem do pilnej operacji endarterektomii (CEA) w ciągu 7–14 dni."
        },
        {
          text: "Zdjęcie rentgenowskie kości obojczyka w projekcji skośnej w celu oceny przebiegu tętnicy podobojczykowej u pacjenta po epizodzie TIA.",
          isCorrect: false,
          feedback: "Błąd. RTG obojczyka nie pozwala na ocenę światła naczynia ani morfologii blaszki miażdżycowej; standardem jest USG Doppler."
        },
        {
          text: "Kapilaroskopia wałów paznokciowych w celu poszukiwania mikroangiopatii w przebiegu twardziny układowej u pacjenta z TIA.",
          isCorrect: false,
          feedback: "Błąd. Kapilaroskopia bada mikrokrążenie obwodowe w reumatologii i nie ma żadnej wartości w ocenie zwężeń tętnic szyjnych."
        },
        {
          text: "Limfografia naczyniowa kończyn górnych z użyciem błękitu metylenowego w celu oceny drenażu limfatycznego ramienia.",
          isCorrect: false,
          feedback: "Błąd. Układ limfatyczny nie bierze udziału w patogenezie niedokrwienia mózgu; badanie jest całkowicie bezpodstawne."
        }
      ]
    },
    {
      title: "Krok 6: Diagnostyka kardiologiczna źródła zatorowości (Poszukiwanie AF)",
      desc: "Zatorowość sercopochodna odpowiada za znaczną część epizodów TIA. Jakie postępowanie diagnostyczne jest kluczowe dla wykrycia napadowego AF?",
      options: [
        {
          text: "Wykonanie 12-odprowadzeniowego EKG, ciągłe monitorowanie telemetryczne min. 24 h (lub Holter EKG) oraz badanie echokardiograficzne serca (ECHO).",
          isCorrect: true,
          feedback: "Prawidłowo! Wykrycie migotania przedsionków (AF) całkowicie zmienia leczenie – wymaga wdrożenia doustnego antykoagulantu (NOAC/VKA) zamiast leków przeciwpłytkowych."
        },
        {
          text: "Pojedynczy pomiar tętna na tętnicy promieniowej przez 5 sekund przez pielęgniarkę jako w pełni wystarczające badanie rytmu serca u pacjenta na sali SOR.",
          isCorrect: false,
          feedback: "Błąd. Napadowe migotanie przedsionków może wystąpić w dowolnym momencie doby; krótki pomiar tętna przeoczy większość epizodów arytmii."
        },
        {
          text: "Zlecenie badania scyntygrafii perfuzyjnej mięśnia sercowego z dipirydamolem bez monitorowania zapisu elektrokardiograficznego metodą ciągłą.",
          isCorrect: false,
          feedback: "Błąd. Scyntygrafia ocenia chorobę wieńcową, a kluczowym celem jest wykrycie zatorogennej arytmii przedsionkowej (AF) lub skrzepliny w uszku."
        },
        {
          text: "Wykonanie nakłucia worka osierdziowego w celu poszukiwania komórek nowotworowych u każdego pacjenta zgłaszającego się z przemijającym niedowładem.",
          isCorrect: false,
          feedback: "Błąd. Perikardiocenteza jest procedurą inwazyjną zarezerwowaną dla tamponady serca; wykonywanie jej w TIA jest błędem sztuki."
        }
      ]
    },
    {
      title: "Krok 7: Intensywna terapia hipolipemizująca (Statynoterapia)",
      desc: "Jakie leczenie hipolipemizujące należy wdrożyć natychmiast u pacjenta po TIA o podłożu miażdżycowym, niezależnie od wyjściowego stężenia cholesterolu?",
      options: [
        {
          text: "Wysokodawkowa statyna o silnym działaniu (atorwastatyna 80 mg/dobę lub rosuwastatyna 40 mg/dobę) w celu stabilizacji blaszki i redukcji LDL < 55 mg/dl.",
          isCorrect: true,
          feedback: "Prawidłowo! Wczesna agresywna statynoterapia (SPARCL trial) działa plejotropowo, wygasza stan zapalny w blaszce miażdżycowej i redukuje ryzyko udaru mózgu."
        },
        {
          text: "Zalecenie picia dwóch szklanek soku z grejpfruta dziennie jako jedynej naturalnej metody redukcji cholesterolu we krwi.",
          isCorrect: false,
          feedback: "Błąd. Sok z grejpfruta blokuje cytochrom CYP3A4 i nie leczy miażdżycy, a wchodzi w groźne interakcje farmakologiczne."
        },
        {
          text: "Całkowite odstawienie statyn u każdego chorego z TIA z obawy przed wystąpieniem łagodnych bólów mięśniowych.",
          isCorrect: false,
          feedback: "Błąd. Brak statynoterapii u chorego wysokiego ryzyka naczyniowego drastycznie zwiększa ryzyko zawału serca i zgonu z powodu udaru."
        },
        {
          text: "Podanie dożylne czystego oleju lnianego w powolnym wlewie kroplowym w celu wzbogacenia błon komórkowych w kwasy omega-3.",
          isCorrect: false,
          feedback: "Błąd. Dożylne podanie oleju wywoła śmiertelną zatorowość tłuszczową płuc i mózgu; postępowanie jest niedopuszczalne."
        }
      ]
    },
    {
      title: "Krok 8: Kwalifikacja zabiegowa i dyspozycja oddziałowa",
      desc: "USG Doppler wykazało 80% zwężenie lewej tętnicy szyjnej wewnętrznej (objawowej). Rytm zatokowy. Jaka jest dyspozycja i dalsze postępowanie zabiegowe?",
      options: [
        {
          text: "Hospitalizacja na Oddziale Udarowym, kontynuacja DAPT i statyny oraz pilna kwalifikacja do endarterektomii szyjnej (CEA) w ciągu 7–14 dni od epizodu.",
          isCorrect: true,
          feedback: "Prawidłowo! Objawowe ciasne zwężenie ICA (70–99%) po TIA wymaga pilnej operacji CEA w 'złotym oknie' do 14 dni w celu trwałego zapobieżenia udarowi."
        },
        {
          text: "Wypisanie pacjenta do domu i zaplanowanie wizyty w poradni chirurgii naczyniowej za 18 miesięcy w trybie rutynowym.",
          isCorrect: false,
          feedback: "Błąd. Odroczenie operacji objawowego zwężenia tętnicy szyjnej wiąże się ze skrajnym ryzykiem wystąpienia masywnego udaru mózgu w ciągu pierwszych tygodni."
        },
        {
          text: "Zalecenie intensywnego masażu okolicy kąta żuchwy i tętnicy szyjnej w celu 'rozgniecenia' blaszki miażdżycowej.",
          isCorrect: false,
          feedback: "Błąd. Masaż tętnicy ze zwężeniem doprowadzi do natychmiastowego urwania blaszki i zatorowości tętnic mózgu (udar dokonany)."
        },
        {
          text: "Przekazanie pacjenta do kliniki ortopedii z zaleceniem usztywnienia kręgosłupa szyjnego kołnierzem ortopedycznym na okres 1 roku.",
          isCorrect: false,
          feedback: "Błąd. Zwężenie tętnicy szyjnej to patologia naczyniowa wymagająca rewaskularyzacji (CEA lub CAS), a nie leczenia ortopedycznego."
        }
      ]
    }
  ]
};

async function run() {
  const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'cases', 'manifest.json'), 'utf8'));
  console.log('Expanding steps to 8 for Cases 156-160...');

  for (let id = 156; id <= 160; id++) {
    const file = manifest[id - 1];
    const fullPath = path.join(__dirname, '..', 'cases', file);
    const raw = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    const c = await decrypt(raw, MASTER_KEY);

    const newSteps = batch2Steps[id];
    verifyStepBalance(newSteps, id);
    c.steps = newSteps;

    const enc = await encrypt(c, MASTER_KEY);
    fs.writeFileSync(fullPath, JSON.stringify(enc, null, 2), 'utf8');
    console.log(`✓ Case #${id} updated with ${newSteps.length} full steps!`);
  }
}

run();

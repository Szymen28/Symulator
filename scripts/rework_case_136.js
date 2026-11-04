const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const case136 = {
  id: 136,
  dept: "Chirurgia ogólna",
  title: "Ropień i przetoka odbytu (Perianal Abscess & Fistula)",
  shortTitle: "42-letni Dariusz – Narastający, pulsujący ból okołoodbytniczy, dreszcze i bolesne uwypuklenie krocza (Ropień okołoodbytniczy i przetoka odbytu)",
  diagnosisTitle: "Ostry ropień kulszowo-odbytniczy (kryptogenny) powikłany przetoką odbytu – wskazanie do pilnego nacięcia i drenażu",
  vitals: [
    { name: "Częstość akcji serca", val: "108/min", status: "vital-warn" },
    { name: "Ciśnienie tętnicze", val: "128/82 mmHg", status: "vital-ok" },
    { name: "Temperatura ciała", val: "38.6 °C", status: "vital-crit" },
    { name: "Saturacja SpO2", val: "98%", status: "vital-ok" }
  ],
  vitalsObj: {
    hr: 108,
    bp: "128/82",
    spo2: 98,
    rr: 18,
    temp: 38.6,
    gcs: 15
  },
  story: "<p><strong>Pacjent:</strong> 42-letni mężczyzna, informatyk prowadzący siedzący tryb życia, zgłosił się na SOR z powodu narastającego od 4 dni, dotkliwego, rwącego i pulsującego bólu w okolicy odbytu i pośladka prawego. Ból nasila się podczas siedzenia, chodzenia oraz defekacji, a od wczoraj uniemożliwia sen.</p><p><strong>Wywiad chorobowy:</strong> Neguje chorobę Leśniowskiego-Crohna, wrzodziejące zapalenie jelita grubego oraz cukrzycę. W wywiadzie skłonność do zaparć. Od 2 dni występują dreszcze, uczucie rozbicia i gorączka do 38,6°C. Przed dwoma dniami zauważył niewielkie stwardnienie przy brzegu odbytu, które gwałtownie powiększyło się i stało się skrajnie tkliwe. Nie przyjmował leków poza doraźnym paracetamolem bez ulgi.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Pacjent w pozycji leżącej na boku z podkurczonymi nogami, z trudem zmienia pozycję ciała. W badaniu proktologicznym w ułożeniu kolankowo-łokciowym (lub lewobocznym Simsa): po prawej stronie odbytu (na godz. 7-8 w ułożeniu na wznak) widoczne obrzęknięte, żywoczerwone uwypuklenie powłok o średnicy ok. 5 cm, skrajnie tkliwe, o wzmożonym uciepleniu, z wyczuwalnym chełbotaniem w części centralnej. Skóra napięta i lśniąca, bez cech martwicy i bez trzeszczeń podskórnych. Badanie per rectum (DRE) jest niemal niemożliwe z powodu potężnego bólu i odruchowego skurczu zwieraczy, jednak palpacyjnie w dolnej części kanału odbytu wyczuwa się bolesne uwypuklenie prawej ściany kanału.</p>",
  labs: [
    {
      name: "Morfologia krwi i parametry zapalne",
      items: [
        { name: "Leukocyty (WBC)", val: "16.8 G/l", norm: "4.0 - 10.0 G/l", flag: "HIGH" },
        { name: "Neutrofile", val: "84 %", norm: "45 - 70 %", flag: "HIGH" },
        { name: "Hemoglobina (Hb)", val: "14.6 g/dl", norm: "13.5 - 17.5 g/dl", flag: "NORMAL" },
        { name: "Płytki krwi (PLT)", val: "340 G/l", norm: "150 - 400 G/l", flag: "NORMAL" },
        { name: "CRP", val: "148 mg/l", norm: "< 5.0 mg/l", flag: "HIGH" },
        { name: "Prokalcytonina (PCT)", val: "0.32 ng/ml", norm: "< 0.5 ng/ml", flag: "NORMAL" }
      ]
    },
    {
      name: "Biochemia i glikemia",
      items: [
        { name: "Glukoza na czczo", val: "94 mg/dl", norm: "70 - 99 mg/dl", flag: "NORMAL" },
        { name: "Kreatynina", val: "0.85 mg/dl", norm: "0.7 - 1.2 mg/dl", flag: "NORMAL" },
        { name: "Mocznik", val: "32 mg/dl", norm: "15 - 45 mg/dl", flag: "NORMAL" },
        { name: "Sód", val: "139 mmol/l", norm: "135 - 145 mmol/l", flag: "NORMAL" },
        { name: "Potas", val: "4.2 mmol/l", norm: "3.5 - 5.0 mmol/l", flag: "NORMAL" }
      ]
    },
    {
      name: "Układ krzepnięcia (przygotowanie do zabiegu)",
      items: [
        { name: "INR", val: "1.02", norm: "0.8 - 1.2", flag: "NORMAL" },
        { name: "APTT", val: "29 s", norm: "26 - 36 s", flag: "NORMAL" },
        { name: "Fibrynogen", val: "4.6 g/l", norm: "2.0 - 4.0 g/l", flag: "HIGH" }
      ]
    }
  ],
  steps: [
    {
      title: "Krok 1: Wstępna ocena kliniczna i patogeneza ropnia",
      text: "Lekarz SOR bada pacjenta z ostrym bólem krocza, gorączką i chełboczącym naciekiem w sąsiedztwie odbytu. Jaki jest pierwotny punkt wyjścia i najczęstszy patomechanizm rozwoju ropnia okołoodbytniczego?",
      options: [
        "Kryptogenne zakażenie gruczołów odbytowych (Hermanna i Desfosses) uchodzących do krypt Morgagniego na poziomie linii grzebieniastej (pectinate line)",
        "Zakażenie krwiopochodne od próchniczo zmienionego zęba",
        "Wrodzone przetrwanie uchyłka Meckela drenującego do kanału odbytu",
        "Pęknięcie tętniaka tętnicy kulszowej do tkanki podskórnej pośladka"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>W ponad 90% przypadków ropnie odbytu mają etiologię kryptogenną (zgodnie z teorią Parks-Eisenhammer).</strong> Infekcja rozpoczyna się od zablokowania ujścia i zakażenia jednego z 4-10 gruczołów odbytowych (gruczoły Hermanna i Desfosses), których przewody uchodzą w kryptach Morgagniego na poziomie linii zębatej (grzebieniastej). Powstający w przestrzeni międzyzwieraczowej mikroropień szerzy się wzdłuż powięzi i przestrzeni anatomicznych krocza (w dół jako ropień podskórny, bocznie jako ropień kulszowo-odbytniczy lub w górę jako ropień naddźwigaczowy).",
        "❌ BŁĄD! <strong>Zakażenia krwiopochodne odległych ognisk nie są przyczyną ropni kryptogennych krocza.</strong>",
        "❌ BŁĄD! <strong>Uchyłek Meckela znajduje się w jelicie krętym (60-100 cm od zastawki krętniczo-kątniczej) i nie uchodzi do odbytu.</strong>",
        "❌ BŁĄD! <strong>Tętniaki naczyń miednicy to skrajna rzadkość i nie dają obrazu ropnia kryptogennego z chełbotaniem.</strong>"
      ]
    },
    {
      title: "Krok 2: Badanie proktologiczne i ostrożność kliniczna",
      text: "Pacjent odczuwa skrajny ból przy jakiejkolwiek próbie dotknięcia okolicy odbytu. Jak należy właściwie przeprowadzić badanie proktologiczne w ostrym stadium ropnia?",
      options: [
        "Obejrzeć okolicę krocza, ocenić chełbotanie i wzmożone ucieplenie; nie forsować bolesnego badania per rectum (DRE) na żywca bez znieczulenia – pełne badanie palpacyjne i anoskopię wykonać w znieczuleniu na sali operacyjnej (EUA)",
        "Wprowadzić sztywny rektoskop bez znieczulenia na głębokość 25 cm, ignorując opór i krzyki pacjenta",
        "Zlecić wykonanie lewatywy fosforanowej przed badaniem, aby oczyścić bańkę odbytnicy",
        "Wykonać głębokie nakłucie gruboigłowe w gabinecie zabiegowym bez znieczulenia celem 'aspiracji próbnej'"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Złotą zasadą proktologii jest nieforsowanie badania per rectum na siłę u chorego z potężnym odczynem zapalnym i bólem.</strong> Oglądanie ujawnia chełboczący guz zapalny. Forsowne wkładanie palca lub anoskopu bez analgezji powoduje niewyobrażalny ból, odruchowy skurcz zwieraczy, a nawet ryzyko bakteriemii. Dokładne badanie per rectum, ocenę ujścia wewnętrznego oraz anoskopię przeprowadza się komfortowo w znieczuleniu podpajęczynówkowym lub ogólnym na sali operacyjnej podczas planowanego drenażu (EUA – Examination Under Anaesthesia).",
        "❌ BŁĄD! <strong>Forsowna rektoskopia bez znieczulenia w ostrym ropniu to błąd w sztuce i barbarzyństwo.</strong>",
        "❌ BŁĄD! <strong>Wlewki doodbytnicze w ostrym ropniu są przeciwwskazane ze względu na ból i ryzyko uszkodzenia ściany.</strong>",
        "❌ BŁĄD! <strong>Punkcja igłowa w warunkach gabinetu bez znieczulenia nie zastępuje drenażu chirurgicznego i grozi rozsiewem zakażenia.</strong>"
      ]
    },
    {
      title: "Krok 3: Różnicowanie anatomiczne typów ropnia odbytu",
      text: "W klasyfikacji anatomicznej wyróżnia się cztery główne lokalizacje ropni odbytu. Który typ ropnia rozwija się w dole kulszowo-odbytniczym, przechodzi bocznie przez mięsień zwieracz zewnętrzny i charakteryzuje się rozległym, głębokim naciekiem pośladka?",
      options: [
        "Ropień kulszowo-odbytniczy (ischiorectal abscess)",
        "Ropień podskórny (perianal subcutaneous abscess)",
        "Ropień międzyzwieraczowy (intersphincteric abscess)",
        "Ropień naddźwigaczowy (supralevator abscess)"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Ropień kulszowo-odbytniczy (ok. 20-25% przypadków) lokalizuje się poniżej mięśnia dźwigacza odbytu, a bocznie od mięśnia zwieracza zewnętrznego odbytu w dole kulszowo-odbytniczym.</strong> W przeciwieństwie do ropnia podskórnego (najczęstszego – ok. 60%), ropień kulszowo-odbytniczy jest znacznie głębszy, zawiera duże ilości cuchnącej ropy (nawet 100-300 ml) i może przechodzić przez przestrzeń zaodbytniczą na drugą stronę krocza, tworząc tzw. ropień podkowiasty (horseshoe abscess).",
        "❌ BŁĄD! <strong>Ropień podskórny jest powierzchowny, zlokalizowany tuż przy brzegu odbytu pod skórą krocza.</strong>",
        "❌ BŁĄD! <strong>Ropień międzyzwieraczowy rozwija się w rowku między zwieraczem wewnętrznym a zewnętrznym i często nie daje zmian widocznych na skórze.</strong>",
        "❌ BŁĄD! <strong>Ropień naddźwigaczowy rozwija się powyżej mięśnia dźwigacza odbytu, w przestrzeni miednicznej.</strong>"
      ]
    },
    {
      title: "Krok 4: Pilna strategia lecznicza – postępowanie chirurgiczne",
      text: "Lekarz dyżurny decyduje o postępowaniu terapeutycznym. Jakie jest jedyne prawidłowe, definitive postępowanie w przypadku ostrego ropnia odbytu?",
      options: [
        "Pilne chirurgiczne nacięcie i szeroki drenaż ropnia w znieczuleniu; pozostawienie rany otwartej (zakaz pierwotnego szycia rany!)",
        "Wdrożenie wyłącznie doustnej antybiotykoterapii (np. cyporfloksacyna) i odesłanie chorego do domu na 7 dni",
        "Okłady z sody oczyszczonej i ciepłe nasiadówki z kory dębu bez ingerencji chirurgicznej",
        "Wstrzyknięcie glikokortykosteroidów do ogniska zapalnego celem zmniejszenia obrzęku tkanek"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Złota reguła chirurgii: 'Ubi pus, ibi evacua' (gdzie ropa, tam ją ewakuuj). Jedynym skutecznym leczeniem ropnia odbytu jest natychmiastowe nacięcie i drenaż!</strong> Cięcie wykonuje się jak najbliżej brzegu odbytu (aby skrócić ewentualny przyszły kanał przetoki), wycina się brzeżek skóry (dewentracja / unroofing) lub zakłada dren/sączek, a ranę pozostawia otwartą do ziarninowania. Bezwzględnie NIE wolno szyć rany ropnia! Sama antybiotykoterapia bez drenażu jest kardynalnym błędem i prowadzi do destrukcji zwieraczy oraz sepsy.",
        "❌ BŁĄD! <strong>Sama antybiotykoterapia bez nacięcia to błąd w sztuce –</strong> antybiotyk nie penetruje do beznaczyniowej jamy ropnia.",
        "❌ BŁĄD! <strong>Nasiadówki mogą przynieść ulgę po drenażu, ale nie zastąpią ewakuacji ropy.</strong>",
        "❌ BŁĄD! <strong>Steroidy w czynnym zakażeniu ropnym są bezwzględnie zakazane –</strong> wywołałyby piorunującą posocznicę i zgorzel krocza."
      ]
    },
    {
      title: "Krok 5: Wykluczenie powikłania zagrażającego życiu – Zgorzel Fourniera",
      text: "Chirurg podczas badania krocza i moszny zwraca szczególną uwagę na powikłanie będące stanem bezpośredniego zagrożenia życia. Czym charakteryzuje się zgorzel Fourniera (Fournier's gangrene) i jak należy postąpić w razie jej rozpoznania?",
      options: [
        "Piorunujące martwicze zapalenie powięzi krocza i narządów płciowych (skóra pergaminowa, pęcherze krwotoczne, trzeszczenie gazu w tkankach podskórnych, ciężki wstrząs septyczny); wymaga natychmiastowej, agresywnej nekrektomii (wycięcia martwicy), szerokospektralnej antybiotykoterapii i.v. i resuscytacji na OIT",
        "Łagodny stan zapalny mieszków włosowych moszny leczony maścią cynkową",
        "Wirusowe zapalenie jąder wywołane przez wirusa świnki (mumps orchitis)",
        "Zakrzepica żyły grzbietowej prącia leczona heparyną drobnocząsteczkową"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Zgorzel Fourniera to martwicze zapalenie powięzi (necrotizing fasciitis) krocza, moszny i okołoodbytnicy o etiologii polimikrobowej (bakterie tlenowe i beztlenowe).</strong> Cechuje się gwałtowną progresją (szerzenie martwicy do 2-3 cm/godzinę wzdłuż powięzi Collesa, Darta i Scarpy), trzeszczeniem podskórnym (obecność gazu bakteryjnego) i śmiertelnością sięgającą 20-40%. Wymaga natychmiastowej ratunkowej nekrektomii na bloku operacyjnym, płynoterapii i skojarzonej antybiotykoterapii (<span class='dose-pill'>Meropenem 1 g co 8 h i.v.</span> + <span class='dose-pill'>Wankomycyna 15-20 mg/kg co 12 h i.v.</span> + <span class='dose-pill'>Klindamycyna 900 mg co 8 h i.v.</span> dla hamowania toksyn).",
        "❌ BŁĄD! <strong>Zgorzel Fourniera to nie powierzchowne zapalenie mieszków, lecz martwica zagrażająca zgonem w ciągu kilkunastu godzin.</strong>",
        "❌ BŁĄD! <strong>Świnkowe zapalenie jąder to izolowane powikłanie wirusowe bez martwicy powięzi krocza.</strong>",
        "❌ BŁĄD! <strong>Choroba Mondora (zakrzepica żyły grzbietowej prącia) nie wiąże się z ropniem i sepsą krocza.</strong>"
      ]
    },
    {
      title: "Krok 6: Diagnostyka przetoki odbytu – Reguła Goodsalla",
      text: "Po kilku tygodniach od nacięcia ropnia u ok. 30-50% pacjentów dochodzi do wykształcenia przewlekłej przetoki odbytu (fistula-in-ano). Jak brzmi klasyczna reguła Goodsalla służąca do przewidywania przebiegu kanału przetoki i lokalizacji jej ujścia wewnętrznego?",
      options: [
        "Przetoki z ujściem zewnętrznym leżącym do tyłu od poprzecznej linii odbytu biegną łukowato do linii pośrodkowej tylnej (na godz. 6); przetoki z ujściem leżącym do przodu od linii poprzecznej biegną promieniście prosto do kanału odbytu",
        "Wszystkie przetoki odbytu biegną wyłącznie po linii prostej do pęcherza moczowego",
        "Przetoki przednie biegną łukowato, a tylne zbiegają się zawsze na godzinie 12",
        "Reguła Goodsalla odnosi się wyłącznie do wrzodów żołądka i dwunastnicy"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Reguła Goodsalla (Goodsall's rule) jest jednym z najczęściej sprawdzanych zagadnień z chirurgii na egzaminie LEK:</strong><br>1. Jeśli ujście zewnętrzne przetoki leży <strong>do tyłu od linii poprzecznej przeprowadzona przez środek odbytu</strong> -> kanał biegnie <strong>łukowato (krzywoliniowo)</strong> i uchodzi w linii pośrodkowej tylnej (krypta na godz. 6).<br>2. Jeśli ujście leży <strong>do przodu od linii poprzecznej</strong> -> kanał biegnie <strong>promieniście (prosto)</strong> do najbliższej krypty na poziomie linii zębatej.<br><em>Wyjątek:</em> Jeśli ujście zewnętrzne leży z przodu, ale w odległości >3 cm od brzegu odbytu, kanał często zakręca i uchodzi również do linii pośrodkowej tylnej.",
        "❌ BŁĄD! <strong>Przetoki odbytu drenują do krypt kanału odbytu na linii zębatej, a nie do pęcherza.</strong>",
        "❌ BŁĄD! <strong>Kierunek jest odwrotny:</strong> tylne biegną łukowato do linii pośrodkowej tylnej (godz. 6), a przednie prosto.",
        "❌ BŁĄD! <strong>Reguła dotyczy wyłącznie przetok okołoodbytniczych.</strong>"
      ]
    },
    {
      title: "Krok 7: Klasyfikacja przetok odbytu według Parksa",
      text: "Złotym standardem klasyfikacji przetok odbytu jest podział według Parksa. W jaki sposób klasyfikuje się przetoki w zależności od ich relacji do aparatu zwieraczowego odbytu?",
      options: [
        "Międzyzwieraczowe (najczęstsze), przezwieraczowe, nadzwieraczowe i pozazwieraczowe",
        "Wczesne, pośrednie, późne i nawrotowe",
        "Ostre, podostre, piorunujące i uśpione",
        "Śluzówkowe, podśluzówkowe, surowicze i otrzewnowe"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Klasyfikacja Parksa (1976) opiera się na przebiegu kanału przetoki względem mięśnia zwieracza wewnętrznego (IAS) i zewnętrznego (EAS):</strong><br>1. <strong>Przetoka międzyzwieraczowa (intersphincteric)</strong> – ok. 70% (najczęstsza): przebiega w przestrzeni między IAS a EAS, przebija tylko IAS.<br>2. <strong>Przetoka przezwieraczowa (transsphincteric)</strong> – ok. 20%: przebija oba zwieracze (IAS i EAS) na różnej wysokości.<br>3. <strong>Przetoka nadzwieraczowa (suprasphincteric)</strong> – ok. 5%: biegnie w górę między zwieraczami, przechodzi ponad zwieraczem zewnętrznym i pętlą łonowo-odbytniczą, zstępując przez dół kulszowo-odbytniczy.<br>4. <strong>Przetoka pozazwieraczowa (extrasphincteric)</strong> – ok. 3%: omija cały aparat zwieraczowy, biegnąc od odbytnicy powyżej dźwigacza bezpośrednio na skórę (często powikłanie ciał obcych, urazów, ch. Crohna).",
        "❌ BŁĄD! <strong>To podział kliniczno-czasowy, a nie anatomiczny Parksa.</strong>",
        "❌ BŁĄD! <strong>Klasyfikacja opiera się na topografii mięśniowej zwieraczy, a nie dynamice zakażenia.</strong>",
        "❌ BŁĄD! <strong>W kanale odbytu nie ma błony surowiczej ani otrzewnej.</strong>"
      ]
    },
    {
      title: "Krok 8: Długofalowe leczenie chirurgiczne przetoki – ochrona kontynencji",
      text: "U pacjenta zdiagnozowano wysoką przetokę przezwieraczową, obejmującą ponad 50% grubości mięśnia zwieracza zewnętrznego. Jaka technika operacyjna jest wskazana, aby wyleczyć przetokę bez ryzyka trwałego nietrzymania stolca (inkontynencji)?",
      options: [
        "Założenie luźnego setonu (seton drainage) lub techniki oszczędzające zwieracze (np. LIFT, płat przesunięty - mucosal advancement flap, kleje/zatyczki tkankowe); bezwzględny zakaz jednoczasowej prostej fistulotomii (przecięcia zwieraczy)!",
        "Jednoczasowe całkowite przecięcie wszystkich mięśni zwieraczy (fistulotomia) bez zabezpieczenia",
        "Natychmiastowe usunięcie całej odbytnicy z wytworzeniem trwałej ileostomii",
        "Stosowanie maści z hydrokortyzonem przez 2 lata w celu 'zarośnięcia kanału'"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Głównym dylematem chirurgii przetok jest balans między radykalnością a zachowaniem trzymania stolca (kontynencji).</strong> W przetokach 'niskich' (międzyzwieraczowych lub obejmujących <30% dolnej części zwieracza zewnętrznego) można bezpiecznie wykonać fistulotomię (rozcięcie kanału przetoki). Natomiast w przetokach 'wysokich' (obejmujących >30-50% EAS) proste rozcięcie zwieracza skutkuje kalectwem w postaci nietrzymania gazów i stolca! Dlatego stosuje się metody dwuetapowe z luźnym setonem drenującym (luźna nitka silikonowa/naczyniowa) lub techniki oszczędzające zwieracze: LIFT (Ligation of Intersphincteric Fistula Tract), płat śluzówkowy z przesunięcia (advancement flap) lub laserowe zamknięcie (FiLaC).",
        "❌ BŁĄD! <strong>Jednoczasowe przecięcie zwieracza zewnętrznego w wysokiej przetoki prowadzi do trwałego nietrzymania stolca u >50% chorych!</strong>",
        "❌ BŁĄD! <strong>Proktokolektomia nie jest leczeniem łagodnej przetoki kryptogennej.</strong>",
        "❌ BŁĄD! <strong>Maści steroidowe nie zamykają nabłonkowatego kanału przetoki.</strong>"
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Zakażenie krypt",
      title: "Zaczopowanie i infekcja gruczołu odbytowego",
      short: "Retencja wydzieliny w krypcie Morgagniego i kolonizacja bakteryjna",
      detail: "Gruczoły Hermanna i Desfosses uchodzą w dnie krypt odbytowych na linii grzebieniastej. Zaczopowanie ujścia (masy kałowe, mikrouraz, obrzęk) prowadzi do namnażania flory jelitowej (E. coli, Bacteroides, Enterococcus).",
      target: "Krypty Morgagniego i gruczoły odbytowe",
      drugTarget: "<span class='dose-pill'>Nacięcie i drenaż</span> odbarczenie jamy ropnia"
    },
    {
      badge: "Ekspansja ropna",
      title: "Szerzenie się ropnia wzdłuż powięzi krocza",
      short: "Przejście procesu ropnego do przestrzeni kulszowo-odbytniczej",
      detail: "Z przestrzeni międzyzwieraczowej ropa penetruje powięzie, docierając do dołu kulszowo-odbytniczego wypełnionego słabo ukrwioną tkanką tłuszczową podatną na lizę enzymatyczną i martwicę.",
      target: "Dół kulszowo-odbytniczy (fossa ischioanalis)",
      drugTarget: "<span class='dose-pill'>Cefazolina 2 g i.v.</span> + <span class='dose-pill'>Metronidazol 500 mg i.v.</span> osłona okołooperacyjna"
    },
    {
      badge: "Martwica powięzi",
      title: "Ryzyko piorunującej zgorzeli krocza (Fournier)",
      short: "Tromboflebitis mikrokrążenia i gazotwórcza martwica tkanki podskórnej",
      detail: "U chorych z cukrzycą lub obniżoną odpornością dochodzi do zakrzepicy naczyń odżywczych i gwałtownego szerzenia beztlenowców z produkcją gazu w tkankach wzdłuż powięzi Collesa i Scarpy.",
      target: "Powięzie powierzchowne krocza i moszny",
      drugTarget: "<span class='dose-pill'>Pilna nekrektomia</span> radykalne wycięcie martwych powięzi na bloku operacyjnym"
    },
    {
      badge: "Epitelializacja kanału",
      title: "Przetrwały kanał przetoki z liningiem nabłonkowym",
      short: "Formowanie przetoki odbytu po samoistnym lub chirurgicznym drenażu",
      detail: "Niewygojone ujście wewnętrzne w krypcie odbytowej stale reinfekuje kanał resztkowy. Dochodzi do wytworzenia przewlekłej ziarniny i nabłonka w kanale przetoki łączącym kryptę ze skórą krocza.",
      target: "Kanał przetoki między kryptą a skórą krocza",
      drugTarget: "<span class='dose-pill'>Luźny seton</span> lub <span class='dose-pill'>zabieg LIFT</span> oszczędzający zwieracze"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Ropień okołoodbytniczy vs Inne ostre stany proktologiczne i krocza",
    headers: ["Cecha kliniczna", "Ropień okołoodbytniczy", "Zakrzepica brzeżna (guzek krwawniczy)", "Szczelina odbytu (fissura ani)", "Torbiele włosowa (Pilonidal sinus abscess)", "Zgorzel Fourniera (Fournier gangrene)"],
    rows: [
      ["Początek i charakterystyka bólu", "Narastający od kilku dni, stały, pulsujący, rwący ból uniemożliwiający siedzenie", "Nagły, ostry ból po parciu na stolec lub wysiłku; ból stały", "Piekący, ostry ból w trakcie i tuż po defekacji ('jak cięcie szkłem')", "Podostry ból w szparze pośladkowej, nasilający się przy siadaniu", "Gwałtowny, rozdzierający ból całego krocza i moszny, szybko przechodzący w hipoestezję z powodu zniszczenia nerwów"],
      ["Obraz kliniczny i lokalizacja", "Czerwone, lśniące, chełboczące uwypuklenie obok odbytu lub w pośladku", "Sinoczerwony, twardy, bolesny guzek na brzegu odbytu (pokryty anodermą)", "Linijne pęknięcie anodermy najczęściej w linii pośrodkowej tylnej (godz. 6)", "Ognisko zapalne w szparze międzypośladkowej nad kością krzyżową z widocznymi otworkami (pity)", "Martwicze, czarne plamy skóry, pęcherze krwotoczne, trzeszczenie podskórne (gaz) szerzące się na podbrzusze"],
      ["Gorączka i objawy ogólne", "Często obecne (38-39°C), dreszcze, leukocytoza z neutrofilią", "Brak gorączki i objawów ogólnych", "Brak gorączki i leukocytozy", "Stany podgorączkowe; rzadko wysoka gorączka", "Ciężki wstrząs septyczny, hipotensja, tachykardia, wysoka gorączka lub hipotermia, skrajna leukocytoza/leukopenia"],
      ["Krwawienie z odbytu", "Możliwa cuchnąca, krwisto-ropna wydzielina przy pęknięciu", "Brak, chyba że dojdzie do owrzodzenia i martwicy skóry nad skrzepliną", "Krople jasnoczerwonej krwi na papierze toaletowym po oddaniu stolca", "Możliwy wyciek ropno-krwisty z ujść torbieli w szparze", "Cuchnący, brudnoszary wysięk ('zmywki mięsne') z martwiczych tkanek powięziowych"],
      ["Leczenie pierwszego rzutu", "Pilne nacięcie i szeroki drenaż na bloku, rana pozostawiona otwarta", "Nacięcie i wyłuszczenie skrzepliny w znieczuleniu miejscowym (do 48-72 h) lub leczenie zachowawcze", "Leczenie zachowawcze (dieta, błonnik, maści rozkurczające zwieracz: diltiazem/nitrogliceryna)", "Nacięcie i drenaż ropnia; w drugim etapie operacja wycięcia przetok (np. metoda Limberga, Bascom)", "Natychmiastowa ratunkowa nekrektomia (wycięcie tkanek do zdrowych granic) + wielolekowa antybiotykoterapia i.v. + OIT"],
      ["Powikłania odległe", "W 30-50% powstanie przewlekłej przetoki odbytu", "Fałd brzeżny (skin tag) po wchłonięciu", "Przejście w postać przewlekłą z fałdem wartowniczym i przerosłą brodawką", "Nawrotowość przy nieusunięciu mieszków włosowych", "Wysoka śmiertelność (20-40%), rozległe ubytki powłok wymagające rekonstrukcji płatami"]
    ]
  },
  dutySummary: {
    overview: "Ropień okołoodbytniczy jest jednym z najczęstszych ostrych stanów proktologicznych w chirurgii ogólnej. Ponad 90% ropni ma etiologię kryptogenną wywodzącą się z zakażenia gruczołów odbytowych w dnie krypt Morgagniego. Nieleczony ropień prowadzi do niszczenia zwieraczy odbytu, powikłań septycznych (ze zgorzelą Fourniera włącznie) oraz tworzenia przetok odbytu.",
    diagnostics: "1. Ocena wzrokowa krocza i palpacja: asymetria, chełboczące bolesne uwypuklenie, wzmożone ucieplenie powłok.<br>2. Ścisła ostrożność: unikanie bolesnego badania per rectum (DRE) i anoskopii bez znieczulenia; pełne badanie (EUA) wykonuje się na sali operacyjnej.<br>3. Badania laboratoryjne: morfologia krwi (leukocytoza z przesunięciem w lewo), CRP, układ krzepnięcia i glikemia.<br>4. Rezonans magnetyczny (MRI) miednicy lub USG endosonograficzne (EAUS) – metody z wyboru w diagnostyce powikłanych ropni (naddźwigaczowych, podkowiastych) oraz do precyzyjnego mapowania przetok.",
    drugsAndDoses: "1. Analgezja systemowa przed i po zabiegu: <span class='dose-pill'>Ketoprofen 100 mg i.v. co 12 h</span> + <span class='dose-pill'>Paracetamol 1000 mg i.v. co 6 h</span>.<br>2. Profilaktyka antybiotykowa okołooperacyjna (zwłaszcza u chorych z cukrzycą, immunosupresją lub cechami bakteriemii):<br>   - <span class='dose-pill'>Cefazolina 2 g i.v.</span> jednorazowo 30 min przed cięciem + <span class='dose-pill'>Metronidazol 500 mg i.v.</span> LUB<br>   - <span class='dose-pill'>Amoksycylina z kwasem klawulanowym 1,2 g i.v. co 8 h</span>.<br>3. W razie podejrzenia zgorzeli Fourniera natychmiastowa terapia trójlekowa:<br>   - <span class='dose-pill'>Meropenem 1 g i.v. co 8 h</span> + <span class='dose-pill'>Wankomycyna 15-20 mg/kg i.v. co 12 h</span> + <span class='dose-pill'>Klindamycyna 900 mg i.v. co 8 h</span>.",
    procedures: "1. Pilne nacięcie i drenaż chirurgiczny jamy ropnia w znieczuleniu na bloku operacyjnym (złoty standard).<br>2. Nacięcie jak najbliżej brzegu odbytu celem skrócenia kanału ewentualnej przyszłej przetoki.<br>3. Szerokie odkrojenie brzegów skóry (unroofing) lub założenie drenu Pezzera/sączka – bezwzględny zakaz zszywania rany!<br>4. Założenie luźnego setonu drenującego w przypadku stwierdzenia wysokiej przetoki w trakcie zabiegu, aby zapobiec nacięciu mięśni zwieraczy i inkontynencji.",
    monitoring: "1. Codzienna zmiana opatrunków, płukanie jamy ropnia solą fizjologiczną i ciepłe nasiadówki po defekacji.<br>2. Kontrola gojenia rany przez ziarninowanie od dna ku powierzchni.<br>3. Monitorowanie stężenia glukozy we krwi (ropnie odbytu bywają pierwszym objawem nierozpoznanej cukrzycy).<br>4. Kontrola proktologiczna po 4-6 tygodniach w celu wczesnego wykrycia przewlekłej przetoki odbytu."
  },
  lekQuestions: [
    {
      question: "Zgodnie z teorią kryptogenną Parksa-Eisenhammera, punktem wyjścia dla większości (>90%) ropni i przetok okołoodbytniczych jest zakażenie:",
      options: [
        "Gruczołów odbytowych uchodzących do krypt Morgagniego na poziomie linii grzebieniastej",
        "Wypadających guzków krwawniczych splotu górnego",
        "Mieszków włosowych skóry pośladka w bruździe międzypośladkowej",
        "Torbieli pęcherzykowo-moczowej w przestrzeni załonowej",
        "Gruczołów opuszkowo-cewkowych Cowpera w dnie miednicy"
      ],
      correct: 0,
      expl: "Teoria kryptogenna wyjaśnia powstawanie ponad 90% ropni i przetok odbytu zakażeniem gruczołów odbytowych (Hermanna i Desfosses), których przewody wyprowadzające uchodzą do dna krypt Morgagniego na wysokości linii grzebieniastej (zębatej). Zaczopowanie przewodu wywołuje proces zapalny penetrujący w głąb tkanek."
    },
    {
      question: "Pacjent z silnym bólem okolicy odbytu, gorączką 38,5°C i chełboczącym, ucieplonym guzem na pośladku prawym zgłasza się do chirurga. Prawidłowym postępowaniem leczniczym jest:",
      options: [
        "Pilne nacięcie i szeroki drenaż ropnia na sali operacyjnej z pozostawieniem rany otwartej do ziarninowania",
        "Zalecenie wyłącznie doustnego leczenia cyprofloksacyną z metronidazolem przez 10 dni",
        "Zastosowanie maści z hydrokortyzonem i nasiadówek z rumianku bez interwencji chirurgicznej",
        "Punkcja aspiracyjna cienkoigłowa w gabinecie zabiegowym z następowym zeszyciem skóry",
        "Wykonanie pilnej sigmoidoskopii sztywnej celem wycięcia krypt odbytowych"
      ],
      correct: 0,
      expl: "Jedynym skutecznym i bezwzględnie wymaganym leczeniem ostrego ropnia odbytu jest pilne chirurgiczne nacięcie i ewakuacja treści ropnej z szerokim drenażem. Pozostawienie rany otwartej zapobiega przedwczesnemu zamknięciu powłok i nawrotowi ropnia. Sama antybiotykoterapia bez drenażu jest błędem sztuki."
    },
    {
      question: "Zgodnie z regułą Goodsalla, przetoka odbytu z ujściem zewnętrznym zlokalizowanym do tyłu od poprzecznej linii odbytu:",
      options: [
        "Biegnie łukowato (krzywoliniowo) do linii pośrodkowej tylnej kanału odbytu (krypta na godz. 6)",
        "Biegnie prosto i promieniście do najbliższej krypty na ścianie bocznej",
        "Biegnie bezpośrednio do przedniej ściany kanału odbytu na godz. 12",
        "Nigdy nie ma ujścia wewnętrznego w kanale odbytu",
        "Omija mięśnie zwieracze i uchodzi do pęcherza moczowego"
      ],
      correct: 0,
      expl: "Reguła Goodsalla mówi, że ujścia zewnętrzne przetok leżące do tyłu od poprzecznej linii odbytu mają kanał biegnący łukowato do linii pośrodkowej tylnej (godzina 6). Przetoki z ujściem zewnętrznym leżącym z przodu biegną promieniście, po linii prostej do odpowiadającej krypty odbytowej."
    },
    {
      question: "W klasyfikacji przetok odbytu według Parksa, przetoka przebiegająca w przestrzeni między mięśniem zwieraczem wewnętrznym a zewnętrznym i nieobejmująca zwieracza zewnętrznego to:",
      options: [
        "Przetoka międzyzwieraczowa (intersphincteric)",
        "Przetoka przezwieraczowa (transsphincteric)",
        "Przetoka nadzwieraczowa (suprasphincteric)",
        "Przetoka pozazwieraczowa (extrasphincteric)",
        "Przetoka podkowiasta (horseshoe fistula)"
      ],
      correct: 0,
      expl: "Przetoka międzyzwieraczowa (intersphincteric) jest najczęstszą postacią (ok. 70%). Jej kanał przebiega w rowku między mięśniem zwieraczem wewnętrznym i zewnętrznym, przebijając wyłącznie zwieracz wewnętrzny, dzięki czemu jej rozcięcie (fistulotomia) niesie minimalne ryzyko inkontynencji."
    },
    {
      question: "W leczeniu wysokiej przetoki przezwieraczowej (obejmującej ponad 30-50% grubości zwieracza zewnętrznego odbytu), wykonanie jednoczasowej prostej fistulotomii (przecięcia tkanek nad kanałem) grozi przede wszystkim:",
      options: [
        "Trwałym nietrzymaniem gazów i stolca (inkontynencją kałową)",
        "Zgorzelą Fourniera powrózka nasiennego",
        "Rozwojem raka gruczołowego w kanale przetoki",
        "Niedrożnością mechaniczną jelita cienkiego",
        "Ostrą niewydolnością nerek z martwicą cewek"
      ],
      correct: 0,
      expl: "Przecięcie ponad 30-50% aparatu zwieraczowego (zwłaszcza zwieracza zewnętrznego i pętli łonowo-odbytniczej) w trakcie fistulotomii skutkuje jatrogennym zniszczeniem kontynencji i trwałym nietrzymaniem stolca. Z tego powodu w przetokach wysokich stosuje się techniki oszczędzające mięśnie lub etapowe z setonem."
    },
    {
      question: "Zgorzel Fourniera (Fournier's gangrene) to powikłanie infekcji krocza charakteryzujące się:",
      options: [
        "Piorunującym martwiczym zapaleniem powięzi krocza, moszny i okołoodbytnicy z obecnością gazu w tkankach i sepsą",
        "Przewlekłym zapaleniem ziarniniakowym skóry sromu wywołanym przez prątki gruźlicy",
        "Łagodnym ropnym zapaleniem gruczołów potowych apokrynowych w pachwinach",
        "Wrodzoną przetoką pęcherzowo-odbytniczą u noworodków płci męskiej",
        "Jałową martwicą aseptyczną guzów kulszowych u sportowców"
      ],
      correct: 0,
      expl: "Zgorzel Fourniera to postać martwiczego zapalenia powięzi (necrotizing fasciitis) krocza i narządów płciowych o etiologii wielobakteryjnej (tlenowce + beztlenowce). Objawia się trzeszczeniem podskórnym (gaz), martwicą powięzi, ciężką toksemią i wysoką śmiertelnością."
    },
    {
      question: "Wskaż badanie obrazowe z wyboru o najwyższej czułości i swoistości w przedoperacyjnym mapowaniu skomplikowanych i nawrotowych przetok odbytu:",
      options: [
        "Rezonans magnetyczny (MRI) miednicy mniejszej z protokołem przetokowym",
        "Przeglądowe zdjęcie rentgenowskie miednicy na stojąco",
        "Scyntygrafia kości z użyciem technetu-99m",
        "Wlew doodbytniczy z papki barytowej pod kontrolą fluoroskopii",
        "Angiografia tętnic biodrowych wewnętrznych metodą Seldingera"
      ],
      correct: 0,
      expl: "Rezonans magnetyczny (MRI) miednicy z dedykowanym protokołem przetokowym jest złotym standardem oceny topografii przetok odbytu i ich stosunku do aparatu zwieraczowego oraz mięśnia dźwigacza odbytu. Wysoką wartość ma także przezodbytnicza ultrasonografia (EAUS)."
    },
    {
      question: "Jakie nacięcie skóry należy wykonać podczas chirurgicznego drenażu ropnia okołoodbytniczego?",
      options: [
        "Nacięcie możliwie blisko brzegu odbytu nad wyczuwalnym chełbotaniem",
        "Długie cięcie podłużne na bocznym obwodzie uda",
        "Cięcie pośrodkowe dolne w podbrzuszu",
        "Nacięcie w odległości minimum 10 cm od brzegu odbytu w celu ochrony skóry krocza",
        "Nacięcie okrężne obejmujące cały obwód zwieraczy odbytu"
      ],
      correct: 0,
      expl: "Nacięcie ropnia okołoodbytniczego należy prowadzić możliwie blisko brzegu odbytu. Pozwala to na skrócenie ewentualnego przyszłego kanału przetoki i ułatwia jej definitywne zaopatrzenie, minimalizując ryzyko uszkodzenia zdrowych tkanek pośladka."
    },
    {
      question: "Do czynników predysponujących do rozwoju ropni i przetok odbytu oraz ich atypowego przebiegu zalicza się:",
      options: [
        "Chorobę Leśniowskiego-Crohna, cukrzycę, zakażenie HIV oraz immunosupresję",
        "Chorobę wrzodową żołądka z infekcją Helicobacter pylori",
        "Niedomykalność zastawki mitralnej i zespół Barlowa",
        "Kamica pęcherzyka żółciowego i hipercholesterolemię rodzinną",
        "Niedoczynność tarczycy w przebiegu wola Hashimoto"
      ],
      correct: 0,
      expl: "Choroba Leśniowskiego-Crohna jest klasyczną przyczyną przetok odbytu (często mnogich, złożonych i opornych na leczenie). Cukrzyca i immunosupresja zwiększają ryzyko zakażeń beztlenowych i rozwoju zgorzeli Fourniera."
    },
    {
      question: "Metoda LIFT (Ligation of Intersphincteric Fistula Tract) stosowana w chirurgii przetok odbytu polega na:",
      options: [
        "Podwiązaniu i przecięciu kanału przetoki w przestrzeni międzyzwieraczowej z zachowaniem ciągłości zwieracza zewnętrznego",
        "Całkowitym wycięciu mięśnia zwieracza zewnętrznego odbytu",
        "Zespoleniu kanału przetoki z pęcherzem moczowym",
        "Wprowadzeniu protezy metalowej do odbytnicy na okres 6 miesięcy",
        "Wypaleniu kanału przetoki kwasem trichlorooctowym w znieczuleniu miejscowym"
      ],
      correct: 0,
      expl: "Technika LIFT (Ligation of Intersphincteric Fistula Tract) jest nowoczesną procedurą oszczędzającą zwieracze. Chirurg preparuje przestrzeń międzyzwieraczową, odnajduje kanał przetoki, podwiązuje go i przecina, pozostawiając zwieracz zewnętrzny nienaruszony, co chroni chorego przed nietrzymaniem stolca."
    },
    {
      question: "Zastosowanie luźnego setonu (luźnej nitki naczyniowej lub drenu gumowego) w kanale wysokiej przetoki odbytu ma na celu:",
      options: [
        "Zapewnienie stałego drenażu ropy i zapobieganie zamykaniu się ujścia zewnętrznego oraz formowaniu nawrotowych ropni bez uszkadzania zwieraczy",
        "Natychmiastowe mechaniczne przecięcie zwieracza zewnętrznego w ciągu 24 godzin",
        "Zniszczenie flory bakteryjnej za pomocą jonów miedzi zawartych w nici",
        "Wywołanie sztucznego wstrząsu anafilaktycznego celem stymulacji odporności",
        "Zatrzymanie oddawania gazów przez kanał odbytu"
      ],
      feedback: "",
      correct: 0,
      expl: "Luźny seton drenujący (loose seton) zabezpiecza stały odpływ wydzieliny z przetoki, wygaszając stan zapalny i zapobiegając tworzeniu się bolesnych ropni nawrotowych. Nie przecina on mięśni zwieraczy, pozwalając na bezpieczne zaplanowanie procedury oszczędzającej kontynencję w drugim etapie."
    }
  ],
  flashcards: [
    {
      front: "Jaki jest najczęstszy punkt wyjścia i patomechanizm ropnia okołoodbytniczego?",
      back: "Teoria kryptogenna: zakażenie gruczołów odbytowych (Hermanna i Desfosses) uchodzących w kryptach Morgagniego na linii zębatej (grzebieniastej) w kanale odbytu (>90% przypadków)."
    },
    {
      front: "Jakie jest podstawowe i bezwzględne postępowanie w ostrym ropniu odbytu?",
      back: "Pilne chirurgiczne nacięcie i szeroki drenaż na bloku operacyjnym, z pozostawieniem rany otwartej do ziarninowania (bezwzględny zakaz zszywania!). Sama antybiotykoterapia bez drenażu jest błędem."
    },
    {
      front: "Jak brzmi reguła Goodsalla w określaniu przebiegu przetoki odbytu?",
      back: "Ujścia zewnętrzne leżące Z TYŁU od poprzecznej linii odbytu biegną ŁUKOWATO do linii pośrodkowej tylnej (godz. 6). Ujścia leżące Z PRZODU biegną PROMIENIŚCIE (prosto) do najbliższej krypty."
    },
    {
      front: "Jakie są 4 typy przetok odbytu w klasyfikacji Parksa?",
      back: "1. Międzyzwieraczowa (najczęstsza ~70%),\n2. Przezwieraczowa (~20%),\n3. Nadzwieraczowa (~5%),\n4. Pozazwieraczowa (~3%)."
    },
    {
      front: "Czym jest zgorzel Fourniera i jak należy postąpić?",
      back: "Martwicze zapalenie powięzi krocza i moszny o etiologii wielobakteryjnej z obecnością gazu (trzeszczenie) i sepsą. Wymaga natychmiastowej ratunkowej nekrektomii (wycięcia martwicy), płynoterapii i antybiotyków i.v. (meropenem + wankomycyna + klindamycyna)."
    },
    {
      front: "Dlaczego w wysokiej przetoce przezwieraczowej nie wolno wykonać prostej fistulotomii?",
      back: "Przecięcie >30-50% mięśnia zwieracza zewnętrznego prowadzi do jatrogennego i trwałego nietrzymania stolca (inkontynencji kałowej). Stosuje się techniki oszczędzające (LIFT, advancement flap, luźny seton)."
    }
  ]
};

async function run() {
  console.log("Generating Case 136: Ropień i przetoka odbytu...");
  
  // Mirroring
  case136.steps.forEach(s => {
    s.question = s.title;
    s.explanation = s.feedback ? s.feedback[0] : "";
  });
  
  case136.lekQuestions.forEach(q => {
    q.opts = q.options;
    q.correctIdx = q.correct;
    q.exp = q.expl;
  });
  
  const enc = await encryptStringAes(JSON.stringify(case136, null, 2), MASTER_KEY);
  fs.writeFileSync(path.join('cases', '136_ropien_i_przetoka_odbytu.json'), JSON.stringify(enc, null, 2), 'utf8');
  console.log("[SAVED] Case #136: 136_ropien_i_przetoka_odbytu.json (LEK Qs: " + case136.lekQuestions.length + ", Steps: " + case136.steps.length + ", Flashcards: " + case136.flashcards.length + ")");
}

run();

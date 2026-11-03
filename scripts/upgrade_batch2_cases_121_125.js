const fs = require('fs');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const PASSWORD = '@LEKSzymon28111999';

async function upgradeCase(fname, updater) {
  const enc = JSON.parse(fs.readFileSync('cases/' + fname, 'utf8'));
  const c = await decryptObjectAes(enc, PASSWORD);
  updater(c);
  if (!c.vitalsObj) {
    c.vitalsObj = { hr: 110, bp: "100/60", spo2: 98, rr: 22, temp: 37.5, gcs: 15 };
  }
  const reEnc = await encryptStringAes(JSON.stringify(c, null, 2), PASSWORD);
  fs.writeFileSync('cases/' + fname, JSON.stringify(reEnc, null, 2), 'utf8');
  console.log(`Upgraded clinical storytelling: ${fname}`);
}

async function run() {
  console.log("Starting deep clinical upgrade for cases 121-125...");

  // ==========================================
  // CASE 121: Wrodzona niedoczynność tarczycy (CHT)
  // ==========================================
  await upgradeCase('121_wrodzona_niedoczynnosc_tarczycy.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena – 3-tygodniowy noworodek wezwany z powodu wyniku testu przesiewowego",
        desc: "Do Twojej poradni endokrynologii dziecięcej trafiają rodzice z 3-tygodniowym noworodkiem po otrzymaniu pilnego wezwania z Centralnego Ośrodka Badań Przesiewowych (stężenie TSH w teście z bibuły >80 mIU/l). Matka zgłasza, że dziecko jest 'wyjątkowo spokojne, prawie w ogóle nie płacze, ciągle śpi i trzeba je budzić na karmienie'. W badaniu fizykalnym: noworodek ma przedłużoną żółtaczkę powłok skórnych, skórę chłodną, suchą, marmurkowatą, duży, obrzęknięty język wystający z jamy ustnej (makroglosja), szerokie ciemiączko przednie i otwarte ciemiączko tylne (>0.5 cm), dużą przepuklinę pępkową, obniżone napięcie mięśniowe (hipotonia) oraz cichy, ochrypły płacz. Wypróżnienia co 3–4 dni (uporczywe zaparcia). Jaka jest Twoja natychmiastowa diagnoza kliniczna?",
        scenario: "Do Twojej poradni endokrynologii dziecięcej trafiają rodzice z 3-tygodniowym noworodkiem po otrzymaniu pilnego wezwania z Centralnego Ośrodka Badań Przesiewowych (stężenie TSH w teście z bibuły >80 mIU/l). Matka zgłasza, że dziecko jest 'wyjątkowo spokojne, prawie w ogóle nie płacze, ciągle śpi i trzeba je budzić na karmienie'. W badaniu fizykalnym: noworodek ma przedłużoną żółtaczkę powłok skórnych, skórę chłodną, suchą, marmurkowatą, duży, obrzęknięty język wystający z jamy ustnej (makroglosja), szerokie ciemiączko przednie i otwarte ciemiączko tylne (>0.5 cm), dużą przepuklinę pępkową, obniżone napięcie mięśniowe (hipotonia) oraz cichy, ochrypły płacz. Wypróżnienia co 3–4 dni (uporczywe zaparcia). Jaka jest Twoja natychmiastowa diagnoza kliniczna?",
        options: [
          {
            text: "Rozpoznajesz wrodzoną niedoczynność tarczycy (Congenital Hypothyroidism - CHT / dawniej kretynizm tarczycowy); pełnoobjawowy obraz kliniczny ciężkiej wrodzonej hipotyreozy z przedłużoną żółtaczką, makroglosją, hipotonią, zaparciami i przepukliną pępkową wymagający natychmiastowego potwierdzenia i leczenia.",
            correct: true,
            feedback: "Znakomicie! Klasyczny, pełnoobjawowy obraz wrodzonej niedoczynności tarczycy (CHT): w pierwszych dniach życia objawy są często subtelne dzięki przechodzeniu matczynych hormonów tarczycy przez łożysko. W 2.–3. tygodniu życia ujawnia się pełny zespół: ospałość, trudności w karmieniu, przedłużona żółtaczka fizjologiczna (>14 dni), makroglosja (duży język), szerokie ciemiączka (w tym otwarte ciemiączko tylne), chrypka, sucha skóra, hipotonia i przepuklina pępkowa."
          },
          {
            text: "Rozpoznajesz zespół Downa i odsyłasz dziecko bez badań hormonalnych.",
            correct: false,
            feedback: "Kardynalny błąd! Choć dzieci z trisomią 21 mają wyższe ryzyko CHT, zaniechanie badania tarczycy przy TSH >80 mIU/l grozi nieodwracalnym uszkodzeniem mózgu."
          },
          {
            text: "Uznajesz, że dziecko jest po prostu grzeczne, a żółtaczka wynika z karmienia piersią i nie wymaga uwagi.",
            correct: false,
            feedback: "Błąd zaniechania: ignorowanie objawów hipotyreozy prowadzi do ciężkiego kalectwa intelektualnego."
          },
          {
            text: "Podejrzewasz wrodzoną atrezję dróg żółciowych i kierujesz na pilną operację Kasai.",
            correct: false,
            feedback: "W atrezji żółciowej żółtaczka ma charakter cholestatyczny (odbarwione stolce, ciemny mocz, wysoka bilirubina sprzężona)."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Badanie przesiewowe noworodków w Polsce (NBS) – Zasady oznaczania TSH",
        desc: "Pielęgniarka pyta, dlaczego w badaniach przesiewowych w Polsce krew z piętki na bibułę pobiera się dopiero w 3.–4. dobie życia i dlaczego oznacza się TSH, a nie wolne hormony. Jakie są zasady programu przesiewowego CHT?",
        scenario: "Pielęgniarka pyta, dlaczego w badaniach przesiewowych w Polsce krew z piętki na bibułę pobiera się dopiero w 3.–4. dobie życia i dlaczego oznacza się TSH, a nie wolne hormony. Jakie są zasady programu przesiewowego CHT?",
        options: [
          {
            text: "Krew pobiera się w 3.–4. dobie życia (po 48. godzinie życia), ponieważ w 1. dobie występuje fizjologiczny, poporodowy wyrzut TSH (neonatal TSH surge), który dawałby wyniki fałszywie dodatnie; oznacza się TSH, ponieważ pierwotna wrodzona niedoczynność tarczycy odpowiada za >95% przypadków CHT.",
            correct: true,
            feedback: "Doskonale! Pewniak egzaminacyjny LEK: 1) Czas pobrania: bezpośrednio po urodzeniu (w 1. dobie) dochodzi do fizjologicznego wyrzutu TSH indukowanego ochłodzeniem środowiska zewnętrznego (stężenie TSH może sięgać 60-80 mIU/l). Dopiero po 48h stężenie TSH opada do wartości ustabilizowanych. 2) Oznaczenie TSH z bibuły jest wybitnie czułym testem w wykrywaniu pierwotnej hipotyreozy (dysgenezji i dyshormonogenezy), stanowiącej >95% wszystkich postaci wrodzonej niedoczynności tarczycy."
          },
          {
            text: "Krew pobiera się natychmiast z pępowiny w 1. sekundzie po urodzeniu.",
            correct: false,
            feedback: "Błąd: krew pępowinowa ma wysoki odsetek zanieczyszczeń krwią matczyną i fałszywe wartości TSH."
          },
          {
            text: "Przesiew opiera się wyłącznie na badaniu USG szyi u każdego noworodka.",
            correct: false,
            feedback: "Przesiew ultrasonograficzny jest niewykonalny populacyjnie i niemiarodajny czynnościowo."
          },
          {
            text: "W Polsce nie wykonuje się badań przesiewowych tarczycy u noworodków.",
            correct: false,
            feedback: "Przesiew w kierunku CHT w Polsce działa od 1994 roku i obejmuje 100% noworodków."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Badania weryfikacyjne w surowicy CITO",
        desc: "Pobierasz krew żylną na badanie weryfikacyjne hormonów tarczycy CITO. Wyniki: TSH: 112 mIU/l (norma 0.5–6.0 mIU/l), wolna tyroksyna (fT4): 3.2 pmol/l (skrajnie niska, norma 12–22 pmol/l), fT3: 1.8 pmol/l. Jak interpretujesz ten profil hormonalny?",
        scenario: "Pobierasz krew żylną na badanie weryfikacyjne hormonów tarczycy CITO. Wyniki: TSH: 112 mIU/l (norma 0.5–6.0 mIU/l), wolna tyroksyna (fT4): 3.2 pmol/l (skrajnie niska, norma 12–22 pmol/l), fT3: 1.8 pmol/l. Jak interpretujesz ten profil hormonalny?",
        options: [
          {
            text: "Skrajnie wysokie TSH (>100 mIU/l) przy nieoznaczalnie niskim fT4 w 100% potwierdza ciężką pierwotną wrodzoną niedoczynność tarczycy (Primary Congenital Hypothyroidism).",
            correct: true,
            feedback: "Znakomicie! Wynik TSH >100 mIU/l przy skrajnym obniżeniu fT4 to klasyczna, głęboka pierwotna niewydolność tarczycy. Brak ujemnego sprzężenia zwrotnego na poziomie przysadki powoduje masowe wydzielanie TSH. Potwierdza to konieczność natychmiastowego wdrożenia leczenia substytucyjnego bez ani jednej godziny zwłoki!"
          },
          {
            text: "Jest to wtórna (przysadkowa) niedoczynność tarczycy.",
            correct: false,
            feedback: "We wtórnej niedoczynności TSH byłoby niskie lub nieoznaczalne, a nie >100 mIU/l."
          },
          {
            text: "Profil świadczy o nadczynności tarczycy (chorobie Gravesa-Basedowa).",
            correct: false,
            feedback: "W nadczynności tarczycy fT4 jest podwyższone, a TSH zablokowane (<0.01 mIU/l)."
          },
          {
            text: "Jest to zespół oporności na hormony tarczycy (zespół Refetoffa).",
            correct: false,
            feedback: "W zespole oporności fT4 jest wysokie przy podwyższonym/prawidłowym TSH."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Etiologia wrodzonej niedoczynności tarczycy – Dysgenezja vs Dyshormonogeneza",
        desc: "Jaka jest najczęstsza przyczyna pierwotnej wrodzonej niedoczynności tarczycy u noworodków odpowiadająca za ok. 80–85% przypadków?",
        scenario: "Jaka jest najczęstsza przyczyna pierwotnej wrodzonej niedoczynności tarczycy u noworodków odpowiadająca za ok. 80–85% przypadków?",
        options: [
          {
            text: "DYSGENEZJA TARCZYCY (wady rozwojowe narządu: agenezja/atireoza, hipoplazja lub najczęściej ektopia tarczycy – np. tarczyca językowa); odpowiada za 80–85% przypadków CHT.",
            correct: true,
            feedback: "Doskonale! Złoty fakt egzaminacyjny LEK: Najczęstszą przyczyną CHT jest dysgenezja tarczycy (80–85%), z czego najczęstszą pojedynczą anomalią jest EKTOPIA tarczycy (zatrzymanie migracji tkanki tarczycowej na drodze przewodu tarczowo-językowego, najczęściej u nasady języka – tarczyca językowa / lingual thyroid) lub całkowity brak tarczycy (agenezja/atireoza). Dyshormonogeneza (wrodzone wady syntezy hormonów dziedziczone autosomalnie recesywnie, często z wolem) odpowiada za pozostałe 10–15% przypadków."
          },
          {
            text: "Niedobór jodu w diecie matki w Polsce.",
            correct: false,
            feedback: "W Polsce obowiązuje powszechne jodowanie soli kuchennej, endemia wolowa nie jest przyczyną 85% CHT."
          },
          {
            text: "Choroba Hashimoto z obecnością przeciwciał anty-TPO u noworodka.",
            correct: false,
            feedback: "Hashimoto to choroba nabyta wieku szkolnego i dorosłych."
          },
          {
            text: "Zapalenie tarczycy de Quervaina.",
            correct: false,
            feedback: "Podostre zapalenie tarczycy występuje u dorosłych po infekcjach wirusowych."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Diagnostyka obrazowa – USG szyi i scyntygrafia tarczycy",
        desc: "W celu ustalenia podłoża anatomicznego zlecasz badanie ultrasonograficzne szyi. Radiolog stwierdza całkowity brak tkanki tarczycowej w typowym anatomicznym położeniu w loży tarczycy. Jakie badanie izotopowe pozwala odróżnić całkowitą agenezję od ektopii tarczycy (np. tarczycy podjęzykowej)?",
        scenario: "W celu ustalenia podłoża anatomicznego zlecasz badanie ultrasonograficzne szyi. Radiolog stwierdza całkowity brak tkanki tarczycowej w typowym anatomicznym położeniu w loży tarczycy. Jakie badanie izotopowe pozwala odróżnić całkowitą agenezję od ektopii tarczycy (np. tarczycy podjęzykowej)?",
        options: [
          {
            text: "Scyntygrafia tarczycy z użyciem technetu-99m (99mTc) lub jodu-123 (123I); pozwala na uwidocznienie ektopowej tkanki tarczycowej (np. u nasady języka, wzdłuż szyi) wykazującej jodochwytność.",
            correct: true,
            feedback: "Prawidłowo! Scyntygrafia (99mTc-pertechnetan lub 123I) jest złotym standardem lokalizacji ektopowej tkanki tarczycowej. W USG loży tarczycy brak narządu sugeruje agenezję, jednak w scyntygrafii u ponad połowy tych dzieci wykrywa się resztkową ektopową tkankę tarczycową u nasady języka lub w śródpiersiu. Ważne: wykonanie scyntygrafii nie może opóźnić rozpoczęcia leczenia lewotyroksyną!"
          },
          {
            text: "Połyk papki barytowej z prześwietleniem RTG żołądka.",
            correct: false,
            feedback: "Baryt nie diagnozuje tarczycy."
          },
          {
            text: "Angiografia tętnic nerkowych.",
            correct: false,
            feedback: "Brak związku."
          },
          {
            text: "Biopsja cienkoigłowa móżdżku.",
            correct: false,
            feedback: "Absurdalna i niebezpieczna procedura."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Kluczowe 'okno czasowe' leczenia – Zapobieganie kretynizmowi",
        desc: "Dlaczego wrodzona niedoczynność tarczycy jest stanem nagłym w pediatrii i w jakim DOKŁADNIE czasie od urodzenia należy bezwzględnie włączyć L-tyroksynę, aby dziecko miało szansę na prawidłowy rozwój intelektualny?",
        scenario: "Dlaczego wrodzona niedoczynność tarczycy jest stanem nagłym w pediatrii i w jakim DOKŁADNIE czasie od urodzenia należy bezwzględnie włączyć L-tyroksynę, aby dziecko miało szansę na prawidłowy rozwój intelektualny?",
        options: [
          {
            text: "Leczenie L-tyroksyną MUSI zostać rozpoczęte w ciągu pierwszych 2 TYGODNI ŻYCIA (optymalnie do 14. doby życia); hormony tarczycy są bezwzględnie konieczne do mielinizacji włókien nerwowych i neurogenezy OUN; opóźnienie leczenia powyżej 2–4 tygodni prowadzi do nieodwracalnego uszkodzenia mózgu i głębokiego niedorozwoju umysłowego (kretynizmu)!",
            correct: true,
            feedback: "Wybitnie! To najważniejszy fakt z zakresu neonatologii i endokrynologii dziecięcej na LEK: mózg noworodka rozwija się w pierwszych miesiącach życia w tempie krytycznym. Tyroksyna jest niezbędna do mielinizacji aksonów, powstawania synaps i migracji neuronów kory mózgowej. Rozpoczęcie substytucji w ciągu pierwszych 14 dni życia gwarantuje prawidłowy iloraz inteligencji (IQ >100) u ponad 90% dzieci! Każdy tydzień zwłoki obniża IQ dziecka o kilka-kilkanaście punktów i prowadzi do nieodwracalnego kretynizmu (z niepełnosprawnością intelektualną, głuchotą i karłowatością)."
          },
          {
            text: "Leczenie można bezpiecznie rozpocząć w 18. roku życia.",
            correct: false,
            feedback: "Kardynalny błąd: mózg w wieku 18 lat jest już w pełni rozwinięty, nieodwracalny kretynizm utrwali się w niemowlęctwie."
          },
          {
            text: "Włączenie leczenia do 10. roku życia daje w 100% prawidłowy rozwój intelektualny.",
            correct: false,
            feedback: "Fałsz: opóźnienie o kilka miesięcy powoduje nieodwracalny niedorozwój umysłowy."
          },
          {
            text: "Hormony tarczycy nie mają żadnego wpływu na mózg.",
            correct: false,
            feedback: "Brak hormonów tarczycy u noworodka powoduje najcięższe wrodzone upośledzenie rozwoju OUN."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Zasady dawkowania i podawania Lewotyroksyny (L-T4) u noworodka",
        desc: "Jaka jest zalecana dawka początkowa lewotyroksyny (L-T4) u noworodka z ciężką CHT wg wytycznych ESPE (European Society for Paediatric Endocrinology) i jakie są zasady jej podawania?",
        scenario: "Jaka jest zalecana dawka początkowa lewotyroksyny (L-T4) u noworodka z ciężką CHT wg wytycznych ESPE (European Society for Paediatric Endocrinology) i jakie są zasady jej podawania?",
        options: [
          {
            text: "Wysoka dawka początkowa: 10–15 μg/kg mc./dobę doustnie w pojedynczej dawce porannej; tabletkę należy rozgnieść na łyżeczce i podać z kilkoma kroplami mleka matki lub wody na czczo; nie mieszać z mieszankami sojowymi, preparatami żelaza ani wapnia (które hamują wchłanianie T4).",
            correct: true,
            feedback: "Znakomicie! Wytyczne ESPE/AAP: U noworodków z CHT dawka początkowa jest znacznie wyższa niż u dorosłych (wynosi 10–15 μg/kg mc./dobę), aby jak najszybciej (w ciągu 3–5 dni) znormalizować stężenie fT4 w surowicy i nasycić receptory w mózgu. Lek podaje się rano, rozgnieciony na łyżeczce. Preparaty soi, żelazo i wapń drastycznie upośledzają wchłanianie tyroksyny w jelicie i nie mogą być podawane równocześnie!"
          },
          {
            text: "Dawka 0.1 μg/kg mc. raz na miesiąc.",
            correct: false,
            feedback: "Dawka 100-krotnie za mała, nie wyrówna niedoboru."
          },
          {
            text: "Podawanie L-tyroksyny wyłącznie we wlewie doodbytniczym z olejem rycynowym.",
            correct: false,
            feedback: "Niedorzeczne i nieskuteczne."
          },
          {
            text: "Zalecenie podawania syntetycznego TSH zamiast tyroksyny.",
            correct: false,
            feedback: "Pacjent ma TSH >100 mIU/l, brakuje mu hormonów obwodowych (fT4)."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Cele terapeutyczne, monitorowanie i rokowanie",
        desc: "Jakie są docelowe wartości stężeń fT4 i TSH w trakcie monitorowania leczenia CHT w pierwszym roku życia i jak często kontroluje się parametry hormonalne?",
        scenario: "Jakie są docelowe wartości stężeń fT4 i TSH w trakcie monitorowania leczenia CHT w pierwszym roku życia i jak często kontroluje się parametry hormonalne?",
        options: [
          {
            text: "Docelowe stężenie fT4 powinno znajdować się w GÓRNEJ POŁOWIE normy dla wieku, a TSH w przedziale referencyjnym (optymalnie 0.5–2.0 mIU/l); kontrola TSH i fT4 co 2–4 tygodnie po rozpoczęciu leczenia, następnie co 1–2 miesiące w pierwszym półroczu życia; przy wczesnym leczeniu rokowanie intelektualne i somatyczne jest DOSKONAŁE.",
            correct: true,
            feedback: "Wybitnie! Cele leczenia CHT wg ESPE: U niemowląt priorytetem jest ochrona mózgu – stężenie fT4 powinno być utrzymywane w górnej połowie normy laboratoryjnej. Z uwagi na gwałtowny przyrost masy ciała i dojrzewanie metaboliczne niemowlęcia dawka leku wymaga częstych modyfikacji (kontrole co 2-4 tyg. na początku, potem co 1-2 miesiące). Dzieci z wcześnie rozpoznaną i prawidłowo leczoną CHT rozwijają się całkowicie prawidłowo, osiągając normalny wzrost i pełny potencjał intelektualny!"
          },
          {
            text: "Celem jest całkowite zablokowanie fT4 poniżej normy laboratoryjnej.",
            correct: false,
            feedback: "Utrzymywanie niskiego fT4 spowoduje uszkodzenie mózgu."
          },
          {
            text: "Badania kontrolne wykonuje się tylko raz na 10 lat.",
            correct: false,
            feedback: "Niemowlę wymaga comiesięcznych modyfikacji dawki przeliczanej na masę ciała."
          },
          {
            text: "L-tyroksynę należy bezwzględnie odstawić po ukończeniu 6. miesiąca życia.",
            correct: false,
            feedback: "Wrodzona dysgenezja tarczycy jest wadą trwałą, substytucja trwa do końca życia."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 122: Ostra białaczka limfoblastyczna (ALL)
  // ==========================================
  await upgradeCase('122_ostra_bialaczka_limfoblastyczna_all.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena w gabinecie pediatrycznym – 4-latek z bólami nóg, bladością i wybroczynami",
        desc: "Do Twojego gabinetu pediatrycznego matka przyprowadza 4-letniego chłopca. Od 3–4 tygodni dziecko jest blade, apatyczne, szybko się męczy, ma nawracające stany podgorączkowe do 38.2°C (leczone dwukrotnie antybiotykami z powodu 'infekcji gardła' bez trwałej poprawy). Od tygodnia chłopiec odmawia chodzenia, płacze przy dotykaniu podudzi i kolan, skarży się na silne bóle kości nóg (wybudzające w nocy). Wczoraj po powrocie z przedszkola matka zauważyła na podudziach i tułowiu drobne ciemnoczerwone kropeczki (wybroczyny) oraz samoistne siniaki. W badaniu: HR 135/min, bladość powłok i śluzówek, liczne wybroczyny (petechiae) i podbiegnięcia krwawe, powiększone, twarde, niebolesne węzły chłonne szyjne i pachwinowe tworzące pakiety. Jaka jest Twoja natychmiastowa hipoteza diagnostyczna?",
        scenario: "Do Twojego gabinetu pediatrycznego matka przyprowadza 4-letniego chłopca. Od 3–4 tygodni dziecko jest blade, apatyczne, szybko się męczy, ma nawracające stany podgorączkowe do 38.2°C (leczone dwukrotnie antybiotykami z powodu 'infekcji gardła' bez trwałej poprawy). Od tygodnia chłopiec odmawia chodzenia, płacze przy dotykaniu podudzi i kolan, skarży się na silne bóle kości nóg (wybudzające w nocy). Wczoraj po powrocie z przedszkola matka zauważyła na podudziach i tułowiu drobne ciemnoczerwone kropeczki (wybroczyny) oraz samoistne siniaki. W badaniu: HR 135/min, bladość powłok i śluzówek, liczne wybroczyny (petechiae) i podbiegnięcia krwawe, powiększone, twarde, niebolesne węzły chłonne szyjne i pachwinowe tworzące pakiety. Jaka jest Twoja natychmiastowa hipoteza diagnostyczna?",
        options: [
          {
            text: "Podejrzewasz chorobę rozrostową układu krwiotwórczego – ostrą białaczkę limfoblastyczną (ALL - najczęstszy nowotwór wieku dziecięcego); triada objawów niewydolności szpiku: anemia (bladość), małopłytkowość (skaza krwotoczna), neutropenia (infekcje/gorączka) oraz nacieczenie okostnej i narządów (bóle kostne, limfadenopatia); zlecasz pilną morfologię z rozmazem manualnym CITO.",
            correct: true,
            feedback: "Znakomicie! Klasyczny, podręcznikowy obraz ostrej białaczki limfoblastycznej (ALL): szczyt zachorowań przypada na 2.–5. rok życia (ALL stanowi ok. 75–80% wszystkich białaczek u dzieci). Objawy wynikają z: 1) Niewydolności prawidłowej hematopoezy przez wyparcie szpiku przez blasty: anemia (bladość, tachykardia), trombocytopenia (wybroczyny, siniaki, krwawienia ze śluzówek) i neutropenia (gorączki, zakażenia); 2) Nacieczenia narządowego: bóle kostno-stawowe (rozpieranie jamy szpikowej i naciek okostnej u >50% dzieci – częsty powód mylenia z 'bólami wzrostowymi' lub MIZS!), uogólniona limfadenopatia i hepatosplenomegalia."
          },
          {
            text: "Rozpoznajesz młodzieńcze idiopatyczne zapalenie stawów (MIZS) i odsyłasz pacjenta na rehabilitację.",
            correct: false,
            feedback: "Kardynalny błąd! Bóle kostne z wybroczynami i bladością to sygnał alarmowy nowotworu krwi. Podanie sterydów w nierozpoznanej białaczce zafałszuje obraz i wywoła zespół lizy guza."
          },
          {
            text: "Uznajesz bóle za zwykłe 'bóle wzrostowe' i zalecasz ciepłe okłady.",
            correct: false,
            feedback: "Bóle wzrostowe występują wieczorem, nigdy nie wybudzają w nocy, nie dają utykania, anemii ani wybroczyn!"
          },
          {
            text: "Stawiasz rozpoznanie hemofilii A nabytej u 4-latka.",
            correct: false,
            feedback: "Hemofilia daje wylewy do dużych stawów (hemarthros), a nie uogólnione petocje małopłytkowe i limfadenopatię."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Badanie brzucha – Hepatosplenomegalia",
        desc: "W trakcie badania brzucha wyczuwasz powiększoną wątrobę (wystającą 4 cm poniżej prawego łuku żebrowego) oraz powiększoną, twardą, niebolesną śledzionę (wystającą 5 cm poniżej lewego łuku żebrowego). Co oznacza obecność hepatosplenomegalii w tym kontekście klinicznym?",
        scenario: "W trakcie badania brzucha wyczuwasz powiększoną wątrobę (wystającą 4 cm poniżej prawego łuku żebrowego) oraz powiększoną, twardą, niebolesną śledzionę (wystającą 5 cm poniżej lewego łuku żebrowego). Co oznacza obecność hepatosplenomegalii w tym kontekście klinicznym?",
        options: [
          {
            text: "Hepatosplenomegalia (organomegalia) świadczy o pozaszpikowym nacieczeniu narządów siateczkowo-śródbłonkowych przez klonalne komórki białaczkowe (blasty); występuje u >60–70% dzieci z ALL.",
            correct: true,
            feedback: "Doskonale! Powiększenie wątroby i śledziony (hepatosplenomegalia) to klasyczny objaw pozaszpikowej manifestacji ostrej białaczki u dzieci. Wynika z masowej infiltracji miąższu wątroby i miazgi śledziony przez krążące limfoblasty."
          },
          {
            text: "Świadczy o marskości wątroby w przebiegu alkoholizmu dziecięcego.",
            correct: false,
            feedback: "Absurdalna i niedorzeczna opcja."
          },
          {
            text: "Organomegalia wyklucza chorobę nowotworową krwi.",
            correct: false,
            feedback: "Wręcz przeciwnie: hepatosplenomegalia jest jednym z głównych objawów rozrostów układu białokrwinkowego."
          },
          {
            text: "Wynika wyłącznie ze zjedzenia zbyt obfitego śniadania przed wizytą.",
            correct: false,
            feedback: "Śledziona wystająca 5 cm pod łuk to stan patologiczny."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Morfologia krwi obwodowej i rozmaz mikroskopowy – 'Przerwa białaczkowa'",
        desc: "Otrzymujesz wynik morfologii krwi CITO: Hemoglobina 6.1 g/dl (ciężka niedokrwistość normocytarna), Erytrocyty 2.1 T/l, Płytki krwi (PLT) 16 G/l (ciężka małopłytkowość). Leukocytoza 24.5 G/l. W rozmazie mikroskopowym manualnym: 52% komórek mononuklearnych o cechach BLASTÓW (limfoblastów z wysokim stosunkiem jądrowo-cytoplazmatycznym i widocznymi jąderkami), 42% dojrzałych limfocytów, 6% segmentów, całkowity brak postaci pośrednich granulopoezy (promielocytów, mielocytów, metamielocytów). Jak nazywa się to zjawisko hematologiczne?",
        scenario: "Otrzymujesz wynik morfologii krwi CITO: Hemoglobina 6.1 g/dl (ciężka niedokrwistość normocytarna), Erytrocyty 2.1 T/l, Płytki krwi (PLT) 16 G/l (ciężka małopłytkowość). Leukocytoza 24.5 G/l. W rozmazie mikroskopowym manualnym: 52% komórek mononuklearnych o cechach BLASTÓW (limfoblastów z wysokim stosunkiem jądrowo-cytoplazmatycznym i widocznymi jąderkami), 42% dojrzałych limfocytów, 6% segmentów, całkowity brak postaci pośrednich granulopoezy (promielocytów, mielocytów, metamielocytów). Jak nazywa się to zjawisko hematologiczne?",
        options: [
          {
            text: "Przerwa białaczkowa (hiatus leukaemicus) – obecność komórek skrajnie niedojrzałych (blastów) obok nielicznych dojrzałych form końcowych przy całkowitym braku stadiów pośrednich dojrzewania; w połączeniu z pancytopenią jest patognomoniczna dla OSTREJ BIAŁACZKI.",
            correct: true,
            feedback: "Wybitnie! Kluczowe pojęcie hematologiczne LEK: Przerwa białaczkowa (hiatus leukaemicus) cechuje ostre białaczki (ALL i AML) – klon nowotworowy ulega zablokowaniu na etapie blastu, więc w rozmazie widzimy wyłącznie blasty oraz nieliczne dojrzałe krwinki, bez form pośrednich. (W odróżnieniu od przewlekłej białaczki szpikowej CML, gdzie obecne są WSZYSTKIE szczeble dojrzewania linii granulocytarnej – od mieloblastu po segment). Uwaga: całkowita leukocytoza w ALL u dzieci może być wysoka (>50 G/l), prawidłowa, a u 20–30% chorych nawet obniżona (leukopenia!), ale niemal zawsze towarzyszy jej anemia i trombocytopenia!"
          },
          {
            text: "Odsunięcie w lewo w odczynie białaczkowym w przebiegu zapalenia płuc.",
            correct: false,
            feedback: "W odczynie białaczkowym (np. w ciężkiej sepsie) obecne są formy pośrednie (pałeczki, metamielocyty), a płytki krwi są zazwyczaj podwyższone."
          },
          {
            text: "Niedokrwistość z niedoboru żelaza powikłana trombocytozą.",
            correct: false,
            feedback: "W niedoborze żelaza płytki krwi rosną (nadpłytkowość odczynowa), a nie spadają do 16 G/l!"
          },
          {
            text: "Fizjologiczny rozmaz u 4-letniego dziecka.",
            correct: false,
            feedback: "Obecność blastów we krwi obwodowej zawsze jest zjawiskiem skrajnie patologicznym."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Ostateczne badanie diagnostyczne – Biopsja aspiracyjna szpiku kostnego (BMA)",
        desc: "Jakie badanie jest ZŁOTYM STANDARDEM i warunkiem koniecznym do ostatecznego rozpoznania ostrej białaczki oraz jakie kryterium odsetka komórek blastycznych definiuje ostrą białaczkę wg WHO?",
        scenario: "Jakie badanie jest ZŁOTYM STANDARDEM i warunkiem koniecznym do ostatecznego rozpoznania ostrej białaczki oraz jakie kryterium odsetka komórek blastycznych definiuje ostrą białaczkę wg WHO?",
        options: [
          {
            text: "Biopsja aspiracyjna szpiku kostnego (mielogram pobrany najczęściej z talerza kości biodrowej); kryterium rozpoznania ostrej białaczki wg WHO to obecność co najmniej 20% komórek blastycznych w szpiku kostnym (u opisywanego pacjenta blasty stanowią 88%).",
            correct: true,
            feedback: "Znakomicie! Złota reguła onkohematologii: Ostateczne rozpoznanie ostrej białaczki stawia się WYŁĄCZNIE na podstawie badania szpiku kostnego (mielogramu z biopsji aspiracyjnej BMA lub trepanobiopsji). U dzieci szpik pobiera się z kolca biodrowego tylnego górnego w znieczuleniu. Kryterium WHO: obecność >=20% blastów w komórkowości szpiku kostnego (w ALL często >70–90%, całkowicie wypierających prawidłowe linie erytro- i megakariopoezy)."
          },
          {
            text: "Rozpoznanie stawia się wyłącznie na podstawie badania moczu.",
            correct: false,
            feedback: "Mocz nie służy do diagnozowania białaczki."
          },
          {
            text: "Wystarczy biopsja skóry z wybroczyny.",
            correct: false,
            feedback: "Wybroczyna to wylew krwi, nie pozwala na ocenę szpiku."
          },
          {
            text: "Kryterium WHO to obecność co najmniej 99.9% blastów w ślinie.",
            correct: false,
            feedback: "Absurdalne."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Immunofenotypowanie i genetyka molekularna – Klasyfikacja B-ALL vs T-ALL",
        desc: "Pobrany szpik wysyłasz do badań cytometrii przepływowej i cytogenetyki. Dlaczego immunofenotypowanie i badania genetyczne są kluczowe w nowoczesnej stratyfikacji ryzyka ALL?",
        scenario: "Pobrany szpik wysyłasz do badań cytometrii przepływowej i cytogenetyki. Dlaczego immunofenotypowanie i badania genetyczne są kluczowe w nowoczesnej stratyfikacji ryzyka ALL?",
        options: [
          {
            text: "Pozwalają ustalić linię komórkową (B-ALL: CD19+, CD10+, CD22+ u ok. 85% vs T-ALL: CD3+, CD7+ u ok. 15%) oraz aberracje genetyczne decydujące o rokowaniu i celowanej terapii: t(12;21) ETV6-RUNX1 (TEL-AML1 – doskonałe rokowanie) vs t(9;22) BCR-ABL1 (chromosom Philadelphia – wysokie ryzyko, wymaga inhibitora kinaz tyrozynowych: imatynibu/dazatynibu).",
            correct: true,
            feedback: "Doskonale! Nowoczesna onkohematologia dziecięca: 1) Immunofenotyp (cytometria): >80-85% dzieci to B-komórkowa ALL (pre-B ALL / common ALL: CD19, CD10 zwany CALLA, CD22), o lepszym rokowaniu; 15% to T-ALL (CD3, CD7), często z guzem w śródpiersiu. 2) Cytogenetyka: najczęstszą aberracją u dzieci jest fuzja ETV6-RUNX1 [t(12;21)] związana z doskonałą odpowiedzią na chemioterapię (>95% wyleczeń). Z kolei obecność chromosomu Philadelphia t(9;22) BCR-ABL1 wymaga natychmiastowego dołączenia inhibitora kinazy tyrozynowej (TKI – imatinib) do protokołu chemioterapii!"
          },
          {
            text: "Immunofenotypowanie służy wyłącznie do określenia grupy krwi Rh.",
            correct: false,
            feedback: "Błąd: cytometria ocenia antygeny powierzchniowe komórek nowotworowych (CD)."
          },
          {
            text: "Wszystkie postacie ALL leczy się identycznie jedną tabletką aspiryny.",
            correct: false,
            feedback: "Protokół leczenia jest ściśle zależny od stratyfikacji genetycznej grupy ryzyka."
          },
          {
            text: "Obecność chromosomu Philadelphia oznacza, że dziecko urodziło się w Stanach Zjednoczonych.",
            correct: false,
            feedback: "Chromosom Philadelphia to translokacja t(9;22) nazwana od miasta jej odkrycia."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Ocena zajęcia OUN i profilaktyka neuroleukemii",
        desc: "Dlaczego u każdego dziecka z nowo rozpoznaną ALL obowiązkowo wykonuje się nakłucie lędźwiowe z oceną płynu mózgowo-rdzeniowego (PMR) i dokanałowym podaniem chemioterapii?",
        scenario: "Dlaczego u każdego dziecka z nowo rozpoznaną ALL obowiązkowo wykonuje się nakłucie lędźwiowe z oceną płynu mózgowo-rdzeniowego (PMR) i dokanałowym podaniem chemioterapii?",
        options: [
          {
            text: "Ośrodkowy układ nerwowy (OUN) oraz jądra u chłopców stanowią tzw. 'narządy sanktuaryjne' (sanctuary sites); bariera krew-mózg chroni komórki białaczkowe przed działaniem większości leków podawanych dożylnie; profilaktyczne lub lecznicze dokanałowe (dordzeniowe) podawanie cytostatyków (metotreksatu, cytarabiny) jest bezwzględnym standardem u każdego pacjenta z ALL.",
            correct: true,
            feedback: "Wybitnie! Klasyczne pojęcie onkologiczne: OUN i jądra są anatomicznymi 'kryjówkami' (sanctuaries) dla blastów, ponieważ bariera krew-mózg i bariera krew-jądro uniemożliwiają osiągnięcie terapeutycznych stężeń standardowej chemioterapii dożylnej. W przeszłości u większości dzieci dochodziło do wznów w OUN (neuroleukemia). Wprowadzenie rutynowej profilaktyki dokanałowej (intrathecal methotrexate) w trakcie każdej punkcji lędźwiowej zredukowało częstość wznów w mózgu z 70% do poniżej 3%!"
          },
          {
            text: "Nakłucie lędźwiowe wykonuje się tylko w celu podania antybiotyku na ból głowy.",
            correct: false,
            feedback: "Błąd: celem jest eradykacja komórek białaczkowych w PMR."
          },
          {
            text: "PMR w ALL bada się wyłącznie w celu wykluczenia tasiemca.",
            correct: false,
            feedback: "Brak związku."
          },
          {
            text: "Mózg jest w 100% odporny na nacieki białaczkowe.",
            correct: false,
            feedback: "OUN jest jednym z głównych miejsc zajęcia pozaszpikowego w ALL."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Zespół lizy guza (TLS) – Zagrożenie ostre przy rozpoczęciu chemioterapii",
        desc: "W trakcie wdrażania leczenia indukcyjnego dochodzi do masowego rozpadu miliardów wrażliwych komórek nowotworowych. Jakie cztery zaburzenia metaboliczne tworzą zespół lizy guza (Tumor Lysis Syndrome - TLS wg klasyfikacji Cairona-Bishopa) i jak mu zapobiegać?",
        scenario: "W trakcie wdrażania leczenia indukcyjnego dochodzi do masowego rozpadu miliardów wrażliwych komórek nowotworowych. Jakie cztery zaburzenia metaboliczne tworzą zespół lizy guza (Tumor Lysis Syndrome - TLS wg klasyfikacji Cairona-Bishopa) i jak mu zapobiegać?",
        options: [
          {
            text: "Czwórka zaburzeń TLS: 1) HIPERKALIEMIA, 2) HIPERFOSFATEMIA, 3) HIPERURYKEMIA (kwas moczowy) oraz wtórna 4) HIPOKALCEMIA; zapobieganie: intensywna hiperhydratacja (dożylne nawadnianie 3000 ml/m2/d bez potasu!) oraz podanie RASBURYKAZY (rekombinowanej oksydazy moczanowej przekształcającej kwas moczowy w rozpuszczalną alantoinę) lub allopurynolu.",
            correct: true,
            feedback: "Prawidłowo! Pewniak egzaminacyjny LEK: Zespół ostrej lizy guza (TLS): treść wewnątrzkomórkowa blastów wylewa się do krążenia: 1) Potas (hiperkaliemia -> arytmie, zgon); 2) Fosforany (hiperfosfatemia -> wiążą wapń, dając kryształy fosforanu wapnia w nerkach i ostrą hipokalcemię z tężyczką); 3) Kwasy nukleinowe metabolizowane do kwasu moczowego (hiperurykemia -> nefropatia moczanowa i bezmocz). Profilaktyka: potężne nawodnienie (hiperhydratacja) oraz rasburykaza (lekiem z wyboru rozkładającym kwas moczowy) lub allopurynol."
          },
          {
            text: "Czwórka zaburzeń: hipokaliemia, hipofosfatemia, hipourykemia i hiperkalcemia.",
            correct: false,
            feedback: "Dokładne odwrócenie zaburzeń TLS."
          },
          {
            text: "W TLS dochodzi wyłącznie do wzrostu stężenia sodu powyżej 200 mmol/l.",
            correct: false,
            feedback: "Głównymi problemami są potas, fosforany i kwas moczowy."
          },
          {
            text: "Leczeniem z wyboru w TLS jest podawanie tabletek z kwasem moczowym.",
            correct: false,
            feedback: "Absurdalne: pacjent ma nadmiar kwasu moczowego blokującego nerki."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Schemat leczenia wielolekowego i rokowanie u dzieci",
        desc: "Matka chłopca pyta ze łzami w oczach, jakie są szanse na całkowite wyleczenie syna i jak wygląda schemat leczenia ALL. Jakich informacji zgodnych ze współczesnymi danymi onkologicznymi udzielasz?",
        scenario: "Matka chłopca pyta ze łzami w oczach, jakie są szanse na całkowite wyleczenie syna i jak wygląda schemat leczenia ALL. Jakich informacji zgodnych ze współczesnymi danymi onkologicznymi udzielasz?",
        options: [
          {
            text: "Uspokajasz matkę: ALL u dzieci to jeden z największych sukcesów współczesnej onkologii – wskaźnik całkowitego wyleczenia (5-year survival) przekracza obecnie 85–90%! Leczenie opiera się na protokołach wielolekowych (indukcja remisji: steryd + winkrystyna + L-asparaginaza + daunorubicyna, konsolidacja, leczenie podtrzymujące) i trwa łącznie ok. 2 lat.",
            correct: true,
            feedback: "Wybitnie! Kluczowe fakty onkologiczne: W latach 60. XX wieku ALL była chorobą w 100% śmiertelną w ciągu kilku miesięcy. Dziś, dzięki międzynarodowym protokołom wielolekowym (np. AIEOP-BFM), ponad 85–90% dzieci z ALL uzyskuje trwałe, całkowite wyleczenie! Standardowy schemat obejmuje: 1) Indukcję remisji (protokół I); 2) Konsolidację; 3) Reindukcję; 4) Długoterminowe leczenie podtrzymujące doustne (merkaptopuryna + metotreksat) do łącznego czasu 2 lat."
          },
          {
            text: "Informujesz, że ostra białaczka jest całkowicie nieuleczalna i szanse przeżycia wynoszą 0%.",
            correct: false,
            feedback: "Nieprawda i okrucieństwo: ALL u dzieci ma jeden z najwyższych odsetków wyleczeń w całej onkologii (>90%)."
          },
          {
            text: "Leczenie trwa 5 dni i polega wyłącznie na piciu ziół.",
            correct: false,
            feedback: "Zaniechanie chemioterapii prowadzi do nieuchronnego zgonu dziecka."
          },
          {
            text: "Jedyną formą leczenia jest natychmiastowe usunięcie obu nerek.",
            correct: false,
            feedback: "Niedorzeczne i medycznie bezpodstawne."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 123: Plamica Henocha-Schönleina / IgAV
  // ==========================================
  await upgradeCase('123_plamica_henocha_schonleina_igav.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena na SOR – 6-letni chłopiec z plamicą na nogach, bólem brzucha i obrzękiem stawów",
        desc: "Dyżurujesz na SOR dziecięcym. Rodzice przywożą 6-letniego chłopca. 10 dni temu dziecko przebyło katar i ból gardła o etiologii wirusowej. Od wczoraj na pośladkach, udach i podudziach dziecka zaczęły pojawiać się liczne, ciemnoczerwone, drobne wykwity. Przy dotyku matka stwierdziła, że są one wyraźnie wyczuwalne, 'wypukłe jak grudki'. Dziś rano chłopiec zaczął utykać z powodu silnego bólu i ciastowatego obrzęku obu stawów skokowych, a od 2 godzin skarży się na ostry, napadowy, skurczowy ból brzucha wokół pępka i zwymiotował treść pokarmową. W badaniu: HR 115/min, RR 105/65 mmHg, na pośladkach i wyprostnych powierzchniach kończyn dolnych widoczna symetryczna, uniesiona plamica (palpable purpura) nieblednąca pod uciskiem, stawy skokowe obrzęknięte, bolesne przy ruchach. Jaka jest Twoja wstępna diagnoza?",
        scenario: "Dyżurujesz na SOR dziecięcym. Rodzice przywożą 6-letniego chłopca. 10 dni temu dziecko przebyło katar i ból gardła o etiologii wirusowej. Od wczoraj na pośladkach, udach i podudziach dziecka zaczęły pojawiać się liczne, ciemnoczerwone, drobne wykwity. Przy dotyku matka stwierdziła, że są one wyraźnie wyczuwalne, 'wypukłe jak grudki'. Dziś rano chłopiec zaczął utykać z powodu silnego bólu i ciastowatego obrzęku obu stawów skokowych, a od 2 godzin skarży się na ostry, napadowy, skurczowy ból brzucha wokół pępka i zwymiotował treść pokarmową. W badaniu: HR 115/min, RR 105/65 mmHg, na pośladkach i wyprostnych powierzchniach kończyn dolnych widoczna symetryczna, uniesiona plamica (palpable purpura) nieblednąca pod uciskiem, stawy skokowe obrzęknięte, bolesne przy ruchach. Jaka jest Twoja wstępna diagnoza?",
        options: [
          {
            text: "Rozpoznajesz zapalenie naczyń związane z IgA (IgA Vasculitis - IgAV / dawniej plamica Henocha-Schönleina); najczęstsze układowe zapalenie małych naczyń u dzieci; klasyczna tetrada objawów: uniesiona plamica (palpable purpura) + ból brzucha + zapalenie stawów + potencjalne zajęcie nerek.",
            correct: true,
            feedback: "Znakomicie! Klasyczna pełnoobjawowa manifestacja plamicy Henocha-Schönleina (obecnie oficjalnie nazywanej zapaleniem naczyń związanym z IgA - IgAV): najczęstsze zapalenie naczyń wieku dziecięcego (szczyt 4–7 lat). Poprzedzone w 75% infekcją górnych dróg oddechowych. Tetrada kliniczna: 1) Wyczuwalna dotykiem plamica uniesiona (palpable purpura) – objaw obowiązkowy!; 2) Bóle i obrzęki stawów (zwykle skokowych i kolanowych); 3) Bóle brzucha z wymiotami i krwawieniem z przewodu pokarmowego; 4) Kłębuszkowe zapalenie nerek (nefropatia IgAV)."
          },
          {
            text: "Stawiasz rozpoznanie idiopatycznej plamicy małopłytkowej (ITP).",
            correct: false,
            feedback: "W ITP wybroczyny są płaskie (niewyczuwalne), brak zapalenia stawów i brak bólów brzucha, a liczba płytek spada <20–30 G/l."
          },
          {
            text: "Rozpoznajesz zesztywniające zapalenie stawów kręgosłupa (ZZSK).",
            correct: false,
            feedback: "ZZSK dotyczy młodych dorosłych mężczyzn z antygenem HLA-B27, nie 6-latków z osutką plamiczą."
          },
          {
            text: "Podejrzewasz natychmiast zatrucie arszenikiem.",
            correct: false,
            feedback: "Brak podstaw z wywiadu, obecny typowy zakaźno-immunologiczny obraz IgAV."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Kryteria klasyfikacyjne EULAR/PRINTO/PRES dla IgA Vasculitis",
        desc: "Jakie jest OBOWIĄZKOWE kryterium rozpoznania zapalenia naczyń związanego z IgA wg międzynarodowych kryteriów EULAR/PRINTO/PRES oraz jakie dodatkowe kryteria muszą mu towarzyszyć?",
        scenario: "Jakie jest OBOWIĄZKOWE kryterium rozpoznania zapalenia naczyń związanego z IgA wg międzynarodowych kryteriów EULAR/PRINTO/PRES oraz jakie dodatkowe kryteria muszą mu towarzyszyć?",
        options: [
          {
            text: "Kryterium OBOWIĄZKOWE: wyczuwalna palpacyjnie plamica (palpable purpura) lub wybroczyny bez trombocytopenii z przewagą na kończynach dolnych i pośladkach; PLUS co najmniej 1 z 4 kryteriów dodatkowych: 1) Ostry rozlany ból brzucha; 2) Zapalenie lub ból stawów; 3) Zajęcie nerek (krwinkomocz/białkomocz); 4) Biopsja z dominacją złogów IgA w ścianie naczyń.",
            correct: true,
            feedback: "Doskonale! Pewniak egzaminacyjny LEK: Zgodnie z kryteriami EULAR/PRINTO/PRES: Warunek bezwzględnie konieczny to obecność WYCZUWALNEJ PALPACYJNIE PLAMICY (grudkowej, uniesionej nad poziom skóry, nieblednącej pod uciskiem) zlokalizowanej głównie na kończynach dolnych i pośladkach, przy braku małopłytkowości i koagulopatii. Do postawienia pewnego rozpoznania wystarczy obecność plamicy + min. 1 z wymienionych cech (brzuch, stawy, nerki lub histopatologia ze złogami IgA)."
          },
          {
            text: "Kryterium obowiązkowym jest małopłytkowość poniżej 10 G/l.",
            correct: false,
            feedback: "Kardynalny błąd! W IgAV płytki krwi są w normie lub podwyższone; małopłytkowość wyklucza IgAV!"
          },
          {
            text: "Obowiązkowa jest obecność tętniaków aorty brzusznej.",
            correct: false,
            feedback: "IgAV dotyczy małych naczyń (włośniczek, tętniczek, żyłek), nie aorty."
          },
          {
            text: "Jedynym kryterium jest wiek powyżej 75 lat.",
            correct: false,
            feedback: "IgAV występuje głównie u dzieci w wieku przedszkolnym i szkolnym."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Badania laboratoryjne CITO – Płytki krwi i wskaźniki zapalne",
        desc: "Pobierasz krew na cito: Płytki krwi (PLT) wynoszą 385 G/l (w normie!). Hemoglobina 12.8 g/dl, leukocytoza 13.2 G/l z neutrofilią, CRP 24 mg/l. Koagulogram: PT/INR 1.02, APTT 29 s, fibrynogen 380 mg/dl (w normie). Dlaczego prawidłowa liczba płytek krwi jest tak kluczowa w IgAV?",
        scenario: "Pobierasz krew na cito: Płytki krwi (PLT) wynoszą 385 G/l (w normie!). Hemoglobina 12.8 g/dl, leukocytoza 13.2 G/l z neutrofilią, CRP 24 mg/l. Koagulogram: PT/INR 1.02, APTT 29 s, fibrynogen 380 mg/dl (w normie). Dlaczego prawidłowa liczba płytek krwi jest tak kluczowa w IgAV?",
        options: [
          {
            text: "Potwierdza, że plamica ma charakter NACZYNIOWY (leukocytoklastyczne zapalenie małych naczyń krwionośnych z odkładaniem kompleksów IgA), a NIE małopłytkowy; wyklucza ITP, ostrą białaczkę, HUS i DIC, w których małopłytkowość jest cechą dominującą.",
            correct: true,
            feedback: "Znakomicie! Złota zasada diagnostyczna: plamica naczyniowa (vasculitic purpura) w IgAV powstaje wskutek aseptycznego zapalenia ściany naczynia (leukocytoclastic vasculitis), jej obrzęku i przenikania erytrocytów do skóry. Liczba płytek krwi jest całkowicie prawidłowa (lub podwyższona w ramach odczynu ostrej fazy). Wyklucza to skazy małopłytkowe i wskazuje na zapalenie naczyń."
          },
          {
            text: "Prawidłowa liczba płytek w 100% wyklucza plamicę Henocha-Schönleina.",
            correct: false,
            feedback: "Dokładnie na odwrót: norma płytek jest warunkiem rozpoznania IgAV!"
          },
          {
            text: "Oznacza, że pacjent ma nadpłytkowość samoistną (ET).",
            correct: false,
            feedback: "PLT 385 G/l to wartość w granicach normy."
          },
          {
            text: "Świadczy o braku konieczności jakichkolwiek dalszych badań.",
            correct: false,
            feedback: "Konieczne jest zbadanie moczu w kierunku nefropatii."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Zagrażające powikłanie chirurgiczne – Wgłobienie jelita (Intussusception)",
        desc: "W 3. godzinie na SOR ból brzucha u chłopca gwałtownie się nasila – dziecko krzyczy z bólu, zwija się, podciągając nóżki do klatki piersiowej, a w pielusze/stolcu pojawia się ciemnoczerwona krew ze śluzem o wyglądzie 'galaretki porzeczkowej' (red currant jelly stool). W badaniu brzucha w prawym śródbrzuszu wyczuwasz bolesny, podłużny opór w kształcie 'kiełbaski'. Jakie ostre powikłanie chirurgiczne rozpoznajesz i jakie badanie obrazowe CITO zlecasz?",
        scenario: "W 3. godzinie na SOR ból brzucha u chłopca gwałtownie się nasila – dziecko krzyczy z bólu, zwija się, podciągając nóżki do klatki piersiowej, a w pielusze/stolcu pojawia się ciemnoczerwona krew ze śluzem o wyglądzie 'galaretki porzeczkowej' (red currant jelly stool). W badaniu brzucha w prawym śródbrzuszu wyczuwasz bolesny, podłużny opór w kształcie 'kiełbaski'. Jakie ostre powikłanie chirurgiczne rozpoznajesz i jakie badanie obrazowe CITO zlecasz?",
        options: [
          {
            text: "Rozpoznajesz ostre wgłobienie jelita (intussusception / invaginatio); najgroźniejsze ostre powikłanie brzuszne IgAV wywołane krwawieniem podśluzówkowym ściany jelita (stanowiącym punkt czołowy wgłobienia); zlecasz natychmiast USG jamy brzusznej (poszukiwanie objawu 'tarczy strzelniczej' / 'obwarzanka' - target/doughnut sign) i pilną konsultację chirurga dziecięcego.",
            correct: true,
            feedback: "Wybitnie! Klasyczne powikłanie chirurgiczne IgAV: wylewy krwawe i obrzęk podśluzówkowy ściany jelita cienkiego tworzą tzw. 'lead point' (punkt wyjścia), który perystaltyka wciąga do dalszego odcinka jelita, powodując wgłobienie (najczęściej krętniczo-krętnicze lub krętniczo-kątnicze). Objawia się napadowym bólem kolkowym, stolcem jak 'galaretka porzeczkowa' i oporem w badaniu palpacyjnym. Złotym standardem diagnostyki jest USG brzucha (patognomoniczny obraz tarczy strzelniczej w przekroju poprzecznym). Stan wymaga pilnej redukcji hydrostatycznej/pneumatycznej lub operacyjnej!"
          },
          {
            text: "Rozpoznajesz wrzodziejące zapalenie jelita grubego i wypisujesz receptę na mesalazynę.",
            correct: false,
            feedback: "Kardynalny błąd: napadowy ból z oporem w kształcie kiełbaski to ostre wgłobienie jelita grożące martwicą i perforacją."
          },
          {
            text: "Uznajesz stolec za wynik zjedzenia buraków.",
            correct: false,
            feedback: "Przeoczenie wgłobienia jelita prowadzi do martwicy pętli jelitowej, sepsy i zgonu."
          },
          {
            text: "Kierujesz dziecko na kolonoskopię w trybie planowym za 3 miesiące.",
            correct: false,
            feedback: "Wgłobienie jelita wymaga natychmiastowej interwencji ratunkowej w ciągu godzin."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Ocena nerek – Nefropatia IgAV (Schönleina-Henocha)",
        desc: "Wgłobienie jelita zostało pomyślnie zdezinvaginowane hydrostatycznie pod kontrolą USG bez konieczności resekcji. Zlecasz badanie ogólne moczu. Wynik: barwa bursztynowa, białko 0.8 g/l, erytrocyty 25–40 wpw, obecne nieliczne wałeczki erytrocytarne. Kreatynina w normie (0.45 mg/dl). Jak interpretujesz zajęcie nerek w IgAV i dlaczego decyduje ono o odległym rokowaniu?",
        scenario: "Wgłobienie jelita zostało pomyślnie zdezinvaginowane hydrostatycznie pod kontrolą USG bez konieczności resekcji. Zlecasz badanie ogólne moczu. Wynik: barwa bursztynowa, białko 0.8 g/l, erytrocyty 25–40 wpw, obecne nieliczne wałeczki erytrocytarne. Kreatynina w normie (0.45 mg/dl). Jak interpretujesz zajęcie nerek w IgAV i dlaczego decyduje ono o odległym rokowaniu?",
        options: [
          {
            text: "Potwierdzasz nefropatię IgAV (nefrytyczne zajęcie nerek z krwinkomoczem i białkomoczem); jest to histopatologiczny odpowiednik nefropatii IgA (choroby Bergera); to właśnie stopień uszkodzenia nerek jest JEDYNYM czynnikiem decydującym o odległym rokowaniu i ryzyku przewlekłej choroby nerek u pacjenta z IgAV.",
            correct: true,
            feedback: "Doskonale! Pewniak egzaminacyjny LEK: Zmiany skórne, stawowe i brzuszne w IgAV ustępują całkowicie i nie pozostawiają trwałych następstw. JEDYNYM narządem, który decyduje o odległym rokowaniu pacjenta (ryzyko utrwalonego nadciśnienia tętniczego, przewlekłej choroby nerek i schyłkowej niewydolności nerek u 1–5% chorych), są NERKI! Złogi IgA odkładają się w mezangium kłębuszków (identycznie jak w nefropatii IgA / chorobie Bergera). Wymaga to systematycznego monitorowania moczu i RR przez co najmniej 6–12 miesięcy."
          },
          {
            text: "Zajęcie nerek oznacza, że obie nerki muszą być natychmiast usunięte.",
            correct: false,
            feedback: "U większości dzieci nefropatia IgAV ma przebieg łagodny i ulega samoistnej remisji."
          },
          {
            text: "Wynik moczu dowodzi, że pacjent nie ma IgAV.",
            correct: false,
            feedback: "Krwinkomocz i białkomocz występują u 30-50% dzieci z IgAV."
          },
          {
            text: "Obecność białka w moczu to wynik infekcji grzybiczej cewki.",
            correct: false,
            feedback: "Wałeczki erytrocytarne dowodzą kłębuszkowego zapalenia nerek (mezangialnego IgA)."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Wskazania do włączenia glikokortykosteroidów w IgAV",
        desc: "Rezydent pyta, czy u każdego dziecka z plamicą Henocha-Schönleina należy rutynowo włączyć prednizon, aby zapobiec zapaleniu nerek. Jakie są aktualne wytyczne dotyczące wskazań do GKS w IgAV?",
        scenario: "Rezydent pyta, czy u każdego dziecka z plamicą Henocha-Schönleina należy rutynowo włączyć prednizon, aby zapobiec zapaleniu nerek. Jakie są aktualne wytyczne dotyczące wskazań do GKS w IgAV?",
        options: [
          {
            text: "Sterydy (GKS) NIE SĄ ZALECANE rutynowo i NIE ZAPOBIEGAJĄ nefropatii IgAV; bezwzględnymi wskazaniami do włączenia prednizonu (1–2 mg/kg mc./d) są: silny, oporny na leki przeciwbólowe ból brzucha z krwawieniem z przewodu pokarmowego, ciężkie zapalenie nerek (zespół nerczycowy/nefrytyczny), masywne obrzęki moszny/jąder lub krwawienie płucne.",
            correct: true,
            feedback: "Wybitnie! Badania z randomizacją (EBM) jednoznacznie wykazały, że wczesne podanie glikokortykosteroidów NIE chroni przed wystąpieniem ani progresją nefropatii w IgAV! Nie podaje się ich także w izolowanej plamicy skórnej ani łagodnych bólach stawów (wystarczą paracetamol i odpoczynek). Wskazaniami do krótkiego kursu prednizonu są ciężkie powikłania narządowe: bolesne skurcze jelitowe z krwawieniem, zapalenie nerek z białkomoczem nerczycowym czy ciężkie zapalenie jąder."
          },
          {
            text: "Glikokortykosteroidy podaje się każdemu pacjentowi z każdą plamką na skórze przez 2 lata.",
            correct: false,
            feedback: "Błąd w sztuce: niepotrzebna toksyczność posteroidowa u dzieci."
          },
          {
            text: "GKS są całkowicie zakazane w medycynie dziecięcej.",
            correct: false,
            feedback: "Fałsz: są skutecznym lekiem w ciężkich bólach brzucha w IgAV."
          },
          {
            text: "Jedynym lekiem wskazanym w IgAV jest dożylna ampicylina.",
            correct: false,
            feedback: "IgAV to zapalenie naczyń o podłożu immunologicznym, nie infekcja bakteryjna."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Naturalny przebieg choroby i nawrotowość",
        desc: "Po 2 tygodniach leczenia zachowawczego wykwity skórne zbledły, a bóle brzucha i stawów całkowicie ustąpiły. Rodzice pytają, jak długo trwa choroba i czy zmiany mogą powrócić.",
        scenario: "Po 2 tygodniach leczenia zachowawczego wykwity skórne zbledły, a bóle brzucha i stawów całkowicie ustąpiły. Rodzice pytają, jak długo trwa choroba i czy zmiany mogą powrócić.",
        options: [
          {
            text: "U większości dzieci (>85%) choroba ma przebieg samoograniczający się i ustępuje w ciągu 4–6 tygodni; jednak u ok. 30–35% chorych dochodzi do NAWROTU wykwitów skórnych lub bólów brzucha (najczęściej w ciągu pierwszych kilku miesięcy, prowokowanych przez kolejną infekcję wirusową); nawroty mają zazwyczaj łagodniejszy i krótszy przebieg.",
            correct: true,
            feedback: "Znakomicie! Naturalny przebieg IgAV: choroba ma charakter ostry i samoograniczający się (średni czas trwania pierwszego rzutu to ok. 4 tygodnie). Rodziców należy jednak uprzedzić o możliwości nawrotów (występują u ok. jednej trzeciej dzieci, najczęściej w ciągu 3–6 miesięcy od początku, zazwyczaj po kolejnym przeziębieniu). Każdy nawrót wymaga ponownego zbadania moczu i ciśnienia tętniczego."
          },
          {
            text: "Plamica Henocha-Schönleina nigdy nie ustępuje i trwa nieprzerwanie przez 80 lat.",
            correct: false,
            feedback: "Fałsz: w przeważającej większości to choroba ostra, samoograniczająca się."
          },
          {
            text: "Nawrót wysypki oznacza konieczność natychmiastowego przeszczepu szpiku.",
            correct: false,
            feedback: "Nawroty IgAV są z reguły łagodne i wymagają jedynie postępowania objawowego."
          },
          {
            text: "Dziecko ma całkowity zakaz kąpieli do 18. roku życia.",
            correct: false,
            feedback: "Niedorzeczne."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Długoterminowy schemat monitorowania ambulatoryjnego",
        desc: "Jaki jest zalecany schemat kontroli ambulatoryjnej u każdego dziecka po przebyciu plamicy Henocha-Schönleina w celu wczesnego wykrycia nefropatii?",
        scenario: "Jaki jest zalecany schemat kontroli ambulatoryjnej u każdego dziecka po przebyciu plamicy Henocha-Schönleina w celu wczesnego wykrycia nefropatii?",
        options: [
          {
            text: "Regularna kontrola CIŚNIENIA TĘTNICZEGO oraz BADANIA OGÓLNEGO MOCZU (z oceną białkomoczu i krwinkomoczu): początkowo co 1–2 tygodnie w pierwszym miesiącu, następnie co miesiąc przez minimum 6–12 miesięcy od zachorowania; pojawienie się istotnego białkomoczu lub nadciśnienia wymaga pilnej konsultacji nefrologa dziecięcego i rozważenia biopsji nerki.",
            correct: true,
            feedback: "Wybitnie! Złoty standard opieki nad dzieckiem po IgAV: uszkodzenie nerek może ujawnić się z opóźnieniem (nawet do kilku miesięcy po ustąpieniu wysypki skórnej!). Dlatego każde dziecko po IgAV – nawet jeśli początkowe badanie moczu było idealne – wymaga comiesięcznej kontroli moczu i pomiaru ciśnienia tętniczego przez minimum 6 miesięcy (a optymalnie 12 miesięcy). Umożliwia to wczesne wykrycie postępującego kłębuszkowego zapalenia nerek i wdrożenie nefroprotekcji (ACE-I/ARB) lub immunosupresji."
          },
          {
            text: "Wykonywanie codziennej tomografii komputerowej nerek przez rok.",
            correct: false,
            feedback: "Nieuzasadniona wysoka dawka promieniowania, badanie moczu i RR w zupełności wystarczają."
          },
          {
            text: "Brak jakichkolwiek wizyt kontrolnych – pacjent zostaje uznany za całkowicie zdrowego bez badań.",
            correct: false,
            feedback: "Błąd zaniechania: u 1-5% chorych rozwija się niewykryta w porę przewlekła niewydolność nerek."
          },
          {
            text: "Zakaz chodzenia do szkoły przez 15 lat.",
            correct: false,
            feedback: "Absurdalne zalecenie."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 124: Guz tylnego dołu czaszki u dziecka
  // ==========================================
  await upgradeCase('124_guz_tylnego_dolu_czaszki.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena w gabinecie pediatryczno-neurologicznym – 5-latka z porannymi wymiotami i zaburzeniami chodu",
        desc: "Do Twojego gabinetu rodzice przyprowadzają 5-letnią dziewczynkę. Od 4–5 tygodni dziecko ma narastające poranne bóle głowy, które budzą je ze snu we wczesnych godzinach porannych. Bólom towarzyszą chlustające wymioty na czczo (bez wcześniejszych nudności), po których dziewczynka zgłasza wyraźną, chwilową ulgę w bólu głowy. Lekarz POZ początkowo leczył dziecko na 'refluks żołądkowy i pasożyty'. W ostatnich 2 tygodniach rodzice zauważyli niepokojące objawy ruchowe: mała zaczęła się potykać, zatacza się przy chodzeniu ('chodzi jak pijana'), skarży się na podwójne widzenie (diplopia), a rano ma trudności z utrzymaniem równowagi. W badaniu: HR 68/min, RR 122/78 mmHg, dziecko apatyczne, głowa przechylona w prawą stronę (kręcz szyi). Jaka jest Twoja natychmiastowa hipoteza diagnostyczna?",
        scenario: "Do Twojego gabinetu rodzice przyprowadzają 5-letnią dziewczynkę. Od 4–5 tygodni dziecko ma narastające poranne bóle głowy, które budzą je ze snu we wczesnych godzinach porannych. Bólom towarzyszą chlustające wymioty na czczo (bez wcześniejszych nudności), po których dziewczynka zgłasza wyraźną, chwilową ulgę w bólu głowy. Lekarz POZ początkowo leczył dziecko na 'refluks żołądkowy i pasożyty'. W ostatnich 2 tygodniach rodzice zauważyli niepokojące objawy ruchowe: mała zaczęła się potykać, zatacza się przy chodzeniu ('chodzi jak pijana'), skarży się na podwójne widzenie (diplopia), a rano ma trudności z utrzymaniem równowagi. W badaniu: HR 115/min, RR 105/65 mmHg, na pośladkach i wyprostnych powierzchniach kończyn dolnych widoczna symetryczna, uniesiona plamica (palpable purpura) nieblednąca pod uciskiem, stawy skokowe obrzęknięte, bolesne przy ruchach. Jaka jest Twoja wstępna diagnoza?",
        options: [
          {
            text: "Podejrzewasz guz mózgu – proces rozrostowy w obrębie tylnego dołu czaszki (infratentorial brain tumor – móżdżek / komora IV) powikłany wzmożonym ciśnieniem śródczaszkowym (ICP) i zespołem móżdżkowym; klasyczna triada: poranne bóle głowy wybudzające ze snu + poranne chlustające wymioty przynoszące ulgę + ataksja chodu.",
            correct: true,
            feedback: "Znakomicie! Klasyczny, alarmowy obraz guza tylnego dołu czaszki u dziecka: nowotwory OUN są najczęstszymi guzami litymi wieku dziecięcego, a u dzieci >1. r.ż. ponad 50–60% guzów lokalizuje się podnamiotowo (w tylnym dole czaszki: móżdżek, pień mózgu, komora IV). Klasyczna triada wzmożonego ciśnienia śródczaszkowego (ICP): poranny ból głowy (w pozycji leżącej w nocy drenaż żylny jest gorszy, a hipowentylacja zwiększa pCO2 i rozszerza naczynia mózgowe), chlustające wymioty na czczo (przynoszące natychmiastową ulgę) oraz ataksja móżdżkowa (chód na szerokiej podstawie)."
          },
          {
            text: "Rozpoznajesz zespół jelita drażliwego i przepisujesz probiotyk w kroplach.",
            correct: false,
            feedback: "Kardynalny błąd! Poranne wymioty z zaburzeniami chodu to objaw ciasnoty śródczaszkowej, a nie problem gastrologiczny!"
          },
          {
            text: "Stawiasz rozpoznanie migreny dziecięcej i odsyłasz pacjentkę bez badań obrazowych.",
            correct: false,
            feedback: "Błąd w sztuce: ból głowy wybudzający ze snu z ataksją u 5-latka bezwzględnie wymaga wykluczenia guza mózgu."
          },
          {
            text: "Podejrzewasz symulowanie objawów w celu uniknięcia przedszkola.",
            correct: false,
            feedback: "Ataksja chodu i chlustające wymioty są obiektywnymi objawami uszkodzenia organicznego OUN."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Badanie neurologiczne i oftalmoskopowe – Tarcza zastoinowa i objawy móżdżkowe",
        desc: "Przeprowadzasz dokładne badanie neurologiczne oraz oftalmoskopię dna oka. Jakie patologie w badaniu przedmiotowym jednoznacznie potwierdzają ciasnotę śródczaszkową i lokalizację w móżdżku?",
        scenario: "Przeprowadzasz dokładne badanie neurologiczne oraz oftalmoskopię dna oka. Jakie patologie w badaniu przedmiotowym jednoznacznie potwierdzają ciasnotę śródczaszkową i lokalizację w móżdżku?",
        options: [
          {
            text: "Dno oka: obustronny obrzęk tarcz nerwów wzrokowych (tarcza zastoinowa / papilledema); badanie neurologiczne: ataksja móżdżkowa (chód marynarski na szerokiej podstawie), dysmetria (próba palec-nos niecelna), adiadochokineza, oczopląs poziomy oraz dodatnia próba Romberga.",
            correct: true,
            feedback: "Doskonale! Złote objawy ciasnoty wewnątrzczaszkowej i uszkodzenia móżdżku: 1) Tarcza zastoinowa (papilledema) w badaniu dna oka jest patognomonicznym dowodem przewlekle podwyższonego ciśnienia śródczaszkowego (ICP); 2) Zespół móżdżkowy obejmuje: ataksję tułowia i kończyn, dysmetrię (brak hamowania ruchu), dysdiadochokinezę (upośledzenie szybkich ruchów naprzemiennych), oczopląs oraz mowę skandowaną; 3) Niedowład nerwu odwodzącego (n. VI - zez zbieżny i diplopia) jest tzw. fałszywym objawem lokalizacyjnym wynikającym z długiego przebiegu nerwu i jego ucisku na kość skalistą przy wysokim ICP."
          },
          {
            text: "Całkowicie prawidłowe dno oka wyklucza guza mózgu w 100%.",
            correct: false,
            feedback: "Błąd: u niemowląt z otwartym ciemiączkiem lub we wczesnym stadium tarcza zastoinowa może jeszcze nie wystąpić."
          },
          {
            text: "Wiotkie porażenie obu stóp jako jedyny objaw móżdżkowy.",
            correct: false,
            feedback: "Porażenie wiotkie to objaw obwodowego neuronu ruchowego, nie móżdżku."
          },
          {
            text: "Źrenice sztywne, niewykazujące żadnej reakcji na światło w łagodnym guzie.",
            correct: false,
            feedback: "Sztywne szerokie źrenice to objaw skrajnego wklinowania pnia mózgu i zgonu."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Bezwzględne przeciwwskazanie do punkcji lędźwiowej (LP)!",
        desc: "Młodszy stażysta proponuje natychmiastowe wykonanie punkcji lędźwiowej (LP) u dziewczynki, aby 'pobrać płyn mózgowo-rdzeniowy i zbadać białko oraz cytozę'. Jakie stanowisko natychmiast zajmujesz i dlaczego?",
        scenario: "Młodszy stażysta proponuje natychmiastowe wykonanie punkcji lędźwiowej (LP) u dziewczynki, aby 'pobrać płyn mózgowo-rdzeniowy i zbadać białko oraz cytozę'. Jakie stanowisko natychmiast zajmujesz i dlaczego?",
        options: [
          {
            text: "Kategorycznie i bezwzględnie ZAKAZUJESZ nakłucia lędźwiowego! Przy guzie tylnego dołu czaszki i wzmożonym ICP nakłucie lędźwiowe wywoła gwałtowny spadek ciśnienia w kanale kręgowym i natychmiastowe ŚMIERTELNE WGŁOBIENIE (wklinowanie) migdałków móżdżku do otworu wielkiego (tonsillar herniation) z uciskiem na pień mózgu i zatrzymaniem krążenia!",
            correct: true,
            feedback: "Wybitnie! To jedna z najbardziej fundamentalnych zasad bezpieczeństwa w neurologii i neurochirurgii (pewniak każdego LEK): PUNKCJA LĘDŹWIOWA JEST BEZWZGLĘDNIE PRZECIWWSKAZANA przy obecności guza wewnątrzczaszkowego (zwłaszcza w tylnym dole czaszki) lub cechach ciasnoty śródczaszkowej (tarcza zastoinowa)! Pobranie płynu z dołu tworzy gradient ciśnień – migdałki móżdżku zostają zassane do otworu wielkiego kości potylicznej, miażdżąc pień mózgu (ośrodek oddechowy i naczynioruchowy), co prowadzi do natychmiastowego bezdechu i zgonu na igle!"
          },
          {
            text: "Zgadzasz się i zlecasz upuszczenie 50 ml płynu mózgowo-rdzeniowego grubą igłą.",
            correct: false,
            feedback: "Kardynalny błąd powodujący natychmiastową śmierć dziecka we wklinowaniu."
          },
          {
            text: "Nakłucie lędźwiowe należy wykonać tylko wtedy, gdy ciśnienie krwi przekracza 200 mmHg.",
            correct: false,
            feedback: "Ciasnota śródczaszkowa jest bezwzględnym przeciwwskazaniem niezależnie od RR."
          },
          {
            text: "Nakłucie lędźwiowe można bezpiecznie zastąpić nakłuciem wątroby.",
            correct: false,
            feedback: "Niedorzeczne."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Diagnostyka neuroobrazowa z wyboru – Rezonans magnetyczny (MRI)",
        desc: "Jakie badanie obrazowe jest ZŁOTYM STANDARDEM w diagnostyce guzów tylnego dołu czaszki u dzieci i dlaczego tomografia komputerowa (TK) nie jest badaniem optymalnym?",
        scenario: "Jakie badanie obrazowe jest ZŁOTYM STANDARDEM w diagnostyce guzów tylnego dołu czaszki u dzieci i dlaczego tomografia komputerowa (TK) nie jest badaniem optymalnym?",
        options: [
          {
            text: "REZONANS MAGNETYCZNY (MRI) mózgowia i całego rdzenia kręgowego z kontrastem paramagnetycznym (gadolinem); TK głowy ma ograniczone zastosowanie w tylnym dole czaszki ze względu na artefakty od kości skalistych i potylicznej (tzw. beam hardening artifacts); MRI pozwala na precyzyjną ocenę anatomii guza i wykluczenie przerzutów drogą płynową (drop metastases).",
            correct: true,
            feedback: "Doskonale! Złoty standard neuroonkologii: Badaniem z wyboru w guzach mózgu u dzieci jest MRI mózgowia z kontrastem. Tylny dół czaszki jest otoczony masywnymi kośćmi (część skalista kości skroniowej, kość potyliczna), które w badaniu TK dają grube artefakty pasmowe zasłaniające struktury pnia i móżdżku. MRI zapewnia doskonałą rozdzielczość tkanek miękkich. Ponadto w guzach tylnego dołu czaszki (np. medulloblastoma, ependymoma) obowiązkowo wykonuje się MRI całego kręgosłupa (spine MRI), by wykluczyć przerzuty kropelkowe (drop metastases) w kanale kręgowym!"
          },
          {
            text: "Klasyczne zdjęcie rentgenowskie (RTG) czaszki w 2 projekcjach.",
            correct: false,
            feedback: "RTG czaszki nie uwidacznia tkanki mózgowej ani guzów wewnątrzczaszkowych."
          },
          {
            text: "Elektroencefalografia (EEG) jako jedyne badanie potwierdzające guza.",
            correct: false,
            feedback: "EEG ocenia czynność bioelektryczną, nie obrazuje struktury guza."
          },
          {
            text: "Połyk papki gipsowej z prześwietleniem.",
            correct: false,
            feedback: "Absurdalne."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Najczęstsze typy histopatologiczne guzów tylnego dołu czaszki u dzieci",
        desc: "W badaniu MRI u dziewczynki uwidoczniono w prawej półkuli móżdżku dużą, dobrze odgraniczoną zmianę torbielowatą o średnicy 4.5 cm z intensywnie wzmacniającym się po podaniu kontrastu litym guzkiem przyściennym (mural nodule), uciskającą komorę IV i powodującą poszerzenie komór bocznych (wodogłowie). Jaki jest najbardziej prawdopodobny typ histopatologiczny tego guza?",
        scenario: "W badaniu MRI u dziewczynki uwidoczniono w prawej półkuli móżdżku dużą, dobrze odgraniczoną zmianę torbielowatą o średnicy 4.5 cm z intensywnie wzmacniającym się po podaniu kontrastu litym guzkiem przyściennym (mural nodule), uciskającą komorę IV i powodującą poszerzenie komór bocznych (wodogłowie). Jaki jest najbardziej prawdopodobny typ histopatologiczny tego guza?",
        options: [
          {
            text: "Gwiaździak włosowatokomórkowy (Pilocytic Astrocytoma - I stopień złośliwości wg WHO); najczęstszy pierwotny guz mózgu u dzieci, o typowym obrazie torbieli z guzkiem przyściennym w półkuli móżdżku; cechuje się DOSKONAŁYM rokowaniem (>90–95% wyleczeń po całkowitej resekcji chirurgicznej).",
            correct: true,
            feedback: "Znakomicie! Klasyfikacja neuropatologiczna guzów móżdżku u dzieci (pewniak LEK): 1) Gwiaździak włosowatokomórkowy (Pilocytic Astrocytoma - WHO st. I): najczęstszy guz mózgu u dzieci (~30%). Zlokalizowany w półkuli móżdżku, typowo jako torbiel z guzkiem przyściennym. Łagodny, całkowite wycięcie guzka oznacza 100% wyleczenie! 2) Rdzeniak zarodkowy (Medulloblastoma - WHO st. IV): drugi co do częstości, złośliwy guz embrionalny, rośnie w linii pośrodkowej (robak móżdżku/dach komory IV), lity, gęstokomórkowy, rozsiewa się płynem M-R; 3) Wyściółczak (Ependymoma - komora IV); 4) Glejak pnia mózgu (DIPG)."
          },
          {
            text: "Glejak wielopostaciowy (Glioblastoma multiforme - WHO st. IV) jako najczęstszy guz u 5-latków.",
            correct: false,
            feedback: "Glioblastoma to guz dorosłych w półkulach mózgu, u małych dzieci występuje rzadko."
          },
          {
            text: "Oponiak łagodny związany z menopauzą.",
            correct: false,
            feedback: "Oponiaki to guzy osób dorosłych i starszych."
          },
          {
            text: "Przerzut raka prostaty do móżdżku u 5-letniej dziewczynki.",
            correct: false,
            feedback: "Niedorzeczne i biologicznie niemożliwe."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Postępowanie farmakologiczne i odbarczenie ostrego wodogłowia",
        desc: "Dziewczynka ma cechy ciasnoty i poszerzenie komór bocznych (wodogłowie zaporowe). Jakie natychmiastowe leczenie przeciwobrzękowe wdrażasz przed operacją oraz jak neurochirurg zabezpiecza odpływ płynu mózgowo-rdzeniowego?",
        scenario: "Dziewczynka ma cechy ciasnoty i poszerzenie komór bocznych (wodogłowie zaporowe). Jakie natychmiastowe leczenie przeciwobrzękowe wdrażasz przed operacją oraz jak neurochirurg zabezpiecza odpływ płynu mózgowo-rdzeniowego?",
        options: [
          {
            text: "Leczenie przeciwobrzękowe: DEKSAMETAZON dożylnie (silny glikokortykosteroid zmniejszający obrzęk naczyniopochodny mózgu wokół guza) + uniesienie głowy o 30°; w przypadku ostrego wodogłowia zaporowego: pilny zewnętrzny drenaż komorowy (EVD - External Ventricular Drainage) lub endoskopowa wentrykulostomia dna III komory (ETV).",
            correct: true,
            feedback: "Prawidłowo! Standard przygotowania neurochirurgicznego: Deksametazon i.v. jest lekiem pierwszego rzutu zmniejszającym obrzęk naczyniopochodny mózgu (redukuje przepuszczalność bariery krew-guz). Guz zamykający komorę IV blokuje krążenie PMR, wywołując wodogłowie niekomunikujące (zaporowe). Pilne założenie zewnętrznego drenażu komorowego (EVD) do komory bocznej lub zabieg ETV ratuje życie, obniżając ciśnienie śródczaszkowe przed docelową resekcją guza."
          },
          {
            text: "Podanie dożylne 2 litrów czystej wody destylowanej w szybkim bolusie.",
            correct: false,
            feedback: "Śmiertelny błąd: wywoła natychmiastowy masywny obrzęk mózgu."
          },
          {
            text: "Zalecenie intensywnego uderzania pacjentki w potylicę.",
            correct: false,
            feedback: "Spowoduje wgłobienie migdałków i natychmiastowy zgon."
          },
          {
            text: "Podanie aspiryny w celu rozpuszczenia guza móżdżku.",
            correct: false,
            feedback: "Aspiryna zaburzy krzepnięcie i doprowadzi do śmiertelnego krwawienia śródczaszkowego w trakcie operacji."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Złoty standard leczenia neurochirurgicznego",
        desc: "Dziewczynka trafia na salę operacyjną kliniki neurochirurgii dziecięcej. Jaki jest cel i metoda z wyboru leczenia operacyjnego gwiaździaka włosowatokomórkowego móżdżku?",
        scenario: "Dziewczynka trafia na salę operacyjną kliniki neurochirurgii dziecięcej. Jaki jest cel i metoda z wyboru leczenia operacyjnego gwiaździaka włosowatokomórkowego móżdżku?",
        options: [
          {
            text: "Maksymalna radykalna resekcja mikroneurochirurgiczna (craniotomia podpotyliczna) z całkowitym usunięciem litego guzka przyściennego (oraz opróżnieniem torbieli) pod kontrolą mikroskopu operacyjnego i neuromonitoringu; całkowite wycięcie guzka jest równoznaczne z trwałym wyleczeniem bez konieczności chemo- i radioterapii!",
            correct: true,
            feedback: "Doskonale! Złota zasada chirurgii pilocytic astrocytoma: Ściana torbieli jest zazwyczaj tkanką glejową odczynową, natomiast kluczem do wyleczenia jest całkowita resekcja wzmacniającego się guzka przyściennego (mural nodule). W przypadku doszczętnego usunięcia guzka (GTR - Gross Total Resection) dziecko nie wymaga ŻADNEJ radioterapii ani chemioterapii, a wskaźnik przeżycia wieloletniego wynosi >95%!"
          },
          {
            text: "Wyłącznie biopsja igłowa bez wycinania guza i napromienianie całego ciała.",
            correct: false,
            feedback: "Błąd: radioterapia mózgu u 5-latka wywołuje ciężkie uszkodzenia intelektualne, a guza można całkowicie wyleczyć operacyjnie."
          },
          {
            text: "Usunięcie całego móżdżku i obu półkul mózgu.",
            correct: false,
            feedback: "Absurdalna i śmiertelna propozycja."
          },
          {
            text: "Pozostawienie guza bez leczenia chirurgicznego.",
            correct: false,
            feedback: "Guz rosnąc doprowadzi do wklinowania i śmierci."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Powikłanie wczesne pooperacyjne – Zespół mutyzmu móżdżkowego (CMS)",
        desc: "W 2. dobie po pomyślnej resekcji guza robaka/półkuli móżdżku personel i rodzice zauważają dramatyczną zmianę: dziewczynka, która wczoraj rozmawiała, nagle całkowicie przestała mówić (afazja/mutyzm), stała się skrajnie apatyczna, płaczliwa, nie nawiązuje kontaktu wzrokowego, ma wiotkość mięśni i trudności w połykaniu. Jakie swoiste powikłanie pooperacyjne rozpoznajesz i jak rokujesz?",
        scenario: "W 2. dobie po pomyślnej resekcji guza robaka/półkuli móżdżku personel i rodzice zauważają dramatyczną zmianę: dziewczynka, która wczoraj rozmawiała, nagle całkowicie przestała mówić (afazja/mutyzm), stała się skrajnie apatyczna, płaczliwa, nie nawiązuje kontaktu wzrokowego, ma wiotkość mięśni i trudności w połykaniu. Jakie swoiste powikłanie pooperacyjne rozpoznajesz i jak rokujesz?",
        options: [
          {
            text: "Zespół mutyzmu móżdżkowego (Cerebellar Mutism Syndrome - CMS / zespół tylnego dołu czaszki); występuje u 10–25% dzieci po operacjach w okolicy robaka móżdżku z opóźnieniem 1–3 dni po zabiegu; cechuje się przejściowym całkowitym zanikiem mowy i labilnością emocjonalną; ma charakter samoograniczający się, mowa powraca stopniowo w ciągu kilku tygodni lub miesięcy.",
            correct: true,
            feedback: "Wybitnie! Fascynujące i częste pytanie egzaminacyjne LEK: Zespół mutyzmu móżdżkowego (CMS): rozwija się typowo po 24–48 godzinach wolnego od objawów okresu pooperacyjnego u dzieci po usunięciu guza móżdżku (uszkodzenie szlaku zębato-wzgórzowo-korowego / dentato-thalamo-cortical pathway). Objawia się całkowitym mutyzmem (dziecko rozumie mowę, ale nie wydaje głosu), ciężką labilnością afektywną (napady płaczu, apathy), dysfagią i ataksją. Rokowanie jest na ogół pomyślne – mowa powoli powraca w ciągu miesięcy dzięki neurorehabilitacji i plastyczności mózgu."
          },
          {
            text: "Rozpoznajesz śmierć mózgu i odłączasz pacjentkę od aparatury.",
            correct: false,
            feedback: "Kardynalny błąd śmiertelny: dziecko ma w pełni zachowane odruchy pniowe i jest przytomne, to odwracalny zespół mutyzmu."
          },
          {
            text: "Zalecasz natychmiastowe podcięcie wędzidełka języka.",
            correct: false,
            feedback: "Mutyzm ma podłoże w uszkodzeniu szlaków móżdżkowo-korowych, nie w anatomii języka."
          },
          {
            text: "Dziecko z pewnością udaje niemowę ze złośliwości.",
            correct: false,
            feedback: "CMS to organiczny zespół uszkodzenia szlaków móżdżkowych."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 125: Choroba Kawasakiego
  // ==========================================
  await upgradeCase('125_choroba_kawasakiego.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena na oddziale pediatrycznym – 3-latek z gorączką trwającą 6 dni i 'czerwonymi oczami'",
        desc: "Dyżurujesz na oddziale pediatrycznym. Do szpitala zostaje przyjęty 3-letni chłopiec z powodu wysokiej gorączki do 39.8°C utrzymującej się nieprzerwanie od 6 dni, całkowicie opornej na paracetamol, ibuprofen oraz zaleconą 3 dni temu amoksycylinę. Dziecko jest skrajnie drażliwe, płaczliwe, nie daje się zbadać. W badaniu przedmiotowym stwierdzasz: obustronne, intensywne przekrwienie spojówek gałkowych BEZ wydzieliny ropnej (tzw. 'suche czerwone oczy' z zachowaniem rąbka rogówki wokół tęczówki), wargi suche, spierzchnięte, żywoczerwone z krwawiącymi pionowymi pęknięciami, język żywoczerwony z wybitnie powiększonymi brodawkami ('język malinowy' / truskawkowy), dłonie i stopy obrzęknięte, bolesne, z rumieniem na powierzchni dłoniowej i podeszwowej, polimorficzna plamisto-grudkowa osutka na tułowiu i w okolicy krocza oraz powiększony jednostronny węzeł chłonny szyjny o średnicy 2.2 cm. Jaka jest Twoja wstępna diagnoza?",
        scenario: "Dyżurujesz na oddziale pediatrycznym. Do szpitala zostaje przyjęty 3-letni chłopiec z powodu wysokiej gorączką do 39.8°C utrzymującej się nieprzerwanie od 6 dni, całkowicie opornej na paracetamol, ibuprofen oraz zaleconą 3 dni temu amoksycylinę. Dziecko jest skrajnie drażliwe, płaczliwe, nie daje się zbadać. W badaniu przedmiotowym stwierdzasz: obustronne, intensywne przekrwienie spojówek gałkowych BEZ wydzieliny ropnej (tzw. 'suche czerwone oczy' z zachowaniem rąbka rogówki wokół tęczówki), wargi suche, spierzchnięte, żywoczerwone z krwawiącymi pionowymi pęknięciami, język żywoczerwony z wybitnie powiększonymi brodawkami ('język malinowy' / truskawkowy), dłonie i stopy obrzęknięte, bolesne, z rumieniem na powierzchni dłoniowej i podeszwowej, polimorficzna plamisto-grudkowa osutka na tułowiu i w okolicy krocza oraz powiększony jednostronny węzeł chłonny szyjny o średnicy 2.2 cm. Jaka jest Twoja wstępna diagnoza?",
        options: [
          {
            text: "Rozpoznajesz chorobę Kawasakiego (Kawasaki Disease / zespół węzłowo-śluzówkowo-skórny); ostre martwicze zapalenie naczyń średniego kalibru o szczególnym powinowactwie do tętnic wieńcowych; pacjent spełnia pełne kryteria diagnostyczne AHA.",
            correct: true,
            feedback: "Znakomicie! Klasyczny, podręcznikowy obraz choroby Kawasakiego (najczęstszego nabytego schorzenia serca u dzieci w krajach rozwiniętych): ostre układowe zapalenie naczyń średniego kalibru (głównie tętnic wieńcowych) u dzieci <5. r.ż. Nieleczona prowadzi do powstania tętniaków naczyń wieńcowych i zawału serca. Pacjent spełnia kryterium gorączki >=5 dni oraz 5 z 5 kryteriów klinicznych!"
          },
          {
            text: "Rozpoznajesz płonicę (szkarlatynę) i zmieniasz antybiotyk na wankomycynę.",
            correct: false,
            feedback: "Błąd: przekrwienie spojówek, obrzęki rąk i stóp oraz oporność gorączki na antybiotyki wykluczają prostą płonicę."
          },
          {
            text: "Stawiasz rozpoznanie odry i odsyłasz dziecko do domu.",
            correct: false,
            feedback: "Brak kataru, brak kaszlu (brak triady 3C), zapalenie spojówek w Kawasakim jest nieropne i bez łzawienia."
          },
          {
            text: "Podejrzewasz posocznicę meningokokową z powodu drażliwości.",
            correct: false,
            feedback: "Brak wybroczyn krwotocznych, stan trwa od 6 dni – to typowa choroba Kawasakiego."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Kryteria diagnostyczne klasycznej choroby Kawasakiego wg AHA",
        desc: "Jakie są oficjalne kryteria diagnostyczne klasycznej choroby Kawasakiego ustalone przez American Heart Association (AHA)?",
        scenario: "Jakie są oficjalne kryteria diagnostyczne klasycznej choroby Kawasakiego ustalone przez American Heart Association (AHA)?",
        options: [
          {
            text: "Gorączka trwająca co najmniej 5 DNI oraz obecność co najmniej 4 Z 5 następujących objawów klinicznych: 1) Obustronne nieropne zapalenie spojówek; 2) Zmiany w jamie ustnej i na wargach (język malinowy, spierzchnięte krwawiące usta); 3) Zmiany na dłoniach i stopach (rumień, ciastowaty obrzęk w fazie ostrej, łuszczenie okołopaznokciowe w fazie podostrej); 4) Polimorficzna osutka na tułowiu; 5) Jednostronna niebolesna limfadenopatia szyjna (przynajmniej jeden węzeł >1.5 cm).",
            correct: true,
            feedback: "Doskonale! Pewniak egzaminacyjny LEK: Kryteria AHA (American Heart Association) dla klasycznej choroby Kawasakiego: Warunek konieczny: GORĄCZKA TRWAJĄCA >=5 DNI (zwykle wysoka >39-40°C, słabo reagująca na leki) + co najmniej 4 z 5 cech: C - Conjunctivitis (obustronne nieropne przekrwienie spojówek); R - Rash (polimorficzna osutka); A - Adenopathy (limfadenopatia szyjna jednostronna >1.5 cm); S - Strawberry tongue / lips (język malinowy, zapalenie warg); H - Hands and feet changes (obrzęki i rumień dłoni i stóp). Mnemonik: CRASH and Burn (Burn = 5 dni gorączki)."
          },
          {
            text: "Kryterium jest obecność gorączki trwającej co najmniej 6 miesięcy i ból zęba.",
            correct: false,
            feedback: "Niedorzeczne."
          },
          {
            text: "Konieczna jest obecność bakterii Kawasaki wyhodowanych z krwi.",
            correct: false,
            feedback: "Choroba Kawasakiego ma podłoże immunologiczne, posiewy krwi są jałowe."
          },
          {
            text: "Wystarczy sama obecność kataru i kaszlu.",
            correct: false,
            feedback: "Objawy nieżytu dróg oddechowych nie należą do kryteriów choroby Kawasakiego."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Badania laboratoryjne CITO – 'Pożar zapalny' i spektakularna trombocytoza",
        desc: "Otrzymujesz wyniki laboratoryjne CITO: Krew: CRP 148 mg/l, OB 95 mm/h (ekstremalnie wysokie), Leukocytoza 21.5 G/l z neutrofilią 78%, Hemoglobina 9.8 g/dl (niedokrwistość normocytarna), Płytki krwi (PLT) 480 G/l. Albumina 28 g/l (hipoalbuminemia), ALT 92 IU/l. Badanie ogólne moczu: leukocyty 30–40 wpw przy UJEMNYM posiewie moczu (jałowy ropomocz). Jakie specyficzne zjawisko hematologiczne pojawia się w 2.–3. tygodniu choroby Kawasakiego?",
        scenario: "Otrzymujesz wyniki laboratoryjne CITO: Krew: CRP 148 mg/l, OB 95 mm/h (ekstremalnie wysokie), Leukocytoza 21.5 G/l z neutrofilią 78%, Hemoglobina 9.8 g/dl (niedokrwistość normocytarna), Płytki krwi (PLT) 480 G/l. Albumina 28 g/l (hipoalbuminemia), ALT 92 IU/l. Badanie ogólne moczu: leukocyty 30–40 wpw przy UJEMNYM posiewie moczu (jałowy ropomocz). Jakie specyficzne zjawisko hematologiczne pojawia się w 2.–3. tygodniu choroby Kawasakiego?",
        options: [
          {
            text: "Spektakularna NADPŁYTKOWOŚĆ (trombocytoza reaktywna, PLT często 600–1000 G/l i więcej); rozwija się w fazie podostrej (po 10.–14. dniu od początku gorączki) i w połączeniu z uszkodzeniem śródbłonka naczyń dramatycznie zwiększa ryzyko ZAKRZEPICY W TĘTNIAKACH WIEŃCOWYCH.",
            correct: true,
            feedback: "Wybitnie! Klasyczne zjawisko laboratoryjne choroby Kawasakiego: w ostrej fazie (1. tydzień) płytki mogą być w normie, ale w fazie podostrej (2.–3. tydzień) dochodzi do gigantycznej nadpłytkowości (często >700-1000 G/l!). Ponadto badanie moczu wykazuje jałowy ropomocz (jałowa leukocyturia cewkowa), co bywa błędnie brane za ZUM. Towarzysząca hipoalbuminemia i niedokrwistość odzwierciedlają masywny przesięk naczyniowy i stan zapalny."
          },
          {
            text: "Agammaglobulinemia z zerowym poziomem przeciwciał.",
            correct: false,
            feedback: "W chorobie Kawasakiego układ immunologiczny jest w stanie potężnej nadaktywności."
          },
          {
            text: "Pancytopenia z zanikiem wszystkich linii szpiku.",
            correct: false,
            feedback: "Występuje leukocytoza i trombocytoza, nie pancytopenia."
          },
          {
            text: "Całkowity brak białka CRP w surowicy.",
            correct: false,
            feedback: "CRP i OB są wybitnie wysokie (marker aktywności zapalenia naczyń)."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Najgroźniejsze powikłanie – Tętniaki tętnic wieńcowych (CAA)",
        desc: "Dlaczego choroba Kawasakiego budzi taki lęk u pediatrów i kardiologów dziecięcych? Jakie powikłanie naczyniowe rozwija się u 20–25% nieleczonych dzieci i jakie niesie konsekwencje?",
        scenario: "Dlaczego choroba Kawasakiego budzi taki lęk u pediatrów i kardiologów dziecięcych? Jakie powikłanie naczyniowe rozwija się u 20–25% nieleczonych dzieci i jakie niesie konsekwencje?",
        options: [
          {
            text: "Zapalenie ścian naczyń wieńcowych prowadzące do powstania TĘTNIAKÓW TĘTNIC WIEŃCOWYCH (Coronary Artery Aneurysms - CAA); tętniaki (zwłaszcza olbrzymie >8 mm / Z-score >=10) grożą zakrzepicą, zawałem mięśnia sercowego (zawał serca u małego dziecka!), pęknięciem naczynia i nagłym zgonem sercowym.",
            correct: true,
            feedback: "Doskonale! Pewniak egzaminacyjny LEK: Choroba Kawasakiego jest główną przyczyną nabytej choroby niedokrwiennej serca u dzieci. Zapalenie obejmuje wszystkie warstwy tętnic wieńcowych, niszcząc błonę sprężystą i mięśniówkę, co prowadzi do tętniakowatego poszerzenia naczyń (CAA występuje u niemal co czwartego nieleczonego dziecka!). Powikłania: zakrzepica w świetle tętniaka, zawał serca w mechanizmie niedokrwienia, zaburzenia rytmu i nagły zgon."
          },
          {
            text: "Tętniaki aorty brzusznej o średnicy 20 cm.",
            correct: false,
            feedback: "Choroba dotyczy naczyń wieńcowych, rzadziej tętnic pachowych/biodrowych, a nie samej aorty brzusznej."
          },
          {
            text: "Wrodzona wada zastawki aortalnej z jej brakiem.",
            correct: false,
            feedback: "To wada wrodzona, a choroba Kawasakiego jest chorobą nabytą zapalną."
          },
          {
            text: "Zanik mięśnia sercowego i zamiana w tkankę tłuszczową.",
            correct: false,
            feedback: "To arytmogenna kardiomiopatia prawej komory (ARVC), nie choroba Kawasakiego."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Badanie kardiologiczne z wyboru – Echokardiografia (TTE) i Z-score",
        desc: "Jakie badanie obrazowe należy wykonać w trybie pilnym u każdego dziecka z podejrzeniem choroby Kawasakiego i w jaki sposób ocenia się poszerzenie tętnic wieńcowych?",
        scenario: "Jakie badanie obrazowe należy wykonać w trybie pilnym u każdego dziecka z podejrzeniem choroby Kawasakiego i w jaki sposób ocenia się poszerzenie tętnic wieńcowych?",
        options: [
          {
            text: "ECHOKARDIOGRAFIA przezklatkowa (TTE) z oceną odejścia i przebiegu lewej tętnicy wieńcowej (LCA), gałęzi międzykomorowej przedniej (LAD) i prawej tętnicy wieńcowej (RCA) oraz wyliczeniem wskaźnika Z-score (skorygowanego o pole powierzchni ciała BSA); Z-score >=2.5 definiuje tętniak wieńcowy (Z-score >=10 lub wymiar >8 mm to tętniak olbrzymi).",
            correct: true,
            feedback: "Znakomicie! Standard kardiologiczny: Echo serca (TTE) jest nieinwazyjnym badaniem z wyboru. Ponieważ serce dziecka rośnie, bezwzględne wymiary naczyń w milimetrach są niemiarodajne – stosuje się wskaźnik Z-score (odchylenie standardowe od normy dla danego pola powierzchni ciała BSA): Z-score <2: norma; 2 do 2.5: dylatacja; 2.5 do 5: mały tętniak; 5 do 10: średni tętniak; Z-score >=10 lub średnica >8 mm: tętniak OLBRZYMI (giant aneurysm) o najwyższym ryzyku zawału!"
          },
          {
            text: "Koronarografia inwazyjna z dojścia przez tętnicę promieniową w 1. minucie na SOR.",
            correct: false,
            feedback: "Inwazyjne badanie naczyniowe, echo serca jest w 100% wystarczające i nieinwazyjne."
          },
          {
            text: "Zdjęcie rentgenowskie stóp w projekcji osiowej.",
            correct: false,
            feedback: "RTG stóp nie ocenia naczyń wieńcowych."
          },
          {
            text: "Scyntygrafia kości całego ciała.",
            correct: false,
            feedback: "Brak jakichkolwiek wskazań."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Złoty standard leczenia I rzutu – IVIG + Kwas acetylosalicylowy (ASA)",
        desc: "Rozpoznajesz chorobę Kawasakiego w 6. dobie gorączki. Jaki schemat farmakoterapii pierwszej linii ratujący tętnice wieńcowe wdrażasz natychmiast zgodnie z wytycznymi AHA/PTK?",
        scenario: "Rozpoznajesz chorobę Kawasakiego w 6. dobie gorączki. Jaki schemat farmakoterapii pierwszej linii ratujący tętnice wieńcowe wdrażasz natychmiast zgodnie z wytycznymi AHA/PTK?",
        options: [
          {
            text: "1) IMMUNOGLOBULINY DOŻYLNE (IVIG) w pojedynczym wlewie w wysokiej dawce 2 g/kg mc. podawane w ciągu 10–12 godzin; 2) KWAS ACETYLOSALICYLOWY (ASA / aspiryna) początkowo w dawce przeciwzapalnej (30–50 mg/kg mc./dobę w 4 dawkach), a po ustąpieniu gorączki redukowany do dawki przeciwpłytkowej (3–5 mg/kg mc. raz na dobę).",
            correct: true,
            feedback: "Wybitnie! To jeden z najważniejszych protokołów leczenia na całym świecie i żelazne pytanie LEK: 1) IVIG 2 g/kg mc. w pojedynczym wlewie – wygasza uogólnione zapalenie naczyń; 2) ASA (aspiryna) – choroba Kawasakiego jest JEDYNYM stanem w pediatrii, w którym aspiryna jest BEZWZGLĘDNIE WSKAZANA u małych dzieci pomimo ryzyka zespołu Reye'a! W fazie ostrej podaje się dawkę wysoką przeciwzapalną (w Europie 30-50 mg/kg/d, w USA 80-100 mg/kg/d). Po 48-72h od ustąpienia gorączki przechodzi się na dawkę małą przeciwpłytkową (3-5 mg/kg raz na dobę), utrzymywaną przez 6-8 tygodni (lub bezterminowo przy obecności tętniaków)."
          },
          {
            text: "Glikokortykosteroidy w monoterapii i bezwzględny zakaz podawania IVIG.",
            correct: false,
            feedback: "Kardynalny błąd: monoterapia sterydowa w chorobie Kawasakiego zwiększała w przeszłości ryzyko tętniaków; lekiem I rzutu jest IVIG!"
          },
          {
            text: "Antybiotykoterapia cefepimem przez 3 miesiące.",
            correct: false,
            feedback: "Brak skuteczności, choroba nie ma etiologii bakteryjnej."
          },
          {
            text: "Wyłącznie witamina C w kropelkach.",
            correct: false,
            feedback: "Doprowadzi do rozwoju tętniaków wieńcowych u dziecka."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Kluczowe 'okno terapeutyczne' i oporność na IVIG",
        desc: "Dlaczego wdrożenie leczenia IVIG w ciągu pierwszych 10 DNI choroby ma tak fundamentalne znaczenie oraz jak postępujesz, jeśli gorączka nie ustępuje po 36 godzinach od zakończenia wlewu IVIG (tzw. postać oporna na IVIG)?",
        scenario: "Dlaczego wdrożenie leczenia IVIG w ciągu pierwszych 10 DNI choroby ma tak fundamentalne znaczenie oraz jak postępujesz, jeśli gorączka nie ustępuje po 36 godzinach od zakończenia wlewu IVIG (tzw. postać oporna na IVIG)?",
        options: [
          {
            text: "Podanie IVIG w ciągu pierwszych 10 DNI gorączki redukuje ryzyko tętniaków wieńcowych z 25% do poniżej 3–4%; w przypadku oporności na IVIG (gorączka utrzymuje się >36h po wlewie – u ok. 10–15% dzieci) podaje się DRUGI WLEW IVIG (2 g/kg) lub dołącza dożylne pulsy metyloprednizolonu lub przeciwciało anty-TNF (infliksymab).",
            correct: true,
            feedback: "Doskonale! Złote okno terapeutyczne: podanie IVIG przed 10. dniem gorączki gasi zapalenie naczyniowe, zanim dojdzie do nieodwracalnej martwicy i pęknięcia włókien sprężystych w ścianie tętnic wieńcowych! U 10-20% chorych występuje 'oporność na IVIG' (utrzymywanie się gorączki >38°C po 36h od wlewu) – są to pacjenci o najwyższym ryzyku tętniaków. Standardem ratunkowym jest podanie drugiego wlewu IVIG (2 g/kg), dożylnych pulsów sterydowych (metyloprednizolon 30 mg/kg/d przez 3 dni) lub infliximabu."
          },
          {
            text: "IVIG jest skuteczny tylko wtedy, gdy zostanie podany po 6 miesiącach od początku gorączki.",
            correct: false,
            feedback: "Błąd: po 10 dniach tętniaki są już uformowane i korzyść z IVIG drastycznie spada."
          },
          {
            text: "Oporność na IVIG oznacza konieczność natychmiastowej transplantacji serca.",
            correct: false,
            feedback: "Przesada: oporność leczy się drugim wlewem IVIG lub sterydami/infliksymabem."
          },
          {
            text: "Czas podania leków nie ma żadnego znaczenia dla serca.",
            correct: false,
            feedback: "Zasada wczesnego podania w ciągu 10 dni to dogmat kardiologii dziecięcej."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Faza rekonwalescencji – Łuszczenie okołopaznokciowe i odroczenie szczepień żywych",
        desc: "Po wlewie IVIG i włączeniu ASA gorączka spadła do 36.6°C w ciągu 8 godzin, a stan dziecka spektakularnie się poprawił. Po 2 tygodniach pojawia się charakterystyczne płatowe łuszczenie skóry wokół paznokci rąk i stóp (periungual desquamation). Matka pyta o szczepienia ochronne (w planie było szczepienie MMR). Dlaczego szczepienia szczepionkami żywymi (MMR, ospa wietrzna) muszą zostać ODROCZONE po podaniu IVIG?",
        scenario: "Po wlewie IVIG i włączeniu ASA gorączka spadła do 36.6°C w ciągu 8 godzin, a stan dziecka spektakularnie się poprawił. Po 2 tygodniach pojawia się charakterystyczne płatowe łuszczenie skóry wokół paznokci rąk i stóp (periungual desquamation). Matka pyta o szczepienia ochronne (w planie było szczepienie MMR). Dlaczego szczepienia szczepionkami żywymi (MMR, ospa wietrzna) muszą zostać ODROCZONE po podaniu IVIG?",
        options: [
          {
            text: "Szczepienia szczepionkami żywymi (MMR, ospa wietrzna) muszą zostać ODROCZONE O MINIMUM 11 MIESIĘCY po wlewie IVIG; wysokie miano przeciwciał dawców obecne w preparacie IVIG neutralizuje żywe atenuowane wirusy szczepionkowe, uniemożliwiając wytworzenie poszczepiennej odporności własnej dziecka.",
            correct: true,
            feedback: "Wybitnie! Klasyczny pewniak z wakcynologii i pytań LEK: Preparat dożylnych immunoglobulin (IVIG) zawiera potężną pulę przeciwciał IgG od tysięcy dawców, w tym przeciwciała neutralizujące wirusy odry, świnki, różyczki i ospy wietrznej. Podanie szczepionki żywej w ciągu kilku miesięcy po IVIG skutkowałoby natychmiastową neutralizacją wirusów szczepionkowych przez krążące przeciwciała i brakiem odpowiedzi immunologicznej! Zgodnie z wytycznymi CDC i PSO szczepienia żywe odracza się o DOKŁADNIE 11 MIESIĘCY po podaniu IVIG w dawce 2 g/kg mc. (szczepionki zabite/inaktywowane można podawać bez przeszkód)."
          },
          {
            text: "Szczepienia żywe należy podać natychmiast w podwójnej dawce w dniu wypisu.",
            correct: false,
            feedback: "Przeciwciała z IVIG zneutralizują szczepionkę i dziecko nie wytworzy odporności."
          },
          {
            text: "Choroba Kawasakiego daje dożywotnią odporność na odrę i ospę, więc szczepienia są zbędne.",
            correct: false,
            feedback: "Nieprawda: zakażenie naczyń nie uodparnia przeciw chorobom zakaźnym."
          },
          {
            text: "Odroczenie szczepień wynosi dokładnie 2 dni.",
            correct: false,
            feedback: "Okres półtrwania przeciwciał z dawki 2 g/kg wymaga odroczenia o 11 miesięcy."
          }
        ]
      }
    ];
  });

  console.log("Cases 121-125 upgraded!");
}

run().catch(console.error);

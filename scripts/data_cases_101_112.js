module.exports = [
  {
    "id": 101,
    "filename": "101_celiakia_dziecko.json",
    "dept": "Pediatria",
    "shortTitle": "18-miesięczne dziecko – Przewlekła biegunka tłuszczowa, wzdęty brzuch i spadek masy ciała (Celiakia)",
    "diagnosisTitle": "Choroba trzewna (Celiakia / Coeliac Disease) u małego dziecka",
    "vitals": [
      {
        "label": "HR",
        "val": "118/min",
        "sub": "Lekka tachykardia",
        "status": "ok"
      },
      {
        "label": "BP",
        "val": "90/55 mmHg",
        "sub": "Prawidłowe dla wieku",
        "status": "ok"
      },
      {
        "label": "SpO2",
        "val": "99%",
        "sub": "Prawidłowa",
        "status": "ok"
      },
      {
        "label": "RR",
        "val": "24/min",
        "sub": "Prawidłowy",
        "status": "ok"
      },
      {
        "label": "Temp",
        "val": "36.7°C",
        "sub": "Prawidłowa",
        "status": "ok"
      },
      {
        "label": "Masa ciała",
        "val": "9.1 kg (<3. centyla)",
        "sub": "Ubytek masy ciała",
        "status": "bad"
      }
    ],
    "vitalsObj": {
      "hr": 118,
      "bp": "90/55",
      "spo2": 99,
      "rr": 24,
      "temp": 36.7,
      "gcs": 15
    },
    "story": "Matka zgłasza się do poradni pediatrycznej z 18-miesięcznym chłopcem. Od około 5 miesięcy (od momentu wprowadzenia kaszek pszennych i pieczywa do diety) dziecko oddaje obfite, błyszczące, cuchnące stolce 4-6 razy na dobę. Występuje postępujące zahamowanie przyrostu masy ciała (spadek z 50. centyla poniżej 3. centyla), powiększenie obwodu brzucha ('brzuch żabi'), wychudzenie kończyn z zanikiem pośladków oraz nasilona drażliwość i apatia.",
    "labs": [
      [
        "Hemoglobina (Hb)",
        "9.4 g/dl",
        "norma: 11.0 - 14.0 g/dl (Niedokrwistość mikrocytarna)"
      ],
      [
        "MCV",
        "68 fl",
        "norma: 75 - 87 fl (Mikrocytoza)"
      ],
      [
        "Ferrytyna",
        "6 ng/ml",
        "norma: 15 - 80 ng/ml (Niedobór żelaza)"
      ],
      [
        "Przeciwciała anty-tTG IgA",
        ">120 RU/ml (>10x GGN)",
        "norma: <10 RU/ml (Wybitnie podwyższone)"
      ],
      [
        "Całkowite IgA",
        "0.95 g/l",
        "norma: 0.30 - 1.50 g/l (Prawidłowe - wyklucza niedobór IgA)"
      ],
      [
        "Przeciwciała EMA IgA (2. próbka)",
        "DODATNIE (1:160)",
        "norma: ujemne (Potwierdzenie serologiczne)"
      ],
      [
        "Albuminy",
        "32 g/l",
        "norma: 35 - 50 g/l (Hipoalbuminemia z zaburzeń wchłaniania)"
      ]
    ],
    "steps": [
      {
        "title": "Krok 1: Wstępna ocena kliniczna i identyfikacja zespołu złego wchłaniania",
        "desc": "Dziecko prezentuje klasyczną triadę celiakii niemowląt: przewlekłą biegunkę tłuszczową, zahamowanie rozwoju somatycznego (falling off the growth chart) oraz wzdęty brzuch z zanikiem mięśni pośladkowych. Jaka jest Twoja hipoteza diagnostyczna i pierwszy krok laboratoryjny?",
        "scenario": "Dziecko prezentuje klasyczną triadę celiakii niemowląt: przewlekłą biegunkę tłuszczową, zahamowanie rozwoju somatycznego (falling off the growth chart) oraz wzdęty brzuch z zanikiem mięśni pośladkowych. Jaka jest Twoja hipoteza diagnostyczna i pierwszy krok laboratoryjny?",
        "options": [
          {
            "text": "Wysunięcie podejrzenia choroby trzewnej (celiakii) i oznaczenie przeciwciał przeciwko transglutaminazie tkankowej w klasie IgA (anty-tTG IgA) z jednoczesnym oznaczeniem całkowitego stężenia IgA.",
            "correct": true,
            "feedback": "Doskonale! Zgodnie z wytycznymi ESPGHAN, testem przesiewowym I wyboru u dzieci z podejrzeniem celiakii jest jednoczesne oznaczenie anty-tTG IgA oraz całkowitego IgA (aby wykluczyć wrodzony selektywny niedobór IgA, który zafałszowałby wynik ujemnie)."
          },
          {
            "text": "Natychmiastowe zalecenie diety bezglutenowej na próbę przed pobraniem jakichkolwiek badań serologicznych.",
            "correct": false,
            "feedback": "Błąd sztuki lekarskiej! Wprowadzenie diety bezglutenowej przed zakończeniem pełnej diagnostyki serologicznej prowadzi do zaniku przeciwciał i fałszywie ujemnych wyników, uniemożliwiając późniejsze pewne ustalenie rozpoznania bez prowokacji glutenem."
          },
          {
            "text": "Rozpoznanie alergii na białka mleka krowiego i zalecenie mieszanki elementarnej bez badań.",
            "correct": false,
            "feedback": "Nieprawidłowe. Objawy pojawiły się po włączeniu glutenu (kaszki pszenne) w 13. miesiącu życia, a nie w okresie wyłącznego karmienia mlekiem w pierwszych miesiącach życia."
          },
          {
            "text": "Wykonanie tomografii komputerowej jamy brzusznej z kontrastem w celu wykluczenia chłoniaka jelita.",
            "correct": false,
            "feedback": "Błąd. U 18-miesięcznego dziecka z przewlekłą biegunką nie ma wskazań do obciążania promieniowaniem jonizującym (TK); diagnostyka zaczyna się od serologii z krwi."
          }
        ]
      },
      {
        "title": "Krok 2: Interpretacja wytycznych ESPGHAN 2020 – ścieżka bezbiopsyjna",
        "desc": "Wynik anty-tTG IgA wynosi >120 RU/ml (norma <10, czyli >10-krotność górnej granicy normy - GGN), a całkowite IgA jest w normie. Jak postępujesz zgodnie z aktualnymi wytycznymi ESPGHAN?",
        "scenario": "Wynik anty-tTG IgA wynosi >120 RU/ml (norma <10, czyli >10-krotność górnej granicy normy - GGN), a całkowite IgA jest w normie. Jak postępujesz zgodnie z aktualnymi wytycznymi ESPGHAN?",
        "options": [
          {
            "text": "Pobierasz drugą, niezależną próbkę krwi w celu oznaczenia przeciwciał przeciw endomysium mięśni gładkich w klasie IgA (EMA-IgA); przy wyniku dodatnim odstępujesz od biopsji jelita cienkiego.",
            "correct": true,
            "feedback": "Wybitnie! Zgodnie z wytycznymi ESPGHAN 2020: jeśli anty-tTG IgA ≥10x GGN, a w drugiej, osobno pobranej próbce krwi potwierdzi się obecność EMA-IgA, rozpoznanie celiakii jest w 100% pewne i MOŻNA ZREZYGNOWAĆ z inwazyjnej gastroskopii z biopsją dwunastnicy!"
          },
          {
            "text": "Kwalifikujesz dziecko w trybie pilnym do gastroskopii w znieczuleniu ogólnym z pobraniem co najmniej 4 wycinków z dwunastnicy.",
            "correct": false,
            "feedback": "Niepotrzebne narażanie dziecka na znieczulenie ogólne i inwazyjną procedurę. ESPGHAN dopuszcza ścieżkę bez biopsji ('no-biopsy approach') przy anty-tTG ≥10x GGN i potwierdzeniu EMA-IgA."
          },
          {
            "text": "Zlecasz oznaczenie przeciwciał przeciwko gliadynie (AGA) w klasie IgG.",
            "correct": false,
            "feedback": "Błąd. Przeciwciała AGA (tzw. natywna gliadyna) są przestarzałe i cechują się niską czułością i swoistością; nie są zalecane w aktualnych standardach."
          },
          {
            "text": "Zalecasz test wodorowy z laktozą i odstawienie glutenu.",
            "correct": false,
            "feedback": "Nie. Wtórny niedobór laktazy może towarzyszyć zanikowi kosmków, ale kluczowe jest potwierdzenie rozpoznania celiakii w drugiej próbce (EMA-IgA)."
          }
        ]
      },
      {
        "title": "Krok 3: Rola badań genetycznych HLA-DQ2/DQ8",
        "desc": "Matka pyta, czy w celu uniknięcia biopsji konieczne jest wykonanie testu genetycznego HLA-DQ2 i HLA-DQ8. Jaka jest prawidłowa odpowiedź zgodna z EBM?",
        "scenario": "Matka pyta, czy w celu uniknięcia biopsji konieczne jest wykonanie testu genetycznego HLA-DQ2 i HLA-DQ8. Jaka jest prawidłowa odpowiedź zgodna z EBM?",
        "options": [
          {
            "text": "W wytycznych ESPGHAN 2020 usunięto wymóg badania HLA-DQ2/DQ8 ze ścieżki bezbiopsyjnej – badanie to nie jest już wymagane do potwierdzenia celiakii.",
            "correct": true,
            "feedback": "Świetna wiedza! W wytycznych ESPGHAN 2012 badanie HLA było obowiązkowe, lecz od 2020 roku USUNIĘTO ten wymóg – badanie HLA ma jedynie wysoką ujemną wartość predykcyjną (brak HLA wyklucza celiakię), ale nie jest konieczne do potwierdzenia rozpoznania przy tTG ≥10x GGN i EMA(+)."
          },
          {
            "text": "Tak, bez dodatniego wyniku HLA-DQ2/DQ8 nie wolno wdrożyć diety bezglutenowej.",
            "correct": false,
            "feedback": "Nieprawda. Jest to nieaktualny wymóg z 2012 roku, zniesiony w wytycznych z 2020 r."
          },
          {
            "text": "Badanie genetyczne HLA-DQ2 jest jedynym kryterium pozwalającym rozpoznać celiakię bez diety.",
            "correct": false,
            "feedback": "Błąd kardynalny. HLA-DQ2/DQ8 występuje u ok. 30-40% zdrowej populacji europejskiej – samo nosicielstwo genu nie oznacza choroby!"
          },
          {
            "text": "Zamiast badania HLA należy oznaczyć kariotyp dziecka.",
            "correct": false,
            "feedback": "Brak jakichkolwiek wskazań do oznaczania kariotypu."
          }
        ]
      },
      {
        "title": "Krok 4: Wdrożenie leczenia przyczynowego",
        "desc": "EMA-IgA w drugiej próbce wyszło dodatnie (1:160). Rozpoznanie celiakii zostało bezspornie postawione. Jakie jest jedyne skuteczne leczenie przyczynowe?",
        "scenario": "EMA-IgA w drugiej próbce wyszło dodatnie (1:160). Rozpoznanie celiakii zostało bezspornie postawione. Jakie jest jedyne skuteczne leczenie przyczynowe?",
        "options": [
          {
            "text": "Ścisła, bezwzględna i trwająca przez całe życie dieta bezglutenowa (eliminacja pszenicy, żyta, jęczmienia oraz niecertyfikowanego owsa) pod opieką wykwalifikowanego dietetyka.",
            "correct": true,
            "feedback": "Znakomicie! Jedynym znanym leczeniem celiakii jest ścisła dieta bezglutenowa na całe życie. Nawet śladowe ilości glutenu podtrzymują stan zapalny i atrofie kosmków."
          },
          {
            "text": "Włączenie doustnego budezonidu na 8 tygodni z kontynuacją normalnej diety.",
            "correct": false,
            "feedback": "Błąd. Glikokortykosteroidy są zarezerwowane wyłącznie dla rzadkiego przełomu celiakalnego lub celiakii opornej na leczenie u dorosłych; podstawą jest dieta bezglutenowa."
          },
          {
            "text": "Dieta bezglutenowa stosowana okresowo przez 2 lata, po czym następuje wyleczenie i powrót do glutenu.",
            "correct": false,
            "feedback": "Celiakia jest chorobą autoimmunologiczną uwarunkowaną genetycznie – nie można z niej 'wyrosnąć'. Dieta musi trwać przez całe życie."
          },
          {
            "text": "Stosowanie enzymów rozkładających gluten w tabletkach przed posiłkami z glutenem.",
            "correct": false,
            "feedback": "Preparaty enzymatyczne nie mają udowodnionej skuteczności w celiakii i nie zapobiegają niszczeniu śluzówki jelita."
          }
        ]
      },
      {
        "title": "Krok 5: Wyrównanie powikłań niedożywienia i zespołu złego wchłaniania",
        "desc": "W badaniach wykazano niedokrwistość mikrocytarną (Hb 9.4 g/dl, MCV 68 fl, ferrytyna 6 ng/ml). Jak prowadzisz leczenie wspomagające?",
        "scenario": "W badaniach wykazano niedokrwistość mikrocytarną (Hb 9.4 g/dl, MCV 68 fl, ferrytyna 6 ng/ml). Jak prowadzisz leczenie wspomagające?",
        "options": [
          {
            "text": "Suplementacja żelaza drogą doustną (3–6 mg żelaza elementarnego/kg m.c./dobę) oraz witaminy D3 i kwasu foliowego do czasu odbudowy kosmków jelitowych.",
            "correct": true,
            "feedback": "Prawidłowo! Uszkodzenie kosmków w dwunastnicy (głównym miejscu wchłaniania żelaza) prowadzi do anemii z niedoboru żelaza (sideropenicznej). Wymaga to doustnej suplementacji żelaza oraz witaminy D3."
          },
          {
            "text": "Natychmiastowe przetoczenie koncentratu krwinek czerwonych (KKCz).",
            "correct": false,
            "feedback": "Brak wskazań. Dziecko jest stabilne krążeniowo, nie ma cech niewydolności serca ani głębokiej anemii (Hb <7 g/dl)."
          },
          {
            "text": "Zalecenie podawania preparatów wapnia bez żelaza.",
            "correct": false,
            "feedback": "Niedokrwistość wynika z niedoboru żelaza, a nie wapnia."
          },
          {
            "text": "Podanie dożylne erytropoetyny (EPO).",
            "correct": false,
            "feedback": "Niedokrwistość w celiakii jest niedoborowa, a nie nerkopochodna."
          }
        ]
      },
      {
        "title": "Krok 6: Monitorowanie odpowiedzi na leczenie",
        "desc": "Po jakim czasie od wdrożenia ścisłej diety bezglutenowej oczekujesz ustąpienia objawów klinicznych oraz jak monitorujesz serologię?",
        "scenario": "Po jakim czasie od wdrożenia ścisłej diety bezglutenowej oczekujesz ustąpienia objawów klinicznych oraz jak monitorujesz serologię?",
        "options": [
          {
            "text": "Poprawa nastroju i apetytu następuje w ciągu 1–2 tygodni, normalizacja stolców w ciągu kilku tygodni, a kontrola anty-tTG IgA powinna nastąpić po 6 i 12 miesiącach celem oceny spadku miana przeciwciał.",
            "correct": true,
            "feedback": "Bardzo dobrze! Kliniczna poprawa (apetyt, zachowanie) pojawia się niezwykle szybko, natomiast miano przeciwciał anty-tTG IgA spada stopniowo i służy jako obiektywny marker przestrzegania diety."
          },
          {
            "text": "Przeciwciała anty-tTG IgA powinny zniknąć całkowicie w ciągu 48 godzin od odstawienia glutenu.",
            "correct": false,
            "feedback": "Błąd. Przeciwciała w surowicy mają swój czas półtrwania; normalizacja trwa zwykle od 6 do 12 miesięcy."
          },
          {
            "text": "Konieczne jest wykonywanie cotygodniowej gastroskopii z biopsją jelita.",
            "correct": false,
            "feedback": "W celiakii dziecięcej biopsje kontrolne nie są rutynowo wymagane przy dobrej odpowiedzi klinicznej i serologicznej."
          },
          {
            "text": "Brak poprawy po 3 dniach diety nakazuje zmianę rozpoznania na mukowiscydozę.",
            "correct": false,
            "feedback": "Regeneracja kosmków jelitowych i śluzówki dwunastnicy wymaga tygodni do miesięcy."
          }
        ]
      },
      {
        "title": "Krok 7: Badania przesiewowe u krewnych I stopnia",
        "desc": "Matka pyta, czy jej drugie, 5-letnie bezobjawowe dziecko również powinno zostać przebadane pod kątem celiakii. Jak odpowiadasz?",
        "scenario": "Matka pyta, czy jej drugie, 5-letnie bezobjawowe dziecko również powinno zostać przebadane pod kątem celiakii. Jak odpowiadasz?",
        "options": [
          {
            "text": "Tak, krewni I stopnia pacjenta z celiakią należą do grupy wysokiego ryzyka (częstość celiakii ok. 10%) i powinni mieć wykonane badanie przesiewowe anty-tTG IgA nawet przy braku jakichkolwiek objawów.",
            "correct": true,
            "feedback": "Doskonale! Krewni I stopnia (rodzeństwo, rodzice) oraz pacjenci z zespołem Downa, Turnera, Williamsa, cukrzycą typu 1 i autoimmunologicznym zapaleniem tarczycy stanowią grupę ryzyka i wymagają aktywnego screeningu."
          },
          {
            "text": "Nie, celiakia nie ma żadnego podłoża genetycznego ani rodzinnego.",
            "correct": false,
            "feedback": "Nieprawda. Celiakia jest silnie uwarunkowana genetycznie (antygeny HLA-DQ2/DQ8)."
          },
          {
            "text": "U rodzeństwa należy profilaktycznie od razu wdrożyć dietę bezglutenową bez badań.",
            "correct": false,
            "feedback": "Błąd. U bezobjawowego rodzeństwa najpierw wykonuje się badanie serologiczne (anty-tTG IgA + całk. IgA) na normalnej diecie glutenowej."
          },
          {
            "text": "Badania przesiewowe są zalecane dopiero po osiągnięciu pełnoletności.",
            "correct": false,
            "feedback": "Badanie przesiewowe u rodzeństwa wykonuje się niezwłocznie po rozpoznaniu u pierwszego dziecka."
          }
        ]
      },
      {
        "title": "Krok 8: Podsumowanie dyżurowe i zalecenia długofalowe",
        "desc": "Dziecko wychodzi pod opiekę poradni gastroenterologicznej. Jakie kluczowe punkty edukacyjne przekazujesz rodzicom?",
        "scenario": "Dziecko wychodzi pod opiekę poradni gastroenterologicznej. Jakie kluczowe punkty edukacyjne przekazujesz rodzicom?",
        "options": [
          {
            "text": "Znakowanie produktów symbolem przekreślonego kłosa (<20 ppm glutenu), unikanie zanieczyszczeń krzyżowych w kuchni, okresowa kontrola wzrostu/masy ciała, poziomu żelaza, witaminy D3 i miana anty-tTG.",
            "correct": true,
            "feedback": "Wybitnie! Kompleksowe zalecenia: żywność bezglutenowa (przekreślony kłos, norma Codex Alimentarius <20 ppm), profilaktyka kontaminacji krzyżowej, suplementacja witaminowa oraz stały nadzór auksologiczny."
          },
          {
            "text": "Dozwolone jest spożywanie zwykłego chleba w weekendy jako nagroda.",
            "correct": false,
            "feedback": "Błąd. Nawet drobne odstępstwa od diety powodują nawrót atrofii kosmków i zwiększają ryzyko powikłań odległych (osteoporoza, zaburzenia płodności, chłoniak EATL)."
          },
          {
            "text": "Dziecko nie powinno być szczepione przeciwko pneumokokom ani rotawirusom.",
            "correct": false,
            "feedback": "Dzieci z celiakią powinny być szczepione zgodnie z PSO, a ze względu na ryzyko hiposplenizmu szczepienia przeciw otoczkowcom (pneumokoki) są szczególnie zalecane."
          },
          {
            "text": "Zakaz uprawiania jakiejkolwiek aktywności fizycznej do 18. roku życia.",
            "correct": false,
            "feedback": "Aktywność fizyczna jest w pełni dozwolona i wskazana po ustąpieniu niedożywienia."
          }
        ]
      }
    ],
    "pathoNodes": [
      {
        "badge": "Autoimmunizacja",
        "title": "Interakcja gliadyny z HLA-DQ2/DQ8 i transglutaminazą tkankową (tTG)",
        "short": "Deamidacja peptydów gliadyny przez tTG nasila wiązanie z HLA-DQ2/8 i aktywuje limfocyty CD4+.",
        "detail": "Gluten (mieszanina gliadyn i glutenin) jest bogaty w prolinę i glutaminę, co uniemożliwia jego pełne strawienie w przewodzie pokarmowym. Niestrawione peptydy gliadynowe przenikają przez barierę enterocytów do blaszki właściwej, gdzie enzym transglutaminaza tkankowa 2 (tTG-2) dokonuje ich deamidacji. Ujemnie naładowane peptydy z wysokim powinowactwem wiążą się z rowkiem cząsteczek HLA-DQ2 lub HLA-DQ8 na komórkach prezentujących antygen (APC), co wywołuje kaskadę zapalną z udziałem limfocytów Th1 (IFN-gamma, TNF-alfa).",
        "target": "Transglutaminaza tkankowa (tTG-2) i cząsteczki HLA-DQ2/DQ8",
        "desc": "Deamidacja gliadyny przez tTG2 i prezentacja limfocytom T w kontekście HLA-DQ2/DQ8 prowadzi do zniszczenia enterocytów i atrofii kosmków."
      },
      {
        "badge": "Zniszczenie kosmków",
        "title": "Limfocyty śródnabłonkowe (IEL) i klasyfikacja Marsha",
        "short": "Wzrost odsetka cytotoksycznych IEL (CD8+) prowadzi do apoptozy enterocytów i atrofii kosmków (Marsh 3).",
        "detail": "Aktywowane limfocyty śródnabłonkowe (IELs) wykazujące ekspresję receptorów NKG2D rozpoznają indukowane stresem ligandy (MICA/MICB) na powierzchni enterocytów, wywołując ich masywną apoptozę. Prowadzi to do nacieku zapalnego (Marsh 1), przerostu krypt (Marsh 2) oraz zaniku kosmków jelitowych (Marsh 3a-3c). Utrata kosmków redukuje powierzchnię wchłaniania z 200 m² do zaledwie kilku m².",
        "target": "Szlak cytotoksyczności enterocytów i klasyfikacja Marsha (Marsh 3)",
        "desc": "Cytotoksyczność IEL prowadzi do spłaszczenia kosmków i skrajnego zespołu złego wchłaniania składników odżywczych."
      },
      {
        "badge": "Klinika zespołu",
        "title": "Zaburzenia wchłaniania żelaza, tłuszczów i witamin ADEK",
        "short": "Atrofia dwunastnicy i jelita czczego upośledza absorpcję lipidów i żelaza.",
        "detail": "Zanik kosmków w proksymalnym jelicie cienkim (dwunastnica i jelito czcze) uniemożliwia wchłanianie żelaza (anemia oporna na suplementację doustną), kwasu foliowego oraz kwasów tłuszczowych i witamin rozpuszczalnych w tłuszczach (A, D, E, K). Niewchłonięte kwasy tłuszczowe wiążą wapń, tworząc mydła wapniowe wydalane ze stolcem (biegunka tłuszczowa) oraz prowadzą do hipokalcemii i wtórnej nadczynności przytarczyc.",
        "target": "Zaburzenia wchłaniania w dwunastnicy i jelicie czczym",
        "desc": "Zanik enterocytów rąbka szczoteczkowego uniemożliwia trawienie dwucukrów (wtórna nietolerancja laktozy) i transport żelaza."
      }
    ],
    "dutySummary": {
      "overview": "Celiakia to ogólnoustrojowa choroba autoimmunologiczna wyzwalana przez spożycie glutenu u osób z predyspozycją genetyczną (HLA-DQ2/DQ8), charakteryzująca się enteropatią z zanikiem kosmków, obecnością swoistych przeciwciał (anty-tTG IgA, EMA IgA) oraz szerokim spektrum objawów od biegunek po izolowaną anemię.",
      "diagnostics": "1. Anty-tTG IgA + Całkowite IgA (test I rzutu).<br>2. Gdy anty-tTG ≥10x GGN -> EMA IgA w II niezależnej próbce krwi.<br>3. Przy EMA(+) -> rozpoznanie pewne BEZ biopsji (ESPGHAN 2020).<br>4. Gdy anty-tTG <10x GGN lub niedobór IgA -> gastroskopia z ≥4 biopsjami z dwunastnicy.<br>5. Screening u krewnych I stopnia i w grupach ryzyka (cukrzyca t. 1, tarczyca, z. Downa).",
      "drugsAndDoses": "• Bezwzględna, trwająca całe życie Dieta Bezglutenowa (gluten-free diet <20 ppm).<br>• Siarczan/glukonian żelaza p.o. 3–6 mg Fe elementarnego/kg m.c./dobę w 2–3 dawkach (wyrównanie anemii).<br>• Witamina D3 1000–2000 IU/dobę p.o.<br>• Kwas foliowy 1–5 mg/dobę p.o. przez pierwsze 1–2 miesiące.",
      "procedures": "• Konsultacja z certyfikowanym dietetykiem klinicznym.<br>• Edukacja dotycząca czytania etykiet i unikania zanieczyszczeń krzyżowych.<br>• Wykluczenie biopsji jelitowej w procedurze bezbiopsyjnej (oszczędzenie znieczulenia ogólnego).",
      "monitoring": "• Ocena kliniczna (wzrost, masa ciała, stan skóry, apetyt) co 3–6 miesięcy.<br>• Miano anty-tTG IgA po 6 i 12 miesiącach od włączenia diety (spadek miana świadczy o adherencji).<br>• Morfologia i ferrytyna po 3 miesiącach leczenia żelazem."
    },
    "diffTable": {
      "title": "Diagnostyka różnicowa przewlekłej biegunki i zaburzeń rozwoju u małych dzieci",
      "headers": [
        "Jednostka chorobowa",
        "Przeciwciała anty-tTG / EMA",
        "Badanie stolca / chlorki",
        "Kluczowe cechy różnicujące",
        "Postępowanie"
      ],
      "rows": [
        [
          "Celiakia (Choroba trzewna)",
          "Wybitnie DODATNIE (często >10x GGN)",
          "Biegunka tłuszczowa, chlorki w pocie w normie",
          "Początek po włączeniu glutenu (kaszek), 'brzuch żabi', zanik pośladków, niedokrwistość mikrocytarna",
          "Dieta bezglutenowa na całe życie + suplementacja żelaza"
        ],
        [
          "Mukowiscydoza (Cystic Fibrosis)",
          "Ujemne",
          "Zmniejszona elastaza-1 w stolcu (<200 µg/g), chlorki w pocie >60 mmol/l",
          "Nawracające zapalenia płuc/oskrzeli, kaszel, smółkowy niedrożność jelit w wywiadzie noworodkowym",
          "Enzymy trzustkowe (kreon) + fizjoterapia oddechowa + modulatory CFTR"
        ],
        [
          "Alergia na białka mleka krowiego (ABMK)",
          "Ujemne",
          "Krew i śluz w stolcu, eozynofilia",
          "Początek w pierwszych miesiącach życia przy karmieniu mieszanką mleczną, wyprysk atopowy, kolki",
          "Mieszanka o wysokim stopniu hydrolizy (eHF) lub aminokwasowa (AAF)"
        ],
        [
          "Giardioza (Lamblioza jelitowa)",
          "Ujemne",
          "Cysty / antygeny Giardia lamblia w kale (ELISA)",
          "Wodnisto-tłuszczowe cuchnące stolce, wzdęcia, wywiad żłobkowy lub woda ze studni, eozynofilia",
          "Metronidazol (lub tynidazol / albendazol)"
        ]
      ]
    },
    "lekQuestions": [
      {
        "q": "Zgodnie z aktualnymi wytycznymi Europejskiego Towarzystwa Gastroenterologii, Hepatologii i Żywienia Dzieci (ESPGHAN), rozpoznanie celiakii u dziecka MOŻE zostać postawione bez konieczności wykonywania biopsji jelita cienkiego, jeżeli spełniony jest warunek:",
        "opts": [
          "A) Stężenie przeciwciał anty-tTG IgA wynosi ≥10x GGN oraz w drugiej, osobno pobranej próbce krwi potwierdzono obecność przeciwciał EMA-IgA.",
          "B) Stężenie przeciwciał anty-tTG IgA wynosi ≥2x GGN oraz stwierdzono obecność antygenu HLA-DQ2.",
          "C) Dziecko zgłasza biegunkę, ma wzdęty brzuch i w rodzinie występuje celiakia.",
          "D) Przeciwciała przeciwko deamidowanym peptydom gliadyny (DGP IgG) są dodatnie u każdego dziecka poniżej 2. roku życia.",
          "E) Wykonano test prowokacji glutenem z natychmiastowym nawrotem objawów klinicznych."
        ],
        "correctIdx": 0,
        "exp": "Zgodnie z wytycznymi ESPGHAN (2020), podejście bezbiopsyjne (no-biopsy approach) jest bezpieczne i zalecane, gdy anty-tTG IgA wynosi ≥10x powyżej górnej granicy normy laboratoryjnej (GGN), a w osobno pobranej drugiej próbce krwi wykazano obecność przeciwciał przeciwendomyzjalnych (EMA-IgA). Oznaczenie HLA nie jest już wymagane.",
        "options": [
          "A) Stężenie przeciwciał anty-tTG IgA wynosi ≥10x GGN oraz w drugiej, osobno pobranej próbce krwi potwierdzono obecność przeciwciał EMA-IgA.",
          "B) Stężenie przeciwciał anty-tTG IgA wynosi ≥2x GGN oraz stwierdzono obecność antygenu HLA-DQ2.",
          "C) Dziecko zgłasza biegunkę, ma wzdęty brzuch i w rodzinie występuje celiakia.",
          "D) Przeciwciała przeciwko deamidowanym peptydom gliadyny (DGP IgG) są dodatnie u każdego dziecka poniżej 2. roku życia.",
          "E) Wykonano test prowokacji glutenem z natychmiastowym nawrotem objawów klinicznych."
        ],
        "correct": 0,
        "expl": "Zgodnie z wytycznymi ESPGHAN (2020), podejście bezbiopsyjne (no-biopsy approach) jest bezpieczne i zalecane, gdy anty-tTG IgA wynosi ≥10x powyżej górnej granicy normy laboratoryjnej (GGN), a w osobno pobranej drugiej próbce krwi wykazano obecność przeciwciał przeciwendomyzjalnych (EMA-IgA). Oznaczenie HLA nie jest już wymagane."
      },
      {
        "q": "U 2-letniego chłopca podejrzewano celiakię. Oznaczono anty-tTG IgA, uzyskując wynik ujemny (<2 RU/ml), jednak stężenie całkowitej immunoglobuliny A (całkowite IgA) wynosiło <0.05 g/l (poniżej granicy wykrywalności). Jakie powinno być DALSZE postępowanie diagnostyczne?",
        "opts": [
          "A) Wykluczenie celiakii na podstawie ujemnego miana anty-tTG IgA.",
          "B) Oznaczenie swoistych przeciwciał w klasie IgG: anty-tTG IgG oraz przeciw deamidowanym peptydom gliadyny (DGP IgG).",
          "C) Natychmiastowe wdrożenie diety bezglutenowej bez dalszych testów.",
          "D) Wykonanie testu wodorowego z laktulozą w kierunku SIBO.",
          "E) Podanie domięśniowe preparatu immunoglobulin i powtórzenie anty-tTG IgA."
        ],
        "correctIdx": 1,
        "exp": "U pacjentów z selektywnym niedoborem IgA (częstym u chorych na celiakię, 10-15x częstszym niż w populacji ogólnej), wszystkie testy oparte na klasie IgA dają wyniki fałszywie ujemne! W takim przypadku diagnostykę serologiczną opiera się na przeciwciałach w klasie IgG: anty-tTG IgG lub DGP IgG.",
        "options": [
          "A) Wykluczenie celiakii na podstawie ujemnego miana anty-tTG IgA.",
          "B) Oznaczenie swoistych przeciwciał w klasie IgG: anty-tTG IgG oraz przeciw deamidowanym peptydom gliadyny (DGP IgG).",
          "C) Natychmiastowe wdrożenie diety bezglutenowej bez dalszych testów.",
          "D) Wykonanie testu wodorowego z laktulozą w kierunku SIBO.",
          "E) Podanie domięśniowe preparatu immunoglobulin i powtórzenie anty-tTG IgA."
        ],
        "correct": 1,
        "expl": "U pacjentów z selektywnym niedoborem IgA (częstym u chorych na celiakię, 10-15x częstszym niż w populacji ogólnej), wszystkie testy oparte na klasie IgA dają wyniki fałszywie ujemne! W takim przypadku diagnostykę serologiczną opiera się na przeciwciałach w klasie IgG: anty-tTG IgG lub DGP IgG."
      }
    ],
    "flashcards": [
      {
        "cat": "Pediatria",
        "q": "Jaki jest test przesiewowy I rzutu w kierunku celiakii u dzieci?",
        "a": "Przeciwciała przeciwko transglutaminazie tkankowej w klasie IgA (anty-tTG IgA) z jednoczesnym oznaczeniem całkowitego stężenia IgA."
      },
      {
        "cat": "Pediatria",
        "q": "Kiedy wg wytycznych ESPGHAN 2020 można rozpoznać celiakię u dziecka BEZ biopsji dwunastnicy?",
        "a": "Gdy anty-tTG IgA ≥10x GGN oraz obecność przeciwciał EMA-IgA w drugiej, niezależnie pobranej próbce krwi."
      },
      {
        "cat": "Pediatria",
        "q": "Jakie przeciwciała należy oznaczyć przy podejrzeniu celiakii u dziecka ze współistniejącym selektywnym niedoborem IgA?",
        "a": "Przeciwciała w klasie IgG: anty-tTG IgG oraz anty-DGP IgG (przeciw deamidowanym peptydom gliadyny)."
      },
      {
        "cat": "Pediatria",
        "q": "Czy nosicielstwo antygenów HLA-DQ2 lub HLA-DQ8 potwierdza celiakię?",
        "a": "NIE (występują u 30-40% zdrowych ludzi). Mają one wysoką ujemną wartość predykcyjną – ich brak praktycznie wyklucza celiakię."
      },
      {
        "cat": "Pediatria",
        "q": "Jaka jest norma zawartości glutenu w certyfikowanych produktach bezglutenowych (symbol przekreślonego kłosa)?",
        "a": "<20 ppm (20 mg glutenu na 1 kg produktu spożywczego) wg standardu Codex Alimentarius."
      }
    ]
  },
  {
    "id": 102,
    "filename": "102_abmk_niemowle.json",
    "dept": "Pediatria",
    "shortTitle": "3-miesięczne niemowlę – Krew i śluz w stolcu, kolki oraz wyprysk atopowy (Alergia na białka mleka krowiego / ABMK)",
    "diagnosisTitle": "Alergia na białka mleka krowiego (ABMK / CMPA) – postać żołądkowo-jelitowa (alergiczne zapalenie prostnicy i okrężnicy)",
    "vitals": [
      {
        "label": "HR",
        "val": "134/min",
        "sub": "Prawidłowe dla niemowlęcia",
        "status": "ok"
      },
      {
        "label": "BP",
        "val": "82/48 mmHg",
        "sub": "Prawidłowe",
        "status": "ok"
      },
      {
        "label": "SpO2",
        "val": "99%",
        "sub": "Prawidłowa",
        "status": "ok"
      },
      {
        "label": "RR",
        "val": "32/min",
        "sub": "Prawidłowy",
        "status": "ok"
      },
      {
        "label": "Temp",
        "val": "36.8°C",
        "sub": "Prawidłowa",
        "status": "ok"
      },
      {
        "label": "Masa ciała",
        "val": "5.8 kg (50. centyl)",
        "sub": "Rozwój somatyczny zachowany",
        "status": "ok"
      }
    ],
    "vitalsObj": {
      "hr": 134,
      "bp": "82/48",
      "spo2": 99,
      "rr": 32,
      "temp": 36.8,
      "gcs": 15
    },
    "story": "Rodzice zgłaszają się na wizytę z 3-miesięcznym niemowlęciem karmionym mlekiem modyfikowanym standardowym. Od 3 tygodni w stolcach pojawiają się widoczne pasemka świeżej krwi i obfity śluz. Dziecko jest niespokojne podczas karmień, pręży się, ma nasilone kolki gazowe, a na policzkach i w zgięciach łokciowych widoczne są sączące zmiany o charakterze wyprysku atopowego. Stan ogólny dziecka jest dobry, przybiera na wadze prawidłowo.",
    "labs": [
      [
        "Hemoglobina (Hb)",
        "10.8 g/dl",
        "norma: 10.0 - 13.0 g/dl (Prawidłowa fizjologiczna)"
      ],
      [
        "Leukocyty (WBC)",
        "9.8 G/l",
        "norma: 6.0 - 14.0 G/l"
      ],
      [
        "Eozynofile",
        "7.5%",
        "norma: 1.0 - 5.0% (Lekka eozynofilia obwodowa)"
      ],
      [
        "Płytki krwi (PLT)",
        "380 G/l",
        "norma: 200 - 450 G/l (Wyklucza małopłytkowość)"
      ],
      [
        "CRP",
        "<1.0 mg/l",
        "norma: <5.0 mg/l (Brak cech infekcji bakteryjnej)"
      ],
      [
        "Kalprotektyna w kale",
        "180 µg/g",
        "norma: <50 µg/g (Umiarkowany stan zapalny śluzówki jelita)"
      ],
      [
        "Posiew stolca",
        "Fizjologiczna flora jelitowa",
        "norma: ujemny w kierunku Salmonella/Shigella/Campylobacter"
      ]
    ],
    "steps": [
      {
        "title": "Krok 1: Wstępna ocena obecności krwi w stolcu niemowlęcia",
        "desc": "Świeża krew (hematochezia) i śluz w stolcu u dobrze rozwijającego się niemowlęcia bez gorączki najczęściej wskazują na alergiczne zapalenie prostnicy i okrężnicy wywołane białkami pokarmowymi (FPIAP - food protein-induced allergic proctocolitis). Jakie jest Twoje natychmiastowe postępowanie diagnostyczne?",
        "scenario": "Świeża krew (hematochezia) i śluz w stolcu u dobrze rozwijającego się niemowlęcia bez gorączki najczęściej wskazują na alergiczne zapalenie prostnicy i okrężnicy wywołane białkami pokarmowymi (FPIAP - food protein-induced allergic proctocolitis). Jakie jest Twoje natychmiastowe postępowanie diagnostyczne?",
        "options": [
          {
            "text": "Wykluczenie przyczyn infekcyjnych (posiew kału) i chirurgicznych (szczelina odbytu, wgłobienie) oraz postawienie roboczego rozpoznania ABMK.",
            "correct": true,
            "feedback": "Znakomicie! Przed ustaleniem rozpoznania ABMK należy dokładnie obejrzeć odbyt w celu wykluczenia szczeliny odbytu oraz wykluczyć infekcje jelitowe."
          },
          {
            "text": "Natychmiastowe skierowanie dziecka na pilną rektosigmoidoskopię z biopsją w znieczuleniu.",
            "correct": false,
            "feedback": "Błąd. U stabilnego niemowlęcia z podejrzeniem FPIAP endoskopia jest przeciwwskazana i niepotrzebna; diagnostyka opiera się na próbie eliminacji i prowokacji."
          },
          {
            "text": "Zlecenie testów skórnych punktowych (Prick-test) i sIgE w celu wykluczenia alergii.",
            "correct": false,
            "feedback": "FPIAP jest w większości postacią NIEZALEŻNĄ od IgE (nie-IgE-zależną), dlatego testy sIgE i punktowe skórne są ujemne u ponad 80% niemowląt!"
          },
          {
            "text": "Zalecenie podawania naparu z rumianku i węgla aktywowanego.",
            "correct": false,
            "feedback": "Brak jakiejkolwiek skuteczności medycznej, ryzyko alergizacji i zaburzeń wchłaniania."
          }
        ]
      },
      {
        "title": "Krok 2: Wdrożenie próby eliminacyjnej",
        "desc": "Dziecko jest karmione mlekiem modyfikowanym standardowym. Jaki preparat mlekozastępczy jest preparatem I rzutu w leczeniu ABMK wg wytycznych ESPGHAN i Polskiego Towarzystwa Pediatrycznego?",
        "scenario": "Dziecko jest karmione mlekiem modyfikowanym standardowym. Jaki preparat mlekozastępczy jest preparatem I rzutu w leczeniu ABMK wg wytycznych ESPGHAN i Polskiego Towarzystwa Pediatrycznego?",
        "options": [
          {
            "text": "Mieszanka o wysokim (znacznym) stopniu hydrolizy kazeiny lub białek serwatkowych (eHF – extensively hydrolysed formula) na okres 2–4 tygodni.",
            "correct": true,
            "feedback": "Dokładnie tak! Preparatem I wyboru u niemowląt z łagodną lub umiarkowaną ABMK karmionych sztucznie jest hydrolizat o wysokim stopniu hydrolizy (eHF), skuteczny u >90% dzieci."
          },
          {
            "text": "Mleko hipoalergiczne typu HA (częściowy hydrolizat białka).",
            "correct": false,
            "feedback": "Błąd kardynalny! Mleka typu HA (częściowe hydrolizaty) służą wyłącznie do profilaktyki u dzieci zdrowych z grupy ryzyka, są bezwzględnie PRZECIWWSKAZANE w leczeniu stwierdzonej ABMK, gdyż zawierają duże fragmenty antygenowe wywołujące reakcję!"
          },
          {
            "text": "Mleko kozie lub sojowe jako naturalny zamiennik mleka krowiego.",
            "correct": false,
            "feedback": "Błąd! Mleko kozie i owcze wykazuje ponad 90% reaktywności krzyżowej z mlekiem krowim. Mleko sojowe nie jest zalecane przed 6. miesiącem życia ze względu na fitoestrogeny i ryzyko krzyżowej alergizacji."
          },
          {
            "text": "Mieszanka elementarna (aminokwasowa – AAF) jako lek I rzutu u każdego dziecka.",
            "correct": false,
            "feedback": "Mieszanki aminokwasowe (AAF) są preparatami II rzutu, zarezerwowanymi dla ciężkiej postaci (wstrząs anafilaktyczny, zespół FPIES z odwodnieniem, zahamowanie wzrostu) lub braku tolerancji eHF."
          }
        ]
      },
      {
        "title": "Krok 3: Postępowanie w przypadku karmienia piersią",
        "desc": "Matka pyta, co należałoby zrobić, gdyby dziecko było karmione wyłącznie piersią. Jaka jest prawidłowa strategia postępowania wg ESPGHAN?",
        "scenario": "Matka pyta, co należałoby zrobić, gdyby dziecko było karmione wyłącznie piersią. Jaka jest prawidłowa strategia postępowania wg ESPGHAN?",
        "options": [
          {
            "text": "Kontynuacja karmienia piersią z bezwzględnym wyeliminowaniem z diety matki mleka krowiego i jego przetworów oraz suplementacją wapnia (1000 mg/d) i witaminy D3 u matki.",
            "correct": true,
            "feedback": "Znakomicie! Zawsze dążymy do utrzymania karmienia piersią. Matka stosuje dietę bezmleczną przez 2–4 tygodnie, pamiętając o suplementacji wapnia."
          },
          {
            "text": "Natychmiastowe odstawienie dziecka od piersi i przejście na mieszankę modyfikowaną.",
            "correct": false,
            "feedback": "Błąd! Karmienie naturalne jest optymalnym sposobem żywienia i nie należy go przerywać; wystarczy dieta eliminacyjna u matki."
          },
          {
            "text": "Zalecenie podawania matce leków przeciwhistaminowych bez modyfikacji diety.",
            "correct": false,
            "feedback": "Leki przeciwhistaminowe nie zapobiegają przenikaniu białek mleka krowiego do pokarmu matki."
          },
          {
            "text": "Pasteryzacja odciąganego pokarmu kobiecego przed każdym karmieniem.",
            "correct": false,
            "feedback": "Brak jakiegokolwiek uzasadnienia klinicznego."
          }
        ]
      },
      {
        "title": "Krok 4: Czas oczekiwania na ustąpienie objawów",
        "desc": "Po jakim czasie od włączenia mieszanki eHF u niemowlęcia powinno nastąpić ustąpienie krwawienia ze stolca i złagodzenie objawów brzuszkowych?",
        "scenario": "Po jakim czasie od włączenia mieszanki eHF u niemowlęcia powinno nastąpić ustąpienie krwawienia ze stolca i złagodzenie objawów brzuszkowych?",
        "options": [
          {
            "text": "Ustąpienie świeżej krwi ze stolca następuje zwykle w ciągu 48–72 godzin, a całkowita normalizacja stolców i wyciszenie zapalenia jelita w ciągu 2–4 tygodni.",
            "correct": true,
            "feedback": "Prawidłowo! Widoczne krwawienie ustępuje szybko (do 3 dni), natomiast pełna regeneracja śluzówki i ustąpienie zmian skórnych wymaga do 4 tygodni."
          },
          {
            "text": "Krew powinna ustąpić w ciągu 1 godziny po pierwszym podaniu butelki.",
            "correct": false,
            "feedback": "Nierealne fizjologicznie – treść jelitowa i śluzówka potrzebują minimum kilkudziesięciu godzin na ewakuację antygenu."
          },
          {
            "text": "Objawy ustępują dopiero po ukończeniu 3. roku życia.",
            "correct": false,
            "feedback": "Błędne założenie. Poprawa po eliminacji antygenu jest szybka."
          },
          {
            "text": "Krew w stolcu ulega nasileniu przez pierwsze 2 tygodnie w wyniku zjawiska lizy.",
            "correct": false,
            "feedback": "Brak takiego zjawiska; nasilenie krwawienia wymagałoby weryfikacji rozpoznania."
          }
        ]
      },
      {
        "title": "Krok 5: Złoty standard potwierdzenia rozpoznania – próba prowokacji",
        "desc": "Po 4 tygodniach stosowania eHF krew i śluz całkowicie zniknęły, a dziecko jest spokojne. Co stanowi 'złoty standard' ostatecznego potwierdzenia ABMK wg EBM?",
        "scenario": "Po 4 tygodniach stosowania eHF krew i śluz całkowicie zniknęły, a dziecko jest spokojne. Co stanowi 'złoty standard' ostatecznego potwierdzenia ABMK wg EBM?",
        "options": [
          {
            "text": "Próba ponownego wprowadzenia białka mleka krowiego (doustna próba prowokacji) – nawrót objawów potwierdza rozpoznanie, a ich brak wyklucza ABMK.",
            "correct": true,
            "feedback": "Wybitnie! Złotym standardem w diagnostyce nie-IgE-zależnej ABMK jest ustąpienie objawów w próbie eliminacji oraz ich nawrót po ponownej prowokacji pokarmowej białkiem mleka krowiego."
          },
          {
            "text": "Wykonanie tomografii komputerowej jamy brzusznej.",
            "correct": false,
            "feedback": "Badanie całkowicie nieprzydatne w diagnostyce alergii pokarmowej."
          },
          {
            "text": "Oznaczenie przeciwciał przeciwjądrowych ANA w mianie >1:160.",
            "correct": false,
            "feedback": "ANA nie ma związku z alergią na białka mleka krowiego."
          },
          {
            "text": "Oznaczenie całkowitej immunoglobuliny E (IgE) w surowicy.",
            "correct": false,
            "feedback": "Całkowite IgE jest parametrem nieswoistym i w postaci nie-IgE-zależnej pozostaje w normie."
          }
        ]
      },
      {
        "title": "Krok 6: Kiedy należy sięgnąć po mieszankę aminokwasową (AAF)?",
        "desc": "U dziecka z podejrzeniem ABMK po 4 tygodniach stosowania eHF nadal utrzymują się smużki krwi w stolcu i spadek masy ciała. Jaki jest kolejny krok?",
        "scenario": "U dziecka z podejrzeniem ABMK po 4 tygodniach stosowania eHF nadal utrzymują się smużki krwi w stolcu i spadek masy ciała. Jaki jest kolejny krok?",
        "options": [
          {
            "text": "Zamiana hydrolizatu znacznego stopnia (eHF) na mieszankę czystych syntetycznych aminokwasów (AAF – amino acid-based formula).",
            "correct": true,
            "feedback": "Doskonale! Około 5-10% niemowląt z cięższą postacią ABMK nie toleruje nawet drobnych peptydów w eHF i wymaga mieszanki aminokwasowej (AAF), która jest całkowicie nieimmunogenna."
          },
          {
            "text": "Włączenie doustnego metronidazolu na 6 miesięcy.",
            "correct": false,
            "feedback": "Brak wskazań do przewlekłej antybiotykoterapii."
          },
          {
            "text": "Powrót do standardowego mleka krowiego modyfikowanego.",
            "correct": false,
            "feedback": "Pogorszy stan zapalny i nasili utratę krwi."
          },
          {
            "text": "Wykonanie pilnej kolostomii odbarczającej.",
            "correct": false,
            "feedback": "Zabieg okaleczający, całkowicie bezzasadny."
          }
        ]
      },
      {
        "title": "Krok 7: Naturalna historia choroby i nabywanie tolerancji",
        "desc": "Rodzice martwią się, czy ich dziecko będzie musiało unikać nabiału przez całe dorosłe życie. Jakie rokowanie przedstawiasz w oparciu o statystyki kliniczne?",
        "scenario": "Rodzice martwią się, czy ich dziecko będzie musiało unikać nabiału przez całe dorosłe życie. Jakie rokowanie przedstawiasz w oparciu o statystyki kliniczne?",
        "options": [
          {
            "text": "Rokowanie jest doskonałe: ok. 80–90% dzieci z nie-IgE zależną ABMK nabywa pełną tolerancję kliniczną na białka mleka krowiego do 1.–3. roku życia.",
            "correct": true,
            "feedback": "Bardzo pokrzepiająca i prawdziwa informacja! Alergia na białka mleka krowiego u niemowląt ma charakter przejściowy – większość dzieci 'wyrasta' z niej w ciągu pierwszych 2-3 lat życia."
          },
          {
            "text": "ABMK jest chorobą nieuleczalną i trwa do końca życia u 100% chorych.",
            "correct": false,
            "feedback": "Mylisz ABMK z celiakią. W celiakii dieta trwa całe życie, w ABMK tolerancja powraca u większości dzieci."
          },
          {
            "text": "Tolerancja pojawia się dopiero w okresie dojrzewania płciowego.",
            "correct": false,
            "feedback": "Większość dzieci toleruje mleko już w wieku przedszkolnym."
          },
          {
            "text": "Nabycie tolerancji jest niemożliwe bez odczulania podjęzykowego.",
            "correct": false,
            "feedback": "Tolerancja w FPIAP pojawia się spontanicznie drogą naturalnego dojrzewania układu odpornościowego GALT."
          }
        ]
      },
      {
        "title": "Krok 8: Podsumowanie dyżurowe i plan ponownej oceny",
        "desc": "Kończysz konsultację. Jaki jest plan monitorowania i kiedy planujesz pierwszą próbę prowokacji mlekiem po okresie eliminacji?",
        "scenario": "Kończysz konsultację. Jaki jest plan monitorowania i kiedy planujesz pierwszą próbę prowokacji mlekiem po okresie eliminacji?",
        "options": [
          {
            "text": "Stosowanie eHF przez co najmniej 6 miesięcy lub do ukończenia 9.–12. miesiąca życia, po czym wykonanie kontrolowanej próby prowokacji w celu oceny nabycia tolerancji.",
            "correct": true,
            "feedback": "Wybitnie! Standardem jest utrzymanie diety eliminacyjnej przez 6 miesięcy (lub do 9-12 m.ż.), a następnie ponowna próba prowokacji pod nadzorem lekarskim (np. drabina mleczna - milk ladder)."
          },
          {
            "text": "Wykonywanie próby prowokacji co 2 dni w domu rodziców.",
            "correct": false,
            "feedback": "Zbyt częsta prowokacja nie pozwala na wygojenie jelita."
          },
          {
            "text": "Przejście od razu na mleko krowie niepasteryzowane ze wsi.",
            "correct": false,
            "feedback": "Niepasteryzowane mleko stwarza dodatkowe ryzyko zakażeń odzwierzęcych (listerioza, campylobacter)."
          },
          {
            "text": "Podawanie probiotyków wieloszczepowych w megadawkach bez diety.",
            "correct": false,
            "feedback": "Probiotyki mogą stanowić terapię uzupełniającą, ale nie zastępują eliminacji antygenu."
          }
        ]
      }
    ],
    "pathoNodes": [
      {
        "badge": "Reakcja immunologiczna",
        "title": "Alergiczne zapalenie prostnicy i okrężnicy (FPIAP)",
        "short": "Reakcja nie-IgE-zależna z udziałem limfocytów T i naciekiem eozynofilowym w błonie śluzowej jelita grubego.",
        "detail": "Główne alergeny mleka krowiego to kazeina (frakcje alfa-s1, alfa-s2, beta, kappa) oraz białka serwatkowe (beta-laktoglobulina, alfa-laktoalbumina). W postaci jelitowej (FPIAP) patomechanizm opiera się na reakcji komórkowej (nie-IgE-zależnej). Antygeny mleka wywołują aktywację limfocytów T w kępkach Peyera, uwalnianie cytokin prozapalnych (IL-4, IL-5, TNF) oraz rekrutację eozynofilów do błony śluzowej prostnicy i esicy, co prowadzi do mikronadżerek i krwawienia.",
        "target": "Frakcje białek mleka krowiego (kazeina i beta-laktoglobulina) i naciek eozynofilowy",
        "desc": "Brak przeciwciał IgE – reakcja komórkowa z eozynofilią tkankową dystalnego odcinka jelita grubego."
      },
      {
        "badge": "Niedojrzałość bariery",
        "title": "Niedojrzałość bariery jelitowej niemowlęcia",
        "short": "Wysoka przepuszczalność ścisłych złączy (tight junctions) w pierwszych miesiącach życia ułatwia przenikanie nienaruszonych białek.",
        "detail": "U noworodków i wczesnych niemowląt bariera jelitowa wykazuje fizjologiczną niedojrzałość: niższe wydzielanie kwasu solnego w żołądku, mniejsza aktywność pepsyny i proteaz trzustkowych oraz luźniejsze połączenia zamykające (zonula occludens). Pozwala to nienaruszonym cząsteczkom makroprotein na penetrację do tkanki limfatycznej GALT.",
        "target": "Bariera jelitowa i złącza zamykające enterocytów",
        "desc": "Zwiększona przepuszczalność błony śluzowej sprzyja prezentacji antygenu komórkom dendrytycznym."
      },
      {
        "badge": "Nabywanie tolerancji",
        "title": "Indukcja tolerancji immunologicznej przez limfocyty Treg",
        "short": "Dojrzewanie układu GALT i namnażanie limfocytów regulatorowych Treg (FoxP3+) prowadzi do wygaszenia nadwrażliwości.",
        "detail": "W miarę dojrzewania układu pokarmowego i kolonizacji przez prawidłowy mikrobiom jelitowy dochodzi do indukcji anergi klonalnej oraz namnażania antygenowo swoistych limfocytów regulatorowych Treg (CD4+CD25+FoxP3+), produkujących IL-10 i TGF-beta. Skutkuje to wygaszeniem reakcji zapalnej i uzyskaniem pełnej tolerancji doustnej u ponad 85% dzieci w wieku 12-36 miesięcy.",
        "target": "Limfocyty regulatorowe Treg i produkcja IL-10 / TGF-beta",
        "desc": "Dojrzewanie układu odpornościowego prowadzi do spontanicznego wyzdrowienia u większości dzieci."
      }
    ],
    "dutySummary": {
      "overview": "Alergia na białka mleka krowiego (ABMK) u niemowląt najczęściej przebiega pod postacią alergicznego zapalenia prostnicy i okrężnicy (FPIAP - nie-IgE-zależnego), objawiającego się krwią i śluzem w stolcu u dobrze rozwijającego się niemowlęcia, ustępującego po eliminacji białek mleka krowiego.",
      "diagnostics": "1. Obraz kliniczny: smużki krwi w stolcu, śluz, kolki, bez gorączki i bez cech infekcji.<br>2. Oglądanie odbytu (wykluczenie szczeliny).<br>3. Brak rutynowej potrzeby badań IgE/testów skórnych w postaci FPIAP.<br>4. Rozpoznanie potwierdza: próba eliminacji (2–4 tyg.) + doustna próba prowokacji (złoty standard).",
      "drugsAndDoses": "• Mieszanka o wysokim stopniu hydrolizy (eHF - Bebilon Pepti, Nutramigen LGG) jako I rzut u karmionych sztucznie.<br>• Przy braku poprawy po eHF: mieszanka aminokwasowa (AAF - Neocate LCP, Nutramigen Puramino).<br>• Karmienie piersią: eliminacja mleka i przetworów z diety matki + suplementacja u matki Ca 1000 mg/d i wit. D3.<br>• BEZWZGLĘDNY ZAKAZ mlek typu HA, sojowych (<6 m.ż.) i kozich/owczych.",
      "procedures": "• Edukacja rodziców w zakresie prawidłowego przygotowywania mieszanki leczniczej.<br>• Monitorowanie przyrostów masy ciała na siatkach centylowych WHO.<br>• Kontrolowana próba prowokacji po 6 miesiącach diety eliminacyjnej.",
      "monitoring": "• Ocena ustąpienia krwawienia po 72 godzinach.<br>• Ocena przyrostu masy ciała po 2 i 4 tygodniach.<br>• Próba prowokacji pokarmowej w 9.–12. miesiącu życia."
    },
    "diffTable": {
      "title": "Diagnostyka różnicowa krwi w stolcu u niemowlęcia",
      "headers": [
        "Jednostka chorobowa",
        "Stan ogólny / Masa ciała",
        "Charakter krwawienia",
        "Dodatkowe objawy",
        "Postępowanie z wyboru"
      ],
      "rows": [
        [
          "ABMK (FPIAP - postać jelitowa)",
          "Dobry, prawidłowy przyrost mc.",
          "Pasemka/smużki świeżej krwi zmieszane ze śluzem",
          "Kolki, niepokój, często atopowe zapalenie skóry (AZS)",
          "Hydrolizat znacznego stopnia (eHF) lub dieta eliminacyjna matki"
        ],
        [
          "Szczelina odbytu (Fissura ani)",
          "Bardzo dobry",
          "Krople świeżej krwi na zewnątrz uformowanego stolca",
          "Ból przy defekacji, widoczne pęknięcie na godz. 6 lub 12",
          "Miejscowo maści natłuszczające, pielęgnacja, zmiękczanie stolca"
        ],
        [
          "Wgłobienie jelita (Intussusceptio)",
          "Ciężki / wstrząsowy",
          "Stolec o wyglądzie 'galaretki porzeczkowej' (późny objaw)",
          "Napadowy kolkowy ból z podkurczaniem nóżek, bladość, wymioty",
          "Pilne USG ('tarcza strzelnicza') + odwgłobienie pneumatyczne"
        ],
        [
          "Infekcyjne zapalenie jelit (Salmonella/Campylobacter)",
          "Umiarkowany / zły",
          "Krwisto-śluzowa obfita biegunka",
          "Gorączka, odwodnienie, wysokie CRP i leukocytoza",
          "Nawadnianie, posiew kału, antybiotykoterapia we wskazaniach"
        ]
      ]
    },
    "lekQuestions": [
      {
        "q": "Lekiem I rzutu w leczeniu żywieniowym stwierdzonej alergii na białka mleka krowiego o łagodnym lub umiarkowanym przebiegu u 2-miesięcznego niemowlęcia karmionego sztucznie jest:",
        "opts": [
          "A) Mieszanka o wysokim stopniu hydrolizy kazeiny lub serwatki (eHF).",
          "B) Częściowy hydrolizat białka serwatkowego (mieszanka typu HA).",
          "C) Mleko sojowe wzbogacane w wapń i witaminy.",
          "D) Mleko kozie modyfikowane ze względu na mniejszą zawartość laktozy.",
          "E) Woda ryżowa z dodatkiem elektrolitów i glukozy."
        ],
        "correctIdx": 0,
        "exp": "Zgodnie z wytycznymi ESPGHAN i polskich ekspertów, u niemowląt karmionych sztucznie z łagodną do umiarkowanej postacią ABMK lekiem I rzutu jest mieszanka o wysokim (znacznym) stopniu hydrolizy białka (eHF). Mieszanki HA są zakazane w terapii (służą tylko do profilaktyki), a mleka sojowe i kozie nie są zalecane.",
        "options": [
          "A) Mieszanka o wysokim stopniu hydrolizy kazeiny lub serwatki (eHF).",
          "B) Częściowy hydrolizat białka serwatkowego (mieszanka typu HA).",
          "C) Mleko sojowe wzbogacane w wapń i witaminy.",
          "D) Mleko kozie modyfikowane ze względu na mniejszą zawartość laktozy.",
          "E) Woda ryżowa z dodatkiem elektrolitów i glukozy."
        ],
        "correct": 0,
        "expl": "Zgodnie z wytycznymi ESPGHAN i polskich ekspertów, u niemowląt karmionych sztucznie z łagodną do umiarkowanej postacią ABMK lekiem I rzutu jest mieszanka o wysokim (znacznym) stopniu hydrolizy białka (eHF). Mieszanki HA są zakazane w terapii (służą tylko do profilaktyki), a mleka sojowe i kozie nie są zalecane."
      },
      {
        "q": "W jakiej sytuacji klinicznej u niemowlęcia z alergią na białka mleka krowiego bezwzględnie zalecane jest zastosowanie mieszanki elementarnej opartej na wolnych aminokwasach (AAF) zamiast hydrolizatu eHF?",
        "opts": [
          "A) Wystąpienie wstrząsu anafilaktycznego wywołanego mlekiem lub ciężkiego zespołu FPIES z hipotensją i zaburzeniami rozwoju.",
          "B) Wystąpienie pojedynczego epizodu ciemnozielonego stolca.",
          "C) U każdego niemowlęcia poniżej 6. miesiąca życia.",
          "D) Zawsze, gdy dziecko nie lubi gorzkiego smaku eHF.",
          "E) Przy współistnieniu ciemieniuchy na owłosionej skórze głowy."
        ],
        "correctIdx": 0,
        "exp": "Mieszanka aminokwasowa (AAF) jest wskazana jako preparat I rzutu w stanach zagrożenia życia (anafilaksja, ciężki FPIES z hipowolemią i kwasicą, enteropatia z ciężkim zahamowaniem wzrastania) lub gdy brak jest poprawy po 2-4 tygodniach stosowania mieszanki eHF.",
        "options": [
          "A) Wystąpienie wstrząsu anafilaktycznego wywołanego mlekiem lub ciężkiego zespołu FPIES z hipotensją i zaburzeniami rozwoju.",
          "B) Wystąpienie pojedynczego epizodu ciemnozielonego stolca.",
          "C) U każdego niemowlęcia poniżej 6. miesiąca życia.",
          "D) Zawsze, gdy dziecko nie lubi gorzkiego smaku eHF.",
          "E) Przy współistnieniu ciemieniuchy na owłosionej skórze głowy."
        ],
        "correct": 0,
        "expl": "Mieszanka aminokwasowa (AAF) jest wskazana jako preparat I rzutu w stanach zagrożenia życia (anafilaksja, ciężki FPIES z hipowolemią i kwasicą, enteropatia z ciężkim zahamowaniem wzrastania) lub gdy brak jest poprawy po 2-4 tygodniach stosowania mieszanki eHF."
      }
    ],
    "flashcards": [
      {
        "cat": "Pediatria",
        "q": "Jaka jest różnica w zastosowaniu mieszanek typu eHF i HA?",
        "a": "eHF (hydrolizat znacznego stopnia) = LECZENIE stwierdzonej ABMK; HA (częściowy hydrolizat) = wyłącznie PROFILAKTYKA u dzieci zdrowych, ZAKAZANA w leczeniu!"
      },
      {
        "cat": "Pediatria",
        "q": "Dlaczego mleko kozie i owcze jest przeciwwskazane u dzieci z ABMK?",
        "a": "Wykazuje >90% reakcji krzyżowej z białkami mleka krowiego i może wywołać ciężką reakcję alergiczną."
      },
      {
        "cat": "Pediatria",
        "q": "Co jest 'złotym standardem' rozpoznania nie-IgE-zależnej postaci ABMK (FPIAP)?",
        "a": "Ustąpienie objawów po próbie eliminacji (2–4 tyg.) oraz ich ponowny nawrót w doustnej próbie prowokacji."
      },
      {
        "cat": "Pediatria",
        "q": "Kiedy u niemowlęcia z ABMK stosuje się mieszankę aminokwasową (AAF)?",
        "a": "W anafilaksji, ciężkim FPIES z zaburzeniami wzrastania lub przy braku tolerancji/poprawy po eHF."
      },
      {
        "cat": "Pediatria",
        "q": "Jaki odsetek dzieci z ABMK nabywa tolerancję do 3. roku życia?",
        "a": "Około 80–90% dzieci nabywa pełną tolerancję kliniczną (choroba w większości samoograniczająca się)."
      }
    ]
  },
  {
    "id": 103,
    "filename": "103_wyrostek_dziecko.json",
    "dept": "Pediatria",
    "shortTitle": "3-letnie dziecko – Ból brzucha, drażliwość, gorączka i wymioty (Zapalenie wyrostka u małego dziecka)",
    "diagnosisTitle": "Ostre zapalenie wyrostka robaczkowego (Appendicitis acuta) u małego dziecka z wczesnym zapaleniem otrzewnej",
    "vitals": [
      {
        "label": "HR",
        "val": "142/min",
        "sub": "Tachykardia gorączkowa",
        "status": "bad"
      },
      {
        "label": "BP",
        "val": "92/58 mmHg",
        "sub": "Prawidłowe",
        "status": "ok"
      },
      {
        "label": "SpO2",
        "val": "98%",
        "sub": "Prawidłowa",
        "status": "ok"
      },
      {
        "label": "RR",
        "val": "34/min",
        "sub": "Przyspieszony, spłycony",
        "status": "bad"
      },
      {
        "label": "Temp",
        "val": "38.9°C",
        "sub": "Wysoka gorączka",
        "status": "bad"
      },
      {
        "label": "GCS",
        "val": "14",
        "sub": "Drażliwe, płaczliwe",
        "status": "bad"
      }
    ],
    "vitalsObj": {
      "hr": 142,
      "bp": "92/58",
      "spo2": 98,
      "rr": 34,
      "temp": 38.9,
      "gcs": 14
    },
    "story": "Matka przywozi na SOR 3-letnią dziewczynkę z powodu silnego bólu brzucha trwającego od 24 godzin, gorączki 38.9°C i trzykrotnych wymiotów treścią pokarmową. Dziecko leży na prawym boku z podkurczonymi nóżkami, broni się przed dotknięciem brzucha, odmawia chodzenia (utyka na prawą nogę lub płacze przy próbie postawienia na nogi). W badaniu przedmiotowym stwierdza się obronę mięśniową i dodatni objaw Blumberga w prawym dole biodrowym.",
    "labs": [
      [
        "Leukocyty (WBC)",
        "17.4 G/l",
        "norma: 5.0 - 12.0 G/l (Znaczna leukocytoza)"
      ],
      [
        "Neutrofile",
        "84%",
        "norma: 35 - 55% (Przesunięcie w lewo)"
      ],
      [
        "CRP",
        "78 mg/l",
        "norma: <5 mg/l (Wysokie stężenie zapalne)"
      ],
      [
        "Prokalcytonina (PCT)",
        "0.85 ng/ml",
        "norma: <0.5 ng/ml (Podwyższona)"
      ],
      [
        "Badanie ogólne moczu",
        "Pojedyncze leukocyty (2-4 wpw)",
        "norma: 0-5 wpw (Wyklucza ZUM)"
      ],
      [
        "USG jamy brzusznej",
        "Nieściśliwy wyrostek o śr. 8.5 mm z płynem w miednicy",
        "Cechy ostrego zapalenia z perforacją"
      ]
    ],
    "steps": [
      {
        "title": "Krok 1: Odrębności kliniczne zapalenia wyrostka u małych dzieci (<4 r.ż.)",
        "desc": "Zapalenie wyrostka u dzieci poniżej 4. roku życia ma nietypowy, podstępny przebieg ze względu na niezdolność do lokalizacji bólu i krótką sieć większą. Co jest najczęstszym powikłaniem wynikającym z opóźnienia rozpoznania?",
        "scenario": "Zapalenie wyrostka u dzieci poniżej 4. roku życia ma nietypowy, podstępny przebieg ze względu na niezdolność do lokalizacji bólu i krótką sieć większą. Co jest najczęstszym powikłaniem wynikającym z opóźnienia rozpoznania?",
        "options": [
          {
            "text": "Wczesna perforacja (u 50–80% dzieci <3 r.ż.) i rozlane zapalenie otrzewnej z powodu słabo rozwiniętej sieci większej, która nie odgranicza zapalenia.",
            "correct": true,
            "feedback": "Znakomicie! U małych dzieci cienka ściana wyrostka i krótka, słabo rozwinięta sieć większa sprawiają, że do perforacji dochodzi w ciągu 24–48 godzin, prowadząc bezpośrednio do rozlanego zapalenia otrzewnej."
          },
          {
            "text": "Samoistne wchłonięcie się wyrostka bez leczenia operacyjnego u 90% pacjentów.",
            "correct": false,
            "feedback": "Błąd kardynalny. Zapalenie wyrostka u małego dziecka nie cofa się samoistnie i bez operacji prowadzi do sepsy."
          },
          {
            "text": "Przejście w bezobjawowe przewlekłe zapalenie jelita grubego.",
            "correct": false,
            "feedback": "Nieprawidłowe. Wyrostek robaczkowy u dziecka ma charakter ostry i gwałtowny."
          },
          {
            "text": "Zawsze wytworzenie dobrze odgraniczonego ropnia okołowyrostkowego bez gorączki.",
            "correct": false,
            "feedback": "Wytworzenie nacieku/ropnia wymaga sprawnej sieci większej, której małe dziecko jeszcze nie posiada."
          }
        ]
      },
      {
        "title": "Krok 2: Badanie przedmiotowe małego dziecka z 'ostrym brzuchem'",
        "desc": "Dziecko gwałtownie płacze i napina mięśnie brzucha przy każdej próbie badania ręką lekarza. Jaki manewr kliniczny pozwala odróżnić rzeczywistą obronę mięśniową (defensa muscularis) od lęku?",
        "scenario": "Dziecko gwałtownie płacze i napina mięśnie brzucha przy każdej próbie badania ręką lekarza. Jaki manewr kliniczny pozwala odróżnić rzeczywistą obronę mięśniową (defensa muscularis) od lęku?",
        "options": [
          {
            "text": "Badanie brzucha dłonią rodzica pod kontrolą ręki lekarza, badanie podczas snu/wydechu lub ocena bolesności przy delikatnym opukiwaniu (objaw wstrząsania / próba kaszlowa / skakanie na prawej nodze).",
            "correct": true,
            "feedback": "Prawidłowo! Zastosowanie ręki rodzica, badanie we śnie lub próba skakania/wstrząsania pozwala odróżnić obronę mimowolną (odczyn otrzewnowy) od obrony dowolnej wynikającej ze strachu przed badaniem."
          },
          {
            "text": "Podanie dożylne leków zwiotczających mięśnie poprzecznie prążkowane na sali ogólnej.",
            "correct": false,
            "feedback": "Leki zwiotczające powodują zatrzymanie oddechu i wymagają natychmiastowej intubacji; nie służą do badania brzucha!"
          },
          {
            "text": "Wymuszenie leżenia na wznak z unieruchomieniem kończyn pasami.",
            "correct": false,
            "feedback": "Niedopuszczalne i traumatyzujące; nasila płacz i dowolne napięcie powłok."
          },
          {
            "text": "Zalecenie natychmiastowego wykonania lewatywy z soli fizjologicznej.",
            "correct": false,
            "feedback": "Lewatywa przy podejrzeniu zapalenia wyrostka grozi natychmiastową jatrogenną perforacją!"
          }
        ]
      },
      {
        "title": "Krok 3: Badanie obrazowe I rzutu w pediatrii",
        "desc": "Jakie badanie obrazowe jest badaniem I wyboru w diagnostyce ostrego zapalenia wyrostka u dzieci wg wytycznych PTChD i ESPR?",
        "scenario": "Jakie badanie obrazowe jest badaniem I wyboru w diagnostyce ostrego zapalenia wyrostka u dzieci wg wytycznych PTChD i ESPR?",
        "options": [
          {
            "text": "Ultrasonografia (USG) jamy brzusznej z użyciem głowicy liniowej techniką stopniowanego ucisku (graded compression).",
            "correct": true,
            "feedback": "Wybitnie! USG jest badaniem I rzutu ze względu na brak promieniowania jonizującego. Cechy zapalenia: nieściśliwa cewka >6 mm, pogrubienie ściany, kamień kałowy (appendicolith), wzmożony przepływ w Dopplerze i płyn wokół wyrostka."
          },
          {
            "text": "Rutynowa wielofazowa tomografia komputerowa (TK) jamy brzusznej i miednicy z kontrastem.",
            "correct": false,
            "feedback": "TK u dzieci rezerwuje się wyłącznie na przypadki wątpliwe lub powikłane po niediagnostycznym USG (ochrona przed promieniowaniem)."
          },
          {
            "text": "Zdjęcie przeglądowe RTG jamy brzusznej na leżąco bez przygotowania.",
            "correct": false,
            "feedback": "RTG ma niską czułość w wyrostku; może jedynie wykazać wolny gaz pod przeponą przy perforacji lub kamień kałowy."
          },
          {
            "text": "Scyntygrafia znakowanymi leukocytami.",
            "correct": false,
            "feedback": "Badanie zbyt czasochłonne i niedostępne w trybie ostrego dyżuru chirurgicznego."
          }
        ]
      },
      {
        "title": "Krok 4: Przygotowanie przedoperacyjne – stabilizacja",
        "desc": "USG potwierdza zapalenie wyrostka o średnicy 8.5 mm z wolnym płynem w jamie otrzewnej. Jakie czynności podejmujesz przed przekazaniem dziecka na blok operacyjny?",
        "scenario": "USG potwierdza zapalenie wyrostka o średnicy 8.5 mm z wolnym płynem w jamie otrzewnej. Jakie czynności podejmujesz przed przekazaniem dziecka na blok operacyjny?",
        "options": [
          {
            "text": "Ścisła dieta zero, wkłucie obwodowe, płynoterapia krystaloidowa i.v. (wyrównanie odwodnienia), dożylna analgezja (paracetamol/opioid) oraz antybiotykoterapia o szerokim spektrum (np. ceftriakson + metronidazol).",
            "correct": true,
            "feedback": "Doskonale! Przygotowanie do operacji: nawodnienie, uśmierzenie bólu (leki przeciwbólowe NIE zamazują obrazu otrzewnowego!), antybiotykoterapia pokrywająca florę jelitową (pałeczki Gram-ujemne i beztlenowce)."
          },
          {
            "text": "Podanie dziecku doustnego syropu z paracetamolem i soku jabłkowego do picia.",
            "correct": false,
            "feedback": "Zakaz podawania czegokolwiek doustnie (ryzyko aspiracji treści żołądkowej podczas intubacji do znieczulenia ogólnego!)."
          },
          {
            "text": "Czekanie z antybiotykiem do pobrania posiewu z krwi po 24 godzinach.",
            "correct": false,
            "feedback": "Błąd. Antybiotyk profilaktyczny/terapeutyczny należy podać przed nacięciem skóry (optymalnie w ciągu 60 minut przed zabiegiem)."
          },
          {
            "text": "Podanie dożylne hydrokortyzonu w dawce 500 mg.",
            "correct": false,
            "feedback": "Sterydy są przeciwwskazane w ostrym bakteryjnym zapaleniu otrzewnej."
          }
        ]
      },
      {
        "title": "Krok 5: Wybór metody operacyjnej",
        "desc": "Konsultujący chirurg dziecięcy planuje operację. Jaka technika jest współcześnie złotym standardem u dzieci?",
        "scenario": "Konsultujący chirurg dziecięcy planuje operację. Jaka technika jest współcześnie złotym standardem u dzieci?",
        "options": [
          {
            "text": "Appendektomia laparoskopowa (laparoscopic appendectomy) – mniejszy ból pooperacyjny, mniejsze ryzyko zakażenia rany, krótsza hospitalizacja i doskonała wizualizacja całej jamy otrzewnej.",
            "correct": true,
            "feedback": "Znakomicie! Laparoskopia jest metodą z wyboru u dzieci, umożliwiając również dokładne przepłukanie jamy otrzewnej przy perforacji."
          },
          {
            "text": "Laparotomia pośrodkowa od wyrostka mieczykowatego do spojenia łonowego u każdego dziecka.",
            "correct": false,
            "feedback": "Zbyt inwazyjny dostęp, zarezerwowany dla skrajnych przypadków wstrząsu septycznego z mnogimi ropniami."
          },
          {
            "text": "Wyłącznie leczenie zachowawcze antybiotykami bez operacji u 3-latka z płynem w otrzewnej.",
            "correct": false,
            "feedback": "Przy cechach perforacji i płynie w otrzewnej leczenie operacyjne jest bezwzględnie konieczne."
          },
          {
            "text": "Drenaż wyrostka przez nakłucie przezpochwowe.",
            "correct": false,
            "feedback": "Anatomicznie absurdalne u małego dziecka."
          }
        ]
      },
      {
        "title": "Krok 6: Postępowanie pooperacyjne – powikłany wyrostek",
        "desc": "Podczas operacji stwierdzono zgorzelinowy wyrostek z mikroperforacją i mętnym wysiękiem w miednicy mniejszej. Jak długo kontynuujesz antybiotykoterapię po zabiegu?",
        "scenario": "Podczas operacji stwierdzono zgorzelinowy wyrostek z mikroperforacją i mętnym wysiękiem w miednicy mniejszej. Jak długo kontynuujesz antybiotykoterapię po zabiegu?",
        "options": [
          {
            "text": "Antybiotykoterapię dożylną kontynuuje się przez 3–5 dni (do ustąpienia gorączki, normalizacji leukocytozy i powrotu perystaltyki jelit).",
            "correct": true,
            "feedback": "Prawidłowo! W powikłanym zapaleniu wyrostka (perforacja, zgorzel) standardem jest celowana antybiotykoterapia przez 3–5 dni pod kontrolą parametrów zapalnych i stanu klinicznego."
          },
          {
            "text": "Odstawia się antybiotyki natychmiast po wycięciu wyrostka na sali operacyjnej.",
            "correct": false,
            "feedback": "W powikłanym zapaleniu z obecnością ropy/wysięku jednorazowa dawka profilaktyczna nie wystarcza – grozi ropniem wewnątrzbrzusznym!"
          },
          {
            "text": "Antybiotykoterapię należy bezwzględnie prowadzić przez 6 miesięcy.",
            "correct": false,
            "feedback": "Zbyt długi czas – ryzyko lekooporności i biegunki zakaźnej C. difficile."
          },
          {
            "text": "Podaje się wyłącznie nystatynę doustnie.",
            "correct": false,
            "feedback": "Nystatyna to lek przeciwgrzybiczy, nieskuteczny w zapaleniu otrzewnej."
          }
        ]
      },
      {
        "title": "Krok 7: Najczęstsze powikłanie wczesne po appendektomii powikłanej",
        "desc": "W 6. dobie po operacji u dziecka ponownie pojawia się gorączka 38.5°C, ból podbrzusza i bolesne parcie na stolec. Co podejrzewasz w pierwszej kolejności?",
        "scenario": "W 6. dobie po operacji u dziecka ponownie pojawia się gorączka 38.5°C, ból podbrzusza i bolesne parcie na stolec. Co podejrzewasz w pierwszej kolejności?",
        "options": [
          {
            "text": "Ropień wewnątrzbrzuszny (najczęściej w zatoce Douglasa / zagłębieniu odbytniczo-pęcherzowym) – wskazane pilne USG/TK jamy brzusznej.",
            "correct": true,
            "feedback": "Wybitnie! Ropień w zatoce Douglasa jest klasycznym powikłaniem po perforacji wyrostka; uciskając na odbytnicę wywołuje gorączkę septyczną, bolesne parcie na stolec (tenesmus) i biegunkę z luźnymi stolcami."
          },
          {
            "text": "Prawidłowy odczyn zapalny niewymagający żadnej diagnostyki.",
            "correct": false,
            "feedback": "Nawrót gorączki po okresie bezgorączkowym zawsze wymaga diagnostyki powikłań ropnych!"
          },
          {
            "text": "Wirusowe zapalenie wątroby typu A.",
            "correct": false,
            "feedback": "Objawy są miejscowe w miednicy mniejszej."
          },
          {
            "text": "Ostrą niewydolność kory nadnerczy.",
            "correct": false,
            "feedback": "Obraz kliniczny wskazuje na powikłanie chirurgiczne w loży po wyrostku/miednicy."
          }
        ]
      },
      {
        "title": "Krok 8: Podsumowanie dyżurowe i punkty kluczowe LEK",
        "desc": "Dziecko zostało wyleczone i wypisane do domu w stanie dobrym. Jakie kluczowe wnioski zapamiętasz do egzaminu LEK?",
        "scenario": "Dziecko zostało wyleczone i wypisane do domu w stanie dobrym. Jakie kluczowe wnioski zapamiętasz do egzaminu LEK?",
        "options": [
          {
            "text": "U małych dzieci objawy wyrostka są nieswoiste (drażliwość, wymioty, utykanie na prawą nogę); odsetek perforacji jest bardzo wysoki (>50%), USG jest badaniem I wyboru, a leczeniem z wyboru laparoskopia.",
            "correct": true,
            "feedback": "Doskonałe podsumowanie! Wszystkie te elementy stanowią filary pytań testowych CEM z chirurgii dziecięcej i pediatrii."
          },
          {
            "text": "Każdy ból brzucha u dziecka poniżej 4. roku życia jest spowodowany kolką niemowlęcą.",
            "correct": false,
            "feedback": "Błąd lekceważenia ostrego brzucha."
          },
          {
            "text": "Zapalenie wyrostka u dzieci rozpoznaje się wyłącznie na podstawie poziomu amylazy w moczu.",
            "correct": false,
            "feedback": "Amylaza służy do diagnostyki zapalenia trzustki."
          },
          {
            "text": "Badanie palpacyjne brzucha u dziecka powinno być wykonywane z użyciem głębokiego i gwałtownego ucisku.",
            "correct": false,
            "feedback": "Badanie musi być delikatne, rozpoczynając od okolic najmniej bolesnych."
          }
        ]
      }
    ],
    "pathoNodes": [
      {
        "badge": "Zatkanie światła",
        "title": "Zamknięcie światła wyrostka i wzrost ciśnienia wewnątrzświetlnego",
        "short": "Przerost tkanki limfatycznej lub kamień kałowy (appendicolith) zamyka odpływ śluzu.",
        "detail": "Wyrostek robaczkowy u dzieci zawiera obfitą tkankę limfatyczną w błonie podśluzowej. W odpowiedzi na infekcję wirusową dochodzi do hiperplazji grudek chłonnych lub uwięźnięcia kamienia kałowego (koprolitu). Śluz stale produkowany przez nabłonek gromadzi się w zamkniętym świetle narządu, powodując gwałtowny wzrost ciśnienia wewnątrzświetlnego (>60 cm H2O), który przewyższa ciśnienie żylne i prowadzi do zastoju żylnego.",
        "target": "Tkanka limfatyczna podśluzówkowa i światło wyrostka robaczkowego",
        "desc": "Zastój śluzu i wzrost ciśnienia prowadzi do niedokrwienia ściany wyrostka."
      },
      {
        "badge": "Inwazja bakteryjna",
        "title": "Niedokrwienie ściany, zgorzel i perforacja",
        "short": "Przekroczenie ciśnienia perfuzji tętniczej wywołuje martwicę transmuralną i perforację.",
        "detail": "Wzrost ciśnienia powoduje uciśnięcie gałązek tętnicy wyrostkowej (arteria appendicularis – naczynie końcowe bez krążenia obocznego). Niedotlenienie i martwica śluzówki umożliwiają inwazję bakterii jelitowych (E. coli, Bacteroides fragilis, Pseudomonas) w głąb ściany. U małych dzieci cienka warstwa mięśniowa ulega szybkiej martwicy zgorzelinowej, doprowadzając do perforacji w ciągu 24-36 godzin.",
        "target": "Tętnica wyrostkowa i ściana wyrostka robaczkowego",
        "desc": "Niedokrwienie naczyniowe i kolonizacja beztlenowa prowadzą do martwicy pełnościennej."
      },
      {
        "badge": "Zapalenie otrzewnej",
        "title": "Brak bariery sieci większej i rozlane zapalenie otrzewnej",
        "short": "Krótka sieć większa u dzieci <4 r.ż. nie odgranicza przedziurawienia.",
        "detail": "U dorosłych sieć większa przemieszcza się w kierunku ogniska zapalnego i 'okleja' wyrostek, tworząc naciek lub ropień okołowyrostkowy. U niemowląt i dzieci poniżej 4. roku życia sieć większa jest anatomicznie krótka, cienka i nie sięga do prawego dołu biodrowego. Perforacja skutkuje natychmiastowym wylaniem treści kałowej do wolnej jamy otrzewnej, rozlanym peritonitis i wstrząsem septycznym.",
        "target": "Sieć większa (omentum majus) i jama otrzewnej",
        "desc": "Anatomiczna niedojrzałość sieci uniemożliwia lokalne odgraniczenie zapalenia."
      }
    ],
    "dutySummary": {
      "overview": "Ostre zapalenie wyrostka robaczkowego u małych dzieci (<4 r.ż.) to stan nagły o atypowym przebiegu, cechujący się bardzo wysokim odsetkiem perforacji (50–80%) i rozlanego zapalenia otrzewnej ze względu na anatomicznie krótką sieć większą.",
      "diagnostics": "1. Objawy: drażliwość, odmowa chodzenia (utykanie na prawą nogę), gorączka, wymioty, bolesność brzucha.<br>2. USG jamy brzusznej (metoda z wyboru): nieściśliwa cewka >6 mm, płyn w miednicy, appendicolith.<br>3. Badania laboratoryjne: leukocytoza z neutrofilią, wysokie CRP.<br>4. Różnicowanie: zapalenie węzłów krezkowych, wgłobienie jelita, ZUM, zapalenie płuc z odczynem brzusznym.",
      "drugsAndDoses": "• Ścisła dieta zero (przygotowanie do znieczulenia ogólnego).<br>• Nawadnianie i.v.: płyn wieloelektrolitowy (PWE) lub 0.9% NaCl z 5% glukozą wg zapotrzebowania Holiday-Segara.<br>• Antybiotykoterapia i.v. o szerokim spektrum: np. Ceftriakson 50–75 mg/kg/d + Metronidazol 30 mg/kg/d w 3 dawkach.<br>• Przeciwbólowo: Paracetamol i.v. 15 mg/kg co 6h, w silnym bólu Nalbufina lub Morfina 0.05–0.1 mg/kg i.v.",
      "procedures": "• Pilna appendektomia laparoskopowa (złoty standard) z płukaniem jamy otrzewnej.<br>• Unikanie lewatyw i środków przeczyszczających (ryzyko perforacji!).",
      "monitoring": "• Kontrola tętna, ciśnienia, temperatury i diurezy co 2–4 h.<br>• Obserwacja w kierunku ropnia wewnątrzbrzusznego (ponowny wzrost gorączki, bolesne parcie na stolec w 5.–7. dobie)."
    },
    "diffTable": {
      "title": "Diagnostyka różnicowa ostrego bólu brzucha u małego dziecka",
      "headers": [
        "Jednostka chorobowa",
        "Objawy kliniczne",
        "Obraz USG",
        "Badania laboratoryjne",
        "Postępowanie"
      ],
      "rows": [
        [
          "Ostre zapalenie wyrostka robaczkowego",
          "Ból w prawym dole, utykanie na prawą nogę, gorączka, wymioty po bólu",
          "Wyrostek >6 mm, nieściśliwy, płyn wokół, kamień kałowy",
          "Wysoka leukocytoza z neutrofilią, CRP >50 mg/l",
          "Pilna operacja (appendektomia laparoskopowa) + antybiotyki"
        ],
        [
          "Zapalenie węzłów chłonnych krezki (Lymphadenitis mesenterica)",
          "Ból brzucha po przebytej infekcji górnych dróg oddechowych, stan ogólny dobry",
          "Wyrostek robaczkowy prawidłowy (<6 mm); pakiety powiększonych węzłów krezkowych",
          "Leukocyty w normie lub miernie podwyższone, CRP umiarkowane",
          "Leczenie objawowe zachowawcze (nawadnianie, przeciwbólowe)"
        ],
        [
          "Wgłobienie jelita (Intussusceptio)",
          "Napadowe bóle kolkowe, podkurczanie nóżek, stolec 'galaretka porzeczkowa'",
          "Objaw tarczy strzelniczej / tarczy kokardy (target sign), brak przepływu",
          "Początkowo parametry zapalne prawidłowe",
          "Pilne odwgłobienie pneumatyczne/hydrostatyczne pod USG"
        ],
        [
          "Zakażenie układu moczowego (ZUM / Pyelonephritis)",
          "Wysoka gorączka bez wyraźnego źródła, niepokój przy mikcji, wymioty",
          "Obrzęk miąższu nerki lub cechy zastoju; wyrostek prawidłowy",
          "Leukocyturia, bakteriuria w moczu, dodatni posiew moczu",
          "Antybiotykoterapia celowana dożylna/doustna"
        ]
      ]
    },
    "lekQuestions": [
      {
        "q": "Dlaczego u dzieci poniżej 3. roku życia ostre zapalenie wyrostka robaczkowego znacznie częściej niż u dorosłych prowadzi do wczesnego, rozlanego zapalenia otrzewnej?",
        "opts": [
          "A) Z powodu anatomicznie krótkiej i cienkiej sieci większej, która nie jest w stanie odgraniczyć ogniska zapalnego, oraz cieńszej ściany wyrostka.",
          "B) Z powodu braku flory beztlenowej w przewodzie pokarmowym u małych dzieci.",
          "C) Z powodu nadmiernej długości wyrostka robaczkowego sięgającego do lewego podżebrza.",
          "D) Z powodu fizjologicznej hiperalbuminemii nasilającej wysięk zapalny.",
          "E) Z powodu braku receptorów bólowych w otrzewnej ściennej u dzieci."
        ],
        "correctIdx": 0,
        "exp": "U małych dzieci (<3-4 r.ż.) ściana wyrostka jest bardzo cienka i szybko ulega martwicy, a sieć większa (omentum majus) jest krótka i słabo rozwinięta, przez co nie sięga do prawego dołu biodrowego i nie tworzy nacieku ograniczającego perforację, co skutkuje wczesnym rozlanym zapaleniem otrzewnej.",
        "options": [
          "A) Z powodu anatomicznie krótkiej i cienkiej sieci większej, która nie jest w stanie odgraniczyć ogniska zapalnego, oraz cieńszej ściany wyrostka.",
          "B) Z powodu braku flory beztlenowej w przewodzie pokarmowym u małych dzieci.",
          "C) Z powodu nadmiernej długości wyrostka robaczkowego sięgającego do lewego podżebrza.",
          "D) Z powodu fizjologicznej hiperalbuminemii nasilającej wysięk zapalny.",
          "E) Z powodu braku receptorów bólowych w otrzewnej ściennej u dzieci."
        ],
        "correct": 0,
        "expl": "U małych dzieci (<3-4 r.ż.) ściana wyrostka jest bardzo cienka i szybko ulega martwicy, a sieć większa (omentum majus) jest krótka i słabo rozwinięta, przez co nie sięga do prawego dołu biodrowego i nie tworzy nacieku ograniczającego perforację, co skutkuje wczesnym rozlanym zapaleniem otrzewnej."
      },
      {
        "q": "Badaniem obrazowym I wyboru u dziecka z podejrzeniem ostrego zapalenia wyrostka robaczkowego jest:",
        "opts": [
          "A) Ultrasonografia jamy brzusznej (USG) techniką stopniowanego ucisku.",
          "B) Tomografia komputerowa jamy brzusznej z podwójnym kontrastem.",
          "C) Rezonans magnetyczny jamy brzusznej w sekwencji T1 i T2.",
          "D) Zdjęcie rentgenowskie przeglądowe jamy brzusznej na stojąco.",
          "E) Scyntygrafia z użyciem technetu 99mTc."
        ],
        "correctIdx": 0,
        "exp": "Zgodnie z zasadą ALARA i wytycznymi chirurgii dziecięcej, badaniem I wyboru u dzieci jest badanie USG techniką stopniowanego ucisku (graded compression). Cechy zapalenia to średnica >6 mm, brak podatności na ucisk i płyn okołowyrostkowy. TK stosuje się jedynie w przypadkach wątpliwych.",
        "options": [
          "A) Ultrasonografia jamy brzusznej (USG) techniką stopniowanego ucisku.",
          "B) Tomografia komputerowa jamy brzusznej z podwójnym kontrastem.",
          "C) Rezonans magnetyczny jamy brzusznej w sekwencji T1 i T2.",
          "D) Zdjęcie rentgenowskie przeglądowe jamy brzusznej na stojąco.",
          "E) Scyntygrafia z użyciem technetu 99mTc."
        ],
        "correct": 0,
        "expl": "Zgodnie z zasadą ALARA i wytycznymi chirurgii dziecięcej, badaniem I wyboru u dzieci jest badanie USG techniką stopniowanego ucisku (graded compression). Cechy zapalenia to średnica >6 mm, brak podatności na ucisk i płyn okołowyrostkowy. TK stosuje się jedynie w przypadkach wątpliwych."
      }
    ],
    "flashcards": [
      {
        "cat": "Pediatria",
        "q": "Jaki jest odsetek perforacji wyrostka robaczkowego u dzieci poniżej 3. roku życia?",
        "a": "Aż 50–80% (wynika z trudności diagnostycznych, cienkiej ściany wyrostka i krótkiej sieci większej)."
      },
      {
        "cat": "Pediatria",
        "q": "Dlaczego sieć większa u małego dziecka nie odgranicza zapalenia wyrostka?",
        "a": "Jest anatomicznie za krótka i cienka – nie sięga do prawego dołu biodrowego, co sprzyja rozlanemu peritonitis."
      },
      {
        "cat": "Pediatria",
        "q": "Jaka średnica wyrostka w badaniu USG u dziecka przemawia za zapaleniem?",
        "a": ">6 mm przy braku podatności na ucisk głowicą (nieściśliwość wyrostka)."
      },
      {
        "cat": "Pediatria",
        "q": "Czy podanie leków przeciwbólowych przed operacją u dziecka 'zamazuje obraz' ostrego brzucha?",
        "a": "NIE! Skuteczna analgezja zmniejsza cierpienie dziecka i ułatwia badanie palpacyjne bez maskowania objawów otrzewnowych."
      },
      {
        "cat": "Pediatria",
        "q": "Jakie jest najczęstsze ropne powikłanie po operacji powikłanego wyrostka w 5.–7. dobie?",
        "a": "Ropień w jamie Douglasa (objawia się nawrotem gorączki i bolesnym parciem na stolec – tenesmus)."
      }
    ]
  }
];
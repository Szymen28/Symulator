# SYMULATOR KLINICZNY LEK: KOMPENDIUM ARCHITEKTURY, SILNIKA I ZŁOTEGO STANDARDU PRZYPADKÓW

Niniejszy dokument stanowi nadrzędną specyfikację projektową dla środowiska deweloperskiego (w tym dla agenta Antigravity). Opisuje dotychczasowy stan prac, fundamenty silnika aplikacji, mechanizmy kryptograficzne oraz bezwzględnie obowiązujący wzorzec konstrukcji przypadków medycznych wraz z planem wdrożenia bazy 265 scenariuszy.

---

## 1. HISTORIA I STATUS REALIZACJI PROJEKTU

### 1.1. Kontekst i cel projektu
- **Projekt:** Interaktywny, webowy Symulator Kliniczny przygotowujący lekarzy do Lekarskiego Egzaminu Końcowego (LEK) oraz dyżurów w Szpitalnym Oddziale Ratunkowym (SOR) i oddziałach specjalistycznych.
- **Repozytorium:** `Szymen28/Symulator` (gałąź `main`).
- **Główny cel bieżący:** Gruntowna refaktoryzacja historycznej, skrótowej bazy przypadków (#01–#21) do pełnowymiarowego, akademickiego formatu modułowego, a następnie systematyczne rozszerzenie bazy do **265 wyczerpujących scenariuszy klinicznych**.

### 1.2. Kamienie milowe ukończone do tej pory
1. **Infrastruktura lokalna agenta w Antigravity:**
   - Skonfigurowano przenośny silnik `node.exe` w ścieżce agenta (`.gemini\antigravity\bin\node.exe`).
   - Zainstalowano i zmapowano narzędzie Git w zmiennej środowiskowej `$env:PATH`.
   - Zintegrowano autoryzację Git push przy użyciu GitHub Personal Access Token (PAT).
2. **Kryptografia i spójność manifestu:**
   - Wdrożono skrypt `scripts/encrypt_case.js` operujący na standardzie **AES-256-GCM** z derywacją klucza **PBKDF2** (100 000 iteracji SHA-256) przy użyciu hasła głównego aplikacji.
   - Wprowadzono plik śledzenia postępów `cases_queue.json` oraz zaktualizowano `cases/manifest.json`.
3. **Zrefaktoryzowane przypadki (Status: COMPLETED & PUSHED):**
   - **#01 DKA** (`01_dka.json`) – Cukrzycowa kwasica ketonowa w przebiegu nowo rozpoznanej DM1.
   - **#02 STEMI** (`02_stemi.json`) – Zawał ściany dolnej z zajęciem prawej komory (pułapka azotanowa).
   - **#03 Pylorostenoza** (`03_pylorostenoza.json`) – Wrodzone przerostowe zwężenie odźwiernika, *aciduria paradoxa*, zespół odźwiernikowo-wątrobowy (commit `86bb082`).
   - **#04 Przełom miasteniczny** (`04_miastenia.json`) – Zaostrzenie po fluorochinolonach, zakaz sukcynylocholiny, plazmafereza/IVIG (commit `94dfb77`).
   - **#05 Zespół HELLP / Preeklampsja** (`05_hellp.json`) – Hemoliza, koagulopatia, MgSO4 wg Zuspana, krwiak podtorebkowy wątroby i zakaz parcia (commit `94dfb77`).
   - **#06 Częstoskurcz komorowy VT** (`06_vt.json`) – Regularny częstoskurcz z szerokimi QRS, kardiowersja zsynchronizowana, kryteria Brugada, amiodaron, zakaz werapamilu (commit `94dfb77`).
   - **#07 Ostre zatrucie paracetamolem** (`07_paracetamol.json`) – Nomogram Rumacka-Matthew, protokół Prescotta 21h, reakcje rzekomoanafilaktyczne, kryteria King's College Hospital (commit `94dfb77`).
   - **#08 Przełom tarczycowy** (`08_przelom_tarczycowy.json`) – Skala Burcha-Wartofsky'ego, PTU, jod po $\ge 1\text{ h}$, propranolol, hydrokortyzon, zakaz aspiryny (commit `94dfb77`).

---

## 2. ARCHITEKTURA SILNIKA I ZASADY TECHNICZNE

### 2.1. Model danych i przepływ w aplikacji (Zero-Leakage Architecture)
Silnik symulatora działa w przeglądarce klienta (Client-Side Single Page Application). 
1. **Bezpieczeństwo bazy danych:**
   - W repozytorium publicznym/prywatnym **żaden plik przypadku nie może leżeć w formie jawnego tekstu (JSON)**. Wszystkie pliki w katalogu `cases/*.json` są zaszyfrowanymi ciągami binarnymi zapisanymi w schemacie:
     ```json
     {
       "salt": "<hex 32 bytes>",
       "iv": "<hex 12 bytes>",
       "authTag": "<hex 16 bytes>",
       "ciphertext": "<hex data>"
     }
     ```
   - Manifest `cases/manifest.json` rejestruje nazwy plików. Aplikacja pobiera plik, pyta użytkownika o hasło sesyjne, dokonuje deszyfracji w pamięci Web Crypto API i natychmiast inicjalizuje stan symulacji.
2. **Niezmienniki techniczne skryptu szyfrującego (`scripts/encrypt_case.js`):**
   - PBKDF2: 100 000 iteracji, SHA-256, losowa sól 16/32 bajty.
   - Szyfr: AES-256-GCM z uwierzytelnionym tagiem integralności (128-bit Auth Tag).
   - Każdy plik przed wysłaniem na zdalne repozytorium musi przejść pomyślny test odczytu i parsowania zwrotnego (*dry-run decryption test*).

### 2.2. Jak silnik przetwarza przypadek kliniczny
Silnik symulatora oczekuje ściśle określonej struktury JSON, którą renderuje w interfejsie użytkownika:
- **Pasek parametrów życiowych (`vitals`):** 4 responsywne kafelki monitorujące najważniejsze zmienne dynamiczne pacjenta (np. ciśnienie, tętno, saturacja, RKZ, stężenie glukozy, skala GCS/AVPU). Zmiany w kafelkach odzwierciedlają postęp resuscytacji.
- **Narracja i badanie fizykalne (`story`):** Chronologiczny wywiad z uwzględnieniem czynników wyzwalających, wywiadu rodzinnego/farmakologicznego oraz szczegółowego statusu internistycznego/neurologicznego.
- **Moduł laboratoryjno-obrazowy (`labs`):** 15–20 parametrów ze zdefiniowanymi jednostkami, wartościami referencyjnymi oraz adnotacją kliniczną.
- **Ścieżka decyzyjna (`steps`):** Wielokrokowa sekwencja pytań problemowych. Każdy krok zawiera:
  - `question`: dylemat kliniczny, przed którym staje lekarz prowadzący.
  - `options`: 4 warianty postępowania (1 prawidłowy, 3 dystraktory reprezentujące powszechne błędy jatrogenne lub pułapki LEK).
  - `feedback`: obszerne uzasadnienie akademickie wyjaśniające fizjopatologię każdego wyboru oraz cytujące oficjalne wytyczne.
- **Węzły patomechanizmu (`pathoNodes`):** Dokładnie 3 kluczowe procesy fizjopatologiczne wyjaśniające ciąg przyczynowo-skutkowy choroby (np. zaburzenia receptorowe, kaskady enzymatyczne, pętle sprzężeń zwrotnych).
- **Tabela różnicowa 1v1 (`diffTable`):** Zestawienie jednostki głównej z 3 najważniejszymi jednostkami alternatywnymi wg schematu: *Jednostka | Obraz kliniczny | Cechy wspólne | Kluczowy element różnicujący / Badanie rozstrzygające*.
- **Podsumowanie dyżurowe (`dutySummary`):** Praktyczny konspekt na dyżur z sekcjami: `overview`, `diagnostics`, `drugsAndDoses` (z precyzyjnymi miligramami/drogi podania), `procedures` oraz `monitoring`.
- **Egzaminacyjny moduł CEM/LEK (`lekQuestions`):** 10–12 pytań jedno- i wielokrotnego wyboru stylizowanych na autentyczne pytania Centrum Egzaminów Medycznych, ze zrównoważonym kluczem odpowiedzi.
- **Fiszki liczbowe (`flashcards`):** 6–8 kart z krytycznymi wartościami liczbowymi (dawki leków ratunkowych, wymiary ultrasonograficzne, kryteria laboratoryjne odcięcia).

---

## 3. ZŁOTY PRZEPIS NA PRZYPADEK KLINICZNY (Blueprinting Standard)

Każdy przypadek medyczny w Symulatorze musi bezwzględnie spełniać poniższe kryteria merytoryczne i dydaktyczne.

### 3.1. Źródła wiedzy medycznej (Hierarchia Wiarygodności)
Tworzenie przypadków opiera się wyłącznie na oficjalnych źródłach EBM (Evidence-Based Medicine):
1. **Krajowe wytyczne towarzystw naukowych:** PTK (Polskie Towarzystwo Kardiologiczne), PTGiP (Ginekolodzy i Położnicy), PTN (Neurolodzy), PTE (Endokrynolodzy), PTT (Toksykolodzy), Polskie Towarzystwo Pediatryczne.
2. **Wytyczne europejskie i międzynarodowe:** ESC, ERC (European Resuscitation Council 2021/2025), Surviving Sepsis Campaign (SSC), KDIGO, GOLD, GINA, IDSA, EASL.
3. **Podręczniki referencyjne CEM do LEK:**
   - *Interna Szczeklika* (medycyna wewnętrzna – nadrzędna wyrocznia LEK).
   - *Chirurgia* pod red. prof. W. Noszczyka / prof. Grzegorza Wallnera.
   - *Pediatria* pod red. prof. W. Kawalec / prof. J. Dobrzańskiej.
   - *Położnictwo i Ginekologia* pod red. prof. G. Bręborowicza.
   - *Medycyna Ratunkowa i Katastrof* pod red. prof. J. Jakubaszka.

### 3.2. Liczba i charakter kroków decyzyjnych (Elastyczność Zamiast Sztywnych Ram)
- **Zasada nadrzędna:** Brak sztucznego ograniczania do 7 kroków. Liczba kroków ma odpowiadać naturalnej dynamice przypadku (zazwyczaj **od 7 do 10 kroków**, w stanach wieloetapowych/OIT nawet do 11–12 kroków).
- **Logiczny łańcuch kroków:**
  - *Krok 1:* Triada wstępna / Ocena drożności dróg oddechowych, oddychania i krążenia (ABCDE) / Identyfikacja stanu zagrożenia życia.
  - *Krok 2:* Ukierunkowane badanie przedmiotowe ze szczególnym uwzględnieniem objawów patognomonicznych.
  - *Krok 3:* Diagnostyka natychmiastowa (Point-of-Care USG / POCUS, RKZ tętnicza/żylna, troponiny, glukometria, EKG).
  - *Krok 4:* Rozszerzona diagnostyka laboratoryjna i toksykologiczna / interpretacja wyników i równowagi kwasowo-zasadowej.
  - *Krok 5:* Farmakoterapia ratunkowa pierwszej linii (dokładne dawki w przeliczeniu na masę ciała, drogi podania, czas trwania wlewu).
  - *Krok 6:* Przełamywanie klasycznych pułapek LEK (np. unikanie leków przeciwwskazanych, rozpoznanie zjawisk paradoksalnych).
  - *Krok 7:* Zabiegi inwazyjne, kwalifikacja operacyjna lub zaawansowane procedury ratunkowe (intubacja RSI, drenaż opłucnej, nakłucie odbarczające, trombektomia, kardiowersja, plazmafereza).
  - *Krok 8:* Terapia celowana drugiej linii / korekta powikłań jatrogennych i metabolicznych.
  - *Krok 9+:* Postępowanie pooperacyjne, monitorowanie w OIT, kryteria stabilizacji oraz profilaktyka wtórna.

### 3.3. Anatomia pytań i dystraktorów
- **Poprawna odpowiedź:** Musi być w 100% zgodna z najnowszymi wytycznymi LEK/Szczeklika.
- **Dystraktory (błędne odpowiedzi):** Nie mogą być przypadkowe ani absurdalne. Muszą reprezentować:
  1. *Powszechny błąd intuicyjny* (np. podanie aspiryny w przełomie tarczycowym, podanie glikokortykosteroidów zamiast płynów w hipotensji DKA).
  2. *Lek bezwzględnie przeciwwskazany* (np. sukcynylocholina w miastenii, werapamil w VT, azotany w zawale prawej komory).
  3. *Postępowanie spóźnione lub odwróconą kolejność procedur* (np. podanie jodu przed tyreostatykiem w tarczycy, operacja pylorostenozy przed wyrównaniem elektrolitowym).

---

## 4. HARMONOGRAM WDRAŻANIA BAZY 265 PRZYPADKÓW

Pełna baza 265 przypadków została podzielona na 10 strategicznych klastrów klinicznych odzwierciedlających strukturę pytań Lekarskiego Egzaminu Końcowego oraz realia oddziałów szpitalnych:

```
+-----------------------------------------------------------------------------------+
|               STRATEGIA WDRAŻANIA BAZY 265 PRZYPADKÓW KLINICZNYCH                 |
+-----------------------------------------------------------------------------------+
|  FAZA 1: Dokończenie refaktoryzacji przypadków historycznych (#09 - #21)          |
|  FAZA 2: Kardiologia i Stany Nagłe Krążenia (25 przypadków)                       |
|  FAZA 3: Pulmonologia i Wentylacja Mechaniczna (20 przypadków)                    |
|  FAZA 4: Gastroenterologia, Hepatologia i Chirurgia Brzuszna (30 przypadków)       |
|  FAZA 5: Nefrologia, Toksykologia i Zaburzenia RKZ/Elektrolitowe (25 przypadków) |
|  FAZA 6: Neurologia i Neurotraumatologia (25 przypadków)                          |
|  FAZA 7: Endokrynologia i Diabetologia (20 przypadków)                            |
|  FAZA 8: Ginekologia, Położnictwo i Perinatologia (25 przypadków)                 |
|  FAZA 9: Pediatria i Chirurgia Dziecięca (35 przypadków)                          |
|  FAZA 10: Hematologia, Onkologia, Reumatologia, Infekcjologia (47 przypadków)    |
+-----------------------------------------------------------------------------------+
```

### 4.1. Faza 1: Najbliższe zadania refaktoryzacyjne (#09 do #21)
Poniższa lista definiuje bezpośrednią kolejność prac do dokończenia pierwszego modułu aplikacji:
- **#09: Zatorowość płucna wysokiego ryzyka (PE)** – wstrząs obstrukcyjny, kryteria ESC/PESI, tromboliza ogólnoustrojowa vs trombektomia mechaniczna, pułapka płynoterapii prawej komory.
- **#10: Ostre zapalenie trzustki (OZT)** – kryteria atlankie, wczesna agresywna płynoterapia mleczanem Ringera, rola ECPW w etiologii żółciowej, wskazania do antybiotykoterapii przy martwicy zakażonej.
- **#11: Odma prężna (Tension Pneumothorax)** – dekompresja igłowa w II m.ż. w linii środkowo-obojczykowej vs V m.ż. w linii pachowej przedniej, drenaż klatki piersiowej.
- **#12: Tamponada serca** – triada Becka, tętno paradoksalne, USG (objaw zapadania prawej komory), nakłucie worka osierdziowego (perikardiocenteza pod kontrolą USG).
- **#13: Rozwarstwienie aorty wstępującej (Stanford A)** – zróżnicowanie ciśnień na kończynach, pułapka podania heparyny lub trombolizy, natychmiastowa kontrola HR (esmolol/labetalol) i ciśnienia przed operacją kardiochirurgiczną.
- **#14: Anafilaksja i wstrząs anafilaktyczny** – adrenalina i.m. w przednio-boczną powierzchnię uda (0.5 mg), pozycja z uniesionymi kończynami, leki II rzutu (leki przeciwhistaminowe i hydrokortyzon) jako dodatek a nie baza.
- **#15: Pęknięty tętniak aorty brzusznej (rAAA)** – triada objawów, hipotensja kontrolowana (*permissive hypotension*), natychmiastowy transport na blok bez zbędnego TK przy niestabilności.
- **#16: Stan padaczkowy (Status Epilepticus)** – protokół czasowy 0–5–20–40 min: diazepam/lorazepam i.v., lewetyracetam/kwas walproinowy wlew, znieczulenie ogólne (propofol/midazolam) przy stanie opornym.
- **#17: Ostra niewydolność kory nadnerczy (Przełom nadnerczowy)** – oporna hipotensja, hiponatremia, hiperkaliemia, natychmiastowe podanie hydrokortyzonu 100 mg i.v. i $0{,}9\%\text{ NaCl}$ z glukozą.
- **#18: Udar niedokrwienny mózgu (Ischemic Stroke)** – okno trombolityczne 4.5 h (alteplaza), trombektomia mechaniczna do 6 h (lub do 24 h wg DAWN/DEFUSE-3), ścisła kontrola ciśnienia tętniczego ($<185/110\text{ mmHg}$).
- **#19: Krwawienie z górnego odcinka przewodu pokarmowego (Żylaki przełyku)** – terlipresyna/somatostatyna przed endoskopią, profilaktyka antybiotykowa (ceftriakson), gastroskopia w ciągu 12 h, opaskowanie żylaków, sonda Sengstakena-Blakemore'a jako ratunek.
- **#20: Sepsa i wstrząs septyczny** – pakiet *Surviving Sepsis Campaign 1-Hour Bundle*, krystaloidy $30\text{ ml/kg}$, noradrenalina wlew docelowy MAP $\ge 65\text{ mmHg}$, posiewy krwi przed szerokospektralnym antybiotykiem.
- **#21: Zaostrzenie POChP z kwasicą oddechową** – tlenoterapia kontrolowana (cel SpO2 88–92%), nieinwazyjna wentylacja mechaniczna (NIV) jako złoty standard przy kwasicy oddechowej ($pH < 7.35$), nebulizacje z SABA + SAMA, sterydoterapia ogólnoustrojowa.

---

## 5. STANDARD DEPLOYMENTU I INSTRUKCJA DLA AGENTA (Antigravity Protocol)

Gdy agent przystępuje do generowania i wdrażania kolejnych przypadków, musi bezwzględnie przestrzegać poniższego schematu operacyjnego:

1. **Konstrukcja treści medycznej:**
   - Opracowanie pełnego pliku JSON z zachowaniem kluczy: `id`, `slug`, `title`, `shortTitle`, `department`, `difficulty`, `diagnosis`, `vitals`, `story`, `labs`, `steps` (elastyczna liczba kroków $\ge 7$), `pathoNodes` (3 węzły), `diffTable` (4 wiersze), `dutySummary`, `lekQuestions` (10–12 pytań ze zrównoważonymi literami A–E) oraz `flashcards` (6–8 kart).
2. **Szyfrowanie i walidacja:**
   - Zapis pliku źródłowego (np. jako `temp_case_XX.json`).
   - Uruchomienie skryptu szyfrującego:
     ```powershell
     node scripts/encrypt_case.js temp_case_XX.json cases/XX_nazwa.json
     ```
   - Przeprowadzenie automatycznego testu odczytu deszyfrującego (*round-trip verification*).
   - Usunięcie pliku nieszyfrowanego `temp_case_XX.json`.
3. **Aktualizacja rejestrów:**
   - Dopisanie pliku `XX_nazwa.json` do `cases/manifest.json`.
   - Zaktualizowanie statusu w `cases_queue.json` na `"completed"`.
4. **Zarządzanie wersjami (Git):**
   - Wykonanie `git add cases/XX_nazwa.json cases/manifest.json cases_queue.json`.
   - Wykonanie czytelnego commitu: `git commit -m "Refactor Case #XX: Nazwa jednostki (...)"`.
   - Wypchnięcie zmian do zdalnego repozytorium przy użyciu autoryzacji tokenowej.

---
*Dokument zatwierdzony jako nadrzędny standard inżynieryjno-medyczny Symulatora Klinicznego.*
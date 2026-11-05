const fs = require('fs');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function fix() {
  // Fix Case 45 Step 6
  {
    const file = 'cases/45_sarkoidoza_lofgren.json';
    const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    
    c.steps[5].options = [
      {
        text: "Niesteroidowe leki przeciwzapalne (NLPZ, np. ibuprofen 400-600 mg 3x/d lub naproksen 500 mg 2x/d), odpoczynek fizyczny, elewacja kończyn dolnych oraz chłodne okłady; powstrzymanie się od włączania glikokortykosteroidów systemowych",
        correct: true,
        isCorrect: true,
        feedback: "✅ PRAWIDŁOWO! W niepowikłanym zespole Löfgrena lekami pierwszego rzutu są NLPZ! Zespół ten cechuje się wybitną tendencją do samoistnej remisji, a glikokortykosteroidy ogólne (np. prednizon) rezerwuje się wyłącznie dla przypadków z ciężkim zapaleniem oka, serca, OUN, hiperkalcemią lub opornością na NLPZ."
      },
      {
        text: "Terapia pulsacyjna metyloprednizolonem w dawce 1000 mg i.v. przez 5 dni z następowym włączeniem doustnego cyklofosfamidu w wysokich dawkach immunosupresyjnych",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Zespół Löfgrena cechuje się łagodnym przebiegiem i nie wymaga tak agresywnej immunosupresji – doskonale reaguje na leki z grupy NLPZ."
      },
      {
        text: "Wdrożenie infliksymabu (przeciwciała anty-TNF) w monoterapii dożylnej w połączeniu z agresywną plazmaferezą leczniczą bez uprzedniej próby leczenia objawowego",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Leki biologiczne (anty-TNF) są zarezerwowane wyłącznie dla ciężkiej, wielonarządowej, opornej na steroidy i metotreksat sarkoidozy."
      },
      {
        text: "Empiryczna celowana antybiotykoterapia cyprofloksacyną w dawce 500 mg co 12 godzin doustnie przez 30 dni z unieruchomieniem kończyn w opatrunku gipsowym",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Sarkoidoza jest niezakaźną chorobą ziarniniakową o podłożu immunologicznym, a nie infekcją bakteryjną – antybiotyki są całkowicie nieskuteczne."
      }
    ];

    const encrypted = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
    fs.writeFileSync(file, JSON.stringify(encrypted, null, 2), 'utf8');
    console.log('✓ Case #45 Step 6 fixed and re-encrypted.');
  }

  // Fix Case 100 Step 4
  {
    const file = 'cases/100_volvulus_skret_jelita.json';
    const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);

    c.steps[3].options = [
      {
        text: "Nieprawidłowe położenie zgięcia dwunastniczo-czczego (kąta Treitza) na prawo od linii kręgosłupa oraz obraz 'korkociągu' (corkscrew sign) w skręconym odcinku dwunastnicy i jelita czczego",
        correct: true,
        isCorrect: true,
        feedback: "✅ PRAWIDŁOWO! W badaniu UGI prawidłowy kąt Treitza leży na lewo od lewego zarysu kręgosłupa i na wysokości opuszki dwunastnicy. W malrotacji ze skrętem kąt Treitza leży po prawej stronie lub nisko, a pętle skręconej dwunastnicy tworzą spiralny obraz przypominający korkociąg (corkscrew appearance) lub dochodzi do całkowitego zatrzymania kontrastu (objaw 'dzioba ptaka')."
      },
      {
        text: "Prawidłowe anatomiczne położenie jelita cienkiego wyłącznie po lewej stronie jamy brzusznej z zachowanym fizjologicznym pasażem środka cieniującego",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Prawidłowo jelito czcze leży w lewym górnym kwadrancie, ale po przejściu kąta Treitza na lewo od kręgosłupa – obraz ten nie potwierdza skrętu jelita."
      },
      {
        text: "Obraz 'zębów piły' w bańce odbytnicy z poszerzeniem esicy i brakiem jakichkolwiek cech niedrożności mechanicznej na poziomie dwunastnicy",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Obraz 'zębów piły' lub strefy przejściowej w odbytnicy jest typowy dla choroby Hirschsprunga w badaniu wlewem doodbytniczym, a nie skrętu jelita środkowego."
      },
      {
        text: "Całkowity brak cienia żołądka w badaniu kontrastowym z zaleceniem powtórzenia badania za 24 godziny po próbie karmienia mlekiem modyfikowanym",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Brak wypełnienia żołądka sugerowałby atrezję przełyku, a odroczenie diagnostyki u noworodka ze skrętem jelita grozi całkowitą martwicą jelita cienkiego."
      }
    ];

    const encrypted = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
    fs.writeFileSync(file, JSON.stringify(encrypted, null, 2), 'utf8');
    console.log('✓ Case #100 Step 4 fixed and re-encrypted.');
  }
}

fix().catch(console.error);

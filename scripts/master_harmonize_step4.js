const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const curated78 = require('./curated_78_steps.js');
const MASTER_KEY = '@LEKSzymon28111999';

// Diverse, clinically authentic expansions
const PHARMA_EXPANSIONS = [
  'w dawce należnej z monitorowaniem ciśnienia tętniczego i akcji serca',
  'w celu szybkiej redukcji obciążenia wstępnego i ochrony perfuzji narządowej',
  'zgodnie ze schematem leczenia ratunkowego przed wdrożeniem dalszej terapii',
  'w powolnym wlewie dożylnym z kontrolą diurezy i saturacji obwodowej',
  'w celu ograniczenia progresji ostrej niewydolności krążeniowo-oddechowej',
  'w celu natychmiastowej stabilizacji parametrów hemodynamicznych i ochrony narządowej'
];

const DIAGNOSTIC_EXPANSIONS = [
  'jako badanie pierwszego rzutu przed podjęciem jakichkolwiek decyzji terapeutycznych',
  'w trybie pilnym w celu natychmiastowego potwierdzenia wstępnego rozpoznania',
  'w protokole standardowym z oceną parametrów biochemicznych i gazometrii',
  'w celu wykluczenia ostrych powikłań narządowych przed rozpoczęciem leczenia',
  'z oceną wskaźników perfuzji i parametrów życiowych przed kwalifikacją do zabiegu'
];

const WITHHOLD_EXPANSIONS = [
  'z obawy przed powikłaniami jatrogennymi i nagłą dekompensacją hemodynamiczną',
  'do czasu uzyskania pełnego panelu badań laboratoryjnych z krwi obwodowej',
  'w oczekiwaniu na dalszy rozwój dynamiki klinicznej i ocenę starszego dyżurnego',
  'uznając aktualny stan pacjenta za stabilny i niewymagający pilnej eskalacji',
  'z obawy przed zamaskowaniem objawów otrzewnowych w badaniu przedmiotowym brzucha'
];

const PROCEDURE_EXPANSIONS = [
  'w trybie ostrodyżurowym w celu natychmiastowego opanowania zagrożenia życia',
  'w znieczuleniu miejscowym z oszczędzeniem otaczających struktur anatomicznych',
  'w celu opanowania ostrego krwotoku i zabezpieczenia prawidłowej hemostazy',
  'w trybie pilnym po uprzednim ustabilizowaniu parametrów krytycznych pacjenta'
];

const GENERAL_EXPANSIONS = [
  'w celu zapewnienia stabilności klinicznej i bezpiecznej obserwacji na oddziale',
  'w ramach monitorowania parametrów życiowych i wczesnego wykrywania dekompensacji',
  'z zaleceniem pilnej kontroli w razie jakiegokolwiek pogorszenia stanu ogólnego',
  'traktując ten obraz jako odczyn czynnościowy niewymagający natychmiastowej eskalacji'
];

function pickPhrase(arr, seed) {
  return arr[Math.abs(seed) % arr.length];
}

function cleanDistractor(text) {
  let t = text.trim();
  t = t.replace(/, traktując ten mechanizm jako wiodący czynnik determinujący aktualny stan kliniczny pacjenta\.?$/i, '');
  t = t.replace(/, uznając ten stan za przejściowy odczyn bez cech powikłań\.?$/i, '');
  if (t.endsWith('.')) t = t.slice(0, -1);
  return t.trim();
}

function cleanCorrectOption(text) {
  let t = text.trim();
  if (t.length <= 210) return t;

  // Embedded lectures
  t = t.replace(/;\s*(?:KLUCZOWA ZASADA|PAMIĘTAJ|UWAGA|ZAPAMIĘTAJ|WSKAZÓWKA):[\s\S]*$/i, '.');

  // If still very long (>240c) and has a clean semicolon clause
  if (t.length > 240) {
    const semiMatch = t.match(/^([^;]{120,210});/);
    if (semiMatch) {
      t = semiMatch[1].trim();
      if (!t.endsWith('.')) t += '.';
    }
  }

  return t;
}

function naturalEnrich(text, targetLen, seed) {
  let t = cleanDistractor(text);

  if (t.length >= targetLen * 0.85) {
    if (!t.endsWith('.')) t += '.';
    return t;
  }

  let phrase = '';
  if (/^(odstępuj|wstrzymuj|zaniechani|brak konieczności|nie ma konieczności|odraczam|nie podaj)/i.test(t)) {
    phrase = pickPhrase(WITHHOLD_EXPANSIONS, seed);
  } else if (/^(podaj|wlew|zlecam|wstrzyknięci|bolus|transfuzj|droga|inhalacj|suplementacj|dawka|insulina|glukoza|wapń|antybiotyk|antykoagulacj)/i.test(t)) {
    phrase = pickPhrase(PHARMA_EXPANSIONS, seed);
  } else if (/^(badanie|wykonan|oznaczen|rtg|tk|usg|tomograf|rezonans|nakłuci|pobranie|gazometri|biopsj|morfologi|posiew)/i.test(t)) {
    phrase = pickPhrase(DIAGNOSTIC_EXPANSIONS, seed);
  } else if (/^(zabieg|operacj|laparotomi|torakotomi|drenaż|intubacj|kardiowersj|defibrylacj|resekcj)/i.test(t)) {
    phrase = pickPhrase(PROCEDURE_EXPANSIONS, seed);
  } else {
    phrase = pickPhrase(GENERAL_EXPANSIONS, seed);
  }

  if (!t.toLowerCase().includes(phrase.slice(0, 15).toLowerCase())) {
    t += ' ' + phrase;
  }

  if (!t.endsWith('.')) t += '.';
  return t;
}

async function run() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  let totalCasesUpdated = 0;
  let curatedAppliedCount = 0;

  for (const f of files) {
    const m = f.match(/^0*(\d+)_/);
    if (!m) continue;
    const caseId = parseInt(m[1], 10);
    // Never modify Cases 1 and 2 (benchmark)
    if (caseId <= 2) continue;

    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    if (!c.steps) continue;

    let modified = false;

    c.steps.forEach((s, sIdx) => {
      const stepNum = sIdx + 1;
      const curatedKey = `${caseId}_${stepNum}`;

      if (curated78[curatedKey]) {
        const item = curated78[curatedKey];
        const correctOpt = s.options.find(o => o.correct);
        const wrongOpts = s.options.filter(o => !o.correct);

        if (correctOpt) {
          correctOpt.text = item.correct;
        }
        item.wrong.forEach((wText, wIdx) => {
          if (wrongOpts[wIdx]) {
            wrongOpts[wIdx].text = wText;
          }
        });
        curatedAppliedCount++;
        modified = true;
      } else {
        const correctOpt = s.options.find(o => o.correct);
        if (!correctOpt) return;

        // Clean & tighten correct
        const originalCText = correctOpt.text;
        const cleanedCText = cleanCorrectOption(originalCText);
        if (cleanedCText !== originalCText) {
          correctOpt.text = cleanedCText;
          modified = true;
        }

        const cLen = correctOpt.text.length;
        const targetLen = Math.max(130, Math.min(210, Math.round(cLen * 0.95)));

        // Enrich distractors
        let optSeed = caseId * 10 + stepNum;
        s.options.forEach(o => {
          if (!o.correct) {
            optSeed += 7;
            const originalWText = o.text;
            const enriched = naturalEnrich(originalWText, targetLen, optSeed);
            if (enriched !== originalWText) {
              o.text = enriched;
              modified = true;
            }
          }
        });
      }
    });

    if (modified) {
      const encrypted = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
      fs.writeFileSync(path.join('cases', f), JSON.stringify(encrypted, null, 2), 'utf8');
      totalCasesUpdated++;
    }
  }

  console.log(`Harmonization complete!`);
  console.log(`Curated 78-step items applied: ${curatedAppliedCount}`);
  console.log(`Cases updated and re-encrypted: ${totalCasesUpdated}`);
}

run().catch(console.error);

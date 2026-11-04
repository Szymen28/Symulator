const fs = require('fs');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

function enrichDistractor(text, targetLen, stepTitle, caseTitle) {
  let t = text.trim();
  if (t.endsWith('.')) t = t.slice(0, -1);
  
  if (t.length >= targetLen * 0.85) return text;

  // Warianty kontekstowe
  if (/^(odstępuję|zaniechanie|wstrzymuj|brak konieczności|nie ma konieczności|odraczam)/i.test(t)) {
    if (!t.includes('uznając') && !t.includes('z obawy') && !t.includes('w celu')) {
      t += ' z obawy przed powikłaniami jatrogennymi oraz w oczekiwaniu na dalszy rozwój dynamiki obrazu klinicznego';
    }
  } else if (/^(podaj|wlew|zlecam|wstrzyknięcie|bolus|transfuzja|droga|inhalacj|suplementacj)/i.test(t)) {
    if (!t.includes('w celu') && !t.includes('pod kontrolą') && !t.includes('z założeniem')) {
      t += ' w celu natychmiastowej stabilizacji parametrów hemodynamicznych i zabezpieczenia chorego przed dekompensacją';
    }
  } else if (/^(badanie|wykonan|oznaczen|rtg|tk|usg|tomograf|rezonans|nakłuci|pobranie|gazometri)/i.test(t)) {
    if (!t.includes('w celu') && !t.includes('jako badanie') && !t.includes('przed podjęciem')) {
      t += ' jako badanie pierwszego rzutu przed podjęciem jakichkolwiek inwazyjnych decyzji terapeutycznych';
    }
  } else if (/^(zabieg|operacj|laparotomi|torakotomi|drenaż|intubacj|kardiowersj|defibrylacj)/i.test(t)) {
    if (!t.includes('w celu') && !t.includes('w trybie') && !t.includes('z następowym')) {
      t += ' w trybie pilnym w celu natychmiastowego opanowania zagrożenia życia i zabezpieczenia funkcji życiowych';
    }
  }

  if (t.length < targetLen * 0.75) {
    t += ', traktując ten mechanizm jako wiodący czynnik determinujący aktualny stan kliniczny pacjenta';
  }

  if (!t.endsWith('.')) t += '.';
  return t;
}

function tightenCorrectOption(text) {
  let t = text.trim();
  if (t.length <= 220) return text;

  t = t.replace(/;\s*(?:KLUCZOWA ZASADA|PAMIĘTAJ|UWAGA):[\s\S]*$/i, '.');

  if (t.length > 260) {
    const parts = t.split(/;\s+/);
    if (parts.length > 1 && parts[0].length >= 140) {
      t = parts[0];
      if (!t.endsWith('.')) t += '.';
    }
  }
  return t;
}

async function balanceCase(caseObj) {
  let changed = false;

  caseObj.steps.forEach(s => {
    const correctOpt = s.options.find(o => o.correct);
    if (!correctOpt) return;

    const originalCLen = correctOpt.text.length;
    if (originalCLen > 250) {
      const tightened = tightenCorrectOption(correctOpt.text);
      if (tightened !== correctOpt.text) {
        correctOpt.text = tightened;
        changed = true;
      }
    }

    const cLen = correctOpt.text.length;
    const targetDistractorLen = Math.max(140, Math.min(220, Math.round(cLen * 0.95)));

    s.options.forEach(o => {
      if (!o.correct && o.text.length < targetDistractorLen * 0.8) {
        const enriched = enrichDistractor(o.text, targetDistractorLen, s.title, caseObj.shortTitle || caseObj.title);
        if (enriched !== o.text) {
          o.text = enriched;
          changed = true;
        }
      }
    });
  });

  return changed;
}

async function run() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  let processedCount = 0;

  for (const f of files) {
    const m = f.match(/^0*(\d+)_/);
    if (!m) continue;
    const id = parseInt(m[1], 10);
    // Cases 1-10 are already balanced
    if (id <= 10) continue;

    const raw = JSON.parse(fs.readFileSync('cases/' + f, 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    if (!c.steps) continue;

    const changed = await balanceCase(c);
    if (changed) {
      const enc = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
      fs.writeFileSync('cases/' + f, JSON.stringify(enc, null, 2), 'utf8');
      processedCount++;
    }
  }

  console.log(`Pomyślnie zbalansowano opcje kroków symulacji w ${processedCount} pozostałych przypadkach (#11 - #150)!`);
}

run().catch(console.error);

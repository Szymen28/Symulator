const fs = require('fs');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

// Reguły inteligentnego wzbogacania dystraktorów w oparciu o ich treść kliniczną
function enrichDistractor(text, targetLen, stepTitle, caseTitle) {
  let t = text.trim();
  if (t.endsWith('.')) t = t.slice(0, -1);
  
  // Jeśli już jest odpowiedniej długości, zostaw
  if (t.length >= targetLen * 0.85) return text;

  // Sprawdź czy to zaniechanie/odstąpienie
  if (/^(odstępuję|zaniechanie|wstrzymuj|brak konieczności|nie ma konieczności)/i.test(t)) {
    if (!t.includes('uznając') && !t.includes('z obawy') && !t.includes('w celu')) {
      t += ' z obawy przed powikłaniami jatrogennymi oraz w oczekiwaniu na dalszy rozwój dynamiki obrazu klinicznego';
    }
  }
  // Sprawdź czy to podanie leku/płynu
  else if (/^(podaj|wlew|zlecam|wstrzyknięcie|bolus|transfuzja|droga)/i.test(t)) {
    if (!t.includes('w celu') && !t.includes('pod kontrolą') && !t.includes('z założeniem')) {
      t += ' w celu szybkiej stabilizacji parametrów hemodynamicznych i zabezpieczenia chorego przed dekompensacją';
    }
  }
  // Sprawdź czy to badanie obrazowe/laboratoryjne
  else if (/^(badanie|wykonan|oznaczen|rtg|tk|usg|tomograf|rezonans|nakłuci)/i.test(t)) {
    if (!t.includes('w celu') && !t.includes('jako badanie') && !t.includes('przed podjęciem')) {
      t += ' jako badanie pierwszego rzutu przed podjęciem jakichkolwiek inwazyjnych decyzji terapeutycznych';
    }
  }
  // Domyślne rozbudowanie zdania klinicznego jeśli nadal zbyt krótkie
  if (t.length < targetLen * 0.75) {
    t += ', traktując ten mechanizm jako wiodący czynnik determinujący aktualny stan kliniczny pacjenta';
  }

  // Zapewnij kropkę na końcu
  if (!t.endsWith('.')) t += '.';
  return t;
}

// Funkcja kondensująca przegadane odpowiedzi prawidłowe (jeśli >260c)
function tightenCorrectOption(text) {
  let t = text.trim();
  if (t.length <= 220) return text;

  // Usuń meta-uwagi typu KLUCZOWA ZASADA jeśli są doklejone na końcu
  t = t.replace(/;\s*(?:KLUCZOWA ZASADA|PAMIĘTAJ|UWAGA):[\s\S]*$/i, '.');

  // Jeśli zdanie nadal jest bardzo długie (>260c) i ma wielokrotnie złożone części
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

  caseObj.steps.forEach((s, sIdx) => {
    const correctOpt = s.options.find(o => o.correct);
    if (!correctOpt) return;

    // 1. Opcjonalne ściągnięcie nadmiernie rozdętej poprawnej odpowiedzi
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

    // 2. Wzbogacenie zbyt krótkich dystraktorów
    s.options.forEach((o, oIdx) => {
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

async function testCases3To10() {
  const targetIds = [3, 4, 5, 6, 7, 8, 9, 10];
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));

  console.log('=== TEST BALANSOWANIA PRZYPADKÓW #3 - #10 ===');

  for (const id of targetIds) {
    const f = files.find(file => {
      const m = file.match(/^0*(\d+)_/);
      return m && parseInt(m[1], 10) === id;
    });
    if (!f) continue;
    const raw = JSON.parse(fs.readFileSync('cases/' + f, 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);

    // Stats before
    let beforeRatios = [];
    c.steps.forEach(s => {
      const cO = s.options.find(o => o.correct);
      const wO = s.options.filter(o => !o.correct).map(o => o.text.length);
      const avgW = wO.reduce((a,b)=>a+b,0)/wO.length;
      beforeRatios.push(cO.text.length / avgW);
    });
    const avgBefore = (beforeRatios.reduce((a,b)=>a+b,0)/beforeRatios.length).toFixed(2);

    // Apply
    await balanceCase(c);

    // Stats after
    let afterRatios = [];
    let longestCount = 0;
    c.steps.forEach(s => {
      const cO = s.options.find(o => o.correct);
      const wO = s.options.filter(o => !o.correct).map(o => o.text.length);
      const avgW = wO.reduce((a,b)=>a+b,0)/wO.length;
      const maxL = Math.max(...s.options.map(o => o.text.length));
      if (cO.text.length === maxL) longestCount++;
      afterRatios.push(cO.text.length / avgW);
    });
    const avgAfter = (afterRatios.reduce((a,b)=>a+b,0)/afterRatios.length).toFixed(2);

    console.log(`Przypadek #${c.id} (${c.dept}): Śr. ratio PRZED = ${avgBefore} ➔ PO = ${avgAfter} | Najdłuższa odp: ${longestCount}/${c.steps.length}`);

    // Save encrypted
    const enc = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
    fs.writeFileSync('cases/' + f, JSON.stringify(enc, null, 2), 'utf8');
  }
}

testCases3To10().catch(console.error);

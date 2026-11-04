const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const MASTER_KEY = '@LEKSzymon28111999';
const CASES_DIR = path.join(__dirname, '..', 'cases');

async function deriveAesKey(password, salt) {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

async function decrypt(data, password) {
  const salt = Buffer.from(data.salt, 'base64');
  const iv = Buffer.from(data.iv, 'base64');
  const key = await deriveAesKey(password, salt);
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, Buffer.from(data.ciphertext, 'base64'));
  return JSON.parse(new TextDecoder().decode(decrypted));
}

async function runIntegrityCheck() {
  console.log("================ PLATFORM INTEGRITY & BENCHMARK AUDIT ================\n");

  const manifest = JSON.parse(fs.readFileSync(path.join(CASES_DIR, 'manifest.json'), 'utf8'));
  const catalog = JSON.parse(fs.readFileSync(path.join(CASES_DIR, 'catalog.json'), 'utf8'));
  const flashcards = JSON.parse(fs.readFileSync(path.join(CASES_DIR, 'flashcards_index.json'), 'utf8'));

  console.log(`✓ Total Cases in Manifest: ${manifest.length}`);
  console.log(`✓ Total Cases in Catalog Index: ${catalog.length}`);
  console.log(`✓ Total Flashcards Indexed: ${flashcards.length}\n`);

  // 1. Audit Case #10 (Critical Vitals Test)
  const c10Raw = JSON.parse(fs.readFileSync(path.join(CASES_DIR, '10_hiperkaliemia.json'), 'utf8'));
  const c10 = await decrypt(c10Raw, MASTER_KEY);
  const c10Vitals = c10.vitals.map(v => v.status);
  console.log(`[TEST 1] Case #10 (Hiperkaliemia 8.4 mmol/l) Vitals Statuses: [${c10Vitals.join(', ')}]`);
  if (c10Vitals.every(s => s === 'vital-crit')) {
    console.log("  --> PASS: Wszelkie krytyczne parametry (K+ 8.4, fala sinusoidalna, hipotensja 85/50) pulsują na czerwono!\n");
  } else {
    console.error("  --> FAIL: Parametry krytyczne nie zostały oznaczone jako vital-crit!\n");
  }

  // 2. Audit Cases 101–110 (Feedback duplication & Patho Targets)
  let duplicateFeedbackCount = 0;
  let pathoTargetsWithPills = 0;

  for (let id = 101; id <= 110; id++) {
    const fn = manifest.find(f => f.startsWith(String(id) + '_'));
    const c = await decrypt(JSON.parse(fs.readFileSync(path.join(CASES_DIR, fn), 'utf8')), MASTER_KEY);
    c.steps.forEach(st => {
      st.options.forEach(opt => {
        if (opt.feedback.includes('❌ BŁĄD! ✅') || opt.feedback.includes('✅ PRAWIDŁOWO! ❌')) {
          duplicateFeedbackCount++;
        }
      });
    });
    c.pathoNodes.forEach(n => {
      if (n.target && n.target.includes('dose-pill')) pathoTargetsWithPills++;
    });
  }

  console.log(`[TEST 2] Cases 101–110 Duplicate Feedback Prefix Count: ${duplicateFeedbackCount}`);
  if (duplicateFeedbackCount === 0) {
    console.log("  --> PASS: Usunięto wszelkie powielone prefiksy 'czerwony X błąd ptaszek prawidłowo'!");
  } else {
    console.error(`  --> FAIL: Znaleziono ${duplicateFeedbackCount} powielonych prefiksów!`);
  }

  console.log(`[TEST 3] Cases 101–110 PathoNodes Targets with concrete drugs & dose-pills: ${pathoTargetsWithPills} / 40`);
  if (pathoTargetsWithPills >= 30) {
    console.log("  --> PASS: Punkty uchwytu zawierają konkretne leki z dawkami i procedury!\n");
  } else {
    console.error("  --> FAIL: Zbyt mało punktów uchwytu posiada konkretne leki/dawki!\n");
  }

  // 3. Audit Cases 3–100 (Unification to Gold Standard)
  let pStoryTotal = 0;
  let dosePillsTotal = 0;
  let diffDuelTotal = 0;
  let invalidStatusCount = 0;

  for (let id = 3; id <= 100; id++) {
    const fn = manifest.find(f => f.startsWith((id < 10 ? '0' + id : id) + '_') || f.startsWith(String(id) + '_'));
    if (!fn) continue;
    const c = await decrypt(JSON.parse(fs.readFileSync(path.join(CASES_DIR, fn), 'utf8')), MASTER_KEY);

    if (c.story && c.story.includes('<p><strong>Pacjent') && c.story.includes('<strong>Wywiad chorobowy') && c.story.includes('<strong>Badanie przedmiotowe')) {
      pStoryTotal++;
    }
    if (c.dutySummary && c.dutySummary.drugsAndDoses && c.dutySummary.drugsAndDoses.includes('dose-pill')) {
      dosePillsTotal++;
    }
    if (c.diffTable && c.diffTable.title && c.diffTable.title.includes('⚔️')) {
      diffDuelTotal++;
    }
    if (Array.isArray(c.vitals)) {
      c.vitals.forEach(v => {
        if (!['vital-crit', 'vital-warn', 'vital-ok'].includes(v.status)) {
          invalidStatusCount++;
        }
      });
    }
  }

  console.log(`[TEST 4] Cases 3–100 (98 cases) Gold Standard Compliance:`);
  console.log(`  - 3-częściowa historia HTML (<p><strong>Pacjent...): ${pStoryTotal} / 98`);
  console.log(`  - Podsumowanie z niebieskimi pastylkami dawek (dose-pill): ${dosePillsTotal} / 98`);
  console.log(`  - Tabela różnicowa z ikoną pojedynku (⚔️): ${diffDuelTotal} / 98`);
  console.log(`  - Parametry z nieprawidłowym statusem: ${invalidStatusCount}`);

  if (pStoryTotal === 98 && dosePillsTotal === 98 && diffDuelTotal === 98 && invalidStatusCount === 0) {
    console.log("\n>>> WYNIK AUDYTU: 100% SUKCES! WSZYSTKIE PRZYPADKI 3–100 ZGODNE Z BENCHMARKIEM #1 i #2! <<<\n");
  } else {
    console.error("\n>>> WYNIK AUDYTU: Wykryto niespójności! Wymagana korekta. <<<\n");
  }
}

runIntegrityCheck();

const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const files = [
  '146_zespol_usidlenia_tetnicy_podkolanowej_paes.json',
  '147_zespol_podkradania_tetnicy_podobojczykowej.json',
  '148_polytrauma_uraz_wielonarzadowy.json',
  '149_wiotka_klatka_piersiowa_flail_chest.json',
  '150_masywny_krwiak_oplucnej_haemothorax.json'
];

async function verifyBatch8() {
  console.log("=== VERIFYING BATCH 8 (Cases 146 to 150) ===");
  let allPass = true;

  for (const filename of files) {
    const filePath = path.join(__dirname, '../cases', filename);
    if (!fs.existsSync(filePath)) {
      console.error(`[FAIL] File not found: ${filename}`);
      allPass = false;
      continue;
    }

    const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    let data;
    try {
      data = await decryptObjectAes(raw, MASTER_KEY);
    } catch (e) {
      console.error(`[FAIL] Decryption failed for ${filename}:`, e.message);
      allPass = false;
      continue;
    }

    const errors = [];

    // 1. Dept & Titles
    if (!data.dept || typeof data.dept !== 'string') errors.push("Missing or invalid dept");
    if (!data.shortTitle || !data.diagnosisTitle) errors.push("Missing shortTitle or diagnosisTitle");

    // 2. Vitals
    if (!Array.isArray(data.vitals) || data.vitals.length !== 4) errors.push(`vitals length is ${data.vitals?.length}, expected 4`);
    if (!data.vitalsObj || !data.vitalsObj.hr || !data.vitalsObj.bp) errors.push("Missing vitalsObj");

    // 3. Story
    if (!data.story || !data.story.includes('<strong>Pacjent') || !data.story.includes('Wywiad chorobowy') || !data.story.includes('Badanie przedmiotowe')) {
      errors.push("Story missing 3-part semantic structure (Pacjent, Wywiad chorobowy, Badanie przedmiotowe)");
    }

    // 4. Steps (must be 8)
    if (!Array.isArray(data.steps) || data.steps.length !== 8) {
      errors.push(`steps length is ${data.steps?.length}, expected 8`);
    } else {
      data.steps.forEach((s, idx) => {
        if (!s.title || !s.question || !s.explanation) errors.push(`Step ${idx+1} missing title, question or explanation`);
        if (!Array.isArray(s.options) || s.options.length < 4) errors.push(`Step ${idx+1} options < 4`);
        if (typeof s.correct !== 'number') errors.push(`Step ${idx+1} missing correct idx`);
        if (!Array.isArray(s.feedback) || s.feedback.length !== s.options.length) {
          errors.push(`Step ${idx+1} feedback length mismatch`);
        } else {
          s.feedback.forEach((f, fIdx) => {
            if (!f.startsWith('✅') && !f.startsWith('❌')) {
              errors.push(`Step ${idx+1} feedback ${fIdx} missing ✅/❌ prefix`);
            }
          });
        }
      });
    }

    // 5. PathoNodes (must be 4, dose-pills)
    if (!Array.isArray(data.pathoNodes) || data.pathoNodes.length !== 4) {
      errors.push(`pathoNodes length is ${data.pathoNodes?.length}, expected 4`);
    } else {
      data.pathoNodes.forEach((p, idx) => {
        if (!p.badge || !p.title || !p.short || !p.detail) errors.push(`PathoNode ${idx+1} incomplete`);
        const targetStr = (p.drugTarget || "") + (p.target || "");
        if (!targetStr.includes('dose-pill')) errors.push(`PathoNode ${idx+1} missing dose-pill in drugTarget/target`);
      });
    }

    // 6. DiffTable (must start with ⚔️, >=6 rows)
    if (!data.diffTable || !data.diffTable.title || !data.diffTable.title.includes('⚔️')) {
      errors.push("diffTable title missing ⚔️");
    }
    if (!data.diffTable || !Array.isArray(data.diffTable.rows) || data.diffTable.rows.length < 6) {
      errors.push(`diffTable rows count is ${data.diffTable?.rows?.length}, expected >= 6`);
    }

    // 7. DutySummary (5 fields, dose-pills)
    if (!data.dutySummary || !data.dutySummary.overview || !data.dutySummary.diagnostics || !data.dutySummary.drugsAndDoses || !data.dutySummary.procedures || !data.dutySummary.monitoring) {
      errors.push("dutySummary missing required 5 fields");
    } else {
      if (!data.dutySummary.drugsAndDoses.includes('dose-pill')) {
        errors.push("dutySummary.drugsAndDoses missing dose-pill");
      }
    }

    // 8. LEK Questions (must be 11, 5 options each, detailed expl)
    if (!Array.isArray(data.lekQuestions) || data.lekQuestions.length !== 11) {
      errors.push(`lekQuestions length is ${data.lekQuestions?.length}, expected 11`);
    } else {
      data.lekQuestions.forEach((q, idx) => {
        if (!q.question) errors.push(`LEK Q${idx+1} missing question`);
        if (!Array.isArray(q.options) || q.options.length !== 5) errors.push(`LEK Q${idx+1} options length is ${q.options?.length}, expected 5`);
        if (typeof q.correct !== 'number') errors.push(`LEK Q${idx+1} missing correct idx`);
        if (!q.expl || q.expl.length < 30) errors.push(`LEK Q${idx+1} explanation too short`);
        if (!q.opts || q.correctIdx === undefined || !q.exp) errors.push(`LEK Q${idx+1} missing mirrored fields (opts, correctIdx, exp)`);
      });
    }

    // 9. Flashcards (must be 6)
    if (!Array.isArray(data.flashcards) || data.flashcards.length !== 6) {
      errors.push(`flashcards length is ${data.flashcards?.length}, expected 6`);
    } else {
      data.flashcards.forEach((f, idx) => {
        if (!f.front || !f.back) errors.push(`Flashcard ${idx+1} missing front or back`);
      });
    }

    if (errors.length > 0) {
      console.error(`[FAIL] ${filename} had ${errors.length} errors:`);
      errors.forEach(e => console.error(`  - ${e}`));
      allPass = false;
    } else {
      console.log(`[PASS] Case #${data.id}: ${filename} (100% PERFECT PASS)`);
    }
  }

  if (allPass) {
    console.log("\n>>> ALL BATCH 8 CASES (146-150) PASSED VERIFICATION WITH 100% COMPLIANCE! <<<");
  } else {
    console.error("\n>>> VERIFICATION FAILED FOR ONE OR MORE CASES IN BATCH 8 <<<");
    process.exit(1);
  }
}

verifyBatch8().catch(err => {
  console.error("Verification error:", err);
  process.exit(1);
});

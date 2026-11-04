const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function verifyAll111To150() {
  console.log("==================================================================");
  console.log("       COMPREHENSIVE MASTER AUDIT: CASES #111 TO #150            ");
  console.log("==================================================================");

  const files = fs.readdirSync(path.join(__dirname, '../cases'))
    .filter(f => {
      const match = f.match(/^(\d+)_/);
      if (!match) return false;
      const num = parseInt(match[1], 10);
      return num >= 111 && num <= 150;
    })
    .sort((a, b) => parseInt(a) - parseInt(b));

  console.log(`Found ${files.length} cases in range #111 - #150.`);
  if (files.length !== 40) {
    console.error(`Expected exactly 40 cases, but found ${files.length}!`);
    process.exit(1);
  }

  let totalErrors = 0;

  for (const filename of files) {
    const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '../cases', filename), 'utf-8'));
    let data;
    try {
      data = await decryptObjectAes(raw, MASTER_KEY);
    } catch (e) {
      console.error(`[FAIL DECRYPT] ${filename}: ${e.message}`);
      totalErrors++;
      continue;
    }

    const caseErrors = [];

    // 1. Dept & Titles
    if (!data.dept || typeof data.dept !== 'string') caseErrors.push("Missing or invalid dept");
    if (!data.shortTitle || !data.diagnosisTitle) caseErrors.push("Missing shortTitle or diagnosisTitle");

    // 2. Vitals
    if (!Array.isArray(data.vitals) || data.vitals.length !== 4) caseErrors.push(`vitals length is ${data.vitals?.length}, expected 4`);
    if (!data.vitalsObj || !data.vitalsObj.hr || !data.vitalsObj.bp) caseErrors.push("Missing vitalsObj");

    // 3. Story
    if (!data.story || !data.story.includes('<p><strong>Pacjent') || !data.story.includes('Wywiad chorobowy') || !data.story.includes('Badanie przedmiotowe')) {
      caseErrors.push("Story missing 3-part semantic structure (Pacjent, Wywiad chorobowy, Badanie przedmiotowe)");
    }

    // 4. Steps (must be 8)
    if (!Array.isArray(data.steps) || data.steps.length !== 8) {
      caseErrors.push(`steps length is ${data.steps?.length}, expected 8`);
    } else {
      data.steps.forEach((s, idx) => {
        if (!s.title || (!s.question && !s.title) || (!s.explanation && !s.desc)) caseErrors.push(`Step ${idx+1} missing title, question or explanation`);
        if (!Array.isArray(s.options) || s.options.length < 4) caseErrors.push(`Step ${idx+1} options < 4`);
        if (typeof s.correct !== 'number' && typeof s.correctIdx !== 'number') caseErrors.push(`Step ${idx+1} missing correct idx`);
        if (!Array.isArray(s.feedback) || s.feedback.length !== s.options.length) {
          caseErrors.push(`Step ${idx+1} feedback length mismatch`);
        } else {
          s.feedback.forEach((f, fIdx) => {
            if (!f.startsWith('✅') && !f.startsWith('❌')) {
              caseErrors.push(`Step ${idx+1} feedback ${fIdx} missing ✅/❌ prefix`);
            }
          });
        }
      });
    }

    // 5. PathoNodes (must be 4, dose-pills)
    if (!Array.isArray(data.pathoNodes) || data.pathoNodes.length !== 4) {
      caseErrors.push(`pathoNodes length is ${data.pathoNodes?.length}, expected 4`);
    } else {
      data.pathoNodes.forEach((p, idx) => {
        if (!p.badge || !p.title || !p.short || !p.detail) caseErrors.push(`PathoNode ${idx+1} incomplete`);
        const targetStr = (p.drugTarget || "") + (p.target || "");
        if (!targetStr.includes('dose-pill')) caseErrors.push(`PathoNode ${idx+1} missing dose-pill in drugTarget/target`);
      });
    }

    // 6. DiffTable (must start with ⚔️, >=6 rows)
    if (!data.diffTable || !data.diffTable.title || !data.diffTable.title.includes('⚔️')) {
      caseErrors.push("diffTable title missing ⚔️");
    }
    if (!data.diffTable || !Array.isArray(data.diffTable.rows) || data.diffTable.rows.length < 6) {
      caseErrors.push(`diffTable rows count is ${data.diffTable?.rows?.length}, expected >= 6`);
    }

    // 7. DutySummary (5 fields, dose-pills)
    if (!data.dutySummary || !data.dutySummary.overview || !data.dutySummary.diagnostics || !data.dutySummary.drugsAndDoses || !data.dutySummary.procedures || !data.dutySummary.monitoring) {
      caseErrors.push("dutySummary missing required 5 fields");
    } else {
      if (!data.dutySummary.drugsAndDoses.includes('dose-pill')) {
        caseErrors.push("dutySummary.drugsAndDoses missing dose-pill");
      }
    }

    // 8. LEK Questions (must be 11, 5 options each, detailed expl)
    if (!Array.isArray(data.lekQuestions) || data.lekQuestions.length !== 11) {
      caseErrors.push(`lekQuestions length is ${data.lekQuestions?.length}, expected 11`);
    } else {
      data.lekQuestions.forEach((q, idx) => {
        const questionText = q.question || q.q;
        if (!questionText) caseErrors.push(`LEK Q${idx+1} missing question`);
        const opts = q.options || q.opts;
        if (!Array.isArray(opts) || opts.length !== 5) caseErrors.push(`LEK Q${idx+1} options length is ${opts?.length}, expected 5`);
        if (typeof q.correct !== 'number' && typeof q.correctIdx !== 'number') caseErrors.push(`LEK Q${idx+1} missing correct idx`);
        const explText = q.expl || q.exp;
        if (!explText || explText.length < 25) caseErrors.push(`LEK Q${idx+1} explanation too short`);
      });
    }

    // 9. Flashcards (must be 6)
    if (!Array.isArray(data.flashcards) || data.flashcards.length !== 6) {
      caseErrors.push(`flashcards length is ${data.flashcards?.length}, expected 6`);
    } else {
      data.flashcards.forEach((f, idx) => {
        if (!f.front || !f.back) caseErrors.push(`Flashcard ${idx+1} missing front or back`);
      });
    }

    if (caseErrors.length > 0) {
      console.error(`[FAIL] Case #${data.id} (${filename}): ${caseErrors.length} errors`);
      caseErrors.forEach(e => console.error(`   - ${e}`));
      totalErrors += caseErrors.length;
    } else {
      console.log(`[PASS] Case #${data.id.toString().padStart(3, ' ')}: ${filename} | Dept: "${data.dept}" | 8 Steps, 11 LEK, 6 Cards, 4 Patho, 6+ DiffRows (100% PERFECT)`);
    }
  }

  console.log("==================================================================");
  if (totalErrors === 0) {
    console.log("🎉 ALL 40 CASES (#111 TO #150) PASSED WITH 100% GOLD-STANDARD COMPLIANCE! 🎉");
  } else {
    console.error(`❌ FOUND ${totalErrors} ERRORS ACROSS CASES. PLEASE FIX BEFORE PROCEEDING.`);
    process.exit(1);
  }
}

verifyAll111To150().catch(err => {
  console.error("Master verification failure:", err);
  process.exit(1);
});

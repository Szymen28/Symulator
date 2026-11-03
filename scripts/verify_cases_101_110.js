const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case');

const CASES_DIR = path.join(__dirname, '..', 'cases');
const MASTER_KEY = '@LEKSzymon28111999';

console.log("Verifying Cases 101 to 110 against the Gold Standard...\n");

const expectedFiles = [
  '101_celiakia_dziecko.json',
  '102_abmk_niemowle.json',
  '103_wyrostek_dziecko.json',
  '104_zum_niemowle.json',
  '105_zespol_nerczycowy_mcd.json',
  '106_stec_hus.json',
  '107_odplyw_pecherzowo_moczowodowy_vur.json',
  '108_popaciorkowcowe_kzn_apsgn.json',
  '109_wodonercze_wrodzone_upjo.json',
  '110_odra_morbilli.json'
];

async function verifyAll() {
  let allPassed = true;

  for (let index = 0; index < expectedFiles.length; index++) {
    const file = expectedFiles[index];
    const filePath = path.join(CASES_DIR, file);
    if (!fs.existsSync(filePath)) {
      console.error(`[ERROR] File missing: ${file}`);
      allPassed = false;
      continue;
    }

    try {
      const rawData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const caseData = await decryptObjectAes(rawData, MASTER_KEY);

      const issues = [];

      // Basic fields
      if (!caseData.id || caseData.id !== (101 + index)) issues.push(`ID mismatch: expected ${101 + index}, got ${caseData.id}`);
      if (!caseData.shortTitle) issues.push("Missing shortTitle");
      if (!caseData.diagnosisTitle) issues.push("Missing diagnosisTitle");
      if (!caseData.dept) issues.push("Missing dept");
      if (!caseData.story || caseData.story.length < 50) issues.push("Story too short or missing");

      // Vitals
      if (!Array.isArray(caseData.vitals) || caseData.vitals.length < 5) issues.push(`Vitals array length: ${caseData.vitals?.length}`);
      if (!caseData.vitalsObj || !caseData.vitalsObj.hr) issues.push("Missing vitalsObj");

      // Steps
      if (!Array.isArray(caseData.steps) || caseData.steps.length !== 8) {
        issues.push(`Steps count: expected 8, got ${caseData.steps?.length}`);
      } else {
        caseData.steps.forEach((st, sIdx) => {
          if (st.stepNum !== (sIdx + 1)) issues.push(`Step ${sIdx+1} has invalid stepNum: ${st.stepNum}`);
          if (!st.title || st.title.length < 5) issues.push(`Step ${sIdx+1} title missing`);
          if (!st.desc || st.desc.length < 30) issues.push(`Step ${sIdx+1} desc too short`);
          if (!Array.isArray(st.options) || st.options.length !== 4) issues.push(`Step ${sIdx+1} options count != 4`);
          else {
            st.options.forEach((opt, oIdx) => {
              if (!opt.text) issues.push(`Step ${sIdx+1} opt ${oIdx+1} missing text`);
              if (!opt.feedback || (!opt.feedback.startsWith('✅') && !opt.feedback.startsWith('❌'))) {
                issues.push(`Step ${sIdx+1} opt ${oIdx+1} feedback does not start with ✅ or ❌`);
              }
            });
          }
        });
      }

      // PathoNodes
      if (!Array.isArray(caseData.pathoNodes) || caseData.pathoNodes.length < 3) {
        issues.push(`pathoNodes count < 3 (got ${caseData.pathoNodes?.length})`);
      } else {
        caseData.pathoNodes.forEach((node, nIdx) => {
          if (!node.badge || !node.title || !node.detail) issues.push(`pathoNode ${nIdx+1} incomplete`);
        });
      }

      // DiffTable
      if (!caseData.diffTable || !caseData.diffTable.headers || !caseData.diffTable.rows) {
        issues.push("Missing or invalid diffTable");
      } else {
        if (caseData.diffTable.headers.length < 4) issues.push(`diffTable headers < 4: ${caseData.diffTable.headers.length}`);
        if (caseData.diffTable.rows.length < 6) issues.push(`diffTable rows < 6: ${caseData.diffTable.rows.length}`);
      }

      // DutySummary
      if (!caseData.dutySummary || !caseData.dutySummary.overview || !caseData.dutySummary.drugsAndDoses) {
        issues.push("Incomplete dutySummary");
      }

      // LEK Questions (MUST BE EXACTLY 11)
      if (!Array.isArray(caseData.lekQuestions) || caseData.lekQuestions.length !== 11) {
        issues.push(`CRITICAL: lekQuestions count != 11 (got ${caseData.lekQuestions?.length})`);
      } else {
        caseData.lekQuestions.forEach((q, qIdx) => {
          if (!q.q || q.q.length < 15) issues.push(`LEK Q${qIdx+1} missing or short question text`);
          if (!Array.isArray(q.opts) || q.opts.length !== 5) issues.push(`LEK Q${qIdx+1} opts count != 5`);
          if (typeof q.correctIdx !== 'number' || q.correctIdx < 0 || q.correctIdx > 4) issues.push(`LEK Q${qIdx+1} invalid correctIdx: ${q.correctIdx}`);
          if (!q.exp || q.exp.length < 25) issues.push(`LEK Q${qIdx+1} explanation missing or too short`);
          if (!q.options) issues.push(`LEK Q${qIdx+1} missing options alias`);
          if (q.correct === undefined) issues.push(`LEK Q${qIdx+1} missing correct alias`);
          if (!q.expl) issues.push(`LEK Q${qIdx+1} missing expl alias`);
        });
      }

      // Flashcards (MUST BE 6)
      if (!Array.isArray(caseData.flashcards) || caseData.flashcards.length !== 6) {
        issues.push(`Flashcards count != 6 (got ${caseData.flashcards?.length})`);
      }

      if (issues.length > 0) {
        console.error(`[FAIL] ${file}:`);
        issues.forEach(iss => console.error(`   - ${iss}`));
        allPassed = false;
      } else {
        console.log(`[PASS] Case #${caseData.id}: ${file}`);
        console.log(`       Title: "${caseData.shortTitle}"`);
        console.log(`       Steps: ${caseData.steps.length} | PathoNodes: ${caseData.pathoNodes.length} | DiffRows: ${caseData.diffTable.rows.length} | LEK Qs: ${caseData.lekQuestions.length} | Flashcards: ${caseData.flashcards.length}\n`);
      }

    } catch (err) {
      console.error(`[ERROR] Decryption or JSON parse failed for ${file}:`, err.message);
      allPassed = false;
    }
  }

  if (allPassed) {
    console.log("==================================================================");
    console.log("ALL 10 CASES (101–110) ARE 100% VERIFIED TO GOLD STANDARD PARITY!");
    console.log("==================================================================");
  } else {
    console.error("Some cases have verification issues! Please review the log above.");
    process.exit(1);
  }
}

verifyAll();

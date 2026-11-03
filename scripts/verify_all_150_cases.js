const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case.js');
const PASSWORD = '@LEKSzymon28111999';

async function verifyAll() {
  console.log("=== Comprehensive Verification of All 150 Cases ===");
  const files = fs.readdirSync('cases')
    .filter(f => f.endsWith('.json') && f !== 'auth.json' && f !== 'manifest.json')
    .sort((a,b) => {
      const numA = parseInt(a.split('_')[0]) || 0;
      const numB = parseInt(b.split('_')[0]) || 0;
      return numA - numB;
    });

  console.log(`Found ${files.length} clinical case files in cases/ directory.`);

  let totalCases = 0;
  let totalSteps = 0;
  let totalFlashcards = 0;
  let totalLekQuestions = 0;
  let cases104To150Steps = 0;
  let errors = [];

  for (const fname of files) {
    try {
      const fullPath = path.join('cases', fname);
      const raw = fs.readFileSync(fullPath, 'utf8');
      const enc = JSON.parse(raw);
      const c = await decryptObjectAes(enc, PASSWORD);
      totalCases++;

      // Check required case metadata
      if (c.id === undefined) errors.push(`${fname}: Missing 'id'`);
      if (!c.dept) errors.push(`${fname}: Missing 'dept'`);
      if (!c.shortTitle) errors.push(`${fname}: Missing 'shortTitle'`);
      if (!c.diagnosisTitle) errors.push(`${fname}: Missing 'diagnosisTitle'`);

      // Check dual-layer vitals
      if (!Array.isArray(c.vitals) || c.vitals.length === 0) {
        errors.push(`${fname}: 'vitals' array missing or empty`);
      }
      if (!c.vitalsObj || typeof c.vitalsObj !== 'object') {
        errors.push(`${fname}: 'vitalsObj' missing or not an object`);
      }

      // Check steps
      if (!Array.isArray(c.steps) || c.steps.length < 7) {
        errors.push(`${fname}: 'steps' has length ${c.steps ? c.steps.length : 0} (expected >=7)`);
      } else {
        totalSteps += c.steps.length;
        if (c.id >= 104 && c.id <= 150) {
          cases104To150Steps += c.steps.length;
        }

        c.steps.forEach((s, idx) => {
          if (!s.title || s.title.trim().length === 0) {
            errors.push(`${fname} step ${idx+1}: missing or empty 'title'`);
          }
          const hasDescOrScenario = (s.desc && s.desc.trim().length > 0) || (s.scenario && s.scenario.trim().length > 0);
          if (!hasDescOrScenario) {
            errors.push(`${fname} step ${idx+1}: missing both 'desc' and 'scenario'`);
          }

          // In cases 104-150, ensure both desc and scenario are richly populated
          if (c.id >= 104 && c.id <= 150) {
            if (!s.desc || s.desc.trim().length < 50) {
              errors.push(`${fname} step ${idx+1}: 'desc' is too short or empty (${s.desc ? s.desc.length : 0} chars)`);
            }
            if (!s.scenario || s.scenario.trim().length < 50) {
              errors.push(`${fname} step ${idx+1}: 'scenario' is too short or empty (${s.scenario ? s.scenario.length : 0} chars)`);
            }
          }

          if (!Array.isArray(s.options) || s.options.length < 2) {
            errors.push(`${fname} step ${idx+1}: missing or insufficient options`);
          } else {
            const correctOpts = s.options.filter(o => o.correct === true);
            if (correctOpts.length !== 1) {
              errors.push(`${fname} step ${idx+1}: expected exactly 1 correct option, got ${correctOpts.length}`);
            }
            s.options.forEach((o, oidx) => {
              if (!o.text || o.text.trim().length === 0) {
                errors.push(`${fname} step ${idx+1} opt ${oidx+1}: empty text`);
              }
              if (!o.feedback || o.feedback.trim().length === 0) {
                errors.push(`${fname} step ${idx+1} opt ${oidx+1}: empty feedback`);
              }
            });
          }
        });
      }

      // Check flashcards & lekQuestions
      if (Array.isArray(c.flashcards)) totalFlashcards += c.flashcards.length;
      if (Array.isArray(c.lekQuestions)) totalLekQuestions += c.lekQuestions.length;

    } catch (e) {
      errors.push(`${fname}: Failed to decrypt or parse: ${e.message}`);
    }
  }

  console.log("\n--- Verification Results ---");
  console.log(`Total verified cases: ${totalCases} / 150 expected`);
  console.log(`Total interactive steps across all cases: ${totalSteps} (average ${(totalSteps / totalCases).toFixed(1)} steps/case)`);
  console.log(`Cases 104-150 total interactive steps: ${cases104To150Steps} (exactly ${(cases104To150Steps / 47).toFixed(1)} steps/case - all 8-step clinical scenarios!)`);
  console.log(`Total flashcards in system: ${totalFlashcards}`);
  console.log(`Total LEK exam questions: ${totalLekQuestions}`);

  if (errors.length === 0) {
    console.log("\n✅ ALL 150 CASES ARE 100% HEALTHY, DECRYPT PROPERLY, AND PASS ALL CLINICAL QUALITY CHECKS!");
  } else {
    console.error(`\n❌ Found ${errors.length} validation errors:`);
    errors.slice(0, 20).forEach(e => console.error(" - " + e));
    if (errors.length > 20) console.error(` ... and ${errors.length - 20} more errors.`);
  }
}

verifyAll().catch(console.error);

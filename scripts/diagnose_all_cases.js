const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function diagnoseAllCases() {
  console.log("=== COMPREHENSIVE REPOSITORY DIAGNOSTIC AUDIT ===");

  const files = fs.readdirSync(path.join(__dirname, '../cases'))
    .filter(f => f.endsWith('.json') && !f.includes('catalog') && !f.includes('manifest') && !f.includes('flashcard'))
    .sort((a, b) => parseInt(a) - parseInt(b));

  console.log(`Found ${files.length} case files.`);

  let vitalsMissingLabelCount = 0;
  let excessiveBoldingFeedbackCount = 0;
  let dosePillsOutsideDutySummaryCount = 0;
  let pathoSuperficialTargetCount = 0;

  let casesMissingCombinatorial = [];
  let casesMissingFalseOrException = [];
  let casesMissingLawOrEthics = [];

  for (const filename of files) {
    const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '../cases', filename), 'utf-8'));
    let d;
    try {
      d = await decryptObjectAes(raw, MASTER_KEY);
    } catch (e) {
      continue;
    }

    const id = d.id || parseInt(filename, 10);

    // 1. Check vitals labels
    if (Array.isArray(d.vitals)) {
      d.vitals.forEach((v, idx) => {
        if (!v.label && (!v.name || v.name === '')) {
          vitalsMissingLabelCount++;
        }
      });
    }

    // 2. Check excessive bolding in step feedback
    if (Array.isArray(d.steps)) {
      d.steps.forEach(s => {
        const fbs = s.feedback || (Array.isArray(s.options) ? s.options.map(o => o.feedback) : []);
        fbs.forEach(fb => {
          if (typeof fb === 'string') {
            // Check if strong wraps the entire remainder: e.g. "✅ PRAWIDŁOWO! <strong>..." and ends with "</strong>"
            if (/^[✅❌]\s*(?:PRAWIDŁOWO|BŁĄD|BŁĄD KRYTYCZNY)!\s*<strong>[^<]{60,}<\/strong>\s*$/i.test(fb.trim())) {
              excessiveBoldingFeedbackCount++;
            }
          }
        });
      });
    }

    // 3. Check dose-pill outside dutySummary
    if (Array.isArray(d.pathoNodes)) {
      d.pathoNodes.forEach(n => {
        const str = (n.target || "") + (n.drugTarget || "");
        if (str.includes('dose-pill')) dosePillsOutsideDutySummaryCount++;
      });
    }
    if (d.story && d.story.includes('dose-pill')) {
      dosePillsOutsideDutySummaryCount++;
    }

    // 4. Check pathoNodes targets
    if (Array.isArray(d.pathoNodes)) {
      d.pathoNodes.forEach(n => {
        const t = (n.target || "") + (n.drugTarget || "");
        // Check if target is just a plain anatomical label without procedure/test/drug
        if (t.length < 25 && !t.includes('mg') && !t.includes('USG') && !t.includes('TK') && !t.includes('RTG') && !t.includes('leczenie') && !t.includes('badanie')) {
          pathoSuperficialTargetCount++;
        }
      });
    }

    // 5. Check LEK question types
    if (Array.isArray(d.lekQuestions)) {
      let hasCombinatorial = false;
      let hasFalseOrException = false;
      let hasLawOrEthics = false;

      d.lekQuestions.forEach(q => {
        const text = (q.question || q.q || "") + " " + (q.options ? q.options.join(" ") : (q.opts ? q.opts.join(" ") : ""));
        const textLower = text.toLowerCase();

        // Combinatorial test: has "1.", "2.", "3." and options with combinations like "1, 2" or "wszystkie"
        if (/(\b1\b[\s\S]*\b2\b[\s\S]*\b3\b)/i.test(text) && /(1,\s*2|1,\s*3|2,\s*4|tylko\s*1|wszystkie\s*wymienione)/i.test(textLower)) {
          hasCombinatorial = true;
        }

        // False or exception
        if (/(fałszyw|nieprawd|błędn|z wyjątkiem|nie jest prawd|nie należy|nieprawidłow)/i.test(textLower)) {
          hasFalseOrException = true;
        }

        // Law, ethics, public health, certification
        if (/(sanepid|zgłoszen|zakaźn|zakażeń|ustaw|zgod[aęy]|małoletn|sąd|opiekun|bioetyk|tajemnic|kodeks|orzeczn|zus|zla|niezdolnoś|karta dilo|zgon|sekcj|przymus|szczepie|obowiązk)/i.test(textLower)) {
          hasLawOrEthics = true;
        }
      });

      if (!hasCombinatorial) casesMissingCombinatorial.push(id);
      if (!hasFalseOrException) casesMissingFalseOrException.push(id);
      if (!hasLawOrEthics) casesMissingLawOrEthics.push(id);
    }
  }

  console.log("\n--- DIAGNOSTIC RESULTS ---");
  console.log(`Vitals missing label/name: ${vitalsMissingLabelCount}`);
  console.log(`Excessive bolding in feedback: ${excessiveBoldingFeedbackCount}`);
  console.log(`Dose-pills outside dutySummary: ${dosePillsOutsideDutySummaryCount}`);
  console.log(`Superficial patho targets: ${pathoSuperficialTargetCount}`);
  console.log(`Cases missing Combinatorial LEK Q: ${casesMissingCombinatorial.length}`);
  console.log(`Cases missing False/Exception LEK Q: ${casesMissingFalseOrException.length}`);
  console.log(`Cases missing Law/Ethics/Public Health LEK Q: ${casesMissingLawOrEthics.length}`);
}

diagnoseAllCases().catch(console.error);

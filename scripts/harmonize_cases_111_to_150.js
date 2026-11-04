const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function harmonizeAll() {
  console.log("=== HARMONIZING CASES #111 TO #150 TO ULTRA-RESILIENT GOLD STANDARD ===");

  const files = fs.readdirSync(path.join(__dirname, '../cases'))
    .filter(f => {
      const match = f.match(/^(\d+)_/);
      if (!match) return false;
      const num = parseInt(match[1], 10);
      return num >= 111 && num <= 150;
    })
    .sort((a, b) => parseInt(a) - parseInt(b));

  for (const filename of files) {
    const filePath = path.join(__dirname, '../cases', filename);
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const d = await decryptObjectAes(raw, MASTER_KEY);

    // 1. Harmonize Steps
    if (Array.isArray(d.steps)) {
      d.steps = d.steps.map((s, sIdx) => {
        const title = s.title || `Krok ${sIdx + 1}`;
        const desc = s.desc || s.scenario || s.text || '';
        
        let correctIndex = 0;
        if (typeof s.correct === 'number') correctIndex = s.correct;
        else if (typeof s.correctIdx === 'number') correctIndex = s.correctIdx;

        // Normalize options to [{ text, correct, feedback }] AND top-level arrays
        let normalizedOptions = [];
        let feedbackArray = [];

        if (Array.isArray(s.options)) {
          s.options.forEach((opt, oIdx) => {
            if (typeof opt === 'object' && opt !== null) {
              const text = opt.text || opt.label || '';
              const isCorr = typeof opt.correct === 'boolean'
                ? opt.correct
                : (typeof opt.feedback === 'string' ? (opt.feedback.startsWith('✅') || opt.feedback.includes('PRAWIDŁOWO') || opt.feedback.includes('POPRAWN')) : (oIdx === correctIndex));
              const fb = opt.feedback || opt.expl || opt.explanation || (isCorr ? '✅ PRAWIDŁOWO!' : '❌ BŁĄD!');
              if (isCorr) correctIndex = oIdx;
              normalizedOptions.push({ text, correct: isCorr, feedback: fb });
              feedbackArray.push(fb);
            } else if (typeof opt === 'string') {
              const text = opt;
              let fb = (Array.isArray(s.feedback) && s.feedback[oIdx]) ? s.feedback[oIdx] : '';
              let isCorr = false;
              if (typeof s.correct === 'number' && s.correct === oIdx) isCorr = true;
              else if (typeof s.correctIdx === 'number' && s.correctIdx === oIdx) isCorr = true;
              else if (fb.startsWith('✅') || fb.includes('PRAWIDŁOWO') || fb.includes('POPRAWN')) isCorr = true;

              if (!fb) fb = isCorr ? '✅ PRAWIDŁOWO!' : '❌ BŁĄD!';
              if (isCorr) correctIndex = oIdx;
              normalizedOptions.push({ text, correct: isCorr, feedback: fb });
              feedbackArray.push(fb);
            }
          });
        }

        const expl = (feedbackArray[correctIndex] || (normalizedOptions[correctIndex]?.feedback) || 'Poprawna odpowiedź!');

        return {
          ...s,
          title,
          desc,
          scenario: desc,
          text: desc,
          question: title,
          options: normalizedOptions,
          feedback: feedbackArray,
          correct: correctIndex,
          correctIdx: correctIndex,
          explanation: expl
        };
      });
    }

    // 2. Harmonize LEK Questions
    if (Array.isArray(d.lekQuestions)) {
      d.lekQuestions = d.lekQuestions.map(q => {
        const questionText = q.question || q.q || '';
        const rawOpts = q.opts || q.options || [];
        const opts = rawOpts.map(o => String(o));
        let correctIdx = 0;
        if (typeof q.correctIdx === 'number') correctIdx = q.correctIdx;
        else if (typeof q.correct === 'number') correctIdx = q.correct;
        else if (q.correct !== undefined) correctIdx = parseInt(q.correct, 10) || 0;

        const exp = q.exp || q.expl || q.explanation || '';

        return {
          ...q,
          q: questionText,
          question: questionText,
          opts: [...opts],
          options: [...opts],
          correctIdx,
          correct: correctIdx,
          exp,
          expl: exp
        };
      });
    }

    // 3. Harmonize Flashcards
    if (Array.isArray(d.flashcards)) {
      d.flashcards = d.flashcards.map(fc => {
        const front = fc.front || fc.q || '';
        const back = fc.back || fc.a || '';
        return {
          ...fc,
          front,
          back,
          q: front,
          a: back,
          cat: fc.cat || d.dept || 'Klinika'
        };
      });
    }

    // Encrypt and write back
    const encrypted = await encryptStringAes(JSON.stringify(d, null, 2), MASTER_KEY);
    fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), 'utf-8');
    console.log(`[HARMONIZED] Case #${d.id}: ${filename}`);
  }

  console.log("All cases from 111 to 150 harmonized successfully!");
}

harmonizeAll().catch(err => {
  console.error("Harmonization error:", err);
  process.exit(1);
});

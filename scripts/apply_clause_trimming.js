const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function run() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  let modifiedCases = 0;
  let totalTrimmed = 0;

  for (const f of files) {
    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    let caseChanged = false;

    c.lekQuestions.forEach((q, idx) => {
      const opts = q.opts || q.options || [];
      const correctIdx = q.correct ?? q.correctIdx ?? 0;
      let key = opts[correctIdx];
      if (!key) return;

      const optLens = opts.map(o => (typeof o === 'string' ? o : o.text || '').length);
      const corrLen = optLens[correctIdx];
      const wrongLens = optLens.filter((_, i) => i !== correctIdx);
      const avgWrong = wrongLens.reduce((a, b) => a + b, 0) / wrongLens.length;
      const ratio = corrLen / avgWrong;

      // Only target questions where ratio >= 2.0
      if (ratio < 2.0) return;

      let explanationAddition = '';
      let newKey = key;
      let changed = false;

      // 1. Semicolon tail
      if (newKey.includes(';')) {
        const parts = newKey.split(';');
        if (parts.length === 2 && parts[1].trim().length > 25) {
          explanationAddition += ' ' + parts[1].trim();
          newKey = parts[0].trim();
          changed = true;
        }
      }

      // 2. Dash tail
      const dashMatch = newKey.match(/^(.*?)\s+[-–—]\s+([a-ząćęłńóśźż].{25,})\.?$/);
      if (dashMatch) {
        explanationAddition += ' — ' + dashMatch[2].trim();
        newKey = dashMatch[1].trim();
        changed = true;
      }

      // 3. Trailing parenthesis
      const parenMatch = newKey.match(/^(.*?)\s*\(([^)]+)\)\s*[\.]?$/);
      if (parenMatch) {
        const base = parenMatch[1].trim();
        const inside = parenMatch[2].trim();
        if (inside.length > 15 && base.length > 15) {
          explanationAddition += ` (${inside})`;
          newKey = base;
          changed = true;
        }
      }

      if (changed) {
        const newWrongLens = opts.filter((_, i) => i !== correctIdx).map(o => (typeof o === 'string' ? o : o.text || '').length);
        const newAvgWrong = newWrongLens.reduce((a, b) => a + b, 0) / newWrongLens.length;
        const newRatio = newKey.length / newAvgWrong;

        // If it improves ratio
        if (newRatio < ratio) {
          opts[correctIdx] = newKey;
          q.opts = opts;
          q.options = opts;

          const currentExp = q.exp || q.expl || q.explanation || '';
          const enhancedExp = currentExp + (explanationAddition ? ` [Uzupełnienie: ${explanationAddition.trim()}]` : '');
          q.exp = enhancedExp;
          q.expl = enhancedExp;
          q.explanation = enhancedExp;

          totalTrimmed++;
          caseChanged = true;
        }
      }
    });

    if (caseChanged) {
      modifiedCases++;
      const encrypted = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
      fs.writeFileSync(path.join('cases', f), JSON.stringify(encrypted, null, 2), 'utf8');
      console.log(`✓ Case #${c.id} (${f}) updated with clause trimming.`);
    }
  }

  console.log(`\nDone! Total questions trimmed: ${totalTrimmed} in ${modifiedCases} cases.`);
}

run();

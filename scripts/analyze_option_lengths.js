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

async function analyze() {
  const files = fs.readdirSync(CASES_DIR).filter(f => /^\d+_.*\.json$/.test(f));
  let totalSteps = 0;
  let correctIsLongestCount = 0;
  let diffs = [];
  let samples = [];

  for (const f of files) {
    const raw = JSON.parse(fs.readFileSync(path.join(CASES_DIR, f), 'utf8'));
    const c = raw.ciphertext ? await decrypt(raw, MASTER_KEY) : raw;
    if (!c.steps) continue;

    c.steps.forEach((s, sIdx) => {
      if (!s.options || s.options.length < 2) return;
      totalSteps++;
      const correctOpt = s.options.find(o => o.correct);
      if (!correctOpt) return;
      const maxLen = Math.max(...s.options.map(o => (o.text || '').length));
      const correctLen = (correctOpt.text || '').length;
      const incorrectLens = s.options.filter(o => !o.correct).map(o => (o.text || '').length);
      const avgIncorrectLen = incorrectLens.reduce((a, b) => a + b, 0) / incorrectLens.length;
      
      if (correctLen === maxLen) {
        correctIsLongestCount++;
      }
      const ratio = correctLen / (avgIncorrectLen || 1);
      diffs.push({ file: f, caseId: c.id, step: sIdx + 1, title: s.title, correctLen, avgIncorrectLen, ratio });
      if (ratio > 2.2 && samples.length < 8) {
        samples.push({
          caseId: c.id,
          file: f,
          step: sIdx + 1,
          title: s.title,
          options: s.options.map(o => ({ correct: !!o.correct, len: (o.text || '').length, text: o.text }))
        });
      }
    });
  }

  console.log('Total Cases analyzed: ' + files.length);
  console.log('Total Steps evaluated: ' + totalSteps);
  const pct = (correctIsLongestCount / totalSteps * 100).toFixed(1);
  console.log('Correct is strictly longest: ' + correctIsLongestCount + ' (' + pct + '%)');
  const avgRatio = (diffs.reduce((a, b) => a + b.ratio, 0) / diffs.length).toFixed(2);
  console.log('Average ratio (correctLen / avgIncorrectLen): ' + avgRatio);

  // Distribution of ratios
  const ratioGte2 = diffs.filter(d => d.ratio >= 2.0).length;
  const ratioGte1_5 = diffs.filter(d => d.ratio >= 1.5 && d.ratio < 2.0).length;
  const ratio1To1_5 = diffs.filter(d => d.ratio >= 1.0 && d.ratio < 1.5).length;
  const ratioLt1 = diffs.filter(d => d.ratio < 1.0).length;
  console.log(`\nRatio Breakdown:`);
  console.log(`  Ratio >= 2.0 (correct is 2x longer than wrong): ${ratioGte2} (${(ratioGte2/totalSteps*100).toFixed(1)}%)`);
  console.log(`  Ratio 1.5 - 2.0 (correct is 50-100% longer): ${ratioGte1_5} (${(ratioGte1_5/totalSteps*100).toFixed(1)}%)`);
  console.log(`  Ratio 1.0 - 1.5 (correct is slightly longer): ${ratio1To1_5} (${(ratio1To1_5/totalSteps*100).toFixed(1)}%)`);
  console.log(`  Ratio < 1.0 (wrong option is longer): ${ratioLt1} (${(ratioLt1/totalSteps*100).toFixed(1)}%)`);

  console.log('\n--- Sample Steps with High Disparity (ratio > 2.2) ---');
  samples.forEach(s => {
    console.log(`\nCase #${s.caseId} Step ${s.step}: ${s.title}`);
    s.options.forEach((o, i) => {
      console.log(`  [${o.correct ? 'V' : 'X'}] (${o.len} chars): ${o.text}`);
    });
  });
}

analyze().catch(console.error);

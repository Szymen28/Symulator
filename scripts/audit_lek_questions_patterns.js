const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function auditLekQuestions() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  let totalQuestions = 0;
  let correctIsLongestCount = 0;
  let correctIsShortestCount = 0;
  const positionCounts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
  const ratios = [];
  const highDisparityQuestions = [];
  let allAboveCorrect = 0;
  let allAboveTotal = 0;
  let noneAboveCorrect = 0;
  let noneAboveTotal = 0;

  for (const f of files) {
    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    const questions = c.lekQuestions || [];

    questions.forEach((q, qIdx) => {
      totalQuestions++;
      const opts = q.opts || q.options || [];
      const correctIdx = q.correct ?? q.correctIdx ?? 0;

      // Position bias
      if (positionCounts[correctIdx] !== undefined) {
        positionCounts[correctIdx]++;
      }

      if (opts.length < 2) return;

      const optLens = opts.map(o => (typeof o === 'string' ? o : o.text || '').length);
      const correctLen = optLens[correctIdx] || 0;
      const maxLen = Math.max(...optLens);
      const minLen = Math.min(...optLens);

      if (correctLen === maxLen && maxLen > minLen) correctIsLongestCount++;
      if (correctLen === minLen && maxLen > minLen) correctIsShortestCount++;

      const wrongLens = optLens.filter((_, idx) => idx !== correctIdx);
      const avgWrong = wrongLens.reduce((a, b) => a + b, 0) / (wrongLens.length || 1);
      const ratio = correctLen / (avgWrong || 1);
      ratios.push(ratio);

      if (ratio >= 2.0) {
        highDisparityQuestions.push({
          caseId: c.id,
          qNum: qIdx + 1,
          qText: (q.q || q.question || '').slice(0, 100),
          ratio: parseFloat(ratio.toFixed(2)),
          correctLen,
          avgWrong: Math.round(avgWrong),
          correctText: opts[correctIdx],
          opts: opts
        });
      }

      // Check "Wszystkie powyższe" / "Żadne z powyższych"
      opts.forEach((o, oIdx) => {
        const text = typeof o === 'string' ? o : o.text || '';
        if (/wszystkie powyższe|wszystkie wymienione|żadna z powyższych|żadna z wymienionych/i.test(text)) {
          if (/wszystkie/i.test(text)) {
            allAboveTotal++;
            if (oIdx === correctIdx) allAboveCorrect++;
          }
          if (/żadn/i.test(text)) {
            noneAboveTotal++;
            if (oIdx === correctIdx) noneAboveCorrect++;
          }
        }
      });
    });
  }

  const avgRatio = ratios.reduce((a, b) => a + b, 0) / ratios.length;

  console.log('================ AUDYT PYTAŃ LEK (1650 PYTAŃ) ================');
  console.log(`Przeanalizowano pytań: ${totalQuestions} w ${files.length} przypadkach.`);
  console.log(`\n1. Rozkład pozycji poprawnej odpowiedzi (A, B, C, D, E):`);
  const posLabels = ['A', 'B', 'C', 'D', 'E'];
  posLabels.forEach((lbl, idx) => {
    const cnt = positionCounts[idx] || 0;
    const pct = ((cnt / totalQuestions) * 100).toFixed(1);
    console.log(`   ${lbl}: ${cnt} (${pct}%)`);
  });

  console.log(`\n2. Długość opcji i potencjalny 'Longest Option Bias':`);
  console.log(`   Poprawna odpowiedź jest ściśle najdłuższa: ${correctIsLongestCount} / ${totalQuestions} (${((correctIsLongestCount / totalQuestions) * 100).toFixed(1)}%)`);
  console.log(`   Poprawna odpowiedź jest ściśle najkrótsza: ${correctIsShortestCount} / ${totalQuestions} (${((correctIsShortestCount / totalQuestions) * 100).toFixed(1)}%)`);
  console.log(`   Średni stosunek długości (poprawna / średnia błędnych): ${avgRatio.toFixed(2)}`);

  const ratioGte2 = ratios.filter(r => r >= 2.0).length;
  const ratio1_5_to_2 = ratios.filter(r => r >= 1.5 && r < 2.0).length;
  const ratio1_to_1_5 = ratios.filter(r => r >= 1.0 && r < 1.5).length;
  const ratioLt1 = ratios.filter(r => r < 1.0).length;

  console.log(`\n   Rozbicie stosunku długości:`);
  console.log(`     Ratio >= 2.0 (poprawna 2x dłuższa): ${ratioGte2} (${((ratioGte2 / totalQuestions) * 100).toFixed(1)}%)`);
  console.log(`     Ratio 1.5 - 2.0 (poprawna 50-100% dłuższa): ${ratio1_5_to_2} (${((ratio1_5_to_2 / totalQuestions) * 100).toFixed(1)}%)`);
  console.log(`     Ratio 1.0 - 1.5 (poprawna zbliżona): ${ratio1_to_1_5} (${((ratio1_to_1_5 / totalQuestions) * 100).toFixed(1)}%)`);
  console.log(`     Ratio < 1.0 (błędna odpowiedź dłuższa): ${ratioLt1} (${((ratioLt1 / totalQuestions) * 100).toFixed(1)}%)`);

  console.log(`\n3. Wzorce 'Wszystkie wymienione' i 'Żadna z wymienionych':`);
  console.log(`   Wystąpienia 'Wszystkie wymienione/powyższe': ${allAboveTotal}`);
  if (allAboveTotal > 0) {
    console.log(`     w tym poprawne: ${allAboveCorrect} (${((allAboveCorrect / allAboveTotal) * 100).toFixed(1)}%)`);
  }
  console.log(`   Wystąpienia 'Żadna z wymienionych/powyższych': ${noneAboveTotal}`);
  if (noneAboveTotal > 0) {
    console.log(`     w tym poprawne: ${noneAboveCorrect} (${((noneAboveCorrect / noneAboveTotal) * 100).toFixed(1)}%)`);
  }

  console.log(`\nPytania o skrajnej dysproporcji (ratio >= 2.0): ${highDisparityQuestions.length}`);
  fs.writeFileSync('./notes/lek_high_disparity.json', JSON.stringify(highDisparityQuestions, null, 2), 'utf8');
}

auditLekQuestions().catch(console.error);

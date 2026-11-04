const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function inspect() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f)).sort((a,b) => parseInt(a) - parseInt(b));
  for (const f of files) {
    const cid = parseInt(f.match(/^(\d+)_/)[1], 10);
    if (cid < 29 || cid > 35) continue;
    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    const questions = c.lekQuestions || c.lek_questions || (c.quiz && c.quiz.questions) || [];
    questions.forEach((q, idx) => {
      const opts = q.opts || q.options || [];
      const correctIdx = (typeof q.correct === 'number') ? q.correct : (typeof q.correctIdx === 'number' ? q.correctIdx : 0);
      const optLens = opts.map(o => (typeof o === 'string' ? o : o.text || '').length);
      const corrLen = optLens[correctIdx] || 0;
      const wrongLens = optLens.filter((_, i) => i !== correctIdx);
      const avgWrong = wrongLens.reduce((a, b) => a + b, 0) / (wrongLens.length || 1);
      const ratio = corrLen / (avgWrong || 1);
      if (ratio >= 2.0) {
        console.log(`[Case #${cid} Q${idx+1} (qIdx: ${idx})] Ratio: ${ratio.toFixed(2)} (Corr: ${corrLen}, AvgWrong: ${avgWrong.toFixed(1)})`);
        console.log(`Q: ${q.question || q.q}`);
        console.log(`Correct [${correctIdx}]: ${opts[correctIdx]}`);
        console.log(`Distractors:`);
        opts.forEach((o, i) => {
          if (i !== correctIdx) console.log(`  [${i}] ${o}`);
        });
        console.log('---');
      }
    });
  }
}

inspect();

const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function dump() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f)).sort((a,b) => parseInt(a) - parseInt(b));
  const results = [];

  for (const f of files) {
    const cid = parseInt(f.match(/^(\d+)_/)[1], 10);
    if (cid < 21 || cid > 50) continue;

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
        results.push({
          caseId: cid,
          caseFile: f,
          caseTitle: c.title || c.titlePl || c.name || '',
          qIdx: idx,
          qNum: idx + 1,
          question: q.question || q.q || '',
          opts,
          correctIdx,
          corrLen,
          avgWrong: Math.round(avgWrong * 10) / 10,
          ratio: Math.round(ratio * 100) / 100,
          exp: q.exp || q.expl || q.explanation || ''
        });
      }
    });
  }

  fs.writeFileSync('notes/batch_21_50.json', JSON.stringify(results, null, 2), 'utf8');
  console.log(`Extracted ${results.length} questions with ratio >= 2.0 into notes/batch_21_50.json`);
}

dump();

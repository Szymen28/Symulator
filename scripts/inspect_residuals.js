const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function main() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f)).sort((a,b) => parseInt(a) - parseInt(b));
  for (const file of files) {
    const caseNum = parseInt(file);
    if (caseNum >= 51 && caseNum <= 80) {
      const raw = JSON.parse(fs.readFileSync(path.join('cases', file), 'utf8'));
      const c = await decryptObjectAes(raw, MASTER_KEY);
      const questions = c.lekQuestions || c.lek_questions || (c.quiz && c.quiz.questions) || [];
      questions.forEach((q, idx) => {
        const opts = q.opts || q.options || [];
        const correctIdx = (typeof q.correct === 'number') ? q.correct : (typeof q.correctIdx === 'number' ? q.correctIdx : 0);
        const correctLen = (typeof opts[correctIdx] === 'string' ? opts[correctIdx] : (opts[correctIdx]?.text || '')).length;
        const distLens = opts.filter((_, i) => i !== correctIdx).map(o => (typeof o === 'string' ? o : o.text || '').length);
        const avgDist = distLens.reduce((a,b) => a+b, 0) / (distLens.length || 1);
        const ratio = correctLen / (avgDist || 1);
        if (ratio >= 2.0) {
          console.log(`Case ${caseNum} Q${idx+1} (qIdx: ${idx}): ratio=${ratio.toFixed(2)}, correctLen=${correctLen}, avgDist=${avgDist.toFixed(1)}`);
          console.log(`Q: ${q.question || q.q}`);
          console.log(`Correct [${correctIdx}]: ${opts[correctIdx]}`);
          console.log(`Distractors: ${opts.filter((_, i) => i !== correctIdx).join(' | ')}`);
          console.log('---');
        }
      });
    }
  }
}

main();

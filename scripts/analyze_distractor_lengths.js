const fs = require('fs');
const list = JSON.parse(fs.readFileSync('notes/lek_high_disparity.json', 'utf8'));

let sumCorr = 0;
let sumWrong = 0;
let wrongLt50 = 0;
let wrong50to80 = 0;
let wrongGt80 = 0;

let corrGt150 = 0;
let corr100to150 = 0;
let corrLt100 = 0;

list.forEach(q => {
  sumCorr += q.correctLen;
  sumWrong += q.avgWrong;
  if (q.avgWrong < 50) wrongLt50++;
  else if (q.avgWrong <= 80) wrong50to80++;
  else wrongGt80++;

  if (q.correctLen > 150) corrGt150++;
  else if (q.correctLen >= 100) corr100to150++;
  else corrLt100++;
});

console.log('Avg Correct Length:', Math.round(sumCorr / list.length));
console.log('Avg Distractor Length:', Math.round(sumWrong / list.length));
console.log('\nDistractor length distribution:');
console.log('  < 50 chars:', wrongLt50);
console.log('  50 - 80 chars:', wrong50to80);
console.log('  > 80 chars:', wrongGt80);
console.log('\nCorrect length distribution:');
console.log('  > 150 chars:', corrGt150);
console.log('  100 - 150 chars:', corr100to150);
console.log('  < 100 chars:', corrLt100);

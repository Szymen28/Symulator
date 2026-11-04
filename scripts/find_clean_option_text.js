const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');
lines.forEach((l, idx) => {
  if (l.includes('cleanOptionText')) {
    console.log(`${idx + 1}: ${l.trim()}`);
  }
});

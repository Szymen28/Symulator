const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');
lines.forEach((l, idx) => {
  if (l.includes('dutySummary') || l.includes('summary-section') || l.includes('renderDutySummary')) {
    console.log(`${idx + 1}: ${l.trim().slice(0, 120)}`);
  }
});

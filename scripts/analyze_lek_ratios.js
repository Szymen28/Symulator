const fs = require('fs');
const high = JSON.parse(fs.readFileSync('./notes/lek_high_disparity.json', 'utf8'));

const rGte3 = high.filter(h => h.ratio >= 3.0).length;
const r2_5to3 = high.filter(h => h.ratio >= 2.5 && h.ratio < 3.0).length;
const r2to2_5 = high.filter(h => h.ratio >= 2.0 && h.ratio < 2.5).length;

console.log(`Disparity breakdown:`);
console.log(`  Ratio >= 3.0 (3x longer): ${rGte3}`);
console.log(`  Ratio 2.5 - 3.0: ${r2_5to3}`);
console.log(`  Ratio 2.0 - 2.5: ${r2to2_5}`);

const fs = require('fs');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function diagnose() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  
  // 1. Analyze Benchmark Cases #1 and #2
  console.log('=== ANALIZA WZORCA: PRZYPADEK #1 I #2 ===');
  for (const bId of ['01_dka.json', '02_onj.json']) {
    const raw = JSON.parse(fs.readFileSync('cases/' + bId, 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    console.log(`\nPrzypadek #${c.id} (${c.dept}) - ${c.title}`);
    console.log(`  - Liczba kroków symulacji: ${c.steps ? c.steps.length : 0}`);
    console.log(`  - Liczba węzłów patomechanizmu (pathoNodes): ${c.pathoNodes ? c.pathoNodes.length : 0}`);
    c.pathoNodes.forEach((n, idx) => {
      console.log(`    Węzeł ${idx+1}: "${n.title}"`);
      console.log(`      * desc (${(n.desc||'').length}c): ${n.desc}`);
      console.log(`      * detail (${(n.detail||'').length}c): ${(n.detail||'').slice(0, 80)}...`);
      console.log(`      * target (${(n.target||'').length}c): ${n.target}`);
    });
    console.log(`  - Pytania LEK: ${c.lekQuestions ? c.lekQuestions.length : 0}`);
    console.log(`  - dutySummary klucze: ${c.dutySummary ? Object.keys(c.dutySummary).join(', ') : 'brak'}`);
  }

  // 2. Scan all cases across groups:
  // Group A: 3-20
  // Group B: 21-50
  // Group C: 51-100
  // Group D: 101-110
  // Group E: 111-130
  // Group F: 131-150
  console.log('\n=== STATYSTYKI GRUP PRZYPADKÓW (PATHONODES TARGET LENGTHS) ===');
  const groups = {
    'Wzorzec (#1, #2)': [1, 2],
    'Cases #3 - #20': [3, 20],
    'Cases #21 - #50': [21, 50],
    'Cases #51 - #100': [51, 100],
    'Cases #101 - #110': [101, 110],
    'Cases #111 - #130': [111, 130],
    'Cases #131 - #150': [131, 150]
  };

  for (const [gName, [start, end]] of Object.entries(groups)) {
    let targetLens = [];
    let detailLens = [];
    let nodeCounts = [];
    let targetFormats = { hasDiagnostykaTerapiaPrefix: 0, simpleFormat: 0 };
    let sampleTargets = [];

    for (let id = start; id <= end; id++) {
      const f = files.find(file => {
        const m = file.match(/^0*(\d+)_/);
        return m && parseInt(m[1], 10) === id;
      });
      if (!f) continue;
      const raw = JSON.parse(fs.readFileSync('cases/' + f, 'utf8'));
      const c = await decryptObjectAes(raw, MASTER_KEY);
      if (!c.pathoNodes) continue;
      nodeCounts.push(c.pathoNodes.length);
      c.pathoNodes.forEach((n, nIdx) => {
        const tLen = (n.target || '').length;
        const dLen = (n.detail || '').length;
        targetLens.push(tLen);
        detailLens.push(dLen);
        if ((n.target || '').includes('Diagnostyka:') || (n.target || '').includes('Terapia:')) {
          targetFormats.hasDiagnostykaTerapiaPrefix++;
        } else {
          targetFormats.simpleFormat++;
        }
        if (sampleTargets.length < 2) {
          sampleTargets.push({ id: c.id, node: nIdx + 1, title: n.title, target: n.target });
        }
      });
    }

    const avgT = (targetLens.reduce((a, b) => a + b, 0) / (targetLens.length || 1)).toFixed(0);
    const avgD = (detailLens.reduce((a, b) => a + b, 0) / (detailLens.length || 1)).toFixed(0);
    const minT = Math.min(...targetLens);
    const maxT = Math.max(...targetLens);
    const avgNodes = (nodeCounts.reduce((a, b) => a + b, 0) / (nodeCounts.length || 1)).toFixed(1);

    console.log(`\nGrupa: ${gName}`);
    console.log(`  - Śr. liczba węzłów: ${avgNodes}`);
    console.log(`  - Target length: Śr = ${avgT}c (Min: ${minT}c, Max: ${maxT}c)`);
    console.log(`  - Detail length: Śr = ${avgD}c`);
    console.log(`  - Format targetu: 'Diagnostyka: ... Terapia: ...' = ${targetFormats.hasDiagnostykaTerapiaPrefix}, prosty = ${targetFormats.simpleFormat}`);
    console.log(`  - Przykładowe targety:`);
    sampleTargets.forEach(st => {
      console.log(`      [#${st.id} Węzeł ${st.node} (${st.title})]: ${st.target ? st.target.slice(0, 100) : 'brak'}...`);
    });
  }
}

diagnose().catch(console.error);

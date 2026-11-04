const fs = require('fs');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function auditComponents() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  
  let issues = {
    stepsNot8: [],
    lekNot11: [],
    dutySummaryKeysBad: [],
    diffTableMissing: [],
    pathoNodesNot3or4: [],
    shortPathoDetail: []
  };

  for (const f of files) {
    const raw = JSON.parse(fs.readFileSync('cases/' + f, 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    const id = c.id;

    // Steps
    if (!c.steps || c.steps.length < 7 || c.steps.length > 8) {
      issues.stepsNot8.push({ id, count: c.steps ? c.steps.length : 0 });
    }

    // LEK Questions
    if (!c.lekQuestions || c.lekQuestions.length !== 11) {
      issues.lekNot11.push({ id, count: c.lekQuestions ? c.lekQuestions.length : 0 });
    }

    // DutySummary keys
    const ds = c.dutySummary || {};
    const hasKeys = ds.overview && ds.diagnostics && ds.drugsAndDoses && ds.procedures && ds.monitoring;
    if (!hasKeys) {
      issues.dutySummaryKeysBad.push({ id, keys: Object.keys(ds) });
    }

    // Diff table
    if (!c.diffTable || !c.diffTable.rows || c.diffTable.rows.length === 0) {
      issues.diffTableMissing.push(id);
    }

    // Patho nodes count
    if (!c.pathoNodes || c.pathoNodes.length < 3 || c.pathoNodes.length > 4) {
      issues.pathoNodesNot3or4.push({ id, count: c.pathoNodes ? c.pathoNodes.length : 0 });
    }

    // Very short patho detail (< 220 chars)
    if (c.pathoNodes) {
      const avgDetail = c.pathoNodes.reduce((a, b) => a + (b.detail || b.desc || '').length, 0) / c.pathoNodes.length;
      if (avgDetail < 220) {
        issues.shortPathoDetail.push({ id, avgDetail: avgDetail.toFixed(0) });
      }
    }
  }

  console.log('=== AUDYT KOMPONENTÓW W BAZIE 150 PRZYPADKÓW ===');
  console.log(`- Przypadki ze złą liczbą pytań LEK (!= 11): ${issues.lekNot11.length}`);
  if (issues.lekNot11.length > 0) console.log('   IDs:', issues.lekNot11.map(x => `#${x.id}(${x.count})`).join(', '));

  console.log(`- Przypadki z nietypową liczbą kroków symulacji (<7 lub >8): ${issues.stepsNot8.length}`);
  if (issues.stepsNot8.length > 0) console.log('   IDs:', issues.stepsNot8.map(x => `#${x.id}(${x.count})`).join(', '));

  console.log(`- Przypadki z brakami w kluczach dutySummary: ${issues.dutySummaryKeysBad.length}`);
  if (issues.dutySummaryKeysBad.length > 0) console.log('   IDs:', issues.dutySummaryKeysBad.map(x => `#${x.id}`).join(', '));

  console.log(`- Przypadki z brakującą tabelą różnicową: ${issues.diffTableMissing.length}`);

  console.log(`- Przypadki z liczbą węzłów patomechanizmu inną niż 3-4: ${issues.pathoNodesNot3or4.length}`);

  console.log(`- Przypadki ze spłyconym opisem patomechanizmu (detail < 220c): ${issues.shortPathoDetail.length}`);
  if (issues.shortPathoDetail.length > 0) {
    console.log('   IDs:', issues.shortPathoDetail.map(x => `#${x.id}(${x.avgDetail}c)`).join(', '));
  }
}

auditComponents().catch(console.error);

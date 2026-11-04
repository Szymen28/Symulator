const fs = require('fs');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function inspectTemplates() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  let templateList = [];

  for (const f of files) {
    const raw = JSON.parse(fs.readFileSync('cases/' + f, 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    if (!c.pathoNodes) continue;
    c.pathoNodes.forEach((n, i) => {
      if ((n.target || '').includes('farmakoterapia dożylna w dawkach należnych')) {
        templateList.push({
          caseId: c.id,
          title: c.shortTitle || c.title,
          nodeIdx: i + 1,
          nodeTitle: n.title,
          target: n.target
        });
      }
    });
  }

  console.log(`Znaleziono ${templateList.length} węzłów z szablonem w ${new Set(templateList.map(x=>x.caseId)).size} przypadkach:`);
  templateList.forEach(t => {
    console.log(`Przypadek #${t.caseId} (${t.title}) - Węzeł ${t.nodeIdx} (${t.nodeTitle}):`);
    console.log(`   Aktualny target: "${t.target.slice(0, 100)}..."`);
  });
}

inspectTemplates().catch(console.error);

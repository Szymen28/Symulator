const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function verify() {
  const files = [
    '111_plonica_szkarlatyna.json',
    '112_ospa_wietrzna_vzv.json',
    '113_mononukleoza_ebv.json',
    '114_krztusiec_pertussis.json',
    '115_rumien_zakazny_parwowirus_b19.json'
  ];
  let allPass = true;
  for (const f of files) {
    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const d = await decryptObjectAes(raw, MASTER_KEY);
    const has3PartStory = d.story.includes('<p><strong>Pacjent') && d.story.includes('Wywiad chorobowy:') && d.story.includes('Badanie przedmiotowe');
    const hasDuelDiff = d.diffTable && d.diffTable.title.includes('⚔️') && d.diffTable.rows.length >= 6;
    const hasDosePills = d.dutySummary && d.dutySummary.drugsAndDoses && d.dutySummary.drugsAndDoses.includes('dose-pill');
    const hasPathoDoses = d.pathoNodes.every(n => (n.target && n.target.includes('dose-pill')) || (n.drugTarget && n.drugTarget.includes('dose-pill')));
    const has11LEK = d.lekQuestions && d.lekQuestions.length === 11;
    const has8Steps = d.steps && d.steps.length === 8;
    const has6Cards = d.flashcards && d.flashcards.length === 6;
    const pass = has3PartStory && hasDuelDiff && hasDosePills && hasPathoDoses && has11LEK && has8Steps && has6Cards;
    if (!pass) allPass = false;
    console.log(f, '-> PASS:', pass, '| 3PartStory:', has3PartStory, '| DuelDiff:', hasDuelDiff, '| DosePills:', hasDosePills, '| PathoDoses:', hasPathoDoses, '| 11LEK:', has11LEK, '| 8Steps:', has8Steps, '| 6Cards:', has6Cards);
  }
  console.log('BATCH 1 OVERALL:', allPass ? '100% PERFECT PASS!' : 'FAILURES DETECTED');
}
verify();

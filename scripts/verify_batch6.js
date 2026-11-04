const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function verify() {
  const files = [
    '136_ropien_i_przetoka_odbytu.json',
    '137_pekniecie_sledziony_uraz.json',
    '138_niedroznosc_rak_jelita_grubego.json',
    '139_niedokrwienne_zapalenie_jelita_grubego.json',
    '140_pekniety_tetniak_aorty_brzusznej_raaa.json'
  ];
  let allPass = true;
  for (const f of files) {
    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const d = await decryptObjectAes(raw, MASTER_KEY);
    const has3PartStory = d.story && d.story.includes('<p><strong>Pacjent') && d.story.includes('Wywiad chorobowy:') && d.story.includes('Badanie przedmiotowe');
    const hasDuelDiff = d.diffTable && d.diffTable.title.includes('⚔️') && d.diffTable.rows.length >= 6;
    const hasDosePills = d.dutySummary && d.dutySummary.drugsAndDoses && d.dutySummary.drugsAndDoses.includes('dose-pill');
    const hasPathoDoses = d.pathoNodes && d.pathoNodes.every(n => (n.target && n.target.includes('dose-pill')) || (n.drugTarget && n.drugTarget.includes('dose-pill')));
    const has11LEK = d.lekQuestions && d.lekQuestions.length === 11;
    const has8Steps = d.steps && d.steps.length === 8;
    const has6Cards = d.flashcards && d.flashcards.length === 6;
    const pass = has3PartStory && hasDuelDiff && hasDosePills && hasPathoDoses && has11LEK && has8Steps && has6Cards;
    if (!pass) {
      allPass = false;
      console.log('FAIL DETAILS FOR', f, { has3PartStory, hasDuelDiff, diffRows: d.diffTable ? d.diffTable.rows.length : 0, hasDosePills, hasPathoDoses, has11LEK, has8Steps, has6Cards });
    } else {
      console.log(f, '-> PASS: 100% PERFECT');
    }
  }
  console.log('BATCH 6 OVERALL:', allPass ? '100% PERFECT PASS!' : 'FAILURES DETECTED');
}
verify();

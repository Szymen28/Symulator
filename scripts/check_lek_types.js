const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function checkLekTypes() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  let totalQ = 0;
  let combinatorialQ = 0;
  let falseQ = 0;
  let bioethicsQ = 0;

  for (const f of files) {
    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    (c.lekQuestions || []).forEach(q => {
      totalQ++;
      const txt = (q.q || q.question || '').toLowerCase();
      const opts = (q.opts || q.options || []).map(o => (typeof o === 'string' ? o : o.text || '').toLowerCase());

      if (opts.some(o => /^[a-e\)\.\s]*[1-5]\s*,\s*[1-5]/i.test(o)) || txt.includes('prawidłowa jest odpowiedź') || txt.includes('prawidłowe są:')) {
        combinatorialQ++;
      }
      if (txt.includes('fałsz') || txt.includes('nieprawd') || txt.includes('błędn') || txt.includes('nie jest') || txt.includes('wybierz zdanie nieprawdziwe') || txt.includes('oprócz')) {
        falseQ++;
      }
      if (txt.includes('orzecznictw') || txt.includes('kodeks') || txt.includes('zasiłek') || txt.includes('karta zgonu') || txt.includes('sanepid') || txt.includes('zlk') || txt.includes('prawo') || txt.includes('zgoda') || txt.includes('tajemnic') || txt.includes('bioetyk') || txt.includes('zdrowia publicznego') || txt.includes('zwolnieni') || txt.includes('e-zla')) {
        bioethicsQ++;
      }
    });
  }

  console.log('Question type distribution in 1650 LEK questions:');
  console.log(`  Combinatorial (kombinatoryczne): ${combinatorialQ} (${((combinatorialQ / totalQ) * 100).toFixed(1)}%)`);
  console.log(`  Negation (wskaż fałsz / nieprawdziwe): ${falseQ} (${((falseQ / totalQ) * 100).toFixed(1)}%)`);
  console.log(`  Law / Bioethics / Public Health: ${bioethicsQ} (${((bioethicsQ / totalQ) * 100).toFixed(1)}%)`);
}

checkLekTypes().catch(console.error);

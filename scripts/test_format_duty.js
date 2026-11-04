const fs = require('fs');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

function formatDutyText(raw) {
  if (!raw) return '';
  let t = raw.trim();

  // If already formatted with <br>, clean up
  if (t.includes('<br>')) {
    // Ensure consistent paragraph spacing: replace single <br> with <br><br> between numbered points if not already
    t = t.replace(/<br>\s*(\d+[\.\)])/g, '<br><br>$1');
    t = t.replace(/(?:<br>){3,}/g, '<br><br>');
    return t;
  }

  // Handle newlines first
  if (t.includes('\n')) {
    t = t.replace(/\r?\n\s*/g, '<br><br>');
  } else {
    // Semicolon followed by number: "; 2)" or "; 2."
    t = t.replace(/;\s*(\d+)[\)\.]\s*/g, '<br><br>$1. ');
    // Sentence end followed by number: ". 2) " or ". 2. "
    t = t.replace(/\.\s+(\d+)[\)\.]\s+/g, '.<br><br>$1. ');
  }

  // Normalize initial numbering "1) " -> "1. "
  t = t.replace(/^(\d+)[\)]\s*/, '$1. ');
  // Clean up excessive breaks
  t = t.replace(/(?:<br>){3,}/g, '<br><br>');
  return t;
}

async function testCases() {
  for (const id of [3, 7, 13, 17, 143]) {
    const file = fs.readdirSync('cases').find(f => new RegExp(`^0*${id}_`).test(f));
    const raw = JSON.parse(fs.readFileSync('cases/' + file, 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    console.log(`\n================ CASE #${id} DIAGNOSTICS ================`);
    const orig = c.dutySummary.diagnostics;
    const formatted = formatDutyText(orig);
    console.log(formatted);
  }
}

testCases().catch(console.error);

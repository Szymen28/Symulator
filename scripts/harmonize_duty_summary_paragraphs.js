const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

function formatDutyField(text) {
  if (!text || typeof text !== 'string') return text;
  let t = text.trim();

  // If already contains <br>, clean up spacing so each point has clean paragraph spacing
  if (t.includes('<br>')) {
    // Normalize breaks
    t = t.replace(/<br\s*\/?>/gi, '<br>');
    // Ensure that before numbers like "<br>2." or "<br>2)" there's a double break
    t = t.replace(/<br>\s*(\d+[\.\)])/g, '<br><br>$1');
    t = t.replace(/(?:<br>){3,}/g, '<br><br>');
    // Normalize "1) " to "1. "
    t = t.replace(/(^|<br><br>)\s*(\d+)[\)]\s*/g, '$1$2. ');
    return t;
  }

  // Handle newlines if present
  if (t.includes('\n')) {
    t = t.replace(/\r?\n\s*/g, '<br><br>');
  } else {
    // Semicolon followed by number: "; 2)" or "; 2."
    t = t.replace(/;\s*(\d+)[\)\.]\s*/g, '<br><br>$1. ');
    // Sentence ending followed by number: ". 2) " or ". 2. "
    t = t.replace(/\.\s+(\d+)[\)\.]\s+/g, '.<br><br>$1. ');
    // Handle cases where numbered items are separated by "; " without number, or sentences
    if (!t.includes('<br><br>')) {
      // If there are multiple sentences starting with capital letters
      t = t.replace(/([.!?])\s+([A-ZĄĆĘŁŃÓŚŹŻ])/g, '$1<br><br>$2');
    }
  }

  // Normalize initial numbering "1) " -> "1. "
  t = t.replace(/^(\d+)[\)]\s*/, '$1. ');
  // Clean up excessive breaks
  t = t.replace(/(?:<br>){3,}/g, '<br><br>');
  return t;
}

async function runDutyFormatting() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  let modifiedCount = 0;

  for (const f of files) {
    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    if (!c.dutySummary) continue;

    let changed = false;
    ['diagnostics', 'drugsAndDoses', 'procedures', 'monitoring'].forEach(key => {
      if (c.dutySummary[key]) {
        const formatted = formatDutyField(c.dutySummary[key]);
        if (formatted !== c.dutySummary[key]) {
          c.dutySummary[key] = formatted;
          changed = true;
        }
      }
    });

    if (changed) {
      const encrypted = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
      fs.writeFileSync(path.join('cases', f), JSON.stringify(encrypted, null, 2), 'utf8');
      modifiedCount++;
    }
  }

  console.log(`DutySummary formatted across ${modifiedCount} cases!`);
}

runDutyFormatting().catch(console.error);

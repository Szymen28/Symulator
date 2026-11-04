const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

function unwrapExcessiveBolding(fb) {
  if (typeof fb !== 'string') return fb;
  // Match prefix like "✅ PRAWIDŁOWO!" or "❌ BŁĄD!" or "❌ BŁĄD KRYTYCZNY!"
  const m = fb.match(/^([✅❌]\s*(?:PRAWIDŁOWO|BŁĄD|BŁĄD KRYTYCZNY|POPRAWNIE)!?)\s*<strong>([\s\S]*?)<\/strong>\s*$/i);
  if (!m) return fb;

  const prefix = m[1];
  const inner = m[2];

  // If the inner content is short (< 40 chars), keeping it bolded is fine
  if (inner.length < 40) return `${prefix} <strong>${inner}</strong>`;

  // Look for first sentence boundary or colon
  const colonIdx = inner.indexOf(':');
  const dotIdx = inner.indexOf('.');
  let splitIdx = -1;
  if (colonIdx > 0 && (dotIdx === -1 || colonIdx < dotIdx || colonIdx < 50)) {
    splitIdx = colonIdx + 1;
  } else if (dotIdx > 0 && dotIdx < 50) {
    splitIdx = dotIdx + 1;
  }

  if (splitIdx > 0 && splitIdx < inner.length) {
    const boldPart = inner.slice(0, splitIdx).trim();
    const rest = inner.slice(splitIdx).trim();
    return `${prefix} <strong>${boldPart}</strong> ${rest}`;
  } else {
    // If no clean colon or early dot, just bold the first 30 chars or keep prefix bold
    return `${prefix} ${inner}`;
  }
}

function stripDosePills(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/<span class=['"]dose-pill['"]>([\s\S]*?)<\/span>/gi, '$1');
}

async function polishCases1To100() {
  console.log("=== POLISHING CASES #1 TO #100: FEEDBACK BOLDING, VITALS, AND DOSE-PILLS ===");

  const files = fs.readdirSync(path.join(__dirname, '../cases'))
    .filter(f => f.endsWith('.json') && !f.includes('catalog') && !f.includes('manifest') && !f.includes('flashcard'))
    .filter(f => {
      const match = f.match(/^(\d+)_/);
      if (!match) return false;
      const num = parseInt(match[1], 10);
      return num >= 1 && num <= 100;
    })
    .sort((a, b) => parseInt(a) - parseInt(b));

  console.log(`Processing ${files.length} cases in range #1 to #100...`);

  let modifiedCount = 0;

  for (const filename of files) {
    const filePath = path.join(__dirname, '../cases', filename);
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    let d;
    try {
      d = await decryptObjectAes(raw, MASTER_KEY);
    } catch (e) {
      console.error(`Decryption failed for ${filename}:`, e.message);
      continue;
    }

    let modified = false;

    // 1. Vitals: Ensure label, name, val, sub are clean
    if (Array.isArray(d.vitals)) {
      d.vitals.forEach(v => {
        const label = v.label || v.name || v.param || '';
        if (!v.label) { v.label = label; modified = true; }
        if (!v.name) { v.name = label; modified = true; }
        if (!v.sub && v.val) {
          const valStr = String(v.val);
          const lStr = label.toLowerCase();
          if (lStr.includes('hr') || lStr.includes('serc') || lStr.includes('tętn')) {
            const num = parseInt(valStr.replace(/\D/g, ''), 10);
            v.sub = num > 100 ? 'Tachykardia' : (num < 60 ? 'Bradykardia' : 'Prawidłowa czynność');
          } else if (lStr.includes('bp') || lStr.includes('ciśn')) {
            v.sub = valStr.startsWith('8') || valStr.startsWith('7') || valStr.startsWith('6') || valStr.startsWith('90/') ? 'Hipotensja' : 'Prawidłowe ciśnienie';
          } else if (lStr.includes('spo2') || lStr.includes('sat')) {
            const num = parseInt(valStr.replace(/\D/g, ''), 10);
            v.sub = num < 95 ? 'Hipoksemia' : 'Prawidłowa oksygenacja';
          } else if (lStr.includes('temp')) {
            const num = parseFloat(valStr.replace(',', '.').replace(/[^\d.]/g, ''));
            v.sub = num >= 38 ? 'Gorączka' : (num < 36 ? 'Hipotermia' : 'Prawidłowa ciepłota');
          } else if (lStr.includes('rr') || lStr.includes('oddech')) {
            const num = parseInt(valStr.replace(/\D/g, ''), 10);
            v.sub = num > 20 ? 'Tachypnoë' : (num < 12 ? 'Bradypnoë' : 'Prawidłowy tor');
          } else if (lStr.includes('gcs')) {
            const num = parseInt(valStr.replace(/\D/g, ''), 10);
            v.sub = num < 15 ? 'Zaburzenia świadomości' : 'Pełny kontakt';
          } else {
            v.sub = v.status === 'vital-crit' ? 'Wartość krytyczna!' : (v.status === 'vital-warn' ? 'Wymaga uwagi' : 'Prawidłowe');
          }
          modified = true;
        }
      });
    }

    // 2. Steps: Unwrap excessive bolding in feedback
    if (Array.isArray(d.steps)) {
      d.steps.forEach(s => {
        if (Array.isArray(s.feedback)) {
          s.feedback = s.feedback.map(fb => {
            const unwrapped = unwrapExcessiveBolding(fb);
            if (unwrapped !== fb) modified = true;
            return unwrapped;
          });
        }
        if (Array.isArray(s.options)) {
          s.options.forEach(opt => {
            if (typeof opt === 'object' && opt !== null && opt.feedback) {
              const unwrapped = unwrapExcessiveBolding(opt.feedback);
              if (unwrapped !== opt.feedback) {
                opt.feedback = unwrapped;
                modified = true;
              }
            }
          });
        }
      });
    }

    // 3. Strip dose-pills outside dutySummary
    if (d.story && d.story.includes('dose-pill')) {
      d.story = stripDosePills(d.story);
      modified = true;
    }
    if (Array.isArray(d.pathoNodes)) {
      d.pathoNodes.forEach(n => {
        if (n.target && n.target.includes('dose-pill')) {
          n.target = stripDosePills(n.target);
          modified = true;
        }
        if (n.drugTarget && n.drugTarget.includes('dose-pill')) {
          n.drugTarget = stripDosePills(n.drugTarget);
          modified = true;
        }
      });
    }

    if (modified) {
      const encrypted = await encryptStringAes(JSON.stringify(d, null, 2), MASTER_KEY);
      fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), 'utf-8');
      modifiedCount++;
    }
  }

  console.log(`[SUCCESS] Polished ${modifiedCount} cases in range #1 to #100!`);
}

polishCases1To100().catch(console.error);

const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

function cleanBolding(fb) {
  if (typeof fb !== 'string') return fb;
  const m = fb.match(/^([✅❌]\s*(?:PRAWIDŁOWO|BŁĄD|BŁĄD KRYTYCZNY|POPRAWNIE)!?)\s*<strong>([\s\S]*?)<\/strong>\s*$/i);
  if (!m) return fb;
  const [_, prefix, inner] = m;
  const colonIdx = inner.indexOf(':');
  const dotIdx = inner.indexOf('.');
  if (colonIdx > 0 && colonIdx < 45) {
    return `${prefix} <strong>${inner.slice(0, colonIdx + 1)}</strong> ${inner.slice(colonIdx + 1).trim()}`;
  }
  if (dotIdx > 0 && dotIdx < 45) {
    return `${prefix} <strong>${inner.slice(0, dotIdx + 1)}</strong> ${inner.slice(dotIdx + 1).trim()}`;
  }
  return `${prefix} ${inner}`;
}

async function run() {
  console.log('=== UNWRAPPING REMAINING ENTIRE-PARAGRAPH BOLDINGS (1-150) ===');
  const files = fs.readdirSync('cases')
    .filter(f => f.endsWith('.json') && !isNaN(parseInt(f.split('_')[0], 10)))
    .sort((a, b) => parseInt(a.split('_')[0], 10) - parseInt(b.split('_')[0], 10));

  let modifiedCount = 0;
  for (const f of files) {
    const fullPath = path.join('cases', f);
    const raw = fs.readFileSync(fullPath, 'utf8');
    let c;
    try {
      c = await decryptObjectAes(JSON.parse(raw), MASTER_KEY);
    } catch (e) {
      continue;
    }

    let changed = false;
    if (Array.isArray(c.steps)) {
      c.steps.forEach(st => {
        if (Array.isArray(st.options)) {
          st.options.forEach(opt => {
            if (opt.feedback) {
              const cleaned = cleanBolding(opt.feedback);
              if (cleaned !== opt.feedback) {
                opt.feedback = cleaned;
                changed = true;
              }
            }
          });
        }
      });
    }

    if (changed) {
      const reEncrypted = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
      fs.writeFileSync(fullPath, JSON.stringify(reEncrypted, null, 2), 'utf8');
      modifiedCount++;
      process.stdout.write('.');
    }
  }
  console.log(`\nModified ${modifiedCount} files.`);
}

run().catch(console.error);

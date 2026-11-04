const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

function stripDosePills(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/<span class=['"]dose-pill['"]>([\s\S]*?)<\/span>/gi, '$1');
}

function unwrapExcessiveBolding(fb) {
  if (typeof fb !== 'string') return fb;
  const m = fb.match(/^([✅❌]\s*(?:PRAWIDŁOWO|BŁĄD|BŁĄD KRYTYCZNY|POPRAWNIE)!?)\s*<strong>([\s\S]*?)<\/strong>\s*$/i);
  if (!m) return fb;
  const prefix = m[1];
  const inner = m[2];
  if (inner.length < 50) return `${prefix} <strong>${inner}</strong>`;

  const colonIdx = inner.indexOf(':');
  const dotIdx = inner.indexOf('.');
  const exclIdx = inner.indexOf('!');
  let splitIdx = -1;
  const candidates = [colonIdx, dotIdx, exclIdx].filter(x => x > 0 && x < 60);
  if (candidates.length > 0) {
    splitIdx = Math.min(...candidates) + 1;
  } else {
    // split around 40-50 chars at nearest space
    const spaceIdx = inner.indexOf(' ', 35);
    if (spaceIdx > 0 && spaceIdx < 65) splitIdx = spaceIdx;
  }

  if (splitIdx > 0 && splitIdx < inner.length) {
    const boldPart = inner.slice(0, splitIdx).trim();
    const rest = inner.slice(splitIdx).trim();
    return `${prefix} <strong>${boldPart}</strong> ${rest}`;
  }
  return `${prefix} ${inner}`;
}

async function cleanAll() {
  console.log('=== CLEANING REMAINING DOSE-PILLS AND EXCESSIVE BOLDING REPO-WIDE ===');
  const files = fs.readdirSync('cases')
    .filter(f => f.endsWith('.json') && f !== 'auth.json' && f !== 'index.json' && !isNaN(parseInt(f.split('_')[0], 10)))
    .sort((a, b) => parseInt(a.split('_')[0], 10) - parseInt(b.split('_')[0], 10));

  let modifiedCount = 0;
  for (const f of files) {
    if (!f.endsWith('.json') || f === 'auth.json' || f === 'index.json') continue;
    const fullPath = path.join('cases', f);
    const raw = fs.readFileSync(fullPath, 'utf8');
    let c;
    try {
      const parsed = JSON.parse(raw);
      if (parsed.encrypted) {
        c = await decryptObjectAes(parsed, MASTER_KEY);
      } else {
        c = parsed;
      }
    } catch (e) {
      console.warn(`Skipping unparseable/corrupted ${f}: ${e.message}`);
      continue;
    }
    let changed = false;

    // 1. Strip dose-pills from pathoNodes
    if (Array.isArray(c.pathoNodes)) {
      c.pathoNodes.forEach(n => {
        if (n.target && n.target.includes('dose-pill')) {
          n.target = stripDosePills(n.target);
          changed = true;
        }
        if (n.drugTarget && n.drugTarget.includes('dose-pill')) {
          n.drugTarget = stripDosePills(n.drugTarget);
          changed = true;
        }
        if (n.desc && n.desc.includes('dose-pill')) {
          n.desc = stripDosePills(n.desc);
          changed = true;
        }
      });
    }

    // 2. Strip dose-pills from story and labs
    if (typeof c.story === 'string' && c.story.includes('dose-pill')) {
      c.story = stripDosePills(c.story);
      changed = true;
    }
    if (typeof c.labs === 'string' && c.labs.includes('dose-pill')) {
      c.labs = stripDosePills(c.labs);
      changed = true;
    }

    // 3. Strip dose-pills & unwrap bolding in steps
    if (Array.isArray(c.steps)) {
      c.steps.forEach(st => {
        if (Array.isArray(st.options)) {
          st.options.forEach(opt => {
            if (opt.feedback) {
              const cleaned = stripDosePills(unwrapExcessiveBolding(opt.feedback));
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
      process.stdout.write(`.`);
    }
  }
  console.log(`\nCleaned ${modifiedCount} cases.`);
}

cleanAll().catch(console.error);

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const MASTER_KEY = '@LEKSzymon28111999';
const CASES_DIR = path.join(__dirname, '..', 'cases');

async function deriveAesKey(password, salt) {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

async function decrypt(data, password) {
  const salt = Buffer.from(data.salt, 'base64');
  const iv = Buffer.from(data.iv, 'base64');
  const key = await deriveAesKey(password, salt);
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, Buffer.from(data.ciphertext, 'base64'));
  return JSON.parse(new TextDecoder().decode(decrypted));
}

async function build() {
  console.log('Building catalog.json and flashcards_index.json...');
  const manifestPath = path.join(CASES_DIR, 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    console.error('Brak manifest.json!');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const catalog = [];
  const allFlashcards = [];

  for (let i = 0; i < manifest.length; i++) {
    const file = manifest[i];
    const fullPath = path.join(CASES_DIR, file);
    try {
      const raw = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      let caseData = raw;
      if (raw.encrypted) {
        caseData = await decrypt(raw, MASTER_KEY);
      }

      const qCount = Array.isArray(caseData.lekQuestions) ? caseData.lekQuestions.length : 0;
      const flashcards = Array.isArray(caseData.flashcards) ? caseData.flashcards : [];

      catalog.push({
        id: caseData.id,
        file: file,
        dept: caseData.dept || 'Klinika',
        shortTitle: caseData.shortTitle || `Przypadek #${caseData.id}`,
        diagnosisTitle: caseData.diagnosisTitle || caseData.shortTitle || '',
        qCount: qCount,
        flashcardsCount: flashcards.length
      });

      flashcards.forEach(fc => {
        const q = fc.front || fc.q || '';
        const a = fc.back || fc.a || '';
        if (q) {
          allFlashcards.push({
            q,
            a,
            caseId: caseData.id,
            cat: fc.cat || caseData.dept || 'Klinika'
          });
        }
      });
    } catch (err) {
      console.warn(`Błąd przy przetwarzaniu pliku ${file}:`, err.message);
    }
  }

  // Sort catalog by ID
  catalog.sort((a, b) => a.id - b.id);

  const catalogPath = path.join(CASES_DIR, 'catalog.json');
  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');
  console.log(`Pomyślnie zapisano ${catalog.length} pozycji do ${catalogPath} (${(fs.statSync(catalogPath).size / 1024).toFixed(1)} KB)`);

  const flashcardsPath = path.join(CASES_DIR, 'flashcards_index.json');
  fs.writeFileSync(flashcardsPath, JSON.stringify(allFlashcards, null, 2), 'utf8');
  console.log(`Pomyślnie zapisano ${allFlashcards.length} fiszek do ${flashcardsPath} (${(fs.statSync(flashcardsPath).size / 1024).toFixed(1)} KB)`);
}

build();

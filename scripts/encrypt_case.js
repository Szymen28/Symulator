const fs = require('fs');
const crypto = require('crypto');

async function deriveAesKey(password, saltBytes) {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: saltBytes, iterations: 100000, hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

function bufToBase64(buf) {
  return Buffer.from(buf).toString('base64');
}

function base64ToBuf(b64) {
  return Buffer.from(b64, 'base64');
}

async function encryptStringAes(plainText, password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveAesKey(password, salt);
  const encoded = new TextEncoder().encode(plainText);
  const cipherBuf = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoded
  );
  return {
    encrypted: true,
    alg: 'AES-256-GCM',
    salt: bufToBase64(salt),
    iv: bufToBase64(iv),
    ciphertext: bufToBase64(cipherBuf)
  };
}

async function decryptObjectAes(encPayload, password) {
  const salt = new Uint8Array(base64ToBuf(encPayload.salt));
  const iv = new Uint8Array(base64ToBuf(encPayload.iv));
  const cipherBuf = base64ToBuf(encPayload.ciphertext);
  const key = await deriveAesKey(password, salt);
  const plainBuf = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    cipherBuf
  );
  const plainStr = new TextDecoder().decode(plainBuf);
  return JSON.parse(plainStr);
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    console.error('Usage: node scripts/encrypt_case.js <input.json> <output.json> <password>');
    process.exit(1);
  }

  const [inputFile, outputFile, password] = args;
  const rawText = fs.readFileSync(inputFile, 'utf8');

  // Verify valid JSON
  try {
    JSON.parse(rawText);
  } catch (e) {
    console.error('Błąd parsowania JSON:', e.message);
    process.exit(1);
  }

  const encrypted = await encryptStringAes(rawText, password);
  fs.writeFileSync(outputFile, JSON.stringify(encrypted, null, 2), 'utf8');
  console.log(`Zaszyfrowano pomyślnie: ${inputFile} -> ${outputFile}`);
}

if (require.main === module) {
  main().catch(err => {
    console.error('Błąd szyfrowania:', err);
    process.exit(1);
  });
}

module.exports = {
  deriveAesKey,
  encryptStringAes,
  decryptObjectAes
};

const fs = require('fs');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const KEY = '@LEKSzymon28111999';

async function fix() {
  // Fix 111
  let raw111 = JSON.parse(fs.readFileSync('cases/111_plonica_szkarlatyna.json', 'utf8'));
  let d111 = await decryptObjectAes(raw111, KEY);
  d111.pathoNodes[2].target = "Ochrona naczyń i pielęgnacja: <span class='dose-pill'>chłodne okłady</span>, <span class='dose-pill'>emolienty z 5% pantenolem</span>, luźna odzież bawełniana.";
  d111.pathoNodes[2].drugTarget = d111.pathoNodes[2].target;
  let enc111 = await encryptStringAes(JSON.stringify(d111, null, 2), KEY);
  fs.writeFileSync('cases/111_plonica_szkarlatyna.json', JSON.stringify(enc111, null, 2), 'utf8');

  // Fix 115
  let raw115 = JSON.parse(fs.readFileSync('cases/115_rumien_zakazny_parwowirus_b19.json', 'utf8'));
  let d115 = await decryptObjectAes(raw115, KEY);
  d115.pathoNodes[0].target = "Profilaktyka zakażenia u osób ryzyka: <span class='dose-pill'>izolacja od fazy prodromalnej</span>; <span class='dose-pill'>brak leczenia przyczynowego</span> (brak kinazy tymidynowej).";
  d115.pathoNodes[0].drugTarget = d115.pathoNodes[0].target;
  d115.pathoNodes[2].target = "Łagodzenie zmian naczyniowych: <span class='dose-pill'>emulsje lipidowe z ceramidami</span>, <span class='dose-pill'>unikanie gorących kąpieli</span>; brak konieczności kwarantanny.";
  d115.pathoNodes[2].drugTarget = d115.pathoNodes[2].target;
  let enc115 = await encryptStringAes(JSON.stringify(d115, null, 2), KEY);
  fs.writeFileSync('cases/115_rumien_zakazny_parwowirus_b19.json', JSON.stringify(enc115, null, 2), 'utf8');

  console.log("Successfully fixed 111 and 115 patho dose-pills!");
}
fix();

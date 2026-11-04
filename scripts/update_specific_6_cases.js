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

async function encrypt(obj, password) {
  const plainText = JSON.stringify(obj);
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  const key = await deriveAesKey(password, salt);
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    new TextEncoder().encode(plainText)
  );
  return {
    encrypted: true,
    salt: salt.toString('base64'),
    iv: iv.toString('base64'),
    ciphertext: Buffer.from(ciphertext).toString('base64')
  };
}

const SPECIFIC_6 = {
  37: {
    drugsAndDoses: "1) Atropina: <span class='dose-pill'>0,5–1,0 mg i.v.</span> w bolusie (max 3 mg) – lek ratunkowy I rzutu (zwykle mała skuteczność w bloku dystalnym węzłowo).<br>2) Izoprenalina we wlewie ciągłym: <span class='dose-pill'>0,5–5 µg/min i.v.</span> lub Adrenalina <span class='dose-pill'>2–10 µg/min</span> jako pomost do stymulacji.<br>3) Leki bezwzględnie przeciwwskazane: beta-blokery, werapamil, diltiazem, digoksyna, amiodaron.",
    procedures: "Elektrostymulacja przezskórna (TCP) natychmiast na sali reanimacyjnej (naklejenie elektrod defibrylatora w trybie PACE z prądem 50–100 mA i częstością 60–70/min) -> pilna czasowa stymulacja przezżylna (TVP) -> stała implantacja stymulatora serca (układ dwujamowy DDD)."
  },
  40: {
    drugsAndDoses: "1) Farmakoterapia I rzutu: beta-adrenolityki bez wazodylatacji (Metoprolol tartrat/sukcynian <span class='dose-pill'>50–200 mg/dobę p.o.</span>) lub Werapamil <span class='dose-pill'>120–480 mg/d</span> (wydłużenie rozkurczu i spadek gradientu LVOT).<br>2) W monoterapii opornej: Dizopiramid <span class='dose-pill'>200–400 mg/d p.o.</span> (efekt inotropowo ujemny).<br>3) Leki BEZWZGLĘDNIE ZAKAZANE: azotany, inhibitory PDE-5, digoksyna i diuretyki (zmniejszają preload i nasilają zaporę LVOT!).",
    procedures: "Implantacja kardiowertera-defibrylatora (ICD) w prewencji pierwotnej u pacjenta z 5-letnim ryzykiem SCD ≥6% wg kalkulatora ESC; miektomia chirurgiczna sposobem Morrowa lub przezskórna ablacja alkoholowa przegrody (ASA) przy opornym gradiencie ≥50 mmHg."
  },
  42: {
    drugsAndDoses: "1) Kardioprotekcja: inhibitor ACE (Ramipryl <span class='dose-pill'>2,5–5 mg/dobę p.o.</span>) + beta-adrenolityk do czasu pełnej normalizacji frakcji wyrzutowej LVEF.<br>2) Profilaktyka przeciwzakrzepowa: Enoksaparyna <span class='dose-pill'>1 mg/kg m.c. s.c. co 12 h</span> przez min. 3 miesiące ze względu na ryzyko skrzepliny w akinetycznym koniuszku lewej komory.<br>3) ZAKAZ podawania amin katecholowych (dopaminy, dobutaminy) – nasilają toksyczność katecholaminową!",
    procedures: "Wczesna koronarografia z wentrykulografią (uwidocznienie 'balonowania koniuszkowego' apical ballooning przy braku krytycznych zwężeń w tętnicach wieńcowych); kontrolne echo serca po 4–6 tygodniach celem weryfikacji powrotu kurczliwości."
  },
  49: {
    drugsAndDoses: "1) Tlenoterapia bierna wysokoprzepływowa przez maskę z rezerwuarem <span class='dose-pill'>10–15 l/min</span> (4-krotnie przyspiesza resorpcję powietrza z jamy opłucnej).<br>2) Leczenie przeciwbólowe: Paracetamol <span class='dose-pill'>1000 mg i.v. co 6 h</span> + Ketoprofen <span class='dose-pill'>100 mg i.v.</span>.<br>3) W razie silnego bólu opłucnowego: Morfina <span class='dose-pill'>2–5 mg i.v.</span> miareczkowana.",
    procedures: "Drenaż ssący jamy opłucnej (zestaw z zastawką Heimlicha lub zestaw trójbutlowy) wprowadzony w V przestrzeni międzyżebrowej w linii pachowej przedniej / środkowej pod kontrolą USG; u pacjentów z odmą nawrotową – wideotorakoskopia (VATS) z resekcją pęcherzy rozedmowych i pleurodezą mechaniczną."
  },
  50: {
    drugsAndDoses: "1) Złoty standard leczenia: proteza powietrzna CPAP generująca dodatnie ciśnienie w drogach oddechowych <span class='dose-pill'>8–14 cm H2O</span> (redukcja AHI z 48/h do <3/h).<br>2) Bezwzględny ZAKAZ stosowania benzodiazepin, opioidów i leków nasennych hamujących ośrodek oddechowy i zwiotczających mięśnie gardła.<br>3) Bezwzględny zakaz spożywania alkoholu przed snem.",
    procedures: "Diagnostyka polisomnograficzna (PSG) w pracowni snu (ocena AHI, saturacji SpO2 i architektury snu); konsultacja laryngologiczna (ocena drożności nosogardła); edukacja pacjenta i powiadomienie o prawnym zakazie prowadzenia pojazdów do czasu ustabilizowania terapii CPAP."
  },
  73: {
    drugsAndDoses: "1) Leczenie celowane spowalniające progresję torbieli: Tolwaptan <span class='dose-pill'>45/15 mg/dobę p.o.</span> miareczkowany do <span class='dose-pill'>90/30 mg/d</span> (selektywny antagonista receptora V2 wazopresyny; wymaga comiesięcznej kontroli enzymów wątrobowych AlAT/AspAT!).<br>2) Ścisła kontrola ciśnienia tętniczego: Ramipryl <span class='dose-pill'>5–10 mg/d p.o.</span> (inhibitor ACE I rzutu; cel BP <110/75 mmHg wg badania HALT-PKD).<br>3) Obfita hydratacja: spożycie wody <span class='dose-pill'>>3 litrów płynów/dobę</span> w celu naturalnego zahamowania wydzielania wazopresyny.",
    procedures: "Badanie przesiewowe angio-TK lub angio-MR naczyń koła Willisa u pacjentów z rodzinnym wywiadem pęknięcia tętniaka lub krwawienia podpajęczynówkowego; unikanie sportów kontaktowych i urazów brzucha; regularna kontrola eGFR i objętości nerek (TKV) w MR."
  }
};

async function run() {
  const manifest = JSON.parse(fs.readFileSync(path.join(CASES_DIR, 'manifest.json'), 'utf8'));

  for (const [idStr, upg] of Object.entries(SPECIFIC_6)) {
    const id = parseInt(idStr, 10);
    const fn = manifest.find(f => f.startsWith((id < 10 ? '0' + id : id) + '_') || f.startsWith(String(id) + '_'));
    if (!fn) continue;
    const fullPath = path.join(CASES_DIR, fn);
    const raw = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    const c = await decrypt(raw, MASTER_KEY);

    if (c.dutySummary) {
      c.dutySummary.drugsAndDoses = upg.drugsAndDoses;
      c.dutySummary.procedures = upg.procedures;
    }

    const encrypted = await encrypt(c, MASTER_KEY);
    fs.writeFileSync(fullPath, JSON.stringify(encrypted, null, 2), 'utf8');
    console.log(`Przypadek #${id} (${fn}): zaktualizowano leki i procedury w dutySummary.`);
  }
}

run();

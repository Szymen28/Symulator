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

const SPECIFIC_TARGETS = {
  101: [
    "Ścisła dieta bezglutenowa (GFD) na całe życie (<span class='dose-pill'>próg <20 ppm glutenu</span>; eliminacja pszenicy, żyta, jęczmienia); edukacja dietetyczna rodziców i certyfikat Przekreślonego Kłosa.",
    "Wygaszenie kaskady Th1/IL-15 po eliminacji glutenu; w rzadkiej postaci opornej (RCD typu II u starszych): <span class='dose-pill'>GKS (Budezonid 9 mg/d lub Prednizon 0,5–1 mg/kg/d)</span>.",
    "Regeneracja kosmków jelitowych (normalizacja w skali Marsha po 6–12 miesiącach diety); kontrola stężenia przeciwciał <span class='dose-pill'>anty-tTG IgA</span> po 6 i 12 miesiącach.",
    "Substytucja niedoborów: żelazo elementarne <span class='dose-pill'>3–6 mg Fe/kg m.c./d p.o.</span> w 2–3 dawkach przez min. 3 mies. + <span class='dose-pill'>Witamina D3 1000–2000 IU/d p.o.</span> + <span class='dose-pill'>Wapń 500–1000 mg/d</span>."
  ],
  102: [
    "Eliminacja białek mleka krowiego; mieszanka o znacznym stopniu hydrolizy (<span class='dose-pill'>eHF kazeinowy lub serwatkowy</span>) I rzutu; mieszanka elementarna (<span class='dose-pill'>AAF syntetyczne wolne aminokwasy</span>) przy braku poprawy po eHF.",
    "W postaci IgE-zależnej z anafilaksją: Adrenalina domięśniowo <span class='dose-pill'>0,01 mg/kg m.c. (max 0,15 mg u niemowląt) i.m.</span> w przednio-boczną powierzchnię uda; zaopatrzenie w autowstrzykiwacz.",
    "Regeneracja zapalnej śluzówki prostnicy w ciągu 48–72 h po odstawieniu BMK; suplementacja żelaza elementarnego <span class='dose-pill'>2–3 mg Fe/kg/d p.o.</span> w niedokrwistości z mikrokrawienia.",
    "Nadzorowana próba prowokacji pokarmowej (Food Challenge) po ukończeniu 9.–12. miesiąca życia lub po 6 miesiącach diety eliminacyjnej w celu oceny nabycia tolerancji."
  ],
  103: [
    "Pilna apendektomia laparoskopowa (usunięcie mechanicznej przeszkody wyrostka); reżim ścisły 'nic doustnie' (NPO); założenie kaniuli i.v. i cewnika Foleya.",
    "Resuscytacja płynowa krystaloidami <span class='dose-pill'>0,9% NaCl lub Plazmalyte 10–20 ml/kg m.c. i.v. w 1 h</span>; odbarczenie żołądka sondą nosowo-żołądkową przy uporczywych wymiotach.",
    "Antybiotykoterapia okołooperacyjna: Cefuroksym <span class='dose-pill'>50 mg/kg m.c. i.v.</span> + Metronidazol <span class='dose-pill'>10 mg/kg m.c. i.v.</span> podane 30–60 min przed nacięciem powłok.",
    "Drenaż jamy otrzewnej przy przedziurawieniu i rozlanym zapaleniu; celowana antybiotykoterapia dożylna przez 3–5 dni; Paracetamol <span class='dose-pill'>15 mg/kg i.v. co 6 h</span> + Ibuprofen <span class='dose-pill'>10 mg/kg p.o.</span>."
  ],
  104: [
    "Ceftriakson <span class='dose-pill'>100 mg/kg m.c. i.v.</span> w bolusie (max 4 g) lub Cefotaksym <span class='dose-pill'>50 mg/kg m.c. i.v. co 6 h</span> natychmiast po pobraniu posiewu (bez czekania na wyniki!).",
    "Płynoterapia resuscytacyjna we wstrząsie septycznym: zrównoważone krystaloidy <span class='dose-pill'>10–20 ml/kg m.c. w 10–20 min</span>; wsparcie inotropowe: Noradrenalina <span class='dose-pill'>0,05–0,3 µg/kg/min i.v.</span>.",
    "Wygaszanie odczynu zapalnego OUN i substytucja nadnerczowa: Deksametazon <span class='dose-pill'>0,15 mg/kg i.v.</span> przed antybiotykiem + Hydrokortyzon <span class='dose-pill'>2–4 mg/kg i.v.</span> w zespole Waterhouse'a-Friderichsena.",
    "Badania po ostrej fazie: USG nerek w dobie 2–3, cystografia mikcyjna (CUM) po 4–6 tyg. celem wykluczenia VUR, scyntygrafia 99mTc-DMSA po 6 mies. celem weryfikacji blizn korowych."
  ],
  105: [
    "Prednizon doustnie <span class='dose-pill'>60 mg/m² m.c./dobę</span> lub <span class='dose-pill'>2 mg/kg/d p.o.</span> (max 60 mg/d) w dawce pojedynczej rano przez 4–6 tygodni (indukcja remisji i regeneracja wypustek podocytów).",
    "Dawkowanie podtrzymujące po uzyskaniu remisji (białko w moczu ujemne przez 3 kolejne dni): Prednizon <span class='dose-pill'>40 mg/m² m.c. co drugi dzień rano</span> przez kolejne 4–6 tygodni.",
    "W ciężkiej hipowolemii, obrzękach powłok i wodobrzuszu: 20% albumina ludzka <span class='dose-pill'>0,5–1,0 g/kg m.c. we wlewie i.v. 2–4 h</span> + Furosemid <span class='dose-pill'>1–2 mg/kg i.v.</span> pod koniec wlewu.",
    "Ograniczenie sodu w diecie <span class='dose-pill'><2 g NaCl/dobę</span>; profilaktyka powikłań sterydoterapii: Omeprazol <span class='dose-pill'>1 mg/kg/d p.o.</span> + Wapń <span class='dose-pill'>500 mg/d</span> + Witamina D3 <span class='dose-pill'>1000 IU/d</span>."
  ],
  106: [
    "Bezwzględny ZAKAZ antybiotykoterapii (antybiotyki nasilają uwalnianie toksyny Shiga!) oraz bezwzględny ZAKAZ leków hamujących perystaltykę (loperamid).",
    "Wczesna agresywna hiperhydratacja płynami izotonicznymi <span class='dose-pill'>0,9% NaCl 10–15 ml/kg/h</span> w fazie biegunki krwotocznej (ochrona kłębuszków przed niedokrwieniem).",
    "Przetoczenie ubogoleukocytarnego koncentratu krwinek czerwonych ME-KKC <span class='dose-pill'>10–15 ml/kg m.c. i.v.</span> przy Hb <6–7 g/dl; UNIKANIE rutynowego przetaczania KKP (nasila mikrozakrzepy!).",
    "Dializoterapia otrzewnowa lub hemodializa przy bezmoczu >24 h, hiperkaliemii opornej na leczenie lub mocznicy; kontrola ciśnienia: Amlodypina <span class='dose-pill'>0,1–0,2 mg/kg/d p.o.</span>."
  ],
  107: [
    "Leczenie chirurgiczne/endoskopowe: endoskopowe ostrzyknięcie ujścia moczowodu kopolimerem dextranomer/kwas hialuronowy (<span class='dose-pill'>zabieg STING / Deflux</span>) lub ureteroneocystostomia sposobem Cohena.",
    "Przewlekła chemioprofilaktyka przeciwbakteryjna ZUM: Kotrimoksazol <span class='dose-pill'>1–2 mg trimetoprimu/kg m.c. 1×/d na noc p.o.</span> lub Nitrofurantoina <span class='dose-pill'>1–2 mg/kg 1×/d na noc</span>.",
    "W rzucie gorączkowego ZUM: Cefuroksym aksetyl <span class='dose-pill'>30–50 mg/kg/d p.o. w 2 dawkach</span> przez 10–14 dni lub Ceftriakson <span class='dose-pill'>50 mg/kg i.v. 1×/d</span>.",
    "Długoterminowy monitoring nefrologiczny: okresowa ocena ciśnienia tętniczego, białkomoczu i eGFR; kontrolna scyntygrafia nerek 99mTc-DMSA po 6 miesiącach od zakażenia."
  ],
  108: [
    "Eradykacja paciorkowca z gardła/skóry: Fenoksymetylopenicylina <span class='dose-pill'>50 000–100 000 j.m./kg m.c./dobę p.o. w 2–3 dawkach</span> przez 10 dni (lub Cefadroksyl / Azytromycyna).",
    "Redukcja przewodnienia i obrzęków: Furosemid <span class='dose-pill'>1–2 mg/kg m.c. i.v. lub p.o.</span> (max 4 mg/kg/d); restrykcja sodu (<span class='dose-pill'><1 g Na+/dobę</span>) i płynów (diureza + <span class='dose-pill'>400 ml/m²/d</span>).",
    "Kontrola nadciśnienia tętniczego II stopnia: Amlodypina <span class='dose-pill'>0,1–0,2 mg/kg/dobę p.o.</span> lub Labetalol; unikanie ACE-I/ARB w ostrej fazie skąpomoczu i hiperkaliemii.",
    "Monitorowanie laboratoryjne: kontrola stężenia składowej C3 dopełniacza po 6–8 tygodniach (musi powrócić do normy!); kontrolne badanie ogólne moczu co 4–6 tyg. przez 12 miesięcy."
  ],
  109: [
    "Zabieg rekonstrukcyjny z wyboru: pieloplastyka sposobem Hynesa-Andersona (resekcja zwężenia połączenia miedniczkowo-moczowodowego z redukcją miedniczki i nowym zespoleniem).",
    "Czasowe szynowanie moczowodu stentem wewnętrznym <span class='dose-pill'>Double-J (DJ) na 4–6 tygodni</span> zabezpieczające drożność i szczelność zespolenia.",
    "Profilaktyka przeciwbakteryjna ZUM do czasu usunięcia stentu: Amoksycylina <span class='dose-pill'>10–15 mg/kg m.c. 1×/d na noc p.o.</span> u niemowląt <3 m.ż. (lub Kotrimoksazol >3 m.ż.).",
    "Nadzór pooperacyjny: USG nerek po 6 tyg. i 3 mies.; kontrolna scyntygrafia dynamiczna 99mTc-MAG3 z furosemidem (F+20) po 6–12 miesiącach celem potwierdzenia drożności."
  ],
  110: [
    "Witamina A doustnie wg protokołu WHO (redukcja śmiertelności o 50% i ochrona nabłonka oddechowego): <span class='dose-pill'>200 000 IU p.o. 1×/d przez 2 kolejne dni</span> (dzieci ≥1 r.ż.) lub <span class='dose-pill'>100 000 IU</span> (6–11 m.ż.).",
    "Profilaktyka poekspozycyjna u nieszczepionych kontaktów: szczepionka MMR podana w ciągu <span class='dose-pill'>72 h od ekspozycji</span> LUB immunoglobulina ludzka HNIG <span class='dose-pill'>0,5 ml/kg m.c. i.m. w ciągu do 6 dni</span>.",
    "Wczesna tlenoterapia bierna wąsami tlenowymi lub maską z rezerwuarem (cel SpO2 ≥94%) w odrowym zapaleniu płuc Hechta; zaciemnienie sali chorych ze względu na bolesny światłowstręt.",
    "Ścisła izolacja powietrzno-kropelkowa chorego (przez 4 dni przed do 4 dni po wystąpieniu wysypki); Paracetamol <span class='dose-pill'>15 mg/kg p.o./i.v. co 6 h</span> lub Ibuprofen <span class='dose-pill'>10 mg/kg p.o. co 8 h</span>."
  ]
};

function cleanOptionFeedback(fb, isCorrect) {
  let cleaned = (fb || '').trim();
  
  // Strip any leading wrong/correct tags or icons
  cleaned = cleaned.replace(/^(?:❌\s*(?:BŁĄD(?:\s+KRYTYCZNY)?!?)?\s*|✅\s*(?:PRAWIDŁOWO|POPRAWNIE|DOBRZE)!?\s*)+/gi, '').trim();

  if (isCorrect) {
    return `✅ PRAWIDŁOWO! ${cleaned}`;
  } else {
    // Check if originally critical
    const isCrit = fb.includes('KRYTYCZNY');
    return isCrit ? `❌ BŁĄD KRYTYCZNY! ${cleaned}` : `❌ BŁĄD! ${cleaned}`;
  }
}

async function run() {
  const manifest = JSON.parse(fs.readFileSync(path.join(CASES_DIR, 'manifest.json'), 'utf8'));

  for (let id = 101; id <= 110; id++) {
    const fn = manifest.find(f => f.startsWith(String(id) + '_'));
    if (!fn) continue;
    const fullPath = path.join(CASES_DIR, fn);
    const raw = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    const c = await decrypt(raw, MASTER_KEY);

    // 1. Clean up options feedback (fix duplicate icons)
    if (Array.isArray(c.steps)) {
      c.steps.forEach(st => {
        if (Array.isArray(st.options)) {
          st.options.forEach(opt => {
            const isCorr = (opt.correct === true || opt.isCorrect === true);
            opt.correct = isCorr;
            opt.isCorrect = isCorr;
            opt.feedback = cleanOptionFeedback(opt.feedback, isCorr);
          });
        }
      });
    }

    // 2. Upgrade pathoNodes targets with concrete drugs, dosages and procedures
    if (Array.isArray(c.pathoNodes) && SPECIFIC_TARGETS[id]) {
      c.pathoNodes.forEach((n, idx) => {
        if (SPECIFIC_TARGETS[id][idx]) {
          n.target = SPECIFIC_TARGETS[id][idx];
          n.drugTarget = SPECIFIC_TARGETS[id][idx];
        }
      });
    }

    // Encrypt and write back
    const encrypted = await encrypt(c, MASTER_KEY);
    fs.writeFileSync(fullPath, JSON.stringify(encrypted, null, 2), 'utf8');
    console.log(`Przypadek #${id} (${fn}): naprawiono feedback i zaktualizowano punkty uchwytu pato.`);
  }
}

run();

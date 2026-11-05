const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const MASTER_KEY = '@LEKSzymon28111999';

async function deriveAesKey(password, salt) {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, baseKey, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}

async function decrypt(data, password) {
  const salt = Buffer.from(data.salt, 'base64');
  const iv = Buffer.from(data.iv, 'base64');
  const key = await deriveAesKey(password, salt);
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, Buffer.from(data.ciphertext, 'base64'));
  return JSON.parse(new TextDecoder().decode(decrypted));
}

async function encrypt(obj, password) {
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  const key = await deriveAesKey(password, salt);
  const plaintext = new TextEncoder().encode(JSON.stringify(obj));
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plaintext);
  return {
    encrypted: true,
    algorithm: 'AES-256-GCM',
    iterations: 100000,
    salt: Buffer.from(salt).toString('base64'),
    iv: Buffer.from(iv).toString('base64'),
    ciphertext: Buffer.from(ciphertext).toString('base64')
  };
}

const customShortTitles151to175 = {
  151: '31-letnia pierwiastka w 34. Hbd – Napad drgawek toniczno-klonicznych i RR 185/115 mmHg',
  152: '34-latka w 35. Hbd – Nagły silny ból brzucha, deskowata macica i krwawienie z dróg rodnych',
  153: '32-latka w 33. Hbd – Bezbolesne krwawienie żywoczerwoną krwią z dróg rodnych',
  154: '29-letnia położnica 25 min po porodzie SN – Obfity krwotok z dróg rodnych i wiotka macica',
  155: '23-latka – Nagły, ostry ból w prawym dole biodrowym z nudnościami po wysiłku',
  156: '22-latka – Ostry ból w podbrzuszu po stosunku płciowym z objawami otrzewnowymi',
  157: '25-latka – Silny ból podbrzusza, gorączka 38,9°C i ropne upławy z szyjki macicy',
  158: '48-latek – Piorunujący ból głowy (najsilniejszy w życiu) i sztywność karku',
  159: '62-latek z NT – Nagły niedowład połowiczy lewostronny, afazja i RR 210/115 mmHg',
  160: '67-latek – Przemijający niedowład prawej ręki i zaburzenia mowy trwające 35 minut',
  161: '56-latek – Nagłe zawroty głowy, dysfagia, chrypka i asymetria czucia bólu',
  162: '24-latek po urazie głowy – Krótka utrata przytomności, przerwa jasna i anizokoria',
  163: '64-latka – Rozdzierający ból oka i głowy, koła tęczowe i twarda jak kamień gałka oczna',
  164: '71-latek – Nagła, całkowita i bezbolesna utrata widzenia w lewym oku',
  165: '28-latek – Silny jednostronny ból gardła, szczękościsk i zbaczanie języczka',
  166: '68-latek z NT – Masywne, nieustępujące krwawienie z obu przewodów nosowych i gardła',
  167: '39-latek – Falowy ból lędźwiowy promieniujący do pachwiny z krwiomoczem',
  168: '72-latek – Niemożność oddania moczu od 14 godzin i bolesny opór nad spojeniem łonowym',
  169: '16-latek – Nagły, ostry ból jądra, uniesienie jądra i brak odruchu mosznowego',
  170: '32-latek – Bolesny, przetrwały wzwód ciał jamistych trwający > 6 godzin',
  171: '28-latka w ciąży znaleziona w łazience – Bóle głowy, nudności i kwasica metaboliczna',
  172: '45-latek – Głębokie zaburzenia świadomości, oddech Kussmaula i wysoka luka anionowa',
  173: '26-latek – Śpiączka, szpilkowate źrenice i częstość oddechów 4/min po iniekcji',
  174: '34-latek leczony neuroleptykami – Hipertermia 40,4°C, sztywność mięśniowa i CK > 25 000',
  175: '24-latka przyjmująca leki p/depresyjne – Pobudzenie, klonusy, hiperrefleksja i gorączka 39,5°C'
};

const explicitCleanShortTitles = {
  31: '72-latek z dusznością spoczynkową, obrzękiem płuc i tachykardią 168/min',
  32: '28-latek z napadem kołatania serca, tętnem 230/min i szerokimi QRS',
  33: '78-latek z omdleniem przy wchodzeniu po schodach i szmerem skurczowym',
  34: '68-latek ze wstrząsem kardiogennym, niskim rzutem i zastojem płucnym',
  35: '46-latka po lekach psychotropowych i diuretykach z omdleniem i wydłużonym QT',
  36: '58-latek z gorączką septyczną, nowym szmerem rozkurczowym i wybroczynami na dłoniach',
  37: '78-latka po nagłym upadku z utratą przytomności i skrajną bradykardią HR 28/min',
  38: '54-latek z BP 230/130 mmHg, silnym bólem głowy, zaburzeniami widzenia i splątaniem',
  39: '29-latek z kłującym bólem w klatce piersiowej nasilającym się przy leżeniu i tarciem osierdzia',
  40: '24-latek z omdleniem wysiłkowym i szmerem skurczowym nasilającym się przy próbie Valsalvy',
  41: '32-latka z nagłym kołataniem serca, HR 195/min i uczuciem pulsowania w gardle',
  42: '68-latka po nagłej traumie emocjonalnej z silnym bólem dławicowym i uniesieniem ST',
  43: '67-latek z gorączką 39.8°C, dusznością, splątaniem i hipotensją BP 85/55 mmHg',
  44: '62-latek z obrzękiem twarzy, kołnierzem Stokesa, dusznością i hiponatremią 118 mmol/l',
  45: '31-latka z bolesnymi czerwonymi guzami na podudziach i powiększeniem węzłów wnęk płucnych',
  46: '69-latek z dusznością wysiłkową, suchym kaszlem, trzeszczeniami i palcami pałeczkowatymi',
  47: '48-latek z potami nocnymi, spadkiem masy ciała, krwiopluciem i jamą w szczycie płuca',
  48: '56-latek z gorączką, dusznością i płynem w lewej jamie opłucnej',
  49: '22-latek, wysoki i szczupły, z nagłym kłującym bólem w klatce piersiowej i dusznością',
  50: '52-latek z głośnym chrapaniem, przerwami w oddychaniu w nocy i sennością dzienną',
  51: '45-latek po gwałtownych wymiotach z nagłym bólem zamostkowym i odmą podskórną na szyi',
  52: '57-latek z marskością wątroby, odwróceniem rytmu snu, drżeniem trzepoczącym i splątaniem',
  53: '28-latka z krwawą biegunką >10x/d, gorączką 39°C i bolesnym rozdęciem brzucha',
  54: '26-latek z przewlekłym bólem w prawym dole biodrowym, gorączką i przetokami okołoodbytniczymi',
  55: '64-latek z postępującą dysfagią, spadkiem masy ciała o 12 kg i chrypką',
  56: '34-latka z przewlekłą biegunką, anemią mikrocytarną i swędzącymi pęcherzykami na łokciach',
  57: '74-latek z bezbólową żółtaczką, świądem skóry i powiększonym, wyczuwalnym pęcherzykiem żółciowym',
  58: '48-latka ze świądem skóry, przewlekłym zmęczeniem i izolowanym wzrostem fosfatazy zasadowej',
  59: '23-latek z ruchami mimowolnymi pląsawiczymi, żółtaczką i pierścieniem rogówkowym',
  60: '51-latek ze stalowoszarym zabarwieniem skóry, cukrzycą, bólami stawów i wysoką ferrytyną',
  61: '42-latek z napadowym ciśnieniem 235/135 mmHg, pulsującym bólem głowy i zlewnymi potami',
  62: '38-latka z twarzą księżycowatą, bawolim karkiem, sinoczerwonymi rozstępami i nadciśnieniem',
  63: '62-latka z wapniem 3.85 mmol/l, skróconym QT w EKG, splątaniem i ostrym odwodnieniem',
  64: '46-latek z opornym nadciśnieniem 185/110 mmHg, hipokaliemią 2.8 mmol/l i osłabieniem mięśni',
  65: '55-latek ze stopniowym powiększeniem dłoni i stóp, zmianą rysów twarzy i nadciśnieniem',
  66: '27-latek po urazie głowy z wielomoczem 9 l/dobę, pragnieniem i hipernatremią 154 mmol/l',
  67: '58-latka z drgawkami, sodem 112 mmol/l i objawami ostrego obrzęku mózgu',
  68: '72-latek po operacji tętniaka aorty z bezmoczem, kreatyniną 4.8 mg/dl i mocznikiem 180 mg/dl',
  69: '48-latek z uogólnionymi obrzękami, białkomoczem 8.6 g/24h, albuminą 18 g/l i bólem w boku',
  70: '36-latek z makroskopowym krwiomoczem, wałeczkami erytrocytarnymi i białkomoczem',
  71: '65-latek z PChN G5D, osłuchowym tarciem osierdziowym, potasem 7.1 mmol/l i dusznością',
  72: '44-latka z gorączką 39.2°C, silnym bólem w okolicy lędźwiowej prawej i objawem Goldflama',
  73: '62-latek z masywnym bezbólowym krwiomoczem ze skrzepami i wieloletnim nikotynizmem',
  74: '21-letni student z wybroczynami na skórze, krwawieniami z dziąseł, gorączką i pancytopenią',
  75: '68-latek ze znaczną limfocytozą 75 000/µl, uogólnioną limfadenopatią i powiększeniem śledziony',
  76: '56-latek po chemioterapii z gorączką 38.9°C i bezwzględną neutropenią 180/µl',
  77: '67-latek z bólami kostnymi kręgosłupa, hiperkalcemią 3.2 mmol/l, anemią i niewydolnością nerek',
  78: '24-latek z niebolesnym, twardym powiększeniem węzła nadobojczykowego lewego i świądem skóry',
  79: '31-latka z sinicą, dusznością i saturacją 84% oporną na 100% tlen po znieczuleniu miejscowym',
  80: '38-latka z nawracającymi poronieniami, zakrzepicą żył głębokich i paradoksalnie wydłużonym APTT',
  81: '49-latek z nagłym, potwornym bólem, obrzękiem i zaczerwienieniem stawu MTP I prawej stopy',
  82: '26-latka z rumieniem na twarzy w kształcie motyla, zapaleniem stawów, białkomoczem i leukopenią',
  83: '42-latka z symetrycznym obrzękiem drobnych stawów rąk i sztywnością poranną trwającą > 2 godziny',
  84: '28-latek z zapalnym bólem kręgosłupa w nocy, sztywnością poranną i zapaleniem naczyniówki oka',
  85: '32-latek z bezobjawowo wykrytym HBsAg, anty-HBc total(+) i podwyższonym AlAT',
  86: '45-latka z pierścieniowatym rumieniem o średnicy 12 cm na udzie po ukąszeniu kleszcza',
  87: '58-latek z gorączką, sztywnością karku i zaburzeniami świadomości po spożyciu niepasteryzowanego sera',
  88: '22-letni student z uogólnioną plamisto-grudkową osutką na dłoniach i stopach oraz poliadenopatią',
  89: 'Noworodek z zespołem Downa, żółciowymi wymiotami i objawem podwójnej bańki w RTG brzucha',
  90: 'Wcześniak w 28. Hbd ze stękaniem wydechowym, sinicą i tachypnoë w 1. godzinie życia',
  91: 'Noworodek w 2. dobie z sinicą centralną oporną na test hiperoksji i brakiem szmeru sercowego',
  92: '3-tygodniowy noworodek z przedłużającą się żółtaczką, odbarwionymi stolcami i ciemnym moczem',
  93: '6-letni chłopiec z nagłą dusznością wdechową, świstem krtaniowym, ślinotokiem i pozycją wąchania',
  94: '2-letnia dziewczynka ze szczekającym kaszlem, świstem wdechowym i dusznością narastającą w nocy',
  95: '5-miesięczne niemowlę z dusznością wydechową, świstami, furczeniami i zaciąganiem międzyżebrzy',
  96: '12-letni chłopiec z bólem podbrzusza wędrującym do prawego dołu biodrowego i wymiotami',
  97: 'Dziecko 18 miesięcy po zakrztuszeniu orzeszkiem z jednostronnym świstem i ściszeniem szmeru',
  98: '8-letnia dziewczynka z wielomoczem, polidypsją, spadkiem masy ciała, osłabieniem i nudnościami',
  99: 'Niemowlę 7 miesięcy z napadowym płaczem, podkurczaniem nóżek i stolcem o wyglądzie galaretki porzeczkowej',
  100: 'Noworodek w 8. dobie z żółciowymi wymiotami, wzdęciem brzucha i cechami wstrząsu hipowolemicznego'
};

async function run() {
  const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'cases', 'manifest.json'), 'utf8'));
  console.log(`Cleaning shortTitles for ${manifest.length} cases...`);

  let modifiedCount = 0;
  for (let i = 0; i < manifest.length; i++) {
    const file = manifest[i];
    const fullPath = path.join(__dirname, '..', 'cases', file);
    const raw = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    const c = await decrypt(raw, MASTER_KEY);
    const oldTitle = c.shortTitle;
    let newTitle = oldTitle;

    if (customShortTitles151to175[c.id]) {
      newTitle = customShortTitles151to175[c.id];
    } else if (explicitCleanShortTitles[c.id]) {
      newTitle = explicitCleanShortTitles[c.id];
    } else {
      // Strip trailing parenthetical diagnosis: e.g. ' (Kwasica ketonowa z hipokaliemią)'
      newTitle = newTitle.replace(/\s*\([^)]+\)\s*$/, '').trim();
      newTitle = newTitle.replace(/[\s–—-]+$/, '').trim();
    }

    if (newTitle !== oldTitle) {
      c.shortTitle = newTitle;
      const reEnc = await encrypt(c, MASTER_KEY);
      fs.writeFileSync(fullPath, JSON.stringify(reEnc, null, 2), 'utf8');
      modifiedCount++;
    }
  }
  console.log(`Successfully updated ${modifiedCount} cases with clean patient shortTitles!`);
}

run();

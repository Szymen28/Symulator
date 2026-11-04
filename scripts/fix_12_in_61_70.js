const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const fixes = {
  62: [
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Przewlekłe stosowanie egzogennych glikokortykosteroidów (jatrogenny zespół Cushinga).",
        "B) Gruczolak przedniego płata przysadki mózgowej wydzielający ACTH (choroba Cushinga).",
        "C) Pierwotny złośliwy rak kory nadnerczy wywodzący się z komórek warstwy pasmowatej.",
        "D) Ektopowe wydzielanie ACTH przez zaawansowany rak drobnokomórkowy miąższu płuca.",
        "E) Wrodzony przerost nadnerczy uwarunkowany genetycznym niedoborem 21-hydroksylazy."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A) Świadczy o radykalnym wycięciu guza i pełnej remisji, wymagając czasowej substytucji hydrokortyzonem.",
        "B) Świadczy o całkowitym niepowodzeniu zabiegu i bezwzględnej konieczności natychmiastowej reoperacji.",
        "C) Oznacza wystąpienie nieodwracalnego zgonu mózgowego w wyniku uszkodzenia struktur podwzgórza.",
        "D) Wskazuje na rozwój trwałej moczówki nerkowej wywołanej utratą receptorów dla wazopresyny.",
        "E) Jest to zjawisko patologiczne wymagające wdrożenia wysokich dawek inhibitorów steroidogenezy."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A) Wysycenie nerkowego enzymu 11-beta-HSD2 przez nadmiar kortyzolu aktywuje receptory MR i retencję sodu.",
        "B) Masywne zwężenie obu tętnic nerkowych przez blaszki miażdżycowe z wtórną hiperreninemią.",
        "C) Pierwotny niedobór aldosteronu w nerkach z następowym kompensacyjnym skurczem naczyń krwionośnych.",
        "D) Nadmierne wydalanie jonów wapnia i magnezu przez ślinianki z następową kwasicą metaboliczną.",
        "E) Całkowite zniszczenie aparatu przykłębuszkowego nerek przez wysokie stężenia glikokortykoidów."
      ]
    }
  ],
  63: [
    {
      qIdx: 4, // Q5
      newOpts: [
        "A) Podwyższone lub nieadekwatnie prawidłowe stężenie iPTH w obecności hiperkalcemii w surowicy.",
        "B) Stężenie nienaruszonego parathormonu iPTH całkowicie niewykrywalne (<5 pg/ml) w surowicy krwi.",
        "C) Wybitnie wysokie stężenie fosforanów nieorganicznych w surowicy przekraczające 2,5 mmol/l.",
        "D) Całkowity spadek dobowego wydalania wapnia z moczem do zera w teście z dobowej zbiórki.",
        "E) Podwyższone stężenie ferrytyny powyżej 2000 µg/l z cechami ostrego uszkodzenia miąższu wątroby."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A) Rodzinna hiperkalcemia hipokalciuryczna (FHH na tle inaktywacji genu receptora CaSR).",
        "B) Zespół mnogiej gruczolakowatości wewnątrzwydzielniczej typu 1 (zespół MEN 1 / Wermera).",
        "C) Zespół McCune'a-Albrighta (dysplazja włóknista kości, plamy café-au-lait i endokrynopatie).",
        "D) Zespół DiGeorge'a (mikrodelecja 22q11.2 z aplazją grasicy i wrodzoną niedoczynnością przytarczyc).",
        "E) Krzywica hipofosfatemiczna sprzężona z chromosomem X wywołana nadmiernym wydalaniem fosforanów."
      ]
    }
  ],
  64: [
    {
      qIdx: 4, // Q5
      newOpts: [
        "A) Doksazosyna (selektywny antagonista receptorów alfa-1-adrenergicznych).",
        "B) Enalapryl (inhibitor enzymu konwertującego angiotensynę – lek z grupy ACEI).",
        "C) Losartan (selektywny antagonista receptora dla angiotensyny II typu 1 – ARB).",
        "D) Bisoprolol (kardioselektywny lek beta-adrenolityczny blokujący receptory beta-1).",
        "E) Spironolakton (nieselektywny antagonista receptora mineralokortykoidowego MRA)."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) Spironolakton blokuje receptory androgenowe, hamuje syntezę testosteronu i jest agonistą receptorów PR.",
        "B) Ponieważ spironolakton bezpośrednio pobudza syntezę i pulsacyjne wydzielanie prolaktyny w przysadce.",
        "C) Wskutek patologicznego odkładania się soli wapnia i fosforu w zrębie tkanki gruczołowej sutków.",
        "D) Z powodu bezpośredniego toksycznego uszkodzenia ciał jamistych prącia przez wysokie stężenie potasu.",
        "E) Ponieważ lek ten wywołuje nieodwracalną martwicę komórek śródmiąższowych Leydiga w obu jądrach."
      ]
    }
  ],
  65: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A) Ciężar właściwy moczu < 1,005 oraz osmolalność moczu < 200-300 mOsm/kg H2O.",
        "B) Ciężar właściwy moczu > 1,035 przy wysokiej zawartości substancji osmotycznych.",
        "C) Obecność licznych wałeczków szklistych i ziarnistych w osadzie odwirowanego moczu.",
        "D) Wybitny wzrost stężenia kreatyniny w moczu z jednoczesnym zatrzymaniem wydalania sodu.",
        "E) Trwały zasadowy odczyn moczu (pH > 8,0) w wielokrotnych pomiarach laboratoryjnych."
      ]
    }
  ],
  67: [
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) Przerwać podaż sodu, podać desmopresynę (dDAVP 1-2 µg) i wdrożyć wlew 5% glukozy w celu re-obniżenia sodu.",
        "B) Podać kolejny szybki bolus hipertonicznego 3% roztworu chlorku sodu w ilości 300 ml.",
        "C) Podać dożylnie 80 mg furosemidu w celu natychmiastowego wymuszenia dalszej diurezy.",
        "D) Zastosować pilną hemodializę z wysokim stężeniem sodu w płynie dializacyjnym.",
        "E) Zignorować wynik i kontynuować dotychczasowe podawanie roztworów bez modyfikacji."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "A) Waptany mają opóźniony początek działania, a nieprzewidywalna diureza grozi przekroczeniem tempa i ODS.",
        "B) Tolwaptan bezpośrednio nasila drgawki poprzez nieodwracalną blokadę receptorów GABA w mózgowiu.",
        "C) Leki z grupy waptanów wchodzą w reakcję z macierzą kostną wywołując jej gwałtowną demineralizację.",
        "D) Antagoniści receptora V2 są lekami dopuszczonymi do stosowania wyłącznie w ciężkiej hipernatremii.",
        "E) Tolwaptan podany dożylnie powoduje natychmiastowy spadek ciśnienia tętniczego do zera."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A) Chory jest przytomny, lecz występuje tetraplegia i porażenie nerwów; komunikacja to ruchy pionowe oczu.",
        "B) Stan głębokiej śpiączki mózgowej z całkowitym brakiem reakcji na jakiekolwiek bodźce bólowe.",
        "C) Spastyczne zaciśnięcie mięśni żwaczy uniemożliwiające mechaniczne otwarcie ust u chorego.",
        "D) Nagłe zatrzymanie akcji serca w mechanizmie asystolii z zamknięciem zastawek przedsionkowych.",
        "E) Obustronne symetryczne porażenie nerwów kulszowych z opadaniem obu stóp bez zaburzeń mowy."
      ]
    }
  ],
  69: [
    {
      qIdx: 6, // Q7
      newOpts: [
        "A) Rytuksymab (przeciwciało skierowane przeciwko antygenowi CD20 limfocytów B).",
        "B) Trastuzumab (przeciwciało blokujące receptor naskórkowego czynnika wzrostu HER2).",
        "C) Infliksymab (chimeryczne przeciwciało neutralizujące rozpuszczalny czynnik TNF-alfa).",
        "D) Omalizumab (humanizowane przeciwciało wiążące wolną immunoglobulinę E w surowicy).",
        "E) Pembrolizumab (przeciwciało blokujące receptor programowanej śmierci komórki PD-1)."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A) Obraz krzyża maltańskiego (Maltese cross pattern) wykazujący dodatnią dwułomność.",
        "B) Wygląd kół zębatych o ostrych krawędziach bez cech polaryzacji w polu widzenia.",
        "C) Kształt liścia paproci powstający w wyniku krystalizacji soli sodowych moczu.",
        "D) Obraz plastra miodu utworzony przez zlewające się wałeczki woskowe w osadzie.",
        "E) Wygląd komórek jeżowatych (echinocytów) powstałych w roztworze hipertonicznym."
      ]
    }
  ]
};

async function run() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  for (const f of files) {
    const m = f.match(/^(\d+)_/);
    if (!m) continue;
    const cid = parseInt(m[1], 10);
    if (!fixes[cid]) continue;

    console.log(`Applying fixes to Case #${cid} (${f})...`);
    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);

    fixes[cid].forEach(up => {
      const qObj = c.lekQuestions[up.qIdx];
      if (!qObj) return;

      if (up.newOpts) {
        qObj.opts = up.newOpts;
        qObj.options = up.newOpts;
      }
    });

    const encrypted = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
    fs.writeFileSync(path.join('cases', f), JSON.stringify(encrypted, null, 2), 'utf8');
    console.log(`✓ Case #${cid} successfully updated and re-encrypted.`);
  }
}

run();

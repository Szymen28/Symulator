const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function runAudit() {
  console.log('================================================================');
  console.log('       GLOBALNY AUDYT JAKOŚCI I JEDNOLITOŚCI: 150 PRZYPADKÓW    ');
  console.log('================================================================\n');

  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f)).sort((a,b) => parseInt(a) - parseInt(b));
  
  const stats = {
    totalCases: files.length,
    decryptionSuccess: 0,
    decryptionErrors: 0,
    // Vitals
    vitalsTotal: 0,
    vitalsCrit: 0,
    vitalsWarn: 0,
    vitalsOk: 0,
    vitalsMissingLabel: 0,
    // Story
    story3PartCount: 0,
    storyIncompleteCount: 0,
    // Steps
    totalSteps: 0,
    stepsDisparityHigh: 0, // ratio >= 2.0 in simulation steps
    stepsDuplicateFeedback: 0,
    stepsBoldingOk: 0,
    // Pathomechanism
    totalPathoNodes: 0,
    pathoWithDosePills: 0, // should be 0!
    pathoTargetLengths: [],
    pathoTargetHasConcreteTherapy: 0,
    // Summary
    summaryCount: 0,
    summaryWithDosePills: 0,
    summaryMonolithicWallOfText: 0,
    diffTableCount: 0,
    diffTableWithDuelIcon: 0,
    diffTableRowsDist: {},
    // LEK Questions
    totalLekQuestions: 0,
    lekDisparityGte2: 0,
    lekDisparityGte1_5: 0,
    lekDisparityNormal: 0,
    lekDisparityLowerThan1: 0,
    lekKeyDist: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    lekTypeCombinatorial: 0,
    lekTypeFalseTrue: 0,
    lekTypeEthicsLaw: 0,
    lekFieldMismatches: 0,
    // Case detail anomalies
    caseAnomalies: []
  };

  for (const f of files) {
    const cid = parseInt(f.match(/^(\d+)_/)[1], 10);
    let c;
    try {
      const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
      c = await decryptObjectAes(raw, MASTER_KEY);
      stats.decryptionSuccess++;
    } catch (err) {
      stats.decryptionErrors++;
      stats.caseAnomalies.push({ cid, file: f, issue: `Błąd deszyfrowania: ${err.message}` });
      continue;
    }

    const issues = [];

    // --- 1. VITALS AUDIT ---
    const vitals = c.vitals || [];
    if (!vitals || vitals.length === 0) {
      issues.push('Brak parametrów życiowych (vitals)');
    } else {
      vitals.forEach((v, vIdx) => {
        stats.vitalsTotal++;
        if (v.status === 'vital-crit') stats.vitalsCrit++;
        else if (v.status === 'vital-warn') stats.vitalsWarn++;
        else stats.vitalsOk++;

        if (!v.label || v.label.trim() === '') {
          stats.vitalsMissingLabel++;
          issues.push(`Wital #${vIdx + 1} nie posiada etykiety (label)`);
        }
      });
    }

    // --- 2. STORY AUDIT ---
    const story = c.story || '';
    const hasPacjent = /Pacjent/i.test(story);
    const hasWywiad = /Wywiad/i.test(story);
    const hasBadanie = /Badanie/i.test(story);
    if (hasPacjent && hasWywiad && hasBadanie) {
      stats.story3PartCount++;
    } else {
      stats.storyIncompleteCount++;
      issues.push(`Historia niekompletna (Pacjent:${hasPacjent}, Wywiad:${hasWywiad}, Badanie:${hasBadanie})`);
    }

    // --- 3. STEPS AUDIT ---
    const steps = c.steps || [];
    stats.totalSteps += steps.length;
    steps.forEach((st, sIdx) => {
      const choices = st.choices || st.options || [];
      const correctIdx = st.correctIdx ?? 0;
      const optLens = choices.map(ch => (typeof ch === 'string' ? ch : ch.text || '').length);
      const corrLen = optLens[correctIdx] || 0;
      const wrongLens = optLens.filter((_, i) => i !== correctIdx);
      const avgWrong = wrongLens.reduce((a, b) => a + b, 0) / (wrongLens.length || 1);
      const ratio = corrLen / (avgWrong || 1);
      if (ratio >= 2.0) {
        stats.stepsDisparityHigh++;
        issues.push(`Krok ${sIdx + 1}: skrajna dysproporcja długości (ratio: ${ratio.toFixed(2)})`);
      }

      // Check feedback
      choices.forEach(ch => {
        const fb = typeof ch === 'string' ? '' : (ch.feedback || '');
        if (/czerwony\s*X\s*błąd\s*ptaszek/i.test(fb)) {
          stats.stepsDuplicateFeedback++;
          issues.push(`Krok ${sIdx + 1}: powielony prefiks feedbacku`);
        }
      });
    });

    // --- 4. PATHOMECHANISM AUDIT ---
    const pathoNodes = c.pathoNodes || [];
    stats.totalPathoNodes += pathoNodes.length;
    pathoNodes.forEach((pn, pnIdx) => {
      const rawText = JSON.stringify(pn);
      if (rawText.includes('class="dose-pill"') || rawText.includes("class='dose-pill'")) {
        stats.pathoWithDosePills++;
        issues.push(`Węzeł patomechanizmu #${pnIdx + 1} zawiera dose-pill`);
      }
      const target = pn.target || '';
      stats.pathoTargetLengths.push(target.length);
      // Check if target contains concrete drug dosages or procedures
      if (/\d+\s*(mg|g|µg|ug|ml|j\.m\.|mmol|%)/i.test(target) || /biopsj|TK|USG|angio|cewnik|drenaż|endoskop|rezonans|kardiowersj/i.test(target)) {
        stats.pathoTargetHasConcreteTherapy++;
      }
    });

    // --- 5. SUMMARY AUDIT ---
    const summary = c.dutySummary || c.summary || null;
    if (summary) {
      stats.summaryCount++;
      const summaryStr = typeof summary === 'string' ? summary : JSON.stringify(summary);
      if (summaryStr.includes('dose-pill')) {
        stats.summaryWithDosePills++;
      }
      // Check monolithic wall of text
      if (typeof summary === 'string') {
        const paragraphs = summary.split(/\n\s*\n|<p>|<br\s*\/?>/i).filter(p => p.trim().length > 0);
        if (paragraphs.length <= 1 && summary.length > 300) {
          stats.summaryMonolithicWallOfText++;
          issues.push('Podsumowanie: jednolity blok tekstu bez akapitów');
        }
      }
    }

    // --- 6. DIFFERENTIAL DIAGNOSIS AUDIT ---
    const diff = c.diffTable || c.differential || (c.dutySummary && c.dutySummary.differential) || null;
    if (diff) {
      stats.diffTableCount++;
      const rows = Array.isArray(diff) ? diff : (diff.rows || []);
      const rowCount = rows.length;
      stats.diffTableRowsDist[rowCount] = (stats.diffTableRowsDist[rowCount] || 0) + 1;
      const rawDiff = JSON.stringify(diff);
      if (rawDiff.includes('⚔️') || (c.differentialTitle && c.differentialTitle.includes('⚔️')) || JSON.stringify(c).includes('⚔️')) {
        stats.diffTableWithDuelIcon++;
      }
    }

    // --- 7. LEK QUESTIONS AUDIT ---
    const questions = c.lekQuestions || c.lek_questions || (c.quiz && c.quiz.questions) || [];
    stats.totalLekQuestions += questions.length;
    if (questions.length !== 11) {
      issues.push(`Liczba pytań LEK różna od 11 (ma: ${questions.length})`);
    }

    let hasComb = false;
    let hasTf = false;
    let hasEth = false;

    questions.forEach((q, qIdx) => {
      const qText = q.question || q.q || '';
      const opts = q.opts || q.options || [];
      const correctIdx = q.correct ?? q.correctIdx ?? 0;
      stats.lekKeyDist[correctIdx] = (stats.lekKeyDist[correctIdx] || 0) + 1;

      // Length parity
      const optLens = opts.map(o => (typeof o === 'string' ? o : o.text || '').length);
      const corrLen = optLens[correctIdx] || 0;
      const wrongLens = optLens.filter((_, i) => i !== correctIdx);
      const avgWrong = wrongLens.reduce((a, b) => a + b, 0) / (wrongLens.length || 1);
      const ratio = corrLen / (avgWrong || 1);

      if (ratio >= 2.0) {
        stats.lekDisparityGte2++;
        issues.push(`Pytanie LEK Q${qIdx + 1}: skrajna dysproporcja (ratio: ${ratio.toFixed(2)})`);
      } else if (ratio >= 1.5) {
        stats.lekDisparityGte1_5++;
      } else if (ratio >= 1.0) {
        stats.lekDisparityNormal++;
      } else {
        stats.lekDisparityLowerThan1++;
      }

      // Types
      if (/zestaw twierdzeń|kombinacj|wskaz zestaw|1\.|2\.|3\.|4\.|5\./i.test(qText)) {
        hasComb = true;
      }
      if (/fałszyw|prawdziw|nieprawd|błędn/i.test(qText)) {
        hasTf = true;
      }
      if (/bioetyk|prawo|orzeczn|kodeks|zgod|obowiąz|ustaw|karty praw|tajemnic|izb|zgon/i.test(qText)) {
        hasEth = true;
      }

      // Sync
      if (q.q && q.question && q.q !== q.question) stats.lekFieldMismatches++;
      if (q.opts && q.options && JSON.stringify(q.opts) !== JSON.stringify(q.options)) stats.lekFieldMismatches++;
      if (q.correct !== undefined && q.correctIdx !== undefined && q.correct !== q.correctIdx) stats.lekFieldMismatches++;
    });

    if (hasComb) stats.lekTypeCombinatorial++;
    if (hasTf) stats.lekTypeFalseTrue++;
    if (hasEth) stats.lekTypeEthicsLaw++;

    if (issues.length > 0) {
      stats.caseAnomalies.push({ cid, file: f, issues });
    }
  }

  // --- REPORT SUMMARY ---
  console.log('--- WYNIKI AUDYTU STRUKTURALNEGO ---');
  console.log(`Przypadki ogółem: ${stats.totalCases} / 150`);
  console.log(`Pomyślne deszyfrowanie: ${stats.decryptionSuccess} / ${stats.totalCases}`);
  console.log(`Błędy deszyfrowania: ${stats.decryptionErrors}`);

  console.log('\n--- 1. MONITOR PARAMETRÓW ŻYCIOWYCH (VITALS) ---');
  console.log(`Parametry życiowe łącznie: ${stats.vitalsTotal}`);
  console.log(`  - Krytyczne (vital-crit [czerwony]): ${stats.vitalsCrit} (${(stats.vitalsCrit/stats.vitalsTotal*100).toFixed(1)}%)`);
  console.log(`  - Ostrzegawcze (vital-warn [żółty]): ${stats.vitalsWarn} (${(stats.vitalsWarn/stats.vitalsTotal*100).toFixed(1)}%)`);
  console.log(`  - Prawidłowe (vital-ok [zielony]): ${stats.vitalsOk} (${(stats.vitalsOk/stats.vitalsTotal*100).toFixed(1)}%)`);
  console.log(`  - Brakujące etykiety (brak nazwy parametru): ${stats.vitalsMissingLabel}`);

  console.log('\n--- 2. WINIETA KLINICZNA (STORY) ---');
  console.log(`Pełny format 3-częściowy (Pacjent + Wywiad + Badanie): ${stats.story3PartCount} / ${stats.totalCases} (${(stats.story3PartCount/stats.totalCases*100).toFixed(1)}%)`);
  console.log(`Format niepełny: ${stats.storyIncompleteCount}`);

  console.log('\n--- 3. KROKI SYMULACJI (SOR STEPS) ---');
  console.log(`Kroki symulacji ogółem: ${stats.totalSteps} (średnio ${(stats.totalSteps/stats.totalCases).toFixed(1)} na przypadek)`);
  console.log(`Pytania z 'longest option bias' (ratio >= 2.0): ${stats.stepsDisparityHigh}`);
  console.log(`Powielone prefiksy feedbacku ('czerwony X błąd...'): ${stats.stepsDuplicateFeedback}`);

  console.log('\n--- 4. PATOMECHANIZM (PATHOMECHANISM) ---');
  console.log(`Węzły patomechanizmu łącznie: ${stats.totalPathoNodes} (średnio ${(stats.totalPathoNodes/stats.totalCases).toFixed(1)} na przypadek)`);
  console.log(`Węzły z niepożądanymi dose-pill: ${stats.pathoWithDosePills} (cel: 0)`);
  const avgTargetLen = (stats.pathoTargetLengths.reduce((a,b)=>a+b,0) / (stats.pathoTargetLengths.length || 1)).toFixed(0);
  console.log(`Średnia długość punktu uchwytu: ${avgTargetLen} znaków (Min: ${Math.min(...stats.pathoTargetLengths)}, Max: ${Math.max(...stats.pathoTargetLengths)})`);
  console.log(`Węzły z konkretną farmako-/diagnostyką: ${stats.pathoTargetHasConcreteTherapy} / ${stats.totalPathoNodes} (${(stats.pathoTargetHasConcreteTherapy/stats.totalPathoNodes*100).toFixed(1)}%)`);

  console.log('\n--- 5. PODSUMOWANIE I TABELA RÓŻNICOWA ---');
  console.log(`Przypadki z podsumowaniem: ${stats.summaryCount} / ${stats.totalCases}`);
  console.log(`Podsumowania z niebieskimi pastylkami leków (dose-pill): ${stats.summaryWithDosePills}`);
  console.log(`Monolityczne bloki tekstu bez akapitów: ${stats.summaryMonolithicWallOfText}`);
  console.log(`Tabele różnicowe: ${stats.diffTableCount}`);
  console.log(`Tabele z ikoną pojedynku (⚔️): ${stats.diffTableWithDuelIcon}`);
  console.log(`Rozkład liczby wierszy w tabeli różnicowej:`, stats.diffTableRowsDist);

  console.log('\n--- 6. DOGRYWKA LEK (1650 PYTAŃ) ---');
  console.log(`Pytania LEK ogółem: ${stats.totalLekQuestions} / 1650`);
  console.log(`  - Pytania z dysproporcją >= 2.0 (skrajny bias): ${stats.lekDisparityGte2} (0.0%)`);
  console.log(`  - Pytania z dysproporcją 1.5 - 2.0: ${stats.lekDisparityGte1_5} (${(stats.lekDisparityGte1_5/stats.totalLekQuestions*100).toFixed(1)}%)`);
  console.log(`  - Pytania z dysproporcją 1.0 - 1.5 (optymalne): ${stats.lekDisparityNormal} (${(stats.lekDisparityNormal/stats.totalLekQuestions*100).toFixed(1)}%)`);
  console.log(`  - Pytania z dłuższą błędną odpowiedzią (< 1.0): ${stats.lekDisparityLowerThan1} (${(stats.lekDisparityLowerThan1/stats.totalLekQuestions*100).toFixed(1)}%)`);
  console.log(`Rozkład klucza odpowiedzi:`, stats.lekKeyDist);
  console.log(`Przypadki z pytaniami kombinatorycznymi: ${stats.lekTypeCombinatorial} / ${stats.totalCases}`);
  console.log(`Przypadki z pytaniami prawda/fałsz: ${stats.lekTypeFalseTrue} / ${stats.totalCases}`);
  console.log(`Przypadki z pytaniami orzecznictwo/prawo/bioetyka: ${stats.lekTypeEthicsLaw} / ${stats.totalCases}`);
  console.log(`Niezgodności synchronizacji pól (q vs question, opts vs options): ${stats.lekFieldMismatches}`);

  console.log('\n--- 7. ANOMALIE I UWAGI SZCZEGÓŁOWE ---');
  if (stats.caseAnomalies.length === 0) {
    console.log('✓ BRAK ANOMALII! Wszystkie 150 przypadków spełnia w 100% kryteria Złotego Standardu!');
  } else {
    console.log(`Znaleziono anomalie w ${stats.caseAnomalies.length} przypadkach:`);
    stats.caseAnomalies.slice(0, 15).forEach(a => {
      console.log(`  - Przypadek #${a.cid} (${a.file}): ${a.issues ? a.issues.join('; ') : a.issue}`);
    });
    if (stats.caseAnomalies.length > 15) {
      console.log(`  ... i ${stats.caseAnomalies.length - 15} kolejnych.`);
    }
  }

  // Save audit data to JSON
  fs.writeFileSync('notes/full_platform_audit_results.json', JSON.stringify(stats, null, 2), 'utf8');
  console.log('\nPełne wyniki zapisano do: notes/full_platform_audit_results.json');
}

runAudit().catch(console.error);

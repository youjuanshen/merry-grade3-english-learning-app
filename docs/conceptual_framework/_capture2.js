/**
 * Capture ALL screenshots for Figure 2 — comprehensive version
 */
const puppeteer = require('puppeteer-core');
const path = require('path');
const OUT = path.join(__dirname);
const W = 414, H = 736;
const wait = ms => new Promise(r => setTimeout(r, ms));

async function clickText(page, text) {
  await page.evaluate((t) => {
    const all = document.querySelectorAll('button, div, span, a');
    for (const el of all) {
      if (el.textContent.trim().includes(t) && el.children.length <= 2) {
        el.click(); return;
      }
    }
  }, text);
}

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--proxy-server=direct://']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 2 });

  // =============================================
  // 1. TEACHER DASHBOARD
  // =============================================
  await page.goto('http://localhost:8080/teacher/index.html', { waitUntil: 'networkidle2' });
  await wait(1000);
  await page.screenshot({ path: path.join(OUT, 'fig2_teacher_home.png') });
  console.log('1. teacher home');

  // Teacher prepare page
  await page.goto('http://localhost:8080/teacher/prepare.html', { waitUntil: 'networkidle2' });
  await wait(1000);
  await page.screenshot({ path: path.join(OUT, 'fig2_teacher_prepare.png') });
  console.log('2. teacher prepare');

  // =============================================
  // 2. STUDENT APP — full flow
  // =============================================
  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
  await wait(500);

  // Welcome → pair select
  await page.evaluate(() => document.getElementById('welcome-start-btn').click());
  await wait(800);

  // Select two students
  await page.evaluate(() => {
    const c = document.querySelectorAll('.student-card');
    c[0].click(); c[1].click();
  });
  await wait(300);

  // Start
  await page.evaluate(() => document.querySelector('.start-btn').click());
  await wait(800);

  // Click listening module → adventure map
  await page.evaluate(() => document.querySelectorAll('.module-card')[0].click());
  await wait(800);

  // Click GO on station 1
  await page.evaluate(() => {
    const all = document.querySelectorAll('div, span');
    for (const el of all) {
      if (el.textContent.trim() === 'GO!' && el.children.length === 0) { el.click(); break; }
    }
  });
  await wait(1000);

  // Click start challenge
  await clickText(page, '开始挑战');
  await wait(1500);

  // =============================================
  // 3. SCAFFOLD L1-L4 — answer wrong multiple times
  // =============================================

  // First, click a WRONG answer for A (click the 2nd option, not the correct one)
  // We need to find which is correct and click a wrong one
  await page.evaluate(() => {
    const opts = document.querySelectorAll('.coop-option-card');
    // Click the second option (likely wrong)
    if (opts.length >= 2) opts[1].click();
  });
  await wait(300);
  // Confirm A
  await page.evaluate(() => document.querySelector('.coop-confirm-btn').click());
  await wait(600);

  // Check if it was wrong — if scaffold L1 shows, capture it
  let isScaffold = await page.evaluate(() => {
    return document.querySelector('.scaffold-screen, .retry-screen, [class*="scaffold"]') !== null ||
           document.body.innerText.includes('再来一次') || document.body.innerText.includes('讨论');
  });

  if (isScaffold) {
    await page.screenshot({ path: path.join(OUT, 'fig2_scaffold_L1.png') });
    console.log('3a. scaffold L1 (A wrong)');
    await clickText(page, '再来一次');
    await wait(1000);
  }

  // Now answer correctly for A — click first option
  // Re-take student A correct flow
  await page.evaluate(() => {
    const opts = document.querySelectorAll('.coop-option-card');
    if (opts.length >= 1) opts[0].click();
  });
  await wait(300);
  await page.evaluate(() => document.querySelector('.coop-confirm-btn').click());
  await wait(600);

  // Scroll to B zone
  await page.evaluate(() => {
    const gs = document.querySelector('#game-screen');
    if (gs) gs.scrollTop = 300;
  });
  await wait(300);

  // B answers wrong (1st time) → L1 scaffold
  await page.evaluate(() => {
    const opts = document.querySelectorAll('.coop-option-card');
    // Find a wrong answer for B
    for (const o of opts) {
      const t = o.textContent.trim();
      if (t && t !== '' && !o.classList.contains('selected-a') && !o.classList.contains('pre-selected')) {
        o.click(); break; // Click first available B option (might be wrong)
      }
    }
  });
  await wait(300);

  // Confirm B
  await page.evaluate(() => {
    const btns = document.querySelectorAll('.coop-confirm-btn');
    btns[btns.length - 1].click();
  });
  await wait(800);

  // Capture scaffold screen (should be L1: peer discussion)
  await page.screenshot({ path: path.join(OUT, 'fig2_scaffold_peer.png') });
  console.log('3b. scaffold peer discussion');

  // Click retry
  await clickText(page, '再来一次');
  await wait(1500);

  // Now we're back at the question — let's try to answer correctly this time
  // Click correct A option
  await page.evaluate(() => {
    const opts = document.querySelectorAll('.coop-option-card');
    if (opts.length >= 1) opts[0].click();
  });
  await wait(300);
  await page.evaluate(() => document.querySelector('.coop-confirm-btn').click());
  await wait(600);

  // Scroll to B
  await page.evaluate(() => {
    const gs = document.querySelector('#game-screen');
    if (gs) gs.scrollTop = 300;
  });
  await wait(300);

  // B: check what hint level we're at — find the hint element
  let hintShown = await page.evaluate(() => {
    const hint = document.querySelector('#progressive-hint, .correct-hint');
    return hint ? hint.textContent : 'no hint';
  });
  console.log('Hint status:', hintShown);

  // If hint is shown, screenshot it
  if (hintShown !== 'no hint') {
    await page.screenshot({ path: path.join(OUT, 'fig2_scaffold_hint.png') });
    console.log('3c. scaffold hint');
  }

  // Let's answer B correctly this time to progress
  await page.evaluate(() => {
    const opts = document.querySelectorAll('.coop-option-card');
    // We need to find the correct B answer
    // The correct answer for "bear" Chinese is "熊" etc
    // Let's just try clicking each option
    for (const o of opts) {
      const t = o.textContent.trim();
      if (!o.classList.contains('selected-a') && !o.classList.contains('pre-selected') && t) {
        // Click last option as it might be correct
      }
    }
    // Actually just click the correct one - usually it's the one matching
    const lastOpt = opts[opts.length - 1];
    if (lastOpt) lastOpt.click();
  });
  await wait(300);
  await page.evaluate(() => {
    const btns = document.querySelectorAll('.coop-confirm-btn');
    btns[btns.length - 1].click();
  });
  await wait(1000);

  // Check if we passed or got scaffold again
  let currentText = await page.evaluate(() => document.body.innerText.substring(0, 200));
  console.log('After B answer:', currentText.substring(0, 100));

  // =============================================
  // 4. COMPLETE QUESTIONS TO GET COMBO + STARS
  // =============================================
  // Let's try a fresh approach — restart and answer everything correctly
  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
  await wait(500);
  await page.evaluate(() => document.getElementById('welcome-start-btn').click());
  await wait(800);
  await page.evaluate(() => {
    const c = document.querySelectorAll('.student-card');
    c[0].click(); c[1].click();
  });
  await wait(300);
  await page.evaluate(() => document.querySelector('.start-btn').click());
  await wait(800);
  await page.evaluate(() => document.querySelectorAll('.module-card')[0].click());
  await wait(800);
  await page.evaluate(() => {
    const all = document.querySelectorAll('div, span');
    for (const el of all) {
      if (el.textContent.trim() === 'GO!' && el.children.length === 0) { el.click(); break; }
    }
  });
  await wait(1000);
  await clickText(page, '开始挑战');
  await wait(1500);

  // Answer 5 questions correctly
  for (let q = 0; q < 5; q++) {
    // A: click first option (correct for listen relay)
    await page.evaluate(() => {
      const opts = document.querySelectorAll('.coop-option-card');
      if (opts.length > 0) opts[0].click();
    });
    await wait(300);
    await page.evaluate(() => {
      const btn = document.querySelector('.coop-confirm-btn');
      if (btn) btn.click();
    });
    await wait(600);

    // B: find and click the correct Chinese answer
    // The correct answer is the last option in the B section for listen relay
    await page.evaluate(() => {
      const gs = document.querySelector('#game-screen');
      if (gs) gs.scrollTop = 300;
    });
    await wait(300);

    await page.evaluate(() => {
      const opts = document.querySelectorAll('.coop-option-card');
      // B options start from index 4 (after A's 4 options)
      // Click each one — the correct one depends on the question
      // For listen relay, correct Chinese matches the animal
      const bOpts = [];
      for (let i = 4; i < opts.length; i++) {
        const t = opts[i].textContent.trim();
        if (t) bOpts.push({ el: opts[i], text: t });
      }
      // The audio word matches: bear=熊, horse=马, bird=鸟, panda=熊猫, rabbit=兔子
      // Try clicking what seems correct based on position
      if (bOpts.length > 0) {
        // Find the matching Chinese for the displayed word
        const wordEl = document.querySelector('[class*="result"], [style*="font-size: 2"]');
        const word = wordEl ? wordEl.textContent.replace(/[^a-zA-Z]/g, '').toLowerCase() : '';
        const map = { bear: '熊', horse: '马', bird: '鸟', panda: '熊猫', rabbit: '兔子' };
        const target = map[word] || '';
        let clicked = false;
        for (const bo of bOpts) {
          if (bo.text === target) { bo.el.click(); clicked = true; break; }
        }
        if (!clicked && bOpts.length > 0) bOpts[bOpts.length - 1].el.click();
      }
    });
    await wait(300);

    await page.evaluate(() => {
      const btns = document.querySelectorAll('.coop-confirm-btn');
      if (btns.length > 0) btns[btns.length - 1].click();
    });
    await wait(1500);

    // Check for combo
    const hasCombo = await page.evaluate(() => {
      const combo = document.querySelector('#combo-indicator, .combo-indicator');
      return combo ? true : false;
    });
    if (hasCombo && q >= 1) {
      await page.screenshot({ path: path.join(OUT, 'fig2_combo.png') });
      console.log('4. combo captured at q=' + q);
    }

    // Check if we got scaffold (wrong answer) — click retry if so
    const needRetry = await page.evaluate(() => document.body.innerText.includes('再来一次'));
    if (needRetry) {
      console.log('  q=' + q + ' got scaffold, retrying...');
      await clickText(page, '再来一次');
      await wait(1500);
      q--; // retry this question
      continue;
    }

    console.log('  q=' + q + ' done');
  }

  // Should now be at finish screen
  await wait(1000);
  await page.screenshot({ path: path.join(OUT, 'fig2_finish_stars.png') });
  console.log('5. finish/stars screen');

  // =============================================
  // 5. SCENARIO (PROBLEM) SCREEN
  // =============================================
  // Navigate to Station 4 scenario — need to complete stations 1-3 first
  // For now, let's try to trigger it programmatically
  await page.evaluate(() => {
    if (typeof showScenarioScreen === 'function') {
      const scenario = {
        title: '动物园冒险',
        text: '你和同学来到了动物园，一起来认识这些动物吧！',
        img: 'assets/images/bear.png',
        bgColor: '#e3f7e8'
      };
      showScenarioScreen(scenario);
    }
  });
  await wait(1000);
  let hasScenario = await page.evaluate(() => {
    const el = document.getElementById('scenario-screen');
    return el && el.classList.contains('active');
  });
  if (hasScenario) {
    await page.screenshot({ path: path.join(OUT, 'fig2_scenario.png') });
    console.log('6. scenario/problem screen');
  } else {
    console.log('6. scenario screen not available, skipping');
  }

  // =============================================
  // 6. PROJECT/POSTER SCREEN
  // =============================================
  await page.evaluate(() => {
    if (typeof showProjectScreen === 'function') {
      showProjectScreen();
    } else {
      // Try direct navigation
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      const ps = document.getElementById('project-screen');
      if (ps) ps.classList.add('active');
    }
  });
  await wait(1000);
  let hasProject = await page.evaluate(() => {
    const el = document.getElementById('project-screen');
    return el && el.classList.contains('active');
  });
  if (hasProject) {
    await page.screenshot({ path: path.join(OUT, 'fig2_project.png') });
    console.log('7. project/poster screen');
  } else {
    console.log('7. project screen not available, skipping');
  }

  // =============================================
  // 7. MODULE SELECT — for showing 单元海报 entry
  // =============================================
  // Go back to module select to show the poster module entry
  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
  await wait(500);
  await page.evaluate(() => document.getElementById('welcome-start-btn').click());
  await wait(800);
  await page.evaluate(() => {
    const c = document.querySelectorAll('.student-card');
    c[0].click(); c[1].click();
  });
  await wait(300);
  await page.evaluate(() => document.querySelector('.start-btn').click());
  await wait(800);
  // Module screen with 单元海报 visible
  await page.screenshot({ path: path.join(OUT, 'fig2_module_with_poster.png') });
  console.log('8. module screen (showing poster entry)');

  await browser.close();
  console.log('\nDone! All screenshots saved to', OUT);
}

main().catch(e => { console.error(e); process.exit(1); });

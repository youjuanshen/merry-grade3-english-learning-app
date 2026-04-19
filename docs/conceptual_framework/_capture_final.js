const puppeteer = require('puppeteer-core');
const path = require('path');
const OUT = path.join(__dirname);
const wait = ms => new Promise(r => setTimeout(r, ms));

// Known correct answers for U1L1 listen relay (from data file)
const ANSWERS = [
  { a: 'bear', b: '熊' },
  { a: 'horse', b: '马' },
  { a: 'bird', b: '鸟' },
  { a: 'panda', b: '熊猫' },
  { a: 'rabbit', b: '兔子' }
];

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--proxy-server=direct://']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 414, height: 736, deviceScaleFactor: 2 });

  async function setup() {
    await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
    await page.evaluate(function() { document.getElementById('welcome-start-btn').click(); });
    await wait(800);
    await page.evaluate(function() { var c = document.querySelectorAll('.student-card'); c[0].click(); c[1].click(); });
    await wait(300);
    await page.evaluate(function() { document.querySelector('.start-btn').click(); });
    await wait(800);
  }

  async function enterListening() {
    await page.evaluate(function() { document.querySelectorAll('.module-card')[0].click(); });
    await wait(800);
    await page.evaluate(function() {
      var all = document.querySelectorAll('div, span');
      for (var i = 0; i < all.length; i++) {
        if (all[i].textContent.trim() === 'GO!' && all[i].children.length === 0) { all[i].click(); break; }
      }
    });
    await wait(1000);
    await page.evaluate(function() {
      var all = document.querySelectorAll('button, div');
      for (var i = 0; i < all.length; i++) {
        if (all[i].textContent.indexOf('开始挑战') >= 0 && all[i].children.length <= 1) { all[i].click(); break; }
      }
    });
    await wait(1500);
  }

  function clickA(correctVal) {
    return page.evaluate(function(val) {
      var opts = document.querySelectorAll('.coop-option-card');
      for (var i = 0; i < opts.length; i++) {
        var img = opts[i].querySelector('img');
        var imgName = img ? img.src.replace(/.*\//, '').replace('.png', '') : '';
        if (imgName === val || opts[i].getAttribute('data-value') === val) { opts[i].click(); return 'clicked ' + val; }
      }
      if (opts[0]) opts[0].click();
      return 'fallback click';
    }, correctVal);
  }

  function clickB(correctVal) {
    return page.evaluate(function(val) {
      var opts = document.querySelectorAll('.coop-option-card');
      for (var i = 4; i < opts.length; i++) {
        if (opts[i].textContent.trim() === val) { opts[i].click(); return 'clicked ' + val; }
      }
      return 'not found';
    }, correctVal);
  }

  function confirmA() {
    return page.evaluate(function() {
      var b = document.querySelector('.coop-confirm-btn');
      if (b) b.click();
    });
  }

  function confirmB() {
    return page.evaluate(function() {
      var btns = document.querySelectorAll('.coop-confirm-btn');
      if (btns.length > 0) btns[btns.length - 1].click();
    });
  }

  function scrollToB() {
    return page.evaluate(function() {
      var gs = document.querySelector('#game-screen');
      if (gs) gs.scrollTop = 300;
    });
  }

  function scrollToTop() {
    return page.evaluate(function() {
      var gs = document.querySelector('#game-screen');
      if (gs) gs.scrollTop = 0;
    });
  }

  function clickRetry() {
    return page.evaluate(function() {
      var all = document.querySelectorAll('button, div');
      for (var i = 0; i < all.length; i++) {
        if (all[i].textContent.indexOf('再来一次') >= 0 && all[i].children.length <= 1) { all[i].click(); return true; }
      }
      return false;
    });
  }

  // ============ START ============
  await setup();
  await enterListening();

  // --- 1. A selects correct answer (green border visible) ---
  await clickA(ANSWERS[0].a);
  await wait(500);
  await page.screenshot({ path: path.join(OUT, 'fig2_correct_select.png') });
  console.log('1/7 correct selection (A green border)');

  // Confirm A → show B
  await confirmA();
  await wait(800);
  await scrollToB();
  await wait(300);

  // B correct
  await clickB(ANSWERS[0].b);
  await wait(300);
  await confirmB();
  await wait(1500);

  // --- 2. Correct feedback ---
  await page.screenshot({ path: path.join(OUT, 'fig2_correct_feedback.png') });
  console.log('2/7 correct feedback');

  // --- 3. Wrong answer → scaffold ---
  // Q2: click WRONG A (click a wrong image)
  await scrollToTop();
  await wait(500);
  // Click second option which is wrong for Q2 (horse → should be horse but wrong option)
  await page.evaluate(function() {
    var opts = document.querySelectorAll('.coop-option-card');
    // Click third option (likely wrong for any question)
    if (opts.length >= 3) opts[2].click();
  });
  await wait(300);
  await confirmA();
  await wait(1000);

  // Check if scaffold or B phase
  var hasRetry = await page.evaluate(function() { return document.body.innerText.indexOf('再来一次') >= 0; });
  if (hasRetry) {
    await page.screenshot({ path: path.join(OUT, 'fig2_wrong_feedback.png') });
    console.log('3/7 wrong feedback (scaffold triggered)');
    await clickRetry();
    await wait(1500);
  } else {
    // A was accidentally correct, try wrong B
    await scrollToB();
    await wait(300);
    // Click first B option (probably wrong)
    await page.evaluate(function() {
      var opts = document.querySelectorAll('.coop-option-card');
      if (opts.length >= 5) opts[4].click();
    });
    await wait(300);
    await confirmB();
    await wait(1000);
    await page.screenshot({ path: path.join(OUT, 'fig2_wrong_feedback.png') });
    console.log('3/7 wrong feedback (B wrong)');
    await clickRetry();
    await wait(1500);
  }

  // --- 4. Complete remaining questions for FINISH screen ---
  for (var q = 1; q < 5; q++) {
    var finished = await page.evaluate(function() {
      var fs = document.getElementById('finish-screen');
      return fs && fs.classList.contains('active');
    });
    if (finished) break;

    await scrollToTop();
    await wait(300);

    // Try correct answer
    await clickA(ANSWERS[q].a);
    await wait(300);
    await confirmA();
    await wait(800);

    hasRetry = await page.evaluate(function() { return document.body.innerText.indexOf('再来一次') >= 0; });
    if (hasRetry) { await clickRetry(); await wait(1500); q--; continue; }

    await scrollToB();
    await wait(300);
    await clickB(ANSWERS[q].b);
    await wait(300);
    await confirmB();
    await wait(1500);

    hasRetry = await page.evaluate(function() { return document.body.innerText.indexOf('再来一次') >= 0; });
    if (hasRetry) { await clickRetry(); await wait(1500); q--; continue; }

    console.log('  completed q' + q);
  }

  await wait(2000);
  await page.screenshot({ path: path.join(OUT, 'fig2_finish_stars.png') });
  console.log('4/7 finish/stars');

  // --- 5. PROJECT POSTER ---
  await setup();
  await page.evaluate(function() {
    var cards = document.querySelectorAll('.module-card');
    if (cards.length >= 5) cards[4].click();
  });
  await wait(1500);
  await page.screenshot({ path: path.join(OUT, 'fig2_project_intro.png') });
  console.log('5/7 project intro');

  // Click start building
  await page.evaluate(function() {
    var all = document.querySelectorAll('div, button');
    for (var i = 0; i < all.length; i++) {
      if (all[i].textContent.indexOf('开始建造') >= 0 && all[i].children.length <= 2) { all[i].click(); break; }
    }
  });
  await wait(2000);
  await page.screenshot({ path: path.join(OUT, 'fig2_project_workspace.png') });
  console.log('6/7 project workspace');

  // --- 6. SCENARIO (try to access station 4) ---
  await setup();
  await enterListening();
  // Try to jump to scenario programmatically
  await page.evaluate(function() {
    if (typeof showScenarioScreen === 'function') {
      showScenarioScreen({
        title: '动物园一日游',
        text: '你和同学来到了动物园，听听工作人员怎么介绍这些动物吧！根据听到的信息，做出判断。',
        img: 'assets/images/bear.png',
        bgColor: '#e3f7e8'
      });
    }
  });
  await wait(1500);
  await page.screenshot({ path: path.join(OUT, 'fig2_scenario.png') });
  console.log('7/7 scenario');

  await browser.close();
  console.log('\nAll done!');
}

main().catch(function(e) { console.error(e); process.exit(1); });

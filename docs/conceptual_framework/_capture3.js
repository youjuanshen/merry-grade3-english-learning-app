const puppeteer = require('puppeteer-core');
const path = require('path');
const OUT = path.join(__dirname);
const wait = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--proxy-server=direct://']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 414, height: 736, deviceScaleFactor: 2 });

  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
  await page.evaluate(() => document.getElementById('welcome-start-btn').click());
  await wait(800);
  await page.evaluate(() => { const c = document.querySelectorAll('.student-card'); c[0].click(); c[1].click(); });
  await wait(300);
  await page.evaluate(() => document.querySelector('.start-btn').click());
  await wait(800);

  // 1. Project screen (单元海报)
  await page.evaluate(() => document.querySelectorAll('.module-card')[4].click());
  await wait(1000);
  await page.screenshot({ path: path.join(OUT, 'fig2_project.png') });
  console.log('1. project');

  // 2. Back to modules, enter listening, complete station to get finish screen
  await page.evaluate(() => {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('module-screen').classList.add('active');
  });
  await wait(500);
  await page.evaluate(() => document.querySelectorAll('.module-card')[0].click());
  await wait(800);
  await page.evaluate(() => {
    const all = document.querySelectorAll('div, span');
    for (const el of all) { if (el.textContent.trim() === 'GO!' && el.children.length === 0) { el.click(); break; } }
  });
  await wait(1000);
  await page.evaluate(() => {
    const all = document.querySelectorAll('button, div');
    for (const el of all) { if (el.textContent.includes('开始挑战') && el.children.length <= 1) { el.click(); break; } }
  });
  await wait(1500);

  // Answer 5 questions — use the correct answer data from the page
  for (let q = 0; q < 5; q++) {
    // A: click first option
    await page.evaluate(() => {
      const opts = document.querySelectorAll('.coop-option-card');
      if (opts.length > 0) opts[0].click();
    });
    await wait(300);
    await page.evaluate(() => { const b = document.querySelector('.coop-confirm-btn'); if(b) b.click(); });
    await wait(800);

    // Check if scaffold triggered (wrong answer)
    const needsRetry = await page.evaluate(() => document.body.innerText.includes('再来一次'));
    if (needsRetry) {
      // Click retry, then try again with evaluate to find correct answer
      await page.evaluate(() => {
        const all = document.querySelectorAll('button, div');
        for (const el of all) { if (el.textContent.includes('再来一次') && el.children.length <= 1) { el.click(); break; } }
      });
      await wait(1500);
      q--;
      continue;
    }

    // Scroll to B and find the correct answer
    await page.evaluate(() => {
      const gs = document.querySelector('#game-screen');
      if (gs) gs.scrollTop = 300;
    });
    await wait(300);

    // B: try to find the correct Chinese word
    await page.evaluate(() => {
      const opts = document.querySelectorAll('.coop-option-card');
      // Get the displayed English word
      const wordEls = document.querySelectorAll('[style*="letter-spacing"]');
      let word = '';
      for (const w of wordEls) {
        const t = w.textContent.replace(/[^a-zA-Z]/g, '').toLowerCase();
        if (t) { word = t; break; }
      }
      // Also try from the result display
      if (!word) {
        const resultEls = document.querySelectorAll('[class*="result"]');
        for (const r of resultEls) {
          const t = r.textContent.replace(/[^a-zA-Z]/g, '').toLowerCase();
          if (t) { word = t; break; }
        }
      }

      const map = { bear:'熊', horse:'马', bird:'鸟', panda:'熊猫', rabbit:'兔子',
                     duck:'鸭', cat:'猫', dog:'狗', fish:'鱼', pig:'猪' };
      const target = map[word] || '';

      let clicked = false;
      for (let i = 4; i < opts.length; i++) {
        if (opts[i].textContent.trim() === target) {
          opts[i].click();
          clicked = true;
          break;
        }
      }
      // Fallback: click each B option until we find one
      if (!clicked) {
        for (let i = 4; i < opts.length; i++) {
          if (opts[i].textContent.trim()) { opts[i].click(); break; }
        }
      }
      window.__bWord = word + '→' + target + ' clicked=' + clicked;
    });
    await wait(300);

    await page.evaluate(() => {
      const btns = document.querySelectorAll('.coop-confirm-btn');
      if (btns.length > 0) btns[btns.length - 1].click();
    });
    await wait(1500);

    // Check scaffold again
    const retry2 = await page.evaluate(() => document.body.innerText.includes('再来一次'));
    if (retry2) {
      await page.evaluate(() => {
        const all = document.querySelectorAll('button, div');
        for (const el of all) { if (el.textContent.includes('再来一次') && el.children.length <= 1) { el.click(); break; } }
      });
      await wait(1500);
      q--;
      continue;
    }
    console.log('  q' + q + ' done');
  }

  await wait(1500);
  // 3. Finish/stars screen
  await page.screenshot({ path: path.join(OUT, 'fig2_finish.png') });
  console.log('2. finish screen');

  // 4. Scenario screen - trigger programmatically
  await page.evaluate(() => {
    if (typeof showScenarioScreen === 'function') {
      showScenarioScreen({
        title: '动物园冒险',
        text: '你和同学来到了动物园，听听工作人员怎么介绍这些动物吧！',
        img: 'assets/images/bear.png',
        bgColor: '#e3f7e8'
      });
    }
  });
  await wait(1000);
  await page.screenshot({ path: path.join(OUT, 'fig2_scenario.png') });
  console.log('3. scenario');

  await browser.close();
  console.log('Done!');
}
main().catch(e => { console.error(e); process.exit(1); });

/**
 * Capture screenshots for Figure 2
 */
const puppeteer = require('puppeteer-core');
const path = require('path');
const OUT = path.join(__dirname);
const W = 414, H = 736;

const wait = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--proxy-server=direct://']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 2 });

  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });

  // 1. Welcome → pair select
  await page.evaluate(() => document.getElementById('welcome-start-btn').click());
  await wait(800);

  // Select two students
  await page.evaluate(() => {
    const c = document.querySelectorAll('.student-card');
    c[0].click(); c[1].click();
  });
  await wait(300);
  await page.screenshot({ path: path.join(OUT, 'fig2_phase1_setup.png') });
  console.log('1/6 pair select');

  // 2. Start → module select
  await page.evaluate(() => document.querySelector('.start-btn').click());
  await wait(800);
  await page.screenshot({ path: path.join(OUT, 'fig2_phase2_module.png') });
  console.log('2/6 module select');

  // 3. Listening → adventure map
  await page.evaluate(() => document.querySelectorAll('.module-card')[0].click());
  await wait(800);
  await page.screenshot({ path: path.join(OUT, 'fig2_phase2_map.png') });
  console.log('3/6 adventure map');

  // 4. GO → station intro → start challenge
  await page.evaluate(() => {
    const all = document.querySelectorAll('div, span');
    for (const el of all) {
      if (el.textContent.trim() === 'GO!' && el.children.length === 0) { el.click(); break; }
    }
  });
  await wait(1000);
  await page.evaluate(() => {
    const all = document.querySelectorAll('button, div');
    for (const el of all) {
      if (el.textContent.includes('开始挑战') && el.children.length <= 1) { el.click(); break; }
    }
  });
  await wait(1500);

  // Student A screen
  await page.screenshot({ path: path.join(OUT, 'fig2_phase3_studentA.png') });
  console.log('4/6 student A');

  // 5. Click bear → confirm → Student B
  await page.evaluate(() => document.querySelectorAll('.coop-option-card')[0].click());
  await wait(300);
  await page.evaluate(() => document.querySelector('.coop-confirm-btn').click());
  await wait(600);

  // Scroll to B zone
  await page.evaluate(() => {
    const gs = document.querySelector('#game-screen');
    if (gs) gs.scrollTop = 200;
  });
  await wait(300);
  await page.screenshot({ path: path.join(OUT, 'fig2_phase3_studentB.png') });
  console.log('5/6 student B');

  // 6. Wrong answer → scaffold
  await page.evaluate(() => {
    const opts = document.querySelectorAll('.coop-option-card');
    for (const o of opts) {
      if (o.textContent.trim() === '熊猫') { o.click(); break; }
    }
  });
  await wait(300);
  await page.evaluate(() => {
    const btns = document.querySelectorAll('.coop-confirm-btn');
    btns[btns.length - 1].click();
  });
  await wait(1000);
  await page.screenshot({ path: path.join(OUT, 'fig2_phase4_scaffold.png') });
  console.log('6/6 scaffold');

  await browser.close();
  console.log('Done!');
}

main().catch(e => { console.error(e); process.exit(1); });

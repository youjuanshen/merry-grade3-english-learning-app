const puppeteer = require('../../node_modules/puppeteer-core');
const path = require('path');

const BASE = path.resolve(__dirname);
const FILE_URL = 'file://' + BASE + '/fig2_gen_illustrations.html';

const SHOTS = [
  { selector: '#sc-shared-outcome', file: 'fig2_sc_shared_outcome.png' },
  { selector: '#clt-germane',       file: 'fig2_clt_germane.png' },
  { selector: '#clt-load-adjust',   file: 'fig2_clt_load_adjust.png' },
];

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 1200, deviceScaleFactor: 2 });
  await page.goto(FILE_URL, { waitUntil: 'networkidle0' });

  for (const { selector, file } of SHOTS) {
    const el = await page.$(selector);
    if (!el) { console.error('NOT FOUND:', selector); continue; }
    await el.screenshot({ path: path.join(BASE, file) });
    console.log('Saved:', file);
  }

  await browser.close();
  console.log('Done.');
})();

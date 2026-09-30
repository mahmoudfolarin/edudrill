const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request =>
    console.log('REQUEST FAILED:', request.url(), request.failure().errorText)
  );

  console.log('Navigating to dashboard...');
  await page.goto('http://localhost:5173/dashboard/jamb/practice', { waitUntil: 'networkidle0' });
  
  console.log('Selecting biology...');
  await page.evaluate(() => {
    // Find biology button and click it
    const buttons = Array.from(document.querySelectorAll('button'));
    const biologyBtn = buttons.find(b => b.textContent.includes('Biology'));
    if (biologyBtn) biologyBtn.click();
  });
  
  await new Promise(r => setTimeout(r, 1000));
  
  console.log('Selecting chemistry...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const chemBtn = buttons.find(b => b.textContent.includes('Chemistry'));
    if (chemBtn) chemBtn.click();
  });

  await new Promise(r => setTimeout(r, 1000));

  console.log('Selecting physics...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const physBtn = buttons.find(b => b.textContent.includes('Physics'));
    if (physBtn) physBtn.click();
  });

  await new Promise(r => setTimeout(r, 1000));

  console.log('Clicking Start Practice...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const startBtn = buttons.find(b => b.textContent.includes('Start Practice'));
    if (startBtn) startBtn.click();
  });

  await new Promise(r => setTimeout(r, 3000));

  console.log('Done waiting. Check output above for errors.');
  await browser.close();
})();

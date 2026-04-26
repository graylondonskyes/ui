#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const args = process.argv.slice(2);
const url = args.includes('--url') ? args[args.indexOf('--url') + 1] : process.env.KAIXU_SMOKE_URL;
if (!url) {
  console.error('☐ Missing URL. Use: node scripts/kaixu-uiux-browser-smoke.mjs --url http://localhost:3000');
  process.exit(2);
}

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('☐ Playwright package not installed. Run: npm i -D playwright && npx playwright install chromium');
  process.exit(2);
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
const consoleErrors = [];
page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
page.on('pageerror', (err) => consoleErrors.push(err.message));

const result = { name: 'kaixu-uiux-browser-smoke-v4', url, timestamp: new Date().toISOString(), checks: {}, details: {} };
try {
  const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  result.checks.page_loaded = !!response && response.ok();
  result.details.status = response?.status();
  result.details.title = await page.title();
  result.details.buttons = await page.locator('button').count();
  result.details.links = await page.locator('a').count();
  result.details.forms = await page.locator('form').count();
  result.checks.body_visible = await page.locator('body').isVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(350);
  result.checks.mobile_body_visible = !!(await page.locator('body').boundingBox());
  result.details.consoleErrors = consoleErrors.slice(0, 20);
  result.checks.no_fatal_console_errors = consoleErrors.length === 0;
} catch (err) {
  result.error = err.message;
} finally {
  await browser.close();
}

result.passed = Object.values(result.checks).length > 0 && Object.values(result.checks).every(Boolean);
fs.writeFileSync(path.join(root, 'KAIXU_UIUX_BROWSER_SMOKE.json'), JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
process.exit(result.passed ? 0 : 1);

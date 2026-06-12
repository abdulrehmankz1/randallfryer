const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE = 'http://localhost:3001';
const OUT = 'C:/Users/General/Documents/GitHub/capitalwatch/campaign/navbar-qa';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: 'mobile-320', w: 320, h: 700 },
  { name: 'mobile-390', w: 390, h: 844 },
  { name: 'mobile-414', w: 414, h: 896 },
  { name: 'tablet-768', w: 768, h: 1024 },
  { name: 'tablet-900', w: 900, h: 1200 },
  { name: 'tablet-1023', w: 1023, h: 1366 },
  { name: 'desktop-1024', w: 1024, h: 800 },
  { name: 'desktop-1280', w: 1280, h: 900 },
  { name: 'desktop-1440', w: 1440, h: 900 },
];

// Pages to verify Platform link removed from all surfaces
const ROUTES_TO_TEST = ['/', '/social-media-posts'];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const errors = [];
  const findings = [];

  for (const v of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: v.w, height: v.h }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    page.on('pageerror', (e) => errors.push(`${v.name}: ${e.message}`));
    page.on('console', (m) => { if (m.type() === 'error') errors.push(`${v.name} CONSOLE: ${m.text()}`); });

    try {
      // ---- 1) NAVBAR at top (transparent) ----
      await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 45000 });
      await page.waitForTimeout(800);

      // Crop just the navbar region
      const headerBox = await page.locator('header').first().boundingBox();
      const cropHeight = Math.max(120, Math.ceil((headerBox?.height || 80) + 8));

      await page.screenshot({
        path: path.join(OUT, `${v.name}-top.png`),
        clip: { x: 0, y: 0, width: v.w, height: cropHeight },
      });

      // ---- 2) NAVBAR scrolled (solid state) ----
      await page.evaluate(() => window.scrollTo(0, 400));
      await page.waitForTimeout(700);
      await page.screenshot({
        path: path.join(OUT, `${v.name}-solid.png`),
        clip: { x: 0, y: 0, width: v.w, height: cropHeight },
      });

      // ---- 3) Check Platform link is GONE from desktop nav ----
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);

      const platformLinksInHeader = await page.locator('header a[href="/platform"]').count();
      if (platformLinksInHeader > 0) {
        findings.push(`${v.name}: ❌ Platform link still present in header (${platformLinksInHeader})`);
      } else {
        findings.push(`${v.name}: ✅ no Platform link in header`);
      }

      // ---- 4) Visibility of hamburger / desktop nav ----
      const hamburgerVisible = await page.locator('header button[aria-label*="menu" i]').first().isVisible().catch(() => false);
      const desktopNavVisible = await page.locator('header nav').first().isVisible().catch(() => false);
      const donateVisible = await page.locator('header a[href="/donate"]').first().isVisible().catch(() => false);

      findings.push(`${v.name}: hamburger=${hamburgerVisible} desktopNav=${desktopNavVisible} donate=${donateVisible}`);

      // ---- 5) Open mobile menu (only if hamburger is visible) ----
      if (hamburgerVisible) {
        await page.locator('header button[aria-label*="menu" i]').first().click();
        await page.waitForTimeout(700);

        await page.screenshot({
          path: path.join(OUT, `${v.name}-menu-open.png`),
          fullPage: false,
        });

        const platformInMenu = await page.locator('[role="dialog"], div.fixed.inset-0').locator('a[href="/platform"]').count();
        if (platformInMenu > 0) {
          findings.push(`${v.name}: ❌ Platform link in mobile menu`);
        } else {
          findings.push(`${v.name}: ✅ no Platform link in mobile menu`);
        }

        // close menu
        await page.locator('header button[aria-label*="menu" i]').first().click();
        await page.waitForTimeout(500);
      }

      // ---- 6) Footer check — scroll to footer, screenshot, verify Platform absent ----
      await page.evaluate(async () => {
        const docH = document.documentElement.scrollHeight;
        const step = window.innerHeight * 0.7;
        for (let y = 0; y < docH + window.innerHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 200));
        }
      });
      await page.waitForTimeout(800);

      const footerHandle = page.locator('footer').first();
      const fb = await footerHandle.boundingBox();
      if (fb) {
        await footerHandle.scrollIntoViewIfNeeded();
        await page.waitForTimeout(400);
        await page.screenshot({
          path: path.join(OUT, `${v.name}-footer.png`),
          clip: { x: 0, y: Math.max(0, Math.floor((await footerHandle.boundingBox()).y)), width: v.w, height: Math.min(900, Math.ceil(fb.height)) },
        });
      }

      const platformInFooter = await page.locator('footer a[href="/platform"]').count();
      if (platformInFooter > 0) {
        findings.push(`${v.name}: ❌ Platform link in footer`);
      } else {
        findings.push(`${v.name}: ✅ no Platform link in footer`);
      }

      console.log(`OK  ${v.name}`);
    } catch (e) {
      errors.push(`${v.name} NAV: ${e.message}`);
      console.log(`ERR ${v.name}: ${e.message}`);
    } finally {
      await ctx.close();
    }
  }

  console.log('\n=== FINDINGS ===');
  findings.forEach((f) => console.log(' ', f));

  console.log('\n=== ERRORS ===');
  if (errors.length === 0) console.log('  none');
  else errors.forEach((e) => console.log('  ', e));

  await browser.close();
})();


const { chromium, firefox, webkit, devices } = require('playwright');
const helpers = require('./lib/helpers');

// Extra headers from environment variables (if configured)
const __extraHeaders = helpers.getExtraHeadersFromEnv();

/**
 * Utility to merge environment headers into context options.
 * Use when creating contexts with raw Playwright API instead of helpers.createContext().
 * @param {Object} options - Context options
 * @returns {Object} Options with extraHTTPHeaders merged in
 */
function getContextOptionsWithHeaders(options = {}) {
  if (!__extraHeaders) return options;
  return {
    ...options,
    extraHTTPHeaders: {
      ...__extraHeaders,
      ...(options.extraHTTPHeaders || {})
    }
  };
}

(async () => {
  try {
    
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 780 } });
await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
await page.evaluate(() => localStorage.setItem('rf-cookie-consent','essential'));
await page.reload({ waitUntil: 'domcontentloaded' });
await page.evaluate(async () => { await new Promise(r => { let y=0; const t=setInterval(()=>{window.scrollBy(0,400);y+=400;if(y>document.body.scrollHeight){clearInterval(t);r();}},40);}); });
await page.waitForTimeout(1500);
const out = await page.evaluate(() => {
  const h=document.querySelector('#events h2'); if(!h) return 'none';
  const cs=getComputedStyle(h);
  return 'DISPLAY='+cs.display+' ML='+cs.marginLeft+' TI='+cs.textIndent+' ALIGN='+cs.textAlign+' WIDTH='+cs.width+'\nHTML='+h.outerHTML.slice(0,380);
});
console.log(out);
await browser.close();

  } catch (error) {
    console.error('❌ Automation error:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
})();

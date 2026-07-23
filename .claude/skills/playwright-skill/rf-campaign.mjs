import { chromium } from "playwright-core";
const OUT = process.env.TEMP + "/";
const b = await chromium.launch();
const page = await b.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1.5 }).then(c=>c.newPage());
await page.goto("http://localhost:3210/about", { waitUntil: "load" });
await page.waitForTimeout(1200);
const maxY = await page.evaluate(()=>document.body.scrollHeight);
for (let y=0;y<=maxY;y+=350){ await page.evaluate((yy)=>scrollTo(0,yy),y); await page.waitForTimeout(60);}
await page.evaluate(() => { const el=[...document.querySelectorAll("section")].find(s=>/The campaign/i.test(s.textContent)&&/built by listening/i.test(s.textContent)); if(el) el.scrollIntoView({block:"center"}); });
await page.waitForTimeout(900);
await page.screenshot({ path: OUT + "campaign3.png" });
// also report the rendered image natural + display size
const info = await page.evaluate(() => { const img=[...document.querySelectorAll("img")].find(i=>/campaign/i.test(i.src)); if(!img) return null; return {src:img.currentSrc||img.src, natW:img.naturalWidth, natH:img.naturalHeight, dispW:Math.round(img.getBoundingClientRect().width), dispH:Math.round(img.getBoundingClientRect().height)}; });
console.log(JSON.stringify(info));
await b.close();

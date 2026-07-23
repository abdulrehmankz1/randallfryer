import { webkit, chromium, devices } from "playwright-core";
const OUT = process.env.TEMP + "/";
async function shot(name, bt){
  const b = await bt.launch();
  const page = await b.newContext({ ...devices["iPhone 13"] }).then(c=>c.newPage());
  await page.goto("http://localhost:3210/", { waitUntil: "load" });
  await page.waitForTimeout(1500);
  await page.evaluate(() => { const el=[...document.querySelectorAll("section")].find(s=>/On the ballot/i.test(s.textContent)&&/is on the ballot/i.test(s.textContent)); if(el) el.scrollIntoView({block:"start"}); });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: OUT + `ballot-${name}.png` });
  // dump any element whose text is exactly ELECTION-ish overlapping
  const ghosts = await page.evaluate(() => {
    const out=[];
    document.querySelectorAll("*").forEach(el=>{
      if(el.children.length===0){ const t=el.textContent.trim(); if(/^ELECTION/i.test(t) && t.length<20){ const r=el.getBoundingClientRect(); out.push({t, cls:(el.className||"").toString().slice(0,60), x:Math.round(r.left),y:Math.round(r.top)});}}
    });
    return out;
  });
  console.log(name, JSON.stringify(ghosts));
  await b.close();
}
await shot("webkit", webkit);
await shot("chromium", chromium);

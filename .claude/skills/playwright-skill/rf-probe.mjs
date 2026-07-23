import { chromium, devices } from "playwright-core";
const b = await chromium.launch();
const page = await b.newContext({ ...devices["iPhone 13"] }).then(c=>c.newPage());
await page.goto("http://localhost:3210/", { waitUntil: "load" });
await page.waitForTimeout(1500);
await page.evaluate(() => { const el=[...document.querySelectorAll("section")].find(s=>/is on the ballot/i.test(s.textContent)); if(el) el.scrollIntoView({block:"start"}); });
await page.waitForTimeout(2000);
const res = await page.evaluate(() => {
  const hits = [];
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
  let n;
  while ((n = walk.nextNode())) {
    const own = Array.from(n.childNodes).filter(c=>c.nodeType===3).map(c=>c.textContent).join("").trim();
    if (/ELECTION/i.test(own) && own.length < 30) {
      const r = n.getBoundingClientRect();
      const cs = getComputedStyle(n);
      hits.push({ tag:n.tagName, own, cls:(n.className||"").toString().slice(0,70),
        x:Math.round(r.left), y:Math.round(r.top), w:Math.round(r.width),
        pos:cs.position, transform:cs.transform.slice(0,30), opacity:cs.opacity });
    }
    // pseudo content
    for (const pe of ["::before","::after"]) {
      const c = getComputedStyle(n, pe).content;
      if (c && /ELECTION/i.test(c)) hits.push({ tag:n.tagName+pe, content:c, cls:(n.className||"").toString().slice(0,60) });
    }
  }
  return hits;
});
console.log(JSON.stringify(res, null, 2));
await b.close();

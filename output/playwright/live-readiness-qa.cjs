const { chromium } = require('playwright');

const BASE = 'https://www.energievergleich.shop';
const mobileViewports = [
  { width: 360, height: 800, label: '360x800' },
  { width: 390, height: 844, label: '390x844' },
  { width: 412, height: 915, label: '412x915' },
  { width: 768, height: 1024, label: '768x1024' },
];
const routes = ['/', '/stromvergleich-nrw', '/impressum', '/gasvergleich-nrw', '/kontakt'];

async function evaluatePage(page, route, viewport) {
  const url = `${BASE}${route}`;
  const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(1200);

  const metrics = await page.evaluate(() => {
    const getText = () => document.body?.innerText || '';
    const text = getText();

    const header = document.querySelector('header');
    const firstH1 = document.querySelector('h1');
    let headerOverlap = false;
    let h1Visible = false;

    if (firstH1) {
      const h1Rect = firstH1.getBoundingClientRect();
      h1Visible = h1Rect.bottom > 0 && h1Rect.top < window.innerHeight;
      if (header) {
        const headerRect = header.getBoundingClientRect();
        headerOverlap = h1Rect.top < headerRect.bottom - 2;
      }
    }

    const navLinks = Array.from(document.querySelectorAll('header nav a'));
    const navWrapping = navLinks.some((a) => {
      const style = window.getComputedStyle(a);
      const lh = parseFloat(style.lineHeight) || 16;
      return a.scrollHeight > lh * 1.4;
    });

    const activeLinks = navLinks.filter((a) => {
      const cls = a.className || '';
      return /text-primary|bg-primary\/5|border-b-2/.test(cls) || a.getAttribute('aria-current') === 'page';
    });

    const activeUnreadable = activeLinks.some((a) => {
      const before = window.getComputedStyle(a, '::before');
      const after = window.getComputedStyle(a, '::after');
      const beforeVisible = before && before.content && before.content !== 'none' && before.display !== 'none' && parseFloat(before.opacity || '1') > 0;
      const afterVisible = after && after.content && after.content !== 'none' && after.display !== 'none' && parseFloat(after.opacity || '1') > 0;
      return beforeVisible || afterVisible;
    });

    const ctaKeywords = ['Jetzt vergleichen', 'Kostenlos vergleichen', 'Beispieltarife anzeigen', 'Kontakt aufnehmen'];
    const interactive = Array.from(document.querySelectorAll('a,button,input[type="submit"]'));
    const ctaVisible = interactive.some((el) => {
      const label = (el.innerText || el.getAttribute('aria-label') || '').trim();
      if (!ctaKeywords.some((k) => label.includes(k))) return false;
      const rect = el.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    });

    const hasFormOrCalculator = Boolean(document.querySelector('form')) || document.querySelectorAll('input,select,textarea').length >= 2;
    const overflow = document.documentElement.scrollWidth > window.innerWidth + 2;

    const oldPlaceholder = /info@energievergleich\.shop|Musterstraße|Geschäftsstelle\s*\/\s*Deutschland|Energievergleich\.shop als verantwortliche Person/i.test(text);
    const realContact = /support@energievergleich\.nrw|59302 Oelde|P\. Kohmann|A\. Danos/i.test(text);
    const wrongDownloadDomain = /energievergleich\.nrw(?!\b)/i.test(text) || /https?:\/\/[^\s"']*energievergleich\.nrw/i.test(document.documentElement.outerHTML);

    return {
      h1Visible,
      headerOverlap,
      navWrapping,
      activeUnreadable,
      ctaVisible,
      hasFormOrCalculator,
      overflow,
      oldPlaceholder,
      realContact,
      wrongDownloadDomain,
    };
  });

  return {
    route,
    viewport,
    status: response ? response.status() : null,
    ...metrics,
  };
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const vp of mobileViewports) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();

    for (const route of routes) {
      results.push(await evaluatePage(page, route, vp.label));
    }

    await context.close();
  }

  const desktopContext = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const desktopPage = await desktopContext.newPage();
  const desktopImpressum = await evaluatePage(desktopPage, '/impressum', '1366x900');
  const desktopStrom = await evaluatePage(desktopPage, '/stromvergleich-nrw', '1366x900');
  await desktopContext.close();
  await browser.close();

  const summary = {
    totalChecks: results.length + 2,
    non200: [...results, desktopImpressum, desktopStrom].filter((r) => r.status !== 200).length,
    headerOverlap: [...results, desktopImpressum, desktopStrom].filter((r) => r.headerOverlap).length,
    navWrapping: [...results, desktopImpressum, desktopStrom].filter((r) => r.navWrapping).length,
    activeUnreadable: [...results, desktopImpressum, desktopStrom].filter((r) => r.activeUnreadable).length,
    h1NotVisible: [...results, desktopImpressum, desktopStrom].filter((r) => !r.h1Visible).length,
    ctaNotVisible: [...results, desktopImpressum, desktopStrom].filter((r) => !r.ctaVisible && ['/', '/stromvergleich-nrw', '/gasvergleich-nrw', '/kontakt'].includes(r.route)).length,
    noFormOrCalculator: [...results, desktopImpressum, desktopStrom].filter((r) => !r.hasFormOrCalculator && ['/stromvergleich-nrw', '/gasvergleich-nrw', '/kontakt', '/'].includes(r.route)).length,
    overflow: [...results, desktopImpressum, desktopStrom].filter((r) => r.overflow).length,
    oldPlaceholder: [...results, desktopImpressum, desktopStrom].filter((r) => r.oldPlaceholder).length,
    wrongDownloadDomain: [...results, desktopImpressum, desktopStrom].filter((r) => r.wrongDownloadDomain).length,
    realContactSeen: [...results, desktopImpressum, desktopStrom].filter((r) => r.realContact).length,
  };

  const output = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE,
    summary,
    results,
    desktopChecks: [desktopImpressum, desktopStrom],
  };

  const fs = require('fs');
  const outPath = '/Users/joelcherinodiaz/.codex/worktrees/d9a9/energievergleichnrw/output/playwright/live-readiness-qa.json';
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log(JSON.stringify({ outPath, summary }, null, 2));
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

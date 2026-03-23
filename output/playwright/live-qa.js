const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const base = 'https://www.energievergleich.shop';
const viewports = [
  { name: '360x800', width: 360, height: 800 },
  { name: '390x844', width: 390, height: 844 },
  { name: '412x915', width: 412, height: 915 },
  { name: '768x1024', width: 768, height: 1024 },
];
const pages = ['/', '/stromvergleich-nrw', '/impressum', '/gasvergleich-nrw', '/kontakt'];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      userAgent:
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    });
    const page = await context.newPage();

    for (const route of pages) {
      const url = `${base}${route}`;
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(700);

      const evalResult = await page.evaluate(() => {
        const docEl = document.documentElement;
        const body = document.body;
        const bodyText = body?.innerText || '';
        const htmlText = docEl?.outerHTML || '';

        const header = document.querySelector('header');
        const h1 = document.querySelector('h1');
        const footer = document.querySelector('footer');

        const rect = (el) => {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { top: r.top, bottom: r.bottom, width: r.width, height: r.height };
        };

        const headerRect = rect(header);
        const h1Rect = rect(h1);

        const headerOverlap = Boolean(
          headerRect &&
            h1Rect &&
            h1Rect.height > 0 &&
            headerRect.bottom > h1Rect.top + 6 &&
            h1Rect.top < window.innerHeight
        );

        const h1Visible = Boolean(
          h1Rect && h1Rect.bottom > 0 && h1Rect.top < window.innerHeight && h1Rect.height > 0
        );

        const ctaTexts = [
          'jetzt vergleichen',
          'angebot anfordern',
          'kontakt aufnehmen',
          'anfrage',
          'beispieltarife anzeigen',
        ];
        const ctaVisible = Array.from(document.querySelectorAll('a,button')).some((el) => {
          const text = (el.textContent || '').trim().toLowerCase();
          if (!ctaTexts.some((t) => text.includes(t))) return false;
          const r = el.getBoundingClientRect();
          return r.width > 20 && r.height > 20 && r.bottom > 0 && r.top < window.innerHeight;
        });

        const formVisible = Array.from(document.querySelectorAll('input, select, textarea')).some((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 40 && r.height > 20 && r.bottom > 0 && r.top < window.innerHeight;
        });

        const navLinks = Array.from(document.querySelectorAll('header nav a')).filter((a) => {
          const r = a.getBoundingClientRect();
          return r.width > 20 && r.height > 10;
        });

        let navWrapping = false;
        for (const a of navLinks) {
          const cs = window.getComputedStyle(a);
          const lh = parseFloat(cs.lineHeight);
          const h = a.getBoundingClientRect().height;
          if (Number.isFinite(lh) && lh > 0 && h > lh * 1.6) {
            navWrapping = true;
            break;
          }
        }

        const activeCandidates = navLinks.filter((a) => {
          const cls = a.className || '';
          const ariaCurrent = a.getAttribute('aria-current');
          return ariaCurrent === 'page' || /active|current|selected/i.test(cls);
        });

        const activeReadable = activeCandidates.every((a) => {
          const cs = window.getComputedStyle(a);
          const opacity = parseFloat(cs.opacity || '1');
          return cs.color !== 'rgba(0, 0, 0, 0)' && opacity > 0.2;
        });

        const horizontalOverflow = Boolean(docEl && docEl.scrollWidth > window.innerWidth + 4);

        const footerText = footer?.innerText || '';
        const footerContactOk =
          footerText.includes('support@energievergleich.nrw') && footerText.includes('59302 Oelde, NRW');

        const oldPlaceholderFound =
          /Musterstraße|info@energievergleich\.shop|Geschäftsstelle\s*\/?\s*Deutschland/i.test(bodyText);
        const wrongDownloadDomainFound =
          /href=["']https?:\/\/(www\.)?energievergleich\.nrw/i.test(htmlText) ||
          /href=["']https?:\/\/energievergleich\.nrw/i.test(htmlText);

        const badClaims = [
          'wir kümmern uns um den wechsel',
          'wir übernehmen den papierkram',
          'alle verfügbaren tarife',
          'alle anbieter in nrw',
          'direkte weiterleitung zum anbieter',
          'der wechsel wird von uns komplett übernommen',
        ].filter((claim) => bodyText.toLowerCase().includes(claim));

        return {
          headerOverlap,
          h1Visible,
          ctaVisible,
          formVisible,
          navWrapping,
          activeReadable,
          activeCount: activeCandidates.length,
          horizontalOverflow,
          footerContactOk,
          oldPlaceholderFound,
          wrongDownloadDomainFound,
          badClaims,
        };
      });

      const safeRoute = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-');
      const screenshotPath = path.join(
        '/Users/joelcherinodiaz/.codex/worktrees/d9a9/energievergleichnrw/output/playwright',
        `live-${safeRoute}-${vp.name}.png`
      );
      await page.screenshot({ path: screenshotPath, fullPage: true });

      results.push({
        viewport: vp.name,
        route,
        url,
        status: response?.status() ?? null,
        screenshot: screenshotPath,
        ...evalResult,
      });
    }

    await context.close();
  }

  await browser.close();

  const outFile = '/Users/joelcherinodiaz/.codex/worktrees/d9a9/energievergleichnrw/output/playwright/live-mobile-qa.json';
  fs.writeFileSync(outFile, JSON.stringify(results, null, 2));

  console.log(JSON.stringify({ outFile, checks: results.length }, null, 2));
})();

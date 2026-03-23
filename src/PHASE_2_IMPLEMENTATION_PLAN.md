# PHASE 2 IMPLEMENTATION PLAN - DETAILED CHECKLIST

## ✅ COMPLETED (7 Articles)
1. ✅ StromanbieterwechselnNrwArticle.tsx
2. ✅ GrundversorgungVsSondervertragArticle.tsx  
3. ✅ NeukndenbonusFallenArticle.tsx
4. ✅ PreiserhoeungWasTunArticle.tsx
5. ✅ UmzugStromvertragArticle.tsx
6. ✅ StromtarifVertragslaufzeitArticle.tsx
7. ✅ MaloIdZaehlernummerArticle.tsx
8. ✅ GasanbieterWechselnNrwArticle.tsx
9. ✅ GrundversorgungGasSondervertragArticle.tsx

## ⏳ REMAINING (14 Articles - PRIORITY ORDER)

### GAS (4 remaining):
- [ ] `/ratgeber/gas/gaspreisgarantie-worauf-achten` → GaspreisgarantieWorauffAchtenArticle.tsx
- [ ] `/ratgeber/gas/preiserhoehung-gas-rechte` → PreiserhoeungGasRechteArticle.tsx
- [ ] `/ratgeber/gas/umzug-gasvertrag` → UmzugGasvertragArticle.tsx
- [ ] `/ratgeber/gas/heizungsart-verbrauch-einschaetzen` → HeizungsartVerbrauchArticle.tsx

### GEWERBE (3):
- [ ] `/ratgeber/gewerbe/gewerbestrom-vertrag-worauf-achten` → GewerbestromVertragArticle.tsx
- [ ] `/ratgeber/gewerbe/gewerbegas-beschaffung-tipps` → GewerbegasBeschaffungArticle.tsx
- [ ] `/ratgeber/gewerbe/lastprofil-leistungspreis-arbeitspreis` → LastprofilLeistungspreisArticle.tsx

### PHOTOVOLTAIK (5):
- [ ] `/ratgeber/photovoltaik/pv-kosten-nrw-wovon-abhaengig` → PVKostenNrwArticle.tsx
- [ ] `/ratgeber/photovoltaik/pv-speicher-lohnt-sich` → PVSpeicherArticle.tsx
- [ ] `/ratgeber/photovoltaik/einspeiseverguetung-verstehen` → EinspeiseverguetungArticle.tsx
- [ ] `/ratgeber/photovoltaik/dach-eignung-checkliste` → DachEignungArticle.tsx
- [ ] `/ratgeber/photovoltaik/angebote-vergleichen-fehler` → AngeboteVergleichenArticle.tsx

### WECHSELWISSEN (3):
- [ ] `/ratgeber/wechselwissen/kuendigungsfristen-strom-gas` → KuendigungsfristenArticle.tsx
- [ ] `/ratgeber/wechselwissen/lieferantenwechsel-ablauf` → LieferantenwechselAblaufArticle.tsx
- [ ] `/ratgeber/wechselwissen/was-tun-wenn-wechsel-schiefgeht` → WechselSchiefgehtArticle.tsx

---

## 📋 ARTICLE TEMPLATE CHECKLIST (for each article)

Each article MUST include:
- [ ] **H1 Title** (1x only)
- [ ] **Kurzantwort Box** (3-5 sentences, blue background)
- [ ] **Content** (900-1400 words, people-first, no keyword stuffing)
- [ ] **H2/H3 Structure** (clean hierarchy)
- [ ] **CTA Box** (links to appropriate Money Page)
- [ ] **Internal Links** (2-3 related articles)
- [ ] **FAQs** (3-5 visible in accordion)
- [ ] **JSON-LD FAQPage** (matches FAQs 1:1)
- [ ] **SEOHead** (Title: "[Keyword] | Energievergleich", Meta: 145-160 chars)
- [ ] **Footer Metadata** ("Zuletzt aktualisiert: 09. Januar 2026 | Redaktion Energievergleich")

---

## 🔗 ROUTER.TSX INTEGRATION

Add these routes to `/src/components/Router.tsx`:

```typescript
// GAS ARTICLES
{
  path: "ratgeber/gas/gasanbieter-wechseln-nrw",
  element: <GasanbieterWechselnNrwArticle />,
  routeMetadata: { pageIdentifier: 'ratgeber-gas-gasanbieter-wechseln' },
},
{
  path: "ratgeber/gas/grundversorgung-gas-sondervertrag",
  element: <GrundversorgungGasSondervertragArticle />,
  routeMetadata: { pageIdentifier: 'ratgeber-gas-grundversorgung' },
},
// ... (add all 14 remaining routes)
```

---

## 📊 RATGEBER-MAP.TS STRUCTURE

```typescript
export interface RatgeberArticleMeta {
  slug: string;
  title: string;
  teaser: string;
  readingTime: number;
  targetMoneyPage: 'stromvergleich' | 'gasvergleich' | 'photovoltaik' | 'gewerbestrom' | 'gewerbegas' | 'kontakt';
  relatedUrls: string[];
  category: 'strom' | 'gas' | 'gewerbe' | 'photovoltaik' | 'wechselwissen';
}

export const ratgeberArticles: RatgeberArticleMeta[] = [
  {
    slug: '/ratgeber/strom/stromanbieter-wechseln-nrw',
    title: 'Stromanbieter wechseln in NRW',
    teaser: 'Schritt-für-Schritt Anleitung zum erfolgreichen Stromanbieterwechsel',
    readingTime: 7,
    targetMoneyPage: 'stromvergleich',
    relatedUrls: [
      '/ratgeber/strom/grundversorgung-vs-sondervertrag',
      '/ratgeber/strom/malo-id-zaehlernummer'
    ],
    category: 'strom',
  },
  // ... (add all 23 articles)
];
```

---

## 🌐 CATEGORY PAGE UPDATES

Update these files to display article listings:
- [ ] `/src/components/pages/ratgeber/StromCategoryPage.tsx`
- [ ] `/src/components/pages/ratgeber/GasCategoryPage.tsx`
- [ ] `/src/components/pages/ratgeber/GewerbeCategoryPage.tsx`
- [ ] `/src/components/pages/ratgeber/PhotovoltaikCategoryPage.tsx`
- [ ] `/src/components/pages/ratgeber/WechselwissenCategoryPage.tsx`

Each category page should:
- Display article cards with: Title, Teaser, Reading Time, "Zuletzt aktualisiert"
- Use crawlable links (`<Link>` from react-router-dom)
- Show 5-10 articles per category

---

## 💰 MONEY PAGE INTEGRATION

Add "Passende Ratgeber" module to:
- [ ] `/src/components/pages/StromvergleichNrwPage.tsx`
- [ ] `/src/components/pages/GasvergleichNrwPage.tsx`
- [ ] `/src/components/pages/PhotovoltaikNrwPage.tsx`
- [ ] `/src/components/pages/GewerbestromPage.tsx`
- [ ] `/src/components/pages/GewerbegasPage.tsx`
- [ ] `/src/components/pages/KontaktPage.tsx`

Module requirements:
- Auto-select 3-5 articles based on `targetMoneyPage`
- Position: after main content/CTA, before Footer
- Card format: Title, Teaser, Reading Time (NO images)
- Fallback: curated list if insufficient matches

---

## 🗺️ SITEMAP.XML.TS UPDATE

Ensure `/src/pages/sitemap.xml.ts` includes:
- All 24 article URLs (starting with `https://www.energievergleich.shop/`)
- Only URLs that return HTTP 200
- Canonical URLs only
- No 404s

---

## ✅ VERIFICATION CHECKLIST

Before marking Phase 2 complete:
- [ ] All 24 articles created and deployed
- [ ] Router.tsx updated with all routes
- [ ] ratgeber-map.ts finalized with all articles
- [ ] Category pages display articles correctly
- [ ] Money pages show "Passende Ratgeber" module
- [ ] sitemap.xml.ts updated
- [ ] All URLs return HTTP 200
- [ ] No 404s in sitemap
- [ ] Internal links are crawlable
- [ ] JSON-LD FAQPage schemas are valid
- [ ] SEO metadata is correct (no savings promises)
- [ ] No cookie/consent/tracking changes made

---

## 📝 NOTES

- **Template Reuse:** Use the completed articles as templates for remaining ones
- **Content:** Adapt content to specific topics while maintaining structure
- **SEO:** No percentage/euro/savings promises in titles/descriptions
- **Links:** All internal links must be crawlable (`<Link>` or `<a href>`)
- **Metadata:** Consistent "Zuletzt aktualisiert: 09. Januar 2026 | Redaktion Energievergleich"
- **FAQs:** Exactly match JSON-LD schema with visible FAQs

---

## 🚀 NEXT STEPS

1. Create remaining 14 articles (use template from completed articles)
2. Update Router.tsx with all 24 routes
3. Finalize ratgeber-map.ts
4. Update category pages
5. Add "Passende Ratgeber" module to money pages
6. Update sitemap.xml.ts
7. Test all URLs for HTTP 200
8. Verify internal links are crawlable
9. Validate JSON-LD schemas
10. Final QA check

---

**Status:** Phase 2 - 40% Complete (9/24 articles created)
**Last Updated:** 09. Januar 2026

# Skill: Neue Stadtseite erstellen

## Zweck
Erstelle eine neue SEO-optimierte Stadtseite für den NRW-Energievergleich (z. B. Dortmund, Köln, Düsseldorf).

## Voraussetzungen
- Stadtname auf Deutsch (z. B. `Dortmund`)
- URL-Slug in Kleinbuchstaben, mit Bindestrichen (z. B. `stromvergleich-dortmund`)
- Einwohnerzahl und Postleitzahlen-Bereich (optional, für Meta-Texte)

## Schritte

### 1. Astro-Seite anlegen
Erstelle `src/pages/stromvergleich-[stadtslug].astro`:

```astro
---
import HydratedRoutePage from "@/components/HydratedRoutePage";
import StromvergleichStadtPage from "@/components/pages/StromvergleichStadtPage";
import SeoPageLayout from "@/layouts/SeoPageLayout.astro";

const stadtName = "Dortmund"; // Anpassen
const slug = "stromvergleich-dortmund"; // Anpassen
---

<SeoPageLayout
  title={`Stromvergleich ${stadtName} – Günstige Tarife | energievergleich.shop`}
  description={`Strom vergleichen in ${stadtName}: Jetzt günstige Stromanbieter finden und bis zu 300 € sparen. Kostenlos & unverbindlich.`}
  canonicalPath={`/${slug}`}
  keywords={`Stromvergleich ${stadtName}, Stromanbieter ${stadtName}, günstiger Strom NRW`}
  ogTitle={`Stromvergleich ${stadtName} – Jetzt Strom sparen`}
  ogDescription={`Die besten Stromanbieter in ${stadtName} im Vergleich. Kostenlos wechseln und sparen.`}
>
  <HydratedRoutePage path={Astro.url.pathname} Page={StromvergleichStadtPage} client:load />
</SeoPageLayout>
```

### 2. Route in src/lib/routes.ts ergänzen
Füge den neuen Slug in `ROUTES` ein:

```typescript
stromvergleichDortmund: "/stromvergleich-dortmund",
```

### 3. React-Komponente erstellen (falls stadtspezifisch)
Falls die Seite eigene Inhalte benötigt, erstelle `src/components/pages/StromvergleichDortmundPage.tsx`:

```tsx
import { StromvergleichNrwPage } from "./StromvergleichNrwPage";

// Stadtspezifische Variante – erbt den Vergleichsrechner
export default function StromvergleichDortmundPage() {
  return <StromvergleichNrwPage stadtFilter="Dortmund" />;
}
```

### 4. Schema.org BreadcrumbList einbinden
Jede Stadtseite benötigt strukturierte Daten:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.energievergleich.shop/" },
    { "@type": "ListItem", "position": 2, "name": "Stromvergleich NRW", "item": "https://www.energievergleich.shop/stromvergleich-nrw" },
    { "@type": "ListItem", "position": 3, "name": "Stromvergleich Dortmund", "item": "https://www.energievergleich.shop/stromvergleich-dortmund" }
  ]
}
```

### 5. FAQPage Schema.org ergänzen
Mindestens 3 stadtspezifische FAQ-Einträge:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Wie finde ich den günstigsten Stromanbieter in Dortmund?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nutzen Sie unseren kostenlosen Vergleichsrechner. Geben Sie Ihren Jahresverbrauch ein und vergleichen Sie alle verfügbaren Tarife in Dortmund."
      }
    },
    {
      "@type": "Question",
      "name": "Was ist der Grundversorger in Dortmund?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der Grundversorger in Dortmund ist DEW21. Als Grundversorgungstarif ist dieser häufig teurer als Sonderverträge."
      }
    },
    {
      "@type": "Question",
      "name": "Wie lange dauert ein Anbieterwechsel in Dortmund?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein Anbieterwechsel dauert in der Regel 2–6 Wochen. Die Versorgung wird dabei nicht unterbrochen."
      }
    }
  ]
}
```

### 6. Sitemap aktualisieren
Füge die neue URL in `src/components/pages/SitemapPage.tsx` oder die Sitemap-Konfiguration ein.

### 7. Interne Verlinkung
Verlinke die neue Stadtseite von:
- `src/components/pages/StromvergleichNrwPage.tsx` (Städteübersicht)
- Header/Footer falls relevant

## SEO-Checkliste
- [ ] `<title>` max 60 Zeichen, enthält Stadtname + "Stromvergleich"
- [ ] `<meta description>` max 160 Zeichen, enthält Handlungsaufforderung
- [ ] Canonical Tag gesetzt (`canonicalPath`)
- [ ] BreadcrumbList Schema.org vorhanden
- [ ] FAQPage Schema.org vorhanden (min. 3 Fragen)
- [ ] H1 enthält Stadtname
- [ ] Interne Links zu verwandten Seiten
- [ ] Keine hardcodierten Preise im Seitentext

## Qualitätssicherung
```bash
npm run validate:seo   # SEO-Validierung
npm run build          # Production Build prüfen
npm run test           # Tests ausführen
```

## 📋 Was wurde geändert?

<!-- Kurze Beschreibung der Änderung -->

## ✅ Allgemeine Checklist

- [ ] CI ist grün (`npm run lint` + `npm test`)
- [ ] `npm run validate:release-readiness` ohne Fehler
- [ ] Lighthouse Score nicht verschlechtert
- [ ] DSGVO-relevante Änderungen geprüft
- [ ] Keine Secrets im Code
- [ ] `main` Branch up-to-date

## 🌐 Wix-Kompatibilität

- [ ] Wix-Kompatibilität geprüft (kein Breaking Change in `wix.config.json` oder Routing)
- [ ] Wix Editor nach Änderung getestet (kein Ladespinner / Endlosschleife)
- [ ] Wix Collections / Forms nicht ungewollt verändert

## 🎨 Design & Editor

- [ ] Editor-Verhalten geprüft (Wix Vibe KI Editor öffnet ohne Fehler)
- [ ] Visuelle Darstellung auf Desktop + Mobile geprüft
- [ ] Keine Layout-Brüche durch Tailwind/CSS-Änderungen

## 🔍 SEO-Auswirkungen

- [ ] SEO-Auswirkungen geprüft (`npm run validate:seo` grün)
- [ ] Canonical-URL korrekt (`https://www.energievergleich.shop`)
- [ ] Neue Seiten mit `<title>`, `description`, `og:*` ausgestattet

## ⚡ Stromrechner / Leadflow

- [ ] Stromrechner/Leadflow betroffen? **ja / nein**
- [ ] Falls ja: Tarifberechnung liefert korrekte Ergebnisse
- [ ] Falls ja: Lead-Formular sendet korrekt (Wix Form Collection erreichbar)
- [ ] Falls ja: CTA nach Berechnung sichtbar und funktional

## 🔗 Referenz

<!-- Issue-Nummer, z.B. Closes #42 -->

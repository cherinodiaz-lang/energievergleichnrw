# GTM Migration Checklist (Projekt energievergleich.shop)

Diese Checkliste hilft dir dabei, Tracking sauber zu migrieren und zu testen, ohne Platzhalter-Daten oder Test-Events in der Produktion zu lassen.

## 1) Vorbereitungen
- Zugriff auf Google Tag Manager (Container) und Google Analytics 4 Property sicherstellen.
- Verantwortlichkeiten festlegen: Wer deployed Code, wer prüft Tracking, wer gibt frei.

## 2) Basis-Tracking
- Pageview/Route-Change Tracking prüfen (bei SPA/Client Router: History-Changes als Events berücksichtigen).
- Consent Mode / Cookie-Consent-Integration prüfen (nur wenn genutzt).

## 3) Conversions definieren
- Kontaktformular abgeschickt
- Klick auf Telefon/WhatsApp/E-Mail
- „Vergleich gestartet“ (CTA)

## 4) QA / Debug
- GTM Preview (Tag Assistant) nutzen.
- GA4 DebugView prüfen.
- Testdaten klar kennzeichnen (z. B. über Debug-Parameter oder Test-Property).

## 5) Go-Live
- Tags/Trigger final aktivieren.
- In den ersten 24–72h: Event-Counts, Fehler, 404s und Redirects prüfen.

## 6) Dokumentation
- Änderungen (Container-Version, Release-Datum, Owner) dokumentieren.

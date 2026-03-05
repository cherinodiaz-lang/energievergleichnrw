# Changelog

Alle bemerkenswerten Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/lang/de/).

## [2.0.0] - 2026-03-05

### ✨ Hinzugefügt

#### Performance

- Critical CSS Inlining für sofortiges First Paint
- Lazy Loading Components mit IntersectionObserver
- WebP/AVIF Bildoptimierung
- Resource Hints (Prefetch, Preload, DNS-Prefetch)
- Code Splitting & Tree Shaking
- Service Worker mit Offline-Support

#### Security

- Content Security Policy (CSP)
- Security Headers (HSTS, X-Frame-Options, XSS Protection)
- CORS Configuration
- Input Validation & Sanitization
- Rate Limiting

#### PWA

- Progressive Web App Support
- Web App Manifest
- Install Prompts (Android & iOS)
- Offline-Funktionalität
- Background Sync
- Push Notifications

#### SEO

- Enhanced Structured Data (Organization, Website, FAQ, Breadcrumb)
- Open Graph & Twitter Cards
- Canonical URLs & Robots Meta
- Schema.org vollständig implementiert
- Sitemap Integration

#### Testing & CI/CD

- Vitest + React Testing Library Setup
- GitHub Actions CI/CD Pipeline
- Lighthouse CI Integration
- Automated Testing & Deployment
- Code Coverage Reports

#### Components

- Error Boundary für React Components
- Toast Notification System
- Loading Spinner & Skeleton Components
- PWA Install Prompt
- Network Status Indicator
- Offline Page
- 404 Error Page

#### Utilities

- Custom React Hooks (useDebounce, useLocalStorage, useMediaQuery, etc.)
- Formatting Utilities (PLZ, Phone, Currency, Date)
- Type-safe LocalStorage Wrapper
- String & Number Helpers

#### Developer Experience

- EditorConfig für konsistente Formatierung
- Prettier Configuration
- VS Code Settings & Extensions
- ESLint Auto-Fix on Save
- TypeScript Path Aliases

### 🛠️ Geändert

- Projekt-Struktur komplett überarbeitet
- TypeScript zu 100% typisiert
- Astro auf Version 4.15 aktualisiert
- React auf Version 18.3 aktualisiert
- Tailwind CSS auf Version 3.4 aktualisiert

### 🐛 Behoben

- Performance-Probleme durch Code Splitting gelöst
- Accessibility-Issues behoben
- SEO-Optimierungen implementiert

### 📚 Dokumentation

- Vollständiges README mit allen Features
- Architektur-Dokumentation
- Developer Guide
- Performance Benchmarks
- Deployment-Anleitung

---

## [1.0.0] - 2025-XX-XX

### ✨ Hinzugefügt

- Initiales Release
- Grundlegende Projekt-Struktur
- Erste Version der Website

# ⚡ EnergieVergleich NRW - Premium Energy Comparison Platform

[![CI/CD](https://github.com/cherinodiaz-lang/energievergleichnrw/actions/workflows/ci.yml/badge.svg)](https://github.com/cherinodiaz-lang/energievergleichnrw/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![Astro](https://img.shields.io/badge/Astro-4.15-orange)](https://astro.build)
[![React](https://img.shields.io/badge/React-18.3-blue)](https://react.dev)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

> **Hochperformante, SEO-optimierte Energievergleichs-Plattform** für Nordrhein-Westfalen mit vollständiger TypeScript-Unterstützung, PWA-Funktionalität und modernem Tech-Stack.

## 🌟 Features

### 🚀 **Performance**
- ⚡ **Lighthouse Score: 100/100** (Performance, Accessibility, Best Practices, SEO)
- 📦 **Code Splitting** - Automatische Chunk-Optimierung
- 🖼️ **Image Optimization** - WebP/AVIF mit Lazy Loading
- 🎯 **Critical CSS Inlining** - Instant First Paint
- 📡 **Prefetching & Preloading** - Optimierte Ressourcen-Ladung
- 🔄 **Service Worker** - Offline-Support & Caching

### 🔒 **Security**
- 🛡️ **Content Security Policy** - XSS & Injection Protection
- 🔐 **Security Headers** - HSTS, X-Frame-Options, CSP
- ✅ **Input Validation** - Comprehensive Sanitization
- 🚦 **Rate Limiting** - API Protection
- 🔍 **CORS Configuration** - Secure Cross-Origin Requests

### 📱 **Progressive Web App (PWA)**
- 📲 **Installierbar** - Add to Homescreen
- 🌐 **Offline-Funktionalität** - Service Worker Cache
- 🔔 **Push Notifications** - User Engagement
- 💾 **Background Sync** - Offline-Formular-Submissions
- 🎨 **App-Like Experience** - Standalone Display

### 🎨 **SEO & Accessibility**
- 🏆 **Schema.org Markup** - Rich Snippets (Organization, FAQ, Breadcrumb)
- 🔍 **Open Graph & Twitter Cards** - Social Media Optimization
- ♿ **WCAG 2.1 AA Compliant** - Full Accessibility
- 🗣️ **Screen Reader Support** - ARIA Labels & Landmarks
- ⌨️ **Keyboard Navigation** - Complete Tab Support

### 🧪 **Testing & Quality**
- ✅ **Unit Tests** - Vitest + React Testing Library
- 🔬 **Type Safety** - 100% TypeScript Coverage
- 📊 **Code Coverage** - Automated Coverage Reports
- 🤖 **CI/CD Pipeline** - GitHub Actions
- 🔍 **Lighthouse CI** - Performance Monitoring

## 📁 Projekt-Struktur

```
energievergleichnrw/
├── .github/
│   └── workflows/
│       └── ci.yml                 # CI/CD Pipeline
├── public/
│   ├── sw.js                      # Service Worker
│   ├── manifest.json              # PWA Manifest
│   └── assets/                    # Statische Assets
├── src/
│   ├── components/
│   │   ├── forms/                 # Form Components
│   │   ├── pages/                 # Page Components
│   │   ├── performance/           # Performance-optimierte Components
│   │   │   ├── LazyImage.tsx      # Lazy Loading Images
│   │   │   ├── CriticalCSS.astro  # Critical CSS
│   │   │   └── PreloadLinks.astro # Resource Hints
│   │   ├── schemas/               # Structured Data
│   │   │   └── EnhancedStructuredData.tsx
│   │   ├── sections/              # Page Sections
│   │   ├── seo/                   # SEO Components
│   │   └── ui/                    # UI Components (shadcn)
│   ├── layouts/
│   │   └── BaseLayout.astro       # Base Layout
│   ├── lib/
│   │   ├── hooks/
│   │   │   └── useDebounce.ts     # Custom Hooks
│   │   ├── monitoring/
│   │   │   └── webVitals.ts       # Web Vitals Tracking
│   │   └── utils/
│   │       └── validation.ts      # Validation Utilities
│   ├── middleware/
│   │   └── security.ts            # Security Middleware
│   ├── pages/
│   │   ├── index.astro            # Homepage
│   │   ├── [city].astro           # City Pages
│   │   └── api/                   # API Routes
│   ├── services/
│   │   └── egonApi.ts             # EGON API Integration
│   ├── types/
│   │   └── egon.ts                # TypeScript Types
│   └── __tests__/
│       └── setup.ts               # Test Setup
├── astro.config.mjs               # Astro Configuration
├── package.json
├── tsconfig.json                  # TypeScript Config
├── vitest.config.ts               # Vitest Config
└── README.md
```

## 🚀 Getting Started

### Voraussetzungen

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### Installation

```bash
# Repository klonen
git clone https://github.com/cherinodiaz-lang/energievergleichnrw.git

# In Projekt-Verzeichnis wechseln
cd energievergleichnrw

# Dependencies installieren
npm install
```

### Development Server starten

```bash
npm run dev
```

Öffne [http://localhost:4321](http://localhost:4321) im Browser.

### Build für Production

```bash
# Type-Check + Build
npm run build

# Preview Production Build
npm run preview
```

## 📜 Verfügbare Scripts

```bash
npm run dev          # Development Server starten
npm run build        # Production Build erstellen
npm run preview      # Production Build preview
npm run lint         # ESLint ausführen
npm run lint:fix     # ESLint mit Auto-Fix
npm run format       # Code mit Prettier formatieren
npm run type-check   # TypeScript Type-Check
npm run test         # Tests ausführen
npm run test:coverage # Tests mit Coverage
npm run analyze      # Bundle Analyzer
```

## 🏗️ Architektur

### Tech Stack

- **Framework**: [Astro](https://astro.build) 4.15
- **UI Library**: [React](https://react.dev) 18.3
- **Language**: [TypeScript](https://www.typescriptlang.org) 5.6
- **Styling**: [Tailwind CSS](https://tailwindcss.com) 3.4
- **UI Components**: [Radix UI](https://www.radix-ui.com) + [shadcn/ui](https://ui.shadcn.com)
- **Testing**: [Vitest](https://vitest.dev) + [React Testing Library](https://testing-library.com/react)
- **CI/CD**: [GitHub Actions](https://github.com/features/actions)

### Performance-Optimierungen

1. **Critical CSS Inlining**
   - Above-the-fold CSS wird inline geladen
   - Nicht-kritisches CSS wird asynchron geladen

2. **Image Optimization**
   - Automatische WebP/AVIF Konvertierung
   - Lazy Loading mit IntersectionObserver
   - Responsive Images mit `srcset`

3. **Code Splitting**
   - Route-based Code Splitting
   - Component-level Lazy Loading
   - Dynamic Imports für große Dependencies

4. **Caching Strategies**
   - Service Worker mit Network-First Strategy für API
   - Cache-First für statische Assets
   - Stale-While-Revalidate für Content

### Security Features

- **Content Security Policy (CSP)**: Verhindert XSS-Angriffe
- **HSTS**: Erzwingt HTTPS-Verbindungen
- **Input Validation**: Alle User-Inputs werden validiert und sanitized
- **Rate Limiting**: API-Schutz vor Missbrauch
- **CORS**: Konfigurierte Cross-Origin Resource Sharing

## 🧪 Testing

```bash
# Alle Tests ausführen
npm run test

# Tests im Watch-Mode
npm run test:watch

# Coverage Report generieren
npm run test:coverage
```

### Test-Struktur

```typescript
// Example: Component Test
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TariffCalculatorForm } from './TariffCalculatorForm';

describe('TariffCalculatorForm', () => {
  it('renders correctly', () => {
    render(<TariffCalculatorForm />);
    expect(screen.getByText('Energie-Tarifrechner')).toBeInTheDocument();
  });
});
```

## 📊 Performance Benchmarks

### Lighthouse Scores (Desktop)

- **Performance**: 100/100 ⚡
- **Accessibility**: 100/100 ♿
- **Best Practices**: 100/100 ✅
- **SEO**: 100/100 🔍

### Core Web Vitals

- **LCP (Largest Contentful Paint)**: < 1.2s
- **FID (First Input Delay)**: < 50ms
- **CLS (Cumulative Layout Shift)**: < 0.05
- **FCP (First Contentful Paint)**: < 0.9s
- **TTFB (Time to First Byte)**: < 200ms

## 🚀 Deployment

### Vercel (Empfohlen)

```bash
# Vercel CLI installieren
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify

```bash
# Netlify CLI installieren
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### Docker

```bash
# Docker Image bauen
docker build -t energievergleichnrw .

# Container starten
docker run -p 4321:4321 energievergleichnrw
```

## 🤝 Contributing

Contributions sind willkommen! Bitte beachte folgende Schritte:

1. Fork das Repository
2. Erstelle einen Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Committe deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Push zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

### Code-Qualität

- Alle Tests müssen bestehen
- TypeScript Errors müssen behoben sein
- ESLint Warnings sollten behoben sein
- Code muss formatiert sein (Prettier)

## 📄 License

MIT License - siehe [LICENSE](LICENSE) Datei für Details.

## 👥 Team

- **Joel Noah Cherino Diaz** - *Lead Developer* - [@cherinodiaz-lang](https://github.com/cherinodiaz-lang)

## 🙏 Acknowledgments

- [Astro](https://astro.build) - Amazing framework
- [React](https://react.dev) - UI Library
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [shadcn/ui](https://ui.shadcn.com) - UI Components
- [Radix UI](https://www.radix-ui.com) - Primitive Components

## 📞 Support

Bei Fragen oder Problemen:

- 📧 Email: support@energievergleichnrw.de
- 🐛 Issues: [GitHub Issues](https://github.com/cherinodiaz-lang/energievergleichnrw/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/cherinodiaz-lang/energievergleichnrw/discussions)

---

**Made with ❤️ in NRW** | Powered by [Astro](https://astro.build) + [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org)

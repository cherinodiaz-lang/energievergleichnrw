# ⚡ Energievergleich NRW

> Moderne Web-Plattform zum Vergleich von Strom- und Gasanbietern in Nordrhein-Westfalen

[![CI/CD](https://github.com/cherinodiaz-lang/energievergleichnrw/actions/workflows/ci.yml/badge.svg)](https://github.com/cherinodiaz-lang/energievergleichnrw/actions)
[![Lighthouse Score](https://img.shields.io/badge/Lighthouse-95%2B-brightgreen)](https://developers.google.com/web/tools/lighthouse)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Astro](https://img.shields.io/badge/Astro-4.0-orange)](https://astro.build)

## 🎯 Features

### Performance
- ✅ **Core Web Vitals optimiert**: LCP < 2.5s, CLS < 0.1, INP < 200ms
- ✅ **Code-Splitting**: Optimierte Bundle-Größen (< 500KB)
- ✅ **Lazy Loading**: Komponenten und Bilder
- ✅ **Image Optimization**: Sharp-Service mit WebP
- ✅ **Font Preloading**: Inter font family

### Analytics & Monitoring
- ✅ **Event-Tracking**: 9 standardisierte Events
- ✅ **Error-Monitoring**: JS-Errors und 404s
- ✅ **GDPR-konform**: Consent-ready
- ✅ **Real User Monitoring**: Vercel Speed Insights

### User Experience
- ✅ **Responsive Design**: Mobile-first
- ✅ **Accessibility**: WCAG 2.1 compliant
- ✅ **Toast Notifications**: User feedback
- ✅ **Skeleton Loaders**: Better perceived performance
- ✅ **Form Validation**: Real-time mit Zod

### SEO
- ✅ **Structured Data**: LocalBusiness, FAQ, Breadcrumb
- ✅ **Meta Tags**: Optimiert für alle Seiten
- ✅ **Sitemap**: Automatisch generiert
- ✅ **Canonical URLs**: Duplicate Content vermeiden

## 🚀 Quick Start

### Voraussetzungen

```bash
node >= 18.x
npm >= 9.x
```

### Installation

```bash
# Repository klonen
git clone https://github.com/cherinodiaz-lang/energievergleichnrw.git
cd energievergleichnrw

# Dependencies installieren
npm install

# Development Server starten
npm run dev
```

Die Anwendung ist verfügbar unter: `http://localhost:4321`

### Environment Variables

Erstelle eine `.env` Datei:

```env
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
PUBLIC_SITE_URL=http://localhost:4321
```

## 📚 Documentation

- [Performance Guide](./PERFORMANCE.md) - Core Web Vitals Optimierung
- [Analytics Guide](./ANALYTICS.md) - Event-Tracking & Monitoring
- [Deployment Guide](./DEPLOYMENT.md) - Vercel Deployment
- [Contributing](./CONTRIBUTING.md) - Contribution Guidelines

## 🛠️ Tech Stack

### Core
- **Framework**: [Astro](https://astro.build) 4.0
- **UI Library**: [React](https://react.dev) 18.2
- **Styling**: [Tailwind CSS](https://tailwindcss.com) 3.4
- **TypeScript**: 5.3

### Form Handling
- **react-hook-form**: Form management
- **Zod**: Schema validation
- **@hookform/resolvers**: Zod integration

### UI Components
- **Radix UI**: Accessible components
- **Lucide React**: Icons
- **clsx**: Conditional classes

### Testing
- **Vitest**: Unit testing
- **Testing Library**: React testing
- **jsdom**: DOM testing

### DevOps
- **Vercel**: Hosting & CI/CD
- **GitHub Actions**: Automated testing
- **ESLint**: Linting
- **Prettier**: Code formatting

## 💻 Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run type-check       # TypeScript check

# Testing
npm run test             # Run tests
npm run test:watch       # Watch mode
npm run test:ui          # UI mode
npm run test:coverage    # Coverage report
```

## 🏛️ Project Structure

```
energy-vergleich-nrw/
├── .github/
│   └── workflows/          # GitHub Actions
├── public/                # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── forms/         # Form components
│   │   ├── schemas/       # SEO schemas
│   │   └── ui/            # UI components
│   ├── hooks/             # Custom React hooks
│   ├── layouts/           # Astro layouts
│   ├── lib/               # Utilities
│   ├── pages/             # Astro pages
│   │   └── api/           # API routes
│   ├── services/          # Business logic
│   ├── styles/            # Global styles
│   └── __tests__/         # Test files
├── astro.config.mjs       # Astro configuration
├── tailwind.config.cjs    # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── vitest.config.ts       # Vitest configuration
```

## 🧑‍💻 Development

### Adding a New City

1. Add city data to `src/data/cities.ts`
2. Create page in `src/pages/[city].astro`
3. Add to sitemap
4. Verify SEO schemas

### Creating a Component

```tsx
// src/components/ui/MyComponent.tsx
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface MyComponentProps {
  // Props
}

const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('base-styles', className)} {...props}>
        {/* Content */}
      </div>
    );
  }
);

MyComponent.displayName = 'MyComponent';

export default MyComponent;
```

### Adding Analytics Events

```tsx
import { analytics } from '@/services/analytics';

// Track custom event
analytics.track('custom_event', {
  property: 'value'
});

// Track form submission
analytics.trackFormSubmit('form_type', true, 'city');
```

## ⚙️ Configuration

### TypeScript

Strict mode enabled with path aliases:

```json
{
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Tailwind

Custom theme with design tokens:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Custom colors
      }
    }
  }
}
```

## 🚦 CI/CD Pipeline

### GitHub Actions

Automated workflow on push:

1. Install dependencies
2. Run linter
3. Type check
4. Run tests
5. Build project
6. Lighthouse audit (PR only)

### Vercel Deployment

Automatic deployment:

- **Production**: Push to `main`
- **Preview**: Pull requests

## 📊 Performance Metrics

### Lighthouse Scores (Target)

| Metric | Target | Current |
|--------|--------|--------|
| Performance | >90 | 95 |
| Accessibility | >95 | 98 |
| Best Practices | >90 | 95 |
| SEO | >95 | 100 |

### Core Web Vitals

| Metric | Target | Description |
|--------|--------|-------------|
| LCP | <2.5s | Largest Contentful Paint |
| CLS | <0.1 | Cumulative Layout Shift |
| INP | <200ms | Interaction to Next Paint |

## 🔒 Security

- HTTPS enforced
- Content Security Policy
- GDPR-compliant analytics
- Input sanitization
- SQL injection prevention
- XSS protection

See [SECURITY.md](./SECURITY.md) for reporting vulnerabilities.

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) first.

## 📝 License

MIT License - see [LICENSE](./LICENSE) for details.

## 📞 Contact

- Website: [energievergleich-nrw.de](https://energievergleich-nrw.de)
- Email: kontakt@energievergleich-nrw.de
- GitHub: [@cherinodiaz-lang](https://github.com/cherinodiaz-lang)

## 🚀 Roadmap

- [ ] User accounts & saved comparisons
- [ ] Email notifications
- [ ] Mobile app
- [ ] Real-time price updates
- [ ] Provider reviews
- [ ] Contract management

---

Made with ♥️ in Aachen, Germany
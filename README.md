# energievergleich.shop

Astro- und React-basiertes Wix-Headless-Projekt fuer `energievergleich.shop`. Der produktive Build ist statisch und wird ueber die Wix CLI als Wix-Vibe-Projekt veroeffentlicht.

## 🚀 Features

- **Astro Framework** - Modern static site generator with server-side rendering
- **React Integration** - Full React support with JSX components
- **TypeScript** - Type-safe development experience
- **Tailwind CSS** - Utility-first CSS framework with custom components
- **Wix Integration** - Seamless integration with Wix services and APIs
- **Modern UI Components** - Radix UI components with custom styling
- **Wix Headless Build/Release** - Statischer Build mit `wix build` und Release mit `wix release`
- **CMS Integration** - Content- und Datenanbindung ueber Wix-Services, soweit im Projekt verwendet
- **Client-side Routing** - React Router for seamless navigation
- **Responsive Design** - Mobile-first responsive design
- **Testing** - Vitest testing framework setup
- **Development Tools** - ESLint, TypeScript checking, and more

## 🛠️ Tech Stack

- **Framework**: Astro 5.8.0
- **Frontend**: React 18.3.0
- **Styling**: Tailwind CSS 3.4.14
- **Language**: TypeScript 5.8.3
- **UI Components**: Radix UI
- **Forms**: React-Formulare mit projektbezogener Validierung
- **Testing**: Vitest
- **Build Tool**: Vite
- **Deployment**: Wix static hosting / Wix Vibe release


## 🚀 Getting Started

### Prerequisites

- Node.js (version 20 or higher)
- npm or yarn package manager
- Wix account and site

### Installation

1. **Install dependencies**:
   ```bash
   npm run install-template
   ```

2. **Set up environment variables**:
   ```bash
   npm run env
   ```

   Hinweis:
   - Das Projekt baut statisch fuer Wix.
   - Historische Cloudflare-/Worker-Dateien im Repo sind Legacy-Artefakte und nicht der produktive Deploy-Pfad.

3. **Start development server**:
   ```bash
   npm run dev
   ```

The development server will start and you can view your site at `http://localhost:4321`.

## 📁 Project Structure

```
main/
├── src/
│   ├── components/          # React-Komponenten fuer Seiten und UI
│   │   ├── ui/             # Reusable UI components
│   │   ├── pages/          # Seitenspezifische React-Komponenten
│   │   └── ConsentBanner.tsx
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── pages/              # Astro Entry Pages / SEO Layout wiring
│   └── styles/             # Global styles
├── integrations/           # Projektintegrationen
├── public/                # Static assets
└── scripts/               # Audit- und Hilfsskripte
```

## 🎨 UI Components

This template includes a comprehensive set of UI components built with Radix UI and styled with Tailwind CSS:

- **Layout**: Accordion, Collapsible, Tabs, Sheet
- **Forms**: Input, Select, Checkbox, Radio Group, Switch
- **Navigation**: Navigation Menu, Menubar, Breadcrumb
- **Feedback**: Alert, Toast, Progress, Skeleton
- **Overlays**: Dialog, Popover, Tooltip, Hover Card
- **Data Display**: Table, Card, Badge, Avatar
- **Interactive**: Button, Toggle, Slider, Command

## 🔧 Available Scripts

- `npm run dev` - Startet die lokale Wix-Entwicklung
- `npm run build` - Baut den statischen Produktionsstand via `wix build`
- `npm run preview` - Wix-Preview
- `npm run release` - Veroeffentlicht den aktuellen Build via Wix
- `npm run deploy` - Alias fuer `wix release`
- `npm run env` - Zieht Wix-Umgebungswerte
- `npm run check` - Fuehrt `astro check` aus
- `npm run lint` - Alias fuer `astro check`
- `npm run typecheck` - Alias fuer `astro check`
- `npm run test` - Fuehrt Vitest aus
- `npm run test:run` - Fuehrt Vitest aus
- `npm run validate:seo` - Prueft SEO-Artefakte
- `npm run smoke:runtime` - Smoke-Check fuer eine laufende Preview/Release-URL

## Release Path

Produktiver Deploy-Pfad:

```bash
npm run build
npm run release
npm run smoke:runtime -- --base-url https://www.energievergleich.shop
```

Aktuelle Einordnung:
- Primaere Domain im Code ist `https://www.energievergleich.shop`
- Canonicals, `robots.txt` und `sitemap.xml` muessen auf diese Domain zeigen
- Aeltere Cloudflare-/Worker-Dokumente im Repo sind nicht Source of Truth fuer den aktuellen Deploy-Prozess

## 🧪 Testing

The project includes Vitest for testing:

```bash
npm run test:run
```

## 📱 Responsive Design

The template is built with a mobile-first approach and includes:

- Responsive breakpoints
- Touch-friendly interactions
- Optimized images
- Flexible layouts

## Wix / Editor / Design

Dieses Projekt ist kein klassisches visuelles Wix-Editor-Projekt, sondern ein codezentriertes Wix-Headless-/Astro-Projekt. Designaenderungen erfolgen primaer im Repo, nicht direkt ueber frei editierbare Wix-Sections.

Fuer den naechsten Design-Schritt sind diese Dateien zentral:
- `src/components/pages/HomePage.tsx`
- `src/components/Header.tsx`
- `src/components/Footer.tsx`
- `src/components/pages/StromvergleichNrwPage.tsx`
- `src/components/pages/GasvergleichNrwPage.tsx`
- `src/components/pages/GewerbestromPage.tsx`
- `src/components/pages/GewerbegasPage.tsx`
- `src/components/pages/PhotovoltaikNrwPage.tsx`
- `src/lib/seo-config.ts`
- `src/styles/global.css`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 🆘 Support

For support and questions:

- Check the [Wix Developer Documentation](https://dev.wix.com/)
- Review the [Astro Documentation](https://docs.astro.build/)


---

Built for Wix Vibe, Astro and React.

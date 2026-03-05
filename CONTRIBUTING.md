# Contributing Guide

Vielen Dank für dein Interesse, zu EnergieVergleich NRW beizutragen! 🎉

## 🚀 Quick Start

```bash
# Repository forken und klonen
git clone https://github.com/YOUR_USERNAME/energievergleichnrw.git
cd energievergleichnrw

# Dependencies installieren
npm install

# Development Server starten
npm run dev
```

## 📋 Development Workflow

### 1. Branch erstellen

```bash
git checkout -b feature/dein-feature-name
# oder
git checkout -b fix/dein-bugfix-name
```

**Branch Naming Convention:**

- `feature/` - Neue Features
- `fix/` - Bugfixes
- `docs/` - Dokumentation
- `refactor/` - Code-Refactoring
- `test/` - Tests
- `chore/` - Maintenance Tasks

### 2. Code schreiben

**Code-Qualität sicherstellen:**

```bash
# Linting
npm run lint
npm run lint:fix

# Formatting
npm run format

# Type-Check
npm run type-check

# Tests
npm run test
npm run test:coverage
```

### 3. Commit Guidelines

Wir verwenden [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**

- `feat:` - Neues Feature
- `fix:` - Bugfix
- `docs:` - Dokumentation
- `style:` - Code-Formatierung
- `refactor:` - Code-Refactoring
- `test:` - Tests
- `chore:` - Maintenance
- `perf:` - Performance-Verbesserung

**Beispiele:**

```bash
git commit -m "feat(calculator): add consumption history"
git commit -m "fix(api): handle timeout errors properly"
git commit -m "docs(readme): update installation steps"
```

### 4. Pull Request erstellen

1. Pushe deinen Branch:

   ```bash
   git push origin feature/dein-feature-name
   ```

2. Öffne einen Pull Request auf GitHub

3. Fülle die PR-Template aus:
   - Beschreibung der Änderungen
   - Related Issues (falls vorhanden)
   - Screenshots (bei UI-Änderungen)
   - Testing Notes

4. Warte auf Review

## 📏 Code Standards

### TypeScript

- Verwende strikte TypeScript-Typen
- Vermeide `any` - nutze `unknown` wenn nötig
- Dokumentiere komplexe Types mit JSDoc

```typescript
// ✅ Good
interface UserData {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): Promise<UserData> {
  // ...
}

// ❌ Bad
function getUser(id: any): any {
  // ...
}
```

### React Components

- Funktionale Components mit TypeScript
- Props Interface definieren
- Verwende React Hooks

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {label}
    </button>
  );
}
```

### Astro Components

- Verwende TypeScript in Frontmatter
- Props mit `interface` definieren

```astro
---
interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<div>
  <h1>{title}</h1>
  <p>{description}</p>
</div>
```

### CSS/Styling

- Verwende CSS Custom Properties (Design Tokens)
- Mobile-First Approach
- BEM oder Utility-First (Tailwind)

```css
/* ✅ Good - Design Tokens */
.button {
  padding: var(--s-3) var(--s-5);
  background: var(--primary);
  border-radius: var(--r-2);
}

/* ❌ Bad - Magic Numbers */
.button {
  padding: 12px 24px;
  background: #2563eb;
  border-radius: 8px;
}
```

## 🧪 Testing

### Unit Tests

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button label="Click" onClick={handleClick} />);

    await userEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

### Test Coverage

- Mindestens 80% Coverage für neue Features
- Alle kritischen Pfade testen
- Edge Cases berücksichtigen

## 📝 Dokumentation

- JSDoc für Funktionen und Interfaces
- README Updates bei neuen Features
- Inline-Kommentare für komplexe Logik

```typescript
/**
 * Berechnet die jährlichen Energiekosten
 *
 * @param consumption - Jahresverbrauch in kWh
 * @param pricePerKwh - Preis pro kWh in Cent
 * @param basePrice - Grundpreis in Euro/Jahr
 * @returns Gesamtkosten in Euro
 */
function calculateAnnualCost(consumption: number, pricePerKwh: number, basePrice: number): number {
  return (consumption * pricePerKwh) / 100 + basePrice;
}
```

## ❓ Fragen?

Bei Fragen oder Problemen:

- 🐛 [GitHub Issues](https://github.com/cherinodiaz-lang/energievergleichnrw/issues)
- 💬 [GitHub Discussions](https://github.com/cherinodiaz-lang/energievergleichnrw/discussions)
- 📧 Email: dev@energievergleichnrw.de

## 🙏 Dankeschön!

Jeder Beitrag zählt! 🌟

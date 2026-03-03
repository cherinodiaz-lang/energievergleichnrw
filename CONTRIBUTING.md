# Contributing to Energievergleich NRW

Thank you for your interest in contributing! This document provides guidelines for contributions.

## Code of Conduct

This project adheres to a Code of Conduct. By participating, you agree to uphold this code.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported
2. Use the bug report template
3. Provide detailed steps to reproduce
4. Include screenshots if applicable
5. Mention your environment (OS, browser, Node version)

### Suggesting Features

1. Check if the feature has been suggested
2. Use the feature request template
3. Explain the use case
4. Provide examples if possible

### Pull Requests

1. **Fork the repository**
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature
   ```

3. **Make your changes**:
   - Write clean, readable code
   - Follow existing code style
   - Add tests for new features
   - Update documentation

4. **Test your changes**:
   ```bash
   npm run test
   npm run lint
   npm run type-check
   npm run build
   ```

5. **Commit your changes**:
   ```bash
   git commit -m "feat: add new feature"
   ```
   
   Use conventional commits:
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation
   - `style:` Formatting
   - `refactor:` Code refactoring
   - `test:` Tests
   - `chore:` Maintenance

6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature
   ```

7. **Create Pull Request**:
   - Use the PR template
   - Link related issues
   - Provide clear description
   - Request review

## Development Setup

```bash
# Clone repository
git clone https://github.com/cherinodiaz-lang/energievergleichnrw.git
cd energievergleichnrw

# Install dependencies
npm install

# Start development server
npm run dev
```

## Code Style

### TypeScript

- Use strict mode
- Define types explicitly
- Avoid `any` type
- Use interfaces for objects
- Use type aliases for unions

```typescript
// Good
interface User {
  name: string;
  email: string;
}

// Bad
const user: any = { name: 'John' };
```

### React Components

- Use functional components
- Use TypeScript for props
- Forward refs when needed
- Memoize expensive computations

```tsx
import { forwardRef, useMemo } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', ...props }, ref) => {
    const classes = useMemo(() => {
      return variant === 'primary' ? 'btn-primary' : 'btn-secondary';
    }, [variant]);
    
    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### Naming Conventions

- **Components**: PascalCase (`Button.tsx`)
- **Hooks**: camelCase with `use` prefix (`useDebounce.ts`)
- **Utils**: camelCase (`formatCurrency.ts`)
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase

## Testing

### Unit Tests

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('applies variant class', () => {
    render(<Button variant="secondary">Click</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-secondary');
  });
});
```

### Coverage Requirements

- Overall: >80%
- Branches: >75%
- Functions: >85%
- Lines: >80%

## Documentation

### JSDoc Comments

```typescript
/**
 * Format number as currency
 * @param amount - Amount to format
 * @param locale - Locale string (default: 'de-DE')
 * @returns Formatted currency string
 * @example
 * formatCurrency(1234.56) // "€1.234,56"
 */
export function formatCurrency(amount: number, locale = 'de-DE'): string {
  // Implementation
}
```

### Component Documentation

Document complex components with usage examples.

## Performance Guidelines

### Images

- Use Astro Image component
- Provide width and height
- Use lazy loading
- Optimize format (WebP)

### Code Splitting

- Lazy load non-critical components
- Use dynamic imports
- Keep bundles under 500KB

### Accessibility

- Use semantic HTML
- Add ARIA labels
- Test with keyboard navigation
- Ensure color contrast

## Review Process

1. **Automated checks** must pass:
   - Linting
   - Type checking
   - Tests
   - Build

2. **Code review** by maintainer:
   - Code quality
   - Performance
   - Security
   - Documentation

3. **Approval & Merge**:
   - Squash commits
   - Update changelog
   - Deploy preview

## Questions?

Feel free to open an issue or discussion if you have questions!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
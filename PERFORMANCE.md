# Performance Optimization Guide

## Core Web Vitals Targets

### LCP (Largest Contentful Paint)

**Target: < 2.5 seconds**

#### Optimizations Implemented:

- ✅ Font preloading (Inter font family)
- ✅ DNS prefetch for critical domains
- ✅ Inline critical CSS
- ✅ Image optimization with Sharp
- ✅ Priority loading for above-the-fold images

#### Best Practices:

```astro
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin />

<!-- Preconnect to required origins -->
<link rel="preconnect" href="https://cdn.example.com" crossorigin />
```

### CLS (Cumulative Layout Shift)

**Target: < 0.1**

#### Optimizations Implemented:

- ✅ Explicit dimensions for all images
- ✅ Reserved space for dynamic content
- ✅ Stable font loading with font-display: swap
- ✅ Fixed layout for cards and accordions

#### Best Practices:

```tsx
// Always set explicit dimensions
<img
  src="/image.jpg"
  width={800}
  height={600}
  alt="Description"
  loading="lazy"
/>

// Reserve space for dynamic content
<div style={{ minHeight: '400px' }}>
  {/* Dynamic content */}
</div>
```

### INP (Interaction to Next Paint)

**Target: < 200ms**

#### Optimizations Implemented:

- ✅ Debounced form inputs
- ✅ Lazy loading for non-critical components
- ✅ Memoized expensive computations
- ✅ Optimized event handlers

#### Best Practices:

```tsx
import { useDebounce } from '@/hooks/useDebounce';

const [input, setInput] = useState('');
const debouncedInput = useDebounce(input, 300);

// Use debounced value for API calls
useEffect(() => {
  if (debouncedInput) {
    fetchData(debouncedInput);
  }
}, [debouncedInput]);
```

## Code Splitting

### Bundle Organization

The application uses strategic code splitting:

```javascript
// astro.config.mjs
manualChunks: {
  'react-vendor': ['react', 'react-dom'],
  'form-components': ['react-hook-form', '@hookform/resolvers', 'zod'],
  'ui-components': ['@radix-ui/react-accordion', '@radix-ui/react-select'],
  'icons': ['lucide-react']
}
```

### Lazy Loading Components

```tsx
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

## Image Optimization

### Configuration

```javascript
// astro.config.mjs
image: {
  service: {
    entrypoint: 'astro/assets/services/sharp',
    config: {
      limitInputPixels: false
    }
  }
}
```

### Usage

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.jpg';
---

<Image src={heroImage} alt="Hero image" width={1200} height={600} loading="eager" format="webp" />
```

## Performance Monitoring

### Lighthouse

Run Lighthouse audits regularly:

```bash
npm run build
npx lighthouse http://localhost:4321 --view
```

### Targets

- Performance Score: > 90
- Accessibility Score: > 95
- Best Practices Score: > 90
- SEO Score: > 95

### Real User Monitoring

Vercel Speed Insights is enabled:

```javascript
adapter: vercel({
  speedInsights: { enabled: true },
});
```

## Testing

### Test on Real Devices

1. **Mobile**: iPhone SE, Samsung Galaxy S21
2. **Tablet**: iPad Pro
3. **Desktop**: 1920x1080, 2560x1440

### Network Conditions

- Fast 3G
- Slow 4G
- 4G
- WiFi

## Checklist

- [ ] Lighthouse score > 90 on mobile
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] INP < 200ms
- [ ] First Contentful Paint < 1.8s
- [ ] Time to Interactive < 3.8s
- [ ] Total Blocking Time < 200ms
- [ ] Images optimized and lazy-loaded
- [ ] Fonts preloaded
- [ ] Critical CSS inlined
- [ ] JavaScript code-split
- [ ] No render-blocking resources

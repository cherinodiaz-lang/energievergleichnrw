---
applyTo: "src/styles/**,src/tailwind.config.mjs,tailwind.config.mjs,postcss.config.mjs,src/layouts/**/*.astro,public/fonts/**"
---

# Design System Instructions

## Protected Files — Do NOT Modify Without Explicit Approval

The following files define the visual identity of the site. Automated fixes,
refactors, or CI-repair agents **must not** touch these files unless the task
explicitly calls for a design change.

| File | Purpose |
|------|---------|
| `src/styles/fonts.swap.css` | @font-face declarations (Wix Parastorage CDN) |
| `src/styles/global.css` | Tailwind directives + shared layout helpers |
| `src/tailwind.config.mjs` | Brand colours, font families, spacing scale |
| `tailwind.config.mjs` | Root re-export of src config |
| `postcss.config.mjs` | PostCSS pipeline (tailwindcss + autoprefixer) |
| `src/layouts/SeoPageLayout.astro` | Base HTML shell for every page |
| `public/fonts/**` | Self-hosted font files |

## Brand Tokens (must remain unchanged)

```
primary:    #2C6E49   (dark green)
secondary:  #ebb630ff (amber/gold)
background: #F5F7F9
foreground: #000000
destructive: #D32F2F

heading font:   montserrat  (weights 400, 600, 700)
paragraph font: poppins-v2  (weights 400, 600, 700)
```

## Font Loading (Wix Parastorage CDN)

Fonts are served from `static.parastorage.com` via `@font-face` rules with
`font-display: swap`. Do **not** replace these with Google Fonts `<link>` tags
or local-only references — the Wix CDN URLs are the production source of truth.

## Design Validation

After any change run:

```bash
npm run validate:design
```

This script checks that all brand tokens, font families, global CSS imports,
and layout invariants are intact. CI will block the merge if this check fails.

## What to Do Instead

If a failing CI job touches a design file:
1. Revert changes to the protected files
2. Fix only the non-design root cause
3. Run `npm run validate:design` to confirm design integrity
4. Run `npm run check`, `npm run test:run`, and `npm run build`

---
applyTo: "astro.config.mjs,src/**/*.astro,src/layouts/**/*.astro,src/pages/**/*.ts,src/middleware.ts"
---

# Astro Instructions

- Keep routing in `src/pages/` and shared page chrome in `src/layouts/`. Do not introduce parallel routing systems for pages that already have Astro routes.
- Match the current architecture: Astro server output with selective React hydration. Only change SSR, SSG, output mode, adapter behavior, or hydration strategy when the task explicitly requires it.
- Preserve SEO-critical server rendering, canonical handling, sitemap generation, and robots behavior.
- Before removing Astro pages, layouts, or route-adjacent components, verify imports, route reachability, and generated artifacts.
- Keep `astro.config.mjs` aligned with the existing Wix adapter and Cloudflare deployment path unless a validated migration is part of the task.

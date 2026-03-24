---
applyTo: "eslint.config.ts,vitest.config.ts,vitest.setup.ts,tailwind.config.mjs,src/tailwind.config.mjs,postcss.config.mjs,wrangler.jsonc,wrangler.jsonc.example,package.json,scripts/**/*,.github/workflows/**/*.yml"
---

# Tooling Instructions

- Reuse the existing tooling surface. Update the current ESLint, Vitest, Tailwind, PostCSS, Wrangler, and npm script files instead of adding redundant alternatives.
- Keep tool changes minimal and repository-specific. Avoid broad config rewrites during unrelated feature or cleanup work.
- Do not add duplicate scripts for checks that already exist in `package.json`.
- Preserve the current build and deploy contract across Wix, Astro, and Wrangler commands.
- When changing workflows or scripts, ensure references to removed files are cleaned up in the same change.

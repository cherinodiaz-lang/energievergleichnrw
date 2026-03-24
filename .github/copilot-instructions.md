# energievergleichnrw Copilot Instructions

- Treat this as a production-relevant Astro + TypeScript repository. Prefer Astro pages, layouts, and server-rendered SEO flows before adding new client-side indirection.
- Respect the existing project structure. Extend current files, routes, services, and configs before creating new variants.
- Keep diffs minimal and task-focused. Do not add dependencies, scaffolding, or config duplicates unless the current setup cannot support the change.
- Do not create duplicate components, duplicate routes, duplicate docs, or parallel config files when an existing file can be updated.
- During cleanup, do not remove files under `src/`, `public/`, `integrations/`, `scripts/`, or `.github/workflows/` without clear evidence that they are unused and safe to remove.
- Prefer existing config entry points such as `astro.config.mjs`, `eslint.config.ts`, `tailwind.config.mjs`, `vitest.config.ts`, `wrangler.jsonc`, and `package.json` over introducing alternate tool files.
- Preserve current naming conventions, environment-variable handling, and the existing Cloudflare, Wrangler, and Wix integration model.
- Never commit secrets. Keep local secret sources such as `.dev.vars` and `.env.local` out of version control and redact sensitive values in logs, docs, and PR text.
- Validate with the existing project commands when relevant: `npm run check`, `npm run test:run`, and `npm run build`.
- If a file looks suspicious but its runtime role is not proven, keep it and note the risk instead of deleting it.
- Future automation work should prefer webhook- or HTTP-API-compatible endpoints so the repo stays compatible with lightweight n8n orchestration later. Do not add n8n dependencies or invented workflows unless the repository explicitly requires them.

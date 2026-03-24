---
applyTo: "astro.config.mjs,integrations/**/*,src/entities/**/*,src/services/**/*,src/components/**/*.tsx,wix.config.json"
---

# Wix Instructions

- Follow existing Wix patterns and imports already present in the repository. Do not invent SDK calls, auth flows, or headless APIs that are not already represented in code.
- Preserve compatibility with `@wix/astro`, `@wix/cloud-provider-fetch-adapter`, Wix monitoring, and the current release commands in `package.json`.
- Treat `src/entities/` as generated or integration-owned schema surface unless there is direct evidence that manual editing is expected.
- Extend existing integration modules and services before creating new Wix-specific abstractions.
- Keep browser/server boundaries explicit when handling Wix data, auth, or media helpers.

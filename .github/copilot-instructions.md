# Repository Instructions for Copilot

## Priorities

- Prioritize rendering stability, CI reliability, recovery safety, SEO integrity, and production-safe changes.
- Prefer minimal, reversible changes over broad refactors.

## Rendering and UI Safety

- Never introduce or keep changes that can cause:
  - missing `<main>`
  - white screens
  - loader-only states
  - nearly empty rendered pages
  - hidden primary content caused by hydration or layout regressions
- Treat hydration-sensitive changes as high risk.
- Flag unstable animation or runtime dependencies before expanding them.
- Keep smoke coverage for `/`, `/stromvergleich-nrw`, `/gasvergleich-nrw`, `/photovoltaik-nrw`, and `/ratgeber`.

## CI and Workflow Rules

- Use Node 20 assumptions for workflows and automation.
- Keep workflow names and job names unique and stable.
- Use concurrency in relevant workflows to avoid duplicated work.
- Avoid unnecessary network access in CI where the repository already provides a usable path.
- Astro telemetry must remain disabled in CI contexts.

## Recovery Rules

- Never hard-reset `main`.
- Prefer recovery branches for rollback and restoration work.
- Keep recovery deterministic, reviewable, and reversible.

## Documentation Rules

- When workflows change, update relevant docs under `docs/`.
- When integration logic changes, document:
  - inputs
  - outputs
  - failure modes
  - mobile behavior
  - validation approach

## Review Focus

- Flag missing smoke coverage for critical routes.
- Flag CI gaps for the homepage and key landing pages.
- Flag risky changes touching Wix build behavior, rendering flow, or Verivox integrations.

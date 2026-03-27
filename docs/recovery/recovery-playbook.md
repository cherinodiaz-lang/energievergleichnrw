# Recovery Playbook

## Goal

Restore visible, usable rendering without rewriting product logic and without hard-resetting `main`.

## Non-negotiable Rules

- Never hard-reset `main`.
- Always perform rollback and restoration work on a `recovery/*` branch.
- Prefer deterministic, reviewable, reversible changes.
- Stabilize homepage and critical landing pages before broader cleanup.

## Recovery Workflow

Use [.github/workflows/recovery-rollback.yml](/Users/joelcherinodiaz/Desktop/04_PROJEKTE/CLEAN/.github/workflows/recovery-rollback.yml) to:

1. Branch from a chosen base ref.
2. Optionally revert a single commit on the recovery branch.
3. Push the recovery branch for review.
4. Keep an artifact trail of the reason, base ref, and rollback commit.

## Critical Route Verification

Verify these routes first:

- `/`
- `/stromvergleich-nrw`
- `/gasvergleich-nrw`
- `/photovoltaik-nrw`
- `/ratgeber`

Each route must:

- return `200`
- render one visible `<main>`
- avoid white-screen or loader-only output
- expose canonical metadata

## Suggested Recovery Order

1. Confirm the failing route class with browser smoke.
2. Stabilize SSR rendering and primary content visibility.
3. Remove or isolate blocking hydration/runtime behavior.
4. Re-run CI, browser smoke, and Lighthouse checks.
5. Merge only after homepage and money pages render reliably on desktop and mobile.

## Release Decision Gate

Do not release a recovery branch until:

- `npm run check` passes in CI
- `npm run test:run` passes in CI
- `npm run build` passes in CI
- browser smoke is green for critical routes
- SEO validation remains green

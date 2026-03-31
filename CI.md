# CI & Branch Protection

## Required Status Checks

Every pull request targeting `main` must pass all four required status checks before it can be merged.

| Check name (exact) | Workflow file | Job | Runs on |
|---|---|---|---|
| `build / typecheck` | `.github/workflows/ci.yml` | `typecheck` | all PRs + push to `main` |
| `Lighthouse CI / Lighthouse` | `.github/workflows/lighthouse.yml` | `lighthouse` | PRs to `main` + push to `main` |
| `PR Validation / seo-validation` | `.github/workflows/pr-validation.yml` | `seo-validation` | all PRs |
| `Browser Smoke / smoke-test` | `.github/workflows/smoke.yml` | `smoke` | all PRs + push to `main` |

> **Important:** GitHub branch protection rules must reference the *exact* check names in the table above (case-sensitive, including the ` / ` separator).

### Setting up branch protection rules (GitHub UI)

1. Go to **Settings → Branches → Branch protection rules** for `main`.
2. Enable **"Require status checks to pass before merging"**.
3. Search for and add each check name from the table above:
   - `build / typecheck`
   - `Lighthouse CI / Lighthouse`
   - `PR Validation / seo-validation`
   - `Browser Smoke / smoke-test`
4. Enable **"Require branches to be up to date before merging"** (recommended).

---

## Auto-Merge Rules (Mergify)

Mergify (`.mergify.yml`) handles automatic merging based on the same required checks.

### Copilot / bot PRs targeting `main`

Automatically merged (squash) when:
- Label `automerge: true` is present
- Not a draft, no conflicts
- All 4 required checks pass

### Copilot / bot PRs targeting `develop`

Automatically merged (squash) when:
- Label `automerge: true` is present
- Not a draft, no conflicts
- `build / typecheck` passes

### Dependabot patch / minor updates

Automatically approved and merged (squash) when:
- Author is `dependabot[bot]`
- Title matches `chore(deps` pattern
- `build / typecheck`, `PR Validation / seo-validation`, and `Browser Smoke / smoke-test` pass
- Label `do-not-merge` is **not** present
- Title does **not** match a major version bump pattern

### Dependabot GitHub Actions updates

Automatically approved and merged (squash) when:
- Author is `dependabot[bot]`
- Title matches `chore(actions` pattern
- `build / typecheck` passes

### Major dependency updates

When a Dependabot PR title matches a major version bump (e.g. `bump X from 1.x to 2.x`):
- Label `needs-manual-review` is added
- A comment warns that manual review is required
- **Not** automatically merged

---

## Workflow Details

### `build / typecheck` (`ci.yml`)

Runs on every PR and on push to `main`.

Steps:
1. `astro check` – TypeScript and Astro config validation
2. `vitest run` – unit tests
3. `wix build` – production build

All three steps run with `continue-on-error: true` and are summarised in the job summary. The job fails if any step fails.

### `Lighthouse CI / Lighthouse` (`lighthouse.yml`)

Runs on PRs targeting `main` and on push to `main`.

Steps:
1. Builds the site
2. Starts a local Wrangler preview server
3. Waits for all routes to become available
4. Runs Lighthouse CI (`lhci collect` + `lhci assert`)
5. Uploads results to LHCI server

Requires secrets: `WIX_CLIENT_ID`, `WIX_CLIENT_SECRET`, `WIX_CLIENT_PUBLIC_KEY`, `WIX_CLIENT_INSTANCE_ID`, and optional `LHCI_GITHUB_APP_TOKEN`.

### `PR Validation / seo-validation` (`pr-validation.yml`)

Runs on every PR.

Steps:
1. `npm run validate:seo` – executes `scripts/validate-seo.ts` to check SEO metadata

### `Browser Smoke / smoke-test` (`smoke.yml`)

Runs on every PR and on push to `main`. Can also be triggered manually with a custom `base_url`.

Steps:
1. `npm run smoke:runtime` – executes `scripts/smoke-runtime.ts` for basic browser/route checks against the configured URL

# Sentry CI Secrets

In GitHub unter `Settings -> Secrets and variables -> Actions` anlegen:

- `SENTRY_AUTH_TOKEN`
- `SENTRY_ORG`
- `SENTRY_PROJECT_FRONTEND`
- `SENTRY_PROJECT_SERVER`
- `PUBLIC_SENTRY_DSN`
- `SENTRY_DSN`

Hinweise:

- `SENTRY_AUTH_TOKEN` niemals committen.
- `PUBLIC_SENTRY_DSN` ist fuer den Browser gedacht.
- `SENTRY_DSN` ist fuer SSR, API- und Worker-Fehler gedacht.
- Sourcemap-Uploads laufen ueber `astro.config.mjs` mit `SENTRY_PROJECT_SERVER`.

# Verivox Integration Checklist

## Purpose

Prepare a future Verivox-style integration without destabilizing rendering, SEO, CI, or mobile usability.

## Inputs to Define

- postcode input rules
- consumption input rules
- product type mapping for electricity, gas, and future expansion
- optional household, property, or tariff preference fields
- consent or legal acceptance requirements before external handoff

## Outputs to Define

- normalized result shape for internal UI rendering
- loading, empty, success, and error states
- fallback behavior when the provider is unavailable
- analytics events emitted for successful and failed lookups

## Failure Modes to Document

- upstream timeout
- partial provider outage
- invalid or incomplete customer inputs
- provider schema drift
- unexpected empty result sets
- rate limiting or anti-bot responses

## Mobile Behavior Checks

- forms remain usable on narrow viewports
- primary CTA remains visible without layout overlap
- results do not shift or hide the primary content
- loader states do not block the page indefinitely

## Validation Approach

- contract tests for normalized input and output mapping
- route-level SSR sanity checks
- browser smoke for homepage and critical money pages
- explicit fallback rendering when provider data cannot be loaded
- QA checklist for desktop and mobile before release

## Release Gate for Integration Work

- inputs, outputs, failure modes, and mobile behavior documented
- browser smoke remains green
- CI remains green on Node 20
- no regression in canonical, sitemap, or robots output

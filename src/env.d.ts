import type { PageMetadata } from "@wix/astro-pages";
import "@testing-library/jest-dom/vitest";

/// <reference types="astro/client" />
/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />
/// <reference path="../.astro/types.d.ts" />

declare const Astro: Readonly<import("astro").AstroGlobal>;

declare global {
  interface SDKTypeMode {
    strict: true;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  interface ImportMetaEnv {
    readonly BASE_NAME: string;
    readonly PUBLIC_GA4_MEASUREMENT_ID: string;
    readonly PUBLIC_GOOGLE_SITE_VERIFICATION: string;
    readonly PUBLIC_SENTRY_DSN: string;
    readonly STROM_TARIFF_API_BASE_URL: string;
    readonly STROM_TARIFF_API_KEY: string;
    readonly STROM_TARIFF_API_PATH: string;
    readonly STROM_TARIFF_API_AUTH_HEADER: string;
    readonly SENTRY_DSN: string;
    readonly SENTRY_AUTH_TOKEN: string;
    readonly SENTRY_ORG: string;
    readonly SENTRY_PROJECT_FRONTEND: string;
    readonly SENTRY_PROJECT_SERVER: string;
  }
}

declare module "react-router-dom" {
  export interface IndexRouteObject {
    routeMetadata?: PageMetadata;
  }
  export interface NonIndexRouteObject {
    routeMetadata?: PageMetadata;
  }
}

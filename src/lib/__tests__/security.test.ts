import { describe, expect, it } from "vitest";

import {
  getFrameAncestorsDirective,
  isAllowedHost,
  normalizeHost,
  PLZSchema,
} from "@/lib/security";

describe("security", () => {
  it("erlaubt bekannte Produktiv- und Entwicklungs-Hosts", () => {
    expect(isAllowedHost("www.energievergleich.shop")).toBe(true);
    expect(isAllowedHost("energievergleich.shop")).toBe(true);
    expect(isAllowedHost("localhost:4321")).toBe(true);
    expect(isAllowedHost("127.0.0.1:4321")).toBe(true);
    expect(isAllowedHost("[::1]:4321")).toBe(true);
    expect(isAllowedHost("192.168.178.109:4321")).toBe(true);
    expect(
      isAllowedHost("127.0.0.1:4321", { allowDevelopmentHosts: false })
    ).toBe(false);
    expect(isAllowedHost("evil.example")).toBe(false);
  });

  it("normalisiert IPv6-Hosts korrekt", () => {
    expect(normalizeHost("[::1]:4321")).toBe("::1");
  });

  it("erlaubt das Einbetten im Wix Editor ueber frame-ancestors", () => {
    const developmentDirective = getFrameAncestorsDirective();
    expect(developmentDirective).toContain("https://*.wix.com");
    expect(developmentDirective).toContain("http://localhost:*");
    expect(developmentDirective).toContain("http://127.0.0.1:*");

    const productionDirective = getFrameAncestorsDirective({
      includeDevelopmentFrameAncestors: false,
    });
    expect(productionDirective).not.toContain("http://localhost:*");
    expect(productionDirective).not.toContain("http://127.0.0.1:*");
  });

  it("akzeptiert nur gueltige deutsche PLZ-Werte", () => {
    expect(PLZSchema.safeParse("40210").success).toBe(true);
    expect(PLZSchema.safeParse("4021").success).toBe(false);
    expect(PLZSchema.safeParse("40A10").success).toBe(false);
  });
});

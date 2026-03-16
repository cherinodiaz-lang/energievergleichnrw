import { describe, expect, it } from "vitest";

import { isAllowedHost, isLocalHost, PLZSchema } from "@/lib/security";

describe("security", () => {
  it("erlaubt nur Hosts aus der Whitelist", () => {
    expect(isAllowedHost("www.energievergleich.shop")).toBe(true);
    expect(isAllowedHost("energievergleich.shop")).toBe(true);
    expect(isAllowedHost("localhost:4321")).toBe(true);
    expect(isAllowedHost("127.0.0.1:4321")).toBe(true);
    expect(isAllowedHost("evil.example")).toBe(false);
  });

  it("erkennt lokale Preview-Hosts", () => {
    expect(isLocalHost("localhost:4321")).toBe(true);
    expect(isLocalHost("127.0.0.1:4321")).toBe(true);
    expect(isLocalHost("www.energievergleich.shop")).toBe(false);
  });

  it("akzeptiert nur gueltige deutsche PLZ-Werte", () => {
    expect(PLZSchema.safeParse("40210").success).toBe(true);
    expect(PLZSchema.safeParse("4021").success).toBe(false);
    expect(PLZSchema.safeParse("40A10").success).toBe(false);
  });
});

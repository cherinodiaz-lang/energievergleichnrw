import { describe, expect, it } from "vitest";
import NotFoundPage from "@/components/pages/NotFoundPage";
import HomePage from "@/components/pages/HomePage";
import StromGrundversorgungArticle from "@/components/pages/ratgeber/articles/StromGrundversorgungArticle";
import {
  hasResolvedPage,
  normalizePathname,
  resolvePageComponent,
} from "@/lib/page-registry";

describe("page-registry", () => {
  it("normalizes trailing slashes and absolute urls", () => {
    expect(normalizePathname("https://www.energievergleich.shop/ratgeber/strom/"))
      .toBe("/ratgeber/strom");
    expect(normalizePathname("/")).toBe("/");
  });

  it("resolves known static and article routes", () => {
    expect(resolvePageComponent("/")).toBe(HomePage);
    expect(resolvePageComponent("/ratgeber/strom/grundversorgung")).toBe(
      StromGrundversorgungArticle,
    );
    expect(hasResolvedPage("/ratgeber/strom/grundversorgung/")).toBe(true);
  });

  it("falls back to the not found page for unknown routes", () => {
    expect(resolvePageComponent("/unbekannt")).toBe(NotFoundPage);
    expect(hasResolvedPage("/unbekannt")).toBe(false);
  });
});

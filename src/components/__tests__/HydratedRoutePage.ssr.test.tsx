// @vitest-environment node
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import AstroRouterProvider from "@/components/AstroRouterProvider";
import HydratedRoutePage from "@/components/HydratedRoutePage";

describe("hydrated route wrappers", () => {
  it("renders the resolved page for static routes without a Page prop", () => {
    const html = renderToString(<HydratedRoutePage path="/impressum" />);

    expect(html).toContain("Rechtliche Informationen");
    expect(html).toContain("1. Angaben gemäß § 5 TMG");
  });

  it("renders article routes from the pathname resolver", () => {
    const html = renderToString(
      <AstroRouterProvider path="/ratgeber/strom/grundversorgung" />,
    );

    expect(html).toContain("Stromgrundversorgung: Was Sie wissen");
    expect(html).toContain("Was ist Stromgrundversorgung?");
  });
});

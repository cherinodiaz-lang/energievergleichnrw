import type { ComponentType } from "react";
import { BrowserRouter, StaticRouter } from "react-router-dom";
import EditorBridge from "@/components/EditorBridge";

interface HydratedRoutePageProps {
  path: string;
  Page: ComponentType;
}

export default function HydratedRoutePage({ path, Page }: HydratedRoutePageProps) {
  if (typeof window === "undefined") {
    return (
      <StaticRouter location={path}>
        <Page />
      </StaticRouter>
    );
  }

  return (
    <>
      <EditorBridge />
      <BrowserRouter>
        <Page />
      </BrowserRouter>
    </>
  );
}

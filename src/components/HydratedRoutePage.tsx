import type { ComponentType } from "react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

interface HydratedRoutePageProps {
  path: string;
  Page: ComponentType;
}

export default function HydratedRoutePage({ path, Page }: HydratedRoutePageProps) {
  if (import.meta.env.SSR) {
    return (
      <MemoryRouter initialEntries={[path]}>
        <Page />
      </MemoryRouter>
    );
  }

  return (
    <BrowserRouter>
      <Page />
    </BrowserRouter>
  );
}

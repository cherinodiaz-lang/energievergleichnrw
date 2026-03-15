import type { ReactNode } from 'react';
import { BrowserRouter, StaticRouter } from 'react-router';

interface AstroRouterProviderProps {
  path: string;
  children: ReactNode;
}

export default function AstroRouterProvider({ path, children }: AstroRouterProviderProps) {
  if (import.meta.env.SSR) {
    return <StaticRouter location={path}>{children}</StaticRouter>;
  }

  return <BrowserRouter>{children}</BrowserRouter>;
}

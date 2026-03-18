import type { ReactNode } from 'react';
import { BrowserRouter, StaticRouter } from 'react-router-dom';

interface AstroRouterProviderProps {
  path: string;
  children: ReactNode;
}

export default function AstroRouterProvider({ path, children }: AstroRouterProviderProps) {
  if (typeof window === 'undefined') {
    return <StaticRouter location={path}>{children}</StaticRouter>;
  }

  return <BrowserRouter>{children}</BrowserRouter>;
}

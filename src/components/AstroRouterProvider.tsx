import type { ReactNode } from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

interface AstroRouterProviderProps {
  path: string;
  children: ReactNode;
}

export default function AstroRouterProvider({ path, children }: AstroRouterProviderProps) {
  if (import.meta.env.SSR) {
    return <MemoryRouter initialEntries={[path]}>{children}</MemoryRouter>;
  }

  return <BrowserRouter>{children}</BrowserRouter>;
}

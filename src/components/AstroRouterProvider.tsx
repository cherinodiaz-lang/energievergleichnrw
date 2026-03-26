import type { ComponentType, ReactNode } from 'react';
import { BrowserRouter, StaticRouter } from 'react-router-dom';

interface AstroRouterProviderProps {
  path: string;
  Page?: ComponentType;
  children?: ReactNode;
}

export default function AstroRouterProvider({ path, Page, children }: AstroRouterProviderProps) {
  const content = Page ? <Page /> : children;

  if (typeof window === 'undefined') {
    return <StaticRouter location={path}>{content}</StaticRouter>;
  }

  return <BrowserRouter>{content}</BrowserRouter>;
}

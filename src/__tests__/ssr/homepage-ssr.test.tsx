// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import HomePage from '@/components/pages/HomePage';

function renderHomePageSsr() {
  return renderToString(
    <StaticRouter location="/">
      <HomePage />
    </StaticRouter>,
  );
}

describe('HomePage SSR', () => {
  it('renders without browser-only APIs in the critical path', () => {
    expect(() => renderHomePageSsr()).not.toThrow();
  });

  it('includes main and the hero headline in SSR HTML', () => {
    const html = renderHomePageSsr();

    expect(html).toContain('<main');
    expect(html).toContain('Energie wechseln.');
  });
});

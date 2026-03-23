import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import SEOHead from '@/components/SEOHead'

function renderSEOHead(ui: React.ReactElement, initialEntries = ['/']) {
  return render(<MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>)
}

describe('SEOHead', () => {
  it('keeps backward compatibility while head tags are emitted server-side', () => {
    const { container } = renderSEOHead(
      <SEOHead
        title="Stromvergleich NRW"
        description="Vergleichen Sie Stromtarife in NRW."
        canonical="/stromvergleich-nrw/"
        keywords="stromvergleich, nrw"
        ogTitle="OG Stromvergleich"
        ogDescription="OG Beschreibung"
        twitterTitle="Twitter Stromvergleich"
        twitterDescription="Twitter Beschreibung"
      />,
      ['/stromvergleich-nrw/']
    )

    expect(container).toBeEmptyDOMElement()
    expect(document.title).toBe('')
    expect(document.head.querySelector('meta[name="description"]')).toBeNull()
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull()
  })

  it('does not mutate head state in client tests', () => {
    const { container } = renderSEOHead(
      <SEOHead
        title="Danke"
        description="Vielen Dank."
        noindex={true}
      />,
      ['/danke']
    )

    expect(container).toBeEmptyDOMElement()
    expect(document.head.querySelector('meta[name="robots"]')).toBeNull()
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull()
  })
})

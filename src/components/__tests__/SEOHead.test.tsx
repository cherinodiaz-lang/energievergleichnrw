import { render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import SEOHead from '@/components/SEOHead'

function renderSEOHead(ui: React.ReactElement, initialEntries = ['/']) {
  return render(<MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>)
}

describe('SEOHead', () => {
  it('writes core SEO tags to the document head', async () => {
    renderSEOHead(
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

    await waitFor(() => {
      expect(document.title).toBe('Stromvergleich NRW')
      expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute(
        'content',
        'Vergleichen Sie Stromtarife in NRW.'
      )
      expect(document.head.querySelector('meta[name="keywords"]')).toHaveAttribute(
        'content',
        'stromvergleich, nrw'
      )
      expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute(
        'content',
        'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
      )
      expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
        'href',
        'https://www.energievergleich.shop/stromvergleich-nrw'
      )
      expect(document.head.querySelector('meta[property="og:title"]')).toHaveAttribute(
        'content',
        'OG Stromvergleich'
      )
      expect(document.head.querySelector('meta[property="og:description"]')).toHaveAttribute(
        'content',
        'OG Beschreibung'
      )
      expect(document.head.querySelector('meta[property="og:url"]')).toHaveAttribute(
        'content',
        'https://www.energievergleich.shop/stromvergleich-nrw'
      )
      expect(document.head.querySelector('meta[name="twitter:card"]')).toHaveAttribute(
        'content',
        'summary_large_image'
      )
      expect(document.head.querySelector('meta[name="twitter:title"]')).toHaveAttribute(
        'content',
        'Twitter Stromvergleich'
      )
      expect(document.head.querySelector('meta[name="twitter:description"]')).toHaveAttribute(
        'content',
        'Twitter Beschreibung'
      )
    })
  })

  it('applies noindex robots directives when requested', async () => {
    renderSEOHead(
      <SEOHead
        title="Danke"
        description="Vielen Dank."
        noindex={true}
        pathname="/danke"
      />,
      ['/danke']
    )

    await waitFor(() => {
      expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute(
        'content',
        'noindex, nofollow'
      )
      expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
        'href',
        'https://www.energievergleich.shop/danke'
      )
    })
  })
})

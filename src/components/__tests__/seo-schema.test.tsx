import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'
import OrganizationSchema from '@/components/OrganizationSchema'
import SearchConsoleVerification from '@/components/SearchConsoleVerification'
import WebsiteSchema from '@/components/WebsiteSchema'

describe('SEO schema components', () => {
  it('keep compatibility as placeholders without mutating head state', () => {
    const { container } = render(
      <>
        <OrganizationSchema />
        <WebsiteSchema />
      </>
    )

    expect(container).toBeEmptyDOMElement()
    expect(document.getElementById('organization-schema')).toBeNull()
    expect(document.getElementById('website-schema')).toBeNull()
  })

  it('does not inject breadcrumb schema on client placeholder render', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/ratgeber/strom']}>
        <BreadcrumbSchema />
      </MemoryRouter>
    )

    expect(container).toBeEmptyDOMElement()
    expect(document.getElementById('breadcrumb-schema')).toBeNull()
  })

  it('does not inject search-console meta tags in placeholder mode', () => {
    const { rerender } = render(<SearchConsoleVerification />)

    expect(document.head.querySelector('meta[name="google-site-verification"]')).toBeNull()

    rerender(<SearchConsoleVerification verificationCode="verification-token" />)

    expect(document.head.querySelector('meta[name="google-site-verification"]')).toBeNull()
  })
})

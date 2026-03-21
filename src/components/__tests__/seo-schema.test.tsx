import { render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'
import OrganizationSchema from '@/components/OrganizationSchema'
import SearchConsoleVerification from '@/components/SearchConsoleVerification'
import WebsiteSchema from '@/components/WebsiteSchema'

describe('SEO schema components', () => {
  it('writes organization and website schemas to the head', async () => {
    render(
      <>
        <OrganizationSchema />
        <WebsiteSchema />
      </>
    )

    await waitFor(() => {
      const organizationSchema = document.getElementById('organization-schema')
      const websiteSchema = document.getElementById('website-schema')

      expect(organizationSchema).toBeInTheDocument()
      expect(websiteSchema).toBeInTheDocument()

      const organizationJson = JSON.parse(organizationSchema?.textContent ?? '{}')
      const websiteJson = JSON.parse(websiteSchema?.textContent ?? '{}')

      expect(organizationJson['@type']).toBe('Organization')
      expect(organizationJson.url).toBe('https://www.energievergleich.shop')
      expect(websiteJson['@type']).toBe('WebSite')
      expect(websiteJson.url).toBe('https://www.energievergleich.shop')
    })
  })

  it('adds breadcrumb schema for the current route', async () => {
    render(
      <MemoryRouter initialEntries={['/ratgeber/strom']}>
        <BreadcrumbSchema />
      </MemoryRouter>
    )

    await waitFor(() => {
      const breadcrumbSchema = document.getElementById('breadcrumb-schema')
      expect(breadcrumbSchema).toBeInTheDocument()

      const breadcrumbJson = JSON.parse(breadcrumbSchema?.textContent ?? '{}')
      expect(breadcrumbJson['@type']).toBe('BreadcrumbList')
      expect(breadcrumbJson.itemListElement).toHaveLength(3)
      expect(breadcrumbJson.itemListElement[0].item).toBe('https://www.energievergleich.shop/')
      expect(breadcrumbJson.itemListElement[2].item).toBe(
        'https://www.energievergleich.shop/ratgeber/strom'
      )
    })
  })

  it('adds search console verification only when a code is provided', async () => {
    const { rerender } = render(<SearchConsoleVerification />)

    expect(document.head.querySelector('meta[name="google-site-verification"]')).toBeNull()

    rerender(<SearchConsoleVerification verificationCode="verification-token" />)

    await waitFor(() => {
      expect(
        document.head.querySelector('meta[name="google-site-verification"]')
      ).toHaveAttribute('content', 'verification-token')
    })
  })
})

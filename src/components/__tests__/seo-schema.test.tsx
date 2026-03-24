import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'

describe('SEO schema components', () => {
  it('does not inject breadcrumb schema on client placeholder render', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/ratgeber/strom']}>
        <BreadcrumbSchema />
      </MemoryRouter>
    )

    expect(container).toBeEmptyDOMElement()
    expect(document.getElementById('breadcrumb-schema')).toBeNull()
  })
})

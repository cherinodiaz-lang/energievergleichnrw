import { render, screen } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Image } from '@/components/ui/image'

describe('Image SSR', () => {
  it('renders wix images on the server without accessing window', () => {
    const html = renderToString(
      <Image
        src="wix:image://v1/12d367_example/hero.png#originWidth=1200&originHeight=800"
        alt="Hero"
      />
    )

    expect(html).toContain('<img')
  })

  it('uses the same initial image src on the client as on the server', () => {
    const props = {
      src: 'wix:image://v1/12d367_example/hero.png#originWidth=1200&originHeight=800',
      alt: 'Hero',
      width: 600,
      height: 400,
    }

    const html = renderToString(<Image {...props} />)
    const serverSrc = html.match(/src="([^"]+)"/)?.[1]

    render(<Image {...props} />)

    expect(serverSrc).toBeTruthy()
    expect(screen.getByAltText('Hero')).toHaveAttribute('src', serverSrc)
  })
})

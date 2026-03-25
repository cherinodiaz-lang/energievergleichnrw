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
})

import { useLayoutEffect, useState, useRef, useCallback, useEffect } from "react"

type Size = {
  width: number
  height: number
}

export const useSize = (ref: React.RefObject<HTMLElement>, threshold: number = 50): Size | null => {
  const [size, setSize] = useState<Size | null>(null)
  const canUseDOM = typeof window !== 'undefined' && typeof ResizeObserver !== 'undefined'
  // Reference to the request animation frame numbers
  const rafNumbers = useRef<number[]>([])
  // Store the size from the first animation frame
  const pendingSize = useRef<Size | null>(null)
  const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect

  const updateSize = useCallback((newSize: Size): void => {
    setSize((currentSize) => {
      if (!currentSize) {
        return newSize
      }

      const widthDiff = Math.abs(newSize.width - currentSize.width)
      const heightDiff = Math.abs(newSize.height - currentSize.height)

      if ((widthDiff > threshold || heightDiff > threshold)) {
        return newSize
      }
      return currentSize
    })
  }, [threshold])

  useIsomorphicLayoutEffect(() => {
    if (!canUseDOM) {
      return
    }

    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect()
      if (width === 0 || height === 0) {
        return
      }

      // Initial size, set immediately
      updateSize({ width, height })
    }
  }, [canUseDOM, ref, updateSize])

  useEffect(() => {
    if (!canUseDOM || !ref.current) {
      return
    }

    const element = ref.current
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      if (width === 0 || height === 0) {
        return
      }

      // Size was changed, cancel any pending animation frames that are waiting for the size to stabilize
      rafNumbers.current.forEach(rafNumber => {
        cancelAnimationFrame(rafNumber)
      })

      rafNumbers.current = []
      pendingSize.current = { width, height }
      // Wait for 3 animation frames to ensure the size is stable
      rafNumbers.current.push(requestAnimationFrame(() => {
        rafNumbers.current.push(requestAnimationFrame(() => {
          rafNumbers.current.push(requestAnimationFrame(() => {
            // If no resize changed observed after 3 animation frames, update the size
            updateSize(pendingSize.current)
            pendingSize.current = null
          }))
        }))
      }))
    })

    observer.observe(element)

    return () => {
      observer.disconnect()
      rafNumbers.current.forEach(rafNumber => {
        cancelAnimationFrame(rafNumber)
      })
      rafNumbers.current = []
      pendingSize.current = null
    }
  }, [canUseDOM, ref, updateSize])

  // Cleanup RAF on unmount
  useEffect(() => {
    if (!canUseDOM) {
      return
    }
    return () => {
      rafNumbers.current.forEach(rafNumber => {
        cancelAnimationFrame(rafNumber)
      })
    }
  }, [canUseDOM])

  return size
}

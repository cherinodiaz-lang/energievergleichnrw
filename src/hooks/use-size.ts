import { useState, useRef, useCallback, useEffect } from "react"
import '@/components/ui/image.css'

type Size = {
  width: number
  height: number
}

export const useSize = (ref: React.RefObject<HTMLElement>, threshold: number = 50): Size | null => {
  const [size, setSize] = useState<Size | null>(null)
  const rafNumbers = useRef<number[]>([])
  const pendingSize = useRef<Size | null>(null)

  const cancelPendingFrames = useCallback(() => {
    rafNumbers.current.forEach((rafNumber) => {
      cancelAnimationFrame(rafNumber)
    })
    rafNumbers.current = []
    pendingSize.current = null
  }, [])

  const updateSize = useCallback((newSize: Size): void => {
    setSize((currentSize) => {
      if (!currentSize) {
        return newSize
      }

      const widthDiff = Math.abs(newSize.width - currentSize.width)
      const heightDiff = Math.abs(newSize.height - currentSize.height)

      if (widthDiff > threshold || heightDiff > threshold) {
        return newSize
      }

      return currentSize
    })
  }, [threshold])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const element = ref.current
    if (!element) {
      return
    }

    const commitSize = (newSize: Size) => {
      if (newSize.width === 0 || newSize.height === 0) {
        return
      }

      updateSize(newSize)
    }

    const measureInitialSize = () => {
      const { width, height } = element.getBoundingClientRect()
      commitSize({ width, height })
    }

    measureInitialSize()

    if (typeof window.ResizeObserver === "undefined") {
      return () => {
        cancelPendingFrames()
      }
    }

    const observer = new window.ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) {
        return
      }

      const { width, height } = entry.contentRect
      if (width === 0 || height === 0) {
        return
      }

      cancelPendingFrames()
      pendingSize.current = { width, height }

      rafNumbers.current.push(window.requestAnimationFrame(() => {
        rafNumbers.current.push(window.requestAnimationFrame(() => {
          rafNumbers.current.push(window.requestAnimationFrame(() => {
            if (pendingSize.current) {
              updateSize(pendingSize.current)
            }
            pendingSize.current = null
          }))
        }))
      }))
    })

    observer.observe(element)

    return () => {
      cancelPendingFrames()
      observer.disconnect()
    }
  }, [cancelPendingFrames, ref, updateSize])

  return size
}

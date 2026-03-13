import { useCallback, useEffect } from 'react'

function scrollToHash(hash, offset) {
  if (!hash || !hash.startsWith('#')) {
    return false
  }

  const target = document.getElementById(hash.slice(1))

  if (!target) {
    return false
  }

  const top = target.getBoundingClientRect().top + window.scrollY - offset

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: 'smooth',
  })

  return true
}

export function useSectionNavigation(offset = 96) {
  const handleSectionNavigation = useCallback(
    (event) => {
      const href = event.currentTarget.getAttribute('href')

      if (!href || !href.startsWith('#')) {
        return
      }

      if (!scrollToHash(href, offset)) {
        return
      }

      event.preventDefault()
      window.history.replaceState(null, '', href)
    },
    [offset],
  )

  useEffect(() => {
    if (!window.location.hash) {
      return
    }

    const frame = window.requestAnimationFrame(() => {
      scrollToHash(window.location.hash, offset)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [offset])

  return handleSectionNavigation
}

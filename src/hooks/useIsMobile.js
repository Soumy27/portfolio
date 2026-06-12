import { useEffect, useState } from 'react'

// Reactive viewport check — updates on resize / orientation change so the
// layout switches between the desktop (pinned/animated) and mobile (static)
// modes live, without needing a page reload.
export default function useIsMobile(query = '(max-width: 1280px)') {
  const get = () =>
    typeof window !== 'undefined' && window.matchMedia(query).matches

  const [isMobile, setIsMobile] = useState(get)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const sync = () => setIsMobile(mql.matches)
    // `change` is the idiomatic signal; `resize` is a belt-and-suspenders
    // fallback for browsers that don't fire it on every viewport change.
    mql.addEventListener('change', sync)
    window.addEventListener('resize', sync)
    // sync in case the viewport changed between first render and this effect
    sync()
    return () => {
      mql.removeEventListener('change', sync)
      window.removeEventListener('resize', sync)
    }
  }, [query])

  return isMobile
}

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { dynamicWords, profile } from '../data/content'
import useIsMobile from '../hooks/useIsMobile'

export default function Hero() {
  const heroRef = useRef(null)
  const wordIndex = useRef(0)
  const isMobile = useIsMobile()

  // mouse-trail clones of a rotating word across the first screen
  useEffect(() => {
    const hero = heroRef.current
    let last = 0
    const spawn = (x, y) => {
      const el = document.createElement('div')
      el.className = 'dynamic-clone'
      el.textContent = dynamicWords[wordIndex.current % dynamicWords.length]
      wordIndex.current++
      el.style.left = `${x}px`
      el.style.top = `${y}px`
      document.body.appendChild(el)
      gsap.fromTo(
        el,
        { opacity: 1, scale: 1 },
        {
          opacity: 0,
          scale: 0.85,
          duration: 1,
          ease: 'power2.out',
          onComplete: () => el.remove(),
        }
      )
    }
    const move = (e) => {
      const now = performance.now()
      if (now - last < 90) return
      last = now
      const r = hero.getBoundingClientRect()
      if (e.clientY >= r.top && e.clientY <= r.bottom) spawn(e.clientX, e.clientY)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return (
    <section className="hero" ref={heroRef}>
      {isMobile && (
        <div className="hero-landing">
          <p className="hero-landing-motto font-mono">{profile.motto}</p>
          <div className="hero-landing-folio">
            {profile.wordmark} - <span className="ff-italic">Folio</span>
          </div>
        </div>
      )}
    </section>
  )
}

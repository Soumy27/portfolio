import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile } from '../data/content'
import useIsMobile from '../hooks/useIsMobile'

gsap.registerPlugin(ScrollTrigger)

export default function Header({ onAbout }) {
  const nameRef = useRef(null)
  const rowRef = useRef(null)
  const folioBigRef = useRef(null)
  const barRef = useRef(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    // mobile: static compact header (no scroll morph)
    if (isMobile) return

    const hero = document.querySelector('.hero')
    const name = nameRef.current
    if (!hero || !name) return

    const tweens = []

    // 1. NAME: big & centred at top  ->  small & top-left, as you scroll the hero
    tweens.push(
      gsap.fromTo(
        name,
        { x: () => (window.innerWidth - name.offsetWidth) / 2, scale: 1 },
        {
          x: 28,
          scale: () => 26 / parseFloat(getComputedStyle(name).fontSize),
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      )
    )

    // 2. middle row (about · motto · contact) + bottom wordmark fade out
    const fadeOut = { trigger: hero, start: 'top top', end: '45% top', scrub: true }
    tweens.push(
      gsap.to(rowRef.current, { autoAlpha: 0, y: -24, ease: 'none', scrollTrigger: fadeOut })
    )
    tweens.push(
      gsap.to(folioBigRef.current, {
        autoAlpha: 0,
        y: -24,
        ease: 'none',
        scrollTrigger: fadeOut,
      })
    )

    // 3. compact top-right bar fades in
    tweens.push(
      gsap.fromTo(
        barRef.current,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          ease: 'none',
          scrollTrigger: { trigger: hero, start: '30% top', end: '75% top', scrub: true },
        }
      )
    )

    return () => tweens.forEach((t) => (t.scrollTrigger?.kill(), t.kill()))
  }, [isMobile])

  const folio = (
    <>
      {profile.wordmark} - <span className="ff-italic">Folio</span>
    </>
  )

  return (
    <header className={`site-header${isMobile ? ' is-mobile' : ''}`}>
      <h1 className="sh-name" ref={nameRef}>
        {profile.name}
        <span className="ff-italic sh-year">{profile.landingYear}</span>
      </h1>

      <div className="sh-row font-mono" ref={rowRef}>
        <span className="sh-link" onClick={onAbout}>
          (About)
        </span>
        <span className="sh-motto">{profile.motto}</span>
        <a className="sh-link" href={`mailto:${profile.email}`}>
          (Contact)
        </a>
      </div>

      <div className="sh-folio-big" ref={folioBigRef}>
        {folio}
      </div>

      <div className="sh-bar font-mono" ref={barRef}>
        <span className="sh-folio-sm">{folio}</span>
        <a className="sh-link" href={`mailto:${profile.email}`}>
          (Contact)
        </a>
        <span className="sh-link" onClick={onAbout}>
          (About)
        </span>
      </div>
    </header>
  )
}

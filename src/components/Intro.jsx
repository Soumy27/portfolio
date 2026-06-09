import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { profile } from '../data/content'

export default function Intro({ onComplete }) {
  const root = useRef(null)

  useEffect(() => {
    const el = root.current
    const q = gsap.utils.selector(el)

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => onComplete?.(),
    })

    tl.set(el, { autoAlpha: 1 })
      // name rises in
      .fromTo(
        q('.intro-name .rise'),
        { yPercent: 110 },
        { yPercent: 0, duration: 1, stagger: 0.08 }
      )
      // supporting text fades up
      .fromTo(
        q('.intro-fade'),
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08 },
        '-=0.6'
      )
      // metallic strip grows
      .fromTo(
        q('.intro-strip'),
        { scaleY: 0, transformOrigin: 'bottom' },
        { scaleY: 1, duration: 0.9 },
        '-=0.8'
      )
      // hold a beat
      .to({}, { duration: 1.2 })
      // lift everything away to reveal the site
      .to(el, { yPercent: -100, duration: 1.0, ease: 'power4.inOut' })
      .set(el, { display: 'none' })

    return () => tl.kill()
  }, [onComplete])

  return (
    <div className="intro-landing" ref={root}>
      <h1 className="intro-name">
        <span className="lines-wrap">
          <span className="rise up">{profile.name}</span>
        </span>
        <span className="lines-wrap">
          <span className="rise yr">{profile.landingYear}</span>
        </span>
      </h1>

      <div className="intro-row font-mono">
        <span className="intro-fade">(About)</span>
        <span className="intro-fade">{profile.motto}</span>
        <span className="intro-fade">(Contact)</span>
      </div>

      <div className="intro-folio intro-fade">
        Design - <span className="ff-italic">Folio</span>
      </div>

      <div className="intro-strip metallic" />

      <div className="intro-tagline font-mono intro-fade">
        {profile.heroLines.map((l, i) => (
          <p key={i}>{l}</p>
        ))}
      </div>
    </div>
  )
}

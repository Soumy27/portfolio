import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { profile, folders } from '../data/content'

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin)

function FolderIcon() {
  return (
    <svg viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17 1.78A2.86 2.86 0 0 0 19.64 3.56H37A3 3 0 0 1 40 6.56V29a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h11.36A2.86 2.86 0 0 1 17 1.78Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Footer() {
  const root = useRef(null)

  useEffect(() => {
    const els = root.current.querySelectorAll('.folder')
    els.forEach((el, i) => {
      gsap.set(el, {
        x: 40 + i * 120,
        y: -40 - i * 10,
        rotation: gsap.utils.random(-8, 8),
      })
    })
    const drags = Draggable.create(els, {
      bounds: root.current,
      inertia: true,
      edgeResistance: 0.7,
    })
    return () => drags.forEach((d) => d.kill())
  }, [])

  // smooth fade-up reveal of the footer content as it scrolls into view
  useEffect(() => {
    const el = root.current
    const targets = [
      el.querySelector('.outro-headline'),
      el.querySelector('.back-to-top'),
      el.querySelector('.footer-bottom'),
    ].filter(Boolean)
    const tween = gsap.fromTo(
      targets,
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: el, start: 'top 65%' },
      }
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="outro" ref={root}>
      <div className="metallic metallic-bg" />

      <h4 className="outro-headline">
        {profile.outro.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </h4>

      <div className="back-to-top" onClick={toTop}>
        <div className="btt-btn">
          <svg viewBox="0 0 18 19" fill="none">
            <path
              d="M9 0c.27 0 .52.1.71.29l8 8a1 1 0 0 1-1.42 1.42L10 3.41V18a1 1 0 1 1-2 0V3.41L1.71 9.71A1 1 0 0 1 .29 8.29l8-8C8.48.1 8.73 0 9 0Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <span>Back to Top</span>
      </div>

      <div className="footer-bottom">
        <div className="footer-mark">{profile.footerMark}</div>

        <div className="footer-info-txt">
          <span>{profile.credit}</span>
          <div className="links">
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
        </div>
      </div>

      {folders.map((f) => (
        <a
          className="folder"
          key={f.label}
          href={f.href}
          target="_blank"
          rel="noreferrer"
        >
          <FolderIcon />
          <span>{f.label}</span>
        </a>
      ))}
    </footer>
  )
}

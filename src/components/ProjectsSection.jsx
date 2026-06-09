import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects, services } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

const Arrow = () => (
  <svg className="card-arrow" viewBox="0 0 28 28" fill="none">
    <path
      d="M7.4 19 17.07 9.33H10.56a1.17 1.17 0 1 1 0-2.33h9.27c.65 0 1.17.52 1.17 1.17v9.33a1.17 1.17 0 0 1-2.34 0v-6.48L9.09 20.66a1.17 1.17 0 1 1-1.69-1.66Z"
      fill="currentColor"
    />
  </svg>
)

// Where each card lands, as a fraction of the viewport from centre, + tilt.
// Four quadrants so every card stays visible (minimal overlap).
const scatter = [
  { x: -0.25, y: -0.18, r: -7 }, // top-left
  { x: 0.25, y: -0.18, r: 6 }, // top-right
  { x: -0.25, y: 0.18, r: 5 }, // bottom-left
  { x: 0.25, y: 0.18, r: -6 }, // bottom-right
]

export default function ProjectsSection() {
  const section = useRef(null)
  const serviceRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const vw = () => window.innerWidth
    const vh = () => window.innerHeight
    const cards = cardsRef.current.querySelectorAll('.card')
    const serviceItems = serviceRef.current.querySelectorAll('h3')
    const titleChars = titleRef.current.querySelectorAll('span > i')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        start: 'top 60%',
        end: 'bottom bottom',
        scrub: 1,
      },
    })

    // 1. big PROJECTS title in then out (appears right away — no empty gap)
    tl.to(titleRef.current, { opacity: 1, duration: 0.01 }, 0)
      .fromTo(
        titleChars,
        { yPercent: 110 },
        { yPercent: 0, stagger: 0.03, duration: 0.5 },
        0
      )
      .to(titleRef.current, { opacity: 0, scale: 1.1, duration: 0.4 }, 0.7)

      // 2. cards scatter in, hold, then leave
      .to(cardsRef.current, { autoAlpha: 1, duration: 0.01 }, 0.9)
      .fromTo(
        cards,
        {
          opacity: 0,
          y: () => vh() * 0.6,
          rotation: (i) => scatter[i % scatter.length].r * 2,
        },
        {
          opacity: 1,
          x: (i) => vw() * scatter[i % scatter.length].x,
          y: (i) => vh() * scatter[i % scatter.length].y,
          rotation: (i) => scatter[i % scatter.length].r,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power3.out',
        },
        0.9
      )
      // cards fully gone (visibility:hidden) BEFORE skills become interactive
      .to(cardsRef.current, { autoAlpha: 0, duration: 0.4 }, 2.2)

      // 3. services / skills list reveals LAST (below the cards)
      .to(serviceRef.current, { opacity: 1, duration: 0.01 }, 2.6)
      .fromTo(
        serviceItems,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.06, duration: 0.5 },
        2.6
      )

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <section className="projects-section" ref={section}>
      <div className="projects-sticky">
        <div className="service-list" ref={serviceRef} style={{ opacity: 0 }}>
          {services.map((s) => (
            <h3 key={s}>{s}</h3>
          ))}
        </div>

        <div className="projects-title" ref={titleRef} style={{ opacity: 0 }}>
          <h1>
            <span>
              {'projects'.split('').map((c, i) => (
                <i
                  key={i}
                  style={{
                    display: 'inline-block',
                    fontFamily:
                      c === 'o' ? 'var(--font-serif)' : 'var(--font-sans)',
                    fontStyle: c === 'o' ? 'italic' : 'normal',
                  }}
                >
                  {c}
                </i>
              ))}
            </span>
          </h1>
        </div>

        <div
          className="cards-layer"
          ref={cardsRef}
          style={{ opacity: 0, visibility: 'hidden' }}
        >
          {projects.map((p, i) => (
            <div className="card-pos" key={i} style={{ zIndex: 10 + i }}>
              <a
                className="card"
                href={p.href}
                data-cursor="View"
                target={p.href?.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
              >
                <div
                  className="card-img"
                  style={
                    p.bg
                      ? { background: p.bg }
                      : undefined
                  }
                >
                  {p.image ? <img src={p.image} alt={p.title} /> : null}
                </div>
                <div className="card-content">
                  <div>
                    <h2>{p.title}</h2>
                    <p>{p.description}</p>
                  </div>
                  <Arrow />
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

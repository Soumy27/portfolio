import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function ShowreelCube() {
  const section = useRef(null)
  const textRef = useRef(null)

  // break the intro into lines for the masked reveal
  const introLines = profile.intro.split(' ').reduce((acc, word, i) => {
    const chunk = Math.floor(i / 6)
    acc[chunk] = (acc[chunk] ? acc[chunk] + ' ' : '') + word
    return acc
  }, [])

  useEffect(() => {
    const text = textRef.current
    // scrubbed: fade IN as the section enters, hold, fade OUT as it leaves
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
    tl.fromTo(
      text,
      { autoAlpha: 0, y: 90 },
      { autoAlpha: 1, y: 0, ease: 'none', duration: 1 }
    )
      .to(text, { duration: 0.5 }) // hold fully visible while centred
      .to(text, { autoAlpha: 0, y: -90, ease: 'none', duration: 1 })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <section className="cube-section" ref={section}>
      <div className="cube-sticky">
        <div className="metallic metallic-bg" />

        <div className="cube-intro-text" ref={textRef}>
          <h4>
            {introLines.map((line, i) => (
              <span className="lines-wrap" key={i}>
                <span className="split-line">{line}</span>
              </span>
            ))}
          </h4>
        </div>
      </div>
    </section>
  )
}

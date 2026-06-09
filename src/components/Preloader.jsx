import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { profile } from '../data/content'

export default function Preloader({ onComplete }) {
  const root = useRef(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const obj = { v: 0 }
    const tl = gsap.timeline({
      onComplete: () => onComplete?.(),
    })
    tl.to(obj, {
      v: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(obj.v)),
    })
      .to('.preloader .reveal', {
        yPercent: -120,
        duration: 0.6,
        ease: 'power3.in',
        stagger: 0.05,
      })
      .to(
        root.current,
        { yPercent: -100, duration: 0.8, ease: 'power3.inOut' },
        '-=0.1'
      )
      .set(root.current, { display: 'none' })

    return () => tl.kill()
  }, [onComplete])

  return (
    <div className="preloader" ref={root}>
      <div className="lines-wrap">
        <p className="reveal">{profile.name}</p>
      </div>
      <div className="lines-wrap">
        <p className="reveal loader-number">{count}</p>
      </div>
      <div className="lines-wrap">
        <p className="reveal">Portfolio</p>
      </div>
    </div>
  )
}

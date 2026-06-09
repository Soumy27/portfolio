import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const ref = useRef(null)
  const [label, setLabel] = useState('')

  useEffect(() => {
    const el = ref.current
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' })

    const move = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
      const target = e.target.closest('[data-cursor]')
      if (target) {
        el.classList.add('is-view')
        setLabel(target.getAttribute('data-cursor'))
      } else {
        el.classList.remove('is-view')
        setLabel('')
      }
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return (
    <div className="cursor" ref={ref}>
      <span className="cursor-label">{label}</span>
    </div>
  )
}

import { useEffect, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import DotScreenBackground from './components/DotScreenBackground'
import Cursor from './components/Cursor'
import Preloader from './components/Preloader'
import Header from './components/Header'
import AboutOverlay from './components/AboutOverlay'
import Hero from './components/Hero'
import ShowreelCube from './components/ShowreelCube'
import ProjectsSection from './components/ProjectsSection'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  // Lenis smooth scroll synced to GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    if (import.meta.env.DEV) {
      window.__lenis = lenis
      window.__ST = ScrollTrigger
    }
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    // recalc once everything is mounted
    const id = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => {
      clearTimeout(id)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    if (loaded) ScrollTrigger.refresh()
  }, [loaded])

  return (
    <>
      <DotScreenBackground />
      <Cursor />
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      <Header onAbout={() => setAboutOpen(true)} ready={loaded} />
      <AboutOverlay open={aboutOpen} onClose={() => setAboutOpen(false)} />

      <main>
        <Hero />
        <ShowreelCube />
        <ProjectsSection />
        <Footer />
      </main>
    </>
  )
}

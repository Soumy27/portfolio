import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { dotScreenShader } from '../shaders/dotScreen'

export default function DotScreenBackground() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene = new THREE.Scene()
    const camera = new THREE.Camera()

    const uniforms = {
      uResolution: { value: new THREE.Vector2() },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }

    const material = new THREE.ShaderMaterial({
      vertexShader: dotScreenShader.vertex,
      fragmentShader: dotScreenShader.fragment,
      uniforms,
    })
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
    scene.add(mesh)

    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      renderer.setSize(w, h, false)
      uniforms.uResolution.value.set(w, h)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      uniforms.uMouse.value.set(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight
      )
    }
    window.addEventListener('pointermove', onMove)

    const clock = new THREE.Clock()
    let raf
    const tick = () => {
      uniforms.uTime.value = clock.getElapsedTime()
      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      mesh.geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas id="bg-canvas" ref={ref} />
}

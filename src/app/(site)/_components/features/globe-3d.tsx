"use client"

import createGlobe from "cobe"
import { useEffect, useRef, useState } from "react"

const Globe3D = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  // Resize observer to update canvas size dynamically to container size
  useEffect(() => {
    if (!containerRef.current) return

    const updateSize = () => {
      const { width, height } = containerRef.current!.getBoundingClientRect()
      setSize({ width, height })
    }

    updateSize()

    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  useEffect(() => {
    if (!canvasRef.current || size.width === 0 || size.height === 0) return

    let phi = 0

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: size.width * 2,
      height: size.height * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: state => {
        state.phi = phi
        phi += 0.008
      },
    })

    return () => {
      globe.destroy()
    }
  }, [size])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 -z-10 opacity-30 "
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        width={size.width * 2}
        height={size.height * 2}
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </div>
  )
}

export default Globe3D

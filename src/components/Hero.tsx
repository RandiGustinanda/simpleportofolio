'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Button } from '@/components/ui/button'
import { Instagram, Linkedin, Github, Mail } from 'lucide-react'

type Leaf = {
  left: number
  top: number
  rotate: number
}

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const cloudsRef = useRef<HTMLDivElement>(null)
  const leavesRef = useRef<HTMLDivElement>(null)

  const [leaves, setLeaves] = useState<Leaf[]>([])

  useEffect(() => {
    const leafData = Array.from({ length: 6 }).map(() => ({
      left: Math.random() * 100,
      top: -Math.random() * 200,
      rotate: Math.random() * 360,
    }))
    setLeaves(leafData)
  }, [])

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -80 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    )

    gsap.fromTo(
      descRef.current,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.3, ease: 'power2.out' }
    )

    gsap.fromTo(
      btnRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, delay: 0.6, ease: 'back.out(1.7)' }
    )
  }, [])

  useEffect(() => {
    if (!cloudsRef.current) return
    const cloudChildren = Array.from(cloudsRef.current.children)

    gsap.to(cloudChildren, {
      x: '100vw',
      duration: 60,
      ease: 'linear',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % window.innerWidth),
      },
    })
  }, [])

  useEffect(() => {
    if (leaves.length === 0) return
    const leafChildren = leavesRef.current?.children
    if (!leafChildren) return

    gsap.to(Array.from(leafChildren), {
      y: '100vh',
      x: '+=100',
      rotation: 360,
      duration: 20,
      stagger: {
        each: 2,
        repeat: -1,
        yoyo: false,
      },
      ease: 'sine.inOut',
      repeat: -1,
    })
  }, [leaves])

  return (
    <section className="relative overflow-hidden h-screen flex items-center justify-center bg-gradient-to-b from-[#BEE9E8] to-[#C3F0CA] text-gray-900 px-6">
      {/* Awan */}
      <div ref={cloudsRef} className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${i * 30}%`,
              top: `${20 + i * 50}px`,
              transform: `scale(${1 + i * 0.3})`,
            }}
          >
            <svg width="200" height="100" viewBox="0 0 64 32" fill="white">
              <path d="M20 20c-10 0-10-10 0-10 0-10 20-10 20 0 10 0 10 10 0 10H20z" />
            </svg>
          </div>
        ))}
      </div>

      {/* Daun */}
      <div ref={leavesRef} className="absolute inset-0 z-10 pointer-events-none">
        {leaves.map((leaf, i) => (
          <svg
            key={i}
            className="absolute w-6 h-6 text-green-600 opacity-70"
            style={{
              left: `${leaf.left}%`,
              top: `${leaf.top}px`,
              transform: `rotate(${leaf.rotate}deg)`,
            }}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C8 6 6 10 6 14c0 3.313 2.687 6 6 6s6-2.687 6-6c0-4-2-8-6-12z" />
          </svg>
        ))}
      </div>

      {/* Konten utama */}
      <div className="relative z-20 flex flex-col md:flex-row items-center max-w-6xl w-full gap-12">
        {/* Video kiri */}
        <div className="shrink-0">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <video
              src="/randi.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Teks kanan */}
        <div className="text-center md:text-left flex-1">
          <h1 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-4">
            Halo, Saya Randi
          </h1>

          <p ref={descRef} className="text-lg mb-6 max-w-xl mx-auto md:mx-0">
            Saya seorang Frontend Developer yang suka menggabungkan teknologi, animasi, dan desain untuk membangun pengalaman web yang menyenangkan.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6 justify-center md:justify-start">
            <Button ref={btnRef} size="lg">
              Lihat Proyek Saya
            </Button>

            {/* Sosial media */}
            <div className="flex space-x-4">
              <a href="https://instagram.com/username" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="w-6 h-6 hover:scale-110 transition-transform duration-200" />
              </a>
              <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-6 h-6 hover:scale-110 transition-transform duration-200" />
              </a>
              <a href="https://github.com/username" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="w-6 h-6 hover:scale-110 transition-transform duration-200" />
              </a>
              <a href="mailto:randi@email.com" aria-label="Email">
                <Mail className="w-6 h-6 hover:scale-110 transition-transform duration-200" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

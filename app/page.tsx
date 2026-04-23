import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'DJ Catan — Full-Stack Developer',
  description: 'Full-stack developer building thoughtful digital products. View my work and get in touch.',
}

export default function Home() {
  return (
    <>
      {/* Side rails — decorative vertical lines */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, bottom: 0, width: 1,
          background: 'var(--rule-faint)', zIndex: 1, pointerEvents: 'none',
          left: 'max(24px, calc(50% - 720px + 24px))',
        }}
        className="rail-hide"
      />
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, bottom: 0, width: 1,
          background: 'var(--rule-faint)', zIndex: 1, pointerEvents: 'none',
          right: 'max(24px, calc(50% - 720px + 24px))',
        }}
        className="rail-hide"
      />

      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />

      <style>{`
        @media (max-width: 900px) { .rail-hide { display: none; } }
      `}</style>
    </>
  )
}

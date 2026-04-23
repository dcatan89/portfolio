'use client'
import { useEffect, useRef, useState } from 'react'
import type { Project } from '@/lib/projects'

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
)

function WorkItem({ project, index, onEnter, onLeave }: {
  project: Project
  index: number
  onEnter: (name: string) => void
  onLeave: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const num = String(index + 1).padStart(3, '0')

  const handleEnter = () => { setHovered(true); onEnter(project.title) }
  const handleLeave = () => { setHovered(false); onLeave() }

  const inner = (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '60px 1.4fr 1fr auto',
        gap: 32,
        alignItems: 'center',
        padding: hovered ? '32px 24px' : '32px 8px',
        borderBottom: '1px solid var(--rule-faint)',
        transition: 'padding .35s ease',
        cursor: 'pointer',
      }}
      className="work-item-grid"
    >
      <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 12, color: 'var(--muted)' }}>
        — {num}
      </div>

      <h3 style={{
        margin: 0,
        fontFamily: 'var(--font-fraunces)',
        fontWeight: 300,
        fontSize: 'clamp(28px, 3.2vw, 44px)',
        lineHeight: 1,
        letterSpacing: '-0.02em',
        color: hovered ? 'var(--accent)' : 'var(--ink)',
        transition: 'color .3s ease',
      }}>
        {project.title}
        {project.title === 'Ledger' && (
          <span style={{ fontStyle: 'italic', color: 'var(--muted)', fontSize: '0.55em', marginLeft: 10 }}>
            (in progress)
          </span>
        )}
      </h3>

      <div style={{
        display: 'flex', flexDirection: 'column', gap: 6,
        fontFamily: 'var(--font-jetbrains-mono)',
        fontSize: 11, color: 'var(--muted)',
        letterSpacing: '0.06em', textTransform: 'uppercase',
      }} className="work-meta">
        <div>{project.category} · {project.year}</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {project.techStack.slice(0, 3).map(t => (
            <span key={t} style={{
              border: '1px solid var(--rule-faint)',
              padding: '3px 8px',
              borderRadius: 999,
              textTransform: 'none',
              letterSpacing: '0.02em',
            }}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        border: '1px solid var(--rule-faint)',
        display: 'grid', placeItems: 'center',
        background: hovered ? 'var(--accent)' : 'transparent',
        borderColor: hovered ? 'var(--accent)' : 'var(--rule-faint)',
        color: hovered ? '#fff' : 'var(--ink)',
        transform: hovered ? 'rotate(-45deg)' : 'rotate(0deg)',
        transition: 'all .3s ease',
        flexShrink: 0,
      }}>
        <ArrowIcon />
      </div>
    </div>
  )

  if (project.featured) {
    return (
      <a href={`/projects/${project.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        {inner}
      </a>
    )
  }
  return <div>{inner}</div>
}

export function WorkList({ projects }: { projects: Project[] }) {
  const [previewOn, setPreviewOn] = useState(false)
  const [previewName, setPreviewName] = useState('')
  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const targetRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    function loop() {
      setSmoothPos(prev => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.18,
        y: prev.y + (targetRef.current.y - prev.y) * 0.18,
      }))
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div style={{ borderTop: '1px solid var(--rule-faint)' }}>
        {projects.map((project, i) => (
          <WorkItem
            key={project.id}
            project={project}
            index={i}
            onEnter={(name) => { setPreviewOn(true); setPreviewName(name) }}
            onLeave={() => setPreviewOn(false)}
          />
        ))}
      </div>

      {/* Cursor-following preview */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          width: 260, height: 180,
          borderRadius: 6,
          overflow: 'hidden',
          opacity: previewOn ? 1 : 0,
          transform: `translate(${smoothPos.x}px, ${smoothPos.y}px) translate(-50%, -50%) scale(${previewOn ? 1 : 0.85})`,
          transition: 'opacity .25s ease, scale .35s cubic-bezier(.2,.8,.2,1)',
          zIndex: 40,
          boxShadow: '0 30px 60px -20px rgba(0,0,0,.3)',
          background: 'var(--bg-2)',
        }}
      >
        <div style={{
          width: '100%', height: '100%',
          display: 'grid', placeItems: 'center',
          background: `repeating-linear-gradient(45deg, color-mix(in oklab, var(--accent) 15%, transparent) 0 8px, transparent 8px 16px), var(--bg-2)`,
          color: 'var(--muted)',
          fontFamily: 'var(--font-jetbrains-mono)',
          fontSize: 10, letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          {previewName}
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .work-item-grid { grid-template-columns: 40px 1fr auto !important; gap: 16px !important; }
          .work-meta { display: none !important; }
        }
      `}</style>
    </>
  )
}

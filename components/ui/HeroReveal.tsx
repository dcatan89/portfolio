'use client'
import { useEffect, useState } from 'react'

const TICKER_ITEMS = [
  'NEXT.JS 15','REACT 19','TYPESCRIPT','PYTHON','TAILWIND v4','POSTGRES',
  'CLAUDE CODE','DISCORD.PY','MOTION','RESEND','ZOD',
]

export function HeroCharReveal() {
  const chars = ['D','J',' ','C','a','t','a','n']
  const [revealed, setRevealed] = useState<boolean[]>(chars.map(() => false))

  useEffect(() => {
    chars.forEach((_, i) => {
      setTimeout(() => {
        setRevealed(prev => {
          const next = [...prev]
          next[i] = true
          return next
        })
      }, 80 + i * 55)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <h1
      style={{
        margin: 0,
        fontFamily: 'var(--font-fraunces)',
        fontWeight: 300,
        fontSize: 'clamp(64px, 14vw, 200px)',
        lineHeight: 0.88,
        letterSpacing: '-0.03em',
        color: 'var(--ink)',
        overflow: 'hidden',
      }}
      aria-label="DJ Catan"
    >
      {/* Line 1: DJ */}
      <span style={{ display: 'block', overflow: 'hidden', lineHeight: 0.92 }}>
        {['D','J'].map((ch, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              transform: revealed[i] ? 'translateY(0)' : 'translateY(110%)',
              transition: 'transform 0.9s cubic-bezier(0.2,0.9,0.2,1)',
            }}
          >
            {ch}
          </span>
        ))}
      </span>
      {/* Line 2: Catan* */}
      <span style={{ display: 'block', overflow: 'hidden', lineHeight: 0.92 }}>
        {['C','a','t','a','n'].map((ch, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              transform: revealed[i + 3] ? 'translateY(0)' : 'translateY(110%)',
              transition: 'transform 0.9s cubic-bezier(0.2,0.9,0.2,1)',
            }}
          >
            {ch}
          </span>
        ))}
        <span
          style={{
            display: 'inline-block',
            fontStyle: 'italic',
            color: 'var(--accent)',
            transform: revealed[7] ? 'translateY(0)' : 'translateY(110%)',
            transition: 'transform 0.9s cubic-bezier(0.2,0.9,0.2,1)',
          }}
        >
          *
        </span>
      </span>
    </h1>
  )
}

export function HeroTicker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div
      style={{
        marginTop: 64,
        borderTop: '1px solid var(--rule-faint)',
        borderBottom: '1px solid var(--rule-faint)',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <div
        style={{
          display: 'flex',
          gap: 56,
          padding: '14px 0',
          width: 'max-content',
          animation: 'ticker 40s linear infinite',
          fontFamily: 'var(--font-jetbrains-mono)',
          fontSize: 12,
          color: 'var(--muted)',
          whiteSpace: 'nowrap',
          letterSpacing: '0.06em',
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            {item}
            {i < doubled.length - 1 && (
              <span style={{ color: 'var(--accent)', opacity: 0.5 }}>●</span>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

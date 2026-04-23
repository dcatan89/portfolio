'use client'
import { Fragment } from 'react'
import { HeroCharReveal, HeroTicker } from '@/components/ui/HeroReveal'

export function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        padding: '132px 0 80px',
        borderBottom: '1px solid var(--rule-faint)',
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          padding: '0 40px',
        }}
      >
        {/* Hero meta grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '100px 1fr',
            gap: '14px 18px',
            fontFamily: 'var(--font-jetbrains-mono)',
            fontSize: 12,
            marginBottom: 48,
            maxWidth: 480,
          }}
        >
          {[
            { k: 'INDEX', v: '001 / Portfolio' },
            { k: 'ROLE', v: 'Full-Stack Engineer' },
            { k: 'BASED', v: 'Pacific Northwest, US' },
            { k: 'STATUS', v: "● Available — Summer '26", accent: true },
          ].map(({ k, v, accent }) => (
            <Fragment key={k}>
              <span style={{ color: 'var(--faint)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 11 }}>{k}</span>
              <span style={{ color: accent ? 'var(--accent)' : 'var(--ink-2)' }}>{v}</span>
            </Fragment>
          ))}
        </div>

        {/* Hero grid — name left, sub right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 40,
            alignItems: 'end',
          }}
          className="hero-main-grid"
        >
          <HeroCharReveal />

          <div
            style={{
              display: 'grid',
              gap: 28,
              maxWidth: 440,
              marginLeft: 'auto',
              paddingBottom: 12,
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 15,
                lineHeight: 1.6,
                color: 'var(--ink-2)',
              }}
            >
              Full-stack developer shipping{' '}
              <span style={{ color: 'var(--ink)', borderBottom: '1px solid var(--accent)', paddingBottom: 1 }}>
                thoughtful digital products
              </span>{' '}
              — an unconventional path from economics to cancer diagnostics to code, now building real tools humans actually use.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href="#work"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '12px 18px',
                  border: '1px solid var(--rule)',
                  borderRadius: 999,
                  fontFamily: 'var(--font-jetbrains-mono)',
                  fontSize: 12, letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  background: 'var(--ink)', color: 'var(--bg)',
                  textDecoration: 'none',
                  transition: 'background .2s, border-color .2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--accent)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--ink)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--rule)'; }}
              >
                Selected Work
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 10L10 2M10 2H3.5M10 2V8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </a>
              <a
                href="#contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '12px 18px',
                  border: '1px solid var(--rule-faint)',
                  borderRadius: 999,
                  fontFamily: 'var(--font-jetbrains-mono)',
                  fontSize: 12, letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  transition: 'color .2s, border-color .2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--ink)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--ink)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--rule-faint)'; }}
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>

        <HeroTicker />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-main-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .hero-main-grid > div:last-child {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </section>
  )
}

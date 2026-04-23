'use client'
import { NavbarMobile } from './NavbarMobile'
import { NavClock } from './NavClock'

const navLinks = [
  { label: 'About', href: '#about', idx: '01' },
  { label: 'Work', href: '#work', idx: '02' },
  { label: 'Contact', href: '#contact', idx: '03' },
]

export function Navbar() {
  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        backdropFilter: 'blur(10px)',
        background: 'color-mix(in oklab, var(--bg) 78%, transparent)',
        borderBottom: '1px solid var(--rule-faint)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          height: 56,
          maxWidth: 1440,
          margin: '0 auto',
          padding: '0 40px',
        }}
      >
        {/* Brand */}
        <a
          href="#hero"
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            fontFamily: 'var(--font-jetbrains-mono)',
            fontSize: 12, letterSpacing: '0.06em',
            color: 'var(--ink)', textDecoration: 'none',
          }}
        >
          <span
            style={{
              width: 8, height: 8, borderRadius: 2,
              background: 'var(--accent)',
              transform: 'rotate(45deg)',
              display: 'inline-block', flexShrink: 0,
            }}
          />
          DJ&nbsp;CATAN
        </a>

        {/* Center nav — hidden on mobile */}
        <nav className="hidden md:flex" style={{ gap: 28 }} aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-jetbrains-mono)',
                fontSize: 12, color: 'var(--muted)',
                textDecoration: 'none', position: 'relative',
                padding: '4px 0', transition: 'color .2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >
              <span style={{ color: 'var(--faint)', marginRight: 6 }}>{link.idx}</span>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right — clock on desktop, hamburger on mobile */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 14 }}>
          <NavClock />
          <NavbarMobile links={navLinks} />
        </div>
      </div>
    </header>
  )
}

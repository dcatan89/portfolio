'use client'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function NavbarMobile({ links }: { links: { label: string; href: string; idx: string }[] }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden"
        style={{ padding: 8, color: 'var(--ink)', background: 'none', border: 'none', cursor: 'pointer' }}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {open && (
        <div
          className="md:hidden"
          style={{
            position: 'absolute', top: 56, left: 0, right: 0, zIndex: 40,
            background: 'var(--bg)',
            borderBottom: '1px solid var(--rule-faint)',
            padding: '20px 40px',
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: 'var(--font-jetbrains-mono)',
                  fontSize: 14, color: 'var(--ink)',
                  textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10,
                }}
              >
                <span style={{ color: 'var(--faint)', fontSize: 11 }}>{link.idx}</span>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}

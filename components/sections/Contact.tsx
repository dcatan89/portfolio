'use client'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

const extIcon = (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

export function Contact() {
  return (
    <section id="contact" style={{ position: 'relative', padding: '160px 0 80px' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px' }}>

        {/* Section head */}
        <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 40, marginBottom: 0 }} className="section-head">
          <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 12, color: 'var(--muted)', paddingTop: 6 }}>
            § 03 — Contact
          </div>
          <div />
        </div>

        {/* Big mailto */}
        <AnimatedSection>
          <div style={{
            fontFamily: 'var(--font-fraunces)',
            fontWeight: 300,
            fontSize: 'clamp(52px, 9vw, 140px)',
            lineHeight: 0.92,
            letterSpacing: '-0.035em',
            maxWidth: '18ch',
            marginTop: 32,
          }}>
            Got an idea worth building?{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 300 }}>Say hello</em>{' '}
            —{' '}
            <a
              href="mailto:danieljcatan@gmail.com"
              className="contact-mailto"
              style={{
                position: 'relative',
                display: 'inline-block',
                borderBottom: '2px solid var(--ink)',
                transition: 'color .3s, border-color .3s',
                color: 'inherit',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.color = 'var(--accent)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.color = 'var(--ink)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--ink)'
              }}
            >
              danieljcatan@gmail.com.
            </a>
          </div>
        </AnimatedSection>

        {/* Contact grid */}
        <div
          style={{
            marginTop: 80,
            display: 'grid',
            gridTemplateColumns: '140px 1fr 1fr 1fr 1fr',
            gap: 32,
            paddingTop: 32,
            borderTop: '1px solid var(--rule-faint)',
          }}
          className="contact-grid"
        >
          <div />

          {/* Email */}
          <div>
            <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Email</div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
              <li>
                <a
                  href="mailto:danieljcatan@gmail.com"
                  style={{ fontSize: 14, color: 'var(--ink)', display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink)')}
                >
                  danieljcatan@gmail.com {extIcon}
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Social</div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
              <li>
                <a
                  href="https://github.com/dcatan89"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 14, color: 'var(--ink)', display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink)')}
                >
                  GitHub {extIcon}
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/daniel-catan"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 14, color: 'var(--ink)', display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink)')}
                >
                  LinkedIn {extIcon}
                </a>
              </li>
            </ul>
          </div>

          {/* Currently */}
          <div>
            <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Currently</div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
              <li style={{ fontSize: 14, color: 'var(--ink)' }}>Available for full-time + contract</li>
              <li style={{ fontSize: 14, color: 'var(--muted)' }}>Replying within 24h</li>
            </ul>
          </div>

          {/* Elsewhere */}
          <div>
            <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Elsewhere</div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
              <li>
                <a
                  href="/resume.pdf"
                  download
                  style={{ fontSize: 14, color: 'var(--ink)', display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink)')}
                >
                  /resume.pdf {extIcon}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        #contact ul { list-style: none !important; padding: 0 !important; margin: 0 !important; }
        #contact li { list-style: none !important; list-style-type: none !important; }
        #contact li::before, #contact li::marker { display: none !important; content: none !important; }
        @media (max-width: 640px) {
          .contact-mailto { word-break: break-all !important; }
        }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr 1fr !important; }
          .contact-grid > div:first-child { display: none; }
          .section-head { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

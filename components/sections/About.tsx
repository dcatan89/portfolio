import { AnimatedSection } from '@/components/ui/AnimatedSection'

const stats = [
  { k: 'Yrs shipping', v: '6', sub: 'full-stack' },
  { k: 'Projects', v: '24', sub: 'personal + client' },
  { k: 'Commands', v: '86', sub: 'live in production' },
  { k: 'Coffee / day', v: '3.2', sub: 'sample size: 1' },
]

export function About() {
  return (
    <section id="about" style={{ position: 'relative', padding: '120px 0', borderBottom: '1px solid var(--rule-faint)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px' }}>

        {/* Section head */}
        <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 40, marginBottom: 64 }} className="section-head">
          <AnimatedSection>
            <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 12, color: 'var(--muted)', paddingTop: 6 }}>
              § 01 — About
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.08}>
            <h2 style={{
              margin: 0,
              fontFamily: 'var(--font-fraunces)',
              fontWeight: 300,
              fontSize: 'clamp(34px, 4.4vw, 64px)',
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              maxWidth: '14ch',
            }}>
              An unconventional <em style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 300 }}>path</em>, sharpened into a point.
            </h2>
          </AnimatedSection>
        </div>

        {/* About grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1fr', gap: 40 }} className="about-grid">
          <div />
          <AnimatedSection>
            <p style={{
              fontFamily: 'var(--font-fraunces)',
              fontWeight: 300,
              fontSize: 'clamp(22px, 2.2vw, 30px)',
              lineHeight: 1.28,
              letterSpacing: '-0.01em',
              color: 'var(--ink)',
              margin: 0,
            }}>
              Economics degree. Cancer diagnostic lab tech. Self-taught coder. Bootcamp graduate. Every chapter trained a different muscle for how I{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>think</em>,{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>read problems</em>, and{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>ship</em>.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.16}>
            <div style={{ display: 'grid', gap: 18, color: 'var(--ink-2)', maxWidth: '42ch' }}>
              <p style={{ margin: 0 }}>
                I care about writing clean, purposeful code — and staying close to how developers actually work. These days that means treating tools like Claude Code not as autocomplete, but as a real productivity multiplier in daily workflows.
              </p>
              <p style={{ margin: 0 }}>
                I build things end-to-end. Schema to deploy, copy to microcopy, pixels to pipelines. If it gets shipped, I probably touched every layer.
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* Stat cards */}
        <div
          style={{
            marginTop: 56,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
            background: 'var(--rule-faint)',
            border: '1px solid var(--rule-faint)',
          }}
          className="stat-cards"
        >
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.k} delay={i * 0.08}>
              <div style={{
                background: 'var(--bg)',
                padding: 24,
                display: 'grid',
                gap: 8,
                minHeight: 140,
              }}>
                <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {stat.k}
                </div>
                <div style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 300, fontSize: 28, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
                  {stat.v}
                  <small style={{ fontSize: 14, color: 'var(--muted)', display: 'block', fontFamily: 'var(--font-inter)', marginTop: 4 }}>
                    {stat.sub}
                  </small>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .section-head { grid-template-columns: 1fr !important; gap: 14px !important; margin-bottom: 40px !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .about-grid > div:first-child { display: none; }
          .stat-cards { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}

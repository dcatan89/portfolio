import { allProjects } from '@/lib/projects'
import { WorkList } from '@/components/ui/WorkList'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function Projects() {
  return (
    <section id="work" style={{ position: 'relative', padding: '120px 0', borderBottom: '1px solid var(--rule-faint)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px' }}>

        {/* Section head */}
        <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 40, marginBottom: 64 }} className="section-head">
          <AnimatedSection>
            <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 12, color: 'var(--muted)', paddingTop: 6 }}>
              § 02 — Selected Work
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
              Things I built that <em style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 300 }}>actually</em> shipped.
            </h2>
          </AnimatedSection>
        </div>

        <WorkList projects={allProjects} />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .section-head { grid-template-columns: 1fr !important; gap: 14px !important; margin-bottom: 40px !important; }
        }
      `}</style>
    </section>
  )
}

import { User } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function About() {
  return (
    <section id="about" className="px-6 py-24">
      <AnimatedSection>
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-12 md:grid-cols-2">
        {/* Photo placeholder — left column */}
        <div className="flex justify-center md:justify-start">
          <div className="flex aspect-[3/4] w-full max-w-xs items-center justify-center rounded-2xl bg-[#E8E4DF]">
            <User className="h-16 w-16 text-[#C4B8AE]" />
          </div>
        </div>

        {/* Bio — right column */}
        <div>
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            About Me
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-foreground">
            <p>
              I&apos;m a developer with an unconventional path &mdash; economics
              degree, cancer diagnostic lab technician, self-taught coder,
              bootcamp graduate &mdash; and I wouldn&apos;t have it any other
              way. Each chapter sharpened how I think and solve problems.
            </p>
            <p>
              I care about writing clean, purposeful code and staying on the
              cutting edge of how developers actually work. These days that means
              integrating AI tools like Claude Code into real workflows &mdash;
              not just using them as autocomplete, but as a genuine productivity
              multiplier.
            </p>
          </div>
        </div>
      </div>
      </AnimatedSection>
    </section>
  )
}

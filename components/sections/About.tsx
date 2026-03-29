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
              Hey, I&apos;m DJ. I build things for the web and care about getting
              the details right.
            </p>
            <p>
              With a background spanning full-stack development, I focus on
              creating digital products that are as thoughtful under the hood as
              they are on the surface.
            </p>
            <p>
              When I&apos;m not coding, you can find me exploring new ideas,
              learning something new, or finding ways to make complex things
              simple.
            </p>
          </div>
        </div>
      </div>
      </AnimatedSection>
    </section>
  )
}

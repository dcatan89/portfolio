import { ChevronDown } from 'lucide-react'
import { AnimatedHeroItem } from '@/components/ui/AnimatedHero'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center text-center"
    >
      {/* Name */}
      <AnimatedHeroItem delay={0}>
        <h1 className="font-display text-5xl font-bold text-foreground md:text-6xl">
          DJ Catan
        </h1>
      </AnimatedHeroItem>

      {/* Tagline */}
      <AnimatedHeroItem delay={0.1}>
        <p className="mt-4 text-base text-muted-foreground">
          Full-stack developer building thoughtful digital products.
        </p>
      </AnimatedHeroItem>

      {/* CTA + Badge group */}
      <AnimatedHeroItem delay={0.2}>
        <div className="mt-8 flex flex-col items-center gap-4">
          {/* CTA Button */}
          <a
            href="#projects"
            className="rounded-lg bg-primary px-8 py-3 font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            View My Work
          </a>

          {/* Availability Badge */}
          <div className="flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-sm text-muted-foreground">Available for work</span>
          </div>
        </div>
      </AnimatedHeroItem>

      {/* Scroll chevron */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ChevronDown className="h-6 w-6 animate-bounce text-muted-foreground" />
      </div>
    </section>
  )
}

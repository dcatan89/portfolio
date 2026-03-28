import { ChevronDown } from 'lucide-react'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center text-center"
    >
      {/* Name */}
      <h1 className="font-display text-5xl font-bold text-foreground md:text-6xl">
        DJ Catan
      </h1>

      {/* Tagline */}
      <p className="mt-4 text-base text-muted-foreground">
        Full-stack developer building thoughtful digital products.
      </p>

      {/* CTA + Badge group */}
      <div className="mt-8 flex flex-col items-center gap-4">
        {/* CTA Button */}
        <a
          href="#projects"
          className="rounded-lg bg-primary px-8 py-3 font-bold text-primary-foreground transition-colors hover:bg-primary/90"
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

      {/* Scroll chevron */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ChevronDown className="h-6 w-6 animate-bounce text-muted-foreground" />
      </div>
    </section>
  )
}

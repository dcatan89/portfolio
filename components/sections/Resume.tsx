export function Resume() {
  return (
    <section id="resume" className="px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
          Resume
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          Want the full picture? Grab my resume.
        </p>
        <a
          href="/resume.pdf"
          download
          className="mt-8 inline-block rounded-lg bg-primary px-8 py-3 font-bold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Download Resume
        </a>
      </div>
    </section>
  )
}

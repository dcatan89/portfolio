import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Image as ImageIcon } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { featuredProjects } from '@/lib/projects'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export const dynamicParams = false

export async function generateStaticParams() {
  return featuredProjects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = featuredProjects.find((p) => p.slug === slug)

  if (!project) {
    return {}
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      images: [{ url: '/og.png', width: 1200, height: 630, alt: project.title }],
    },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = featuredProjects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main id="main-content" className="px-6 py-12 md:py-24">
        <div className="mx-auto max-w-3xl">
          {/* Back link */}
          <AnimatedSection>
            <Link
              href="/#projects"
              className="rounded-sm text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              &larr; All projects
            </Link>

            {/* Page heading */}
            <h1 className="mt-8 font-display text-4xl font-bold text-foreground md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{project.description}</p>

            {/* Hero image placeholder */}
            <div className="mt-10 flex aspect-video w-full items-center justify-center rounded-xl bg-muted">
              <ImageIcon className="h-12 w-12 text-muted-foreground" />
            </div>
          </AnimatedSection>

          {/* Problem */}
          <AnimatedSection>
            <section className="pt-12">
              <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                Problem
              </h2>
              <p className="mt-4 leading-relaxed text-foreground">{project.problem}</p>
            </section>
          </AnimatedSection>

          {/* My Role */}
          <AnimatedSection>
            <section className="pt-12">
              <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                My Role
              </h2>
              <p className="mt-4 leading-relaxed text-foreground">{project.role}</p>
            </section>
          </AnimatedSection>

          {/* Key Decisions */}
          <AnimatedSection>
            <section className="pt-12">
              <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                Key Decisions
              </h2>
              <p className="mt-4 leading-relaxed text-foreground">{project.keyDecisions}</p>
            </section>
          </AnimatedSection>

          {/* Outcome */}
          <AnimatedSection>
            <section className="pt-12">
              <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                Outcome
              </h2>
              <p className="mt-4 leading-relaxed text-foreground">{project.outcome}</p>
            </section>
          </AnimatedSection>

          {/* Tech stack tags */}
          <div className="pt-12">
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* External links */}
          {(project.links.live || project.links.github) && (
            <div className="flex flex-wrap gap-4 pt-8">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-primary px-8 py-3 font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  View Live Site
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-border px-8 py-3 font-bold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  View on GitHub
                </a>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  )
}

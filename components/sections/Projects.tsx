import Link from 'next/link'
import { ExternalLink, GitBranch } from 'lucide-react'
import { allProjects } from '@/lib/projects'
import type { Project } from '@/lib/projects'

function ProjectCard({ project }: { project: Project }) {
  const article = (
    <article
      className={`flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md${project.featured ? ' cursor-pointer' : ''}`}
    >
      <h3 className="font-display text-xl font-bold text-foreground">{project.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      {/* Tech stack pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* External links — only for non-featured cards (featured cards link to full case study) */}
      {!project.featured && (project.links.live || project.links.github) && (
        <div className="mt-4 flex gap-3">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label="View live site"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label="View on GitHub"
            >
              <GitBranch className="h-4 w-4" />
            </a>
          )}
        </div>
      )}
    </article>
  )

  if (project.featured) {
    return (
      <Link href={`/projects/${project.slug}`} className="block">
        {article}
      </Link>
    )
  }

  return article
}

export function Projects() {
  return (
    <section id="projects" className="px-8 py-24">
      <h2 className="font-display text-3xl font-bold text-foreground">Work</h2>
      <p className="mt-4 max-w-xl text-muted-foreground">
        A selection of projects — some shipped, some experiments, all meaningful.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}

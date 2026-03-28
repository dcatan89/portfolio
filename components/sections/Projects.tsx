import { allProjects, type Project } from '@/lib/projects'
import { ExternalLink, Github } from 'lucide-react'

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* Header: title + featured badge */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-sm font-bold text-foreground">
          {project.title}
        </h3>
        {project.featured && (
          <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-sm text-primary">
            Featured
          </span>
        )}
      </div>

      {/* Description */}
      <p className="mt-2 text-sm text-muted-foreground">
        {project.description}
      </p>

      {/* Tech stack tags */}
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

      {/* Links */}
      {(project.links.live || project.links.github) && (
        <div className="mt-4 flex gap-3 border-t border-border pt-4">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} live site`}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      )}
    </article>
  )
}

export function Projects() {
  if (allProjects.length === 0) {
    return (
      <section id="projects" className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Work
          </h2>
          <p className="mt-4 text-muted-foreground">No projects yet.</p>
          <p className="text-sm text-muted-foreground">Check back soon.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
          Work
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

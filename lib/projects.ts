export interface Project {
  id: string
  slug: string
  title: string
  description: string
  techStack: string[]
  links: { live?: string; github?: string }
  featured: boolean
  problem: string
  role: string
  keyDecisions: string
  outcome: string
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'TODO-real-slug-1',
    title: 'TODO — Real Project Name',
    description:
      'A full-stack web application built to solve a real problem for real people. Placeholder: swap in your actual one-liner description before Phase 2.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    links: { live: undefined, github: undefined },
    featured: true,
    problem:
      'Placeholder: what problem did this project solve? Who had the problem, and why did existing solutions fall short?',
    role: 'Placeholder: what was your role? Did you design it, build it solo, lead a team, own a specific layer?',
    keyDecisions:
      'Placeholder: what were the 2–3 most consequential technical or product decisions? What tradeoffs did you navigate?',
    outcome:
      'Placeholder: what happened when it shipped? Metrics, user reactions, lessons learned, or what you would do differently.',
  },
  {
    id: '2',
    slug: 'TODO-real-slug-2',
    title: 'TODO — Real Project Name',
    description:
      'A developer tool or consumer product with a clear job to be done. Placeholder: swap in your actual one-liner description before Phase 2.',
    techStack: ['React', 'TypeScript', 'Node.js', 'Prisma'],
    links: { live: undefined, github: undefined },
    featured: true,
    problem:
      'Placeholder: what problem did this project solve? Who had the problem, and why did existing solutions fall short?',
    role: 'Placeholder: what was your role? Did you design it, build it solo, lead a team, own a specific layer?',
    keyDecisions:
      'Placeholder: what were the 2–3 most consequential technical or product decisions? What tradeoffs did you navigate?',
    outcome:
      'Placeholder: what happened when it shipped? Metrics, user reactions, lessons learned, or what you would do differently.',
  },
  {
    id: '3',
    slug: 'project-3',
    title: 'TODO — Non-Featured Project',
    description:
      'A side project, experiment, or open-source contribution worth showing. Placeholder: swap in your actual description before Phase 2.',
    techStack: ['TypeScript', 'Tailwind CSS'],
    links: { live: undefined, github: undefined },
    featured: false,
    problem: '',
    role: '',
    keyDecisions: '',
    outcome: '',
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const allProjects = projects

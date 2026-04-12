export interface Project {
  id: string
  slug: string
  title: string
  description: string
  techStack: string[]
  links: { live?: string; github?: string }
  featured: boolean
  image?: string
  problem: string
  role: string
  keyDecisions: string
  outcome: string
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'carrot-cake',
    title: 'Carrot Cake — Discord Assistant',
    description:
      'A full-featured Discord bot and household assistant with 86 slash commands, AI chat powered by Claude, and 30+ modular features spanning budgeting, health tracking, meal planning, and more.',
    techStack: ['Python', 'discord.py', 'Claude CLI', 'asyncio', 'aiohttp'],
    links: { live: undefined, github: undefined },
    featured: true,
    image: '/carrot-cake-demo.gif',
    problem:
      'My girlfriend and I needed a centralized way to manage our household — shared grocery lists, budget tracking, date night ideas, chore assignments, health reminders, and more. Existing apps meant juggling 10+ separate tools with no single source of truth. I wanted one place where we could manage everything through natural conversation and quick commands.',
    role: 'Solo developer. Designed the architecture, built every feature module, wrote the AI integration layer, and operate it daily as a real product for a two-person household.',
    keyDecisions:
      'Token conservation was the core constraint — the bot runs AI chat through the Claude CLI on a Max subscription (zero API cost) instead of pay-per-token. I built a regex-based intent router that handles most commands locally before ever touching AI. Features are modular Cogs that auto-load from a features/ directory, making it easy to add new capabilities without touching core code. Hit Discord\'s 100 slash command limit and solved it by auditing and demoting low-value commands to prefix-only, keeping the most-used ones as slash commands. Added dedup guards after discovering Discord can double-fire handlers when commands are registered both globally and per-guild.',
    outcome:
      'Used daily by two people for real household management. 86 slash commands across 30+ feature modules including budget tracking with overspend alerts, subscription management with monthly burn rate, AI-powered research via agent orchestration, persistent conversation memory across restarts, channel-scoped lists, and automated daily briefings. The zero-API-cost architecture means it runs indefinitely on a single subscription.',
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

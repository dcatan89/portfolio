export interface Project {
  id: string
  slug: string
  title: string
  description: string
  techStack: string[]
  links: { live?: string; github?: string }
  featured: boolean
  image?: string
  year: string
  category: string
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
      'A full-featured Discord bot and household assistant — named after our tortoiseshell cat — with 86 slash commands, AI chat powered by Claude, and 30+ modular features spanning budgeting, health tracking, meal planning, and more.',
    techStack: ['Python', 'discord.py', 'Claude CLI', 'asyncio', 'aiohttp'],
    links: { live: undefined, github: undefined },
    featured: true,
    image: '/carrot-cake-demo.gif',
    year: '2025 → now',
    category: 'Household Assistant',
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
    slug: 'ledger',
    title: 'Ledger',
    description: 'A personal budget tracker built with Next.js 15 Server Actions — clean transaction entry, category rules, and monthly summaries without the bloat of commercial apps.',
    techStack: ['Next.js 15', 'TypeScript', 'PostgreSQL', 'Server Actions', 'Tailwind CSS'],
    links: { github: undefined, live: undefined },
    featured: true,
    year: '2026',
    category: 'Budget Tracker',
    problem: 'Every budgeting app either costs money, sells your data, or buries the actual numbers under gamification. I wanted a tool that showed me exactly where money went, nothing more.',
    role: 'Full-stack — database schema, Server Actions for mutations, Tailwind UI, category rule engine.',
    keyDecisions: 'Server Actions for all mutations made the forms feel instant without client-side state management. Category rules stored as JSON allow flexible matching logic without a full DSL. PostgreSQL for the relational structure that budgets actually need.',
    outcome: 'In progress. Transaction entry and monthly summaries are working. Category rules engine is the current build focus.',
  },
  {
    id: '3',
    slug: 'hours',
    title: 'Hours',
    description: 'A terminal-native time-tracking CLI — start/stop timers, tag work sessions, and export weekly reports, all without leaving the terminal.',
    techStack: ['TypeScript', 'SQLite', 'Ink'],
    links: { github: undefined, live: undefined },
    featured: false,
    year: '2024',
    category: 'Time-tracking CLI',
    problem: '',
    role: '',
    keyDecisions: '',
    outcome: '',
  },
  {
    id: '4',
    slug: 'atlas',
    title: 'Atlas',
    description: 'A home network dashboard — live device map, bandwidth monitoring, and alert rules, served from a Raspberry Pi.',
    techStack: ['Go', 'HTMX', 'SQLite'],
    links: { github: undefined, live: undefined },
    featured: false,
    year: '2023',
    category: 'Home network dashboard',
    problem: '',
    role: '',
    keyDecisions: '',
    outcome: '',
  },
  {
    id: '5',
    slug: 'pantry',
    title: 'Pantry',
    description: 'A meal-planning engine — input what\'s in your fridge, get a week of recipes with a consolidated shopping list.',
    techStack: ['Python', 'FastAPI', 'Prisma'],
    links: { github: undefined, live: undefined },
    featured: false,
    year: '2023',
    category: 'Meal-planning engine',
    problem: '',
    role: '',
    keyDecisions: '',
    outcome: '',
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const allProjects = projects

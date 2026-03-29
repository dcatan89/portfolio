import { NavbarMobile } from './NavbarMobile'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        {/* Brand — left */}
        <a href="#hero" className="rounded-sm font-display text-base font-bold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
          DJ Catan
        </a>
        {/* Desktop nav — right, hidden on mobile */}
        <nav className="hidden gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-sm text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {link.label}
            </a>
          ))}
        </nav>
        {/* Mobile hamburger — visible on mobile only */}
        <NavbarMobile links={navLinks} />
      </div>
    </header>
  )
}

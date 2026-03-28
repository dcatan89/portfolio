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
        <a href="#hero" className="font-display text-base font-bold text-foreground">
          DJ Catan
        </a>
        {/* Desktop nav — right, hidden on mobile */}
        <nav className="hidden gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
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

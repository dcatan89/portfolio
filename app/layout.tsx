import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000'
  ),
  title: {
    default: 'DJ Catan — Developer',
    template: '%s | DJ Catan',
  },
  description: 'Full-stack developer building thoughtful digital products.',
  openGraph: {
    type: 'website',
    title: 'DJ Catan — Developer',
    description: 'Full-stack developer building thoughtful digital products.',
    url: '/',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'DJ Catan — Full-Stack Developer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DJ Catan — Developer',
    description: 'Full-stack developer building thoughtful digital products.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`scroll-smooth ${playfairDisplay.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}

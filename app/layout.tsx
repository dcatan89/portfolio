import type { Metadata } from 'next'
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
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
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased" style={{ fontFamily: 'var(--font-inter), ui-sans-serif, system-ui, sans-serif' }}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-[#c5552d] focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}

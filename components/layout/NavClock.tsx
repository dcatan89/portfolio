'use client'
import { useEffect, useState } from 'react'

export function NavClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    function tick() {
      const t = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'America/Los_Angeles',
      }).format(new Date())
      setTime(t)
    }
    tick()
    const id = setInterval(tick, 15000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="hidden items-center gap-2 md:flex" style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.04em' }}>
      <span
        style={{
          width: 6, height: 6, borderRadius: '50%',
          background: '#39a24a',
          display: 'inline-block',
          animation: 'avail-pulse 2.4s ease-out infinite',
        }}
      />
      Available — {time || '—'} PT
    </span>
  )
}

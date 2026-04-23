export function Footer() {
  return (
    <footer style={{
      maxWidth: 1440,
      margin: '0 auto',
      padding: '28px 40px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      gap: 16,
      fontFamily: 'var(--font-jetbrains-mono)',
      fontSize: 11,
      color: 'var(--muted)',
      borderTop: '1px solid var(--rule-faint)',
      flexWrap: 'wrap',
    }}>
      <div>© 2026 — DJ Catan. Built in the Pacific Northwest.</div>
      <div>v1.0 · last deploy 04.23.2026</div>
    </footer>
  )
}

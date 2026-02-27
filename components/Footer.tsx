import Link from 'next/link';

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <p
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted-soft)',
            textTransform: 'lowercase',
            letterSpacing: '0.02em',
          }}
        >
          powered by{' '}
          <a
            href="https://alfabolt.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--text-muted)' }}
          >
            alfabolt
          </a>
        </p>
        <p
          style={{
            fontSize: '0.8125rem',
            color: 'var(--text-muted-soft)',
          }}
        >
          © {new Date().getFullYear()} Native Base. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
          }}
        >
          NativeBase.AI
        </Link>

        {/* Desktop nav */}
        <nav
          className="nav-desktop"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            fontSize: '0.9375rem',
          }}
        >
          <Link href="/#how-it-works" style={{ color: 'var(--text-muted)' }}>
            How it works
          </Link>
          <Link href="/#pricing" style={{ color: 'var(--text-muted)' }}>
            Pricing
          </Link>
          <Link href="/login" style={{ color: 'var(--text)', fontWeight: 600 }}>
            Sign in
          </Link>
          <Link
            href="/#contact"
            style={{ color: 'var(--accent)', fontWeight: 600 }}
          >
            Get in touch
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="nav-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            padding: '0.25rem',
            color: 'var(--text)',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav
          className="nav-mobile"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '0',
            borderTop: '1px solid var(--border)',
            backgroundColor: 'var(--bg)',
          }}
        >
          <Link
            href="/#how-it-works"
            onClick={() => setOpen(false)}
            style={{
              padding: '0.875rem 1.5rem',
              fontSize: '0.9375rem',
              color: 'var(--text-muted)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            How it works
          </Link>
          <Link
            href="/#pricing"
            onClick={() => setOpen(false)}
            style={{
              padding: '0.875rem 1.5rem',
              fontSize: '0.9375rem',
              color: 'var(--text-muted)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            Pricing
          </Link>
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            style={{
              padding: '0.875rem 1.5rem',
              fontSize: '0.9375rem',
              color: 'var(--text)',
              fontWeight: 600,
              borderBottom: '1px solid var(--border)',
            }}
          >
            Sign in
          </Link>
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            style={{
              padding: '0.875rem 1.5rem',
              fontSize: '0.9375rem',
              color: 'var(--accent)',
              fontWeight: 600,
            }}
          >
            Get in touch
          </Link>
        </nav>
      )}

      <style jsx global>{`
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .nav-toggle { display: block !important; }
          .nav-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

const USE_CASES = [
  { label: 'Carrier Portals', href: '/use-cases/carrier-portals' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [ucOpen, setUcOpen] = useState(false);
  const [mobileUcOpen, setMobileUcOpen] = useState(false);
  const ucRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ucRef.current && !ucRef.current.contains(e.target as Node)) {
        setUcOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

          {/* Use Cases dropdown */}
          <div ref={ucRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setUcOpen((p) => !p)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                background: 'none',
                border: 'none',
                fontSize: '0.9375rem',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              Use Cases
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transition: 'transform 0.2s',
                  transform: ucOpen ? 'rotate(180deg)' : 'rotate(0)',
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {ucOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 0.5rem)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  minWidth: 200,
                  backgroundColor: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  zIndex: 100,
                }}
              >
                {USE_CASES.map((uc) => (
                  <Link
                    key={uc.href}
                    href={uc.href}
                    onClick={() => setUcOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.625rem',
                      padding: '0.625rem 1rem',
                      fontSize: '0.875rem',
                      color: 'var(--text)',
                      transition: 'background-color 0.15s',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-alt)')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                    {uc.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

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

          {/* Mobile Use Cases accordion */}
          <div style={{ borderBottom: '1px solid var(--border)' }}>
            <button
              onClick={() => setMobileUcOpen((p) => !p)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '0.875rem 1.5rem',
                fontSize: '0.9375rem',
                color: 'var(--text-muted)',
                background: 'none',
                border: 'none',
                textAlign: 'left',
              }}
            >
              Use Cases
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transition: 'transform 0.2s',
                  transform: mobileUcOpen ? 'rotate(180deg)' : 'rotate(0)',
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {mobileUcOpen && (
              <div style={{ backgroundColor: 'var(--bg-alt)' }}>
                {USE_CASES.map((uc) => (
                  <Link
                    key={uc.href}
                    href={uc.href}
                    onClick={() => { setOpen(false); setMobileUcOpen(false); }}
                    style={{
                      display: 'block',
                      padding: '0.75rem 1.5rem 0.75rem 2.5rem',
                      fontSize: '0.875rem',
                      color: 'var(--text)',
                      borderTop: '1px solid var(--border)',
                    }}
                  >
                    {uc.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

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

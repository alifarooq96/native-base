'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';

const USE_CASES = [
  {
    title: 'Freight & Logistics',
    hook: 'Automate Track & Trace across Maersk, MSC, FedEx and more',
    href: '/use-cases/freight-and-logistics',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: 'Insurance Carrier Portals',
    hook: 'Automate Quote & Bind across Progressive, Travelers, Liberty Mutual and more',
    href: '/use-cases/carrier-portals',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

const HOVER_LEAVE_DELAY_MS = 120;

export function Header() {
  const [open, setOpen] = useState(false);
  const [ucOpen, setUcOpen] = useState(false);
  const [mobileUcOpen, setMobileUcOpen] = useState(false);
  const ucRef = useRef<HTMLDivElement>(null);
  const hoverLeaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearHoverLeaveTimer() {
    if (hoverLeaveTimerRef.current) {
      clearTimeout(hoverLeaveTimerRef.current);
      hoverLeaveTimerRef.current = null;
    }
  }

  function handleUcMouseEnter() {
    clearHoverLeaveTimer();
    setUcOpen(true);
  }

  function handleUcMouseLeave() {
    hoverLeaveTimerRef.current = setTimeout(() => setUcOpen(false), HOVER_LEAVE_DELAY_MS);
  }

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

          {/* Use Cases dropdown (hover on desktop) */}
          <div
            ref={ucRef}
            style={{ position: 'relative' }}
            onMouseEnter={handleUcMouseEnter}
            onMouseLeave={handleUcMouseLeave}
          >
            <span
              className={`use-case-trigger${ucOpen ? ' is-open' : ''}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.9375rem',
                color: 'var(--text-muted)',
                cursor: 'default',
                padding: 0,
                transition: 'color 0.15s ease',
              }}
              aria-haspopup="true"
              aria-expanded={ucOpen}
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
            </span>

            {ucOpen && (
              <div
                className="use-case-dropdown-panel"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 0.5rem)',
                  left: 0,
                  minWidth: 300,
                  backgroundColor: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  overflow: 'hidden',
                  zIndex: 100,
                }}
              >
                {USE_CASES.map((uc) => (
                  <Link
                    key={uc.href}
                    href={uc.href}
                    onClick={() => setUcOpen(false)}
                    className="use-case-dropdown-item"
                  >
                    <span className="use-case-dropdown-icon">{uc.icon}</span>
                    <span className="use-case-dropdown-content">
                      <span className="use-case-dropdown-title">{uc.title}</span>
                      <span className="use-case-dropdown-hook">{uc.hook}</span>
                    </span>
                    <svg className="use-case-dropdown-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
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
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.875rem 1.5rem 0.875rem 2.5rem',
                      borderTop: '1px solid var(--border)',
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        backgroundColor: 'rgba(13,148,136,0.1)',
                        color: 'var(--accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {uc.icon}
                    </span>
                    <span style={{ minWidth: 0 }}>
                      <span style={{ display: 'block', fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text)' }}>
                        {uc.title}
                      </span>
                      <span style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
                        {uc.hook}
                      </span>
                    </span>
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
        .use-case-trigger.is-open {
          color: var(--accent) !important;
        }
        .use-case-trigger.is-open svg {
          stroke: var(--accent);
        }
        .use-case-dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1rem;
          color: inherit;
          text-decoration: none;
          transition: background-color 0.15s ease, color 0.15s ease;
          border-bottom: 1px solid var(--border);
        }
        .use-case-dropdown-item:last-child {
          border-bottom: none;
        }
        .use-case-dropdown-item:hover {
          background-color: var(--bg-alt);
        }
        .use-case-dropdown-item:hover .use-case-dropdown-title,
        .use-case-dropdown-item:hover .use-case-dropdown-icon {
          color: var(--accent) !important;
        }
        .use-case-dropdown-item:hover .use-case-dropdown-icon {
          opacity: 1;
        }
        .use-case-dropdown-icon {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: rgba(13, 148, 136, 0.08);
          color: var(--accent);
          transition: color 0.15s ease, background-color 0.15s ease;
        }
        .use-case-dropdown-item:hover .use-case-dropdown-icon {
          background: rgba(13, 148, 136, 0.12);
        }
        .use-case-dropdown-content {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }
        .use-case-dropdown-title {
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--text);
          transition: color 0.15s ease;
        }
        .use-case-dropdown-hook {
          font-size: 0.8125rem;
          color: var(--text-muted);
          line-height: 1.35;
        }
        .use-case-dropdown-chevron {
          flex-shrink: 0;
          color: var(--text-muted);
          transition: color 0.15s ease, transform 0.15s ease;
        }
        .use-case-dropdown-item:hover .use-case-dropdown-chevron {
          color: var(--accent);
          transform: translateX(2px);
        }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-toggle { display: block !important; }
          .nav-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

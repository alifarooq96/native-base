'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function DashboardHeader({ userName }: { userName: string }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  }

  const initials = userName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

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
          padding: '0.75rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link
          href="/dashboard"
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
          }}
        >
          Native Base
        </Link>

        <div ref={menuRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setOpen((p) => !p)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: 9999,
              padding: '0.25rem 0.75rem 0.25rem 0.25rem',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
          >
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: 'var(--accent)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {initials || '?'}
            </span>
            <span
              className="dash-header-name"
              style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--text)',
                maxWidth: 120,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {userName}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-muted)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transition: 'transform 0.2s',
                transform: open ? 'rotate(180deg)' : 'rotate(0)',
                flexShrink: 0,
              }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {open && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 'calc(100% + 0.5rem)',
                minWidth: 200,
                backgroundColor: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                zIndex: 100,
              }}
            >
              <Link
                href="/dashboard/billing"
                onClick={() => setOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '0.625rem 1rem',
                  fontSize: '0.875rem',
                  color: 'var(--text)',
                  transition: 'background-color 0.15s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-alt)')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
                Usage &amp; Billing
              </Link>
              <Link
                href="/dashboard/profile"
                onClick={() => setOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '0.625rem 1rem',
                  fontSize: '0.875rem',
                  color: 'var(--text)',
                  transition: 'background-color 0.15s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-alt)')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Profile
              </Link>
              <div style={{ height: 1, backgroundColor: 'var(--border)' }} />
              <button
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '0.625rem 1rem',
                  fontSize: '0.875rem',
                  color: '#dc2626',
                  background: 'none',
                  border: 'none',
                  width: '100%',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#fef2f2')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 480px) {
          .dash-header-name { display: none !important; }
        }
      `}</style>
    </header>
  );
}

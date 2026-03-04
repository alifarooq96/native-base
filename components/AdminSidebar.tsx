'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems: { href: string; label: string }[] = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/clients', label: 'Clients' },
  { href: '/admin/leads', label: 'Leads' },
  { href: '/admin/meetings', label: 'Meetings' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: 220,
        flexShrink: 0,
        borderRight: '1px solid var(--border)',
        backgroundColor: 'var(--bg)',
        padding: '1.25rem 0 1.25rem 1.5rem',
      }}
    >
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {navItems.map(({ href, label }) => {
          const isActive =
            pathname === href ||
            pathname === href + '/' ||
            (pathname.startsWith(href + '/') && pathname.length > href.length + 1);
          return (
            <Link
              key={href}
              href={href}
              style={{
                padding: '0.5rem 1rem 0.5rem 1rem',
                fontSize: '0.9375rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                backgroundColor: isActive ? 'rgba(13, 148, 136, 0.08)' : 'transparent',
                borderRight: isActive ? '3px solid var(--accent)' : '3px solid transparent',
                textDecoration: 'none',
                transition: 'color 0.15s ease, background-color 0.15s ease',
              }}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

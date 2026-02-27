'use client';

import { useRef, useEffect, useState } from 'react';

const ITEMS = [
  {
    title: 'Task Board',
    body: 'View, reorder, and reprioritise your queue—or create new tasks at any time.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    title: 'Fixed Monthly Rate',
    body: 'One predictable price per month. No hidden fees, no surprise invoices.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: 'Scales With You',
    body: "Scale up when things are busy, scale down when they're not. No lock-in.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: 'Senior Engineers',
    body: 'Every automation is built by experienced engineers—no juniors, no outsourcing.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 15l-2 5l-1-3l-3-1l5-2z" />
        <path d="M18 6l-2.5 2.5" />
        <path d="M15.5 8.5L18 6" />
        <circle cx="17" cy="5" r="1" fill="currentColor" stroke="none" />
        <path d="M2 12h3M12 2v3M4.93 4.93l2.12 2.12" />
      </svg>
    ),
  },
  {
    title: '48–72 Hour Delivery',
    body: 'Most tickets are shipped within two to three business days. Fast, predictable output.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

export function WhatYouGet() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '-5% 0px', threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-in-view={inView}
      className="wyg-grid"
    >
      {ITEMS.map((item, i) => (
        <div
          key={item.title}
          className="wyg-card"
          data-index={i}
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1.5rem',
            backgroundColor: 'var(--bg)',
            borderRadius: 12,
            border: '1px solid var(--border)',
            boxShadow: 'var(--card-shadow)',
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              backgroundColor: 'var(--bg-alt)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)',
              marginBottom: '0.75rem',
            }}
          >
            {item.icon}
          </div>
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--text)',
              marginBottom: '0.25rem',
            }}
          >
            {item.title}
          </h3>
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              lineHeight: 1.55,
            }}
          >
            {item.body}
          </p>
        </div>
      ))}
    </div>
  );
}

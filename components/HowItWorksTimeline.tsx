'use client';

import { useRef, useEffect, useState } from 'react';

const STEPS = [
  {
    number: '01',
    title: 'Subscribe',
    body: 'Pick a plan and get instant access to your dedicated AI Slack channel. No onboarding calls—start posting right away.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Request',
    body: 'Drop workflows into Slack in plain language. We break them into byte-sized tickets, assign credits, and start building.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h8M8 14h4" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Receive',
    body: 'Get your automation delivered in under 48–72 hours. Review, request revisions, or post the next workflow. Repeat.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

function Arrow() {
  return (
    <div
      className="hiw-arrow"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        alignSelf: 'center',
      }}
    >
      <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
        <line x1="0" y1="12" x2="32" y2="12" stroke="var(--border)" strokeWidth="2" strokeDasharray="4 3" className="hiw-arrow-line" />
        <polyline points="28,7 34,12 28,17" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function HowItWorksTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '-5% 0px -5% 0px', threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="hiw-container"
      data-in-view={inView}
      style={{
        maxWidth: 960,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'stretch',
        gap: 0,
      }}
    >
      {STEPS.map((step, i) => (
        <div key={step.number} style={{ display: 'contents' }}>
          <div
            className="hiw-step"
            data-index={i}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: '2rem 1.5rem',
              backgroundColor: 'var(--bg)',
              borderRadius: 12,
              border: '1px solid var(--border)',
              boxShadow: 'var(--card-shadow)',
              position: 'relative',
            }}
          >
            {/* Icon circle */}
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                backgroundColor: 'var(--bg-alt)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent)',
                marginBottom: '1rem',
              }}
            >
              {step.icon}
            </div>
            {/* Number + title */}
            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--accent)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '0.25rem',
              }}
            >
              Step {step.number}
            </div>
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text)',
                marginBottom: '0.5rem',
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                fontSize: '0.9375rem',
                color: 'var(--text-muted)',
                lineHeight: 1.65,
              }}
            >
              {step.body}
            </p>
          </div>
          {i < STEPS.length - 1 && <Arrow />}
        </div>
      ))}
    </div>
  );
}

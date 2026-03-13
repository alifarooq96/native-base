import Link from 'next/link';

import { buildSeoMetadata } from '@/lib/page-metadata';
export const metadata = buildSeoMetadata({
  title: 'Insurance Carrier Portals – Quote & Bind Automation | NativeBase.AI',
  description:
    'Replace manual Quote & Bind with AI agents that log into carrier portals—Progressive, Travelers, Liberty Mutual—and sync data to your AMS 24/7. Starting at $2,499/month.',
  path: '/use-cases/carrier-portals/',
});

/* ── Shared inline-style helpers ── */

const sectionPadding = { padding: '4rem 1.5rem' } as const;
const narrowCenter = { maxWidth: 720, margin: '0 auto' } as const;
const wideCenter = { maxWidth: 960, margin: '0 auto' } as const;
const sectionLabel: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--accent)',
  marginBottom: '0.5rem',
};
const sectionH2: React.CSSProperties = {
  fontSize: '1.75rem',
  fontWeight: 700,
  color: 'var(--text)',
  lineHeight: 1.3,
  marginBottom: '1rem',
};

/* ── Page ── */

export default function CarrierPortalsPage() {
  return (
    <div>
      {/* ────────── 1. HERO ────────── */}
      <section
        style={{
          ...sectionPadding,
          padding: '3rem 1.5rem 4rem',
          backgroundColor: 'var(--bg)',
        }}
      >
        <div
          style={{
            ...narrowCenter,
            maxWidth: 680,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.8125rem',
              color: 'var(--accent)',
              backgroundColor: 'rgba(13,148,136,0.08)',
              padding: '0.375rem 0.875rem',
              borderRadius: 9999,
              border: '1px solid rgba(13,148,136,0.2)',
              marginBottom: '1.25rem',
              fontWeight: 600,
            }}
          >
            For Independent Agencies &amp; Brokers
          </span>

          <h1
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: 'var(--text)',
              letterSpacing: '-0.025em',
              marginBottom: '1rem',
            }}
          >
            Stop paying your team to{' '}
            <span style={{ color: 'var(--accent)' }}>&ldquo;Manually Quote.&rdquo;</span>
          </h1>

          <p
            style={{
              fontSize: '1.125rem',
              lineHeight: 1.6,
              color: 'var(--text-muted)',
              maxWidth: 560,
              marginBottom: '2rem',
            }}
          >
            Replace repetitive data entry into carrier portals&mdash;Progressive,
            Travelers, Liberty Mutual&mdash;with AI agents. We automate the
            quote-to-bind process and sync data to your AMS 24/7.
          </p>

          <Link
            href="/book-call?source=carrier-portals"
            className="cta-button"
            style={{
              fontSize: '1rem',
              padding: '0.875rem 2rem',
              borderRadius: 10,
              textDecoration: 'none',
            }}
          >
            Book a 15-Min Workflow Audit
          </Link>
          <p style={{ marginTop: '0.75rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Starting at $2,499/mo &middot; Cancel anytime
          </p>
        </div>

        {/* ────────── 2. BEFORE vs AFTER ────────── */}
        <div
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 48px 1fr',
            gap: '1rem',
            maxWidth: 800,
            margin: '3rem auto 0',
            alignItems: 'center',
            minHeight: 220,
          }}
        >
          {/* Before */}
          <div
            style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: 12,
              padding: '1.5rem',
            }}
          >
            <p style={{ fontWeight: 700, fontSize: '0.8125rem', color: '#b91c1c', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Before
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '0.75rem' }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    width: 32,
                    height: 22,
                    borderRadius: 4,
                    backgroundColor: i % 3 === 0 ? '#fca5a5' : i % 3 === 1 ? '#fdba74' : '#fde68a',
                    display: 'inline-block',
                  }}
                />
              ))}
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#991b1b', lineHeight: 1.5 }}>
              10 open windows. Re-typing the same VIN and address 5 times. 30 minutes per quote.
            </p>
          </div>

          {/* Arrow */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </div>

          {/* After */}
          <div
            style={{
              backgroundColor: 'rgba(13,148,136,0.05)',
              border: '1px solid rgba(13,148,136,0.2)',
              borderRadius: 12,
              padding: '1.5rem',
            }}
          >
            <p style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--accent)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              After
            </p>
            <div
              style={{
                backgroundColor: 'var(--bg)',
                borderRadius: 8,
                padding: '0.75rem',
                border: '1px solid var(--border)',
                marginBottom: '0.75rem',
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                color: 'var(--text)',
                lineHeight: 1.7,
              }}
            >
              <span style={{ color: 'var(--accent)' }}>INPUT</span> Single lead form<br />
              <span style={{ color: 'var(--text-muted)' }}>5 portals populated simultaneously</span><br />
              <span style={{ color: 'var(--text-muted)' }}>Quotes delivered in a few minutes</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#0f766e', lineHeight: 1.5 }}>
              Enter data once. AI bots populate 5 portals simultaneously. Quotes in a few minutes.
            </p>
          </div>
        </div>
      </section>

      {/* ────────── 3. THE PROBLEM ────────── */}
      <section style={{ ...sectionPadding, backgroundColor: 'var(--bg-alt)' }}>
        <div style={wideCenter}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={sectionLabel}>The Problem</p>
            <h2 style={{ ...sectionH2, maxWidth: 560, margin: '0 auto' }}>
              The digital manual labor bleeding your agency
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem',
            }}
          >
            <ProblemCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              }
              title="Quote Fatigue"
              description="Staff spending 60% of their day re-keying customer data into multiple carrier sites just to find the best rate. That's your highest-paid people doing the lowest-value work."
            />
            <ProblemCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              }
              title="Renewal Backlogs"
              description="Thousands of policies expiring, but not enough hands to re-market them to different carriers for better pricing. Lost renewals are lost revenue."
            />
            <ProblemCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              }
              title="Agency Management Drift"
              description='Customer data lives in carrier portals but isn&apos;t updated in your AMS (AMS360, EZLynx), leading to dangerous "Data Silos" and compliance gaps.'
            />
          </div>
        </div>
      </section>

      {/* ────────── 4. THE SOLUTION ────────── */}
      <section style={{ ...sectionPadding, backgroundColor: 'var(--bg)' }}>
        <div style={wideCenter}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={sectionLabel}>The NativeBase Solution</p>
            <h2 style={{ ...sectionH2, maxWidth: 560, margin: '0 auto' }}>
              How the AI agent works
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
              A dedicated AI browser that quotes, binds, and syncs&mdash;so your CSRs can focus on selling, not data entry.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <StepCard
              number="1"
              title="Universal Data Entry"
              description='The agent takes a single lead form or a PDF "Dec Page" and understands every field—name, VIN, coverage limits, and prior claims.'
            />
            <StepCard
              number="2"
              title="Multi-Portal Login"
              description="AI-powered browsers log into your specific carrier portals (handling MFA and security questions) and navigate to the quoting engine."
            />
            <StepCard
              number="3"
              title='Intelligent Form Filling'
              description='The agent populates the carrier&apos;s specific forms, handles "Underwriting Questions" based on your agency&apos;s playbook, and triggers the "Get Quote" button.'
            />
            <StepCard
              number="4"
              title="AMS Sync"
              description="The agent scrapes the final premium, the quote PDF, and the policy number, then pushes them directly into your Agency Management System."
            />
          </div>
        </div>
      </section>

      {/* ────────── 5. UNIT ECONOMICS ────────── */}
      <section style={{ ...sectionPadding, backgroundColor: 'var(--bg-alt)' }}>
        <div style={{ ...narrowCenter, maxWidth: 680 }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={sectionLabel}>Unit Economics</p>
            <h2 style={sectionH2}>
              The math speaks for itself
            </h2>
          </div>

          <div
            style={{
              borderRadius: 12,
              border: '1px solid var(--border)',
              overflow: 'hidden',
              backgroundColor: 'var(--bg)',
            }}
          >
            {/* Table header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                backgroundColor: 'var(--bg-alt)',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <div style={{ padding: '1rem 1.25rem', fontWeight: 700, fontSize: '0.875rem', color: '#b91c1c' }}>
                2 Insurance CSRs / Admin
              </div>
              <div style={{ padding: '1rem 1.25rem', fontWeight: 700, fontSize: '0.875rem', color: 'var(--accent)', borderLeft: '1px solid var(--border)' }}>
                NativeBase Subscription
              </div>
            </div>

            {/* Rows */}
            {[
              ['~$8,500/mo combined salary + commissions', '$2,499/mo flat'],
              ['High burnout from repetitive work', 'No burnout — runs 24/7'],
              ['Limited to ~15 quotes/day', 'Scalable to 500+ quotes/day'],
              ['Coverage: business hours only', '24/7/365 uptime'],
              ['Training time: 2-4 weeks per hire', 'Each workflow in 48 hours'],
              ['Scales linearly with headcount', 'Add carriers at no extra cost'],
            ].map(([left, right], i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  borderBottom: i < 5 ? '1px solid var(--border)' : 'none',
                }}
              >
                <div style={{ padding: '0.75rem 1.25rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  {left}
                </div>
                <div style={{ padding: '0.75rem 1.25rem', fontSize: '0.875rem', color: 'var(--text)', fontWeight: 500, borderLeft: '1px solid var(--border)' }}>
                  {right}
                </div>
              </div>
            ))}

            {/* Savings callout */}
            <div
              style={{
                backgroundColor: 'rgba(13,148,136,0.06)',
                borderTop: '2px solid var(--accent)',
                padding: '1rem 1.25rem',
                textAlign: 'center',
              }}
            >
              <p style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--accent)' }}>
                Save $6,000+/mo while doubling your &ldquo;Quote-to-Close&rdquo; speed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── 6. FINAL CTA ────────── */}
      <section
        id="cta"
        style={{
          ...sectionPadding,
          padding: '4.5rem 1.5rem',
          backgroundColor: 'var(--bg)',
        }}
      >
        <div style={{ ...narrowCenter, maxWidth: 560, textAlign: 'center' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--text)',
              lineHeight: 1.3,
              marginBottom: '0.75rem',
            }}
          >
            Which carrier portal is slowing down your agency?
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: 'var(--text-muted)',
              marginBottom: '2rem',
              lineHeight: 1.6,
            }}
          >
            Tell us which quoting process wastes the most time.
            We&apos;ll show you how an AI agent can handle it in 15 minutes.
          </p>
          <Link
            href="/book-call?source=carrier-portals"
            className="cta-button"
            style={{
              fontSize: '1rem',
              padding: '0.875rem 2rem',
              borderRadius: 10,
              textDecoration: 'none',
            }}
          >
            Book a 15-Min Workflow Audit
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ── Sub-components ── */

function ProblemCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '1.5rem',
        transition: 'box-shadow 0.2s',
      }}
    >
      <div style={{ marginBottom: '0.75rem' }}>{icon}</div>
      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.375rem' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
        {description}
      </p>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-alt)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '1.5rem',
        position: 'relative',
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          borderRadius: '50%',
          backgroundColor: 'var(--accent)',
          color: 'white',
          fontSize: '0.8125rem',
          fontWeight: 700,
          marginBottom: '0.75rem',
        }}
      >
        {number}
      </span>
      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.375rem' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
        {description}
      </p>
    </div>
  );
}

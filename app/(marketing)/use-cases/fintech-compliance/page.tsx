import Link from 'next/link';

import { buildSeoMetadata } from '@/lib/page-metadata';
export const metadata = buildSeoMetadata({
  title: 'Fintech Compliance – KYC & AML Automation | NativeBase.AI',
  description:
    'Automate the "First Pass" of KYC & AML. AI agents handle document extraction, watchlist screening, and risk triaging so your analysts focus on the cases that matter. Starting at $2,499/month.',
  path: '/use-cases/fintech-compliance/',
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

export default function FintechCompliancePage() {
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
            For Fintech &amp; Digital Finance
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
            Scale your Onboarding,{' '}
            <span style={{ color: 'var(--accent)' }}>not your Compliance Team.</span>
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
            Automate the &ldquo;First Pass&rdquo; of KYC &amp; AML. Our AI agents
            handle document extraction, watchlist screening, and risk
            triaging&mdash;so your analysts only spend time on the cases that
            actually matter.
          </p>

          <Link
            href="/book-call?source=fintech-compliance"
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
            $2,499/mo &middot; Cancel anytime
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
              {Array.from({ length: 12 }).map((_, i) => (
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
              Analysts manually verifying IDs, cross-referencing Sanctions lists, and chasing &ldquo;Proof of Address&rdquo; docs. Onboarding takes 48 hours.
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
              <span style={{ color: 'var(--accent)' }}>EXTRACT</span> Passport + Utility Bill<br />
              <span style={{ color: 'var(--text-muted)' }}>Sanctions &amp; PEP check: CLEAR</span><br />
              <span style={{ color: 'var(--text-muted)' }}>Ready-to-Review packet: 60s</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#0f766e', lineHeight: 1.5 }}>
              AI extracts data from IDs and bills instantly. Sanctions checks run in the background. Analysts get a &ldquo;Ready-to-Review&rdquo; packet in 60 seconds.
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
              The &ldquo;Manual Review&rdquo; bottleneck killing your conversion
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
              title="Document OCR Fatigue"
              description="High-paid analysts spending hours typing names and addresses from blurry passport photos and utility bills. That's analyst-grade talent doing data-entry work."
            />
            <ProblemCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              }
              title='The "False Positive" Flood'
              description='95% of AML alerts are noise. Your team wastes half their week dismissing "John Smith" matches that aren&apos;t your customer.'
            />
            <ProblemCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              }
              title="Conversion Killer"
              description="Every hour a customer waits in a manual review queue is an hour they spend looking for a competitor. Slow onboarding is a growth ceiling."
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
              The AI Compliance Agent
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
              We don&apos;t replace your compliance team&mdash;we remove the 90% of manual work that causes burnout.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <StepCard
              number="1"
              title="Universal Extraction"
              description="Vision-AI extracts data from Passports, Driver's Licenses, and Articles of Incorporation with 99.9% accuracy—no manual transcription."
            />
            <StepCard
              number="2"
              title="Automated Screening"
              description="The agent automatically pings Sanctions, PEP (Politically Exposed Persons), and Adverse Media databases in real time."
            />
            <StepCard
              number="3"
              title="Intelligent Triage"
              description='Low-risk users are cleared instantly. For high-risk flags, the AI generates a summary explaining why the flag was raised—saving analysts 20 minutes per case.'
            />
            <StepCard
              number="4"
              title="Audit-Ready Logging"
              description="Every action is logged into your CRM or database, providing a perfect audit trail for regulators without any extra work from your team."
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
                2 Compliance Juniors
              </div>
              <div style={{ padding: '1rem 1.25rem', fontWeight: 700, fontSize: '0.875rem', color: 'var(--accent)', borderLeft: '1px solid var(--border)' }}>
                NativeBase Subscription
              </div>
            </div>

            {/* Rows */}
            {[
              ['~$8,000/mo combined salary', '$2,499/mo flat'],
              ['Capacity capped by human speed', 'Unlimited capacity'],
              ['High churn from repetitive work', 'AI never gets bored or makes typos'],
              ['Coverage: business hours only', '24/7/365 uptime'],
              ['Training time: 4-6 weeks per hire', 'Each workflow in 48 hours'],
              ['Scales linearly with headcount', 'Scale to 10k users/day — same price'],
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
                Scale to 10k users/day without adding a single new hire.
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
            Is your manual review queue slowing down your growth?
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: 'var(--text-muted)',
              marginBottom: '2rem',
              lineHeight: 1.6,
            }}
          >
            Tell us which document or check is causing the biggest backlog.
            We&apos;ll show you how an AI agent handles the &ldquo;First Pass&rdquo; in 15 minutes.
          </p>
          <Link
            href="/book-call?source=fintech-compliance"
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

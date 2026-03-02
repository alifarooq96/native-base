import type { Metadata } from 'next';
import Link from 'next/link';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://native-base-pink.vercel.app');

export const metadata: Metadata = {
  title: 'Carrier Portal Automation for Logistics | NativeBase.AI',
  description:
    'Replace manual Track & Trace with autonomous AI agents. We build custom scrapers that log into carrier portals (Maersk, MSC, FedEx) and update your ERP 24/7. Starting at $2,499/month.',
  openGraph: {
    title: 'Stop Paying Your Team to "Check the Status" | NativeBase.AI',
    description:
      'Replace manual Track & Trace with autonomous AI agents that log into carrier portals and update your TMS 24/7.',
    images: [
      {
        url: `${baseUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'NativeBase.AI – Carrier Portal Automation for Logistics & Freight Forwarding',
      },
    ],
  },
};

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
            For Logistics &amp; Freight Forwarding
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
            <span style={{ color: 'var(--accent)' }}>&ldquo;Check the Status.&rdquo;</span>
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
            Replace manual Track &amp; Trace with autonomous AI agents.
            We build custom scrapers that log into carrier portals&mdash;Maersk,
            MSC, FedEx&mdash;and update your ERP 24/7.
          </p>

          <Link
            href="#cta"
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

        {/* Before vs After visual */}
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
              50+ browser tabs. Manual copy-paste. 4 hours a day lost per person.
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
              <span style={{ color: 'var(--accent)' }}>GET</span> /api/shipments<br />
              <span style={{ color: 'var(--text-muted)' }}>200 OK &middot; 47 containers tracked</span><br />
              <span style={{ color: 'var(--text-muted)' }}>Last sync: 12s ago</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#0f766e', lineHeight: 1.5 }}>
              One clean API feed. Zero browser tabs. Updated every 15 minutes.
            </p>
          </div>
        </div>
      </section>

      {/* ────────── 2. THE PROBLEM ────────── */}
      <section style={{ ...sectionPadding, backgroundColor: 'var(--bg-alt)' }}>
        <div style={wideCenter}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={sectionLabel}>The Problem</p>
            <h2 style={{ ...sectionH2, maxWidth: 560, margin: '0 auto' }}>
              The digital manual labor bleeding your margins
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
              title="Portal Fatigue"
              description="Staff spending 4+ hours a day logging into 20+ different carrier websites. That's a full-time salary for copy-paste work."
            />
            <ProblemCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              }
              title="Data Latency"
              description="Your customers know about delays before you do because your data is only updated once a day. You're always one step behind."
            />
            <ProblemCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              }
              title="Typing Errors"
              description='Fat-fingered tracking numbers causing "lost" containers in your system. One wrong digit means hours of detective work.'
            />
          </div>
        </div>
      </section>

      {/* ────────── 3. THE SOLUTION ────────── */}
      <section style={{ ...sectionPadding, backgroundColor: 'var(--bg)' }}>
        <div style={wideCenter}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={sectionLabel}>The NativeBase Solution</p>
            <h2 style={{ ...sectionH2, maxWidth: 560, margin: '0 auto' }}>
              How the AI agent works
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
              A dedicated AI browser that works around the clock so your team doesn&apos;t have to.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <StepCard
              number="1"
              title="Secure Login"
              description="AI-powered browsers (Playwright/Stealth) log into your specific carrier accounts with encrypted credentials. Handles MFA, CAPTCHAs, and session management."
            />
            <StepCard
              number="2"
              title="Intelligent Extraction"
              description='Vision-AI "reads" the portal screen just like a human — extracting ETAs, current ports, vessel names, and delay notes from any layout.'
            />
            <StepCard
              number="3"
              title="Auto-Update"
              description="The agent pushes data directly into your TMS (CargoWise, Magaya) or a Master Google Sheet. No CSV exports, no manual entry."
            />
            <StepCard
              number="4"
              title="Exception Flagging"
              description='If a "Customs Hold" or "Vessel Omission" is detected, the AI pings your Slack or email immediately — before anyone has to ask.'
            />
          </div>
        </div>
      </section>

      {/* ────────── 4. ROI TABLE ────────── */}
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
                2 Track &amp; Trace Juniors
              </div>
              <div style={{ padding: '1rem 1.25rem', fontWeight: 700, fontSize: '0.875rem', color: 'var(--accent)', borderLeft: '1px solid var(--border)' }}>
                NativeBase Subscription
              </div>
            </div>

            {/* Rows */}
            {[
              ['~$7,000/mo combined salary', '$2,499/mo flat'],
              ['High turnover risk', 'Cancel or pause anytime'],
              ['Human error rate ~2-5%', '100% data accuracy'],
              ['Coverage: business hours only', '24/7/365 uptime'],
              ['Training time: 2-4 weeks', 'Live in under 48 hours'],
              ['Scales linearly with headcount', 'Add portals at no extra cost'],
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
                Save $4,500+/mo &mdash; with better accuracy and zero sick days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── 5. READY TO SHIP EXAMPLES ────────── */}
      <section style={{ ...sectionPadding, backgroundColor: 'var(--bg)' }}>
        <div style={wideCenter}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={sectionLabel}>Ready-to-Ship Examples</p>
            <h2 style={sectionH2}>
              Mini use-cases already in production
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <MiniUseCase
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="6" width="22" height="12" rx="2" ry="2" />
                  <path d="M1 10h22" />
                </svg>
              }
              title="The Container Chaser"
              description="Auto-scraping ocean carrier portals for gate-out events, vessel departures, and arrival confirmations. Know the moment your box moves."
            />
            <MiniUseCase
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              }
              title="The POD Grabber"
              description="Automatically downloading PDF delivery receipts from trucking portals and attaching them to invoices. No more chasing carriers for proof."
            />
            <MiniUseCase
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              }
              title="The Rate Finder"
              description="Scraping private spot-rate portals to find the cheapest lane in real-time. Get a competitive edge before rates expire."
            />
          </div>
        </div>
      </section>

      {/* ────────── 6. FINAL CTA ────────── */}
      <section
        id="cta"
        style={{
          ...sectionPadding,
          padding: '4.5rem 1.5rem',
          backgroundColor: 'var(--bg-alt)',
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
            Have a specific portal your team hates logging into?
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: 'var(--text-muted)',
              marginBottom: '2rem',
              lineHeight: 1.6,
            }}
          >
            Tell us which carrier portal wastes the most time.
            We&apos;ll show you exactly how the AI agent replaces it&mdash;live, in 15 minutes.
          </p>
          <Link
            href="/#contact"
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

function MiniUseCase({
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
        backgroundColor: 'var(--bg-alt)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '1.75rem',
        transition: 'box-shadow 0.2s, transform 0.15s',
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 10,
          backgroundColor: 'rgba(13,148,136,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
        }}
      >
        {icon}
      </div>
      <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
        {description}
      </p>
    </div>
  );
}

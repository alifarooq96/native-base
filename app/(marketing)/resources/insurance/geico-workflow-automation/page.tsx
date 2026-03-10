import type { Metadata } from 'next';
import Link from 'next/link';
import { GeicoTimeCalculator } from '@/components/GeicoTimeCalculator';
import { GeicoFAQ } from '@/components/GeicoFAQ';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { buildFAQPageSchema } from '@/lib/faq-schema';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://native-base-pink.vercel.app');

export const metadata: Metadata = {
  title:
    'Automate GEICO Portal Data Entry in Under 5 Minutes | NativeBase',
  description:
    'Stop rekeying data into the GEICO agent portal. Works within your existing tools without disrupting agent workflow—bindable quote in under 5 minutes.',
  openGraph: {
    title:
      'How to Use Insurance AI to Automate GEICO Portal Data Entry in Under 5 Minutes',
    description:
      'Stop rekeying data. Start quoting. The bridge between your source data and a GEICO rate is now 100% automated.',
    images: [
      {
        url: `${baseUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'NativeBase – Automate GEICO Portal in Under 5 Minutes',
      },
    ],
  },
};

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

const geicoFAQStructuredData = [
  {
    question: 'Does this require an API from GEICO?',
    answer:
      'No. NativeBase uses AI-driven browser automation—the same way a human CSR logs in and navigates the GEICO agent portal. There is no API dependency, no integration request, and no approval process from GEICO required.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Absolutely. All data at rest is AES-256 bit encrypted, and all data in transit is TLS-secured. Our infrastructure meets the highest safety and encryption standards, and we never store carrier credentials on our servers.',
  },
  {
    question: 'Can I use this for other carriers besides GEICO?',
    answer:
      'Yes. The same AI automation technology works across carrier portals—Progressive, Travelers, Liberty Mutual, and more. GEICO is one of the many we support. See our multi-carrier automation and Progressive workflow pages, or our overview on agent portal quote-to-bind.',
  },
  {
    question: 'How long does it take to get started?',
    answer:
      'Most agencies are live within 48 hours. We work within your existing set of tools and don\'t disrupt agent workflow—we handle setup and testing so your team can start quoting with AI on the GEICO portal immediately.',
  },
  {
    question: 'What happens if the GEICO portal changes its layout?',
    answer:
      'Because our AI reads the portal like a human—understanding labels, context, and structure—it adapts to layout changes automatically. This makes it far more resilient than brittle RPA scripts.',
  },
];

export default function GeicoWorkflowAutomationPage() {
  const faqSchema = buildFAQPageSchema(
    geicoFAQStructuredData.map(({ question, answer }) => ({ question, answer })),
  );

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section
        style={{
          padding: '4rem 1.5rem 5rem',
          background: 'linear-gradient(170deg, #1E293B 0%, #0F172A 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
            backgroundSize: '32px 32px',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            ...narrowCenter,
            maxWidth: 680,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.8125rem',
              color: '#5eead4',
              backgroundColor: 'rgba(94,234,212,0.1)',
              padding: '0.375rem 0.875rem',
              borderRadius: 9999,
              border: '1px solid rgba(94,234,212,0.2)',
              marginBottom: '1.5rem',
              fontWeight: 600,
            }}
          >
            AI Automation &middot; Under 5 Minutes
          </span>
          <h1
            style={{
              fontSize: 'clamp(1.75rem, 4.5vw, 2.625rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#f1f5f9',
              letterSpacing: '-0.025em',
              marginBottom: '1.25rem',
            }}
          >
            How to Use Insurance AI to Automate GEICO Portal Data Entry{' '}
            <span style={{ color: '#5eead4' }}>in Under 5 Minutes</span>
          </h1>
          <p
            style={{
              fontSize: '1.125rem',
              lineHeight: 1.6,
              color: '#94a3b8',
              maxWidth: 560,
              marginBottom: '0.75rem',
            }}
          >
            Stop rekeying data. Start quoting. The bridge between your source
            data and a GEICO rate is now{' '}
            <strong style={{ color: '#cbd5e1' }}>100% automated</strong>.
          </p>
          <p
            style={{
              fontSize: '0.9375rem',
              color: '#64748b',
              maxWidth: 520,
              marginBottom: '2rem',
            }}
          >
            Works within your existing set of tools—no rip-and-replace. Your
            agents keep their workflow; we just make the GEICO portal faster
            and error-free.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link
              href="/book-call?source=geico"
              className="cta-button"
              style={{
                fontSize: '1rem',
                padding: '0.875rem 2rem',
                borderRadius: 10,
                textDecoration: 'none',
              }}
            >
              Schedule My 5-Minute GEICO Demo
            </Link>
          </div>
          <GeicoTimeCalculator />
        </div>
      </section>

      <section style={{ ...sectionPadding, backgroundColor: 'var(--bg)' }}>
        <div style={wideCenter}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={sectionLabel}>The 5-Minute Workflow</p>
            <h2 style={{ ...sectionH2, maxWidth: 560, margin: '0 auto' }}>
              From source data to bindable quote&mdash;
              <span style={{ color: 'var(--accent)' }}>under 5 minutes</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: 520, margin: '0.75rem auto 0', lineHeight: 1.6, fontSize: '0.9375rem' }}>
              Within your existing tools, without disrupting agent workflow.
            </p>
          </div>
          <div
            className="progressive-workflow-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1.5rem',
              position: 'relative',
            }}
          >
            <WorkflowStep
              number="1"
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
              }
              title="Upload Source Data"
              duration="30 Sec"
              description="Drop in a dec page, ACORD form, or CSV—any format your agency already uses."
            />
            <WorkflowStep
              number="2"
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
                  <line x1="9" y1="21" x2="15" y2="21" />
                  <line x1="10" y1="24" x2="14" y2="24" />
                </svg>
              }
              title="AI Maps & Reviews"
              duration="60 Sec"
              description="Our AI reads every field: VIN, driver name, coverage limits—and maps them to GEICO's form schema."
            />
            <WorkflowStep
              number="3"
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10" />
                  <polyline points="1 20 1 14 7 14" />
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                </svg>
              }
              title="Auto-Portal Prefill"
              duration="2–3 Min"
              description="AI browser logs into the GEICO portal, navigates forms, and prefills every field automatically."
            />
            <WorkflowStep
              number="4"
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              }
              title="Bindable Quote"
              duration="Quote Ready!"
              description="GEICO returns a bindable rate. Your CSR reviews, adjusts if needed, and binds—all without re-typing a single field."
            />
          </div>
          <div
            style={{
              maxWidth: 800,
              margin: '2rem auto 0',
              height: 6,
              borderRadius: 3,
              background: 'var(--border)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 3,
                background: 'linear-gradient(90deg, var(--accent), #5eead4)',
              }}
            />
          </div>
          <p
            style={{
              textAlign: 'center',
              fontSize: '0.8125rem',
              color: 'var(--text-muted)',
              marginTop: '0.75rem',
            }}
          >
            Total time: <strong style={{ color: 'var(--accent)' }}>Under 5 minutes</strong>{' '}
            vs. 20+ minutes manually
          </p>
        </div>
      </section>

      <section style={{ ...sectionPadding, backgroundColor: 'var(--bg-alt)' }}>
        <div style={wideCenter}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={sectionLabel}>AI Under the Hood</p>
            <h2 style={{ ...sectionH2, maxWidth: 560, margin: '0 auto' }}>
              See the difference AI automation makes
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
              Our AI/LLM technology reads the GEICO portal just like a
              human—understanding labels, context, and structure—making the
              automation flexible and robust.
            </p>
          </div>
          <div
            className="progressive-split-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem',
              maxWidth: 840,
              margin: '0 auto',
            }}
          >
            <div
              style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: 14,
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <p
                style={{
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  color: '#b91c1c',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '1.25rem',
                }}
              >
                Manual Entry
              </p>
              <div
                style={{
                  background: '#fde2e2',
                  borderRadius: 10,
                  padding: '1.25rem',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                  <line x1="7" y1="8" x2="10" y2="8" />
                  <line x1="7" y1="11" x2="13" y2="11" />
                  <line x1="14" y1="8" x2="17" y2="8" />
                </svg>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <span
                      key={i}
                      style={{
                        width: 24,
                        height: 14,
                        borderRadius: 3,
                        backgroundColor:
                          i % 3 === 0 ? '#fca5a5' : i % 3 === 1 ? '#fdba74' : '#fde68a',
                      }}
                    />
                  ))}
                </div>
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#991b1b', marginBottom: '0.5rem' }}>
                Slow, Error-Prone, Frustrating.
              </h3>
              <ul style={{ fontSize: '0.8125rem', color: '#991b1b', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
                <li>Re-typing VINs, addresses, and driver info</li>
                <li>20+ minutes per quote on a good day</li>
                <li>Typos cause requotes and delays</li>
                <li>Staff burnout from repetitive data entry</li>
              </ul>
            </div>
            <div
              style={{
                backgroundColor: 'rgba(13,148,136,0.04)',
                border: '1px solid rgba(13,148,136,0.2)',
                borderRadius: 14,
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <p
                style={{
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '1.25rem',
                }}
              >
                AI Automation
              </p>
              <div
                style={{
                  background: '#0F172A',
                  borderRadius: 10,
                  padding: '1rem 1.125rem',
                  marginBottom: '1.25rem',
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  lineHeight: 1.8,
                  color: '#94a3b8',
                  overflow: 'hidden',
                }}
              >
                <span style={{ color: '#475569' }}>{'{'}</span>
                <br />
                <span>&nbsp;&nbsp;</span>
                <span style={{ color: '#5eead4' }}>&quot;VIN&quot;</span>
                <span style={{ color: '#64748b' }}>: </span>
                <span style={{ color: '#fbbf24' }}>&quot;1G1AL55F477...&quot;</span>
                <span style={{ color: '#64748b' }}>,</span>
                <br />
                <span>&nbsp;&nbsp;</span>
                <span style={{ color: '#5eead4' }}>&quot;DriverName&quot;</span>
                <span style={{ color: '#64748b' }}>: </span>
                <span style={{ color: '#fbbf24' }}>&quot;Jane Doe&quot;</span>
                <span style={{ color: '#64748b' }}>,</span>
                <br />
                <span>&nbsp;&nbsp;</span>
                <span style={{ color: '#5eead4' }}>&quot;Address&quot;</span>
                <span style={{ color: '#64748b' }}>: </span>
                <span style={{ color: '#fbbf24' }}>&quot;123 Main St&quot;</span>
                <span style={{ color: '#64748b' }}>,</span>
                <br />
                <span>&nbsp;&nbsp;</span>
                <span style={{ color: '#5eead4' }}>&quot;CoverageLimits&quot;</span>
                <span style={{ color: '#64748b' }}>: </span>
                <span style={{ color: '#fbbf24' }}>&quot;100/300/100&quot;</span>
                <span style={{ color: '#64748b' }}>,</span>
                <br />
                <span>&nbsp;&nbsp;</span>
                <span style={{ color: '#5eead4' }}>&quot;PriorCarrier&quot;</span>
                <span style={{ color: '#64748b' }}>: </span>
                <span style={{ color: '#fbbf24' }}>&quot;StateFarm&quot;</span>
                <br />
                <span style={{ color: '#475569' }}>{'}'}</span>
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem' }}>
                Fast, Accurate, Automated.
              </h3>
              <ul style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
                <li>AI reads and maps every field automatically</li>
                <li>Under 5 minutes from upload to bindable quote</li>
                <li>Zero typos—data flows directly from source</li>
                <li>Your team focuses on selling, not typing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section style={{ ...sectionPadding, backgroundColor: 'var(--bg)' }}>
        <div style={{ ...narrowCenter, maxWidth: 680 }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={sectionLabel}>Head-to-Head</p>
            <h2 style={sectionH2}>Manual entry vs. AI automation</h2>
          </div>
          <div
            style={{
              borderRadius: 14,
              border: '1px solid var(--border)',
              overflow: 'hidden',
              backgroundColor: 'var(--bg)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                backgroundColor: 'var(--bg-alt)',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <div style={{ padding: '1rem 1.25rem', fontWeight: 700, fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Feature
              </div>
              <div
                style={{
                  padding: '1rem 1.25rem',
                  fontWeight: 700,
                  fontSize: '0.8125rem',
                  color: '#b91c1c',
                  borderLeft: '1px solid var(--border)',
                  textAlign: 'center',
                }}
              >
                Manual Entry
              </div>
              <div
                style={{
                  padding: '1rem 1.25rem',
                  fontWeight: 700,
                  fontSize: '0.8125rem',
                  color: 'var(--accent)',
                  borderLeft: '1px solid var(--border)',
                  textAlign: 'center',
                }}
              >
                NativeBase AI
              </div>
            </div>
            {([
              ['Time per Quote', '20+ Minutes', 'Under 5 Minutes'],
              ['Error Rate', 'High (typos, missed fields)', 'Near-Zero'],
              ['Workflow Focus', 'Data entry all day', 'Selling & advising'],
              ['Daily Morale', 'Frustrated & burned out', 'Energized & productive'],
            ] as const).map(([feature, manual, native], i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  borderBottom: i < 3 ? '1px solid var(--border)' : 'none',
                }}
              >
                <div style={{ padding: '0.875rem 1.25rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>
                  {feature}
                </div>
                <div
                  style={{
                    padding: '0.875rem 1.25rem',
                    fontSize: '0.875rem',
                    color: '#991b1b',
                    borderLeft: '1px solid var(--border)',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  {manual}
                </div>
                <div
                  style={{
                    padding: '0.875rem 1.25rem',
                    fontSize: '0.875rem',
                    color: '#0f766e',
                    fontWeight: 600,
                    borderLeft: '1px solid var(--border)',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {native}
                </div>
              </div>
            ))}
            <div
              style={{
                backgroundColor: 'rgba(13,148,136,0.06)',
                borderTop: '2px solid var(--accent)',
                padding: '1rem 1.25rem',
                textAlign: 'center',
              }}
            >
              <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--accent)' }}>
                AI Automation delivers a bindable GEICO quote in under 5
                minutes, every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ ...sectionPadding, backgroundColor: 'var(--bg-alt)' }}>
        <div style={wideCenter}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={sectionLabel}>Technical FAQ</p>
            <h2 style={{ ...sectionH2, maxWidth: 480, margin: '0 auto' }}>
              Common questions, straight answers
            </h2>
          </div>
          <GeicoFAQ />
        </div>
      </section>

      <section
        style={{
          padding: '5rem 1.5rem',
          background: 'linear-gradient(170deg, #0F172A 0%, #1E293B 100%)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            maxWidth: 580,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.75rem',
              color: '#5eead4',
              backgroundColor: 'rgba(94,234,212,0.1)',
              padding: '0.3rem 0.75rem',
              borderRadius: 9999,
              border: '1px solid rgba(94,234,212,0.2)',
              marginBottom: '1.25rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
            }}
          >
            Under 5 Minutes
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
              fontWeight: 800,
              color: '#f1f5f9',
              lineHeight: 1.2,
              marginBottom: '1rem',
            }}
          >
            Ready to stop rekeying into the GEICO portal?
          </h2>
          <p
            style={{
              fontSize: '1.0625rem',
              color: '#94a3b8',
              lineHeight: 1.6,
              marginBottom: '2rem',
            }}
          >
            See a live demo of AI automation filling out the GEICO agent
            portal in under 5 minutes—with your own data.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link
              href="/book-call?source=geico-cta"
              className="cta-button"
              style={{
                fontSize: '1rem',
                padding: '0.9375rem 2rem',
                borderRadius: 10,
                textDecoration: 'none',
              }}
            >
              Schedule My 5-Minute GEICO Demo
            </Link>
            <ScrollToTopButton />
          </div>
          <p
            style={{
              marginTop: '1.25rem',
              fontSize: '0.8125rem',
              color: '#64748b',
            }}
          >
            Starting at $2,499/mo &middot; Live in under 48 hours &middot;
            Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}

function WorkflowStep({
  number,
  icon,
  title,
  duration,
  description,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  duration: string;
  description: string;
}) {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-alt)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: '1.5rem 1.25rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 36,
          height: 36,
          borderRadius: '50%',
          backgroundColor: 'var(--accent)',
          color: 'white',
          fontSize: '0.875rem',
          fontWeight: 700,
          marginBottom: '1rem',
        }}
      >
        {number}
      </span>
      <span
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          backgroundColor: 'rgba(13,148,136,0.1)',
          color: 'var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
        }}
      >
        {icon}
      </span>
      <h3
        style={{
          fontSize: '0.9375rem',
          fontWeight: 700,
          color: 'var(--text)',
          marginBottom: '0.25rem',
        }}
      >
        {title}
      </h3>
      <span
        style={{
          display: 'inline-block',
          fontSize: '0.6875rem',
          fontWeight: 700,
          color: 'var(--accent)',
          backgroundColor: 'rgba(13,148,136,0.08)',
          padding: '0.25rem 0.625rem',
          borderRadius: 9999,
          marginBottom: '0.75rem',
        }}
      >
        {duration}
      </span>
      <p
        style={{
          fontSize: '0.8125rem',
          color: 'var(--text-muted)',
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>
    </div>
  );
}

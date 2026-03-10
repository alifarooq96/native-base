import type { Metadata } from 'next';
import Link from 'next/link';
import { QuoteToBindCalculator } from '@/components/QuoteToBindCalculator';
import { QuoteToBindFAQ } from '@/components/QuoteToBindFAQ';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://native-base-pink.vercel.app');

export const metadata: Metadata = {
  title:
    'Insurance Agent Portal with Quote-to-Bind Capabilities | NativeBase',
  description:
    'Get the agent portal experience with full quote-to-bind capabilities—within your existing tools, without disrupting agent workflow. AI automates carrier portals so you quote and bind in under 5 minutes.',
  openGraph: {
    title:
      'Insurance Agent Portal with Quote-to-Bind Capabilities | NativeBase',
    description:
      'Quote and bind through your carrier portals in under 5 minutes—within your existing tools, without disrupting agent workflow.',
    images: [
      {
        url: `${baseUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'NativeBase – Agent Portal Quote-to-Bind',
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

export default function AgentPortalQuoteToBindPage() {
  return (
    <div>
      {/* ─── HERO: Intent-led (agent portal + quote-to-bind) ─── */}
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
            Agent Portal &middot; Quote-to-Bind
          </span>
          <h1
            style={{
              fontSize: 'clamp(1.75rem, 4.5vw, 2.5rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#f1f5f9',
              letterSpacing: '-0.025em',
              marginBottom: '1.25rem',
            }}
          >
            Insurance Agent Portal with{' '}
            <span style={{ color: '#5eead4' }}>Quote-to-Bind Capabilities</span>
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
            Get the agent portal experience you need—quote and bind through
            carrier portals in under 5 minutes, without rekeying.
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
            agents keep their workflow; we just make quote-to-bind faster and
            error-free.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link
              href="/book-call?source=agent-portal-quote-to-bind"
              className="cta-button"
              style={{
                fontSize: '1rem',
                padding: '0.875rem 2rem',
                borderRadius: 10,
                textDecoration: 'none',
              }}
            >
              See Quote-to-Bind in Action
            </Link>
          </div>
          <QuoteToBindCalculator />
        </div>
      </section>

      {/* ─── THE QUOTE-TO-BIND WORKFLOW ─── */}
      <section style={{ ...sectionPadding, backgroundColor: 'var(--bg)' }}>
        <div style={wideCenter}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={sectionLabel}>The Quote-to-Bind Workflow</p>
            <h2 style={{ ...sectionH2, maxWidth: 560, margin: '0 auto' }}>
              From your data to a bindable quote&mdash;
              <span style={{ color: 'var(--accent)' }}>under 5 minutes</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
              One workflow across your carrier agent portals—within your existing
              tools, without disrupting agent workflow. No APIs, no rekeying.
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
              description="Dec page, ACORD form, or CSV—one source of truth for the quote-to-bind cycle."
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
              title="AI Maps to Portal Forms"
              duration="60 Sec"
              description="AI reads every field and maps to each carrier’s agent portal schema—Progressive, GEICO, Travelers, and more."
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
              title="Portal Prefill & Quote"
              duration="2–3 Min"
              description="AI logs into your carrier portals, prefills forms, and retrieves bindable quotes—no manual entry."
            />
            <WorkflowStep
              number="4"
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              }
              title="Review & Bind"
              duration="Quote Ready"
              description="Bindable quote in hand. Your team reviews, adjusts if needed, and binds—same agent portal outcome, in minutes."
            />
          </div>
          <div
            style={{
              maxWidth: 800,
              margin: '2rem auto 0',
              height: 6,
              borderRadius: 3,
              background: 'var(--border)',
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
            Full quote-to-bind cycle: <strong style={{ color: 'var(--accent)' }}>Under 5 minutes</strong>{' '}
            vs. 20+ minutes per portal manually
          </p>
        </div>
      </section>

      {/* ─── AGENT PORTAL + QUOTE-TO-BIND: MANUAL VS AUTOMATED ─── */}
      <section style={{ ...sectionPadding, backgroundColor: 'var(--bg-alt)' }}>
        <div style={wideCenter}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={sectionLabel}>Agent Portal, Automated</p>
            <h2 style={{ ...sectionH2, maxWidth: 560, margin: '0 auto' }}>
              Quote-to-bind capabilities—without the rekeying
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
              You keep using the same carrier agent portals and existing tools. We
              automate the data flow so quote-to-bind takes minutes—without
              disrupting how your agents work.
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
                Manual Agent Portal
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
                <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {['Portal A', 'Portal B', 'Portal C'].map((label, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '0.25rem 0.5rem',
                        borderRadius: 4,
                        backgroundColor: '#fca5a5',
                        fontSize: '0.6875rem',
                        color: '#991b1b',
                      }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#991b1b', marginBottom: '0.5rem' }}>
                Slow quote-to-bind. Same data, rekeyed everywhere.
              </h3>
              <ul style={{ fontSize: '0.8125rem', color: '#991b1b', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
                <li>Log into each agent portal, type the same data again</li>
                <li>20+ minutes per portal to get to a bindable quote</li>
                <li>Quote-to-bind cycle stretches to hours across carriers</li>
                <li>Errors and fatigue when rekeying across portals</li>
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
                Agent Portal + Quote-to-Bind, Automated
              </p>
              <div
                style={{
                  background: '#0F172A',
                  borderRadius: 10,
                  padding: '1rem 1.125rem',
                  marginBottom: '1.25rem',
                  fontFamily: 'monospace',
                  fontSize: '0.7rem',
                  lineHeight: 1.75,
                  color: '#94a3b8',
                  overflow: 'hidden',
                }}
              >
                <span style={{ color: '#475569' }}>{'// one upload'}</span>
                <br />
                <span style={{ color: '#475569' }}>{'→ '}</span>
                <span style={{ color: '#5eead4' }}>Progressive</span>
                <span style={{ color: '#64748b' }}>, </span>
                <span style={{ color: '#5eead4' }}>GEICO</span>
                <span style={{ color: '#64748b' }}>, </span>
                <span style={{ color: '#5eead4' }}>Travelers</span>
                <span style={{ color: '#64748b' }}>...</span>
                <br />
                <span style={{ color: '#475569' }}>{'→ bindable quote in under 5 min'}</span>
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem' }}>
                One workflow. Full quote-to-bind. Under 5 minutes.
              </h3>
              <ul style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
                <li>Same agent portals—AI fills them from one source</li>
                <li>Quote-to-bind in under 5 minutes per workflow</li>
                <li>No rekeying; data flows once into every portal</li>
                <li>Your team reviews and binds; we handle the data entry</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMPARISON: QUOTE-TO-BIND FOCUS ─── */}
      <section style={{ ...sectionPadding, backgroundColor: 'var(--bg)' }}>
        <div style={{ ...narrowCenter, maxWidth: 680 }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={sectionLabel}>Head-to-Head</p>
            <h2 style={sectionH2}>
              Manual agent portal vs. quote-to-bind automation
            </h2>
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
                Manual Portals
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
                NativeBase
              </div>
            </div>
            {([
              ['Quote-to-bind cycle time', '20+ min per portal', 'Under 5 minutes'],
              ['Agent portal experience', 'Rekey into each portal', 'One source, all portals'],
              ['Data entry', 'Repeated per carrier', 'Enter once, bind anywhere'],
              ['Bindable quote delivery', 'Slow, error-prone', 'Fast, accurate'],
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
                Agent portal with real quote-to-bind capabilities—in under 5
                minutes, within your existing tools and without disrupting agent
                workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section style={{ ...sectionPadding, backgroundColor: 'var(--bg-alt)' }}>
        <div style={wideCenter}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={sectionLabel}>FAQ</p>
            <h2 style={{ ...sectionH2, maxWidth: 480, margin: '0 auto' }}>
              Agent portal & quote-to-bind questions
            </h2>
          </div>
          <QuoteToBindFAQ />
        </div>
      </section>

      {/* ─── CTA ─── */}
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
            Quote-to-Bind in Under 5 Minutes
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
            Ready for an agent portal that quotes and binds?
          </h2>
          <p
            style={{
              fontSize: '1.0625rem',
              color: '#94a3b8',
              lineHeight: 1.6,
              marginBottom: '2rem',
            }}
          >
            See how NativeBase delivers full quote-to-bind capabilities across
            your carrier portals—within your existing tools, without disrupting
            agent workflow, in under 5 minutes.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link
              href="/book-call?source=agent-portal-quote-to-bind-cta"
              className="cta-button"
              style={{
                fontSize: '1rem',
                padding: '0.9375rem 2rem',
                borderRadius: 10,
                textDecoration: 'none',
              }}
            >
              See Quote-to-Bind in Action
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

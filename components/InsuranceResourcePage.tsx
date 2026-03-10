import Link from 'next/link';
import { GenericCalculator } from './GenericCalculator';
import { GenericFAQ, type FAQItem } from './GenericFAQ';
import { ScrollToTopButton } from './ScrollToTopButton';
import { buildFAQPageSchema } from '@/lib/faq-schema';

export type WorkflowStepData = {
  title: string;
  duration: string;
  description: string;
};

export type ComparisonRow = readonly [string, string, string];

export type SplitSide = {
  label: string;
  heading: string;
  bullets: string[];
};

export type InsuranceResourcePageProps = {
  badge: string;
  headline: React.ReactNode;
  subheadline: string;
  subheadline2?: string;
  ctaLabel: string;
  ctaSource: string;
  calculator: {
    inputLabel: string;
    minuteLabel: string;
    resultNote: string;
    defaultWorkflows?: number;
    defaultMinutes?: number;
  };
  workflow: {
    sectionLabel: string;
    heading: React.ReactNode;
    subtitle?: string;
    steps: WorkflowStepData[];
    totalLine: React.ReactNode;
  };
  split: {
    sectionLabel: string;
    heading: string;
    subtitle: string;
    left: SplitSide;
    right: SplitSide & { codeBlock?: React.ReactNode };
  };
  comparison: {
    heading: string;
    manualLabel: string;
    autoLabel: string;
    rows: ComparisonRow[];
    callout: string;
  };
  faq: {
    heading: string;
    items: FAQItem[];
    structuredData: Array<{ question: string; answer: string }>;
  };
  cta: {
    badge: string;
    heading: string;
    subtitle: string;
    primaryLabel: string;
    primarySource: string;
  };
};

const sectionPadding = { padding: '4rem 1.5rem' } as const;
const narrowCenter = { maxWidth: 720, margin: '0 auto' } as const;
const wideCenter = { maxWidth: 960, margin: '0 auto' } as const;
const labelStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--accent)',
  marginBottom: '0.5rem',
};
const h2Style: React.CSSProperties = {
  fontSize: '1.75rem',
  fontWeight: 700,
  color: 'var(--text)',
  lineHeight: 1.3,
  marginBottom: '1rem',
};

export function InsuranceResourcePage(props: InsuranceResourcePageProps) {
  const faqSchema = buildFAQPageSchema(props.faq.structuredData);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── HERO ── */}
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
            {props.badge}
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
            {props.headline}
          </h1>
          <p
            style={{
              fontSize: '1.125rem',
              lineHeight: 1.6,
              color: '#94a3b8',
              maxWidth: 560,
              marginBottom: props.subheadline2 ? '0.75rem' : '2rem',
            }}
          >
            {props.subheadline}
          </p>
          {props.subheadline2 && (
            <p
              style={{
                fontSize: '0.9375rem',
                color: '#64748b',
                maxWidth: 520,
                marginBottom: '2rem',
              }}
            >
              {props.subheadline2}
            </p>
          )}
          <Link
            href={`/book-call?source=${props.ctaSource}`}
            className="cta-button"
            style={{
              fontSize: '1rem',
              padding: '0.875rem 2rem',
              borderRadius: 10,
              textDecoration: 'none',
            }}
          >
            {props.ctaLabel}
          </Link>
          <GenericCalculator {...props.calculator} />
        </div>
      </section>

      {/* ── WORKFLOW ── */}
      <section style={{ ...sectionPadding, backgroundColor: 'var(--bg)' }}>
        <div style={wideCenter}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={labelStyle}>{props.workflow.sectionLabel}</p>
            <h2 style={{ ...h2Style, maxWidth: 560, margin: '0 auto' }}>
              {props.workflow.heading}
            </h2>
            {props.workflow.subtitle && (
              <p style={{ color: 'var(--text-muted)', maxWidth: 520, margin: '0.75rem auto 0', lineHeight: 1.6, fontSize: '0.9375rem' }}>
                {props.workflow.subtitle}
              </p>
            )}
          </div>
          <div
            className="progressive-workflow-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1.5rem',
            }}
          >
            {props.workflow.steps.map((step, i) => (
              <WorkflowStepCard key={i} number={String(i + 1)} {...step} />
            ))}
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
          <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
            {props.workflow.totalLine}
          </p>
        </div>
      </section>

      {/* ── SPLIT ── */}
      <section style={{ ...sectionPadding, backgroundColor: 'var(--bg-alt)' }}>
        <div style={wideCenter}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={labelStyle}>{props.split.sectionLabel}</p>
            <h2 style={{ ...h2Style, maxWidth: 560, margin: '0 auto' }}>{props.split.heading}</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
              {props.split.subtitle}
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
              <p style={{ fontWeight: 700, fontSize: '0.75rem', color: '#b91c1c', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
                {props.split.left.label}
              </p>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#991b1b', marginBottom: '0.75rem' }}>
                {props.split.left.heading}
              </h3>
              <ul style={{ fontSize: '0.8125rem', color: '#991b1b', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
                {props.split.left.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
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
              <p style={{ fontWeight: 700, fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
                {props.split.right.label}
              </p>
              {props.split.right.codeBlock && (
                <div style={{ marginBottom: '1.25rem' }}>
                  {props.split.right.codeBlock}
                </div>
              )}
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.75rem' }}>
                {props.split.right.heading}
              </h3>
              <ul style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
                {props.split.right.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section style={{ ...sectionPadding, backgroundColor: 'var(--bg)' }}>
        <div style={{ ...narrowCenter, maxWidth: 680 }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={labelStyle}>Head-to-Head</p>
            <h2 style={h2Style}>{props.comparison.heading}</h2>
          </div>
          <div style={{ borderRadius: 14, border: '1px solid var(--border)', overflow: 'hidden', backgroundColor: 'var(--bg)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', backgroundColor: 'var(--bg-alt)', borderBottom: '1px solid var(--border)' }}>
              <div style={{ padding: '1rem 1.25rem', fontWeight: 700, fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Feature</div>
              <div style={{ padding: '1rem 1.25rem', fontWeight: 700, fontSize: '0.8125rem', color: '#b91c1c', borderLeft: '1px solid var(--border)', textAlign: 'center' }}>
                {props.comparison.manualLabel}
              </div>
              <div style={{ padding: '1rem 1.25rem', fontWeight: 700, fontSize: '0.8125rem', color: 'var(--accent)', borderLeft: '1px solid var(--border)', textAlign: 'center' }}>
                {props.comparison.autoLabel}
              </div>
            </div>
            {props.comparison.rows.map(([feature, manual, native], i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: i < props.comparison.rows.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ padding: '0.875rem 1.25rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>{feature}</div>
                <div style={{ padding: '0.875rem 1.25rem', fontSize: '0.875rem', color: '#991b1b', borderLeft: '1px solid var(--border)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  {manual}
                </div>
                <div style={{ padding: '0.875rem 1.25rem', fontSize: '0.875rem', color: '#0f766e', fontWeight: 600, borderLeft: '1px solid var(--border)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {native}
                </div>
              </div>
            ))}
            <div style={{ backgroundColor: 'rgba(13,148,136,0.06)', borderTop: '2px solid var(--accent)', padding: '1rem 1.25rem', textAlign: 'center' }}>
              <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--accent)' }}>{props.comparison.callout}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ ...sectionPadding, backgroundColor: 'var(--bg-alt)' }}>
        <div style={wideCenter}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={labelStyle}>FAQ</p>
            <h2 style={{ ...h2Style, maxWidth: 480, margin: '0 auto' }}>{props.faq.heading}</h2>
          </div>
          <GenericFAQ faqs={props.faq.items} />
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          padding: '5rem 1.5rem',
          background: 'linear-gradient(170deg, #0F172A 0%, #1E293B 100%)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 580, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
            {props.cta.badge}
          </span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: 800, color: '#f1f5f9', lineHeight: 1.2, marginBottom: '1rem' }}>
            {props.cta.heading}
          </h2>
          <p style={{ fontSize: '1.0625rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '2rem' }}>
            {props.cta.subtitle}
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link
              href={`/book-call?source=${props.cta.primarySource}`}
              className="cta-button"
              style={{ fontSize: '1rem', padding: '0.9375rem 2rem', borderRadius: 10, textDecoration: 'none' }}
            >
              {props.cta.primaryLabel}
            </Link>
            <ScrollToTopButton />
          </div>
          <p style={{ marginTop: '1.25rem', fontSize: '0.8125rem', color: '#64748b' }}>
            Starting at $2,499/mo &middot; Each workflow automated in 48 hours &middot; Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}

function WorkflowStepCard({ number, title, duration, description }: WorkflowStepData & { number: string }) {
  const icons: Record<string, React.ReactNode> = {
    '1': (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
    '2': (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
        <line x1="9" y1="21" x2="15" y2="21" />
      </svg>
    ),
    '3': (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
    '4': (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  };

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
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', backgroundColor: 'var(--accent)', color: 'white', fontSize: '0.875rem', fontWeight: 700, marginBottom: '1rem' }}>
        {number}
      </span>
      <span style={{ width: 56, height: 56, borderRadius: 14, backgroundColor: 'rgba(13,148,136,0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
        {icons[number] || icons['1']}
      </span>
      <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.25rem' }}>{title}</h3>
      <span style={{ display: 'inline-block', fontSize: '0.6875rem', fontWeight: 700, color: 'var(--accent)', backgroundColor: 'rgba(13,148,136,0.08)', padding: '0.25rem 0.625rem', borderRadius: 9999, marginBottom: '0.75rem' }}>
        {duration}
      </span>
      <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{description}</p>
    </div>
  );
}

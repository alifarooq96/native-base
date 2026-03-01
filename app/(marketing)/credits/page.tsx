import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How Credits Work',
  description:
    'Learn how Native Base credits work — monthly allowance, rollover rules, and example automation costs. Transparent pricing with no surprises.',
  openGraph: {
    title: 'How Credits Work | Native Base',
    description:
      'Credits are the unit of work at Native Base. See examples, rollover rules, and plan comparisons.',
  },
};

const EXAMPLES = [
  { task: 'Send a Slack message when a Typeform submission comes in', credits: 1 },
  { task: 'One-way sync of new HubSpot contacts to a Google Sheet', credits: 1 },
  { task: 'Log new Shopify orders to a Google Sheet in real time', credits: 1 },
  { task: 'Send a daily Slack digest of open support tickets from Zendesk', credits: 1 },
  { task: 'Auto-fill insurance quote PDFs from client data in your CRM', credits: 2 },
  { task: 'Enrich new leads in HubSpot with company data from Clearbit and update their profile', credits: 2 },
  { task: 'Auto-generate and send a PDF invoice when a Stripe payment succeeds', credits: 2 },
  { task: 'Extract invoice details from emails using AI and log them in Google Sheets', credits: 3 },
  { task: 'Sync user accounts across 4 platforms to streamline onboarding and offboarding', credits: 3 },
  { task: 'Typeform signup → create HubSpot contact → notify Slack → trigger Mailchimp welcome drip', credits: 3 },
  { task: 'When a deal closes in Salesforce, create a project in Asana, assign tasks, and notify in Slack', credits: 3 },
];

const BREAKDOWNS = [
  {
    title: 'Auto-categorise inbound emails and route to the right team',
    total: '2–3',
    steps: [
      { label: 'Integrate with email provider to read inbound emails', credits: 1 },
      { label: 'AI classification to categorise emails by topic and intent', credits: 1 },
      { label: 'Route to the right team channel or inbox based on category', credits: 1 },
    ],
    note: 'Step 3 may be bundled with step 2 depending on complexity, bringing the total to 2.',
  },
  {
    title: 'AI support assistant that answers customer questions using your docs',
    total: '6',
    steps: [
      { label: 'Connect to your helpdesk to receive incoming tickets', credits: 1 },
      { label: 'Index your knowledge base and docs for RAG retrieval', credits: 2 },
      { label: 'AI generates draft responses using your docs as context', credits: 1 },
      { label: 'Auto-reply to common questions, escalate complex ones to Slack', credits: 1 },
      { label: 'Log interactions and response quality metrics', credits: 1 },
    ],
  },
];

export default function CreditsPage() {
  return (
    <div
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '3rem 1.5rem 4rem',
      }}
    >
      <Link
        href="/#pricing"
        style={{
          fontSize: '0.8125rem',
          color: 'var(--accent)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          marginBottom: '2rem',
        }}
      >
        ← Back to pricing
      </Link>

      <h1
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--text)',
          letterSpacing: '-0.02em',
          marginBottom: '0.5rem',
        }}
      >
        How credits work
      </h1>
      <p
        style={{
          fontSize: '1.0625rem',
          color: 'var(--text-muted)',
          lineHeight: 1.65,
          marginBottom: '2rem',
        }}
      >
        Credits are the unit of work at Native Base. Each automation request costs a number of credits based on its complexity. Your plan includes a monthly credit allowance that refreshes every billing cycle.
      </p>

      {/* Core rules */}
      <h2
        style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'var(--text)',
          marginBottom: '1rem',
        }}
      >
        The basics
      </h2>
      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          marginBottom: '2.5rem',
        }}
      >
        {[
          { label: '1 credit = 1 bite-sized unit of work.', detail: 'Most tasks cost 1–3 credits. Larger requests are broken down into smaller tasks, each scoped and priced individually.' },
          { label: 'Complexity drives the cost, not volume.', detail: 'Credit cost depends on the logic involved — conditional flows, preprocessing, number of integration points — not the amount of data.' },
          { label: 'Credits are assigned before work begins.', detail: 'When you post a request, we scope it and tell you the credit cost upfront. No surprises.' },
          { label: 'Unused credits roll over.', detail: 'Starter credits roll over up to 20. Pro credits roll over up to 50. They never expire while your subscription is active.' },
          { label: 'Revisions are free.', detail: "If an automation doesn't meet your requirements, revisions don't cost extra credits." },
          { label: 'Credits refresh monthly.', detail: 'Your allowance resets at the start of each billing cycle, on top of any rolled-over credits.' },
        ].map((item) => (
          <li
            key={item.label}
            style={{
              padding: '1rem 1.25rem',
              backgroundColor: 'var(--bg-alt)',
              borderRadius: 10,
              border: '1px solid var(--border)',
            }}
          >
            <strong style={{ color: 'var(--text)', display: 'block', marginBottom: '0.125rem' }}>
              {item.label}
            </strong>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              {item.detail}
            </span>
          </li>
        ))}
      </ul>

      {/* Complexity guide */}
      <h2
        style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'var(--text)',
          marginBottom: '0.5rem',
        }}
      >
        Credit cost examples
      </h2>
      <p
        style={{
          fontSize: '0.9375rem',
          color: 'var(--text-muted)',
          marginBottom: '1.25rem',
          lineHeight: 1.6,
        }}
      >
        These are rough guides. Every request is scoped individually, and we confirm the cost before starting work.
      </p>

      <div
        className="credits-table-wrap"
        style={{
          borderRadius: 10,
          border: '1px solid var(--border)',
          overflow: 'hidden',
          marginBottom: '2.5rem',
        }}
      >
        <table
          style={{
            width: '100%',
            minWidth: 480,
            borderCollapse: 'collapse',
            fontSize: '0.875rem',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-alt)' }}>
              <th
                style={{
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  fontWeight: 600,
                  color: 'var(--text)',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                Example request
              </th>
              <th
                style={{
                  textAlign: 'center',
                  padding: '0.75rem 1rem',
                  fontWeight: 600,
                  color: 'var(--text)',
                  borderBottom: '1px solid var(--border)',
                  width: 100,
                }}
              >
                Credits
              </th>
            </tr>
          </thead>
          <tbody>
            {EXAMPLES.map((ex, i) => (
              <tr
                key={ex.task}
                style={{
                  backgroundColor: i % 2 === 0 ? 'var(--bg)' : 'var(--bg-alt)',
                }}
              >
                <td
                  style={{
                    padding: '0.625rem 1rem',
                    color: 'var(--text-muted)',
                    borderBottom: i < EXAMPLES.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  {ex.task}
                </td>
                <td
                  style={{
                    padding: '0.625rem 1rem',
                    textAlign: 'center',
                    fontWeight: 700,
                    color: 'var(--accent)',
                    borderBottom: i < EXAMPLES.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  {ex.credits}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Breakdown section */}
      <h2
        style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'var(--text)',
          marginBottom: '0.5rem',
        }}
      >
        How bigger tasks get broken down
      </h2>
      <p
        style={{
          fontSize: '0.9375rem',
          color: 'var(--text-muted)',
          marginBottom: '1.5rem',
          lineHeight: 1.6,
        }}
      >
        Complex requests aren&apos;t one big credit charge. We break them into
        bite-sized tasks so you can see exactly where each credit goes.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {BREAKDOWNS.map((bd) => (
          <div
            key={bd.title}
            style={{
              borderRadius: 12,
              border: '1px solid var(--border)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '1rem 1.25rem',
                backgroundColor: 'var(--bg-alt)',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '0.9375rem' }}>
                {bd.title}
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                  padding: '0.25rem 0.625rem',
                  borderRadius: 20,
                  whiteSpace: 'nowrap',
                }}
              >
                {bd.total} credits total
              </span>
            </div>

            <div style={{ padding: '0.5rem 0' }}>
              {bd.steps.map((step, i) => (
                <div
                  key={step.label}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.75rem 1.25rem',
                  }}
                >
                  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent)',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </div>
                    {i < bd.steps.length - 1 && (
                      <div
                        style={{
                          width: 2,
                          height: 24,
                          backgroundColor: 'var(--border)',
                          position: 'absolute',
                          top: 32,
                        }}
                      />
                    )}
                  </div>
                  <div style={{ flex: 1, paddingTop: '0.2rem' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      {step.label}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--accent)',
                      backgroundColor: 'color-mix(in srgb, var(--accent) 8%, transparent)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: 12,
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      marginTop: '0.1rem',
                    }}
                  >
                    {step.credits} cr
                  </span>
                </div>
              ))}
            </div>

            {bd.note && (
              <div
                style={{
                  padding: '0.75rem 1.25rem',
                  borderTop: '1px solid var(--border)',
                  fontSize: '0.8125rem',
                  color: 'var(--text-muted-soft)',
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                }}
              >
                {bd.note}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Plan comparison */}
      <h2
        style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'var(--text)',
          marginBottom: '1rem',
        }}
      >
        Credits by plan
      </h2>
      <div
        className="credits-plan-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          marginBottom: '2.5rem',
        }}
      >
        {[
          { plan: 'Starter', credits: '10', rollover: 'Up to 20' },
          { plan: 'Pro', credits: '25', rollover: 'Up to 50' },
          { plan: 'Enterprise', credits: 'Custom', rollover: 'Custom' },
        ].map((p) => (
          <div
            key={p.plan}
            style={{
              padding: '1.25rem',
              backgroundColor: 'var(--bg-alt)',
              borderRadius: 10,
              border: '1px solid var(--border)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>
              {p.plan}
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.25rem' }}>
              {p.credits}
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              credits / month
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted-soft)', marginTop: '0.5rem' }}>
              Rollover: {p.rollover}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          padding: '1.25rem 1.5rem',
          backgroundColor: 'var(--bg-alt)',
          borderRadius: 10,
          border: '1px solid var(--border)',
          fontSize: '0.875rem',
          color: 'var(--text-muted)',
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: 'var(--text)' }}>Not sure how many credits you need?</strong>{' '}
        <Link href="/#contact" style={{ color: 'var(--accent)', fontWeight: 600 }}>Book a free intro call</Link> and we&apos;ll help you estimate based on your workflows.
      </div>
    </div>
  );
}

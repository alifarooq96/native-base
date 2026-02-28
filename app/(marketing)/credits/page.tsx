import Link from 'next/link';

const EXAMPLES = [
  { task: 'Simple Slack notification when a form is submitted', credits: 1 },
  { task: 'Sync data between two apps (e.g. CRM → spreadsheet)', credits: 1 },
  { task: 'Auto-categorise inbound emails and route to the right team', credits: 2 },
  { task: 'Generate a weekly summary report from multiple data sources', credits: 2 },
  { task: 'Build an AI agent that drafts replies to support tickets', credits: 3 },
  { task: 'Multi-step approval workflow with conditional branching', credits: 3 },
  { task: 'End-to-end onboarding flow: form → CRM → Slack → email sequence', credits: 4 },
  { task: 'Custom internal dashboard pulling from 3+ APIs', credits: 5 },
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
          { label: '1 credit = 1 unit of work.', detail: 'Simple, single-step automations typically cost 1 credit. More complex workflows cost more.' },
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

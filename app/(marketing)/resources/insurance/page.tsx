import Link from 'next/link';
import { buildSeoMetadata } from '@/lib/page-metadata';

export const metadata = buildSeoMetadata({
  title: 'Insurance Workflow Automation Resources | NativeBase',
  description:
    'Explore insurance workflow automation resources for ACORD forms, carrier portals, quote-to-bind, trucking submissions, and AMS-to-portal automation.',
  path: '/resources/insurance/',
});

const categories = [
  {
    title: 'ACORD Automation',
    links: [
      { href: '/resources/insurance/acord-to-portal/', label: 'ACORD to Portal: Zero-Data Entry Quoting' },
      { href: '/resources/insurance/acord-125-commercial-application/', label: 'Automating ACORD 125' },
      { href: '/resources/insurance/acord-126-general-liability/', label: 'Automating ACORD 126' },
      { href: '/resources/insurance/acord-130-workers-comp/', label: 'Automating ACORD 130' },
      { href: '/resources/insurance/acord-140-property-information/', label: 'Automating ACORD 140' },
    ],
  },
  {
    title: 'Carrier Portal Automation',
    links: [
      { href: '/resources/insurance/progressive-workflow-automation/', label: 'Progressive Workflow Automation' },
      { href: '/resources/insurance/geico-workflow-automation/', label: 'GEICO Workflow Automation' },
      { href: '/resources/insurance/multi-carrier-automation/', label: 'Multi-Carrier Automation' },
      { href: '/resources/insurance/agent-portal-quote-to-bind/', label: 'Agent Portal Quote-to-Bind' },
    ],
  },
  {
    title: 'ACORD to Carrier Bridge',
    links: [
      { href: '/resources/insurance/acord-to-progressive/', label: 'ACORD to Progressive' },
      { href: '/resources/insurance/acord-to-travelers/', label: 'ACORD to Travelers' },
      { href: '/resources/insurance/acord-to-hartford/', label: 'ACORD to The Hartford' },
      { href: '/resources/insurance/acord-to-liberty-mutual/', label: 'ACORD to Liberty Mutual' },
      { href: '/resources/insurance/acord-to-chubb/', label: 'ACORD to Chubb' },
      { href: '/resources/insurance/acord-to-berkshire-hathaway/', label: 'ACORD to Berkshire Hathaway' },
    ],
  },
  {
    title: 'Integrations and Trucking',
    links: [
      { href: '/resources/insurance/ams360-to-carrier-portal/', label: 'AMS360 to Carrier Portal' },
      { href: '/resources/insurance/applied-epic-to-carrier-portal/', label: 'Applied Epic to Carrier Portal' },
      { href: '/resources/insurance/progressive-commercial-trucking-automation/', label: 'Progressive Commercial Trucking' },
      { href: '/resources/insurance/great-west-casualty-agent-portal-automation/', label: 'Great West Casualty' },
      { href: '/resources/insurance/northland-travelers-trucking-automation/', label: 'Northland (Travelers) Trucking' },
      { href: '/resources/insurance/roi-calculator-manual-data-entry/', label: 'ROI Calculator' },
      { href: '/resources/insurance/nativebase-vs-rating-engines/', label: 'NativeBase vs. Rating Engines' },
    ],
  },
];

export default function InsuranceResourcesHubPage() {
  return (
    <div>
      <section
        style={{
          padding: '4rem 1.5rem 3rem',
          background: 'linear-gradient(170deg, #1E293B 0%, #0F172A 100%)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p
            style={{
              fontSize: '0.8125rem',
              color: '#5eead4',
              backgroundColor: 'rgba(94,234,212,0.1)',
              padding: '0.375rem 0.875rem',
              borderRadius: 9999,
              border: '1px solid rgba(94,234,212,0.2)',
              marginBottom: '1.5rem',
              fontWeight: 600,
              display: 'inline-block',
            }}
          >
            Insurance Resources
          </p>
          <h1
            style={{
              fontSize: 'clamp(1.9rem, 4vw, 2.8rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#f1f5f9',
              letterSpacing: '-0.025em',
              marginBottom: '1rem',
            }}
          >
            Insurance Workflow Automation Resources
          </h1>
          <p
            style={{
              fontSize: '1.0625rem',
              lineHeight: 1.7,
              color: '#94a3b8',
              maxWidth: 640,
              margin: '0 auto',
            }}
          >
            Explore ACORD automation, carrier portal automation, quote-to-bind workflows,
            trucking submissions, and AMS-to-portal integrations. Every page is designed to help
            agencies eliminate rekeying and automate the workflows agents still perform manually.
          </p>
        </div>
      </section>

      <section style={{ padding: '4rem 1.5rem', backgroundColor: 'var(--bg)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {categories.map((category) => (
              <div
                key={category.title}
                style={{
                  backgroundColor: 'var(--bg-alt)',
                  border: '1px solid var(--border)',
                  borderRadius: 14,
                  padding: '1.5rem',
                }}
              >
                <h2
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--text)',
                    marginBottom: '0.875rem',
                  }}
                >
                  {category.title}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {category.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.875rem',
                        lineHeight: 1.5,
                        textDecoration: 'none',
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

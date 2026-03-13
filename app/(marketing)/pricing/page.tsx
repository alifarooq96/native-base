import Link from 'next/link';
import { Pricing } from '@/components/Pricing';
import { SlotPicker } from '@/components/SlotPicker';

import { buildSeoMetadata } from '@/lib/page-metadata';
export const metadata = buildSeoMetadata({
  title: 'Pricing',
  description:
    'Predictable pricing for exponential output. Senior AI engineers automating your business at a flat monthly rate. Starting at $2,499/month. Pause or cancel anytime.',
  path: '/pricing/',
});

const CREDIT_EXAMPLES = [
  { task: 'Send a Slack message when a Typeform submission comes in', credits: 1 },
  { task: 'One-way sync of new HubSpot contacts to a Google Sheet', credits: 1 },
  { task: 'Auto-fill insurance quote PDFs from client data in your CRM', credits: 2 },
  { task: 'Enrich new leads in HubSpot with company data from Clearbit', credits: 2 },
  { task: 'Extract invoice details from emails using AI and log them in Sheets', credits: 3 },
  { task: 'Typeform → HubSpot → Slack → Mailchimp welcome drip', credits: 3 },
];

const FAQS = [
  {
    q: 'What if I don\u2019t use all my credits?',
    a: 'Starter credits roll over up to 20. Pro credits roll over up to 50. They never expire while your subscription is active.',
  },
  {
    q: 'How do I request work?',
    a: 'Drop it in your dedicated NativeBase board in plain English (attach workflow screenrecordings if you can). No tickets, no forms. Just describe what you need and we\u2019ll scope it.',
  },
  {
    q: 'Who owns the code?',
    a: 'You do. 100% intellectual property ownership from day one. Everything we build is yours.',
  },
  {
    q: 'Can I pause my subscription?',
    a: 'Yes. Pause or cancel anytime with no penalties. When you\u2019re ready to resume, your rolled-over credits will be waiting.',
  },
  {
    q: 'What counts as a \u201ccredit\u201d?',
    a: 'One credit equals one bite-sized unit of automation work. Most tasks cost 1\u20133 credits. We scope every request and confirm the cost before starting.',
  },
  {
    q: 'How fast is delivery?',
    a: 'Most requests are delivered within 48\u201372 hours. Complex multi-step automations may take longer, but we\u2019ll always give you a timeline upfront.',
  },
];

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
};

export default function PricingPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      {/* ── Hero ── */}
      <section
        style={{
          padding: '4rem 1.5rem 3rem',
          backgroundColor: 'var(--bg)',
        }}
      >
        <div
          style={{
            maxWidth: 720,
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '0.75rem',
            }}
          >
            Pricing
          </p>
          <h1
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--text)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: '1rem',
            }}
          >
            Predictable Pricing for
            <br />
            Exponential Output.
          </h1>
          <p
            style={{
              fontSize: '1.0625rem',
              color: 'var(--text-muted)',
              lineHeight: 1.65,
              maxWidth: 560,
              margin: '0 auto 2rem',
            }}
          >
            No hiring fees. No overhead. Just senior AI engineers automating
            your business at a flat monthly rate.
          </p>
          <Link
            href="/book-call?source=pricing-hero"
            className="cta-button"
            style={{
              display: 'inline-block',
              padding: '0.75rem 2rem',
              fontSize: '0.9375rem',
            }}
          >
            Book a Demo
          </Link>
        </div>
      </section>

      {/* ── Price Anchor Comparison ── */}
      <section
        style={{
          padding: '3rem 1.5rem',
          backgroundColor: 'var(--bg-alt)',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div
            style={{
              maxWidth: 560,
              margin: '0 auto 2.5rem',
              textAlign: 'center',
            }}
          >
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--text)',
                lineHeight: 1.3,
                marginBottom: '0.5rem',
              }}
            >
              Why pay more for less?
            </h2>
            <p
              style={{
                fontSize: '0.9375rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
              }}
            >
              Compare the true cost of getting AI automation done.
            </p>
          </div>

          <div
            className="pricing-anchor-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              alignItems: 'stretch',
            }}
          >
            {/* Option 1 */}
            <div
              style={{
                padding: '1.75rem 1.5rem',
                backgroundColor: 'var(--bg)',
                borderRadius: 12,
                border: '1px solid var(--border)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <p
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '0.75rem',
                }}
              >
                Full-time Senior AI Engineer
              </p>
              <p
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--text)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  marginBottom: '0.25rem',
                }}
              >
                $160k+
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                / year
              </p>
            </div>

            {/* Option 2 */}
            <div
              style={{
                padding: '1.75rem 1.5rem',
                backgroundColor: 'var(--bg)',
                borderRadius: 12,
                border: '1px solid var(--border)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <p
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '0.75rem',
                }}
              >
                Traditional Agency
              </p>
              <p
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--text)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  marginBottom: '0.25rem',
                }}
              >
                $10k+
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                setup + retainer
              </p>
            </div>

            {/* Winner */}
            <div
              style={{
                padding: '1.75rem 1.5rem',
                backgroundColor: 'var(--bg)',
                borderRadius: 12,
                border: '2px solid var(--accent)',
                boxShadow: '0 4px 24px rgba(13, 148, 136, 0.12)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: -12,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'white',
                  backgroundColor: 'var(--accent)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: 9999,
                  whiteSpace: 'nowrap',
                }}
              >
                Best value
              </span>
              <p
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '0.75rem',
                }}
              >
                NativeBase
              </p>
              <p
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--text)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  marginBottom: '0.25rem',
                }}
              >
                $2,499
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                / month
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing Tiers ── */}
      <section
        id="plans"
        style={{
          padding: '4rem 1.5rem',
          backgroundColor: 'var(--bg)',
        }}
      >
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div
            style={{
              maxWidth: 640,
              margin: '0 auto 2.5rem',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '0.5rem',
              }}
            >
              Plans
            </p>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--text)',
                lineHeight: 1.3,
              }}
            >
              Simple, transparent pricing
            </h2>
          </div>
          <Pricing />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem',
              maxWidth: 640,
              margin: '3rem auto 0',
            }}
          >
            <div
              style={{
                padding: '1.5rem 1.75rem',
                borderRadius: 12,
                border: '1px solid var(--border)',
                backgroundColor: 'rgba(13,148,136,0.06)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  backgroundColor: 'rgba(13,148,136,0.12)',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </span>
              <div>
                <p
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--text)',
                    marginBottom: '0.25rem',
                    lineHeight: 1.3,
                  }}
                >
                  Try it for a week
                </p>
                <p
                  style={{
                    fontSize: '0.9375rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.4,
                    margin: 0,
                  }}
                >
                  Not loving it after a week? Get 75% back, no questions asked.
                </p>
              </div>
            </div>
            <div
              style={{
                padding: '1.5rem 1.75rem',
                borderRadius: 12,
                border: '1px solid var(--border)',
                backgroundColor: 'rgba(13,148,136,0.06)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  backgroundColor: 'rgba(13,148,136,0.12)',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              </span>
              <div>
                <p
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--text)',
                    marginBottom: '0.25rem',
                    lineHeight: 1.3,
                  }}
                >
                  Pause anytime
                </p>
                <p
                  style={{
                    fontSize: '0.9375rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.4,
                    margin: 0,
                  }}
                >
                  Temporarily pause your subscription anytime, no sweat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Risk Reversal Badges ── */}
      <section
        style={{
          padding: '3rem 1.5rem',
          backgroundColor: 'var(--bg-alt)',
        }}
      >
        <div
          className="risk-badges-grid"
          style={{
            maxWidth: 800,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
          }}
        >
          {[
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              ),
              title: 'Pause or Cancel Anytime',
              desc: 'No lock-in contracts. Pause when you need to, resume when you\u2019re ready.',
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              ),
              title: 'Senior Engineers Only',
              desc: 'No juniors, no interns. Every project is handled by experienced AI engineers.',
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              ),
              title: '72-Hour Delivery Guarantee',
              desc: 'Most requests delivered within 48\u201372 hours. We move fast so you can too.',
            },
          ].map((badge) => (
            <div
              key={badge.title}
              style={{
                padding: '1.5rem',
                backgroundColor: 'var(--bg)',
                borderRadius: 12,
                border: '1px solid var(--border)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: 'rgba(13, 148, 136, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {badge.icon}
              </div>
              <h3
                style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--text)',
                }}
              >
                {badge.title}
              </h3>
              <p
                style={{
                  fontSize: '0.8125rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.55,
                }}
              >
                {badge.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Credit Guide ── */}
      <section
        style={{
          padding: '4rem 1.5rem',
          backgroundColor: 'var(--bg)',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div
            style={{
              maxWidth: 640,
              margin: '0 auto 2.5rem',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '0.5rem',
              }}
            >
              Credit Guide
            </p>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--text)',
                lineHeight: 1.3,
                marginBottom: '0.5rem',
              }}
            >
              What does a credit get you?
            </h2>
            <p
              style={{
                fontSize: '0.9375rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
              }}
            >
              Credits are the unit of work at NativeBase. Each automation
              request costs a number of credits based on its complexity.
            </p>
          </div>

          <div
            style={{
              borderRadius: 12,
              border: '1px solid var(--border)',
              overflow: 'hidden',
              marginBottom: '1.5rem',
            }}
          >
            <table
              className="credits-table-wrap"
              style={{
                width: '100%',
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
                {CREDIT_EXAMPLES.map((ex, i) => (
                  <tr
                    key={ex.task}
                    style={{
                      backgroundColor:
                        i % 2 === 0 ? 'var(--bg)' : 'var(--bg-alt)',
                    }}
                  >
                    <td
                      style={{
                        padding: '0.625rem 1rem',
                        color: 'var(--text-muted)',
                        borderBottom:
                          i < CREDIT_EXAMPLES.length - 1
                            ? '1px solid var(--border)'
                            : 'none',
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
                        borderBottom:
                          i < CREDIT_EXAMPLES.length - 1
                            ? '1px solid var(--border)'
                            : 'none',
                      }}
                    >
                      {ex.credits}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link
              href="/credits"
              style={{
                fontSize: '0.9375rem',
                fontWeight: 600,
                color: 'var(--accent)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              See the full credit guide
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        style={{
          padding: '4rem 1.5rem',
          backgroundColor: 'var(--bg-alt)',
        }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div
            style={{
              maxWidth: 560,
              margin: '0 auto 2.5rem',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '0.5rem',
              }}
            >
              FAQ
            </p>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--text)',
                lineHeight: 1.3,
              }}
            >
              Common questions, straight answers
            </h2>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                style={{
                  padding: '1.25rem 1.5rem',
                  backgroundColor: 'var(--bg)',
                  borderRadius: 12,
                  border: '1px solid var(--border)',
                }}
              >
                <h3
                  style={{
                    fontSize: '0.9375rem',
                    fontWeight: 700,
                    color: 'var(--text)',
                    marginBottom: '0.375rem',
                  }}
                >
                  {faq.q}
                </h3>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                  }}
                >
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / Book a Demo ── */}
      <section
        style={{
          padding: '4rem 1.5rem',
          backgroundColor: 'var(--bg)',
        }}
      >
        <div
          style={{
            maxWidth: 560,
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              marginBottom: '0.5rem',
              color: 'var(--text)',
            }}
          >
            Ready to automate?
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: 'var(--text-muted)',
              marginBottom: '2rem',
            }}
          >
            Book a free intro call. We&apos;ll map out which workflows
            we can automate for you.
          </p>
          <SlotPicker source="pricing" />
        </div>
      </section>
    </div>
  );
}

import Link from 'next/link';
import { TypewriterHeading } from '@/components/TypewriterHeading';
import { BookCallButton } from '@/components/BookCallButton';
import { HowItWorksTimeline } from '@/components/HowItWorksTimeline';
import { WhatYouGet } from '@/components/WhatYouGet';
import { Pricing } from '@/components/Pricing';
import { SlotPicker } from '@/components/SlotPicker';
import { UseCaseCards } from '@/components/UseCaseCards';

import { buildSeoMetadata } from '@/lib/page-metadata';
export const metadata = buildSeoMetadata({
  title: 'Transform your business to be AI native',
  description:
    'Transform your business to be AI native. Subscription-based workflow automation delivered in under 2 days. Starting at $2,499/month.',
  path: '/',
});

export default function Home() {
  return (
    <div>
      <section
        className="hero-section"
        style={{
          padding: '2rem 1.5rem 4rem',
          backgroundColor: 'var(--bg)',
        }}
      >
        <div
          style={{
            maxWidth: 640,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            minHeight: 'min(70vh, 560px)',
            justifyContent: 'center',
          }}
        >
          <TypewriterHeading />
          <p
            style={{
              fontSize: '1.125rem',
              lineHeight: 1.5,
              color: 'var(--text-muted)',
              maxWidth: 420,
              margin: '-0.5rem auto 1.75rem',
              fontWeight: 500,
            }}
          >
            Removing redundant steps. Automating your workflows.
          </p>
          <BookCallButton />
          <p
            style={{
              marginTop: '1rem',
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
            }}
          >
            Starting at $2,499 / month
          </p>
        </div>
      </section>

      {/* How it works — timeline with scroll animation */}
      <section
        id="how-it-works"
        style={{
          padding: '4rem 1.5rem',
          backgroundColor: 'var(--bg-alt)',
        }}
      >
        <div style={{ maxWidth: 640, margin: '0 auto 3rem', textAlign: 'center' }}>
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
            How it works
          </p>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--text)',
              lineHeight: 1.3,
            }}
          >
            Simple process. Serious automation.
          </h2>
        </div>
        <HowItWorksTimeline />
      </section>

      {/* What you'll get */}
      <section
        id="what-you-get"
        style={{
          padding: '4rem 1.5rem',
          backgroundColor: 'var(--bg)',
        }}
      >
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ maxWidth: 640, margin: '0 auto 2.5rem', textAlign: 'center' }}>
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
              What you&apos;ll get
            </p>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--text)',
                lineHeight: 1.3,
              }}
            >
              Everything you need, nothing you don&apos;t
            </h2>
          </div>
          <WhatYouGet />
        </div>
      </section>

      {/* Ownership */}
      <section
        id="ownership"
        style={{
          padding: '4rem 1.5rem',
          backgroundColor: 'var(--bg-alt)',
        }}
      >
        <div
          style={{
            maxWidth: 800,
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
              color: 'var(--text-muted)',
              marginBottom: '0.5rem',
            }}
          >
            Complete ownership
          </p>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--text)',
              lineHeight: 1.3,
              marginBottom: '1rem',
            }}
          >
            You own everything we build
          </h2>
          <p
            style={{
              fontSize: '1.0625rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              marginBottom: '2.5rem',
            }}
          >
            Every automation is deployed on your accounts and your API keys. No lock-in, no middleman. End-to-end ownership from day one.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              alignItems: 'stretch',
            }}
          >
            <div
              style={{
                padding: '1.5rem 1.25rem',
                borderRadius: 12,
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: 'rgba(13,148,136,0.12)',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  <line x1="12" y1="11" x2="12" y2="17" />
                  <line x1="9" y1="14" x2="15" y2="14" />
                </svg>
              </span>
              <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text)' }}>
                Your accounts
              </span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Deployed to your infrastructure, not ours
              </span>
            </div>
            <div
              style={{
                padding: '1.5rem 1.25rem',
                borderRadius: 12,
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: 'rgba(13,148,136,0.12)',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                </svg>
              </span>
              <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text)' }}>
                Your API keys
              </span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Your credentials, your control—we never hold them
              </span>
            </div>
            <div
              style={{
                padding: '1.5rem 1.25rem',
                borderRadius: 12,
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: 'rgba(13,148,136,0.12)',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </span>
              <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text)' }}>
                End-to-end ownership
              </span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                100% yours from day one—code, data, and control
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section
        id="use-cases"
        style={{
          padding: '4rem 1.5rem',
          backgroundColor: 'var(--bg)',
        }}
      >
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ maxWidth: 640, margin: '0 auto 2.5rem', textAlign: 'center' }}>
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
              Use cases
            </p>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--text)',
                lineHeight: 1.3,
              }}
            >
              Built for your industry
            </h2>
          </div>
          <UseCaseCards />
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        style={{
          padding: '4rem 1.5rem',
          backgroundColor: 'var(--bg-alt)',
        }}
      >
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ maxWidth: 640, margin: '0 auto 2.5rem', textAlign: 'center' }}>
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
              Pricing
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

      {/* CTA */}
      <section
        id="contact"
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
            Ready to go AI native?
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: 'var(--text-muted)',
              marginBottom: '2rem',
            }}
          >
            Book a free intro call. We&apos;ll discuss how to automate your workflows.
          </p>
          <SlotPicker source="landing" />
        </div>
      </section>
    </div>
  );
}

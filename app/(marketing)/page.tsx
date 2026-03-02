import type { Metadata } from 'next';
import Link from 'next/link';
import { TypewriterHeading } from '@/components/TypewriterHeading';
import { BookCallButton } from '@/components/BookCallButton';
import { HowItWorksTimeline } from '@/components/HowItWorksTimeline';
import { WhatYouGet } from '@/components/WhatYouGet';
import { Pricing } from '@/components/Pricing';
import { SlotPicker } from '@/components/SlotPicker';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://native-base-pink.vercel.app');

export const metadata: Metadata = {
  title: 'Transform your business to be AI native',
  description:
    'Transform your business to be AI native. Subscription-based workflow automation delivered in under 2 days. Starting at $2,499/month.',
  openGraph: {
    title: 'Transform your business to be AI native',
    description:
      'Transform your business to be AI native. Subscription-based workflow automation delivered in under 2 days. No long-term commitment. Starting at $2,499/month.',
    images: [
      {
        url: `${baseUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Native Base – Transform your business to be AI native. Subscription-based workflow automation.',
      },
    ],
  },
};

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
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: '1rem',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.8125rem',
                color: 'var(--text-muted)',
                backgroundColor: 'var(--bg-alt)',
                padding: '0.375rem 0.75rem',
                borderRadius: 9999,
                border: '1px solid var(--border)',
              }}
            >
              No long-term commitment.
            </span>
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.8125rem',
                color: 'var(--text-muted)',
                backgroundColor: 'var(--bg-alt)',
                padding: '0.375rem 0.75rem',
                borderRadius: 9999,
                border: '1px solid var(--border)',
              }}
            >
              A subscription model.
            </span>
          </div>
          <TypewriterHeading />
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

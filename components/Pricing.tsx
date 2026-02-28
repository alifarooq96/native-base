'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

const CHECK = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const PLANS = [
  {
    name: 'Starter',
    price: '$2,499',
    period: '/ month',
    description: 'For teams getting started with AI automation.',
    cta: 'Get started',
    ctaHref: '/signup',
    highlighted: false,
    features: [
      '10 credits per month',
      '1 concurrent request at a time',
      '48-hour average delivery',
      'Dedicated Slack channel',
      'Pause or cancel anytime',
      'Unused credits roll over (up to 20)',
    ],
  },
  {
    name: 'Pro',
    price: '$3,999',
    period: '/ month',
    description: 'For teams that need more throughput and priority support.',
    cta: 'Get started',
    ctaHref: '/signup',
    highlighted: true,
    badge: 'Most popular',
    features: [
      '25 credits per month',
      '2 concurrent requests at a time',
      '48-hour average delivery',
      'Priority on-call support 12/5',
      'Dedicated Slack channel',
      'Pause or cancel anytime',
      'Unused credits roll over (up to 50)',
      'Everything in Starter',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: "For organisations that need more than what Starter and Pro offer.",
    cta: "Let's talk",
    ctaHref: '/#contact',
    highlighted: false,
    features: [
      'Custom credit allocation',
      'Unlimited concurrent requests',
      'Dedicated account manager',
      'Custom SLAs and turnaround',
      'Priority on-call support 24/7',
      'Volume discounts',
      'Everything in Pro',
    ],
  },
];

export function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '-5% 0px', threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-in-view={inView}
      className="pricing-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        alignItems: 'stretch',
      }}
    >
      {PLANS.map((plan, i) => (
        <div
          key={plan.name}
          className="pricing-card"
          data-index={i}
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1.75rem 1.5rem',
            backgroundColor: 'var(--bg)',
            borderRadius: 12,
            border: plan.highlighted
              ? '2px solid var(--accent)'
              : '1px solid var(--border)',
            boxShadow: plan.highlighted
              ? '0 4px 24px rgba(13, 148, 136, 0.12)'
              : 'var(--card-shadow)',
            position: 'relative',
            overflow: 'visible',
          }}
        >
          {plan.badge && (
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
              {plan.badge}
            </span>
          )}

          <h3
            style={{
              fontSize: '1.125rem',
              fontWeight: 700,
              color: 'var(--text)',
              marginBottom: '0.25rem',
            }}
          >
            {plan.name}
          </h3>

          <p
            style={{
              fontSize: '0.8125rem',
              color: 'var(--text-muted)',
              marginBottom: '1rem',
              lineHeight: 1.5,
            }}
          >
            {plan.description}
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.25rem',
              marginBottom: '1.25rem',
            }}
          >
            <span
              style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--text)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              {plan.price}
            </span>
            {plan.period && (
              <span
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)',
                }}
              >
                {plan.period}
              </span>
            )}
          </div>

          <Link
            href={plan.ctaHref}
            onClick={() => {
              if (typeof window !== 'undefined') {
                import('@/lib/mixpanel').then(({ mixpanel }) => {
                  mixpanel.track('Pricing Plan Clicked', {
                    plan: plan.name,
                    cta: plan.cta,
                  });
                });
              }
            }}
            className={plan.highlighted ? 'cta-button' : 'cta-button-outline'}
            style={{
              display: 'block',
              textAlign: 'center',
              padding: '0.625rem 1rem',
              fontWeight: 600,
              fontSize: '0.875rem',
              borderRadius: 8,
              marginBottom: '1.25rem',
              ...(plan.highlighted
                ? {}
                : {
                    backgroundColor: 'transparent',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                  }),
            }}
          >
            {plan.cta}
          </Link>

          <ul
            style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              lineHeight: 1.5,
            }}
          >
            {plan.features.map((f) => {
              const creditMatch = f.match(/^(\d+ credits?|Custom credit\s?\w*)/i);
              return (
                <li
                  key={f}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  {CHECK}
                  {creditMatch ? (
                    <span>
                      <Link
                        href="/credits/"
                        style={{
                          color: 'var(--accent)',
                          textDecoration: 'underline',
                          fontWeight: 600,
                        }}
                      >
                        {creditMatch[0]}
                      </Link>
                      {f.slice(creditMatch[0].length)}
                    </span>
                  ) : (
                    f
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

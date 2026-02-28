'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const CHECK = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const PLANS = [
  {
    key: 'starter',
    name: 'Starter',
    price: '$2,499',
    period: '/ month',
    description: 'For teams getting started with AI automation.',
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
    key: 'pro',
    name: 'Pro',
    price: '$3,999',
    period: '/ month',
    description: 'For teams that need more throughput and priority support.',
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
];

interface BookingInfo {
  id: string;
  startTime: string;
  email: string;
}

function formatBookingDate(isoStr: string): string {
  return new Date(isoStr).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function formatBookingTime(isoStr: string): string {
  return new Date(isoStr).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function SubscribeOverlay() {
  const searchParams = useSearchParams();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [activating, setActivating] = useState(false);
  const [booking, setBooking] = useState<BookingInfo | null>(null);

  const isSuccess = searchParams.get('subscription') === 'success';

  useEffect(() => {
    if (!isSuccess) return;
    setActivating(true);

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 15;
    const interval = 2000;

    async function poll() {
      if (cancelled) return;
      attempts++;
      try {
        const res = await fetch('/api/stripe/verify', { method: 'POST' });
        const data = await res.json();
        if (data.subscriptionStatus === 'active') {
          if (typeof window !== 'undefined') {
            const { mixpanel } = await import('@/lib/mixpanel');
            mixpanel.track('Purchase', {
              user_id: data.userId,
              currency: 'USD',
            });
            mixpanel.track('Conversion', {
              'Conversion Type': 'subscription',
            });
          }
          window.location.href = '/board';
          return;
        }
      } catch {
        // ignore
      }
      if (attempts < maxAttempts && !cancelled) {
        setTimeout(poll, interval);
      } else if (!cancelled) {
        window.location.href = '/board';
      }
    }

    const timer = setTimeout(poll, 1500);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [isSuccess]);

  useEffect(() => {
    fetch('/api/bookings/mine')
      .then((r) => r.json())
      .then((data) => { if (data.booking) setBooking(data.booking); })
      .catch(() => {});
  }, []);

  if (activating) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 60,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 40,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(2px)',
        }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginTop: '1rem' }}>
          Subscription activated!
        </h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          Loading your dashboard...
        </p>
      </div>
    );
  }

  async function handleSubscribe(plan: string) {
    setError('');
    setLoadingPlan(plan);

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 60,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 40,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '3rem 1.5rem 2rem',
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(2px)',
      }}
    >
      <div
        style={{
          maxWidth: 720,
          width: '100%',
          backgroundColor: 'var(--bg)',
          borderRadius: 16,
          border: '1px solid var(--border)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          padding: '2.5rem 2rem',
          flexShrink: 0,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: 'var(--text)',
              marginBottom: '0.5rem',
              letterSpacing: '-0.02em',
            }}
          >
            Choose your plan to get started
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            You need an active subscription to access your dashboard.
          </p>
        </div>

        {error && (
          <p
            style={{
              fontSize: '0.875rem',
              color: '#dc2626',
              backgroundColor: '#fef2f2',
              padding: '0.625rem 1rem',
              borderRadius: 8,
              border: '1px solid #fecaca',
              marginBottom: '1.5rem',
              textAlign: 'center',
            }}
          >
            {error}
          </p>
        )}

        <div
          className="subscribe-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
          }}
        >
          {PLANS.map((plan) => (
            <div
              key={plan.key}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '1.5rem 1.25rem',
                backgroundColor: 'var(--bg)',
                borderRadius: 12,
                border: plan.highlighted
                  ? '2px solid var(--accent)'
                  : '1px solid var(--border)',
                boxShadow: plan.highlighted
                  ? '0 4px 24px rgba(13, 148, 136, 0.12)'
                  : 'none',
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
                <span
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  {plan.period}
                </span>
              </div>

              <button
                onClick={() => handleSubscribe(plan.key)}
                disabled={!!loadingPlan}
                className={plan.highlighted ? 'cta-button' : 'cta-button-outline'}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'center',
                  padding: '0.625rem 1rem',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  borderRadius: 8,
                  marginBottom: '1.25rem',
                  cursor: loadingPlan ? 'not-allowed' : 'pointer',
                  opacity: loadingPlan ? 0.7 : 1,
                  ...(plan.highlighted
                    ? {}
                    : {
                        backgroundColor: 'transparent',
                        border: '1px solid var(--border)',
                        color: 'var(--text)',
                      }),
                }}
              >
                {loadingPlan === plan.key ? 'Redirecting...' : 'Subscribe'}
              </button>

              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  fontSize: '0.8125rem',
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

        {/* Consultation / existing booking */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
          {booking ? (
            <Link
              href="/book"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 0.5rem 0.5rem 0.75rem',
                backgroundColor: '#f0fdf4',
                borderRadius: 9999,
                border: '1px solid #bbf7d0',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'box-shadow 0.2s',
              }}
              onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'; }}
              onMouseOut={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
            >
              <span
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <div style={{ textAlign: 'left', minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: 'var(--text)',
                    lineHeight: 1.3,
                  }}
                >
                  Consultation booked
                </div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.3,
                  }}
                >
                  {formatBookingDate(booking.startTime)} at {formatBookingTime(booking.startTime)}
                </div>
              </div>
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ display: 'block' }}
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          ) : (
            <Link
              href="/book"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 0.5rem 0.5rem 0.75rem',
                backgroundColor: 'var(--bg-alt)',
                borderRadius: 9999,
                border: '1px solid var(--border)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'box-shadow 0.2s',
              }}
              onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'; }}
              onMouseOut={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/founder-zoomed.jpg"
                alt=""
                width={40}
                height={40}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--border)',
                  flexShrink: 0,
                }}
              />
              <div style={{ textAlign: 'left', minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: 'var(--text)',
                    lineHeight: 1.3,
                  }}
                >
                  Need help deciding?
                </div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.3,
                  }}
                >
                  Book a free 15-min consultation
                </div>
              </div>
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ display: 'block' }}
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          )}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 640px) {
          .subscribe-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

'use client';

import Link from 'next/link';

const DEFAULT_AVATAR = '/founder-zoomed.jpg';

type BookCallButtonProps = {
  avatarSrc?: string;
};

export function BookCallButton({ avatarSrc = DEFAULT_AVATAR }: BookCallButtonProps) {
  function handleClick() {
    if (typeof window !== 'undefined') {
      import('@/lib/mixpanel').then(({ mixpanel }) => {
        mixpanel.track('Intro Call CTA Clicked', {
          source: window.location.pathname === '/' ? 'landing' : window.location.pathname,
        });
      });
    }
  }

  return (
    <Link
      href="/#contact"
      onClick={handleClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.5rem 0.5rem 0.5rem 0.75rem',
        backgroundColor: '#ffffff',
        borderRadius: 9999,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        textDecoration: 'none',
        color: 'inherit',
        maxWidth: '100%',
        transition: 'box-shadow 0.2s, transform 0.15s',
        overflow: 'hidden',
      }}
      className="book-call-button"
    >
      <img
        src={avatarSrc}
        alt=""
        width={44}
        height={44}
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          objectFit: 'cover',
          border: '2px solid #e2e8f0',
          flexShrink: 0,
        }}
      />
      <div
        style={{
          textAlign: 'left',
          minWidth: 0,
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: '1rem',
            color: '#1a1a1a',
            lineHeight: 1.3,
          }}
        >
          Book a free 15-min intro call
        </div>
        <div
          style={{
            fontWeight: 400,
            fontSize: '0.8125rem',
            color: '#666666',
            lineHeight: 1.3,
          }}
        >
          Let&apos;s discuss your internal tool
        </div>
      </div>
      <span
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          backgroundColor: '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg
          width="18"
          height="18"
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
  );
}

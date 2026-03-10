'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'Does this require an API from GEICO?',
    a: 'No. NativeBase uses AI-driven browser automation—the same way a human CSR logs in and navigates the GEICO agent portal. There is no API dependency, no integration request, and no approval process from GEICO required.',
  },
  {
    q: 'Is my data secure?',
    a: 'Absolutely. All data at rest is AES-256 bit encrypted, and all data in transit is TLS-secured. Our infrastructure meets the highest safety and encryption standards, and we never store carrier credentials on our servers.',
  },
  {
    q: 'Can I use this for other carriers besides GEICO?',
    a: 'Yes. The same AI automation technology works across carrier portals—Progressive, Travelers, Liberty Mutual, and more. GEICO is one of the many portals we support.',
  },
  {
    q: 'How long does it take to get started?',
    a: 'Most agencies are live within 48 hours. We handle the full setup, configuration, and testing so your team can start quoting with AI on the GEICO portal immediately.',
  },
  {
    q: 'What happens if the GEICO portal changes its layout?',
    a: 'Because our AI reads the portal like a human—understanding labels, context, and structure—it adapts to layout changes automatically. This makes it far more resilient than brittle RPA scripts.',
  },
];

export function GeicoFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        maxWidth: 720,
        margin: '0 auto',
      }}
    >
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            style={{
              borderRadius: 12,
              border: '1px solid var(--border)',
              backgroundColor: isOpen ? 'rgba(13,148,136,0.04)' : 'var(--bg)',
              overflow: 'hidden',
              transition: 'background-color 0.2s',
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                padding: '1.125rem 1.25rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                color: 'var(--text)',
                fontSize: '0.9375rem',
                fontWeight: 600,
                lineHeight: 1.4,
              }}
            >
              {faq.q}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-muted)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  flexShrink: 0,
                  transition: 'transform 0.25s',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div
              style={{
                maxHeight: isOpen ? 300 : 0,
                opacity: isOpen ? 1 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.3s ease, opacity 0.25s ease',
              }}
            >
              <p
                style={{
                  padding: '0 1.25rem 1.125rem',
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.7,
                }}
              >
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

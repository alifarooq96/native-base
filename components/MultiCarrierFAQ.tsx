'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'Do I need a separate integration for each carrier?',
    a: 'No. One NativeBase automation understands and fills multiple carrier portals. You upload data once; our AI maps it to each carrier’s form schema (Progressive, Travelers, Liberty Mutual, Safeco, etc.) and prefills them. Add or remove carriers without rebuilding the workflow.',
  },
  {
    q: 'Which carriers are supported?',
    a: 'We support major P&C carrier agent portals including Progressive, Travelers, Liberty Mutual, Safeco, and others. Our AI reads each portal like a human, so we can extend to new carriers without custom API integrations. Ask us about your specific carrier list.',
  },
  {
    q: 'Is my data secure when flowing to multiple portals?',
    a: 'Yes. All data at rest is AES-256 bit encrypted, and all data in transit is TLS-secured. We never store your carrier credentials on our servers. The same security standards apply whether you’re quoting with one carrier or ten.',
  },
  {
    q: 'How does one source of data become quotes from multiple carriers?',
    a: 'You provide a single source—dec page, ACORD form, or CSV. Our AI extracts every field (VIN, driver info, coverage limits, etc.) and maps it to each carrier’s unique form layout and labels. Each portal is then prefilled automatically, so you get bindable quotes from every carrier without re-typing.',
  },
  {
    q: 'Can I add or remove carriers later?',
    a: 'Yes. Multi-carrier interoperability is built in. We work within your existing set of tools and don’t disrupt agent workflow—you can add new carrier portals or pause others as your appetite changes, with no lock-in to a fixed set.',
  },
];

export function MultiCarrierFAQ() {
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
                maxHeight: isOpen ? 400 : 0,
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

'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'What do you mean by "agent portal with quote-to-bind capabilities"?',
    a: 'We mean a workflow that gives you the same outcome as logging into carrier agent portals (Progressive, GEICO, Travelers, etc.) and manually quoting and binding—but automated. You get bindable quotes from real carrier portals without rekeying. NativeBase is the layer that connects your data to those portals and delivers quote-to-bind in under 5 minutes.',
  },
  {
    q: 'Do I still use my carrier agent portals?',
    a: 'Yes. Our AI operates within the same carrier portals and existing set of tools you use today. It logs in, navigates, prefills forms, and retrieves bindable quotes—without disrupting agent workflow. You keep your relationships and credentials; we automate the data entry and flow so your team spends time selling, not typing.',
  },
  {
    q: 'Which carriers are supported for quote-to-bind?',
    a: 'We support major P&C carrier agent portals including Progressive, GEICO, Travelers, Liberty Mutual, Safeco, and others. Because we use AI that reads each portal like a human, we can extend to new carriers without custom APIs. Ask us about your carrier list.',
  },
  {
    q: 'Is this secure and compliant?',
    a: 'Yes. All data at rest is AES-256 encrypted and all data in transit is TLS-secured. We never store your carrier credentials on our servers. The workflow is designed to meet the same standards agencies expect from their agent portals and AMS.',
  },
  {
    q: 'How fast can we go from quote to bind?',
    a: 'From a single upload (dec page, ACORD, or CSV) to a bindable quote, most workflows complete in under 5 minutes. Your CSR reviews the quote, adjusts if needed, and binds—all without re-typing data into the portal.',
  },
];

export function QuoteToBindFAQ() {
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

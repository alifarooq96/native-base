'use client';

import { useState, type ReactNode } from 'react';

export type FAQItem = {
  q: string;
  a: ReactNode;
};

export function GenericFAQ({ faqs }: { faqs: FAQItem[] }) {
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
                maxHeight: isOpen ? 500 : 0,
                opacity: isOpen ? 1 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.3s ease, opacity 0.25s ease',
              }}
            >
              <div
                style={{
                  padding: '0 1.25rem 1.125rem',
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.7,
                }}
              >
                {faq.a}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

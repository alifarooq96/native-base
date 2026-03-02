'use client';

import { SlotPicker } from '@/components/SlotPicker';

export function BookCallClient({ source }: { source: string }) {
  return (
    <div
      style={{
        maxWidth: 560,
        margin: '0 auto',
        padding: '3rem 1.5rem 4rem',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--text)',
            marginBottom: '0.5rem',
          }}
        >
          Book a free 15-minute workflow audit
        </h1>
        <p
          style={{
            fontSize: '0.9375rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
          }}
        >
          Pick a time that works for you. We&apos;ll show you exactly which
          manual tasks we can automate&mdash;live on the call.
        </p>
      </div>

      <SlotPicker source={source} />
    </div>
  );
}

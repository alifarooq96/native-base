'use client';

import { useState } from 'react';

export function GeicoTimeCalculator() {
  const [quotesPerWeek, setQuotesPerWeek] = useState(15);
  const [minPerQuote, setMinPerQuote] = useState(20);

  const manualHoursYear = Math.round((quotesPerWeek * minPerQuote * 52) / 60);
  const nativeBaseMinPerQuote = 5;
  const autoHoursYear = Math.round(
    (quotesPerWeek * nativeBaseMinPerQuote * 52) / 60,
  );
  const savedHours = manualHoursYear - autoHoursYear;

  return (
    <div
      style={{
        maxWidth: 420,
        width: '100%',
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 16,
        padding: '1.75rem 1.5rem',
        marginTop: '2.5rem',
      }}
    >
      <p
        style={{
          fontSize: '0.6875rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#5eead4',
          marginBottom: '1.25rem',
        }}
      >
        Time-Saved Calculator
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          <span style={{ fontSize: '0.8125rem', color: '#cbd5e1' }}>
            GEICO quotes / week
          </span>
          <input
            type="number"
            min={1}
            max={500}
            value={quotesPerWeek}
            onChange={(e) => setQuotesPerWeek(Math.max(1, Number(e.target.value)))}
            style={{
              padding: '0.625rem 0.75rem',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.08)',
              color: '#f1f5f9',
              fontSize: '1rem',
              fontWeight: 600,
              outline: 'none',
              width: '100%',
            }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          <span style={{ fontSize: '0.8125rem', color: '#cbd5e1' }}>
            Estimated min / quote (manual)
          </span>
          <input
            type="number"
            min={1}
            max={120}
            value={minPerQuote}
            onChange={(e) => setMinPerQuote(Math.max(1, Number(e.target.value)))}
            style={{
              padding: '0.625rem 0.75rem',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.08)',
              color: '#f1f5f9',
              fontSize: '1rem',
              fontWeight: 600,
              outline: 'none',
              width: '100%',
            }}
          />
        </label>
      </div>

      <div
        style={{
          marginTop: '1.5rem',
          padding: '1rem 1.25rem',
          background: 'rgba(13,148,136,0.18)',
          border: '1px solid rgba(94,234,212,0.3)',
          borderRadius: 10,
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
          NativeBase saves you
        </p>
        <p
          style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: '#5eead4',
            lineHeight: 1.1,
          }}
        >
          {savedHours.toLocaleString()} hours/year
        </p>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.375rem' }}>
          That&apos;s {Math.round(savedHours / 8)} full work days back
        </p>
      </div>
    </div>
  );
}

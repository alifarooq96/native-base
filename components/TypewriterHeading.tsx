'use client';

import { useState, useEffect } from 'react';

const PREFIX = 'Transform your business to be ';
const OPTIONS = [
  'AI native.',
  'cost efficient.',
  'infinitely scalable.',
  'future-proof.',
  'workflow-driven.',
];

const TYPE_MS = 80;
const DELETE_MS = 50;
const PAUSE_AT_END_MS = 2200;
const PAUSE_BEFORE_NEXT_MS = 400;

export function TypewriterHeading() {
  const [index, setIndex] = useState(0);
  const [suffix, setSuffix] = useState(OPTIONS[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const full = OPTIONS[index];

    if (!isDeleting) {
      if (suffix.length < full.length) {
        const delay = suffix.length === 0 ? PAUSE_BEFORE_NEXT_MS : TYPE_MS;
        const t = setTimeout(() => setSuffix(full.slice(0, suffix.length + 1)), delay);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setIsDeleting(true), PAUSE_AT_END_MS);
      return () => clearTimeout(t);
    }

    if (suffix.length > 0) {
      const t = setTimeout(() => setSuffix(suffix.slice(0, -1)), DELETE_MS);
      return () => clearTimeout(t);
    }

    setIsDeleting(false);
    setIndex((i) => (i + 1) % OPTIONS.length);
  }, [index, suffix, isDeleting]);

  return (
    <h1
      style={{
        fontSize: 'clamp(2rem, 4.5vw, 2.75rem)',
        fontWeight: 700,
        letterSpacing: '-0.03em',
        lineHeight: 1.25,
        marginBottom: '2rem',
        color: 'var(--text)',
      }}
    >
      <span style={{ display: 'block' }}>{PREFIX}</span>
      <span
        style={{
          display: 'block',
          minHeight: '1.25em',
          color: 'var(--accent)',
          textDecoration: 'underline',
        }}
      >
        {suffix}
      </span>
    </h1>
  );
}

'use client';

export function ScrollToTopButton() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="cta-button-outline"
      style={{
        fontSize: '1rem',
        padding: '0.9375rem 2rem',
        borderRadius: 10,
        border: '1px solid rgba(255,255,255,0.2)',
        color: '#cbd5e1',
        background: 'transparent',
        cursor: 'pointer',
      }}
    >
      Calculate My Time Savings
    </button>
  );
}

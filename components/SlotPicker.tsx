'use client';

import { useState, useEffect } from 'react';

type Slot = {
  date: string;
  startTime: string;
  endTime: string;
};

type BookingStep = 'date' | 'time' | 'form' | 'success';

export function SlotPicker({
  prefillName,
  prefillEmail,
}: {
  prefillName?: string;
  prefillEmail?: string;
} = {}) {
  const [step, setStep] = useState<BookingStep>('date');
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [name, setName] = useState(prefillName || '');
  const [email, setEmail] = useState(prefillEmail || '');
  const [company, setCompany] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const today = new Date();
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  useEffect(() => {
    setLoading(true);
    setError(null);
    const from = dates[0];
    const to = dates[dates.length - 1];
    fetch(`/api/slots?from=${from}&to=${to}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load slots');
        return res.json();
      })
      .then((data) => setSlots(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const slotsForDate = selectedDate
    ? slots.filter((s) => s.date === selectedDate)
    : [];

  function formatDate(dateStr: string): string {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }

  function formatTime(isoStr: string): string {
    return new Date(isoStr).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  function hasSlots(dateStr: string): boolean {
    return slots.some((s) => s.date === dateStr);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSlot) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company: company || undefined,
          date: selectedSlot.date,
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Booking failed');
      }

      setStep('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  }

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    borderRadius: 12,
    border: '1px solid var(--border)',
    padding: '1.25rem',
    maxWidth: 480,
    margin: '0 auto',
    boxShadow: 'var(--card-shadow)',
    width: '100%',
  };

  if (step === 'success') {
    return (
      <div style={cardStyle}>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              backgroundColor: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem' }}>
            You&apos;re booked!
          </h3>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
            {selectedSlot && formatDate(selectedSlot.date)} at {selectedSlot && formatTime(selectedSlot.startTime)}
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted-soft)' }}>
            We&apos;ll send a confirmation to {email}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={cardStyle}>
      {/* Progress indicator */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
        {(['date', 'time', 'form'] as BookingStep[]).map((s, i) => (
          <div
            key={s}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor:
                step === s
                  ? 'var(--accent)'
                  : i < ['date', 'time', 'form'].indexOf(step)
                    ? 'var(--accent)'
                    : 'var(--border)',
              transition: 'background-color 0.2s',
            }}
          />
        ))}
      </div>

      {error && (
        <div
          style={{
            padding: '0.625rem 0.75rem',
            borderRadius: 8,
            backgroundColor: '#fef2f2',
            color: '#dc2626',
            fontSize: '0.8125rem',
            marginBottom: '1rem',
            border: '1px solid #fecaca',
          }}
        >
          {error}
        </div>
      )}

      {loading && (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Loading available times...
        </p>
      )}

      {/* Step 1: Pick a date */}
      {step === 'date' && !loading && (
        <div>
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--text)',
              marginBottom: '1rem',
              textAlign: 'center',
            }}
          >
            Pick a date
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
              gap: '0.5rem',
            }}
          >
            {dates.map((dateStr) => {
              const available = hasSlots(dateStr);
              const selected = selectedDate === dateStr;
              return (
                <button
                  key={dateStr}
                  onClick={() => {
                    if (!available) return;
                    setSelectedDate(dateStr);
                    setSelectedSlot(null);
                    setStep('time');
                  }}
                  disabled={!available}
                  style={{
                    padding: '0.625rem 0.5rem',
                    borderRadius: 8,
                    border: selected
                      ? '2px solid var(--accent)'
                      : '1px solid var(--border)',
                    backgroundColor: !available
                      ? 'var(--bg-alt)'
                      : selected
                        ? 'rgba(13, 148, 136, 0.06)'
                        : '#fff',
                    color: !available ? 'var(--text-muted-soft)' : 'var(--text)',
                    cursor: available ? 'pointer' : 'default',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    textAlign: 'center',
                    opacity: available ? 1 : 0.5,
                    transition: 'border-color 0.15s, background-color 0.15s',
                  }}
                >
                  {formatDate(dateStr)}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 2: Pick a time */}
      {step === 'time' && selectedDate && (
        <div>
          <button
            onClick={() => {
              setStep('date');
              setSelectedSlot(null);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.8125rem',
              marginBottom: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back
          </button>
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--text)',
              marginBottom: '0.25rem',
              textAlign: 'center',
            }}
          >
            {formatDate(selectedDate)}
          </h3>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8125rem', marginBottom: '1rem' }}>
            Choose a time
          </p>
          {slotsForDate.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted-soft)', fontSize: '0.875rem' }}>
              No slots available for this date.
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              {slotsForDate.map((slot) => {
                const selected = selectedSlot?.startTime === slot.startTime;
                return (
                  <button
                    key={slot.startTime}
                    onClick={() => {
                      setSelectedSlot(slot);
                      setStep('form');
                    }}
                    style={{
                      padding: '0.5rem',
                      borderRadius: 8,
                      border: selected
                        ? '2px solid var(--accent)'
                        : '1px solid var(--border)',
                      backgroundColor: selected ? 'rgba(13, 148, 136, 0.06)' : '#fff',
                      color: 'var(--text)',
                      cursor: 'pointer',
                      fontSize: '0.8125rem',
                      fontWeight: 500,
                      transition: 'border-color 0.15s, background-color 0.15s',
                    }}
                  >
                    {formatTime(slot.startTime)}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Step 3: Booking form */}
      {step === 'form' && selectedSlot && (
        <div>
          <button
            onClick={() => setStep('time')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.8125rem',
              marginBottom: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back
          </button>
          <div
            style={{
              textAlign: 'center',
              padding: '0.75rem',
              borderRadius: 8,
              backgroundColor: 'var(--bg-alt)',
              border: '1px solid var(--border)',
              marginBottom: '1.25rem',
              fontSize: '0.875rem',
              color: 'var(--text)',
            }}
          >
            <strong>{formatDate(selectedSlot.date)}</strong> at{' '}
            <strong>{formatTime(selectedSlot.startTime)}</strong>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <label
                htmlFor="booking-name"
                style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text)', marginBottom: '0.25rem' }}
              >
                Name *
              </label>
              <input
                id="booking-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.625rem 0.75rem',
                  borderRadius: 8,
                  border: '1px solid var(--border)',
                  fontSize: '0.875rem',
                  outline: 'none',
                }}
              />
            </div>
            <div>
              <label
                htmlFor="booking-email"
                style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text)', marginBottom: '0.25rem' }}
              >
                Email *
              </label>
              <input
                id="booking-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.625rem 0.75rem',
                  borderRadius: 8,
                  border: '1px solid var(--border)',
                  fontSize: '0.875rem',
                  outline: 'none',
                }}
              />
            </div>
            <div>
              <label
                htmlFor="booking-company"
                style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text)', marginBottom: '0.25rem' }}
              >
                Company
              </label>
              <input
                id="booking-company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.625rem 0.75rem',
                  borderRadius: 8,
                  border: '1px solid var(--border)',
                  fontSize: '0.875rem',
                  outline: 'none',
                }}
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="cta-button"
              style={{
                width: '100%',
                marginTop: '0.25rem',
                opacity: submitting ? 0.7 : 1,
              }}
            >
              {submitting ? 'Booking...' : 'Confirm booking'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState, useCallback } from 'react';
import { SlotPicker } from './SlotPicker';

interface Booking {
  id: string;
  name: string;
  email: string;
  date: string;
  startTime: string;
  endTime: string;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTime(isoStr: string): string {
  return new Date(isoStr).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function BookPageClient({
  userName,
  userEmail,
}: {
  userName: string;
  userEmail: string;
}) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPicker, setShowPicker] = useState(false);

  const fetchBooking = useCallback(async () => {
    try {
      const res = await fetch('/api/bookings/mine');
      const data = await res.json();
      setBooking(data.booking || null);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooking();
  }, [fetchBooking]);

  return (
    <div
      style={{
        maxWidth: 560,
        margin: '0 auto',
        padding: '3rem 1.5rem',
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
          Book a consultation
        </h1>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Schedule a free 15-minute call to discuss what works best for your needs.
        </p>
      </div>

      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
          <div
            style={{
              width: 32,
              height: 32,
              border: '3px solid var(--border)',
              borderTopColor: 'var(--accent)',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }}
          />
          <style jsx global>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {!loading && booking && !showPicker && (
        <div
          style={{
            backgroundColor: 'var(--bg)',
            borderRadius: 12,
            border: '1px solid var(--border)',
            padding: '1.5rem',
            boxShadow: 'var(--card-shadow)',
          }}
        >
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <h3
              style={{
                fontSize: '1.125rem',
                fontWeight: 700,
                color: 'var(--text)',
                marginBottom: '0.5rem',
              }}
            >
              You have a call booked
            </h3>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                borderRadius: 10,
                backgroundColor: 'var(--bg-alt)',
                border: '1px solid var(--border)',
                marginBottom: '0.75rem',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text)' }}>
                {formatDate(booking.startTime)}
              </span>
              <span style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>
                at {formatTime(booking.startTime)}
              </span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              A calendar invite was sent to {booking.email}
            </p>
            <button
              onClick={() => setShowPicker(true)}
              style={{
                marginTop: '1.25rem',
                background: 'none',
                border: 'none',
                color: 'var(--accent)',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Book a different time
            </button>
          </div>
        </div>
      )}

      {!loading && (!booking || showPicker) && (
        <SlotPicker prefillName={userName} prefillEmail={userEmail} source="book" />
      )}
    </div>
  );
}

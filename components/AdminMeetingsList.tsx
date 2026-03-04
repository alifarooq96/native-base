'use client';

import { useEffect, useState } from 'react';

interface Booking {
  id: string;
  name: string;
  email: string;
  company: string | null;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
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

function formatDateTime(isoStr: string): string {
  return new Date(isoStr).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function AdminMeetingsList() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [detailBooking, setDetailBooking] = useState<Booking | null>(null);

  useEffect(() => {
    fetch('/api/admin/bookings')
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load meetings');
        return r.json();
      })
      .then(setBookings)
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
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
    );
  }

  if (bookings.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '4rem 1rem',
          background: 'var(--bg)',
          borderRadius: 12,
          border: '1px solid var(--border)',
        }}
      >
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
          No meetings booked yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          background: 'var(--bg)',
          borderRadius: 12,
          border: '1px solid var(--border)',
          overflow: 'hidden',
        }}
      >
        <style jsx global>{`
          .admin-meetings-row:hover { background-color: var(--bg-alt); }
        `}</style>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-alt)' }}>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Company</th>
              <th style={thStyle}>When booked</th>
              <th style={thStyle}>Meeting date & time</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                role="button"
                tabIndex={0}
                onClick={() => setDetailBooking(booking)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setDetailBooking(booking);
                  }
                }}
                style={{
                  borderBottom: '1px solid var(--border)',
                  cursor: 'pointer',
                }}
                className="admin-meetings-row"
                title="View details"
              >
                <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--text)' }}>
                  {booking.name}
                </td>
                <td style={{ ...tdStyle, color: 'var(--text-muted)' }}>{booking.email}</td>
                <td style={{ ...tdStyle, color: 'var(--text-muted)' }}>
                  {booking.company || '—'}
                </td>
                <td style={{ ...tdStyle, color: 'var(--text-muted)' }}>
                  {formatDateTime(booking.createdAt)}
                </td>
                <td style={{ ...tdStyle, color: 'var(--text-muted)' }}>
                  {formatDate(booking.date)} at {formatTime(booking.startTime)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {detailBooking && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="meeting-detail-title"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
          onClick={() => setDetailBooking(null)}
        >
          <div
            style={{
              background: 'var(--bg)',
              borderRadius: 12,
              border: '1px solid var(--border)',
              boxShadow: 'var(--card-shadow)',
              maxWidth: 480,
              width: '100%',
              maxHeight: '85vh',
              overflow: 'auto',
              padding: '1.5rem',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="meeting-detail-title" style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text)', marginBottom: '1rem' }}>
              Meeting details
            </h2>
            <dl style={{ margin: 0, fontSize: '0.875rem' }}>
              <div style={{ marginBottom: '0.75rem' }}>
                <dt style={{ fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Name</dt>
                <dd style={{ margin: 0, color: 'var(--text)' }}>{detailBooking.name}</dd>
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <dt style={{ fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Email</dt>
                <dd style={{ margin: 0, color: 'var(--text)' }}>{detailBooking.email}</dd>
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <dt style={{ fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Company</dt>
                <dd style={{ margin: 0, color: 'var(--text)' }}>{detailBooking.company || '—'}</dd>
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <dt style={{ fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>When booked</dt>
                <dd style={{ margin: 0, color: 'var(--text)' }}>{formatDateTime(detailBooking.createdAt)}</dd>
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <dt style={{ fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Meeting</dt>
                <dd style={{ margin: 0, color: 'var(--text)' }}>
                  {formatDate(detailBooking.date)}, {formatTime(detailBooking.startTime)} – {formatTime(detailBooking.endTime)}
                </dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={() => setDetailBooking(null)}
              style={{
                marginTop: '1.25rem',
                padding: '0.5rem 1rem',
                borderRadius: 8,
                border: '1px solid var(--border)',
                background: 'var(--bg)',
                color: 'var(--text)',
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '0.75rem 1rem',
  fontWeight: 600,
  color: 'var(--text)',
  fontSize: '0.8125rem',
  borderBottom: '1px solid var(--border)',
};

const tdStyle: React.CSSProperties = {
  padding: '0.75rem 1rem',
  color: 'var(--text)',
};

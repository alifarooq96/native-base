import type { Metadata } from 'next';
import { AdminMeetingsList } from '@/components/AdminMeetingsList';

export const metadata: Metadata = { title: 'Admin — Meetings' };

export default function AdminMeetingsPage() {
  return (
    <div
      style={{
        maxWidth: 960,
        margin: '0 auto',
        padding: '1.25rem 1.5rem',
      }}
    >
      <h1
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--text)',
          marginBottom: '1.5rem',
        }}
      >
        Meetings
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
        Everyone who completed a booking. Sorted by meeting time (newest first).
      </p>
      <AdminMeetingsList />
    </div>
  );
}

import type { Metadata } from 'next';
import { AdminLeadsList } from '@/components/AdminLeadsList';

export const metadata: Metadata = { title: 'Admin — Leads' };

export default function AdminLeadsPage() {
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
        Leads
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
        Everyone who filled out the intro call form. Sorted by newest first.
      </p>
      <AdminLeadsList />
    </div>
  );
}

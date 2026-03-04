import type { Metadata } from 'next';
import { DashboardCharts } from '@/components/DashboardCharts';

export const metadata: Metadata = { title: 'Admin — Dashboard' };

export default function AdminDashboardPage() {
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
        Dashboard
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
        Last 7 days (including weekends)
      </p>
      <DashboardCharts />
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { DashboardLineChart } from './DashboardLineChart';

interface DayStat {
  date: string;
  leads: number;
  opportunities: number;
  tasksCreated: number;
  tasksCompleted: number;
}

function formatDayLabel(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short' });
}

export function DashboardCharts() {
  const [days, setDays] = useState<DayStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/dashboard-stats')
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load');
        return r.json();
      })
      .then((data: { days: DayStat[] }) => setDays(data.days))
      .catch(() => setDays([]))
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

  if (days.length === 0) {
    return (
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
        No data for the last 7 days.
      </p>
    );
  }

  const labels = days.map((d) => formatDayLabel(d.date));

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem',
      }}
    >
      <DashboardLineChart
        title="Leads per day"
        values={days.map((d) => d.leads)}
        dateLabels={labels}
      />
      <DashboardLineChart
        title="Opportunities per day"
        values={days.map((d) => d.opportunities)}
        dateLabels={labels}
      />
      <DashboardLineChart
        title="Tasks created per day"
        values={days.map((d) => d.tasksCreated)}
        dateLabels={labels}
      />
      <DashboardLineChart
        title="Tasks completed per day"
        values={days.map((d) => d.tasksCompleted)}
        dateLabels={labels}
      />
    </div>
  );
}

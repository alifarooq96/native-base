'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface LedgerEntry {
  id: string;
  amount: number;
  type: string;
  description: string;
  balanceAfter: number;
  createdAt: string;
}

interface CreditData {
  balance: number;
  rollover: number;
  plan: string;
  monthlyAllowance: number;
  maxRollover: number;
  usedThisCycle: number;
  lastRefresh: string | null;
  nextRefresh: string | null;
  ledger: LedgerEntry[];
}

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  initial: { label: 'Initial', color: 'var(--accent)' },
  monthly_refresh: { label: 'Monthly refresh', color: 'var(--accent)' },
  task_completed: { label: 'Task completed', color: '#dc2626' },
  refund: { label: 'Refund', color: '#16a34a' },
  rollover_cap: { label: 'Expired', color: 'var(--text-muted-soft)' },
};

export default function UsagePage() {
  const [data, setData] = useState<CreditData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/credits')
      .then((r) => r.json())
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Loading usage data...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1.5rem' }}>
        <p style={{ color: 'var(--text-muted)' }}>Unable to load credit data.</p>
      </div>
    );
  }

  const usagePercent = data.monthlyAllowance > 0
    ? Math.min(100, Math.round((data.usedThisCycle / data.monthlyAllowance) * 100))
    : 0;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <Link
          href="/board"
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          ← Board
        </Link>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)' }}>
          Usage &amp; billing
        </h1>
      </div>

      {/* Summary cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div style={cardStyle}>
          <div style={cardLabelStyle}>Credits remaining</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent)' }}>
            {data.balance}
          </div>
          <div style={cardSubStyle}>
            of {data.monthlyAllowance + data.rollover} available
          </div>
        </div>
        <div style={cardStyle}>
          <div style={cardLabelStyle}>Used this cycle</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text)' }}>
            {data.usedThisCycle}
          </div>
          <div style={cardSubStyle}>
            of {data.monthlyAllowance} monthly allowance
          </div>
        </div>
        <div style={cardStyle}>
          <div style={cardLabelStyle}>Rolled over</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text)' }}>
            {data.rollover}
          </div>
          <div style={cardSubStyle}>
            max {data.maxRollover} ({data.plan} plan)
          </div>
        </div>
      </div>

      {/* Usage bar */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text)' }}>
            Cycle usage
          </span>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            {data.usedThisCycle} / {data.monthlyAllowance} credits
          </span>
        </div>
        <div
          style={{
            height: 8,
            backgroundColor: 'var(--bg-alt)',
            borderRadius: 4,
            overflow: 'hidden',
            border: '1px solid var(--border)',
          }}
        >
          <div
            style={{
              width: `${usagePercent}%`,
              height: '100%',
              backgroundColor: usagePercent > 80 ? '#dc2626' : 'var(--accent)',
              borderRadius: 4,
              transition: 'width 0.3s ease',
            }}
          />
        </div>
        {data.nextRefresh && (
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted-soft)', marginTop: '0.375rem' }}>
            Next refresh: {new Date(data.nextRefresh).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
        )}
      </div>

      {/* Subscription management */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.25rem',
          backgroundColor: 'var(--bg-alt)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          marginBottom: '2rem',
        }}
      >
        <div>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>
            {data.plan ? `${data.plan.charAt(0).toUpperCase() + data.plan.slice(1)} plan` : 'No plan'}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {data.monthlyAllowance} credits/month · rollover up to {data.maxRollover}
          </div>
        </div>
        <button
          onClick={async () => {
            try {
              const res = await fetch('/api/stripe/portal', { method: 'POST' });
              const d = await res.json();
              if (d.url) window.location.href = d.url;
            } catch { /* ignore */ }
          }}
          className="cta-button"
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.8125rem',
            fontWeight: 600,
            borderRadius: 8,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Manage subscription
        </button>
      </div>

      {/* Ledger */}
      <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.75rem' }}>
        Credit history
      </h2>
      {data.ledger.length === 0 ? (
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>No credit activity yet.</p>
      ) : (
        <div
          style={{
            border: '1px solid var(--border)',
            borderRadius: 10,
            overflow: 'hidden',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-alt)' }}>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Description</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>Credits</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>Balance</th>
              </tr>
            </thead>
            <tbody>
              {data.ledger.map((entry, i) => {
                const meta = TYPE_LABELS[entry.type] || { label: entry.type, color: 'var(--text-muted)' };
                return (
                  <tr
                    key={entry.id}
                    style={{
                      backgroundColor: i % 2 === 0 ? 'var(--bg)' : 'var(--bg-alt)',
                    }}
                  >
                    <td style={tdStyle}>
                      {new Date(entry.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td style={tdStyle}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: meta.color,
                          backgroundColor: `${meta.color}14`,
                          padding: '0.125rem 0.5rem',
                          borderRadius: 9999,
                        }}
                      >
                        {meta.label}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, color: 'var(--text-muted)', maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {entry.description}
                    </td>
                    <td
                      style={{
                        ...tdStyle,
                        textAlign: 'right',
                        fontWeight: 600,
                        color: entry.amount > 0 ? '#16a34a' : '#dc2626',
                      }}
                    >
                      {entry.amount > 0 ? '+' : ''}{entry.amount}
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'right', color: 'var(--text-muted)' }}>
                      {entry.balanceAfter}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  padding: '1.25rem',
  backgroundColor: 'var(--bg-alt)',
  border: '1px solid var(--border)',
  borderRadius: 10,
};

const cardLabelStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 600,
  color: 'var(--text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: '0.25rem',
};

const cardSubStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: 'var(--text-muted-soft)',
  marginTop: '0.125rem',
};

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '0.625rem 1rem',
  fontWeight: 600,
  color: 'var(--text)',
  borderBottom: '1px solid var(--border)',
};

const tdStyle: React.CSSProperties = {
  padding: '0.5rem 1rem',
  borderBottom: '1px solid var(--border)',
  color: 'var(--text)',
};

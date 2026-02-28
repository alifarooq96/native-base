'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Client {
  id: string;
  email: string;
  name: string | null;
  plan: string | null;
  createdAt: string;
  _count: { tasks: number };
}

export function AdminClientList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/clients')
      .then((r) => r.json())
      .then(setClients)
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

  if (clients.length === 0) {
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
          No clients yet.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: 'var(--bg)',
        borderRadius: 12,
        border: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--bg-alt)' }}>
            <th style={thStyle}>Client</th>
            <th style={thStyle}>Email</th>
            <th style={{ ...thStyle, textAlign: 'center' }}>Tasks</th>
            <th style={{ ...thStyle, textAlign: 'center' }}>Plan</th>
            <th style={thStyle}>Joined</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr
              key={client.id}
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <td style={tdStyle}>
                <Link
                  href={`/admin/${client.id}`}
                  style={{
                    fontWeight: 600,
                    color: 'var(--accent)',
                  }}
                >
                  {client.name || 'Unnamed'}
                </Link>
              </td>
              <td style={{ ...tdStyle, color: 'var(--text-muted)' }}>{client.email}</td>
              <td style={{ ...tdStyle, textAlign: 'center' }}>{client._count.tasks}</td>
              <td style={{ ...tdStyle, textAlign: 'center' }}>
                {client.plan ? (
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '0.15rem 0.5rem',
                      borderRadius: 9999,
                      background: 'var(--bg-alt)',
                      color: 'var(--text-muted)',
                      textTransform: 'capitalize',
                    }}
                  >
                    {client.plan}
                  </span>
                ) : (
                  <span style={{ color: 'var(--text-muted-soft)', fontSize: '0.8125rem' }}>—</span>
                )}
              </td>
              <td style={{ ...tdStyle, color: 'var(--text-muted)' }}>
                {new Date(client.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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

'use client';

import { useEffect, useState } from 'react';

const DESCRIPTION_TRUNCATE = 80;

function truncate(str: string | null, max: number): string {
  if (!str || !str.trim()) return '—';
  const trimmed = str.trim();
  if (trimmed.length <= max) return trimmed;
  return trimmed.slice(0, max).trim() + '…';
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  description: string | null;
  source: string | null;
  createdAt: string;
  hasBooked: boolean;
}

interface AdminLeadsListProps {
  /** When provided, use these leads instead of fetching (e.g. for tabbed view). */
  leads?: Lead[];
}

export function AdminLeadsList({ leads: leadsProp }: AdminLeadsListProps = {}) {
  const [leadsState, setLeadsState] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(!leadsProp);
  const [detailLead, setDetailLead] = useState<Lead | null>(null);

  const leads = leadsProp ?? leadsState;

  useEffect(() => {
    if (leadsProp != null) return;
    fetch('/api/admin/booking-leads')
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load leads');
        return r.json();
      })
      .then(setLeadsState)
      .catch(() => setLeadsState([]))
      .finally(() => setLoading(false));
  }, [leadsProp]);

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

  if (leads.length === 0) {
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
          No leads yet.
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
          .admin-leads-row:hover { background-color: var(--bg-alt); }
        `}</style>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-alt)' }}>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Company</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Date & time</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Booked</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => {
              const truncated = truncate(lead.description, DESCRIPTION_TRUNCATE);
              return (
                <tr
                  key={lead.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setDetailLead(lead)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setDetailLead(lead);
                    }
                  }}
                  style={{
                    borderBottom: '1px solid var(--border)',
                    cursor: 'pointer',
                  }}
                  className="admin-leads-row"
                  title="View full details"
                >
                  <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--text)' }}>
                    {lead.name}
                  </td>
                  <td style={{ ...tdStyle, color: 'var(--text-muted)' }}>{lead.email}</td>
                  <td style={{ ...tdStyle, color: 'var(--text-muted)' }}>
                    {lead.company || '—'}
                  </td>
                  <td style={{ ...tdStyle, color: 'var(--text-muted)', maxWidth: 220 }}>
                    {truncated}
                  </td>
                  <td style={{ ...tdStyle, color: 'var(--text-muted)' }}>
                    {new Date(lead.createdAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    {lead.hasBooked ? (
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          padding: '0.15rem 0.5rem',
                          borderRadius: 9999,
                          background: '#dcfce7',
                          color: '#16a34a',
                        }}
                      >
                        Yes
                      </span>
                    ) : (
                      <span style={{ color: 'var(--text-muted-soft)', fontSize: '0.8125rem' }}>No</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {detailLead && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-detail-title"
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
          onClick={() => setDetailLead(null)}
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
            <h2 id="lead-detail-title" style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text)', marginBottom: '1rem' }}>
              Lead details
            </h2>
            <dl style={{ margin: 0, fontSize: '0.875rem' }}>
              <div style={{ marginBottom: '0.75rem' }}>
                <dt style={{ fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Name</dt>
                <dd style={{ margin: 0, color: 'var(--text)' }}>{detailLead.name}</dd>
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <dt style={{ fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Email</dt>
                <dd style={{ margin: 0, color: 'var(--text)' }}>{detailLead.email}</dd>
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <dt style={{ fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Company</dt>
                <dd style={{ margin: 0, color: 'var(--text)' }}>{detailLead.company || '—'}</dd>
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <dt style={{ fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Date & time</dt>
                <dd style={{ margin: 0, color: 'var(--text)' }}>
                  {new Date(detailLead.createdAt).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </dd>
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <dt style={{ fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Booked</dt>
                <dd style={{ margin: 0, color: 'var(--text)' }}>{detailLead.hasBooked ? 'Yes' : 'No'}</dd>
              </div>
              <div style={{ marginBottom: 0 }}>
                <dt style={{ fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Workflow / context</dt>
                <dd style={{ margin: 0, color: 'var(--text)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {detailLead.description?.trim() || '—'}
                </dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={() => setDetailLead(null)}
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

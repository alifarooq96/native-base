'use client';

import { useEffect, useState } from 'react';
import { AdminLeadsList, type Lead } from '@/components/AdminLeadsList';

const AUTOMATION_AUDIT_SOURCE = 'automation-audit';

const TASK_TO_CATEGORY: Record<string, 'sales' | 'ops' | 'marketing' | 'support'> = {
  'Lead research': 'sales',
  'CRM updates': 'sales',
  'Follow-up drafting': 'sales',
  'Proposal or quote prep': 'sales',
  'Meeting scheduling': 'sales',
  'Pipeline reporting': 'sales',
  'Status reporting': 'ops',
  'Invoice or order entry': 'ops',
  'Client or vendor handoffs': 'ops',
  'File routing': 'ops',
  'Approval chasing': 'ops',
  'Onboarding setup': 'ops',
  'Templatised PDF generation': 'ops',
  'Content repurposing': 'marketing',
  'List cleanup': 'marketing',
  'Campaign reporting': 'marketing',
  'Form to CRM tagging': 'marketing',
  'Lead routing': 'marketing',
  'Newsletter assembly': 'marketing',
  'Ticket triage': 'support',
  'FAQ replies': 'support',
  'Escalation routing': 'support',
  'Post-resolution follow-up': 'support',
  'Refund or replacement processing': 'support',
  'Knowledge base updates': 'support',
};

const CATEGORY_PILL_STYLES: Record<string, React.CSSProperties> = {
  sales: { backgroundColor: 'rgba(59, 130, 246, 0.14)', color: '#1d4ed8', border: '1px solid rgba(59, 130, 246, 0.35)' },
  ops: { backgroundColor: 'rgba(245, 158, 11, 0.14)', color: '#b45309', border: '1px solid rgba(245, 158, 11, 0.4)' },
  marketing: { backgroundColor: 'rgba(168, 85, 247, 0.14)', color: '#6b21a8', border: '1px solid rgba(168, 85, 247, 0.35)' },
  support: { backgroundColor: 'rgba(34, 197, 94, 0.14)', color: '#15803d', border: '1px solid rgba(34, 197, 94, 0.35)' },
};

function parseBreakdown(description: string | null): {
  taskLabels: string[];
  rate: string;
  weeklyHours: string;
  annualLeak: string;
} {
  if (!description?.trim()) return { taskLabels: [], rate: '', weeklyHours: '', annualLeak: '' };
  const lines = description.trim().split('\n');
  let taskLabels: string[] = [];
  let rate = '';
  let weeklyHours = '';
  let annualLeak = '';

  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith('Selected tasks:')) {
      const rest = t.slice('Selected tasks:'.length).trim();
      taskLabels = rest === 'None' ? [] : rest.split(',').map((s) => s.trim()).filter(Boolean);
    } else if (t.startsWith('Median hourly rate used:')) rate = t.slice('Median hourly rate used:'.length).trim();
    else if (t.startsWith('Estimated weekly hours:')) weeklyHours = t.slice('Estimated weekly hours:'.length).trim();
    else if (t.startsWith('Estimated annual operational leak')) annualLeak = t.slice(t.indexOf(':') + 1).trim();
  }

  return { taskLabels, rate, weeklyHours, annualLeak };
}

const tabStyle: React.CSSProperties = {
  padding: '0.5rem 1rem',
  borderRadius: 8,
  border: '1px solid var(--border)',
  background: 'var(--bg)',
  color: 'var(--text)',
  fontSize: '0.875rem',
  fontWeight: 500,
  cursor: 'pointer',
};

const tabActiveStyle: React.CSSProperties = {
  ...tabStyle,
  borderColor: 'var(--accent)',
  backgroundColor: 'rgba(13, 148, 136, 0.08)',
  color: 'var(--accent)',
};

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
  borderBottom: '1px solid var(--border)',
  verticalAlign: 'top',
};

export function AdminLeadsTabs() {
  const [allLeads, setAllLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'landing' | 'lead-magnet'>('landing');

  useEffect(() => {
    fetch('/api/admin/booking-leads')
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load leads');
        return r.json();
      })
      .then(setAllLeads)
      .catch(() => setAllLeads([]))
      .finally(() => setLoading(false));
  }, []);

  const landingLeads = allLeads.filter(
    (lead) => !lead.source || lead.source !== AUTOMATION_AUDIT_SOURCE
  );
  const leadMagnetLeads = allLeads.filter(
    (lead) => lead.source === AUTOMATION_AUDIT_SOURCE
  );

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

  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1.5rem',
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('landing')}
          style={activeTab === 'landing' ? tabActiveStyle : tabStyle}
        >
          Landing page
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('lead-magnet')}
          style={activeTab === 'lead-magnet' ? tabActiveStyle : tabStyle}
        >
          Lead magnet
        </button>
      </div>

      {activeTab === 'landing' && (
        <AdminLeadsList leads={landingLeads} />
      )}

      {activeTab === 'lead-magnet' && (
        <>
          {leadMagnetLeads.length === 0 ? (
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
                No lead magnet leads yet.
              </p>
            </div>
          ) : (
            <div
              style={{
                background: 'var(--bg)',
                borderRadius: 12,
                border: '1px solid var(--border)',
                overflow: 'auto',
              }}
            >
              <table
                style={{
                  width: '100%',
                  minWidth: 640,
                  borderCollapse: 'collapse',
                  fontSize: '0.875rem',
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-alt)' }}>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Email</th>
                    <th style={thStyle}>Created</th>
                    <th style={thStyle}>Rate</th>
                    <th style={thStyle}>Hrs/week</th>
                    <th style={thStyle}>Leak</th>
                    <th style={thStyle}>Tasks</th>
                  </tr>
                </thead>
                <tbody>
                  {leadMagnetLeads.map((lead) => {
                    const { taskLabels, rate, weeklyHours, annualLeak } = parseBreakdown(lead.description);
                    return (
                      <tr key={lead.id}>
                        <td style={{ ...tdStyle, fontWeight: 600 }}>{lead.name}</td>
                        <td style={{ ...tdStyle, color: 'var(--text-muted)' }}>
                          {lead.email}
                        </td>
                        <td style={{ ...tdStyle, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                          {new Date(lead.createdAt).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                          })}
                        </td>
                        <td style={{ ...tdStyle, color: 'var(--text-muted)' }}>{rate || '—'}</td>
                        <td style={{ ...tdStyle, color: 'var(--text-muted)' }}>{weeklyHours || '—'}</td>
                        <td style={{ ...tdStyle, color: 'var(--text-muted)' }}>{annualLeak || '—'}</td>
                        <td
                          style={{
                            ...tdStyle,
                            maxWidth: 360,
                            fontSize: '0.8125rem',
                          }}
                        >
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                            {taskLabels.length === 0 ? (
                              <span style={{ color: 'var(--text-muted)' }}>—</span>
                            ) : (
                              taskLabels.map((label) => {
                                const category = TASK_TO_CATEGORY[label] ?? 'ops';
                                return (
                                  <span
                                    key={label}
                                    style={{
                                      display: 'inline-block',
                                      padding: '0.2rem 0.5rem',
                                      borderRadius: 9999,
                                      fontSize: '0.75rem',
                                      fontWeight: 500,
                                      ...CATEGORY_PILL_STYLES[category],
                                    }}
                                  >
                                    {label}
                                  </span>
                                );
                              })
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </>
  );
}

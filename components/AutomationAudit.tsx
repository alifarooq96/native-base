'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState, type CSSProperties, type FormEvent } from 'react';

const WEEKS_PER_MONTH = 4.33;
const FULL_TIME_HOURS_PER_YEAR = 40 * 52;
const NATIVE_BASE_MONTHLY_COST = 2499;
const AUTOMATION_CAPTURE_RATE = 0.72;
const HOURLY_RATE_BUCKETS = [5, 10, 15, 20, 25, 30, 35, 40] as const;
const STEPS = ['Relevant categories', 'Manual tasks', 'Hourly rate'] as const;

type StepIndex = 0 | 1 | 2;

type AuditTask = {
  id: string;
  label: string;
  detail: string;
  hours: number;
};

type AuditColumn = {
  key: string;
  label: string;
  description: string;
  prompt: string;
  tasks: AuditTask[];
};

const AUDIT_COLUMNS: AuditColumn[] = [
  {
    key: 'sales',
    label: 'Sales',
    description: 'Outbound, pipeline movement, proposals, and repetitive commercial follow-through.',
    prompt: 'Which sales tasks still happen manually every week?',
    tasks: [
      { id: 'sales-research', label: 'Lead research', detail: 'Pull lists, qualify accounts, prep context.', hours: 3 },
      { id: 'sales-crm', label: 'CRM updates', detail: 'Logging notes, stages, handoffs, and next steps.', hours: 2 },
      { id: 'sales-followups', label: 'Follow-up drafting', detail: 'Writing repetitive outbound and nurture messages.', hours: 4 },
      { id: 'sales-proposals', label: 'Proposal or quote prep', detail: 'Formatting decks, scopes, or pricing docs.', hours: 2 },
      { id: 'sales-scheduling', label: 'Meeting scheduling', detail: 'Coordinating calls, reschedules, and reminders.', hours: 1 },
      { id: 'sales-reporting', label: 'Pipeline reporting', detail: 'Rolling up deal progress for weekly review.', hours: 2 },
    ],
  },
  {
    key: 'ops',
    label: 'Ops',
    description: 'Internal coordination, routing, admin handoffs, and recurring process maintenance.',
    prompt: 'Which operating tasks still require manual handling?',
    tasks: [
      { id: 'ops-status', label: 'Status reporting', detail: 'Pulling updates across tools into one view.', hours: 3 },
      { id: 'ops-entry', label: 'Invoice or order entry', detail: 'Moving data between forms, sheets, and systems.', hours: 2 },
      { id: 'ops-handoffs', label: 'Client or vendor handoffs', detail: 'Routing info between teams after key events.', hours: 3 },
      { id: 'ops-routing', label: 'File routing', detail: 'Renaming, organizing, and forwarding documents.', hours: 1 },
      { id: 'ops-approvals', label: 'Approval chasing', detail: 'Following up on internal sign-offs and dependencies.', hours: 2 },
      { id: 'ops-onboarding', label: 'Onboarding setup', detail: 'Setting up tools, folders, forms, and recurring workflows.', hours: 2 },
      { id: 'ops-pdf', label: 'Templatised PDF generation', detail: 'Generating reports, forms, or documents from templates.', hours: 2 },
    ],
  },
  {
    key: 'marketing',
    label: 'Marketing',
    description: 'Campaign execution, routing, reporting, and repetitive content operations.',
    prompt: 'Which marketing workflows are still repetitive or hand-stitched?',
    tasks: [
      { id: 'marketing-repurpose', label: 'Content repurposing', detail: 'Turning one asset into emails, posts, and snippets.', hours: 5 },
      { id: 'marketing-cleanup', label: 'List cleanup', detail: 'Tagging, deduping, and normalizing contact data.', hours: 2 },
      { id: 'marketing-reporting', label: 'Campaign reporting', detail: 'Pulling weekly performance snapshots and summaries.', hours: 2 },
      { id: 'marketing-tagging', label: 'Form to CRM tagging', detail: 'Manual enrichment, routing, and attribution updates.', hours: 1 },
      { id: 'marketing-routing', label: 'Lead routing', detail: 'Assigning or tagging inbound leads across tools.', hours: 2 },
      { id: 'marketing-newsletter', label: 'Newsletter assembly', detail: 'Compiling, formatting, and QAing recurring sends.', hours: 2 },
    ],
  },
  {
    key: 'support',
    label: 'Support',
    description: 'Triage, escalation, follow-through, and repetitive service requests.',
    prompt: 'Which support tasks repeat often enough to be systemized?',
    tasks: [
      { id: 'support-triage', label: 'Ticket triage', detail: 'Sorting, labeling, and assigning inbound requests.', hours: 5 },
      { id: 'support-faq', label: 'FAQ replies', detail: 'Answering repeat questions with the same context.', hours: 2 },
      { id: 'support-escalations', label: 'Escalation routing', detail: 'Collecting context before passing issues upstream.', hours: 3 },
      { id: 'support-followups', label: 'Post-resolution follow-up', detail: 'Closing loops after fixes, refunds, or approvals.', hours: 2 },
      { id: 'support-refunds', label: 'Refund or replacement processing', detail: 'Handling repetitive exception flows manually.', hours: 2 },
      { id: 'support-kb', label: 'Knowledge base updates', detail: 'Turning solved tickets into reusable docs.', hours: 1 },
    ],
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value: number) {
  return `${value >= 0 ? '+' : ''}${Math.round(value)}%`;
}

function sortTasksByImpact(tasks: AuditTask[]) {
  return [...tasks].sort((a, b) => b.hours - a.hours);
}

export function AutomationAudit() {
  const [activeStep, setActiveStep] = useState<StepIndex>(0);
  const [selectedCategoryKeys, setSelectedCategoryKeys] = useState<string[]>([]);
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  const [customTasksByCategory, setCustomTasksByCategory] = useState<Record<string, string>>({});
  const [hourlyRate, setHourlyRate] = useState(20);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const allTasks = useMemo(() => AUDIT_COLUMNS.flatMap((column) => column.tasks), []);
  const selectedCategories = AUDIT_COLUMNS.filter((column) => selectedCategoryKeys.includes(column.key));
  const selectedTasks = allTasks.filter((task) => selectedTaskIds.includes(task.id));
  const selectedCustomNotes = selectedCategories
    .map((column) => ({
      key: column.key,
      label: column.label,
      note: customTasksByCategory[column.key]?.trim() ?? '',
    }))
    .filter((entry) => entry.note);

  const weeklyHours = selectedTasks.reduce((sum, task) => sum + task.hours, 0);
  const monthlyHours = weeklyHours * WEEKS_PER_MONTH;
  const monthlyLeak = monthlyHours * hourlyRate;
  const totalAnnualCostOnePerson = FULL_TIME_HOURS_PER_YEAR * hourlyRate;
  const recoverableValue = monthlyLeak * AUTOMATION_CAPTURE_RATE;
  const topOpportunities = sortTasksByImpact(selectedTasks).slice(0, 3);

  const categoriesWithTasks = selectedCategories.filter((column) =>
    column.tasks.some((task) => selectedTaskIds.includes(task.id))
  );
  const categorySummaries = categoriesWithTasks.map((column) => {
    const tasks = column.tasks.filter((task) => selectedTaskIds.includes(task.id));
    const hours = tasks.reduce((sum, task) => sum + task.hours, 0);

    return {
      key: column.key,
      label: column.label,
      tasks,
      customNote: customTasksByCategory[column.key]?.trim() ?? '',
      weeklyHours: hours,
      monthlyLeak: hours * WEEKS_PER_MONTH * hourlyRate,
    };
  });

  useEffect(() => {
    if (!modalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setModalOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalOpen]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stepNames = ['Relevant categories', 'Manual tasks', 'Hourly rate'] as const;
    import('@/lib/mixpanel').then(({ mixpanel }) => {
      mixpanel.track('Automation Audit Step Reached', {
        step: activeStep + 1,
        step_name: stepNames[activeStep],
        selected_categories: selectedCategoryKeys.length,
        selected_tasks: selectedTaskIds.length,
        weekly_hours: weeklyHours,
        hourly_rate: activeStep >= 2 ? hourlyRate : undefined,
      });
    });
  }, [activeStep]);

  function toggleCategory(categoryKey: string) {
    const category = AUDIT_COLUMNS.find((column) => column.key === categoryKey);
    if (!category) return;

    setSelectedCategoryKeys((current) => {
      if (current.includes(categoryKey)) {
        setSelectedTaskIds((currentTaskIds) =>
          currentTaskIds.filter((taskId) => !category.tasks.some((task) => task.id === taskId))
        );
        setCustomTasksByCategory((currentNotes) => {
          const nextNotes = { ...currentNotes };
          delete nextNotes[categoryKey];
          return nextNotes;
        });
        return current.filter((key) => key !== categoryKey);
      }

      return [...current, categoryKey];
    });
  }

  function toggleTask(taskId: string) {
    setSelectedTaskIds((current) =>
      current.includes(taskId)
        ? current.filter((id) => id !== taskId)
        : [...current, taskId]
    );
  }

  function updateCustomTask(categoryKey: string, value: string) {
    setCustomTasksByCategory((current) => ({
      ...current,
      [categoryKey]: value,
    }));
  }

  function goToNextStep() {
    setActiveStep((current) => {
      if (current === 0) return 1;
      if (current === 1) return 2;
      return 2;
    });
  }

  function goToPreviousStep() {
    setActiveStep((current) => {
      if (current === 2) return 1;
      if (current === 1) return 0;
      return 0;
    });
  }

  function openModal() {
    setSubmitError('');
    setSubmitted(false);
    setModalOpen(true);

    if (typeof window !== 'undefined') {
      import('@/lib/mixpanel').then(({ mixpanel }) => {
        mixpanel.track('Automation Audit Breakdown Opened', {
          selected_categories: selectedCategoryKeys.length,
          selected_tasks: selectedTaskIds.length,
          custom_notes: selectedCustomNotes.length,
          weekly_hours: weeklyHours,
          hourly_rate: hourlyRate,
        });
      });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedCategories.length) return;

    setSubmitting(true);
    setSubmitError('');

    const descriptionLines = [
      `Relevant categories: ${categoriesWithTasks.map((category) => category.label).join(', ')}`,
      `Median hourly rate used: ${formatCurrency(hourlyRate)}`,
      `Selected tasks: ${selectedTasks.map((task) => task.label).join(', ') || 'None'}`,
      ...selectedCustomNotes.map((entry) => `${entry.label} other: ${entry.note}`),
      `Estimated weekly hours: ${weeklyHours}`,
      `Estimated annual operational leak (1 person): ${formatCurrency(monthlyLeak * 12)}`,
      `Estimated current annual cost (1 person): ${formatCurrency(totalAnnualCostOnePerson)}`,
      `Estimated annual recoverable value (1 person): ${formatCurrency(recoverableValue * 12)}`,
    ].filter(Boolean);

    try {
      const response = await fetch('/api/booking-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          description: descriptionLines.join('\n'),
          source: 'automation-audit',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save your breakdown request.');
      }

      if (typeof window !== 'undefined') {
        const { mixpanel } = await import('@/lib/mixpanel');
        mixpanel.track('Automation Audit Lead Captured', {
          selected_categories: selectedCategoryKeys.length,
          selected_tasks: selectedTaskIds.length,
          custom_notes: selectedCustomNotes.length,
          hourly_rate: hourlyRate,
          weekly_hours: weeklyHours,
          monthly_leak: Math.round(monthlyLeak),
        });
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Failed to save your breakdown request.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section
        style={{
          padding: '2rem 1.5rem 4rem',
          backgroundColor: 'var(--bg-alt)',
        }}
      >
        <div style={{ maxWidth: 940, margin: '0 auto' }}>
          <div style={{ maxWidth: 720, marginBottom: '1.25rem' }}>
            <p
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: '0.5rem',
              }}
            >
              Automation Audit
            </p>
            <h1
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 700,
                color: 'var(--text)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '0.75rem',
              }}
            >
              Find the manual work worth deleting.
            </h1>
            <p
              style={{
                fontSize: '1rem',
                color: 'var(--text-muted)',
                lineHeight: 1.65,
                maxWidth: 680,
              }}
            >
              First choose the parts of the business that matter, then mark the manual tasks
              inside them, then set a rough hourly rate to estimate the leak.
            </p>
          </div>

          <div
            className="audit-step-rail"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 0,
              marginBottom: '0.75rem',
              backgroundColor: 'var(--bg-alt)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: '0.25rem',
            }}
          >
            {STEPS.map((label, index) => {
              const summary =
                index === 0
                  ? `${selectedCategoryKeys.length} selected`
                  : index === 1
                    ? `${selectedTaskIds.length} tasks`
                    : `${formatCurrency(hourlyRate)}/hr`;
              const isActive = activeStep === index;
              const isComplete =
                index === 0
                  ? selectedCategoryKeys.length > 0
                  : index === 1
                    ? selectedTaskIds.length > 0 || selectedCustomNotes.length > 0
                    : selectedCategoryKeys.length > 0;

              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setActiveStep(index as StepIndex)}
                  className="audit-step-button"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    flex: 1,
                    padding: '0.5rem 0.75rem',
                    borderRadius: 8,
                    border: 'none',
                    background: isActive ? 'var(--bg)' : 'transparent',
                    boxShadow: isActive ? 'var(--card-shadow)' : 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 20,
                      height: 20,
                      borderRadius: 9999,
                      backgroundColor: isComplete ? 'var(--accent)' : 'var(--border)',
                      color: isComplete ? '#fff' : 'var(--text-muted)',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {index + 1}
                  </span>
                  <span
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: isActive ? 700 : 500,
                      color: 'var(--text)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      whiteSpace: 'nowrap',
                      marginLeft: 'auto',
                    }}
                  >
                    {summary}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 24,
              padding: '1.25rem',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            {activeStep === 0 && (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <p style={stepKickerStyle}>Step 1 of 3</p>
                  <h2 style={stepHeadingStyle}>Which categories are relevant?</h2>
                  <p style={stepBodyStyle}>
                    Only choose the areas where repetitive work actually shows up for your team.
                  </p>
                </div>

                <div
                  className="audit-category-grid"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                    gap: '1rem',
                  }}
                >
                  {AUDIT_COLUMNS.map((column) => {
                    const checked = selectedCategoryKeys.includes(column.key);

                    return (
                      <label key={column.key} className="audit-task-card">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleCategory(column.key)}
                          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                        />
                        <span
                          className="audit-task-shell"
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.875rem',
                            padding: '1rem',
                            borderRadius: 18,
                            border: checked
                              ? '1px solid rgba(13, 148, 136, 0.28)'
                              : '1px solid var(--border)',
                            backgroundColor: checked ? 'rgba(13, 148, 136, 0.05)' : 'var(--bg)',
                            boxShadow: checked
                              ? '0 10px 24px rgba(13, 148, 136, 0.08)'
                              : '0 1px 3px rgba(15, 23, 42, 0.05)',
                          }}
                        >
                          <span
                            style={{
                              width: 22,
                              height: 22,
                              borderRadius: 7,
                              border: checked
                                ? '1px solid var(--accent)'
                                : '1px solid var(--border)',
                              backgroundColor: checked ? 'var(--accent)' : 'var(--bg)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              marginTop: 1,
                            }}
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              style={{ opacity: checked ? 1 : 0, transition: 'opacity 0.15s ease' }}
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>

                          <span style={{ minWidth: 0 }}>
                            <span
                              style={{
                                display: 'block',
                                fontSize: '1rem',
                                fontWeight: 700,
                                color: 'var(--text)',
                                lineHeight: 1.3,
                                marginBottom: '0.3rem',
                              }}
                            >
                              {column.label}
                            </span>
                            <span
                              style={{
                                display: 'block',
                                fontSize: '0.8125rem',
                                color: 'var(--text-muted)',
                                lineHeight: 1.5,
                              }}
                            >
                              {column.description}
                            </span>
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>

                <div style={footerRowStyle}>
                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="cta-button"
                    disabled={selectedCategoryKeys.length === 0}
                    style={{
                      opacity: selectedCategoryKeys.length === 0 ? 0.6 : 1,
                      cursor: selectedCategoryKeys.length === 0 ? 'not-allowed' : 'pointer',
                    }}
                  >
                    Continue to manual tasks
                  </button>
                </div>
              </>
            )}

            {activeStep === 1 && (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <p style={stepKickerStyle}>Step 2 of 3</p>
                  <h2 style={stepHeadingStyle}>Which tasks are still manual?</h2>
                  <p style={stepBodyStyle}>
                    Pick the repeated work inside the categories you chose. Add an `Other` note
                    if something important is missing.
                  </p>
                </div>

                {selectedCategories.length === 0 ? (
                  <div style={emptyStateStyle}>
                    <p style={emptyStateHeadingStyle}>No categories selected yet.</p>
                    <p style={emptyStateBodyStyle}>
                      Go back and choose at least one area of the business before selecting tasks.
                    </p>
                    <button type="button" onClick={() => setActiveStep(0)} className="cta-button">
                      Back to categories
                    </button>
                  </div>
                ) : (
                  <>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        marginBottom: '1rem',
                      }}
                    >
                      {selectedCategories.map((column) => {
                        const selectedCount = column.tasks.filter((task) => selectedTaskIds.includes(task.id)).length;

                        return (
                          <section
                            key={column.key}
                            style={{
                              borderRadius: 20,
                              border: '1px solid var(--border)',
                              backgroundColor: 'var(--bg-alt)',
                              padding: '1rem',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '1rem',
                                flexWrap: 'wrap',
                                marginBottom: '0.75rem',
                              }}
                            >
                              <div>
                                <p
                                  style={{
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    color: 'var(--text)',
                                    marginBottom: '0.2rem',
                                  }}
                                >
                                  {column.label}
                                </p>
                                <p
                                  style={{
                                    fontSize: '0.8125rem',
                                    color: 'var(--text-muted)',
                                    lineHeight: 1.5,
                                  }}
                                >
                                  {column.prompt}
                                </p>
                              </div>
                              <MetricPill label="Selected" value={String(selectedCount)} />
                            </div>

                            <div
                              className="audit-task-grid"
                              style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                                gap: '0.875rem',
                                marginBottom: '0.875rem',
                              }}
                            >
                              {column.tasks.map((task) => {
                                const active = selectedTaskIds.includes(task.id);

                                return (
                                  <label key={task.id} className="audit-task-card">
                                    <input
                                      type="checkbox"
                                      checked={active}
                                      onChange={() => toggleTask(task.id)}
                                      style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                                    />
                                    <span
                                      className="audit-task-shell"
                                      style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '0.875rem',
                                        padding: '1rem',
                                        borderRadius: 18,
                                        border: active
                                          ? '1px solid rgba(13, 148, 136, 0.28)'
                                          : '1px solid var(--border)',
                                        backgroundColor: active ? 'rgba(13, 148, 136, 0.05)' : 'var(--bg)',
                                        boxShadow: active
                                          ? '0 10px 24px rgba(13, 148, 136, 0.08)'
                                          : '0 1px 3px rgba(15, 23, 42, 0.05)',
                                      }}
                                    >
                                      <span
                                        style={{
                                          width: 22,
                                          height: 22,
                                          borderRadius: 7,
                                          border: active
                                            ? '1px solid var(--accent)'
                                            : '1px solid var(--border)',
                                          backgroundColor: active ? 'var(--accent)' : 'var(--bg)',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          flexShrink: 0,
                                          marginTop: 1,
                                        }}
                                      >
                                        <svg
                                          width="12"
                                          height="12"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="white"
                                          strokeWidth="3"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          style={{ opacity: active ? 1 : 0, transition: 'opacity 0.15s ease' }}
                                        >
                                          <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                      </span>
                                      <span style={{ minWidth: 0 }}>
                                        <span
                                          style={{
                                            display: 'block',
                                            fontSize: '0.9375rem',
                                            fontWeight: 700,
                                            color: 'var(--text)',
                                            lineHeight: 1.3,
                                            marginBottom: '0.3rem',
                                          }}
                                        >
                                          {task.label}
                                        </span>
                                        <span
                                          style={{
                                            display: 'block',
                                            fontSize: '0.8125rem',
                                            color: 'var(--text-muted)',
                                            lineHeight: 1.5,
                                          }}
                                        >
                                          {task.detail}
                                        </span>
                                      </span>
                                    </span>
                                  </label>
                                );
                              })}
                            </div>

                            <div>
                              <label htmlFor={`audit-other-${column.key}`} style={labelStyle}>
                                Other recurring {column.label.toLowerCase()} work
                              </label>
                              <textarea
                                id={`audit-other-${column.key}`}
                                rows={2}
                                placeholder="Optional"
                                value={customTasksByCategory[column.key] ?? ''}
                                onChange={(event) => updateCustomTask(column.key, event.target.value)}
                                style={{
                                  ...fieldStyle,
                                  minHeight: 72,
                                  resize: 'vertical',
                                }}
                              />
                              <p style={helperTextStyle}>
                                What you enter here will be included and considered in your detailed
                                report when you request the full breakdown. The on-page estimate
                                above uses only the weighted checklist items.
                              </p>
                            </div>
                          </section>
                        );
                      })}
                    </div>

                    <div style={footerRowStyle}>
                      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                        <MetricPill label="Categories" value={String(selectedCategoryKeys.length)} />
                        <MetricPill label="Checklist items" value={String(selectedTaskIds.length)} />
                        <MetricPill label="Custom notes" value={String(selectedCustomNotes.length)} />
                      </div>

                      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          onClick={goToPreviousStep}
                          className="cta-button-outline"
                          style={secondaryButtonStyle}
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={goToNextStep}
                          className="cta-button"
                          disabled={selectedTaskIds.length === 0 && selectedCustomNotes.length === 0}
                          style={{
                            opacity:
                              selectedTaskIds.length === 0 && selectedCustomNotes.length === 0
                                ? 0.6
                                : 1,
                            cursor:
                              selectedTaskIds.length === 0 && selectedCustomNotes.length === 0
                                ? 'not-allowed'
                                : 'pointer',
                          }}
                        >
                          Continue to hourly rate
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {activeStep === 2 && (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <p style={stepKickerStyle}>Step 3 of 3</p>
                  <h2 style={stepHeadingStyle}>Pick the median hourly rate.</h2>
                  <p style={stepBodyStyle}>
                    This is a benchmark for what the current manual work is costing.
                  </p>
                </div>

                {selectedCategories.length === 0 ? (
                  <div style={emptyStateStyle}>
                    <p style={emptyStateHeadingStyle}>Finish the first two steps first.</p>
                    <p style={emptyStateBodyStyle}>
                      The estimate only makes sense after choosing relevant categories and tasks.
                    </p>
                    <button type="button" onClick={() => setActiveStep(0)} className="cta-button">
                      Back to start
                    </button>
                  </div>
                ) : (
                  <>
                    <div
                      className="audit-rate-card"
                      style={{
                        borderRadius: 20,
                        border: '1px solid var(--border)',
                        backgroundColor: 'var(--bg-alt)',
                        padding: '1rem',
                        marginBottom: '1rem',
                      }}
                    >
                      <div
                        className="audit-rate-card-header"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '1rem',
                          flexWrap: 'wrap',
                          marginBottom: '0.75rem',
                        }}
                      >
                        <div>
                          <p
                            style={{
                              fontSize: '0.875rem',
                              fontWeight: 700,
                              color: 'var(--text)',
                              marginBottom: '0.2rem',
                            }}
                          >
                            Median hourly rate
                          </p>
                          <p
                            style={{
                              fontSize: '0.8125rem',
                              color: 'var(--text-muted)',
                            }}
                          >
                            Select the range that best matches who typically does this work ($5–$40/hr).
                          </p>
                        </div>
                        <div
                          className="audit-rate-chip"
                          style={{
                            padding: '0.65rem 0.9rem',
                            borderRadius: 14,
                            backgroundColor: 'var(--bg)',
                            border: '1px solid var(--border)',
                            fontSize: '1rem',
                            fontWeight: 700,
                            color: 'var(--text)',
                          }}
                        >
                          {formatCurrency(hourlyRate)}/hr
                        </div>
                      </div>

                      <div
                        className="audit-rate-grid"
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                          gap: '0.625rem',
                        }}
                      >
                        {HOURLY_RATE_BUCKETS.map((rate) => {
                          const active = rate === hourlyRate;

                          return (
                            <button
                              key={rate}
                              type="button"
                              onClick={() => setHourlyRate(rate)}
                              style={{
                                padding: '0.75rem',
                                borderRadius: 14,
                                border: active
                                  ? '1px solid rgba(13, 148, 136, 0.28)'
                                  : '1px solid var(--border)',
                                backgroundColor: active ? 'rgba(13, 148, 136, 0.08)' : 'var(--bg)',
                                color: active ? 'var(--accent)' : 'var(--text)',
                                fontWeight: 700,
                                fontSize: '0.875rem',
                              }}
                            >
                              {formatCurrency(rate)}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div
                      className="audit-review-cards"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                        gap: '0.875rem',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <SummaryCard
                        label="Annual operational leak (1 person)"
                        value={formatCurrency(monthlyLeak * 12)}
                        tooltip={"Annual cost of the manual task hours you selected, at your chosen hourly rate—not a full-time salary.\n• Weekly hours × 4.33 × your rate × 12"}
                      />
                      <SummaryCard
                        label="Current annual cost (1 person)"
                        value={formatCurrency(totalAnnualCostOnePerson)}
                        tooltip={"Total annual cost of one full-time person at your chosen hourly rate.\n• 40 hrs/week × 52 weeks × your rate"}
                      />
                      <SummaryCard
                        label="Annual recoverable value (1 person)"
                        value={formatCurrency(recoverableValue * 12)}
                        tooltip={"Estimated annual value from automating this work (72% of the manual cost you selected), per person.\n• Scales with team size"}
                      />
                    </div>

                    <div
                      className="audit-breakdown-cta"
                      style={{
                        marginBottom: '1.25rem',
                        padding: '1.25rem',
                        borderRadius: 20,
                        border: '1px solid rgba(13, 148, 136, 0.25)',
                        backgroundColor: 'rgba(13, 148, 136, 0.04)',
                        textAlign: 'center',
                      }}
                    >
                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 700,
                          color: 'var(--text)',
                          marginBottom: '0.25rem',
                        }}
                      >
                        Get your full breakdown by email
                      </p>
                      <p
                        style={{
                          fontSize: '0.8125rem',
                          color: 'var(--text-muted)',
                          marginBottom: '1rem',
                        }}
                      >
                        Free · Delivered within 24 hours
                      </p>
                      <button
                        type="button"
                        className="cta-button"
                        onClick={openModal}
                        style={{
                          width: '100%',
                          maxWidth: 320,
                          margin: '0 auto',
                          padding: '0.75rem 1.5rem',
                          fontSize: '1rem',
                          fontWeight: 700,
                        }}
                      >
                        Get my full breakdown
                      </button>
                    </div>

                    <div
                      className="audit-review-layout"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 1.1fr) minmax(280px, 0.9fr)',
                        gap: '1rem',
                      }}
                    >
                      <div
                        style={{
                          borderRadius: 20,
                          border: '1px solid var(--border)',
                          padding: '1rem',
                          backgroundColor: 'var(--bg)',
                        }}
                      >
                        <p
                          style={{
                            fontSize: '0.875rem',
                            fontWeight: 700,
                            color: 'var(--text)',
                            marginBottom: '0.75rem',
                          }}
                        >
                          Selected work by category
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          {categorySummaries.map((column) => (
                            <div
                              key={column.key}
                              style={{
                                borderRadius: 16,
                                border: '1px solid var(--border)',
                                padding: '0.875rem 1rem',
                                backgroundColor: 'var(--bg-alt)',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  gap: '1rem',
                                  marginBottom: '0.35rem',
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: '0.875rem',
                                    fontWeight: 700,
                                    color: 'var(--text)',
                                  }}
                                >
                                  {column.label}
                                </span>
                                <span
                                  style={{
                                    fontSize: '0.75rem',
                                    color: 'var(--text-muted)',
                                  }}
                                >
                                  {column.weeklyHours} hrs/week
                                </span>
                              </div>
                              <p
                                style={{
                                  fontSize: '0.75rem',
                                  color: 'var(--text-muted)',
                                  lineHeight: 1.45,
                                  marginBottom: '0.35rem',
                                }}
                              >
                                {column.tasks.length > 0
                                  ? column.tasks.map((task) => task.label).join(' • ')
                                  : 'No weighted checklist items selected'}
                              </p>
                              {column.customNote && (
                                <p
                                  style={{
                                    fontSize: '0.75rem',
                                    color: 'var(--text)',
                                    lineHeight: 1.45,
                                    marginBottom: '0.35rem',
                                  }}
                                >
                                  Other: {column.customNote}
                                </p>
                              )}
                              <p
                                style={{
                                  fontSize: '0.8125rem',
                                  fontWeight: 600,
                                  color: 'var(--accent)',
                                }}
                              >
                                {formatCurrency(column.monthlyLeak)}/month benchmarked cost
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div
                        style={{
                          borderRadius: 20,
                          border: '1px solid var(--border)',
                          padding: '1rem',
                          backgroundColor: 'var(--bg-alt)',
                        }}
                      >
                        <div style={{ marginBottom: '1rem' }}>
                          <p
                            style={{
                              fontSize: '0.875rem',
                              fontWeight: 700,
                              color: 'var(--text)',
                              marginBottom: '0.35rem',
                            }}
                          >
                            Audit summary
                          </p>
                          <p
                            style={{
                              fontSize: '0.8125rem',
                              color: 'var(--text-muted)',
                              lineHeight: 1.5,
                            }}
                          >
                            Based on {selectedTaskIds.length} weighted checklist items and a blended
                            rate of {formatCurrency(hourlyRate)}/hr.
                          </p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1rem' }}>
                          <ResultRow label="Relevant categories" value={String(categoriesWithTasks.length)} />
                          <ResultRow label="Tasks selected" value={String(selectedTaskIds.length)} />
                          <ResultRow label="Estimated weekly drag" value={`${weeklyHours.toFixed(0)} hrs`} />
                          <ResultRow label="Estimated monthly drag" value={`${monthlyHours.toFixed(0)} hrs`} />
                        </div>

                        {topOpportunities.length > 0 && (
                          <div
                            style={{
                              marginBottom: '1rem',
                              padding: '0.875rem',
                              borderRadius: 16,
                              border: '1px solid var(--border)',
                              backgroundColor: 'var(--bg)',
                            }}
                          >
                            <p
                              style={{
                                fontSize: '0.8125rem',
                                fontWeight: 600,
                                color: 'var(--text)',
                                marginBottom: '0.45rem',
                              }}
                            >
                              Highest-impact starting points
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                              {topOpportunities.map((task) => (
                                <span
                                  key={task.id}
                                  style={{
                                    padding: '0.45rem 0.625rem',
                                    borderRadius: 9999,
                                    border: '1px solid var(--border)',
                                    backgroundColor: 'var(--bg-alt)',
                                    fontSize: '0.75rem',
                                    color: 'var(--text)',
                                  }}
                                >
                                  {task.label}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <button type="button" className="cta-button" onClick={openModal} style={{ width: '100%' }}>
                          Get my full breakdown
                        </button>
                      </div>
                    </div>

                    <div style={footerRowStyle}>
                      <button
                        type="button"
                        onClick={goToPreviousStep}
                        className="cta-button-outline"
                        style={secondaryButtonStyle}
                      >
                        Back
                      </button>

                      <p
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-muted)',
                          lineHeight: 1.45,
                          maxWidth: 420,
                          textAlign: 'right',
                        }}
                      >
                        Estimates assume {Math.round(AUTOMATION_CAPTURE_RATE * 100)}% of selected work can be automated.
                      </p>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="automation-audit-modal-title"
          className="audit-modal-overlay"
          onClick={() => setModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: 'rgba(15, 23, 42, 0.42)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            className="audit-modal-card"
            onClick={(event) => event.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: 640,
              maxHeight: '90vh',
              overflow: 'auto',
              backgroundColor: 'var(--bg)',
              borderRadius: 24,
              border: '1px solid rgba(226, 232, 240, 0.85)',
              boxShadow: '0 24px 80px rgba(15, 23, 42, 0.22)',
              padding: '1.25rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                marginBottom: '1rem',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    marginBottom: '0.35rem',
                  }}
                >
                  Audit Breakdown
                </p>
                <h2
                  id="automation-audit-modal-title"
                  style={{
                    fontSize: '1.375rem',
                    fontWeight: 700,
                    color: 'var(--text)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {submitted ? 'Breakdown saved' : 'Send me the full breakdown'}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg)',
                  color: 'var(--text)',
                }}
                aria-label="Close breakdown modal"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ margin: '0 auto' }}
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div
              style={{
                padding: '1rem',
                borderRadius: 18,
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-alt)',
                marginBottom: '1rem',
              }}
            >
              <div
                className="audit-modal-summary-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                  gap: '0.75rem',
                }}
              >
                <SummaryCard
                  label="Annual operational leak (1 person)"
                  value={formatCurrency(monthlyLeak * 12)}
                />
                <SummaryCard
                  label="Current annual cost (1 person)"
                  value={formatCurrency(totalAnnualCostOnePerson)}
                />
                <SummaryCard
                  label="Annual recoverable value (1 person)"
                  value={formatCurrency(recoverableValue * 12)}
                />
              </div>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <div>
                  <label htmlFor="audit-email" style={labelStyle}>
                    Work Email
                  </label>
                  <input
                    id="audit-email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    style={fieldStyle}
                  />
                </div>

                {submitError && (
                  <p
                    style={{
                      fontSize: '0.8125rem',
                      color: '#dc2626',
                      backgroundColor: '#fef2f2',
                      border: '1px solid #fecaca',
                      borderRadius: 10,
                      padding: '0.65rem 0.75rem',
                    }}
                  >
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  className="cta-button"
                  disabled={submitting}
                  style={{
                    width: '100%',
                    opacity: submitting ? 0.72 : 1,
                  }}
                >
                  {submitting ? 'Saving breakdown...' : 'Unlock Full Breakdown'}
                </button>

                <p style={helperTextStyle}>
                  We’ll attach your categories, weighted tasks, custom notes, and hourly-rate
                  assumption so the follow-up is specific to your audit.
                </p>
              </form>
            ) : (
              <div
                style={{
                  borderRadius: 18,
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-alt)',
                  padding: '1rem',
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    backgroundColor: 'rgba(13, 148, 136, 0.12)',
                    color: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.875rem',
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    color: 'var(--text)',
                    marginBottom: '0.35rem',
                  }}
                >
                  Saved
                </h3>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                    marginBottom: '1rem',
                  }}
                >
                  Your audit inputs are captured. You’ll receive a detailed report within 24 hours. If you’d like, the next step is a short call to map the first workflow worth automating.
                </p>
                <Link
                  href="/#contact"
                  className="cta-button"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onClick={() => setModalOpen(false)}
                >
                  Book an intro call
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        .audit-task-card {
          position: relative;
          display: block;
          cursor: pointer;
        }

        .audit-task-shell,
        .audit-step-button,
        .audit-rate-grid button {
          transition: transform 0.12s ease, box-shadow 0.18s ease, border-color 0.18s ease,
            background-color 0.18s ease;
        }

        .audit-task-card:hover .audit-task-shell,
        .audit-step-button:hover,
        .audit-rate-grid button:hover {
          transform: translateY(-1px);
        }

        .audit-task-card input:focus-visible + .audit-task-shell,
        .audit-step-button:focus-visible,
        .audit-rate-grid button:focus-visible,
        .audit-modal-card button:focus-visible,
        .audit-modal-card input:focus-visible,
        .audit-modal-card textarea:focus-visible {
          outline: 2px solid rgba(13, 148, 136, 0.28);
          outline-offset: 2px;
        }

        .audit-modal-card {
          animation: auditModalIn 0.18s ease-out;
        }

        @keyframes auditModalIn {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.985);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 900px) {
          .audit-category-grid,
          .audit-task-grid,
          .audit-review-cards,
          .audit-review-layout {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 720px) {
          .audit-rate-grid,
          .audit-modal-summary-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 640px) {
          .audit-step-rail {
            flex-direction: column !important;
          }
          .audit-step-rail .audit-step-button {
            width: 100%;
            min-width: 0;
          }
        }

        @media (max-width: 560px) {
          .audit-modal-summary-grid {
            grid-template-columns: 1fr !important;
          }

          .audit-rate-card {
            padding: 0.75rem !important;
            margin-bottom: 0.75rem !important;
          }
          .audit-rate-card-header {
            margin-bottom: 0.5rem !important;
          }
          .audit-rate-card-header p:first-of-type {
            font-size: 0.8125rem !important;
          }
          .audit-rate-card-header p:last-of-type {
            font-size: 0.75rem !important;
          }
          .audit-rate-chip {
            padding: 0.4rem 0.65rem !important;
            font-size: 0.875rem !important;
            border-radius: 10px !important;
          }
          .audit-rate-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
            gap: 0.5rem !important;
          }
          .audit-rate-grid button {
            padding: 0.5rem 0.35rem !important;
            font-size: 0.8125rem !important;
            border-radius: 10px !important;
          }

          .audit-modal-overlay {
            padding: 0.75rem !important;
          }
        }
      `}</style>
    </>
  );
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        padding: '0.55rem 0.75rem',
        borderRadius: 9999,
        backgroundColor: 'var(--bg)',
        border: '1px solid var(--border)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
      }}
    >
      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{label}</span>
      <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text)' }}>{value}</span>
    </div>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: '1rem',
      }}
    >
      <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{label}</span>
      <span
        style={{
          fontSize: '0.9375rem',
          fontWeight: 600,
          color: 'var(--text)',
          textAlign: 'right',
        }}
      >
        {value}
      </span>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  accent = false,
  tooltip,
}: {
  label: string;
  value: string;
  accent?: boolean;
  tooltip?: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div
      style={{
        borderRadius: 16,
        border: '1px solid var(--border)',
        backgroundColor: 'var(--bg)',
        padding: '0.875rem',
      }}
    >
      <p
        style={{
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          marginBottom: '0.35rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
        }}
      >
        {label}
        {tooltip && (
          <span
            role="img"
            aria-label="More info"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 14,
              height: 14,
              borderRadius: '50%',
              border: '1px solid var(--text-muted)',
              color: 'var(--text-muted)',
              fontSize: '0.65rem',
              fontWeight: 700,
              cursor: 'help',
              flexShrink: 0,
            }}
          >
            i
            {showTooltip && (
              <span
                role="tooltip"
                style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: '50%',
                  transform: 'translateX(-50%) translateY(-0.35rem)',
                  padding: '0.5rem 0.6rem',
                  fontSize: '0.6875rem',
                  lineHeight: 1.45,
                  color: 'var(--bg)',
                  backgroundColor: 'var(--text)',
                  borderRadius: 8,
                  whiteSpace: 'normal',
                  width: 'max-content',
                  maxWidth: 280,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  zIndex: 10,
                  pointerEvents: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                }}
              >
                {tooltip.split('\n').map((line, i) => {
                  const trimmed = line.trim();
                  if (!trimmed) return null;
                  const isBullet = /^[•\-]\s/.test(trimmed);
                  const text = isBullet ? trimmed.slice(2) : trimmed;
                  return isBullet ? (
                    <span key={i} style={{ paddingLeft: '0.75rem', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>•</span>
                      {text}
                    </span>
                  ) : (
                    <span key={i}>{trimmed}</span>
                  );
                })}
              </span>
            )}
          </span>
        )}
      </p>
      <p
        style={{
          fontSize: '1rem',
          fontWeight: 700,
          color: accent ? 'var(--accent)' : 'var(--text)',
          letterSpacing: '-0.02em',
          lineHeight: 1.25,
        }}
      >
        {value}
      </p>
    </div>
  );
}

const stepKickerStyle: CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  marginBottom: '0.4rem',
};

const stepHeadingStyle: CSSProperties = {
  fontSize: '1.5rem',
  fontWeight: 700,
  color: 'var(--text)',
  letterSpacing: '-0.02em',
  lineHeight: 1.2,
  marginBottom: '0.35rem',
};

const stepBodyStyle: CSSProperties = {
  fontSize: '0.9375rem',
  color: 'var(--text-muted)',
  lineHeight: 1.55,
  maxWidth: 700,
};

const labelStyle: CSSProperties = {
  display: 'block',
  fontSize: '0.8125rem',
  fontWeight: 600,
  color: 'var(--text)',
  marginBottom: '0.35rem',
};

const helperTextStyle: CSSProperties = {
  fontSize: '0.75rem',
  color: 'var(--text-muted)',
  lineHeight: 1.45,
  marginTop: '0.35rem',
};

const footerRowStyle: CSSProperties = {
  marginTop: '1rem',
  borderTop: '1px solid var(--border)',
  paddingTop: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  flexWrap: 'wrap',
};

const emptyStateStyle: CSSProperties = {
  borderRadius: 18,
  border: '1px dashed var(--border)',
  padding: '1.5rem',
  textAlign: 'center',
  backgroundColor: 'var(--bg-alt)',
};

const emptyStateHeadingStyle: CSSProperties = {
  fontSize: '1rem',
  fontWeight: 600,
  color: 'var(--text)',
  marginBottom: '0.35rem',
};

const emptyStateBodyStyle: CSSProperties = {
  fontSize: '0.875rem',
  color: 'var(--text-muted)',
  lineHeight: 1.55,
  marginBottom: '1rem',
};

const fieldStyle: CSSProperties = {
  width: '100%',
  borderRadius: 12,
  border: '1px solid var(--border)',
  backgroundColor: 'var(--bg)',
  padding: '0.75rem 0.875rem',
  fontSize: '0.875rem',
  color: 'var(--text)',
  outline: 'none',
};

const secondaryButtonStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.75rem 1rem',
  borderRadius: 8,
  border: '1px solid var(--border)',
  backgroundColor: 'var(--bg)',
  color: 'var(--text)',
  fontWeight: 600,
  fontSize: '0.9375rem',
};

'use client';

import { useEffect, useState, useCallback } from 'react';
import { NewTaskForm } from './NewTaskForm';
import { TaskDetail } from './TaskDetail';

interface TaskSummary {
  id: string;
  title: string;
  status: string;
  priority: string | null;
  createdAt: string;
  _count: { comments: number; subtasks: number };
  subtasks: { status: string }[];
}

type Columns = Record<string, TaskSummary[]>;

const COLUMN_META: { key: string; label: string; color: string }[] = [
  { key: 'backlog', label: 'Backlog', color: '#94a3b8' },
  { key: 'ready_for_dev', label: 'Ready for Dev', color: '#3b82f6' },
  { key: 'in_progress', label: 'In Progress', color: '#f59e0b' },
  { key: 'complete', label: 'Complete', color: '#10b981' },
];

const PRIORITY_COLORS: Record<string, { bg: string; text: string }> = {
  high: { bg: '#fef2f2', text: '#dc2626' },
  medium: { bg: '#fffbeb', text: '#d97706' },
  low: { bg: '#f0fdf4', text: '#16a34a' },
};

interface TaskBoardProps {
  initialTaskId?: string | null;
  userName?: string;
}

export function TaskBoard({ initialTaskId, userName }: TaskBoardProps = {}) {
  const [columns, setColumns] = useState<Columns | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(initialTaskId ?? null);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch('/api/tasks');
      if (res.ok) {
        const data = await res.json();
        setColumns(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const selectTask = useCallback((id: string | null) => {
    setSelectedTaskId(id);
    const url = id ? `/board/${id}` : '/board';
    window.history.pushState({}, '', url);
  }, []);

  useEffect(() => {
    const onPopState = () => {
      const match = window.location.pathname.match(/^\/board\/(.+)$/);
      setSelectedTaskId(match ? match[1] : null);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const selectedTaskSummary = selectedTaskId && columns
    ? Object.values(columns).flat().find((t) => t.id === selectedTaskId) ?? null
    : null;

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
        <style jsx global>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  const totalTasks = columns
    ? Object.values(columns).reduce((sum, col) => sum + col.length, 0)
    : 0;

  return (
    <>
      {/* How it works banner */}
      <div
        style={{
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: '1.25rem 1.5rem',
          marginBottom: '1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
        }}
        className="board-how-it-works"
      >
        {[
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            ),
            title: 'Describe what you need',
            desc: 'Create a task describing the workflow you want automated. Screenshots, screen recordings, and examples help us move faster.',
          },
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" />
              </svg>
            ),
            title: 'We break it down',
            desc: 'Native Base reviews your request, breaks it into bite-sized subtasks, and allocates credits. You approve before we start.',
          },
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            ),
            title: 'Fast turnaround',
            desc: 'We work ticket by ticket with an average turnaround of 48 hours — often much faster. Track progress right here.',
          },
        ].map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.75rem' }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: 'rgba(13, 148, 136, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {step.icon}
            </div>
            <div>
              <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.2rem' }}>
                {step.title}
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Task count + new task */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
        }}
      >
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          {totalTasks} task{totalTasks !== 1 ? 's' : ''}
        </p>
        <button
          onClick={() => setShowCreate(true)}
          className="cta-button"
          style={{ fontSize: '0.875rem', padding: '0.5rem 1.25rem' }}
        >
          + New task
        </button>
      </div>

      {/* Board columns */}
      <div
        className="task-board-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          minHeight: 400,
        }}
      >
        {COLUMN_META.map(({ key, label, color }) => {
          const tasks = columns?.[key] || [];
          return (
            <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                  padding: '0 0.25rem',
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: 'var(--text)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted-soft)',
                    marginLeft: '0.25rem',
                  }}
                >
                  {tasks.length}
                </span>
              </div>

              <div
                style={{
                  flex: 1,
                  background: 'var(--bg-alt)',
                  borderRadius: 10,
                  padding: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  minHeight: 120,
                }}
              >
                {tasks.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '2rem 0.75rem' }}>
                    {key === 'backlog' && totalTasks === 0 ? (
                      <>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                          Tell us what you want to automate
                        </p>
                        <button
                          onClick={() => setShowCreate(true)}
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: 'var(--accent)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          + Create your first task
                        </button>
                      </>
                    ) : (
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted-soft)' }}>
                        No tasks
                      </p>
                    )}
                  </div>
                )}
                {tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => selectTask(task.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create task modal */}
      {showCreate && (
        <ModalOverlay onClose={() => setShowCreate(false)}>
          <div
            style={{
              background: 'var(--bg)',
              borderRadius: 14,
              width: '100%',
              maxWidth: 680,
              maxHeight: '90vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 24px 80px rgba(0,0,0,0.18)',
              animation: 'modalSlideUp 0.2s ease-out',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid var(--border)',
                background: 'var(--bg)',
                flexShrink: 0,
                borderRadius: '14px 14px 0 0',
              }}
            >
              <h2 style={{ fontSize: '1.0625rem', fontWeight: 700 }}>New Task</h2>
              <button
                onClick={() => setShowCreate(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.25rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1,
                  padding: '0.25rem',
                }}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <div style={{ padding: '1.5rem', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <NewTaskForm
                onClose={() => setShowCreate(false)}
                onCreated={(task) => {
                  setShowCreate(false);
                  setColumns((prev) => {
                    if (!prev) return prev;
                    const newTask: TaskSummary = {
                      id: task.id,
                      title: task.title,
                      status: task.status,
                      priority: task.priority,
                      createdAt: new Date().toISOString(),
                      _count: { comments: 0, subtasks: 0 },
                      subtasks: [],
                    };
                    return {
                      ...prev,
                      backlog: [...prev.backlog, newTask],
                    };
                  });
                }}
              />
            </div>
          </div>
        </ModalOverlay>
      )}

      {/* Task detail slide-out panel */}
      {selectedTaskId && (
        <SlidePanel onClose={() => selectTask(null)}>
          <TaskDetail
            taskId={selectedTaskId}
            onClose={() => selectTask(null)}
            userName={userName}
            summary={selectedTaskSummary ? {
              title: selectedTaskSummary.title,
              status: selectedTaskSummary.status,
              priority: selectedTaskSummary.priority,
            } : null}
          />
        </SlidePanel>
      )}

      <style jsx global>{`
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes panelSlideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @media (max-width: 900px) {
          .task-board-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .board-how-it-works {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }
        @media (max-width: 600px) {
          .task-board-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

/* ── Overlay for centered modals ── */

function ModalOverlay({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem',
      }}
    >
      {children}
    </div>
  );
}

/* ── Slide-out panel for task detail ── */

function SlidePanel({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.35)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 640,
          height: '100%',
          background: 'var(--bg)',
          borderLeft: '1px solid var(--border)',
          boxShadow: '-8px 0 30px rgba(0,0,0,0.1)',
          overflow: 'auto',
          animation: 'panelSlideIn 0.2s ease-out',
        }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            background: 'var(--bg)',
            borderBottom: '1px solid var(--border)',
            padding: '0.875rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 1,
          }}
        >
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Task details
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.25rem',
              color: 'var(--text-muted)',
              lineHeight: 1,
              padding: '0.25rem',
              cursor: 'pointer',
            }}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div style={{ padding: '1.5rem' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── Task card ── */

function TaskCard({
  task,
  onClick,
}: {
  task: TaskSummary;
  onClick: () => void;
}) {
  const doneSubtasks = task.subtasks.filter((s) => s.status === 'done').length;
  const totalSubtasks = task.subtasks.length;
  const priority = task.priority ? PRIORITY_COLORS[task.priority] : null;

  return (
    <button
      onClick={onClick}
      style={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        background: 'var(--bg)',
        borderRadius: 8,
        padding: '0.875rem',
        border: 'none',
        boxShadow: 'var(--card-shadow)',
        transition: 'box-shadow 0.2s, transform 0.15s',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--card-shadow-hover)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--card-shadow)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      <p
        style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'var(--text)',
          lineHeight: 1.4,
          marginBottom: '0.5rem',
        }}
      >
        {task.title}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', alignItems: 'center' }}>
        {priority && (
          <span
            style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              padding: '0.125rem 0.5rem',
              borderRadius: 9999,
              background: priority.bg,
              color: priority.text,
              textTransform: 'capitalize',
            }}
          >
            {task.priority}
          </span>
        )}

        {task._count.comments > 0 && (
          <span
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            {task._count.comments}
          </span>
        )}

        {totalSubtasks > 0 && (
          <span
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
            {doneSubtasks}/{totalSubtasks}
          </span>
        )}
      </div>
    </button>
  );
}

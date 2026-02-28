'use client';

import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import Link from 'next/link';
import { CommentForm } from './CommentForm';
import { RichEditor } from './RichEditor';
import type { JSONContent } from '@tiptap/react';

interface CommentData {
  id: string;
  content: string;
  createdAt: string;
  user: { id: string; name: string | null; avatarUrl: string | null };
}

interface SubTaskData {
  id: string;
  title: string;
  description?: string | null;
  status: string;
  credits?: number | null;
  comments?: CommentData[];
}

interface TaskData {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string | null;
  createdAt: string;
  updatedAt: string;
  comments: CommentData[];
  subtasks: SubTaskData[];
}

const STATUS_LABELS: Record<string, { label: string; bg: string; text: string }> = {
  backlog: { label: 'Backlog', bg: '#f1f5f9', text: '#475569' },
  ready_for_dev: { label: 'Ready for Dev', bg: '#dbeafe', text: '#1d4ed8' },
  in_progress: { label: 'In Progress', bg: '#fef3c7', text: '#b45309' },
  complete: { label: 'Complete', bg: '#dcfce7', text: '#15803d' },
};

const STATUS_KEYS = ['backlog', 'ready_for_dev', 'in_progress', 'complete'];

const PRIORITY_STYLES: Record<string, { bg: string; text: string }> = {
  high: { bg: '#fef2f2', text: '#dc2626' },
  medium: { bg: '#fffbeb', text: '#d97706' },
  low: { bg: '#f0fdf4', text: '#16a34a' },
};

const SUBTASK_STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: 'Pending', color: '#94a3b8', bg: '#f1f5f9' },
  in_progress: { label: 'In Progress', color: '#f59e0b', bg: '#fef3c7' },
  done: { label: 'Done', color: '#10b981', bg: '#dcfce7' },
};

const SUBTASK_STATUS_KEYS = ['pending', 'in_progress', 'done'];

interface TaskSummaryPreview {
  title: string;
  status: string;
  priority: string | null;
}

export interface TaskDetailProps {
  taskId: string;
  onClose?: () => void;
  summary?: TaskSummaryPreview | null;
  userName?: string;
  isAdmin?: boolean;
  forUserId?: string;
  onTaskUpdated?: () => void;
}

export function TaskDetail({
  taskId,
  onClose,
  summary,
  userName,
  isAdmin,
  forUserId,
  onTaskUpdated,
}: TaskDetailProps) {
  const [task, setTask] = useState<TaskData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);

  const apiBase = isAdmin ? '/api/admin' : '/api';

  const fetchTask = useCallback(async () => {
    const url = isAdmin ? `/api/admin/tasks/${taskId}` : `/api/tasks/${taskId}`;
    try {
      const res = await fetch(url);
      if (res.status === 404 || res.status === 403) {
        setNotFound(true);
        return;
      }
      if (res.ok) {
        setTask(await res.json());
      }
    } finally {
      setLoading(false);
    }
  }, [taskId, isAdmin]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  const addOptimisticComment = useCallback(async (content: string) => {
    const tempId = `temp-${Date.now()}`;
    const optimistic: CommentData = {
      id: tempId,
      content,
      createdAt: new Date().toISOString(),
      user: { id: '', name: userName || 'You', avatarUrl: null },
    };

    setTask((prev) => prev ? { ...prev, comments: [...prev.comments, optimistic] } : prev);

    const commentUrl = isAdmin
      ? `${apiBase}/tasks/${taskId}/comments`
      : `/api/tasks/${taskId}/comments`;

    try {
      const res = await fetch(commentUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      if (res.ok) {
        const real: CommentData = await res.json();
        setTask((prev) =>
          prev ? { ...prev, comments: prev.comments.map((c) => (c.id === tempId ? real : c)) } : prev
        );
      } else {
        setTask((prev) =>
          prev ? { ...prev, comments: prev.comments.filter((c) => c.id !== tempId) } : prev
        );
      }
    } catch {
      setTask((prev) =>
        prev ? { ...prev, comments: prev.comments.filter((c) => c.id !== tempId) } : prev
      );
    }
  }, [taskId, userName, isAdmin, apiBase]);

  const updateTaskStatus = useCallback(async (newStatus: string) => {
    if (!task) return;
    const old = task.status;
    setTask((prev) => prev ? { ...prev, status: newStatus } : prev);
    setStatusMenuOpen(false);

    try {
      const res = await fetch(`${apiBase}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        setTask((prev) => prev ? { ...prev, status: old } : prev);
      } else {
        onTaskUpdated?.();
      }
    } catch {
      setTask((prev) => prev ? { ...prev, status: old } : prev);
    }
  }, [task, taskId, apiBase, onTaskUpdated]);

  const descriptionContent: JSONContent | undefined = useMemo(() => {
    if (!task) return undefined;
    try {
      const parsed = JSON.parse(task.description);
      if (parsed && parsed.type === 'doc') return parsed;
    } catch {
      // legacy plain-text
    }
    return undefined;
  }, [task]);

  if (loading && summary) {
    const sMeta = STATUS_LABELS[summary.status] || STATUS_LABELS.backlog;
    const pMeta = summary.priority ? PRIORITY_STYLES[summary.priority] : null;
    return (
      <div>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.625rem', borderRadius: 9999, background: sMeta.bg, color: sMeta.text }}>{sMeta.label}</span>
            {pMeta && <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.625rem', borderRadius: 9999, background: pMeta.bg, color: pMeta.text, textTransform: 'capitalize' }}>{summary.priority}</span>}
          </div>
          <h1 style={{ fontSize: '1.375rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '0.5rem' }}>{summary.title}</h1>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
          <div style={{ width: 20, height: 20, border: '2px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          Loading details...
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
        <div style={{ width: 32, height: 32, border: '3px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      </div>
    );
  }

  if (notFound || !task) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Task not found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          This task doesn&apos;t exist or you don&apos;t have access to it.
        </p>
        {onClose ? (
          <button onClick={onClose} className="cta-button" style={{ fontSize: '0.875rem', padding: '0.5rem 1.25rem' }}>Close</button>
        ) : (
          <a href="/board" className="cta-button" style={{ display: 'inline-block', fontSize: '0.875rem', padding: '0.5rem 1.25rem', textDecoration: 'none' }}>Back to board</a>
        )}
      </div>
    );
  }

  const statusMeta = STATUS_LABELS[task.status] || STATUS_LABELS.backlog;
  const priorityMeta = task.priority ? PRIORITY_STYLES[task.priority] : null;
  const isRichDescription = !!descriptionContent;
  const totalCredits = task.subtasks.reduce((sum, s) => sum + (s.credits || 0), 0);

  return (
    <div>
      {!onClose && (
        <a href="/board" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1.5rem', textDecoration: 'none' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          Back to board
        </a>
      )}

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem', alignItems: 'center' }}>
          {isAdmin ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setStatusMenuOpen((p) => !p)}
                style={{
                  fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.625rem', borderRadius: 9999,
                  background: statusMeta.bg, color: statusMeta.text, border: `1px dashed ${statusMeta.text}`,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem',
                }}
              >
                {statusMeta.label}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              {statusMenuOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 50,
                  background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)', overflow: 'hidden', minWidth: 160,
                }}>
                  {STATUS_KEYS.map((key) => {
                    const meta = STATUS_LABELS[key];
                    return (
                      <button
                        key={key}
                        onClick={() => updateTaskStatus(key)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%',
                          padding: '0.5rem 0.75rem', border: 'none', background: task.status === key ? 'var(--bg-alt)' : 'transparent',
                          cursor: 'pointer', fontSize: '0.8125rem', color: 'var(--text)', textAlign: 'left',
                        }}
                      >
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: meta.text, flexShrink: 0 }} />
                        {meta.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.625rem', borderRadius: 9999, background: statusMeta.bg, color: statusMeta.text }}>
              {statusMeta.label}
            </span>
          )}
          {priorityMeta && (
            <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.625rem', borderRadius: 9999, background: priorityMeta.bg, color: priorityMeta.text, textTransform: 'capitalize' }}>
              {task.priority}
            </span>
          )}
        </div>

        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '0.5rem' }}>{task.title}</h1>

        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          Created {new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          {task.updatedAt !== task.createdAt && (
            <> &middot; Updated {new Date(task.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</>
          )}
        </p>
      </div>

      {/* Description */}
      <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, padding: '1.25rem', marginBottom: '2rem' }}>
        <h3 style={sectionHeadingStyle}>Description</h3>
        {isRichDescription ? (
          <RichEditor content={descriptionContent} editable={false} />
        ) : (
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{task.description}</p>
        )}
      </div>

      {/* Subtasks — link to full subtask view */}
      {(task.subtasks.length > 0 || isAdmin) && (
        <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, padding: '1.25rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <h3 style={{ ...sectionHeadingStyle, marginBottom: 0 }}>
              Subtasks ({task.subtasks.filter((s) => s.status === 'done').length}/{task.subtasks.length})
            </h3>
            {totalCredits > 0 && (
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)', background: 'rgba(13,148,136,0.08)', padding: '0.15rem 0.5rem', borderRadius: 9999 }}>
                {totalCredits} credit{totalCredits !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            Open a subtask to view details and comments.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {task.subtasks.map((sub) => {
              const subtaskHref = isAdmin && forUserId
                ? `/admin/${forUserId}/${task.id}/subtasks/${sub.id}`
                : `/board/${task.id}/subtasks/${sub.id}`;
              const meta = SUBTASK_STATUS_META[sub.status] || SUBTASK_STATUS_META.pending;
              return (
                <Link
                  key={sub.id}
                  href={subtaskHref}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 0.75rem',
                    borderRadius: 8,
                    background: 'var(--bg-alt)',
                    border: '1px solid transparent',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'border-color 0.15s, background 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.background = 'var(--bg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.background = 'var(--bg-alt)';
                  }}
                >
                  <span style={{ width: 12, height: 12, borderRadius: '50%', background: meta.color, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: '0.875rem', fontWeight: 500, textDecoration: sub.status === 'done' ? 'line-through' : 'none', color: sub.status === 'done' ? 'var(--text-muted)' : 'var(--text)' }}>
                    {sub.title}
                  </span>
                  {sub.credits != null && sub.credits > 0 && (
                    <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--accent)', background: 'rgba(13,148,136,0.08)', padding: '0.1rem 0.375rem', borderRadius: 9999 }}>
                      {sub.credits}cr
                    </span>
                  )}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, color: 'var(--text-muted)' }}>
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              );
            })}
          </div>

          {isAdmin && <AddSubtaskForm taskId={task.id} onAdded={fetchTask} />}
        </div>
      )}

      {/* Comments */}
      <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, padding: '1.25rem' }}>
        <h3 style={sectionHeadingStyle}>Comments ({task.comments.length})</h3>

        {task.comments.length === 0 && (
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted-soft)', marginBottom: '1rem' }}>
            No comments yet. Start the conversation below.
          </p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {task.comments.map((comment) => (
            <div key={comment.id} style={{ padding: '0.875rem', background: 'var(--bg-alt)', borderRadius: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6875rem', fontWeight: 700, flexShrink: 0 }}>
                  {(comment.user.name || 'U')[0].toUpperCase()}
                </div>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{comment.user.name || 'User'}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted-soft)' }}>
                  {new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  {' '}
                  {new Date(comment.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{comment.content}</p>
            </div>
          ))}
        </div>

        <CommentForm taskId={task.id} onSubmitComment={addOptimisticComment} />
      </div>
    </div>
  );
}

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: '0.8125rem',
  fontWeight: 600,
  color: 'var(--text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  marginBottom: '0.75rem',
};

/* ── Inline subtask creation form (admin only) ── */

function AddSubtaskForm({ taskId, onAdded }: { taskId: string; onAdded: () => void }) {
  const [title, setTitle] = useState('');
  const [credits, setCredits] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/tasks/${taskId}/subtasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          credits: credits ? parseInt(credits, 10) : null,
        }),
      });
      if (res.ok) {
        setTitle('');
        setCredits('');
        onAdded();
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', alignItems: 'center' }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add subtask..."
        style={{
          flex: 1, padding: '0.4rem 0.625rem', fontSize: '0.8125rem',
          border: '1px solid var(--border)', borderRadius: 6, outline: 'none',
          background: 'var(--bg)', color: 'var(--text)',
        }}
      />
      <input
        type="number"
        min="0"
        value={credits}
        onChange={(e) => setCredits(e.target.value)}
        placeholder="Credits"
        style={{
          width: 72, padding: '0.4rem 0.5rem', fontSize: '0.8125rem',
          border: '1px solid var(--border)', borderRadius: 6, outline: 'none',
          background: 'var(--bg)', color: 'var(--text)', textAlign: 'center',
        }}
      />
      <button
        type="submit"
        disabled={!title.trim() || submitting}
        style={{
          padding: '0.4rem 0.75rem', fontSize: '0.8125rem', fontWeight: 600,
          background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 6,
          cursor: !title.trim() || submitting ? 'not-allowed' : 'pointer',
          opacity: !title.trim() || submitting ? 0.5 : 1,
        }}
      >
        Add
      </button>
    </form>
  );
}

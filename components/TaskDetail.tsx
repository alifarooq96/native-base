'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
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
  status: string;
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

const PRIORITY_STYLES: Record<string, { bg: string; text: string }> = {
  high: { bg: '#fef2f2', text: '#dc2626' },
  medium: { bg: '#fffbeb', text: '#d97706' },
  low: { bg: '#f0fdf4', text: '#16a34a' },
};

const SUBTASK_ICONS: Record<string, string> = {
  done: '#10b981',
  in_progress: '#f59e0b',
  pending: '#94a3b8',
};

interface TaskSummaryPreview {
  title: string;
  status: string;
  priority: string | null;
}

export function TaskDetail({
  taskId,
  onClose,
  summary,
  userName,
}: {
  taskId: string;
  onClose?: () => void;
  summary?: TaskSummaryPreview | null;
  userName?: string;
}) {
  const [task, setTask] = useState<TaskData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const fetchTask = useCallback(async () => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`);
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
  }, [taskId]);

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

    try {
      const res = await fetch(`/api/tasks/${taskId}/comments`, {
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
  }, [taskId, userName]);

  const descriptionContent: JSONContent | undefined = useMemo(() => {
    if (!task) return undefined;
    try {
      const parsed = JSON.parse(task.description);
      if (parsed && parsed.type === 'doc') return parsed;
    } catch {
      // legacy plain-text description
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
      </div>
    );
  }

  if (notFound || !task) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Task not found
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          This task doesn&apos;t exist or you don&apos;t have access to it.
        </p>
        {onClose ? (
          <button
            onClick={onClose}
            className="cta-button"
            style={{ fontSize: '0.875rem', padding: '0.5rem 1.25rem' }}
          >
            Close
          </button>
        ) : (
          <a
            href="/board"
            className="cta-button"
            style={{ display: 'inline-block', fontSize: '0.875rem', padding: '0.5rem 1.25rem', textDecoration: 'none' }}
          >
            Back to board
          </a>
        )}
      </div>
    );
  }

  const statusMeta = STATUS_LABELS[task.status] || STATUS_LABELS.backlog;
  const priorityMeta = task.priority ? PRIORITY_STYLES[task.priority] : null;
  const isRichDescription = !!descriptionContent;

  return (
    <div>
      {!onClose && (
        <a
          href="/board"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
            marginBottom: '1.5rem',
            textDecoration: 'none',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to board
        </a>
      )}

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '0.2rem 0.625rem',
              borderRadius: 9999,
              background: statusMeta.bg,
              color: statusMeta.text,
            }}
          >
            {statusMeta.label}
          </span>
          {priorityMeta && (
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '0.2rem 0.625rem',
                borderRadius: 9999,
                background: priorityMeta.bg,
                color: priorityMeta.text,
                textTransform: 'capitalize',
              }}
            >
              {task.priority}
            </span>
          )}
        </div>

        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '0.5rem' }}>
          {task.title}
        </h1>

        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          Created {new Date(task.createdAt).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
          })}
          {task.updatedAt !== task.createdAt && (
            <> &middot; Updated {new Date(task.updatedAt).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric',
            })}</>
          )}
        </p>
      </div>

      {/* Description */}
      <div
        style={{
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          padding: '1.25rem',
          marginBottom: '2rem',
        }}
      >
        <h3
          style={{
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            marginBottom: '0.625rem',
          }}
        >
          Description
        </h3>
        {isRichDescription ? (
          <RichEditor content={descriptionContent} editable={false} />
        ) : (
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
            {task.description}
          </p>
        )}
      </div>

      {/* Subtasks */}
      {task.subtasks.length > 0 && (
        <div
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '1.25rem',
            marginBottom: '2rem',
          }}
        >
          <h3
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '0.75rem',
            }}
          >
            Subtasks ({task.subtasks.filter((s) => s.status === 'done').length}/{task.subtasks.length})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {task.subtasks.map((sub) => (
              <div
                key={sub.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: SUBTASK_ICONS[sub.status] || '#94a3b8',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: '0.875rem',
                    textDecoration: sub.status === 'done' ? 'line-through' : 'none',
                    color: sub.status === 'done' ? 'var(--text-muted)' : 'var(--text)',
                  }}
                >
                  {sub.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comments */}
      <div
        style={{
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          padding: '1.25rem',
        }}
      >
        <h3
          style={{
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            marginBottom: '0.75rem',
          }}
        >
          Comments ({task.comments.length})
        </h3>

        {task.comments.length === 0 && (
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted-soft)', marginBottom: '1rem' }}>
            No comments yet. Start the conversation below.
          </p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {task.comments.map((comment) => (
            <div
              key={comment.id}
              style={{
                padding: '0.875rem',
                background: 'var(--bg-alt)',
                borderRadius: 8,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.375rem',
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {(comment.user.name || 'U')[0].toUpperCase()}
                </div>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>
                  {comment.user.name || 'User'}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted-soft)' }}>
                  {new Date(comment.createdAt).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric',
                  })}
                  {' '}
                  {new Date(comment.createdAt).toLocaleTimeString('en-US', {
                    hour: 'numeric', minute: '2-digit',
                  })}
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                {comment.content}
              </p>
            </div>
          ))}
        </div>

        <CommentForm taskId={task.id} onSubmitComment={addOptimisticComment} />
      </div>
    </div>
  );
}

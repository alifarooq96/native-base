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

interface SubTaskFull {
  id: string;
  title: string;
  description: string | null;
  status: string;
  credits: number | null;
  taskId: string;
  createdAt: string;
  updatedAt: string;
  comments: CommentData[];
}

const SUBTASK_STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: 'Pending', color: '#94a3b8', bg: '#f1f5f9' },
  in_progress: { label: 'In Progress', color: '#f59e0b', bg: '#fef3c7' },
  done: { label: 'Done', color: '#10b981', bg: '#dcfce7' },
};

const SUBTASK_STATUS_KEYS = ['pending', 'in_progress', 'done'];

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: '0.8125rem',
  fontWeight: 600,
  color: 'var(--text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  marginBottom: '0.75rem',
};

export function SubTaskDetailView({
  taskId,
  subtaskId,
  taskTitle,
  backHref,
  firstBreadcrumb,
  isAdmin,
  userName,
}: {
  taskId: string;
  subtaskId: string;
  taskTitle: string;
  backHref: string;
  firstBreadcrumb: { label: string; href: string };
  isAdmin: boolean;
  userName: string;
}) {
  const [data, setData] = useState<{ subtask: SubTaskFull; taskTitle: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);

  const apiBase = isAdmin ? '/api/admin' : '/api';
  const fetchUrl = isAdmin
    ? `/api/admin/tasks/${taskId}/subtasks/${subtaskId}`
    : `/api/tasks/${taskId}/subtasks/${subtaskId}`;

  const fetchSubtask = useCallback(async () => {
    try {
      const res = await fetch(fetchUrl);
      if (res.status === 404 || res.status === 403) {
        setNotFound(true);
        return;
      }
      if (res.ok) {
        const json = await res.json();
        setData({ subtask: json.subtask, taskTitle: json.taskTitle });
      }
    } finally {
      setLoading(false);
    }
  }, [fetchUrl]);

  useEffect(() => {
    fetchSubtask();
  }, [fetchSubtask]);

  useEffect(() => {
    if (!statusMenuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (statusRef.current && !statusRef.current.contains(e.target as Node)) setStatusMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [statusMenuOpen]);

  const updateStatus = useCallback(async (newStatus: string) => {
    if (!data) return;
    const old = data.subtask.status;
    setData((prev) => prev ? { ...prev, subtask: { ...prev.subtask, status: newStatus } } : prev);
    setStatusMenuOpen(false);
    try {
      const res = await fetch(`${apiBase}/subtasks/${subtaskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) setData((prev) => prev ? { ...prev, subtask: { ...prev.subtask, status: old } } : prev);
    } catch {
      setData((prev) => prev ? { ...prev, subtask: { ...prev.subtask, status: old } } : prev);
    }
  }, [data, apiBase, subtaskId]);

  const updateDescription = useCallback(async (description: string) => {
    setData((prev) => prev ? { ...prev, subtask: { ...prev.subtask, description } } : prev);
    try {
      await fetch(`${apiBase}/subtasks/${subtaskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });
    } catch {
      fetchSubtask();
    }
  }, [apiBase, subtaskId, fetchSubtask]);

  const addComment = useCallback(async (content: string) => {
    const tempId = `st-${Date.now()}`;
    const optimistic: CommentData = {
      id: tempId,
      content,
      createdAt: new Date().toISOString(),
      user: { id: '', name: userName || 'You', avatarUrl: null },
    };
    setData((prev) => prev ? { ...prev, subtask: { ...prev.subtask, comments: [...prev.subtask.comments, optimistic] } } : prev);

    const commentUrl = isAdmin ? `${apiBase}/subtasks/${subtaskId}/comments` : `/api/subtasks/${subtaskId}/comments`;
    try {
      const res = await fetch(commentUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content }) });
      if (res.ok) {
        const real: CommentData = await res.json();
        setData((prev) => prev ? { ...prev, subtask: { ...prev.subtask, comments: prev.subtask.comments.map((c) => (c.id === tempId ? real : c)) } } : prev);
      } else {
        setData((prev) => prev ? { ...prev, subtask: { ...prev.subtask, comments: prev.subtask.comments.filter((c) => c.id !== tempId) } } : prev);
      }
    } catch {
      setData((prev) => prev ? { ...prev, subtask: { ...prev.subtask, comments: prev.subtask.comments.filter((c) => c.id !== tempId) } } : prev);
    }
  }, [apiBase, isAdmin, subtaskId, userName]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
        <div style={{ width: 32, height: 32, border: '3px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      </div>
    );
  }

  if (notFound || !data) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Subtask not found</h2>
        <Link href={backHref} className="cta-button" style={{ display: 'inline-block', fontSize: '0.875rem', padding: '0.5rem 1.25rem', textDecoration: 'none', marginTop: '1rem' }}>
          Back to task
        </Link>
      </div>
    );
  }

  const { subtask } = data;
  const meta = SUBTASK_STATUS_META[subtask.status] || SUBTASK_STATUS_META.pending;

  return (
    <div>
      {/* Breadcrumb */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.375rem',
          fontSize: '0.8125rem',
          marginBottom: '1.5rem',
          color: 'var(--text-muted)',
        }}
        aria-label="Breadcrumb"
      >
        <Link href={firstBreadcrumb.href} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
          {firstBreadcrumb.label}
        </Link>
        <span aria-hidden style={{ color: 'var(--text-muted-soft)' }}>/</span>
        <Link href={backHref} style={{ color: 'var(--text-muted)', textDecoration: 'none', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={data.taskTitle}>
          {data.taskTitle}
        </Link>
        <span aria-hidden style={{ color: 'var(--text-muted-soft)' }}>/</span>
        <span style={{ color: 'var(--text)', fontWeight: 600 }}>{subtask.title}</span>
      </nav>

      {/* Back to task */}
      <Link
        href={backHref}
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
        Back to task
      </Link>

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem', alignItems: 'center' }}>
          {isAdmin ? (
            <div ref={statusRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setStatusMenuOpen((p) => !p)}
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '0.2rem 0.625rem',
                  borderRadius: 9999,
                  background: meta.bg,
                  color: meta.color,
                  border: `1px solid ${meta.color}`,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                {meta.label}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              {statusMenuOpen && (
                <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 50, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.1)', overflow: 'hidden', minWidth: 140 }}>
                  {SUBTASK_STATUS_KEYS.map((key) => {
                    const m = SUBTASK_STATUS_META[key];
                    return (
                      <button
                        key={key}
                        onClick={() => updateStatus(key)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '0.5rem 0.75rem', border: 'none', background: subtask.status === key ? 'var(--bg-alt)' : 'transparent', cursor: 'pointer', fontSize: '0.8125rem', color: 'var(--text)', textAlign: 'left' }}
                      >
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: m.color, flexShrink: 0 }} />
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.625rem', borderRadius: 9999, background: meta.bg, color: meta.color }}>
              {meta.label}
            </span>
          )}
          {subtask.credits != null && subtask.credits > 0 && (
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)', background: 'rgba(13,148,136,0.08)', padding: '0.15rem 0.5rem', borderRadius: 9999 }}>
              {subtask.credits} credit{subtask.credits !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '0.5rem' }}>{subtask.title}</h1>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          Created {new Date(subtask.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      {/* Description */}
      <SubtaskDescriptionBlock subtask={subtask} isAdmin={isAdmin} onSave={updateDescription} />

      {/* Comments — full section */}
      <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, padding: '1.25rem' }}>
        <h3 style={sectionHeadingStyle}>Comments ({subtask.comments.length})</h3>
        {subtask.comments.length === 0 && (
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted-soft)', marginBottom: '1rem' }}>
            No comments yet. Start the conversation below.
          </p>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {subtask.comments.map((comment) => (
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
        <CommentForm taskId={subtask.id} onSubmitComment={addComment} />
      </div>
    </div>
  );
}

function SubtaskDescriptionBlock({
  subtask,
  isAdmin,
  onSave,
}: {
  subtask: SubTaskFull;
  isAdmin: boolean;
  onSave: (desc: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const editorContentRef = useRef<JSONContent | null>(null);

  const descriptionContent: JSONContent | undefined = useMemo(() => {
    if (!subtask.description) return undefined;
    try {
      const parsed = JSON.parse(subtask.description);
      if (parsed && parsed.type === 'doc') return parsed;
    } catch {
      /* plain text */
    }
    return undefined;
  }, [subtask.description]);

  const handleSave = async () => {
    if (!editorContentRef.current) return;
    setSaving(true);
    onSave(JSON.stringify(editorContentRef.current));
    setEditing(false);
    setSaving(false);
  };

  const hasContent = !!subtask.description;

  return (
    <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, padding: '1.25rem', marginBottom: '2rem' }}>
      <h3 style={sectionHeadingStyle}>Description</h3>
      {editing ? (
        <>
          <div style={{ border: '1px solid var(--border)', borderRadius: 8, background: 'var(--bg)', marginBottom: '0.5rem' }}>
            <RichEditor
              content={descriptionContent}
              editable
              onChange={(c) => { editorContentRef.current = c; }}
              placeholder="Add details, notes, or instructions..."
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <button onClick={() => setEditing(false)} style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem', fontWeight: 500, background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border)', borderRadius: 6, cursor: 'pointer' }}>Cancel</button>
            <button onClick={handleSave} disabled={saving} style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem', fontWeight: 600, background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 6, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1 }}>{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </>
      ) : hasContent ? (
        <>
          {descriptionContent ? <RichEditor content={descriptionContent} editable={false} /> : <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{subtask.description}</p>}
          {isAdmin && <button onClick={() => setEditing(true)} style={{ marginTop: '0.5rem', padding: '0.2rem 0', fontSize: '0.75rem', fontWeight: 500, background: 'none', color: 'var(--accent)', border: 'none', cursor: 'pointer' }}>Edit details</button>}
        </>
      ) : (
        <>
          {isAdmin ? (
            <button onClick={() => setEditing(true)} style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--accent)', background: 'none', border: '1px dashed var(--border)', borderRadius: 6, padding: '0.5rem 1rem', cursor: 'pointer', width: '100%' }}>+ Add details</button>
          ) : (
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted-soft)' }}>No details added yet.</p>
          )}
        </>
      )}
    </div>
  );
}

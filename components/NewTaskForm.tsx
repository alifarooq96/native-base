'use client';

import { useState, useRef } from 'react';
import { RichEditor } from './RichEditor';
import type { JSONContent } from '@tiptap/react';

interface CreatedTask {
  id: string;
  title: string;
  status: string;
  priority: string | null;
}

interface NewTaskFormProps {
  onClose: () => void;
  onCreated: (task: CreatedTask) => void;
}

export function NewTaskForm({ onClose, onCreated }: NewTaskFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const descriptionRef = useRef<JSONContent | null>(null);

  const handleSubmit = async () => {
    setError('');

    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    const desc = descriptionRef.current;
    const hasContent =
      desc &&
      desc.content &&
      desc.content.some(
        (node) =>
          node.type !== 'paragraph' ||
          (node.content && node.content.length > 0)
      );

    if (!hasContent) {
      setError('Description is required.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: JSON.stringify(desc),
          priority: priority || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      onCreated(data);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 0.5rem' }}>
        {error && (
          <p
            style={{
              fontSize: '0.8125rem',
              color: '#dc2626',
              background: '#fef2f2',
              borderRadius: 8,
              padding: '0.625rem 0.875rem',
              marginBottom: '1rem',
            }}
          >
            {error}
          </p>
        )}

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          autoFocus
          style={{
            width: '100%',
            border: 'none',
            outline: 'none',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--text)',
            background: 'transparent',
            marginBottom: '0.5rem',
            padding: 0,
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <label
            style={{
              fontSize: '0.8125rem',
              fontWeight: 500,
              color: 'var(--text-muted)',
            }}
          >
            Priority
          </label>
          <div style={{ display: 'flex', gap: '0.375rem' }}>
            {['low', 'medium', 'high'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(priority === p ? '' : p)}
                style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: 9999,
                  border: `1px solid ${priority === p ? 'transparent' : 'var(--border)'}`,
                  background:
                    priority === p
                      ? p === 'high'
                        ? '#fef2f2'
                        : p === 'medium'
                        ? '#fffbeb'
                        : '#f0fdf4'
                      : 'transparent',
                  color:
                    priority === p
                      ? p === 'high'
                        ? '#dc2626'
                        : p === 'medium'
                        ? '#d97706'
                        : '#16a34a'
                      : 'var(--text-muted)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <RichEditor
          onChange={(json) => {
            descriptionRef.current = json;
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '0.75rem',
          padding: '1rem 0 0',
          borderTop: '1px solid var(--border)',
          flexShrink: 0,
        }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            padding: '0.5rem 1.25rem',
            borderRadius: 8,
            border: '1px solid var(--border)',
            background: 'var(--bg)',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="cta-button"
          style={{
            fontSize: '0.875rem',
            padding: '0.5rem 1.5rem',
            opacity: submitting ? 0.7 : 1,
          }}
        >
          {submitting ? 'Creating...' : 'Create task'}
        </button>
      </div>
    </div>
  );
}

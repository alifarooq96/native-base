'use client';

import { useState, useRef } from 'react';

interface Props {
  taskId: string;
  onSubmitComment: (content: string) => void;
}

export function CommentForm({ taskId, onSubmitComment }: Props) {
  void taskId;
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmitComment(content.trim());
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        rows={3}
        style={{
          width: '100%',
          padding: '0.75rem',
          border: '1px solid var(--border)',
          borderRadius: 8,
          fontSize: '0.875rem',
          outline: 'none',
          resize: 'vertical',
          transition: 'border-color 0.15s',
        }}
        onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
        onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
        <button
          type="submit"
          disabled={!content.trim()}
          className="cta-button"
          style={{
            fontSize: '0.8125rem',
            padding: '0.4rem 1rem',
            opacity: !content.trim() ? 0.5 : 1,
          }}
        >
          Post comment
        </button>
      </div>
    </form>
  );
}

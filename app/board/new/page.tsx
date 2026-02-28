'use client';

import { useRouter } from 'next/navigation';
import { NewTaskForm } from '@/components/NewTaskForm';

export default function NewTaskPage() {
  const router = useRouter();

  return (
    <div
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '2rem 1.5rem',
      }}
    >
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

      <h1
        style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'var(--text)',
          marginBottom: '1.5rem',
        }}
      >
        New Task
      </h1>

      <NewTaskForm
        onClose={() => router.push('/board')}
        onCreated={() => {
          router.push('/board');
          router.refresh();
        }}
      />
    </div>
  );
}

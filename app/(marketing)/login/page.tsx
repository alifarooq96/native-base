'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        return;
      }

      router.push('/board');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--text)',
              marginBottom: '0.375rem',
            }}
          >
            Welcome back
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Sign in to your Native Base account.
          </p>
        </div>

        <a
          href="/api/auth/google-signup"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.625rem',
            width: '100%',
            padding: '0.625rem 1rem',
            backgroundColor: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'var(--text)',
            cursor: 'pointer',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            textDecoration: 'none',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = 'var(--text-muted)';
            e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continue with Google
        </a>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            margin: '1.25rem 0',
          }}
        >
          <div style={{ flex: 1, height: 1, backgroundColor: 'var(--border)' }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            or
          </span>
          <div style={{ flex: 1, height: 1, backgroundColor: 'var(--border)' }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          <div>
            <label htmlFor="email" style={labelStyle}>Email</label>
            <input
              id="email"
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="password" style={labelStyle}>Password</label>
            <input
              id="password"
              type="password"
              required
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
          </div>

          {error && (
            <p
              style={{
                fontSize: '0.8125rem',
                color: '#dc2626',
                backgroundColor: '#fef2f2',
                padding: '0.5rem 0.75rem',
                borderRadius: 6,
                border: '1px solid #fecaca',
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="cta-button"
            style={{
              width: '100%',
              padding: '0.625rem 1rem',
              fontSize: '0.875rem',
              borderRadius: 8,
              border: 'none',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p
          style={{
            textAlign: 'center',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
            marginTop: '1.25rem',
          }}
        >
          Don&apos;t have an account?{' '}
          <Link href="/signup" style={{ color: 'var(--accent)', fontWeight: 600 }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: 'calc(100vh - 60px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem 1.5rem',
  backgroundColor: 'var(--bg-alt)',
};

const cardStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: 400,
  backgroundColor: 'var(--bg)',
  borderRadius: 12,
  border: '1px solid var(--border)',
  padding: '2rem 1.75rem',
  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8125rem',
  fontWeight: 500,
  color: 'var(--text)',
  marginBottom: '0.375rem',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.5rem 0.75rem',
  fontSize: '0.875rem',
  border: '1px solid var(--border)',
  borderRadius: 8,
  backgroundColor: 'var(--bg)',
  color: 'var(--text)',
  outline: 'none',
  transition: 'border-color 0.2s',
};

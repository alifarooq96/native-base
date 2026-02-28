import { ImageResponse } from 'next/og';

export const alt = 'Native Base – Transform your business to be cost efficient. Subscription-based workflow automation.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          background: '#ffffff',
          padding: 64,
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        }}
      >
        {/* Logo */}
        <div style={{ fontSize: 22, fontWeight: 600, color: '#0f172a', marginBottom: 56 }}>
          NativeBase.AI
        </div>

        {/* Pills */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
          <span
            style={{
              fontSize: 14,
              color: '#64748b',
              backgroundColor: '#f8fafc',
              padding: '8px 16px',
              borderRadius: 9999,
              border: '1px solid #e2e8f0',
            }}
          >
            No long-term commitment.
          </span>
          <span
            style={{
              fontSize: 14,
              color: '#64748b',
              backgroundColor: '#f8fafc',
              padding: '8px 16px',
              borderRadius: 9999,
              border: '1px solid #e2e8f0',
            }}
          >
            A subscription model.
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginBottom: 24,
          }}
        >
          <div style={{ fontSize: 48, fontWeight: 600, color: '#0f172a', lineHeight: 1.2 }}>
            Transform your business to be
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 600,
              color: '#0d9488',
              lineHeight: 1.2,
              borderBottom: '4px solid #0d9488',
              paddingBottom: 4,
            }}
          >
            AI Native.
          </div>
        </div>

        {/* Tagline */}
        <div style={{ fontSize: 22, color: '#64748b', lineHeight: 1.4 }}>
          Subscription-based workflow automation in under 2 days.
        </div>
      </div>
    ),
    { ...size }
  );
}

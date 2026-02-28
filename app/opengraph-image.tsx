import { ImageResponse } from 'next/og';

export const alt = 'Native Base – Transform your business to be AI native. Subscription-based workflow automation in under 2 days.';
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
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1a1a1a',
          color: '#ffffff',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 120,
            height: 120,
            borderRadius: 16,
            background: '#ffffff',
            marginBottom: 32,
          }}
        >
          <span style={{ fontSize: 56, fontWeight: 700, color: '#fe0534' }}>NB</span>
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, marginBottom: 16 }}>Native Base</div>
        <div style={{ fontSize: 28, color: '#a1a1aa', maxWidth: 720, textAlign: 'center' }}>
          Transform your business to be AI native. Subscription-based workflow automation in under 2 days.
        </div>
      </div>
    ),
    { ...size }
  );
}

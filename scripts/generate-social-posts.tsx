/**
 * Generate social media post images locally. Output is saved to generated-posts/
 * (gitignored) and is never deployed to Vercel.
 *
 * Run: npm run generate-social-posts
 */

import React from 'react';
import { ImageResponse } from '@vercel/og';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const OUT_DIR = join(process.cwd(), 'generated-posts');

const ACCENT = '#0d9488';
const TEXT = '#0f172a';
const MUTED = '#64748b';
const BORDER = '#e2e8f0';
const BG_ALT = '#f8fafc';

/* ── LinkedIn intro (1200×1200) ── */

function LinkedInIntro() {
  const pill = { fontSize: 19, color: MUTED, backgroundColor: BG_ALT, padding: '12px 24px', borderRadius: 9999, border: `1px solid ${BORDER}` };
  const stepCard = {
    flex: 1,
    display: 'flex' as const,
    flexDirection: 'column' as const,
    padding: '32px 28px',
    borderRadius: 16,
    border: `1px solid ${BORDER}`,
    backgroundColor: BG_ALT,
  };
  const stepNum = {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    border: `1px solid ${BORDER}`,
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    fontSize: 18,
    fontWeight: 700,
    color: ACCENT,
    flexShrink: 0,
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#ffffff', fontFamily: 'ui-sans-serif, system-ui, sans-serif', padding: '80px 88px' }}>
      {/* Logo */}
      <div style={{ fontSize: 30, fontWeight: 700, color: TEXT, marginBottom: 64 }}>NativeBase.AI</div>

      {/* Pills */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 44 }}>
        <span style={pill}>No long-term commitment.</span>
        <span style={pill}>A subscription model.</span>
      </div>

      {/* Headline */}
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 32 }}>
        <div style={{ fontSize: 80, fontWeight: 700, color: TEXT, lineHeight: 1.08 }}>Transform your</div>
        <div style={{ fontSize: 80, fontWeight: 700, color: TEXT, lineHeight: 1.08 }}>business to be</div>
        <div style={{ fontSize: 80, fontWeight: 700, color: ACCENT, lineHeight: 1.08, borderBottom: `5px solid ${ACCENT}`, paddingBottom: 8, alignSelf: 'flex-start' }}>AI native.</div>
      </div>

      {/* Tagline */}
      <div style={{ fontSize: 30, color: MUTED, lineHeight: 1.4, marginBottom: 80 }}>Subscription-based workflow automation in under 2 days.</div>

      {/* How it works — compact inline steps */}
      <div style={{ display: 'flex', gap: 36, width: '100%', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={stepNum}>1</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 23, fontWeight: 700, color: TEXT }}>Subscribe</div>
            <div style={{ fontSize: 17, color: MUTED, lineHeight: 1.4 }}>Pick a plan, get instant access.</div>
          </div>
        </div>
        <div style={{ width: 1, height: 52, backgroundColor: BORDER, display: 'flex' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={stepNum}>2</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 23, fontWeight: 700, color: TEXT }}>Request</div>
            <div style={{ fontSize: 17, color: MUTED, lineHeight: 1.4 }}>Drop workflows in plain language.</div>
          </div>
        </div>
        <div style={{ width: 1, height: 52, backgroundColor: BORDER, display: 'flex' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={stepNum}>3</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 23, fontWeight: 700, color: TEXT }}>Receive</div>
            <div style={{ fontSize: 17, color: MUTED, lineHeight: 1.4 }}>Delivered in under 48 hours.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Generic OG-style post (1200×630) ── */

type GenericPostConfig = {
  slug: string;
  logo?: string;
  pills?: string[];
  headline: string;
  highlight: string;
  tagline: string;
};

function GenericPost({ post }: { post: GenericPostConfig }) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', background: '#ffffff', padding: 64, fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <div style={{ fontSize: 22, fontWeight: 600, color: TEXT, marginBottom: 56 }}>{post.logo ?? 'NativeBase.AI'}</div>
      {post.pills && post.pills.length > 0 && (
        <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
          {post.pills.map((p) => (
            <span key={p} style={{ fontSize: 14, color: MUTED, backgroundColor: BG_ALT, padding: '8px 16px', borderRadius: 9999, border: `1px solid ${BORDER}` }}>{p}</span>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 24 }}>
        <div style={{ fontSize: 48, fontWeight: 600, color: TEXT, lineHeight: 1.2 }}>{post.headline}</div>
        <div style={{ fontSize: 48, fontWeight: 600, color: ACCENT, lineHeight: 1.2, borderBottom: `4px solid ${ACCENT}`, paddingBottom: 4 }}>{post.highlight}</div>
      </div>
      <div style={{ fontSize: 22, color: MUTED, lineHeight: 1.4 }}>{post.tagline}</div>
    </div>
  );
}

/* ── Post list ── */

const GENERIC_POSTS: GenericPostConfig[] = [
  {
    slug: 'cost-efficient',
    pills: ['No long-term commitment.', 'A subscription model.'],
    headline: 'Transform your business to be',
    highlight: 'cost efficient.',
    tagline: 'Subscription-based workflow automation in under 2 days.',
  },
  {
    slug: 'ai-native',
    pills: ['No long-term commitment.', 'A subscription model.'],
    headline: 'Transform your business to be',
    highlight: 'AI native.',
    tagline: 'Subscription-based workflow automation in under 2 days.',
  },
];

async function main() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  console.log('Generating social post images...\n');

  const introRes = new ImageResponse(<LinkedInIntro />, { width: 1200, height: 1200 });
  const introBuf = Buffer.from(await introRes.arrayBuffer());
  writeFileSync(join(OUT_DIR, 'linkedin-intro.png'), introBuf);
  console.log('  wrote linkedin-intro.png');

  for (const post of GENERIC_POSTS) {
    const res = new ImageResponse(<GenericPost post={post} />, { width: 1200, height: 630 });
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(join(OUT_DIR, `${post.slug}.png`), buf);
    console.log(`  wrote ${post.slug}.png`);
  }

  console.log('\nDone. Output is in generated-posts/ (gitignored).');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

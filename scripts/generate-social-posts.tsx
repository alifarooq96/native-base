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
import sharp from 'sharp';

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

/* ── LinkedIn cover (3500×500) ── */

function LinkedInCover() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      background: '#ffffff',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      padding: '0 200px',
      position: 'relative',
    }}>
      {/* Decorative node pattern — left side */}
      <div style={{
        position: 'absolute',
        left: 80,
        top: 0,
        bottom: 0,
        width: 900,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.07,
      }}>
        <svg width="700" height="400" viewBox="0 0 700 400">
          <circle cx="100" cy="80" r="30" fill={ACCENT} />
          <circle cx="280" cy="50" r="20" fill={ACCENT} />
          <circle cx="200" cy="200" r="40" fill={ACCENT} />
          <circle cx="400" cy="150" r="25" fill={ACCENT} />
          <circle cx="350" cy="320" r="35" fill={ACCENT} />
          <circle cx="550" cy="100" r="22" fill={ACCENT} />
          <circle cx="500" cy="280" r="28" fill={ACCENT} />
          <circle cx="650" cy="200" r="18" fill={ACCENT} />
          <line x1="100" y1="80" x2="280" y2="50" stroke={ACCENT} strokeWidth="3" />
          <line x1="100" y1="80" x2="200" y2="200" stroke={ACCENT} strokeWidth="3" />
          <line x1="280" y1="50" x2="400" y2="150" stroke={ACCENT} strokeWidth="3" />
          <line x1="200" y1="200" x2="400" y2="150" stroke={ACCENT} strokeWidth="3" />
          <line x1="200" y1="200" x2="350" y2="320" stroke={ACCENT} strokeWidth="3" />
          <line x1="400" y1="150" x2="550" y2="100" stroke={ACCENT} strokeWidth="3" />
          <line x1="400" y1="150" x2="500" y2="280" stroke={ACCENT} strokeWidth="3" />
          <line x1="550" y1="100" x2="650" y2="200" stroke={ACCENT} strokeWidth="3" />
          <line x1="500" y1="280" x2="650" y2="200" stroke={ACCENT} strokeWidth="3" />
          <line x1="350" y1="320" x2="500" y2="280" stroke={ACCENT} strokeWidth="3" />
        </svg>
      </div>

      {/* Small logo mark — left area */}
      <div style={{
        position: 'absolute',
        left: 140,
        top: 80,
        fontSize: 28,
        fontWeight: 700,
        color: ACCENT,
        display: 'flex',
      }}>
        NativeBase.AI
      </div>

      {/* Text content — right-aligned */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        textAlign: 'right',
      }}>
        <div style={{ fontSize: 72, fontWeight: 700, color: TEXT, lineHeight: 1.1 }}>
          Transform your business to be
        </div>
        <div style={{
          fontSize: 72,
          fontWeight: 700,
          color: ACCENT,
          lineHeight: 1.1,
          borderBottom: `5px solid ${ACCENT}`,
          paddingBottom: 6,
          marginTop: 4,
        }}>
          AI native.
        </div>
        <div style={{
          fontSize: 28,
          color: MUTED,
          marginTop: 28,
          lineHeight: 1.4,
        }}>
          Subscription-based workflow automation in under 2 days.
        </div>
      </div>
    </div>
  );
}

/* ── Instagram grid (3×3, each post 1080×1440) ── */

const IG_POST_W = 1080;
const IG_POST_H = 1440;
const IG_ROW_W = IG_POST_W * 3; // 3240

async function sliceRow(buf: Buffer, rowName: string, outDir?: string) {
  const dir = outDir || OUT_DIR;
  const names: string[] = [];
  for (let col = 0; col < 3; col++) {
    const name = `ig-${rowName}-${col + 1}.png`;
    const sliced = await sharp(buf)
      .extract({ left: col * IG_POST_W, top: 0, width: IG_POST_W, height: IG_POST_H })
      .png()
      .toBuffer();
    writeFileSync(join(dir, name), sliced);
    names.push(name);
  }
  return names;
}

/**
 * Row 1: Logo spanning all 3 posts.
 * Node pattern background, "NativeBase.AI" centered.
 */
function IGRow1Logo() {
  return (
    <div style={{
      width: IG_ROW_W,
      height: IG_POST_H,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ffffff',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      position: 'relative',
    }}>
      {/* Background node pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.05,
      }}>
        <svg width="3000" height="1300" viewBox="0 0 3000 1300">
          <circle cx="150" cy="150" r="45" fill={ACCENT} />
          <circle cx="450" cy="80" r="30" fill={ACCENT} />
          <circle cx="350" cy="400" r="55" fill={ACCENT} />
          <circle cx="750" cy="250" r="35" fill={ACCENT} />
          <circle cx="650" cy="600" r="50" fill={ACCENT} />
          <circle cx="1000" cy="150" r="28" fill={ACCENT} />
          <circle cx="950" cy="480" r="40" fill={ACCENT} />
          <circle cx="1300" cy="350" r="45" fill={ACCENT} />
          <circle cx="1200" cy="700" r="32" fill={ACCENT} />
          <circle cx="1600" cy="250" r="38" fill={ACCENT} />
          <circle cx="1500" cy="570" r="48" fill={ACCENT} />
          <circle cx="1900" cy="160" r="26" fill={ACCENT} />
          <circle cx="1800" cy="430" r="42" fill={ACCENT} />
          <circle cx="2150" cy="300" r="45" fill={ACCENT} />
          <circle cx="2050" cy="650" r="32" fill={ACCENT} />
          <circle cx="2450" cy="200" r="36" fill={ACCENT} />
          <circle cx="2350" cy="520" r="28" fill={ACCENT} />
          <circle cx="2700" cy="350" r="40" fill={ACCENT} />
          <circle cx="300" cy="800" r="35" fill={ACCENT} />
          <circle cx="800" cy="850" r="30" fill={ACCENT} />
          <circle cx="1400" cy="900" r="40" fill={ACCENT} />
          <circle cx="2000" cy="850" r="28" fill={ACCENT} />
          <circle cx="2550" cy="750" r="35" fill={ACCENT} />
          <circle cx="2800" cy="600" r="30" fill={ACCENT} />
          <circle cx="500" cy="1050" r="25" fill={ACCENT} />
          <circle cx="1100" cy="1050" r="30" fill={ACCENT} />
          <circle cx="1750" cy="1100" r="28" fill={ACCENT} />
          <circle cx="2400" cy="1000" r="32" fill={ACCENT} />
          <line x1="150" y1="150" x2="450" y2="80" stroke={ACCENT} strokeWidth="3" />
          <line x1="150" y1="150" x2="350" y2="400" stroke={ACCENT} strokeWidth="3" />
          <line x1="450" y1="80" x2="750" y2="250" stroke={ACCENT} strokeWidth="3" />
          <line x1="350" y1="400" x2="750" y2="250" stroke={ACCENT} strokeWidth="3" />
          <line x1="350" y1="400" x2="650" y2="600" stroke={ACCENT} strokeWidth="3" />
          <line x1="750" y1="250" x2="1000" y2="150" stroke={ACCENT} strokeWidth="3" />
          <line x1="750" y1="250" x2="950" y2="480" stroke={ACCENT} strokeWidth="3" />
          <line x1="650" y1="600" x2="950" y2="480" stroke={ACCENT} strokeWidth="3" />
          <line x1="1000" y1="150" x2="1300" y2="350" stroke={ACCENT} strokeWidth="3" />
          <line x1="950" y1="480" x2="1300" y2="350" stroke={ACCENT} strokeWidth="3" />
          <line x1="950" y1="480" x2="1200" y2="700" stroke={ACCENT} strokeWidth="3" />
          <line x1="1300" y1="350" x2="1600" y2="250" stroke={ACCENT} strokeWidth="3" />
          <line x1="1300" y1="350" x2="1500" y2="570" stroke={ACCENT} strokeWidth="3" />
          <line x1="1200" y1="700" x2="1500" y2="570" stroke={ACCENT} strokeWidth="3" />
          <line x1="1600" y1="250" x2="1900" y2="160" stroke={ACCENT} strokeWidth="3" />
          <line x1="1600" y1="250" x2="1800" y2="430" stroke={ACCENT} strokeWidth="3" />
          <line x1="1500" y1="570" x2="1800" y2="430" stroke={ACCENT} strokeWidth="3" />
          <line x1="1900" y1="160" x2="2150" y2="300" stroke={ACCENT} strokeWidth="3" />
          <line x1="1800" y1="430" x2="2150" y2="300" stroke={ACCENT} strokeWidth="3" />
          <line x1="1800" y1="430" x2="2050" y2="650" stroke={ACCENT} strokeWidth="3" />
          <line x1="2150" y1="300" x2="2450" y2="200" stroke={ACCENT} strokeWidth="3" />
          <line x1="2150" y1="300" x2="2350" y2="520" stroke={ACCENT} strokeWidth="3" />
          <line x1="2050" y1="650" x2="2350" y2="520" stroke={ACCENT} strokeWidth="3" />
          <line x1="2450" y1="200" x2="2700" y2="350" stroke={ACCENT} strokeWidth="3" />
          <line x1="2350" y1="520" x2="2700" y2="350" stroke={ACCENT} strokeWidth="3" />
          <line x1="2350" y1="520" x2="2550" y2="750" stroke={ACCENT} strokeWidth="3" />
          <line x1="2700" y1="350" x2="2800" y2="600" stroke={ACCENT} strokeWidth="3" />
          <line x1="650" y1="600" x2="300" y2="800" stroke={ACCENT} strokeWidth="3" />
          <line x1="650" y1="600" x2="800" y2="850" stroke={ACCENT} strokeWidth="3" />
          <line x1="1200" y1="700" x2="1400" y2="900" stroke={ACCENT} strokeWidth="3" />
          <line x1="2050" y1="650" x2="2000" y2="850" stroke={ACCENT} strokeWidth="3" />
          <line x1="2550" y1="750" x2="2400" y2="1000" stroke={ACCENT} strokeWidth="3" />
          <line x1="300" y1="800" x2="500" y2="1050" stroke={ACCENT} strokeWidth="3" />
          <line x1="800" y1="850" x2="1100" y2="1050" stroke={ACCENT} strokeWidth="3" />
          <line x1="1400" y1="900" x2="1750" y2="1100" stroke={ACCENT} strokeWidth="3" />
          <line x1="2000" y1="850" x2="2400" y2="1000" stroke={ACCENT} strokeWidth="3" />
        </svg>
      </div>

      {/* Logo — sized to span nicely across the 3 posts */}
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <span style={{ fontSize: 220, fontWeight: 800, color: TEXT, letterSpacing: -6 }}>NativeBase</span>
        <span style={{ fontSize: 220, fontWeight: 800, color: ACCENT, letterSpacing: -6 }}>.AI</span>
      </div>
    </div>
  );
}

/**
 * Row 2: "Transform your business to be" spanning all 3 posts.
 */
function IGRow2Headline() {
  return (
    <div style={{
      width: IG_ROW_W,
      height: IG_POST_H,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ffffff',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      position: 'relative',
    }}>
      {/* Thin horizontal accent lines */}
      <div style={{
        position: 'absolute',
        top: 180,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: BORDER,
        display: 'flex',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 180,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: BORDER,
        display: 'flex',
      }} />

      {/* Main headline */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
      }}>
        <div style={{
          fontSize: 200,
          fontWeight: 800,
          color: TEXT,
          lineHeight: 1.1,
          letterSpacing: -4,
        }}>
          Transform your
        </div>
        <div style={{
          fontSize: 200,
          fontWeight: 800,
          color: TEXT,
          lineHeight: 1.1,
          letterSpacing: -4,
        }}>
          business to be
        </div>
      </div>
    </div>
  );
}

/**
 * Row 3: Individual standalone posts. Each one has a single phrase.
 * Each post should look great individually AND together in the grid.
 */
function IGRow3Post({ phrase, tagline, index }: { phrase: string; tagline: string; index: number }) {
  const colors = [ACCENT, '#6366f1', '#2563eb'];
  const color = colors[index] || ACCENT;

  const words = phrase.split(' ');

  return (
    <div style={{
      width: IG_POST_W,
      height: IG_POST_H,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ffffff',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      position: 'relative',
    }}>
      {/* Large faded accent circle behind text */}
      <div style={{
        position: 'absolute',
        width: 600,
        height: 600,
        borderRadius: 300,
        backgroundColor: color,
        opacity: 0.04,
        display: 'flex',
      }} />

      {/* Phrase — stack words vertically for impact */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
      }}>
        {words.map((word, i) => (
          <div key={i} style={{
            fontSize: 150,
            fontWeight: 800,
            color: color,
            lineHeight: 1.15,
          }}>
            {word}
          </div>
        ))}
      </div>

      {/* Accent underline */}
      <div style={{
        width: 120,
        height: 6,
        backgroundColor: color,
        borderRadius: 3,
        marginTop: 40,
        display: 'flex',
      }} />

      {/* Tagline */}
      <div style={{
        fontSize: 30,
        color: MUTED,
        marginTop: 32,
        maxWidth: 700,
        textAlign: 'center',
        lineHeight: 1.5,
        display: 'flex',
      }}>
        {tagline}
      </div>

      {/* Watermark */}
      <div style={{
        position: 'absolute',
        bottom: 60,
        fontSize: 26,
        fontWeight: 600,
        color: '#cbd5e1',
        display: 'flex',
      }}>
        NativeBase.AI
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

  const coverRes = new ImageResponse(<LinkedInCover />, { width: 3500, height: 500 });
  const coverBuf = Buffer.from(await coverRes.arrayBuffer());
  writeFileSync(join(OUT_DIR, 'linkedin-cover.png'), coverBuf);
  console.log('  wrote linkedin-cover.png');

  /* ── Instagram grid ── */
  console.log('\n  Instagram grid:');
  const igDir = join(OUT_DIR, 'instagram-grid');
  if (!existsSync(igDir)) mkdirSync(igDir, { recursive: true });

  // Row 1: Logo
  const row1Res = new ImageResponse(<IGRow1Logo />, { width: IG_ROW_W, height: IG_POST_H });
  const row1Buf = Buffer.from(await row1Res.arrayBuffer());
  writeFileSync(join(igDir, 'row1-full.png'), row1Buf);
  const row1Names = await sliceRow(row1Buf, 'row1', igDir);
  row1Names.forEach((n) => console.log(`    wrote ${n}`));

  // Row 2: Headline
  const row2Res = new ImageResponse(<IGRow2Headline />, { width: IG_ROW_W, height: IG_POST_H });
  const row2Buf = Buffer.from(await row2Res.arrayBuffer());
  writeFileSync(join(igDir, 'row2-full.png'), row2Buf);
  const row2Names = await sliceRow(row2Buf, 'row2', igDir);
  row2Names.forEach((n) => console.log(`    wrote ${n}`));

  // Row 3: Individual standalone posts
  const row3Items = [
    { phrase: 'AI Native', tagline: 'Automate core workflows with intelligent systems.' },
    { phrase: 'Future Proof', tagline: 'Stay ahead with technology that evolves with you.' },
    { phrase: 'Infinitely Scalable', tagline: 'From startup to enterprise, without limits.' },
  ];
  for (let i = 0; i < row3Items.length; i++) {
    const res = new ImageResponse(
      <IGRow3Post phrase={row3Items[i].phrase} tagline={row3Items[i].tagline} index={i} />,
      { width: IG_POST_W, height: IG_POST_H },
    );
    const buf = Buffer.from(await res.arrayBuffer());
    const name = `ig-row3-${i + 1}.png`;
    writeFileSync(join(igDir, name), buf);
    console.log(`    wrote ${name}`);
  }

  // Also generate a preview mosaic of the full 3×3 grid
  const row3Bufs: Buffer[] = [];
  for (let i = 1; i <= 3; i++) {
    const b = await sharp(join(igDir, `ig-row3-${i}.png`)).toBuffer();
    row3Bufs.push(b);
  }
  const row3Composite = await sharp({
    create: { width: IG_ROW_W, height: IG_POST_H, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } },
  })
    .composite([
      { input: row3Bufs[0], left: 0, top: 0 },
      { input: row3Bufs[1], left: IG_POST_W, top: 0 },
      { input: row3Bufs[2], left: IG_POST_W * 2, top: 0 },
    ])
    .png()
    .toBuffer();

  const gridPreview = await sharp({
    create: { width: IG_ROW_W, height: IG_POST_H * 3, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } },
  })
    .composite([
      { input: row1Buf, left: 0, top: 0 },
      { input: row2Buf, left: 0, top: IG_POST_H },
      { input: row3Composite, left: 0, top: IG_POST_H * 2 },
    ])
    .png()
    .toBuffer();
  writeFileSync(join(igDir, 'grid-preview.png'), gridPreview);
  console.log('    wrote grid-preview.png');

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

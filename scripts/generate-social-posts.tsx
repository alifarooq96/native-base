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
const WARNING_RED = '#dc2626';
const SUCCESS_GREEN = '#16a34a';
const NAVY = '#0f172a';
const NAVY_LIGHT = '#1e293b';
const NAVY_MID = '#334155';

const IG_CAROUSEL_W = 1080;
const IG_CAROUSEL_H = 1350;

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

/* ── Instagram Carousel: Insurance Agency Campaign (1080×1350) ── */

function CarouselWatermark() {
  return (
    <div style={{ position: 'absolute', bottom: 48, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
      <span style={{ fontSize: 20, fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: 1 }}>NativeBase.AI</span>
    </div>
  );
}

function CarouselSlideNumber({ n, total, light }: { n: number; total: number; light?: boolean }) {
  return (
    <div style={{
      position: 'absolute',
      top: 48,
      right: 56,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
    }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === n - 1 ? 24 : 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: i === n - 1
              ? (light ? '#ffffff' : ACCENT)
              : (light ? 'rgba(255,255,255,0.3)' : BORDER),
            display: 'flex',
          }}
        />
      ))}
    </div>
  );
}

function BrowserWindow({ title, color, children, w, h }: { title: string; color: string; children: React.ReactNode; w: number; h: number }) {
  return (
    <div style={{
      width: w,
      height: h,
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 12,
      border: `2px solid ${color}33`,
      overflow: 'hidden',
      backgroundColor: NAVY_LIGHT,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 12px',
        backgroundColor: NAVY_MID,
        gap: 6,
      }}>
        <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: WARNING_RED, display: 'flex' }} />
        <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#f59e0b', display: 'flex' }} />
        <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: SUCCESS_GREEN, display: 'flex' }} />
        <div style={{
          marginLeft: 8,
          fontSize: 11,
          color: 'rgba(255,255,255,0.5)',
          display: 'flex',
        }}>
          {title}
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 10, gap: 6 }}>
        {children}
      </div>
    </div>
  );
}

/**
 * Slide 1: The Hook — "Stuck in Portal Hell?"
 * Dark dramatic atmosphere, multiple carrier login screens, warning red accents.
 */
function IGCarouselSlide1() {
  const carriers = ['Progressive', 'Travelers', 'Liberty Mutual', 'Hartford', 'Nationwide'];
  const inputBar = { height: 14, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.08)', display: 'flex' as const, width: '100%' as const };
  const btnStyle = { height: 16, borderRadius: 4, backgroundColor: WARNING_RED, opacity: 0.6, display: 'flex' as const, width: 60, marginTop: 2 };

  return (
    <div style={{
      width: IG_CAROUSEL_W,
      height: IG_CAROUSEL_H,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(180deg, ${NAVY} 0%, #0c1220 100%)`,
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle red glow behind screens */}
      <div style={{
        position: 'absolute',
        width: 700,
        height: 700,
        borderRadius: 350,
        background: WARNING_RED,
        opacity: 0.06,
        top: 200,
        display: 'flex',
      }} />

      <CarouselSlideNumber n={1} total={5} light />

      {/* Portal screens grid */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
        justifyContent: 'center',
        width: 900,
        marginBottom: 64,
      }}>
        {carriers.map((name) => (
          <BrowserWindow key={name} title={name} color={WARNING_RED} w={260} h={160}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 4, display: 'flex' }}>Agent Login</div>
            <div style={inputBar} />
            <div style={{ ...inputBar, marginTop: 4 }} />
            <div style={btnStyle} />
          </BrowserWindow>
        ))}
      </div>

      {/* Main text */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
      }}>
        <div style={{
          fontSize: 72,
          fontWeight: 800,
          color: '#ffffff',
          lineHeight: 1.1,
          textAlign: 'center',
          display: 'flex',
        }}>
          Stuck in
        </div>
        <div style={{
          fontSize: 72,
          fontWeight: 800,
          color: WARNING_RED,
          lineHeight: 1.1,
          textAlign: 'center',
          display: 'flex',
        }}>
          Portal Hell?
        </div>
      </div>

      <CarouselWatermark />
    </div>
  );
}

/**
 * Slide 2: The Agitation — data re-entry pain.
 * Minimalist split comparison: ACORD form vs. multiple carrier screens.
 */
function IGCarouselSlide2() {
  const fieldRow = (label: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
      <div style={{ fontSize: 11, color: MUTED, width: 60, display: 'flex' }}>{label}</div>
      <div style={{ flex: 1, height: 16, borderRadius: 4, backgroundColor: BG_ALT, border: `1px solid ${BORDER}`, display: 'flex' }} />
    </div>
  );

  const miniScreen = (name: string) => (
    <div key={name} style={{
      width: 180,
      height: 110,
      borderRadius: 8,
      border: `1px solid ${BORDER}`,
      backgroundColor: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      padding: 10,
      gap: 4,
    }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: TEXT, display: 'flex' }}>{name}</div>
      <div style={{ height: 10, borderRadius: 3, backgroundColor: BG_ALT, display: 'flex' }} />
      <div style={{ height: 10, borderRadius: 3, backgroundColor: BG_ALT, display: 'flex', width: '70%' }} />
      <div style={{ height: 10, borderRadius: 3, backgroundColor: BG_ALT, display: 'flex', width: '50%' }} />
    </div>
  );

  return (
    <div style={{
      width: IG_CAROUSEL_W,
      height: IG_CAROUSEL_H,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ffffff',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      position: 'relative',
      padding: '0 56px',
    }}>
      <CarouselSlideNumber n={2} total={5} />

      {/* VS comparison */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginBottom: 56 }}>
        {/* Left: ACORD form */}
        <div style={{
          width: 380,
          display: 'flex',
          flexDirection: 'column',
          padding: 28,
          borderRadius: 16,
          border: `1px solid ${BORDER}`,
          backgroundColor: '#ffffff',
        }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: TEXT, marginBottom: 4, display: 'flex' }}>ACORD 125</div>
          <div style={{ fontSize: 11, color: MUTED, marginBottom: 16, display: 'flex' }}>Commercial Insurance Application</div>
          {fieldRow('Name')}
          {fieldRow('VIN')}
          {fieldRow('Policy #')}
          {fieldRow('Address')}
          {fieldRow('DOB')}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
            <div style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#ffffff',
              backgroundColor: ACCENT,
              padding: '6px 20px',
              borderRadius: 6,
              display: 'flex',
            }}>1 form, 1 entry</div>
          </div>
        </div>

        {/* Arrow and 5x badge */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: WARNING_RED,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: '#ffffff' }}>5×</span>
          </div>
          <svg width="40" height="24" viewBox="0 0 40 24">
            <path d="M4 12 H30 M24 4 L32 12 L24 20" stroke={WARNING_RED} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Right: 5 carrier screens */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          width: 380,
          justifyContent: 'center',
        }}>
          {['Progressive', 'Travelers', 'Liberty Mutual', 'Hartford', 'Nationwide'].map(miniScreen)}
        </div>
      </div>

      {/* Text overlay */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: 880,
        gap: 16,
        padding: '0 24px',
      }}>
        <div style={{
          fontSize: 36,
          fontWeight: 800,
          color: TEXT,
          lineHeight: 1.25,
          display: 'flex',
          textAlign: 'center',
        }}>
          You spend 60% of your day re-typing the same VIN number.
        </div>
        <div style={{
          fontSize: 28,
          color: MUTED,
          lineHeight: 1.4,
          display: 'flex',
          textAlign: 'center',
        }}>
          Your staff is burnt out. Your clients are waiting.
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 48, display: 'flex' }}>
        <span style={{ fontSize: 20, fontWeight: 600, color: '#cbd5e1', letterSpacing: 1 }}>NativeBase.AI</span>
      </div>
    </div>
  );
}

/**
 * Slide 3: The Solution — NativeBase AI dashboard auto-populating carrier portals.
 * Clean, bright, confident. Teal accents.
 */
function IGCarouselSlide3() {
  const filledField = (label: string, value: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
      <div style={{ fontSize: 12, color: MUTED, width: 80, display: 'flex' }}>{label}</div>
      <div style={{
        flex: 1,
        height: 20,
        borderRadius: 4,
        backgroundColor: `${ACCENT}15`,
        border: `1px solid ${ACCENT}40`,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 8,
      }}>
        <span style={{ fontSize: 12, color: ACCENT, fontWeight: 600 }}>{value}</span>
      </div>
      <svg width="16" height="16" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="7" fill={ACCENT} />
        <path d="M5 8 L7 10 L11 6" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );

  return (
    <div style={{
      width: IG_CAROUSEL_W,
      height: IG_CAROUSEL_H,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ffffff',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      position: 'relative',
    }}>
      {/* Subtle teal gradient glow */}
      <div style={{
        position: 'absolute',
        top: 100,
        width: 600,
        height: 600,
        borderRadius: 300,
        background: ACCENT,
        opacity: 0.04,
        display: 'flex',
      }} />

      <CarouselSlideNumber n={3} total={5} />

      {/* Dashboard mockup */}
      <div style={{
        width: 860,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 20,
        border: `1px solid ${BORDER}`,
        overflow: 'hidden',
        marginBottom: 48,
        backgroundColor: '#ffffff',
      }}>
        {/* Dashboard header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          backgroundColor: NAVY,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#ffffff' }}>NativeBase</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: ACCENT }}>.AI</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: SUCCESS_GREEN,
              display: 'flex',
            }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Agent Active</span>
          </div>
        </div>

        {/* Dashboard body */}
        <div style={{ display: 'flex', padding: 24, gap: 24 }}>
          {/* Left: form being auto-filled */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>Travelers — Auto Quote</span>
              <div style={{
                fontSize: 10,
                color: ACCENT,
                backgroundColor: `${ACCENT}15`,
                padding: '3px 10px',
                borderRadius: 9999,
                display: 'flex',
                fontWeight: 600,
              }}>
                Auto-populating...
              </div>
            </div>
            {filledField('Insured', 'John M. Davis')}
            {filledField('VIN', '1HGCM82633A004352')}
            {filledField('Policy #', 'TRV-2025-88421')}
            {filledField('Address', '142 Oak Lane, Hartford')}
            {filledField('Coverage', '$500K / $1M CSL')}
            {filledField('Eff. Date', '03/15/2025')}
          </div>

          {/* Right: speed indicator */}
          <div style={{
            width: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
          }}>
            {/* AI cursor icon */}
            <div style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              background: `linear-gradient(135deg, ${ACCENT}, #2dd4bf)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="36" height="36" viewBox="0 0 36 36">
                <path d="M18 4 L20 14 L30 12 L22 18 L32 22 L20 22 L18 32 L16 22 L4 22 L14 18 L6 12 L16 14 Z" fill="#fff" />
              </svg>
            </div>
            <div style={{
              fontSize: 42,
              fontWeight: 800,
              color: ACCENT,
              display: 'flex',
            }}>10×</div>
            <div style={{ fontSize: 14, color: MUTED, display: 'flex' }}>human speed</div>
          </div>
        </div>
      </div>

      {/* Text overlay */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: 880,
        gap: 12,
        padding: '0 56px',
      }}>
        <div style={{
          fontSize: 36,
          fontWeight: 800,
          color: TEXT,
          lineHeight: 1.25,
          display: 'flex',
          textAlign: 'center',
        }}>
          Meet your 24/7 AI-Powered Quoting CSR.
        </div>
        <div style={{
          fontSize: 26,
          color: MUTED,
          lineHeight: 1.4,
          display: 'flex',
          textAlign: 'center',
        }}>
          We build agents that log in, populate, and scrape quotes from every carrier.
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 48, display: 'flex' }}>
        <span style={{ fontSize: 20, fontWeight: 600, color: '#cbd5e1', letterSpacing: 1 }}>NativeBase.AI</span>
      </div>
    </div>
  );
}

/**
 * Slide 4: Social Proof / ROI — analog clock vs digital stopwatch.
 * Success green accents. Split-screen comparison.
 */
function IGCarouselSlide4() {
  return (
    <div style={{
      width: IG_CAROUSEL_W,
      height: IG_CAROUSEL_H,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ffffff',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      position: 'relative',
    }}>
      <CarouselSlideNumber n={4} total={5} />

      {/* Split comparison */}
      <div style={{ display: 'flex', width: 920, gap: 32, marginBottom: 56 }}>
        {/* Left: analog clock showing ~15 min */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
          borderRadius: 20,
          backgroundColor: BG_ALT,
          border: `1px solid ${BORDER}`,
          gap: 20,
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: MUTED, letterSpacing: 2, display: 'flex' }}>TIME ELAPSED</div>
          <svg width="200" height="200" viewBox="0 0 200 200">
            {/* Clock face */}
            <circle cx="100" cy="100" r="90" fill="none" stroke={BORDER} strokeWidth="4" />
            <circle cx="100" cy="100" r="4" fill={TEXT} />
            {/* Hour markers */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 - 90) * (Math.PI / 180);
              const x1 = 100 + 78 * Math.cos(angle);
              const y1 = 100 + 78 * Math.sin(angle);
              const x2 = 100 + 86 * Math.cos(angle);
              const y2 = 100 + 86 * Math.sin(angle);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={TEXT} strokeWidth="3" strokeLinecap="round" />;
            })}
            {/* Hour hand (pointing ~12) */}
            <line x1="100" y1="100" x2="100" y2="46" stroke={TEXT} strokeWidth="5" strokeLinecap="round" />
            {/* Minute hand (pointing at 3 = 15 min) */}
            <line x1="100" y1="100" x2="168" y2="100" stroke={TEXT} strokeWidth="3" strokeLinecap="round" />
          </svg>
          <div style={{ fontSize: 32, fontWeight: 800, color: TEXT, display: 'flex' }}>15 Minutes</div>
        </div>

        {/* Right: digital stopwatch / results */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
          borderRadius: 20,
          backgroundColor: `${SUCCESS_GREEN}08`,
          border: `2px solid ${SUCCESS_GREEN}30`,
          gap: 16,
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: SUCCESS_GREEN, letterSpacing: 2, display: 'flex' }}>QUOTES GENERATED</div>

          {/* Digital display */}
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 4,
          }}>
            <span style={{ fontSize: 96, fontWeight: 800, color: SUCCESS_GREEN, lineHeight: 1 }}>100</span>
            <span style={{ fontSize: 48, fontWeight: 800, color: SUCCESS_GREEN }}>+</span>
          </div>

          {/* Progress bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', padding: '0 24px' }}>
            {([['Auto', 92], ['Home', 78], ['Commercial', 65], ['Umbrella', 85]] as const).map(([line, pct]) => (
              <div key={line} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ fontSize: 11, color: MUTED, width: 75, display: 'flex' }}>{line}</div>
                <div style={{ flex: 1, height: 12, borderRadius: 6, backgroundColor: `${SUCCESS_GREEN}20`, display: 'flex', overflow: 'hidden' }}>
                  <div style={{
                    width: `${pct}%`,
                    height: '100%',
                    borderRadius: 6,
                    backgroundColor: SUCCESS_GREEN,
                    display: 'flex',
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Bind button */}
          <div style={{
            marginTop: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            backgroundColor: SUCCESS_GREEN,
            padding: '12px 28px',
            borderRadius: 10,
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18">
              <circle cx="9" cy="9" r="8" fill="none" stroke="#fff" strokeWidth="1.5" />
              <path d="M6 9 L8 11 L12 7" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#ffffff' }}>Bind Policy</span>
          </div>
        </div>
      </div>

      {/* Text overlay */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: 880,
        gap: 12,
        padding: '0 56px',
      }}>
        <div style={{
          fontSize: 34,
          fontWeight: 800,
          color: TEXT,
          lineHeight: 1.25,
          display: 'flex',
          textAlign: 'center',
        }}>
          Double your "Quote-to-Bind" speed.
        </div>
        <div style={{
          fontSize: 24,
          color: MUTED,
          lineHeight: 1.5,
          display: 'flex',
          textAlign: 'center',
        }}>
          100% data accuracy to your AMS. Cancel your renewal backlogs.
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 48, display: 'flex' }}>
        <span style={{ fontSize: 20, fontWeight: 600, color: '#cbd5e1', letterSpacing: 1 }}>NativeBase.AI</span>
      </div>
    </div>
  );
}

/**
 * Slide 5: The CTA — book a workflow audit.
 * Professional, inviting. Calendar mockup + savings stat.
 */
function IGCarouselSlide5() {
  const days = ['M', 'T', 'W', 'T', 'F'];
  const slots = [
    [1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0],
    [1, 1, 0, 0, 1],
    [0, 0, 1, 1, 0],
  ];

  return (
    <div style={{
      width: IG_CAROUSEL_W,
      height: IG_CAROUSEL_H,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(180deg, #ffffff 0%, ${BG_ALT} 100%)`,
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      position: 'relative',
    }}>
      <CarouselSlideNumber n={5} total={5} />

      {/* Savings stat badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 40,
        padding: '14px 32px',
        borderRadius: 9999,
        backgroundColor: `${ACCENT}12`,
        border: `1px solid ${ACCENT}30`,
      }}>
        <span style={{ fontSize: 20, fontWeight: 800, color: ACCENT }}>Save $6,000/mo</span>
        <span style={{ fontSize: 18, color: MUTED }}>on admin payroll</span>
      </div>

      {/* Calendar mockup */}
      <div style={{
        width: 700,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 20,
        border: `1px solid ${BORDER}`,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        marginBottom: 48,
      }}>
        {/* Calendar header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 28px',
          borderBottom: `1px solid ${BORDER}`,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: TEXT }}>Book Your Free Workflow Audit</span>
            <span style={{ fontSize: 14, color: MUTED }}>15 minutes · Video call</span>
          </div>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: ACCENT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="3" fill="none" stroke="#fff" strokeWidth="1.5" />
              <line x1="3" y1="10" x2="21" y2="10" stroke="#fff" strokeWidth="1.5" />
              <line x1="8" y1="2" x2="8" y2="6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="16" y1="2" x2="16" y2="6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Calendar grid */}
        <div style={{ display: 'flex', flexDirection: 'column', padding: 28, gap: 12 }}>
          {/* Day headers */}
          <div style={{ display: 'flex', gap: 12 }}>
            {days.map((d) => (
              <div key={d} style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 700,
                color: MUTED,
              }}>
                {d}
              </div>
            ))}
          </div>
          {/* Time slots */}
          {slots.map((row, ri) => (
            <div key={ri} style={{ display: 'flex', gap: 12 }}>
              {row.map((avail, ci) => (
                <div
                  key={ci}
                  style={{
                    flex: 1,
                    height: 48,
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: avail ? `${ACCENT}12` : BG_ALT,
                    border: `1px solid ${avail ? `${ACCENT}40` : BORDER}`,
                    fontSize: 13,
                    fontWeight: avail ? 600 : 400,
                    color: avail ? ACCENT : '#cbd5e1',
                  }}
                >
                  {avail ? `${9 + ri}:00` : '—'}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Selected slot confirmation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px 28px',
          borderTop: `1px solid ${BORDER}`,
          gap: 12,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '14px 40px',
            borderRadius: 12,
            backgroundColor: ACCENT,
          }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#ffffff' }}>Confirm Booking →</span>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 8,
      }}>
        <div style={{
          fontSize: 32,
          fontWeight: 800,
          color: TEXT,
          lineHeight: 1.25,
          display: 'flex',
        }}>
          Free 15-Minute Workflow Audit
        </div>
        <div style={{
          fontSize: 24,
          color: ACCENT,
          fontWeight: 700,
          display: 'flex',
        }}>
          Link in Bio
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 48, display: 'flex' }}>
        <span style={{ fontSize: 20, fontWeight: 600, color: '#cbd5e1', letterSpacing: 1 }}>NativeBase.AI</span>
      </div>
    </div>
  );
}

/* ── Instagram Carousel: Freight & Logistics (1080×1350) — 7 slides ── */
/* Content from /use-cases/freight-and-logistics */

/**
 * Freight Slide 1: The Hook — "Stop paying your team to 'Check the Status.'"
 * Split-screen: stressed employee (50 tabs, red) vs clean AI dashboard (teal).
 * Sub-headline: "How Freight Forwarders are reclaiming 4 hours per person, every day."
 *
 * Alt-text keywords: freight forwarding AI automation, carrier portal fatigue, track and trace dashboard
 */
function IGCarouselFreightSlide1() {
  const carriers = ['Maersk', 'MSC', 'FedEx', 'DHL', 'CMA CGM'];
  const inputBar = { height: 14, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.08)', display: 'flex' as const, width: '100%' as const };
  const btnStyle = { height: 16, borderRadius: 4, backgroundColor: WARNING_RED, opacity: 0.6, display: 'flex' as const, width: 60, marginTop: 2 };

  return (
    <div style={{
      width: IG_CAROUSEL_W,
      height: IG_CAROUSEL_H,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(180deg, ${NAVY} 0%, #0c1220 100%)`,
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        width: 700,
        height: 700,
        borderRadius: 350,
        background: WARNING_RED,
        opacity: 0.06,
        top: 200,
        display: 'flex',
      }} />

      <CarouselSlideNumber n={1} total={7} light />

      {/* Portal screens grid — same pattern as insurance */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
        justifyContent: 'center',
        width: 900,
        marginBottom: 56,
      }}>
        {carriers.map((name) => (
          <BrowserWindow key={name} title={name} color={WARNING_RED} w={260} h={160}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 4, display: 'flex' }}>Track &amp; Trace Login</div>
            <div style={inputBar} />
            <div style={{ ...inputBar, marginTop: 4 }} />
            <div style={btnStyle} />
          </BrowserWindow>
        ))}
      </div>

      {/* Main text — aligned like insurance */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        padding: '0 56px',
      }}>
        <div style={{ fontSize: 64, fontWeight: 800, color: '#ffffff', lineHeight: 1.1, textAlign: 'center', display: 'flex' }}>
          Stop paying your team to
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, color: WARNING_RED, lineHeight: 1.1, textAlign: 'center', display: 'flex' }}>
          &ldquo;Check the Status.&rdquo;
        </div>
        <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.6)', lineHeight: 1.35, textAlign: 'center', display: 'flex', maxWidth: 820 }}>
          How Freight Forwarders are reclaiming 4 hours per person, every single day.
        </div>
      </div>

      <CarouselWatermark />
    </div>
  );
}

/**
 * Freight Slide 2: The Agitation — Three pains of "Digital Manual Labor."
 * Portal Fatigue · Data Latency · Typing Errors. Carrier logos in chaotic cluster.
 *
 * Alt-text keywords: logistics portal fatigue, supply chain data latency, freight forwarding manual errors
 */
function IGCarouselFreightSlide2() {
  const pains = [
    {
      num: '01',
      title: 'Portal Fatigue',
      sub: '20+ separate logins',
      desc: 'Your team juggles Maersk, MSC, FedEx, DHL, and CMA CGM every single morning—manually.',
      color: WARNING_RED,
    },
    {
      num: '02',
      title: 'Data Latency',
      sub: 'Your client knows first',
      desc: 'Shipment delays surface on the carrier site hours before your TMS catches up. You\'re always last.',
      color: '#f59e0b',
    },
    {
      num: '03',
      title: 'Typing Errors',
      sub: '2–5% human error rate',
      desc: 'One transposed container number = hours of detective work, claim disputes, and angry clients.',
      color: '#8b5cf6',
    },
  ];

  return (
    <div style={{
      width: IG_CAROUSEL_W,
      height: IG_CAROUSEL_H,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ffffff',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      position: 'relative',
      padding: '0 56px',
    }}>
      <CarouselSlideNumber n={2} total={7} />

      <div style={{ fontSize: 12, fontWeight: 700, color: WARNING_RED, letterSpacing: 2, marginBottom: 12, display: 'flex' }}>THE PROBLEM</div>
      <div style={{ fontSize: 36, fontWeight: 800, color: TEXT, lineHeight: 1.2, textAlign: 'center', display: 'flex', maxWidth: 880, marginBottom: 32 }}>
        The &ldquo;Digital Manual Labor&rdquo; bleeding your margins.
      </div>

      {/* Pain cards — compact */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 860, marginBottom: 32 }}>
        {pains.map((p) => (
          <div key={p.num} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 16,
            padding: '16px 20px',
            borderRadius: 12,
            border: `1px solid ${p.color}30`,
            backgroundColor: `${p.color}06`,
          }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: `${p.color}40`, lineHeight: 1, display: 'flex', flexShrink: 0, width: 40 }}>
              {p.num}
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 17, fontWeight: 800, color: TEXT, display: 'flex' }}>{p.title}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: p.color, backgroundColor: `${p.color}15`, padding: '2px 8px', borderRadius: 9999, display: 'flex' }}>{p.sub}</span>
              </div>
              <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.5, display: 'flex' }}>{p.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 24, color: MUTED, textAlign: 'center', display: 'flex', maxWidth: 820, lineHeight: 1.4 }}>
        Your customers know about delays before you do. That has to stop.
      </div>

      <div style={{ position: 'absolute', bottom: 48, display: 'flex' }}>
        <span style={{ fontSize: 20, fontWeight: 600, color: '#cbd5e1', letterSpacing: 1 }}>NativeBase.AI</span>
      </div>
    </div>
  );
}

/**
 * Freight Slide 3: The Pivot — "Meet your new 24/7 AI Track & Trace Agent."
 * AI robot icon reading a carrier portal. Dark hero panel with teal accent.
 *
 * Alt-text keywords: AI track and trace agent, autonomous freight automation, NativeBase AI browser
 */
function IGCarouselFreightSlide3() {
  return (
    <div style={{
      width: IG_CAROUSEL_W,
      height: IG_CAROUSEL_H,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(160deg, ${NAVY} 0%, #0a1a1a 100%)`,
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative rings */}
      <div style={{ position: 'absolute', width: 640, height: 640, borderRadius: 320, border: `1px solid ${ACCENT}18`, top: 80, display: 'flex' }} />
      <div style={{ position: 'absolute', width: 460, height: 460, borderRadius: 230, border: `1px solid ${ACCENT}25`, top: 170, display: 'flex' }} />

      <CarouselSlideNumber n={3} total={7} light />

      {/* AI Agent icon */}
      <div style={{
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: `${ACCENT}20`,
        border: `2px solid ${ACCENT}60`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 28,
      }}>
        <svg width="60" height="60" viewBox="0 0 72 72" fill="none">
          {/* Robot head */}
          <rect x="18" y="20" width="36" height="28" rx="8" fill={ACCENT} opacity="0.9" />
          {/* Eyes */}
          <circle cx="28" cy="32" r="4" fill="#ffffff" />
          <circle cx="44" cy="32" r="4" fill="#ffffff" />
          <circle cx="29" cy="32" r="2" fill={NAVY} />
          <circle cx="45" cy="32" r="2" fill={NAVY} />
          {/* Mouth */}
          <rect x="27" y="40" width="18" height="3" rx="1.5" fill="rgba(255,255,255,0.6)" />
          {/* Antenna */}
          <line x1="36" y1="20" x2="36" y2="12" stroke={ACCENT} strokeWidth="2" />
          <circle cx="36" cy="10" r="3" fill={ACCENT} />
          {/* Shoulders */}
          <rect x="10" y="50" width="52" height="14" rx="7" fill={ACCENT} opacity="0.5" />
          {/* Signal waves */}
          <path d="M8 36 Q4 32 8 28" stroke={ACCENT} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
          <path d="M4 38 Q-2 32 4 26" stroke={ACCENT} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4" />
          <path d="M64 36 Q68 32 64 28" stroke={ACCENT} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
          <path d="M68 38 Q74 32 68 26" stroke={ACCENT} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4" />
        </svg>
      </div>

      {/* Headline */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, marginBottom: 24, padding: '0 56px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: 2, display: 'flex' }}>THE SOLUTION</div>
        <div style={{ fontSize: 38, fontWeight: 800, color: '#ffffff', lineHeight: 1.18, textAlign: 'center', display: 'flex' }}>
          Meet your new 24/7 AI Track &amp; Trace Agent.
        </div>
        <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.55)', lineHeight: 1.45, textAlign: 'center', display: 'flex', maxWidth: 820 }}>
          NativeBase builds custom AI browsers that work exactly like a human—but faster and without the coffee breaks.
        </div>
      </div>

      {/* Feature pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', maxWidth: 840 }}>
        {['Logs into any carrier portal', 'Handles MFA & CAPTCHAs', 'Reads any page layout', 'Zero copy-paste', '24/7/365 uptime'].map((feat) => (
          <div key={feat} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 20px',
            borderRadius: 9999,
            border: `1px solid ${ACCENT}40`,
            backgroundColor: `${ACCENT}12`,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: ACCENT, display: 'flex' }} />
            <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', display: 'flex' }}>{feat}</span>
          </div>
        ))}
      </div>

      <CarouselWatermark />
    </div>
  );
}

/**
 * Freight Slide 4: How it Works — "From Portal to TMS—Automatically."
 * 3-step horizontal flow chart: Secure Login → Intelligent Extraction → Auto-Update.
 *
 * Alt-text keywords: freight TMS automation workflow, CargoWise integration, AI data extraction
 */
function IGCarouselFreightSlide4() {
  const steps = [
    {
      num: '1',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="8" width="24" height="18" rx="4" fill={ACCENT} opacity="0.15" stroke={ACCENT} strokeWidth="1.5" />
          <rect x="9" y="14" width="14" height="3" rx="1.5" fill={ACCENT} opacity="0.6" />
          <rect x="9" y="19" width="9" height="3" rx="1.5" fill={ACCENT} opacity="0.4" />
          <circle cx="16" cy="5" r="2.5" fill={ACCENT} />
          <line x1="16" y1="7.5" x2="16" y2="9" stroke={ACCENT} strokeWidth="1.5" />
        </svg>
      ),
      title: 'Secure Login',
      desc: 'AI logs into carrier portals (Maersk, MSC, FedEx, DHL). Handles MFA, CAPTCHAs & session management automatically.',
    },
    {
      num: '2',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="4" width="24" height="18" rx="4" fill={ACCENT} opacity="0.15" stroke={ACCENT} strokeWidth="1.5" />
          <circle cx="16" cy="13" r="5" fill={ACCENT} opacity="0.3" stroke={ACCENT} strokeWidth="1.5" />
          <circle cx="16" cy="13" r="2" fill={ACCENT} />
          <path d="M20 17 L25 24" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      title: 'Intelligent Extraction',
      desc: 'Vision-AI reads ETAs, ports of discharge, vessel names & delay notes from any portal layout—no scraping, no APIs needed.',
    },
    {
      num: '3',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="3" y="8" width="12" height="16" rx="3" fill={ACCENT} opacity="0.15" stroke={ACCENT} strokeWidth="1.5" />
          <rect x="17" y="8" width="12" height="16" rx="3" fill={ACCENT} opacity="0.15" stroke={ACCENT} strokeWidth="1.5" />
          <path d="M15 16 H17" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M13 14 L15 16 L13 18" stroke={ACCENT} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: 'Auto-Update',
      desc: 'Pushes data directly into CargoWise, Magaya, Google Sheets, or your ERP. Zero CSV exports. Zero manual entry.',
    },
  ];

  return (
    <div style={{
      width: IG_CAROUSEL_W,
      height: IG_CAROUSEL_H,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ffffff',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      position: 'relative',
      padding: '0 56px',
    }}>
      <CarouselSlideNumber n={4} total={7} />

      <div style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: 2, marginBottom: 10, display: 'flex' }}>HOW IT WORKS</div>
      <div style={{ fontSize: 36, fontWeight: 800, color: TEXT, lineHeight: 1.2, textAlign: 'center', display: 'flex', marginBottom: 8 }}>
        From Portal to TMS—Automatically.
      </div>
      <div style={{ fontSize: 18, color: MUTED, textAlign: 'center', display: 'flex', maxWidth: 760, marginBottom: 32, lineHeight: 1.45 }}>
        Three steps. Zero human intervention. Live in under 48 hours.
      </div>

      {/* Flow chart — compact */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: 860 }}>
        {steps.map((s, i) => (
          <div key={s.num} style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 16,
              padding: '18px 22px',
              borderRadius: 12,
              border: `1px solid ${BORDER}`,
              backgroundColor: BG_ALT,
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: ACCENT,
                  color: '#ffffff',
                  fontSize: 16,
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {s.num}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: TEXT, display: 'flex' }}>{s.title}</div>
                <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.5, display: 'flex' }}>{s.desc}</div>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 4 L12 16 M6 12 L12 18 L18 12" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 48, display: 'flex' }}>
        <span style={{ fontSize: 20, fontWeight: 600, color: '#cbd5e1', letterSpacing: 1 }}>NativeBase.AI</span>
      </div>
    </div>
  );
}

/**
 * Freight Slide 5: The Comparison — "The Math is Simple."
 * 2 Junior Staff vs NativeBase AI Agent. Win/Loss comparison table.
 *
 * Alt-text keywords: freight forwarding cost savings, AI vs junior staff comparison, track and trace ROI
 */
function IGCarouselFreightSlide5() {
  const rows: { label: string; left: string; right: string; leftWin: boolean }[] = [
    { label: 'Monthly Cost', left: '~$7,000/mo (2 staff)', right: '$2,499/mo flat', leftWin: false },
    { label: 'Data Accuracy', left: '95–98% (human error)', right: '100% — always', leftWin: false },
    { label: 'Availability', left: 'Business hours only', right: '24/7/365 uptime', leftWin: false },
    { label: 'Setup Time', left: '2–4 weeks training', right: 'Live in 48 hours', leftWin: false },
    { label: 'Scalability', left: 'Hire more to scale', right: 'Unlimited portals', leftWin: false },
  ];

  return (
    <div style={{
      width: IG_CAROUSEL_W,
      height: IG_CAROUSEL_H,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ffffff',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      position: 'relative',
      padding: '0 56px',
    }}>
      <CarouselSlideNumber n={5} total={7} />

      <div style={{ fontSize: 12, fontWeight: 700, color: MUTED, letterSpacing: 2, marginBottom: 8, display: 'flex' }}>UNIT ECONOMICS</div>
      <div style={{ fontSize: 36, fontWeight: 800, color: TEXT, lineHeight: 1.2, display: 'flex', marginBottom: 6 }}>
        The Math is Simple.
      </div>
      <div style={{ fontSize: 17, color: MUTED, display: 'flex', marginBottom: 28, textAlign: 'center' }}>
        Replace two junior staff with one AI subscription.
      </div>

      {/* Table — compact like insurance ROI */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: 880,
        borderRadius: 16,
        border: `1px solid ${BORDER}`,
        overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', backgroundColor: BG_ALT, borderBottom: `2px solid ${BORDER}` }}>
          <div style={{ width: 180, padding: '12px 16px', fontSize: 12, fontWeight: 700, color: MUTED, display: 'flex' }}> </div>
          <div style={{ flex: 1, padding: '12px 16px', fontSize: 14, fontWeight: 700, color: WARNING_RED, borderLeft: `1px solid ${BORDER}`, display: 'flex' }}>2 Junior Staff</div>
          <div style={{ flex: 1, padding: '12px 16px', fontSize: 14, fontWeight: 700, color: ACCENT, borderLeft: `1px solid ${BORDER}`, display: 'flex' }}>NativeBase AI Agent</div>
        </div>

        {rows.map((row, i) => (
          <div key={i} style={{ display: 'flex', borderBottom: i < rows.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
            <div style={{ width: 180, padding: '10px 16px', fontSize: 12, fontWeight: 600, color: MUTED, display: 'flex', backgroundColor: BG_ALT, borderRight: `1px solid ${BORDER}` }}>{row.label}</div>
            <div style={{ flex: 1, padding: '10px 16px', fontSize: 13, color: '#991b1b', display: 'flex', borderLeft: `1px solid ${BORDER}` }}>{row.left}</div>
            <div style={{ flex: 1, padding: '10px 16px', fontSize: 13, color: TEXT, fontWeight: 600, borderLeft: `1px solid ${BORDER}`, display: 'flex', backgroundColor: `${ACCENT}05` }}>{row.right}</div>
          </div>
        ))}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: `${ACCENT}12`, borderTop: `2px solid ${ACCENT}`, padding: '14px 20px' }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: ACCENT }}>Save $4,500+/mo</span>
          <span style={{ fontSize: 16, color: MUTED }}>with better accuracy and zero sick days.</span>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 48, display: 'flex' }}>
        <span style={{ fontSize: 20, fontWeight: 600, color: '#cbd5e1', letterSpacing: 1 }}>NativeBase.AI</span>
      </div>
    </div>
  );
}

/**
 * Freight Slide 6: Exception Power — "Be proactive, not reactive."
 * Slack notification popup showing Customs Hold and Vessel Omission alerts.
 *
 * Alt-text keywords: freight exception alerting, customs hold notification, proactive logistics AI
 */
function IGCarouselFreightSlide6() {
  const alerts = [
    {
      emoji: '🔴',
      title: 'Customs Hold Detected',
      detail: 'Container MRKU7042103 · Maersk · Port of LA',
      time: 'Just now',
      severity: WARNING_RED,
    },
    {
      emoji: '🟡',
      title: 'Vessel Omission',
      detail: 'MSC MAYA · Voyage 241W · ETA revised +5 days',
      time: '2 min ago',
      severity: '#f59e0b',
    },
    {
      emoji: '🟢',
      title: 'Delivery Confirmed',
      detail: 'Shipment SHP-88421 · FedEx · Cleared & delivered',
      time: '14 min ago',
      severity: SUCCESS_GREEN,
    },
  ];

  return (
    <div style={{
      width: IG_CAROUSEL_W,
      height: IG_CAROUSEL_H,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(160deg, #0f172a 0%, #0a1a2a 100%)`,
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: 200, background: ACCENT, opacity: 0.05, top: 50, right: -80, display: 'flex' }} />

      <CarouselSlideNumber n={6} total={7} light />

      <div style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: 2, marginBottom: 10, display: 'flex' }}>PROACTIVE INTELLIGENCE</div>
      <div style={{ fontSize: 38, fontWeight: 800, color: '#ffffff', lineHeight: 1.18, textAlign: 'center', display: 'flex', maxWidth: 820, marginBottom: 10 }}>
        Be proactive, not reactive.
      </div>
      <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', textAlign: 'center', display: 'flex', maxWidth: 780, marginBottom: 28, lineHeight: 1.45 }}>
        The AI monitors every shipment 24/7. The moment an exception surfaces, your team gets an instant alert—before your client even asks.
      </div>

      {/* Slack-style notification panel — compact */}
      <div style={{
        width: 780,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 16,
        border: '1px solid rgba(255,255,255,0.12)',
        backgroundColor: '#1a1f2e',
        overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 18px', borderBottom: '1px solid rgba(255,255,255,0.08)', backgroundColor: '#1c2333' }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: '#4a154b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 12, display: 'flex' }}>#</span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)', display: 'flex' }}>freight-alerts</span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginLeft: 4, display: 'flex' }}>· NativeBase AI Agent</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', padding: '12px 0' }}>
          {alerts.map((a, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              padding: '10px 18px',
              borderLeft: `3px solid ${a.severity}`,
              marginLeft: 14,
              marginRight: 14,
              marginBottom: i < alerts.length - 1 ? 8 : 0,
              backgroundColor: `${a.severity}08`,
              borderRadius: '0 8px 8px 0',
            }}>
              <span style={{ fontSize: 18, display: 'flex', flexShrink: 0 }}>{a.emoji}</span>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#ffffff', display: 'flex' }}>{a.title}</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', display: 'flex' }}>{a.time}</span>
                </div>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', display: 'flex' }}>{a.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 24, fontSize: 20, color: 'rgba(255,255,255,0.65)', textAlign: 'center', display: 'flex', maxWidth: 680, lineHeight: 1.4 }}>
        Solve problems before your client even asks.
      </div>

      <CarouselWatermark />
    </div>
  );
}

/**
 * Freight Slide 7: CTA — "Stop the manual copy-paste today."
 * Bold booking UI, "Comment AUDIT or Link in Bio."
 *
 * Alt-text keywords: freight workflow audit booking, logistics AI demo, NativeBase free audit
 */
function IGCarouselFreightSlide7() {
  const days = ['M', 'T', 'W', 'T', 'F'];
  const slots = [
    [1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0],
    [1, 1, 0, 0, 1],
    [0, 0, 1, 1, 0],
  ];

  return (
    <div style={{
      width: IG_CAROUSEL_W,
      height: IG_CAROUSEL_H,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(180deg, #ffffff 0%, ${BG_ALT} 100%)`,
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      position: 'relative',
    }}>
      <CarouselSlideNumber n={7} total={7} />

      {/* Savings pill — same as insurance CTA */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 36,
        padding: '14px 32px',
        borderRadius: 9999,
        backgroundColor: `${ACCENT}12`,
        border: `1px solid ${ACCENT}30`,
      }}>
        <span style={{ fontSize: 20, fontWeight: 800, color: ACCENT }}>Save $4,500+/mo</span>
        <span style={{ fontSize: 18, color: MUTED }}>on Track &amp; Trace labor</span>
      </div>

      {/* Calendar mockup — same proportions as insurance */}
      <div style={{
        width: 700,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 20,
        border: `1px solid ${BORDER}`,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        marginBottom: 40,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 28px',
          borderBottom: `1px solid ${BORDER}`,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: TEXT }}>Book Your Free 15-Min Workflow Audit</span>
            <span style={{ fontSize: 14, color: MUTED }}>15 minutes · Video call</span>
          </div>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: ACCENT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="3" fill="none" stroke="#fff" strokeWidth="1.5" />
              <line x1="3" y1="10" x2="21" y2="10" stroke="#fff" strokeWidth="1.5" />
              <line x1="8" y1="2" x2="8" y2="6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="16" y1="2" x2="16" y2="6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', padding: 28, gap: 12 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            {days.map((d) => (
              <div key={d} style={{ flex: 1, display: 'flex', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: MUTED }}>{d}</div>
            ))}
          </div>
          {slots.map((row, ri) => (
            <div key={ri} style={{ display: 'flex', gap: 12 }}>
              {row.map((avail, ci) => (
                <div
                  key={ci}
                  style={{
                    flex: 1,
                    height: 48,
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: avail ? `${ACCENT}12` : BG_ALT,
                    border: `1px solid ${avail ? `${ACCENT}40` : BORDER}`,
                    fontSize: 13,
                    fontWeight: avail ? 600 : 400,
                    color: avail ? ACCENT : '#cbd5e1',
                  }}
                >
                  {avail ? `${9 + ri}:00` : '—'}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 28px', borderTop: `1px solid ${BORDER}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px 40px', borderRadius: 12, backgroundColor: ACCENT }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#ffffff' }}>Confirm Booking →</span>
          </div>
        </div>
      </div>

      {/* Bottom text — aligned like insurance CTA */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 8 }}>
        <div style={{ fontSize: 32, fontWeight: 800, color: TEXT, lineHeight: 1.25, display: 'flex' }}>
          Stop the manual copy-paste today.
        </div>
        <div style={{ fontSize: 20, color: MUTED, lineHeight: 1.4, display: 'flex', maxWidth: 640 }}>
          Comment &ldquo;AUDIT&rdquo; or tap <span style={{ color: ACCENT, fontWeight: 700 }}>Link in Bio</span> to book.
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 48, display: 'flex' }}>
        <span style={{ fontSize: 20, fontWeight: 600, color: '#cbd5e1', letterSpacing: 1 }}>NativeBase.AI</span>
      </div>
    </div>
  );
}

/* ── Instagram Carousel: Fintech & Compliance (1080×1350) — 7 slides ── */
/* Content from /use-cases/fintech-compliance */

/**
 * Fintech Slide 1: The Hook — "Scale your Onboarding, not your Compliance Team."
 * Visual: User Growth bar climbing, Compliance Cost line flat.
 */
function IGCarouselFintechSlide1() {
  const bars = [28, 52, 78, 100]; // User growth %
  return (
    <div style={{
      width: IG_CAROUSEL_W,
      height: IG_CAROUSEL_H,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(180deg, ${NAVY} 0%, #0c1220 100%)`,
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: 300, background: ACCENT, opacity: 0.06, top: 100, right: -100, display: 'flex' }} />
      <CarouselSlideNumber n={1} total={7} light />

      {/* Chart visual */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, marginBottom: 48, height: 200 }}>
        {bars.map((h, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 72, height: 160 * (h / 100), borderRadius: '8px 8px 0 0', backgroundColor: ACCENT, display: 'flex' }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', display: 'flex' }}>Q{i + 1}</span>
          </div>
        ))}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 4, marginLeft: 16 }}>
          <div style={{ width: 120, height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.25)', display: 'flex' }} />
          <div style={{ width: 120, height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.25)', display: 'flex' }} />
          <div style={{ width: 120, height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.25)', display: 'flex' }} />
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', display: 'flex' }}>Compliance cost (flat)</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '0 56px' }}>
        <div style={{ fontSize: 56, fontWeight: 800, color: '#ffffff', lineHeight: 1.1, textAlign: 'center', display: 'flex' }}>
          Scale your Onboarding,
        </div>
        <div style={{ fontSize: 56, fontWeight: 800, color: ACCENT, lineHeight: 1.1, textAlign: 'center', display: 'flex' }}>
          not your Compliance Team.
        </div>
        <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.6)', lineHeight: 1.35, textAlign: 'center', display: 'flex', maxWidth: 820 }}>
          How Fintechs are clearing the manual review bottleneck and onboarding users in 60 seconds.
        </div>
      </div>

      <CarouselWatermark />
    </div>
  );
}

/**
 * Fintech Slide 2: The Problem — Manual review queue killing conversion.
 * OCR Fatigue, False Positive Flood, Wait Time. Funnel visual.
 */
function IGCarouselFintechSlide2() {
  const pains = [
    { num: '01', title: 'OCR Fatigue', sub: 'Analysts as data-entry clerks', desc: 'High-paid compliance staff typing data from passports and utility bills instead of judging risk.', color: WARNING_RED },
    { num: '02', title: 'The False Positive Flood', sub: '95% of AML alerts are noise', desc: 'Your team drowns in alerts that clear in seconds—but each one burns time and morale.', color: '#f59e0b' },
    { num: '03', title: 'The Wait Time', sub: '48-hour onboarding', desc: 'Customers abandon when onboarding takes days. Slow KYC is a conversion killer.', color: '#8b5cf6' },
  ];

  return (
    <div style={{
      width: IG_CAROUSEL_W,
      height: IG_CAROUSEL_H,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ffffff',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      position: 'relative',
      padding: '0 56px',
    }}>
      <CarouselSlideNumber n={2} total={7} />
      <div style={{ fontSize: 12, fontWeight: 700, color: WARNING_RED, letterSpacing: 2, marginBottom: 12, display: 'flex' }}>THE BOTTLENECK</div>
      <div style={{ fontSize: 36, fontWeight: 800, color: TEXT, lineHeight: 1.2, textAlign: 'center', display: 'flex', maxWidth: 860, marginBottom: 32 }}>
        Is your manual review queue killing your conversion?
      </div>

      {/* Funnel sketch */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
        <div style={{ width: 200, height: 80, borderRadius: 12, backgroundColor: `${ACCENT}15`, border: `2px solid ${ACCENT}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: ACCENT }}>Applications</span>
        </div>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M8 12 L16 12 M12 8 L12 16" stroke={MUTED} strokeWidth="2" strokeLinecap="round" />
        </svg>
        <div style={{ width: 140, height: 60, borderRadius: 10, backgroundColor: `${WARNING_RED}15`, border: `2px solid ${WARNING_RED}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: WARNING_RED }}>Manual Review</span>
        </div>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M8 12 L16 12 M12 8 L12 16" stroke={MUTED} strokeWidth="2" strokeLinecap="round" />
        </svg>
        <div style={{ width: 80, height: 40, borderRadius: 8, backgroundColor: `${SUCCESS_GREEN}15`, border: `2px solid ${SUCCESS_GREEN}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: SUCCESS_GREEN }}>Cleared</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 860 }}>
        {pains.map((p) => (
          <div key={p.num} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 16,
            padding: '16px 20px',
            borderRadius: 12,
            border: `1px solid ${p.color}30`,
            backgroundColor: `${p.color}06`,
          }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: `${p.color}40`, display: 'flex', flexShrink: 0, width: 40 }}>{p.num}</div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 17, fontWeight: 800, color: TEXT, display: 'flex' }}>{p.title}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: p.color, backgroundColor: `${p.color}15`, padding: '2px 8px', borderRadius: 9999, display: 'flex' }}>{p.sub}</span>
              </div>
              <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.5, display: 'flex' }}>{p.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 48, display: 'flex' }}>
        <span style={{ fontSize: 20, fontWeight: 600, color: '#cbd5e1', letterSpacing: 1 }}>NativeBase.AI</span>
      </div>
    </div>
  );
}

/**
 * Fintech Slide 3: The Solution — "Meet the AI Compliance Agent."
 * First Pass agent hands off "Ready-to-Review" packet to human.
 */
function IGCarouselFintechSlide3() {
  return (
    <div style={{
      width: IG_CAROUSEL_W,
      height: IG_CAROUSEL_H,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ffffff',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      position: 'relative',
    }}>
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: 250, background: ACCENT, opacity: 0.04, top: 80, left: -100, display: 'flex' }} />
      <CarouselSlideNumber n={3} total={7} />

      <div style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: 2, marginBottom: 10, display: 'flex' }}>THE SOLUTION</div>
      <div style={{ fontSize: 38, fontWeight: 800, color: TEXT, lineHeight: 1.18, textAlign: 'center', display: 'flex', maxWidth: 820, marginBottom: 12 }}>
        Meet the AI Compliance Agent.
      </div>
      <div style={{ fontSize: 18, color: MUTED, textAlign: 'center', display: 'flex', maxWidth: 800, marginBottom: 32, lineHeight: 1.45 }}>
        We don&apos;t replace your team—we remove the 90% of manual work that causes burnout. Our AI handles the &ldquo;First Pass&rdquo; so your analysts only see the cases that matter.
      </div>

      {/* Handoff visual: AI -> packet -> human */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32 }}>
        <div style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          background: `linear-gradient(135deg, ${ACCENT}, #2dd4bf)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
            <path d="M12 2 L12 8 M12 8 L8 6 M12 8 L16 6 M4 14 L8 18 L12 14 L16 18 L20 14" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '16px 24px',
          borderRadius: 14,
          border: `2px solid ${ACCENT}40`,
          backgroundColor: `${ACCENT}08`,
        }}>
          <div style={{ width: 40, height: 48, borderRadius: 6, backgroundColor: NAVY_LIGHT, display: 'flex' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: ACCENT, display: 'flex' }}>Ready-to-Review</span>
            <span style={{ fontSize: 12, color: MUTED, display: 'flex' }}>Extracted + screened + triaged</span>
          </div>
        </div>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <path d="M8 12 L14 12 M14 12 L11 9 M14 12 L11 15" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: BG_ALT,
          border: `2px solid ${BORDER}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{ fontSize: 28, display: 'flex' }}>👤</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', maxWidth: 840 }}>
        {['First-pass extraction', 'Sanctions & PEP screening', 'Risk triage', 'Analysts see only exceptions'].map((feat) => (
          <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 9999, border: `1px solid ${BORDER}`, backgroundColor: BG_ALT }}>
            <div style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: ACCENT, display: 'flex' }} />
            <span style={{ fontSize: 14, color: TEXT, display: 'flex' }}>{feat}</span>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 48, display: 'flex' }}>
        <span style={{ fontSize: 20, fontWeight: 600, color: '#cbd5e1', letterSpacing: 1 }}>NativeBase.AI</span>
      </div>
    </div>
  );
}

/**
 * Fintech Slide 4: How It Works — "From Blurry Document to Audit-Ready in 60s."
 * 3 steps: Universal Extraction, Automated Screening, Intelligent Triage.
 */
function IGCarouselFintechSlide4() {
  const steps = [
    { num: '1', title: 'Universal Extraction', desc: 'Vision-AI reads IDs, passports, and Articles of Incorporation—any layout, any language. Structured data in seconds.' },
    { num: '2', title: 'Automated Screening', desc: 'Real-time pings to Sanctions, PEP, and Adverse Media. No more copy-paste into third-party tools.' },
    { num: '3', title: 'Intelligent Triage', desc: 'Low-risk users cleared instantly. High-risk flagged with a summary so your analysts only review what matters.' },
  ];

  return (
    <div style={{
      width: IG_CAROUSEL_W,
      height: IG_CAROUSEL_H,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ffffff',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      position: 'relative',
      padding: '0 56px',
    }}>
      <CarouselSlideNumber n={4} total={7} />
      <div style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: 2, marginBottom: 10, display: 'flex' }}>HOW IT WORKS</div>
      <div style={{ fontSize: 34, fontWeight: 800, color: TEXT, lineHeight: 1.2, textAlign: 'center', display: 'flex', marginBottom: 8 }}>
        From &ldquo;Blurry Document&rdquo; to Audit-Ready in 60s.
      </div>
      <div style={{ fontSize: 17, color: MUTED, textAlign: 'center', display: 'flex', maxWidth: 720, marginBottom: 28, lineHeight: 1.45 }}>
        One flow. No manual data entry. No switching tabs.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 860 }}>
        {steps.map((s, i) => (
          <div key={s.num} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 16,
            padding: '18px 22px',
            borderRadius: 12,
            border: `1px solid ${BORDER}`,
            backgroundColor: BG_ALT,
          }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: ACCENT,
              color: '#ffffff',
              fontSize: 16,
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>{s.num}</div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: TEXT, display: 'flex' }}>{s.title}</div>
              <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.5, display: 'flex' }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 48, display: 'flex' }}>
        <span style={{ fontSize: 20, fontWeight: 600, color: '#cbd5e1', letterSpacing: 1 }}>NativeBase.AI</span>
      </div>
    </div>
  );
}

/**
 * Fintech Slide 5: The Math — 2 Compliance Juniors vs NativeBase AI Agent.
 */
function IGCarouselFintechSlide5() {
  const rows: { label: string; left: string; right: string }[] = [
    { label: 'Monthly Cost', left: '~$8,000/mo (2 staff)', right: '$2,499/mo flat' },
    { label: 'Capacity', left: 'Capped by hours', right: 'Unlimited / scalable' },
    { label: 'Accuracy', left: 'Human fatigue errors', right: '99.9% Vision-AI' },
    { label: 'Onboarding time', left: '48+ hours typical', right: '60 seconds first pass' },
  ];

  return (
    <div style={{
      width: IG_CAROUSEL_W,
      height: IG_CAROUSEL_H,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ffffff',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      position: 'relative',
      padding: '0 56px',
    }}>
      <CarouselSlideNumber n={5} total={7} />
      <div style={{ fontSize: 12, fontWeight: 700, color: MUTED, letterSpacing: 2, marginBottom: 8, display: 'flex' }}>UNIT ECONOMICS</div>
      <div style={{ fontSize: 36, fontWeight: 800, color: TEXT, display: 'flex', marginBottom: 6 }}>
        Stop hiring for data entry.
      </div>
      <div style={{ fontSize: 17, color: MUTED, marginBottom: 28, textAlign: 'center', display: 'flex' }}>
        2 Compliance Juniors vs. NativeBase AI Agent
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', width: 880, borderRadius: 16, border: `1px solid ${BORDER}`, overflow: 'hidden' }}>
        <div style={{ display: 'flex', backgroundColor: BG_ALT, borderBottom: `2px solid ${BORDER}` }}>
          <div style={{ width: 180, padding: '12px 16px', fontSize: 12, fontWeight: 700, color: MUTED, display: 'flex' }}> </div>
          <div style={{ flex: 1, padding: '12px 16px', fontSize: 14, fontWeight: 700, color: WARNING_RED, borderLeft: `1px solid ${BORDER}`, display: 'flex' }}>2 Compliance Juniors</div>
          <div style={{ flex: 1, padding: '12px 16px', fontSize: 14, fontWeight: 700, color: ACCENT, borderLeft: `1px solid ${BORDER}`, display: 'flex' }}>NativeBase AI Agent</div>
        </div>
        {rows.map((row, i) => (
          <div key={i} style={{ display: 'flex', borderBottom: i < rows.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
            <div style={{ width: 180, padding: '10px 16px', fontSize: 12, fontWeight: 600, color: MUTED, display: 'flex', backgroundColor: BG_ALT, borderRight: `1px solid ${BORDER}` }}>{row.label}</div>
            <div style={{ flex: 1, padding: '10px 16px', fontSize: 13, color: '#991b1b', display: 'flex', borderLeft: `1px solid ${BORDER}` }}>{row.left}</div>
            <div style={{ flex: 1, padding: '10px 16px', fontSize: 13, color: TEXT, fontWeight: 600, borderLeft: `1px solid ${BORDER}`, display: 'flex', backgroundColor: `${ACCENT}05` }}>{row.right}</div>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: `${ACCENT}12`, borderTop: `2px solid ${ACCENT}`, padding: '14px 20px' }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: ACCENT }}>Save $5,500+/mo</span>
          <span style={{ fontSize: 16, color: MUTED }}>with unlimited capacity and 99.9% accuracy.</span>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 48, display: 'flex' }}>
        <span style={{ fontSize: 20, fontWeight: 600, color: '#cbd5e1', letterSpacing: 1 }}>NativeBase.AI</span>
      </div>
    </div>
  );
}

/**
 * Fintech Slide 6: Audit Trail — "100% Audit-Ready. 0% Extra Work."
 * Green checkmarks next to compliance log.
 */
function IGCarouselFintechSlide6() {
  const logEntries = [
    'ID extracted — Passport (GBR)',
    'Sanctions check — Clear',
    'PEP check — Clear',
    'Adverse media — No hits',
    'Risk score — Low',
    'Logged to CRM — 2025-03-03 14:32:01',
  ];

  return (
    <div style={{
      width: IG_CAROUSEL_W,
      height: IG_CAROUSEL_H,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(180deg, #ffffff 0%, ${BG_ALT} 100%)`,
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      position: 'relative',
      padding: '0 56px',
    }}>
      <CarouselSlideNumber n={6} total={7} />
      <div style={{ fontSize: 12, fontWeight: 700, color: SUCCESS_GREEN, letterSpacing: 2, marginBottom: 10, display: 'flex' }}>AUDIT & TRUST</div>
      <div style={{ fontSize: 38, fontWeight: 800, color: TEXT, lineHeight: 1.18, textAlign: 'center', display: 'flex', maxWidth: 820, marginBottom: 10 }}>
        100% Audit-Ready. 0% Extra Work.
      </div>
      <div style={{ fontSize: 18, color: MUTED, textAlign: 'center', display: 'flex', maxWidth: 760, marginBottom: 32, lineHeight: 1.45 }}>
        Every action, check, and extraction is logged directly into your CRM or database. A perfect trail for regulators—generated automatically 24/7.
      </div>

      <div style={{
        width: 820,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 16,
        border: `1px solid ${BORDER}`,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
      }}>
        <div style={{ padding: '14px 20px', borderBottom: `1px solid ${BORDER}`, backgroundColor: BG_ALT, fontSize: 13, fontWeight: 700, color: MUTED, display: 'flex' }}>
          Compliance log (auto-generated)
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '16px 0' }}>
          {logEntries.map((entry, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 20px', borderBottom: i < logEntries.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
              <div style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: SUCCESS_GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <path d="M2 6 L5 9 L10 3" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span style={{ fontSize: 14, color: TEXT, fontFamily: 'monospace', display: 'flex' }}>{entry}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 48, display: 'flex' }}>
        <span style={{ fontSize: 20, fontWeight: 600, color: '#cbd5e1', letterSpacing: 1 }}>NativeBase.AI</span>
      </div>
    </div>
  );
}

/**
 * Fintech Slide 7: CTA — "Is your manual review queue slowing your growth?"
 * Comment SCALE, Unblock My Onboarding button.
 */
function IGCarouselFintechSlide7() {
  return (
    <div style={{
      width: IG_CAROUSEL_W,
      height: IG_CAROUSEL_H,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(180deg, #ffffff 0%, ${BG_ALT} 100%)`,
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      position: 'relative',
    }}>
      <CarouselSlideNumber n={7} total={7} />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 36,
        padding: '14px 32px',
        borderRadius: 9999,
        backgroundColor: `${ACCENT}12`,
        border: `1px solid ${ACCENT}30`,
      }}>
        <span style={{ fontSize: 20, fontWeight: 800, color: ACCENT }}>Save $5,500+/mo</span>
        <span style={{ fontSize: 18, color: MUTED }}>on compliance labor</span>
      </div>

      <div style={{ fontSize: 38, fontWeight: 800, color: TEXT, lineHeight: 1.18, textAlign: 'center', display: 'flex', maxWidth: 820, marginBottom: 12 }}>
        Is your manual review queue slowing your growth?
      </div>
      <div style={{ fontSize: 19, color: MUTED, textAlign: 'center', display: 'flex', maxWidth: 700, marginBottom: 40, lineHeight: 1.45 }}>
        Tell us which document or check is causing your biggest backlog. We&apos;ll show you how an AI agent handles it—live.
      </div>

      {/* CTA button */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '18px 48px',
        borderRadius: 14,
        backgroundColor: ACCENT,
        marginBottom: 32,
      }}>
        <span style={{ fontSize: 20, fontWeight: 700, color: '#ffffff', display: 'flex' }}>Unblock My Onboarding</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ padding: '10px 24px', borderRadius: 10, backgroundColor: TEXT, display: 'flex' }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#ffffff', letterSpacing: 1 }}>Comment &ldquo;SCALE&rdquo;</span>
          </div>
          <span style={{ fontSize: 16, color: MUTED, display: 'flex' }}>or</span>
          <span style={{ fontSize: 18, color: ACCENT, fontWeight: 700, display: 'flex' }}>Link in Bio</span>
        </div>
        <div style={{ fontSize: 16, color: MUTED, display: 'flex' }}>to book your 15-Min Workflow Audit</div>
      </div>

      <div style={{ position: 'absolute', bottom: 48, display: 'flex' }}>
        <span style={{ fontSize: 20, fontWeight: 600, color: '#cbd5e1', letterSpacing: 1 }}>NativeBase.AI</span>
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

  /* ── Instagram Carousel: Insurance Agency Campaign ── */
  console.log('\n  Instagram carousel (insurance agency):');
  const carouselDir = join(OUT_DIR, 'ig-carousel-insurance');
  if (!existsSync(carouselDir)) mkdirSync(carouselDir, { recursive: true });

  const carouselSlides = [
    { name: 'slide-1-hook', component: <IGCarouselSlide1 /> },
    { name: 'slide-2-agitation', component: <IGCarouselSlide2 /> },
    { name: 'slide-3-solution', component: <IGCarouselSlide3 /> },
    { name: 'slide-4-roi', component: <IGCarouselSlide4 /> },
    { name: 'slide-5-cta', component: <IGCarouselSlide5 /> },
  ];

  const carouselBufs: Buffer[] = [];
  for (const slide of carouselSlides) {
    const res = new ImageResponse(slide.component, { width: IG_CAROUSEL_W, height: IG_CAROUSEL_H });
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(join(carouselDir, `${slide.name}.png`), buf);
    carouselBufs.push(buf);
    console.log(`    wrote ${slide.name}.png`);
  }

  const carouselPreview = await sharp({
    create: { width: IG_CAROUSEL_W * 5, height: IG_CAROUSEL_H, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } },
  })
    .composite(carouselBufs.map((buf, i) => ({ input: buf, left: i * IG_CAROUSEL_W, top: 0 })))
    .png()
    .toBuffer();
  writeFileSync(join(carouselDir, 'carousel-preview.png'), carouselPreview);
  console.log('    wrote carousel-preview.png');

  /* ── Instagram Carousel: Freight & Logistics ── */
  console.log('\n  Instagram carousel (freight & logistics):');
  const freightCarouselDir = join(OUT_DIR, 'ig-carousel-freight');
  if (!existsSync(freightCarouselDir)) mkdirSync(freightCarouselDir, { recursive: true });

  const freightCarouselSlides = [
    { name: 'slide-1-hook', component: <IGCarouselFreightSlide1 /> },
    { name: 'slide-2-agitation', component: <IGCarouselFreightSlide2 /> },
    { name: 'slide-3-pivot', component: <IGCarouselFreightSlide3 /> },
    { name: 'slide-4-how-it-works', component: <IGCarouselFreightSlide4 /> },
    { name: 'slide-5-comparison', component: <IGCarouselFreightSlide5 /> },
    { name: 'slide-6-exceptions', component: <IGCarouselFreightSlide6 /> },
    { name: 'slide-7-cta', component: <IGCarouselFreightSlide7 /> },
  ];

  const freightCarouselBufs: Buffer[] = [];
  for (const slide of freightCarouselSlides) {
    const res = new ImageResponse(slide.component, { width: IG_CAROUSEL_W, height: IG_CAROUSEL_H });
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(join(freightCarouselDir, `${slide.name}.png`), buf);
    freightCarouselBufs.push(buf);
    console.log(`    wrote ${slide.name}.png`);
  }

  const freightCarouselPreview = await sharp({
    create: { width: IG_CAROUSEL_W * 7, height: IG_CAROUSEL_H, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } },
  })
    .composite(freightCarouselBufs.map((buf, i) => ({ input: buf, left: i * IG_CAROUSEL_W, top: 0 })))
    .png()
    .toBuffer();
  writeFileSync(join(freightCarouselDir, 'carousel-preview.png'), freightCarouselPreview);
  console.log('    wrote carousel-preview.png');

  /* ── Instagram Carousel: Fintech & Compliance ── */
  console.log('\n  Instagram carousel (fintech & compliance):');
  const fintechCarouselDir = join(OUT_DIR, 'ig-carousel-fintech');
  if (!existsSync(fintechCarouselDir)) mkdirSync(fintechCarouselDir, { recursive: true });

  const fintechCarouselSlides = [
    { name: 'slide-1-hook', component: <IGCarouselFintechSlide1 /> },
    { name: 'slide-2-problem', component: <IGCarouselFintechSlide2 /> },
    { name: 'slide-3-solution', component: <IGCarouselFintechSlide3 /> },
    { name: 'slide-4-how-it-works', component: <IGCarouselFintechSlide4 /> },
    { name: 'slide-5-math', component: <IGCarouselFintechSlide5 /> },
    { name: 'slide-6-audit-trail', component: <IGCarouselFintechSlide6 /> },
    { name: 'slide-7-cta', component: <IGCarouselFintechSlide7 /> },
  ];

  const fintechCarouselBufs: Buffer[] = [];
  for (const slide of fintechCarouselSlides) {
    const res = new ImageResponse(slide.component, { width: IG_CAROUSEL_W, height: IG_CAROUSEL_H });
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(join(fintechCarouselDir, `${slide.name}.png`), buf);
    fintechCarouselBufs.push(buf);
    console.log(`    wrote ${slide.name}.png`);
  }

  const fintechCarouselPreview = await sharp({
    create: { width: IG_CAROUSEL_W * 7, height: IG_CAROUSEL_H, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } },
  })
    .composite(fintechCarouselBufs.map((buf, i) => ({ input: buf, left: i * IG_CAROUSEL_W, top: 0 })))
    .png()
    .toBuffer();
  writeFileSync(join(fintechCarouselDir, 'carousel-preview.png'), fintechCarouselPreview);
  console.log('    wrote carousel-preview.png');

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

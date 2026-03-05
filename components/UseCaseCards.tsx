'use client';

import Link from 'next/link';
import Image from 'next/image';
import { USE_CASES } from '@/constants/useCases';

export function UseCaseCards() {
  return (
    <div
      className="use-case-cards-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
      }}
    >
      {USE_CASES.map((uc) => (
        <Link
          key={uc.href}
          href={uc.href}
          className="use-case-card"
          style={{
            display: 'block',
            position: 'relative',
            borderRadius: 12,
            overflow: 'hidden',
            textDecoration: 'none',
            color: 'inherit',
            aspectRatio: '4 / 3',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            transition: 'box-shadow 0.3s ease, transform 0.3s ease',
            cursor: 'pointer',
          }}
        >
          <span className="use-case-card__img-wrap" style={{ display: 'block', position: 'absolute', inset: 0 }}>
            <Image
              src={uc.image}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 320px"
              style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
            />
          </span>
          <span
            className="use-case-card__overlay"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 45%, transparent 100%)',
              transition: 'background 0.3s ease',
            }}
          />
          <span
            className="use-case-card__content"
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              padding: '1.5rem 1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
            }}
          >
            <span style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', lineHeight: 1.25, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
              {uc.title}
            </span>
            <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.35, textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>
              {uc.hook}
            </span>
            <span
              className="use-case-card__learn-more"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                marginTop: '0.5rem',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.95)',
                transition: 'opacity 0.2s ease, gap 0.2s ease',
              }}
            >
              Learn more
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </span>
          <span
            className="use-case-card__arrow"
            style={{
              position: 'absolute',
              right: '1.25rem',
              bottom: '1.5rem',
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.25)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.25s ease, transform 0.25s ease, background-color 0.2s ease',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      ))}
      <style jsx global>{`
        .use-case-cards-grid .use-case-card {
          cursor: pointer;
        }
        .use-case-cards-grid .use-case-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.2);
        }
        .use-case-cards-grid .use-case-card:hover .use-case-card__img-wrap img {
          transform: scale(1.08);
        }
        .use-case-cards-grid .use-case-card:hover .use-case-card__overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.2) 100%);
        }
        .use-case-cards-grid .use-case-card:hover .use-case-card__learn-more {
          gap: 0.5rem;
          color: var(--accent);
        }
        .use-case-cards-grid .use-case-card:hover .use-case-card__arrow {
          background-color: var(--accent);
          transform: scale(1.1);
          color: #fff;
        }
      `}</style>
    </div>
  );
}

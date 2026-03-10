import type { Metadata } from 'next';
import Link from 'next/link';
import { InsuranceResourcePage } from '@/components/InsuranceResourcePage';

export const metadata: Metadata = {
  title: 'Bridge ACORD Data to Chubb Portal | NativeBase',
  description:
    'Eliminate manual data entry into the Chubb portal. NativeBase reads your ACORD form data and fills high-net-worth personal lines and specialty commercial forms automatically. Zero rekeying.',
};

const linkStyle = { color: 'var(--accent)', textDecoration: 'underline' as const, fontWeight: 500 };

export default function AcordToChubbPage() {
  return (
    <InsuranceResourcePage
      badge="ACORD → Chubb"
      headline={
        <>
          Bridge Your ACORD Data Directly Into the{' '}
          <span style={{ color: '#5eead4' }}>Chubb Portal</span>
        </>
      }
      subheadline="High-net-worth personal lines, specialty commercial, complex supplemental forms—all automated from the ACORD data already in your system. Your agents never rekey into Chubb again."
      subheadline2="NativeBase navigates Chubb's portal with AI, handling even the most complex forms without a single manual keystroke."
      ctaLabel="See the ACORD → Chubb Bridge Live"
      ctaSource="acord-to-chubb"
      calculator={{
        inputLabel: 'Chubb submissions per week',
        minuteLabel: 'Minutes saved per submission',
        resultNote: 'Based on eliminating manual rekeying from ACORD forms into the Chubb portal.',
        defaultWorkflows: 15,
        defaultMinutes: 25,
      }}
      workflow={{
        sectionLabel: 'How It Works',
        heading: (
          <>
            ACORD data to Chubb submission—
            <span style={{ color: 'var(--accent)' }}>fully automated</span>
          </>
        ),
        subtitle: 'High-value homes, fine art schedules, specialty commercial—all bridged from your ACORD data. No rekeying, no errors.',
        steps: [
          {
            title: 'ACORD Data In Your System',
            duration: '0 Sec',
            description:
              'Property schedules, valuable articles, coverage details, and named insureds already exist in your agency management system. NativeBase reads it all.',
          },
          {
            title: 'AI Maps Complex Fields',
            duration: '45 Sec',
            description:
              'NativeBase maps high-net-worth home details, valuable articles schedules, umbrella limits, and specialty commercial data to Chubb\'s unique portal schema.',
          },
          {
            title: 'Chubb Portal Auto-Fill',
            duration: '3–5 Min',
            description:
              'AI navigates Chubb\'s portal the same way a human would—handling multi-page supplemental forms, scheduled items, and coverage selections automatically.',
          },
          {
            title: 'Submission Complete',
            duration: 'Done',
            description:
              'Chubb receives a complete, accurate submission. Your agent reviews the details and submits—without having manually entered a single field.',
          },
        ],
        totalLine: (
          <>
            Total time: <strong style={{ color: 'var(--accent)' }}>Under 6 minutes</strong> vs. 30+ minutes of manual rekeying for complex Chubb submissions
          </>
        ),
      }}
      split={{
        sectionLabel: 'The Difference',
        heading: 'Manual rekeying vs. automated ACORD bridge',
        subtitle:
          'Chubb submissions are among the most complex in insurance. Your ACORD data has the details—NativeBase bridges them directly.',
        left: {
          label: 'Manual Process',
          heading: 'Rekeying Complex High-Net-Worth Data',
          bullets: [
            'Manually entering property schedules, fine art, and jewelry valuations',
            'Typing high-value home construction details across supplemental forms',
            'Copying umbrella and excess limits from ACORD forms field by field',
            '30–45 minutes per Chubb submission for complex accounts',
            'One missed scheduled item means resubmission',
          ],
        },
        right: {
          label: 'Automated with NativeBase',
          heading: 'ACORD Data Flows Directly Into Chubb',
          bullets: [
            'Property schedules, valuable articles, and construction details read automatically',
            'Multi-page supplemental forms filled seamlessly from ACORD data',
            'AI handles Chubb\'s complex portal navigation like a human—without errors',
            'Under 6 minutes even for the most complex Chubb submissions',
            'Your agents focus on high-net-worth client relationships, not portal forms',
          ],
          codeBlock: (
            <div
              style={{
                background: '#0F172A',
                borderRadius: 10,
                padding: '1rem 1.125rem',
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                lineHeight: 1.8,
                color: '#94a3b8',
                overflow: 'hidden',
              }}
            >
              <span style={{ color: '#475569' }}>{'{'}</span><br />
              <span>&nbsp;&nbsp;</span><span style={{ color: '#5eead4' }}>&quot;NamedInsured&quot;</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#fbbf24' }}>&quot;The Hartwell Family&quot;</span><span style={{ color: '#64748b' }}>,</span><br />
              <span>&nbsp;&nbsp;</span><span style={{ color: '#5eead4' }}>&quot;DwellingValue&quot;</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#fbbf24' }}>&quot;$2,800,000&quot;</span><span style={{ color: '#64748b' }}>,</span><br />
              <span>&nbsp;&nbsp;</span><span style={{ color: '#5eead4' }}>&quot;ValuableArticles&quot;</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#fbbf24' }}>&quot;12 items&quot;</span><span style={{ color: '#64748b' }}>,</span><br />
              <span>&nbsp;&nbsp;</span><span style={{ color: '#5eead4' }}>&quot;UmbrellaLimit&quot;</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#fbbf24' }}>&quot;$5M&quot;</span><br />
              <span style={{ color: '#475569' }}>{'}'}</span>
            </div>
          ),
        },
      }}
      comparison={{
        heading: 'Manual rekeying vs. ACORD → Chubb bridge',
        manualLabel: 'Manual Rekeying',
        autoLabel: 'NativeBase Bridge',
        rows: [
          ['Time per Submission', '30–45 min for complex accounts', 'Under 6 minutes, automated'],
          ['Data Accuracy', 'Missed schedule items, typos', '100% accurate from ACORD source'],
          ['Supplemental Forms', 'Filled page by page by hand', 'Auto-completed from ACORD data'],
          ['Valuable Articles', 'Each item typed individually', 'Full schedule mapped automatically'],
          ['Agent Workflow', 'Hours in the Chubb portal', 'Stays in existing system'],
          ['Client Experience', 'Slow turnaround on HNW quotes', 'Same-day quotes, every time'],
        ],
        callout: 'Bridge your ACORD data to Chubb automatically—even complex high-net-worth submissions, zero rekeying.',
      }}
      faq={{
        heading: 'ACORD → Chubb: Common Questions',
        items: [
          {
            q: 'Does NativeBase require an API or approval from Chubb?',
            a: (
              <>
                No. NativeBase uses AI-driven browser automation—it navigates the Chubb portal the same way a human agent would. No API, no integration request, no carrier approval needed. See our{' '}
                <Link href="/resources/insurance/acord-to-portal" style={linkStyle}>ACORD-to-portal overview</Link> for how this works.
              </>
            ),
          },
          {
            q: 'Can NativeBase handle Chubb\'s complex supplemental forms?',
            a: 'Yes. NativeBase handles multi-page supplemental forms, valuable articles schedules, high-value home construction questionnaires, and specialty commercial forms. The AI navigates every form page and fills every field from your ACORD data automatically.',
          },
          {
            q: 'Does this work for both personal and commercial Chubb submissions?',
            a: 'Absolutely. NativeBase bridges ACORD data for Chubb\'s high-net-worth personal lines (Masterpiece), specialty commercial, professional liability, and umbrella/excess. Every line of business is supported.',
          },
          {
            q: 'Will my agents need to change their workflow?',
            a: 'Not at all. NativeBase integrates within your existing agency management system. Your agents keep their current workflow—the only change is that ACORD data fills the Chubb portal automatically instead of being rekeyed by hand.',
          },
          {
            q: 'Can I bridge ACORD data to Liberty Mutual and other carriers too?',
            a: (
              <>
                Yes. The same automation works across carrier portals. See our guides for{' '}
                <Link href="/resources/insurance/acord-to-liberty-mutual" style={linkStyle}>Liberty Mutual</Link>,{' '}
                <Link href="/resources/insurance/acord-to-berkshire-hathaway" style={linkStyle}>Berkshire Hathaway</Link>, and our{' '}
                <Link href="/resources/insurance/acord-to-portal" style={linkStyle}>ACORD-to-portal overview</Link>.
              </>
            ),
          },
          {
            q: 'Is my high-net-worth client data secure?',
            a: 'All data at rest is AES-256 encrypted, and all data in transit is TLS-secured. We never store carrier credentials on our servers. Your ACORD data is read from your system and bridged to Chubb in real time—nothing is retained after the workflow completes.',
          },
        ],
        structuredData: [
          {
            question: 'Does NativeBase require an API or approval from Chubb?',
            answer:
              'No. NativeBase uses AI-driven browser automation that navigates the Chubb portal the same way a human would. No API dependency or carrier approval is required.',
          },
          {
            question: 'Can NativeBase handle Chubb\'s complex supplemental forms?',
            answer:
              'Yes. NativeBase handles multi-page supplemental forms, valuable articles schedules, construction questionnaires, and specialty commercial forms automatically.',
          },
          {
            question: 'Does this work for both personal and commercial Chubb submissions?',
            answer:
              'Yes. NativeBase bridges ACORD data for Chubb Masterpiece personal lines, specialty commercial, professional liability, and umbrella/excess.',
          },
          {
            question: 'Will my agents need to change their workflow?',
            answer:
              'Not at all. NativeBase integrates within your existing agency management system. ACORD data fills the Chubb portal automatically instead of being rekeyed.',
          },
          {
            question: 'Can I bridge ACORD data to Liberty Mutual and other carriers too?',
            answer:
              'Yes. The same automation works across carrier portals including Liberty Mutual, Berkshire Hathaway, Progressive, Travelers, and more.',
          },
          {
            question: 'Is my high-net-worth client data secure?',
            answer:
              'All data at rest is AES-256 encrypted and all data in transit is TLS-secured. Carrier credentials are never stored on NativeBase servers and no data is retained after workflows complete.',
          },
        ],
      }}
      cta={{
        badge: 'Zero Rekeying',
        heading: 'Ready to stop rekeying ACORD data into Chubb?',
        subtitle:
          'See a live demo: your ACORD data flowing directly into the Chubb portal—high-net-worth homes, valuable articles, and every complex field filled automatically.',
        primaryLabel: 'See the ACORD → Chubb Bridge',
        primarySource: 'acord-to-chubb-cta',
      }}
    />
  );
}

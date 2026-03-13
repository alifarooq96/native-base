import Link from 'next/link';
import { InsuranceResourcePage } from '@/components/InsuranceResourcePage';
import { buildSeoMetadata } from '@/lib/page-metadata';

export const metadata = buildSeoMetadata({
  title: 'Bridge ACORD Data to Liberty Mutual Portal | NativeBase',
  description:
    'Eliminate manual data entry into the Liberty Mutual portal. NativeBase reads your ACORD form data and fills personal and commercial lines automatically—every field mapped, no manual entry required.',
  path: '/resources/insurance/acord-to-liberty-mutual/',
});

const linkStyle = { color: 'var(--accent)', textDecoration: 'underline' as const, fontWeight: 500 };

export default function AcordToLibertyMutualPage() {
  return (
    <InsuranceResourcePage
      badge="ACORD → Liberty Mutual"
      headline={
        <>
          Bridge Your ACORD Data Directly Into the{' '}
          <span style={{ color: '#5eead4' }}>Liberty Mutual Portal</span>
        </>
      }
      subheadline="Personal and commercial lines—every field mapped from the ACORD data already in your system. Your agents never manually enter data into Liberty Mutual's portal again."
      subheadline2="NativeBase navigates Liberty Mutual's portal with AI, filling every field automatically while your agents keep their existing workflow."
      ctaLabel="See the ACORD → Liberty Mutual Bridge Live"
      ctaSource="acord-to-liberty-mutual"
      calculator={{
        inputLabel: 'Liberty Mutual quotes per week',
        minuteLabel: 'Minutes saved per quote',
        resultNote: 'Based on eliminating manual rekeying from ACORD forms into the Liberty Mutual portal.',
        defaultWorkflows: 25,
        defaultMinutes: 17,
      }}
      workflow={{
        sectionLabel: 'How It Works',
        heading: (
          <>
            ACORD data to Liberty Mutual quote—
            <span style={{ color: 'var(--accent)' }}>fully automated</span>
          </>
        ),
        subtitle: 'Personal auto, homeowners, commercial lines—all bridged from your ACORD data without a single keystroke in the portal.',
        steps: [
          {
            title: 'ACORD Data In Your System',
            duration: '0 Sec',
            description:
              'Driver info, property details, coverage limits, and prior carrier data already exist in your agency management system. NativeBase reads it all.',
          },
          {
            title: 'AI Maps Every Field',
            duration: '30 Sec',
            description:
              'NativeBase maps personal lines (vehicles, drivers, properties) and commercial lines (class codes, payroll, locations) to Liberty Mutual\'s form schema.',
          },
          {
            title: 'Liberty Mutual Portal Fill',
            duration: '2–4 Min',
            description:
              'AI navigates the Liberty Mutual portal the same way a human would—logging in, selecting products, and filling every field from your ACORD data.',
          },
          {
            title: 'Quote Ready',
            duration: 'Done',
            description:
              'Liberty Mutual returns a quote. Your agent reviews, adjusts coverages if needed, and proceeds—without having rekeyed a single data point.',
          },
        ],
        totalLine: (
          <>
            Total time: <strong style={{ color: 'var(--accent)' }}>Under 5 minutes</strong> vs. 20+ minutes of manual rekeying
          </>
        ),
      }}
      split={{
        sectionLabel: 'The Difference',
        heading: 'Manual rekeying vs. automated ACORD bridge',
        subtitle:
          'Your ACORD data already contains everything Liberty Mutual needs. Why retype it when NativeBase bridges it directly?',
        left: {
          label: 'Manual Process',
          heading: 'Rekeying Personal & Commercial Data by Hand',
          bullets: [
            'Manually typing driver names, VINs, and property addresses',
            'Copying coverage limits and deductibles field by field',
            'Entering commercial class codes and payroll from ACORD forms',
            '15–25 minutes per quote just on data entry',
            'Errors mean requotes and frustrated clients',
          ],
        },
        right: {
          label: 'Automated with NativeBase',
          heading: 'ACORD Data Flows Directly Into Liberty Mutual',
          bullets: [
            'Personal and commercial ACORD data read from your system automatically',
            'Drivers, vehicles, properties, class codes—all mapped and filled',
            'AI navigates Liberty Mutual\'s portal like a human, without errors',
            'Under 5 minutes from ACORD data to Liberty Mutual quote',
            'Your agents focus on advising and selling, not typing into portals',
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
              <span>&nbsp;&nbsp;</span><span style={{ color: '#5eead4' }}>&quot;NamedInsured&quot;</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#fbbf24' }}>&quot;John Smith&quot;</span><span style={{ color: '#64748b' }}>,</span><br />
              <span>&nbsp;&nbsp;</span><span style={{ color: '#5eead4' }}>&quot;Property&quot;</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#fbbf24' }}>&quot;456 Oak Ave&quot;</span><span style={{ color: '#64748b' }}>,</span><br />
              <span>&nbsp;&nbsp;</span><span style={{ color: '#5eead4' }}>&quot;DwellingValue&quot;</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#fbbf24' }}>&quot;$425,000&quot;</span><span style={{ color: '#64748b' }}>,</span><br />
              <span>&nbsp;&nbsp;</span><span style={{ color: '#5eead4' }}>&quot;Deductible&quot;</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#fbbf24' }}>&quot;$1,000&quot;</span><br />
              <span style={{ color: '#475569' }}>{'}'}</span>
            </div>
          ),
        },
      }}
      comparison={{
        heading: 'Manual rekeying vs. ACORD → Liberty Mutual bridge',
        manualLabel: 'Manual Rekeying',
        autoLabel: 'NativeBase Bridge',
        rows: [
          ['Time per Quote', '20+ minutes of rekeying', 'Under 5 minutes, automated'],
          ['Data Accuracy', 'Typos and transpositions', '100% accurate from ACORD source'],
          ['Personal Lines', 'VINs and addresses typed by hand', 'Auto-filled from ACORD data'],
          ['Commercial Lines', 'Class codes entered manually', 'Mapped automatically'],
          ['Agent Workflow', 'Toggle between systems', 'Stays in existing system'],
          ['Scalability', 'Bottlenecked by typing', 'Unlimited quotes, same speed'],
        ],
        callout: 'Bridge your ACORD data to Liberty Mutual automatically—your agents never rekey a field again.',
      }}
      faq={{
        heading: 'ACORD → Liberty Mutual: Common Questions',
        items: [
          {
            q: 'Does NativeBase require an API from Liberty Mutual?',
            a: (
              <>
                No. NativeBase uses AI-driven browser automation—it navigates the Liberty Mutual portal the same way a human agent would. No API, no integration request, no carrier approval. See our{' '}
                <Link href="/resources/insurance/acord-to-portal" style={linkStyle}>ACORD-to-portal overview</Link> for how this works across all carriers.
              </>
            ),
          },
          {
            q: 'Does NativeBase handle both personal and commercial lines for Liberty Mutual?',
            a: 'Yes. NativeBase bridges ACORD data for personal auto, homeowners, and commercial lines including BOP, GL, and commercial auto. Every field is mapped from your existing data—no manual entry for any line of business.',
          },
          {
            q: 'Which ACORD forms are supported?',
            a: (
              <>
                NativeBase supports ACORD 125, 126, 130, 140, personal auto applications, and homeowner supplements. Any structured data in your agency management system can be bridged into Liberty Mutual. See our{' '}
                <Link href="/resources/insurance/acord-to-portal" style={linkStyle}>ACORD-to-portal guide</Link> for full details.
              </>
            ),
          },
          {
            q: 'Will my agents need training on a new system?',
            a: 'No training needed. NativeBase integrates within your existing agency management system. Your agents continue their normal workflow—the only difference is ACORD data fills Liberty Mutual\'s portal automatically instead of being rekeyed.',
          },
          {
            q: 'Can I bridge ACORD data to Hartford, Chubb, and other carriers too?',
            a: (
              <>
                Absolutely. The same automation works across carrier portals. See our guides for{' '}
                <Link href="/resources/insurance/acord-to-hartford" style={linkStyle}>The Hartford</Link>,{' '}
                <Link href="/resources/insurance/acord-to-chubb" style={linkStyle}>Chubb</Link>, and our{' '}
                <Link href="/resources/insurance/acord-to-portal" style={linkStyle}>ACORD-to-portal overview</Link>.
              </>
            ),
          },
          {
            q: 'Is my agency\'s data secure during the bridging process?',
            a: 'All data at rest is AES-256 encrypted, and all data in transit is TLS-secured. We never store carrier credentials on our servers. Your ACORD data is read from your system and bridged to Liberty Mutual in real time—nothing is stored after the workflow completes.',
          },
        ],
        structuredData: [
          {
            question: 'Does NativeBase require an API from Liberty Mutual?',
            answer:
              'No. NativeBase uses AI-driven browser automation that navigates the Liberty Mutual portal the same way a human would. No API dependency or carrier approval is required.',
          },
          {
            question: 'Does NativeBase handle both personal and commercial lines for Liberty Mutual?',
            answer:
              'Yes. NativeBase bridges ACORD data for personal auto, homeowners, and commercial lines including BOP, GL, and commercial auto.',
          },
          {
            question: 'Which ACORD forms are supported?',
            answer:
              'NativeBase supports ACORD 125, 126, 130, 140, personal auto applications, and homeowner supplements for Liberty Mutual.',
          },
          {
            question: 'Will my agents need training on a new system?',
            answer:
              'No training needed. NativeBase integrates within your existing agency management system. Agents continue their normal workflow while ACORD data fills Liberty Mutual automatically.',
          },
          {
            question: 'Can I bridge ACORD data to Hartford, Chubb, and other carriers too?',
            answer:
              'Yes. The same automation works across carrier portals including The Hartford, Chubb, Progressive, Travelers, and more.',
          },
          {
            question: 'Is my agency\'s data secure during the bridging process?',
            answer:
              'All data at rest is AES-256 encrypted and all data in transit is TLS-secured. Carrier credentials are never stored on NativeBase servers.',
          },
        ],
      }}
      cta={{
        badge: 'Zero Rekeying',
        heading: 'Ready to stop rekeying ACORD data into Liberty Mutual?',
        subtitle:
          'See a live demo: your ACORD data flowing directly into the Liberty Mutual portal—personal and commercial lines, every field filled automatically.',
        primaryLabel: 'See the ACORD → Liberty Mutual Bridge',
        primarySource: 'acord-to-liberty-mutual-cta',
      }}
    />
  );
}

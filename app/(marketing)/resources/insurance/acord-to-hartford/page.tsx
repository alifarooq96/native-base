import Link from 'next/link';
import { InsuranceResourcePage } from '@/components/InsuranceResourcePage';
import { buildSeoMetadata } from '@/lib/page-metadata';

export const metadata = buildSeoMetadata({
  title: 'Bridge ACORD Data to The Hartford Portal | NativeBase',
  description:
    'Eliminate manual data entry into The Hartford portal. NativeBase reads your ACORD form data and fills small commercial, workers\' comp, and BOP submissions automatically. Zero rekeying.',
  path: '/resources/insurance/acord-to-hartford/',
});

const linkStyle = { color: 'var(--accent)', textDecoration: 'underline' as const, fontWeight: 500 };

export default function AcordToHartfordPage() {
  return (
    <InsuranceResourcePage
      badge="ACORD → Hartford"
      headline={
        <>
          Bridge Your ACORD Data Directly Into{' '}
          <span style={{ color: '#5eead4' }}>The Hartford Portal</span>
        </>
      }
      subheadline="Small commercial, workers' comp, BOP—all automated from the ACORD data already in your system. Your agents never manually enter a single field into The Hartford's portal again."
      subheadline2="NativeBase navigates The Hartford's portal with AI—the same way a human would, but faster and without errors."
      ctaLabel="See the ACORD → Hartford Bridge Live"
      ctaSource="acord-to-hartford"
      calculator={{
        inputLabel: 'Hartford submissions per week',
        minuteLabel: 'Minutes saved per submission',
        resultNote: 'Based on eliminating manual rekeying from ACORD forms into The Hartford portal.',
        defaultWorkflows: 20,
        defaultMinutes: 20,
      }}
      workflow={{
        sectionLabel: 'How It Works',
        heading: (
          <>
            ACORD data to Hartford submission—
            <span style={{ color: 'var(--accent)' }}>fully automated</span>
          </>
        ),
        subtitle: 'Small commercial and workers\' comp data flows straight from your ACORD forms into The Hartford. No rekeying. No toggling.',
        steps: [
          {
            title: 'ACORD Data Ready',
            duration: '0 Sec',
            description:
              'Your ACORD 125, 126, 130, and workers\' comp supplement data already exists in your agency management system. NativeBase reads it directly.',
          },
          {
            title: 'AI Maps to Hartford Schema',
            duration: '30 Sec',
            description:
              'NativeBase intelligently maps class codes, payroll data, locations, coverage limits, and named insureds to The Hartford\'s specific form fields.',
          },
          {
            title: 'Hartford Portal Auto-Fill',
            duration: '3–4 Min',
            description:
              'AI navigates The Hartford\'s portal—selecting lines of business, entering BOP or workers\' comp details, and filling every field from your ACORD data.',
          },
          {
            title: 'Submission Ready',
            duration: 'Done',
            description:
              'The Hartford receives a complete, accurate submission. Your agent reviews, adjusts if needed, and submits—no manual data entry involved.',
          },
        ],
        totalLine: (
          <>
            Total time: <strong style={{ color: 'var(--accent)' }}>Under 5 minutes</strong> vs. 25+ minutes of manual rekeying
          </>
        ),
      }}
      split={{
        sectionLabel: 'The Difference',
        heading: 'Manual rekeying vs. automated ACORD bridge',
        subtitle:
          'Your ACORD data has every detail The Hartford needs. Why retype it when NativeBase bridges it directly?',
        left: {
          label: 'Manual Process',
          heading: 'Rekeying Small Commercial Data by Hand',
          bullets: [
            'Manually entering payroll figures, class codes, and locations',
            'Copying BOP building details field by field',
            'Re-typing workers\' comp experience mods and state info',
            '20–30 minutes per Hartford submission',
            'One wrong payroll figure means re-quoting the entire submission',
          ],
        },
        right: {
          label: 'Automated with NativeBase',
          heading: 'ACORD Data Flows Directly Into The Hartford',
          bullets: [
            'Payroll, class codes, and locations read from your system automatically',
            'BOP, workers\' comp, and GL fields filled without human intervention',
            'AI navigates The Hartford\'s portal like a human—without errors',
            'Under 5 minutes from ACORD data to complete Hartford submission',
            'Your agents advise clients instead of wrestling with portal forms',
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
              <span>&nbsp;&nbsp;</span><span style={{ color: '#5eead4' }}>&quot;NamedInsured&quot;</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#fbbf24' }}>&quot;Main St Bakery&quot;</span><span style={{ color: '#64748b' }}>,</span><br />
              <span>&nbsp;&nbsp;</span><span style={{ color: '#5eead4' }}>&quot;LineOfBusiness&quot;</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#fbbf24' }}>&quot;BOP + WC&quot;</span><span style={{ color: '#64748b' }}>,</span><br />
              <span>&nbsp;&nbsp;</span><span style={{ color: '#5eead4' }}>&quot;ClassCode&quot;</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#fbbf24' }}>&quot;09831&quot;</span><span style={{ color: '#64748b' }}>,</span><br />
              <span>&nbsp;&nbsp;</span><span style={{ color: '#5eead4' }}>&quot;AnnualPayroll&quot;</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#fbbf24' }}>&quot;$285,000&quot;</span><br />
              <span style={{ color: '#475569' }}>{'}'}</span>
            </div>
          ),
        },
      }}
      comparison={{
        heading: 'Manual rekeying vs. ACORD → Hartford bridge',
        manualLabel: 'Manual Rekeying',
        autoLabel: 'NativeBase Bridge',
        rows: [
          ['Time per Submission', '25+ minutes of rekeying', 'Under 5 minutes, automated'],
          ['Data Accuracy', 'Payroll and class code errors', '100% accurate from ACORD source'],
          ['Workers\' Comp', 'Manual exp mod & state entry', 'All WC fields auto-filled'],
          ['BOP Details', 'Building info typed by hand', 'Mapped from ACORD automatically'],
          ['Agent Workflow', 'Constant window switching', 'Stays in existing system'],
          ['Agent Productivity', 'Hours lost to portal entry', 'Focus on clients, not typing'],
        ],
        callout: 'Bridge your ACORD data to The Hartford automatically—no agent ever rekeys a field again.',
      }}
      faq={{
        heading: 'ACORD → Hartford: Common Questions',
        items: [
          {
            q: 'Does NativeBase require an API or approval from The Hartford?',
            a: (
              <>
                No. NativeBase uses AI-driven browser automation—it navigates The Hartford&apos;s portal the same way a human CSR would. No API, no IT request, no carrier approval needed. See our{' '}
                <Link href="/resources/insurance/acord-to-portal" style={linkStyle}>ACORD-to-portal overview</Link> for how this works.
              </>
            ),
          },
          {
            q: 'Does NativeBase handle both BOP and workers\' comp for Hartford?',
            a: 'Yes. NativeBase maps ACORD data to The Hartford\'s BOP, workers\' comp, and general liability forms. Payroll figures, class codes, experience mods, building details—everything flows automatically from your existing data.',
          },
          {
            q: 'Which ACORD forms are supported for The Hartford?',
            a: 'NativeBase supports ACORD 125, 126, 130, 140, and workers\' comp supplements. Any structured data in your agency management system bridges directly into The Hartford\'s portal.',
          },
          {
            q: 'Will my agents need to learn a new system?',
            a: 'No. NativeBase integrates within your existing agency management system. Your agents keep doing exactly what they do today—the only difference is the ACORD data fills The Hartford\'s portal automatically instead of being rekeyed by hand.',
          },
          {
            q: 'Can I also bridge ACORD data to Travelers and other carriers?',
            a: (
              <>
                Yes. The same automation works across carrier portals. See our guides for{' '}
                <Link href="/resources/insurance/acord-to-travelers" style={linkStyle}>Travelers</Link>,{' '}
                <Link href="/resources/insurance/acord-to-liberty-mutual" style={linkStyle}>Liberty Mutual</Link>, and our{' '}
                <Link href="/resources/insurance/acord-to-portal" style={linkStyle}>ACORD-to-portal overview</Link>.
              </>
            ),
          },
          {
            q: 'How fast can my agency go live?',
            a: 'Each workflow is automated within 48 hours. We handle setup, configuration, and testing—your team starts bridging ACORD data to The Hartford immediately with zero workflow disruption.',
          },
        ],
        structuredData: [
          {
            question: 'Does NativeBase require an API or approval from The Hartford?',
            answer:
              'No. NativeBase uses AI-driven browser automation that navigates The Hartford\'s portal the same way a human would. No API dependency or carrier approval is required.',
          },
          {
            question: 'Does NativeBase handle both BOP and workers\' comp for Hartford?',
            answer:
              'Yes. NativeBase maps ACORD data to The Hartford\'s BOP, workers comp, and general liability forms including payroll, class codes, and experience mods.',
          },
          {
            question: 'Which ACORD forms are supported for The Hartford?',
            answer:
              'NativeBase supports ACORD 125, 126, 130, 140, and workers comp supplements for bridging data into The Hartford portal.',
          },
          {
            question: 'Will my agents need to learn a new system?',
            answer:
              'No. NativeBase integrates within your existing agency management system. Agents keep their current workflow—ACORD data fills The Hartford portal automatically.',
          },
          {
            question: 'Can I also bridge ACORD data to Travelers and other carriers?',
            answer:
              'Yes. The same automation works across carrier portals including Travelers, Liberty Mutual, Progressive, Chubb, and more.',
          },
          {
            question: 'How fast can my agency go live?',
            answer:
              'Each workflow is automated within 48 hours with zero workflow disruption. Setup, configuration, and testing are handled for you.',
          },
        ],
      }}
      cta={{
        badge: 'Zero Rekeying',
        heading: 'Ready to stop rekeying ACORD data into The Hartford?',
        subtitle:
          'See a live demo: your ACORD data flowing directly into The Hartford portal—BOP, workers\' comp, and every field filled automatically.',
        primaryLabel: 'See the ACORD → Hartford Bridge',
        primarySource: 'acord-to-hartford-cta',
      }}
    />
  );
}

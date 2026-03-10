import type { Metadata } from 'next';
import Link from 'next/link';
import { InsuranceResourcePage } from '@/components/InsuranceResourcePage';

export const metadata: Metadata = {
  title: 'Bridge ACORD Data to Travelers Portal | NativeBase',
  description:
    'Eliminate manual data entry into the Travelers portal. NativeBase reads your ACORD form data and automatically fills named insureds, locations, limits, class codes—every field. Zero rekeying.',
};

const linkStyle = { color: 'var(--accent)', textDecoration: 'underline' as const, fontWeight: 500 };

export default function AcordToTravelersPage() {
  return (
    <InsuranceResourcePage
      badge="ACORD → Travelers"
      headline={
        <>
          Bridge Your ACORD Data Directly Into the{' '}
          <span style={{ color: '#5eead4' }}>Travelers Portal</span>
        </>
      }
      subheadline="Named insureds, locations, limits, class codes—all the ACORD data already in your system flows directly into Travelers. Your agents never rekey a single field."
      subheadline2="NativeBase navigates the Travelers portal the same way a human would, but with AI. Your existing workflow stays intact."
      ctaLabel="See the ACORD → Travelers Bridge Live"
      ctaSource="acord-to-travelers"
      calculator={{
        inputLabel: 'Travelers submissions per week',
        minuteLabel: 'Minutes saved per submission',
        resultNote: 'Based on eliminating manual rekeying from ACORD forms into the Travelers portal.',
        defaultWorkflows: 25,
        defaultMinutes: 18,
      }}
      workflow={{
        sectionLabel: 'How It Works',
        heading: (
          <>
            ACORD data to Travelers submission—
            <span style={{ color: 'var(--accent)' }}>fully automated</span>
          </>
        ),
        subtitle: 'Every field in your ACORD forms bridges directly into Travelers. No manual entry. No toggling between windows.',
        steps: [
          {
            title: 'ACORD Data Already Exists',
            duration: '0 Sec',
            description:
              'Named insureds, locations, class codes, and coverage limits are already in your agency management system. NativeBase reads them directly.',
          },
          {
            title: 'Intelligent Field Mapping',
            duration: '30 Sec',
            description:
              'NativeBase maps ACORD 125, 126, 130, and 140 fields to the Travelers portal schema—including multi-location and multi-line submissions.',
          },
          {
            title: 'Travelers Portal Auto-Fill',
            duration: '3–4 Min',
            description:
              'AI navigates the Travelers agent portal like a human—logging in, selecting lines of business, and filling every field from your ACORD data automatically.',
          },
          {
            title: 'Submission Complete',
            duration: 'Done',
            description:
              'Travelers receives a complete, accurate submission. Your agent reviews and submits—without having typed a single data point.',
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
          'Your ACORD data is already complete. Why retype named insureds, locations, and class codes into Travelers when NativeBase bridges it automatically?',
        left: {
          label: 'Manual Process',
          heading: 'Rekeying Complex Commercial Data by Hand',
          bullets: [
            'Manually entering named insureds, additional insureds, and locations',
            'Typing class codes, SIC codes, and NAICS from ACORD forms',
            'Copying coverage limits field by field across multiple screens',
            '20–30 minutes per submission on commercial lines',
            'One wrong class code means starting over',
          ],
        },
        right: {
          label: 'Automated with NativeBase',
          heading: 'ACORD Data Flows Directly Into Travelers',
          bullets: [
            'Named insureds, locations, and class codes read from your system automatically',
            'Multi-location and multi-line submissions handled seamlessly',
            'AI navigates Travelers\' portal forms just like a human—without errors',
            'Under 5 minutes from ACORD data to complete Travelers submission',
            'Your agents focus on client relationships, not data entry',
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
              <span>&nbsp;&nbsp;</span><span style={{ color: '#5eead4' }}>&quot;NamedInsured&quot;</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#fbbf24' }}>&quot;Acme Corp&quot;</span><span style={{ color: '#64748b' }}>,</span><br />
              <span>&nbsp;&nbsp;</span><span style={{ color: '#5eead4' }}>&quot;ClassCode&quot;</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#fbbf24' }}>&quot;41677&quot;</span><span style={{ color: '#64748b' }}>,</span><br />
              <span>&nbsp;&nbsp;</span><span style={{ color: '#5eead4' }}>&quot;Locations&quot;</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#fbbf24' }}>&quot;3 locations&quot;</span><span style={{ color: '#64748b' }}>,</span><br />
              <span>&nbsp;&nbsp;</span><span style={{ color: '#5eead4' }}>&quot;GLLimits&quot;</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#fbbf24' }}>&quot;1M/2M&quot;</span><br />
              <span style={{ color: '#475569' }}>{'}'}</span>
            </div>
          ),
        },
      }}
      comparison={{
        heading: 'Manual rekeying vs. ACORD → Travelers bridge',
        manualLabel: 'Manual Rekeying',
        autoLabel: 'NativeBase Bridge',
        rows: [
          ['Time per Submission', '25+ minutes of rekeying', 'Under 5 minutes, automated'],
          ['Data Accuracy', 'Class code errors, typos', '100% accurate from ACORD source'],
          ['Multi-Location', 'Enter each location manually', 'All locations mapped automatically'],
          ['Agent Workflow', 'Constant window toggling', 'Stays in existing system'],
          ['Error Recovery', 'Start over on wrong code', 'AI validates before filling'],
          ['Agent Productivity', 'Hours lost to data entry', 'Focus on selling & advising'],
        ],
        callout: 'Bridge your ACORD data to Travelers automatically—your agents never rekey a field again.',
      }}
      faq={{
        heading: 'ACORD → Travelers: Common Questions',
        items: [
          {
            q: 'Does NativeBase require an API or integration with Travelers?',
            a: (
              <>
                No. NativeBase uses AI-driven browser automation—it navigates the Travelers portal the same way a human would. No API dependency, no IT request, no approval from Travelers. See our{' '}
                <Link href="/resources/insurance/acord-to-portal" style={linkStyle}>ACORD-to-portal overview</Link> for how this works across carriers.
              </>
            ),
          },
          {
            q: 'Can NativeBase handle multi-location commercial submissions?',
            a: 'Absolutely. NativeBase reads all locations from your ACORD data and fills each one into the Travelers portal automatically—whether it\'s 2 locations or 20. No manual entry required for any of them.',
          },
          {
            q: 'Which ACORD forms work with the Travelers bridge?',
            a: (
              <>
                NativeBase supports ACORD 125, 126, 130, 140, and workers&apos; comp supplements. Any structured data in your agency management system can be bridged. For the full list, see our{' '}
                <Link href="/resources/insurance/acord-to-portal" style={linkStyle}>ACORD-to-portal guide</Link>.
              </>
            ),
          },
          {
            q: 'Will this change how my agents work day to day?',
            a: 'Not at all. NativeBase integrates within your existing agency management system. The only change your agents notice is that they never have to manually key data into the Travelers portal again—the data just flows automatically.',
          },
          {
            q: 'Can I bridge ACORD data to Progressive and other carriers too?',
            a: (
              <>
                Yes. The same automation works across carrier portals. See our guides for{' '}
                <Link href="/resources/insurance/acord-to-progressive" style={linkStyle}>Progressive</Link>,{' '}
                <Link href="/resources/insurance/acord-to-hartford" style={linkStyle}>The Hartford</Link>, and our{' '}
                <Link href="/resources/insurance/multi-carrier-automation" style={linkStyle}>multi-carrier automation</Link> overview.
              </>
            ),
          },
          {
            q: 'How quickly can my agency get started?',
            a: 'Each workflow is automated within 48 hours. We handle setup, configuration, and testing. Your team can start bridging ACORD data to Travelers immediately—no workflow disruption.',
          },
        ],
        structuredData: [
          {
            question: 'Does NativeBase require an API or integration with Travelers?',
            answer:
              'No. NativeBase uses AI-driven browser automation that navigates the Travelers portal the same way a human would. No API dependency or approval from Travelers is required.',
          },
          {
            question: 'Can NativeBase handle multi-location commercial submissions?',
            answer:
              'Yes. NativeBase reads all locations from your ACORD data and fills each one into the Travelers portal automatically, whether 2 locations or 20.',
          },
          {
            question: 'Which ACORD forms work with the Travelers bridge?',
            answer:
              'NativeBase supports ACORD 125, 126, 130, 140, and workers comp supplements. Any structured data in your agency management system can be bridged.',
          },
          {
            question: 'Will this change how my agents work day to day?',
            answer:
              'Not at all. NativeBase integrates within your existing agency management system. Agents never manually key data into the Travelers portal again—the data flows automatically.',
          },
          {
            question: 'Can I bridge ACORD data to Progressive and other carriers too?',
            answer:
              'Yes. The same automation works across carrier portals including Progressive, The Hartford, Liberty Mutual, Chubb, and more.',
          },
          {
            question: 'How quickly can my agency get started?',
            answer:
              'Each workflow is automated within 48 hours. Setup, configuration, and testing are handled for you with no workflow disruption.',
          },
        ],
      }}
      cta={{
        badge: 'Zero Rekeying',
        heading: 'Ready to stop rekeying ACORD data into Travelers?',
        subtitle:
          'See a live demo: your ACORD data flowing directly into the Travelers portal—named insureds, locations, class codes, and every field filled automatically.',
        primaryLabel: 'See the ACORD → Travelers Bridge',
        primarySource: 'acord-to-travelers-cta',
      }}
    />
  );
}

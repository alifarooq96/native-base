import type { Metadata } from 'next';
import Link from 'next/link';
import { InsuranceResourcePage } from '@/components/InsuranceResourcePage';

export const metadata: Metadata = {
  title: 'Bridge ACORD Data to Progressive Portal | NativeBase',
  description:
    'Eliminate manual data entry into the Progressive agent portal. NativeBase reads your ACORD form data and automatically fills every field—no rekeying, no copy-paste, no toggling between systems.',
};

const linkStyle = { color: 'var(--accent)', textDecoration: 'underline' as const, fontWeight: 500 };

export default function AcordToProgressivePage() {
  return (
    <InsuranceResourcePage
      badge="ACORD → Progressive"
      headline={
        <>
          Bridge Your ACORD Data Directly Into the{' '}
          <span style={{ color: '#5eead4' }}>Progressive Portal</span>
        </>
      }
      subheadline="Your agents never have to rekey ACORD data into Progressive again. NativeBase reads the data already in your agency management system and fills every Progressive portal field automatically."
      subheadline2="No rip-and-replace. No new logins. Your existing workflow stays exactly the same—just faster and error-free."
      ctaLabel="See the ACORD → Progressive Bridge Live"
      ctaSource="acord-to-progressive"
      calculator={{
        inputLabel: 'Progressive quotes per week',
        minuteLabel: 'Minutes saved per quote',
        resultNote: 'Based on eliminating manual rekeying from ACORD forms into the Progressive portal.',
        defaultWorkflows: 30,
        defaultMinutes: 15,
      }}
      workflow={{
        sectionLabel: 'How It Works',
        heading: (
          <>
            ACORD data to Progressive quote—
            <span style={{ color: 'var(--accent)' }}>fully automated</span>
          </>
        ),
        subtitle: 'Your agents keep their workflow. NativeBase bridges the data gap so no one ever rekeys a single field.',
        steps: [
          {
            title: 'ACORD Data Captured',
            duration: '0 Sec',
            description:
              'Your ACORD 125, 126, or 140 data already exists in your agency management system. NativeBase reads it directly—no export needed.',
          },
          {
            title: 'AI Maps Every Field',
            duration: '30 Sec',
            description:
              'NativeBase intelligently maps named insureds, vehicles, drivers, coverage limits, and prior carrier info to Progressive\'s portal schema.',
          },
          {
            title: 'Portal Auto-Fill',
            duration: '2–3 Min',
            description:
              'AI navigates the Progressive agent portal the same way a human would—logging in, clicking through forms, and filling every field automatically.',
          },
          {
            title: 'Bindable Quote Ready',
            duration: 'Done',
            description:
              'Progressive returns a rate. Your agent reviews, adjusts if needed, and binds—without having typed a single field manually.',
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
          'Your ACORD data is already complete and accurate. Why retype it into the Progressive portal when NativeBase can bridge it automatically?',
        left: {
          label: 'Manual Process',
          heading: 'Rekeying the Same Data Over and Over',
          bullets: [
            'Open ACORD form in one window, Progressive portal in another',
            'Manually copy driver names, VINs, addresses field by field',
            'Toggle back and forth for every single data point',
            '15–25 minutes per quote just on data entry',
            'Typos and transposition errors cause requotes',
          ],
        },
        right: {
          label: 'Automated with NativeBase',
          heading: 'ACORD Data Flows Directly Into Progressive',
          bullets: [
            'ACORD data read straight from your agency management system',
            'Every field mapped and filled automatically—zero manual entry',
            'AI navigates Progressive\'s portal like a human, but without errors',
            'Under 5 minutes from ACORD data to bindable Progressive quote',
            'Your agents focus on advising clients, not typing into portals',
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
              <span>&nbsp;&nbsp;</span><span style={{ color: '#5eead4' }}>&quot;ACORD_Form&quot;</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#fbbf24' }}>&quot;125&quot;</span><span style={{ color: '#64748b' }}>,</span><br />
              <span>&nbsp;&nbsp;</span><span style={{ color: '#5eead4' }}>&quot;NamedInsured&quot;</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#fbbf24' }}>&quot;Jane Doe&quot;</span><span style={{ color: '#64748b' }}>,</span><br />
              <span>&nbsp;&nbsp;</span><span style={{ color: '#5eead4' }}>&quot;VIN&quot;</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#fbbf24' }}>&quot;1G1AL55F477...&quot;</span><span style={{ color: '#64748b' }}>,</span><br />
              <span>&nbsp;&nbsp;</span><span style={{ color: '#5eead4' }}>&quot;CoverageLimits&quot;</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#fbbf24' }}>&quot;100/300/100&quot;</span><br />
              <span style={{ color: '#475569' }}>{'}'}</span>
            </div>
          ),
        },
      }}
      comparison={{
        heading: 'Manual rekeying vs. ACORD → Progressive bridge',
        manualLabel: 'Manual Rekeying',
        autoLabel: 'NativeBase Bridge',
        rows: [
          ['Time per Quote', '20+ minutes of rekeying', 'Under 5 minutes, automated'],
          ['Data Accuracy', 'Typos from manual entry', '100% accurate from ACORD source'],
          ['Agent Workflow', 'Constant portal toggling', 'Stays in existing system'],
          ['Error Handling', 'Requotes from transpositions', 'AI validates before submission'],
          ['Scalability', 'Limited by typing speed', 'Unlimited quotes, same accuracy'],
          ['Agent Satisfaction', 'Burned out from data entry', 'Focused on selling & advising'],
        ],
        callout: 'Bridge your ACORD data to Progressive automatically—no agent ever rekeys a field again.',
      }}
      faq={{
        heading: 'ACORD → Progressive: Common Questions',
        items: [
          {
            q: 'Does NativeBase require an API from Progressive?',
            a: (
              <>
                No. NativeBase uses AI-driven browser automation—it navigates the Progressive agent portal the same way a human would, understanding labels, context, and form structure. There is no API dependency and no approval process from Progressive. See also our{' '}
                <Link href="/resources/insurance/progressive-workflow-automation" style={linkStyle}>Progressive workflow automation</Link> page for more details.
              </>
            ),
          },
          {
            q: 'Which ACORD forms does NativeBase support for Progressive?',
            a: (
              <>
                NativeBase reads ACORD 125 (Commercial Insurance), ACORD 126 (Commercial General Liability), ACORD 140 (Property), and personal auto dec pages. Any structured data in your agency management system can be bridged. For a broader overview, see our{' '}
                <Link href="/resources/insurance/acord-to-portal" style={linkStyle}>ACORD-to-portal automation</Link> guide.
              </>
            ),
          },
          {
            q: 'Will this disrupt my agents\' current workflow?',
            a: 'Not at all. NativeBase integrates within your existing agency management system. Your agents keep their current workflow—the only difference is they never have to manually rekey ACORD data into the Progressive portal again. The data just flows.',
          },
          {
            q: 'How does NativeBase handle Progressive portal updates or layout changes?',
            a: 'Our AI reads the portal like a human. Where it can\'t adapt automatically to layout changes, we proactively make updates so your automation keeps running—far more resilient than brittle RPA scripts.',
          },
          {
            q: 'Can I also bridge ACORD data to other carriers?',
            a: (
              <>
                Absolutely. The same automation works across carrier portals. See our guides for{' '}
                <Link href="/resources/insurance/acord-to-travelers" style={linkStyle}>Travelers</Link>,{' '}
                <Link href="/resources/insurance/acord-to-hartford" style={linkStyle}>The Hartford</Link>, and many more on our{' '}
                <Link href="/resources/insurance/acord-to-portal" style={linkStyle}>ACORD-to-portal overview</Link>.
              </>
            ),
          },
          {
            q: 'Is my agency\'s data secure?',
            a: 'All data at rest is AES-256 encrypted, and all data in transit is TLS-secured. We never store carrier credentials on our servers. Your ACORD data is read directly from your system and bridged to the portal in real time.',
          },
        ],
        structuredData: [
          {
            question: 'Does NativeBase require an API from Progressive?',
            answer:
              'No. NativeBase uses AI-driven browser automation—it navigates the Progressive agent portal the same way a human would. There is no API dependency and no approval process from Progressive required.',
          },
          {
            question: 'Which ACORD forms does NativeBase support for Progressive?',
            answer:
              'NativeBase reads ACORD 125, 126, 140, and personal auto dec pages. Any structured data in your agency management system can be bridged directly into the Progressive portal.',
          },
          {
            question: 'Will this disrupt my agents\' current workflow?',
            answer:
              'Not at all. NativeBase integrates within your existing agency management system. Your agents keep their current workflow—the only difference is they never manually rekey ACORD data into the Progressive portal again.',
          },
          {
            question: 'How does NativeBase handle Progressive portal updates or layout changes?',
            answer:
              'The AI reads the portal like a human. Where it can\'t adapt automatically, we proactively make updates so your automation keeps running—unlike brittle RPA scripts.',
          },
          {
            question: 'Can I also bridge ACORD data to other carriers?',
            answer:
              'Yes. The same automation works across carrier portals including Travelers, The Hartford, Liberty Mutual, Chubb, and more.',
          },
          {
            question: 'Is my agency\'s data secure?',
            answer:
              'All data at rest is AES-256 encrypted, and all data in transit is TLS-secured. Carrier credentials are never stored on NativeBase servers.',
          },
        ],
      }}
      cta={{
        badge: 'Zero Rekeying',
        heading: 'Ready to stop rekeying ACORD data into Progressive?',
        subtitle:
          'See a live demo: your ACORD data flowing directly into the Progressive portal—no manual entry, no errors, no wasted time.',
        primaryLabel: 'See the ACORD → Progressive Bridge',
        primarySource: 'acord-to-progressive-cta',
      }}
    />
  );
}

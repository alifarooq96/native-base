import Link from 'next/link';
import { InsuranceResourcePage } from '@/components/InsuranceResourcePage';
import { buildSeoMetadata } from '@/lib/page-metadata';

export const metadata = buildSeoMetadata({
  title: 'Automating ACORD 125: Commercial Insurance Application | NativeBase',
  description:
    'Automate the ACORD 125 commercial insurance application. Every field—named insured, business description, locations, prior coverage—flows directly into carrier portals. No rekeying.',
  path: '/resources/insurance/acord-125-commercial-application/',
});

const linkStyle = { color: 'var(--accent)', textDecoration: 'underline' as const, fontWeight: 500 };

export default function Acord125CommercialApplicationPage() {
  return (
    <InsuranceResourcePage
      badge="ACORD 125 Automation"
      headline={
        <>
          Automate the ACORD 125.{' '}
          <span style={{ color: '#5eead4' }}>Never Rekey Commercial App Data Again.</span>
        </>
      }
      subheadline="The ACORD 125 is the foundation of every commercial lines submission. Named insured, business descriptions, locations, prior coverage—NativeBase reads every field and pushes it directly into carrier portals. Your agents never manually enter this data again."
      subheadline2="Works within your existing agency management system. No new workflows to learn—just eliminate the data entry."
      ctaLabel="See ACORD 125 Automation Live"
      ctaSource="acord-125"
      calculator={{
        inputLabel: 'ACORD 125 forms per week',
        minuteLabel: 'minutes saved per form',
        resultNote: 'Based on average 20-minute manual entry per ACORD 125 submission',
        defaultWorkflows: 25,
        defaultMinutes: 20,
      }}
      workflow={{
        sectionLabel: 'ACORD 125 Workflow',
        heading: (
          <>
            From ACORD 125 to carrier portal—
            <span style={{ color: 'var(--accent)' }}>every field, zero typing</span>
          </>
        ),
        subtitle: 'The foundational commercial application, fully automated.',
        steps: [
          {
            title: 'Upload ACORD 125',
            duration: '30 Sec',
            description:
              'Drop in your ACORD 125 from your AMS export, email attachment, or local file. PDF, scanned image, or digital—any format works.',
          },
          {
            title: 'AI Reads Every Field',
            duration: '45 Sec',
            description:
              'Named insured, FEIN, business description, SIC/NAICS codes, mailing address, locations, prior carrier, policy dates—every field extracted automatically.',
          },
          {
            title: 'Carrier Portal Auto-Fill',
            duration: '2–4 Min',
            description:
              'NativeBase navigates the carrier portal the same way a human would—logging in, selecting the right product, and filling every commercial application field from your ACORD 125.',
          },
          {
            title: 'Submission Complete',
            duration: 'Done!',
            description:
              'The carrier has your full commercial application. Your agent reviews the quote without ever having typed a single field from the 125 form.',
          },
        ],
        totalLine: (
          <>
            Total time: <strong style={{ color: 'var(--accent)' }}>Under 5 minutes</strong> vs. 20+ minutes rekeying ACORD 125 data
          </>
        ),
      }}
      split={{
        sectionLabel: 'The Difference',
        heading: 'Manual ACORD 125 entry vs. automated workflows',
        subtitle:
          'The ACORD 125 has dozens of fields. Why should your agents type every one into carrier portals?',
        left: {
          label: 'Manual Process',
          heading: 'Rekeying the 125 Into Every Portal',
          bullets: [
            'Manually transcribe named insured, FEIN, SIC codes from PDF',
            'Copy-paste business descriptions and location details across tabs',
            'Re-enter prior coverage and policy dates for each carrier',
            '20+ minutes per submission—per carrier',
            'One wrong digit in FEIN or address triggers requotes and delays',
          ],
        },
        right: {
          label: 'NativeBase Automation',
          heading: 'Every 125 Field Flows Directly to Portals',
          bullets: [
            'AI extracts named insured, FEIN, business type, SIC/NAICS codes instantly',
            'All locations, addresses, and descriptions mapped to portal fields',
            'Prior coverage, policy dates, and carrier history auto-populated',
            'Under 5 minutes per carrier—no typing, no tab-switching',
            'Agents focus on coverage recommendations, not data entry',
          ],
        },
      }}
      comparison={{
        heading: 'Manual ACORD 125 entry vs. NativeBase',
        manualLabel: 'Manual Entry',
        autoLabel: 'NativeBase',
        rows: [
          ['Time per 125 Submission', '20+ minutes per carrier', 'Under 5 minutes'],
          ['Named Insured / FEIN', 'Retyped for each portal', 'Extracted once, pushed everywhere'],
          ['Business Description', 'Copy-paste, reformat manually', 'Mapped automatically to portal schema'],
          ['Location Details', 'Re-entered per carrier site', 'All locations auto-populated'],
          ['Prior Coverage Info', 'Looked up and retyped', 'Pulled from 125, filled instantly'],
          ['Error Rate', 'Typos in FEIN, addresses, codes', 'Zero transcription errors'],
        ],
        callout: 'Every field on your ACORD 125 flows directly into carrier portals—no rekeying, no errors.',
      }}
      faq={{
        heading: 'Questions about ACORD 125 automation',
        items: [
          {
            q: 'Does automating the ACORD 125 require a carrier API?',
            a: (
              <>
                No. NativeBase uses AI-driven browser automation—it navigates carrier portals the same way your staff would. No API dependency, no carrier approval needed. Your agents simply never have to key in ACORD 125 data again. Learn more about the full{' '}
                <Link href="/resources/insurance/acord-to-portal" style={linkStyle}>ACORD-to-portal automation workflow</Link>.
              </>
            ),
          },
          {
            q: 'Is client data on the ACORD 125 kept secure?',
            a: (
              <>
                Absolutely. All data is AES-256 encrypted at rest and TLS-secured in transit. We never store carrier credentials on our servers. Your client&apos;s named insured info, FEIN, and business details stay protected—NativeBase just eliminates the manual entry.
              </>
            ),
          },
          {
            q: 'Which carrier portals work with ACORD 125 automation?',
            a: (
              <>
                NativeBase automates ACORD 125 submissions across all major carrier portals—Travelers, Liberty Mutual, Hartford, Progressive, Safeco, and more. The same AI reads your 125 form and fills whichever portal you need, so your agents never rekey the same data into different sites.
              </>
            ),
          },
          {
            q: 'Can it also handle the ACORD 126, 130, and 140?',
            a: (
              <>
                Yes. The ACORD 125 is the foundation, and NativeBase also automates the{' '}
                <Link href="/resources/insurance/acord-126-general-liability" style={linkStyle}>ACORD 126 (General Liability)</Link>,{' '}
                <Link href="/resources/insurance/acord-130-workers-comp" style={linkStyle}>ACORD 130 (Workers&apos; Comp)</Link>, and{' '}
                <Link href="/resources/insurance/acord-140-property-information" style={linkStyle}>ACORD 140 (Property)</Link>. All supplemental data flows into carrier portals alongside your 125—zero additional data entry.
              </>
            ),
          },
          {
            q: 'How long does it take to get started?',
            a: (
              <>
                Each workflow is automated within 48 hours. NativeBase integrates within your existing agency management system—Applied Epic, Vertafore AMS360, HawkSoft, EZLynx—without disrupting agent workflow. Your team stops rekeying ACORD 125 data immediately.
              </>
            ),
          },
          {
            q: 'How does the AI handle complex 125 forms with multiple locations?',
            a: (
              <>
                NativeBase&apos;s AI understands ACORD 125 form structure—including multi-location schedules, additional named insureds, and multiple prior policies. Every location, every entity, every coverage detail is extracted and mapped to the correct carrier portal fields. No manual data entry, even for the most complex submissions.
              </>
            ),
          },
        ],
        structuredData: [
          {
            question: 'Does automating the ACORD 125 require a carrier API?',
            answer:
              'No. NativeBase uses AI-driven browser automation that navigates carrier portals the same way your staff would. No API dependency and no carrier approval needed.',
          },
          {
            question: 'Is client data on the ACORD 125 kept secure?',
            answer:
              'All data is AES-256 encrypted at rest and TLS-secured in transit. Carrier credentials are never stored on our servers.',
          },
          {
            question: 'Which carrier portals work with ACORD 125 automation?',
            answer:
              'NativeBase automates ACORD 125 submissions across all major carrier portals including Travelers, Liberty Mutual, Hartford, Progressive, Safeco, and more.',
          },
          {
            question: 'Can it also handle the ACORD 126, 130, and 140?',
            answer:
              'Yes. NativeBase also automates the ACORD 126 (General Liability), ACORD 130 (Workers Comp), and ACORD 140 (Property). All supplemental data flows into carrier portals alongside your 125.',
          },
          {
            question: 'How long does it take to get started?',
            answer:
              'Each workflow is automated within 48 hours. NativeBase integrates within your existing agency management system without disrupting agent workflow.',
          },
          {
            question: 'How does the AI handle complex 125 forms with multiple locations?',
            answer:
              'NativeBase AI understands ACORD 125 form structure including multi-location schedules, additional named insureds, and multiple prior policies. Every detail is extracted and mapped to the correct carrier portal fields.',
          },
        ],
      }}
      cta={{
        badge: 'ACORD 125 Automation',
        heading: 'Ready to stop rekeying your commercial applications?',
        subtitle:
          'See NativeBase read an ACORD 125 and fill a carrier portal live—your agents will never manually enter commercial app data again.',
        primaryLabel: 'See ACORD 125 Automation Live',
        primarySource: 'acord-125-cta',
      }}
    />
  );
}

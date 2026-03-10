import type { Metadata } from 'next';
import Link from 'next/link';
import { InsuranceResourcePage } from '@/components/InsuranceResourcePage';

export const metadata: Metadata = {
  title: 'ACORD to Portal: Zero-Data Entry Quoting | NativeBase',
  description:
    'Eliminate manual ACORD data entry into carrier portals. NativeBase reads your ACORD forms and automatically fills every field—no rekeying, no typos, no wasted hours.',
};

const linkStyle = { color: 'var(--accent)', textDecoration: 'underline' as const, fontWeight: 500 };

export default function AcordToPortalPage() {
  return (
    <InsuranceResourcePage
      badge="Zero Data Entry"
      headline={
        <>
          Stop Rekeying ACORD Data.{' '}
          <span style={{ color: '#5eead4' }}>Carrier Portals Fill Themselves.</span>
        </>
      }
      subheadline="Your ACORD forms already contain every piece of client data carriers need. NativeBase reads that data and navigates carrier portals the same way a human would—except your agents never have to key in a single field again."
      subheadline2="Integrates within your existing agency management system. No rip-and-replace. Your team keeps their workflow—we just eliminate the data entry."
      ctaLabel="See Zero-Entry Quoting Live"
      ctaSource="acord-to-portal"
      calculator={{
        inputLabel: 'ACORD submissions per week',
        minuteLabel: 'minutes saved per submission',
        resultNote: 'Based on average 18-minute manual entry per ACORD-to-portal submission',
        defaultWorkflows: 30,
        defaultMinutes: 18,
      }}
      workflow={{
        sectionLabel: 'How It Works',
        heading: (
          <>
            From ACORD form to carrier quote—
            <span style={{ color: 'var(--accent)' }}>zero manual entry</span>
          </>
        ),
        subtitle: 'Your agents never touch a carrier portal keyboard again.',
        steps: [
          {
            title: 'Upload ACORD Form',
            duration: '30 Sec',
            description:
              'Drop in any ACORD form—125, 126, 130, 140—from your AMS or local files. Any format your agency already uses.',
          },
          {
            title: 'AI Extracts Every Field',
            duration: '45 Sec',
            description:
              'NativeBase reads every data point: named insured, addresses, coverage limits, class codes, prior carrier info—all mapped automatically.',
          },
          {
            title: 'Portal Auto-Fill',
            duration: '2–4 Min',
            description:
              'AI navigates the carrier portal exactly like a human would—logging in, clicking through screens, and filling every field from your ACORD data.',
          },
          {
            title: 'Quote Ready for Review',
            duration: 'Done!',
            description:
              'The carrier returns a quote. Your agent reviews, adjusts if needed, and binds—without ever having rekeyed a single data point.',
          },
        ],
        totalLine: (
          <>
            Total time: <strong style={{ color: 'var(--accent)' }}>Under 5 minutes</strong> vs. 20+ minutes of manual data entry
          </>
        ),
      }}
      split={{
        sectionLabel: 'The Difference',
        heading: 'Manual rekeying vs. automated ACORD-to-portal',
        subtitle:
          'Your agents already collected the data once. Why should they type it again into every carrier portal?',
        left: {
          label: 'Manual Process',
          heading: 'Rekeying the Same Data, Over and Over',
          bullets: [
            'Open ACORD PDF, read each field, type it into carrier portal',
            'Switch between tabs copying addresses, policy numbers, class codes',
            '15–25 minutes per submission—multiply by dozens of quotes per day',
            'Typos cause requotes, delays, and E&O exposure',
            'Staff burnout from repetitive, mindless data entry',
          ],
        },
        right: {
          label: 'NativeBase Automation',
          heading: 'ACORD Data Flows Directly Into Portals',
          bullets: [
            'AI reads every ACORD field and maps it to the carrier\'s portal schema',
            'Browser automation navigates portals the same way a human would',
            'Under 5 minutes from ACORD upload to carrier quote—no typing',
            'Zero transcription errors—data flows directly from source',
            'Agents focus on advising clients, not rekeying data',
          ],
        },
      }}
      comparison={{
        heading: 'Manual rekeying vs. NativeBase automation',
        manualLabel: 'Manual Entry',
        autoLabel: 'NativeBase',
        rows: [
          ['Time per Submission', '15–25 minutes', 'Under 5 minutes'],
          ['Data Entry Errors', 'Frequent typos & omissions', 'Zero transcription errors'],
          ['Agent Workflow', 'Disrupted by portal busywork', 'Unchanged—works within existing AMS'],
          ['Scalability', 'Hire more staff to type more', 'Handle 3x volume, same team'],
          ['Carrier Coverage', 'One portal at a time', 'Multi-carrier, same workflow'],
          ['Staff Satisfaction', 'Burned out from rekeying', 'Focused on client relationships'],
        ],
        callout: 'Eliminate manual data entry entirely. Every ACORD submission flows straight to a carrier quote.',
      }}
      faq={{
        heading: 'Common questions about ACORD-to-portal automation',
        items: [
          {
            q: 'Does this require an API from the carriers?',
            a: (
              <>
                No. NativeBase uses AI-driven browser automation—it navigates carrier portals the same way a human would. There is no API dependency, no integration request, and no approval process from any carrier. Your agents simply never have to key in data again.
              </>
            ),
          },
          {
            q: 'Is my client data secure during the automation?',
            a: (
              <>
                Absolutely. All data at rest is AES-256 encrypted, and all data in transit is TLS-secured. We never store carrier credentials on our servers. Your data stays within your control—NativeBase just eliminates the manual entry step.
              </>
            ),
          },
          {
            q: 'Which ACORD forms are supported?',
            a: (
              <>
                NativeBase automates all major ACORD forms including the{' '}
                <Link href="/resources/insurance/acord-125-commercial-application" style={linkStyle}>ACORD 125 (Commercial Application)</Link>,{' '}
                <Link href="/resources/insurance/acord-126-general-liability" style={linkStyle}>ACORD 126 (General Liability)</Link>,{' '}
                <Link href="/resources/insurance/acord-130-workers-comp" style={linkStyle}>ACORD 130 (Workers&apos; Comp)</Link>, and{' '}
                <Link href="/resources/insurance/acord-140-property-information" style={linkStyle}>ACORD 140 (Property)</Link>. Every field is extracted and pushed to carrier portals automatically—no rekeying required.
              </>
            ),
          },
          {
            q: 'How long does setup take?',
            a: (
              <>
                Each workflow is automated within 48 hours. NativeBase integrates within your existing agency management system without disrupting agent workflow. We handle setup, configuration, and testing so your team can stop rekeying data immediately.
              </>
            ),
          },
          {
            q: 'Does it work with my agency management system?',
            a: (
              <>
                Yes. NativeBase works within your existing AMS—Applied Epic, Vertafore AMS360, HawkSoft, EZLynx, and others. There is no rip-and-replace. Your agents keep their current workflow; we simply eliminate the manual data entry into carrier portals.
              </>
            ),
          },
          {
            q: 'How accurate is the data extraction from ACORD forms?',
            a: (
              <>
                NativeBase achieves 99%+ field-level accuracy by using AI that understands ACORD form structure and context—not just OCR. Named insured, addresses, class codes, coverage limits, and every other field are extracted precisely and pushed to carrier portals without manual review. Your agents never have to rekey or correct data.
              </>
            ),
          },
        ],
        structuredData: [
          {
            question: 'Does this require an API from the carriers?',
            answer:
              'No. NativeBase uses AI-driven browser automation—it navigates carrier portals the same way a human would. There is no API dependency, no integration request, and no approval process from any carrier.',
          },
          {
            question: 'Is my client data secure during the automation?',
            answer:
              'Absolutely. All data at rest is AES-256 encrypted, and all data in transit is TLS-secured. We never store carrier credentials on our servers.',
          },
          {
            question: 'Which ACORD forms are supported?',
            answer:
              'NativeBase automates all major ACORD forms including the ACORD 125 (Commercial Application), ACORD 126 (General Liability), ACORD 130 (Workers Comp), and ACORD 140 (Property). Every field is extracted and pushed to carrier portals automatically.',
          },
          {
            question: 'How long does setup take?',
            answer:
              'Each workflow is automated within 48 hours. NativeBase integrates within your existing agency management system without disrupting agent workflow.',
          },
          {
            question: 'Does it work with my agency management system?',
            answer:
              'Yes. NativeBase works within your existing AMS—Applied Epic, Vertafore AMS360, HawkSoft, EZLynx, and others. No rip-and-replace required.',
          },
          {
            question: 'How accurate is the data extraction from ACORD forms?',
            answer:
              'NativeBase achieves 99%+ field-level accuracy by using AI that understands ACORD form structure and context. Named insured, addresses, class codes, coverage limits, and every other field are extracted precisely.',
          },
        ],
      }}
      cta={{
        badge: 'Zero Data Entry',
        heading: 'Ready to stop rekeying ACORD data into carrier portals?',
        subtitle:
          'See a live demo of NativeBase reading your ACORD forms and filling carrier portals automatically—your agents will never manually enter data again.',
        primaryLabel: 'See Zero-Entry Quoting Live',
        primarySource: 'acord-to-portal-cta',
      }}
    />
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { InsuranceResourcePage } from '@/components/InsuranceResourcePage';

export const metadata: Metadata = {
  title: 'Automating ACORD 140: Property Information Automation | NativeBase',
  description:
    'Automate ACORD 140 property information submissions. Building values, construction types, protection classes, occupancy details—mapped from ACORD directly into carrier portals. No rekeying.',
};

const linkStyle = { color: 'var(--accent)', textDecoration: 'underline' as const, fontWeight: 500 };

export default function Acord140PropertyInformationPage() {
  return (
    <InsuranceResourcePage
      badge="ACORD 140 Automation"
      headline={
        <>
          Automate the ACORD 140.{' '}
          <span style={{ color: '#5eead4' }}>Property Data Fills Carrier Portals Automatically.</span>
        </>
      }
      subheadline="Building values, construction types, protection classes, occupancy details, square footage, year built—NativeBase reads every field from your ACORD 140 and pushes it directly into carrier portals. Your agents never manually enter property data again."
      subheadline2="Works within your existing agency management system. No disruption—just eliminate the property data entry."
      ctaLabel="See ACORD 140 Automation Live"
      ctaSource="acord-140"
      calculator={{
        inputLabel: 'Property submissions per week',
        minuteLabel: 'minutes saved per submission',
        resultNote: 'Based on average 18-minute manual entry per ACORD 140 property submission',
        defaultWorkflows: 18,
        defaultMinutes: 18,
      }}
      workflow={{
        sectionLabel: 'ACORD 140 Workflow',
        heading: (
          <>
            From ACORD 140 to carrier quote—
            <span style={{ color: 'var(--accent)' }}>every property field, zero typing</span>
          </>
        ),
        subtitle: 'Property information submissions, fully automated from form to portal.',
        steps: [
          {
            title: 'Upload ACORD 140',
            duration: '30 Sec',
            description:
              'Drop in your ACORD 140 from your AMS, email attachment, or local file. Alongside the 125 or as part of a full commercial package—NativeBase handles it all.',
          },
          {
            title: 'AI Extracts Property Data',
            duration: '45 Sec',
            description:
              'Building values, replacement cost, construction type, protection class, year built, square footage, occupancy type, roof details—every property-specific field extracted instantly.',
          },
          {
            title: 'Carrier Portal Auto-Fill',
            duration: '2–4 Min',
            description:
              'NativeBase navigates the carrier\'s property screens the same way a human would—entering building details, selecting construction types from dropdowns, and filling valuation fields automatically.',
          },
          {
            title: 'Property Quote Ready',
            duration: 'Done!',
            description:
              'The carrier has your complete property submission. Your agent reviews coverage and valuation without ever having retyped building values or construction details.',
          },
        ],
        totalLine: (
          <>
            Total time: <strong style={{ color: 'var(--accent)' }}>Under 5 minutes</strong> vs. 18+ minutes manually entering property data
          </>
        ),
      }}
      split={{
        sectionLabel: 'The Difference',
        heading: 'Manual property entry vs. automated ACORD 140 workflows',
        subtitle:
          'Building values, construction types, and protection classes are already on your ACORD 140. Why type them into every carrier portal?',
        left: {
          label: 'Manual Process',
          heading: 'Rekeying Property Data Into Every Portal',
          bullets: [
            'Manually type building values, replacement costs, and coinsurance for each carrier',
            'Re-enter construction type, year built, square footage across portal screens',
            'Look up and retype protection class, fire district, and distance to hydrant',
            'Copy occupancy details, roof type, and alarm/sprinkler info per carrier',
            'Wrong building value or construction type triggers underwriting questions and delays',
          ],
        },
        right: {
          label: 'NativeBase Automation',
          heading: 'ACORD 140 Property Data Fills Portals Automatically',
          bullets: [
            'AI extracts building values, replacement cost, and coinsurance percentages instantly',
            'Construction type, year built, stories, and square footage mapped to portal fields',
            'Protection class, sprinkler status, and alarm systems auto-populated',
            'Multi-building schedules with per-building details filled automatically',
            'Agents focus on coverage adequacy and valuation reviews, not data entry',
          ],
        },
      }}
      comparison={{
        heading: 'Manual property entry vs. NativeBase automation',
        manualLabel: 'Manual Entry',
        autoLabel: 'NativeBase',
        rows: [
          ['Time per Property Submission', '18+ minutes per carrier', 'Under 5 minutes'],
          ['Building Values', 'Retyped for each portal', 'Extracted once, pushed everywhere'],
          ['Construction Details', 'Selected manually per carrier', 'Auto-mapped from ACORD 140'],
          ['Protection Class', 'Looked up and re-entered', 'Auto-populated from form data'],
          ['Multi-Building Schedules', 'Each building entered separately', 'All buildings filled automatically'],
          ['Error Rate', 'Wrong values trigger UW questions', 'Zero transcription errors'],
        ],
        callout: 'Every property field from your ACORD 140 flows directly into carrier portals—no rekeying, no valuation errors, no delays.',
      }}
      faq={{
        heading: 'Questions about ACORD 140 property automation',
        items: [
          {
            q: 'Does automating ACORD 140 property submissions require a carrier API?',
            a: (
              <>
                No. NativeBase uses AI-driven browser automation—it navigates carrier portals the same way a human would, filling property screens automatically. No API dependency and no carrier approval needed. See the full{' '}
                <Link href="/resources/insurance/acord-to-portal" style={linkStyle}>ACORD-to-portal automation overview</Link>.
              </>
            ),
          },
          {
            q: 'Is property valuation data kept secure?',
            a: (
              <>
                Absolutely. All data is AES-256 encrypted at rest and TLS-secured in transit. We never store carrier credentials. Your clients&apos; building values, construction details, and property information stay protected—NativeBase just eliminates the manual entry.
              </>
            ),
          },
          {
            q: 'How does NativeBase handle multi-building property schedules?',
            a: (
              <>
                NativeBase&apos;s AI reads multi-building schedules from your ACORD 140—each building&apos;s value, construction type, year built, square footage, occupancy, and protection class. Every building in the schedule is extracted and mapped to the correct carrier portal fields. Your agents never have to enter building-by-building data manually.
              </>
            ),
          },
          {
            q: 'Does it also automate the ACORD 125 and other supplemental forms?',
            a: (
              <>
                Yes. Property submissions typically pair the ACORD 140 with the{' '}
                <Link href="/resources/insurance/acord-125-commercial-application" style={linkStyle}>ACORD 125 (Commercial Application)</Link>. NativeBase also automates the{' '}
                <Link href="/resources/insurance/acord-126-general-liability" style={linkStyle}>ACORD 126 (General Liability)</Link> and{' '}
                <Link href="/resources/insurance/acord-130-workers-comp" style={linkStyle}>ACORD 130 (Workers&apos; Comp)</Link>. All forms flow into carrier portals together—zero additional data entry.
              </>
            ),
          },
          {
            q: 'How long does setup take for property automation?',
            a: (
              <>
                Each workflow is automated within 48 hours. NativeBase integrates within your existing agency management system—Applied Epic, AMS360, HawkSoft, EZLynx—without disrupting your team&apos;s workflow. Your agents stop rekeying property data immediately.
              </>
            ),
          },
          {
            q: 'How accurate is the extraction of building values and construction details?',
            a: (
              <>
                NativeBase achieves 99%+ field-level accuracy on ACORD 140 forms. Building values, replacement costs, construction types, protection classes, and every other property-specific field are extracted using AI that understands property form structure and context. This eliminates the valuation entry errors that trigger underwriting questions and delay quotes.
              </>
            ),
          },
        ],
        structuredData: [
          {
            question: 'Does automating ACORD 140 property submissions require a carrier API?',
            answer:
              'No. NativeBase uses AI-driven browser automation that navigates carrier portals the same way a human would. No API dependency and no carrier approval needed.',
          },
          {
            question: 'Is property valuation data kept secure?',
            answer:
              'All data is AES-256 encrypted at rest and TLS-secured in transit. Carrier credentials are never stored on our servers.',
          },
          {
            question: 'How does NativeBase handle multi-building property schedules?',
            answer:
              "NativeBase AI reads multi-building schedules from your ACORD 140—each building's value, construction type, year built, square footage, occupancy, and protection class are extracted and mapped to carrier portal fields.",
          },
          {
            question: 'Does it also automate the ACORD 125 and other supplemental forms?',
            answer:
              'Yes. NativeBase also automates the ACORD 125 (Commercial Application), ACORD 126 (General Liability), and ACORD 130 (Workers Comp). All forms flow into carrier portals together.',
          },
          {
            question: 'How long does setup take for property automation?',
            answer:
              'Each workflow is automated within 48 hours. NativeBase integrates within your existing agency management system without disrupting workflow.',
          },
          {
            question: 'How accurate is the extraction of building values and construction details?',
            answer:
              'NativeBase achieves 99%+ field-level accuracy on ACORD 140 forms. Building values, replacement costs, construction types, and protection classes are extracted using AI that understands property form structure.',
          },
        ],
      }}
      cta={{
        badge: 'ACORD 140 Automation',
        heading: 'Ready to stop rekeying property data into carrier portals?',
        subtitle:
          'See NativeBase read an ACORD 140 and fill property screens automatically—your agents will never manually enter building values, construction types, or protection classes again.',
        primaryLabel: 'See Property Automation Live',
        primarySource: 'acord-140-cta',
      }}
    />
  );
}

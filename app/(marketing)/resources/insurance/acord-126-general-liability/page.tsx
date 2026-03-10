import type { Metadata } from 'next';
import Link from 'next/link';
import { InsuranceResourcePage } from '@/components/InsuranceResourcePage';

export const metadata: Metadata = {
  title: 'Automating ACORD 126: General Liability Automation | NativeBase',
  description:
    'Automate ACORD 126 general liability submissions. GL class codes, limits, deductibles, additional insureds—all mapped and pushed to carrier portals. No rekeying.',
};

const linkStyle = { color: 'var(--accent)', textDecoration: 'underline' as const, fontWeight: 500 };

export default function Acord126GeneralLiabilityPage() {
  return (
    <InsuranceResourcePage
      badge="ACORD 126 Automation"
      headline={
        <>
          Automate the ACORD 126.{' '}
          <span style={{ color: '#5eead4' }}>GL Data Flows Straight to Carrier Portals.</span>
        </>
      }
      subheadline="GL class codes, limits, deductibles, additional insureds, premises info—NativeBase reads every field from your ACORD 126 and pushes it directly into carrier portals. Your agents never manually enter general liability data again."
      subheadline2="Works within your existing agency management system. No disruption to agent workflow—just eliminate the GL data entry."
      ctaLabel="See ACORD 126 Automation Live"
      ctaSource="acord-126"
      calculator={{
        inputLabel: 'GL submissions per week',
        minuteLabel: 'minutes saved per submission',
        resultNote: 'Based on average 15-minute manual entry per ACORD 126 GL submission',
        defaultWorkflows: 20,
        defaultMinutes: 15,
      }}
      workflow={{
        sectionLabel: 'ACORD 126 Workflow',
        heading: (
          <>
            From ACORD 126 to carrier quote—
            <span style={{ color: 'var(--accent)' }}>every GL field, zero typing</span>
          </>
        ),
        subtitle: 'General liability submissions, fully automated from form to portal.',
        steps: [
          {
            title: 'Upload ACORD 126',
            duration: '30 Sec',
            description:
              'Drop in your ACORD 126 alongside the 125. PDF, scanned, or digital—NativeBase handles any format your agency uses.',
          },
          {
            title: 'AI Maps GL Fields',
            duration: '45 Sec',
            description:
              'GL class codes, occurrence/aggregate limits, deductibles, premises operations, products/completed ops, additional insureds—all extracted and mapped instantly.',
          },
          {
            title: 'Portal Auto-Fill',
            duration: '2–3 Min',
            description:
              'NativeBase navigates the carrier portal the same way a human would—filling GL-specific screens, selecting class codes from dropdowns, and entering limits and deductibles.',
          },
          {
            title: 'GL Quote Ready',
            duration: 'Done!',
            description:
              'The carrier has your complete GL submission. Your agent reviews coverage and pricing without ever having rekeyed class codes or limits.',
          },
        ],
        totalLine: (
          <>
            Total time: <strong style={{ color: 'var(--accent)' }}>Under 4 minutes</strong> vs. 15+ minutes manually entering GL data
          </>
        ),
      }}
      split={{
        sectionLabel: 'The Difference',
        heading: 'Manual GL entry vs. automated ACORD 126 workflows',
        subtitle:
          'GL class codes and limits are already on your ACORD 126. Why type them into every carrier portal?',
        left: {
          label: 'Manual Process',
          heading: 'Rekeying GL Data Into Every Portal',
          bullets: [
            'Look up GL class codes on the 126, retype into each carrier site',
            'Manually enter occurrence and aggregate limits across multiple screens',
            'Copy deductible amounts, additional insured details, premises info',
            'Each carrier portal has different field layouts—constant context-switching',
            'Wrong class code selection triggers requotes and underwriting delays',
          ],
        },
        right: {
          label: 'NativeBase Automation',
          heading: 'ACORD 126 GL Data Fills Portals Automatically',
          bullets: [
            'AI extracts GL class codes, maps them to each carrier\'s code system',
            'Limits, deductibles, and retentions auto-populated in correct fields',
            'Additional insureds and premises operations filled without typing',
            'Same workflow across every carrier portal—no context-switching',
            'Agents focus on coverage adequacy, not data entry',
          ],
        },
      }}
      comparison={{
        heading: 'Manual GL entry vs. NativeBase automation',
        manualLabel: 'Manual Entry',
        autoLabel: 'NativeBase',
        rows: [
          ['Time per GL Submission', '15+ minutes per carrier', 'Under 4 minutes'],
          ['GL Class Code Entry', 'Search and retype manually', 'Auto-mapped from ACORD 126'],
          ['Limits & Deductibles', 'Re-entered per portal', 'Populated from form data instantly'],
          ['Additional Insureds', 'Typed one by one', 'All extracted and filled automatically'],
          ['Cross-Carrier Quoting', 'Repeat entry for each site', 'Same data, every portal, zero reentry'],
          ['Error Rate', 'Wrong codes cause requotes', 'Zero transcription errors'],
        ],
        callout: 'Every GL field from your ACORD 126 flows directly into carrier portals—no rekeying, no errors, no delays.',
      }}
      faq={{
        heading: 'Questions about ACORD 126 automation',
        items: [
          {
            q: 'Does automating ACORD 126 GL submissions require a carrier API?',
            a: (
              <>
                No. NativeBase uses AI-driven browser automation—it navigates carrier portals the same way a human would, filling GL screens automatically. No API dependency and no carrier approval needed. See the full{' '}
                <Link href="/resources/insurance/acord-to-portal" style={linkStyle}>ACORD-to-portal automation overview</Link>.
              </>
            ),
          },
          {
            q: 'Is general liability client data kept secure?',
            a: (
              <>
                Absolutely. All data is AES-256 encrypted at rest and TLS-secured in transit. We never store carrier credentials. Your clients&apos; GL coverage details, class codes, and additional insured information stay protected—NativeBase just eliminates the manual entry.
              </>
            ),
          },
          {
            q: 'How does NativeBase handle GL class code mapping across carriers?',
            a: (
              <>
                Each carrier may use different GL class code systems. NativeBase&apos;s AI reads the class codes from your ACORD 126, understands the business context, and maps them to the correct codes in each carrier&apos;s portal. Your agents never have to look up or translate class codes manually.
              </>
            ),
          },
          {
            q: 'Does it also automate the ACORD 125 and other supplemental forms?',
            a: (
              <>
                Yes. The ACORD 126 is typically submitted alongside the{' '}
                <Link href="/resources/insurance/acord-125-commercial-application" style={linkStyle}>ACORD 125 (Commercial Application)</Link>. NativeBase also automates the{' '}
                <Link href="/resources/insurance/acord-130-workers-comp" style={linkStyle}>ACORD 130 (Workers&apos; Comp)</Link> and{' '}
                <Link href="/resources/insurance/acord-140-property-information" style={linkStyle}>ACORD 140 (Property)</Link>. All forms flow into carrier portals together—zero additional data entry.
              </>
            ),
          },
          {
            q: 'How long does setup take for GL automation?',
            a: (
              <>
                Each workflow is automated within 48 hours. NativeBase integrates within your existing agency management system—Applied Epic, AMS360, HawkSoft, EZLynx—without disrupting your team&apos;s workflow. Your agents stop rekeying GL data immediately.
              </>
            ),
          },
          {
            q: 'What if our ACORD 126 has complex multi-location GL exposures?',
            a: (
              <>
                NativeBase&apos;s AI handles multi-location GL schedules, per-location class codes, and varying limits by location. Every exposure detail on your ACORD 126 is extracted and mapped to the correct carrier portal fields—even for complex, multi-location risks. No manual data entry required.
              </>
            ),
          },
        ],
        structuredData: [
          {
            question: 'Does automating ACORD 126 GL submissions require a carrier API?',
            answer:
              'No. NativeBase uses AI-driven browser automation that navigates carrier portals the same way a human would. No API dependency and no carrier approval needed.',
          },
          {
            question: 'Is general liability client data kept secure?',
            answer:
              'All data is AES-256 encrypted at rest and TLS-secured in transit. Carrier credentials are never stored on our servers.',
          },
          {
            question: 'How does NativeBase handle GL class code mapping across carriers?',
            answer:
              'NativeBase AI reads class codes from your ACORD 126, understands the business context, and maps them to the correct codes in each carrier portal automatically.',
          },
          {
            question: 'Does it also automate the ACORD 125 and other supplemental forms?',
            answer:
              'Yes. NativeBase also automates the ACORD 125 (Commercial Application), ACORD 130 (Workers Comp), and ACORD 140 (Property). All forms flow into carrier portals together.',
          },
          {
            question: 'How long does setup take for GL automation?',
            answer:
              'Each workflow is automated within 48 hours. NativeBase integrates within your existing agency management system without disrupting workflow.',
          },
          {
            question: 'What if our ACORD 126 has complex multi-location GL exposures?',
            answer:
              'NativeBase AI handles multi-location GL schedules, per-location class codes, and varying limits by location. Every exposure detail is extracted and mapped to the correct carrier portal fields.',
          },
        ],
      }}
      cta={{
        badge: 'ACORD 126 Automation',
        heading: 'Ready to stop rekeying GL data into carrier portals?',
        subtitle:
          'See NativeBase read an ACORD 126 and fill GL screens automatically—your agents will never manually enter class codes, limits, or deductibles again.',
        primaryLabel: 'See GL Automation Live',
        primarySource: 'acord-126-cta',
      }}
    />
  );
}

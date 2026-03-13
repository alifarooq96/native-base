import Link from 'next/link';
import { InsuranceResourcePage } from '@/components/InsuranceResourcePage';
import { buildSeoMetadata } from '@/lib/page-metadata';

export const metadata = buildSeoMetadata({
  title: "Automating ACORD 130: Workers' Comp Automation | NativeBase",
  description:
    "Automate ACORD 130 workers' compensation submissions. Payroll data, class codes, experience mods, state-specific requirements—no more typing them into each carrier portal.",
  path: '/resources/insurance/acord-130-workers-comp/',
});

const linkStyle = { color: 'var(--accent)', textDecoration: 'underline' as const, fontWeight: 500 };

export default function Acord130WorkersCompPage() {
  return (
    <InsuranceResourcePage
      badge="ACORD 130 Automation"
      headline={
        <>
          Automate the ACORD 130.{' '}
          <span style={{ color: '#5eead4' }}>Workers&apos; Comp Data Enters Itself.</span>
        </>
      }
      subheadline="Payroll figures, class codes, experience mods, state-specific requirements, prior claims history—NativeBase reads every field from your ACORD 130 and pushes it directly into carrier portals. Your agents never manually enter workers' comp data again."
      subheadline2="Integrates within your existing agency management system. No new workflows—just eliminate the repetitive data entry."
      ctaLabel="See ACORD 130 Automation Live"
      ctaSource="acord-130"
      calculator={{
        inputLabel: 'Workers comp submissions per week',
        minuteLabel: 'minutes saved per submission',
        resultNote: "Based on average 22-minute manual entry per ACORD 130 workers' comp submission",
        defaultWorkflows: 15,
        defaultMinutes: 22,
      }}
      workflow={{
        sectionLabel: 'ACORD 130 Workflow',
        heading: (
          <>
            From ACORD 130 to carrier quote—
            <span style={{ color: 'var(--accent)' }}>every WC field, zero typing</span>
          </>
        ),
        subtitle: "Workers' compensation submissions, fully automated from form to portal.",
        steps: [
          {
            title: 'Upload ACORD 130',
            duration: '30 Sec',
            description:
              "Drop in your ACORD 130 from your AMS, email, or local files. Alongside the 125 or standalone—NativeBase handles the workers' comp section either way.",
          },
          {
            title: 'AI Extracts WC Data',
            duration: '60 Sec',
            description:
              'Payroll by class code, experience modification factor, state jurisdictions, prior three-year loss history, deductible preferences—every WC-specific field extracted instantly.',
          },
          {
            title: 'Carrier Portal Auto-Fill',
            duration: '3–4 Min',
            description:
              "NativeBase navigates the carrier's workers' comp screens the same way a human would—entering payroll figures, selecting class codes, and filling state-specific requirements automatically.",
          },
          {
            title: 'WC Quote Ready',
            duration: 'Done!',
            description:
              "The carrier has your complete workers' comp submission. Your agent reviews mod factors and pricing without ever having retyped payroll data or class codes.",
          },
        ],
        totalLine: (
          <>
            Total time: <strong style={{ color: 'var(--accent)' }}>Under 5 minutes</strong> vs. 22+ minutes manually entering WC data
          </>
        ),
      }}
      split={{
        sectionLabel: 'The Difference',
        heading: "Manual WC entry vs. automated ACORD 130 workflows",
        subtitle:
          "Payroll data and class codes are already on your ACORD 130. Why type them into every carrier portal?",
        left: {
          label: 'Manual Process',
          heading: "Rekeying Workers' Comp Data Into Every Portal",
          bullets: [
            'Manually enter payroll figures for each class code into each carrier site',
            'Look up and retype experience modification factors and effective dates',
            'Re-enter state jurisdiction details and governing class codes',
            'Copy prior three-year loss runs and claims history per carrier',
            'One wrong payroll digit changes the entire premium—triggers requotes',
          ],
        },
        right: {
          label: 'NativeBase Automation',
          heading: 'ACORD 130 WC Data Fills Portals Automatically',
          bullets: [
            'AI extracts payroll by class code—every dollar figure, every classification',
            'Experience mod, effective dates, and anniversary rating dates auto-populated',
            'State jurisdictions and multi-state exposures mapped to correct portal fields',
            'Prior loss history and claims data filled without manual entry',
            'Agents focus on coverage adequacy and mod analysis, not data entry',
          ],
        },
      }}
      comparison={{
        heading: "Manual WC entry vs. NativeBase automation",
        manualLabel: 'Manual Entry',
        autoLabel: 'NativeBase',
        rows: [
          ['Time per WC Submission', '22+ minutes per carrier', 'Under 5 minutes'],
          ['Payroll by Class Code', 'Retyped for each portal', 'Extracted once, pushed everywhere'],
          ['Experience Mod Factor', 'Looked up and re-entered', 'Auto-populated from ACORD 130'],
          ['State Requirements', 'Manually researched per state', 'State-specific fields filled automatically'],
          ['Prior Loss History', 'Transcribed from loss runs', 'Extracted and mapped instantly'],
          ['Error Rate', 'Payroll errors skew premiums', 'Zero transcription errors'],
        ],
        callout: "Every workers' comp field from your ACORD 130 flows directly into carrier portals—no rekeying, no premium-altering errors.",
      }}
      faq={{
        heading: "Questions about ACORD 130 workers' comp automation",
        items: [
          {
            q: "Does automating ACORD 130 workers' comp submissions require a carrier API?",
            a: (
              <>
                No. NativeBase uses AI-driven browser automation—it navigates carrier portals the same way a human would, filling workers&apos; comp screens automatically. No API dependency and no carrier approval needed. See the full{' '}
                <Link href="/resources/insurance/acord-to-portal" style={linkStyle}>ACORD-to-portal automation overview</Link>.
              </>
            ),
          },
          {
            q: "Is payroll and workers' comp data kept secure?",
            a: (
              <>
                Absolutely. All data is AES-256 encrypted at rest and TLS-secured in transit. We never store carrier credentials. Your clients&apos; payroll figures, experience mods, and claims history stay protected—NativeBase just eliminates the manual entry.
              </>
            ),
          },
          {
            q: 'How does NativeBase handle multi-state workers comp submissions?',
            a: (
              <>
                NativeBase&apos;s AI reads state jurisdiction details from your ACORD 130, understands state-specific class code requirements, and fills the correct fields for each state in the carrier portal. Multi-state exposures, monopolistic state requirements, and varying class code systems are all handled automatically. Your agents never have to manually navigate state-specific WC screens.
              </>
            ),
          },
          {
            q: 'Does it also automate the ACORD 125 and other supplemental forms?',
            a: (
              <>
                Yes. Workers&apos; comp submissions typically pair the ACORD 130 with the{' '}
                <Link href="/resources/insurance/acord-125-commercial-application" style={linkStyle}>ACORD 125 (Commercial Application)</Link>. NativeBase also automates the{' '}
                <Link href="/resources/insurance/acord-126-general-liability" style={linkStyle}>ACORD 126 (General Liability)</Link> and{' '}
                <Link href="/resources/insurance/acord-140-property-information" style={linkStyle}>ACORD 140 (Property)</Link>. All forms flow into carrier portals together—zero additional data entry.
              </>
            ),
          },
          {
            q: 'How long does setup take?',
            a: (
              <>
                Each workflow is automated within 48 hours. NativeBase integrates within your existing agency management system—Applied Epic, AMS360, HawkSoft, EZLynx—without disrupting your team&apos;s workflow. Your agents stop rekeying workers&apos; comp data immediately.
              </>
            ),
          },
          {
            q: 'How accurate is payroll and class code extraction?',
            a: (
              <>
                NativeBase achieves 99%+ field-level accuracy on ACORD 130 forms. Payroll figures, class codes, experience mod factors, and state jurisdictions are all extracted using AI that understands workers&apos; comp form structure—not just OCR. This eliminates the payroll entry errors that can skew premiums by thousands of dollars.
              </>
            ),
          },
        ],
        structuredData: [
          {
            question: "Does automating ACORD 130 workers' comp submissions require a carrier API?",
            answer:
              'No. NativeBase uses AI-driven browser automation that navigates carrier portals the same way a human would. No API dependency and no carrier approval needed.',
          },
          {
            question: "Is payroll and workers' comp data kept secure?",
            answer:
              'All data is AES-256 encrypted at rest and TLS-secured in transit. Carrier credentials are never stored on our servers.',
          },
          {
            question: 'How does NativeBase handle multi-state workers comp submissions?',
            answer:
              'NativeBase AI reads state jurisdiction details from your ACORD 130 and fills the correct fields for each state in the carrier portal. Multi-state exposures and varying class code systems are handled automatically.',
          },
          {
            question: 'Does it also automate the ACORD 125 and other supplemental forms?',
            answer:
              'Yes. NativeBase also automates the ACORD 125 (Commercial Application), ACORD 126 (General Liability), and ACORD 140 (Property). All forms flow into carrier portals together.',
          },
          {
            question: 'How long does setup take?',
            answer:
              'Each workflow is automated within 48 hours. NativeBase integrates within your existing agency management system without disrupting workflow.',
          },
          {
            question: 'How accurate is payroll and class code extraction?',
            answer:
              'NativeBase achieves 99%+ field-level accuracy on ACORD 130 forms. Payroll figures, class codes, experience mod factors, and state jurisdictions are all extracted using AI that understands workers comp form structure.',
          },
        ],
      }}
      cta={{
        badge: 'ACORD 130 Automation',
        heading: "Ready to stop rekeying workers' comp data into carrier portals?",
        subtitle:
          "See NativeBase read an ACORD 130 and fill WC screens automatically—your agents will never manually enter payroll data, class codes, or experience mods again.",
        primaryLabel: "See WC Automation Live",
        primarySource: 'acord-130-cta',
      }}
    />
  );
}

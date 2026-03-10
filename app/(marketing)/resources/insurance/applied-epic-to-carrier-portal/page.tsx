import type { Metadata } from 'next';
import Link from 'next/link';
import { InsuranceResourcePage } from '@/components/InsuranceResourcePage';

export const metadata: Metadata = {
  title: 'Applied Epic to Carrier Portal Bridge – Eliminate Rekeying | NativeBase',
  description:
    'Bridge Applied Epic directly to carrier portals. Policies, client data, and ACORD forms flow automatically—your agents never manually rekey data again.',
};

const crossRef = { color: 'var(--accent)', textDecoration: 'underline', fontWeight: 500 } as const;

export default function AppliedEpicToCarrierPortalPage() {
  return (
    <InsuranceResourcePage
      badge="Applied Epic Integration"
      headline={
        <>
          Applied Epic to Carrier Portal—
          <span style={{ color: '#5eead4' }}>Zero Manual Data Entry</span>
        </>
      }
      subheadline="Policies, client data, and ACORD forms already live in Applied Epic. NativeBase bridges that data directly into every carrier portal—so your agents never copy-paste or rekey again."
      subheadline2="Integrates within your existing Epic workflow. No new systems, no disruption to how your agents work."
      ctaLabel="See the Epic Bridge in Action"
      ctaSource="applied-epic-to-carrier-portal"
      calculator={{
        inputLabel: 'Epic submissions per week',
        minuteLabel: 'Minutes per submission (manual rekeying)',
        resultNote: 'Hours your agency gets back every week—revenue-generating time, not rekeying time.',
        defaultWorkflows: 35,
        defaultMinutes: 18,
      }}
      workflow={{
        sectionLabel: 'The Automated Workflow',
        heading: (
          <>
            Epic data flows to carrier portals—
            <span style={{ color: 'var(--accent)' }}>automatically, accurately</span>
          </>
        ),
        subtitle: 'NativeBase navigates carrier portals the same way a human would, but with AI—eliminating every manual step between Epic and a bindable quote.',
        steps: [
          {
            title: 'Extract Data from Applied Epic',
            duration: '30 Sec',
            description: 'NativeBase reads client records, policy details, and ACORD data directly from your Epic system—no exports, no manual steps.',
          },
          {
            title: 'AI Maps to Carrier-Specific Fields',
            duration: '45 Sec',
            description: 'AI maps every Epic field to the correct carrier-specific format—Progressive, Travelers, Liberty Mutual, Safeco, and more.',
          },
          {
            title: 'Automated Portal Navigation & Fill',
            duration: '2–3 Min',
            description: 'NativeBase opens each carrier portal, navigates every form page, and fills every field—the way your best agent would, but without errors or fatigue.',
          },
          {
            title: 'Quote Returned & Synced to Epic',
            duration: 'Done',
            description: 'Bindable quotes flow back and sync to Applied Epic automatically. No manual transcription from carrier portals back into your system.',
          },
        ],
        totalLine: (
          <>
            Total time: <strong style={{ color: 'var(--accent)' }}>Under 5 minutes</strong> from Epic to bindable quote—vs. 20+ minutes of manual rekeying per carrier
          </>
        ),
      }}
      split={{
        sectionLabel: 'The Real Difference',
        heading: 'Manual Epic Workflow vs. Automated Bridge',
        subtitle: 'The data is already in Epic. The only question is whether your agents rekey it into portals—or NativeBase does the browser work for them.',
        left: {
          label: 'Manual Process',
          heading: 'Copy from Epic. Paste into portals. Repeat.',
          bullets: [
            'Open Epic, find the client record, copy every field by hand',
            'Log into Progressive—paste name, address, VIN, coverage details',
            'Log into Travelers—paste the same data, different field layout',
            'Log into Liberty Mutual—same data, third time, third portal',
            'Mistakes compound: wrong fields, missed data, mismatched coverage codes',
            'Quotes arrive—now rekey the results back into Epic manually',
          ],
        },
        right: {
          label: 'NativeBase Automation',
          heading: 'Epic → Every Carrier. Zero Rekeying.',
          bullets: [
            'NativeBase reads directly from Applied Epic—no CSV exports needed',
            'AI maps fields to each carrier portal format automatically',
            'Browser automation navigates and fills every portal, like a human would',
            'Bindable quotes return and sync directly back to Epic',
            'Your agents stay in their existing workflow—no new system to learn',
            'Works with any carrier portal, not just API-connected ones',
          ],
        },
      }}
      comparison={{
        heading: 'Manual Epic-to-Portal vs. NativeBase Automated Bridge',
        manualLabel: 'Manual Rekeying',
        autoLabel: 'NativeBase',
        rows: [
          ['Time per submission', '18–25 min per carrier', 'Under 5 min, all carriers'],
          ['Data entry method', 'Copy-paste from Epic', 'Automatic from Epic'],
          ['Error rate', 'High (typos, missed fields)', 'Near-zero (AI-validated)'],
          ['Carrier portal logins', 'Agent logs in manually', 'Automated navigation'],
          ['Quote sync back to Epic', 'Manual rekey from portal', 'Auto-synced'],
          ['Agent productivity', '2–4 hrs/day on data entry', 'Focused on clients & sales'],
        ],
        callout: 'Epic data flows to every carrier portal and back—your agents never rekey again.',
      }}
      faq={{
        heading: 'Applied Epic Integration — Common Questions',
        items: [
          {
            q: 'How does NativeBase connect to Applied Epic?',
            a: (
              <>
                NativeBase reads data directly from your Applied Epic environment—client
                records, policy details, ACORD form data. There&apos;s no complex API integration.
                The data already in Epic flows into carrier portals automatically, and quotes
                sync back. Your agents never rekey a single field.
              </>
            ),
          },
          {
            q: 'Does this work with any carrier portal?',
            a: (
              <>
                Yes. NativeBase automates the actual browser workflow—it navigates carrier
                portals the same way a human would. That means it works with Progressive,
                Travelers, Liberty Mutual, Hartford, Safeco, and any other carrier your agency
                writes with. No carrier API access needed. See our{' '}
                <Link href="/resources/insurance/multi-carrier-automation" style={crossRef}>
                  multi-carrier automation
                </Link>{' '}
                page for more details.
              </>
            ),
          },
          {
            q: 'How is this different from ACORD form automation?',
            a: (
              <>
                ACORD automation fills ACORD forms from data. NativeBase goes beyond that:
                it takes data already in Epic—whether from ACORD forms or direct entry—and
                pushes it into carrier portals, navigating every screen and field. See our{' '}
                <Link href="/resources/insurance/acord-to-portal" style={crossRef}>
                  ACORD-to-portal automation
                </Link>{' '}
                page.
              </>
            ),
          },
          {
            q: 'We also use AMS360 for some business. Can NativeBase handle both?',
            a: (
              <>
                Absolutely. NativeBase connects to both Applied Epic and AMS360 (Vertafore).
                The same AI-driven browser automation works regardless of your management
                system. See our{' '}
                <Link href="/resources/insurance/ams360-to-carrier-portal" style={crossRef}>
                  AMS360 integration
                </Link>{' '}
                page for details.
              </>
            ),
          },
          {
            q: 'What happens when a carrier updates their portal?',
            a: (
              <>
                NativeBase uses AI to navigate portals—not brittle scripts or hardcoded
                selectors. When a carrier redesigns their portal, we proactively make updates
                where AI can&apos;t adapt automatically—so your automation keeps running.
              </>
            ),
          },
          {
            q: 'How quickly can our agency be up and running?',
            a: (
              <>
                Each workflow is automated within 48 hours. No lengthy integration, no IT project.
                NativeBase works within your existing Epic setup and starts automating carrier
                portal workflows immediately. See our{' '}
                <Link href="/resources/insurance/multi-carrier-automation" style={crossRef}>
                  multi-carrier overview
                </Link>{' '}
                for deployment details.
              </>
            ),
          },
        ],
        structuredData: [
          {
            question: 'How does NativeBase connect to Applied Epic?',
            answer:
              'NativeBase reads data directly from your Applied Epic environment—client records, policy details, ACORD form data. There is no complex API integration. The data already in Epic flows into carrier portals automatically, and quotes sync back. Your agents never rekey a single field.',
          },
          {
            question: 'Does this work with any carrier portal?',
            answer:
              'Yes. NativeBase automates the actual browser workflow—it navigates carrier portals the same way a human would. It works with Progressive, Travelers, Liberty Mutual, Hartford, Safeco, and any other carrier. No carrier API access needed.',
          },
          {
            question: 'How is this different from ACORD form automation?',
            answer:
              'ACORD automation fills ACORD forms from data. NativeBase goes beyond that: it takes data already in Epic and pushes it into carrier portals, navigating every screen and field automatically.',
          },
          {
            question: 'Can NativeBase handle both Applied Epic and AMS360?',
            answer:
              'Yes. NativeBase connects to both Applied Epic and AMS360 (Vertafore). The same AI-driven browser automation works regardless of your management system.',
          },
          {
            question: 'What happens when a carrier updates their portal?',
            answer:
              'NativeBase uses AI to navigate portals—not brittle scripts or hardcoded selectors. When a carrier redesigns their portal, we proactively make updates where AI can\'t adapt automatically so your automation keeps running.',
          },
          {
            question: 'How quickly can our agency be up and running with the Epic integration?',
            answer:
              'Each workflow is automated within 48 hours. No lengthy integration and no IT project. NativeBase works within your existing Epic setup and starts automating carrier portal workflows immediately.',
          },
        ],
      }}
      cta={{
        badge: 'Applied Epic → Carrier Portals',
        heading: 'Ready to stop rekeying Epic data into carrier portals?',
        subtitle: 'See a live demo: your Applied Epic data flows into Progressive, Travelers, Liberty Mutual, and more—bindable quotes in under 5 minutes, zero manual entry.',
        primaryLabel: 'Schedule My Epic Demo',
        primarySource: 'applied-epic-to-carrier-portal-cta',
      }}
    />
  );
}

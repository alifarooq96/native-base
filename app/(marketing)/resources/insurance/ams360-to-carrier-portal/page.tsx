import type { Metadata } from 'next';
import Link from 'next/link';
import { InsuranceResourcePage } from '@/components/InsuranceResourcePage';

export const metadata: Metadata = {
  title: 'AMS360/Vertafore to Carrier Portal Bridge – Eliminate Rekeying | NativeBase',
  description:
    'Bridge AMS360 (Vertafore) directly to carrier portals. Client info, policies, and ACORD data flow automatically—your agents never rekey data again.',
};

const crossRef = { color: 'var(--accent)', textDecoration: 'underline', fontWeight: 500 } as const;

export default function AMS360ToCarrierPortalPage() {
  return (
    <InsuranceResourcePage
      badge="AMS360 Integration"
      headline={
        <>
          AMS360 to Carrier Portal—
          <span style={{ color: '#5eead4' }}>Without Ever Rekeying Data</span>
        </>
      }
      subheadline="Your client info, policies, and ACORD data already live in AMS360. NativeBase bridges that data directly into Progressive, Travelers, Hartford, and every other carrier portal—so your agents never manually enter the same data twice."
      subheadline2="Integrates within your existing AMS360 workflow. No rip-and-replace, no new systems to learn."
      ctaLabel="See the AMS360 Bridge in Action"
      ctaSource="ams360-to-carrier-portal"
      calculator={{
        inputLabel: 'AMS360 submissions per week',
        minuteLabel: 'Minutes per submission (manual rekeying)',
        resultNote: 'Hours your agency reclaims every week—spent on clients, not copy-pasting into portals.',
        defaultWorkflows: 40,
        defaultMinutes: 18,
      }}
      workflow={{
        sectionLabel: 'The Automated Workflow',
        heading: (
          <>
            AMS360 data flows to carrier portals—
            <span style={{ color: 'var(--accent)' }}>no rekeying, no errors</span>
          </>
        ),
        subtitle: 'NativeBase navigates carrier portals the same way a human would, but with AI—so your agents never touch a carrier login screen again.',
        steps: [
          {
            title: 'Pull Data from AMS360',
            duration: '30 Sec',
            description: 'NativeBase reads client info, policy details, and ACORD data directly from your AMS360 system—no exports, no CSVs.',
          },
          {
            title: 'AI Maps Fields to Carrier Portal',
            duration: '45 Sec',
            description: 'AI intelligently maps every AMS360 field to the correct carrier-specific field—Progressive, Travelers, Hartford, and more.',
          },
          {
            title: 'Automated Portal Navigation & Fill',
            duration: '2–3 Min',
            description: 'NativeBase opens carrier portals, navigates every form, and fills every field—exactly how your best agent would, but without errors.',
          },
          {
            title: 'Quote Retrieved & Synced Back',
            duration: 'Done',
            description: 'Bindable quotes flow back automatically. No manual transcription from portal to AMS360—everything stays in sync.',
          },
        ],
        totalLine: (
          <>
            Total time: <strong style={{ color: 'var(--accent)' }}>Under 5 minutes</strong> from AMS360 to bindable quote—vs. 20+ minutes of manual rekeying per carrier
          </>
        ),
      }}
      split={{
        sectionLabel: 'The Real Difference',
        heading: 'Manual AMS360 Workflow vs. Automated Bridge',
        subtitle: 'Your agents already have the data in AMS360. The only question is whether they rekey it—or let NativeBase handle the browser work.',
        left: {
          label: 'Manual Process',
          heading: 'Copy from AMS360. Paste into portals. Repeat.',
          bullets: [
            'Open AMS360, find the client, copy each field one by one',
            'Log into Progressive—paste name, address, VIN, coverage limits',
            'Log into Travelers—paste the same data again, different field layout',
            'Log into Hartford—same data, third time, third portal',
            'Errors multiply: typos, missed fields, wrong coverage codes',
            'Quotes come back—now rekey the results back into AMS360',
          ],
        },
        right: {
          label: 'NativeBase Automation',
          heading: 'AMS360 → Every Carrier. Zero Rekeying.',
          bullets: [
            'NativeBase reads directly from AMS360—no manual export needed',
            'AI maps fields to each carrier portal automatically',
            'Browser automation fills every portal form, navigating like a human',
            'Bindable quotes return and sync back to AMS360',
            'Your agents never leave their existing workflow',
            'Works with any carrier portal—not limited to API-connected carriers',
          ],
        },
      }}
      comparison={{
        heading: 'Manual AMS360-to-Portal vs. NativeBase Automated Bridge',
        manualLabel: 'Manual Rekeying',
        autoLabel: 'NativeBase',
        rows: [
          ['Time per submission', '18–25 min per carrier', 'Under 5 min, all carriers'],
          ['Data entry method', 'Copy-paste from AMS360', 'Automatic from AMS360'],
          ['Error rate', 'High (typos, missed fields)', 'Near-zero (AI-validated)'],
          ['Carrier portal logins', 'Agent logs in manually each time', 'Automated navigation'],
          ['Quote sync back to AMS360', 'Manual rekey from portal', 'Auto-synced'],
          ['Agent time per day', '2–4 hours rekeying', 'Spent on clients, not data entry'],
        ],
        callout: 'AMS360 data flows to every carrier portal and back—your agents never rekey again.',
      }}
      faq={{
        heading: 'AMS360 Integration — Common Questions',
        items: [
          {
            q: 'How does NativeBase connect to AMS360 (Vertafore)?',
            a: (
              <>
                NativeBase reads data directly from your AMS360 environment—client records,
                policy details, ACORD form data. There's no complex API integration to build.
                The data that's already in AMS360 flows into carrier portals automatically,
                and quotes sync back. Your agents never rekey a single field.
              </>
            ),
          },
          {
            q: 'Does this work with any carrier portal, or only specific ones?',
            a: (
              <>
                NativeBase automates the actual browser workflow—it navigates carrier portals
                the same way a human would. That means it works with Progressive, Travelers,
                Hartford, Liberty Mutual, and any other carrier your agency writes with. No
                carrier API access required. See our{' '}
                <Link href="/resources/insurance/multi-carrier-automation" style={crossRef}>
                  multi-carrier automation
                </Link>{' '}
                page for more.
              </>
            ),
          },
          {
            q: 'How is this different from ACORD form automation?',
            a: (
              <>
                ACORD automation typically fills ACORD forms from data. NativeBase goes further:
                it takes the data already in AMS360—whether it originated from ACORD forms or
                direct entry—and pushes it directly into carrier portals, navigating every screen
                and field. Learn more about our{' '}
                <Link href="/resources/insurance/acord-to-portal" style={crossRef}>
                  ACORD-to-portal automation
                </Link>.
              </>
            ),
          },
          {
            q: 'We also use Applied Epic for some books. Does NativeBase support both?',
            a: (
              <>
                Yes. NativeBase connects to both AMS360 and Applied Epic. The same AI-driven
                browser automation works regardless of your management system. See our{' '}
                <Link href="/resources/insurance/applied-epic-to-carrier-portal" style={crossRef}>
                  Applied Epic integration
                </Link>{' '}
                page for details.
              </>
            ),
          },
          {
            q: 'What happens when a carrier changes their portal layout?',
            a: (
              <>
                Because NativeBase uses AI to navigate portals—not brittle scripts or static
                selectors—we proactively make updates when AI can't adapt to portal changes. Our AI
                continuously learns portal structures, so your automation doesn't break when
                a carrier redesigns their site.
              </>
            ),
          },
          {
            q: 'How fast can we get started?',
            a: (
              <>
                Each workflow is automated within 48 hours. There's no lengthy integration project,
                no IT involvement needed. NativeBase works within your existing AMS360 setup
                and starts automating carrier portal workflows immediately. Check the{' '}
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
            question: 'How does NativeBase connect to AMS360 (Vertafore)?',
            answer:
              'NativeBase reads data directly from your AMS360 environment—client records, policy details, ACORD form data. There is no complex API integration to build. The data already in AMS360 flows into carrier portals automatically, and quotes sync back. Your agents never rekey a single field.',
          },
          {
            question: 'Does this work with any carrier portal, or only specific ones?',
            answer:
              'NativeBase automates the actual browser workflow—it navigates carrier portals the same way a human would. That means it works with Progressive, Travelers, Hartford, Liberty Mutual, and any other carrier your agency writes with. No carrier API access required.',
          },
          {
            question: 'How is this different from ACORD form automation?',
            answer:
              'ACORD automation typically fills ACORD forms from data. NativeBase goes further: it takes the data already in AMS360 and pushes it directly into carrier portals, navigating every screen and field automatically.',
          },
          {
            question: 'Does NativeBase support both AMS360 and Applied Epic?',
            answer:
              'Yes. NativeBase connects to both AMS360 and Applied Epic. The same AI-driven browser automation works regardless of your management system.',
          },
          {
            question: 'What happens when a carrier changes their portal layout?',
            answer:
              'NativeBase uses AI to navigate portals—not brittle scripts or static selectors. We proactively make updates where AI can\'t adapt when carrier portals change, so your automation keeps running when a carrier redesigns their site.',
          },
          {
            question: 'How fast can we get started with the AMS360 integration?',
            answer:
              'Each workflow is automated within 48 hours. There is no lengthy integration project and no IT involvement needed. NativeBase works within your existing AMS360 setup and starts automating carrier portal workflows immediately.',
          },
        ],
      }}
      cta={{
        badge: 'AMS360 → Carrier Portals',
        heading: 'Ready to stop rekeying AMS360 data into carrier portals?',
        subtitle: 'See a live demo: your AMS360 data flows into Progressive, Travelers, Hartford, and more—bindable quotes in under 5 minutes, zero manual entry.',
        primaryLabel: 'Schedule My AMS360 Demo',
        primarySource: 'ams360-to-carrier-portal-cta',
      }}
    />
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { InsuranceResourcePage } from '@/components/InsuranceResourcePage';

export const metadata: Metadata = {
  title: 'NativeBase vs. Traditional Rating Engines – Any Carrier, No APIs | NativeBase',
  description:
    'Traditional rating engines need carrier APIs, cost a fortune, and only work with participating carriers. NativeBase automates any carrier portal via AI browser automation—no APIs, fast setup, lower cost.',
};

const crossRef = { color: 'var(--accent)', textDecoration: 'underline', fontWeight: 500 } as const;

export default function NativeBaseVsRatingEnginesPage() {
  return (
    <InsuranceResourcePage
      badge="NativeBase vs. Rating Engines"
      headline={
        <>
          Any Carrier Portal.{' '}
          <span style={{ color: '#5eead4' }}>No API Required.</span>
        </>
      }
      subheadline="Traditional rating engines only work with carriers that provide API access—and cost a fortune to integrate. NativeBase automates the actual browser workflow, so it works with ANY carrier portal, deploys in days, and costs a fraction of a rating engine."
      subheadline2="Your agents never rekey data again—whether the carrier has an API or not."
      ctaLabel="See NativeBase vs. Rating Engines"
      ctaSource="nativebase-vs-rating-engines"
      calculator={{
        inputLabel: 'Quotes per week (all carriers)',
        minuteLabel: 'Minutes per quote (manual entry)',
        resultNote: "Hours saved vs. manual entry—with ANY carrier, not just API-connected ones.",
        defaultWorkflows: 45,
        defaultMinutes: 18,
      }}
      workflow={{
        sectionLabel: 'How NativeBase Works',
        heading: (
          <>
            No APIs. No integrations.{' '}
            <span style={{ color: 'var(--accent)' }}>Just automation.</span>
          </>
        ),
        subtitle: 'NativeBase skips the API layer entirely. AI navigates carrier portals the same way a human agent would—but faster, more accurately, and with any carrier.',
        steps: [
          {
            title: 'No API Integration Needed',
            duration: 'Zero Setup',
            description: 'Unlike rating engines that require months of API integration per carrier, NativeBase works out of the box. No carrier APIs, no custom development.',
          },
          {
            title: 'Works with Any Carrier Portal',
            duration: 'Universal',
            description: 'Progressive, Travelers, Hartford, Liberty Mutual, regional carriers, specialty markets—if it has a web portal, NativeBase automates it.',
          },
          {
            title: 'AI Navigates Like a Human Agent',
            duration: '2–3 Min',
            description: 'AI opens the carrier portal, navigates forms, fills every field, and handles page transitions—the same workflow a human would perform, but without errors.',
          },
          {
            title: 'Bindable Quote in Minutes',
            duration: 'Done',
            description: 'A real, bindable quote from the carrier portal—not an estimate, not a range. The same quote your agent would get manually, in a fraction of the time.',
          },
        ],
        totalLine: (
          <>
            From data to bindable quote: <strong style={{ color: 'var(--accent)' }}>under 5 minutes</strong> with any carrier—no API access required
          </>
        ),
      }}
      split={{
        sectionLabel: 'The Core Difference',
        heading: 'Rating Engines vs. NativeBase Automation',
        subtitle: 'Rating engines depend on carrier APIs. NativeBase automates the browser. The difference affects every part of your agency.',
        left: {
          label: 'Traditional Rating Engine',
          heading: 'API-Dependent. Limited Carriers. Expensive.',
          bullets: [
            'Only works with carriers that provide API access (a shrinking list)',
            '$50,000–150,000+ setup costs with multi-month implementation',
            'Ongoing maintenance fees when carriers change their APIs',
            'Returns estimated rates—not always bindable quotes',
            'New carrier? Another API integration project',
            'Your agents still rekey data for non-API carriers',
          ],
        },
        right: {
          label: 'NativeBase Automation',
          heading: 'Any Portal. Fast Setup. Real Quotes.',
          bullets: [
            'Works with ANY carrier portal—no API access required',
            'Each workflow automated in 48 hours, starting at $2,499/mo',
            'We proactively make updates where AI can\'t adapt—your automation keeps running',
            'Returns real, bindable quotes directly from carrier portals',
            'New carrier? We kick off coverage instantly; full integration follows (not same-day)',
            'Your agents never rekey data into any carrier portal again',
          ],
        },
      }}
      comparison={{
        heading: 'Traditional Rating Engine vs. NativeBase',
        manualLabel: 'Rating Engine',
        autoLabel: 'NativeBase',
        rows: [
          ['Carrier coverage', 'API carriers only (limited)', 'Any carrier with a portal'],
          ['Setup time', '3–6 months', 'Each workflow in 48 hours'],
          ['Setup cost', '$50K–150K+', 'Starting at $2,499/mo'],
          ['Ongoing maintenance', 'API changes break it', 'We proactively update when AI can\'t adapt'],
          ['Quote accuracy', 'Estimated rates', 'Bindable portal quotes'],
          ['Adding new carriers', 'New API project each time', 'Kick off instantly; full integration not same-day'],
        ],
        callout: 'NativeBase works with every carrier portal—no APIs, no six-figure integration, no months of waiting. Your agents never rekey data again.',
      }}
      faq={{
        heading: 'NativeBase vs. Rating Engines — Questions',
        items: [
          {
            q: 'Why doesn\'t NativeBase need carrier APIs?',
            a: (
              <>
                NativeBase automates the browser-based workflow—the same way a human agent
                navigates carrier portals. AI opens the portal, logs in, fills forms, navigates
                pages, and retrieves quotes. Since it uses the carrier's own web interface,
                there's no API to integrate. If a carrier has a web portal, NativeBase works with it.
              </>
            ),
          },
          {
            q: 'Are the quotes from NativeBase real bindable quotes or estimates?',
            a: (
              <>
                Real, bindable quotes. NativeBase completes the actual carrier portal workflow—the
                same one your agent would complete manually. The quote that comes back is the same
                quote your agent would see on-screen, ready to bind. Rating engines often return
                estimated rates that may change at bind time.
              </>
            ),
          },
          {
            q: 'How many carriers does NativeBase support vs. a typical rating engine?',
            a: (
              <>
                Rating engines are limited to carriers with active API partnerships—typically
                15–30 carriers. NativeBase works with any carrier that has a web portal, which
                is effectively every carrier. Regional carriers, specialty markets, and niche
                carriers that never offer API access all work with NativeBase. See our{' '}
                <Link href="/resources/insurance/multi-carrier-automation" style={crossRef}>
                  multi-carrier automation
                </Link>{' '}
                page for details.
              </>
            ),
          },
          {
            q: 'What happens when a carrier changes their portal?',
            a: (
              <>
                When carriers update their portal UI, we proactively work to make updates
                where AI can't adapt automatically—so your automation keeps running. With rating
                engines, an API change breaks your integration until the vendor patches it.
                NativeBase keeps portal changes from causing downtime.
              </>
            ),
          },
          {
            q: 'Can NativeBase work alongside a rating engine we already have?',
            a: (
              <>
                Yes. Many agencies use NativeBase to cover carriers their rating engine doesn't
                support. Use your rating engine for its API-connected carriers, and NativeBase
                for everything else—regional carriers, specialty markets, and any portal the
                rating engine can't reach. Together, you cover every carrier without manual
                data entry. See our{' '}
                <Link href="/resources/insurance/roi-calculator-manual-data-entry" style={crossRef}>
                  ROI calculator
                </Link>{' '}
                to quantify the savings.
              </>
            ),
          },
          {
            q: 'How does NativeBase integrate with our existing management system?',
            a: (
              <>
                NativeBase integrates within your existing agency management system—AMS360,
                Applied Epic, or others—without disrupting your agents' workflow. Data flows
                from your system into carrier portals, and quotes flow back. No rip-and-replace,
                no new system to learn. See our{' '}
                <Link href="/resources/insurance/acord-to-portal" style={crossRef}>
                  ACORD-to-portal
                </Link>{' '}
                and{' '}
                <Link href="/resources/insurance/agent-portal-quote-to-bind" style={crossRef}>
                  quote-to-bind
                </Link>{' '}
                pages for workflow details.
              </>
            ),
          },
        ],
        structuredData: [
          {
            question: 'Why doesn\'t NativeBase need carrier APIs?',
            answer:
              'NativeBase automates the browser-based workflow—the same way a human agent navigates carrier portals. AI opens the portal, logs in, fills forms, navigates pages, and retrieves quotes. Since it uses the carrier\'s own web interface, there is no API to integrate. If a carrier has a web portal, NativeBase works with it.',
          },
          {
            question: 'Are the quotes from NativeBase real bindable quotes or estimates?',
            answer:
              'Real, bindable quotes. NativeBase completes the actual carrier portal workflow—the same one an agent would complete manually. The quote that comes back is the same quote an agent would see on-screen, ready to bind. Rating engines often return estimated rates that may change at bind time.',
          },
          {
            question: 'How many carriers does NativeBase support vs. a typical rating engine?',
            answer:
              'Rating engines are limited to carriers with active API partnerships—typically 15-30 carriers. NativeBase works with any carrier that has a web portal, which is effectively every carrier. Regional carriers, specialty markets, and niche carriers that never offer API access all work with NativeBase.',
          },
          {
            question: 'What happens when a carrier changes their portal?',
            answer:
              'When carriers update their portal UI, we proactively work to make updates where AI can\'t adapt automatically—so your automation keeps running. With rating engines, an API change breaks your integration until the vendor patches it. NativeBase keeps portal changes from causing downtime.',
          },
          {
            question: 'Can NativeBase work alongside a rating engine we already have?',
            answer:
              'Yes. Many agencies use NativeBase to cover carriers their rating engine does not support. Use the rating engine for its API-connected carriers, and NativeBase for everything else—regional carriers, specialty markets, and any portal the rating engine cannot reach.',
          },
          {
            question: 'How does NativeBase integrate with existing agency management systems?',
            answer:
              'NativeBase integrates within your existing agency management system—AMS360, Applied Epic, or others—without disrupting agent workflow. Data flows from your system into carrier portals, and quotes flow back. No rip-and-replace, no new system to learn.',
          },
        ],
      }}
      cta={{
        badge: 'Any Carrier. No APIs.',
        heading: 'Ready to automate every carrier portal—not just API-connected ones?',
        subtitle: 'See how NativeBase delivers bindable quotes from any carrier portal in under 5 minutes, with zero API integration and zero rekeying.',
        primaryLabel: 'See NativeBase in Action',
        primarySource: 'nativebase-vs-rating-engines-cta',
      }}
    />
  );
}

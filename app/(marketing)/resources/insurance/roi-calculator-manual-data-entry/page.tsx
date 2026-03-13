import Link from 'next/link';
import { InsuranceResourcePage } from '@/components/InsuranceResourcePage';

import { buildSeoMetadata } from '@/lib/page-metadata';
export const metadata = buildSeoMetadata({
  title: 'ROI Calculator: Cost of Manual ACORD Data Entry | NativeBase',
  description:
    'See the real cost of manual data entry—labor, errors, missed quotes, and slower bind times. Calculate how much your agency loses to rekeying and how NativeBase eliminates it.',
  path: '/resources/insurance/roi-calculator-manual-data-entry/',
});

const crossRef = { color: 'var(--accent)', textDecoration: 'underline', fontWeight: 500 } as const;

export default function ROICalculatorManualDataEntryPage() {
  return (
    <InsuranceResourcePage
      badge="ROI Calculator"
      headline={
        <>
          The Real Cost of{' '}
          <span style={{ color: '#5eead4' }}>Manual Data Entry</span>
        </>
      }
      subheadline="Every minute an agent spends rekeying ACORD data into carrier portals is lost revenue. Calculate what manual entry actually costs your agency—and see what happens when you eliminate it entirely."
      subheadline2="NativeBase automates every browser-based workflow your agents currently perform by hand. No more rekeying. No more lost hours."
      ctaLabel="Calculate Your Agency's ROI"
      ctaSource="roi-calculator-manual-data-entry"
      calculator={{
        inputLabel: 'Manual submissions per week',
        minuteLabel: 'Minutes per submission (manual entry)',
        resultNote: "That's billable hours your agency gets back—revenue, not rekeying.",
        defaultWorkflows: 50,
        defaultMinutes: 20,
      }}
      workflow={{
        sectionLabel: 'Quantify the Cost',
        heading: (
          <>
            Four steps to see what manual entry{' '}
            <span style={{ color: 'var(--accent)' }}>really costs</span>
          </>
        ),
        subtitle: 'Most agencies underestimate the cost of rekeying. This framework shows the full picture—labor, errors, rework, and opportunity cost.',
        steps: [
          {
            title: 'Measure Current Manual Effort',
            duration: 'Step 1',
            description: 'Count how many submissions your agents manually key per week, and how many minutes each one takes. The numbers are usually worse than expected.',
          },
          {
            title: 'Calculate Error & Rework Costs',
            duration: 'Step 2',
            description: 'Every rekeyed submission has an error risk. Wrong VIN, mismatched coverage, typo in a driver name—each one means rework, delays, and sometimes lost business.',
          },
          {
            title: 'See the Automated Alternative',
            duration: 'Step 3',
            description: 'NativeBase automates the same browser workflows your agents do manually. AI navigates carrier portals, fills every field, and retrieves quotes—no human data entry.',
          },
          {
            title: 'Quantify Annual Savings',
            duration: 'Step 4',
            description: 'Multiply hours saved × hourly cost × 52 weeks. Add the value of faster quotes, fewer errors, and more policies bound. The ROI is immediate.',
          },
        ],
        totalLine: (
          <>
            Most agencies save <strong style={{ color: 'var(--accent)' }}>1,500+ hours per year</strong> by eliminating manual data entry—that&apos;s revenue your team earns back
          </>
        ),
      }}
      split={{
        sectionLabel: 'The Hidden Cost',
        heading: 'Manual Entry vs. The NativeBase ROI',
        subtitle: 'Rekeying feels like "just part of the job." But when you add it up, the cost is staggering—and entirely avoidable.',
        left: {
          label: 'The Hidden Cost of Manual Entry',
          heading: 'Every Rekey Has a Price Tag',
          bullets: [
            '18–25 minutes per submission × dozens of submissions per week',
            'Agents spending 2–4 hours daily on data entry instead of selling',
            'Error rates of 5–15% on manually rekeyed data',
            'Rework cycles when carriers flag incorrect submissions',
            'Slower bind times mean competitors quote first',
            'Agent burnout from repetitive, low-value work',
          ],
        },
        right: {
          label: 'The NativeBase ROI',
          heading: 'Eliminate the Cost. Keep the Revenue.',
          bullets: [
            'Under 5 minutes per submission—automated, not manual',
            'Agents reclaim 2–4 hours per day for client-facing work',
            'Near-zero error rate with AI-validated field mapping',
            'No rework cycles—data is accurate the first time',
            'Faster quotes mean more policies bound per week',
            'Agents focus on relationships and revenue, not keyboards',
          ],
        },
      }}
      comparison={{
        heading: 'Cost of Manual Entry vs. NativeBase Automation',
        manualLabel: 'Manual Entry',
        autoLabel: 'NativeBase',
        rows: [
          ['Time per submission', '18–25 minutes', 'Under 5 minutes'],
          ['Error rate', '5–15% (typos, mismatches)', 'Near-zero (AI-validated)'],
          ['Cost per quote', '$12–18 in labor alone', 'Under $3 fully automated'],
          ['Annual labor on data entry', '$45,000–75,000+', 'Eliminated'],
          ['Quotes per agent per day', '8–12 (bottlenecked by rekeying)', '25–40+ (automated)'],
          ['Time to bindable quote', '20+ min per carrier', 'Under 5 min, any carrier'],
        ],
        callout: 'Manual data entry costs your agency tens of thousands per year. NativeBase eliminates it—your agents never rekey again.',
      }}
      faq={{
        heading: 'ROI & Cost of Manual Entry — Questions',
        items: [
          {
            q: 'How much does manual data entry actually cost an average agency?',
            a: (
              <>
                For a mid-size agency processing 40–60 submissions per week, manual data entry
                consumes 30–50 hours of agent time weekly. At loaded labor costs of $25–35/hour,
                that&apos;s $39,000–91,000 per year spent on rekeying—before accounting for errors,
                rework, and lost quotes.
              </>
            ),
          },
          {
            q: 'What is the error rate on manually rekeyed data?',
            a: (
              <>
                Industry studies show 5–15% of manually entered insurance submissions contain
                errors—wrong VINs, mismatched coverage codes, misspelled names. Each error
                triggers a rework cycle that adds 15–30 minutes and can delay the bind. NativeBase
                eliminates this with AI-validated field mapping.
              </>
            ),
          },
          {
            q: 'How does NativeBase eliminate manual data entry?',
            a: (
              <>
                NativeBase automates the browser-based workflows your agents currently perform
                by hand. AI navigates carrier portals the same way a human would—logging in,
                navigating forms, filling every field—but without errors or fatigue. Your agents
                never touch a carrier portal for data entry again. See our{' '}
                <Link href="/resources/insurance/acord-to-portal" style={crossRef}>
                  ACORD-to-portal automation
                </Link>{' '}
                for the technical details.
              </>
            ),
          },
          {
            q: 'How quickly do agencies see ROI after deploying NativeBase?',
            a: (
              <>
                Most agencies see positive ROI within the first week. Deployment takes under
                48 hours, and the time savings are immediate—agents go from spending 18–25
                minutes per manual submission to under 5 minutes with automation. The math
                is straightforward: more quotes per day, fewer errors, faster binds.
              </>
            ),
          },
          {
            q: 'Does this work with our existing management system (AMS360, Epic, etc.)?',
            a: (
              <>
                Yes. NativeBase integrates within your existing agency management system—whether
                that&apos;s AMS360, Applied Epic, or another system. There&apos;s no rip-and-replace. Your
                agents keep their workflow; we automate the carrier portal data entry. See the{' '}
                <Link href="/resources/insurance/multi-carrier-automation" style={crossRef}>
                  multi-carrier automation
                </Link>{' '}
                page for more.
              </>
            ),
          },
          {
            q: 'How does NativeBase compare to traditional rating engines for ROI?',
            a: (
              <>
                Traditional rating engines require carrier APIs, expensive integrations, and only
                work with participating carriers. NativeBase works with any carrier portal—no API
                needed—and deploys in days, not months. The ROI is faster because there&apos;s no
                upfront integration cost. See our{' '}
                <Link href="/resources/insurance/nativebase-vs-rating-engines" style={crossRef}>
                  NativeBase vs. rating engines
                </Link>{' '}
                comparison.
              </>
            ),
          },
        ],
        structuredData: [
          {
            question: 'How much does manual data entry actually cost an average agency?',
            answer:
              'For a mid-size agency processing 40-60 submissions per week, manual data entry consumes 30-50 hours of agent time weekly. At loaded labor costs of $25-35/hour, that is $39,000-91,000 per year spent on rekeying—before accounting for errors, rework, and lost quotes.',
          },
          {
            question: 'What is the error rate on manually rekeyed data?',
            answer:
              'Industry studies show 5-15% of manually entered insurance submissions contain errors—wrong VINs, mismatched coverage codes, misspelled names. Each error triggers a rework cycle that adds 15-30 minutes and can delay the bind.',
          },
          {
            question: 'How does NativeBase eliminate manual data entry?',
            answer:
              'NativeBase automates the browser-based workflows agents currently perform by hand. AI navigates carrier portals the same way a human would—logging in, navigating forms, filling every field—but without errors or fatigue. Agents never touch a carrier portal for data entry again.',
          },
          {
            question: 'How quickly do agencies see ROI after deploying NativeBase?',
            answer:
              'Most agencies see positive ROI within the first week. Each workflow is automated within 48 hours, and the time savings are immediate—agents go from spending 18-25 minutes per manual submission to under 5 minutes with automation.',
          },
          {
            question: 'Does NativeBase work with existing management systems like AMS360 and Applied Epic?',
            answer:
              'Yes. NativeBase integrates within your existing agency management system—whether that is AMS360, Applied Epic, or another system. There is no rip-and-replace. Agents keep their workflow while NativeBase automates the carrier portal data entry.',
          },
          {
            question: 'How does NativeBase compare to traditional rating engines for ROI?',
            answer:
              'Traditional rating engines require carrier APIs, expensive integrations, and only work with participating carriers. NativeBase works with any carrier portal—no API needed—and deploys in days, not months. The ROI is faster because there is no upfront integration cost.',
          },
        ],
      }}
      cta={{
        badge: 'Stop Paying for Rekeying',
        heading: 'Ready to eliminate the cost of manual data entry?',
        subtitle: 'See the ROI for your agency: calculate your current rekeying cost, then watch NativeBase eliminate it in a live demo.',
        primaryLabel: 'Calculate My ROI & See a Demo',
        primarySource: 'roi-calculator-manual-data-entry-cta',
      }}
    />
  );
}

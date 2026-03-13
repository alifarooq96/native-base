import Link from 'next/link';
import { InsuranceResourcePage } from '@/components/InsuranceResourcePage';

import { buildSeoMetadata } from '@/lib/page-metadata';
export const metadata = buildSeoMetadata({
  title: 'Northland (Travelers) Trucking Submission Automation | NativeBase',
  description:
    'Automate Northland/Travelers trucking submissions: driver list uploads, vehicle schedules from ACORD 125, MCS-90 and BMC-91X/Form E—no rekeying into the carrier portal.',
  path: '/resources/insurance/northland-travelers-trucking-automation/',
});

const crossRef = { color: 'var(--accent)', textDecoration: 'underline' as const, fontWeight: 500 };

export default function NorthlandTravelersTruckingPage() {
  return (
    <InsuranceResourcePage
      badge="Northland / Travelers Trucking"
      headline={
        <>
          Northland (Travelers) Trucking Submissions—{' '}
          <span style={{ color: '#5eead4' }}>Fully Automated</span>
        </>
      }
      subheadline="Stop rekeying driver lists, vehicle schedules, and endorsement data into Northland and Travelers trucking portals. NativeBase automates driver list uploads, extracts vehicle schedule data and VINs from ACORD 125, and handles MCS-90 and BMC-91X/Form E so your agents never type the same data twice."
      subheadline2="Integrates with your existing workflow. Each trucking submission is automated within 48 hours."
      ctaLabel="See Northland/Travelers Trucking Automation Live"
      ctaSource="northland-travelers-trucking"
      calculator={{
        inputLabel: 'Northland/Travelers trucking submissions per week',
        minuteLabel: 'Minutes per submission (manual)',
        resultNote: 'Time back for your team—no manual driver or vehicle schedule entry.',
        defaultWorkflows: 10,
        defaultMinutes: 25,
      }}
      workflow={{
        sectionLabel: 'How It Works',
        heading: (
          <>
            From ACORD 125 to Northland/Travelers trucking quote—
            <span style={{ color: 'var(--accent)' }}> zero rekeying</span>
          </>
        ),
        subtitle:
          'Driver lists, vehicle schedules, MCS-90, and BMC-91X/Form E flow automatically into Northland (Travelers) trucking submission portals.',
        steps: [
          {
            title: 'Driver List & Vehicle Data Ready',
            duration: '0 Sec',
            description:
              'Driver list upload for carrier portals is automated—no manual CSV or form entry. Vehicle schedule data and VINs are extracted from ACORD 125 (or PDFs); trucking equipment schedules flow in without rekeying.',
          },
          {
            title: 'MCS-90 & BMC-91X / Form E',
            duration: '30 Sec',
            description:
              'NativeBase automates MCS-90 endorsement data and BMC-91X/Form E automation for agents—mapping limits, effective dates, and form fields into the Northland/Travelers trucking portal.',
          },
          {
            title: 'Portal Auto-Fill',
            duration: '2–3 Min',
            description:
              'AI navigates the Northland (Travelers) trucking submission portal: uploads driver lists, fills vehicle schedules, and completes every screen—same way a human would, without the typing.',
          },
          {
            title: 'Bindable Quote',
            duration: 'Done',
            description:
              'Northland/Travelers returns a trucking rate. Your agent reviews and binds—no manual data entry, no toggling between ACORD and the portal.',
          },
        ],
        totalLine: (
          <>
            Total time: <strong style={{ color: 'var(--accent)' }}>Under 5 minutes</strong> vs. 25+ minutes of manual rekeying
          </>
        ),
      }}
      split={{
        sectionLabel: 'The Difference',
        heading: 'Manual trucking submissions vs. automated',
        subtitle:
          'Northland and Travelers trucking submissions mean driver lists, vehicle schedules, and endorsements. NativeBase automates all of it.',
        left: {
          label: 'Manual Process',
          heading: 'Rekeying Drivers, VINs, and Endorsements',
          bullets: [
            'Manually build driver lists and upload or paste into Northland/Travelers portals',
            'Type vehicle schedule data and VINs from ACORD 125 or PDFs field by field',
            'Enter MCS-90 and BMC-91X/Form E data by hand',
            '20–30+ minutes per submission; errors trigger requotes',
          ],
        },
        right: {
          label: 'Automated with NativeBase',
          heading: 'Driver Lists, Schedules, and Endorsements—Automated',
          bullets: [
            'Automate driver list upload for carrier portals—Northland and Travelers included',
            'Vehicle schedule data extraction from PDF; VINs from ACORD 125—trucking equipment schedules automated',
            'MCS-90 endorsement data and BMC-91X/Form E automation for agents—mapped into portal',
            'Under 5 minutes from data to bindable Northland/Travelers trucking quote',
          ],
        },
      }}
      comparison={{
        heading: 'Manual vs. Automated Northland (Travelers) Trucking Submissions',
        manualLabel: 'Manual',
        autoLabel: 'NativeBase',
        rows: [
          ['Driver list upload', 'Manual CSV/form entry each time', 'Automated driver list upload for carrier portals'],
          ['Vehicle schedule / VINs', 'Type from ACORD 125 or PDF', 'Extract from ACORD 125; automate trucking equipment schedules'],
          ['MCS-90 data', 'Rekey endorsement data', 'Automate MCS-90 endorsement data into portal'],
          ['BMC-91X / Form E', 'Manual form entry', 'BMC-91X and Form E automation for agents'],
          ['Time per submission', '20–30+ min', 'Under 5 min'],
        ],
        callout: 'Northland (Travelers) trucking submissions without rekeying—driver lists, vehicle schedules, and endorsements automated.',
      }}
      faq={{
        heading: 'Northland (Travelers) Trucking — Questions',
        items: [
          {
            q: 'How does driver list upload work for Northland/Travelers?',
            a: (
              <>
                NativeBase automates driver list upload for carrier portals—including Northland and Travelers trucking
                submission portals. Your driver data is mapped and uploaded without manual entry. See our{' '}
                <Link href="/resources/insurance/acord-to-travelers/" style={crossRef}>
                  ACORD to Travelers
                </Link>{' '}
                page for the full bridge.
              </>
            ),
          },
          {
            q: 'Can you extract vehicle schedule data and VINs from ACORD 125 or PDFs?',
            a: (
              <>
                Yes. We automate vehicle schedule data extraction from PDF and extract VINs from ACORD 125 so trucking
                equipment schedules flow into Northland/Travelers portals—without manual entry. Your agents don&apos;t
                type VINs or equipment lists twice.
              </>
            ),
          },
          {
            q: 'Do you handle MCS-90 and BMC-91X / Form E?',
            a: (
              <>
                Yes. NativeBase automates MCS-90 endorsement data and BMC-91X/Form E automation for agents—mapping
                into the Northland (Travelers) trucking portal so you never rekey endorsement data.
              </>
            ),
          },
          {
            q: 'How long until we can run Northland/Travelers trucking submissions?',
            a: 'Each workflow is automated within 48 hours. We work within your existing tools and don&apos;t disrupt agent workflow—your team can start running trucking submissions without rekeying.',
          },
          {
            q: 'Does this work with our agency management system?',
            a: (
              <>
                Yes. NativeBase integrates with your existing AMS. Data from ACORD 125, driver lists, and endorsement
                forms flows into Northland/Travelers portals automatically. See{' '}
                <Link href="/resources/insurance/multi-carrier-automation/" style={crossRef}>
                  multi-carrier automation
                </Link>{' '}
                for more.
              </>
            ),
          },
        ],
        structuredData: [
          {
            question: 'How does driver list upload work for Northland/Travelers?',
            answer:
              'NativeBase automates driver list upload for Northland and Travelers trucking submission portals. Driver data is mapped and uploaded without manual entry.',
          },
          {
            question: 'Can you extract vehicle schedule data and VINs from ACORD 125 or PDFs?',
            answer:
              'Yes. We automate vehicle schedule data extraction from PDF and extract VINs from ACORD 125 so trucking equipment schedules flow into Northland/Travelers portals without manual entry.',
          },
          {
            question: 'Do you handle MCS-90 and BMC-91X / Form E?',
            answer:
              'Yes. NativeBase automates MCS-90 endorsement data and BMC-91X/Form E automation for agents, mapping into the Northland (Travelers) trucking portal.',
          },
          {
            question: 'How long until we can run Northland/Travelers trucking submissions?',
            answer:
              'Each workflow is automated within 48 hours. We work within your existing tools and do not disrupt agent workflow.',
          },
          {
            question: 'Does this work with our agency management system?',
            answer:
              'Yes. NativeBase integrates with your existing AMS. Data from ACORD 125, driver lists, and endorsement forms flows into Northland/Travelers portals automatically.',
          },
        ],
      }}
      cta={{
        badge: 'Northland / Travelers Trucking',
        heading: 'Ready to automate Northland (Travelers) trucking submissions?',
        subtitle:
          'Driver list uploads, vehicle schedules from ACORD 125, MCS-90 and BMC-91X/Form E—all automated. No rekeying.',
        primaryLabel: 'Book a Demo',
        primarySource: 'northland-travelers-trucking-cta',
      }}
    />
  );
}

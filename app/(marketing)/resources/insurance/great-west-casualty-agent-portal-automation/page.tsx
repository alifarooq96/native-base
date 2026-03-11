import type { Metadata } from 'next';
import Link from 'next/link';
import { InsuranceResourcePage } from '@/components/InsuranceResourcePage';

export const metadata: Metadata = {
  title: 'Great West Casualty Agent Portal Automation | NativeBase',
  description:
    'Automate commercial trucking submissions to Great West Casualty: driver list uploads, vehicle schedules from ACORD 125, MCS-90 and BMC-91X/Form E—no rekeying into the agent portal.',
};

const crossRef = { color: 'var(--accent)', textDecoration: 'underline' as const, fontWeight: 500 };

export default function GreatWestCasualtyAgentPortalPage() {
  return (
    <InsuranceResourcePage
      badge="Great West Casualty"
      headline={
        <>
          Great West Casualty Agent Portal—{' '}
          <span style={{ color: '#5eead4' }}>Fully Automated</span>
        </>
      }
      subheadline="Eliminate manual data entry into the Great West Casualty agent portal. NativeBase automates driver list uploads, vehicle schedule data and VIN extraction from ACORD 125, and MCS-90 and BMC-91X/Form E so your team never rekeys the same trucking data."
      subheadline2="Works within your existing workflow. Each submission is automated within 48 hours."
      ctaLabel="See Great West Casualty Automation Live"
      ctaSource="great-west-casualty-agent-portal"
      calculator={{
        inputLabel: 'Great West submissions per week',
        minuteLabel: 'Minutes per submission (manual)',
        resultNote: 'Hours back for your team—no manual driver or vehicle schedule entry.',
        defaultWorkflows: 12,
        defaultMinutes: 25,
      }}
      workflow={{
        sectionLabel: 'How It Works',
        heading: (
          <>
            From application to Great West quote—
            <span style={{ color: 'var(--accent)' }}> zero rekeying</span>
          </>
        ),
        subtitle:
          'Driver lists, trucking equipment schedules, and endorsement data flow automatically into the Great West Casualty agent portal.',
        steps: [
          {
            title: 'Driver List & Vehicle Schedule',
            duration: '0 Sec',
            description:
              'Automate driver list upload for the Great West agent portal. Vehicle schedule data extraction from PDF and VINs from ACORD 125—trucking equipment schedules flow in without manual entry.',
          },
          {
            title: 'MCS-90 & BMC-91X / Form E',
            duration: '30 Sec',
            description:
              'NativeBase automates MCS-90 endorsement data and BMC-91X/Form E automation for agents—mapping into the Great West portal so you never type endorsement fields by hand.',
          },
          {
            title: 'Portal Auto-Fill',
            duration: '2–3 Min',
            description:
              'AI navigates the Great West Casualty agent portal: uploads driver lists, fills vehicle and equipment data, and completes every screen—no rekeying.',
          },
          {
            title: 'Bindable Quote',
            duration: 'Done',
            description:
              'Great West returns a quote. Your agent reviews and binds—without having manually entered driver lists, VINs, or endorsement data.',
          },
        ],
        totalLine: (
          <>
            Total time: <strong style={{ color: 'var(--accent)' }}>Under 5 minutes</strong> vs. 25+ minutes of manual entry
          </>
        ),
      }}
      split={{
        sectionLabel: 'The Difference',
        heading: 'Manual vs. automated Great West submissions',
        subtitle:
          'Commercial trucking and Great West submissions rely on driver lists, vehicle schedules, and endorsements. NativeBase automates all of it.',
        left: {
          label: 'Manual Process',
          heading: 'Rekeying Into the Great West Portal',
          bullets: [
            'Build and upload driver lists manually; rekey into portal',
            'Type vehicle schedule data and VINs from ACORD 125 or PDFs',
            'Enter MCS-90 and BMC-91X/Form E data by hand',
            '20–30+ minutes per submission; errors cause requotes',
          ],
        },
        right: {
          label: 'Automated with NativeBase',
          heading: 'Driver Lists, Schedules, Endorsements—Automated',
          bullets: [
            'Automate driver list upload for carrier portals—Great West included',
            'Vehicle schedule data extraction from PDF; VINs from ACORD 125—trucking equipment schedules automated',
            'MCS-90 endorsement data and BMC-91X/Form E automation for agents',
            'Under 5 minutes from data to bindable Great West quote',
          ],
        },
      }}
      comparison={{
        heading: 'Manual vs. Automated Great West Casualty Submissions',
        manualLabel: 'Manual',
        autoLabel: 'NativeBase',
        rows: [
          ['Driver list upload', 'Manual entry each time', 'Automated driver list upload for carrier portals'],
          ['Vehicle schedule / VINs', 'Type from ACORD 125 or PDF', 'Extract from ACORD 125; automate trucking equipment schedules'],
          ['MCS-90 data', 'Rekey endorsement data', 'Automate MCS-90 endorsement data into portal'],
          ['BMC-91X / Form E', 'Manual form entry', 'BMC-91X and Form E automation for agents'],
          ['Time per submission', '20–30+ min', 'Under 5 min'],
        ],
        callout: 'Great West Casualty agent portal submissions without rekeying—driver lists, vehicle schedules, and endorsements automated.',
      }}
      faq={{
        heading: 'Great West Casualty — Questions',
        items: [
          {
            q: 'How does driver list upload work for Great West?',
            a: (
              <>
                NativeBase automates driver list upload for carrier portals—including the Great West Casualty agent
                portal. Driver data from your ACORD, AMS, or spreadsheets is mapped and uploaded without manual entry.
                See our{' '}
                <Link href="/resources/insurance/acord-to-portal/" style={crossRef}>
                  ACORD to portal
                </Link>{' '}
                overview.
              </>
            ),
          },
          {
            q: 'Can you extract vehicle schedule data and VINs from ACORD 125 or PDFs?',
            a: (
              <>
                Yes. We automate vehicle schedule data extraction from PDF and extract VINs from ACORD 125 so trucking
                equipment schedules flow into the Great West portal—no manual entry. Your agents don&apos;t type VINs or
                equipment lists twice.
              </>
            ),
          },
          {
            q: 'Do you handle MCS-90 and BMC-91X / Form E for Great West?',
            a: (
              <>
                Yes. NativeBase automates MCS-90 endorsement data and BMC-91X/Form E automation for agents—mapping
                into the Great West Casualty agent portal so you never rekey endorsement data.
              </>
            ),
          },
          {
            q: 'How long until we can run Great West submissions?',
            a: 'Each workflow is automated within 48 hours. We work within your existing tools and don&apos;t disrupt agent workflow—your team can start running Great West submissions without rekeying.',
          },
          {
            q: 'Does this work with our agency management system?',
            a: (
              <>
                Yes. NativeBase integrates with your existing AMS. Data from ACORD 125, driver lists, and endorsement
                forms flows into the Great West portal automatically. See{' '}
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
            question: 'How does driver list upload work for Great West?',
            answer:
              'NativeBase automates driver list upload for the Great West Casualty agent portal. Driver data from ACORD, AMS, or spreadsheets is mapped and uploaded without manual entry.',
          },
          {
            question: 'Can you extract vehicle schedule data and VINs from ACORD 125 or PDFs?',
            answer:
              'Yes. We automate vehicle schedule data extraction from PDF and extract VINs from ACORD 125 so trucking equipment schedules flow into the Great West portal without manual entry.',
          },
          {
            question: 'Do you handle MCS-90 and BMC-91X / Form E for Great West?',
            answer:
              'Yes. NativeBase automates MCS-90 endorsement data and BMC-91X/Form E automation for agents, mapping into the Great West Casualty agent portal.',
          },
          {
            question: 'How long until we can run Great West submissions?',
            answer:
              'Each workflow is automated within 48 hours. We work within your existing tools and do not disrupt agent workflow.',
          },
          {
            question: 'Does this work with our agency management system?',
            answer:
              'Yes. NativeBase integrates with your existing AMS. Data from ACORD 125, driver lists, and endorsement forms flows into the Great West portal automatically.',
          },
        ],
      }}
      cta={{
        badge: 'Great West Casualty',
        heading: 'Ready to automate Great West Casualty agent portal submissions?',
        subtitle:
          'Driver list uploads, vehicle schedules from ACORD 125, MCS-90 and BMC-91X/Form E—all automated. No rekeying.',
        primaryLabel: 'Book a Demo',
        primarySource: 'great-west-casualty-cta',
      }}
    />
  );
}

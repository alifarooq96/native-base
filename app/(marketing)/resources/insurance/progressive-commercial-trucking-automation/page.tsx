import type { Metadata } from 'next';
import Link from 'next/link';
import { InsuranceResourcePage } from '@/components/InsuranceResourcePage';

export const metadata: Metadata = {
  title: 'Progressive Commercial Trucking Portal Automation | NativeBase',
  description:
    'Automate commercial trucking submissions to Progressive: driver list uploads, vehicle schedules from ACORD 125, MCS-90 and BMC-91X/Form E data—no rekeying into the Progressive portal.',
};

const crossRef = { color: 'var(--accent)', textDecoration: 'underline' as const, fontWeight: 500 };

export default function ProgressiveCommercialTruckingPage() {
  return (
    <InsuranceResourcePage
      badge="Commercial Trucking"
      headline={
        <>
          Progressive Commercial Trucking Portal—{' '}
          <span style={{ color: '#5eead4' }}>Fully Automated</span>
        </>
      }
      subheadline="Stop rekeying driver lists, vehicle schedules, and endorsement data into the Progressive commercial trucking portal. NativeBase automates driver list uploads, extracts vehicle schedule data and VINs from ACORD 125, and handles MCS-90 and BMC-91X/Form E so your agents never type the same data twice."
      subheadline2="Integrates with your existing workflow. Each trucking submission is automated within 48 hours."
      ctaLabel="See Progressive Trucking Automation Live"
      ctaSource="progressive-commercial-trucking"
      calculator={{
        inputLabel: 'Progressive trucking submissions per week',
        minuteLabel: 'Minutes per submission (manual)',
        resultNote: 'Time back for your team—no manual driver or vehicle schedule entry.',
        defaultWorkflows: 15,
        defaultMinutes: 25,
      }}
      workflow={{
        sectionLabel: 'How It Works',
        heading: (
          <>
            From ACORD 125 to Progressive trucking quote—
            <span style={{ color: 'var(--accent)' }}> zero rekeying</span>
          </>
        ),
        subtitle:
          'Driver lists, vehicle schedules, MCS-90, and BMC-91X/Form E flow automatically into the Progressive commercial trucking portal.',
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
              'NativeBase automates MCS-90 endorsement data and BMC-91X/Form E automation for agents—mapping limits, effective dates, and form fields directly into the Progressive portal.',
          },
          {
            title: 'Portal Auto-Fill',
            duration: '2–3 Min',
            description:
              'AI navigates the Progressive commercial trucking portal: uploads driver lists, fills vehicle schedules, and completes every screen—same way a human would, without the typing.',
          },
          {
            title: 'Bindable Quote',
            duration: 'Done',
            description:
              'Progressive returns a commercial trucking rate. Your agent reviews and binds—no manual data entry, no toggling between ACORD and the portal.',
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
          'Commercial trucking submissions mean driver lists, vehicle schedules, and endorsements. NativeBase automates all of it so your team never rekeys.',
        left: {
          label: 'Manual Process',
          heading: 'Rekeying Drivers, VINs, and Endorsements',
          bullets: [
            'Manually build driver lists and upload or paste into carrier portals',
            'Type vehicle schedule data and VINs from ACORD 125 or PDFs field by field',
            'Enter MCS-90 and BMC-91X/Form E data into Progressive by hand',
            '20–30+ minutes per submission; errors trigger requotes',
          ],
        },
        right: {
          label: 'Automated with NativeBase',
          heading: 'Driver Lists, Schedules, and Endorsements—Automated',
          bullets: [
            'Automate driver list upload for carrier portals—no manual CSV or form entry',
            'Vehicle schedule data extraction from PDF; VINs from ACORD 125—trucking equipment schedules automated',
            'MCS-90 endorsement data and BMC-91X/Form E automation for agents—mapped into Progressive',
            'Under 5 minutes from data to bindable Progressive commercial trucking quote',
          ],
        },
      }}
      comparison={{
        heading: 'Manual vs. Automated Progressive Trucking Submissions',
        manualLabel: 'Manual',
        autoLabel: 'NativeBase',
        rows: [
          ['Driver list upload', 'Manual CSV/form entry each time', 'Automated driver list upload for carrier portals'],
          ['Vehicle schedule / VINs', 'Type from ACORD 125 or PDF', 'Extract from ACORD 125; automate trucking equipment schedules'],
          ['MCS-90 data', 'Rekey endorsement data', 'Automate MCS-90 endorsement data into portal'],
          ['BMC-91X / Form E', 'Manual form entry', 'BMC-91X and Form E automation for agents'],
          ['Time per submission', '20–30+ min', 'Under 5 min'],
        ],
        callout: 'Progressive commercial trucking submissions without rekeying—driver lists, vehicle schedules, and endorsements automated.',
      }}
      faq={{
        heading: 'Progressive Commercial Trucking — Questions',
        items: [
          {
            q: 'How does driver list upload work?',
            a: (
              <>
                NativeBase automates driver list upload for carrier portals. Your driver data—from ACORD, your AMS, or
                spreadsheets—is mapped and uploaded into the Progressive commercial trucking portal without manual
                entry. No rekeying names, DOBs, or license info. See our{' '}
                <Link href="/resources/insurance/acord-to-progressive/" style={crossRef}>
                  ACORD to Progressive
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
                equipment schedules flow into carrier portals—including Progressive—without manual entry. Your agents
                don&apos;t type VINs or equipment lists twice.
              </>
            ),
          },
          {
            q: 'Do you handle MCS-90 and BMC-91X / Form E?',
            a: (
              <>
                Yes. NativeBase automates MCS-90 endorsement data and BMC-91X/Form E automation for agents—mapping
                limits, effective dates, and form fields into the Progressive portal so you never rekey endorsement
                data.
              </>
            ),
          },
          {
            q: 'How long until we can run submissions?',
            a: 'Each workflow is automated within 48 hours. We work within your existing tools and don&apos;t disrupt agent workflow—setup and testing are handled so your team can start running Progressive commercial trucking submissions without rekeying.',
          },
          {
            q: 'Does this work with our agency management system?',
            a: (
              <>
                Yes. NativeBase integrates with your existing AMS and workflows. Data flows from ACORD 125, driver
                lists, and endorsement forms into the Progressive portal automatically. See{' '}
                <Link href="/resources/insurance/ams360-to-carrier-portal/" style={crossRef}>
                  AMS360
                </Link>{' '}
                and{' '}
                <Link href="/resources/insurance/applied-epic-to-carrier-portal/" style={crossRef}>
                  Applied Epic
                </Link>{' '}
                integrations.
              </>
            ),
          },
        ],
        structuredData: [
          {
            question: 'How does driver list upload work?',
            answer:
              'NativeBase automates driver list upload for carrier portals. Driver data from ACORD, your AMS, or spreadsheets is mapped and uploaded into the Progressive commercial trucking portal without manual entry.',
          },
          {
            question: 'Can you extract vehicle schedule data and VINs from ACORD 125 or PDFs?',
            answer:
              'Yes. We automate vehicle schedule data extraction from PDF and extract VINs from ACORD 125 so trucking equipment schedules flow into carrier portals including Progressive without manual entry.',
          },
          {
            question: 'Do you handle MCS-90 and BMC-91X / Form E?',
            answer:
              'Yes. NativeBase automates MCS-90 endorsement data and BMC-91X/Form E automation for agents, mapping limits, effective dates, and form fields into the Progressive portal.',
          },
          {
            question: 'How long until we can run submissions?',
            answer:
              'Each workflow is automated within 48 hours. We work within your existing tools and do not disrupt agent workflow.',
          },
          {
            question: 'Does this work with our agency management system?',
            answer:
              'Yes. NativeBase integrates with your existing AMS. Data flows from ACORD 125, driver lists, and endorsement forms into the Progressive portal automatically.',
          },
        ],
      }}
      cta={{
        badge: 'Progressive Trucking',
        heading: 'Ready to automate Progressive commercial trucking submissions?',
        subtitle:
          'Driver list uploads, vehicle schedules from ACORD 125, MCS-90 and BMC-91X/Form E—all automated. No rekeying.',
        primaryLabel: 'Book a Demo',
        primarySource: 'progressive-commercial-trucking-cta',
      }}
    />
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { InsuranceResourcePage } from '@/components/InsuranceResourcePage';

export const metadata: Metadata = {
  title: 'Bridge ACORD Data to Berkshire Hathaway Homestate Portal | NativeBase',
  description:
    'Eliminate manual data entry into Berkshire Hathaway Guard/Homestate portals. NativeBase reads your ACORD form data and fills small commercial, workers\' comp, and BOP submissions automatically.',
};

const linkStyle = { color: 'var(--accent)', textDecoration: 'underline' as const, fontWeight: 500 };

export default function AcordToBerkshireHathawayPage() {
  return (
    <InsuranceResourcePage
      badge="ACORD → Berkshire"
      headline={
        <>
          Bridge Your ACORD Data Directly Into the{' '}
          <span style={{ color: '#5eead4' }}>Berkshire Hathaway Homestate Portal</span>
        </>
      }
      subheadline="Small commercial, workers' comp, BOP—all automated from the ACORD data already in your system. Your agents never manually enter data into Guard or BHHC portals again."
      subheadline2="NativeBase navigates Berkshire Hathaway's portals with AI—filling every field automatically while your agents keep their existing workflow."
      ctaLabel="See the ACORD → BHHC Bridge Live"
      ctaSource="acord-to-berkshire-hathaway"
      calculator={{
        inputLabel: 'BHHC submissions per week',
        minuteLabel: 'Minutes saved per submission',
        resultNote: 'Based on eliminating manual rekeying from ACORD forms into Berkshire Hathaway Guard/Homestate portals.',
        defaultWorkflows: 18,
        defaultMinutes: 20,
      }}
      workflow={{
        sectionLabel: 'How It Works',
        heading: (
          <>
            ACORD data to BHHC submission—
            <span style={{ color: 'var(--accent)' }}>fully automated</span>
          </>
        ),
        subtitle: 'Workers\' comp, BOP, and small commercial data flows straight from your ACORD forms into Berkshire Hathaway. Zero rekeying.',
        steps: [
          {
            title: 'ACORD Data Ready',
            duration: '0 Sec',
            description:
              'Your ACORD 125, 126, 130, and workers\' comp supplement data already exists in your agency management system. NativeBase reads it directly—no export or reformatting needed.',
          },
          {
            title: 'AI Maps to BHHC Schema',
            duration: '30 Sec',
            description:
              'NativeBase maps class codes, payroll, experience mods, locations, and coverage limits to Berkshire Hathaway Guard\'s specific portal fields.',
          },
          {
            title: 'BHHC Portal Auto-Fill',
            duration: '3–4 Min',
            description:
              'AI navigates the Berkshire Hathaway portal the same way a human would—selecting products, entering workers\' comp or BOP details, and filling every field automatically.',
          },
          {
            title: 'Submission Complete',
            duration: 'Done',
            description:
              'BHHC receives a complete, accurate submission. Your agent reviews and submits—without having typed a single field into the portal manually.',
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
        heading: 'Manual rekeying vs. automated ACORD bridge',
        subtitle:
          'Your ACORD data has every detail Berkshire Hathaway needs. Why retype workers\' comp and BOP data when NativeBase bridges it directly?',
        left: {
          label: 'Manual Process',
          heading: 'Rekeying Workers\' Comp & BOP Data by Hand',
          bullets: [
            'Manually entering payroll figures and class codes for each state',
            'Typing experience modification factors and governing class info',
            'Copying BOP building details and revenue data field by field',
            '20–30 minutes per BHHC submission',
            'One wrong payroll figure or class code delays the entire quote',
          ],
        },
        right: {
          label: 'Automated with NativeBase',
          heading: 'ACORD Data Flows Directly Into BHHC',
          bullets: [
            'Payroll, class codes, and experience mods read from your system automatically',
            'Workers\' comp, BOP, and GL fields filled without human intervention',
            'AI navigates Berkshire Hathaway\'s portal like a human—without errors',
            'Under 5 minutes from ACORD data to complete BHHC submission',
            'Your agents focus on growing the book, not wrestling with portal forms',
          ],
          codeBlock: (
            <div
              style={{
                background: '#0F172A',
                borderRadius: 10,
                padding: '1rem 1.125rem',
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                lineHeight: 1.8,
                color: '#94a3b8',
                overflow: 'hidden',
              }}
            >
              <span style={{ color: '#475569' }}>{'{'}</span><br />
              <span>&nbsp;&nbsp;</span><span style={{ color: '#5eead4' }}>&quot;NamedInsured&quot;</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#fbbf24' }}>&quot;Midwest Plumbing LLC&quot;</span><span style={{ color: '#64748b' }}>,</span><br />
              <span>&nbsp;&nbsp;</span><span style={{ color: '#5eead4' }}>&quot;LineOfBusiness&quot;</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#fbbf24' }}>&quot;WC + BOP&quot;</span><span style={{ color: '#64748b' }}>,</span><br />
              <span>&nbsp;&nbsp;</span><span style={{ color: '#5eead4' }}>&quot;ClassCode&quot;</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#fbbf24' }}>&quot;5183&quot;</span><span style={{ color: '#64748b' }}>,</span><br />
              <span>&nbsp;&nbsp;</span><span style={{ color: '#5eead4' }}>&quot;AnnualPayroll&quot;</span><span style={{ color: '#64748b' }}>: </span><span style={{ color: '#fbbf24' }}>&quot;$410,000&quot;</span><br />
              <span style={{ color: '#475569' }}>{'}'}</span>
            </div>
          ),
        },
      }}
      comparison={{
        heading: 'Manual rekeying vs. ACORD → BHHC bridge',
        manualLabel: 'Manual Rekeying',
        autoLabel: 'NativeBase Bridge',
        rows: [
          ['Time per Submission', '25+ minutes of rekeying', 'Under 5 minutes, automated'],
          ['Data Accuracy', 'Payroll and class code errors', '100% accurate from ACORD source'],
          ['Workers\' Comp', 'Manual exp mod & state entry', 'All WC fields auto-filled'],
          ['BOP Details', 'Building info typed by hand', 'Mapped from ACORD automatically'],
          ['Agent Workflow', 'Constant portal switching', 'Stays in existing system'],
          ['Submission Quality', 'Errors delay quoting', 'Clean submissions, faster quotes'],
        ],
        callout: 'Bridge your ACORD data to Berkshire Hathaway automatically—no agent ever rekeys a field again.',
      }}
      faq={{
        heading: 'ACORD → Berkshire Hathaway: Common Questions',
        items: [
          {
            q: 'Does NativeBase require an API from Berkshire Hathaway or Guard?',
            a: (
              <>
                No. NativeBase uses AI-driven browser automation—it navigates the BHHC/Guard portal the same way a human agent would. No API, no integration request, no carrier approval needed. See our{' '}
                <Link href="/resources/insurance/acord-to-portal" style={linkStyle}>ACORD-to-portal overview</Link> for how this works across all carriers.
              </>
            ),
          },
          {
            q: 'Does NativeBase handle both workers\' comp and BOP for BHHC?',
            a: 'Yes. NativeBase maps ACORD data to Berkshire Hathaway\'s workers\' comp, BOP, and general liability forms. Payroll figures, class codes, experience mods, building details—everything flows automatically from your existing data.',
          },
          {
            q: 'Which ACORD forms are supported for Berkshire Hathaway?',
            a: 'NativeBase supports ACORD 125, 126, 130, 140, and workers\' comp supplements. Any structured data in your agency management system bridges directly into the BHHC portal.',
          },
          {
            q: 'Will this disrupt my agents\' daily workflow?',
            a: 'Not at all. NativeBase integrates within your existing agency management system. Your agents keep doing exactly what they do today—the only difference is ACORD data fills the Berkshire Hathaway portal automatically instead of being rekeyed by hand.',
          },
          {
            q: 'Can I also bridge ACORD data to Chubb, Progressive, and other carriers?',
            a: (
              <>
                Yes. The same automation works across carrier portals. See our guides for{' '}
                <Link href="/resources/insurance/acord-to-chubb" style={linkStyle}>Chubb</Link>,{' '}
                <Link href="/resources/insurance/acord-to-progressive" style={linkStyle}>Progressive</Link>, and our{' '}
                <Link href="/resources/insurance/acord-to-portal" style={linkStyle}>ACORD-to-portal overview</Link>.
              </>
            ),
          },
          {
            q: 'How fast can my agency go live with the BHHC bridge?',
            a: 'Each workflow is automated within 48 hours. We handle setup, configuration, and testing—your team starts bridging ACORD data to Berkshire Hathaway immediately with zero workflow disruption.',
          },
        ],
        structuredData: [
          {
            question: 'Does NativeBase require an API from Berkshire Hathaway or Guard?',
            answer:
              'No. NativeBase uses AI-driven browser automation that navigates the BHHC/Guard portal the same way a human would. No API dependency or carrier approval is required.',
          },
          {
            question: 'Does NativeBase handle both workers\' comp and BOP for BHHC?',
            answer:
              'Yes. NativeBase maps ACORD data to Berkshire Hathaway\'s workers comp, BOP, and general liability forms including payroll, class codes, and experience mods.',
          },
          {
            question: 'Which ACORD forms are supported for Berkshire Hathaway?',
            answer:
              'NativeBase supports ACORD 125, 126, 130, 140, and workers comp supplements for bridging data into the BHHC portal.',
          },
          {
            question: 'Will this disrupt my agents\' daily workflow?',
            answer:
              'Not at all. NativeBase integrates within your existing agency management system. ACORD data fills the Berkshire Hathaway portal automatically instead of being rekeyed.',
          },
          {
            question: 'Can I also bridge ACORD data to Chubb, Progressive, and other carriers?',
            answer:
              'Yes. The same automation works across carrier portals including Chubb, Progressive, Travelers, The Hartford, and more.',
          },
          {
            question: 'How fast can my agency go live with the BHHC bridge?',
            answer:
              'Each workflow is automated within 48 hours with zero workflow disruption. Setup, configuration, and testing are handled for you.',
          },
        ],
      }}
      cta={{
        badge: 'Zero Rekeying',
        heading: 'Ready to stop rekeying ACORD data into Berkshire Hathaway?',
        subtitle:
          'See a live demo: your ACORD data flowing directly into the BHHC portal—workers\' comp, BOP, and every field filled automatically.',
        primaryLabel: 'See the ACORD → BHHC Bridge',
        primarySource: 'acord-to-berkshire-hathaway-cta',
      }}
    />
  );
}

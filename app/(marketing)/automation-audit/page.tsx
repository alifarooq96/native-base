import type { Metadata } from 'next';
import { AutomationAudit } from '@/components/AutomationAudit';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://native-base-pink.vercel.app');

export const metadata: Metadata = {
  title: 'Automation Audit',
  description:
    'A diagnostic automation audit for identifying repetitive work across sales, ops, marketing, and support.',
  openGraph: {
    title: 'Automation Audit',
    description:
      'Identify recurring manual work and estimate its monthly operational cost benchmark.',
    images: [
      {
        url: `${baseUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'NativeBase.AI Automation Audit',
      },
    ],
  },
};

export default function AutomationAuditPage() {
  return <AutomationAudit />;
}

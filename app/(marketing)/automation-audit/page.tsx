import { AutomationAudit } from '@/components/AutomationAudit';

import { buildSeoMetadata } from '@/lib/page-metadata';
export const metadata = buildSeoMetadata({
  title: 'Automation Audit',
  description:
    'A diagnostic automation audit for identifying repetitive work across sales, ops, marketing, and support.',
  path: '/automation-audit/',
});

export default function AutomationAuditPage() {
  return <AutomationAudit />;
}

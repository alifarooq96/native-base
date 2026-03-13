import { buildSeoMetadata } from '@/lib/page-metadata';

export const metadata = buildSeoMetadata({
  title: 'Sign Up',
  description:
    'Create your Native Base account and start automating workflows with AI. Subscription-based workflow automation in under 2 days. No long-term commitment.',
  path: '/signup/',
});

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return children;
}

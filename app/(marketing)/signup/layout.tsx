import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
  description:
    'Create your Native Base account and start automating workflows with AI. Subscription-based workflow automation in under 2 days. No long-term commitment.',
  openGraph: {
    title: 'Get Started with Native Base',
    description:
      'Create your account and start automating workflows with AI. Subscription-based workflow automation delivered in under 2 days. No long-term commitment.',
  },
};

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return children;
}

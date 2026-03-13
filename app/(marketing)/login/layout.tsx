import { buildSeoMetadata } from '@/lib/page-metadata';

export const metadata = {
  ...buildSeoMetadata({
    title: 'Sign In',
    description:
      'Sign in to your Native Base account to manage your workflow automations, track credits, and access your task board. Secure sign-in for subscribers.',
    path: '/login/',
  }),
  robots: { index: false, follow: true },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}

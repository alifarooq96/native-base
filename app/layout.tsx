import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { MixpanelProvider } from '@/components/MixpanelProvider';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const siteName = 'Native Base';
const tagline = 'Transform your business to be AI native. Subscription-based workflow automation in under 2 days.';
const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://native-base-pink.vercel.app');

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: tagline,
  keywords: ['workflow automation', 'AI native', 'subscription', 'business automation', 'productivity'],
  authors: [{ name: 'Native Base', url: baseUrl }],
  creator: 'Native Base',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName,
    title: siteName,
    description: tagline,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: tagline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-16.png', type: 'image/png', sizes: '16x16' },
      { url: '/icon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-48.png', type: 'image/png', sizes: '48x48' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  alternates: { canonical: baseUrl },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body>
        <MixpanelProvider>{children}</MixpanelProvider>
      </body>
    </html>
  );
}

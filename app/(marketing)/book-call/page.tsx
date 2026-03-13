import { BookCallClient } from './BookCallClient';

import { buildSeoMetadata } from '@/lib/page-metadata';
export const metadata = buildSeoMetadata({
  title: 'Book a Free 15-Min Workflow Audit | NativeBase.AI',
  description:
    "Schedule a free 15-minute call. We'll show you exactly which workflows we can automate — live on the call.",
  path: '/book-call/',
});

export default function BookCallPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const source = typeof searchParams.source === 'string' ? searchParams.source : 'book-call';

  return <BookCallClient source={source} />;
}

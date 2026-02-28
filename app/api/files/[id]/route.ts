import { NextRequest, NextResponse } from 'next/server';
import { get } from '@vercel/blob';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  const attachment = await prisma.attachment.findUnique({
    where: { id },
  });

  if (!attachment) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const result = await get(attachment.url, { access: 'private' });

  if (!result || result.statusCode === 304) {
    return NextResponse.json({ error: 'File not available' }, { status: 404 });
  }

  return new NextResponse(result.stream, {
    headers: {
      'Content-Type': attachment.mimeType,
      'Content-Disposition': `inline; filename="${attachment.filename}"`,
      'Cache-Control': 'private, max-age=3600',
    },
  });
}

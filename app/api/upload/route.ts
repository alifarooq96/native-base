import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(req: NextRequest) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const filename = req.nextUrl.searchParams.get('filename');
  if (!filename) {
    return NextResponse.json({ error: 'filename query param is required' }, { status: 400 });
  }

  if (!req.body) {
    return NextResponse.json({ error: 'No file body' }, { status: 400 });
  }

  const blob = await put(`tasks/${session.userId}/${Date.now()}-${filename}`, req.body, {
    access: 'private',
    addRandomSuffix: true,
  });

  const contentType = req.headers.get('content-type') || 'application/octet-stream';
  const contentLength = req.headers.get('content-length');

  const attachment = await prisma.attachment.create({
    data: {
      url: blob.url,
      filename,
      size: contentLength ? parseInt(contentLength, 10) : 0,
      mimeType: contentType,
      userId: session.userId,
    },
  });

  return NextResponse.json({
    url: `/api/files/${attachment.id}`,
    filename,
    mimeType: contentType,
  });
}

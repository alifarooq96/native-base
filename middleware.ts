import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE_NAME = 'nb_session';

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET env variable is not set');
  return new TextEncoder().encode(secret);
}

async function getSession(request: NextRequest): Promise<{ userId: string; role: string } | null> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (!payload.sub) return null;
    return { userId: payload.sub, role: (payload.role as string) || 'client' };
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getSession(request);
  const loggedIn = !!session;
  const isAdmin = session?.role === 'admin';

  if (pathname === '/' || pathname === '/signup' || pathname === '/login') {
    if (loggedIn) {
      return NextResponse.redirect(new URL(isAdmin ? '/admin' : '/board', request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith('/board')) {
    if (!loggedIn) {
      const response = NextResponse.redirect(new URL('/signup', request.url));
      response.cookies.delete(COOKIE_NAME);
      return response;
    }
    if (isAdmin) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin')) {
    if (!loggedIn) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete(COOKIE_NAME);
      return response;
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/board', request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/signup', '/login', '/board/:path*', '/admin/:path*'],
};

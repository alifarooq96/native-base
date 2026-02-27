import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE_NAME = 'nb_session';

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET env variable is not set');
  return new TextEncoder().encode(secret);
}

async function hasValidSession(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return !!payload.sub;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loggedIn = await hasValidSession(request);

  if (pathname === '/' || pathname === '/signup' || pathname === '/login') {
    if (loggedIn) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith('/dashboard')) {
    if (!loggedIn) {
      const response = NextResponse.redirect(new URL('/signup', request.url));
      response.cookies.delete(COOKIE_NAME);
      return response;
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/signup', '/login', '/dashboard/:path*'],
};

import { NextResponse, type NextRequest } from 'next/server';
import {
  PREVIEW_GATE_REALM,
  isAlwaysOpen,
  isAuthorised,
  isGateEnabled,
} from '@/lib/preview-gate';

/**
 * Alphabetz middleware.
 *
 * Two layers, in order:
 *
 * 1. PREVIEW GATE — site-wide HTTP Basic Auth, active only when
 *    PREVIEW_GATE_PASSWORD is set. Exists because the app is not fit for public
 *    exposure: the role check below is forgeable, and /results publishes
 *    fabricated marks. Remove once ALZ-27 and ALZ-46 land.
 *
 * 2. ROLE ROUTING — the original prototype behaviour.
 *
 *    ⚠ This is NOT authentication. It reads an `alphabetz-role` cookie and
 *    trusts its value, so `curl -H 'Cookie: alphabetz-role=admin'` reaches every
 *    admin page. Verified, not theoretical. Real Supabase session verification
 *    is ALZ-27. Do not disable the preview gate before that lands.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ─── Layer 1: preview gate ───────────────────────────
  const gatePassword = process.env.PREVIEW_GATE_PASSWORD;
  if (isGateEnabled(gatePassword) && !isAlwaysOpen(pathname)) {
    if (!isAuthorised(request.headers.get('authorization'), gatePassword)) {
      return new NextResponse('Authentication required.', {
        status: 401,
        headers: {
          'WWW-Authenticate': `Basic realm="${PREVIEW_GATE_REALM}", charset="UTF-8"`,
          // Belt and braces: a gated deployment must never be indexed.
          'X-Robots-Tag': 'noindex, nofollow',
          'Cache-Control': 'no-store',
        },
      });
    }
  }

  const roleCookie = request.cookies.get('alphabetz-role')?.value;

  const withNoIndex = (res: NextResponse) => {
    if (isGateEnabled(gatePassword)) {
      res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    }
    return res;
  };

  // ─── Login pages: always accessible ──────────────────
  if (pathname === '/student/login' || pathname === '/admin/login') {
    return withNoIndex(NextResponse.next());
  }

  // ─── Protected: /admin/* ─────────────────────────────
  if (pathname.startsWith('/admin')) {
    if (!roleCookie) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return withNoIndex(NextResponse.redirect(loginUrl));
    }

    // Only admin and faculty can access /admin/*
    if (roleCookie !== 'admin' && roleCookie !== 'faculty') {
      return withNoIndex(NextResponse.redirect(new URL('/dashboard', request.url)));
    }
  }

  // ─── Protected: student routes ───────────────────────
  // Student routes are under (student) group: /dashboard, /my-courses, etc.
  // Also protect /student/* for any future student-prefixed routes
  const studentRoutes = [
    '/dashboard',
    '/my-courses',
    '/live-classes',
    '/recorded-lectures',
    '/tests',
    '/materials',
    '/doubts',
    '/performance',
    '/notifications',
    '/profile',
  ];

  const isStudentRoute =
    pathname.startsWith('/student') ||
    studentRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + '/')
    );

  if (isStudentRoute) {
    if (!roleCookie) {
      const loginUrl = new URL('/student/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return withNoIndex(NextResponse.redirect(loginUrl));
    }
  }

  return withNoIndex(NextResponse.next());
}

export const config = {
  /*
   * Everything except Next internals and static files.
   *
   * Broadened from the original private-route list because the preview gate has
   * to see public routes too — gating only /admin and /dashboard would leave the
   * marketing site, and the fabricated results on /results, wide open.
   */
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images/|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|mp4|webm|woff|woff2|ttf)$).*)',
  ],
};

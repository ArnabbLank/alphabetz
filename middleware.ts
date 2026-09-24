import { NextResponse, type NextRequest } from 'next/server';

/**
 * Alphabetz Route Protection Middleware
 *
 * Login pages (/student/login, /admin/login) are always accessible.
 * Protected routes require the appropriate alphabetz-role cookie.
 *
 * When Supabase is fully wired up, this will be replaced with
 * proper JWT session validation via the Supabase SSR helper.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const roleCookie = request.cookies.get('alphabetz-role')?.value;

  // ─── Login pages: always accessible ──────────────────
  if (pathname === '/student/login' || pathname === '/admin/login') {
    return NextResponse.next();
  }

  // ─── Protected: /admin/* ─────────────────────────────
  if (pathname.startsWith('/admin')) {
    if (!roleCookie) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Only admin and faculty can access /admin/*
    if (roleCookie !== 'admin' && roleCookie !== 'faculty') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
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
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths that need protection:
     * - /admin/* (admin panel, except /admin/login handled above)
     * - /student/* (any student-prefixed routes)
     * - Student dashboard routes
     */
    '/admin/:path*',
    '/student/:path*',
    '/dashboard/:path*',
    '/dashboard',
    '/my-courses/:path*',
    '/my-courses',
    '/live-classes/:path*',
    '/live-classes',
    '/recorded-lectures/:path*',
    '/recorded-lectures',
    '/tests/:path*',
    '/tests',
    '/materials/:path*',
    '/materials',
    '/doubts/:path*',
    '/doubts',
    '/performance/:path*',
    '/performance',
    '/notifications/:path*',
    '/notifications',
    '/profile/:path*',
    '/profile',
  ],
};

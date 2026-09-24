'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Eye, EyeOff, LogIn, AlertCircle, Shield } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Demo credentials check
    const validCreds: Record<string, string> = {
      'admin@alphabetz.in': 'password',
      'faculty@alphabetz.in': 'password',
    };

    const emailLower = email.toLowerCase();
    if (!validCreds[emailLower] || validCreds[emailLower] !== password) {
      setError('Invalid credentials. Please check your email and password.');
      setIsLoading(false);
      return;
    }

    // Determine role: if email contains 'admin' -> admin, else faculty
    const role = emailLower.includes('admin') ? 'admin' : 'faculty';

    // Set role cookie (expires in 7 days)
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `alphabetz-role=${role}; path=/; expires=${expires}; SameSite=Lax`;

    router.push('/admin/dashboard');
  }

  return (
    <div className="flex min-h-screen">
      {/* Left sidebar panel — decorative */}
      <div className="hidden lg:flex lg:w-[480px] lg:flex-col lg:justify-between bg-slate-900 p-10 text-white">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent font-bold text-white">
              A
            </div>
            <span className="text-xl font-bold tracking-tight">
              Alphabetz
            </span>
          </Link>
          <p className="mt-1 text-sm text-slate-400">Administration Portal</p>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800">
              <Shield className="h-6 w-6 text-accent" />
            </div>
            <h2 className="mt-4 text-2xl font-bold">Staff &amp; Admin Access</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Manage students, courses, batches, assessments, content, and
              institute operations from a single dashboard.
            </p>
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Capabilities
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Student &amp; batch management
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Course &amp; content publishing
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Test creation &amp; grading
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Fee &amp; payment tracking
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Analytics &amp; reports
              </li>
            </ul>
          </div>
        </div>

        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} Alphabetz Admin Portal
        </p>
      </div>

      {/* Right content panel */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md">
          {/* Mobile branding */}
          <div className="mb-8 text-center lg:hidden">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 font-bold text-white">
                A
              </div>
              <div className="text-left">
                <h1 className="text-xl font-bold text-slate-900">Alphabetz</h1>
                <p className="text-xs text-gray-500">Admin Portal</p>
              </div>
            </Link>
          </div>

          {/* Login card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">Admin Login</h2>
              <p className="mt-1 text-sm text-gray-500">
                Sign in with your staff credentials
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@alphabetz.in"
                    autoComplete="email"
                    className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500/20 transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500/20 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="mt-1.5 text-right">
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs font-medium text-slate-600 hover:text-slate-800 transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Note */}
            <p className="mt-6 text-center text-xs text-gray-400">
              Admin &amp; teacher accounts are created by the super admin.
              <br />
              Contact your administrator if you need access.
            </p>

            {/* Demo credentials */}
            <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-3">
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Demo Credentials
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p>
                  <span className="font-medium text-gray-700">Admin:</span>{' '}
                  admin@alphabetz.in / password
                </p>
                <p>
                  <span className="font-medium text-gray-700">Teacher:</span>{' '}
                  faculty@alphabetz.in / password
                </p>
              </div>
            </div>
          </div>

          {/* Student login link */}
          <div className="mt-4 text-center">
            <Link
              href="/student/login"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              ← Student Login
            </Link>
          </div>

          {/* Footer (mobile) */}
          <p className="mt-4 text-center text-xs text-gray-400 lg:hidden">
            © {new Date().getFullYear()} Alphabetz Admin Portal
          </p>
        </div>
      </div>
    </div>
  );
}

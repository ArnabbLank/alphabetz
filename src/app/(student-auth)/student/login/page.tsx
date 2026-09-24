'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Phone,
  Mail,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  GraduationCap,
  MessageCircle,
} from 'lucide-react';

export default function StudentLoginPage() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Validate
    if (loginMethod === 'phone') {
      if (!/^\d{10}$/.test(phone)) {
        setError('Please enter a valid 10-digit phone number.');
        return;
      }
    } else {
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('Please enter a valid email address.');
        return;
      }
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Demo: accept phone 9876543210 with any password, or any valid input
    if (loginMethod === 'phone' && phone !== '9876543210') {
      setError('Invalid phone number or password. Try 9876543210.');
      setIsLoading(false);
      return;
    }

    // Set role cookie (expires in 7 days)
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `alphabetz-role=student; path=/; expires=${expires}; SameSite=Lax`;

    router.push('/dashboard');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 px-4 py-12">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Branding */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/25">
              <GraduationCap className="h-7 w-7" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-extrabold tracking-tight text-primary">
                Alpha<span className="text-accent">betz</span>
              </h1>
              <p className="text-xs text-gray-500">Student Portal</p>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl shadow-gray-200/50">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Student Login</h2>
            <p className="mt-1 text-sm text-gray-500">
              Sign in to access your courses, tests &amp; study materials
            </p>
          </div>

          {/* Login method toggle */}
          <div className="mb-6 flex rounded-lg bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => {
                setLoginMethod('phone');
                setError(null);
              }}
              className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                loginMethod === 'phone'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Phone className="h-4 w-4" />
              Phone
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginMethod('email');
                setError(null);
              }}
              className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                loginMethod === 'email'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Mail className="h-4 w-4" />
              Email
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Phone or Email field */}
            {loginMethod === 'phone' ? (
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">
                    +91
                  </span>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))
                    }
                    placeholder="9876543210"
                    autoComplete="tel"
                    className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-12 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                />
              </div>
            )}

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
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
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
                  className="text-xs font-medium text-primary hover:text-primary-light transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-light disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Login to My Account
                </>
              )}
            </button>
          </form>

          {/* Enrollment link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              New student?{' '}
              <Link
                href="/contact"
                className="font-semibold text-primary hover:text-primary-light transition-colors"
              >
                Contact us to enroll
              </Link>
            </p>
          </div>

          {/* WhatsApp button */}
          <a
            href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20enroll%20at%20Alphabetz"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700 transition-colors hover:bg-green-100"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp us for enrollment inquiries
          </a>

          {/* Demo hint */}
          <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-3">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Demo Credentials
            </p>
            <div className="space-y-1 text-xs text-gray-600">
              <p>
                <span className="font-medium text-gray-700">Phone:</span>{' '}
                9876543210
              </p>
              <p>
                <span className="font-medium text-gray-700">Password:</span>{' '}
                any password
              </p>
            </div>
          </div>
        </div>

        {/* Staff login link */}
        <div className="mt-4 text-center">
          <Link
            href="/admin/login"
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            Staff / Teacher Login →
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-4 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Alphabetz. All rights reserved.
        </p>
      </div>
    </div>
  );
}

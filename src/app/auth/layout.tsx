import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth",
  description: "Login, register, or reset your password for Alphabetz.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary via-primary-light to-primary-dark px-4 py-12">
      {/* Subtle pattern overlay */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(249,115,22,0.08),transparent_50%)]" />

      <div className="relative z-10 w-full max-w-md">
        {/* Branding */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Alpha<span className="text-accent">betz</span>
            </h1>
            <p className="mt-1 text-sm text-white/60">
              Premier Coaching Institute
            </p>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white p-8 shadow-2xl shadow-black/20">
          {children}
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-white/40">
          &copy; {new Date().getFullYear()} Alphabetz. All rights reserved.
        </p>
      </div>
    </div>
  );
}

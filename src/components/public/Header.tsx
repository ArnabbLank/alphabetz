'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/shared/Button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/about', label: 'About' },
  { href: '/results', label: 'Results' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-primary">
            Alpha<span className="text-accent">betz</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-primary/5 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA area */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/admin/login"
            className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            Staff Login
          </Link>
          <Link href="/student/login">
            <Button variant="secondary" size="sm">
              Student Login
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 md:hidden',
          mobileOpen ? 'max-h-[500px]' : 'max-h-0 border-t-0'
        )}
      >
        <nav className="space-y-1 px-4 py-3" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-primary/5 hover:text-primary"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="space-y-2 pt-2">
            <Link href="/student/login" onClick={() => setMobileOpen(false)}>
              <Button variant="secondary" size="md" className="w-full">
                Student Login
              </Button>
            </Link>
            <Link
              href="/admin/login"
              className="block text-center text-xs font-medium text-gray-500 hover:text-gray-700 py-2 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Staff / Teacher Login
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  BookOpen,
  Video,
  PlayCircle,
  ClipboardCheck,
  FileText,
  HelpCircle,
  BarChart3,
  Bell,
  User,
  X,
  GraduationCap,
  LogOut,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'My Courses', href: '/my-courses', icon: BookOpen },
  { label: 'Live Classes', href: '/live-classes', icon: Video },
  { label: 'Recorded Lectures', href: '/recorded-lectures', icon: PlayCircle },
  { label: 'Tests', href: '/tests', icon: ClipboardCheck },
  { label: 'Study Materials', href: '/materials', icon: FileText },
  { label: 'Doubts', href: '/doubts', icon: HelpCircle },
  { label: 'Performance', href: '/performance', icon: BarChart3 },
  { label: 'Notifications', href: '/notifications', icon: Bell },
  { label: 'Profile', href: '/profile', icon: User },
];

interface StudentSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function StudentSidebar({
  isOpen,
  onClose,
  isCollapsed,
}: StudentSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    // Clear the role cookie
    document.cookie =
      'alphabetz-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
    router.push('/student/login');
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 flex h-full flex-col bg-primary-dark text-white transition-all duration-300',
          // Mobile: slide out
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0 lg:static lg:z-auto',
          // Desktop: collapsible
          isCollapsed ? 'lg:w-[72px]' : 'lg:w-64',
          'w-64'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            {!isCollapsed && (
              <span className="text-lg font-bold tracking-tight">
                Alphabetz
              </span>
            )}
          </Link>
          {/* Mobile close */}
          <button
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-white/10 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-accent text-white shadow-lg shadow-accent/25'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer with Logout */}
        <div className="border-t border-white/10 px-3 py-3 space-y-2">
          <button
            onClick={handleLogout}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-red-500/20 hover:text-red-300',
              isCollapsed && 'justify-center'
            )}
            title={isCollapsed ? 'Logout' : undefined}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span>Logout</span>}
          </button>
          {!isCollapsed && (
            <p className="px-3 text-xs text-gray-400">© 2026 Alphabetz</p>
          )}
        </div>
      </aside>
    </>
  );
}

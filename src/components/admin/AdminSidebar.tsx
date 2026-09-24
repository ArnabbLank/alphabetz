'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Layers,
  ClipboardCheck,
  Video,
  FileText,
  PenLine,
  UserPlus,
  Megaphone,
  GraduationCap,
  CreditCard,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: 'Main',
    items: [
      { label: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    ],
  },
  {
    title: 'Academic',
    items: [
      { label: 'Students', href: '/admin/students', icon: <Users size={20} /> },
      { label: 'Courses', href: '/admin/courses', icon: <BookOpen size={20} /> },
      { label: 'Batches', href: '/admin/batches', icon: <Layers size={20} /> },
      { label: 'Tests', href: '/admin/tests', icon: <ClipboardCheck size={20} /> },
    ],
  },
  {
    title: 'Content',
    items: [
      { label: 'Videos', href: '/admin/content/videos', icon: <Video size={20} /> },
      { label: 'Materials', href: '/admin/content/materials', icon: <FileText size={20} /> },
      { label: 'Blog', href: '/admin/content/blog', icon: <PenLine size={20} /> },
    ],
  },
  {
    title: 'CRM',
    items: [
      { label: 'Leads', href: '/admin/leads', icon: <UserPlus size={20} /> },
      { label: 'Announcements', href: '/admin/announcements', icon: <Megaphone size={20} /> },
    ],
  },
  {
    title: 'Management',
    items: [
      { label: 'Faculty', href: '/admin/faculty', icon: <GraduationCap size={20} /> },
      { label: 'Payments', href: '/admin/payments', icon: <CreditCard size={20} /> },
      { label: 'Reports', href: '/admin/reports', icon: <BarChart3 size={20} /> },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Settings', href: '/admin/settings', icon: <Settings size={20} /> },
    ],
  },
];

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    // Clear the role cookie
    document.cookie =
      'alphabetz-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
    router.push('/admin/login');
  }

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen flex-col bg-slate-900 text-gray-300 transition-all duration-300',
        collapsed ? 'w-[68px]' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-slate-700 px-4">
        {!collapsed && (
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-bold text-white text-sm">
              A
            </div>
            <span className="text-lg font-bold text-white">Alphabetz</span>
          </Link>
        )}
        {collapsed && (
          <Link href="/admin/dashboard" className="mx-auto">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-bold text-white text-sm">
              A
            </div>
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {navGroups.map((group) => (
          <div key={group.title} className="mb-6">
            {!collapsed && (
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {group.title}
              </p>
            )}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'border-l-2 border-accent bg-slate-800 text-white'
                          : 'border-l-2 border-transparent hover:bg-slate-800 hover:text-white',
                        collapsed && 'justify-center px-2'
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer with Logout and Collapse */}
      <div className="border-t border-slate-700 p-3 space-y-1">
        <button
          onClick={handleLogout}
          className={cn(
            'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-red-500/20 hover:text-red-300 transition-colors',
            collapsed && 'justify-center'
          )}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
        <button
          onClick={onToggle}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors',
          )}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}

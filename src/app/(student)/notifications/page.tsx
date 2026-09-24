'use client';

import { cn, getRelativeTime } from '@/lib/utils';
import { Card } from '@/components/shared/Card';
import { notifications } from '@/lib/dummy-data';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  CreditCard,
  ClipboardCheck,
  Award,
  FileText,
} from 'lucide-react';
import type { NotificationType } from '@/types';

const iconMap: Record<NotificationType, { icon: React.ReactNode; bg: string }> = {
  info: {
    icon: <Info className="h-5 w-5 text-blue-600" />,
    bg: 'bg-blue-100',
  },
  success: {
    icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
    bg: 'bg-emerald-100',
  },
  warning: {
    icon: <AlertTriangle className="h-5 w-5 text-amber-600" />,
    bg: 'bg-amber-100',
  },
  error: {
    icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
    bg: 'bg-red-100',
  },
  assignment: {
    icon: <FileText className="h-5 w-5 text-violet-600" />,
    bg: 'bg-violet-100',
  },
  test: {
    icon: <ClipboardCheck className="h-5 w-5 text-blue-600" />,
    bg: 'bg-blue-100',
  },
  result: {
    icon: <Award className="h-5 w-5 text-accent" />,
    bg: 'bg-orange-100',
  },
  payment: {
    icon: <CreditCard className="h-5 w-5 text-emerald-600" />,
    bg: 'bg-emerald-100',
  },
};

// Sort notifications by date, most recent first
const sortedNotifications = [...notifications].sort(
  (a, b) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
);

const unreadCount = sortedNotifications.filter((n) => !n.is_read).length;

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="mt-1 text-sm text-gray-500">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount === 1 ? '' : 's'}`
              : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button className="text-sm font-medium text-primary hover:underline">
            Mark all as read
          </button>
        )}
      </div>

      {/* Notification List */}
      <div className="space-y-2">
        {sortedNotifications.map((notification) => {
          const config = iconMap[notification.type] ?? iconMap.info;

          return (
            <Card
              key={notification.id}
              padding="none"
              className={cn(
                !notification.is_read && 'border-l-4 border-l-accent'
              )}
            >
              <div
                className={cn(
                  'flex gap-3 p-4',
                  !notification.is_read && 'bg-accent/5'
                )}
              >
                <div
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                    config.bg
                  )}
                >
                  {config.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      className={cn(
                        'text-sm',
                        notification.is_read
                          ? 'font-medium text-gray-700'
                          : 'font-semibold text-gray-900'
                      )}
                    >
                      {notification.title}
                    </h3>
                    <div className="flex items-center gap-2 shrink-0">
                      {!notification.is_read && (
                        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                      )}
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {getRelativeTime(notification.created_at)}
                      </span>
                    </div>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    {notification.message}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {sortedNotifications.length === 0 && (
        <div className="py-16 text-center">
          <Bell className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-3 text-sm text-gray-500">No notifications yet.</p>
        </div>
      )}
    </div>
  );
}

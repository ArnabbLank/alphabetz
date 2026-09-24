'use client';

import { Plus, Pin, Clock, Eye, Edit, Trash2 } from 'lucide-react';
import { announcements } from '@/lib/dummy-data';
import { formatDate } from '@/lib/utils';
import { Card } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';

const priorityVariant = (p: string) => {
  switch (p) {
    case 'high': return 'danger' as const;
    case 'urgent': return 'danger' as const;
    case 'normal': return 'info' as const;
    case 'low': return 'default' as const;
    default: return 'default' as const;
  }
};

const audienceVariant = (a: string) => {
  switch (a) {
    case 'all': return 'info' as const;
    case 'students': return 'success' as const;
    case 'faculty': return 'warning' as const;
    case 'staff': return 'default' as const;
    case 'batch_specific': return 'warning' as const;
    default: return 'default' as const;
  }
};

const audienceLabel = (a: string) => a.replace('_', ' ');

export default function AnnouncementsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
          <p className="text-sm text-gray-500">{announcements.length} announcements</p>
        </div>
        <Button leftIcon={<Plus size={16} />} size="sm">
          Create Announcement
        </Button>
      </div>

      <div className="space-y-3">
        {announcements.map((a) => {
          const isExpired = a.expires_at && new Date(a.expires_at) < new Date();
          return (
            <Card key={a.id} padding="md">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {a.is_pinned && (
                      <Pin size={14} className="text-accent flex-shrink-0" />
                    )}
                    <h3 className="font-semibold text-gray-900">{a.title}</h3>
                    <Badge variant={priorityVariant(a.priority)}>{a.priority}</Badge>
                    <Badge variant={audienceVariant(a.audience)}>{audienceLabel(a.audience)}</Badge>
                    {isExpired && <Badge variant="danger">Expired</Badge>}
                  </div>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{a.content}</p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                    <span>By {a.author_name}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {formatDate(a.created_at)}
                    </span>
                    {a.expires_at && (
                      <span>Expires: {formatDate(a.expires_at)}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-primary" title="View">
                    <Eye size={16} />
                  </button>
                  <button className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-primary" title="Edit">
                    <Edit size={16} />
                  </button>
                  <button className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

'use client';

import { useState, useMemo } from 'react';
import { Search, Eye, Phone, MessageSquare, UserPlus } from 'lucide-react';
import { leads, courses } from '@/lib/dummy-data';
import { formatDate } from '@/lib/utils';
import { Card, CardTitle } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { StatCard } from '@/components/shared/StatCard';

type LeadStatusFilter = 'all' | 'new' | 'contacted' | 'follow_up' | 'enrolled' | 'lost';

function getCourseName(courseId: string | null) {
  if (!courseId) return '—';
  return courses.find((c) => c.id === courseId)?.name ?? '—';
}

const statusVariant = (s: string) => {
  switch (s) {
    case 'new': return 'info' as const;
    case 'contacted': return 'warning' as const;
    case 'follow_up': return 'warning' as const;
    case 'enrolled': return 'success' as const;
    case 'lost': return 'danger' as const;
    default: return 'default' as const;
  }
};

const statusLabel = (s: string) => s.replace('_', ' ');

export default function LeadsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatusFilter>('all');

  const pipelineCounts = useMemo(() => ({
    new: leads.filter((l) => l.status === 'new').length,
    contacted: leads.filter((l) => l.status === 'contacted').length,
    follow_up: leads.filter((l) => l.status === 'follow_up').length,
    enrolled: leads.filter((l) => l.status === 'enrolled').length,
    lost: leads.filter((l) => l.status === 'lost').length,
  }), []);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      const matchesSearch = l.full_name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-sm text-gray-500">{leads.length} total leads</p>
        </div>
      </div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard icon={<UserPlus size={18} />} label="New" value={pipelineCounts.new} className="border-blue-200 bg-blue-50/50" />
        <StatCard icon={<Phone size={18} />} label="Contacted" value={pipelineCounts.contacted} className="border-amber-200 bg-amber-50/50" />
        <StatCard icon={<MessageSquare size={18} />} label="Follow Up" value={pipelineCounts.follow_up} className="border-orange-200 bg-orange-50/50" />
        <StatCard icon={<UserPlus size={18} />} label="Enrolled" value={pipelineCounts.enrolled} className="border-emerald-200 bg-emerald-50/50" />
        <StatCard icon={<UserPlus size={18} />} label="Lost" value={pipelineCounts.lost} className="border-red-200 bg-red-50/50" />
      </div>

      {/* Filters */}
      <Card padding="md">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(['all', 'new', 'contacted', 'follow_up', 'enrolled', 'lost'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  statusFilter === status
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? 'All' : statusLabel(status)}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Phone</th>
                <th className="px-5 py-3 font-medium">Course Interest</th>
                <th className="px-5 py-3 font-medium">Source</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <div>
                      <p className="font-medium text-gray-900">{lead.full_name}</p>
                      {lead.guardian_name && (
                        <p className="text-xs text-gray-500">Guardian: {lead.guardian_name}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{lead.phone}</td>
                  <td className="px-5 py-3 text-gray-600 max-w-[180px] truncate">{getCourseName(lead.interested_course_id)}</td>
                  <td className="px-5 py-3">
                    <span className="capitalize text-gray-600">{lead.source.replace('_', ' ')}</span>
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={statusVariant(lead.status)}>{statusLabel(lead.status)}</Badge>
                  </td>
                  <td className="px-5 py-3 text-gray-500">{formatDate(lead.created_at)}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-primary" title="View">
                        <Eye size={16} />
                      </button>
                      <a href={`tel:${lead.phone}`} className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-emerald-600" title="Call">
                        <Phone size={16} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="px-5 py-12 text-center text-sm text-gray-500">
            No leads found matching your criteria.
          </div>
        )}
      </Card>
    </div>
  );
}

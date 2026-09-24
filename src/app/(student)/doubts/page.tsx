'use client';

import { useState } from 'react';
import { Card } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';
import { getRelativeTime } from '@/lib/utils';
import {
  doubts,
  doubtReplies,
  subjects,
  students,
} from '@/lib/dummy-data';
import {
  HelpCircle,
  MessageCircle,
  Plus,
  X,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';

const statusConfig: Record<
  string,
  { label: string; variant: 'success' | 'warning' | 'default'; icon: React.ReactNode }
> = {
  open: {
    label: 'Open',
    variant: 'warning',
    icon: <Clock className="h-3.5 w-3.5" />,
  },
  answered: {
    label: 'Answered',
    variant: 'success',
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
  },
  closed: {
    label: 'Closed',
    variant: 'default',
    icon: <AlertCircle className="h-3.5 w-3.5" />,
  },
};

export default function DoubtsPage() {
  const [showAskModal, setShowAskModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Doubts</h1>
          <p className="mt-1 text-sm text-gray-500">
            Ask questions and get answers from expert faculty
          </p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() => setShowAskModal(true)}
        >
          Ask a Doubt
        </Button>
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-sm">
        <span className="rounded-full bg-amber-100 px-3 py-1 font-medium text-amber-700">
          {doubts.filter((d) => d.status === 'open').length} Open
        </span>
        <span className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-700">
          {doubts.filter((d) => d.status === 'answered').length} Answered
        </span>
        <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700">
          {doubts.length} Total
        </span>
      </div>

      {/* Doubts List */}
      <div className="space-y-4">
        {doubts.map((doubt) => {
          const subject = doubt.subject_id
            ? subjects.find((s) => s.id === doubt.subject_id)
            : null;
          const student = students.find((s) => s.id === doubt.student_id);
          const replies = doubtReplies.filter((r) => r.doubt_id === doubt.id);
          const config = statusConfig[doubt.status] ?? statusConfig.open;

          return (
            <Card key={doubt.id} hover padding="none">
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-3">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <HelpCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {doubt.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                        {doubt.description}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        {subject && (
                          <Badge variant="info">{subject.name}</Badge>
                        )}
                        <Badge variant={config.variant}>
                          <span className="flex items-center gap-1">
                            {config.icon}
                            {config.label}
                          </span>
                        </Badge>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <MessageCircle className="h-3 w-3" />
                          {replies.length}{' '}
                          {replies.length === 1 ? 'reply' : 'replies'}
                        </span>
                        <span className="text-xs text-gray-400">
                          · {getRelativeTime(doubt.created_at)}
                        </span>
                        <span className="text-xs text-gray-400">
                          · by {student?.full_name ?? 'Unknown'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Replies preview */}
                {replies.length > 0 && (
                  <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
                    {replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="rounded-lg bg-emerald-50 p-3"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-emerald-800">
                            {reply.author_name}
                          </span>
                          <Badge variant="success" className="text-[10px]">
                            {reply.author_role}
                          </Badge>
                          <span className="text-xs text-gray-400">
                            {getRelativeTime(reply.created_at)}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-700 line-clamp-3">
                          {reply.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Ask a Doubt Modal */}
      {showAskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Ask a Doubt
              </h2>
              <button
                onClick={() => setShowAskModal(false)}
                className="rounded-lg p-1 hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4 px-6 py-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <select className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option value="">Select a subject</option>
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Brief title for your doubt"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your doubt in detail..."
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-4">
              <Button
                variant="ghost"
                onClick={() => setShowAskModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                leftIcon={<Send className="h-4 w-4" />}
                onClick={() => setShowAskModal(false)}
              >
                Submit Doubt
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

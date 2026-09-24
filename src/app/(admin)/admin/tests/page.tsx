'use client';

import { Plus, Eye, Edit, Clock, FileQuestion } from 'lucide-react';
import { tests, courses, subjects } from '@/lib/dummy-data';
import { formatDate } from '@/lib/utils';
import { Card } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';

function getCourseName(courseId: string) {
  return courses.find((c) => c.id === courseId)?.name ?? '—';
}

function getSubjectName(subjectId: string | null) {
  if (!subjectId) return 'All Subjects';
  return subjects.find((s) => s.id === subjectId)?.name ?? '—';
}

const typeVariant = (t: string) => {
  switch (t) {
    case 'mock': return 'info' as const;
    case 'chapter': return 'default' as const;
    case 'full_syllabus': return 'warning' as const;
    case 'practice': return 'success' as const;
    case 'weekly': return 'default' as const;
    default: return 'default' as const;
  }
};

export default function TestsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tests</h1>
          <p className="text-sm text-gray-500">{tests.length} total tests</p>
        </div>
        <Button leftIcon={<Plus size={16} />} size="sm">
          Create Test
        </Button>
      </div>

      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Course</th>
                <th className="px-5 py-3 font-medium">Subject</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Marks</th>
                <th className="px-5 py-3 font-medium">Duration</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <div>
                      <p className="font-medium text-gray-900">{test.title}</p>
                      <p className="text-xs text-gray-500">{test.total_questions} questions</p>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600 max-w-[160px] truncate">{getCourseName(test.course_id)}</td>
                  <td className="px-5 py-3 text-gray-600">{getSubjectName(test.subject_id)}</td>
                  <td className="px-5 py-3">
                    <Badge variant={typeVariant(test.type)}>{test.type.replace('_', ' ')}</Badge>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1 text-gray-700">
                      <FileQuestion size={14} className="text-gray-400" />
                      {test.total_marks}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1 text-gray-700">
                      <Clock size={14} className="text-gray-400" />
                      {test.duration_minutes} min
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={test.is_published ? 'success' : 'warning'}>
                      {test.is_published ? 'Published' : 'Draft'}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-primary" title="View">
                        <Eye size={16} />
                      </button>
                      <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-primary" title="Edit">
                        <Edit size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

'use client';

import { Plus, Eye, Edit } from 'lucide-react';
import { batches, courses, faculty, facultyBatches, centers } from '@/lib/dummy-data';
import { formatDate } from '@/lib/utils';
import { Card } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';

function getCourseName(courseId: string) {
  return courses.find((c) => c.id === courseId)?.name ?? '—';
}

function getBatchFaculty(batchId: string) {
  const assignments = facultyBatches.filter((fb) => fb.batch_id === batchId && fb.role === 'primary');
  return assignments.map((a) => faculty.find((f) => f.id === a.faculty_id)?.full_name ?? '').filter(Boolean).join(', ') || '—';
}

function getCenterName(centerId: string | null) {
  if (!centerId) return '—';
  return centers.find((c) => c.id === centerId)?.name ?? '—';
}

const statusVariant = (s: string) => {
  switch (s) {
    case 'active': return 'success' as const;
    case 'upcoming': return 'info' as const;
    case 'completed': return 'default' as const;
    default: return 'default' as const;
  }
};

export default function BatchesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Batches</h1>
          <p className="text-sm text-gray-500">{batches.length} total batches</p>
        </div>
        <Button leftIcon={<Plus size={16} />} size="sm">
          Create Batch
        </Button>
      </div>

      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
                <th className="px-5 py-3 font-medium">Batch Name</th>
                <th className="px-5 py-3 font-medium">Course</th>
                <th className="px-5 py-3 font-medium">Faculty</th>
                <th className="px-5 py-3 font-medium">Timing</th>
                <th className="px-5 py-3 font-medium">Start Date</th>
                <th className="px-5 py-3 font-medium">Capacity</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((batch) => (
                <tr key={batch.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <div>
                      <p className="font-medium text-gray-900">{batch.name}</p>
                      <p className="text-xs text-gray-500">{getCenterName(batch.center_id)}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600 max-w-[180px] truncate">{getCourseName(batch.course_id)}</td>
                  <td className="px-5 py-3 text-gray-600 max-w-[200px] truncate">{getBatchFaculty(batch.id)}</td>
                  <td className="px-5 py-3">
                    <div>
                      <p className="text-gray-700">{batch.timing}</p>
                      <p className="text-xs text-gray-400">{batch.days.join(', ')}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{formatDate(batch.start_date)}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-700">{batch.enrolled_count}/{batch.max_students}</span>
                      <div className="h-1.5 w-16 rounded-full bg-gray-200">
                        <div
                          className="h-1.5 rounded-full bg-primary"
                          style={{ width: `${(batch.enrolled_count / batch.max_students) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={statusVariant(batch.status)}>{batch.status}</Badge>
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

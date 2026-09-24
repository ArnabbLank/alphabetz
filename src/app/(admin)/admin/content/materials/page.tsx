'use client';

import { Upload, Eye, Edit, Trash2, FileText, Download } from 'lucide-react';
import { studyMaterials, courses, subjects } from '@/lib/dummy-data';
import { formatDate } from '@/lib/utils';
import { Card } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';

function getCourseName(courseId: string) {
  return courses.find((c) => c.id === courseId)?.name ?? '—';
}

function getSubjectName(subjectId: string | null) {
  if (!subjectId) return 'General';
  return subjects.find((s) => s.id === subjectId)?.name ?? '—';
}

function formatFileSize(kb: number | null) {
  if (!kb) return '—';
  if (kb >= 1024) return `${(kb / 1024).toFixed(1)} MB`;
  return `${kb} KB`;
}

export default function MaterialsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Study Materials</h1>
          <p className="text-sm text-gray-500">{studyMaterials.length} materials uploaded</p>
        </div>
        <Button leftIcon={<Upload size={16} />} size="sm">
          Upload Material
        </Button>
      </div>

      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Course</th>
                <th className="px-5 py-3 font-medium">Subject</th>
                <th className="px-5 py-3 font-medium">Size</th>
                <th className="px-5 py-3 font-medium">Downloads</th>
                <th className="px-5 py-3 font-medium">Published</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {studyMaterials.map((material) => (
                <tr key={material.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600">
                        <FileText size={16} />
                      </div>
                      <div className="max-w-[220px]">
                        <p className="font-medium text-gray-900 truncate">{material.title}</p>
                        <p className="text-xs text-gray-500 truncate">{material.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant="default">{material.type.toUpperCase()}</Badge>
                  </td>
                  <td className="px-5 py-3 text-gray-600 max-w-[150px] truncate">{getCourseName(material.course_id)}</td>
                  <td className="px-5 py-3 text-gray-600">{getSubjectName(material.subject_id)}</td>
                  <td className="px-5 py-3 text-gray-500">{formatFileSize(material.file_size_kb)}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Download size={14} className="text-gray-400" />
                      {material.download_count}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={material.is_published ? 'success' : 'warning'}>
                      {material.is_published ? 'Yes' : 'No'}
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
                      <button className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-500" title="Delete">
                        <Trash2 size={16} />
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

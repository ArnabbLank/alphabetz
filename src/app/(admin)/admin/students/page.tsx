'use client';

import { useState, useMemo } from 'react';
import { Search, Eye, Edit, Download } from 'lucide-react';
import { students, enrollments, courses, batches } from '@/lib/dummy-data';
import { Avatar } from '@/components/shared/Avatar';
import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';

function getStudentEnrollment(studentId: string) {
  return enrollments.find((e) => e.student_id === studentId && e.status === 'active');
}
function getCourseName(courseId: string) {
  return courses.find((c) => c.id === courseId)?.name ?? '—';
}
function getBatchName(batchId: string) {
  return batches.find((b) => b.id === batchId)?.name ?? '—';
}

export default function StudentsPage() {
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesSearch = s.full_name.toLowerCase().includes(search.toLowerCase());
      if (courseFilter === 'all') return matchesSearch;
      const enrollment = getStudentEnrollment(s.id);
      return matchesSearch && enrollment?.course_id === courseFilter;
    });
  }, [search, courseFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-sm text-gray-500">{students.length} total students</p>
        </div>
        <Button leftIcon={<Download size={16} />} variant="outline" size="sm">
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card padding="md">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Courses</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
                <th className="px-5 py-3 font-medium">Student</th>
                <th className="px-5 py-3 font-medium">Phone</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Course</th>
                <th className="px-5 py-3 font-medium">Batch</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => {
                const enrollment = getStudentEnrollment(student.id);
                return (
                  <tr key={student.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={student.full_name} src={student.avatar_url} size="sm" />
                        <div>
                          <p className="font-medium text-gray-900">{student.full_name}</p>
                          <p className="text-xs text-gray-500">{student.city}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{student.phone}</td>
                    <td className="px-5 py-3 text-gray-600 max-w-[180px] truncate">{student.email}</td>
                    <td className="px-5 py-3 text-gray-600 max-w-[180px] truncate">
                      {enrollment ? getCourseName(enrollment.course_id) : '—'}
                    </td>
                    <td className="px-5 py-3 text-gray-600 max-w-[160px] truncate">
                      {enrollment ? getBatchName(enrollment.batch_id) : '—'}
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={student.is_active ? 'success' : 'danger'}>
                        {student.is_active ? 'Active' : 'Inactive'}
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
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredStudents.length === 0 && (
          <div className="px-5 py-12 text-center text-sm text-gray-500">
            No students found matching your criteria.
          </div>
        )}
      </Card>
    </div>
  );
}

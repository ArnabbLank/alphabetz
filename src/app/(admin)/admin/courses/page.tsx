'use client';

import { Plus, Users, Clock, Tag } from 'lucide-react';
import { courses } from '@/lib/dummy-data';
import { formatCurrency } from '@/lib/utils';
import { Card } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';

const statusVariant = (s: string) => {
  switch (s) {
    case 'active': return 'success' as const;
    case 'upcoming': return 'info' as const;
    case 'archived': return 'default' as const;
    default: return 'default' as const;
  }
};

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="text-sm text-gray-500">{courses.length} total courses</p>
        </div>
        <Button leftIcon={<Plus size={16} />} size="sm">
          Create Course
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} hover padding="md">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 line-clamp-1">{course.name}</h3>
                <p className="mt-1 text-xs text-gray-500">{course.category}</p>
              </div>
              <Badge variant={statusVariant(course.status)}>{course.status}</Badge>
            </div>

            <p className="mt-3 text-sm text-gray-600 line-clamp-2">{course.short_description}</p>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Users size={14} />
                <span>{course.enrolled_count}/{course.max_students}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Clock size={14} />
                <span>{course.duration_months} months</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Tag size={14} />
                <span>{course.category}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
              <div>
                {course.discounted_fee ? (
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">{formatCurrency(course.discounted_fee)}</span>
                    <span className="text-sm text-gray-400 line-through">{formatCurrency(course.fee)}</span>
                  </div>
                ) : (
                  <span className="text-lg font-bold text-gray-900">{formatCurrency(course.fee)}</span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 flex-1 rounded-full bg-gray-200 w-16">
                  <div
                    className="h-2 rounded-full bg-accent"
                    style={{ width: `${(course.enrolled_count / course.max_students) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-500">{Math.round((course.enrolled_count / course.max_students) * 100)}%</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

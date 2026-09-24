'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';
import { cn } from '@/lib/utils';
import {
  students,
  enrollments,
  courses,
  batches,
  faculty,
  facultyBatches,
} from '@/lib/dummy-data';
import { BookOpen, Clock, User, ArrowRight } from 'lucide-react';

const currentStudent = students[0];
const studentEnrollments = enrollments.filter(
  (e) => e.student_id === currentStudent.id
);

type FilterTab = 'all' | 'active' | 'completed';

const tabs: { label: string; value: FilterTab }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

// Simulate progress percentages deterministically
function getProgress(enrollmentId: string): number {
  let hash = 0;
  for (let i = 0; i < enrollmentId.length; i++) {
    hash = enrollmentId.charCodeAt(i) + ((hash << 5) - hash);
  }
  return 25 + (Math.abs(hash) % 60); // 25–84%
}

export default function MyCoursesPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  const filtered = studentEnrollments.filter((e) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return e.status === 'active';
    if (activeTab === 'completed') return e.status === 'completed';
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track your enrolled courses and continue learning
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 rounded-lg bg-gray-100 p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              'rounded-md px-4 py-2 text-sm font-medium transition-colors',
              activeTab === tab.value
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      {filtered.length === 0 ? (
        <div className="py-12 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-3 text-sm text-gray-500">
            No courses found in this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((enrollment) => {
            const course = courses.find((c) => c.id === enrollment.course_id);
            const batch = batches.find((b) => b.id === enrollment.batch_id);
            const batchFaculty = facultyBatches
              .filter((fb) => fb.batch_id === enrollment.batch_id && fb.role === 'primary')
              .map((fb) => faculty.find((f) => f.id === fb.faculty_id))
              .filter(Boolean);
            const progress = getProgress(enrollment.id);

            return (
              <Card key={enrollment.id} hover padding="none">
                {/* Card Header Gradient */}
                <div className="rounded-t-xl bg-gradient-to-r from-primary to-primary-light p-4 text-white">
                  <Badge
                    variant={
                      enrollment.status === 'active'
                        ? 'success'
                        : enrollment.status === 'completed'
                        ? 'info'
                        : 'warning'
                    }
                    className="mb-2"
                  >
                    {enrollment.status}
                  </Badge>
                  <h3 className="font-semibold text-white line-clamp-2">
                    {course?.name ?? 'Unknown Course'}
                  </h3>
                  <p className="mt-1 text-sm text-white/70">
                    {batch?.name ?? 'Unknown Batch'}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-primary">{progress}%</span>
                    </div>
                    <div className="mt-1.5 h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-accent transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-gray-400" />
                      {batch?.timing ?? 'N/A'}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="h-4 w-4 text-gray-400" />
                      {batchFaculty.length > 0
                        ? batchFaculty.map((f) => f!.full_name).join(', ')
                        : 'Faculty TBD'}
                    </div>
                  </div>

                  {/* Continue Button */}
                  <Link href={`/my-courses`}>
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full"
                      rightIcon={<ArrowRight className="h-4 w-4" />}
                    >
                      Continue Learning
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

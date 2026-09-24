'use client';

import { Card } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';
import { formatDate } from '@/lib/utils';
import {
  students,
  tests,
  testAttempts,
  courses,
  subjects,
} from '@/lib/dummy-data';
import {
  ClipboardCheck,
  Clock,
  Award,
  FileQuestion,
  BarChart3,
  PlayCircle,
  Eye,
} from 'lucide-react';

const currentStudent = students[0];
const studentAttempts = testAttempts.filter(
  (a) => a.student_id === currentStudent.id
);
const attemptedTestIds = new Set(studentAttempts.map((a) => a.test_id));

// Published tests for courses enrolled by the student
const publishedTests = tests.filter((t) => t.is_published);

const typeColors: Record<string, 'info' | 'warning' | 'success' | 'danger' | 'default'> = {
  mock: 'info',
  chapter: 'default',
  full_syllabus: 'danger',
  practice: 'success',
  weekly: 'warning',
};

export default function TestsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tests</h1>
        <p className="mt-1 text-sm text-gray-500">
          Take mock tests, chapter tests, and track your performance
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
            <FileQuestion className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">
              {publishedTests.length}
            </p>
            <p className="text-sm text-gray-500">Available Tests</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
            <ClipboardCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">
              {studentAttempts.length}
            </p>
            <p className="text-sm text-gray-500">Tests Completed</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">
              {studentAttempts.length > 0
                ? `${Math.round(
                    studentAttempts.reduce((s, a) => s + a.percentage, 0) /
                      studentAttempts.length
                  )}%`
                : 'N/A'}
            </p>
            <p className="text-sm text-gray-500">Average Score</p>
          </div>
        </div>
      </div>

      {/* Tests List */}
      <div className="space-y-4">
        {publishedTests.map((test) => {
          const course = courses.find((c) => c.id === test.course_id);
          const subject = test.subject_id
            ? subjects.find((s) => s.id === test.subject_id)
            : null;
          const isAttempted = attemptedTestIds.has(test.id);
          const attempt = studentAttempts.find((a) => a.test_id === test.id);

          return (
            <Card key={test.id} padding="none">
              <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ClipboardCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {test.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {course?.name ?? 'Unknown'}
                      {subject ? ` · ${subject.name}` : ''}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant={typeColors[test.type] ?? 'default'}>
                        {test.type.replace('_', ' ')}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <BarChart3 className="h-3 w-3" />
                        {test.total_marks} marks
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {test.duration_minutes} min
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <FileQuestion className="h-3 w-3" />
                        {test.total_questions} questions
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                  {isAttempted && attempt ? (
                    <>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          {attempt.score}/{attempt.total_marks}
                        </p>
                        <Badge
                          variant={
                            attempt.percentage >= 80
                              ? 'success'
                              : attempt.percentage >= 60
                              ? 'warning'
                              : 'danger'
                          }
                        >
                          {attempt.percentage}%
                          {attempt.rank ? ` · Rank #${attempt.rank}` : ''}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Eye className="h-4 w-4" />}
                      >
                        View Result
                      </Button>
                    </>
                  ) : (
                    <>
                      <Badge variant="default">Not Started</Badge>
                      <Button
                        variant="primary"
                        size="sm"
                        leftIcon={<PlayCircle className="h-4 w-4" />}
                      >
                        Start Test
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

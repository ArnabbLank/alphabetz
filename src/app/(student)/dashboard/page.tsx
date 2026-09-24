'use client';

import Link from 'next/link';
import { StatCard } from '@/components/shared/StatCard';
import { Card, CardHeader, CardTitle } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';
import { formatDate, formatCurrency } from '@/lib/utils';
import {
  students,
  enrollments,
  testAttempts,
  tests,
  courses,
  batches,
  announcements,
  studyMaterials,
} from '@/lib/dummy-data';
import {
  BookOpen,
  ClipboardCheck,
  TrendingUp,
  Download,
  CalendarDays,
  Megaphone,
  FileText,
  HelpCircle,
  ArrowRight,
  Clock,
  Trophy,
} from 'lucide-react';

const currentStudent = students[0];
const studentEnrollments = enrollments.filter(
  (e) => e.student_id === currentStudent.id && e.status === 'active'
);
const studentAttempts = testAttempts.filter(
  (a) => a.student_id === currentStudent.id
);
const avgScore =
  studentAttempts.length > 0
    ? Math.round(
        studentAttempts.reduce((sum, a) => sum + a.percentage, 0) /
          studentAttempts.length
      )
    : 0;

// Upcoming classes (simulate from batches)
const upcomingClasses = studentEnrollments.slice(0, 3).map((enrollment) => {
  const batch = batches.find((b) => b.id === enrollment.batch_id);
  const course = courses.find((c) => c.id === enrollment.course_id);
  return {
    id: enrollment.id,
    courseName: course?.name ?? 'Unknown',
    batchName: batch?.name ?? 'Unknown',
    timing: batch?.timing ?? 'TBD',
    days: batch?.days ?? [],
  };
});

// Recent test results
const recentAttempts = [...studentAttempts]
  .sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )
  .slice(0, 3);

// Recent announcements
const recentAnnouncements = [...announcements]
  .filter((a) => a.audience === 'all' || a.audience === 'students')
  .sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )
  .slice(0, 3);

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-primary-light p-6 text-white lg:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold lg:text-3xl">
              Welcome back, {currentStudent.full_name.split(' ')[0]}! 👋
            </h1>
            <p className="mt-1 text-white/80">
              Keep up the great work. Your consistency is paying off!
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/tests">
              <Button variant="secondary" size="sm" leftIcon={<ClipboardCheck className="h-4 w-4" />}>
                Take Test
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<BookOpen className="h-5 w-5" />}
          label="Courses Enrolled"
          value={studentEnrollments.length}
        />
        <StatCard
          icon={<ClipboardCheck className="h-5 w-5" />}
          label="Tests Completed"
          value={studentAttempts.length}
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5" />}
          label="Average Score"
          value={`${avgScore}%`}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          icon={<Download className="h-5 w-5" />}
          label="Materials Downloaded"
          value={42}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Upcoming Classes */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                <span className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  Upcoming Classes
                </span>
              </CardTitle>
            </CardHeader>
            <div className="space-y-3">
              {upcomingClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-4"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {cls.courseName}
                    </p>
                    <p className="text-sm text-gray-500">{cls.batchName}</p>
                  </div>
                  <div className="text-right">
                    <p className="flex items-center gap-1.5 text-sm font-medium text-primary">
                      <Clock className="h-4 w-4" />
                      {cls.timing}
                    </p>
                    <p className="text-xs text-gray-500">
                      {cls.days.slice(0, 3).join(', ')}
                      {cls.days.length > 3 && '...'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <div className="space-y-2">
            <Link
              href="/tests"
              className="flex items-center gap-3 rounded-lg border border-gray-100 p-3 transition-colors hover:bg-gray-50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <ClipboardCheck className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Take a Test</p>
                <p className="text-xs text-gray-500">Practice & mock tests</p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </Link>
            <Link
              href="/materials"
              className="flex items-center gap-3 rounded-lg border border-gray-100 p-3 transition-colors hover:bg-gray-50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  View Materials
                </p>
                <p className="text-xs text-gray-500">PDFs, notes & formulas</p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </Link>
            <Link
              href="/doubts"
              className="flex items-center gap-3 rounded-lg border border-gray-100 p-3 transition-colors hover:bg-gray-50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                <HelpCircle className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Ask a Doubt
                </p>
                <p className="text-xs text-gray-500">Get expert answers</p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </Link>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Test Results */}
        <Card>
          <CardHeader>
            <CardTitle>
              <span className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-accent" />
                Recent Test Results
              </span>
            </CardTitle>
            <Link
              href="/performance"
              className="text-sm font-medium text-primary hover:underline"
            >
              View All
            </Link>
          </CardHeader>
          <div className="space-y-3">
            {recentAttempts.map((attempt) => {
              const test = tests.find((t) => t.id === attempt.test_id);
              return (
                <div
                  key={attempt.id}
                  className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {test?.title ?? 'Unknown Test'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(attempt.created_at)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">
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
                    </Badge>
                  </div>
                </div>
              );
            })}
            {recentAttempts.length === 0 && (
              <p className="py-4 text-center text-sm text-gray-500">
                No test attempts yet.
              </p>
            )}
          </div>
        </Card>

        {/* Announcements */}
        <Card>
          <CardHeader>
            <CardTitle>
              <span className="flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-primary" />
                Announcements
              </span>
            </CardTitle>
          </CardHeader>
          <div className="space-y-3">
            {recentAnnouncements.map((ann) => (
              <div
                key={ann.id}
                className="rounded-lg border border-gray-100 p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-gray-900">
                    {ann.title}
                  </p>
                  <Badge
                    variant={
                      ann.priority === 'high' || ann.priority === 'urgent'
                        ? 'danger'
                        : ann.priority === 'normal'
                        ? 'info'
                        : 'default'
                    }
                  >
                    {ann.priority}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-gray-600 line-clamp-2">
                  {ann.content}
                </p>
                <p className="mt-2 text-xs text-gray-400">
                  {formatDate(ann.created_at)} · {ann.author_name}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

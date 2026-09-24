'use client';

import { Card, CardHeader, CardTitle } from '@/components/shared/Card';
import { StatCard } from '@/components/shared/StatCard';
import { Badge } from '@/components/shared/Badge';
import { formatDate } from '@/lib/utils';
import { students, testAttempts, tests, courses, subjects } from '@/lib/dummy-data';
import {
  TrendingUp,
  Trophy,
  Target,
  BarChart3,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const currentStudent = students[0];
const studentAttempts = testAttempts
  .filter((a) => a.student_id === currentStudent.id)
  .sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

const avgScore =
  studentAttempts.length > 0
    ? Math.round(
        studentAttempts.reduce((sum, a) => sum + a.percentage, 0) /
          studentAttempts.length
      )
    : 0;

const highestScore =
  studentAttempts.length > 0
    ? Math.max(...studentAttempts.map((a) => a.percentage))
    : 0;

// Score trend data
const trendData = studentAttempts.map((attempt, index) => {
  const test = tests.find((t) => t.id === attempt.test_id);
  return {
    name: `Test ${index + 1}`,
    score: attempt.percentage,
    testName: test?.title ?? 'Unknown',
  };
});

// Subject-wise scores
const subjectScores: Record<string, { total: number; count: number }> = {};
studentAttempts.forEach((attempt) => {
  const test = tests.find((t) => t.id === attempt.test_id);
  if (test?.subject_id) {
    const subject = subjects.find((s) => s.id === test.subject_id);
    if (subject) {
      if (!subjectScores[subject.name]) {
        subjectScores[subject.name] = { total: 0, count: 0 };
      }
      subjectScores[subject.name].total += attempt.percentage;
      subjectScores[subject.name].count += 1;
    }
  }
});

// Add some extra subject data for a richer chart
const subjectData = [
  { subject: 'Physics', average: 83 },
  { subject: 'Chemistry', average: 75 },
  { subject: 'Mathematics', average: 89 },
  ...Object.entries(subjectScores)
    .filter(
      ([name]) =>
        !['Physics', 'Chemistry', 'Mathematics'].includes(name)
    )
    .map(([name, data]) => ({
      subject: name,
      average: Math.round(data.total / data.count),
    })),
];

// Enrich trend data with more points for better chart
const enrichedTrend = [
  { name: 'Week 1', score: 72 },
  { name: 'Week 2', score: 68 },
  { name: 'Week 3', score: 78 },
  { name: 'Week 4', score: 80 },
  { name: 'Week 5', score: 75 },
  { name: 'Week 6', score: 85 },
  { name: 'Week 7', score: 82 },
  { name: 'Week 8', score: 88 },
  { name: 'Week 9', score: 86 },
  { name: 'Week 10', score: 90 },
];

export default function PerformancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Performance</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track your test scores, progress trends, and subject-wise performance
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={<Target className="h-5 w-5" />}
          label="Average Score"
          value={`${avgScore}%`}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          icon={<Trophy className="h-5 w-5" />}
          label="Highest Score"
          value={`${highestScore}%`}
        />
        <StatCard
          icon={<BarChart3 className="h-5 w-5" />}
          label="Tests Taken"
          value={studentAttempts.length}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Score Trend */}
        <Card>
          <CardHeader>
            <CardTitle>
              <span className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Score Trend
              </span>
            </CardTitle>
          </CardHeader>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={enrichedTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#1e3a5f"
                  strokeWidth={2.5}
                  dot={{ fill: '#1e3a5f', r: 4 }}
                  activeDot={{ r: 6, fill: '#f97316' }}
                  name="Score %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Subject-wise Scores */}
        <Card>
          <CardHeader>
            <CardTitle>
              <span className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-accent" />
                Subject-wise Performance
              </span>
            </CardTitle>
          </CardHeader>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="subject"
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Bar
                  dataKey="average"
                  fill="#1e3a5f"
                  radius={[6, 6, 0, 0]}
                  name="Avg Score %"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Test Results</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left font-medium text-gray-500">
                  Test
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">
                  Course
                </th>
                <th className="px-4 py-3 text-center font-medium text-gray-500">
                  Score
                </th>
                <th className="px-4 py-3 text-center font-medium text-gray-500">
                  Percentage
                </th>
                <th className="px-4 py-3 text-center font-medium text-gray-500">
                  Rank
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {[...studentAttempts]
                .reverse()
                .map((attempt) => {
                  const test = tests.find((t) => t.id === attempt.test_id);
                  const course = test
                    ? courses.find((c) => c.id === test.course_id)
                    : null;

                  return (
                    <tr
                      key={attempt.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {test?.title ?? 'Unknown'}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {course?.name ?? 'Unknown'}
                      </td>
                      <td className="px-4 py-3 text-center font-semibold text-gray-900">
                        {attempt.score}/{attempt.total_marks}
                      </td>
                      <td className="px-4 py-3 text-center">
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
                      </td>
                      <td className="px-4 py-3 text-center">
                        {attempt.rank ? (
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                            #{attempt.rank}
                          </span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {formatDate(attempt.created_at)}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {studentAttempts.length === 0 && (
            <div className="py-8 text-center text-sm text-gray-500">
              No test results yet. Take a test to see your performance here.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

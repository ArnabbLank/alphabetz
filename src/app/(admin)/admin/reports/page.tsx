'use client';

import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Users, IndianRupee, BookOpen } from 'lucide-react';
import { students, courses, payments, enrollments } from '@/lib/dummy-data';
import { formatCurrency } from '@/lib/utils';
import { Card, CardHeader, CardTitle } from '@/components/shared/Card';
import { StatCard } from '@/components/shared/StatCard';

const totalRevenue = payments
  .filter((p) => p.status === 'success')
  .reduce((sum, p) => sum + p.amount, 0);

const totalStudents = students.length;
const activeEnrollments = enrollments.filter((e) => e.status === 'active').length;
const activeCourses = courses.filter((c) => c.status === 'active').length;

// Monthly revenue data (dummy aggregation)
const monthlyRevenue = [
  { month: 'Jan', revenue: 198000 },
  { month: 'Feb', revenue: 178000 },
  { month: 'Mar', revenue: 74000 },
  { month: 'Apr', revenue: 45000 },
  { month: 'May', revenue: 0 },
  { month: 'Jun', revenue: 0 },
  { month: 'Jul', revenue: 0 },
  { month: 'Aug', revenue: 0 },
  { month: 'Sep', revenue: 0 },
];

// Enrollment trend (students per month)
const enrollmentTrend = [
  { month: 'Jan', count: 3 },
  { month: 'Feb', count: 4 },
  { month: 'Mar', count: 2 },
  { month: 'Apr', count: 2 },
  { month: 'May', count: 1 },
  { month: 'Jun', count: 0 },
  { month: 'Jul', count: 0 },
  { month: 'Aug', count: 0 },
  { month: 'Sep', count: 0 },
];

// Course-wise enrollment
const courseEnrollment = courses
  .filter((c) => c.enrolled_count > 0)
  .map((c) => ({
    name: c.name.length > 20 ? c.name.slice(0, 20) + '...' : c.name,
    value: c.enrolled_count,
  }));

const PIE_COLORS = ['#1e3a5f', '#2a4f7f', '#f97316', '#10b981', '#6366f1', '#ec4899'];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-sm text-gray-500">Analytics and insights for your institute</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<IndianRupee size={20} />} label="Total Revenue" value={formatCurrency(totalRevenue)} trend={{ value: 12, isPositive: true }} />
        <StatCard icon={<Users size={20} />} label="Total Students" value={totalStudents} />
        <StatCard icon={<TrendingUp size={20} />} label="Active Enrollments" value={activeEnrollments} trend={{ value: 8, isPositive: true }} />
        <StatCard icon={<BookOpen size={20} />} label="Active Courses" value={activeCourses} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card padding="md">
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <span className="text-xs text-gray-500">2026</span>
          </CardHeader>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => [formatCurrency(Number(value)), 'Revenue']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Bar dataKey="revenue" fill="#1e3a5f" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Enrollment Trend */}
        <Card padding="md">
          <CardHeader>
            <CardTitle>Enrollment Trend</CardTitle>
            <span className="text-xs text-gray-500">2026</span>
          </CardHeader>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={enrollmentTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Line type="monotone" dataKey="count" stroke="#f97316" strokeWidth={2} dot={{ fill: '#f97316', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Course-wise Enrollment Pie */}
        <Card padding="md">
          <CardHeader>
            <CardTitle>Course-wise Enrollment</CardTitle>
          </CardHeader>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={courseEnrollment}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  label={({ name, percent }: any) => `${name ?? ''} (${((percent ?? 0) * 100).toFixed(0)}%)`}
                  labelLine={{ stroke: '#94a3b8' }}
                >
                  {courseEnrollment.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Payment Method Breakdown */}
        <Card padding="md">
          <CardHeader>
            <CardTitle>Payment Method Breakdown</CardTitle>
          </CardHeader>
          <div className="space-y-4 pt-2">
            {['upi', 'bank_transfer', 'cash', 'card'].map((method) => {
              const count = payments.filter((p) => p.method === method).length;
              const amount = payments.filter((p) => p.method === method && p.status === 'success').reduce((s, p) => s + p.amount, 0);
              const percentage = payments.length > 0 ? (count / payments.length) * 100 : 0;
              return (
                <div key={method}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="capitalize text-gray-700">{method.replace('_', ' ')}</span>
                    <span className="font-medium text-gray-900">{formatCurrency(amount)} ({count})</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-accent"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { Users, BookOpen, IndianRupee, UserPlus, Plus, Eye, ArrowRight } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { students, courses, payments, leads, enrollments, batches } from '@/lib/dummy-data';
import { formatCurrency, formatDate } from '@/lib/utils';
import { StatCard } from '@/components/shared/StatCard';
import { Card, CardHeader, CardTitle } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { Avatar } from '@/components/shared/Avatar';
import { Button } from '@/components/shared/Button';

const totalStudents = students.length;
const activeCourses = courses.filter((c) => c.status === 'active').length;
const revenueThisMonth = payments
  .filter((p) => p.status === 'success')
  .reduce((sum, p) => sum + p.amount, 0);
const pendingLeads = leads.filter((l) => l.status === 'new').length;

const enrollmentTrend = [
  { month: 'Apr', enrollments: 3 },
  { month: 'May', enrollments: 5 },
  { month: 'Jun', enrollments: 4 },
  { month: 'Jul', enrollments: 7 },
  { month: 'Aug', enrollments: 6 },
  { month: 'Sep', enrollments: 8 },
];

const recentEnrollments = enrollments.slice(-5).reverse();
const recentLeads = leads.slice(-5).reverse();

function getStudentName(id: string) {
  return students.find((s) => s.id === id)?.full_name ?? 'Unknown';
}
function getCourseName(id: string) {
  return courses.find((c) => c.id === id)?.name ?? 'Unknown';
}
function getBatchName(id: string) {
  return batches.find((b) => b.id === id)?.name ?? 'Unknown';
}

const paymentStatusVariant = (s: string) => {
  switch (s) {
    case 'paid': return 'success' as const;
    case 'partial': return 'warning' as const;
    case 'pending': return 'danger' as const;
    default: return 'default' as const;
  }
};

const leadStatusVariant = (s: string) => {
  switch (s) {
    case 'new': return 'info' as const;
    case 'contacted': return 'warning' as const;
    case 'follow_up': return 'warning' as const;
    case 'enrolled': return 'success' as const;
    case 'lost': return 'danger' as const;
    default: return 'default' as const;
  }
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, Admin. Here&apos;s your overview.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Users size={20} />}
          label="Total Students"
          value={totalStudents}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          icon={<BookOpen size={20} />}
          label="Active Courses"
          value={activeCourses}
        />
        <StatCard
          icon={<IndianRupee size={20} />}
          label="Revenue (Total)"
          value={formatCurrency(revenueThisMonth)}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          icon={<UserPlus size={20} />}
          label="Pending Leads"
          value={pendingLeads}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      {/* Enrollment Trend Chart + Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2" padding="md">
          <CardHeader>
            <CardTitle>Enrollment Trend</CardTitle>
            <span className="text-xs text-gray-500">Last 6 months</span>
          </CardHeader>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={enrollmentTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Area
                  type="monotone"
                  dataKey="enrollments"
                  stroke="#1e3a5f"
                  fill="#1e3a5f"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card padding="md">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            <Link href="/admin/students">
              <Button variant="primary" size="md" leftIcon={<Plus size={16} />} className="w-full justify-start">
                Add Student
              </Button>
            </Link>
            <Link href="/admin/courses">
              <Button variant="outline" size="md" leftIcon={<BookOpen size={16} />} className="w-full justify-start">
                Create Course
              </Button>
            </Link>
            <Link href="/admin/leads">
              <Button variant="ghost" size="md" leftIcon={<Eye size={16} />} className="w-full justify-start">
                View Leads
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Recent Enrollments & Recent Leads */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Enrollments */}
        <Card padding="none">
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <CardTitle>Recent Enrollments</CardTitle>
            <Link href="/admin/students" className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs text-gray-500">
                  <th className="px-5 py-3 font-medium">Student</th>
                  <th className="px-5 py-3 font-medium">Course</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Payment</th>
                </tr>
              </thead>
              <tbody>
                {recentEnrollments.map((e) => (
                  <tr key={e.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={getStudentName(e.student_id)} size="sm" />
                        <span className="font-medium text-gray-900">{getStudentName(e.student_id)}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{getCourseName(e.course_id)}</td>
                    <td className="px-5 py-3 text-gray-500">{formatDate(e.enrollment_date)}</td>
                    <td className="px-5 py-3">
                      <Badge variant={paymentStatusVariant(e.payment_status)}>
                        {e.payment_status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recent Leads */}
        <Card padding="none">
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <CardTitle>Recent Leads</CardTitle>
            <Link href="/admin/leads" className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs text-gray-500">
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Source</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((l) => (
                  <tr key={l.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-5 py-3 font-medium text-gray-900">{l.full_name}</td>
                    <td className="px-5 py-3 text-gray-600 capitalize">{l.source.replace('_', ' ')}</td>
                    <td className="px-5 py-3">
                      <Badge variant={leadStatusVariant(l.status)}>
                        {l.status.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-gray-500">{formatDate(l.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

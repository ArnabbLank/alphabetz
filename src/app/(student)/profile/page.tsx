'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';
import { Avatar } from '@/components/shared/Avatar';
import { Input } from '@/components/shared/Input';
import { formatDate, formatCurrency } from '@/lib/utils';
import {
  students,
  enrollments,
  courses,
  batches,
  payments,
} from '@/lib/dummy-data';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  CreditCard,
  Edit3,
  Save,
  X,
  GraduationCap,
  Shield,
} from 'lucide-react';
import type { PaymentTransactionStatus } from '@/types';

const currentStudent = students[0];
const studentEnrollments = enrollments.filter(
  (e) => e.student_id === currentStudent.id
);
const studentPayments = payments.filter(
  (p) => p.student_id === currentStudent.id
);

const paymentStatusVariant: Record<PaymentTransactionStatus, 'success' | 'warning' | 'danger' | 'default'> = {
  success: 'success',
  pending: 'warning',
  failed: 'danger',
  refunded: 'default',
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: currentStudent.full_name,
    phone: currentStudent.phone ?? '',
    email: currentStudent.email,
    address: currentStudent.address ?? '',
    city: currentStudent.city ?? '',
    state: currentStudent.state ?? '',
    pincode: currentStudent.pincode ?? '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSave() {
    // In real app, this would call an API
    setIsEditing(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your personal information and view account details
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card className="text-center">
            <Avatar
              name={currentStudent.full_name}
              size="xl"
              className="mx-auto"
            />
            <h2 className="mt-4 text-xl font-bold text-gray-900">
              {currentStudent.full_name}
            </h2>
            <p className="text-sm text-gray-500">{currentStudent.email}</p>
            <div className="mt-3 flex justify-center gap-2">
              <Badge variant="info">
                <span className="flex items-center gap-1">
                  <GraduationCap className="h-3 w-3" />
                  Student
                </span>
              </Badge>
              <Badge variant={currentStudent.is_active ? 'success' : 'danger'}>
                {currentStudent.is_active ? 'Active' : 'Inactive'}
              </Badge>
            </div>

            <div className="mt-5 space-y-3 border-t border-gray-100 pt-5 text-left">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-700">
                  {currentStudent.phone ?? 'Not provided'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-700">{currentStudent.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-700">
                  {currentStudent.city}, {currentStudent.state}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-700">
                  DOB:{' '}
                  {currentStudent.date_of_birth
                    ? formatDate(currentStudent.date_of_birth)
                    : 'Not provided'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-4 w-4 text-gray-400" />
                <span className="text-gray-700">
                  Guardian: {currentStudent.guardian_name ?? 'Not provided'}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Edit Form + Details */}
        <div className="space-y-6 lg:col-span-2">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>
                <span className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </span>
              </CardTitle>
              <Button
                variant={isEditing ? 'ghost' : 'outline'}
                size="sm"
                leftIcon={
                  isEditing ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <Edit3 className="h-4 w-4" />
                  )
                }
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </CardHeader>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Full Name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <Input
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <Input
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
                <Input
                  label="Pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {isEditing && (
              <div className="mt-4 flex justify-end">
                <Button
                  variant="primary"
                  leftIcon={<Save className="h-4 w-4" />}
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </div>
            )}
          </Card>

          {/* Enrolled Courses */}
          <Card>
            <CardHeader>
              <CardTitle>
                <span className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Enrolled Courses
                </span>
              </CardTitle>
            </CardHeader>
            <div className="space-y-3">
              {studentEnrollments.map((enrollment) => {
                const course = courses.find(
                  (c) => c.id === enrollment.course_id
                );
                const batch = batches.find(
                  (b) => b.id === enrollment.batch_id
                );

                return (
                  <div
                    key={enrollment.id}
                    className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-4"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {course?.name ?? 'Unknown Course'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {batch?.name ?? 'Unknown Batch'} · Enrolled{' '}
                        {formatDate(enrollment.enrollment_date)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          enrollment.status === 'active'
                            ? 'success'
                            : enrollment.status === 'completed'
                            ? 'info'
                            : 'warning'
                        }
                      >
                        {enrollment.status}
                      </Badge>
                      <Badge
                        variant={
                          enrollment.payment_status === 'paid'
                            ? 'success'
                            : enrollment.payment_status === 'partial'
                            ? 'warning'
                            : 'danger'
                        }
                      >
                        {enrollment.payment_status}
                      </Badge>
                    </div>
                  </div>
                );
              })}
              {studentEnrollments.length === 0 && (
                <p className="py-4 text-center text-sm text-gray-500">
                  No enrollments found.
                </p>
              )}
            </div>
          </Card>

          {/* Payment History */}
          <Card>
            <CardHeader>
              <CardTitle>
                <span className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Payment History
                </span>
              </CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-3 py-3 text-left font-medium text-gray-500">
                      Date
                    </th>
                    <th className="px-3 py-3 text-left font-medium text-gray-500">
                      Amount
                    </th>
                    <th className="px-3 py-3 text-left font-medium text-gray-500">
                      Method
                    </th>
                    <th className="px-3 py-3 text-left font-medium text-gray-500">
                      Status
                    </th>
                    <th className="px-3 py-3 text-left font-medium text-gray-500">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {studentPayments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-3 py-3 text-gray-700">
                        {formatDate(payment.payment_date)}
                      </td>
                      <td className="px-3 py-3 font-semibold text-gray-900">
                        {formatCurrency(payment.amount)}
                      </td>
                      <td className="px-3 py-3 capitalize text-gray-600">
                        {payment.method.replace('_', ' ')}
                      </td>
                      <td className="px-3 py-3">
                        <Badge variant={paymentStatusVariant[payment.status]}>
                          {payment.status}
                        </Badge>
                      </td>
                      <td className="px-3 py-3 text-gray-500">
                        {payment.notes ?? '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {studentPayments.length === 0 && (
                <div className="py-8 text-center text-sm text-gray-500">
                  No payment records found.
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

'use client';

import { IndianRupee, Eye, Download, Receipt } from 'lucide-react';
import { payments, students, enrollments } from '@/lib/dummy-data';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Card } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';
import { StatCard } from '@/components/shared/StatCard';
import { Avatar } from '@/components/shared/Avatar';

function getStudentName(studentId: string) {
  return students.find((s) => s.id === studentId)?.full_name ?? 'Unknown';
}

const totalRevenue = payments
  .filter((p) => p.status === 'success')
  .reduce((sum, p) => sum + p.amount, 0);

const pendingAmount = enrollments
  .filter((e) => e.payment_status === 'pending' || e.payment_status === 'partial')
  .reduce((sum, e) => sum + (e.fee_total - e.fee_paid), 0);

const thisMonthPayments = payments.filter((p) => {
  const date = new Date(p.payment_date);
  return date.getMonth() === 8 && date.getFullYear() === 2026;
});
const thisMonthRevenue = thisMonthPayments
  .filter((p) => p.status === 'success')
  .reduce((sum, p) => sum + p.amount, 0);

const statusVariant = (s: string) => {
  switch (s) {
    case 'success': return 'success' as const;
    case 'pending': return 'warning' as const;
    case 'failed': return 'danger' as const;
    case 'refunded': return 'info' as const;
    default: return 'default' as const;
  }
};

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-sm text-gray-500">{payments.length} transactions</p>
        </div>
        <Button leftIcon={<Download size={16} />} variant="outline" size="sm">
          Export Transactions
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={<IndianRupee size={20} />}
          label="Total Revenue"
          value={formatCurrency(totalRevenue)}
          trend={{ value: 15, isPositive: true }}
        />
        <StatCard
          icon={<IndianRupee size={20} />}
          label="This Month"
          value={formatCurrency(thisMonthRevenue)}
        />
        <StatCard
          icon={<Receipt size={20} />}
          label="Pending Dues"
          value={formatCurrency(pendingAmount)}
          className="border-amber-200"
        />
      </div>

      {/* Payments Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
                <th className="px-5 py-3 font-medium">Student</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Method</th>
                <th className="px-5 py-3 font-medium">Transaction ID</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Notes</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar name={getStudentName(payment.student_id)} size="sm" />
                      <span className="font-medium text-gray-900">{getStudentName(payment.student_id)}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 font-semibold text-gray-900">{formatCurrency(payment.amount)}</td>
                  <td className="px-5 py-3 text-gray-600">{formatDate(payment.payment_date)}</td>
                  <td className="px-5 py-3">
                    <span className="capitalize text-gray-600">{payment.method.replace('_', ' ')}</span>
                  </td>
                  <td className="px-5 py-3 text-gray-500 font-mono text-xs">
                    {payment.transaction_id || '—'}
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={statusVariant(payment.status)}>{payment.status}</Badge>
                  </td>
                  <td className="px-5 py-3 text-gray-500 max-w-[160px] truncate">
                    {payment.notes || '—'}
                  </td>
                  <td className="px-5 py-3">
                    <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-primary" title="View Receipt">
                      <Eye size={16} />
                    </button>
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

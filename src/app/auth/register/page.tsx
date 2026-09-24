'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/shared/Input';
import { Select } from '@/components/shared/Select';
import { Button } from '@/components/shared/Button';
import { UserPlus, CheckCircle, Info } from 'lucide-react';

// ─── Course options for dropdown ──────────────────────

const courseOptions = [
  { value: 'jee-preparation', label: 'JEE Main & Advanced Preparation' },
  { value: 'neet-preparation', label: 'NEET-UG Medical Preparation' },
  { value: 'wbjee-preparation', label: 'WBJEE Engineering Preparation' },
  { value: 'board-exam-class-12', label: 'Board Exam (Class 12) Preparation' },
  { value: 'board-exam-class-10', label: 'Board Exam (Class 10) Foundation' },
  { value: 'wbcs-preparation', label: 'WBCS Exam Preparation' },
  { value: 'spoken-english', label: 'Spoken English & Communication' },
];

// ─── Validation schema ────────────────────────────────

const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name is too long'),
    phone: z
      .string()
      .min(1, 'Phone number is required')
      .regex(/^\d{10}$/, 'Enter a valid 10-digit phone number'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Enter a valid email address'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(1, 'Please confirm your password'),
    courseInterest: z
      .string()
      .min(1, 'Please select a course'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

// ─── Component ────────────────────────────────────────

export default function RegisterPage() {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      courseInterest: '',
    },
  });

  async function onSubmit(data: RegisterFormData) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Log data (would be sent to Supabase in real implementation)
    console.log('Registration data:', {
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      courseInterest: data.courseInterest,
    });

    setSuccessMessage(
      'Registration successful! Redirecting to student login...'
    );

    // Redirect to student login after a short delay
    setTimeout(() => {
      router.push('/student/login');
    }, 2000);
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Student Registration</h2>
        <p className="mt-1 text-sm text-gray-500">
          Join Alphabetz and start your learning journey
        </p>
      </div>

      {/* Student-only note */}
      <div className="mb-4 flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
        <p className="text-sm text-blue-700">
          This registration is for <strong>students only</strong>. Teachers and
          staff are added by the administrator.
        </p>
      </div>

      {/* Success message */}
      {successMessage && (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 p-3">
          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
          <p className="text-sm text-green-700">{successMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          placeholder="Rahul Sharma"
          autoComplete="name"
          error={errors.fullName?.message}
          {...register('fullName')}
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="9876543210"
          autoComplete="tel"
          error={errors.phone?.message}
          {...register('phone')}
        />

        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Min 6 characters"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register('password')}
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Re-enter password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <Select
          label="Course Interest"
          placeholder="Select a course"
          options={courseOptions}
          error={errors.courseInterest?.message}
          {...register('courseInterest')}
        />

        <Button
          type="submit"
          size="lg"
          className="w-full"
          isLoading={isSubmitting}
          leftIcon={<UserPlus className="h-4 w-4" />}
          disabled={!!successMessage}
        >
          Register
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link
          href="/student/login"
          className="font-semibold text-primary hover:text-primary-light transition-colors"
        >
          Student Login
        </Link>
      </p>
    </div>
  );
}

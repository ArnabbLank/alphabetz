'use client';

import Link from 'next/link';
import { GraduationCap, Shield, Users } from 'lucide-react';

export default function AuthLoginRouter() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900">Welcome to Alphabetz</h2>
        <p className="mt-1 text-sm text-gray-500">
          Choose your login portal to continue
        </p>
      </div>

      <div className="space-y-4">
        {/* Student login */}
        <Link
          href="/student/login"
          className="group flex items-center gap-4 rounded-xl border-2 border-gray-200 bg-white p-5 transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
            <GraduationCap className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-gray-900">
              I am a Student
            </h3>
            <p className="mt-0.5 text-sm text-gray-500">
              Access courses, tests, study materials &amp; more
            </p>
          </div>
          <Users className="h-5 w-5 text-gray-300 transition-colors group-hover:text-primary" />
        </Link>

        {/* Admin/Teacher login */}
        <Link
          href="/admin/login"
          className="group flex items-center gap-4 rounded-xl border-2 border-gray-200 bg-white p-5 transition-all hover:border-slate-700 hover:shadow-lg hover:shadow-slate-700/10"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-colors group-hover:bg-slate-800 group-hover:text-white">
            <Shield className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-gray-900">
              I am a Teacher / Admin
            </h3>
            <p className="mt-0.5 text-sm text-gray-500">
              Manage students, content &amp; institute operations
            </p>
          </div>
          <Users className="h-5 w-5 text-gray-300 transition-colors group-hover:text-slate-700" />
        </Link>
      </div>

      <p className="text-center text-xs text-gray-400">
        Not sure? Students should use the Student portal.
        <br />
        Teachers and administrators use the Admin portal.
      </p>
    </div>
  );
}

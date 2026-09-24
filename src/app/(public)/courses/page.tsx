import Link from 'next/link';
import type { Metadata } from 'next';
import { Clock, Users, ArrowRight } from 'lucide-react';
import { courses } from '@/lib/dummy-data';
import { formatCurrency } from '@/lib/utils';
import { Card } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';
import { SectionHeader } from '@/components/shared/SectionHeader';

export const metadata: Metadata = {
  title: 'Courses',
  description:
    'Explore our comprehensive coaching programs for JEE, NEET, WBJEE, Board exams, and more at Alphabetz, Durgapur.',
};

function categoryBadgeVariant(category: string) {
  switch (category) {
    case 'Engineering':
      return 'info' as const;
    case 'Medical':
      return 'success' as const;
    case 'Board Exam':
      return 'warning' as const;
    case 'Government Exam':
      return 'default' as const;
    default:
      return 'default' as const;
  }
}

export default function CoursesPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-primary py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Our Courses</h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-300 sm:text-lg">
            Comprehensive coaching programs tailored to help you excel in competitive and board examinations.
          </p>
        </div>
      </section>

      {/* Course grid */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id} hover padding="none" className="flex flex-col overflow-hidden">
                {/* Thumbnail */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://picsum.photos/seed/${course.slug}/600/300`}
                  alt={course.name}
                  className="h-48 w-full object-cover"
                />

                <div className="flex flex-1 flex-col p-5">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={categoryBadgeVariant(course.category)}>
                      {course.category}
                    </Badge>
                    {course.status === 'upcoming' && (
                      <Badge variant="warning">Upcoming</Badge>
                    )}
                    {course.is_featured && (
                      <Badge variant="success">Featured</Badge>
                    )}
                  </div>

                  {/* Title & description */}
                  <h2 className="mt-3 text-lg font-semibold text-gray-900">{course.name}</h2>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-gray-600">
                    {course.short_description}
                  </p>

                  {/* Features preview */}
                  <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1">
                    {course.features.slice(0, 4).map((feature) => (
                      <li key={feature} className="flex items-center gap-1.5 text-xs text-gray-500">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Meta */}
                  <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {course.duration_months} months
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {course.enrolled_count}/{course.max_students} enrolled
                    </span>
                  </div>

                  {/* Price & CTA */}
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      {course.discounted_fee ? (
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-primary">
                            {formatCurrency(course.discounted_fee)}
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            {formatCurrency(course.fee)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xl font-bold text-primary">
                          {formatCurrency(course.fee)}
                        </span>
                      )}
                    </div>
                    <Link href="/contact">
                      <Button variant="secondary" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-12">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Can&apos;t decide which course is right for you?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-300">
            Talk to our academic counsellors for free. We&apos;ll help you pick the best program based on your goals.
          </p>
          <div className="mt-6">
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Get Free Counselling
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

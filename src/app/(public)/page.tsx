'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Users,
  BookOpen,
  TrendingUp,
  Target,
  Clock,
  Award,
  Shield,
  Headphones,
  Star,
  Phone,
  ArrowRight,
  Quote,
} from 'lucide-react';
import { courses, resultShowcases } from '@/lib/dummy-data';
import { formatCurrency } from '@/lib/utils';
import { Card } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';
import { SectionHeader } from '@/components/shared/SectionHeader';

/* ────────────── Hero Slides ────────────── */

const heroSlides = [
  {
    title: 'Admissions Open 2026-27',
    subtitle: 'Begin your journey towards academic excellence at Durgapur\'s premier coaching institute.',
    cta: 'Apply Now',
    ctaHref: '/contact',
    image: 'https://picsum.photos/seed/alphabetz-hero1/1200/600',
  },
  {
    title: 'JEE & NEET Preparation',
    subtitle: 'Expert faculty from IIT/NIT & AIIMS guide you to crack India\'s toughest exams.',
    cta: 'Explore Courses',
    ctaHref: '/courses',
    image: 'https://picsum.photos/seed/alphabetz-hero2/1200/600',
  },
  {
    title: 'WBJEE Coaching',
    subtitle: 'Focused coaching for West Bengal engineering aspirants with state-rank mentors.',
    cta: 'Learn More',
    ctaHref: '/courses',
    image: 'https://picsum.photos/seed/alphabetz-hero3/1200/600',
  },
  {
    title: 'Board Exam Foundation',
    subtitle: 'Build a rock-solid foundation for Madhyamik and HS exams with our structured programs.',
    cta: 'Get Started',
    ctaHref: '/courses',
    image: 'https://picsum.photos/seed/alphabetz-hero4/1200/600',
  },
  {
    title: 'Career Counselling',
    subtitle: 'Personalized guidance to help students choose the right career path after board exams.',
    cta: 'Talk to Us',
    ctaHref: '/contact',
    image: 'https://picsum.photos/seed/alphabetz-hero5/1200/600',
  },
];

/* ────────────── Stats ────────────── */

const stats = [
  { icon: Clock, value: '5+', label: 'Years of Excellence' },
  { icon: Users, value: '500+', label: 'Students Coached' },
  { icon: BookOpen, value: '10+', label: 'Courses Offered' },
  { icon: TrendingUp, value: '95%', label: 'Success Rate' },
];

/* ────────────── Why Choose Us ────────────── */

const benefits = [
  {
    icon: GraduationCap,
    title: 'Expert Faculty',
    description: 'IIT, NIT & AIIMS alumni with 10–20 years of teaching experience.',
  },
  {
    icon: Target,
    title: 'Proven Results',
    description: 'Consistent top ranks in JEE, NEET, and WBJEE every year.',
  },
  {
    icon: BookOpen,
    title: 'Comprehensive Material',
    description: 'Curated study material, formula sheets, and previous year papers.',
  },
  {
    icon: Shield,
    title: 'Small Batch Size',
    description: 'Maximum 30 students per batch for personalized attention.',
  },
  {
    icon: Headphones,
    title: 'Doubt Support',
    description: 'Dedicated doubt-clearing sessions and faculty access beyond class hours.',
  },
  {
    icon: Award,
    title: 'Regular Assessments',
    description: 'Weekly tests, mock exams, and detailed performance analytics.',
  },
];

/* ────────────── Component ────────────── */

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (idx: number) => setCurrentSlide(idx);
  const prev = () => setCurrentSlide((c) => (c - 1 + heroSlides.length) % heroSlides.length);
  const next = () => setCurrentSlide((c) => (c + 1) % heroSlides.length);

  const featuredCourses = courses.filter((c) => c.status === 'active').slice(0, 6);
  const featuredResults = resultShowcases.filter((r) => r.is_featured);

  return (
    <>
      {/* ═══════ HERO CAROUSEL ═══════ */}
      <section className="relative h-[520px] overflow-hidden sm:h-[560px] lg:h-[600px]" aria-label="Hero carousel">
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ opacity: idx === currentSlide ? 1 : 0, zIndex: idx === currentSlide ? 10 : 0 }}
            aria-hidden={idx !== currentSlide}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
            />
            <div className="gradient-overlay absolute inset-0" />
            <div className="absolute inset-0 flex items-center">
              <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                  <Badge variant="warning" className="mb-4 bg-accent/20 text-accent-light border-accent/30 text-sm px-3 py-1">
                    Alphabetz Coaching
                  </Badge>
                  <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                    {slide.title}
                  </h1>
                  <p className="mt-4 text-base leading-relaxed text-gray-200 sm:text-lg lg:text-xl">
                    {slide.subtitle}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href={slide.ctaHref}>
                      <Button variant="secondary" size="lg">
                        {slide.cta}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/courses">
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-white/40 text-white hover:bg-white/10 hover:text-white"
                      >
                        View Courses
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/40"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/40"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`h-2.5 rounded-full transition-all ${
                idx === currentSlide ? 'w-8 bg-accent' : 'w-2.5 bg-white/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section className="bg-primary py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <stat.icon className="h-6 w-6 text-accent" />
              </div>
              <p className="text-3xl font-extrabold text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ COURSES ═══════ */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Courses"
            subtitle="Comprehensive coaching programs designed to help students achieve their academic goals."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course) => (
              <Card key={course.id} hover padding="none" className="overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://picsum.photos/seed/${course.slug}/600/300`}
                  alt={course.name}
                  className="h-44 w-full object-cover"
                />
                <div className="p-5">
                  <Badge
                    variant={
                      course.category === 'Engineering'
                        ? 'info'
                        : course.category === 'Medical'
                          ? 'success'
                          : 'default'
                    }
                  >
                    {course.category}
                  </Badge>
                  <h3 className="mt-2 text-lg font-semibold text-gray-900">{course.name}</h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-gray-600">
                    {course.short_description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      {course.discounted_fee ? (
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold text-primary">
                            {formatCurrency(course.discounted_fee)}
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            {formatCurrency(course.fee)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-primary">
                          {formatCurrency(course.fee)}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {course.duration_months} months
                    </span>
                  </div>

                  <Link href="/courses" className="mt-4 block">
                    <Button variant="outline" size="sm" className="w-full">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/courses">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ WHY CHOOSE US ═══════ */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Why Choose Alphabetz?"
            subtitle="We go beyond traditional coaching to ensure every student reaches their full potential."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <Card key={benefit.title} hover padding="lg" className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <benefit.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ RESULTS / TOPPERS ═══════ */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Toppers"
            subtitle="Our students consistently achieve outstanding results in competitive examinations."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredResults.map((result) => (
              <Card key={result.id} hover padding="lg">
                <div className="flex items-start gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://picsum.photos/seed/${result.student_name.replace(/\s/g, '')}/100/100`}
                    alt={result.student_name}
                    className="h-16 w-16 rounded-full object-cover ring-2 ring-accent/20"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{result.student_name}</h3>
                    <p className="text-sm text-accent font-medium">{result.exam_name}</p>
                    <div className="mt-1 flex items-center gap-3 text-sm text-gray-600">
                      {result.rank && <span>Rank: <strong>#{result.rank}</strong></span>}
                      <span>Score: <strong>{result.score}</strong></span>
                    </div>
                  </div>
                </div>
                {result.testimonial && (
                  <div className="mt-4 flex gap-2 rounded-lg bg-gray-50 p-3">
                    <Quote className="h-4 w-4 shrink-0 text-accent/50" />
                    <p className="text-sm italic text-gray-600 leading-relaxed">
                      {result.testimonial}
                    </p>
                  </div>
                )}
                <div className="mt-3 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1 text-xs text-gray-500">{result.year}</span>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/results">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                View All Results
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ CONTACT CTA ═══════ */}
      <section className="relative overflow-hidden bg-primary py-16 lg:py-20">
        <div className="absolute inset-0 bg-pattern opacity-10" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Ready to Start Your Journey?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
            Join Alphabetz today and take the first step towards cracking JEE, NEET, WBJEE,
            or any competitive exam. Our expert faculty and proven methods will guide you to
            success.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact">
              <Button variant="secondary" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Enroll Now
              </Button>
            </Link>
            <a href="tel:+919073456789">
              <Button
                variant="outline"
                size="lg"
                leftIcon={<Phone className="h-4 w-4" />}
                className="border-white/40 text-white hover:bg-white/10 hover:text-white"
              >
                +91 90734 56789
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

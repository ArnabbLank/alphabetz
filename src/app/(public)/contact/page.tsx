'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Send,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { courses } from '@/lib/dummy-data';
import { Card } from '@/components/shared/Card';
import { Input } from '@/components/shared/Input';
import { Textarea } from '@/components/shared/Textarea';
import { Select } from '@/components/shared/Select';
import { Button } from '@/components/shared/Button';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { useState } from 'react';

/* ─── Validation Schema ──────────────── */

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z
    .string()
    .min(10, 'Phone must be at least 10 digits')
    .max(13, 'Phone is too long')
    .regex(/^[+]?\d{10,13}$/, 'Enter a valid phone number'),
  email: z
    .string()
    .email('Enter a valid email')
    .or(z.literal('')),
  courseInterest: z.string().optional(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message is too long'),
});

type ContactFormData = z.infer<typeof contactSchema>;

/* ─── Contact Info Cards ──────────────── */

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: ['123 City Centre, Near Benachity', 'Durgapur, West Bengal 713213'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['+91 90734 56789', '+91 90734 56790'],
    href: 'tel:+919073456789',
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['info@alphabetz.in', 'admissions@alphabetz.in'],
    href: 'mailto:info@alphabetz.in',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    lines: ['+91 90734 56789', 'Quick responses within 1 hour'],
    href: 'https://wa.me/919073456789',
  },
];

/* ─── Component ──────────────── */

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      courseInterest: '',
      message: '',
    },
  });

  const onSubmit = (data: ContactFormData) => {
    console.log('Contact form submitted:', data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  const courseOptions = [
    { value: '', label: 'Select a course' },
    ...courses.map((c) => ({ value: c.id, label: c.name })),
  ];

  return (
    <>
      {/* Page header */}
      <section className="bg-primary py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Contact Us</h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-300 sm:text-lg">
            Have questions? We&apos;d love to hear from you. Reach out for admissions, course
            details, or any other inquiry.
          </p>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info) => (
              <Card key={info.title} hover padding="lg" className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <info.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-900">{info.title}</h3>
                <div className="mt-2 space-y-0.5">
                  {info.lines.map((line, idx) =>
                    info.href && idx === 0 ? (
                      <a
                        key={idx}
                        href={info.href}
                        className="block text-sm text-accent hover:underline"
                        target={info.href.startsWith('http') ? '_blank' : undefined}
                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {line}
                      </a>
                    ) : (
                      <p key={idx} className="text-sm text-gray-600">
                        {line}
                      </p>
                    )
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Form + map section */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Inquiry form */}
            <div>
              <SectionHeader
                title="Send Us a Message"
                subtitle="Fill out the form below and our team will get back to you within 24 hours."
                align="left"
              />

              {submitted && (
                <div className="mb-6 flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="font-medium text-emerald-800">Message sent successfully!</p>
                    <p className="text-sm text-emerald-600">
                      We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <Input
                  label="Full Name *"
                  placeholder="Enter your full name"
                  error={errors.name?.message}
                  {...register('name')}
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Phone Number *"
                    placeholder="e.g. 9073456789"
                    type="tel"
                    error={errors.phone?.message}
                    {...register('phone')}
                  />
                  <Input
                    label="Email"
                    placeholder="your@email.com"
                    type="email"
                    error={errors.email?.message}
                    {...register('email')}
                  />
                </div>

                <Select
                  label="Course Interest"
                  options={courseOptions}
                  placeholder="Select a course"
                  error={errors.courseInterest?.message}
                  {...register('courseInterest')}
                />

                <Textarea
                  label="Message *"
                  placeholder="Tell us about your requirements, questions, or anything else..."
                  error={errors.message?.message}
                  {...register('message')}
                />

                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  isLoading={isSubmitting}
                  leftIcon={<Send className="h-4 w-4" />}
                  className="w-full sm:w-auto"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Right side info */}
            <div className="space-y-6">
              {/* Map placeholder */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://picsum.photos/seed/alphabetz-contact-map/800/400"
                alt="Alphabetz Location"
                className="h-64 w-full rounded-2xl object-cover shadow-lg lg:h-80"
              />

              {/* Office hours */}
              <Card padding="lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Clock className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Office Hours</h3>
                </div>
                <div className="space-y-2.5">
                  {[
                    { day: 'Monday – Friday', time: '6:30 AM – 8:00 PM' },
                    { day: 'Saturday', time: '6:30 AM – 6:00 PM' },
                    { day: 'Sunday', time: 'Closed (except during exams)' },
                  ].map((slot) => (
                    <div key={slot.day} className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">{slot.day}</span>
                      <span className="text-gray-600">{slot.time}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick note */}
              <Card padding="lg" className="border-l-4 border-l-accent bg-accent/5">
                <h3 className="font-semibold text-gray-900">Free Counselling Session</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  Not sure which course is right for you? Book a free 30-minute counselling
                  session with our academic advisors. Call us or fill out the form above with
                  &quot;Counselling&quot; in the message.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from 'next';
import {
  Target,
  Eye,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Award,
} from 'lucide-react';
import { faculty, centers } from '@/lib/dummy-data';
import { Card } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Avatar } from '@/components/shared/Avatar';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Alphabetz coaching institute — our mission, vision, expert faculty, and campus in Durgapur, West Bengal.',
};

export default function AboutPage() {
  const mainCenter = centers[0];

  return (
    <>
      {/* Page header */}
      <section className="bg-primary py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">About Alphabetz</h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-300 sm:text-lg">
            Durgapur&apos;s premier coaching institute for competitive and board exam preparation.
          </p>
        </div>
      </section>

      {/* About section */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://picsum.photos/seed/alphabetz-about/800/500"
              alt="Alphabetz Campus"
              className="rounded-2xl object-cover shadow-lg"
            />

            {/* Content */}
            <div>
              <Badge variant="info" className="mb-3">Est. 2021</Badge>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Shaping the Future of Education in Durgapur
              </h2>
              <p className="mt-4 leading-relaxed text-gray-600">
                Alphabetz was founded with a singular vision: to provide world-class competitive
                exam coaching to students in Durgapur and surrounding areas of West Bengal.
                What started as a small coaching centre has grown into one of the most trusted
                names in JEE, NEET, and WBJEE preparation in the region.
              </p>
              <p className="mt-3 leading-relaxed text-gray-600">
                Our approach combines rigorous academics with personalized mentoring. We believe
                every student has the potential to excel — they just need the right guidance,
                structured preparation, and a supportive environment. With experienced faculty,
                regularly updated study material, and a proven assessment system, we have helped
                hundreds of students realize their dreams of entering top engineering and medical
                colleges.
              </p>
              <p className="mt-3 leading-relaxed text-gray-600">
                Located in the heart of Durgapur&apos;s City Centre area, our campus is
                well-equipped with smart classrooms, a reading room, and a dedicated science lab
                to support practical learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Our Mission & Vision" />
          <div className="grid gap-8 sm:grid-cols-2">
            <Card padding="lg" className="border-l-4 border-l-accent">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
              <p className="mt-3 leading-relaxed text-gray-600">
                To democratize quality education and make competitive exam coaching accessible
                to students in Durgapur and tier-2 cities of West Bengal. We are committed to
                nurturing academic excellence through expert teaching, cutting-edge study
                material, and a culture of continuous improvement.
              </p>
            </Card>

            <Card padding="lg" className="border-l-4 border-l-primary">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
              <p className="mt-3 leading-relaxed text-gray-600">
                To be the most trusted coaching institute in West Bengal, recognized for
                consistently producing top rankers in JEE, NEET, and WBJEE. We envision a
                future where geographical location is no barrier to academic success — where
                students from Durgapur compete with and outperform students from metro cities.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Expert Faculty"
            subtitle="Learn from the best minds with decades of teaching experience."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {faculty.filter((f) => f.is_active).map((member) => (
              <Card key={member.id} hover padding="lg">
                <div className="flex items-start gap-4">
                  <Avatar name={member.full_name} size="xl" />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{member.full_name}</h3>
                    <p className="text-sm font-medium text-accent">{member.designation}</p>
                    <Badge variant="info" className="mt-1">
                      {member.department}
                    </Badge>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-700">Specialization:</span>{' '}
                    {member.specialization}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-700">Qualification:</span>{' '}
                    {member.qualification}
                  </p>
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <Award className="h-4 w-4 text-accent" />
                    <span>{member.experience_years} years of experience</span>
                  </div>
                </div>

                {member.bio && (
                  <p className="mt-4 text-sm leading-relaxed text-gray-500 line-clamp-3">
                    {member.bio}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Location"
            subtitle="Visit us at our campus in the heart of Durgapur."
          />

          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            {/* Map placeholder */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://picsum.photos/seed/alphabetz-map/800/400"
              alt="Alphabetz Location Map"
              className="rounded-2xl object-cover shadow-lg"
            />

            <div className="space-y-6">
              {centers.filter((c) => c.is_active).map((center) => (
                <Card key={center.id} padding="lg">
                  <h3 className="text-lg font-semibold text-gray-900">{center.name}</h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex gap-3 text-sm text-gray-600">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>
                        {center.address}, {center.city}, {center.state} {center.pincode}
                      </span>
                    </div>
                    <div className="flex gap-3 text-sm text-gray-600">
                      <Phone className="h-4 w-4 shrink-0 text-accent" />
                      <a href={`tel:+91${center.phone}`} className="hover:text-primary">
                        +91 {center.phone}
                      </a>
                    </div>
                    {center.email && (
                      <div className="flex gap-3 text-sm text-gray-600">
                        <Mail className="h-4 w-4 shrink-0 text-accent" />
                        <a href={`mailto:${center.email}`} className="hover:text-primary">
                          {center.email}
                        </a>
                      </div>
                    )}
                    <div className="flex gap-3 text-sm text-gray-600">
                      <BookOpen className="h-4 w-4 shrink-0 text-accent" />
                      <span>Capacity: {center.capacity} students</span>
                    </div>
                  </div>
                  {center.google_maps_url && (
                    <a
                      href={center.google_maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                    >
                      View on Google Maps →
                    </a>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

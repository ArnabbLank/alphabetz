import type { Metadata } from 'next';
import { Trophy, Star, Quote } from 'lucide-react';
import { resultShowcases } from '@/lib/dummy-data';
import { Card } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { SectionHeader } from '@/components/shared/SectionHeader';

export const metadata: Metadata = {
  title: 'Results',
  description:
    'See the outstanding results achieved by Alphabetz students in JEE, NEET, WBJEE, and board examinations.',
};

function examBadgeVariant(exam: string) {
  if (exam.includes('JEE')) return 'info' as const;
  if (exam.includes('NEET')) return 'success' as const;
  if (exam.includes('WBJEE')) return 'warning' as const;
  return 'default' as const;
}

export default function ResultsPage() {
  const featured = resultShowcases.filter((r) => r.is_featured);
  const others = resultShowcases.filter((r) => !r.is_featured);

  return (
    <>
      {/* Page header */}
      <section className="bg-primary py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Our Results</h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-300 sm:text-lg">
            Our students consistently achieve top ranks in JEE, NEET, WBJEE, and board
            examinations. Here are some of our proud achievers.
          </p>
        </div>
      </section>

      {/* Stats banner */}
      <section className="border-b border-gray-200 bg-white py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { value: '50+', label: 'JEE Selections' },
            { value: '80+', label: 'NEET Selections' },
            { value: '100+', label: 'WBJEE Selections' },
            { value: '95%+', label: 'Board Pass Rate' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-extrabold text-primary">{stat.value}</p>
              <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured toppers */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Star Performers"
            subtitle="Meet our top achievers who made us proud."
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((result) => (
              <Card key={result.id} hover padding="none" className="overflow-hidden">
                {/* Photo + overlay */}
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://picsum.photos/seed/${result.student_name.replace(/\s/g, '')}/600/350`}
                    alt={result.student_name}
                    className="h-56 w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-amber-400" />
                      <Badge variant={examBadgeVariant(result.exam_name)}>
                        {result.exam_name}
                      </Badge>
                    </div>
                    <h3 className="mt-2 text-xl font-bold text-white">{result.student_name}</h3>
                  </div>
                </div>

                <div className="p-5">
                  {/* Score & rank */}
                  <div className="flex items-center gap-4">
                    {result.rank && (
                      <div className="rounded-lg bg-primary/10 px-3 py-1.5 text-center">
                        <p className="text-xs text-gray-500">Rank</p>
                        <p className="text-lg font-bold text-primary">#{result.rank}</p>
                      </div>
                    )}
                    <div className="rounded-lg bg-accent/10 px-3 py-1.5 text-center">
                      <p className="text-xs text-gray-500">Score</p>
                      <p className="text-lg font-bold text-accent">{result.score}</p>
                    </div>
                    <div className="rounded-lg bg-gray-100 px-3 py-1.5 text-center">
                      <p className="text-xs text-gray-500">Year</p>
                      <p className="text-lg font-bold text-gray-700">{result.year}</p>
                    </div>
                  </div>

                  {/* Testimonial */}
                  {result.testimonial && (
                    <div className="mt-4 flex gap-2 rounded-lg bg-gray-50 p-3">
                      <Quote className="mt-0.5 h-4 w-4 shrink-0 text-accent/50" />
                      <p className="text-sm italic leading-relaxed text-gray-600">
                        {result.testimonial}
                      </p>
                    </div>
                  )}

                  {/* Stars */}
                  <div className="mt-3 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Other results */}
      {others.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="More Achievers"
              subtitle="Every student's success is a source of pride for us."
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((result) => (
                <Card key={result.id} hover padding="lg">
                  <div className="flex items-start gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://picsum.photos/seed/${result.student_name.replace(/\s/g, '')}-sm/100/100`}
                      alt={result.student_name}
                      className="h-14 w-14 rounded-full object-cover ring-2 ring-accent/20"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{result.student_name}</h3>
                      <Badge variant={examBadgeVariant(result.exam_name)} className="mt-1">
                        {result.exam_name}
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3 text-sm text-gray-600">
                    {result.rank && (
                      <span>
                        Rank: <strong className="text-primary">#{result.rank}</strong>
                      </span>
                    )}
                    <span>
                      Score: <strong className="text-accent">{result.score}</strong>
                    </span>
                    <span>Year: <strong>{result.year}</strong></span>
                  </div>

                  {result.testimonial && (
                    <p className="mt-3 text-sm italic text-gray-500 line-clamp-2">
                      &ldquo;{result.testimonial}&rdquo;
                    </p>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

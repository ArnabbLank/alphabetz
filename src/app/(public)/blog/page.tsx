import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Eye, User, Tag, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/lib/dummy-data';
import { formatDate } from '@/lib/utils';
import { Card } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';
import { SectionHeader } from '@/components/shared/SectionHeader';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Read expert tips, strategies, and insights for JEE, NEET, WBJEE, and board exam preparation from Alphabetz faculty.',
};

function tagBadgeVariant(tag: string) {
  switch (tag.toLowerCase()) {
    case 'jee':
      return 'info' as const;
    case 'neet':
      return 'success' as const;
    case 'wbjee':
      return 'warning' as const;
    case 'biology':
      return 'success' as const;
    case 'preparation':
    case 'strategy':
      return 'default' as const;
    default:
      return 'default' as const;
  }
}

export default function BlogPage() {
  const publishedPosts = blogPosts.filter((p) => p.status === 'published');
  const featuredPost = publishedPosts[0];
  const otherPosts = publishedPosts.slice(1);

  return (
    <>
      {/* Page header */}
      <section className="bg-primary py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Blog & Resources</h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-300 sm:text-lg">
            Tips, strategies, and insights from our expert faculty to help you prepare smarter.
          </p>
        </div>
      </section>

      {/* Featured post */}
      {featuredPost && (
        <section className="bg-gray-50 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Card hover padding="none" className="overflow-hidden">
              <div className="grid lg:grid-cols-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://picsum.photos/seed/${featuredPost.slug}/800/500`}
                  alt={featuredPost.title}
                  className="h-64 w-full object-cover lg:h-full"
                />
                <div className="flex flex-col justify-center p-6 lg:p-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="warning">Featured</Badge>
                    {featuredPost.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant={tagBadgeVariant(tag)}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="mt-3 text-2xl font-bold text-gray-900 lg:text-3xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-gray-600">{featuredPost.excerpt}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      {featuredPost.author_name}
                    </span>
                    {featuredPost.published_at && (
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(featuredPost.published_at)}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Eye className="h-3.5 w-3.5" />
                      {featuredPost.views.toLocaleString()} views
                    </span>
                  </div>

                  <div className="mt-6">
                    <Button variant="secondary" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
                      Read Article
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog grid */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Latest Articles"
            subtitle="Stay updated with our latest tips and exam preparation strategies."
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {otherPosts.map((post) => (
              <Card key={post.id} hover padding="none" className="flex flex-col overflow-hidden">
                {/* Thumbnail */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://picsum.photos/seed/${post.slug}/600/300`}
                  alt={post.title}
                  className="h-48 w-full object-cover"
                />

                <div className="flex flex-1 flex-col p-5">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant={tagBadgeVariant(tag)}>
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="mt-3 text-lg font-semibold text-gray-900 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author_name}
                      </span>
                      {post.published_at && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.published_at)}
                        </span>
                      )}
                    </div>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {post.views.toLocaleString()}
                    </span>
                  </div>

                  {/* Read more */}
                  <div className="mt-3">
                    <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                      Read More
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-primary py-12">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Stay Updated with Study Tips
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-300">
            Follow us on social media for daily study tips, motivation, and exam updates.
          </p>
          <div className="mt-6">
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

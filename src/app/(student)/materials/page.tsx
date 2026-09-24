'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';
import { cn } from '@/lib/utils';
import { studyMaterials, subjects, chapters, courses } from '@/lib/dummy-data';
import {
  FileText,
  Download,
  Search,
  Filter,
  BookOpen,
} from 'lucide-react';

const publishedMaterials = studyMaterials.filter((m) => m.is_published);
const allSubjects = [...new Set(
  publishedMaterials
    .map((m) => {
      const subj = m.subject_id ? subjects.find((s) => s.id === m.subject_id) : null;
      return subj?.name ?? null;
    })
    .filter(Boolean)
)] as string[];

const typeConfig: Record<string, { label: string; variant: 'info' | 'success' | 'warning' | 'danger' | 'default' }> = {
  pdf: { label: 'PDF', variant: 'danger' },
  video: { label: 'Video', variant: 'info' },
  document: { label: 'Document', variant: 'default' },
  link: { label: 'Link', variant: 'success' },
  image: { label: 'Image', variant: 'warning' },
};

export default function MaterialsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  const filtered = useMemo(() => {
    return publishedMaterials.filter((m) => {
      const matchesSearch =
        searchQuery === '' ||
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const subj = m.subject_id
        ? subjects.find((s) => s.id === m.subject_id)
        : null;
      const matchesSubject =
        selectedSubject === 'all' || subj?.name === selectedSubject;

      return matchesSearch && matchesSubject;
    });
  }, [searchQuery, selectedSubject]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Study Materials</h1>
        <p className="mt-1 text-sm text-gray-500">
          Download PDFs, notes, and formula sheets for your courses
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Subjects</option>
            {allSubjects.map((subj) => (
              <option key={subj} value={subj}>
                {subj}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500">
        Showing {filtered.length} of {publishedMaterials.length} materials
      </p>

      {/* Materials List */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-3 text-sm text-gray-500">
            No materials found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((material) => {
            const course = courses.find((c) => c.id === material.course_id);
            const subject = material.subject_id
              ? subjects.find((s) => s.id === material.subject_id)
              : null;
            const chapter = material.chapter_id
              ? chapters.find((ch) => ch.id === material.chapter_id)
              : null;
            const config = typeConfig[material.type] ?? typeConfig.document;

            return (
              <Card key={material.id} padding="none">
                <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {material.title}
                      </h3>
                      {material.description && (
                        <p className="mt-0.5 text-sm text-gray-500 line-clamp-1">
                          {material.description}
                        </p>
                      )}
                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        <Badge variant={config.variant}>{config.label}</Badge>
                        {subject && (
                          <span className="text-xs text-gray-500">
                            {subject.name}
                          </span>
                        )}
                        {chapter && (
                          <span className="text-xs text-gray-400">
                            · {chapter.name}
                          </span>
                        )}
                        {course && (
                          <span className="text-xs text-gray-400">
                            · {course.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right text-xs text-gray-500">
                      {material.file_size_kb
                        ? material.file_size_kb >= 1024
                          ? `${(material.file_size_kb / 1024).toFixed(1)} MB`
                          : `${material.file_size_kb} KB`
                        : ''}
                      <br />
                      {material.download_count} downloads
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Download className="h-4 w-4" />}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

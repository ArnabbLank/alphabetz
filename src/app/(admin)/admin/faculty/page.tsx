'use client';

import { Mail, Phone, Briefcase, Award, BookOpen } from 'lucide-react';
import { faculty, facultyBatches, batches } from '@/lib/dummy-data';
import { Card } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { Avatar } from '@/components/shared/Avatar';

function getFacultyBatches(facultyId: string) {
  const assignments = facultyBatches.filter((fb) => fb.faculty_id === facultyId);
  return assignments
    .map((a) => batches.find((b) => b.id === a.batch_id)?.name ?? '')
    .filter(Boolean);
}

export default function FacultyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Faculty</h1>
        <p className="text-sm text-gray-500">{faculty.length} faculty members</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {faculty.map((f) => {
          const assignedBatches = getFacultyBatches(f.id);
          return (
            <Card key={f.id} padding="md" hover>
              <div className="flex items-start gap-4">
                <Avatar name={f.full_name} src={f.photo_url} size="lg" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 truncate">{f.full_name}</h3>
                    <Badge variant={f.is_active ? 'success' : 'danger'}>
                      {f.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{f.designation}</p>
                  <p className="text-xs text-gray-500">{f.department} — {f.specialization}</p>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Award size={14} className="text-gray-400 flex-shrink-0" />
                  <span className="truncate">{f.qualification}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase size={14} className="text-gray-400 flex-shrink-0" />
                  <span>{f.experience_years} years experience</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={14} className="text-gray-400 flex-shrink-0" />
                  <span className="truncate">{f.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={14} className="text-gray-400 flex-shrink-0" />
                  <span>{f.phone}</span>
                </div>
              </div>

              {assignedBatches.length > 0 && (
                <div className="mt-4 border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-1.5 mb-2 text-xs font-medium text-gray-500">
                    <BookOpen size={12} />
                    Assigned Batches
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {assignedBatches.map((name, i) => (
                      <Badge key={i} variant="info">{name}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

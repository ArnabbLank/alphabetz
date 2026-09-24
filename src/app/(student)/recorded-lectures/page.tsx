import { EmptyState } from '@/components/shared/EmptyState';
import { PlayCircle } from 'lucide-react';

export default function RecordedLecturesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Recorded Lectures</h1>
        <p className="mt-1 text-sm text-gray-500">
          Watch recorded lectures at your own pace
        </p>
      </div>
      <EmptyState
        icon={<PlayCircle className="h-6 w-6" />}
        title="No Recordings Available"
        message="Recorded lectures from your enrolled courses will appear here once available."
      />
    </div>
  );
}

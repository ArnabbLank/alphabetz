import { EmptyState } from '@/components/shared/EmptyState';
import { Video } from 'lucide-react';

export default function LiveClassesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Live Classes</h1>
        <p className="mt-1 text-sm text-gray-500">
          Join live sessions with your faculty
        </p>
      </div>
      <EmptyState
        icon={<Video className="h-6 w-6" />}
        title="No Live Classes Scheduled"
        message="Your upcoming live classes will appear here. Check back later or view the batch schedule."
      />
    </div>
  );
}

import { Hero } from '@/components/public/Hero';
import { SubjectGrid } from '@/components/public/SubjectGrid';
import { ClassPlans } from '@/components/public/ClassPlans';
import { TeacherGrid } from '@/components/public/TeacherGrid';
import { VisitAndEnquire } from '@/components/public/VisitAndEnquire';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SubjectGrid />
      <div className="bg-gradient-to-b from-brand-50 to-white">
        <ClassPlans />
      </div>
      <TeacherGrid />
      <VisitAndEnquire />
    </>
  );
}

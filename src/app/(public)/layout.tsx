import { TopBar } from '@/components/public/TopBar';
import { SiteFooter } from '@/components/public/SiteFooter';
import { MobileDock } from '@/components/public/MobileDock';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopBar />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <MobileDock />
    </>
  );
}

import { Outlet } from 'react-router-dom';
import { MobileNav } from '@/components/layout/MobileNav';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';

export function AppLayout() {
  return (
    <div className="relative min-h-screen pb-24 xl:pb-8">
      <div className="mx-auto flex max-w-[1600px] gap-6 px-4 py-4 sm:px-6 xl:px-8">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <TopBar />
          <div className="mt-5">
            <Outlet />
          </div>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}

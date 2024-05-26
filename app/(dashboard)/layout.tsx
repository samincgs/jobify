import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='grid lg:grid-cols-6'>
      {/* 1/6 col -> sidebar */}
      <div className='lg:col-span-1 hidden lg:block lg:h-screen'>
        <Sidebar />
      </div>
      {/* 5/6 col -> navbar + page */}
      <div className='lg:col-span-5'>
        <Navbar />
        <div className='py-16 px-4 sm:px-8 lg:px-16'>{children}</div>
      </div>
    </div>
  );
};
export default DashboardLayout;

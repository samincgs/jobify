import Logo from '../assets/logo.svg';
import Main from '../assets/main.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default function Home() {
  const { userId } = auth();

  if (userId) {
    redirect('/add-job');
  }

  return (
    <>
      <div className=' max-w-7xl px-4 sm:px-8 pt-6 mx-auto flex items-center justify-between'>
        <Image src={Logo} alt='Logo' />
        <div className='flex items-center gap-x-4'>
          <Button asChild variant='outline'>
            <Link href={userId ? '/add-job' : '/sign-up'}>Sign Up</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
      <div className='h-screen max-w-7xl mx-auto px-4 sm:px-8 grid lg:grid-cols-[1fr,500px] items-center -mt-20'>
        <div>
          <h1 className='capitalize text-4xl lg:text-6xl font-bold pl-20 lg:p-0'>
            job <span className='text-primary'>Tracking</span> app
          </h1>
          <p className='leading-loose max-w-lg mt-6 text-center'>
            Effortlessly track your job interviews. Manage applications across
            different companies and locations, and stay updated on your
            status—whether it is pending, accepted, or rejected. Simplify your
            job search and stay organized with ease.
          </p>
          <div className='text-center max-w-lg'>
            <Button asChild className='mt-8 capitalize lg:text-lg'>
              <Link
                href={userId ? '/add-job' : '/sign-up'}
                className='text-white'
              >
                get started
              </Link>
            </Button>
          </div>
        </div>
        <Image src={Main} alt='Main svg' className='hidden lg:block' />
      </div>
    </>
  );
}

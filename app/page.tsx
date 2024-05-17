import Image from 'next/image';
import Logo from '../assets/jobify-logo.svg';
import Main from '../assets/main-1.svg';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { SignUpButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div>
      <div className='max-w-7xl px-4 sm:px-8 pt-6 mx-auto flex items-center justify-between'>
        <Image src={Logo} alt='Logo' />
        <div className='flex items-center gap-x-4'>
          <Button variant='outline'>
            <SignUpButton />
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
            perferendis quasi quo cupiditate earum suscipit? Ut illum et
            deserunt? Ipsam hic maiores quidem consectetur similique,
            exercitationem officiis nulla incidunt quam?
          </p>
          <div className='text-center max-w-lg'>
            <Button asChild className='mt-8 capitalize lg:text-lg'>
              <Link href='/add-job'>get started</Link>
            </Button>
          </div>
        </div>
        <Image src={Main} alt='Main svg' className='hidden lg:block' />
      </div>
    </div>
  );
}

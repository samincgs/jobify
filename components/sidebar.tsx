'use client';
import Logo from '@/assets/logo.svg';
import { links } from '@/utils/links';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import Link from 'next/link';

export const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className='h-full py-4 px-8 bg-muted'>
      <Image src={Logo} alt='logo' className='mx-auto m-2' />
      <div className='flex flex-col mt-14 gap-y-4 '>
        {links.map((link) => (
          <Button
            asChild
            key={link.href}
            variant={pathname === link.href ? 'default' : 'link'}
          >
            <Link href={link.href} className='flex items-center gap-x-3 '>
              {link.icon} {link.label}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

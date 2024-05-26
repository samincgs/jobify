import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlignJustify } from 'lucide-react';
import { Button } from './ui/button';
import { links } from '@/utils/links';
import Link from 'next/link';
export const LinksDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='lg:hidden'>
        <Button size='icon' variant='outline'>
          <AlignJustify />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-56 lg:hidden'
        align='start'
        sideOffset={25}
      >
        {links.map((link) => (
          <DropdownMenuItem key={link.href}>
            <Link href={link.href} className='flex items-center gap-x-4'>
              {link.icon} {link.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

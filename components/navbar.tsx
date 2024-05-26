import { UserButton } from '@clerk/nextjs';
import { LinksDropdown } from './links-dropdown';
import { ModeToggle } from './mode-toggle';

export const Navbar = () => {
  return (
    <div className='bg-muted py-6 px-4 sm:px-16 lg:px-24 flex items-center justify-between'>
      <div>
        <LinksDropdown />
      </div>
      <div className='flex items-center gap-x-4'>
        <ModeToggle />
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  );
};

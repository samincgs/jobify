import { BarChart, BookPlus, SquareActivity } from 'lucide-react';

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
}[];

export const links: NavLink = [
  {
    href: '/add-job',
    label: 'Add Job',
    icon: <BookPlus />,
  },
  {
    href: '/jobs',
    label: 'Jobs',
    icon: <SquareActivity />,
  },
  {
    href: '/stats',
    label: 'Statistics',
    icon: <BarChart />,
  },
];

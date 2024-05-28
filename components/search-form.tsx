'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { JobStatus } from '@/utils/types';
import { Button } from './ui/button';
import { FormEvent } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const SearchForm = () => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const jobStatus = searchParams.get('jobStatus') || 'all';

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const search = formData.get('search') as string;
    const jobStatus = formData.get('jobStatus') as string;

    let params = new URLSearchParams();
    params.set('search', search);
    params.set('jobStatus', jobStatus);

    router.push(`${pathname}?${params.toString()}`);
  };

  const jobStatusOptions = ['all', ...Object.values(JobStatus)];
  return (
    <form
      onSubmit={handleSubmit}
      className='bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-md'
    >
      <Input
        type='text'
        placeholder='Search Jobs'
        name='search'
        defaultValue={search}
      />
      <Select name='jobStatus' defaultValue={jobStatus}>
        <SelectTrigger>
          <SelectValue placeholder='Status' />
        </SelectTrigger>
        <SelectContent>
          {jobStatusOptions.map((status) => (
            <SelectItem value={status} key={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type='submit'>Search</Button>
    </form>
  );
};

import { JobType, formatDate } from '@/utils/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import { DeleteJobBtn } from './delete-job-btn';
import { Badge } from './ui/badge';
import { Briefcase, Calendar, MapPin, RadioTower } from 'lucide-react';
import { JobInfo } from './job-info';

export const JobCard = ({ job }: { job: JobType }) => {
  const date = formatDate(job.createdAt);

  return (
    <Card className='bg-muted'>
      <CardHeader>
        <CardTitle className='capitalize flex items-center justify-between'>
          {job.position}
          <Badge className='text-sm font-semibold bg-muted-foreground flex items-center gap-x-2'>
            <Briefcase />
            {job.status}
          </Badge>
        </CardTitle>
        <CardDescription className='pt-3 text-md tracking-wide'>
          {job.company}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-6'>
        <JobInfo icon={<MapPin />} text={job.location} />
        <JobInfo icon={<RadioTower />} text={job.mode} />
        <JobInfo icon={<Calendar />} text={date} />
      </CardContent>
      <CardFooter className='flex items-center justify-end mt-4 gap-4'>
        <Button asChild size='sm'>
          <Link href={`/jobs/${job.id}`}>Edit</Link>
        </Button>
        <DeleteJobBtn id={job.id} />
      </CardFooter>
    </Card>
  );
};

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import { getSingleJobAction, updateJobAction } from '@/utils/action';
import { Form } from './ui/form';
import { CustomFormField, CustomFormSelect } from './form-components';
import { JobMode, JobStatus, jobSchema } from '@/utils/types';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const EditJobForm = ({ jobId }: { jobId: string }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => getSingleJobAction(jobId),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof jobSchema>) =>
      updateJobAction(jobId, values),
    onSuccess: (data) => {
      if (!data) {
        toast({
          variant: 'destructive',
          description: 'there was an error',
        });
        return;
      }

      toast({
        description: 'job updated',
      });
      queryClient.invalidateQueries({
        queryKey: ['jobs'],
      });
      queryClient.invalidateQueries({
        queryKey: ['stats'],
      });
      queryClient.invalidateQueries({
        queryKey: ['charts'],
      });
      router.push('/jobs');
    },
  });

  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      position: data?.position || '',
      company: data?.company || '',
      location: data?.location || '',
      status: (data?.status as JobStatus) || JobStatus.Pending,
      mode: (data?.mode as JobMode) || JobMode.FullTime,
    },
  });

  const onSubmit = (values: z.infer<typeof jobSchema>) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='bg-muted p-8 rounded'
      >
        <h2 className='font-semibold text-3xl leading-loose capitalize mb-6'>
          Edit Job
        </h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          <CustomFormField name='position' control={form.control} />
          <CustomFormField name='company' control={form.control} />
          <CustomFormField name='location' control={form.control} />
          <CustomFormSelect
            name='status'
            control={form.control}
            items={Object.values(JobStatus)}
            labelText='Job Status'
          />
          <CustomFormSelect
            name='mode'
            control={form.control}
            items={Object.values(JobMode)}
            labelText='Job Mode'
          />
        </div>
        <div className='flex items-center justify-end mt-6'>
          <Button type='submit' disabled={isPending}>
            Edit
          </Button>
        </div>
      </form>
    </Form>
  );
};

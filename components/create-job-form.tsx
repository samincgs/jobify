'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { JobMode, JobStatus, jobSchema } from '@/utils/types';
import { CustomFormField, CustomFormSelect } from './form-components';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createJobAction } from '@/utils/action';

export const CreateJobForm = () => {
  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      position: '',
      company: '',
      location: '',
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
    },
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof jobSchema>) => createJobAction(values),
    onSuccess: (data) => {
      if (!data) {
        toast({
          variant: 'destructive',
          description: 'there was an error',
        });
        return;
      }

      toast({
        description: 'job created',
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
          Add Job
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
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

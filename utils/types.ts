import { z } from 'zod';

export type JobType = {
  id: string;
  clerkId: string;
  position: string;
  company: string;
  location: string;
  status: string;
  mode: string;
  createdAt: Date;
  updatedAt: Date;
};

export enum JobStatus {
  Pending = 'pending',
  Interview = 'interview',
  Declined = 'declined',
}

export enum JobMode {
  FullTime = 'full-time',
  PartTime = 'part-time',
  Internship = 'internship',
}

export type getAllJobsActionProps = {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
};

// form schema
export const jobSchema = z.object({
  position: z.string().min(2, {
    message: 'position must be at least 2 characters.',
  }),
  company: z.string().min(2, {
    message: 'company must be at least 2 characters.',
  }),
  location: z.string().min(2, {
    message: 'location must be at least 2 characters.',
  }),
  status: z.nativeEnum(JobStatus),
  mode: z.nativeEnum(JobMode),
});

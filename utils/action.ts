'use server';

import { Prisma } from '@prisma/client';
import { checkUser } from './check-user';
import { db } from './db';
import { getAllJobsActionProps, jobSchema } from './types';
import { z } from 'zod';

export async function createJobAction(values: z.infer<typeof jobSchema>) {
  try {
    const userId = checkUser();
    const job = await db.job.create({
      data: {
        clerkId: userId,
        ...values,
      },
    });

    return job;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAllJobsAction({
  search,
  jobStatus,
  page = 1,
  limit = 10,
}: getAllJobsActionProps) {
  try {
    const userId = checkUser();

    let whereClause: Prisma.JobWhereInput = {
      clerkId: userId,
    };

    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          {
            position: {
              contains: search,
            },
          },
          {
            company: {
              contains: search,
            },
          },
        ],
      };
    }

    if (jobStatus && jobStatus !== 'all') {
      whereClause = {
        ...whereClause,
        status: jobStatus,
      };
    }

    const jobs = await db.job.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { jobs, count: 0, page: 1, totalPages: 0 };
  } catch (error) {
    console.log(error);
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
}

export async function deleteJobAction(id: string) {
  try {
    const userId = checkUser();

    const job = await db.job.delete({
      where: {
        clerkId: userId,
        id,
      },
    });

    return job;
  } catch (error) {
    console.log(error);
    return null;
  }
}

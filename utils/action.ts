'use server';

import { checkUser } from './check-user';
import { db } from './db';
import { jobSchema } from './types';
import { z } from 'zod';

export async function createJobAction(values: z.infer<typeof jobSchema>) {
  const userId = checkUser();

  const { company, location, position, mode, status } = values;

  try {
    const job = await db.job.create({
      data: {
        clerkId: userId,
        company,
        location,
        position,
        mode,
        status,
      },
    });

    return job;
  } catch (error) {
    console.log(error);
    return null;
  }
}

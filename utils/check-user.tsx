import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export const checkUser = () => {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  return userId;
};

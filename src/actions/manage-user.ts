'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const addUser = async (formData: FormData) => {
  const firstName = formData.get('firstName')?.toString();
  const lastName = formData.get('lastName')?.toString();
  const nationalCode = formData.get('nationalCode')?.toString();

  if (!firstName || !lastName || !nationalCode) {
    throw new Error('همه فیلد هارا پر کنید');
  }

  const minLatitude = 35.383;
  const maxLatitude = 35.917;
  const minLongitude = 50.87;
  const maxLongitude = 51.648;

  const latitude = minLatitude + Math.random() * (maxLatitude - minLatitude);
  const longitude =
    minLongitude + Math.random() * (maxLongitude - minLongitude);

  const location = `${latitude.toFixed(4)},${longitude.toFixed(4)}`;

  await db.user.create({
    data: {
      firstName,
      lastName,
      nationalCode,
      location,
    },
  });

  revalidatePath('/');
  redirect('/');
};

export const updateUser = async (userId: string, formData: FormData) => {
  const firstName = formData.get('firstName')?.toString();
  const lastName = formData.get('lastName')?.toString();
  const nationalCode = formData.get('nationalCode')?.toString();

  if (!firstName || !lastName || !nationalCode) {
    return { error: 'Please fill in all the required fields.' };
  }

  await db.user.update({
    where: { id: userId },
    data: {
      firstName,
      lastName,
      nationalCode,
    },
  });

  revalidatePath('/');
  redirect('/');
};

export const removeUserAction = async (userId: string) => {
  await db.user.delete({ where: { id: userId } });
  revalidatePath('/');
  redirect('/');
};

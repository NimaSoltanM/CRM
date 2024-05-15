import { db } from '@/lib/db';
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card';
import Link from 'next/link';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import AlertDialogRemoveButton from './alert-dialog-remove-button';
import { Button } from '@/components/ui/button';

import Chart from './chart';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface UserPageProps {
  params: {
    userId: string;
  };
}

const getUser = cache(async (id: string) => {
  const product = await db.user.findUnique({ where: { id } });
  if (!product) notFound();
  return product;
});

export async function generateMetadata({
  params: { userId },
}: UserPageProps): Promise<Metadata> {
  const user = await getUser(userId);

  return {
    title: user.firstName + ' ' + user.lastName,
  };
}

export default async function Page({ params: { userId } }: UserPageProps) {
  const user = await getUser(userId);

  if (!user) {
    return (
      <p className='text-center'>
        کاربر پیدا نشد، آی دی دستی وارد نکنید، با تشکر✌️
      </p>
    );
  }

  const [latitude, longitude] = user.location.split(',').map(Number);
  const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

  return (
    <>
      <Card className='w-full max-w-md mx-auto mt-10'>
        <CardHeader>
          <CardTitle>اطلاعات کاربر</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <div>
                <span className='font-medium'>نام: </span>
                {user.firstName}
                {'\n                    '}
              </div>
            </div>
            <div className='space-y-2'>
              <div>
                <span className='font-medium'>نام خانوادگی : </span>
                {user.lastName}
                {'\n                    '}
              </div>
            </div>
          </div>
          <div className='space-y-2'>
            <div>
              <span className='font-medium'>کد ملی: </span>
              {user.nationalCode}
              {'\n                '}
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button variant='outline' asChild>
            <Link href={`/${user.id}/edit`}>ویرایش</Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger>حذف کاربر</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>آیا مطمعنید ؟</AlertDialogTitle>
                <AlertDialogDescription>
                  امکان بازگشت از این عملیات وجود ندارد، کاربر و اطلاعاتش به
                  صورت کامل پاک میشوند
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className='mx-4'>لغو</AlertDialogCancel>
                <AlertDialogRemoveButton userId={user.id} />
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 m-4'>
        <iframe
          src={mapUrl}
          width='100%'
          height='400'
          style={{ border: 0 }}
          loading='lazy'
          allowFullScreen
          referrerPolicy='no-referrer-when-downgrade'></iframe>
        <Chart />
      </div>
    </>
  );
}

'use client';

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User } from '@prisma/client';
import { addUser, updateUser } from '@/actions/manage-user';

export default function UserForm({ user = null }: { user?: User | null }) {
  const action = user === null ? addUser : updateUser.bind(null, user.id);

  return (
    <main className='flex items-center justify-center mt-10'>
      <form action={action}>
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle>اطلاعات کاربر</CardTitle>
            <CardDescription>
              اطلاعات کاربر را در فرم زیر وارد کنید
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='firstName'>نام</Label>
                <Input
                  id='firstName'
                  placeholder='نام را وارد کنید'
                  name='firstName'
                  required
                  defaultValue={user?.firstName || ''}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='lastName'>نام خانوادگی</Label>
                <Input
                  id='lastName'
                  placeholder='نام خانوادگی را وارد کنید'
                  name='lastName'
                  required
                  defaultValue={user?.lastName || ''}
                />
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='nationalCode'>کدملی</Label>
              <Input
                type='number'
                id='nationalCode'
                placeholder='کد ملی را وارد کنید'
                name='nationalCode'
                required
                defaultValue={user?.nationalCode || ''}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className='ml-auto' type='submit'>
              ثبت اطلاعات
            </Button>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}

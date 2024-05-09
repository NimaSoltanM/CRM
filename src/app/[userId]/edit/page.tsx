import UserForm from '@/components/main/user-form';
import { db } from '@/lib/db';

export default async function Page({
  params: { userId },
}: {
  params: { userId: string };
}) {
  const user = await db.user.findUnique({ where: { id: userId } });

  if (!user) {
    return (
      <p className='text-center'>
        کاربر پیدا نشد، آی دی دستی وارد نکنید، با تشکر✌️
      </p>
    );
  }

  return <UserForm user={user} />;
}

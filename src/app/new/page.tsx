import UserForm from '@/components/main/user-form';
import { Metadata } from 'next';
import { BackButton } from '../[userId]/back-button';

export const metadata: Metadata = {
  title: 'ایجاد کاربر جدید',
};

export default function NewPage() {
  return (
    <>
      <BackButton />
      <UserForm />
    </>
  );
}

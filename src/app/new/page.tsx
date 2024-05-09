import UserForm from '@/components/main/user-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ایجاد کاربر جدید',
};

export default function NewPage() {
  return <UserForm />;
}

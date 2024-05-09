import MainTable from '@/components/main/table/main-table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'صفحه اصلی',
};

export default function Home({
  searchParams,
}: {
  searchParams?: {
    firstname?: string;
    lastname?: string;
    nationalCode?: string;
  };
}) {
  const { firstname, lastname, nationalCode } = searchParams || {};

  return (
    <MainTable
      firstName={firstname}
      lastName={lastname}
      nationalCode={nationalCode}
    />
  );
}

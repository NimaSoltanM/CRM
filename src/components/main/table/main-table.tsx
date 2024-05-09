import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table';
import { db } from '@/lib/db';
import DropdownActions from './dropdown-actions';
import SearchComp from '../search-comp';
import { Prisma } from '@prisma/client';

interface MainTableProps {
  firstName?: string;
  lastName?: string;
  nationalCode?: string;
}

export default async function MainTable({
  firstName,
  lastName,
  nationalCode,
}: MainTableProps) {
  let users;

  const filters: Prisma.UserWhereInput[] = [
    firstName && { firstName: { contains: firstName } },
    lastName && { lastName: { contains: lastName } },
    nationalCode && { nationalCode: { contains: nationalCode } },
  ].filter(Boolean) as Prisma.UserWhereInput[];

  if (filters.length > 0) {
    users = await db.user.findMany({
      where: {
        OR: filters,
      },
    });
  } else {
    users = await db.user.findMany();
  }

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
      <div className='flex items-center gap-x-4'>
        <h1 className='font-semibold text-lg md:text-2xl'>لیست کاربران</h1>
        <Button className='ml-auto' size='sm' asChild>
          <Link href='/new'>اضافه کردن کاربر</Link>
        </Button>
      </div>
      <SearchComp />
      <div className='border shadow-sm rounded-lg'>
        <Table className='w-full overflow-auto'>
          <TableHeader>
            <TableRow>
              <TableHead>نام</TableHead>
              <TableHead>نام خانوادگی</TableHead>
              <TableHead>کد ملی</TableHead>
              <TableHead>عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.nationalCode}</TableCell>
                <DropdownActions userId={user.id} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}

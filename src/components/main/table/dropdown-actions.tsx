'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu';
import { TableCell } from '@/components/ui/table';
import { MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DropdownActions({ userId }: { userId: string }) {
  const router = useRouter();

  return (
    <TableCell>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size='icon' variant='ghost'>
            <MoreVertical className='w-4 h-4' />
            <span className='sr-only'>عملیات</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={() => router.push('/' + userId + '/edit')}>
            ویرایش
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/' + userId)}>
            جزئیات کاربر
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  );
}

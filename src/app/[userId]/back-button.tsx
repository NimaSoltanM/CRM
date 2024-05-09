import { ChevronLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function BackButton() {
  return (
    <div className='flex justify-end p-4 w-full'>
      <Button variant='outline' size='icon' asChild>
        <Link href='/'>
          <ChevronLeft className='h-4 w-4' />
        </Link>
      </Button>
    </div>
  );
}

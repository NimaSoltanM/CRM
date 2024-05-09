'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function SearchComp() {
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const { replace } = useRouter();
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [nationalCode, setNationalCode] = useState('');

  const changeUrlHandler = () => {
    const params = new URLSearchParams(searchParams);

    params.set('firstname', name);
    params.set('lastname', lastname);
    params.set('nationalCode', nationalCode);

    replace(`${pathname}?${params.toString()}`);
  };

  const clearSearchParams = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('firstname');
    params.delete('lastname');
    params.delete('nationalCode');

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='item-1'>
        <AccordionTrigger>جستجو</AccordionTrigger>
        <AccordionContent className='p-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <Input
              placeholder='نام'
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <Input
              placeholder='نام خانوادگی'
              onChange={(e) => setLastname(e.target.value)}
              value={lastname}
              defaultValue={searchParams.get('')?.toString()}
            />
            <Input
              placeholder='کد ملی'
              onChange={(e) => setNationalCode(e.target.value)}
            />
            <div className='flex gap-4'>
              <Button onClick={changeUrlHandler}>جستجو</Button>
              <Button variant='secondary' onClick={clearSearchParams}>
                حذف فیتلرها
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

import { Loader2 } from 'lucide-react';

export default function AdminLoading() {
  return (
    <div className='flex justify-center pt-12'>
      <Loader2 className='size-12 animate-spin' />
    </div>
  );
}

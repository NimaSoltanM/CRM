'use client';

import { AlertDialogAction } from '@/components/ui/alert-dialog';
import { useTransition } from 'react';
import { removeUserAction } from '../../actions/manage-user';

export default function AlertDialogRemoveButton({
  userId,
}: {
  userId: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <AlertDialogAction
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await removeUserAction(userId);
        });
      }}>
      ادامه
    </AlertDialogAction>
  );
}

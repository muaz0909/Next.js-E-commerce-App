'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import LoadingDots from 'components/loading-dots';
import { useState } from 'react';
import { removeItem } from './actions';

export function DeleteItemButton(item: string) {
  const [pending, setPending] = useState(false);

  const handleRemoveFromCart = async () => {
    setPending(true);
    await removeItem(item);
    setPending(false);
  }

  return (
    <button
      type="submit"
      onClick={handleRemoveFromCart}
      aria-label="Remove cart item"
      aria-disabled={pending}
      className={clsx(
        'ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200',
        {
          'cursor-not-allowed px-0': pending
        }
      )}
    >
      {pending ? (
        <LoadingDots className="bg-white" />
      ) : (
        <XMarkIcon className="hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black" />
      )}
    </button>
  );
}

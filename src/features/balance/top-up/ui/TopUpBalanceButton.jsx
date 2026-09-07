import { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { TopUpBalanceModal } from './TopUpBalanceModal';

export const TopUpBalanceButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        onClick={() => setIsOpen(true)}
        className="!w-auto shrink-0 !px-3 !py-1.5 !text-xs sm:!text-sm"
      >
        Пополнить
      </Button>
      <TopUpBalanceModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

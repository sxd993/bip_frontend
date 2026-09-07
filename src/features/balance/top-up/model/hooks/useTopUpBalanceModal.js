import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createTopUpApi } from '@/entities/payments';
import { MAX_TOPUP_AMOUNT, MIN_TOPUP_AMOUNT } from '../const/topUp';

const AMOUNT_RANGE_ERROR = `Введите сумму от ${MIN_TOPUP_AMOUNT.toLocaleString('ru-RU')} до ${MAX_TOPUP_AMOUNT.toLocaleString('ru-RU')} ₽`;

export function useTopUpBalanceModal({ onClose }) {
  const [amount, setAmount] = useState('');

  const topUpMutation = useMutation({
    mutationFn: createTopUpApi,
    onSuccess: (data) => {
      if (data?.confirmationUrl) {
        window.location.assign(data.confirmationUrl);
      }
    },
  });

  const resetForm = () => {
    setAmount('');
    topUpMutation.reset();
  };

  const handleClose = () => {
    if (topUpMutation.isPending) return;
    resetForm();
    onClose();
  };

  const handleAmountChange = (event) => {
    const digitsOnly = String(event.target.value).replace(/\D/g, '');
    setAmount(digitsOnly);
  };

  const numericAmount = Number(amount);
  const hasAmount = Boolean(amount);
  const canSubmit =
    hasAmount &&
    Number.isFinite(numericAmount) &&
    numericAmount >= MIN_TOPUP_AMOUNT &&
    numericAmount <= MAX_TOPUP_AMOUNT;

  const amountError =
    hasAmount && !canSubmit ? AMOUNT_RANGE_ERROR : null;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit) return;
    topUpMutation.mutate(numericAmount);
  };

  const apiError =
    topUpMutation.error?.response?.data?.error ||
    topUpMutation.error?.message ||
    null;

  return {
    amount,
    isPending: topUpMutation.isPending,
    canSubmit,
    amountError,
    apiError,
    hint: `Минимум ${MIN_TOPUP_AMOUNT.toLocaleString('ru-RU')} ₽. Оплата через ЮKassa.`,
    handleClose,
    handleAmountChange,
    handleSubmit,
  };
}

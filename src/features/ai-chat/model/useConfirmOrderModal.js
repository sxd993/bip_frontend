import { useEffect, useState } from 'react';
import { useFileUpload } from '@/shared/hooks/useFileUpload';
import { useUser } from '@/entities/auth';

const ADDITIONAL_DESCRIPTION_MAX = 300;

const formatAmount = (amount) =>
  `${Number(amount).toLocaleString('ru-RU')} ₽`;

const getUserFullName = (user) =>
  [user?.last_name, user?.first_name, user?.second_name]
    .filter(Boolean)
    .join(' ');

export const useConfirmOrderModal = ({
  isOpen,
  proposal,
  onConfirm,
  isSubmitting = false,
}) => {
  const { user } = useUser();
  const confirmations = Array.isArray(proposal?.confirmations)
    ? proposal.confirmations
    : [];
  const [checked, setChecked] = useState({});
  const [fullName, setFullName] = useState('');
  const [additionalDescription, setAdditionalDescription] = useState('');
  const [formError, setFormError] = useState(null);
  const fileUpload = useFileUpload();

  useEffect(() => {
    if (!isOpen) {
      fileUpload.clearFiles();
      setFormError(null);
      return;
    }

    const items = Array.isArray(proposal?.confirmations)
      ? proposal.confirmations
      : [];
    setChecked(Object.fromEntries(items.map((_, index) => [index, false])));
    setFullName(getUserFullName(user));
    setAdditionalDescription('');
    setFormError(null);
    fileUpload.clearFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reset only when modal opens/closes or proposal changes
  }, [isOpen, proposal, user]);

  const toggleFact = (index) => {
    setChecked((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
    if (formError) setFormError(null);
  };

  const handleAdditionalDescriptionChange = (event) => {
    const value = event.target.value.slice(0, ADDITIONAL_DESCRIPTION_MAX);
    setAdditionalDescription(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const trimmedName = fullName.trim();
    if (!trimmedName) {
      setFormError('Укажите ФИО');
      return;
    }

    const base64Files = await fileUpload.getBase64Files();
    const files = base64Files.map(({ name, base64, size, type }) => ({
      name,
      base64,
      size,
      type,
    }));

    const confirmationItems = confirmations.map((text, index) => ({
      text,
      checked: Boolean(checked[index]),
    }));

    onConfirm?.({
      files,
      fullName: trimmedName,
      additionalDescription: additionalDescription.trim(),
      confirmations: confirmationItems,
    });
  };

  const isFactChecked = (index) => Boolean(checked[index]);

  return {
    confirmations,
    title: proposal?.title,
    summary: proposal?.summary,
    timeline: proposal?.timeline,
    amountLabel: formatAmount(proposal?.amount),
    fullName,
    additionalDescription,
    additionalDescriptionMax: ADDITIONAL_DESCRIPTION_MAX,
    additionalDescriptionLeft:
      ADDITIONAL_DESCRIPTION_MAX - additionalDescription.length,
    formError,
    isFactChecked,
    toggleFact,
    handleFullNameChange,
    handleAdditionalDescriptionChange,
    handleSubmit,
    fileUpload,
  };
};

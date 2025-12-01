import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { validationRules } from '../../../../shared/utils/validators';
import { useEmployeeRegister } from './useEmployeeRegister';

export const useEmployeeRegisterForm = (prefill) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      company_token: prefill?.inviteToken || '',
    },
  });

  const phoneValue = watch('phone');

  const { onSubmit, isPending, isSuccess, isError, errorMessage } = useEmployeeRegister();
  const hasInviteToken = Boolean(prefill?.inviteToken);

  useEffect(() => {
    if (prefill?.inviteToken) {
      setValue('company_token', prefill.inviteToken);
    } else {
      setValue('company_token', '');
    }

    if (prefill?.email) {
      setValue('email', prefill.email);
    }
  }, [prefill, setValue]);

  const onSubmitForm = handleSubmit(onSubmit);

  return {
    formId: 'register-employee-form',
    register,
    setValue,
    errors,
    phoneValue,
    onSubmitForm,
    isPending,
    isSuccess,
    isError,
    errorMessage,
    hasInviteToken,
    validationRules,
  };
};
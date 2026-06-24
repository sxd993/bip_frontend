import { useEffect } from 'react';
import { useLegalRegister } from '@/features/auth/register/useLegalRegister';
import { useForm } from 'react-hook-form';

export const useLegalRegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  useEffect(() => {
    if (confirmPassword) {
      trigger('confirmPassword');
    }
  }, [password, confirmPassword, trigger]);

  const { onSubmit, isPending, isSuccess, isError, errorMessage } = useLegalRegister();

  const onSubmitForm = handleSubmit((data) => {
    const {
      confirmPassword: _confirmPassword,
      personalDataConsent: _personalDataConsent,
      ...submitData
    } = data;
    onSubmit(submitData);
  });

  return {
    register,
    errors,
    password,
    onSubmitForm,
    isFormValid: isValid,
    isPending,
    isSuccess,
    isError,
    errorMessage,
  };
};

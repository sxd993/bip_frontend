import { useEffect } from 'react';
import { usePhysicalRegister } from '@/features/auth/register/usePhysicalRegister';
import { useForm } from 'react-hook-form';

export const usePhysicalRegisterForm = () => {
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

  const { onSubmit, isPending, isSuccess, isError, errorMessage } = usePhysicalRegister();

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

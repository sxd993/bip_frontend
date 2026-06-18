import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLogin } from '@/features/auth';

export const useLoginForm = () => {
  const [userType, setUserType] = useState('physical');
  const { login, isPending, isError, errorMessage } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email_or_phone: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    login({
      email_or_phone: data.email_or_phone.trim(),
      password: data.password,
      user_type: userType,
    });
  });

  return {
    register,
    errors,
    userType,
    setUserType,
    handleSubmit: onSubmit,
    isFormValid: isValid,
    isPending,
    isError,
    errorMessage,
  };
};

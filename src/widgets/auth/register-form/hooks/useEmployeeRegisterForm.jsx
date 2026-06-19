import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useEmployeeRegister } from '@/features/auth/register/useEmployeeRegister';

export const useEmployeeRegisterForm = ({ inviteToken, inviteEmail }) => {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      first_name: '',
      second_name: '',
      last_name: '',
      email: inviteEmail || '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
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

  const { onSubmit, isPending, isSuccess, isError, errorMessage } =
    useEmployeeRegister(inviteToken);

  const onSubmitForm = handleSubmit((data) => {
    onSubmit(data);
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

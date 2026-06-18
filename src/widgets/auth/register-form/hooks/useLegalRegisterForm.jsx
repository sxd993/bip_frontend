import { useLegalRegister } from '@/features/auth/register/useLegalRegister';
import { useForm } from 'react-hook-form';

export const useLegalRegisterForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const phoneValue = watch('phone');
  const password = watch('password');

  const { onSubmit, isPending, isSuccess, isError, errorMessage } = useLegalRegister();

  const onSubmitForm = handleSubmit((data) => {
    const { confirmPassword: _confirmPassword, ...submitData } = data;
    onSubmit(submitData);
  });

  return {
    register,
    setValue,
    errors,
    phoneValue,
    password,
    onSubmitForm,
    isPending,
    isSuccess,
    isError,
    errorMessage,
  };
};

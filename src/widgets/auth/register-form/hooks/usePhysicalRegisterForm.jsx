import { usePhysicalRegister } from '@/features/auth/register/usePhysicalRegister';
import { useForm } from 'react-hook-form';

export const usePhysicalRegisterForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const phoneValue = watch('phone');
  const password = watch('password');

  const { onSubmit, isPending, isSuccess, isError, errorMessage } = usePhysicalRegister();

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

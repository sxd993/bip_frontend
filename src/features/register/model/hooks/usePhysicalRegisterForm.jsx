import { useForm } from 'react-hook-form';
import { usePhysicalRegister } from './usePhysicalRegister';

export const usePhysicalRegisterForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const phoneValue = watch('phone');

  const { onSubmit, isPending, isSuccess, isError, errorMessage } = usePhysicalRegister();

  const onSubmitForm = handleSubmit(onSubmit);

  return {
    formId: 'register-physical-form',
    register,
    setValue,
    errors,
    phoneValue,
    onSubmitForm,
    isPending,
    isSuccess,
    isError,
    errorMessage,
  };
};
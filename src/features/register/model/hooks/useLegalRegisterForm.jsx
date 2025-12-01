import { useForm } from 'react-hook-form';
import { useLegalRegister } from './useLegalRegister';

export const useLegalRegisterForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const phoneValue = watch('phone');

  const { onSubmit, isPending, isSuccess, isError, errorMessage } = useLegalRegister();

  const onSubmitForm = handleSubmit(onSubmit);

  return {
    formId: 'register-legal-form',
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
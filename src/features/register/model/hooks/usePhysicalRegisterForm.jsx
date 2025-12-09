import { useForm } from 'react-hook-form';
import { usePhysicalRegister } from './usePhysicalRegister';
import { validationRules } from '../../../../shared/utils/validators';

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
    // Удаляем confirmPassword перед отправкой
    const { confirmPassword, ...submitData } = data;
    onSubmit(submitData);
  });

  return {
    formId: 'register-physical-form',
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
import { useForm } from 'react-hook-form';
import { useLegalRegister } from './useLegalRegister';
import { validationRules } from '../../../../shared/utils/validators';

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
    // Удаляем confirmPassword перед отправкой
    const { confirmPassword, ...submitData } = data;
    onSubmit(submitData);
  });

  return {
    formId: 'register-legal-form',
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
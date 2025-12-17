import { useForm } from 'react-hook-form';
import { useResetPasswordMutation } from './useResetPasswordMutation';
import { resetPasswordValidator } from '../lib/validator';

export const useResetPasswordForm = () => {
  // Форма
  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const { register, setError, watch } = form;
  const password = watch('password');

  const {
    resetPasswordAction,
    isPending,
    isSuccess,
    isError,
    errorMessage,
    token,
  } = useResetPasswordMutation();

  // Валидация
  const passwordField = register('password', resetPasswordValidator.password(password));
  const confirmPasswordField = register('confirmPassword', resetPasswordValidator.confirmPassword(password));

  // Сабмит
  const onSubmit = async ({ password }) => {
    if (!token) {
      setError('password', {
        type: 'manual',
        message: 'Отсутствует токен для сброса пароля',
      });
      return;
    }

    try {
      await resetPasswordAction(password);
    } catch (error) {
      if (!error?.response) {
        setError('password', {
          type: 'manual',
          message: error.message || 'Не удалось сбросить пароль',
        });
      }
    }
  };

  const { isValid } = form.formState;
  const isSubmitDisabled = !isValid || isPending;
  const buttonClassName = `w-full text-white font-bold py-3 rounded-3xl transition-colors ${isValid && !isPending
    ? 'bg-red-500 hover:bg-red-600 cursor-pointer'
    : 'bg-red-300 cursor-not-allowed'
    }`;

  return {
    ...form,
    passwordField,
    confirmPasswordField,
    onSubmit,
    isPending,
    isSuccess,
    isError,
    errorMessage,
    isSubmitDisabled,
    buttonClassName,
  };
};


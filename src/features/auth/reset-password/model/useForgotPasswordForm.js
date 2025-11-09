import { useForm } from 'react-hook-form';
import { useForgotPassword } from './useForgotPassword';
import { forgotPasswordValidator } from './lib/validator';

export const useForgotPasswordForm = () => {
  // Форма
  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  const { register, setError } = form;
  const {
    sendForgotPassword,
    isPending,
    isSuccess,
    isError,
    errorMessage,
  } = useForgotPassword();

  // Валидация
  const emailField = register('email', forgotPasswordValidator.email);

  // Сабмит
  const onSubmit = async ({ email }) => {
    try {
      await sendForgotPassword(email.trim());
    } catch (error) {
      if (!error?.response) {
        setError('email', {
          type: 'manual',
          message: error.message || 'Не удалось отправить письмо',
        });
      }
    }
  };

  const { isValid } = form.formState;
  const isSubmitDisabled = !isValid || isPending;
  const buttonClassName = `w-full text-white font-bold py-3 rounded-3xl transition-colors ${
    isValid && !isPending
      ? 'bg-red-500 hover:bg-red-600 cursor-pointer'
      : 'bg-red-300 cursor-not-allowed'
  }`;

  return {
    ...form,
    emailField,
    onSubmit,
    isPending,
    isSuccess,
    isError,
    errorMessage,
    isSubmitDisabled,
    buttonClassName,
  };
};


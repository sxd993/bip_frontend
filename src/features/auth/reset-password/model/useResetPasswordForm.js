import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../../../../shared/api/auth/resetPasswordApi';

export const useResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = searchParams.get('token');

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

  // Мутация
  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      // Очищаем кэш
      queryClient.clear();
      // Перенаправляем на страницу входа
      setTimeout(() => {
        navigate('/auth/login', { replace: true });
      }, 1500);
    },
  });

  // Валидация
  const passwordField = register('password', {
    required: 'Введите пароль',
    minLength: {
      value: 6,
      message: 'Пароль должен быть минимум 6 символов',
    },
  });

  const confirmPasswordField = register('confirmPassword', {
    required: 'Подтвердите пароль',
    validate: (value) => {
      if (value !== password) {
        return 'Пароли не совпадают';
      }
      return true;
    },
  });

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
      await mutation.mutateAsync({
        token,
        password,
      });
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
  const isSubmitDisabled = !isValid || mutation.isPending;
  const buttonClassName = `w-full text-white font-bold py-3 rounded-3xl transition-colors ${
    isValid && !mutation.isPending
      ? 'bg-red-500 hover:bg-red-600 cursor-pointer'
      : 'bg-red-300 cursor-not-allowed'
  }`;

  return {
    ...form,
    passwordField,
    confirmPasswordField,
    onSubmit,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    errorMessage: mutation.error?.response?.data?.error || mutation.error?.message,
    isSubmitDisabled,
    buttonClassName,
  };
};


export const resetPasswordValidator = {
  password: () => ({
    required: 'Введите пароль',
    minLength: {
      value: 6,
      message: 'Пароль должен быть минимум 6 символов',
    },
  }),

  confirmPassword: (password) => ({
    required: 'Подтвердите пароль',
    validate: (value) => {
      if (value !== password) {
        return 'Пароли не совпадают';
      }
      return true;
    },
  }),
};

export const forgotPasswordValidator = {
  email: {
    required: 'Введите email',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Введите корректный email',
    },
  },
};

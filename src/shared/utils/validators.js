export const validatePhone = (value) => {
    if (!value) return 'Номер телефона обязателен';
    
    const digitsOnly = value.replace(/\D/g, '');
    if (!/^[78]?\d{10}$/.test(digitsOnly)) {
      return 'Некорректный формат номера телефона';
    }
    return true;
  };
  
  /**
   * Валидация email
   */
  export const validateEmail = (value) => {
    if (!value) return 'Email обязателен';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Некорректный формат email';
    }
    return true;
  };
  
  /**
   * Валидация пароля
   */
  export const validatePassword = (value, minLength = 6) => {
    if (!value) return 'Пароль обязателен';
    
    if (value.length < minLength) {
      return `Пароль должен содержать минимум ${minLength} символов`;
    }
    return true;
  };
  
  /**
   * Валидация обязательного поля
   */
  export const validateRequired = (fieldName) => (value) => {
    if (!value?.trim()) return `${fieldName} обязательно`;
    return true;
  };
  
  /**
   * Валидация ИНН
   */
  export const validateINN = (value) => {
    if (!value) return 'ИНН обязателен';
    
    const innRegex = /^\d{10}$|^\d{12}$/;
    if (!innRegex.test(value)) {
      return 'ИНН должен содержать 10 или 12 цифр';
    }
    return true;
  };
  
  /**
   * Валидация токена компании
   */
  export const validateCompanyToken = (value) => {
    if (!value) return 'Токен компании обязателен';
    
    if (value.length !== 32) {
      return 'Токен должен содержать 32 символа';
    }
    return true;
  };
  
  /**
   * Общие правила валидации для react-hook-form
   */
  export const validationRules = {
    required: (fieldName) => ({
      required: `${fieldName} обязательно`
    }),
    
    email: {
      required: 'Email обязателен',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Некорректный формат email'
      }
    },
    
    password: (minLength = 6) => ({
      required: 'Пароль обязателен',
      minLength: {
        value: minLength,
        message: `Минимум ${minLength} символов`
      }
    }),
    
    phone: {
      required: 'Номер телефона обязателен',
      validate: validatePhone
    },
    
    inn: {
      required: 'ИНН обязателен',
      validate: validateINN
    },
    
    companyToken: {
      required: 'Токен компании обязателен',
      minLength: {
        value: 32,
        message: 'Токен должен содержать 32 символа'
      },
      maxLength: {
        value: 32,
        message: 'Токен должен содержать 32 символа'
      }
    }
  };
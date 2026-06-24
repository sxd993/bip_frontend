export const PHONE_DIGITS_LENGTH = 11;
export const PHONE_PLACEHOLDER = "+7 999 123-45-67";

export const validatePhone = (value) => {
  if (!value) return "Номер телефона обязателен";

  const digitsOnly = String(value).replace(/\D/g, "");
  if (digitsOnly.length !== PHONE_DIGITS_LENGTH) {
    return "Номер телефона должен содержать 11 цифр";
  }

  return true;
};

/**
 * Валидация email
 */
export const validateEmail = (value) => {
  if (!value) return "Email обязателен";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return "Некорректный формат email";
  }
  return true;
};

export const PASSWORD_MIN_LENGTH = 8;

const hasLetter = (value) => /[a-zA-Zа-яА-ЯёЁ]/.test(value);
const hasDigit = (value) => /\d/.test(value);

/**
 * Валидация пароля
 */
export const validatePassword = (value) => {
  if (!value) return "Пароль обязателен";

  if (value.length < PASSWORD_MIN_LENGTH) {
    return `Пароль должен содержать минимум ${PASSWORD_MIN_LENGTH} символов`;
  }

  if (!hasLetter(value) || !hasDigit(value)) {
    return "Пароль должен содержать буквы и цифры";
  }

  return true;
};

const PERSON_NAME_PATTERN = /^[a-zA-Zа-яА-ЯёЁ-]+$/;

export const validatePersonName = (fieldName) => (value) => {
  const trimmed = value?.trim();

  if (!trimmed) {
    return `${fieldName} обязательно`;
  }

  if (!PERSON_NAME_PATTERN.test(trimmed)) {
    return `${fieldName} должно содержать только буквы`;
  }

  const letterCount = (trimmed.match(/[a-zA-Zа-яА-ЯёЁ]/g) || []).length;
  if (letterCount < 2) {
    return `${fieldName} должно содержать минимум 2 буквы`;
  }

  return true;
};

export const validateOptionalPersonName = (fieldName) => (value) => {
  if (!value?.trim()) {
    return true;
  }

  return validatePersonName(fieldName)(value);
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
  if (!value) return "ИНН обязателен";

  const innRegex = /^\d{10}$|^\d{12}$/;
  if (!innRegex.test(value)) {
    return "ИНН должен содержать 10 или 12 цифр";
  }
  return true;
};

/**
 * Валидация токена компании
 */
export const validateCompanyToken = (value) => {
  if (!value) return "Токен компании обязателен";

  if (value.length !== 64) {
    return "Токен должен содержать 64 символа";
  }
  return true;
};

/**
 * Логин: email или телефон
 */
export const validateLoginIdentifier = (value) => {
  const trimmed = value?.trim();
  if (!trimmed) return "Введите email или телефон";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(trimmed)) return true;

  const digitsOnly = trimmed.replace(/\D/g, "");
  if (digitsOnly.length === PHONE_DIGITS_LENGTH) return true;

  if (trimmed.includes("@")) {
    return "Некорректный формат email";
  }

  return "Номер телефона должен содержать 11 цифр";
};

export const validateLoginPassword = (value) => {
  if (!value?.trim()) return "Пароль обязателен";
  return true;
};

export const isValidLoginIdentifier = (value) =>
  validateLoginIdentifier(value) === true;

/**
 * Общие правила валидации для react-hook-form
 */
export const validationRules = {
  required: (fieldName) => ({
    required: `${fieldName} обязательно`,
  }),

  personName: (fieldName) => ({
    required: `${fieldName} обязательно`,
    validate: validatePersonName(fieldName),
  }),

  personNameOptional: (fieldName) => ({
    validate: validateOptionalPersonName(fieldName),
  }),

  email: {
    required: "Email обязателен",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Некорректный формат email",
    },
  },

  password: () => ({
    required: "Пароль обязателен",
    validate: validatePassword,
  }),

  confirmPassword: (password) => ({
    required: "Подтвердите пароль",
    validate: (value) => {
      if (value !== password) {
        return "Пароли не совпадают";
      }
      return true;
    },
  }),

  phone: {
    required: "Номер телефона обязателен",
    validate: validatePhone,
  },

  inn: {
    required: "ИНН обязателен",
    validate: validateINN,
  },

  companyName: {
    required: "Название организации обязательно",
    minLength: {
      value: 2,
      message: "Минимум 2 символа",
    },
    validate: (value) => {
      if (!value?.trim()) {
        return "Название организации обязательно";
      }
      return true;
    },
  },

  companyToken: {
    required: "Токен компании обязателен",
    minLength: {
      value: 64,
      message: "Токен должен содержать 64 символа",
    },
    maxLength: {
      value: 64,
      message: "Токен должен содержать 64 символа",
    },
  },

  loginIdentifier: {
    validate: validateLoginIdentifier,
  },

  loginPassword: {
    validate: validateLoginPassword,
  },

  personalDataConsent: {
    validate: (value) =>
      value === true || "Необходимо согласие на обработку персональных данных",
  },
};

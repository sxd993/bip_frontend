export const STATUS_COLORS = {
  green: 'bg-green-100 text-green-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  red: 'bg-red-100 text-red-800',
  blue: 'bg-blue-100 text-blue-800',
  gray: 'bg-gray-100 text-gray-800'
};

export const STAGE_COLORS = {
  NEW: 'bg-blue-100 text-blue-800',
  PREPARATION: 'bg-yellow-100 text-yellow-800',
  PREPAYMENT_INVOICE: 'bg-orange-100 text-orange-800',
  EXECUTING: 'bg-indigo-100 text-indigo-800',
  FINAL_INVOICE: 'bg-purple-100 text-purple-800',
  WON: 'bg-green-100 text-green-800',
  LOSE: 'bg-red-100 text-red-800'
};

export { FILE_CONSTRAINTS } from '@/shared/constants/fileConstraints';

export const MESSAGE_CONSTRAINTS = {
  MAX_LENGTH: 1500,
  MIN_LENGTH: 1,
};

export const APPEAL_FIELD_CONSTRAINTS = {
  title: { min: 3, max: 200 },
  comment: { min: 10, max: 1500 },
  message: { min: 1, max: 1500 },
};

const validateLength = (value, { min, max, fieldLabel }) => {
  const trimmed = value?.trim();

  if (!trimmed) {
    return `${fieldLabel} обязательно`;
  }

  if (min && trimmed.length < min) {
    return `${fieldLabel} должно содержать минимум ${min} символов`;
  }

  if (max && trimmed.length > max) {
    return `${fieldLabel} не должно превышать ${max} символов`;
  }

  return true;
};

export const FORM_DEFAULTS = {
    title: '',
    comment: ''
};

export const DEFAULT_APPEAL_CATEGORY_ID = '0';

export const VALIDATION_RULES = {
  title: {
    required: 'Введите заголовок обращения',
    validate: (value) =>
      validateLength(value, {
        ...APPEAL_FIELD_CONSTRAINTS.title,
        fieldLabel: 'Заголовок',
      }),
  },
  comment: {
    required: 'Введите подробное описание проблемы',
    validate: (value) =>
      validateLength(value, {
        ...APPEAL_FIELD_CONSTRAINTS.comment,
        fieldLabel: 'Описание',
      }),
  },
};

export const REPLY_VALIDATION_RULES = {
  message: {
    required: 'Введите ответ',
    validate: (value) =>
      validateLength(value, {
        ...APPEAL_FIELD_CONSTRAINTS.message,
        fieldLabel: 'Ответ',
      }),
  },
};
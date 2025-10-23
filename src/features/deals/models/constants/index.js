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

export const FILE_CONSTRAINTS = {
  MAX_SIZE_MB: 10,
  MAX_SIZE_BYTES: 10 * 1024 * 1024,
  ALLOWED_EXTENSIONS: ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'],
  ALLOWED_MIME_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/jpg',
    'image/png'
  ]
};

export const MESSAGE_CONSTRAINTS = {
  MAX_LENGTH: 1500,
  MIN_LENGTH: 1
};

export const FORM_DEFAULTS = {
    category_id: '',
    title: '',
    comment: ''
};

export const VALIDATION_RULES = {
    category_id: { 
        required: 'Выберите категорию обращения' 
    },
    title: { 
        required: 'Введите заголовок обращения',
        minLength: {
            value: 3,
            message: 'Заголовок должен содержать минимум 3 символа'
        }
    },
    comment: { 
        required: 'Введите подробное описание проблемы',
        minLength: {
            value: 10,
            message: 'Описание должно содержать минимум 10 символов'
        }
    }
};
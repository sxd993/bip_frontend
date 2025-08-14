/**
 * Форматирует номер телефона для отображения в формате +7 XXX XXX-XX-XX
 */
export const formatPhoneForDisplay = (digits) => {
  if (!digits || digits.length < 1) return '+7 ';

  // Убираем префиксы 8 или 7
  if (digits.startsWith('8')) {
    digits = digits.slice(1);
  } else if (digits.startsWith('7')) {
    digits = digits.slice(1);
  }

  let formatted = '+7 ';
  if (digits.length > 0) formatted += digits.slice(0, 3);
  if (digits.length > 3) formatted += ' ' + digits.slice(3, 6);
  if (digits.length > 6) formatted += '-' + digits.slice(6, 8);
  if (digits.length > 8) formatted += '-' + digits.slice(8, 10);
  
  return formatted;
};

/**
 * Нормализует номер телефона для отправки на сервер
 */
export const normalizePhoneForServer = (phone) => {
  const digitsOnly = phone.replace(/\D/g, '');
  let normalizedPhone = digitsOnly;

  if (digitsOnly.length === 10) {
    normalizedPhone = '7' + digitsOnly;
  } else if (digitsOnly.startsWith('8')) {
    normalizedPhone = '7' + digitsOnly.slice(1);
  }

  return normalizedPhone;
};

/**
 * Обрабатывает изменение поля телефона
 */
export const handlePhoneInput = (e, setValue) => {
  let raw = e.target.value.replace(/\D/g, '');

  if (raw.length === 0) {
    setValue('phone', '+7 ');
    return;
  }

  if (raw.startsWith('8')) {
    raw = '7' + raw.slice(1);
  } else if (raw.length === 10 && !raw.startsWith('7')) {
    raw = '7' + raw;
  }

  if (raw.length > 11) {
    raw = raw.slice(0, 11);
  }

  const displayValue = formatPhoneForDisplay(raw);
  setValue('phone', displayValue);
};

/**
 * Валидация номера телефона
 */
export const validatePhone = (value) => {
  const digitsOnly = value.replace(/\D/g, '');
  if (!/^[78]?\d{10}$/.test(digitsOnly)) {
    return 'Некорректный формат номера телефона';
  }
  return true;
};

/**
 * Обработчик клавиш для предотвращения удаления префикса +7
 */
export const handlePhoneKeyDown = (e) => {
  if (e.target.selectionStart <= 3 && (e.key === 'Backspace' || e.key === 'Delete')) {
    e.preventDefault();
  }
};
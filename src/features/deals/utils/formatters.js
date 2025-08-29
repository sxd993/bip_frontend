/**
 * Форматирование даты в российском формате
 * @param {string} dateString - ISO строка даты
 * @returns {string} Форматированная дата
 */
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }) + ' в ' + date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  /**
   * Форматирование суммы в рублях
   * @param {number|string} amount - Сумма
   * @returns {string} Форматированная сумма
   */
  export const formatCurrency = (amount) => {
    return Number(amount).toLocaleString('ru-RU') + ' ₽';
  };
  
  /**
   * Форматирование размера файла
   * @param {number} bytes - Размер в байтах
   * @returns {string} Размер в MB
   */
  export const formatFileSize = (bytes) => {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  };
  
  /**
   * Получение цвета статуса обращения
   * @param {string} statusColor - Цвет статуса из API
   * @param {string} stageId - ID стадии (fallback)
   * @returns {string} CSS классы для цветовой схемы
   */
  export const getStatusColor = (statusColor, stageId) => {
    if (statusColor) {
      const colorMap = {
        'green': 'bg-green-100 text-green-800',
        'yellow': 'bg-yellow-100 text-yellow-800',
        'red': 'bg-red-100 text-red-800',
        'blue': 'bg-blue-100 text-blue-800'
      };
      return colorMap[statusColor] || 'bg-gray-100 text-gray-800';
    }
  
    const statusColors = {
      'NEW': 'bg-blue-100 text-blue-800',
      'PREPARATION': 'bg-yellow-100 text-yellow-800',
      'PREPAYMENT_INVOICE': 'bg-orange-100 text-orange-800',
      'EXECUTING': 'bg-indigo-100 text-indigo-800',
      'FINAL_INVOICE': 'bg-purple-100 text-purple-800',
      'WON': 'bg-green-100 text-green-800',
      'LOSE': 'bg-red-100 text-red-800',
    };
  
    return statusColors[stageId] || 'bg-gray-100 text-gray-800';
  };
  
  /**
   * Преобразование файла в base64
   * @param {File} file - Файл
   * @returns {Promise<string>} Base64 строка
   */
  export const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
  });
  
  /**
   * Валидация размера файла
   * @param {File} file - Файл
   * @param {number} maxSizeMB - Максимальный размер в MB
   * @returns {boolean} Результат валидации
   */
  export const validateFileSize = (file, maxSizeMB = 10) => {
    const maxBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxBytes;
  };
  
  /**
   * Получение расширения файла
   * @param {string} filename - Имя файла
   * @returns {string} Расширение файла
   */
  export const getFileExtension = (filename) => {
    return filename.split('.').pop().toLowerCase();
  };
  
  /**
   * Проверка допустимого типа файла
   * @param {string} filename - Имя файла
   * @param {string[]} allowedTypes - Массив разрешенных расширений
   * @returns {boolean} Результат проверки
   */
  export const isAllowedFileType = (filename, allowedTypes = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png']) => {
    const extension = getFileExtension(filename);
    return allowedTypes.includes(extension);
  };
  
  /**
   * Сокращение длинного текста
   * @param {string} text - Исходный текст
   * @param {number} maxLength - Максимальная длина
   * @returns {string} Сокращенный текст
   */
  export const truncateText = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  /**
   * Форматирование номера обращения
   * @param {number|string} id - ID обращения
   * @returns {string} Форматированный номер
   */
  export const formatAppealNumber = (id) => {
    return `#${id}`;
  };
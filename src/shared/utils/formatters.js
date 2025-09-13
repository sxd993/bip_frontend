export const formatDate = (dateString) => {
    if (!dateString) return '';
    
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
  
  export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  export const formatCurrency = (amount) => {
    if (!amount) return '0 ₽';
    
    return Number(amount).toLocaleString('ru-RU') + ' ₽';
  };
  
  export const formatAppealNumber = (id) => `#${id}`;
  
  export const truncateText = (text, maxLength = 50) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
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
  
  export const handlePhoneKeyDown = (e) => {
    if (e.target.selectionStart <= 3 && (e.key === 'Backspace' || e.key === 'Delete')) {
      e.preventDefault();
    }
  };
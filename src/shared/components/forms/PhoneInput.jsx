import { forwardRef } from 'react';
import { formatPhoneForDisplay } from '../../utils/formatters';

const PhoneInput = forwardRef(({ 
  value = '+7 ',
  onChange,
  setValue, // из react-hook-form
  error,
  ...props 
}, ref) => {
  const handlePhoneInput = (e) => {
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
    
    if (onChange) {
      onChange(e);
    }
  };

  const handleKeyDown = (e) => {
    if (e.target.selectionStart <= 3 && (e.key === 'Backspace' || e.key === 'Delete')) {
      e.preventDefault();
    }
  };

  const baseClasses = "w-full px-3 py-2 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-400 transition-colors duration-200";
  const errorClasses = error ? "border-red-400" : "";

  return (
    <input
      ref={ref}
      type="tel"
      value={value}
      onChange={handlePhoneInput}
      onKeyDown={handleKeyDown}
      className={`${baseClasses} ${errorClasses}`}
      {...props}
    />
  );
});

export default PhoneInput;
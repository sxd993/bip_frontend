import { forwardRef } from 'react';
import { handlePhoneInput, handlePhoneKeyDown } from '../../utils/formatters';

const PhoneInput = forwardRef(({ 
  value = '+7 ',
  onChange,
  setValue,
  error,
  className = "",
  ...props 
}, ref) => {
  const onPhoneChange = (e) => {
    handlePhoneInput(e, setValue);
    
    if (onChange) {
      onChange(e);
    }
  };

  const baseClasses = "w-full px-3 py-2 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-400 transition-colors duration-200";
  const errorClasses = error ? "border-red-400" : "";

  return (
    <input
      ref={ref}
      type="tel"
      value={value}
      onChange={onPhoneChange}
      onKeyDown={handlePhoneKeyDown}
      className={`${baseClasses} ${errorClasses} ${className}`}
      {...props}
    />
  );
});

export default PhoneInput;
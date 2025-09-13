import { forwardRef } from 'react';

const Select = forwardRef(({ 
  options = [],
  error,
  placeholder = "Выберите...",
  className = "",
  ...props 
}, ref) => {
  const baseClasses = "w-full px-3 py-2 border-2 border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-red-400 transition-colors duration-200";
  const errorClasses = error ? "border-red-400" : "";
  
  return (
    <select
      ref={ref}
      className={`${baseClasses} ${errorClasses} ${className}`}
      {...props}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});

export default Select;
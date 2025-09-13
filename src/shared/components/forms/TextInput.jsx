import { forwardRef } from 'react';

const TextInput = forwardRef(({ 
  error,
  className = "",
  ...props 
}, ref) => {
  const baseClasses = "w-full px-3 py-2 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-400 transition-colors duration-200";
  const errorClasses = error ? "border-red-400" : "";
  
  return (
    <input
      ref={ref}
      className={`${baseClasses} ${errorClasses} ${className}`}
      {...props}
    />
  );
});

export default TextInput;
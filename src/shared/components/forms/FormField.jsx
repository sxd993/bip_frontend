const FormField = ({ 
    label, 
    error, 
    required = false, 
    children,
    className = ""
  }) => {
    return (
      <div className={`space-y-2 ${className}`}>
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {children}
        {error && (
          <p className="text-red-600 text-sm mt-1">{error.message || error}</p>
        )}
      </div>
    );
  };
  
  export default FormField;
  
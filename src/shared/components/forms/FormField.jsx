const FormField = ({ 
    label, 
    error, 
    required = false, 
    children,
    className = "",
    labelClassName = "",
    requiredClassName = ""
  }) => {
    const baseLabelClass = "block text-sm font-medium";
    const finalLabelClass = `${baseLabelClass} ${labelClassName || "text-gray-700"}`;
    const finalRequiredClass = requiredClassName || "text-red-500";

    return (
      <div className={`space-y-2 ${className}`}>
        <label className={finalLabelClass}>
          {label} {required && <span className={finalRequiredClass}>*</span>}
        </label>
        {children}
        {error && (
          <p className="text-red-600 text-sm mt-1">{error.message || error}</p>
        )}
      </div>
    );
  };
  
  export default FormField;
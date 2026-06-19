export const FormLabel = ({ children, required = false }) => (
  <label className="mb-1.5 block text-sm font-medium text-text">
    {children}
    {required && <span className="text-primary"> *</span>}
  </label>
);

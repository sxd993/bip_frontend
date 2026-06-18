export const Field = ({ children, error }) => (
  <div className="flex flex-col gap-1.5">
    {children}
    {error && <p className="text-xs text-error">{error}</p>}
  </div>
);
